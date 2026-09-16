---
applyTo: "src/**/*.{ts,tsx}"
---

# Bug investigation and fixes

- Start by reproducing the issue in the relevant UI flow and tracing the component state that powers it. `src/components/gallery/GalleryGrid.tsx` is the clearest example of filter, search, and pagination logic in this project.
- Validate assumptions against `src/lib/mock-photo-data.ts` before changing logic; the mock data shape is the canonical contract for gallery behavior and display values.
- Keep fixes surgical: preserve existing interfaces, switch statements, and user-facing behavior unless the bug specifically requires a change.
- When debugging gallery behavior, check empty states, tag matching, lowercasing, and page-slice boundaries (`selectedTags`, `searchQuery`, `currentPage`, and `limit`).
- Maintain layout stability by following the established `SectionContainer` and `SectionTitle` composition patterns instead of introducing custom wrappers.
- If a fix changes a user-facing interaction, confirm it still respects responsive spacing, dark mode classes, and the app's Tailwind utility conventions.
- Prefer a small validation pass over broad refactoring; do not broaden scope beyond the bug being fixed.
