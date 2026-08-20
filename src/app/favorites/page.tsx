import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Hero, SectionContainer, SectionTitle } from "@/components/ui";
import { mockPhotos } from "@/lib/mock-photo-data";

export default function FavoritesPage() {
  return (
    <div className="page-gradient">
      <Hero
        title="Favorite Photos"
        description="Review the photos you have marked as favorites."
      />

      <SectionContainer>
        <SectionTitle title="Favorites" />
        <GalleryGrid
          limit={mockPhotos.length}
          currentPage={1}
          favoritesOnly
          emptyTitle="No favorite photos yet"
          emptyDescription="Use the heart button on any photo to add it to your favorites."
        />
      </SectionContainer>
    </div>
  );
}
