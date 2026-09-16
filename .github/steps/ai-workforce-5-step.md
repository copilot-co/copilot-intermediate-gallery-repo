## Step 5: Create the agents

Turn your team design into repository-level custom agents.

1. In the GitHub Copilot app, create these agent profiles:
   - `.github/agents/component.agent.md`
   - `.github/agents/test.agent.md`
   - `.github/agents/review.agent.md`
2. Give each agent a focused `name`, `description`, and prompt that match the responsibility you defined in Step 4.
3. In the review agent's prompt, tell it to use the `web-design-reviewer` skill when evaluating interface changes.
4. Add the agent files to your existing pull request from Step 2.
5. Comment `Agents PR: #<number>` on this issue.

> [!NOTE]
> Repository-level agents are discovered from `.github/agents/`. Their descriptions help Copilot select the right specialist for a task.
