import { DashboardStat, Gallery, Photo, User } from '@/lib/domain/models';
import {
  GalleryRepository,
  PhotoListFilters,
  PhotoRepository,
  StatsRepository,
  TagRepository,
  UserRepository,
} from '@/lib/domain/repositories';
import { FileDatabase } from '@/lib/persistence/file-database';
import { objectStorage } from '@/lib/persistence/storage';

function toPhoto(record: {
  id: string;
  title: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  photographer?: string;
  dateTaken?: string;
  storageKey: string;
  metadataKey: string;
}): Photo {
  return {
    ...record,
    url: objectStorage.resolvePublicUrl(record.storageKey),
  };
}

function formatRelativeTime(isoTimestamp: string): string {
  const diffMs = Date.now() - new Date(isoTimestamp).getTime();
  const diffHours = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `${Math.max(1, diffHours)} hour${diffHours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(diffHours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export class PersistentPhotoRepository implements PhotoRepository {
  constructor(private readonly database: FileDatabase = new FileDatabase()) {}

  async list(filters: PhotoListFilters = {}): Promise<Photo[]> {
    const data = await this.database.read();
    const normalizedSearch = filters.searchQuery?.trim().toLowerCase() ?? '';
    const selectedTags = filters.selectedTags?.map((tag) => tag.toLowerCase()) ?? [];

    return data.photos
      .map(toPhoto)
      .filter((photo) => {
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => photo.tags.map((photoTag) => photoTag.toLowerCase()).includes(tag));

        const matchesSearch =
          normalizedSearch.length === 0 ||
          photo.title.toLowerCase().includes(normalizedSearch) ||
          photo.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)) ||
          photo.photographer?.toLowerCase().includes(normalizedSearch);

        return matchesTags && matchesSearch;
      });
  }

  async create(photo: Omit<Photo, 'url'>): Promise<Photo> {
    const data = await this.database.read();
    data.photos.push(photo);
    await this.database.write(data);
    return toPhoto(photo);
  }
}

export class PersistentTagRepository implements TagRepository {
  constructor(private readonly database: FileDatabase = new FileDatabase()) {}

  async list(): Promise<string[]> {
    const data = await this.database.read();

    return Array.from(new Set(data.photos.flatMap((photo) => photo.tags))).sort();
  }
}

export class PersistentGalleryRepository implements GalleryRepository {
  constructor(private readonly database: FileDatabase = new FileDatabase()) {}

  async listRecent(limit = 4): Promise<Gallery[]> {
    const data = await this.database.read();

    return [...data.galleries]
      .sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime())
      .slice(0, limit);
  }

  async create(gallery: Gallery): Promise<Gallery> {
    const data = await this.database.read();
    data.galleries.push(gallery);
    await this.database.write(data);
    return gallery;
  }
}

export class PersistentUserRepository implements UserRepository {
  constructor(private readonly database: FileDatabase = new FileDatabase()) {}

  async list(): Promise<User[]> {
    const data = await this.database.read();
    return data.users;
  }

  async create(user: User): Promise<User> {
    const data = await this.database.read();
    data.users.push(user);
    await this.database.write(data);
    return user;
  }
}

export class PersistentStatsRepository implements StatsRepository {
  constructor(
    private readonly database: FileDatabase = new FileDatabase(),
    private readonly galleryRepository: PersistentGalleryRepository = new PersistentGalleryRepository(database)
  ) {}

  async getDashboardStats(): Promise<DashboardStat[]> {
    const [data, galleries] = await Promise.all([this.database.read(), this.galleryRepository.listRecent(1000)]);

    const totalViews = data.photos.reduce((sum, photo) => sum + photo.views, 0);

    return [
      { label: 'Total Photos', value: data.photos.length.toLocaleString(), color: 'blue' },
      { label: 'Active Galleries', value: galleries.length.toLocaleString(), color: 'green' },
      { label: 'Client Projects', value: data.users.length.toLocaleString(), color: 'purple' },
      { label: 'This Month Views', value: totalViews.toLocaleString(), color: 'orange' },
    ];
  }
}

export function toRecentGalleryRows(galleries: Gallery[], allPhotos: Photo[]) {
  const photoIds = new Set(allPhotos.map((photo) => photo.id));

  return galleries.map((gallery) => ({
    ...gallery,
    photos: gallery.photoIds.filter((id) => photoIds.has(id)).length,
    lastUpdated: formatRelativeTime(gallery.lastUpdatedAt),
  }));
}
