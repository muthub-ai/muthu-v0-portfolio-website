import type { FigureName } from "@/components/figures"

// Public-safe case studies. Facts and numbers come only from the Career Master Profile.
// No internal system names, regulation IDs, security vendors, dollar figures for Wells Fargo, or unreleased work.

export interface Initiative {
  slug: string
  title: string
  summary: string
  organization: string
  period: string
  role: string
  featured?: boolean
  stats: { value: string; label: string }[]
  problem: string
  approach: string[]
  governance: string[]
  outcome: string[]
  lesson: string
  technologies: string[]
  relatedWriting: string[]
  links?: { label: string; url: string }[]
  /** Optional diagram from components/figures.tsx, shown after the approach. */
  figure?: FigureName
  /** Optional level-by-level architecture walkthrough (C4), shown full width after the case study. */
  architecture?: { intro: string; levels: { title: string; figure: FigureName; text: string }[] }
}

export const initiatives: Initiative[] = [
  {
    slug: "ai-augmented-sdlc",
    title: "AI-Augmented Software Development Lifecycle",
    summary:
      "Coding agents brought into a large bank's software lifecycle behind one governed platform: curated context, maker/checker controls and a single gateway for every model call.",
    organization: "Wells Fargo",
    period: "2024 – present",
    role: "Lead architect",
    featured: true,
    stats: [],
    problem:
      "Developers wanted AI assistants; the bank needed the productivity without losing control. Every line of AI-written code still had to meet the same quality, security and audit standards as code written by people.",
    approach: [
      "Built a multi-vendor agent ecosystem rather than betting on one tool, so the bank can swap agents as the market moves.",
      "Wrapped the agents in bank-built capabilities: context assembly, a harness layer, search and retrieval, and one gateway for governed access to models.",
      "Started in the developer's inner loop, then extended to the outer loop: CI/CD, platform operations, AI-augmented observability and service management.",
    ],
    governance: [
      "Maker/checker controls: agents produce, people and automated checks verify before anything ships.",
      "One gateway for every model call, so access, logging and policy are consistent.",
      "Automated vulnerability and patch remediation with continuously generated software bills of materials.",
      "Pilots proved value on a shared dashboard and passed stage gates before investment scaled.",
    ],
    outcome: [
      "A measurable productivity gain across the developer population, tracked on a shared dashboard and corroborated by developer surveys.",
      "A governed path that lets new agents and use cases join without building a new control framework each time.",
    ],
    lesson: "Model is a tool; harness is the strategy. Buy the agents, build the governance layer around them.",
    technologies: ["Generative AI", "Agentic AI", "Coding agents", "Model Context Protocol", "AI gateway", "Software bills of materials"],
    figure: "ai-native-sdlc",
    relatedWriting: ["the-ai-native-sdlc", "model-is-a-tool-harness-is-the-strategy"],
  },
  {
    slug: "architecture-as-code",
    title: "Architecture-as-Code Control Plane",
    summary:
      "An executable, policy-aware governance engine that checks designs automatically before they reach production, so architecture keeps pace with AI-speed delivery.",
    organization: "Wells Fargo",
    period: "2025 – present",
    role: "Architect",
    featured: true,
    stats: [],
    problem:
      "Architecture governance ran on documents and review meetings. As AI accelerated delivery, reviews became a bottleneck and approved designs drifted from what was actually running.",
    approach: [
      "Made architecture machine-readable and version-controlled, with reusable patterns and compliant-by-design code generation.",
      "Expressed standards as policy-as-code and evaluated them automatically in the delivery pipeline.",
      "Compared observed, current-state architecture with declared intent through automated checks before build and before go-live, moving toward model-to-runtime parity.",
    ],
    governance: [
      "Launched with a core set of automated guardrails and standards, expanded as teams adopted them.",
      "Automated design-time and deploy-time checks wired into the delivery pipeline.",
      "People keep the decisions that need judgment; machines run the checks that don't.",
    ],
    outcome: [
      "Adopted by architects and application teams across multiple lines of business.",
      "Shorter architecture reviews and far fewer manual reviews, with architects focused on the decisions that need them.",
    ],
    lesson: "Architecture is not what you say you'll build; it's what you actually allow into production.",
    technologies: ["Architecture-as-Code", "Policy-as-code (OPA/Rego)", "CI/CD", "Model Context Protocol"],
    figure: "architecture-as-code",
    relatedWriting: ["architecture-that-runs", "inside-an-architecture-as-code-platform", "spec-driven-development-for-regulated-industries"],
    links: [{ label: "See a working example: aac.muthub.org", url: "https://aac.muthub.org" }],
  },
  {
    slug: "aac-reference-platform",
    title: "Architecture-as-Code Reference Platform (open prototype)",
    summary:
      "aac.muthub.org: a public, working prototype of an architecture control plane, with catalogs, OPA policies, waivers, an executive scorecard, a CLI and an MCP server that brings the rules into coding agents. It is modeled in its own notation and passes its own rules.",
    organization: "Personal project",
    period: "2026",
    role: "Designer and builder",
    stats: [
      { value: "7", label: "containers, all fed by one Git repository of YAML" },
      { value: "436", label: "automated tests behind a 9-job governance pipeline" },
      { value: "10 · 3 · 2", label: "MCP resources, tools and prompts for AI coding agents" },
    ],
    problem:
      "Architecture-as-Code is easy to agree with and hard to picture. Leaders and engineers needed to see what an architecture control plane actually looks like before committing to one.",
    approach: [
      "Modeled systems, patterns, standards and waivers as machine-readable, version-controlled YAML validated by JSON Schema, using the C4 model's vocabulary for systems and containers.",
      "Built an operational lifecycle (define, build, test, accept, deploy) with automated schema validation, compliance checks and generated diagrams and documentation, gated by pull requests.",
      "Shipped developer utilities: a CLI (aac init, create, validate), an MCP server for IDEs and AI assistants, an OPA/Rego policy engine, context-driven development with Copilot Spaces and a reference GitHub Actions pipeline.",
    ],
    governance: [
      "Executable guardrails with pass/fail results on every pull request: five structural compliance rules plus OPA policies for encryption, API-gateway routing and rightsizing.",
      "Waivers as first-class records with risk, compensating controls, financial impact, an approver, a remediation plan and an expiry date.",
      "The platform's own C4 model lives in the repository and passes the same schema and rules it applies to every other system.",
    ],
    outcome: [
      "An executive scorecard computed directly from the artifacts: standards conformance, risk posture, technical-debt exposure, remediation velocity, pattern reuse and cloud spend at risk. The live site runs on a fictional sample portfolio.",
      "A public reference that colleagues and the community can explore, with its source on GitHub and a level-by-level C4 walkthrough below.",
    ],
    lesson: "A working prototype changes more minds than a strategy deck, and one that passes its own rules changes more still.",
    technologies: ["Architecture-as-Code", "C4 model", "YAML and JSON Schema", "OPA / Rego", "Model Context Protocol", "Next.js", "GitHub Actions", "GitHub Copilot Spaces"],
    relatedWriting: ["inside-an-architecture-as-code-platform", "architecture-that-runs"],
    links: [
      { label: "Explore the live platform: aac.muthub.org", url: "https://aac.muthub.org" },
      { label: "Read the source on GitHub", url: "https://github.com/muthub-ai/aac" },
      { label: "Download the platform's C4 model (YAML)", url: "/downloads/aac-platform-system.yaml" },
    ],
    architecture: {
      intro:
        "The platform described in its own notation. Levels 1 and 2 and the deployment view are drawn from its C4 model in model/aac-platform, which passes the platform's own schema and compliance rules. Levels 3 and 4 are drawn from the source code, because the model deliberately stops at containers.",
      levels: [
        {
          title: "Level 1: System context",
          figure: "c4-context",
          text: "Who the platform serves and what it depends on. Three people use it directly, and an AI coding assistant in the engineer's IDE is treated as a first-class user: it reads standards and validates designs through the MCP server, so agent-written designs meet the same rules as human ones.",
        },
        {
          title: "Level 2: Containers",
          figure: "c4-container",
          text: "Seven containers, six of them projections of one Git repository. The dashboard has no database and reads the repository at build time, so nothing at runtime can drift from Git. The CLI validates against the published schemas with ETag caching, so every team's pipeline checks against the same contract the platform publishes.",
        },
        {
          title: "Level 3: Components of the MCP server",
          figure: "c4-component-mcp",
          text: "Governance as an API for agents. Resources are read-only views, including only the approved, unexpired waivers; tools validate, lint and scaffold; prompts guide design and exception requests. Separating reading from acting lets an enterprise grant an agent one without the other.",
        },
        {
          title: "Level 3: Components of the web dashboard",
          figure: "c4-component-web",
          text: "Pure functions for parsing, validation, view filtering, layout and export, wrapped by a thin React layer. The pipeline's diagram build reuses the same parser, view filter and layout, so previews on pull requests match the dashboard.",
        },
        {
          title: "Level 4: Code of the YAML and diagram sync",
          figure: "c4-code-sync",
          text: "Drawn because it guards an invariant. Engineers can edit YAML or drag boxes, and each updates the other; a single syncSource field records which side started the change so the two update paths cannot loop. C4 treats this level as optional, and it is worth drawing only where a detail like this is easy to break.",
        },
        {
          title: "Deployment",
          figure: "c4-deployment",
          text: "GitHub hosts the repository, runs the pipeline and serves the documentation microsite; Vercel serves the dashboard at aac.muthub.org; the CLI and MCP server run on engineers' machines, launched by the shell or the IDE.",
        },
        {
          title: "Dynamic: a governed change, end to end",
          figure: "c4-dynamic-change",
          text: "From a local edit, by a person or an agent, through pull-request checks, diagram previews and architect review, to a published microsite and a rebuilt dashboard. The pull request is the architecture review board.",
        },
      ],
    },
  },
  {
    slug: "enterprise-genai-architecture",
    title: "Enterprise Generative AI Architecture",
    summary:
      "An enterprise-grade Generative AI reference architecture: a governed path from experiment to production, adopted as the reference model across business lines.",
    organization: "Wells Fargo",
    period: "2024",
    role: "Executive Director, Data & AI architecture",
    featured: true,
    stats: [],
    problem:
      "Teams across the bank wanted to use large language models, but there was no approved, governed way to take a Generative AI use case from experiment to production.",
    approach: [
      "Designed a modular, phased reference architecture covering data ingestion, processing, embedding, retrieval, generation and validation.",
      "Set an enterprise model strategy across public cloud and on-premises infrastructure, spanning frontier and open models.",
      "Published reusable archetypes for model deployment and inferencing, and for model development, training and validation.",
    ],
    governance: [
      "Model guardrails and AI gateways against prompt injection and data leakage.",
      "Security testing of every Generative AI use case before it goes live.",
      "A governed experimentation environment with automated lineage, detective controls and secure data access.",
    ],
    outcome: [
      "Approved through enterprise architecture governance and adopted as the reference model across business lines.",
      "The first use case, a retrieval-augmented assistant for internal policy guidance, went from pilot to production on this architecture.",
    ],
    lesson: "Governance designed in from the first use case is what lets the second, third and twentieth move fast.",
    technologies: ["Generative AI", "Retrieval-augmented generation", "Public cloud", "Model guardrails", "AI gateway"],
    figure: "agent-harness",
    relatedWriting: ["adopting-mcp-in-a-bank", "model-is-a-tool-harness-is-the-strategy"],
  },
  {
    slug: "multi-cloud-ai-strategy",
    title: "Data & AI on Public Cloud",
    summary:
      "A multi-cloud Data & AI strategy and reusable, pre-approved archetypes that made public-cloud onboarding much faster and modernized a legacy data warehouse.",
    organization: "Wells Fargo",
    period: "2023 – 2024",
    role: "Served as chief architect for Data & AI on public cloud",
    stats: [],
    problem:
      "Lines of business were adopting cloud data and AI services one design at a time, with inconsistent controls and duplicated effort.",
    approach: [
      "Defined a multi-cloud Data & AI strategy with strategic, logical and physical reference architecture, a target state and a phased roadmap.",
      "Enabled managed AI platforms and the model development lifecycle for predictive and generative models on public cloud.",
      "Created prescriptive, reusable Cloud Data & AI archetypes so teams could start from an approved pattern.",
    ],
    governance: [
      "Controlled data movement and enterprise data controls built into every archetype.",
      "Architecture-led delivery, with every archetype approved once through enterprise architecture review.",
    ],
    outcome: [
      "Public-cloud onboarding cut from months to weeks using the archetypes and codified patterns.",
      "One approved path for a growing set of cloud data and AI services across lines of business.",
      "A legacy data warehouse modernized to a cloud lakehouse at lower infrastructure cost.",
    ],
    lesson: "Reusable, pre-approved patterns beat one-off reviews: they make the compliant path the fastest path.",
    technologies: ["Public cloud", "Multi-cloud", "Managed AI platforms", "Cloud data warehouse", "Lakehouse", "Data pipelines"],
    relatedWriting: ["agent-first-data-architecture"],
  },
  {
    slug: "controlled-data-movement-archetype",
    title: "Controlled Data Movement",
    summary:
      "A configuration-driven, secure data movement pattern built at USAA to move 25B+ records a day, then carried to Wells Fargo as a bank-wide framework for analytics and AI.",
    organization: "USAA and Wells Fargo",
    period: "2020 – 2024",
    role: "Architect at USAA; Executive Director at Wells Fargo",
    stats: [
      { value: "25B+", label: "records per day at USAA" },
      { value: "20x", label: "scalability in the next-generation platform" },
      { value: "99.9%", label: "service-level objective" },
    ],
    problem:
      "Analytics and machine learning need large volumes of sensitive data in the cloud, moved reliably, with every control a regulator would expect.",
    approach: [
      "At USAA, architected a configuration-driven pipeline moving 25B+ records and 800,000 files a day into AWS and Snowflake.",
      "Delivered a next generation with 20x scalability, 10x lower latency and a 0.01% exception rate at a 99.9% SLO.",
      "At Wells Fargo, worked with data leadership to turn the blueprint into a bank-wide controlled data movement framework and archetype.",
    ],
    governance: [
      "Strict data isolation, granular access control and perimeter-based ingress and egress rules.",
      "Column-level encryption and de-identification for sensitive data.",
      "Automated audit logging, validation, rule-based reprocessing, lineage and catalog integration.",
    ],
    outcome: [
      "A resilient data backbone for analytics and AI at two regulated institutions.",
      "Observability, lineage and catalog integration built into the pattern from the start.",
    ],
    lesson: "Make the secure path configuration, not custom code, and teams will choose it.",
    technologies: ["AWS S3", "Snowflake", "Perimeter security", "Data loss prevention", "Lineage and catalog", "Observability"],
    figure: "controlled-data-movement",
    relatedWriting: ["agent-first-data-architecture"],
  },
  {
    slug: "unified-ml-platform",
    title: "Enterprise Machine Learning Platform",
    summary:
      "An enterprise MLOps platform that moved 360 data scientists onto one governed environment, saved $25M in license costs over 3 years and cut model deployment from 8 weeks to 5 days.",
    organization: "USAA",
    period: "2017 – 2022",
    role: "Lead Software Engineer, then Staff Engineer",
    featured: false,
    stats: [
      { value: "360", label: "data scientists on one governed platform" },
      { value: "$25M", label: "license savings over 3 years" },
      { value: "8 wks → 5 days", label: "model deployment time" },
    ],
    problem:
      "Data scientists worked in non-compliant sandboxes and on desktops across many tools. Models took weeks to deploy, and Risk had no consistent way to validate them.",
    approach: [
      "Architected a unified platform (Domino, Airflow, cloud-native) managing the full model lifecycle across Python, R, SAS and H2O.",
      "Built deployment pipelines for on-demand, batch, event-driven and automated retraining workloads; introduced Apache Airflow at USAA.",
      "Created a one-click Model Deploy Console with audit traceability.",
    ],
    governance: [
      "The platform became Model Risk Management's shared basis for independent model validation.",
      "Helped create the first-line model risk operating model with the Enterprise Model Risk Management Committee.",
      "Per-model drift monitoring feeding automated retraining.",
    ],
    outcome: [
      "360 data scientists and modeling analysts consolidated; $25M saved in license costs over 3 years.",
      "Model deployment time cut from 8 weeks to 5 days; 22 models to production in 6 months across 3 lines of business.",
      "Real-time scoring for 5 cyber financial-crime models at 24M+ scores per day, under 500 ms.",
    ],
    lesson: "A trained model is only the beginning. Value comes from industrializing deployment, monitoring and validation.",
    technologies: ["Domino", "Apache Airflow", "Kafka", "OpenShift", "Python", "R", "SAS", "H2O", "Prometheus", "Grafana"],
    figure: "ml-platform-lifecycle",
    relatedWriting: [],
  },
  {
    slug: "data-analytics-platform-usaa",
    title: "Cloud Data & Analytics Platform",
    summary:
      "A cloud data platform at USAA processing 25B+ records a day, with an AWS architecture approved for identity, data protection and detective controls.",
    organization: "USAA",
    period: "2020 – 2022",
    role: "Staff Engineer, Data & Analytics Platform",
    stats: [
      { value: "25B+", label: "records per day" },
      { value: "800K", label: "files per day" },
      { value: "10x", label: "lower latency in the next generation" },
    ],
    problem:
      "Analytics, risk and machine learning teams needed governed, reliable data in the cloud at a scale the on-premises platform could not support.",
    approach: [
      "Led architecture for modular orchestration, parallelized ingestion and dynamic workload partitioning into AWS and Snowflake.",
      "As part of the Cloud Data Center of Excellence, wrote and gave final approval on AWS architecture specifications for identity, data protection, financial management, infrastructure security and detective controls.",
      "Delivered cloud-to-cloud data movement for claims modernization.",
    ],
    governance: [
      "Automated lineage, catalog and sensitive-data protection.",
      "Rule-based automated reprocessing with Datadog and ELK observability.",
    ],
    outcome: [
      "25B+ records and 800,000 files processed a day.",
      "Next generation: 20x scalability, 10x lower latency, 0.01% exception rate, 99.9% SLO.",
    ],
    lesson: "Approve the platform's controls once, carefully, and every team that builds on it inherits them.",
    technologies: ["AWS S3", "SageMaker", "EMR", "Kinesis", "Macie", "Snowflake", "Apache Airflow", "Datadog"],
    relatedWriting: [],
  },
  {
    slug: "enterprise-iam-oracle",
    title: "Enterprise Identity & Access Management",
    summary:
      "Built USAA's first Oracle Identity Federation servers and the access-management foundation for single sign-on, multi-factor authentication and partner integrations.",
    organization: "USAA",
    period: "2012 – 2017",
    role: "Senior Computer Systems Engineer",
    stats: [
      { value: "1st", label: "identity federation servers at USAA" },
      { value: "80+", label: "WebLogic servers" },
    ],
    problem: "A growing set of internal and partner applications needed consistent single sign-on, strong authentication and auditable access.",
    approach: [
      "Built USAA's first Oracle Identity Federation servers.",
      "Engineered Oracle Access Manager (single sign-on, multi-factor authentication, authorization) and Oracle Identity Manager across 80+ WebLogic servers.",
    ],
    governance: ["Supported regulatory access reviews and centralized authorization."],
    outcome: ["The foundation for later Okta and Salesforce integrations."],
    lesson: "Identity is the first guardrail. Get it right and every later control is easier.",
    technologies: ["Oracle Access Manager", "Oracle Identity Federation", "Oracle Identity Manager", "WebLogic", "SAML", "OAuth"],
    relatedWriting: [],
  },
  {
    slug: "middleware-platforms-bunge",
    title: "Middleware & Global Enterprise Systems",
    summary:
      "Led Bunge's middleware and business-application platforms, delivered a Hyperion upgrade for 2,000 users worldwide and set the enterprise service bus strategy adopted across Bunge companies.",
    organization: "Bunge North America",
    period: "2009 – 2012",
    role: "IT Technical Manager, Middleware Platforms",
    stats: [
      { value: "2,000", label: "users on the global Hyperion upgrade" },
      { value: "Global", label: "ESB strategy adopted across Bunge companies" },
    ],
    problem:
      "A global commodities company ran critical finance and collaboration systems on a diverse middleware estate that needed upgrades, consolidation and a common integration strategy.",
    approach: [
      "Led the team responsible for WebSphere, SAS, Tibco, WebFOCUS, IBM Connections, Hyperion Financial Management and Tableau.",
      "Defined the Tibco enterprise service bus strategy, presented at Bunge's global office in 2009.",
      "Led multi-country upgrades with a geographically and culturally diverse team.",
    ],
    governance: [
      "Federated single sign-on across the portal, SAS, Tableau, IBM Connections and Hyperion (SiteMinder, SPNEGO, Ping Federate SAML 2.0).",
      "Application and server monitoring with Zabbix and SiteScope.",
    ],
    outcome: [
      "Hyperion Financial Management upgraded for 2,000 users worldwide.",
      "The ESB strategy was adopted across Bunge companies globally.",
    ],
    lesson: "Platforms outlast projects. A common integration strategy pays off for a decade.",
    technologies: ["IBM WebSphere", "Tibco", "SAS", "Hyperion", "Tableau", "SiteMinder", "Ping Federate"],
    relatedWriting: [],
  },
]
