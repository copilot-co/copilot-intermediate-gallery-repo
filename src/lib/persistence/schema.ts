export interface PhotoRecord {
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
}

export interface GalleryRecord {
  id: string;
  name: string;
  type: 'Client Review' | 'Public' | 'Portfolio' | 'Draft';
  status: 'Active' | 'Published' | 'Draft';
  photoIds: string[];
  views: number;
  lastUpdatedAt: string;
}

export interface UserRecord {
  id: string;
  name: string;
  role: 'admin' | 'photographer' | 'client';
  createdAt: string;
}

export interface PersistentGalleryData {
  schemaVersion: number;
  photos: PhotoRecord[];
  galleries: GalleryRecord[];
  users: UserRecord[];
}

export const CURRENT_SCHEMA_VERSION = 1;
