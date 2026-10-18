"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/content/site"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchButton } from "@/components/search"
import { BrandIcon } from "@/components/social-icons"

const headerSocial = site.social.filter((s) => s.label === "LinkedIn" || s.label === "GitHub")

export function SiteHeader() {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  const links = nav.map((item) => ({ ...item, active: pathname === item.href || pathname.startsWith(`${item.href}/`), highlight: "highlight" in item && item.highlight }))
  // The highlighted entry (the new Knowledge Foundation graph) reads as a small accent pill with a live dot.
  const pill = "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-semibold text-accent hover:border-accent"
  const dot = <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />

  return (
    <header className="relative border-b border-line print:hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-page focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between gap-6 py-3 sm:py-4">
        <Link href="/" className="group whitespace-nowrap font-serif text-[22px] font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
          {site.name}
          <span aria-hidden="true" className="brand-cursor ml-[2px] font-sans font-medium text-accent">
            _
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-x-6 text-[15px] font-medium lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={item.highlight ? pill : item.active ? "text-accent underline underline-offset-[6px]" : "text-ink hover:text-accent"}
            >
              {item.highlight && dot}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <SearchButton />
          {headerSocial.map((s) => (
            <a
              key={s.label}
              href={s.url}
              rel="me noopener noreferrer"
              aria-label={`${s.label} profile`}
              title={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-chip hover:text-ink"
            >
              <BrandIcon name={s.label} />
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <SearchButton />
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
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line bg-page lg:hidden">
          <ul className="container-site flex flex-col py-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex min-h-[48px] items-center gap-2 text-lg ${item.active || item.highlight ? "font-semibold text-accent" : "text-ink"}`}
                >
                  {item.highlight && dot}
                  {item.label}
                  {item.highlight && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-accent">New</span>}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 pb-3 pt-2">
              {headerSocial.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  rel="me noopener noreferrer"
                  aria-label={`${s.label} profile`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
                >
                  <BrandIcon name={s.label} size={18} />
                </a>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
