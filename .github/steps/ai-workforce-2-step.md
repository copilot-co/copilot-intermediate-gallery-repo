## Step 2: Build the context library

Friction baselined — now build the first pillar of your workforce: **context**.

1. Create 3 new prompt files under `.github/prompts/`, each covering a distinct type of work in this repo:
   - `context-feature.prompt.md` — conventions for new features (e.g. component patterns, mock data shape, Tailwind rules).
   - `context-bugfix.prompt.md` — conventions for triaging/fixing bugs.
   - `context-docs.prompt.md` — conventions for documentation changes.
2. Each file must reference at least one **real, concrete file or pattern** in this repo (not generic advice) — e.g. `GalleryGrid.tsx`, `mock-photo-data.ts`, or the `SectionContainer`/`SectionTitle` pattern.
3. Open a pull request with your 3 files.
4. Comment on this issue with `Context PR: #<number>` once it's open.

> [!TIP]
> These files are meant to be reused by every future step in this exercise (and by real agents on real tickets) — write them for that, not just to pass the check.
