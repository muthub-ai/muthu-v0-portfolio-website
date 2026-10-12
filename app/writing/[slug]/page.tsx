import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { site, themeName } from "@/content/site"
import { dateLabel, getEssay, getEssays, getNote, getNotes, readingMinutes } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"
import { Blocks } from "@/components/rich-text"
import { JsonLd, personId, personSchema } from "@/components/json-ld"
import { Newsletter } from "@/components/newsletter"
import { Portrait } from "@/components/portrait"

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return [...getEssays(), ...getNotes()].map((item) => ({ slug: item.slug }))
}

function find(slug: string) {
  const essay = getEssay(slug)
  if (essay) return { kind: "Essay" as const, item: essay, theme: themeName(essay.theme), related: essay.related }
  const note = getNote(slug)
  if (note) return { kind: "Note" as const, item: note, theme: "Note", related: [] as string[] }
  return null
}

export function generateMetadata({ params }: Props): Metadata {
  const found = find(params.slug)
  if (!found) return {}
  const { item } = found
  return {
    ...pageMetadata({
      path: `/writing/${item.slug}`,
      title: item.title,
      description: item.summary,
      type: "article",
      publishedTime: item.published,
      modifiedTime: "updated" in item ? item.updated ?? item.published : item.published,
    }),
    ...(item.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  }
}

export default function WritingItemPage({ params }: Props) {
  const found = find(params.slug)
  if (!found) notFound()
  const { kind, item, theme, related } = found
  const relatedEssays = related.map((slug) => getEssay(slug)).filter((e): e is NonNullable<typeof e> => Boolean(e))

  const article = {
    "@context": "https://schema.org",
    "@type": kind === "Essay" ? "Article" : "BlogPosting",
    headline: item.title,
    description: item.summary,
    url: `${site.url}/writing/${item.slug}`,
    mainEntityOfPage: `${site.url}/writing/${item.slug}`,
    image: `${site.url}${site.ogImage}`,
    inLanguage: "en-US",
    ...(item.published ? { datePublished: item.published, dateModified: ("updated" in item && item.updated) || item.published } : {}),
    author: { ...personSchema(), "@id": personId },
    publisher: { "@id": personId },
    about: theme,
  }

  return (
    <>
      <JsonLd data={article} />
      <article className="mx-auto flex max-w-prose flex-col gap-7 px-5 pb-14 pt-16 sm:px-8 sm:pt-[72px]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <Link href="/writing" className="eyebrow hover:underline">
            {theme}
          </Link>
          <span>{kind}</span>
          {item.status === "draft" && <span className="rounded-full bg-draft px-2.5 py-0.5 text-[13px] font-semibold text-draft-ink">Draft for review</span>}
        </div>
        <h1 className="h-display text-[2.5rem] leading-[1.08] sm:text-[52px]">{item.title}</h1>
        <p className="font-serif text-[23px] leading-snug text-body">{item.summary}</p>
        <div className="flex items-center gap-3.5 border-y border-line py-4">
          <Portrait size={88} decorative className="h-11 w-11 rounded-full object-cover" />
          <div className="flex flex-col text-sm">
            <span className="font-semibold">{site.name}</span>
            <span className="text-muted">
              {dateLabel(item)} · {readingMinutes(item.body)} min read
            </span>
          </div>
          <a href={`/writing/${item.slug}.md`} className="link ml-auto text-sm font-semibold">
            Read as Markdown
          </a>
        </div>

        <Blocks blocks={item.body} />

        <p className="mt-2 text-sm leading-relaxed text-muted">
          {item.source} {site.disclosure}
        </p>
      </article>

      {relatedEssays.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line">
          <div className="container-site flex flex-col gap-6 py-14">
            <h2 id="related" className="label">
              Keep reading
            </h2>
            <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
              {relatedEssays.map((e) => (
                <Link key={e.slug} href={`/writing/${e.slug}`} className="group flex flex-col gap-2 border-t-2 border-ink pt-4 text-ink">
                  <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-accent">{themeName(e.theme)}</span>
                  <span className="font-serif text-2xl font-medium leading-snug group-hover:text-accent">{e.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter compact />
    </>
  )
}
