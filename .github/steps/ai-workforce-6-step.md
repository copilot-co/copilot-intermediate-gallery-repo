## Step 6: Invoke the agents

Confirm that each specialist can be called directly before coordinating them as a team.

1. In an active GitHub Copilot app session, ask each agent to inspect the Favorites feature request without changing files. You can call an agent naturally, for example:

   ```text
   Use the component agent to inspect the Favorites feature request and recommend an implementation approach.
   ```

   You can also use `/agent` to select a custom agent explicitly.
2. Ask the component, test, and review agents for a recommendation from their area of responsibility.
3. Summarize their responses in a comment using this structure:

```markdown
Agents invoked

## Component agent
...

## Test agent
...

## Review agent
...
```

> [!IMPORTANT]
> Do not implement Favorites yet. This step verifies that the agents are discoverable and that their responsibilities are distinct.
