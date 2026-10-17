"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loadSearchIndex, searchEntries, type SearchEntry } from "@/lib/search-score"

// Site search: a Cmd+K / Ctrl+K dialog available on every page, plus the same results on /search.
// Everything runs in the browser against a static index; no queries leave the page.

const SUGGESTIONS: { label: string; href: string }[] = [
  { label: "Playbooks: governing AI in a bank", href: "/playbooks" },
  { label: "Model is a tool, harness is the strategy", href: "/writing/model-is-a-tool-harness-is-the-strategy" },
  { label: "The AI-native SDLC", href: "/writing/the-ai-native-sdlc" },
  { label: "Inside an Architecture-as-Code platform", href: "/writing/inside-an-architecture-as-code-platform" },
  { label: "The cost of unmanaged context", href: "/writing/the-cost-of-unmanaged-context" },
]

export function useSearch(query: string, enabled = true) {
  const [index, setIndex] = useState<SearchEntry[] | null>(null)
  useEffect(() => {
    if (!enabled || index) return
    let alive = true
    loadSearchIndex().then((entries) => alive && setIndex(entries))
    return () => {
      alive = false
    }
  }, [enabled, index])
  const results = useMemo(() => (index ? searchEntries(index, query) : []), [index, query])
  return { results, ready: index !== null }
}

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function ResultList({
  results,
  activeIndex,
  listId,
  onPick,
}: {
  results: SearchEntry[]
  activeIndex?: number
  listId?: string
  onPick?: () => void
}) {
  return (
    <ul id={listId} role="listbox" aria-label="Search results" className="flex flex-col">
      {results.map((r, i) => (
        <li key={r.url} id={listId ? `${listId}-${i}` : undefined} role="option" aria-selected={activeIndex === i}>
          <Link
            href={r.url}
            onClick={onPick}
            className={`flex flex-col gap-1 rounded-md px-4 py-3 ${activeIndex === i ? "bg-accent-soft" : "hover:bg-chip"}`}
          >
            <span className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">
              {r.kind}
              <span className="font-normal normal-case tracking-normal">{r.meta !== r.kind ? r.meta : ""}</span>
            </span>
            <span className="font-serif text-[19px] font-medium leading-snug text-ink">{r.title}</span>
            <span className="line-clamp-2 text-[15px] leading-relaxed text-body">{r.summary}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function SearchDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const listId = useId().replace(/:/g, "")
  const { results, ready } = useSearch(query, open)

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setOpen(true)
  }, [])
  const hide = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActive(0)
    returnFocus.current?.focus?.()
  }, [])

  // Global shortcuts: Cmd/Ctrl+K anywhere, "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (open) hide()
        else show()
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault()
        show()
      }
    }
    const onOpen = () => show()
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-site-search", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-site-search", onOpen)
    }
  }, [open, show, hide])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      hide()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const pick = results[active]
      if (pick) {
        hide()
        router.push(pick.url)
      } else if (query.trim()) {
        hide()
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/40 px-4 pt-[10vh] backdrop-blur-sm print:hidden" onMouseDown={hide}>
          <div
            id="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Search muthub.org"
            className="flex max-h-[75vh] w-full max-w-[640px] flex-col overflow-hidden rounded-lg border border-line bg-page shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="text-muted">
                <SearchIcon size={18} />
              </span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search essays, playbooks, initiatives…"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls={listId}
                aria-activedescendant={results.length > 0 ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
                className="h-14 w-full bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
              />
              <button type="button" onClick={hide} className="rounded border border-line px-2 py-0.5 text-[12px] text-muted hover:text-ink">
                Esc
              </button>
            </div>

            <div className="overflow-y-auto p-2">
              {query.trim() === "" && (
                <div className="flex flex-col gap-1 p-2">
                  <p className="label px-2 pb-1">Start here</p>
                  {SUGGESTIONS.map((s) => (
                    <Link key={s.href} href={s.href} onClick={hide} className="rounded-md px-2 py-2 text-[16px] text-ink hover:bg-chip">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
              {query.trim() !== "" && ready && results.length === 0 && (
                <p className="px-4 py-6 text-[16px] text-body">No matches for “{query}”. Try a broader word, such as “agents” or “governance”.</p>
              )}
              {query.trim() !== "" && !ready && <p className="px-4 py-6 text-[16px] text-muted">Loading…</p>}
              {results.length > 0 && <ResultList results={results} activeIndex={active} listId={listId} onPick={hide} />}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-[13px] text-muted">
              <span>
                <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to move · <kbd className="font-sans">Enter</kbd> to open
              </span>
              {query.trim() && (
                <Link href={`/search?q=${encodeURIComponent(query.trim())}`} onClick={hide} className="link">
                  All results
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/** Header button that opens the single search dialog mounted in the layout. */
export function SearchButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-site-search"))}
      aria-label="Search the site"
      aria-keyshortcuts="Meta+K Control+K"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-3 text-[15px] text-muted transition-colors hover:border-strong hover:text-ink xl:pr-2"
    >
      <SearchIcon />
      <span className="hidden xl:inline">Search</span>
      <kbd className="hidden rounded border border-line bg-chip px-1.5 font-sans text-[12px] text-muted xl:inline">⌘K</kbd>
    </button>
  )
}

/** Inline search box used on /search and the 404 page. */
export function InlineSearch({ initialQuery = "", autoFocus = false }: { initialQuery?: string; autoFocus?: boolean }) {
  const router = useRouter()
  const [query, setQuery] = useState(initialQuery)
  const { results, ready } = useSearch(query)

  useEffect(() => setQuery(initialQuery), [initialQuery])

  return (
    <div className="flex flex-col gap-6">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          router.replace(`/search?q=${encodeURIComponent(query.trim())}`)
        }}
        className="flex items-center gap-3 rounded-full border border-strong px-5 focus-within:border-ink"
      >
        <span className="text-muted">
          <SearchIcon size={18} />
        </span>
        <label htmlFor="site-search" className="sr-only">
          Search the site
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search essays, playbooks, initiatives…"
          className="h-14 w-full bg-transparent text-[17px] text-ink outline-none placeholder:text-muted"
        />
      </form>
      {query.trim() !== "" && ready && (
        <p className="text-[15px] text-muted" aria-live="polite">
          {results.length === 0 ? `No matches for “${query}”.` : `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`}
        </p>
      )}
      {results.length > 0 && <ResultList results={results} />}
    </div>
  )
}
