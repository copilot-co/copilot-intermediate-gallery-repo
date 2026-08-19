## ✅ Step 2 checked — good split!

## Step 3: Context-engineer the agent spec

Open a **new issue** titled "Add Favorites feature" (you can use the [Favorites feature request template](../ISSUE_TEMPLATE/favorites-feature-request.md) as a starting point, but expand it — that template is deliberately vague). In the new issue's body, include:

1. A line near the top: `Tracking issue: #<this-issue-number>`
2. **Relevant files/conventions** — name specific real files, e.g. `GalleryGrid.tsx`, `mock-photo-data.ts`, or `SectionContainer.tsx`.
3. A `## Acceptance Criteria` heading with **at least 3** bullet points.
4. A `## Non-goals` heading describing what's out of scope.

Then come back and comment on **this issue** with a link to the new issue (e.g. `Spec issue: #45`).

> [!TIP]
> Treat this like an API contract with the agent — the more precisely you name real files and constraints, the less it has to guess.

The bot will fetch the issue you reference and check it for the elements above.
