# Agentic Workflow Redesign Demo

Welcome to the Agentic Workflow Redesign demo! Every previous demo in this repo has you *use* GitHub Copilot on a feature. This one is different: instead of just building a feature, you'll redesign the **workflow** used to build it — turning an implicit, manual process into an explicit, context-engineered one that a Copilot coding agent can execute.

You'll work through a real feature request — adding a Favorites feature to the photo gallery — twice: first sketching how it's normally built, then redesigning that process step by step and running it for real.

## What You'll Learn

By the end of this demo, you will:
- [ ] Deconstruct a traditional feature-development workflow into explicit steps
- [ ] Classify workflow steps as agent-delegable vs. human-judgment
- [ ] Practice context engineering: write a spec that gives an agent the right files, conventions, and acceptance criteria
- [ ] Delegate a feature to a Copilot coding agent and review its output against criteria
- [ ] Iterate on agent output with targeted follow-up prompts
- [ ] Compare a manual workflow to its agentic redesign and articulate the trade-offs

**Estimated Time:** 60-90 minutes

## 🤖 This demo is bot-guided

Unlike the other demos in this repo, your progress here is tracked and checked automatically:

1. Open a new issue using the **["Agentic Exercise: Start (Favorites feature)"](../.github/ISSUE_TEMPLATE/agentic-exercise-start.md)** template. This becomes your **tracking issue** for the whole exercise.
2. A bot checks your work at each step and posts the next step's instructions as a comment on that same tracking issue — you don't need to keep this guide open once you've started, though it has extra detail if you get stuck or want to read ahead.
3. Stuck, or want to redo a step? Edit the tracking issue body (Step 1) or post a new comment (later steps) — the bot re-checks automatically. There's no time limit and no penalty for retrying.

> [!NOTE]
> Steps 4-7 involve a real Copilot coding agent PR, so the bot watches GitHub events (new PRs, review comments, commits, merges) rather than something you type — just keep working in the linked issue/PR and it'll pick up your progress within a minute or two.

## 🚀 Getting Started

