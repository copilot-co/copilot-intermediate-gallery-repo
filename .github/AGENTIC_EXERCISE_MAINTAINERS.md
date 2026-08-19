# Maintaining the Agentic Workflow Redesign Exercise

This document is for repo maintainers, not learners. It explains how the automated
"Agentic Workflow Redesign" exercise (`demos/agentic-workflow-redesign.md`) is wired
up, how to validate it, and how to reset a run.

## Architecture

Unlike a typical one-repo-per-learner GitHub Skills course, this exercise runs inside
a single shared app repo where multiple learners may be working concurrently. Progress
for one learner's run is tracked on a single **tracking issue**, correlated with two
other GitHub objects it creates along the way (a spec issue and a pull request) via
lightweight labels acting as foreign keys.

```
.github/ISSUE_TEMPLATE/agentic-exercise-start.md   # opens the tracking issue (labels: agentic-exercise, step-1)
.github/steps/0-welcome.md .. 8-step.md            # content posted as comments at each transition
.github/steps/completion.md                        # final congratulations comment
.github/workflows/0-start-exercise.yml              # welcomes learner, confirms step-1 label
.github/workflows/1-step.yml .. 8-step.yml          # one workflow per step transition
scripts/agentic-exercise-helpers.js                 # shared parsing/label/comment helpers
```

Each step workflow follows the standard `find_exercise` → `check_step_work` →
`post_next_step_content` job pattern:

- **`find_exercise`** locates the relevant tracking issue for the event. For
  issue/comment-triggered steps (1, 2, 3, 4, 8) this is simply the issue the event
  fired on, filtered by label and by comment-author-matches-issue-author. For
  PR-triggered steps (5, 6, 7) it searches open issues by the `pr-<number>` label
  that step 4 attaches to the tracking issue.
- **`check_step_work`** (steps 1-4 and 8) validates the learner's work and — on
  failure — posts a specific, actionable comment explaining what's missing, then
  sets `passed=false` so `post_next_step_content` is skipped. Steps 5-7 don't need
  content grading (a review comment, a new commit, and a merge are self-evidently
  the required signal), so `find_exercise` alone gates them.
- **`post_next_step_content`** only runs `if: needs.check_step_work.outputs.passed
  == 'true'` (or `needs.find_exercise.outputs.found == 'true'` for steps 5-7). It
  swaps the step label and posts the next step's content from `.github/steps/`.

### Correlation labels

| Label | Meaning |
| --- | --- |
| `agentic-exercise` | Marks an issue as an exercise tracking issue |
| `step-1` … `step-8` | Current step the tracking issue is waiting on |
| `spec-<N>` | The spec issue number for this run (added at Step 3) |
| `pr-<N>` | The PR number for this run (added at Step 4) |
| `completed` | Final state after Step 8 passes |

## Validating the workflows

1. **Static checks** (fast, no GitHub events needed):
   ```bash
   python3 -c "import yaml,glob; [yaml.safe_load(open(f)) for f in glob.glob('.github/workflows/*.yml')]"
   actionlint .github/workflows/*-step.yml .github/workflows/0-start-exercise.yml
   node -e "require('./scripts/agentic-exercise-helpers.js')"
   ```
2. **Helper unit smoke test** — exercise the parsing helpers directly:
   ```bash
   node -e "
   const h = require('./scripts/agentic-exercise-helpers.js');
   console.log(h.extractIssueRefs('Spec issue: #45'));
   console.log(h.countBulletsUnderHeading('## Acceptance Criteria\n- a\n- b\n- c', 'Acceptance Criteria'));
   "
   ```
3. **End-to-end dry run** (recommended before publishing changes): open a tracking
   issue from the template on a test account and walk through all 8 steps yourself,
   watching the Actions tab for each workflow run and confirming the label swaps
   and posted comments match what's expected.

## Reset / retry behavior

- **Step 1**: learners can edit the tracking issue body as many times as needed;
  `1-step.yml` re-runs on every edit.
- **Steps 2-4 and 8**: learners can post as many comments as needed; each new
  comment re-triggers the corresponding workflow while the label still matches
  that step.
- **Steps 5-7**: these are gated by real GitHub events (a review comment, a new
  commit, a merge) rather than free-form learner input, so there's nothing to
  "retry" beyond performing the action again.
- **Full restart**: a maintainer can move a stuck tracking issue back to an
  earlier step by manually swapping its `step-N` label (and removing any
  `spec-<N>`/`pr-<N>` labels that no longer apply) via the GitHub UI or `gh issue
  edit --add-label/--remove-label`.

## Known limitations

- Grading is intentionally lightweight (structure/keyword checks, not full
  semantic understanding) — see `scripts/agentic-exercise-helpers.js` for exactly
  what's checked at each step.
- Step 5 accepts any non-bot PR review comment or review while the tracking issue
  is at `step-5`; it does not verify the comment is tied to a specific acceptance
  criterion. That judgment is left to the learner and any human facilitator.
- These workflows assume Actions and Copilot coding agent are enabled for this
  repository. If coding agent isn't available, learners fall back to an
  interactive Copilot Chat/CLI session per the `[!NOTE]` in Step 4 of the demo
  guide.
