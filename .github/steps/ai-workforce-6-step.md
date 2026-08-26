## Step 6: Stand up a reactive coding agent that fans out to parallel subagents

Time to put a loop to work with parallel subagents underneath it.

1. Create an orchestrating agent (`.github/agents/coding-agent.md`) that, given a ticket, dispatches **parallel subagents** for distinct pieces of the same task — for example:
   - `.github/agents/subagent-component.agent.md` — writes the component/feature code.
   - `.github/agents/subagent-tests.agent.md` — writes tests.
   - `.github/agents/subagent-docs.agent.md` — updates docs.
2. Reconcile their output into a single draft pull request. Make sure the PR shows evidence of at least 2 of the subagents' contributions (e.g. separate commits or PR comments attributable to each).
3. Add a reactive testing agent/workflow (`.github/workflows/reactive-testing.yml`) that runs automatically on that PR and posts a pass/fail result (a check run or comment).
4. Comment `Workforce PR: #<number>` on this issue once the PR and its test result both exist.

> [!TIP]
> This is "one loop, parallel subagents" — the stepping stone to the full agent *graph* you'll design in Step 7.
