import type { Essay, Note } from "./essays"

// Second batch of essays, adapted from LinkedIn posts (2025–2026), Medium articles and the public
// Architecture-as-Code prototype at aac.muthub.org. All are drafts until Muthu approves them.

export const moreEssays: Essay[] = [
  {
    "slug": "inside-an-architecture-as-code-platform",
    "title": "Inside an Architecture-as-Code platform: a C4 walkthrough",
    "summary": "The open prototype at aac.muthub.org, described in its own notation and validated by its own rules. A level-by-level C4 walkthrough of the design decisions that mattered, and what I would change before an enterprise ran it.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2026-06-09",
    "updated": "2026-10-12",
    "plannedFor": "Nov 2026",
    "source": "Based on my public prototype at aac.muthub.org, its source at github.com/muthub-ai/aac, and my LinkedIn post of May 2, 2026.",
    "related": [
      "architecture-that-runs",
      "model-is-a-tool-harness-is-the-strategy"
    ],
    "body": [
      {
        "type": "p",
        "text": "**The best test of an architecture platform is whether it can describe itself, so I made mine do it.** [aac.muthub.org](https://aac.muthub.org) is a working prototype of an architecture control plane: enterprise architecture held as version-controlled YAML that drives validation, policy, diagrams and an executive scorecard. To write this piece I modeled the platform in its own notation, ran that model through the same JSON Schema and the same five compliance rules it applies to every other system, and drew the diagrams below from it. It passed. The [source is public](https://github.com/muthub-ai/aac) if you want to check my work."
      },
      {
        "type": "p",
        "text": "I used Simon Brown's [C4 model](https://c4model.com/) because most engineers already read it fluently: context, containers, components, code. Each level answers a different question for a different reader, and the walkthrough follows that order. The interesting part is less what each box is than why it sits where it does."
      },
      {
        "type": "h2",
        "text": "Level 1: three people, one source of truth, and an agent"
      },
      {
        "type": "figure",
        "name": "c4-context"
      },
      {
        "type": "p",
        "text": "The context view shows who the platform serves. Enterprise architects author standards, patterns and models and review exceptions. Application engineers design and change systems. Technology leaders read conformance and risk. Around them sit GitHub, which hosts everything, the npm registry, product teams' own repositories, and an AI coding assistant in the engineer's IDE."
      },
      {
        "type": "p",
        "text": "The arrow I would point a review board at is the one from the AI assistant into the platform. Two years ago I would have drawn the engineer as the only consumer of architecture standards. Today a large share of design decisions are made, or at least drafted, by an agent in the IDE, and an agent that cannot read your standards will happily invent its own. Treating the agent as a first-class user at Level 1 is the design decision everything else follows from."
      },
      {
        "type": "h2",
        "text": "Level 2: one repository, seven containers"
      },
      {
        "type": "figure",
        "name": "c4-container"
      },
      {
        "type": "p",
        "text": "Inside the boundary there are seven containers, and six of them are projections of the seventh. The Architecture Repository holds system models, patterns, standards, waivers and the schemas that define them. Everything else reads from it: the governance pipeline on every pull request, the web dashboard at build time, the documentation microsite as generated pages, the CLI through the published schemas, the MCP server through a local clone, and the policy engine as tested Rego."
      },
      {
        "type": "p",
        "text": "Three decisions at this level carry most of the weight."
      },
      {
        "type": "ul",
        "items": [
          "**The dashboard has no database.** It reads the repository at build time through server components and is rebuilt when main changes. There is nothing at runtime that can drift from Git, which is the property you want from a governance view. The cost is that the dashboard is only as fresh as the last merge, and for architecture that is the right cadence.",
          "**The CLI validates against published schemas, not local copies.** It fetches them from the repository's public URL with ETag caching and falls back to the cache when offline. A product team's pipeline therefore validates against the same contract the platform publishes, and a schema change reaches every team on its next run without anyone upgrading a package.",
          "**Waivers live next to the standards they bend.** An exception is a versioned record with its risk, compensating controls, financial impact, approver, remediation plan and expiry date. Once exceptions are data, the scorecard can report exception debt the same way it reports technical debt, and a pipeline can check an expiry date instead of relying on someone's memory."
        ]
      },
      {
        "type": "p",
        "text": "The scorecard is the payoff for leaders. Conformance, risk posture, remediation velocity and pattern reuse are computed from the artifacts, not assembled for a meeting. The figures on the live site come from a fictional sample portfolio, so ignore the values; the point is that the number is a query and it changes when a pull request merges."
      },
      {
        "type": "h2",
        "text": "Level 3: governance as an API for agents"
      },
      {
        "type": "figure",
        "name": "c4-component-mcp"
      },
      {
        "type": "p",
        "text": "I drew component views for only two containers, and that restraint is deliberate. The C4 site itself says to [create component diagrams only when they add value](https://c4model.com/diagrams/component) and to automate them for long-lived documentation. The platform's own schema stops at containers for the same reason: components change with every refactor, so they belong to the code, not to the model."
      },
      {
        "type": "p",
        "text": "The MCP server is the container that earns a Level 3 view, because its internal shape is the governance contract for agents. Built on the open [Model Context Protocol](https://modelcontextprotocol.io/introduction), it separates three kinds of capability. **Resources** are read-only views of the repository: systems, standards, patterns, schemas and, importantly, `aac://waivers/active`, which is meant to give an agent only the exceptions currently in force, so it does not treat a pending or rejected waiver as permission. **Tools** act: validate a document, run the five compliance rules, scaffold a waiver. **Prompts** are guided workflows for designing a new system or requesting an exception."
      },
      {
        "type": "p",
        "text": "The distinction matters for risk. Reading a standard is harmless; writing a waiver is a governance act. Keeping them in different MCP primitives means an enterprise can grant an agent the first without the second, and the `scaffold_waiver` tool only drafts a file. The exception still becomes real through a reviewed pull request, the same as one written by a person."
      },
      {
        "type": "figure",
        "name": "c4-component-web"
      },
      {
        "type": "p",
        "text": "The web container's components show the other half of the design: pure functions for parsing, validation, view filtering, layout and export, wrapped by a thin layer of React. The same parser and layout code also run in the pipeline's diagram build, which is why a diagram in a pull-request comment and the one in the dashboard agree."
      },
      {
        "type": "h2",
        "text": "Level 4: draw code only where an invariant lives"
      },
      {
        "type": "figure",
        "name": "c4-code-sync"
      },
      {
        "type": "p",
        "text": "C4's guidance on the code level is blunt: [it is optional and usually not recommended](https://c4model.com/diagrams/code), because an IDE can generate it on demand. I agree, with one exception. Draw Level 4 where the design depends on an invariant that is easy to break and hard to see in a diff."
      },
      {
        "type": "p",
        "text": "The diagram editor has one. Engineers can edit YAML or drag boxes on a canvas, and each side updates the other. Without a guard that is an infinite loop: the editor updates the graph, the graph rewrites the YAML, the YAML updates the graph. A single field in the store, `syncSource`, records which side started the change, and each update path returns early if the other side owns it. It is three lines of code that the whole feature depends on, and it is exactly the kind of detail a new contributor would remove while tidying up. That is the case for a code diagram."
      },
      {
        "type": "h2",
        "text": "A governed change, end to end"
      },
      {
        "type": "figure",
        "name": "c4-dynamic-change"
      },
      {
        "type": "p",
        "text": "The dynamic view is the one I show executives, because it answers the question they actually have: what happens between someone proposing a change and that change being trusted? An engineer, or an agent working through the MCP server, edits the YAML and validates it locally. A pull request starts the pipeline: a lint and test gate, then parallel stages for schema validation, the five compliance rules, OPA policy tests and catalog and diagram generation. The pipeline comments diagram previews on the pull request, an architect reviews a diff with evidence attached, and the merge publishes the microsite and rebuilds the dashboard."
      },
      {
        "type": "p",
        "text": "The pull request is the architecture review board now. A person still approves, but they approve a change with test results, not a slide deck. Nygard's case for [small decision records kept with the work](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) applies directly: the reasoning travels with the change."
      },
      {
        "type": "h2",
        "text": "What I would change before an enterprise ran it"
      },
      {
        "type": "p",
        "text": "Modeling the platform in its own notation also exposed its weak spots, and I would rather name them than have a reviewer find them."
      },
      {
        "type": "ul",
        "items": [
          "**Validation lives in three places.** The CLI and the MCP server each validate with JSON Schema, and the web app validates with Zod. The five compliance rules exist in the pipeline script and again in the MCP tool. They agree today; nothing guarantees they will tomorrow. The fix is one rules package that the pipeline, the MCP server and the editor all import.",
          "**Some rules infer intent from free text.** The rule that stops a frontend talking directly to a database decides what counts as a frontend from keywords in tags and technology names. That is fine for a prototype and fragile at scale. An enterprise version needs explicit types in the schema, enforced by the schema.",
          "**Expiry is recorded, not enforced.** Every waiver carries an expiration date, but today a waiver stops counting only when someone changes its status. The active-waivers resource and the pipeline should compare the date themselves, so a lapsed exception stops granting permission on the day it lapses.",
          "**Policy lives in two languages.** Structural rules run as TypeScript and infrastructure rules run as Rego in [Open Policy Agent](https://www.openpolicyagent.org/docs). Two engines are defensible, but the boundary should be written down, or teams will add the next rule wherever is convenient."
        ]
      },
      {
        "type": "p",
        "text": "The organizational gaps matter more than the technical ones. Never import a system catalog wholesale; seed it from the systems that change most and require an owner for every record. Run each new rule in report-only mode before it blocks anything, because a rule that cries wolf in its first month loses its audience for a year. And fund the control plane as a product with a small team and a backlog. Architecture-as-Code maintained as a side project decays into one more stale repository."
      },
      {
        "type": "monday",
        "items": [
          "Ask your architecture team to model one platform they own in C4 YAML and run it through the same checks they apply to product teams.",
          "Inventory where your architecture rules are enforced today and count how many enforce the **same** rule in different code.",
          "List every place an AI coding agent can read your standards, and the places where it cannot.",
          "Pick one rule to run in report-only mode for a month before it blocks a release."
        ]
      },
      {
        "type": "p",
        "text": "If you run architecture in a regulated enterprise, I would like to know: could your platform pass its own rules?"
      },
      {
        "type": "bottomLine",
        "text": "An architecture platform earns trust when it holds itself to its own rules. Model it in its own notation, draw component and code views only where they explain a real decision, and give AI agents the same governed access to standards that people have."
      }
    ]
  },
  {
    "slug": "designing-an-enterprise-mcp-registry",
    "title": "Designing an enterprise MCP registry: the control point agents need",
    "summary": "As agents multiply, every enterprise needs an authoritative directory of the tools they can call. What a governed MCP registry must do, what the official registry leaves to you, and the mistakes to avoid.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2025-09-18",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn posts of April 3, 2025 and September 8 and 16, 2025.",
    "related": [
      "adopting-mcp-in-a-bank",
      "inside-an-architecture-as-code-platform"
    ],
    "body": [
      {
        "type": "p",
        "text": "**An enterprise MCP registry is where agent governance stops being a policy document and becomes something the runtime enforces.** In April 2025, before any official specification existed, I sketched what a large enterprise would need from a directory of Model Context Protocol servers. Since then [the official MCP Registry has launched in preview](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/) and GitHub has shipped [internal registry and allowlist controls for Copilot](https://github.blog/changelog/2025-09-12-internal-mcp-registry-and-allowlist-controls-for-vs-code-insiders/). Both confirm the core idea. Both leave the hardest enterprise questions to us."
      },
      {
        "type": "h2",
        "text": "Why a directory turns into a control plane"
      },
      {
        "type": "p",
        "text": "The obvious reason to build a registry is discovery. Without one, every developer edits a config file by hand and points it at whatever server they found in a forum thread. That works for ten people. At the scale of a large bank it produces hundreds of unreviewed connections and no inventory."
      },
      {
        "type": "p",
        "text": "The less obvious reason matters more. A registry is the one place where you can say with confidence which tools exist in your environment. GitHub's design makes the point concrete: administrators point Copilot at an internal registry, and a registry-only policy blocks unlisted servers at runtime (enforced in VS Code Insiders today, with the stable release to follow). Discovery and allowlisting become the same artifact. Once that is true, security review, third-party risk assessment and data classification share a single gate, and the gate is enforced by software instead of by memo."
      },
      {
        "type": "figure",
        "name": "mcp-gateway"
      },
      {
        "type": "h2",
        "text": "What the official registry gives you, and what it leaves out"
      },
      {
        "type": "p",
        "text": "The upstream registry describes itself as an open catalog and API for publicly available MCP servers. It holds self-reported metadata, moderates through community reports and maintainer denylisting, and publishes an open API specification so others can build compatible sub-registries. Its authors say plainly that enterprises with strict security requirements should run private sub-registries that use the public catalog as their upstream."
      },
      {
        "type": "p",
        "text": "I think that is the right division of labor. A public registry can tell you that a server exists and who claims to publish it. It cannot tell you whether that server is safe to connect to customer data. That judgment belongs to you, and the private registry is where you record it, with the evidence attached."
      },
      {
        "type": "p",
        "text": "One design question comes up early: should the internal registry only list servers, or should traffic flow through a gateway it controls? I lean toward both, in stages. A listing-only registry is quick to stand up and gives you an inventory. A gateway lets you enforce the pinned version, inspect tool definitions as they are served, and cut off a server in minutes rather than waiting for every client to refresh. For low-risk internal tools, listing is enough. For anything that touches regulated data or can move money, I want the gateway in the path, because a registry entry that clients can ignore is advice, not control."
      },
      {
        "type": "h2",
        "text": "Requirements I would hold a design to"
      },
      {
        "type": "p",
        "text": "My original list of discovery, trust, ecosystem support and metadata still holds. After watching the ecosystem grow through most of this year, I would sharpen it into six requirements."
      },
      {
        "type": "ol",
        "items": [
          "**Authenticated publishing.** Only a verified owner can register, update, deprecate or retire a server, and every change is attributable to a person or pipeline.",
          "**Capabilities declared against a taxonomy.** Servers state what they do (read a customer profile, initiate a payment) in terms a policy engine understands, not in free text a model interprets.",
          "**Pinned, immutable versions.** An approval attaches to a specific version and a hash of its tool definitions. A new description is a new version and needs review.",
          "**Trust tiers clients can query.** Community, internally reviewed and approved for regulated data are different states, and clients filter on them.",
          "**Data sensitivity ceilings.** Each entry records the highest classification of data the server can return, so an agent's tools can be matched to its clearance.",
          "**Lifecycle and retirement.** Deprecation is announced in the registry, clients are warned, and a retired server stops resolving."
        ]
      },
      {
        "type": "p",
        "text": "Pinning deserves the most attention. [Invariant Labs showed](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) that a malicious server can change a tool's description after a client has approved it. A registry that approves servers by name rather than by content will keep serving the poisoned version without noticing. Supply chain risk, which OWASP ranks third in its [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/), arrives through updates at least as often as through first installs."
      },
      {
        "type": "p",
        "text": "In practice, an internal entry ends up looking something like this:"
      },
      {
        "type": "code",
        "lang": "yaml",
        "text": "name: payments-readonly\nversion: 2.3.1\ntool_definitions_sha256: 9f2c...e41a\npublisher: team-payments-platform\ntrust_tier: approved-regulated\ncapabilities: [payment.status.read, payment.history.read]\ndata_ceiling: confidential\nupstream: null   # internal server, no public source\nstatus: active"
      },
      {
        "type": "h2",
        "text": "The agent registry is the other half"
      },
      {
        "type": "p",
        "text": "A tool registry answers what can be called. An auditor will also ask who called it. That needs a matching registry of agents, each with an owner, a purpose, an identity, the tool grants it holds, and the model and prompt versions it runs. Google's [Agent2Agent protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) points in a similar direction with its Agent Card, a JSON description an agent publishes so other agents can find out what it does. Inside an enterprise, the same idea becomes an inventory record with an accountable owner."
      },
      {
        "type": "p",
        "text": "Join the two registries and you can answer the questions that come up in every serious review: which agents exist, which tools each may call, who approved the grant, and which version of both was running when a given decision was made. In my experience that last question separates a demo from a production system. If you cannot answer it, sooner or later you will have to switch something off to find out."
      },
      {
        "type": "h2",
        "text": "Three mistakes I would avoid"
      },
      {
        "type": "p",
        "text": "The first is building the registry as a wiki page. If clients do not resolve servers through it at runtime, it drifts from reality within a quarter and nobody trusts it. The second is treating approval as a one-time event, when the real risk arrives with each update. The third is routing every review through one central team. The registry should hold the policy and the evidence. Domain teams should own their servers, automated checks should handle most of the gating, and people should review the exceptions."
      },
      {
        "type": "p",
        "text": "I would also not wait for the ecosystem to settle. The specifications are open and the APIs are documented, and a basic internal registry that mirrors approved upstream entries is a modest piece of engineering. The operating model around it takes longer to build, which is the best reason to start now."
      },
      {
        "type": "p",
        "text": "Every enterprise will make different calls about what belongs in its registry and what stays out. I am curious where others are starting: what is the first thing you would want your MCP registry to block?"
      },
      {
        "type": "bottomLine",
        "text": "MCP standardizes the connection. A governed registry decides which connections are allowed. Build the second before you scale the first."
      }
    ]
  },
  {
    "slug": "three-architectures-for-ai-coding-agents",
    "title": "Three architectures for AI coding agents, and how enterprises should choose",
    "summary": "Platform-embedded, sandboxed and evolutionary coding agents each earn trust in a different way. Then the editor became a fleet manager. Choose and govern agents by how their work will be verified.",
    "theme": "ai-native-sdlc",
    "status": "published",
    "published": "2025-12-16",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn posts of May 19, 2025 and December 13, 2025.",
    "related": [
      "the-ai-native-sdlc",
      "model-is-a-tool-harness-is-the-strategy"
    ],
    "body": [
      {
        "type": "p",
        "text": "**Coding agents should be chosen by how their work gets verified, not by which model sits underneath.** Within one week in May 2025, Google DeepMind, OpenAI and GitHub each shipped a serious coding agent. They shared a goal, taking real software work off engineers' plates, but they rested on different architectural philosophies. Seven months on, I think those differences matter more to enterprises than the benchmark race does."
      },
      {
        "type": "p",
        "text": "What separates them is less about capability and more about trust. Each design answers the question \"why should I believe this change is safe?\" in its own way, and that answer decides where it fits in a regulated firm."
      },
      {
        "type": "h2",
        "text": "Platform-embedded: trust the controls you already have"
      },
      {
        "type": "p",
        "text": "[GitHub's Copilot coding agent](https://github.blog/news-insights/product-news/github-copilot-meet-the-new-coding-agent/), announced on May 19, 2025, lives inside the platform where code already flows. You assign it an issue. It spins up an environment on GitHub Actions, uses retrieval over code search for context, can be extended with Model Context Protocol servers, and pushes commits to a draft pull request."
      },
      {
        "type": "p",
        "text": "The interesting part is governance. The agent can only push to branches it created. The developer who asked for the pull request cannot approve it. Its pull requests need human approval before CI/CD workflows run, and existing rulesets still apply. For a bank this is the easiest model to adopt, because it inherits maker/checker controls the firm has already proven. The limit is that it is only as good as those controls. If branch protection and review discipline are weak, the agent amplifies the weakness."
      },
      {
        "type": "h2",
        "text": "Sandboxed execution: trust the evidence"
      },
      {
        "type": "p",
        "text": "[OpenAI's Codex](https://openai.com/index/introducing-codex/), launched as a research preview on May 16, 2025, takes a different stance. Each task runs in its own isolated cloud sandbox preloaded with the repository, and at launch internet access was switched off during execution. The agent works on many tasks in parallel and returns its changes with citations to terminal logs and test output as evidence of what it did. Repositories can carry an AGENTS.md file telling it which tests to run and which conventions to follow."
      },
      {
        "type": "p",
        "text": "Here trust comes from isolation plus proof. That suits enterprises with strong test suites and a habit of asking for evidence. It suits poorly the codebases where tests are thin, because the evidence then proves little. A green test run on an untested module is a confident answer to the wrong question."
      },
      {
        "type": "h2",
        "text": "Evolutionary search: trust the evaluator"
      },
      {
        "type": "p",
        "text": "[Google DeepMind's AlphaEvolve](https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/), published on May 14, 2025, is the outlier. It pairs Gemini Flash for breadth with Gemini Pro for depth, scores every candidate program with automated evaluators, and evolves the best ones. DeepMind reports it found a scheduling heuristic that recovers on average 0.7% of Google's worldwide compute, and a kernel speedup that cut Gemini's training time by 1%."
      },
      {
        "type": "p",
        "text": "The design only works where a solution can be scored automatically, and that is the lesson for enterprises. Most business software lacks a precise fitness function, so evolutionary search is not a general coding assistant. Where you do have one (query cost, batch run time, scoring latency, cloud spend) it deserves serious attention, because the machine can explore far more options than a team ever could."
      },
      {
        "type": "h2",
        "text": "Then the editor became a fleet manager"
      },
      {
        "type": "p",
        "text": "By December the question had shifted from which agent to how many. [VS Code's November 2025 release](https://code.visualstudio.com/updates/v1_107), version 1.107, makes the hierarchy explicit. A local agent keeps running in the background and is a natural place to plan the work. From there a task can be handed off to a background agent, which can run in its own Git worktree so several can work without clobbering each other's files, or to a cloud agent that executes it autonomously. In my own use the local agent acts as the manager and the others as workers, and shared repository instructions keep them from inventing the project structure."
      },
      {
        "type": "p",
        "text": "Worktrees solve file conflicts. They do not solve semantic conflicts. Two agents can each produce a clean, passing change that is wrong in combination: one renames a field while another adds a new consumer of the old name. The merge step, and the person who owns it, becomes the real integration point. Fleets move the bottleneck from writing code to merging it."
      },
      {
        "type": "p",
        "text": "This changes the job of the engineer in the editor. Instead of writing a feature, they break it into tasks that agents can do in parallel without stepping on each other, then review and integrate the results. That is closer to a tech lead's work than a developer's, and most teams have not been trained for it. In my experience the engineers who thrive here are the ones who were already good at writing clear tickets."
      },
      {
        "type": "quote",
        "text": "Automation is doing things right. Orchestration is doing the right things."
      },
      {
        "type": "h2",
        "text": "One change, three agents"
      },
      {
        "type": "p",
        "text": "A worked example makes the trade-offs concrete. Say a shared logging library has a flaw, and forty services need to move to a patched version that also changes one method signature. Every large estate has a backlog of chores like this."
      },
      {
        "type": "p",
        "text": "A platform-embedded agent treats it as forty issues and forty draft pull requests, each passing through the branch protection and reviewers that service already has. The governance is familiar, and the cost lands on reviewers: forty approvals, many for near-identical diffs. A sandboxed agent runs the forty upgrades in parallel and returns each with its test log. Where a service has real coverage around logging, that evidence is worth more than a reviewer's skim. Where it has none, the green result tells you the code compiles and little else. Evolutionary search has nothing to offer here, because there is no score to improve, only a migration that is right or wrong."
      },
      {
        "type": "p",
        "text": "In practice the answer mixes them. Let the sandboxed agent do the work and attach evidence, route the result through existing review, and spend human attention on the few services where tests are thin. The choice was made per service, by looking at its verification, rather than once for the whole firm by looking at a vendor slide."
      },
      {
        "type": "h2",
        "text": "What enterprises should take from this"
      },
      {
        "type": "ul",
        "items": [
          "**Do not standardize on one agent.** The architectures are converging but not identical, and the best tool varies by task. A multi-vendor setup behind one governed gateway keeps options open as the market shifts.",
          "**Choose by verification path.** Use platform-embedded agents where your review controls are strong, sandboxed agents where your tests are strong, and evolutionary search only where you can score outcomes automatically.",
          "**Govern the harness, not the vendor.** Context, guardrails, sandboxing, identity and evidence capture are what make any agent safe. Own those layers so that switching vendors is a configuration change.",
          "**Give every agent its own identity.** Each agent action should be attributable to a non-human identity with scoped permissions, so the audit trail shows what the agent did and which person asked it to.",
          "**Design for asynchronous work.** Background and cloud agents change how teams plan and review. Maker/checker controls, merge ownership and audit trails have to move with them."
        ]
      },
      {
        "type": "p",
        "text": "[Anthropic's guidance on building agents](https://www.anthropic.com/research/building-effective-agents) is a useful brake on all of this: start with the simplest solution that works, and add autonomy only when it pays for itself. It also notes that code suits agents well because solutions can be verified through automated tests. I read that as a condition, not a compliment. Agents are safest exactly where your verification is strongest, so the order of investment is tests and controls first, autonomy second."
      },
      {
        "type": "monday",
        "items": [
          "Rate your twenty most active repositories on test coverage and review discipline, then map each to the agent architecture it can safely supervise.",
          "Issue a scoped non-human identity to each coding agent in your pilot and confirm its actions appear in audit logs.",
          "Run one multi-service backlog chore through a sandboxed agent, routing its evidence into your existing pull request review.",
          "Name a **merge owner** for every team running parallel background agents."
        ]
      },
      {
        "type": "p",
        "text": "The firms that get this right will treat coding agents as a governed workforce with clear supervisors rather than as a smarter autocomplete. Which of your codebases have the test coverage and review discipline to supervise a fleet of agents today?"
      },
      {
        "type": "bottomLine",
        "text": "Stop waiting, start delegating, and build the factory rather than the widget. Pick agents by how you will verify them, and own the harness that makes any of them safe."
      }
    ]
  },
  {
    "slug": "securing-ai-agents-identity-not-secrets",
    "title": "Securing AI agents: identity, not secrets",
    "summary": "Agents act on their own, at machine speed, across many systems. Static credentials and perimeter thinking don't hold up. Attested identity, explicit delegation and policy enforced outside the model do.",
    "theme": "governed-ai",
    "status": "published",
    "published": "2025-05-29",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn posts of May 11 and May 27, 2025.",
    "related": [
      "adopting-mcp-in-a-bank",
      "designing-an-enterprise-mcp-registry"
    ],
    "body": [
      {
        "type": "p",
        "text": "**Every AI agent should be treated as a workload with its own verifiable identity, and nothing it does should depend on a secret someone pasted into a config file.** That premise sounds obvious. Most agent deployments I see still violate it."
      },
      {
        "type": "p",
        "text": "Agents act on their own, at machine speed, across many systems. Static API keys and network perimeters were designed for a world where a person sat behind each request, or a service did one predictable thing. Neither assumption holds anymore. Last October [Gartner predicted that by 2028, 25% of enterprise breaches will be traced back to AI agent abuse](https://www.gartner.com/en/newsroom/press-releases/2024-10-22-gartner-unveils-top-predictions-for-it-organizations-and-users-in-2025-and-beyond), from both external and malicious internal actors. My guess is that a good share of those breaches will start with an identity problem: a credential that was too broad, too long-lived or never tied to a specific agent."
      },
      {
        "type": "h2",
        "text": "Agents are workloads, so give them workload identity"
      },
      {
        "type": "p",
        "text": "An agent that reads data and calls tools is a workload acting on someone's behalf. We already have a mature pattern for workloads. [SPIFFE](https://spiffe.io/docs/latest/spiffe-about/overview/) defines short-lived cryptographic identity documents, called SVIDs, issued only after the node or workload has been attested, and rotated automatically. A workload proves what it is at runtime instead of presenting a long-lived secret that anyone who copies it can reuse."
      },
      {
        "type": "p",
        "text": "For agents I would add something workload identity alone does not cover: delegation. An agent rarely acts purely for itself. It acts for a user, inside a task. So the credential it presents to a tool should carry three facts: which agent, on whose behalf, and for what purpose. Drop any one of the three and your audit log can no longer tell an authorized action from a hijacked one."
      },
      {
        "type": "h2",
        "text": "What the MCP specification now gives you"
      },
      {
        "type": "p",
        "text": "The [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization), added in the March 2025 revision, makes much of this practical for HTTP-based servers. It builds on OAuth 2.1 and requires PKCE for every client. A bearer token must accompany every HTTP request, even within the same session, and tokens may never appear in a query string. Servers should enforce token expiration and rotation and keep lifetimes limited. When a server delegates login to a third-party identity provider, it issues its own token bound to that session rather than handing the upstream token to the client, and the spec tells implementers to consider the security implications of token chaining."
      },
      {
        "type": "p",
        "text": "That is real progress over the shared API keys most early servers relied on. It still leaves two things to you. The spec does not spell out how a token is tied to the one server it was meant for, so audience checks deserve explicit attention in your own design. And it does not decide what an agent may do with a perfectly valid token. That is the policy layer's job, and in most designs I review it is the thinnest part."
      },
      {
        "type": "p",
        "text": "There is one gap worth calling out. The same specification says servers running over the local STDIO transport should not follow this flow and should instead retrieve credentials from the environment. That is sensible for a developer laptop. In an enterprise it is exactly where long-lived secrets hide: a personal access token in an environment variable, shared across every local server the developer has installed. My rule is that local servers are for experiments, and anything that touches production data runs as a remote server behind proper authorization."
      },
      {
        "type": "h2",
        "text": "The toxic agent flow: when every identity check passes"
      },
      {
        "type": "p",
        "text": "Earlier this week [Invariant Labs disclosed a toxic agent flow](https://invariantlabs.ai/blog/mcp-github-vulnerability) involving the official GitHub MCP server. A malicious issue planted in a public repository could steer an agent, during a routine request to look at open issues, into pulling data from the user's private repositories and publishing it in a public pull request. The researchers were clear that the server code itself was not flawed. They called it an architectural problem at the level of the agent system."
      },
      {
        "type": "p",
        "text": "This is the part I find most instructive. Every identity check in that scenario passed. The agent held a legitimate token with legitimate scope. What failed was the absence of any rule between untrusted input and privileged action. The token reached every repository the user could see, and nothing in the session understood that reading a stranger's issue should narrow what the agent does next, not widen it."
      },
      {
        "type": "p",
        "text": "Two lessons follow. Scope credentials to the task, not to the user's full reach. And treat the trust level of what an agent has read as an input to authorization. Identity tells you who is acting. It cannot tell you whether the actor has just been manipulated."
      },
      {
        "type": "h2",
        "text": "Context-aware access, enforced outside the model"
      },
      {
        "type": "p",
        "text": "Static roles assume the risk of an action is fixed. For agents it is not. Reading a customer record during a service request is routine. The same read moments after the agent ingested an external email deserves a second look. Policy should weigh the agent's identity, the delegating user, the task, the data sensitivity and what has entered the context during the session."
      },
      {
        "type": "p",
        "text": "The enforcement point has to sit outside the model. A model can be talked into things; a policy engine evaluating a signed request cannot. That is how I think about guardrails in general: the model proposes, deterministic code decides. The OWASP GenAI Security Project's [Agentic AI: Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/), published in February, is a good reference for the threat classes your policy layer should expect to meet."
      },
      {
        "type": "h2",
        "text": "A practical checklist"
      },
      {
        "type": "ul",
        "items": [
          "Give every agent its own attested identity and short-lived credentials. Never let an agent reuse a human's token.",
          "Carry delegation explicitly, so agent, user and task travel with every call.",
          "Scope each grant to the task, separate read from write, and expire grants when the task ends.",
          "Treat everything an agent reads from outside as untrusted, including issues, documents, emails and web pages, and let that taint reduce what it may do next.",
          "Enforce critical rules deterministically, outside the model, and require human approval for irreversible actions.",
          "Log every tool call with identity, delegation, inputs, policy decision and result."
        ]
      },
      {
        "type": "p",
        "text": "In the large regulated organizations I have worked in, the hardest item on that list is not technical. It is convincing teams that a working demo running on a shared service account is technical debt from day one. Retrofitting identity later means re-plumbing every integration the agent touched, usually under audit pressure."
      },
      {
        "type": "quote",
        "text": "Model is a tool. Harness is the strategy."
      },
      {
        "type": "p",
        "text": "Identity is the least glamorous part of agentic AI and the part that decides whether anything else can be trusted. So here is the test I would run first: how many of the agents in your environment today could tell you, for a given action, exactly whose authority they were using?"
      },
      {
        "type": "bottomLine",
        "text": "Trust in agents starts with identity built for machines: attested, short-lived, delegated and checked by policy the model cannot argue with. The more capable agents become, the less optional this gets."
      }
    ]
  },
  {
    "slug": "python-or-jvm-for-enterprise-ai",
    "title": "Python or the JVM for production enterprise AI? Put the agent where the transaction lives",
    "summary": "Python is unrivaled for research and prototyping. Production enterprise AI is mostly integration, security and scale, and with JVM agent frameworks now arriving, the runtime that owns the transaction is often the right home for the agent.",
    "theme": "data-ai-platforms",
    "status": "published",
    "published": "2025-06-24",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my LinkedIn post of June 19, 2025.",
    "related": [
      "agent-first-data-architecture",
      "three-architectures-for-ai-coding-agents"
    ],
    "body": [
      {
        "type": "p",
        "text": "**Before you commit your production AI stack to Python, separate AI research from AI engineering.** Python is unrivaled for prototyping, training and evaluation, and I would not try to change that. But most enterprise AI is not a modeling problem. It is a problem of integration, security and scale, and those problems already have a home in most large firms."
      },
      {
        "type": "p",
        "text": "In my conversations with architects and data scientists, this debate tends to split along job titles. Data scientists defend Python. Platform and application architects ask why anyone would rebuild transaction handling in a second runtime. Both are right about their own work. The mistake is letting one group's default become the whole stack."
      },
      {
        "type": "h2",
        "text": "What production AI actually does"
      },
      {
        "type": "p",
        "text": "Look at what a production agent spends its time on. It calls a model over HTTP. Then it reads customer data under entitlements, calls internal services, writes to systems of record, handles retries and idempotency, logs evidence for audit, and fails safely. The model call is the easy part. Everything around it is the system."
      },
      {
        "type": "p",
        "text": "Scale shows up in unglamorous ways. An agent that fans out to five internal services per request needs connection pooling, timeouts, circuit breakers and back-pressure. The JVM has mature answers for all of these, and virtual threads in recent Java releases have made highly concurrent, I/O-bound code much simpler to write than it used to be."
      },
      {
        "type": "p",
        "text": "In most large financial institutions, almost everything runs on the JVM. Decades of reliability engineering, security tooling, identity integration and operational know-how sit there. When we wire an agent into a payment, a claim or a servicing workflow, the hard questions are about transactions and controls, not about which language has the nicer notebook."
      },
      {
        "type": "h2",
        "text": "Infrastructure parity has arrived"
      },
      {
        "type": "p",
        "text": "Not long ago the honest answer was that the JVM lagged badly. For the building blocks, that gap has closed. [Spring AI reached 1.0 GA in May 2025](https://spring.io/blog/2025/05/20/spring-ai-1-0-GA-released) with a portable client across 20 model providers, a vector store abstraction across 20 databases, annotation-based tool calling, Model Context Protocol client and server support, and Micrometer observability that tracks latency, token usage and tool calls. That last item matters more to a bank than the rest, because it plugs AI into the monitoring stack operations teams already trust."
      },
      {
        "type": "p",
        "text": "[LangChain4j reached 1.0 in May 2025](https://github.com/langchain4j/langchain4j/releases/tag/1.0.0), with model clients, retrieval, tool calling, chat memory and MCP client support. The following week Google announced the [initial Java release of its Agent Development Kit](https://developers.googleblog.com/agents-adk-agent-engine-a2a-enhancements-google-io/), which puts a major cloud provider's agent framework on the JVM alongside its Python original."
      },
      {
        "type": "h2",
        "text": "The new frontier is agent frameworks"
      },
      {
        "type": "p",
        "text": "The conversation has moved past model clients to orchestration, state, error handling and governance. This is where strongly typed, well-instrumented runtimes earn their keep. When an agent can take actions, you want the compiler to catch a malformed tool contract before a customer does."
      },
      {
        "type": "p",
        "text": "Typing helps with something less obvious: evidence. When tool inputs and outputs are typed records, every agent step can be logged as structured data that an auditor or a monitoring rule can query, instead of free text someone has to interpret later. It is a small design choice with a large effect on how quickly you can answer an examiner."
      },
      {
        "type": "p",
        "text": "Rod Johnson, who created Spring, made a version of this argument with [Embabel](https://thenewstack.io/meet-embabel-a-framework-for-building-ai-agents-with-java/?p=22790880), an open source JVM agent framework that plans toward goals using conditions declared in type-safe code. The aim, as The New Stack described it, is just enough deterministic control over how an agent makes its choices while still letting it find new routes to a goal. That balance is close to what a model risk team wants to see."
      },
      {
        "type": "p",
        "text": "I want to be fair about the limits. New agent patterns still tend to appear in Python first, and some JVM pieces are young. Google's Java ADK shipped as version 0.1.0, while the Python version it follows is already at a stable 1.0. If you need this month's research technique, Python will get you there sooner."
      },
      {
        "type": "h2",
        "text": "A decision rule I use"
      },
      {
        "type": "p",
        "text": "Put the agent's orchestration in the runtime that owns the transaction and the controls. Keep Python where it is genuinely the best tool: training, fine-tuning, evaluation harnesses, exploratory data science and some model serving. Connect the two through well-defined service contracts or MCP, not through shared libraries or copied logic. Before choosing, I ask four questions:"
      },
      {
        "type": "ol",
        "items": [
          "Which system of record will the agent write to, and which runtime owns it?",
          "Where do the entitlement, masking and business rules live today?",
          "Who will be on call for this service at 2 a.m., and what do they know?",
          "Is the hard part of this use case the model or the integration?"
        ]
      },
      {
        "type": "p",
        "text": "The rule follows the transaction, not the language. A research assistant over public documents, an analytics copilot that never writes to a system of record, or a team whose core services are already in Python can reasonably keep the agent in Python too."
      },
      {
        "type": "p",
        "text": "The failure mode to avoid is quiet duplication. When a Python agent layer is bolted beside a Java core, entitlement checks, data masking and business rules get reimplemented in the second language. Now you have two versions of policy that drift apart, and an auditor who asks which one ran. In my experience that duplication costs far more than any productivity gain from a familiar framework."
      },
      {
        "type": "p",
        "text": "There is a people argument too. Large firms employ thousands of experienced JVM engineers who understand the domain, the systems of record and the failure modes. Asking them to build agents in the stack they know is faster and safer than standing up a parallel team that must learn the business from scratch. Python skills are easy to hire. Fifteen years of knowing why the settlement batch fails on month-end is not."
      },
      {
        "type": "h2",
        "text": "A placement decision, not a language war"
      },
      {
        "type": "p",
        "text": "None of this is about which language is better. It is about where software that makes judgments should sit relative to the systems it can change. Close to the transaction, the controls are inherited. Far from it, they have to be rebuilt, and rebuilt controls are where audits find gaps. If your agents had to pass the same production readiness review as your core services, which runtime would get them through it faster?"
      },
      {
        "type": "bottomLine",
        "text": "The most prudent path to production is rarely a rewrite. Enhance the proven systems you have, with the talent you already employ, and use Python where it is genuinely the best tool."
      }
    ]
  },
  {
    "slug": "from-mlops-to-ai-engineering",
    "title": "From MLOps to AI engineering: what industrializing ML still teaches us",
    "summary": "A trained model is the start of the work, not the end. The lessons of industrializing machine learning carry straight into generative and agentic AI, which is why AI engineering has to unify DataOps, MLOps and DevOps.",
    "theme": "data-ai-platforms",
    "status": "published",
    "published": "2024-11-19",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my Medium article \"The Rise of MLOps\" (2021) and my LinkedIn post of November 14, 2024.",
    "related": [
      "agent-first-data-architecture",
      "the-ai-native-sdlc"
    ],
    "body": [
      {
        "type": "p",
        "text": "**A trained model is the start of the work, and the discipline that gets it safely into production matters more than the model itself.** In 2021 I wrote that MLOps was not a buzzword but a necessary discipline. Without a systematic approach, machine learning projects stall at proof of concept, or degrade quietly as live data drifts away from the data the model learned from."
      },
      {
        "type": "p",
        "text": "Three years later, generative AI has widened the scope, the first agentic systems are widening it again, and much of the industry is rediscovering those lessons under new names. I think the discipline now deserves a broader name, AI engineering, but the core ideas have changed less than the marketing suggests."
      },
      {
        "type": "h2",
        "text": "Why ML was never just software"
      },
      {
        "type": "p",
        "text": "The clearest statement of the problem is still [Hidden Technical Debt in Machine Learning Systems](https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf), the 2015 NeurIPS paper by D. Sculley and colleagues at Google. Its famous diagram shows the model code as a small box surrounded by data collection, feature extraction, configuration, serving and monitoring. The paper names risks every platform team eventually meets: entanglement, hidden feedback loops, undeclared consumers and data dependencies. Its shorthand, *Changing Anything Changes Everything*, is the best one-line description of ML in production I know."
      },
      {
        "type": "p",
        "text": "Three differences from ordinary software drove everything we built:"
      },
      {
        "type": "ul",
        "items": [
          "**More than code.** Software lifecycles center on code. Machine learning also depends on data and models, which are harder to version and harder to diff.",
          "**Experimental by nature.** Development is a series of experiments that must be tracked to be reproducible.",
          "**Never finished.** After deployment, models need monitoring for drift and periodic retraining as well as bug fixes."
        ]
      },
      {
        "type": "figure",
        "name": "ml-platform-lifecycle"
      },
      {
        "type": "h2",
        "text": "The lifecycle we industrialized"
      },
      {
        "type": "p",
        "text": "The lifecycle itself is familiar: data ingestion and preparation, feature engineering, training and tuning, evaluation against held-out data, deployment in the mode the use case needs (batch or real-time), then continuous monitoring with automated retraining when performance drops. In regulated industries you add lineage and audit trails across data, code and model artifacts."
      },
      {
        "type": "p",
        "text": "At USAA we consolidated 360 data scientists onto one ML platform and cut model deployment from 8 weeks to 5 days. People assume the gain came from automation. Automation helped, but in my view the bigger shift was that model risk teams could validate models on the same platform data scientists built them on, using the same lineage and evidence. Validation stopped being a separate project that reassembled the facts afterwards. When evidence is a by-product of the pipeline, review gets faster and better at the same time."
      },
      {
        "type": "h2",
        "text": "What carries over to generative AI"
      },
      {
        "type": "p",
        "text": "Teams adopting foundation models sometimes conclude that MLOps no longer applies because they do not train the model. I disagree. You may not own the weights, but you own almost everything else: prompts, retrieval corpora, tool definitions, guardrails, evaluation sets and the routing logic between models. Each is a versioned artifact that changes behavior, and each needs the lineage we built for features and models."
      },
      {
        "type": "p",
        "text": "The practical shift is that evaluation becomes the regression suite. In classical ML, a held-out dataset told you whether a retrained model was safe to promote. For generative systems the equivalent is a curated set of questions, expected behaviors and adversarial prompts, run automatically on every change to a prompt, a corpus or a model version. Teams that skip this are deploying on instinct. Teams that build it find that model upgrades, which used to be nerve-wracking, become routine."
      },
      {
        "type": "p",
        "text": "Sculley's risks map almost one to one. Data dependencies become the document corpus behind retrieval, which drifts every time someone edits a policy page. Undeclared consumers become LLM applications and agents wired to your APIs through function calling. Hidden feedback loops appear when AI-generated content flows back into the knowledge base the next answer draws from. And drift now includes a provider updating a model version underneath you, which can change behavior without a single line of your code changing."
      },
      {
        "type": "h2",
        "text": "What does not carry over"
      },
      {
        "type": "p",
        "text": "The analogy has limits, and teams that miss them get hurt. The first is determinism. A classical model given the same input returns the same score. A generative system can answer the same question differently on consecutive runs, so a single pass of your evaluation set proves less than it seems. The [τ-bench paper](https://arxiv.org/abs/2406.12045), published in June 2024, makes the point well: it proposes a pass^k metric that asks whether an agent succeeds on every one of k repeated trials, not just once, and reports that even state-of-the-art function-calling agents failed most of its tasks and were inconsistent across runs. For a customer-facing system in a bank, succeeding every time is the measure that matters."
      },
      {
        "type": "p",
        "text": "The second is grading. Held-out data came with labels. Many generative outputs have no single right answer, so teams use one model to grade another. That is workable, and [research on LLM-as-a-judge](https://arxiv.org/abs/2306.05685) found strong models agreeing with human preferences about as often as humans agree with each other, while also documenting position and verbosity biases. But the grader is now a model in production too, and it needs the same calibration against human experts that we demanded of any other model before we trusted its scores, plus an explicit way to say it does not know."
      },
      {
        "type": "p",
        "text": "The third is cost. A classical model's inference cost was close to fixed. An agent that decides how many steps to take can make the same task many times more expensive on a bad day, so cost per task belongs on the monitoring dashboard next to accuracy and drift. Model risk teams that treat these three as footnotes will approve systems whose behavior they have only sampled once."
      },
      {
        "type": "h2",
        "text": "From MLOps to AI engineering"
      },
      {
        "type": "p",
        "text": "That is why I see AI engineering as one discipline that unifies DataOps, MLOps and DevOps pipelines across hybrid, multi-cloud and edge delivery, and across streaming and batch operations. Splitting them is what produces the gaps: a data team that changes a source without knowing which agent depends on it, or an application team that ships a prompt change without the evaluations an ML team would insist on."
      },
      {
        "type": "p",
        "text": "The research points the same way. [DORA's 2024 report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report) found that a 25% increase in AI adoption was associated with better documentation and code quality, but also with an estimated 7.2% reduction in delivery stability. My reading is that AI speeds up change without supplying the discipline to absorb it, and that discipline lives in the pipelines and the data underneath them. That is a DataOps finding as much as an AI one. When we moved hundreds of data scientists onto one governed platform, the hardest conversations were rarely about tools. They were about who owned a feature definition when three models depended on it."
      },
      {
        "type": "p",
        "text": "Responsible design has to run through the whole lifecycle rather than being added at the end. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), released in January 2023, organizes the work as govern, map, measure and manage, and NIST added a Generative AI Profile in July 2024. The value of a framework like this is less the vocabulary than the expectation that risk work happens continuously, alongside the build."
      },
      {
        "type": "p",
        "text": "The cost of skipping this is already visible. In July 2024, [Gartner predicted that at least 30% of generative AI projects will be abandoned after proof of concept by the end of 2025](https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025), citing poor data quality, inadequate risk controls, escalating costs or unclear business value. Those are the same reasons ML projects stalled at proof of concept a decade ago. The technology changed. The failure pattern did not."
      },
      {
        "type": "h2",
        "text": "The head start nobody talks about"
      },
      {
        "type": "monday",
        "items": [
          "Inventory the prompts, retrieval corpora and tool definitions behind your most important generative use case and put each under version control.",
          "Build an evaluation set of fifty real questions for that use case and run it automatically on every prompt or model change.",
          "Add cost per task and a provider model-version alert to the monitoring dashboard of each production generative AI application.",
          "Give your model risk team access to evaluation results on the same platform where builders see them."
        ]
      },
      {
        "type": "p",
        "text": "Firms that built real MLOps platforms have an advantage they may not recognize. Lineage, evaluation, monitoring and shared evidence with risk partners are exactly what generative and agentic systems need, and those capabilities take years to build and earn trust. Firms that skipped that work are about to pay for it twice, once for the models they already run and again for the agents they are about to deploy. If a provider changed the model under your most important AI use case tonight, how quickly would you know?"
      },
      {
        "type": "bottomLine",
        "text": "The lessons of MLOps still hold for generative and agentic AI: industrialize the path to production, measure what happens after launch, and give risk teams the same evidence the builders have."
      }
    ]
  },
  {
    "slug": "leading-without-authority",
    "title": "Leading architecture change without direct authority",
    "summary": "In a large organization you rarely own the teams you need to move. Architects lead through clarity, credibility and standards people want to follow, and by treating the North Star and today's fires as one job.",
    "theme": "leading-ai-change",
    "status": "published",
    "published": "2025-07-08",
    "plannedFor": "Mar 2027",
    "source": "Adapted from my LinkedIn comments of May 6 and June 30, 2025.",
    "related": [
      "the-ai-native-sdlc",
      "architecture-that-runs"
    ],
    "body": [
      {
        "type": "p",
        "text": "**Most architecture change in a large organization happens without anyone reporting to the architect.** That is one of the hardest parts of senior technical leadership: driving change across teams you do not own, with budgets you do not control. You lead through credibility, influence and, above all, clarity."
      },
      {
        "type": "p",
        "text": "I have spent most of my career in that position, in insurance, agribusiness and banking. The org charts differed. The lesson did not. Authority gets you a meeting. It does not get you adoption."
      },
      {
        "type": "h2",
        "text": "The real risk is misalignment"
      },
      {
        "type": "p",
        "text": "If standards are not practical, they will be ignored. If strategy is not tied to delivery, it will not matter. If governance is too heavy, or too light, it will be ineffective. You cannot force transformation. You earn it, one well-communicated standard, one aligned decision, one trusted relationship at a time."
      },
      {
        "type": "p",
        "text": "The quiet failure mode is the standard that everyone agrees with and nobody follows. It passes the review board, gets published, and then sits next to a delivery reality that never changed. When I see that, I no longer blame the teams. A standard that is consistently ignored is telling you something about its cost, its clarity or its timing."
      },
      {
        "type": "p",
        "text": "Before I publish a standard now, I ask three questions. What does it cost a team to adopt? How will they know they comply? What happens when they cannot? If I cannot answer all three, the standard is not ready, however right it is on paper."
      },
      {
        "type": "h2",
        "text": "North Star and firefighting are one job"
      },
      {
        "type": "p",
        "text": "The constant movement between crafting the target architecture and putting out today's fires is where the real art of architecture lies. It is the daily trade-offs, the guidance given in countless meetings, and the ability to explain the why behind each choice that slowly steer the ship toward the strategic horizon."
      },
      {
        "type": "p",
        "text": "Gregor Hohpe calls this [riding the Architect Elevator](https://architectelevator.com/), connecting the strategy \"penthouse\" with the technology \"engine room.\" I would add that the fires are often where the elevator earns its keep. An outage or a failed audit is the moment when people are most willing to hear why the target architecture matters, provided you show up to help with the fire first. Do not aim for balance. Aim for integration, a rhythm that adapts to the business rather than a fixed split of your calendar."
      },
      {
        "type": "h2",
        "text": "Credibility is a currency you spend"
      },
      {
        "type": "p",
        "text": "Influence without authority behaves like a bank balance. You build it by being right about things that matter, by helping teams hit their dates and by admitting quickly when a standard was wrong. You spend it every time you say no."
      },
      {
        "type": "p",
        "text": "That has a practical consequence. Say no rarely, specifically and with an alternative. An architect who blocks ten things a month runs the account dry by spring, and then the one veto that really matters gets escalated around them. An architect who blocks one thing a quarter, with a clear reason and a path forward, usually gets heard."
      },
      {
        "type": "p",
        "text": "Credibility also comes from staying close to delivery. Architects who never ship slowly lose the standing to tell others how to ship. I still build prototypes myself, not because anyone needs my code, but because it keeps my judgment honest about what a standard really costs the team that has to implement it."
      },
      {
        "type": "p",
        "text": "Writing decisions down helps more than people expect. Michael Nygard's [architecture decision records](https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions) capture the context, the decision and its consequences in a page or two. When a team disagrees with a standard, a short record of why it exists turns a power struggle into a conversation about facts. And when the facts change, the same record makes it easy to supersede the decision without anyone losing face."
      },
      {
        "type": "h2",
        "text": "Make the compliant path the easy path"
      },
      {
        "type": "p",
        "text": "The most effective technique I know has nothing to do with persuasion. Spotify described its fix for fragmented tooling as the [Golden Path](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem), an \"opinionated and supported\" way to build a service, a website or a data pipeline. Engineers could still take a different route, but they lost the same level of support. Before that, the company had what it called \"rumour-driven development,\" where the only way to learn how to do something was to ask a colleague."
      },
      {
        "type": "p",
        "text": "That is the model for leading without authority: do not ban the alternatives, make the preferred path so much cheaper that most teams choose it on their own. When we consolidated 360 data scientists onto one ML platform at USAA, the argument that carried the room was not a policy memo. It was model deployment dropping from eight weeks to five days."
      },
      {
        "type": "p",
        "text": "Expect a dip before the payoff. Google's 2024 DORA findings note that a platform engineering initiative [might lead to a temporary decrease in performance](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report) before improvements appear, and that results depend on user-centered design and developer independence. That dip is when your credibility balance gets tested. Warn people early, and the dip becomes a prediction you got right."
      },
      {
        "type": "h2",
        "text": "When influence runs out"
      },
      {
        "type": "p",
        "text": "Sometimes influence is not enough. A team is about to take on a risk the enterprise should not carry, the conversation has gone nowhere, and the date is close. Architects without authority tend to make one of two mistakes here: they never escalate and quietly absorb the risk, or they escalate everything and become the person leaders learn to route around."
      },
      {
        "type": "p",
        "text": "My decision rule is to escalate risks, never preferences. If the disagreement is about style, technology taste or a pattern I would have chosen differently, I let it go and record it. If it is about customer data, resilience, regulatory exposure or a cost the business has not agreed to carry, I escalate, and I say plainly which one it is."
      },
      {
        "type": "p",
        "text": "How you escalate matters as much as whether. Tell the team first that you are going to raise it, and why. Bring their argument to the meeting as fairly as your own. Frame the decision as a choice with options and consequences, not a verdict you want rubber-stamped, and accept that a leader may knowingly choose the risk. If they do, write it down as a decision with an owner. You have done your job. Done this way, an escalation can actually add to your credibility, because teams learn that you play fair even when you lose."
      },
      {
        "type": "h2",
        "text": "What has worked for me"
      },
      {
        "type": "ul",
        "items": [
          "**Make the compliant path the easy path.** Reusable patterns and automated checks win more adoption than mandates.",
          "**Lead through the managers.** Set architecture, roadmap and standards; let the teams own how they deliver.",
          "**Show, don't tell.** A working prototype changes more minds than a strategy deck. That is why I build a small working reference before I write the standard, instead of only writing about the idea.",
          "**Measure what changed.** Adoption, review time and delivery metrics keep the conversation about outcomes rather than opinions.",
          "**Protect the people who adopt early.** The first team on a new standard takes the risk. Make sure they get the credit and the support."
        ]
      },
      {
        "type": "p",
        "text": "Culture is the multiplier under all of this. DORA's research holds that [\"a high-trust, generative culture predicts software delivery and organizational performance\"](https://dora.dev/capabilities/generative-organizational-culture/). An architect without authority depends on that trust more than anyone, because information has to flow toward you voluntarily. If teams hide problems from architecture, you will always be designing for an organization that does not exist."
      },
      {
        "type": "monday",
        "items": [
          "List your current architecture standards and mark which ones teams actually follow, then interview two teams about the most ignored one.",
          "Apply three tests to every standard awaiting publication: adoption cost, how teams will know they comply, and what happens when they cannot.",
          "Pick one standard and make the compliant path cheaper with a template, pattern or automated check rather than another memo.",
          "Write down your escalation rule, risks versus preferences, and share it with the delivery leaders you work with most."
        ]
      },
      {
        "type": "p",
        "text": "The question I keep coming back to, and would ask any architect reading this: which of your current standards would teams still follow if no one were checking?"
      },
      {
        "type": "bottomLine",
        "text": "Authority is granted. Influence is earned, through clarity, practical standards and results people can see, and it is spent every time you say no, so spend it carefully."
      }
    ]
  }
]

