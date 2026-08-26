## Step 7: Design a maintenance agent graph (graph engineering)

**Theory:** Graph engineering is designing how multiple agents work together as a connected system — their roles, dependencies, handoffs, parallel work, and failure paths — instead of relying on one flat loop.

**Activity:**

1. Design a small maintenance graph with at least these roles:
   - **Scanner** — finds drift (stale dependencies, flaky tests, doc/code mismatch).
   - Fans out **in parallel** to a **Dependency-check**, **Test-health**, and **Doc-drift** agent.
   - A **Triage** agent merges their findings and either files an issue, or **escalates to a human** if confidence is low.
2. Document the graph as a fenced ` ```mermaid ` diagram (in a new file or PR description) showing at least 3 distinct node labels, one node with edges to 2+ targets (the fan-out), and one edge/node explicitly labeled for escalation (e.g. `Triage -->|low confidence| Human`).
3. Add the matching agent files under `.github/agents/maintenance-*.agent.md` and a workflow (e.g. `.github/workflows/maintenance-graph.yml`).
4. Comment `Graph PR: #<number>` on this issue, or paste the mermaid diagram directly in a comment.

> [!NOTE]
> Grading only looks at the mermaid diagram's structure (node count, fan-out, escalation label) — it doesn't cross-check every agent file.
