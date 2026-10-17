import Link from "next/link"
import type { Metadata } from "next"
import { playbooks } from "@/content/playbooks"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/playbooks",
  title: "Playbooks",
  description: "Evergreen checklists for governing and scaling AI in a regulated enterprise, each with a self-assessment.",
})

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })

export default function PlaybooksPage() {
  return (
    <div className="container-site flex flex-col gap-10 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex max-w-[760px] flex-col gap-4">
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Playbooks</h1>
        <p className="lede">
          Evergreen checklists for running AI in a regulated enterprise. Each point has a one-line test you can hold a program against, and each playbook has a
          two-minute self-assessment.
        </p>
      </div>
      <ol className="flex flex-col">
        {playbooks.map((p, i) => (
          <li key={p.slug} className="grid gap-x-10 gap-y-4 border-t border-line py-10 md:grid-cols-[80px_minmax(0,1fr)_240px]">
            <span aria-hidden="true" className="font-serif text-5xl leading-none text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-3">
              <Link href={`/playbooks/${p.slug}`} className="font-serif text-[28px] font-medium leading-tight text-ink hover:text-accent">
                {p.title}
              </Link>
              <p className="text-copy leading-relaxed text-body">{p.summary}</p>
              <ul className="flex flex-wrap gap-2 pt-1">
                {p.items.slice(0, 4).map((it) => (
                  <li key={it.title} className="chip">
                    {it.title}
                  </li>
                ))}
                {p.items.length > 4 && <li className="chip">+{p.items.length - 4} more</li>}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:items-end md:text-right">
              <span className="text-[15px] text-muted">
                {p.items.length} points · reviewed {fmt(p.reviewed)}
              </span>
              <Link href={`/playbooks/${p.slug}`} className="btn-primary">
                Read the playbook
              </Link>
              <Link href={`/playbooks/${p.slug}/assessment`} className="link text-[15px] font-semibold">
                Take the self-assessment
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
