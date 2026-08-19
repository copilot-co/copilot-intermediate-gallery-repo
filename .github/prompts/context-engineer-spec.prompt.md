# Context-Engineer a Coding Agent Spec

Help me turn a short, informal feature request into a context-engineered issue that a Copilot coding agent can implement with minimal back-and-forth.

Ask me for the feature request if I haven't provided one, then produce an issue body with these sections:

1. **Relevant files/conventions** — inspect this repository and name the specific existing components, mock-data files, or patterns (e.g., `src/components/gallery/GalleryGrid.tsx`, `src/lib/mock-*-data.ts`, layout components in `src/components/ui/layout/`) the agent should reuse or extend, per `.github/copilot-instructions.md`.
2. **Acceptance criteria** — a bulleted list of at least 3 concrete, testable criteria describing what "done" looks like.
3. **Non-goals** — what is explicitly out of scope (e.g., no backend/database changes, no new dependencies) so the agent doesn't over-build.

## Instructions

1. What is the feature request? (Paste the short/informal version.)
2. Which existing components or data files should this feature reuse or extend?
3. How should the feature's data persist, given this app uses a mock-data pattern with no backend?
4. Are there any explicit non-goals or constraints I should call out?

## Output

Produce the finished issue body as a single Markdown block, ready to paste into a new GitHub issue, formatted with the three sections above.
