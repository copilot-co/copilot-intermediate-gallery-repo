## Step 3: Add a visual review skill

Your context library explains how this repository works. Now add a specialized capability that the review agent will use later.

1. In the GitHub Copilot app terminal, install the `web-design-reviewer` skill from Awesome GitHub Copilot:

   ```text
   gh skills install github/awesome-copilot web-design-reviewer
   ```

2. Confirm that `.github/skills/web-design-reviewer/SKILL.md` was added to the repository.
3. Read the skill description and identify the visual, responsive, and accessibility checks it provides.
4. Add the skill to your existing pull request from Step 2.
5. Comment `Skill PR: #<number>` on this issue.

> [!NOTE]
> In Step 5, you will create a review agent that uses this skill to evaluate the Favorites feature.
