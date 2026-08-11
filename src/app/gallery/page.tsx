import { GalleryPageClient } from '@/components/gallery/GalleryPageClient';
import { getPhotos, getTags } from '@/lib/persistence';

export default async function GalleryPage() {
  const [photos, availableTags] = await Promise.all([getPhotos(), getTags()]);

  return <GalleryPageClient photos={photos} availableTags={availableTags} />;
}
