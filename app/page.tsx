import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { site, themeName, themes } from "@/content/site"
import { dateLabel, getEssays, getInitiatives } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { JsonLd, profilePageSchema } from "@/components/json-ld"
import { Newsletter } from "@/components/newsletter"

export const metadata: Metadata = pageMetadata({ path: "/", description: site.description })

const startHere: Record<string, { label: string; href: string }[]> = {
  "governed-ai": [
    { label: "Architecture that runs", href: "/writing/architecture-that-runs" },
    { label: "Inside an Architecture-as-Code platform", href: "/writing/inside-an-architecture-as-code-platform" },
    { label: "Model is a tool, harness is the strategy", href: "/writing/model-is-a-tool-harness-is-the-strategy" },
    { label: "Adopting MCP in a bank", href: "/writing/adopting-mcp-in-a-bank" },
  ],
  "ai-native-sdlc": [
    { label: "The AI-native SDLC", href: "/writing/the-ai-native-sdlc" },
    { label: "Spec-driven development for regulated industries", href: "/writing/spec-driven-development-for-regulated-industries" },
    { label: "Three architectures for AI coding agents", href: "/writing/three-architectures-for-ai-coding-agents" },
  ],
  "data-ai-platforms": [
    { label: "Capture the why", href: "/writing/capture-the-why" },
    { label: "Agent-first data architecture", href: "/writing/agent-first-data-architecture" },
    { label: "From MLOps to AI engineering", href: "/writing/from-mlops-to-ai-engineering" },
  ],
  "leading-ai-change": [
    { label: "Leading architecture change without direct authority", href: "/writing/leading-without-authority" },
    { label: "Case study: AI-Augmented SDLC", href: "/initiatives/ai-augmented-sdlc" },
    { label: "Case study: Enterprise ML platform", href: "/initiatives/unified-ml-platform" },
  ],
}

export default function HomePage() {
  const latest = getEssays().slice(0, 5)
  const featured = getInitiatives().filter((i) => i.featured)
  const visibleSlugs = new Set(getEssays().map((e) => e.slug))

  return (
    <>
      <JsonLd data={profilePageSchema("/", `${site.displayName} | ${site.tagline}`)} />

      <section className="container-site flex flex-wrap items-end gap-14 pb-16 pt-16 sm:pt-24">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
          <p className="eyebrow">{site.displayName}</p>
          <h1 className="h-display max-w-[820px] text-[2.75rem] leading-[1.05] sm:text-[4rem]">{site.tagline}</h1>
          <p className="max-w-[640px] text-xl leading-relaxed text-body">{site.shortBio}</p>
          <p className="flex flex-wrap gap-x-7 gap-y-2 text-[15px] text-muted">
            {site.numbers.map((n, i) => (
              <span key={n.label} className="flex gap-7">
                {i > 0 && (
                  <span aria-hidden="true" className="text-strong">
                    /
                  </span>
                )}
                <span>
                  <strong className="font-semibold text-ink">{n.value}</strong> {n.label}
                </span>
              </span>
            ))}
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Link href="/writing" className="btn-primary">
              Read the writing
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link href="/#subscribe" className="btn-secondary">
              Get the monthly note
            </Link>
          </div>
        </div>
        <figure className="flex max-w-[260px] flex-[1_1_220px] flex-col gap-3">
          <Image src={site.headshot} alt={`Portrait of ${site.name}`} width={520} height={520} priority className="aspect-square w-full rounded object-cover" />
          <figcaption className="text-[13px] text-muted">{site.location}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="featured" className="border-y border-line bg-panel">
        <div className="container-site flex flex-col gap-9 py-[72px]">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="featured" className="h-display text-4xl tracking-[-0.01em]">
              Ideas I&apos;ve built and stand behind
            </h2>
            <Link href="/initiatives" className="link text-[15px] font-semibold">
              All initiatives
            </Link>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {featured.map((item, index) => (
              <Link
                key={item.slug}
                href={`/initiatives/${item.slug}`}
                className="group flex flex-col gap-3.5 rounded-md border border-line bg-page p-7 transition-colors hover:border-strong"
              >
                <span className="eyebrow">0{index + 1}</span>
                <span className="font-serif text-[26px] font-medium leading-tight">{item.title}</span>
                <span className="text-base leading-relaxed text-body">{item.summary}</span>
                <span className="mt-auto pt-2 text-[15px] font-semibold text-accent group-hover:underline">Read the case study</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="latest" className="container-site flex flex-wrap gap-14 py-20">
        <div className="flex flex-[1_1_260px] flex-col gap-3.5">
          <h2 id="latest" className="h-display text-4xl tracking-[-0.01em]">
            Latest writing
          </h2>
          <p className="text-base leading-relaxed text-muted">Essays and short notes on putting AI to work inside regulated institutions. Every piece is dated and kept current.</p>
          <Link href="/writing" className="link text-[15px] font-semibold">
            All writing and notes
          </Link>
        </div>
        <ol className="flex min-w-0 flex-[999_1_560px] flex-col">
          {latest.length === 0 && <li className="border-t border-line py-6 text-body">The first essays are on their way.</li>}
          {latest.map((post) => (
            <li key={post.slug} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6">
              <span className="flex-[0_0_120px] pt-1.5 text-sm text-muted">{dateLabel(post)}</span>
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-1.5">
                <Link href={`/writing/${post.slug}`} className="font-serif text-[23px] font-medium leading-snug text-ink hover:text-accent">
                  {post.title}
                </Link>
                <span className="text-[15px] leading-relaxed text-body">{post.summary}</span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-accent">{themeName(post.theme)}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="start" className="border-t border-line">
        <div className="container-site flex flex-col gap-9 py-20">
          <div className="flex flex-col gap-2.5">
            <h2 id="start" className="h-display text-4xl tracking-[-0.01em]">
              Start here
            </h2>
            <p className="text-base text-muted">New here? Four themes, the best pieces in each.</p>
          </div>
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {themes.map((theme) => (
              <div key={theme.slug} className="flex flex-col gap-3 border-t-2 border-ink pt-[18px]">
                <h3 className="text-lg font-semibold">{theme.name}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{theme.blurb}</p>
                <ul className="flex list-disc flex-col gap-2 pl-[18px] text-[15px] leading-snug">
                  {startHere[theme.slug]
                    .filter((piece) => !piece.href.startsWith("/writing/") || visibleSlugs.has(piece.href.replace("/writing/", "")))
                    .map((piece) => (
                      <li key={piece.href}>
                        <Link href={piece.href} className="link">
                          {piece.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
