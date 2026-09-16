## Step 3: Add a visual review skill

Your context library explains how this repository works. Now add a specialized capability that the review agent will use later.

1. In the GitHub Copilot app, open your repository session and view the terminal. Use the terminal tab or terminal icon in the session workspace. If you do not see it, open the session tools panel and choose **Terminal**.
2. Check that GitHub CLI is installed and current:

   ```text
   gh --version
   ```

   If `gh` is missing or outdated, install or update it from the terminal before continuing. On macOS with Homebrew, use `brew install gh` or `brew upgrade gh`. On Windows, use `winget install --id GitHub.cli` or `winget upgrade --id GitHub.cli`. You can also follow the official GitHub CLI install instructions for your operating system.

3. In the GitHub Copilot app terminal, install the `web-design-reviewer` skill from Awesome GitHub Copilot:

   ```text
   gh skills install github/awesome-copilot web-design-reviewer
   ```

4. Confirm that `.github/skills/web-design-reviewer/SKILL.md` was added to the repository.
5. Read the skill description and identify the visual, responsive, and accessibility checks it provides.
6. Keep agent profiles in the `.agents/` path when you create them in Step 5. The skill itself stays in `.github/skills/`.
7. Add the skill to your existing pull request from Step 2.
8. Comment `Skill PR: #<number>` on this issue.

> [!NOTE]
> In Step 5, you will create a review agent that uses this skill to evaluate the Favorites feature.
