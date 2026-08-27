# Maintaining the AI-Native Workforce Workflow Exercise

This document is for repo maintainers, not learners. It explains how the automated
"AI-Native Workforce Workflow" exercise is wired up, how to validate it, and how to
reset a run. It reuses the shared-repo, tracking-issue architecture originally
introduced by the now-removed "Agentic Workflow Redesign" exercise, kept in a
separate `ai-workforce-*` namespace.

## Architecture

A single shared tracking issue (opened from the `ai-workforce-start.md` template)
follows a learner through all 9 steps. This is the only supported exercise in
this repository — the earlier "Agentic Workflow Redesign" exercise and its
`agentic-exercise-start.md` template/maintainer doc have been removed since none
of their step workflows exist anymore. Steps that require a real artifact (context
files, a mock integration, a proactive agent, a parallel-subagent coding pair, a
maintenance graph, or the final Favorites PR) are correlated to the tracking issue
via a learner comment referencing a PR number (e.g. `Context PR: #45`), which the
workflow then fetches and grades. Steps that only need a written answer (1, 3, 9)
are graded directly against the issue body/comment text.

```
.github/ISSUE_TEMPLATE/ai-workforce-start.md   # opens the tracking issue (labels: ai-workforce, step-1)
.github/steps/ai-workforce-0-welcome.md         # posted by the start workflow
.github/steps/ai-workforce-2-step.md .. 9-step.md  # content posted at each transition
.github/steps/ai-workforce-completion.md        # final congratulations comment
.github/workflows/ai-workforce-0-start.yml      # welcomes learner, confirms step-1 label
.github/workflows/ai-workforce-1-step.yml .. 9-step.yml  # one workflow per step transition
scripts/ai-workforce-helpers.js                 # shared parsing/label/comment helpers (wraps agentic-exercise-helpers.js)
```

Each step workflow follows the standard `find_exercise` → `check_step_work` →
`post_next_step_content` job pattern:

- **`find_exercise`** confirms the event is on the tracking issue (not a PR
  comment), that it's still at the expected `step-N` label, that the commenter is
  the issue author, and — for PR-correlated steps — extracts the referenced PR
  number from a `<Label> PR: #<N>` comment pattern.
- **`check_step_work`** validates the learner's work and — on failure — posts a
  specific, actionable comment explaining what's missing, then sets
  `passed=false` so `post_next_step_content` is skipped. Grading is intentionally
  lightweight (structure/keyword checks against issue text or PR file diffs), not
  full semantic understanding — see `scripts/ai-workforce-helpers.js`.
- **`post_next_step_content`** only runs `if: needs.check_step_work.outputs.passed
  == 'true'`. It swaps the step label, posts the next step's content from
  `.github/steps/`, and (for PR-correlated steps) adds a correlation label.

### Correlation labels

| Label | Meaning |
| --- | --- |
| `ai-workforce` | Marks an issue as an AI-Native Workforce tracking issue |
| `step-1` … `step-9` | Current step the tracking issue is waiting on |
| `ctx-pr-<N>` | The context-library PR number (added at Step 2) |
| `favorites-pr-<N>` | The Favorites-ticket PR number (added at Step 8) |
| `completed` | Final state after Step 9 passes |

### Grading approach per step

| Step | Trigger | What's graded |
| --- | --- | --- |
| 1 | Issue body edited | ≥3 list items in the issue body |
| 2 | Comment: `Context PR: #N` | 3 files under `.github/instructions/` ending `.instructions.md`, each with an `applyTo` glob and referencing a known repo file |
| 3 | Comment | Comment names a skill, a decision, and a rationale |
| 4 | Comment: `Integration PR: #N` | ≥1 mock-integration file, plus a `[!NOTE]` callout mentioning "webhook" |
| 5 | Comment: `Proactive PR: #N` | A workflow file with a daily `cron:` schedule, and an agent file mentioning priority/ranking |
| 6 | Comment: `Workforce PR: #N` | ≥2 subagent role mentions (component/tests/docs) across commits/comments, plus a pass/fail result comment |
| 7 | Comment (+ optional `Graph PR: #N`) | The mermaid diagram alone: ≥3 nodes, a fan-out, an escalation-labeled edge/node |
| 8 | Comment: `Favorites PR: #N` | PR existence only (self-evident signal, matching this repo's precedent for PR-gated steps) |
| 9 | Comment | Reflection mentions workforce wins, a human-only decision, and a different future feature |

## Validating the workflows

1. **Static checks** (fast, no GitHub events needed):
   ```bash
   python3 -c "import yaml,glob; [yaml.safe_load(open(f)) for f in glob.glob('.github/workflows/ai-workforce-*.yml')]"
   actionlint .github/workflows/ai-workforce-*.yml
   node -e "require('./scripts/ai-workforce-helpers.js')"
   ```
2. **Helper unit smoke test**:
   ```bash
   node -e "
   const h = require('./scripts/ai-workforce-helpers.js');
   console.log(h.countListItems('- a\n- b\n- c'));
   console.log(h.hasDailyCronSchedule('schedule:\n  - cron: \"0 9 * * *\"'));
   console.log(h.checkMermaidGraph(h.extractMermaidBlock('\`\`\`mermaid\nA --> B\nA --> C\nC -->|low confidence| Human\n\`\`\`')));
   "
   ```
3. **End-to-end dry run** (recommended before publishing changes): open a tracking
   issue from the `ai-workforce-start.md` template on a test account and walk
   through all 9 steps yourself, watching the Actions tab for each workflow run
   and confirming label swaps and posted comments match expectations.

## Reset / retry behavior

- **Step 1**: learners can edit the tracking issue body as many times as needed;
  `ai-workforce-1-step.yml` re-runs on every edit.
- **Steps 2-9**: learners can post as many comments as needed; each new comment
  re-triggers the corresponding workflow while the label still matches that step.
- **Full restart**: a maintainer can move a stuck tracking issue back to an
  earlier step by manually swapping its `step-N` label (and removing any
  `ctx-pr-<N>`/`favorites-pr-<N>` labels that no longer apply) via the GitHub UI
  or `gh issue edit --add-label/--remove-label`.

## Known limitations

- Grading is intentionally lightweight — see `scripts/ai-workforce-helpers.js`
  for exactly what's checked at each step.
- Step 8 accepts any PR referenced by the learner while the tracking issue is at
  `step-8`; it does not verify the PR's content came from the workforce built in
  earlier steps. That judgment is left to the learner and any human facilitator.
- Step 4's integration is intentionally mocked — no real Slack/Teams credentials
  are required or checked.
- These workflows assume Actions and Copilot coding/chat access are available for
  this repository.
