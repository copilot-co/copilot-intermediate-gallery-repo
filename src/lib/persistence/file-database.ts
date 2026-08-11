import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { migratePersistentData } from '@/lib/persistence/migrations';
import { seededData } from '@/lib/persistence/seed';
import { PersistentGalleryData } from '@/lib/persistence/schema';

const defaultDataFilePath = process.env.GALLERY_DATA_PATH
  ? path.resolve(process.env.GALLERY_DATA_PATH)
  : path.join(process.cwd(), 'data', 'gallery-data.json');

export class FileDatabase {
  constructor(private readonly filePath: string = defaultDataFilePath) {}

  async read(): Promise<PersistentGalleryData> {
    try {
      const content = await readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(content) as unknown;
      const migrated = migratePersistentData(parsed);
      await this.write(migrated);
      return migrated;
    } catch {
      await this.write(seededData);
      return seededData;
    }
  }

  async write(data: PersistentGalleryData): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}
