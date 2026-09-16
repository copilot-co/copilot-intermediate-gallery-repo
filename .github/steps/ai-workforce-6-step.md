## Step 6: Invoke and orchestrate the agents

Your agents are ready. Call them directly, then coordinate them for two different jobs: building the feature, and documenting it.

1. Call each agent directly by name. No slash command is required:

   ```text
   component, inspect the Favorites feature request and outline your implementation approach.
   ```

   Do the same for `test` and `review` to confirm each agent responds from its own area of responsibility.

2. Use `/fleet` to have the component, test, and review agents build the [`Favorites feature request`](../ISSUE_TEMPLATE/favorites-feature-request.md) together in parallel:

   ```text
   /fleet Build the Favorites feature using the component, test, and review agents.
   ```

3. Once the feature is implemented, use `/orchestrate` to have the same three agents produce release notes for it:

   ```text
   /orchestrate Using the component, test, and review agents, write release notes for the Favorites feature covering what changed, how it was tested, and what was reviewed.
   ```

4. Add the changes to your existing pull request from Step 2.
5. Comment `Favorites PR: #<number>` on this issue, noting that you used both `/fleet` and `/orchestrate`.

> [!TIP]
> `/fleet` launches agents in parallel on one task, which fits building the feature together. `/orchestrate` coordinates related work across a broader task, which fits turning that same work into release documentation.
