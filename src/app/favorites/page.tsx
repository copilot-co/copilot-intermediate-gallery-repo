import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Hero, SectionContainer, SectionTitle } from "@/components/ui";
import { mockPhotos } from "@/lib/mock-photo-data";

export default function FavoritesPage() {
  return (
    <div className="page-gradient">
      <Hero
        title="Your Favorites"
        description="Photos you've marked with a heart, saved right in your browser"
      />

      <SectionContainer>
        <SectionTitle title="Favorites" />
        <GalleryGrid limit={mockPhotos.length} currentPage={1} favoritesOnly />
      </SectionContainer>
    </div>
  );
}
