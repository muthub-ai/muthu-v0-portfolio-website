import Link from "next/link"
import { site } from "@/content/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-wrap justify-between gap-5 py-10 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.fullName}. {site.disclosure}
        </p>
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
