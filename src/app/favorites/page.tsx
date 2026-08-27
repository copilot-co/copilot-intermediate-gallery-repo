'use client';

import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { Hero, SectionContainer, SectionTitle } from '@/components/ui';

export default function FavoritesPage() {
  return (
    <div className="page-gradient">
      <Hero
        title="Favorites"
        description="Keep your most-loved photos in one place and revisit them anytime."
      />

      <SectionContainer>
        <SectionTitle title="Favorites" />
        <GalleryGrid favoritesOnly limit={100} />
      </SectionContainer>
    </div>
  );
}
