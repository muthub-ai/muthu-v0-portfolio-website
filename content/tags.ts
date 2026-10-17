// Topic tags across essays and notes: finer than the five themes, at most three per piece.
// Curated per piece below; new writing without an entry falls back to the patterns.

export interface Tag {
  slug: string
  name: string
  pattern: RegExp
}

export const tags: Tag[] = [
  { slug: "agents", name: "AI agents", pattern: /\bagent|agentic/i },
  { slug: "mcp", name: "Model Context Protocol", pattern: /\bMCP\b|model context protocol|\bA2A\b/i },
  { slug: "governance", name: "AI governance", pattern: /governance|guardrail|waiver|compliance/i },
  { slug: "architecture-as-code", name: "Architecture as Code", pattern: /architecture[- ]as[- ]code|\bC4\b/i },
  { slug: "context", name: "Context engineering", pattern: /context engineering|knowledge|documentation/i },
  { slug: "sdlc", name: "AI-native software delivery", pattern: /SDLC|spec[- ]driven|coding|developer/i },
  { slug: "provenance", name: "Provenance and evidence", pattern: /provenance|audit|trace|assertion|verif/i },
  { slug: "security", name: "Security and identity", pattern: /secur|identity|secret|attack/i },
  { slug: "data", name: "Data platforms", pattern: /\bdata\b|lakehouse|catalog|database/i },
  { slug: "ml", name: "Machine learning in production", pattern: /machine learning|MLOps/i },
  { slug: "leadership", name: "Leadership", pattern: /leader|leadership|authority/i },
  { slug: "strategy", name: "AI strategy", pattern: /strategy|operating model/i },
]

const curated: Record<string, string[]> = {
  "architecture-that-runs": ["architecture-as-code", "governance", "agents"],
  "the-ai-native-sdlc": ["sdlc", "agents", "provenance"],
  "model-is-a-tool-harness-is-the-strategy": ["agents", "governance", "strategy"],
  "if-you-cant-prove-why-an-ai-wrote-it": ["provenance", "governance", "sdlc"],
  "spec-driven-development-for-regulated-industries": ["sdlc", "governance", "provenance"],
  "capture-the-why": ["context", "provenance", "architecture-as-code"],
  "adopting-mcp-in-a-bank": ["mcp", "security", "governance"],
  "agent-first-data-architecture": ["data", "agents", "strategy"],
  "living-documentation-trust-gap": ["context", "provenance"],
  "from-pair-programming-to-fleet-management": ["sdlc", "agents", "leadership"],
  "ai-is-an-amplifier": ["strategy", "leadership"],
  "inside-an-architecture-as-code-platform": ["architecture-as-code", "mcp", "governance"],
  "designing-an-enterprise-mcp-registry": ["mcp", "governance", "security"],
  "three-architectures-for-ai-coding-agents": ["agents", "sdlc", "strategy"],
  "securing-ai-agents-identity-not-secrets": ["security", "agents", "mcp"],
  "python-or-jvm-for-enterprise-ai": ["agents", "strategy"],
  "from-mlops-to-ai-engineering": ["ml", "provenance", "strategy"],
  "leading-without-authority": ["leadership", "architecture-as-code"],
  "spec-kit-beyond-vibe-coding": ["sdlc", "agents"],
  "closing-the-loop": ["agents", "provenance"],
  "agent-design-is-still-hard": ["agents"],
  "bigquery-data-engineering-agent": ["data", "agents"],
  "technical-debt-is-an-architectural-liability": ["sdlc", "architecture-as-code"],
  "mcp-tools-resources-prompts": ["mcp"],
  "mcp-connector-messages-api": ["mcp", "agents"],
  "the-mcp-spec-grows-up": ["mcp", "security"],
  "a2a-and-mcp": ["mcp", "agents"],
  "ai-generated-assertions": ["provenance", "data"],
  "build-for-today-or-tomorrow": ["strategy", "leadership"],
  "unified-governance-in-the-catalog": ["data", "governance"],
  "rethinking-oltp-for-agents": ["data", "agents"],
  "audit-your-year-with-ai": ["leadership"],
  "simplicity-in-architecture": ["leadership", "architecture-as-code"],
  "the-cost-of-unmanaged-context": ["context", "strategy"],
  "context-fragmentation": ["context", "agents"],
  "not-another-data-lake": ["context", "data"],
  "passive-capture": ["context", "provenance"],
  "self-describing-knowledge-open-knowledge-format": ["context", "governance", "provenance"],
}

export function getTag(slug: string) {
  return tags.find((t) => t.slug === slug)
}

/** Tags for one piece: the curated list if present, otherwise up to three pattern matches. */
export function tagsFor(slug: string, text: string): Tag[] {
  const picked = curated[slug]
  if (picked) return picked.map((s) => getTag(s)).filter((t): t is Tag => Boolean(t))
  return tags.filter((t) => t.pattern.test(text)).slice(0, 3)
}
