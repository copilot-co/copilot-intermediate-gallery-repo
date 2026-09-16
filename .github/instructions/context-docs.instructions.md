---
applyTo: "README.md, src/**/*.md, .github/**/*.md, docs/**/*.md"
---

# Documentation conventions

- Keep documentation aligned with the actual implementation in the repository, especially the patterns visible in `src/components/gallery/GalleryGrid.tsx`, `src/lib/mock-photo-data.ts`, and the shared `SectionContainer` / `SectionTitle` layout wrappers.
- Document behavior in terms of real UI patterns the app already uses, not idealized or speculative examples.
- Use the repository's naming style and component vocabulary consistently when explaining features, sections, and data flow.
- Prefer concise, task-focused guidance with examples that match the Next.js 15 + TypeScript + Tailwind structure used in this project.
- When changing features or bug fixes, update the related docs in the same pass so the described behavior matches the code.
- Keep examples easy to follow for future contributors: show component composition, mock-data patterns, and section layout conventions that are already in use.
