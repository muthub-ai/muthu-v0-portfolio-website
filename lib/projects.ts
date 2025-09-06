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

const projects: Project[] = [
  {
    id: 12,
    slug: "enterprise-iam-oracle",
    title: "Enterprise Identity & Access Management (IAM)",
    category: "Security & Identity Management",
    shortDescription:
      "Architected and led the implementation of the enterprise Oracle IAM suite, delivering seamless, secure SSO, federated access, and automated identity governance for a global organization.",
    description: [
      "As the lead architect, I designed and implemented a robust, enterprise-scale Oracle Identity & Access Management (IAM) solution, modernizing the organization's approach to security, compliance, and user experience.",
      "The project featured an active-active configuration for Oracle Access Manager (OAM) and Oracle Directory Services, ensuring high availability and zero-downtime failover across global data centers.",
      "I enabled seamless Single Sign-On (SSO) for all internal and external users, integrating with key partners such as Salesforce and Okta through SAML and OAuth federation.",
      "Automated provisioning, deprovisioning, and regulatory access reviews were implemented using Oracle Identity Governance (OIG), significantly reducing manual effort and audit risk.",
      "The initiative established a unified identity platform, improved security posture, and ensured compliance with SOX, GDPR, and other regulatory mandates."
    ],
    features: [
      "Active-active Oracle Access Manager and Directory Services for high availability.",
      "Seamless SSO and federated authentication with Salesforce, Okta, and other partners.",
      "Automated identity lifecycle management and access reviews.",
      "Role-based access control (RBAC) and fine-grained policy enforcement.",
      "Comprehensive audit logging and compliance reporting.",
      "Reduced onboarding time and improved user experience across the enterprise."
    ],
    technologies: ["Oracle IAM Suite", "OAM", "OIG", "Oracle Directory Services", "SAML", "OAuth", "RBAC", "Okta", "Salesforce", "Active Directory", "High Availability"],
    coverImage: "/bg1.png",
    thumbnailImage: "/bg1.png",
    gallery: [
      { url: "/bg1.png", caption: "Enterprise IAM Architecture" },
      { url: "/bg1.png", caption: "SSO & Federation Flow" }
    ],
    client: "Global Enterprise (Internal)",
    timeline: "2016 - 2018",
    role: "Lead IAM Architect",
    liveUrl: undefined,
    githubUrl: undefined,
    relatedProjects: [
      { slug: "middleware-modernization-bunge", title: "Middleware & Business Application Platform Modernization", category: "Platform Management & Automation", image: "/bg4.jpg" },
      { slug: "global-systems-implementation-bunge", title: "Global Enterprise Systems Implementation", category: "IT Transformation & Program Management", image: "/bg5.avif" }
    ]
  },
  {
    id: 11,
    slug: "multi-cloud-ai-strategy",
    title: "Enterprise Multi-Cloud Data & AI Strategy",
    category: "Cloud & AI Strategy",
    shortDescription:
      "Architected and operationalized the bank's enterprise multi-cloud strategy for GCP and Azure, establishing architectural consistency, accelerating secure service adoption, and enabling faster time-to-market.",
    description: [
      "In 2024, I architected the bank's Enterprise Multi-Cloud Data & AI Strategy, serving as the principal architect behind a transformative initiative to unify Data and AI capabilities across GCP and Azure.",
      "I developed a comprehensive reference architecture—shared with senior executives—that defined the strategic, logical, and physical layers of the bank’s cloud-native data and AI ecosystem. This established a clear target state vision centered on scalable and secure services across cloud platforms.",
    ],
    features: [
      "Introduced Cloud Data Archetypes—prescriptive, reusable patterns that accelerated solution delivery.",
      "Significantly accelerated secure cloud service adoption and reduced redundant design efforts.",
      "Improved cross-cloud interoperability and enhanced architectural governance.",
      "The architecture's reuse and visibility at the executive level reinforced its strategic value and enterprise impact.",
    ],
    technologies: ["GCP", "Azure", "Cloud Data Archetypes", "Enterprise Architecture"],
    coverImage: "/bg1.png",
    thumbnailImage: "/bg1.png",
    client: "Major Financial Institution (Internal)",
    timeline: "2024",
    role: "Principal Architect",
  },
  {
    id: 10,
    slug: "controlled-data-movement-archetype",
    title: "Petabyte-Scale Controlled Data Movement (CDM) Archetype",
    category: "Data Governance & Cloud Architecture",
    shortDescription:
      "Architected a petabyte-scale CDM pipeline at USAA and led its implementation as a bank-wide archetype at Wells Fargo, providing a resilient data backbone for analytics and AI/ML that moves 25 TB/hour.",
    description: [
      "I architected and delivered a petabyte-scale, configuration-driven Controlled Data Movement (CDM) pipeline at USAA for secure and scalable data transfers. Following its success, I brought this architectural blueprint to Wells Fargo, where I led the design and implementation of a bank-wide CDM archetype aligned with enterprise data governance standards.",
      "The architecture implements a dual-perimeter security model to enforce strict data isolation, granular access controls (IAM and VPC SC), and perimeter-based ingress/egress rules. Sensitive data is protected through column-level encryption and Google DLP-based de-identification.",
    ],
    features: [
      "Achieved a 20x improvement in scalability and 10x reduction in latency at USAA.",
      "Features automated audit logging, data validation, and rule-based reprocessing for end-to-end observability.",
      "Integrates with observability tools like Datadog and ELK, BI tools like Power BI and Looker, and governance platforms like Google Dataplex and Azure Purview.",
      "Ensured compliance with regulatory mandates (e.g., ISCR 808-00, 809-11).",
    ],
    technologies: ["AWS S3", "Snowflake", "Google DLP", "CMEKs", "Datadog", "ELK", "Power BI", "Google Dataplex", "Azure Purview"],
    coverImage: "/bg2.jpeg",
    thumbnailImage: "/bg2.jpeg",
    client: "USAA & Wells Fargo",
    timeline: "2020 - 2023",
    role: "Architect",
  },
  {
    id: 9,
    slug: "data-analytics-platform-usaa",
    title: "Data and Analytics Platform",
    category: "Data Platforms & Analytics",
    shortDescription:
      "Architected and delivered a modern Data and Analytics Platform at USAA, enabling real-time, large-scale data processing, advanced analytics, and AI/ML for enterprise-wide business impact.",
    description: [
      "At USAA, I led the design and implementation of a next-generation Data and Analytics Platform that became the digital backbone for the organization's analytics and AI transformation.",
      "The platform ingested, processed, and curated 15-18 billion records and over 800,000 files daily, moving more than 250TB of data to AWS S3 and other cloud destinations.",
      "I architected modular orchestration, parallelized ingestion, and dynamic workload partitioning, supporting real-time and batch analytics, regulatory reporting, and machine learning at scale.",
      "The platform integrated with AWS SageMaker, EMR, and Kinesis for advanced analytics and ML, and provided secure, governed access to data for business, risk, and compliance teams.",
      "This initiative established a foundation for predictive analytics, self-service BI, and data-driven decision making across the enterprise."
    ],
    features: [
      "Real-time and batch data processing at petabyte scale.",
      "20x scalability improvement and 90% reduction in data latency.",
      "Integrated with AWS SageMaker, EMR, Textract, Rekognition, and Macie for advanced analytics and AI/ML.",
      "Enabled secure, governed data access and regulatory compliance (SOX, GLBA, etc.).",
      "Self-service analytics and BI for business users via OpenShift and IBM SPSS integration.",
      "Automated data quality, validation, and monitoring for end-to-end reliability.",
      "Empowered cross-functional teams to deliver insights and drive business value."
    ],
    technologies: ["AWS S3", "SageMaker", "EMR", "Textract", "Rekognition", "Macie", "Kinesis", "OpenShift", "Oracle IAM", "IBM SPSS", "Data Orchestration", "Data Governance"],
    coverImage: "/bg3.avif",
    thumbnailImage: "/bg3.avif",
    client: "USAA",
    timeline: "2018 - 2021",
    role: "Lead Data Platform Engineer & Architect",
  },
  {
    id: 8,
    slug: "middleware-modernization-bunge",
    title: "Middleware & Business Application Platform Modernization",
    category: "Platform Management & Automation",
    shortDescription:
      "Provided strategic oversight for Bunge's diverse portfolio of middleware and business application platforms, improving operational efficiency, reducing technical debt, and enhancing platform resilience through modernization and automation.",
    description: [
      "As IT Technical Manager at Bunge, I provided strategic oversight and operational leadership for platforms including IBM WebSphere, SAS, Tibco, Hyperion Financial Management, and Tableau, leading a globally distributed team of 10 engineers.",
      "I drove major platform upgrades and consolidation efforts while instilling robust observability and support practices. My work integrating IBM WebSphere Portal with IBM Connections enabled seamless collaboration and content sharing across business units.",
    ],
    features: [
      "Introduced automation into platform operations by implementing Ansible playbooks and Jenkins pipelines for orchestrating upgrades and patching.",
      "Deployed Nagios, Zabbix, and custom Python scripts to automate health checks, service restarts, and alerting, significantly reducing manual intervention.",
      "The modernization and consolidation efforts improved operational efficiency and enhanced platform resilience.",
    ],
    technologies: ["IBM WebSphere", "Tibco", "Hyperion", "Tableau", "Ansible", "Jenkins", "Nagios", "Zabbix", "Python"],
    coverImage: "/bg4.jpg",
    thumbnailImage: "/bg4.jpg",
    client: "Bunge",
    timeline: "2009 - 2012",
    role: "IT Technical Manager",
  },
  {
    id: 7,
    slug: "global-systems-implementation-bunge",
    title: "Global Enterprise Systems Implementation",
    category: "IT Transformation & Program Management",
    shortDescription:
      "Led the successful global implementation of mission-critical systems at Bunge, including Hyperion Financial Management and IBM Connections, impacting over 2,000 users across diverse international business units.",
    description: [
      "At Bunge, I led the successful global implementation of critical enterprise systems while managing a geographically and culturally diverse technical team of 10.",
      "I was responsible for orchestrating complex, multi-country system upgrades and integrations, which required deep cross-cultural collaboration, strategic stakeholder engagement, and disciplined program execution across time zones.",
    ],
    features: [
      "The enterprise-wide upgrade of Hyperion Financial Management significantly improved financial consolidation timelines and compliance readiness.",
      "Championed the adoption of IBM Connections as a unified collaboration platform, driving alignment across international IT functions.",
      "Through effective change management and strategic evangelism, I drove high user adoption rates and built a cohesive, high-performing technical team.",
    ],
    technologies: ["Hyperion Financial Management", "IBM Connections", "Program Management"],
    coverImage: "/bg5.avif",
    thumbnailImage: "/bg5.avif",
    client: "Bunge",
    timeline: "2009 - 2012",
    role: "Global Implementation Lead",
  },
  {
    id: 6,
    slug: "enterprise-genai-architecture",
    title: "Enterprise Generative AI Technical Architecture",
    category: "Generative AI Architecture",
    shortDescription:
      "Established the foundational blueprint for secure, scalable, and governed Generative AI adoption across the bank, enabling the delivery of high-impact use cases.",
    description: [
      "In 2024, I architected and secured Cloud Architecture Panel endorsement for the bank's first enterprise-grade Generative AI Technical Architecture. My design introduced a phased modular approach, an evolutionary model aligned with business priorities, and a comprehensive reference model now widely reused by multiple lines of business.",
      "The architecture details data ingestion, processing, embedding, retrieval, generation, and validation pipelines. It also incorporates advanced governance constructs such as Model Armor and Gen AI Gateways to mitigate risks like prompt injection, data leakage, and model drift.",
    ],
    features: [
      "Enabled conversational AI with Vertex Agent Builder.",
      "Leveraged GCP services including Vertex AI, Gecko Embeddings, and Document AI.",
      "Orchestrated workflows through Tachyron APIs, secured via Apigee gateways.",
      "This architecture positioned the bank for secure and strategic Gen AI adoption while unlocking transformative potential.",
    ],
    technologies: ["Generative AI", "GCP", "Vertex AI", "Gecko Embeddings", "Apigee", "Cloud Composer", "Tachyron APIs"],
    coverImage: "/bg3.avif",
    thumbnailImage: "/bg3.avif",
    gallery: [{ url: "/bg3.avif", caption: "Target State Gen AI Architecture" }],
    client: "Major Financial Institution (Internal)",
    timeline: "2024",
    role: "Lead AIML Architect",
  },
  {
    id: 5,
    slug: "unified-ml-platform",
    title: "Unified Machine Learning Platform",
    category: "MLOps & Platform Engineering",
    shortDescription:
      "Architected an enterprise-grade MLOps platform that transformed the model development lifecycle for over 360 data scientists, reducing average deployment time from 8 weeks to under 1 week.",
    description: [
      "At USAA, I architected a unified, enterprise-grade Machine Learning Platform that seamlessly integrated heterogeneous technologies—including Python, R, SAS, and H2O—with core MLOps principles such as DevOps automation, model versioning, and robust governance.",
      "The platform featured distinct architectural patterns, including event-driven pipelines for automated model retraining and CI/CD pipelines tailored for ML artifacts. I also introduced standardized model lineage tracking and auditability to ensure regulatory compliance and reproducibility.",
    ],
    features: [
      "Accelerated model deployment velocity by over 85%.",
      "Reduced operational overhead through automation.",
      "Established a consistent, scalable, and auditable MLOps framework.",
      "Supported diverse use cases across risk, fraud, marketing, and customer analytics.",
    ],
    technologies: ["Python", "R", "SAS", "H2O", "MLOps", "DevOps", "Microservices", "CI/CD"],
    coverImage: "/bg5.avif",
    thumbnailImage: "/bg5.avif",
    gallery: [{ url: "/model-development-lifecycle.png", caption: "Model Development Life Cycle" }],
    client: "USAA (Internal)",
    timeline: "2019 - 2021",
    role: "Platform Architect",
  },
  {
    id: 4,
    slug: "ai-augmented-sdlc",
    title: "AI-Augmented Software Development Lifecycle",
    category: "Enterprise AI Initiative",
    shortDescription:
      "A flagship initiative to redefine the software engineering paradigm by embedding Generative AI capabilities deeply into the Bank's engineering fabric, enhancing developer productivity, and accelerating delivery.",
    description: [
      "As the CTO's principal architect, I am leading the design and execution of this enterprise-wide AI integration, which represents a foundational shift in how software is conceived, built, and delivered.",
      "The initiative involves creating a comprehensive and adaptive ecosystem that includes a forward-looking strategy, a robust reference architecture, and a modular, evolutionary roadmap. Key components include a Unified AI Gateway for secure access to diverse LLMs and autonomous AI agents to automate workflows.",
      "The outcomes, already recognized by the Chief Development Officer, are projected to significantly enhance developer experience, improve code quality and security through intelligent automation, and accelerate delivery velocity.",
    ],
    features: [
      "Model Context Protocol (MCP):** Enables rich, contextual data exchange between engineering systems.",
      "Unified AI Gateway: Provides secure, governed, and scalable access to diverse LLMs and specialized AI services across a multi-cloud environment.",
      "Autonomous AI Agents: Deployed to handle complex tasks within the development lifecycle.",
      "Inner-Loop Augmentation: Includes AI-assisted code generation, intelligent debugging, and automated unit testing.",
      "Outer-Loop Optimization: Features AI-optimized CI/CD pipelines and agent-driven quality assurance."
    ],
    technologies: ["Generative AI", "LLMs", "Autonomous Agents", "Multi-Cloud Architecture", "AI-Optimized CI/CD", "VSCode Extensions"],
    coverImage: "/bg6.avif",
    thumbnailImage: "/bg6.avif",
    gallery: [
      { url: "/bg6.avif", caption: "AI Augmented SDLC Portfolio View" },
      { url: "/bg6.avif", caption: "Projected Improvements from LLM Integration" },
    ],
    client: "Major Financial Institution (Internal)",
    timeline: "2024 - 2025",
    role: "Principal Architect for Generative AI",
  },
]

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject || !currentProject.relatedProjects) {
    // If no related projects defined, return random projects
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}