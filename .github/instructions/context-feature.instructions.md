---
applyTo: "src/components/**/*.tsx, src/app/**/*.tsx, src/lib/**/*.ts"
---

# Feature conventions

- Build feature work around the existing component-driven architecture in `src/components/` and `src/app/` rather than introducing ad hoc patterns.
- Reuse the layout conventions established by `src/components/ui/layout/SectionContainer.tsx` and `src/components/ui/layout/SectionTitle.tsx` for new sections, cards, and page composition.
- Favor the same responsive, accessible, Tailwind-first styling already used by `src/components/gallery/GalleryGrid.tsx` and the surrounding UI components.
- When new gallery or portfolio features are added, model the data structure on `src/lib/mock-photo-data.ts` and keep mock data typed with explicit interfaces.
- Keep state local to the feature component where practical, and preserve the existing light/dark theming and motion patterns established in the app.
- Prefer small, composable UI pieces and avoid mixing unrelated responsibilities into a single component.
- Treat filters, pagination, and empty-state behavior as first-class user flows, especially when they touch gallery experiences.
