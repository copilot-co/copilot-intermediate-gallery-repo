# Maintaining the AI-Native Workforce Exercise

This guide explains how the nine-step GitHub Skills exercise progresses, how its checks work, and how maintainers can validate or reset it.

## Learner journey

A tracking issue created from `.github/ISSUE_TEMPLATE/ai-workforce-start.md` carries the `ai-workforce` label and one `step-N` label. Each successful check posts the next file from `.github/steps/` and advances the step label.

The exercise intentionally builds one product workflow:

1. Open a repository session in the GitHub Copilot app.
2. Build a shared context library.
3. Install `web-design-reviewer` for a future review agent.
4. Design component, test, and review agent responsibilities.
5. Create the three repository-level agents.
6. Invoke each agent directly.
7. Coordinate them with `/fleet` or `/orchestrate`.
8. Produce the Favorites feature through the assembled workflow.
9. Reflect on reusable parts and human decisions.

## File layout

```text
.github/ISSUE_TEMPLATE/ai-workforce-start.md
.github/ISSUE_TEMPLATE/favorites-feature-request.md
.github/steps/ai-workforce-0-welcome.md
.github/steps/ai-workforce-2-step.md through ai-workforce-9-step.md
.github/steps/ai-workforce-completion.md
.github/workflows/ai-workforce-0-start.yml through ai-workforce-9-step.yml
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
| 6 | Invocation summary | `Agents invoked` plus non-empty component, test, and review sections |
| 7 | Orchestration comment | `/fleet` or `/orchestrate`, all three roles, Mermaid fan-out, and human review |
| 8 | `Favorites PR: #N` | Learner-owned PR changes Favorites and documents all agents plus a human decision |
| 9 | Reflection comment | Agent contributions, human decision, future feature, and reusable workflow parts |

PR-based checks may reuse one pull request across several steps. Files are evaluated against the full pull request diff from its base branch.

## Correlation labels

| Label | Meaning |
| --- | --- |
| `ai-workforce` | AI-Native Workforce tracking issue |
| `step-1` through `step-9` | Current learner step |
| `ctx-pr-<N>` | Context library pull request recorded by Step 2 |
| `favorites-pr-<N>` | Favorites pull request recorded by Step 8 |
| `completed` | Exercise passed and tracking issue closed |

## Validation

Run these checks before publishing workflow changes:

```bash
ruby -e "require 'yaml'; Dir['.github/workflows/ai-workforce-*.yml'].each { |f| YAML.safe_load_file(f, aliases: true) }"
actionlint .github/workflows/ai-workforce-*.yml
node -e "require('./scripts/ai-workforce-helpers.js')"
```

Smoke-test the structured comment and graph helpers:

```bash
node <<'NODE'
const h = require('./scripts/ai-workforce-helpers.js');
const roles = '## Component agent\nInput: ticket\nOutput: code\n## Test agent\nInput: criteria\nOutput: checks\n## Review agent\nInput: UI\nOutput: findings';
console.log(h.checkAgentRoleSections(roles, { requireInputOutput: true }));
const graph = '```mermaid\nTicket --> Component\nTicket --> Test\nComponent --> Review\nTest --> Review\nReview --> Human\n```';
console.log(h.checkMermaidGraph(h.extractMermaidBlock(graph), { minNodes: 5 }));
NODE
```

For an end-to-end check, create a test tracking issue and complete all nine steps while watching workflow runs, comments, and label changes.

## Retry and reset

Learners can retry by posting a new comment while the issue remains on the same step. To reset progress, replace the current `step-N` label with the desired step label. Remove stale `ctx-pr-<N>` or `favorites-pr-<N>` labels when resetting past those transitions.

## Limitations

GitHub Actions cannot inspect private GitHub Copilot app session history. Steps 6 and 7 therefore grade summaries and diagrams posted by the learner. Step 8 grades the durable code and pull request description rather than attempting to prove which app session produced each change.
