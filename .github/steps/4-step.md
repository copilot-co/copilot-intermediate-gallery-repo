## ✅ Step 3 checked — your spec looks solid!

## Step 4: Delegate to the coding agent

Assign **GitHub Copilot** (coding agent) to your spec issue (#{{specIssue}}), and let it open a pull request. Make sure the PR body references the spec issue (e.g. `Implements #{{specIssue}}`) — Copilot's coding agent does this automatically when assigned from the issue.

No coding agent access? Open an interactive Copilot Chat/CLI session, paste in your spec issue as the prompt, have it implement the feature on a branch, and open the PR yourself referencing `#{{specIssue}}`.

Once the PR is open, come back and comment here with a link to it (e.g. `PR: #48`).

The bot will check that the PR references your spec issue and touches files under `src/`.
