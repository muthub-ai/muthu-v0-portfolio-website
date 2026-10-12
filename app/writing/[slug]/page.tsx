import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { site, themeName } from "@/content/site"
import { dateLabel, getEssay, getEssays, getNote, getNotes, getSeries, readingMinutes } from "@/lib/content"
import { pageMetadata, writingImage } from "@/lib/seo"
import { Blocks, headingId } from "@/components/rich-text"
import { ShareActions } from "@/components/share-actions"
import { JsonLd, personId, personSchema } from "@/components/json-ld"
import { Newsletter } from "@/components/newsletter"
import { ReadingProgress } from "@/components/reading-progress"

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return [...getEssays(), ...getNotes()].map((item) => ({ slug: item.slug }))
}

function find(slug: string) {
  const essay = getEssay(slug)
  if (essay) return { kind: "Essay" as const, item: essay, theme: themeName(essay.theme), themeHref: `/writing/theme/${essay.theme}`, related: essay.related }
  const note = getNote(slug)
  if (note) return { kind: "Note" as const, item: note, theme: "Note", themeHref: "/writing", related: [] as string[] }
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
      image: writingImage(item.slug, item.title),
    }),
    ...(item.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  }
}

export default function WritingItemPage({ params }: Props) {
  const found = find(params.slug)
  if (!found) notFound()
  const { kind, item, theme, themeHref, related } = found
  const url = `${site.url}/writing/${item.slug}`

  // Keep reading: the newest other pieces in the same theme, topped up with hand-picked related pieces.
  const sameTheme = kind === "Essay" && "theme" in item ? getEssays(item.theme).filter((e) => e.slug !== item.slug) : []
  const picked = related.map((slug) => getEssay(slug)).filter((e): e is NonNullable<typeof e> => Boolean(e))
  const relatedEssays = [...sameTheme, ...picked, ...getEssays()]
    .filter((e, i, all) => e.slug !== item.slug && all.findIndex((x) => x.slug === e.slug) === i)
    .slice(0, 2)

  const minutes = readingMinutes(item.body)
  const sections = item.body.filter((b): b is { type: "h2"; text: string } => b.type === "h2")
  const showContents = kind === "Essay" && sections.length >= 3 && minutes >= 4
  const year = item.published?.slice(0, 4) ?? ""
  const citeDate = item.published
    ? new Date(`${item.published}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "UTC" })
    : ""

  const article = {
    "@context": "https://schema.org",
    "@type": kind === "Essay" ? "Article" : "BlogPosting",
    headline: item.title,
    description: item.summary,
    url: `${site.url}/writing/${item.slug}`,
    mainEntityOfPage: `${site.url}/writing/${item.slug}`,
    image: `${site.url}${writingImage(item.slug, item.title).url}`,
    inLanguage: "en-US",
    ...(item.published ? { datePublished: item.published, dateModified: ("updated" in item && item.updated) || item.published } : {}),
    author: { ...personSchema(), "@id": personId },
    publisher: { "@id": personId },
    about: theme,
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Writing", item: `${site.url}/writing` },
      ...(kind === "Essay" ? [{ "@type": "ListItem", position: 2, name: theme, item: `${site.url}${themeHref}` }] : []),
      { "@type": "ListItem", position: kind === "Essay" ? 3 : 2, name: item.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumbs} />
      <ReadingProgress />
      <article className="mx-auto flex max-w-prose flex-col gap-7 px-5 pb-14 pt-16 sm:px-8 sm:pt-[72px]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-muted">
          <Link href={themeHref} className="eyebrow hover:text-ink hover:underline">
            {theme}
          </Link>
          {kind === "Essay" && "series" in item && item.series && (
            <span>
              {item.series.name} · Part {item.series.part}
            </span>
          )}
          {item.status === "draft" && <span className="rounded-full bg-draft px-2.5 py-0.5 text-[13px] font-semibold text-draft-ink">Draft for review</span>}
        </div>
        <h1 className="h-display text-[2.5rem] leading-[1.08] sm:text-[52px]">{item.title}</h1>
        <p className="font-serif text-[23px] leading-snug text-body">{item.summary}</p>
        <div className="flex items-center gap-3.5 border-y border-line py-4">
          <Image src={site.headshot} alt="" width={88} height={88} className="h-11 w-11 rounded-full object-cover" />
          <div className="flex flex-col text-[15px]">
            <span className="font-semibold">{site.name}</span>
            <span className="text-muted">
              {dateLabel(item)} · {minutes} min read
            </span>
          </div>
          <a href={`/writing/${item.slug}.md`} className="link ml-auto text-[15px] font-semibold">
            Read as Markdown
          </a>
        </div>

        {showContents && (
          <nav aria-label="In this essay" className="rounded-md border border-line px-6 py-5">
            <p className="label">In this essay</p>
            <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-[16px] leading-snug marker:text-muted">
              {sections.map((h) => (
                <li key={h.text}>
                  <a href={`#${headingId(h.text)}`} className="link">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Blocks blocks={item.body} />

        <div className="mt-2 flex flex-col gap-5 border-t border-line pt-6">
          <ShareActions url={url} title={item.title} />
          <p className="text-[15px] leading-relaxed text-muted">
            <span className="font-semibold text-body">Cite this:</span> Bommiah, M. ({year}{citeDate ? `, ${citeDate}` : ""}). <em>{item.title}</em>. muthub.org.{" "}
            <a href={url} className="link break-all">
              {url}
            </a>
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            {item.source} {site.disclosure}
          </p>
        </div>

        {"series" in item && item.series && (
          <nav aria-label={`${item.series.name} series`} className="mt-4 flex flex-col gap-3 rounded-md border border-line px-7 py-6">
            <span className="eyebrow">Series · {item.series.name}</span>
            <ol className="flex flex-col gap-2">
              {getSeries(item.series.name).map((part) => (
                <li key={part.slug} className="flex gap-3 text-[15px] leading-snug">
                  <span className="w-5 shrink-0 text-muted">{part.series?.part}.</span>
                  {part.slug === item.slug ? (
                    <span aria-current="page" className="font-semibold text-ink">
                      {part.title}
                    </span>
                  ) : (
                    <Link href={`/writing/${part.slug}`} className="link">
                      {part.title}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
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
                  <span className="font-serif text-2xl font-medium leading-snug group-hover:text-accent">{e.title}</span>
                  <span className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="chip">{themeName(e.theme)}</span>
                    <span className="text-[15px] text-muted">{readingMinutes(e.body)} min read</span>
                  </span>
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
