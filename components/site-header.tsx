"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { nav, site } from "@/content/site"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname() ?? "/"

  return (
    <header className="border-b border-line">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-page focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="container-site flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-[-0.01em] text-ink">
          {site.name}
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] font-medium">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-accent underline underline-offset-[6px]" : "text-ink hover:text-accent"}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/#subscribe" className="inline-flex min-h-[40px] items-center rounded-full bg-accent px-4 text-page hover:bg-accent-strong">
            Subscribe
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
