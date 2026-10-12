import Link from "next/link"
import { site } from "@/content/site"
import { lastUpdated } from "@/lib/content"

export function SiteFooter() {
  const updated = lastUpdated()
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-wrap justify-between gap-5 py-10 text-sm text-muted">
        <div className="flex flex-col gap-1.5">
          <p>
            © {new Date().getFullYear()} {site.fullName}. {site.disclosure}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {updated && <span>Last updated {updated}</span>}
            <a href={site.statusUrl} className="inline-flex items-center gap-1.5 hover:text-accent" rel="noopener noreferrer">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              All systems normal
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {site.social.map((s) => (
            <a key={s.label} href={s.url} className="link" rel="me noopener noreferrer">
              {s.label}
            </a>
          ))}
          <Link href="/now" className="link">
            Now
          </Link>
          <a href="/rss.xml" className="link">
            RSS
          </a>
          <a href="/llms.txt" className="link">
            llms.txt
          </a>
          <Link href="/about#disclosures" className="link">
            Disclosures
          </Link>
        </nav>
      </div>
    </footer>
  )
}
