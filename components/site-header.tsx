"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/content/site"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchButton } from "@/components/search"
import { BrandIcon } from "@/components/social-icons"

const headerSocial = site.social.filter((s) => s.label === "LinkedIn" || s.label === "GitHub")

function ReachMe({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/reach"
      className={`inline-flex min-h-[40px] items-center rounded-full bg-ink px-4 text-[15px] font-medium text-page transition-opacity hover:opacity-90 ${className}`}
    >
      Reach me
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/"
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])

  const links = nav.map((item) => ({ ...item, active: pathname === item.href || pathname.startsWith(`${item.href}/`) }))

  return (
    <header className="relative border-b border-line print:hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-page focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-site flex items-center justify-between gap-6 py-3 sm:py-4">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-x-6 text-[15px] font-medium lg:flex">
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
          <ReachMe className="ml-1.5" />
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
                  className={`flex min-h-[48px] items-center text-lg ${item.active ? "font-semibold text-accent" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-3 pb-3 pt-2">
              <ReachMe />
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
