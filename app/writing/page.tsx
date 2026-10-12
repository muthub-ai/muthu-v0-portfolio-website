import Link from "next/link"
import type { Metadata } from "next"
import { themeName, themes } from "@/content/site"
import { dateLabel, getEssays, getNotes } from "@/lib/content"
import { archive } from "@/content/archive"
import { pageMetadata } from "@/lib/seo"
import { WritingList } from "@/components/writing-list"

export const metadata: Metadata = pageMetadata({
  path: "/writing",
  title: "Writing",
  description: "Essays and notes on governed AI in financial services: Architecture-as-Code, the AI-native SDLC, agent governance and enterprise data platforms.",
})

export default function WritingPage() {
  const essays = getEssays().map((e) => ({
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    theme: e.theme,
    themeName: themeName(e.theme),
    date: dateLabel(e),
  }))
  const notes = getNotes()

  return (
    <div className="container-site flex flex-col gap-10 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Writing</h1>
        <p className="text-[19px] leading-relaxed text-body">
          Essays and notes on governed AI in financial services. Essays argue one idea; notes are shorter takes on what I am reading and testing.
        </p>
        <p className="text-sm text-muted">
          Subscribe by{" "}
          <a href="/rss.xml" className="link">
            RSS
          </a>{" "}
          or the{" "}
          <Link href="/#subscribe" className="link">
            monthly note
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-wrap gap-14">
        <div className="min-w-0 flex-[999_1_560px]">
          <WritingList essays={essays} themes={themes.map((t) => ({ slug: t.slug, name: t.name }))} />
        </div>
        <aside aria-labelledby="notes-heading" className="flex flex-[1_1_280px] flex-col pt-[76px]">
          <h2 id="notes-heading" className="label mb-2">
            Notes
          </h2>
          {notes.length === 0 && <p className="border-t border-line py-5 text-body">Notes are coming soon.</p>}
          {notes.map((note) => (
            <div key={note.slug} className="flex flex-col gap-1.5 border-t border-line py-5">
              <span className="text-[13px] text-muted">{dateLabel(note)}</span>
              <Link href={`/writing/${note.slug}`} className="text-[17px] font-semibold leading-snug text-ink hover:text-accent">
                {note.title}
              </Link>
              <span className="text-[15px] leading-relaxed text-body">{note.summary}</span>
            </div>
          ))}
        </aside>
      </div>

      <section aria-labelledby="archive-heading" className="flex flex-col gap-2 border-t border-line pt-10">
        <h2 id="archive-heading" className="h-display text-[32px]">
          From the archive
        </h2>
        <p className="mb-4 text-muted">Earlier essays on data platforms, MLOps and cloud architecture, published on Medium.</p>
        <ul className="grid gap-x-10 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          {archive.map((a) => (
            <li key={a.url} className="flex flex-col gap-1 border-t border-line py-5">
              <span className="text-[13px] text-muted">
                {new Date(`${a.date}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })} · Medium
              </span>
              <a href={a.url} className="text-[17px] font-semibold leading-snug text-ink hover:text-accent" rel="noopener noreferrer">
                {a.title}
              </a>
              <span className="text-[15px] leading-relaxed text-body">{a.summary}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
