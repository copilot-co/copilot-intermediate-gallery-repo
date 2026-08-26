## Step 4: Simulate an integration

Skill adopted — now show your workforce reaching outside the repo, without needing real credentials.

1. Add a workflow step (or script) that **mocks** an outbound integration — format a Slack/Teams-style message and write it to `mock-integration-output.json` or a PR comment, instead of calling a real webhook.
2. Include a `> [!NOTE]` in the same file/comment explaining that in production this step would `POST` to a real Slack/Teams webhook, and what you'd swap in to make that real.
3. Open (or reuse) a pull request containing this mock, and comment `Integration PR: #<number>` on this issue.

> [!IMPORTANT]
> No real webhook URL or credentials are needed for this exercise — the mock output is the whole point of this step.
