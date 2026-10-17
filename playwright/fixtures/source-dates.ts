// First-publication dates of sources that dated essays commonly cite, keyed by a URL fragment.
// Established during the October 2026 date-integrity audit. An essay may link a source only if the
// essay's effective date (updated, else published) is on or after the source's date.
// Add a row whenever a new time-sensitive source is cited.
export const sourceDates: { match: string; date: string; what: string }[] = [
  { match: "anthropic.com/engineering/demystifying-evals", date: "2026-01-09", what: "Anthropic, Demystifying evals for AI agents" },
  { match: "anthropic.com/engineering/effective-context-engineering", date: "2025-09-29", what: "Anthropic, Effective context engineering" },
  { match: "anthropic.com/engineering/building-effective-agents", date: "2024-12-19", what: "Anthropic, Building effective agents" },
  { match: "anthropic.com/news/model-context-protocol", date: "2024-11-25", what: "MCP announcement" },
  { match: "modelcontextprotocol.io", date: "2024-11-25", what: "Model Context Protocol site" },
  { match: "blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview", date: "2025-09-08", what: "Official MCP Registry preview" },
  { match: "a2a-a-new-era-of-agent-interoperability", date: "2025-04-09", what: "A2A announcement" },
  { match: "github.blog/ai-and-ml/generative-ai/spec-driven-development", date: "2025-09-02", what: "GitHub Spec Kit" },
  { match: "metr.org/blog/2025-07-10", date: "2025-07-10", what: "METR developer productivity study" },
  { match: "announcing-the-2025-dora-report", date: "2025-09-23", what: "DORA 2025 report" },
  { match: "announcing-the-2024-dora-report", date: "2024-10-22", what: "DORA 2024 report" },
  { match: "how-the-open-knowledge-format-can-improve-data-sharing", date: "2026-06-12", what: "Open Knowledge Format announcement" },
  { match: "okf-v0-2-adds-trust-signals", date: "2026-07-24", what: "OKF v0.2" },
  { match: "github.com/GoogleCloudPlatform/open-knowledge-format", date: "2026-08-14", what: "OKF repository" },
  { match: "code.visualstudio.com/updates/v1_107", date: "2025-12-10", what: "VS Code 1.107" },
  { match: "github.com/langchain4j/langchain4j/releases/tag/1.0.0", date: "2025-05-14", what: "LangChain4j 1.0.0" },
  { match: "aac.muthub.org", date: "2026-03-07", what: "Architecture-as-Code prototype" },
  { match: "github.com/muthub-ai/aac", date: "2026-03-07", what: "aac repository" },
  { match: "entire.io/blog/hello-entire-world", date: "2026-02-10", what: "Entire launch" },
  { match: "martinfowler.com/articles/harness-engineering", date: "2026-04-02", what: "Böckeler, Harness engineering" },
  { match: "context-engineering-coding-agents", date: "2026-02-05", what: "Böckeler, Context engineering for coding agents" },
  { match: "gartner.com/en/newsroom/press-releases/2025-06-25", date: "2025-06-25", what: "Gartner agentic AI cancellation prediction" },
]
