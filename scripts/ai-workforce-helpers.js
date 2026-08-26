// Shared helpers for the "AI-Native Workforce Workflow" GitHub Skills exercise
// workflows in .github/workflows/ai-workforce-*-step.yml.
//
// Like the "Agentic Workflow Redesign" exercise (see
// scripts/agentic-exercise-helpers.js), this runs inside a single shared app
// repo where multiple learners may be working concurrently. Progress for one
// learner's run is tracked on a single tracking issue, correlated with the
// PRs it creates along the way via lightweight labels acting as foreign keys
// (e.g. `ctx-pr-<N>`, `wf-pr-<N>`).
//
// This module re-exports the generic helpers from agentic-exercise-helpers.js
// and adds checks specific to the AI-native workforce steps (context library,
// mock integration, cron schedules, parallel subagents, and mermaid graphs).

const base = require("./agentic-exercise-helpers.js");

const WORKFORCE_LABEL = "ai-workforce";

/** Count Markdown files whose path matches a glob-ish prefix/suffix pair. */
function countMatchingFiles(files, { pathIncludes, nameEndsWith } = {}) {
  return files.filter((f) => {
    const path = f.filename || f.path || "";
    if (pathIncludes && !path.includes(pathIncludes)) return false;
    if (nameEndsWith && !path.endsWith(nameEndsWith)) return false;
    return true;
  });
}

/** Whether a workflow YAML body contains a daily cron schedule trigger. */
function hasDailyCronSchedule(yamlText) {
  if (!yamlText) return false;
  return /schedule:\s*\n(\s*-\s*cron:\s*['"][^'"]+['"])/m.test(yamlText) ||
    /-\s*cron:\s*['"][^'"]+['"]/.test(yamlText);
}

/** Whether text contains a GitHub `[!NOTE]` callout. */
function hasNoteCallout(text) {
  if (!text) return false;
  return /^>\s*\[!NOTE\]/m.test(text);
}

/**
 * Parse a fenced ```mermaid block out of Markdown text. Returns the raw
 * mermaid body, or null if none is found.
 */
function extractMermaidBlock(markdown) {
  if (!markdown) return null;
  const m = markdown.match(/```mermaid\n([\s\S]*?)```/);
  return m ? m[1] : null;
}

/**
 * Structural check of a mermaid graph body for graph-engineering signals:
 * - at least `minNodes` distinct node labels
 * - at least one fan-out (a single source node with >=2 outgoing edges)
 * - at least one edge/node text referencing escalation/failure handling
 */
function checkMermaidGraph(mermaidBody, { minNodes = 3 } = {}) {
  const result = { nodeCount: 0, hasFanOut: false, hasEscalation: false };
  if (!mermaidBody) return result;

  const edgeRe = /([A-Za-z0-9_]+)\s*(?:--[^-\n>]*-->|-->)\s*([A-Za-z0-9_]+)/g;
  const nodes = new Set();
  const outEdges = {};
  let match;
  while ((match = edgeRe.exec(mermaidBody))) {
    const [, from, to] = match;
    nodes.add(from);
    nodes.add(to);
    outEdges[from] = (outEdges[from] || 0) + 1;
  }

  result.nodeCount = nodes.size;
  result.hasFanOut = Object.values(outEdges).some((count) => count >= 2);
  result.hasEscalation = /escalat|human|low[\s-]?confidence|fail/i.test(
    mermaidBody
  );
  result.passes =
    result.nodeCount >= minNodes && result.hasFanOut && result.hasEscalation;
  return result;
}

/** Whether text mentions at least `min` of the named subagent roles. */
function countSubagentMentions(text, roles) {
  if (!text) return 0;
  return roles.filter((role) => new RegExp(role, "i").test(text)).length;
}

/** Whether a comment/body proposes a skill with a stated rationale. */
function hasSkillDecisionWithRationale(text) {
  if (!text) return false;
  const mentionsSkill = /skill/i.test(text);
  const mentionsDecision = /(adopt|reject|not\s+adopt|decid)/i.test(text);
  const mentionsRationale = /(because|since|as it|so that|why)/i.test(text);
  return mentionsSkill && mentionsDecision && mentionsRationale;
}

/** Whether the final reflection comment covers all three required elements. */
function checkReflection(text) {
  return {
    hasWorkforceWins: base.countListItems(text) >= 2 || /handled|did|automat/i.test(text),
    hasHumanDecision: /\b(I|we)\s+(decided|chose|had to decide|approved|rejected)/i.test(text) ||
      /human[\s-]?(only|decision)/i.test(text),
    hasFutureFeature: /(next|future|another)\s+feature/i.test(text),
  };
}

module.exports = {
  ...base,
  WORKFORCE_LABEL,
  countMatchingFiles,
  hasDailyCronSchedule,
  hasNoteCallout,
  extractMermaidBlock,
  checkMermaidGraph,
  countSubagentMentions,
  hasSkillDecisionWithRationale,
  checkReflection,
};
