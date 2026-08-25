import 'server-only';

import { Gallery, Photo } from '@/lib/domain/models';
import { PersistentGalleryRepository, PersistentPhotoRepository, PersistentStatsRepository, PersistentTagRepository, toRecentGalleryRows } from '@/lib/persistence/repositories';

const photoRepository = new PersistentPhotoRepository();
const tagRepository = new PersistentTagRepository();
const galleryRepository = new PersistentGalleryRepository();
const statsRepository = new PersistentStatsRepository();

export async function getPhotos(filters?: { selectedTags?: string[]; searchQuery?: string }): Promise<Photo[]> {
  return photoRepository.list(filters);
}

export async function getTags(): Promise<string[]> {
  return tagRepository.list();
}

export async function getDashboardStats() {
  return statsRepository.getDashboardStats();
}

export async function getRecentGalleries(): Promise<Array<Gallery & { photos: number; lastUpdated: string }>> {
  const [galleries, photos] = await Promise.all([galleryRepository.listRecent(4), photoRepository.list()]);
  return toRecentGalleryRows(galleries, photos);
}
