import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import { InlineSearch } from "@/components/search"
import { themes } from "@/content/site"
import Link from "next/link"

export const metadata: Metadata = {
  ...pageMetadata({ path: "/search", title: "Search", description: "Search essays, notes, playbooks and initiatives on muthub.org." }),
  robots: { index: false, follow: true },
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = typeof searchParams.q === "string" ? searchParams.q : ""
  return (
    <div className="container-site flex max-w-[860px] flex-col gap-8 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex flex-col gap-3">
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Search</h1>
        <p className="lede">Essays, notes, playbooks, initiatives and architecture views. Tip: press ⌘K (Ctrl+K) on any page.</p>
      </div>
      <InlineSearch initialQuery={q} autoFocus={!q} />
      {!q && (
        <div className="flex flex-col gap-3 border-t border-line pt-6">
          <p className="label">Or browse by theme</p>
          <div className="flex flex-wrap gap-2.5">
            {themes.map((t) => (
              <Link key={t.slug} href={`/writing/theme/${t.slug}`} className="chip hover:text-ink">
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
