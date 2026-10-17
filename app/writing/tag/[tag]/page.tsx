import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getTag, tags } from "@/content/tags"
import { themeName, type ThemeSlug } from "@/content/site"
import { dateLabel, getByTag, getTagCounts, readingMinutes } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

interface Props {
  params: { tag: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return tags.map((t) => ({ tag: t.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = getTag(params.tag)
  if (!tag) return {}
  return pageMetadata({ path: `/writing/tag/${tag.slug}`, title: `${tag.name}: writing`, description: `Essays and notes on ${tag.name.toLowerCase()} by Muthu Bommiah.` })
}

export default function TagPage({ params }: Props) {
  const tag = getTag(params.tag)
  if (!tag) notFound()
  const { essays, notes } = getByTag(tag.slug)
  const all = getTagCounts()

  return (
    <div className="container-site flex flex-col gap-10 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex max-w-[760px] flex-col gap-4">
        <Link href="/writing" className="label hover:text-ink">
          Writing · topic
        </Link>
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">{tag.name}</h1>
        <p className="lede">
          {essays.length} essay{essays.length === 1 ? "" : "s"} and {notes.length} note{notes.length === 1 ? "" : "s"}.
        </p>
      </div>
      <nav aria-label="Topics" className="flex flex-wrap gap-2">
        {all.map((t) => (
          <Link
            key={t.slug}
            href={`/writing/tag/${t.slug}`}
            aria-current={t.slug === tag.slug ? "page" : undefined}
            className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[15px] ${
              t.slug === tag.slug ? "border-ink bg-ink font-semibold text-page" : "border-strong text-ink hover:border-ink"
            }`}
          >
            {t.name}
            <span className={t.slug === tag.slug ? "text-page/70" : "text-muted"}>{t.count}</span>
          </Link>
        ))}
      </nav>
      <section aria-label="Pieces" className="flex flex-col">
        {[...essays, ...notes].map((post) => (
          <article key={post.slug} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6">
            <span className="flex-[0_0_110px] pt-1.5 text-[15px] text-muted">{dateLabel(post)}</span>
            <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2">
              <h2 className="font-serif text-[24px] font-medium leading-tight">
                <Link href={`/writing/${post.slug}`} className="text-ink hover:text-accent">
                  {post.title}
                </Link>
              </h2>
              <p className="text-copy leading-relaxed text-body">{post.summary}</p>
              <span className="flex flex-wrap items-center gap-2 pt-1">
                <span className="chip">{"theme" in post ? themeName((post as { theme: ThemeSlug }).theme) : "Note"}</span>
                <span className="text-[15px] text-muted">{readingMinutes(post.body)} min read</span>
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
