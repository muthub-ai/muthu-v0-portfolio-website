import type { ReactNode } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { site } from "@/content/site"
import { getEssay, getInitiative, getInitiatives } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { JsonLd, personId } from "@/components/json-ld"
import { Figure } from "@/components/figures"

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return getInitiatives().map((i) => ({ slug: i.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const item = getInitiative(params.slug)
  if (!item) return {}
  return pageMetadata({ path: `/initiatives/${item.slug}`, title: item.title, description: item.summary })
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="eyebrow">{title}</h2>
      {children}
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-[22px]">
      {items.map((x) => (
        <li key={x}>{x}</li>
      ))}
    </ul>
  )
}

export default function InitiativePage({ params }: Props) {
  const item = getInitiative(params.slug)
  if (!item) notFound()
  const all = getInitiatives()
  const others = all.filter((i) => i.slug !== item.slug).slice(0, 4)
  const writing = item.relatedWriting.map((s) => getEssay(s)).filter((e): e is NonNullable<typeof e> => Boolean(e))

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    url: `${site.url}/initiatives/${item.slug}`,
    creator: { "@id": personId },
    about: item.technologies,
  }

  return (
    <>
      <JsonLd data={schema} />
      <section className="container-site flex flex-col gap-6 pb-12 pt-16 sm:pt-[72px]">
        <p className="eyebrow">
          Initiative · {item.organization} · {item.period}
        </p>
        <h1 className="h-display max-w-[880px] text-[2.5rem] leading-[1.05] sm:text-[56px]">{item.title}</h1>
        <p className="max-w-[760px] text-xl leading-relaxed text-body">{item.summary}</p>
        {item.links && item.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {item.links.map((l) => (
              <a key={l.url} href={l.url} className="btn-secondary" rel="noopener noreferrer">
                {l.label}
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            ))}
          </div>
        )}
        {item.stats.length > 0 && (
        <div className="mt-4 grid border-y border-line [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {item.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-1.5 py-7 ${i > 0 ? "sm:border-l sm:border-line sm:pl-6" : ""} pr-6`}>
              <span className="font-serif text-5xl font-medium leading-none">{s.value}</span>
              <span className="text-[15px] text-muted">{s.label}</span>
            </div>
          ))}
        </div>
        )}
      </section>

      <section className="container-site flex flex-wrap gap-16 pb-20 pt-6">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-10 text-lg leading-[1.7] text-ink/90">
          <Section title="Problem">
            <p>{item.problem}</p>
          </Section>
          <Section title="Approach">
            <List items={item.approach} />
          </Section>
          {item.figure && <Figure name={item.figure} />}
          <Section title="Governance">
            <List items={item.governance} />
          </Section>
          <Section title="Outcome">
            <List items={item.outcome} />
          </Section>
          <div className="flex flex-col gap-3 rounded-md bg-panel px-8 py-7">
            <h2 className="eyebrow">Lesson</h2>
            <p className="font-serif text-[26px] leading-snug text-ink">{item.lesson}</p>
          </div>
        </div>

        <aside className="flex flex-[1_1_260px] flex-col gap-7 text-[15px]">
          <div className="flex flex-col gap-1.5 border-t-2 border-ink pt-4">
            <span className="label">My role</span>
            <span className="leading-normal">{item.role}</span>
          </div>
          <div className="flex flex-col gap-2.5 border-t border-line pt-4">
            <span className="label">Technologies</span>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {writing.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-line pt-4">
              <span className="label">Related writing</span>
              {writing.map((e) => (
                <Link key={e.slug} href={`/writing/${e.slug}`} className="link">
                  {e.title}
                </Link>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2.5 border-t border-line pt-4">
            <span className="label">More initiatives</span>
            {others.map((o) => (
              <Link key={o.slug} href={`/initiatives/${o.slug}`} className="link font-semibold">
                {o.title}
              </Link>
            ))}
          </div>
          <a href={`/initiatives/${item.slug}.md`} className="link text-[15px]">
            Read as Markdown
          </a>
        </aside>
      </section>
    </>
  )
}
