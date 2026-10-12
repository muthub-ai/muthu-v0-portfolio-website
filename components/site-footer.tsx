import Link from "next/link"
import type { ReactNode } from "react"
import { site } from "@/content/site"
import { siteLastUpdated } from "@/lib/site-updated"

// Small, monochrome icons that follow the text colour. Brand glyphs from Simple Icons (CC0).
const brand: Record<string, string> = {
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  GitHub:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  Medium:
    "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
}

function BrandIcon({ name }: { name: string }) {
  return (
    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d={brand[name]} />
    </svg>
  )
}

function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {children}
    </svg>
  )
}

const icons = {
  playbook: (
    <LineIcon>
      <path d="M9 11l2 2 4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </LineIcon>
  ),
  now: (
    <LineIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </LineIcon>
  ),
  rss: (
    <LineIcon>
      <path d="M5 11a8 8 0 0 1 8 8M5 5a14 14 0 0 1 14 14" />
      <circle cx="6" cy="18" r="1.2" fill="currentColor" />
    </LineIcon>
  ),
  llms: (
    <LineIcon>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </LineIcon>
  ),
  disclosures: (
    <LineIcon>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </LineIcon>
  ),
}

const linkClass = "inline-flex items-center gap-1.5 text-muted hover:text-accent"

export function SiteFooter() {
  const updated = siteLastUpdated()
  return (
    <footer className="border-t border-line">
      <div className="container-site flex flex-col items-center gap-5 py-10 text-center text-[15px] text-muted">
        <div className="flex flex-col items-center gap-1.5">
          <p>
            © {new Date().getFullYear()} {site.fullName}. {site.disclosure}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>
              Last updated <time dateTime={updated.iso}>{updated.label}</time>
            </span>
            <a href={site.statusUrl} className="inline-flex items-center gap-1.5 hover:text-accent" rel="noopener noreferrer">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              All systems normal
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {site.social.map((s) => (
            <a key={s.label} href={s.url} className={linkClass} rel="me noopener noreferrer">
              <BrandIcon name={s.label} />
              {s.label}
            </a>
          ))}
          <Link href="/playbook" className={linkClass}>
            {icons.playbook}
            Playbook
          </Link>
          <Link href="/now" className={linkClass}>
            {icons.now}
            Now
          </Link>
          <a href="/rss.xml" className={linkClass}>
            {icons.rss}
            RSS
          </a>
          <a href="/llms.txt" className={linkClass}>
            {icons.llms}
            llms.txt
          </a>
          <Link href="/about#disclosures" className={linkClass}>
            {icons.disclosures}
            Disclosures
          </Link>
        </nav>
      </div>
    </footer>
  )
}