1. **Open the repository in your IDE** (e.g., VS Code)
2. **Create a new branch:** `git checkout -b USERNAME-agentic-workflow-redesign`
3. **Install packages**: Run `npm install` in the terminal
4. **Start the development server**: Run `npm run dev`
5. **Open the project in your browser**: Go to [http://localhost:3000](http://localhost:3000) for a live preview
6. **Confirm Copilot coding agent access** for this repository. If you don't have it, you can substitute an interactive Copilot Chat/CLI session for Steps 4 and 6 — see the note in those steps.
7. Read `.github/copilot-instructions.md` and skim `src/components/gallery/GalleryGrid.tsx` and `src/lib/mock-photo-data.ts` — you'll reference these throughout.
8. **Open your tracking issue** using the ["Agentic Exercise: Start"](../.github/ISSUE_TEMPLATE/agentic-exercise-start.md) template — this is where Step 1 begins.

The scenario: you're the tech lead for this Photo Gallery & Portfolio app. Product wants a Favorites feature — users can mark photos as favorites and view a `/favorites` page listing them. Normally this ships through an implicit process living in Slack threads and PR comments. Your job in this demo is to make that process explicit, then redesign it into an agentic one.

## 🎯 Step 1: Baseline the Manual Workflow

**Goal:** Write down the workflow that already happens implicitly, before you redesign anything.

1. In your tracking issue (opened from the "Agentic Exercise: Start" template), edit the issue body to list the steps a developer would normally take to ship this feature without any agent involved — for example: read the ticket, explore `GalleryGrid.tsx` and the mock-data pattern, write the component and page code, open a PR, get reviewed, merge.
2. Aim for at least 4 sequential steps, including an "explore the codebase" step and a "review/merge" step.
3. Save your edit — the bot checks it automatically and posts Step 2 as a comment once it passes.

> [!NOTE]
> This baseline is deliberately manual and a little vague — that's the point. You're capturing what normally happens so you have something concrete to redesign in the next steps.

## 📚 Step 2: Classify Delegable vs. Human Steps

**Goal:** Decide what should move to an agent and what should stay with you.

1. On your Step 1 issue, add a comment that copies your baseline list and tags each step `[Delegate]` or `[Human]`.
2. Add a one-line reason next to each tag (e.g., "`[Delegate]` implementing the component — boilerplate, follows existing patterns").

> [!IMPORTANT]
> An agentic redesign is not "let the agent do everything." At minimum, keep final review and merge marked `[Human]` — you're choosing what to delegate, not abdicating the whole workflow.

## 💻 Step 3: Context-Engineer the Agent Spec

**Goal:** Replace the vague baseline ticket with a spec that gives an agent everything it needs to work autonomously.

1. Open a **new issue** titled "Add Favorites feature." Near the top of the body, add a line: `Tracking issue: #<your tracking issue number>`.
2. In the body, also include:
   - **Relevant files/conventions** — reference `GalleryGrid.tsx`, the `mock-*-data.ts` pattern in `src/lib/`, and the layout components in `src/components/ui/layout/`.
   - A `## Acceptance Criteria` heading with **at least 3** bullets, such as: a favorite toggle icon on each photo card, a `/favorites` page listing only favorited photos, favorites persisted using the existing mock-data pattern (decide and state whether that means `localStorage` or an extended mock-data file), and that the UI respects dark mode and the existing responsive grid.
   - A `## Non-goals` heading — for example, "no backend or database changes."
3. Comment on your **tracking issue** referencing the new issue (e.g. `Spec issue: #45`) — the bot fetches it and checks it automatically.

> [!TIP]
> Treat this issue like an API contract with the agent. The more precisely you name real files and constraints, the less the agent has to guess — and the less you'll need to correct later.

## 🎯 Step 4: Delegate to the Coding Agent

**Goal:** Hand the Step 3 spec to a Copilot coding agent and let it implement the feature.

1. Assign **GitHub Copilot** (coding agent) to your spec issue and let it open a pull request. Make sure the PR body references your spec issue (Copilot does this automatically when assigned from the issue).
2. Comment on your **tracking issue** with a link to the PR (e.g. `PR: #48`) — the bot checks that it references your spec issue and touches `src/` files.

> [!NOTE]
> No coding agent access? Open an interactive Copilot Chat or Copilot CLI session, paste in the Step 3 issue as your prompt, and have it implement the feature directly on your branch, then open the PR yourself referencing the spec issue number.

## 📚 Step 5: Review Against Acceptance Criteria

**Goal:** Review like the spec is the source of truth, not like you're re-deriving the requirements.

1. Open the pull request Copilot created.
2. Walk through each acceptance criterion from Step 3 and check whether the PR satisfies it.
3. Leave at least one review comment on a specific file/line requesting a concrete change tied to one of your criteria (e.g., an accessible label on the favorite toggle button, or empty-state copy for a favorites page with nothing favorited yet).

> [!NOTE]
> No need to comment back on the tracking issue for this step — the bot watches the PR directly and advances you to Step 6 automatically once it sees your review comment.

## 💻 Step 6: Iterate With a Follow-Up Prompt

**Goal:** Practice targeted iteration instead of rewriting the whole spec.

1. Reply to your Step 5 review comment, or send a follow-up message in the Copilot session, asking it to address the feedback.
2. Confirm the PR receives a new commit that addresses what you asked for — the bot detects the new commit and advances you to Step 7 automatically.

## ✅ Step 7: Validate and Merge

**Goal:** Confirm the redesigned workflow still ends in a working, human-approved feature.

1. Run `npm run dev` (or use the PR's preview) and confirm the favorite toggle and `/favorites` page work as expected.
2. Merge the pull request — the bot detects the merge and posts Step 8 on your tracking issue automatically.

## 🚀 Step 8: Reflect — Manual vs. Agentic, and Context Engineering

**Goal:** Turn this into something you can bring back to your team.

1. On your **tracking issue**, post a closing comment comparing your Step 1 baseline workflow to the agentic one you just ran.
2. Reference both artifacts by number: your spec issue (`#45`) and your PR (`#48`).
3. Note the time/effort difference between the two approaches, and name at least one concrete context-engineering lesson — something specific you included (or wish you'd included) in the Step 3 spec that changed the agent's output.
4. The bot checks your comment references both artifacts and has enough substance, then closes the tracking issue and posts a completion message.

## ✅ Completion Checklist

Mark off each item as you complete it:

- [ ] Filed a baseline-workflow issue (Step 1) with the manual steps
- [ ] Annotated each step `[Delegate]` or `[Human]` with reasoning (Step 2)
- [ ] Filed a context-engineered "Add Favorites feature" issue with file references, acceptance criteria, and non-goals (Step 3)
- [ ] Delegated the issue to a Copilot coding agent and got a PR (Step 4)
- [ ] Left a criteria-linked review comment on the PR (Step 5)
- [ ] Got a follow-up commit addressing your feedback (Step 6)
- [ ] Validated the feature locally and merged the PR (Step 7)
- [ ] Posted a manual-vs-agentic reflection naming a context-engineering lesson (Step 8)

## 🚀 What's Next?

Congratulations! You've redesigned a real feature workflow for agentic development — not just used an agent, but deliberately decided what to delegate, engineered the context it needed, and closed the loop with a fast, criteria-driven review.

Try applying the same pattern (baseline → classify → context-engineer → delegate → review → iterate → reflect) to a real feature request on your own team, and share what you learn.

Happy redesigning!
