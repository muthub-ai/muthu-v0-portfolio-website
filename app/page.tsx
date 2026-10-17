import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { site, themeName, themes } from "@/content/site"
import { dateLabel, getEssays, getInitiatives, readingMinutes } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { JsonLd, profilePageSchema } from "@/components/json-ld"
import { Newsletter } from "@/components/newsletter"
import { playbooks } from "@/content/playbooks"

export const metadata: Metadata = pageMetadata({ path: "/", description: site.description })

const startHere: Record<string, { label: string; href: string }[]> = {
  "context-engineering": [
    { label: "The cost of unmanaged context", href: "/writing/the-cost-of-unmanaged-context" },
    { label: "Context fragmentation", href: "/writing/context-fragmentation" },
    { label: "Not another data lake", href: "/writing/not-another-data-lake" },
    { label: "Passive capture", href: "/writing/passive-capture" },
    { label: "Self-describing knowledge", href: "/writing/self-describing-knowledge-open-knowledge-format" },
  ],
  "governed-ai": [
    { label: "Playbook: governing coding agents", href: "/playbooks/governing-coding-agents" },
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

function StartList({ theme, visibleSlugs }: { theme: string; visibleSlugs: Set<string> }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-[18px] text-copy leading-snug">
      {startHere[theme]
        .filter((piece) => !piece.href.startsWith("/writing/") || visibleSlugs.has(piece.href.replace("/writing/", "")))
        .map((piece) => (
          <li key={piece.href}>
            <Link href={piece.href} className="link">
              {piece.label}
            </Link>
          </li>
        ))}
    </ul>
  )
}

export default function HomePage() {
  const latest = getEssays().slice(0, 5)
  const featured = getInitiatives().filter((i) => i.featured)
  const visibleSlugs = new Set(getEssays().map((e) => e.slug))

  return (
    <>
      <JsonLd data={profilePageSchema("/", `${site.displayName} | ${site.tagline}`)} />

      <section className="container-site grid items-start gap-12 pb-16 pt-12 sm:pt-20 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-7">
          <p className="eyebrow hidden sm:block">{site.displayName}</p>
          <h1 className="h-display max-w-[860px] text-[2.75rem] leading-[1.05] sm:text-[4rem]">{site.tagline}</h1>
          <p className="max-w-[640px] text-xl leading-relaxed text-body">{site.shortBio}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Link href="/writing" className="btn-primary">
              Read the writing
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            {site.newsletterAction ? (
              <Link href="/#subscribe" className="btn-secondary">
                Get the monthly note
              </Link>
            ) : (
              <Link href="/initiatives" className="btn-secondary">
                See the work
              </Link>
            )}
            {site.newsletterAction && (
              <Link href="/initiatives" className="link ml-2 text-[15px] font-semibold">
                Or see the work →
              </Link>
            )}
          </div>
        </div>
        <figure className="hidden flex-col gap-3 md:mt-2 md:flex">
          <Image
            src={site.headshot}
            alt={`Portrait of ${site.name}`}
            width={680}
            height={680}
            priority
            sizes="(min-width: 1024px) 340px, 300px"
            className="aspect-square w-full rounded object-cover"
          />
          <figcaption className="text-[15px] text-muted">{site.location}</figcaption>
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
            {featured.map((item) => (
              <Link
                key={item.slug}
                href={`/initiatives/${item.slug}`}
                className="group flex flex-col gap-3.5 rounded-md border border-line bg-page p-7 transition-all hover:-translate-y-0.5 hover:border-strong hover:shadow-[0_8px_24px_-12px_rgb(0_0_0/0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="font-serif text-[26px] font-medium leading-tight group-hover:text-accent">{item.title}</span>
                <span className="text-copy leading-relaxed text-body">{item.summary}</span>
                <span className="mt-auto border-t border-line pt-4 text-[15px] text-muted">
                  {item.organization} · {item.period}
                </span>
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
          <p className="lede">Essays and short notes on putting AI to work inside regulated institutions. Every piece is dated and kept current.</p>
          <Link href="/writing" className="link text-[15px] font-semibold">
            All writing and notes
          </Link>
        </div>
        <ol className="flex min-w-0 flex-[999_1_560px] flex-col">
          {latest.length === 0 && <li className="border-t border-line py-6 text-body">The first essays are on their way.</li>}
          {latest.map((post) => (
            <li key={post.slug} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6">
              <span className="flex-[0_0_120px] pt-1.5 text-[15px] text-muted">{dateLabel(post)}</span>
              <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-1.5">
                <Link href={`/writing/${post.slug}`} className="font-serif text-[23px] font-medium leading-snug text-ink hover:text-accent">
                  {post.title}
                </Link>
                <span className="text-copy leading-relaxed text-body">{post.summary}</span>
                <span className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="chip">{themeName(post.theme)}</span>
                  <span className="text-[15px] text-muted">Essay · {readingMinutes(post.body)} min read</span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="playbooks-heading" className="border-t border-line bg-panel">
        <div className="container-site flex flex-col gap-9 py-[72px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-[640px] flex-col gap-2.5">
              <h2 id="playbooks-heading" className="h-display text-4xl tracking-[-0.01em]">
                Playbooks
              </h2>
              <p className="lede">Checklists for running AI in a regulated enterprise, each with a two-minute self-assessment.</p>
            </div>
            <Link href="/playbooks" className="link text-[15px] font-semibold">
              All playbooks
            </Link>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
            {playbooks.map((p) => (
              <div key={p.slug} className="flex flex-col gap-3.5 rounded-md border border-line bg-page p-7">
                <span className="label">{p.items.length} points</span>
                <Link href={`/playbooks/${p.slug}`} className="font-serif text-[24px] font-medium leading-tight text-ink hover:text-accent">
                  {p.title}
                </Link>
                <span className="text-copy leading-relaxed text-body">{p.summary}</span>
                <Link href={`/playbooks/${p.slug}/assessment`} className="link mt-auto border-t border-line pt-4 text-[15px] font-semibold">
                  Take the self-assessment
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="start" className="border-t border-line">
        <div className="container-site flex flex-col gap-9 py-20">
          <div className="flex flex-col gap-2.5">
            <h2 id="start" className="h-display text-4xl tracking-[-0.01em]">
              Start here
            </h2>
            <p className="lede">New here? Five themes, the best pieces in each.</p>
          </div>
          <div className="hidden gap-6 sm:grid sm:[grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
            {themes.map((theme) => (
              <div key={theme.slug} className="flex flex-col gap-3 border-t-2 border-ink pt-[18px]">
                <h3 className="text-lg font-semibold">
                  <Link href={`/writing/theme/${theme.slug}`} className="hover:text-accent">
                    {theme.name}
                  </Link>
                </h3>
                <p className="text-copy leading-relaxed text-muted">{theme.blurb}</p>
                <StartList theme={theme.slug} visibleSlugs={visibleSlugs} />
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:hidden">
            {themes.map((theme, index) => (
              <details key={theme.slug} open={index === 0} className="group border-t border-line py-4 last:border-b">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {theme.name}
                  <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="flex flex-col gap-3 pt-2">
                  <p className="text-copy leading-relaxed text-muted">{theme.blurb}</p>
                  <StartList theme={theme.slug} visibleSlugs={visibleSlugs} />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
