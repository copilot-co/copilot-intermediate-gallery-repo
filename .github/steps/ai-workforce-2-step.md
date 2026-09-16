## Step 2: Build the context library

Your workspace is ready. Now give every agent reliable context about how work is done in this repository.

1. In your GitHub Copilot app session, create 3 custom instruction files under `.github/instructions/`:
   - `context-feature.instructions.md` for new feature conventions.
   - `context-bugfix.instructions.md` for bug investigation and fixes.
   - `context-docs.instructions.md` for documentation changes.
2. Give each file an `applyTo` frontmatter glob that scopes it to relevant files.
3. Reference at least one real file or pattern from this repository in each instruction file, such as `GalleryGrid.tsx`, `mock-photo-data.ts`, or the `SectionContainer` and `SectionTitle` pattern.
4. Open a pull request with the 3 files.
5. Comment `Context PR: #<number>` on this issue.

> [!TIP]
> Custom instructions provide shared repository context automatically. The agents you create later will all benefit from these instructions without repeating the same guidance in every agent profile.
