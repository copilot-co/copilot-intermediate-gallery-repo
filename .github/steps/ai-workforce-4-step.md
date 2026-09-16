## Step 4: Design the agent team

Before creating agents, define the responsibilities and handoffs needed to produce the feature.

Plan these three roles:

- **Component agent** implements the user interface and feature behavior.
- **Test agent** identifies expected behavior, edge cases, and the validation needed before review.
- **Review agent** uses the `web-design-reviewer` skill to inspect the finished interface.

Comment on this issue using this structure. Describe the input each agent receives and the output it returns.

```markdown
## Component agent
Input: ...
Output: ...

## Test agent
Input: ...
Output: ...

## Review agent
Input: ...
Output: ...
```

> [!TIP]
> Use the GitHub Copilot app to draft your team design. Ask it to turn the role descriptions into focused inputs and outputs, then edit the response so it matches how you want people and agents to work together.
