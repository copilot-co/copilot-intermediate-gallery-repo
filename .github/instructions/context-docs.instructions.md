---
applyTo: "**/*.md"
---

# Documentation Conventions

Use these conventions when writing or updating documentation in this repo.

## Structure and tone

- Follow the style of `COMPONENT_USAGE_GUIDE.md`: short section headers,
  a one-line description of the component/feature, then a fenced ` ```tsx `
  code block showing a real usage example copied from (or matching) an
  actual page such as `src/app/page.tsx`. Don't describe a component in
  prose only — always pair it with a working code snippet.
- When documenting a UI component, name the concrete file it lives in (e.g.
  "`SectionTitle` — `src/components/ui/layout/SectionTitle.tsx`") instead of
  referring to it only in the abstract, so readers can jump straight to the
  source.

## Keeping docs in sync with code

- If you change a component's props (e.g. add a field to `GalleryGridProps`
  in `GalleryGrid.tsx`, or `StatsGrid`'s `stats` item shape), update any
  example in `COMPONENT_USAGE_GUIDE.md` or `README.md` that passes props to
  that component so the snippets keep compiling.
- If you add a new mock data file under `src/lib/` (following the
  `mock-*-data.ts` pattern), document its exported `interface` and sample
  usage the same way `Photo` is documented for `mock-photo-data.ts`.
- Keep the "Project Structure" style tree diagrams (as used in top-level
  docs) up to date when adding new top-level folders under `src/`.

## Scope

- Documentation-only changes should not modify component logic, mock data,
  or Tailwind classes — if a doc update reveals the docs are wrong because
  the code changed, fix the doc to match the code, don't change the code to
  match the doc.
