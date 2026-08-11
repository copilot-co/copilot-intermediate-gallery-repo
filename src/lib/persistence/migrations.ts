import { CURRENT_SCHEMA_VERSION, PersistentGalleryData } from '@/lib/persistence/schema';
import { seededData } from '@/lib/persistence/seed';

function isPersistentData(value: unknown): value is PersistentGalleryData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Partial<PersistentGalleryData>;
  return (
    typeof candidate.schemaVersion === 'number' &&
    Array.isArray(candidate.photos) &&
    Array.isArray(candidate.galleries) &&
    Array.isArray(candidate.users)
  );
}

export function migratePersistentData(value: unknown): PersistentGalleryData {
  if (!isPersistentData(value)) {
    // Initialize from seed data if the file is missing or invalid.
    return seededData;
  }

  if (value.schemaVersion === CURRENT_SCHEMA_VERSION) {
    return value;
  }

  // Placeholder for future versioned migrations.
  return {
    ...value,
    schemaVersion: CURRENT_SCHEMA_VERSION,
  };
}
