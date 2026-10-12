"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/content/site"
import { ThemeToggle } from "@/components/theme-toggle"

// Until the newsletter is live, the header's call to action is "Follow" (LinkedIn) rather than a dead "Subscribe".
function CallToAction({ className = "" }: { className?: string }) {
  const linkedin = site.social.find((s) => s.label === "LinkedIn")?.url ?? "/reach"
  const base = `inline-flex min-h-[40px] items-center rounded-full bg-accent px-4 text-[15px] font-medium text-page hover:bg-accent-strong ${className}`
  return site.newsletterAction ? (
    <Link href="/#subscribe" className={base}>
      Subscribe
    </Link>
  ) : (
    <a href={linkedin} className={base} rel="noopener noreferrer">
      Follow
    </a>
  )
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  const links = nav.map((item) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
    return { ...item, active }
  })

  return (
    <header className="relative border-b border-line">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-page focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between gap-6 py-3 sm:py-4">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-x-6 text-[15px] font-medium sm:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={item.active ? "text-accent underline underline-offset-[6px]" : "text-ink hover:text-accent"}
            >
              {item.label}
            </Link>
          ))}
          <CallToAction />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[15px] font-medium text-ink hover:bg-chip"
          >
            Menu
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-page sm:hidden">
          <ul className="container-site flex flex-col py-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center text-lg ${item.active ? "font-semibold text-accent" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pb-3 pt-2">
              <CallToAction />
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
