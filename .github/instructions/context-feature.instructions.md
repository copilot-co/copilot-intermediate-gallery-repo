---
applyTo: "src/components/**,src/lib/**,src/app/**"
---

# Feature Development Conventions

Use these conventions when adding a new feature (a new component, page, or data
source) to the Photo Gallery & Portfolio app.

## Component patterns

- Compose pages from the existing layout primitives instead of writing raw
  `<section>`/`<h2>` markup. Wrap page sections in
  `SectionContainer` (`src/components/ui/layout/SectionContainer.tsx`) and use
  `SectionTitle` (`src/components/ui/layout/SectionTitle.tsx`) for headers with
  an optional `viewAllLink`:

  ```tsx
  <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
    <SectionTitle title="Recent Uploads" viewAllLink="/gallery" />
    <GalleryGrid limit={6} currentPage={1} />
  </SectionContainer>
  ```

- Follow `GalleryGrid.tsx` (`src/components/gallery/GalleryGrid.tsx`) as the
  reference for a feature component: it's a `'use client'` component, defines
  a typed props interface (e.g. `GalleryGridProps`), uses `useState` for local
  UI state (selected photo, liked photos), imports `motion` from
  `framer-motion` for animations, and uses `lucide-react` for icons.
- Give every component a dedicated props `interface` (not inline object
  types), matching the style in `FeatureCard.tsx` and `StatsGrid.tsx`.

## Mock data shape

- New feature data belongs in `src/lib/` as a `mock-*-data.ts` file, mirroring
  `mock-photo-data.ts`. Export a TypeScript `interface` for the shape (see the
  `Photo` interface) alongside a typed array of mock records (e.g.
  `mockPhotos: Photo[]`). Do not fetch from a real API or database — this
  project only uses in-memory mock data during development.

## Tailwind rules

- Support dark mode on every new visual element using paired classes, e.g.
  `text-slate-900 dark:text-white` and `bg-white dark:bg-slate-800`.
- Use the shared `page-gradient` class (defined in `globals.css`) for
  full-page background gradients instead of redefining gradient utilities.
- Use the existing spacing/grid conventions: `container mx-auto px-4` for
  containers and `grid md:grid-cols-3 gap-6` (or `gap-8`) for responsive
  grids, consistent with `COMPONENT_USAGE_GUIDE.md`.
