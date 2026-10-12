import type { Block, ThemeSlug } from "./site"

// Essays adapted from Muthu's LinkedIn posts and Medium articles.
// status "draft": shown only in local preview (pnpm dev) or when NEXT_PUBLIC_SHOW_DRAFTS=true.
// To publish: set status to "published" and fill `published` (YYYY-MM-DD).

export interface Essay {
  slug: string
  title: string
  summary: string
  theme: ThemeSlug
  status: "draft" | "published"
  published?: string
  updated?: string
  plannedFor: string
  source: string
  related: string[]
  body: Block[]
}

export const essays: Essay[] = [
  {
    slug: "architecture-that-runs",
    title: "Architecture that runs: why AI-era governance must be code",
    summary:
      "We gave engineers AI that writes code ten times faster but kept architecture moving at human speed. Governance has to become something that runs, not something you read.",
    theme: "governed-ai",
    status: "published",
    published: "2026-05-12",
    plannedFor: "Nov 2026",
    source: "Adapted from my LinkedIn posts of May 2 and May 10, 2026.",
    related: ["model-is-a-tool-harness-is-the-strategy", "spec-driven-development-for-regulated-industries"],
    body: [
      { type: "p", text: "We gave engineers AI that writes code ten times faster, but kept architecture moving at human speed. That mismatch is quietly breaking the software lifecycle." },
      { type: "p", text: "AI coding agents do not *understand* your enterprise. They optimize for completion. Without guardrails they produce code that violates policy, integrations that bypass approved patterns, and data flows that should not exist. At scale, that is not productivity. It is automated technical debt: higher spend and clogged release pipelines." },
      { type: "h2", text: "Architecture is still treated as documentation" },
      { type: "p", text: "For most of my career, architecture governance has meant documents, diagrams and review boards. Architecture was something you read, not something that runs. That model was slow but survivable when software changed a few times a quarter. It is obsolete now. Architecture has to become the system that drives how software is built." },
      { type: "quote", text: "Architecture is not what you say you'll build; it's what you actually allow into production." },
      { type: "h2", text: "What changes when architecture is machine-readable" },
      { type: "p", text: "To make the shift concrete, I built a prototype Architecture-as-Code platform. Five things change when architecture is machine-readable and version-controlled:" },
      {
        type: "ol",
        items: [
          "**The plan becomes executable.** Architecture lives in structured formats (YAML or JSON with a small DSL), not diagrams, and becomes a real source of truth.",
          "**Code becomes guided.** AI agents pull approved patterns through a machine-readable context layer, so they generate compliant code by design.",
          "**Reviews become deterministic.** Policy-as-code (OPA and Rego) enforces standards in CI/CD and replaces subjective manual reviews.",
          "**Operations become measurable.** The architecture model reports risk exposure, cost and technical debt in real time.",
          "**Drift becomes visible, and fixable.** What is running is continuously reconciled with what was designed, so divergence cannot hide.",
        ],
      },
      { type: "h2", text: "Policy without enforcement is just a suggestion" },
      { type: "p", text: "The delivery model matters as much as the rules. Coding assistants can now be tethered to an architecture repository through Model Context Protocol servers and validate code against the specification before it is committed. That is the mechanism required to scale architectural control across thousands of developers: governance in the terminal, not in a meeting." },
      { type: "p", text: "The shift is simple but profound: from architecture as documentation to architecture as runtime control, and from governance after the fact to governance at the point of creation." },
      { type: "bottomLine", text: "If AI is writing your code, your architecture cannot stay passive. It has to become the system the AI listens to. Last year's gains came from the developer's inner loop; this year's come from automating governance and delivery in the outer loop." },
    ],
  },
  {
    slug: "the-ai-native-sdlc",
    title: "The AI-native SDLC: from augmentation to transformation",
    summary:
      "We have commoditized typing code. The bottleneck is now creative problem solving, verification and trust. Six shifts that move teams from AI augmentation to transformation.",
    theme: "ai-native-sdlc",
    status: "published",
    published: "2026-07-28",
    plannedFor: "Nov 2026",
    source: "Adapted from my LinkedIn writing on the AI-native SDLC, 2026.",
    related: ["architecture-that-runs", "capture-the-why"],
    body: [
      { type: "p", text: "A few years ago, enterprises were debating whether AI could write a working function. Today, autonomous coding agents, background repair bots and AI assistance across every phase of delivery are standard practice for high-performing teams. We are not just coding faster. We are building differently." },
      { type: "p", text: "Six shifts separate teams that use AI to augment the old process from teams that transform it." },
      { type: "h2", text: "1. From productivity to creativity" },
      { type: "p", text: "We have effectively commoditized typing code. The bottleneck is no longer syntax speed; it is creative problem solving. The best teams reinvest the time AI saves into better solutions, not more code." },
      { type: "h2", text: "2. Compounded learning" },
      { type: "p", text: "Static knowledge management is giving way to a lifecycle that remembers. Every bug fixed and every pattern established should update the context the next agent works from, so the organization gets smarter with every commit." },
      { type: "h2", text: "3. Architecture as code" },
      { type: "p", text: "Stale diagrams on a wiki are finished. Architecture defined as executable code, machine-readable, version-controlled and testable, is enforced by agents before a human reviews the pull request. It finally connects the *what* of implementation to the *why* of business intent." },
      { type: "h2", text: "4. Tying the inner and outer loop together" },
      { type: "p", text: "The line between the developer's inner loop and the delivery outer loop is dissolving. Agents pull production context into the editor to prevent defects before they happen. We are not just shifting left; we are collapsing the feedback loop from days to minutes." },
      { type: "h2", text: "5. The rise of verification engineering" },
      { type: "p", text: "As the cost of generating code approaches zero, verification becomes the most expensive resource. The senior engineer's role shifts from builder to auditor: making sure the flood of agent-written code matches business intent and security standards." },
      { type: "h2", text: "6. A metrics reboot" },
      { type: "p", text: "Velocity metrics are table stakes but incomplete. DORA remains essential for stability, but developer experience measures such as SPACE and NPS matter more than ever. In an age of automated output, experience and flow are what keep human creativity alive." },
      { type: "h2", text: "The foundation is not code generation" },
      { type: "p", text: "The quality of an AI-native lifecycle will not be decided by how well an agent writes code. It will be decided by what happens around the code: a connected chain from intent to requirements, design, plan, code, tests, approvals and production learnings, versioned and traceable so people and agents work from the same context." },
      { type: "p", text: "That raises a harder question. What happens when the knowledge guiding the agent is outdated, incomplete, conflicting or unowned? AI will simply help us make the wrong decisions faster. Enterprise scale needs trusted, current engineering knowledge with clear owners; policies agents can understand and apply; guardrails that cannot be bypassed; evidence captured at every important step; and people accountable for judgment and risk." },
      { type: "bottomLine", text: "Code fast, verify hard, and keep the humans in the loop. The real investment is in trusted knowledge and controls that work inside the engineering flow, not an approval step bolted on at the end." },
    ],
  },
  {
    slug: "model-is-a-tool-harness-is-the-strategy",
    title: "Model is a tool, harness is the strategy",
    summary:
      "Handing an AI agent the keys to a production codebase without a harness is like putting a teenager in a sports car with no dual brakes. Guardrails and sensors make agents safe to scale.",
    theme: "governed-ai",
    status: "published",
    published: "2026-05-26",
    plannedFor: "Dec 2026",
    source: "Adapted from my LinkedIn post of May 23, 2026.",
    related: ["architecture-that-runs", "if-you-cant-prove-why-an-ai-wrote-it"],
    body: [
      { type: "p", text: "The best time to stop a bad commit is before it is written. Not after it is deployed." },
      { type: "p", text: "Enterprise teams are handing AI agents the keys to their production codebases. It is the equivalent of putting a teenager in a high-performance sports car with no dual brakes and no driving instructor." },
      { type: "p", text: "To scale agentic AI safely in the software lifecycle, we need to shift attention from model selection to **harness engineering**. A good harness does not just monitor AI. It governs it, with two deterministic mechanisms." },
      { type: "h2", text: "Guardrails: the lanes on the road" },
      { type: "p", text: "Before an agent writes a single line of code, the harness constrains it. Using Architecture-as-Code, for example, it blocks the agent from reaching unauthorized data or breaking established standards and policies. Guardrails prevent the accident before it happens." },
      { type: "h2", text: "Sensors: the automated brakes" },
      { type: "p", text: "When an agent does make a mistake, sensors react immediately. Automated validators catch the error, reject the commit and force the agent to correct itself. Human engineers should never spend their attention debugging an agent's basic failures." },
      { type: "h2", text: "Why the model is the least durable part" },
      { type: "p", text: "Models change every few months, and the right model for a task today will not be the right one next year. The context you give agents, the policies they must satisfy and the checks they must pass are what stay. Separate what the model infers from what the system actually permits, and a model upgrade never breaks your controls." },
      { type: "quote", text: "Model is a tool. Harness is the strategy." },
      { type: "bottomLine", text: "Most teams are racing to deploy. The winning teams are building the track first." },
    ],
  },
  {
    slug: "if-you-cant-prove-why-an-ai-wrote-it",
    title: "If you can't prove why an AI wrote it, you can't ship it",
    summary:
      "Shipping AI-generated code without tracking its reasoning is not velocity; it is unmanaged risk. Regulated teams need deterministic provenance for non-deterministic models, and AI bills of materials.",
    theme: "governed-ai",
    status: "published",
    published: "2026-02-24",
    plannedFor: "Dec 2026",
    source: "Adapted from my LinkedIn post of February 21, 2026.",
    related: ["model-is-a-tool-harness-is-the-strategy", "adopting-mcp-in-a-bank"],
    body: [
      { type: "p", text: "Shipping AI-generated code without tracking its reasoning is not velocity. It is unmanaged risk. If you cannot prove why an AI wrote a function, you cannot safely deploy it." },
      { type: "p", text: "When a remote agent introduces a vulnerability, tracing the logic back to the exact prompt is a serious compliance problem in a regulated environment. We need **deterministic provenance** for non-deterministic models, and it is time to move from standard software bills of materials to **AI bills of materials**." },
      { type: "h2", text: "The problem with autonomous agents" },
      { type: "p", text: "Remote and multi-agent platforms work asynchronously. They read codebases, run terminal commands and commit changes with little oversight. If an agent hallucinates a dependency or corrupts a configuration file mid-task, an ordinary rollback is not enough. You have to revert both the code and the agent's memory; otherwise it repeats the same mistake." },
      { type: "h2", text: "Three patterns for code provenance" },
      {
        type: "ol",
        items: [
          "**Attribution mapping.** A vendor-neutral record maps specific line ranges to the model and conversation that produced them, creating an audit trail for debugging after deployment.",
          "**Git-native session state.** The AI session itself becomes version-controlled metadata: prompts, reasoning and token usage stored alongside the code, so both the code and the agent's context can be recovered.",
          "**Centralized telemetry and governance.** Platform audit logs and code referencing satisfy baseline governance, but abstract step-by-step reasoning away from the version-control history.",
        ],
      },
      { type: "h2", text: "What I found testing it" },
      { type: "p", text: "I evaluated a Git-native checkpointing tool locally with Claude Code, using an auto-commit strategy. It created a checkpoint after every agent response, capturing system state and reasoning without manual effort. When the agent drifted and corrupted a file, one rewind command restored both the codebase and the agent's memory to the last known-good state." },
      { type: "bottomLine", text: "Provenance is not paperwork. It is what lets a regulated team say yes to agents: every change traceable to its intent, its model and the person who approved it." },
    ],
  },
  {
    slug: "spec-driven-development-for-regulated-industries",
    title: "Spec-driven development for regulated industries",
    summary:
      "For complex work in regulated sectors, prompt-to-code is becoming a non-starter. Make the specification the contract the AI must fulfil, then audit the spec instead of every generated line.",
    theme: "ai-native-sdlc",
    status: "published",
    published: "2025-10-21",
    plannedFor: "Dec 2026",
    source: "Adapted from my LinkedIn post of October 18, 2025.",
    related: ["architecture-that-runs", "the-ai-native-sdlc"],
    body: [
      { type: "p", text: "For those of us in highly regulated sectors, prompt-to-code is becoming a non-starter for complex projects. The risk, unpredictability and lack of verifiability are unacceptable." },
      { type: "p", text: "The scalable, responsible path is **spec-driven development**. The engineer's role shifts from writing boilerplate to designing rigorous, machine-readable specifications. The spec becomes the single source of truth: the contract the AI must fulfil." },
      { type: "quote", text: "It moves the source of truth away from the implementation and up to the specification itself." },
      { type: "h2", text: "How the lifecycle changes" },
      {
        type: "ul",
        items: [
          "**Design first.** We define the *what* in a formal spec: decomposed requirements, OpenAPI for APIs, schemas for data, types for functions. Precise inputs and outputs constrain the AI to a narrow, testable task.",
          "**AI implements.** Generative tools write the *how*: implementation code that provably adheres to the spec.",
          "**Humans validate.** Our effort moves to validating the spec and the AI's adherence to it, not to writing the code.",
        ],
      },
      { type: "h2", text: "Why it matters to the business" },
      {
        type: "ul",
        items: [
          "**Velocity.** Low-level, repetitive coding is automated.",
          "**Predictability.** The spec is a formal contract that sharply reduces ambiguity and hallucination.",
          "**Auditability.** The spec becomes the primary artifact for compliance and security review. It is far more efficient to audit a spec than thousands of lines of generated code.",
        ],
      },
      { type: "bottomLine", text: "Spec-driven development turns generative AI from a helpful but unreliable assistant into a disciplined, verifiable engineering tool. That is the balance regulated industries need between innovation and control." },
    ],
  },
  {
    slug: "capture-the-why",
    title: "Capture the why: the enterprise knowledge layer agents need",
    summary:
      "Most enterprise AI pilots hit the same wall: enterprise amnesia. Systems track the what, but the why behind decisions evaporates. Durable, governed context is the real foundation for agents.",
    theme: "data-ai-platforms",
    status: "published",
    published: "2026-07-14",
    plannedFor: "Jan 2027",
    source: "Adapted from my LinkedIn writing on living documentation and the enterprise knowledge layer.",
    related: ["the-ai-native-sdlc", "agent-first-data-architecture"],
    body: [
      { type: "p", text: "The real bottleneck in enterprise AI is not smarter models. It is the missing enterprise knowledge layer." },
      { type: "p", text: "Most enterprise AI pilots hit a wall for a simple reason: **enterprise amnesia**. An agent retrieves a little context, calls a tool and takes an action. Then the session closes. The context evaporates, the reasoning disappears, and the next agent starts from scratch." },
      { type: "h2", text: "What versus why" },
      { type: "p", text: "Traditional systems track the *what*: files, tickets, code diffs. The *why* (human intent, the policies evaluated, the alternatives ruled out) gets lost. Reading the code tells you what is happening. To enable genuinely agentic behavior, we have to capture intent and connect code to its business context: requirements, architecture decisions and the tribal knowledge that never made it into a document." },
      { type: "h2", text: "A living document that lies is worse than none" },
      { type: "p", text: "Tools that regenerate documentation from code on every commit are maturing fast, but published benchmarks show automated documentation is still far from fully accurate. A living document that is wrong is more dangerous than no documentation, because it poisons the source of truth. Human oversight and trust signals are not optional." },
      { type: "h2", text: "Design choices that make knowledge durable" },
      {
        type: "ul",
        items: [
          "**Decisions as first-class objects.** Capture decisions linked to their evidence, rules and outcomes, so they compound into queryable institutional memory instead of vanishing into logs.",
          "**Capture in flight, not after the fact.** A plausible explanation written afterwards is not evidence. Accountability means recording the state, inputs and policy checks while the decision happens.",
          "**Deterministic policy gates.** Let models handle messy language, but enforce critical rules deterministically, and keep what the model infers separate from what the system permits.",
          "**Decouple reasoning from durable truth.** Models change faster than enterprise architecture. Relationships, entity maps and decision histories are permanent, so a model upgrade should never break what the organization knows.",
        ],
      },
      { type: "bottomLine", text: "If your agent cannot produce the source evidence, policy version, tool actions and decision context behind a high-stakes action, you do not yet have an auditable agent. The teams that win will be the ones that build durable memory, not just the ones running the newest models." },
    ],
  },
  {
    slug: "adopting-mcp-in-a-bank",
    title: "Adopting MCP in a bank: the risks to solve first",
    summary:
      "The Model Context Protocol standardizes how agents connect to tools and data. It does not solve governance. Four risk areas to address before agents get tools in a regulated institution.",
    theme: "governed-ai",
    status: "published",
    published: "2025-04-22",
    updated: "2026-06-16",
    plannedFor: "Jan 2027",
    source: "Adapted from my LinkedIn post of April 18, 2025, updated for 2026.",
    related: ["if-you-cant-prove-why-an-ai-wrote-it", "model-is-a-tool-harness-is-the-strategy"],
    body: [
      { type: "p", text: "The Model Context Protocol (MCP) aims to standardize how AI agents connect to external tools and data sources. After months of discovery on what it means for highly regulated sectors like banking, my view is simple: MCP standardizes the connection, but it does not solve the governance." },
      { type: "p", text: "For architects responsible for non-deterministic systems, four areas need attention before deployment." },
      { type: "h2", text: "1. Security" },
      { type: "p", text: "Beyond ordinary API risk, MCP implementations have shown exposure to command injection, tool poisoning through indirect prompt injection, silent tool redefinition and cross-server shadowing. These need deliberate mitigations, not just standard security practice." },
      { type: "h2", text: "2. Compliance and auditability" },
      { type: "p", text: "Banking supervisors expect data lineage, explainability and auditable decisions. Meeting those expectations for actions an agent takes through MCP is still a hard problem." },
      { type: "h2", text: "3. Data privacy and residency" },
      { type: "p", text: "Sensitive financial data handled through MCP demands strict data minimization and purpose limitation, plus residency requirements that add real implementation work." },
      { type: "h2", text: "4. Protocol maturity and operational risk" },
      { type: "p", text: "The ecosystem is evolving quickly. Integration with legacy systems, enterprise-scale performance and maintenance overhead are real operational challenges. The arrival of official and private registries is a welcome step: enterprises can assess public servers and maintain their own governed sub-registry." },
      { type: "h2", text: "A governance-first approach" },
      { type: "p", text: "Granting agents autonomous access to tools and sensitive data requires defense in depth. Build guardrails, integrate MCP into existing model risk management and third-party risk frameworks, and monitor comprehensively before using it in sensitive financial contexts. Vet every server, demand transparency, and embed governance from day one." },
      { type: "bottomLine", text: "The security concerns are real, but solvable. Adopting MCP in a bank is about architecting trust, not just connectivity." },
    ],
  },
  {
    slug: "agent-first-data-architecture",
    title: "Agent-first data architecture: five principles",
    summary:
      "We are moving from data systems that serve human queries to ecosystems that enable autonomous machine action. Five principles for designing data platforms where agents are first-class users.",
    theme: "data-ai-platforms",
    status: "published",
    published: "2025-09-30",
    plannedFor: "Feb 2027",
    source: "Adapted from my LinkedIn posts of September 2025 and my Medium writing on lakehouse architecture.",
    related: ["capture-the-why", "adopting-mcp-in-a-bank"],
    body: [
      { type: "p", text: "As we design data platforms for AI agents, our foundational principles have to evolve. We are moving from systems that serve human queries to ecosystems that enable autonomous machine action." },
      { type: "h2", text: "1. Agent-centricity" },
      { type: "p", text: "Treat agents as first-class citizens of the architecture. Design interfaces and protocols for machines first, not as an afterthought to human dashboards." },
      { type: "h2", text: "2. Autonomous interaction" },
      { type: "p", text: "Agents need to discover, understand and use data without a person in the loop for every request. The platform has to supply rich context for reasoning, not just rows." },
      { type: "h2", text: "3. Elasticity and concurrency" },
      { type: "p", text: "Engineer for massive, parallel workloads. The platform must scale automatically and handle simultaneous requests from thousands of independent agents." },
      { type: "h2", text: "4. Embedded semantics" },
      { type: "p", text: "Move beyond raw data. Serve knowledge graphs and ontologies so agents understand relationships and meaning, not just column names." },
      { type: "h2", text: "5. Automated governance" },
      { type: "p", text: "Agent-specific identity, fine-grained access control and complete observability. Auditing and compliance have to run at machine speed, because agents do." },
      { type: "h2", text: "Why the lakehouse matters here" },
      { type: "p", text: "For years we treated operational and analytical data as separate worlds: one for business intelligence, another for ambitious AI projects. That divide added complexity, governance risk and drag. Unifying them on an open lakehouse, with one governed source of truth, is what makes agent-first access practical. It also simplifies compliance, because there is one place to enforce policy." },
      { type: "bottomLine", text: "The goal is an active ecosystem where agents can reason and act safely on governed data, directly driving business outcomes. Start by asking which of these five principles your platform violates today." },
    ],
  },
]

