## Step 5: Stand up a proactive agent

Now build an agent that surfaces work **before** you ask for it.

1. Create `.github/agents/proactive-feedback.agent.md` describing an agent that scans open issues/requests and ranks them by priority.
2. Create a matching workflow (e.g. `.github/workflows/proactive-feedback.yml`) that runs the agent **on a daily schedule** — include an `on: schedule: - cron: '<minute> <hour> * * *'` trigger (once per day).
3. Make sure the agent's expected output includes an explicit priority ranking (e.g. "1. ... 2. ... 3. ...").
4. Open a pull request with both files and comment `Proactive PR: #<number>` on this issue.

> [!NOTE]
> "Proactive" here specifically means schedule-triggered, not chat-invoked — the daily cron is what the bot checks for.
