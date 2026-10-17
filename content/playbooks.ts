// Evergreen playbooks (/playbooks). Kept current: change `reviewed` whenever an item is revised.
// Links point only to public sources that were checked when the item was written.

export interface PlaybookItem {
  title: string
  text: string
  check: string
}

export interface Playbook {
  slug: string
  title: string
  short: string
  summary: string
  reviewed: string
  intro: string[]
  items: PlaybookItem[]
  closing: string
}

const governingCodingAgents: Playbook = {
  slug: "governing-coding-agents",
  short: "Governing coding agents",
  title: "Governing coding agents in a bank: a 12-point checklist",
  summary:
    "The controls a regulated enterprise needs before coding agents write production code at scale. One page, kept current, meant to be copied into your own standards.",
  reviewed: "2026-10-11",
  intro: [
    "Most banks I talk to are past the question of whether to use coding agents. The question now is what has to be true before agents touch code that moves money, holds customer data or sits in front of a regulator. This is my answer, written as a checklist you can hold a program against.",
    "None of these controls is exotic. What separates programs that scale from programs that stall is doing all twelve at once, and building them into the platform instead of a review board. If a control depends on someone remembering to apply it, agents will outrun it within a quarter.",
  ],
  items: [
    {
      title: "Write down what each agent may do",
      text: "Scope every agent by repository, environment and action: read, propose, commit, deploy. Default to propose-only and widen access per use case. [OWASP calls the failure mode excessive agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/), and it is the easiest one to prevent on day one.",
      check: "Every agent has a written scope, and the platform enforces it.",
    },
    {
      title: "Give every agent its own identity",
      text: "No shared service accounts and no long-lived tokens pasted into configuration. Each agent gets a workload identity with short-lived credentials, so every action is attributable. Patterns such as [SPIFFE](https://spiffe.io/docs/latest/spiffe-about/overview/) and the [MCP authorization specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization) show the direction.",
      check: "You can name which agent made any change, and revoke it in minutes.",
    },
    {
      title: "Send every model call through one gateway",
      text: "A single AI gateway gives you one place for the model allowlist, logging, data-loss controls, rate limits and cost. Teams that wire models directly into tools end up with as many policies as they have teams.",
      check: "No production path calls a model except through the gateway.",
    },
    {
      title: "Govern the tools as well as the models",
      text: "Agents act through tools, and tool descriptions are an attack surface: [Invariant Labs showed tool poisoning](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) in practice. Keep an internal registry of approved MCP servers and block the rest, the way [GitHub added registry and allowlist controls](https://github.blog/changelog/2025-09-12-internal-mcp-registry-and-allowlist-controls-for-vs-code-insiders/) for Copilot.",
      check: "Unregistered tool servers are blocked by default.",
    },
    {
      title: "Curate the context agents read",
      text: "Agents follow whatever standards they can see. Give them your approved patterns, architecture decisions and security standards as owned, dated context, and retire stale material. [Anthropic treats context as a finite resource](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents); in a bank it is also a control.",
      check: "Every context source an agent reads has an owner and a review date.",
    },
    {
      title: "Put policy in the pipeline",
      text: "Architecture and security rules run as code on every pull request, for human and agent changes alike, using tools such as [Open Policy Agent](https://www.openpolicyagent.org/docs). The [Architecture-as-Code prototype at aac.muthub.org](https://aac.muthub.org) shows what that looks like end to end, waivers included.",
      check: "A change that breaks a standard fails the build, with a named waiver path.",
    },
    {
      title: "Keep maker and checker separate",
      text: "Agents propose; a person with authority approves. Scale review effort to two questions: how far can this change reach, and how quickly can we undo it. A one-line fix in a test helper and a change to payment routing should not get the same review.",
      check: "No agent can approve its own change, and high-impact paths require named approvers.",
    },
    {
      title: "Record provenance for every change",
      text: "Capture which agent and model produced the change, from which spec or prompt, and who approved it. Emerging formats such as [Agent Trace](https://agent-trace.dev/) build on supply-chain ideas like [SLSA provenance](https://slsa.dev/spec/v1.0/provenance). If you cannot show why the code exists, you cannot defend it to an auditor.",
      check: "For any production change, you can show the agent, the inputs and the approver.",
    },
    {
      title: "Scan everything agents add",
      text: "Agents add dependencies, copy patterns and occasionally leak secrets. Run dependency, secret and license scanning on every change and keep software bills of materials current, so a new vulnerability maps to affected services in hours.",
      check: "Every merged change has passed dependency, secret and license checks.",
    },
    {
      title: "Use specs for high-risk changes",
      text: "For regulated logic, review the specification first and let tests trace back to it. [GitHub's Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit) and the [Thoughtworks Radar](https://www.thoughtworks.com/radar/techniques/spec-driven-development) describe the approach. Auditors can review a contract; nobody can review every generated line.",
      check: "High-risk changes link to an approved spec, and tests trace to it.",
    },
    {
      title: "Measure outcomes, not usage",
      text: "Seats and prompts tell you nothing. Track delivery and stability measures in the spirit of [DORA's research](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report), plus rework and escaped defects. Be wary of perceived speed: [METR's randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found experienced developers were slower with AI tools on their own codebases while believing they were faster.",
      check: "Every pilot has a baseline, a target and a gate before it scales.",
    },
    {
      title: "Plan for the bad day",
      text: "Have a kill switch per agent, a rollback path and an incident playbook for agent misbehavior, including prompt injection from content the agent reads. The [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) is a good list to red-team against. Rehearse it before an auditor or an attacker does it for you.",
      check: "You can disable any agent in minutes and have rehearsed doing it.",
    },
  ],
  closing:
    "If you can tick all twelve, you are ready to widen agent access. If you cannot, the gaps tell you what to build next. Which of the twelve would your program fail today?",
}

