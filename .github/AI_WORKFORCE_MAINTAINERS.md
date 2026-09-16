# Maintaining the AI-Native Workforce Exercise

This guide explains how the seven-step GitHub Skills exercise progresses, how its checks work, and how maintainers can validate or reset it.

## Learner journey

A tracking issue created from `.github/ISSUE_TEMPLATE/ai-workforce-start.md` carries the `ai-workforce` label and one `step-N` label. Each successful check posts the next file from `.github/steps/` and advances the step label.

The exercise intentionally builds one product workflow:

1. Open a repository session in the GitHub Copilot app.
2. Build a shared context library.
3. Install `web-design-reviewer` for a future review agent.
4. Design component, test, and review agent responsibilities.
5. Create the three repository-level agents.
6. Invoke the agents directly, then use `/fleet` to build the Favorites feature and `/orchestrate` to write release notes for it.
7. Reflect on reusable parts and human decisions.

## File layout

```text
.github/ISSUE_TEMPLATE/ai-workforce-start.md
.github/ISSUE_TEMPLATE/favorites-feature-request.md
.github/steps/ai-workforce-0-welcome.md
.github/steps/ai-workforce-2-step.md through ai-workforce-7-step.md
.github/steps/ai-workforce-completion.md
.github/workflows/ai-workforce-0-start.yml through ai-workforce-7-step.yml
scripts/ai-workforce-helpers.js
```

Every step workflow uses the standard `find_exercise`, `check_step_work`, and `post_next_step_content` job shape. Checks only accept comments from the tracking issue author and ignore pull request comments.

## Grading

| Step | Learner signal | Check |
| --- | --- | --- |
| 1 | `ready` | Exact readiness comment from the issue author |
| 2 | `Context PR: #N` | Three scoped custom instruction files with repository-specific references |
| 3 | `Skill PR: #N` | `.github/skills/web-design-reviewer/SKILL.md` exists in the PR |
| 4 | Structured comment | Component, test, and review sections each include `Input:` and `Output:` |
| 5 | `Agents PR: #N` | Three required agent files exist and the review agent references `web-design-reviewer` |
| 6 | `Favorites PR: #N` | Comment mentions `/fleet` and `/orchestrate`; learner-owned PR changes Favorites files |
| 7 | Reflection comment | Agent contributions, human decision, future feature, and reusable workflow parts |

PR-based checks may reuse one pull request across several steps. Files are evaluated against the full pull request diff from its base branch.

## Correlation labels

| Label | Meaning |
| --- | --- |
| `ai-workforce` | AI-Native Workforce tracking issue |
| `step-1` through `step-7` | Current learner step |
| `ctx-pr-<N>` | Context library pull request recorded by Step 2 |
| `favorites-pr-<N>` | Favorites pull request recorded by Step 6 |
| `completed` | Exercise passed and tracking issue closed |

## Validation

Run these checks before publishing workflow changes:

```bash
ruby -e "require 'yaml'; Dir['.github/workflows/ai-workforce-*.yml'].each { |f| YAML.safe_load_file(f, aliases: true) }"
actionlint .github/workflows/ai-workforce-*.yml
node -e "require('./scripts/ai-workforce-helpers.js')"
```

Smoke-test the structured comment helper:

```bash
node <<'NODE'
const h = require('./scripts/ai-workforce-helpers.js');
const roles = '## Component agent\nInput: ticket\nOutput: code\n## Test agent\nInput: criteria\nOutput: checks\n## Review agent\nInput: UI\nOutput: findings';
console.log(h.checkAgentRoleSections(roles, { requireInputOutput: true }));
NODE
```

For an end-to-end check, create a test tracking issue and complete all seven steps while watching workflow runs, comments, and label changes.

## Retry and reset

Learners can retry by posting a new comment while the issue remains on the same step. To reset progress, replace the current `step-N` label with the desired step label. Remove stale `ctx-pr-<N>` or `favorites-pr-<N>` labels when resetting past those transitions.

## Limitations

GitHub Actions cannot inspect private GitHub Copilot app session history. Step 6 therefore grades the durable pull request code (the Favorites file changes) and the learner's comment for command usage, rather than attempting to prove which app session produced each change.
