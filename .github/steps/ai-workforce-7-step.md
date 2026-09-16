## Step 7: Orchestrate the agent team

Now design how the component, test, and review agents will work together in a GitHub Copilot app session.

1. Choose `/fleet` to launch agents in parallel for one task, or `/orchestrate` to coordinate work across sessions.
2. Ask the selected command to plan the Favorites feature with the component, test, and review agents.
3. Decide where their work can happen in parallel, where outputs must be handed off, and where a person must review or approve the result.
4. Comment with the command you used and a fenced Mermaid diagram of the workflow.

Your diagram must include:

- The component, test, and review agents.
- At least one fan-out with two or more parallel paths.
- A handoff back into the product workflow.
- An explicit human review or approval point.

Example command:

```text
/fleet Plan the Favorites feature using the component, test, and review agents. Do not change files yet.
```

> [!NOTE]
> GitHub Actions cannot inspect private app session history. Your comment and diagram are the durable evidence of the orchestration you designed.