const aiOperatingModel: Playbook = {
  slug: "ai-operating-model-for-a-bank",
  short: "An AI operating model for a bank",
  title: "An AI operating model for a bank: ten decisions to make before the twentieth use case",
  summary:
    "How a regulated bank should organize, fund, govern and measure AI so that the first few wins turn into a portfolio instead of a pile of pilots.",
  reviewed: "2026-10-16",
  intro: [
    "The first three AI use cases in a bank rarely fail for technical reasons. They succeed on the energy of a few people. The trouble starts around the tenth and twentieth, when every team builds its own gateway, its own evaluation and its own approval path, and nobody can say what the portfolio is worth.",
    "An operating model is the set of decisions that stops that from happening. These are the ten I would want settled before a bank scales, written so a CIO, a chief risk officer and a head of AI can agree on them in one meeting.",
  ],
  items: [
    {
      title: "Name one accountable leader and a federated model",
      text: "Put one executive in charge of the AI portfolio, platform and standards, and let lines of business own their use cases and outcomes. A pure central team becomes a bottleneck; pure federation produces twenty platforms. Hub and spoke is boring and it works.",
      check: "One person can answer for the whole portfolio, and every use case has a named business owner.",
    },
    {
      title: "Run a portfolio, not a pile of pilots",
      text: "Every use case enters through one intake with a problem statement, a baseline, a value hypothesis and kill criteria. Review the portfolio quarterly and stop work that is not earning its place. [Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027); a bank should cancel its own, early and on purpose.",
      check: "There is one list of AI use cases, each with a baseline, a target and a stop rule.",
    },
    {
      title: "Build the platform before the twentieth use case",
      text: "The gateway, evaluation harness, curated context, observability and identity for agents should be shared services. Teams buy or build models; the platform supplies the controls. This is where the model-is-a-tool, harness-is-the-strategy idea becomes an org chart.",
      check: "New use cases reuse the platform's gateway, evaluation and logging instead of building their own.",
    },
    {
      title: "Tier use cases by risk and set controls by tier",
      text: "An internal drafting assistant, a customer-facing chatbot and a model that influences a credit decision are not the same risk. Define three or four tiers with proportionate controls, in the spirit of the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework), so low-risk work moves fast and high-risk work gets the scrutiny it needs.",
      check: "Every use case has a risk tier, and the tier decides its controls and approvers.",
    },
    {
      title: "Bring model risk in at design, not at launch",
      text: "Second-line reviewers who first see a system the week before go-live can only say no. Give them a seat in design reviews and a standard evidence pack, so validation becomes a check of known evidence rather than an archaeology project.",
      check: "Model risk reviewers see each high-tier use case at design, with a standard evidence pack.",
    },
    {
      title: "Treat evaluation as a product",
      text: "Each use case needs a test set, regression evaluations that run on every change, and sampled human review in production. [Anthropic's guidance on agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) is a practical starting point. If you cannot measure quality, you cannot defend it to a regulator or improve it.",
      check: "No use case reaches production without an evaluation suite that runs automatically.",
    },
    {
      title: "Give knowledge an owner",
      text: "Agents are only as good as the context they are allowed to read. Policies, procedures and architecture decisions need owners, review dates and retirement rules. [Anthropic describes context as a finite resource](https://anthropic.com/engineering/effective-context-engineering-for-ai-agents); in a bank it is also a control surface.",
      check: "Every knowledge source an agent reads has an owner and a review date.",
    },
    {
      title: "Plan for the bad day",
      text: "Prompt injection, data leakage and confident wrong answers will happen. Red-team each tier against the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/), keep a kill switch per use case, and rehearse the incident path with operations and communications before the first public launch.",
      check: "Every production use case has a kill switch, an incident runbook and a rehearsal date.",
    },
    {
      title: "Invest in fluency, not only tools",
      text: "Executives need enough fluency to ask the right questions; engineers need new review habits; risk partners need to read evaluation results. Training is cheap compared with a program that stalls because the people approving it do not trust what they are approving.",
      check: "Leaders, engineers and risk partners each have a role-specific AI curriculum.",
    },
    {
      title: "Measure outcomes and cost per task",
      text: "Report value in the terms the business already uses: cycle time, quality, losses avoided, revenue, plus cost per task. Usage counts are vanity. [DORA's research](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) shows AI amplifies the system it lands in, so measure the system, not the tool.",
      check: "The portfolio report shows outcomes and unit cost for each use case every quarter.",
    },
  ],
  closing:
    "None of these decisions is technical, and that is the point: the technology is the easy part. Which of the ten has your bank not made yet?",
}

