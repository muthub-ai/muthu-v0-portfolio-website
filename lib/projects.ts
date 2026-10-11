export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

// Order matters: this is the order shown under "Key Initiatives" on the home page.
// Every number here must trace to the Career Master Profile (public-safe figures only).
const projects: Project[] = [
  {
    id: 4,
    slug: "ai-augmented-sdlc",
    title: "AI-Augmented Software Development Lifecycle",
    category: "Enterprise AI Initiative",
    shortDescription:
      "Wells Fargo's flagship Generative and agentic AI initiative: coding agents brought into the software lifecycle with a bank-built context layer and governed access, delivering a 30% productivity gain across 25,000 developers.",
    description: [
      "I led the architecture of Wells Fargo's AI-Augmented SDLC transformation in partnership with the Chief Development Officer, a foundational shift in how software is conceived, built and delivered across the bank.",
      "Rather than betting on a single tool, the program built a multi-vendor agent ecosystem (GitHub Copilot, Cognition Devin, Anthropic Claude and Cursor) and wrapped it in bank-built capabilities: context assembly, a harness layer with maker/checker controls, search and retrieval, and a Unified AI Gateway for governed access to large language models.",
      "The result is a 30% productivity gain across 25,000 developers, measured by pull-request approval rate per developer and corroborated by a developer survey.",
    ],
    features: [
      "Model Context Protocol (MCP): applied to give agents rich, governed context from engineering systems.",
      "Unified AI Gateway: secure, governed and scalable access to multiple LLMs across a multi-cloud environment.",
      "Maker/checker controls: agents produce, humans and automated checks verify before anything ships.",
      "Inner-loop augmentation: AI-assisted code generation, debugging and unit testing.",
      "Outer-loop optimization: AI-assisted CI/CD, platform operations, observability and service management.",
      "Automated vulnerability and patch remediation: continuous scanning, automated SBOMs and false-positive reduction.",
    ],
    technologies: ["Generative AI", "Agentic AI", "GitHub Copilot", "Cognition Devin", "Anthropic Claude", "Cursor", "Model Context Protocol", "AI Gateway"],
    coverImage: "/bg6.avif",
    thumbnailImage: "/bg6.avif",
    client: "Wells Fargo",
    timeline: "2024 – Present",
    role: "Lead Architect",
  },
  {
    id: 6,
    slug: "enterprise-genai-architecture",
    title: "Enterprise Generative AI Technical Architecture",
    category: "Generative AI Architecture",
    shortDescription:
      "The bank's first enterprise-grade Generative AI architecture: a governed path from experiment to production, adopted as the reference model across business lines.",
    description: [
      "In 2024 I designed the bank's first enterprise-grade Generative AI technical architecture. It was endorsed by the Cloud Architecture Panel, presented to the CTO and CIO, and adopted as the reference model across lines of business.",
      "The architecture covers data ingestion, processing, embedding, retrieval, generation and validation, with governance built in: model guardrails and AI gateways to mitigate prompt injection, data leakage and model drift, and an enterprise model strategy spanning public cloud and on-premises GPU infrastructure.",
      "The first use case went live in September 2024: a retrieval-augmented assistant giving bankers real-time policy guidance, piloted with 5,000 bankers.",
    ],
    features: [
      "Modular, phased reference architecture aligned with business priorities.",
      "Model guardrails (including Google Model Armor) and AI gateways against prompt injection and data leakage.",
      "Security testing of Generative AI use cases with cybersecurity and cloud-provider partners.",
      "Governed experimentation environment with automated lineage, detective controls and secure data access.",
      "Published archetypes for model deployment and inferencing, and for model development, training and validation.",
    ],
    technologies: ["Generative AI", "Retrieval-Augmented Generation", "Google Cloud", "Vertex AI", "Gemini", "Document AI", "Apigee", "Model Armor"],
    coverImage: "/bg3.avif",
    thumbnailImage: "/bg3.avif",
    client: "Wells Fargo",
    timeline: "2024",
    role: "Principal Architect",
  },
  {
    id: 11,
    slug: "multi-cloud-ai-strategy",
    title: "Enterprise Multi-Cloud Data & AI Strategy",
    category: "Cloud & AI Strategy",
    shortDescription:
      "A multi-cloud (GCP and Azure) Data & AI strategy and reusable archetypes that gave the bank architectural consistency and faster, safer adoption of cloud services.",
    description: [
      "In 2024 I architected the bank's enterprise multi-cloud Data & AI strategy, unifying Data and AI capabilities across Google Cloud and Microsoft Azure, and served as chief architect for Data & AI on public cloud.",
      "I developed a reference architecture, shared with senior executives, that defined the strategic, logical and physical layers of the bank's cloud data and AI ecosystem, with a target-state vision and phased roadmap.",
      "On Google Cloud, this enabled Gemini models, the Vertex AI platform and the model development lifecycle for both predictive and generative models, with controlled data movement and enterprise data controls built in.",
    ],
    features: [
      "Cloud Data & AI Archetypes: prescriptive, reusable patterns that enabled 14 GCP services.",
      "Teradata-to-BigQuery modernization (Dataflow, Dataproc, lakehouse) that cut infrastructure costs 35%.",
      "The bank's first BigQuery application with confidential data.",
      "Azure data enablement proposal and a two-day working session with Microsoft and Databricks.",
    ],
    technologies: ["Google Cloud", "Microsoft Azure", "Vertex AI", "Gemini", "BigQuery", "Dataflow", "Dataproc", "Enterprise Architecture"],
    coverImage: "/bg1.png",
    thumbnailImage: "/bg1.png",
    client: "Wells Fargo",
    timeline: "2024",
    role: "Principal Architect",
  },
  {
    id: 5,
    slug: "unified-ml-platform",
    title: "Unified Machine Learning Platform",
    category: "MLOps & Platform Engineering",
    shortDescription:
      "An enterprise MLOps platform that moved 360 data scientists onto one governed environment, saved $25M in license costs over 3 years and cut model deployment time from 8 weeks to 5 days.",
    description: [
      "At USAA, I architected a unified, enterprise-grade machine learning platform (Domino, Airflow, cloud-native) that managed the full model lifecycle across Python, R, SAS and H2O, with DevOps automation, scaled compute, auditability and governance.",
      "We migrated 360 data scientists and modeling analysts from non-compliant sandboxes and desktops to a governed, CTO-approved environment. The consolidation saved $25M in license costs over 3 years, and the platform became the shared basis for Model Risk Management's independent model validation.",
      "Deployment pipelines covered on-demand (microservices), batch, event-driven (Kafka) and automated retraining workloads, with per-model drift monitoring.",
    ],
    features: [
      "Model deployment time cut from 8 weeks to 5 days.",
      "Real-time scoring for 5 cyber financial-crime models at 24M+ scores per day, under 500 ms.",
      "One-click Model Deploy Console with audit traceability: 45+ models, 60+ users, 5 business units.",
      "22 models deployed to production in 6 months across 3 lines of business.",
      "Model monitoring through Kafka model logging and per-model Prometheus and Grafana dashboards.",
    ],
    technologies: ["Domino", "Apache Airflow", "Kafka", "OpenShift", "Python", "R", "SAS", "H2O", "MLOps"],
    coverImage: "/bg5.avif",
    thumbnailImage: "/bg5.avif",
    client: "USAA",
    timeline: "2017 – 2022",
    role: "Lead Software Engineer, then Staff Engineer",
  },
  {
    id: 9,
    slug: "data-analytics-platform-usaa",
    title: "Data and Analytics Platform",
    category: "Data Platforms & Analytics",
    shortDescription:
      "A cloud data platform at USAA processing 25B+ records a day, giving analytics and machine learning teams governed, reliable data at scale.",
    description: [
      "At USAA, I led the architecture of the cloud data platform that became the backbone for the organization's analytics and machine learning work.",
      "The platform processed 25B+ records and 800,000 files a day into AWS and Snowflake, with modular orchestration, parallelized ingestion and dynamic workload partitioning for both batch and near-real-time workloads.",
      "As part of the Cloud Data Center of Excellence, I wrote and gave final approval on the AWS architecture specifications for identity, data protection, financial management, infrastructure security and detective controls.",
    ],
    features: [
      "Next generation delivered 20x scalability, 10x lower latency, a 0.01% exception rate and a 99.9% SLO.",
      "Automated lineage, catalog and sensitive-data protection.",
      "Analytics and ML services integrated, including SageMaker, EMR, Textract, Rekognition, Comprehend, Macie and Kinesis.",
      "Rule-based automated reprocessing and Datadog and ELK observability.",
      "Cloud-to-cloud data movement for claims modernization.",
    ],
    technologies: ["AWS S3", "SageMaker", "EMR", "Kinesis", "Macie", "Snowflake", "Apache Airflow", "Datadog", "Data Governance"],
    coverImage: "/bg3.avif",
    thumbnailImage: "/bg3.avif",
    client: "USAA",
    timeline: "2020 – 2022",
    role: "Staff Engineer, Data & Analytics Platform",
  },
  {
    id: 10,
    slug: "controlled-data-movement-archetype",
    title: "Controlled Data Movement (CDM) Archetype",
    category: "Data Governance & Cloud Architecture",
    shortDescription:
      "A configuration-driven, secure data movement pattern built at USAA and carried to Wells Fargo as a bank-wide archetype for analytics and AI.",
    description: [
      "I architected a configuration-driven controlled data movement (CDM) pipeline at USAA for secure, scalable transfers of billions of records a day. At Wells Fargo, working with the Chief Data Officer, I led the design of a bank-wide CDM framework and archetype aligned with enterprise data governance standards.",
      "The architecture uses a dual-perimeter security model with strict data isolation, granular access controls (IAM and VPC Service Controls), and perimeter-based ingress and egress rules. Sensitive data is protected through column-level encryption and Google DLP de-identification.",
    ],
    features: [
      "20x scalability and 10x lower latency in the USAA implementation.",
      "Automated audit logging, data validation and rule-based reprocessing for end-to-end observability.",
      "Integrates with Datadog and ELK for observability, and with Google Dataplex and Microsoft Purview for governance.",
      "Designed to meet enterprise data-governance and regulatory requirements.",
    ],
    technologies: ["Google Cloud", "VPC Service Controls", "Google DLP", "CMEK", "AWS S3", "Snowflake", "Datadog", "ELK", "Dataplex", "Purview"],
    coverImage: "/bg2.jpeg",
    thumbnailImage: "/bg2.jpeg",
    client: "USAA and Wells Fargo",
    timeline: "2020 – 2024",
    role: "Architect",
  },
  {
    id: 12,
    slug: "enterprise-iam-oracle",
    title: "Enterprise Identity & Access Management",
    category: "Security & Identity Management",
    shortDescription:
      "Built USAA's first Oracle Identity Federation servers and the access-management foundation for single sign-on, multi-factor authentication and partner integrations.",
    description: [
      "As a systems engineer at USAA, I built the company's first Oracle Identity Federation servers and engineered Oracle Access Manager (single sign-on, multi-factor authentication and authorization) and Oracle Identity Manager across 80+ WebLogic servers.",
      "This foundation supported later integrations with partners such as Okta and Salesforce, and supported regulatory access reviews.",
    ],
    features: [
      "Federated single sign-on with SAML and OAuth.",
      "Multi-factor authentication and centralized authorization.",
      "Identity lifecycle management with Oracle Identity Manager.",
      "Foundation for Okta and Salesforce integrations and regulatory access reviews.",
    ],
    technologies: ["Oracle Access Manager", "Oracle Identity Federation", "Oracle Identity Manager", "WebLogic", "SAML", "OAuth"],
    coverImage: "/bg1.png",
    thumbnailImage: "/bg1.png",
    client: "USAA",
    timeline: "2012 – 2017",
    role: "Senior Computer Systems Engineer",
  },
  {
    id: 8,
    slug: "middleware-modernization-bunge",
    title: "Middleware & Business Application Platforms",
    category: "Platform Management",
    shortDescription:
      "Led Bunge's middleware and business-application platforms, including WebSphere, SAS, Tibco, Hyperion and Tableau, and set the enterprise service bus strategy used across Bunge companies.",
    description: [
      "As IT Technical Manager for Middleware Platforms at Bunge North America, I led the team responsible for IBM WebSphere, SAS, Tibco, WebFOCUS, IBM Connections, Hyperion Financial Management and Tableau.",
      "I drove platform upgrades and consolidation, introduced monitoring and support practices, and integrated IBM WebSphere Portal with IBM Connections for collaboration across business units.",
    ],
    features: [
      "Tibco enterprise service bus strategy, presented at Bunge's global office in 2009 and adopted across Bunge companies worldwide.",
      "Federated single sign-on across the portal, SAS, Tableau, IBM Connections and Hyperion (SiteMinder, SPNEGO, Ping Federate SAML 2.0).",
      "Application and server monitoring with Zabbix and SiteScope.",
    ],
    technologies: ["IBM WebSphere", "Tibco", "SAS", "Hyperion", "Tableau", "SiteMinder", "Ping Federate"],
    coverImage: "/bg4.jpg",
    thumbnailImage: "/bg4.jpg",
    client: "Bunge North America",
    timeline: "2009 – 2012",
    role: "IT Technical Manager, Middleware Platforms",
  },
  {
    id: 7,
    slug: "global-systems-implementation-bunge",
    title: "Global Enterprise Systems Implementation",
    category: "IT Transformation & Program Management",
    shortDescription:
      "Led the global upgrade of Hyperion Financial Management for 2,000 users worldwide and the rollout of IBM Connections across Bunge's international business units.",
    description: [
      "At Bunge, I led the global implementation of critical enterprise systems with a geographically and culturally diverse technical team.",
      "The work meant orchestrating multi-country upgrades and integrations, which required cross-cultural collaboration, stakeholder engagement and disciplined program execution across time zones.",
    ],
    features: [
      "Hyperion Financial Management upgrade for 2,000 users worldwide.",
      "IBM Connections adopted as a unified collaboration platform across international IT functions.",
      "Change management and stakeholder engagement across business units and time zones.",
    ],
    technologies: ["Hyperion Financial Management", "IBM Connections", "Program Management"],
    coverImage: "/bg5.avif",
    thumbnailImage: "/bg5.avif",
    client: "Bunge North America",
    timeline: "2009 – 2012",
    role: "Global Implementation Lead",
  },
]

export { projects }

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (currentProject?.relatedProjects?.length) {
    return currentProject.relatedProjects.slice(0, limit)
  }

  // Otherwise suggest the next initiatives in display order, wrapping around.
  const index = projects.findIndex((project) => project.slug === currentSlug)
  const ordered = index === -1 ? projects : [...projects.slice(index + 1), ...projects.slice(0, index)]
  return ordered.slice(0, limit).map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    image: project.thumbnailImage,
  }))
}
