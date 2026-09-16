## Step 8: Produce the Favorites feature

Use the workflow you assembled to implement the [`Favorites feature request`](../ISSUE_TEMPLATE/favorites-feature-request.md).

1. Start from the Favorites request in your GitHub Copilot app session.
2. Use `/fleet` or `/orchestrate` to coordinate the component, test, and review agents according to your Step 7 design.
3. Let the repository instructions provide shared context and have the review agent use the `web-design-reviewer` skill.
4. Reconcile the agents' work, make the required human decisions, and run `/review` before opening the pull request.
5. Open the pull request with `/pr-open` or the **Create PR** button.
6. Include these sections in the pull request body:

   ```markdown
   ## Agents used
   Component agent: ...
   Test agent: ...
   Review agent: ...

   ## Human decision
   ...
   ```

7. Comment `Favorites PR: #<number>` on this issue.

> [!IMPORTANT]
> The pull request is the product of the workflow. Its code shows the result, while its description records how the agents contributed and what remained a human decision.