const gatingAiInvestment: Playbook = {
  slug: "gating-ai-investment",
  short: "Gating AI investment",
  title: "Gating AI investment: eight gates from pilot to production",
  summary:
    "A stage-gate checklist for funding AI use cases in a regulated enterprise: what evidence each gate needs, so money follows results instead of enthusiasm.",
  reviewed: "2026-10-16",
  intro: [
    "Most AI budgets in large enterprises are released the way software budgets were in 2005: a business case up front, a status report every month, and a surprise at the end. AI rewards a different pattern. Release money in small amounts against evidence, and stop early when the evidence does not come.",
    "These eight gates are the ones I would hold any AI use case to. Each has a single question and a check you can verify without a slide deck.",
  ],
  items: [
    {
      title: "The problem and its baseline",
      text: "Start with the process as it is today: how long it takes, what it costs, how often it goes wrong. Without a baseline, every pilot looks like a success.",
      check: "The current process is measured on the metric the use case claims to improve.",
    },
    {
      title: "A value hypothesis with a number",
      text: "State the expected change and what it is worth: hours saved per case, error rate reduced, revenue per offer. Write down the result that would make you stop.",
      check: "There is a target, a dollar value and a stop threshold, agreed by the business owner.",
    },
    {
      title: "Data rights and readiness",
      text: "Confirm the data exists, is good enough, and is allowed to be used for this purpose. Many promising pilots die here, which is the cheapest place for them to die.",
      check: "Data owners have approved the use, and a sample has passed a quality check.",
    },
    {
      title: "Risk tier and controls",
      text: "Assign the risk tier and the controls that come with it before building anything, using a shared framework such as the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework). Controls designed in are cheap; controls bolted on are expensive and late.",
      check: "The risk tier is recorded, and the required controls are in the backlog.",
    },
    {
      title: "Offline evaluation passed",
      text: "Before real users touch it, the system must meet agreed quality thresholds on a representative test set, including the hard and adversarial cases. [Anthropic's guidance on agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) covers how to build one.",
      check: "Evaluation results meet the thresholds set at gate two, and they are reproducible.",
    },
    {
      title: "Pilot results against the baseline",
      text: "Run with real users in a limited scope and compare against the baseline, not against expectations. Be wary of reported speed: [METR's randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found experienced developers were slower with AI tools while believing they were faster.",
      check: "Measured pilot results, including cost per task, beat the baseline by the target margin.",
    },
    {
      title: "Operational readiness",
      text: "Production needs an owner on call, monitoring for quality drift, a rollback path and a kill switch. A use case that cannot be turned off safely is not ready to be turned on.",
      check: "Monitoring, rollback, kill switch and an accountable owner are in place and tested.",
    },
    {
      title: "Scale, with a sunset rule",
      text: "Scale funding in steps tied to the same metrics, and set the condition under which the use case will be retired or rebuilt. [Gartner expects many agentic projects to be cancelled](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027); the ones that survive will be the ones measured honestly.",
      check: "Each funding step is tied to a metric, and the retirement condition is written down.",
    },
  ],
  closing:
    "Gates feel slow on the first use case and fast on the tenth, because the evidence and the controls are already in place. Which gate does your current portfolio skip most often?",
}

export const playbooks: Playbook[] = [governingCodingAgents, aiOperatingModel, gatingAiInvestment]

export function getPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug)
}
