import { FileDatabase } from '@/lib/persistence/file-database';
import { seededData } from '@/lib/persistence/seed';

async function main() {
  const db = new FileDatabase();

  if (process.argv.includes('--seed')) {
    await db.write(seededData);
    return;
  }

  await db.read();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
