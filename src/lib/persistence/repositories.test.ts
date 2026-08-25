import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { FileDatabase } from '@/lib/persistence/file-database';
import {
  PersistentGalleryRepository,
  PersistentPhotoRepository,
  PersistentStatsRepository,
  PersistentTagRepository,
} from '@/lib/persistence/repositories';

async function createTempDatabase() {
  const directory = await mkdtemp(path.join(tmpdir(), 'gallery-persistence-test-'));
  const databasePath = path.join(directory, 'gallery-data.json');
  const database = new FileDatabase(databasePath);

  return {
    database,
    cleanup: async () => rm(directory, { recursive: true, force: true }),
  };
}

test('photo repository supports list and filter operations', async () => {
  const { database, cleanup } = await createTempDatabase();

  try {
    const repository = new PersistentPhotoRepository(database);

    const allPhotos = await repository.list();
    assert.equal(allPhotos.length, 9);

    const byTag = await repository.list({ selectedTags: ['landscape'] });
    assert.ok(byTag.length > 0);
    assert.ok(byTag.every((photo) => photo.tags.includes('landscape')));

    const bySearch = await repository.list({ searchQuery: 'wildlife' });
    assert.equal(bySearch.length, 1);
    assert.equal(bySearch[0].title, 'Wildlife Portrait');
    assert.ok(bySearch[0].url.includes('placeholder-9.jpg'));
  } finally {
    await cleanup();
  }
});

test('tag repository returns sorted unique tags', async () => {
  const { database, cleanup } = await createTempDatabase();

  try {
    const repository = new PersistentTagRepository(database);
    const tags = await repository.list();

    assert.ok(tags.length > 0);
    assert.deepEqual(tags, [...tags].sort());
    assert.equal(new Set(tags).size, tags.length);
  } finally {
    await cleanup();
  }
});

test('gallery and stats repositories read seeded persistent data', async () => {
  const { database, cleanup } = await createTempDatabase();

  try {
    const galleryRepository = new PersistentGalleryRepository(database);
    const statsRepository = new PersistentStatsRepository(database, galleryRepository);

    const galleries = await galleryRepository.listRecent(4);
    assert.equal(galleries.length, 4);

    const stats = await statsRepository.getDashboardStats();
    assert.equal(stats.length, 4);
    assert.equal(stats[0].label, 'Total Photos');
  } finally {
    await cleanup();
  }
});
