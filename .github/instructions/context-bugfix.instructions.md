---
applyTo: "src/**"
---

# Bugfix Conventions

Use these conventions when triaging or fixing a bug in the Photo Gallery &
Portfolio app.

## Triage first

- Reproduce against mock data, not a live backend. Most bugs originate in
  `src/lib/mock-*-data.ts` files (e.g. `mock-photo-data.ts`,
  `mock-admin-data.ts`, `mock-tag-data.ts`, `mock-feature-card-data.ts`) or in
  the filtering/derivation logic that consumes them — check whether the data
  shape or a filter predicate is the real cause before touching UI markup.
- Example: `GalleryGrid.tsx` derives `filteredPhotos` from `mockPhotos` using
  `selectedTags` and `searchQuery`. If photos are missing/duplicated in the
  grid, check that filter logic and the `Photo` interface fields
  (`tags`, `title`, `photographer`) before assuming the bug is in rendering.

## Fix scope

- Keep fixes localized to the component or lib file that owns the bug. Do not
  refactor unrelated components (e.g. `Hero.tsx`, `StatsGrid.tsx`) while
  fixing a bug elsewhere.
- Preserve existing prop interfaces (e.g. `GalleryGridProps`,
  `SectionTitleProps`) unless the bug is caused by a missing/incorrect prop
  type — extending an interface is fine, but avoid breaking existing callers
  found in `src/app/*/page.tsx`.
- When a bug involves client-side state (likes, selected photo, uploads),
  confirm the fix respects React immutability patterns already used, e.g.
  `setLikedPhotos` in `GalleryGrid.tsx` copying the `Set` before mutating it,
  rather than mutating state in place.

## Verification

- After fixing, run `npm run dev` and manually exercise the affected page
  (`/`, `/gallery`, `/upload`, or `/admin`) to confirm the fix, since this
  project has no test suite — do not add a new testing framework as part of a
  bugfix.
- Check both light and dark mode rendering when the bug touches styling,
  since every component supports `dark:` variants.
