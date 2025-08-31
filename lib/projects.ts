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
    id: 6,
    slug: "enterprise-genai-architecture",
    title: "Enterprise Generative AI Technical Architecture",
    category: "Generative AI Architecture",
    shortDescription:
      "Established the foundational blueprint for secure, scalable, and governed Generative AI adoption across the bank, enabling the delivery of high-impact use cases like Banker Virtual Assistants and Advisor GPT.",
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
    coverImage: "/genai-architecture-cover.png",
    thumbnailImage: "/genai-architecture-thumbnail.png",
    gallery: [{ url: "/genai-architecture-diagram.png", caption: "Target State Gen AI Architecture" }],
    client: "Major Financial Institution (Internal)",
    timeline: "2024",
    role: "Lead AIML Architect",
    relatedProjects: [
      {
        slug: "ai-augmented-sdlc",
        title: "AI-Augmented SDLC",
        category: "Enterprise AI Initiative",
        image: "/ai-sdlc-thumbnail.png",
      },
      {
        slug: "unified-ml-platform",
        title: "Unified Machine Learning Platform",
        category: "MLOps & Platform Engineering",
        image: "/unified-ml-platform-thumbnail.png",
      },
    ],
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
    coverImage: "/unified-ml-platform-cover.png",
    thumbnailImage: "/unified-ml-platform-thumbnail.png",
    gallery: [{ url: "/model-development-lifecycle.png", caption: "Model Development Life Cycle" }],
    client: "USAA (Internal)",
    timeline: "2019 - 2021",
    role: "Platform Architect",
    relatedProjects: [
      {
        slug: "ai-augmented-sdlc",
        title: "AI-Augmented SDLC",
        category: "Enterprise AI Initiative",
        image: "/ai-sdlc-thumbnail.png",
      },
      {
        slug: "enterprise-genai-architecture",
        title: "Enterprise Generative AI Architecture",
        category: "Generative AI Architecture",
        image: "/genai-architecture-thumbnail.png",
      },
    ],
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
      "**Model Context Protocol (MCP):** Enables rich, contextual data exchange between engineering systems.",
      "**Unified AI Gateway:** Provides secure, governed, and scalable access to diverse LLMs and specialized AI services across a multi-cloud environment.",
      "**Autonomous AI Agents:** Deployed to handle complex tasks within the development lifecycle.",
      "**Inner-Loop Augmentation:** Includes AI-assisted code generation, intelligent debugging, and automated unit testing.",
      "**Outer-Loop Optimization:** Features AI-optimized CI/CD pipelines and agent-driven quality assurance.",
      "**Production Rollout:** As of May 2025, services are live for 10,000 VSCode developers.",
    ],
    technologies: ["Generative AI", "LLMs", "Autonomous Agents", "Multi-Cloud Architecture", "AI-Optimized CI/CD", "VSCode Extensions"],
    coverImage: "/ai-sdlc-cover.png",
    thumbnailImage: "/ai-sdlc-thumbnail.png",
    gallery: [
      { url: "/ai-sdlc-portfolio-view.png", caption: "AI Augmented SDLC Portfolio View" },
      { url: "/ai-sdlc-improvement-chart.png", caption: "Projected Improvements from LLM Integration" },
    ],
    client: "Major Financial Institution (Internal)",
    timeline: "2024 - 2025",
    role: "Principal Architect for Generative AI",
    relatedProjects: [
      {
        slug: "finance-dashboard",
        title: "Finance Dashboard",
        category: "Web Application",
        image: "/modern-finance-overview.png",
      },
      {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        image: "/modern-finance-app.png",
      },
    ],
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