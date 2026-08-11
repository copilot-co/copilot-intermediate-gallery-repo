import { DashboardStat, Gallery, Photo, User } from '@/lib/domain/models';

export interface PhotoListFilters {
  selectedTags?: string[];
  searchQuery?: string;
}

export interface PhotoRepository {
  list(filters?: PhotoListFilters): Promise<Photo[]>;
  create(photo: Omit<Photo, 'url'>): Promise<Photo>;
}

export interface TagRepository {
  list(): Promise<string[]>;
}

export interface GalleryRepository {
  listRecent(limit?: number): Promise<Gallery[]>;
  create(gallery: Gallery): Promise<Gallery>;
}

export interface UserRepository {
  list(): Promise<User[]>;
  create(user: User): Promise<User>;
}

export interface StatsRepository {
  getDashboardStats(): Promise<DashboardStat[]>;
}