export interface Note {
  slug: string
  title: string
  summary: string
  status: "draft" | "published"
  published?: string
  plannedFor: string
  source: string
  body: Block[]
}

export const notes: Note[] = [
  {
    slug: "living-documentation-trust-gap",
    title: "Living documentation and the human trust gap",
    summary: "Tools can now regenerate docs from code on every commit. They describe what the code does, not why it exists.",
    status: "published",
    published: "2025-11-19",
    plannedFor: "Nov 2026",
    source: "Adapted from my LinkedIn post of November 17, 2025.",
    body: [
      { type: "p", text: "Open-source frameworks that regenerate documentation on every commit are a real step forward, and I have used tools in this space for some time. But accuracy is still well short of what a regulated enterprise can rely on without review." },
      { type: "p", text: "The race is not about cleaner wikis. It is about an enterprise knowledge graph that maps code to business intent. Until we close the trust gap, we are just building faster ways to misunderstand our own systems." },
    ],
  },
  {
    slug: "from-pair-programming-to-fleet-management",
    title: "From pair programming to fleet management",
    summary: "Editors now orchestrate local, background and cloud agents. Automation is doing things right; orchestration is doing the right things.",
    status: "published",
    published: "2025-12-15",
    plannedFor: "Dec 2026",
    source: "Adapted from my LinkedIn post of December 13, 2025.",
    body: [
      { type: "p", text: "The bottleneck in an AI-augmented lifecycle is often not model capability but the friction of context switching. Multi-agent orchestration in the editor changes that: a local agent for strategy and quick answers, background agents working in isolated worktrees, and cloud agents for heavy lifting, all grounded in shared context." },
      { type: "p", text: "For leaders the value is asynchronous execution. Build the factory, not just the widget." },
    ],
  },
  {
    slug: "ai-is-an-amplifier",
    title: "AI is an amplifier, not a silver bullet",
    summary: "AI magnifies what is already there. Platform engineering and clear policy decide whether that is strength or dysfunction.",
    status: "published",
    published: "2025-09-24",
    plannedFor: "Dec 2026",
    source: "Adapted from my LinkedIn post of September 23, 2025.",
    body: [
      { type: "p", text: "The 2025 DORA research confirms what many of us saw: AI does not fix a team, it amplifies it. A high-quality internal platform is the biggest factor in turning individual gains into organizational performance." },
      { type: "p", text: "Clear AI policy is a blueprint, not a blockade; it gives teams the safety to experiment. And unless core workflows like code review and deployment change too, faster coding only creates more downstream chaos." },
    ],
  },
]
