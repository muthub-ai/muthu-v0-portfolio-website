"use client"

import Link from "next/link"
import { useState } from "react"

interface Item {
  slug: string
  title: string
  summary: string
  theme: string
  themeName: string
  date: string
}

export function WritingList({ essays, themes }: { essays: Item[]; themes: { slug: string; name: string }[] }) {
  const [active, setActive] = useState("all")
  const filters = [{ slug: "all", name: "All" }, ...themes]
  const shown = active === "all" ? essays : essays.filter((e) => e.theme === active)

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filter by theme" className="flex flex-wrap gap-2.5">
        {filters.map((f) => {
          const on = f.slug === active
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.slug)}
              className={`min-h-[44px] rounded-full border px-[18px] text-[15px] transition-colors ${
                on ? "border-ink bg-ink font-semibold text-page" : "border-strong bg-page font-medium text-ink hover:border-ink"
              }`}
            >
              {f.name}
            </button>
          )
        })}
      </div>
      <section aria-labelledby="essays-heading" className="flex flex-col">
        <h2 id="essays-heading" className="label mb-2">
          Essays · {shown.length}
        </h2>
        {shown.length === 0 && <p className="border-t border-line py-6 text-body">Nothing in this theme yet.</p>}
        {shown.map((post) => (
          <article key={post.slug} className="flex flex-col gap-2 border-t border-line py-6">
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
              <span className="font-semibold uppercase tracking-[0.06em] text-accent">{post.themeName}</span>
              <span>{post.date}</span>
            </div>
            <h3 className="font-serif text-[26px] font-medium leading-tight">
              <Link href={`/writing/${post.slug}`} className="text-ink hover:text-accent">
                {post.title}
              </Link>
            </h3>
            <p className="text-base leading-relaxed text-body">{post.summary}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
