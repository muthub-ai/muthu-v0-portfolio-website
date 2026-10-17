import type { FigureName } from "@/components/figures"

// Site-wide facts. Every number on the public site must trace to the Career Master Profile.
// Never add anything listed in the private blocklist (.confidential-terms.txt).

export const site = {
  url: "https://muthub.org",
  name: "Muthu Bommiah",
  fullName: "Muthukrishnan Bommiah",
  displayName: "Muthukrishnan (Muthu) Bommiah",
  alternateNames: ["Muthu Bommiah", "Muthu"],
  givenName: "Muthukrishnan",
  familyName: "Bommiah",
  jobTitle: "Distinguished Engineer",
  employer: "Wells Fargo",
  location: "San Antonio, Texas",
  tagline: "Architecting how banks put AI to work, at scale and under control.",
  shortBio:
    "Executive Director and Distinguished Engineer at Wells Fargo. Over two decades building enterprise AI, data and cloud platforms across financial services and global industry. I write about governed AI, the AI-native software lifecycle and the platforms that make both work.",
  description:
    "Muthukrishnan (Muthu) Bommiah is a Distinguished Engineer at Wells Fargo who architects how banks put AI to work at scale and under control: governed Generative and agentic AI, AI-augmented software delivery, Architecture-as-Code and production machine learning.",
  disclosure: "Views are my own and do not represent my employer.",
  headshot: "/headshot.jpg",
  ogImage: "/og-image.png",
  social: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mbommiah/" },
    { label: "GitHub", url: "https://github.com/muthub-ai" },
    { label: "Medium", url: "https://medium.com/@muthukrishnanb" },
  ],
  // Buttondown (or other) embed-subscribe URL. Leave empty until the newsletter account exists;
  // the signup box then points people to LinkedIn instead of collecting emails.
  newsletterAction: "",
  // Public uptime page (UptimeRobot).
  statusUrl: "https://stats.uptimerobot.com/iALcI93wI3",
  knowsAbout: [
    "Enterprise AI strategy",
    "AI governance",
    "Generative AI",
    "Agentic AI",
    "AI-augmented software development",
    "Architecture-as-Code",
    "Model Context Protocol",
    "Machine learning operations (MLOps)",
    "Cloud data and AI platforms",
    "Financial services technology",
  ],
} as const

export const nav = [
  { label: "Initiatives", href: "/initiatives" },
  { label: "Writing", href: "/writing" },
  { label: "Playbooks", href: "/playbooks" },
  { label: "About", href: "/about" },
  { label: "Reach me", href: "/reach" },
] as const

export type ThemeSlug = "context-engineering" | "governed-ai" | "ai-native-sdlc" | "data-ai-platforms" | "leading-ai-change"

export const themes: { slug: ThemeSlug; name: string; blurb: string }[] = [
  { slug: "context-engineering", name: "Context engineering", blurb: "Trusted, governed knowledge that people and agents can rely on." },
  { slug: "governed-ai", name: "Governed AI", blurb: "Guardrails, provenance and policy enforced by design." },
  { slug: "ai-native-sdlc", name: "AI-native SDLC", blurb: "How software gets built when agents write much of the code." },
  { slug: "data-ai-platforms", name: "Data & AI platforms", blurb: "The data and context foundations agents depend on." },
  { slug: "leading-ai-change", name: "Leading AI change", blurb: "Turning AI from pilots into governed, measured programs." },
]

export function themeName(slug: ThemeSlug) {
  return themes.find((t) => t.slug === slug)?.name ?? slug
}

// Rich text blocks shared by essays, notes and initiatives.
// Inline text supports **bold**, *italic* and [links](https://...); the same text is the Markdown twin.
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "bottomLine"; text: string }
  | { type: "code"; text: string; lang?: string }
  | { type: "figure"; name: FigureName }
  | { type: "monday"; items: string[] }
