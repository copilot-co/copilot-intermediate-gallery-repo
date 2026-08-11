const STORAGE_BASE_URL = process.env.GALLERY_MEDIA_BASE_URL ?? '/';

export interface ObjectStorage {
  resolvePublicUrl: (storageKey: string) => string;
  resolveMetadataKey: (storageKey: string) => string;
}

export const objectStorage: ObjectStorage = {
  // Small adapter so we can swap local/S3 URL generation via env configuration.
  resolvePublicUrl: (storageKey: string) => {
    const normalizedBase = STORAGE_BASE_URL.endsWith('/') ? STORAGE_BASE_URL : `${STORAGE_BASE_URL}/`;
    return `${normalizedBase}${storageKey}`;
  },
  resolveMetadataKey: (storageKey: string) => `${storageKey}.json`,
};
