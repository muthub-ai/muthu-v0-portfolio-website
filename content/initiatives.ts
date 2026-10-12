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
}

export const initiatives: Initiative[] = [
  {
    slug: "ai-augmented-sdlc",
    title: "AI-Augmented Software Development Lifecycle",
    summary:
      "Coding agents inside a large bank's software lifecycle, governed by a bank-built context layer, maker/checker controls and one AI gateway. A 32% productivity gain across 21,000 developers.",
    organization: "Wells Fargo",
    period: "2024 – present",
    role: "Lead architect, in partnership with the Chief Development Officer",
    featured: true,
    stats: [
      { value: "32%", label: "productivity gain, measured by pull-request approval rate per developer" },
      { value: "21,000", label: "developers in scope" },
      { value: "4", label: "coding agents behind one governed platform" },
    ],
    problem:
      "Developers wanted AI assistants; the bank needed the productivity without losing control. Every line of AI-written code still had to meet the same quality, security and audit standards as code written by people.",
    approach: [
      "Built a multi-vendor agent ecosystem (GitHub Copilot, Cognition Devin, Anthropic Claude and Cursor) rather than betting on one tool.",
      "Wrapped the agents in bank-built capabilities: context assembly, a harness layer, search and retrieval, and a unified AI gateway for governed access to models.",
      "Started in the developer's inner loop, then extended to the outer loop: CI/CD, platform operations, AI-augmented observability and service management.",
    ],
    governance: [
      "Maker/checker controls: agents produce, people and automated checks verify before anything ships.",
      "One gateway for every model call, so access, logging and policy are consistent.",
      "Automated vulnerability and patch remediation with continuously generated software bills of materials.",
      "Pilots proved value on a shared dashboard and passed stage gates before investment scaled.",
    ],
    outcome: [
      "A 32% productivity gain across 21,000 developers, measured by pull-request approval rate per developer and corroborated by a developer survey.",
    ],
    lesson: "Model is a tool; harness is the strategy. Buy the agents, build the governance layer around them.",
    technologies: ["Generative AI", "Agentic AI", "GitHub Copilot", "Cognition Devin", "Anthropic Claude", "Cursor", "Model Context Protocol", "AI gateway"],
    relatedWriting: ["the-ai-native-sdlc", "model-is-a-tool-harness-is-the-strategy"],
  },
  {
    slug: "architecture-as-code",
    title: "Architecture-as-Code Control Plane",
    summary:
      "An executable, policy-aware governance engine that checks designs automatically before they reach production, adopted across 4,500+ applications and cutting architecture review time 50%.",
    organization: "Wells Fargo",
    period: "2025 – present",
    role: "Architect, built with the Chief Architects",
    featured: true,
    stats: [
      { value: "4,500+", label: "applications covered" },
      { value: "50%", label: "less architecture review time" },
      { value: "35%", label: "fewer manual reviews" },
    ],
    problem:
      "Architecture governance ran on documents and review meetings. As AI accelerated delivery, reviews became a bottleneck and approved designs drifted from what was actually running.",
    approach: [
      "Made architecture machine-readable and version-controlled, with reusable patterns and compliant-by-design code generation.",
      "Expressed standards as policy-as-code and evaluated them automatically in the delivery pipeline.",
      "Compared observed, current-state architecture with declared intent through automated permit-to-build and permit-to-operate checks, moving toward model-to-runtime parity.",
    ],
    governance: [
      "Launched with 35 automated guardrails and 20 standards.",
      "Automated permit-to-build and permit-to-operate checks on 2,000+ applications.",
      "People keep the decisions that need judgment; machines run the checks that don't.",
    ],
    outcome: [
      "Adopted by 400 architects across 4,500+ applications, 7 lines of business and 5,000+ application owners.",
      "Architecture review time cut 50% and manual reviews cut 35%.",
    ],
    lesson: "Architecture is not what you say you'll build; it's what you actually allow into production.",
    technologies: ["Architecture-as-Code", "Policy-as-code (OPA/Rego)", "CI/CD", "Model Context Protocol"],
    relatedWriting: ["architecture-that-runs", "inside-an-architecture-as-code-platform", "spec-driven-development-for-regulated-industries"],
    links: [{ label: "See a working example: aac.muthub.org", url: "https://aac.muthub.org" }],
  },
  {
    slug: "aac-reference-platform",
    title: "Architecture-as-Code Reference Platform (open prototype)",
    summary:
      "aac.muthub.org: a public, working prototype of an architecture control plane, with catalogs, OPA policies, waivers, an executive scorecard, a CLI and an MCP server that brings the rules into coding agents.",
    organization: "Personal project",
    period: "2026",
    role: "Designer and builder",
    stats: [
      { value: "259K", label: "lines of code across the platform" },
      { value: "11", label: "repositories, 22 deployable units" },
      { value: "7", label: "developer utilities (CLI, MCP server, policy engine and more)" },
    ],
    problem:
      "Architecture-as-Code is easy to agree with and hard to picture. Leaders and engineers needed to see what an architecture control plane actually looks like before committing to one.",
    approach: [
      "Modeled systems, patterns, standards and waivers as machine-readable, version-controlled catalogs (YAML, JSON and C4/Structurizr).",
      "Built an operational lifecycle (plan, build, test, accept, deploy) with automated schema validation, compliance checks and generated diagrams and documentation, gated by pull requests.",
      "Shipped developer utilities: a CLI (aac init, validate), an MCP server for IDEs and AI assistants, an OPA/Rego policy engine, context-driven development with Copilot Spaces and a reference GitHub Actions pipeline.",
    ],
    governance: [
      "Executable guardrails with pass/fail results on every pull request, including encryption, autoscaling and API-gateway policies.",
      "Waivers as first-class records with risk, expiry and remediation tracking.",
      "Model-to-runtime drift detection and architecture decision records kept next to the code.",
    ],
    outcome: [
      "An executive scorecard computed directly from the artifacts: standards conformance, risk posture, technical-debt exposure, remediation velocity, pattern reuse and cloud spend at risk.",
      "A public reference that colleagues and the community can explore, referenced in my most-read Architecture-as-Code writing.",
    ],
    lesson: "A working prototype changes more minds than a strategy deck.",
    technologies: ["Architecture-as-Code", "C4 / Structurizr", "OPA / Rego", "Model Context Protocol", "GitHub Actions", "GitHub Copilot Spaces", "JSON Schema"],
    relatedWriting: ["inside-an-architecture-as-code-platform", "architecture-that-runs"],
    links: [{ label: "Explore the live platform: aac.muthub.org", url: "https://aac.muthub.org" }],
  },
  {
    slug: "enterprise-genai-architecture",
    title: "Enterprise Generative AI Architecture",
    summary:
      "The bank's first enterprise-grade Generative AI architecture: a governed path from experiment to production, adopted as the reference model across business lines.",
    organization: "Wells Fargo",
    period: "2024",
    role: "Principal Architect",
    featured: true,
    stats: [
      { value: "1st", label: "enterprise Generative AI architecture at the bank" },
      { value: "5,000", label: "bankers in the first use case pilot" },
      { value: "Sept 2024", label: "first use case live" },
    ],
    problem:
      "Teams across the bank wanted to use large language models, but there was no approved, governed way to take a Generative AI use case from experiment to production.",
    approach: [
      "Designed a modular, phased reference architecture covering data ingestion, processing, embedding, retrieval, generation and validation.",
      "Set an enterprise model strategy across public cloud and on-premises GPU infrastructure, spanning frontier and open models.",
      "Published reusable archetypes for model deployment and inferencing, and for model development, training and validation.",
    ],
    governance: [
      "Model guardrails and AI gateways against prompt injection and data leakage.",
      "Security testing of Generative AI use cases with cybersecurity and cloud-provider partners.",
      "A governed experimentation environment with automated lineage, detective controls and secure data access.",
    ],
    outcome: [
      "Endorsed by the Cloud Architecture Panel, presented to the CTO and CIO, and adopted as the reference model across business lines.",
      "The first use case, a retrieval-augmented assistant giving bankers real-time policy guidance, went live in September 2024 and was piloted with 5,000 bankers.",
    ],
    lesson: "Governance designed in from the first use case is what lets the second, third and twentieth move fast.",
    technologies: ["Generative AI", "Retrieval-augmented generation", "Google Cloud", "Vertex AI", "Gemini", "Model Armor", "AI gateway"],
    relatedWriting: ["adopting-mcp-in-a-bank", "model-is-a-tool-harness-is-the-strategy"],
  },
  {
    slug: "multi-cloud-ai-strategy",
    title: "Data & AI on Public Cloud",
    summary:
      "A multi-cloud (GCP and Azure) Data & AI strategy and reusable archetypes that cut public-cloud onboarding from 16 weeks to 4, including a Teradata-to-BigQuery modernization that cut infrastructure costs 35%.",
    organization: "Wells Fargo",
    period: "2023 – 2024",
    role: "Served as chief architect for Data & AI on public cloud",
    stats: [
      { value: "16 → 4 wks", label: "public-cloud onboarding time with archetypes" },
      { value: "14", label: "GCP services enabled through archetypes" },
      { value: "35%", label: "lower infrastructure cost after Teradata-to-BigQuery" },
    ],
    problem:
      "Lines of business were adopting cloud data and AI services one design at a time, with inconsistent controls and duplicated effort.",
    approach: [
      "Defined a multi-cloud Data & AI strategy with strategic, logical and physical reference architecture, a target state and a phased roadmap.",
      "Enabled Gemini models, the Vertex AI platform and the model development lifecycle for predictive and generative models on Google Cloud.",
      "Created prescriptive, reusable Cloud Data & AI archetypes so teams could start from an approved pattern.",
    ],
    governance: [
      "Controlled data movement and enterprise data controls built into every archetype.",
      "Architecture-led delivery, with every archetype approved once through enterprise architecture review.",
    ],
    outcome: [
      "Public-cloud onboarding cut 75%, from 16 weeks to 4 weeks, using the archetypes and codified patterns.",
      "Archetypes enabled 14 GCP services across lines of business.",
      "Teradata-to-BigQuery modernization (Dataflow, Dataproc, lakehouse) cut infrastructure costs 35%.",
      "Delivered the bank's first BigQuery application with confidential data.",
    ],
    lesson: "Reusable, pre-approved patterns beat one-off reviews: they make the compliant path the fastest path.",
    technologies: ["Google Cloud", "Microsoft Azure", "Vertex AI", "Gemini", "BigQuery", "Dataflow", "Dataproc", "Lakehouse"],
    relatedWriting: ["agent-first-data-architecture"],
  },
  {
    slug: "controlled-data-movement-archetype",
    title: "Controlled Data Movement",
    summary:
      "A configuration-driven, secure data movement pattern built at USAA to move 25B+ records a day, then carried to Wells Fargo as a bank-wide framework for analytics and AI.",
    organization: "USAA and Wells Fargo",
    period: "2020 – 2024",
    role: "Architect at USAA; Principal Architect at Wells Fargo",
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
      "At Wells Fargo, worked with the Chief Data Officer to turn the blueprint into a bank-wide controlled data movement framework and archetype.",
    ],
    governance: [
      "Dual-perimeter security: strict data isolation, granular IAM and VPC Service Controls, perimeter-based ingress and egress rules.",
      "Column-level encryption and DLP-based de-identification for sensitive data.",
      "Automated audit logging, validation, rule-based reprocessing, lineage and catalog integration.",
    ],
    outcome: [
      "A resilient data backbone for analytics and AI at two regulated institutions.",
      "Observability through Datadog and ELK; governance through Dataplex and Purview.",
    ],
    lesson: "Make the secure path configuration, not custom code, and teams will choose it.",
    technologies: ["AWS S3", "Snowflake", "Google Cloud", "VPC Service Controls", "Google DLP", "Datadog", "ELK", "Dataplex", "Purview"],
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
