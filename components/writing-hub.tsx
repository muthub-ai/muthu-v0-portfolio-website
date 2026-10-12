import Link from "next/link"
import { site, themeName, themes, type ThemeSlug } from "@/content/site"
import { dateLabel, getEssays, getNotes, readingMinutes } from "@/lib/content"
import { archive } from "@/content/archive"

// The writing list. Each theme filter is a real page (/writing/theme/<slug>) so it can be shared, bookmarked and indexed.
export function WritingHub({ theme }: { theme?: ThemeSlug }) {
  const essays = getEssays(theme)
  const notes = theme ? [] : getNotes()
  const current = themes.find((t) => t.slug === theme)
  const filters = [{ slug: "all", name: "All", href: "/writing" }, ...themes.map((t) => ({ slug: t.slug, name: t.name, href: `/writing/theme/${t.slug}` }))]

  return (
    <div className="container-site flex flex-col gap-10 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex max-w-[720px] flex-col gap-4">
        {current && (
          <Link href="/writing" className="label hover:text-ink">
            Writing
          </Link>
        )}
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">{current ? current.name : "Writing"}</h1>
        <p className="text-[19px] leading-relaxed text-body">
          {current
            ? current.blurb
            : "Essays and notes on governed AI in financial services. Essays argue one idea; notes are shorter takes on what I am reading and testing."}
        </p>
        <p className="text-[15px] text-muted">
          Follow by{" "}
          <a href="/rss.xml" className="link">
            RSS
          </a>
          {site.newsletterAction ? (
            <>
              {" "}
              or the{" "}
              <Link href="/#subscribe" className="link">
                monthly note
              </Link>
            </>
          ) : (
            <>
              {" "}
              or on{" "}
              <a href={site.social.find((s) => s.label === "LinkedIn")?.url} className="link" rel="noopener noreferrer">
                LinkedIn
              </a>
            </>
          )}
          .
        </p>
      </div>

      <nav aria-label="Filter by theme" className="flex flex-wrap gap-2.5">
        {filters.map((f) => {
          const on = (theme ?? "all") === f.slug
          return (
            <Link
              key={f.slug}
              href={f.href}
              aria-current={on ? "page" : undefined}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-[18px] text-[15px] transition-colors ${
                on ? "border-ink bg-ink font-semibold text-page" : "border-strong bg-page font-medium text-ink hover:border-ink"
              }`}
            >
              {f.name}
            </Link>
          )
        })}
      </nav>

      <div className="flex flex-wrap gap-14">
        <section aria-labelledby="essays-heading" className="flex min-w-0 flex-[999_1_560px] flex-col">
          <h2 id="essays-heading" className="label mb-2">
            Essays · {essays.length}
          </h2>
          {essays.length === 0 && <p className="border-t border-line py-6 text-body">Nothing in this theme yet.</p>}
          {essays.map((post) => (
            <article key={post.slug} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line py-6">
              <span className="flex-[0_0_110px] pt-1.5 text-[15px] text-muted">{dateLabel(post)}</span>
              <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-2">
                <h3 className="font-serif text-[26px] font-medium leading-tight">
                  <Link href={`/writing/${post.slug}`} className="text-ink hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-[17px] leading-relaxed text-body">{post.summary}</p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {!theme && <span className="chip">{themeName(post.theme)}</span>}
                  <span className="text-[15px] text-muted">{readingMinutes(post.body)} min read</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {!theme && (
          <aside aria-labelledby="notes-heading" className="flex flex-[1_1_280px] flex-col">
            <h2 id="notes-heading" className="label mb-2">
              Notes · short takes
            </h2>
            {notes.map((note) => (
              <div key={note.slug} className="flex flex-col gap-1.5 border-t border-line py-5">
                <span className="text-[15px] text-muted">{dateLabel(note)}</span>
                <Link href={`/writing/${note.slug}`} className="text-[17px] font-semibold leading-snug text-ink hover:text-accent">
                  {note.title}
                </Link>
                <span className="text-[16px] leading-relaxed text-body">{note.summary}</span>
              </div>
            ))}
          </aside>
        )}
      </div>

      {!theme && (
        <section aria-labelledby="archive-heading" className="flex flex-col gap-2 border-t border-line pt-10">
          <h2 id="archive-heading" className="h-display text-[32px]">
            From the archive
          </h2>
          <p className="mb-4 text-[17px] text-muted">Earlier essays on data platforms, MLOps and cloud architecture, published on Medium.</p>
          <ul className="grid gap-x-10 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {archive.map((a) => (
              <li key={a.url} className="flex flex-col gap-1 border-t border-line py-5">
                <span className="text-[15px] text-muted">
                  {new Date(`${a.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })} · Medium
                </span>
                <a href={a.url} className="text-[17px] font-semibold leading-snug text-ink hover:text-accent" rel="noopener noreferrer">
                  {a.title}
                </a>
                <span className="text-[16px] leading-relaxed text-body">{a.summary}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
