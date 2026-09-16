// Shared validators for the AI-Native Workforce GitHub Skills exercise.

const base = require("./agentic-exercise-helpers.js");

const WORKFORCE_LABEL = "ai-workforce";

function countMatchingFiles(files, { pathIncludes, nameEndsWith } = {}) {
  return files.filter((file) => {
    const path = file.filename || file.path || "";
    if (pathIncludes && !path.includes(pathIncludes)) return false;
    if (nameEndsWith && !path.endsWith(nameEndsWith)) return false;
    return true;
  });
}

function getSection(markdown, heading) {
  if (!markdown) return null;
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(
    new RegExp(`(?:^|\\n)#{1,6}\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n#{1,6}\\s+|$)`, "i")
  );
  return match ? match[1].trim() : null;
}

function checkAgentRoleSections(markdown, { requireInputOutput = false } = {}) {
  const roles = ["Component agent", "Test agent", "Review agent"];
  const sections = Object.fromEntries(
    roles.map((role) => [role, getSection(markdown, role)])
  );
  const present = roles.filter((role) => Boolean(sections[role]));
  const structured = roles.filter((role) => {
    const body = sections[role] || "";
    return /(^|\n)\s*Input\s*:/i.test(body) &&
      /(^|\n)\s*Output\s*:/i.test(body);
  });
  return {
    present,
    structured,
    passes: present.length === roles.length &&
      (!requireInputOutput || structured.length === roles.length),
  };
}

function extractMermaidBlock(markdown) {
  if (!markdown) return null;
  const match = markdown.match(/```mermaid\n([\s\S]*?)```/);
  return match ? match[1] : null;
}

function checkMermaidGraph(mermaidBody, { minNodes = 3 } = {}) {
  const result = { nodeCount: 0, hasFanOut: false, hasEscalation: false };
  if (!mermaidBody) return result;

  const edgePattern = /([A-Za-z0-9_]+)\s*(?:-->|--[^-\n>]*-->)\s*(?:\|[^|\n]*\|\s*)?([A-Za-z0-9_]+)/g;
  const nodes = new Set();
  const outEdges = {};
  let match;
  while ((match = edgePattern.exec(mermaidBody))) {
    const [, from, to] = match;
    nodes.add(from);
    nodes.add(to);
    outEdges[from] = (outEdges[from] || 0) + 1;
  }

  result.nodeCount = nodes.size;
  result.hasFanOut = Object.values(outEdges).some((count) => count >= 2);
  result.hasEscalation = /escalat|human|approv|low[\s-]?confidence|fail/i.test(
    mermaidBody
  );
  result.passes = result.nodeCount >= minNodes &&
    result.hasFanOut && result.hasEscalation;
  return result;
}

function checkReflection(text) {
  return {
    hasWorkforceWins: base.countListItems(text) >= 2 || /handled|did|automat/i.test(text),
    hasHumanDecision: /\b(I|we)\s+(decided|chose|had to decide|approved|rejected)/i.test(text) ||
      /human[\s-]?(only|decision)/i.test(text),
    hasFutureFeature: /(next|future|another)\s+feature/i.test(text),
    hasReusableParts: ["context", "skill", "agent", "orchestrat"]
      .filter((part) => new RegExp(part, "i").test(text)).length >= 2,
  };
}

module.exports = {
  ...base,
  WORKFORCE_LABEL,
  countMatchingFiles,
  getSection,
  checkAgentRoleSections,
  extractMermaidBlock,
  checkMermaidGraph,
  checkReflection,
};