export const moreNotes: Note[] = [
  {
    "slug": "spec-kit-beyond-vibe-coding",
    "title": "Beyond vibe coding: specs as executable artifacts",
    "summary": "Ad-hoc prompting yields code that looks right but misses intent. Making the spec the gated source of truth is how AI-assisted delivery becomes repeatable.",
    "status": "published",
    "published": "2025-09-08",
    "plannedFor": "Nov 2026",
    "source": "Adapted from my LinkedIn post of September 5, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Vibe coding produces code that looks right and quietly misses the point.** Ad-hoc prompting works for a prototype on a Friday afternoon. It falls apart when the output has to meet a business requirement, pass an audit and still make sense to the next engineer six months later."
      },
      {
        "type": "p",
        "text": "GitHub's [Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) takes a different stance: the specification is a living, executable artifact that guides every step of the build. Work moves through four gated phases (specify, plan, tasks, implement) with validation at each gate. It works with Copilot, Claude Code and Gemini CLI, which matters for enterprises that will not standardize on one assistant."
      },
      {
        "type": "p",
        "text": "What I like most is where it puts human effort. Reviewing a spec and a plan is cheaper and more effective than reviewing a 2,000-line diff after the fact. If the intent is wrong, you catch it before a single file changes. In regulated settings that also gives you a trace from requirement to code, which is exactly what reviewers and auditors ask for. The trade-off is discipline. Teams have to write specs they would otherwise skip, and some will find that slow at first. I think that is the right cost to pay."
      },
      {
        "type": "p",
        "text": "In AI-assisted delivery, the spec is the product and the code is a build output."
      }
    ]
  },
  {
    "slug": "closing-the-loop",
    "title": "Closing the loop: agents that verify their own work",
    "summary": "An agent that runs the tests, reads the failure and fixes its own work is the line between autonomy and a one-shot tool.",
    "status": "published",
    "published": "2025-08-13",
    "plannedFor": "Nov 2026",
    "source": "Adapted from my LinkedIn comment of August 11, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Closing the loop is what separates an autonomous agent from a one-and-done tool.** A one-shot tool generates code and hands it to you. An agent that closes the loop runs the tests, reads the failure, fixes its own work and tries again, without waiting for a person to notice something broke."
      },
      {
        "type": "p",
        "text": "I treat this as an architecture principle rather than a feature. I think of these feedback mechanisms as the agent's sensors: compilers, linters, unit tests, policy checks and schema validators that reject a change and force the agent to correct itself before a human ever looks. The model supplies the effort. The sensors supply the judgment you can actually trust."
      },
      {
        "type": "p",
        "text": "The failure mode I see most often is teams investing in a better model and leaving the sensors weak. If your test suite is thin, the agent will happily converge on code that passes thin tests. Self-correction is only as good as the signal it corrects against, so the quality of your validators sets the ceiling on how much autonomy you can safely grant."
      },
      {
        "type": "p",
        "text": "The practical rule: before you widen an agent's permissions, strengthen what checks its work."
      }
    ]
  },
  {
    "slug": "agent-design-is-still-hard",
    "title": "Agent design is still hard",
    "summary": "High-level SDKs break under real tool use. Caching, reinforcement, failure isolation and shared state decide whether an agent is reliable.",
    "status": "published",
    "published": "2025-11-25",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of November 24, 2025, on Armin Ronacher's essay.",
    "body": [
      {
        "type": "p",
        "text": "**Agent design is still hard, and higher-level SDKs do not make the hard parts go away.** Armin Ronacher's essay [Agent Design Is Still Hard](https://lucumr.pocoo.org/2025/11/21/agents-are-hard/) captures what many builders are finding: subtle differences between models and tool behaviors force teams to build their own abstractions anyway."
      },
      {
        "type": "p",
        "text": "His lessons match what I see in enterprise builds. Explicit cache management gives predictability and cost control, even if it feels like extra work at first. Feeding reinforcement back after each tool call (reminding the agent of its goal, reporting status, suggesting a fix after a failure) improves reliability. Sub-agents isolate failures so one bad iteration does not poison the whole context. A shared, file-system-like state lets tools pass work to each other instead of hitting dead ends. And steering the final output turns out harder than anyone expects."
      },
      {
        "type": "p",
        "text": "My takeaway for architects is that the loop is the easy part. The real design work is in orchestration, resilience and control: where state lives, how failures are contained and who decides when the agent is done. That is ordinary distributed-systems thinking applied to a new kind of component, and teams that treat it that way ship more reliable agents."
      },
      {
        "type": "p",
        "text": "If your agent framework hides these choices from you, who is making them?"
      }
    ]
  },
  {
    "slug": "bigquery-data-engineering-agent",
    "title": "A data engineering agent in practice",
    "summary": "An experimental agent built pipelines, changed schemas, reverted its own mistakes and generated quality checks from plain language. Self-correction was the part that mattered.",
    "status": "published",
    "published": "2025-07-02",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of June 30, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**The most impressive thing an experimental BigQuery data engineering agent did was undo its own mistake.** From plain-language prompts, it built a loading pipeline from Cloud Storage, enriched a schema using built-in AI functions, generated data-quality checks and wrote table metadata to support conversational analytics."
      },
      {
        "type": "p",
        "text": "Those are the foundational, repetitive tasks that eat a large share of a data engineer's week. Automating them frees skilled people for work that needs judgment: modeling the business correctly, deciding what quality means for a given dataset, and working with the teams who consume the data."
      },
      {
        "type": "p",
        "text": "But the moment that stuck with me was when the agent detected that one of its own changes was wrong and reverted it. That is the difference between a code generator and a collaborator, and Google's [introduction to the agent](https://cloud.google.com/blog/products/data-analytics/a-closer-look-at-bigquery-data-engineering-agent/) shows how far they intend to take it. In data work especially, a wrong schema change or a silent load error can spread into dozens of downstream reports before anyone notices, so an agent that checks itself is worth far more than one that is merely fast. For regulated enterprises, the generated metadata and quality checks may end up more valuable than the pipeline itself, since they are the evidence governance teams need."
      },
      {
        "type": "p",
        "text": "Judge a data agent by how it handles its own errors, not by how fast it writes SQL."
      }
    ]
  },
  {
    "slug": "technical-debt-is-an-architectural-liability",
    "title": "Technical debt is an architectural liability",
    "summary": "Technical debt is a strategic risk rather than messy code. Coding agents make continuous paydown affordable inside everyday work.",
    "status": "published",
    "published": "2025-06-23",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of June 21, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Technical debt is an architecture problem, and treating it as a developer housekeeping issue is why it keeps growing.** Left unaddressed, it slows every new initiative, inflates operating cost and creates systemic risk. Martin Fowler's framing of [technical debt](https://martinfowler.com/bliki/TechnicalDebt.html) as interest you pay every time you have to work in the neglected code still holds, and in large enterprises the interest compounds across hundreds of interconnected systems."
      },
      {
        "type": "p",
        "text": "The usual remedy has been the remediation project: a separately funded program to clean things up. In my experience those rarely get funded, and when they do, they are the first thing cut when priorities shift. The debt waits patiently."
      },
      {
        "type": "p",
        "text": "Coding agents change the economics. Small refactors, dependency upgrades, dead-code removal and test backfills can now happen continuously inside the daily workflow, at a cost low enough that nobody needs a business case for each one. The catch is that agents also make it cheaper to create debt. A team generating code twice as fast with no architectural guardrails will accumulate debt twice as fast too. That is why I want architecture rules expressed as code and checked automatically, so the same automation that writes the change also tests it against the standards."
      },
      {
        "type": "p",
        "text": "Fund debt paydown as a continuous practice, not a project waiting for approval."
      }
    ]
  },
  {
    "slug": "mcp-tools-resources-prompts",
    "title": "MCP in three primitives: tools, resources, prompts",
    "summary": "MCP ended the copy-paste problem with three simple primitives. Being open is why it beat a thousand bespoke integrations.",
    "status": "published",
    "published": "2025-06-18",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn post of June 17, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**The Model Context Protocol exists because people got tired of copying and pasting context between applications.** Before MCP, connecting a model to your files, tickets or databases meant manual shuttling or a bespoke integration for every pairing of model and system. That does not scale, and it is a governance headache."
      },
      {
        "type": "p",
        "text": "MCP's answer is three primitives. Tools are actions a model can take. Resources are data it can read for context. Prompts are reusable templates that a user can invoke. I like this design because it is small enough to explain to a non-specialist in a minute, which is rare for an integration standard and a good sign it will last."
      },
      {
        "type": "p",
        "text": "The bigger story is that it was open source from the start, which let a large community form quickly. That shifted effort away from proprietary connectors and toward model intelligence and workflow, where the real differentiation sits. For an enterprise architect, a common protocol also means one place to apply authentication, logging and policy instead of dozens."
      },
      {
        "type": "p",
        "text": "Small, open standards tend to win; the [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26) is a good example of why."
      }
    ]
  },
  {
    "slug": "mcp-connector-messages-api",
    "title": "Remote MCP, straight from the API",
    "summary": "Direct remote MCP access through the Messages API removed a client layer and moved agent integration from clever hacks toward engineering.",
    "status": "published",
    "published": "2025-06-04",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn posts of May 22 and June 3, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**When remote MCP servers became reachable directly through the Messages API, agent integration got a lot less hacky.** With the Claude 4 release, Anthropic's [MCP connector](https://www.anthropic.com/news/agent-capabilities-api) let developers point the API at a remote MCP server without building and running their own MCP client."
      },
      {
        "type": "p",
        "text": "Three things stood out to me. There is a defined interaction schema, so tool calls look the same every time. Context integrity improves across multi-step tool use, which is where homegrown glue code tends to break. And conversation and tool-driven action share one channel instead of being stitched together."
      },
      {
        "type": "p",
        "text": "For architects, the practical effect is a simpler client architecture and faster adoption on integrations that already exist. Every layer you remove is one less thing to secure, patch and debug at 2 a.m. That matters more in a regulated enterprise than any benchmark, because predictability is what risk teams need to see before an agent is allowed to act on anyone's behalf."
      },
      {
        "type": "p",
        "text": "Less glue code means fewer places for agents to fail quietly."
      }
    ]
  },
  {
    "slug": "the-mcp-spec-grows-up",
    "title": "The MCP spec grows up",
    "summary": "OAuth 2.1 authorization, streamable HTTP, batching and tool annotations: the March 2025 update that made enterprise MCP plausible.",
    "status": "published",
    "published": "2025-04-01",
    "plannedFor": "Jan 2027",
    "source": "Adapted from my LinkedIn posts of March 29 and 30, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**The March 2025 MCP update was the release that made enterprise adoption plausible.** The [protocol changelog](https://modelcontextprotocol.io/specification/2025-03-26/changelog) lists four major changes: an authorization framework based on OAuth 2.1, a streamable HTTP transport replacing the older HTTP plus server-sent events approach, JSON-RPC batching, and tool annotations that describe tool behavior, such as whether a tool is read-only or destructive."
      },
      {
        "type": "p",
        "text": "Authorization was the one I cared about most. Without a standard way to establish who is calling a tool and with what rights, no serious security team would let MCP near production data. Tool annotations matter too, because a policy engine can treat a destructive tool very differently from a read-only one."
      },
      {
        "type": "p",
        "text": "The ecosystem moved the same week. OpenAI added MCP support to its Agents SDK, and Microsoft's new Playwright MCP server let agents use web pages through accessibility snapshots rather than screenshots, which is faster and far more reliable. When a direct competitor adopts a protocol that Anthropic created, it is clear to me that MCP will become the default way agents connect to tools."
      },
      {
        "type": "p",
        "text": "Standards become real when security teams can say yes to them."
      }
    ]
  },
  {
    "slug": "a2a-and-mcp",
    "title": "A2A and MCP: complementary, not competing",
    "summary": "MCP connects agents to tools; Agent2Agent connects agents to each other. Together they turn single agents into systems, and raise the governance stakes.",
    "status": "published",
    "published": "2025-05-01",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my LinkedIn posts of April 10 and April 30, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**MCP and A2A solve different problems, and the debate over which one wins misses that.** Google Cloud Next 2025 brought the Agent2Agent protocol, the Agent Development Kit and MCP support together. Google's own [A2A announcement](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) described it as complementing MCP: MCP gives an agent access to tools and data, while A2A lets agents discover and work with each other."
      },
      {
        "type": "p",
        "text": "A2A's modality-agnostic design is the part I find most interesting. Agents can collaborate in whatever form suits the task, including text, audio or video streaming, rather than being forced through a single chat format."
      },
      {
        "type": "p",
        "text": "Standards are making AI less of a solo act. Interoperability is what turns individual agents into enterprise systems. But it also raises the governance stakes considerably. When one agent can call tools and also delegate to other agents, you need identity, authorization and audit across both protocols. A permission boundary that holds for a single agent can leak once it starts handing work to others."
      },
      {
        "type": "p",
        "text": "If your agents can talk to each other, can you trace who asked whom to do what?"
      }
    ]
  },
  {
    "slug": "ai-generated-assertions",
    "title": "Code that validates itself: AI-generated assertions",
    "summary": "Only about 2.5% of open-source Java repositories use production assertions. LLMs can write them, adding the verification layer AI-written code needs.",
    "status": "published",
    "published": "2025-05-13",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my LinkedIn post of May 11, 2025, on the Assertify paper.",
    "body": [
      {
        "type": "p",
        "text": "**Production assertions are one of the cheapest verification tools we have, and almost nobody writes them.** The [Assertify paper](https://arxiv.org/abs/2411.16927) reports that only about 2.48% of the open-source Java repositories the authors examined contained production assertions. The reason is simple: writing good assertions by hand takes effort and domain knowledge, and there is always something more urgent."
      },
      {
        "type": "p",
        "text": "The paper shows that LLMs can generate meaningful assertions that closely resemble the ones the original developers wrote. That caught my attention because assertions do three useful things at once. They validate assumptions at runtime, they make debugging faster by failing close to the cause, and they document intent right next to the code."
      },
      {
        "type": "p",
        "text": "I think this matters more now than when the paper was written. As more code is generated by AI, we need verification that lives inside the code, not only in a separate test suite that may itself be generated. An assertion that states what must be true at a given point is a small, readable contract that both humans and agents can check."
      },
      {
        "type": "p",
        "text": "If AI is going to write more of our code, it should also write down what that code assumes."
      }
    ]
  },
  {
    "slug": "build-for-today-or-tomorrow",
    "title": "Build for today's task or tomorrow's platform?",
    "summary": "The classic architect's dilemma, upgraded for agents: how much to invest in reusable agents versus fast, single-use ones.",
    "status": "published",
    "published": "2025-09-22",
    "plannedFor": "Feb 2027",
    "source": "Adapted from my LinkedIn post of September 21, 2025, on McKinsey's agentic AI lessons.",
    "body": [
      {
        "type": "p",
        "text": "**How much to invest in reusable agents is the oldest architecture question in a new form.** McKinsey's [lessons from a year of agentic AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/one-year-of-agentic-ai-six-lessons-from-the-people-doing-the-work) raise it directly, and it is the same tension every architect knows: build fast, but do not lock in choices that will constrain you later."
      },
      {
        "type": "p",
        "text": "Move too fast and you end up with brittle, single-use agents, each with its own prompts, tool wiring and guardrails, none of which can be reused or governed consistently. Move too slow and competitors ship while you are still designing the perfect platform. Neither failure is hypothetical; I have seen both in large enterprises."
      },
      {
        "type": "p",
        "text": "My rule of thumb is to standardize the parts that are expensive to change and cheap to share, and let teams move freely on the rest. Identity, tool access, logging, evaluation and policy enforcement belong in a common harness from day one. The agent's specific task logic can stay local and disposable until a pattern repeats two or three times. Then it earns promotion to a shared component. Single-use agents are the new frontier of technical debt, and finding the balance takes architectural judgment, not a framework."
      },
      {
        "type": "p",
        "text": "Standardize the harness early; let the agents stay disposable until they prove otherwise."
      }
    ]
  },
  {
    "slug": "unified-governance-in-the-catalog",
    "title": "Governance belongs in the catalog",
    "summary": "When business meaning, data products and relationships live in one open catalog, agents stop guessing at tables and governance travels with the data.",
    "status": "published",
    "published": "2025-04-14",
    "plannedFor": "Mar 2027",
    "source": "Adapted from my LinkedIn post of April 12, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Governance that lives in the catalog travels with the data; governance that lives in a policy document does not.** Unified catalogs now bring technical and business metadata, data products, a knowledge engine that infers relationships between entities, and semantic search into one place, built on open table formats like [Apache Iceberg](https://iceberg.apache.org/)."
      },
      {
        "type": "p",
        "text": "For human analysts, that is a convenience. For agents, it is the difference between guessing at tables and understanding meaning. An agent asked about customer churn will happily query whichever table has \"customer\" in its name unless something tells it which dataset is certified, what the columns mean and who owns the definition. The catalog is where that context should live."
      },
      {
        "type": "p",
        "text": "In large regulated enterprises I have worked in, the hardest governance problems were rarely about access control. They were about meaning: two teams using the same term for different things, and nobody able to say which version a report used. Putting business definitions and lineage next to the technical metadata is how you start to fix that, and open formats keep you from being locked into one vendor's view of your own data."
      },
      {
        "type": "p",
        "text": "If your agents cannot read your catalog, they are working from rumor."
      }
    ]
  },
  {
    "slug": "rethinking-oltp-for-agents",
    "title": "Rethinking operational databases for the agent era",
    "summary": "The lakehouse unified analytics and AI. Bringing operational Postgres into it points toward one governed source of truth for agents.",
    "status": "published",
    "published": "2025-09-10",
    "plannedFor": "Mar 2027",
    "source": "Adapted from my LinkedIn post of September 9, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**For years we treated operational and analytical data as two separate worlds, and agents are exposing how costly that split is.** One world ran the business; the other fed BI and, later, AI. Moving data between them added pipelines, latency, duplicated governance and plenty of drag."
      },
      {
        "type": "p",
        "text": "Bringing cloud-native Postgres into the lakehouse, as Databricks did with [Lakebase](https://www.databricks.com/company/newsroom/press-releases/databricks-launches-lakebase-new-class-operational-database-ai-apps), points toward a single, scalable source of truth. Operational records and analytical history sit under the same governance model instead of being reconciled after the fact."
      },
      {
        "type": "p",
        "text": "Agents make this more urgent than BI ever did. A dashboard can tolerate data that is a day old. An agent approving a request or answering a customer needs current operational state and historical context in the same moment, with the same access rules applied to both. Every extra copy of the data is another place where permissions can drift. It is still early, and I would not move core transactional systems on the strength of a launch announcement. But the direction is right: faster delivery, better decisions and simpler governance from fewer copies of the truth."
      },
      {
        "type": "p",
        "text": "The fewer copies of your data an agent has to reconcile, the safer it is to let it act."
      }
    ]
  },
  {
    "slug": "audit-your-year-with-ai",
    "title": "Your prompt history is a more honest review than your calendar",
    "summary": "My 2025 prompt history split 60% enterprise, 40% personal growth. Here is the prompt I used to audit my own year.",
    "status": "published",
    "published": "2025-12-08",
    "plannedFor": "Dec 2026",
    "source": "Adapted from my LinkedIn post of December 6, 2025.",
    "body": [
      {
        "type": "p",
        "text": "**Your calendar shows where your time went; your prompt history shows what you were actually thinking about.** It is easy to treat AI as a nine-to-five efficiency tool. When I reviewed my 2025 history, it told a richer story."
      },
      {
        "type": "p",
        "text": "About 60% was enterprise work, where the assistant acted like a principal architect pushing back on me about governance, design patterns and strategy. The other 40% was personal growth: learning, health, family questions and ideas I wanted to think through without an audience. I was surprised how large that second share was, and then not surprised at all. To grow as a leader, you have to grow as a person, and the questions you ask privately are a good measure of that."
      },
      {
        "type": "p",
        "text": "Try it yourself. Ask your assistant to act as a strategic career consultant and data analyst. Have it analyze your interaction history for the year, rank your top themes by frequency and complexity, explain the nature of each, and write a short professional profile of how you approach problems. Then read it the way you would read feedback from a candid colleague."
      },
      {
        "type": "p",
        "text": "What would your own prompt history say you spent the year working on?"
      }
    ]
  },
  {
    "slug": "simplicity-in-architecture",
    "title": "Simplicity is not simplistic",
    "summary": "Designs that are easy to explain, build and run take the most effort up front, and they are the ones still working years later.",
    "status": "published",
    "published": "2024-11-08",
    "plannedFor": "Mar 2027",
    "source": "Adapted from my LinkedIn post of November 7, 2024, and Medium.",
    "body": [
      {
        "type": "p",
        "text": "**Simple architecture is the hardest kind to produce, which is why there is so little of it.** By simplicity I mean designs that are easy to communicate, build and maintain: a deliberate reduction to the essential components. That is very different from simplistic, which skips the hard thinking and leaves the complexity for someone else to find later."
      },
      {
        "type": "p",
        "text": "Making a design look effortless takes considerable work. You have to understand the problem well enough to know what can be left out, and then defend those omissions when someone asks for one more layer, one more service or one more configuration option. Every component you add is a component someone will have to explain, secure and operate for years."
      },
      {
        "type": "p",
        "text": "My test is whether an engineer who joins next year can sketch the system on a whiteboard after a one-hour walkthrough. If they cannot, the design will slowly be rewritten by people working around parts they do not understand. Complexity rarely arrives in one big decision; it accumulates through many small ones that each seemed reasonable. The payoff is reliability and ease of operation, and both matter more every year a system runs."
      },
      {
        "type": "p",
        "text": "If you cannot explain it simply, you probably cannot run it reliably."
      }
    ]
  }
]
