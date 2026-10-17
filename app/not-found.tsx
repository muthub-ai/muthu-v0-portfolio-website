import Link from "next/link"
import { InlineSearch } from "@/components/search"
import { themes } from "@/content/site"

export default function NotFound() {
  return (
    <div className="container-site flex max-w-[860px] flex-col gap-8 py-20 sm:py-24">
      <div className="flex flex-col gap-4">
        <p className="eyebrow">404</p>
        <h1 className="h-display text-5xl leading-[1.05]">This page has moved or never existed</h1>
        <p className="lede">Search for what you were looking for, or start from one of the themes below.</p>
      </div>
      <InlineSearch />
      <div className="flex flex-col gap-3 border-t border-line pt-6">
        <p className="label">Themes</p>
        <div className="flex flex-wrap gap-2.5">
          {themes.map((t) => (
            <Link key={t.slug} href={`/writing/theme/${t.slug}`} className="chip hover:text-ink">
              {t.name}
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Go home
          </Link>
          <Link href="/playbooks" className="btn-secondary">
            Browse the playbooks
          </Link>
        </div>
      </div>
    </div>
  )
}
