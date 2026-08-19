// Shared helpers for the "Agentic Workflow Redesign" GitHub Skills exercise
// workflows in .github/workflows/*-step.yml.
//
// These workflows track exactly one learner's exercise run per tracking
// issue (opened from the "Agentic Exercise: Start" issue template). Because
// this is an existing shared repo (not a one-repo-per-learner template),
// multiple learners can run the exercise concurrently, so every lookup is
// scoped by the tracking issue's author (`login`) in addition to labels.
//
// Correlation across GitHub objects (tracking issue -> spec issue -> PR) is
// done with lightweight labels acting as foreign keys: `spec-<N>` and
// `pr-<N>` on the tracking issue point at the spec issue and PR numbers.

const EXERCISE_LABEL = "agentic-exercise";

const KNOWN_FILES = [
  "GalleryGrid.tsx",
  "mock-photo-data.ts",
  "mock-admin-data.ts",
  "mock-feature-card-data.ts",
  "mock-tag-data.ts",
  "SectionContainer.tsx",
  "SectionTitle.tsx",
  "copilot-instructions.md",
];

/** Extract unique issue/PR numbers referenced as `#123` in free text. */
function extractIssueRefs(text) {
  if (!text) return [];
  const matches = [...text.matchAll(/#(\d+)/g)];
  return [...new Set(matches.map((m) => Number(m[1])))];
}

/** Count top-level Markdown bullet/numbered list items in a body of text. */
function countListItems(markdown) {
  if (!markdown) return 0;
  return (markdown.match(/^\s*(?:[-*]|\d+\.)\s+.+/gm) || []).length;
}

/** Case-insensitive check that a heading/keyword pattern appears anywhere. */
function hasSection(markdown, headingPattern) {
  if (!markdown) return false;
  return new RegExp(headingPattern, "i").test(markdown);
}

/** Count bullet items appearing under a given Markdown heading. */
function countBulletsUnderHeading(markdown, headingText) {
  if (!markdown) return 0;
  const re = new RegExp(
    `#+[^\\n]*${headingText}[^\\n]*\\n([\\s\\S]*?)(\\n#+\\s|$)`,
    "i"
  );
  const m = markdown.match(re);
  if (!m) return 0;
  return (m[1].match(/^\s*[-*]\s+.+/gm) || []).length;
}

/** Whether the text mentions at least one real, known repo file/pattern. */
function mentionsKnownFile(text) {
  if (!text) return false;
  return KNOWN_FILES.some((f) => text.includes(f));
}

/**
 * Find the open tracking issue carrying all of the given labels (always
 * including EXERCISE_LABEL). Used both to find a learner's issue by step
 * label + author, and to correlate a PR event back to its tracking issue
 * via the `pr-<number>` correlation label.
 */
async function findIssueByLabels(github, context, labels, { login } = {}) {
  const labelClause = [EXERCISE_LABEL, ...labels]
    .map((l) => `label:"${l}"`)
    .join(" ");
  const authorClause = login ? ` author:${login}` : "";
  const q = `repo:${context.repo.owner}/${context.repo.repo} is:issue is:open ${labelClause}${authorClause}`;
  const res = await github.rest.search.issuesAndPullRequests({ q });
  return res.data.items[0] || null;
}

/** Read a `prefix-<number>` correlation label (e.g. `spec-45`) off an issue. */
function readRefLabel(issue, prefix) {
  const label = (issue.labels || [])
    .map((l) => (typeof l === "string" ? l : l.name))
    .find((name) => name && name.startsWith(`${prefix}-`));
  return label ? Number(label.slice(prefix.length + 1)) : null;
}

async function addLabels(github, context, issue_number, labels) {
  await github.rest.issues.addLabels({ ...context.repo, issue_number, labels });
}

async function swapLabel(github, context, issue_number, fromLabel, toLabel) {
  await github.rest.issues
    .removeLabel({ ...context.repo, issue_number, name: fromLabel })
    .catch(() => {});
  await addLabels(github, context, issue_number, [toLabel]);
}

async function postComment(github, context, issue_number, body) {
  await github.rest.issues.createComment({ ...context.repo, issue_number, body });
}

module.exports = {
  EXERCISE_LABEL,
  KNOWN_FILES,
  extractIssueRefs,
  countListItems,
  hasSection,
  countBulletsUnderHeading,
  mentionsKnownFile,
  findIssueByLabels,
  readRefLabel,
  addLabels,
  swapLabel,
  postComment,
};
