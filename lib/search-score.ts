// Client-side ranking for the static search index. Small, dependency-free and predictable:
// every query word must appear somewhere; title hits outrank summary hits, which outrank body hits.

export interface SearchEntry {
  url: string
  title: string
  kind: "Essay" | "Note" | "Initiative" | "Playbook" | "Page" | "Architecture"
  meta: string
  summary: string
  text: string
}

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")

const KIND_BOOST: Record<SearchEntry["kind"], number> = {
  Essay: 3,
  Playbook: 3,
  Initiative: 2,
  Architecture: 1,
  Note: 1,
  Page: 0,
}

export function searchEntries(entries: SearchEntry[], query: string, limit = 12): SearchEntry[] {
  const words = fold(query)
    .split(/[^a-z0-9+#.-]+/)
    .filter((w) => w.length > 1 || /\d/.test(w))
  if (words.length === 0) return []

  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of entries) {
    const title = fold(entry.title)
    const summary = fold(entry.summary)
    const text = fold(entry.text)
    let score = 0
    let all = true
    for (const w of words) {
      const re = new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)
      const inTitle = re.test(title)
      const inSummary = re.test(summary)
      const inText = re.test(text)
      if (!inTitle && !inSummary && !inText) {
        all = false
        break
      }
      score += (inTitle ? 10 : 0) + (inSummary ? 4 : 0) + (inText ? 1 : 0)
    }
    if (!all) continue
    if (title.includes(fold(query.trim()))) score += 15
    scored.push({ entry, score: score + KIND_BOOST[entry.kind] })
  }
  return scored
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map((s) => s.entry)
}

let cache: Promise<SearchEntry[]> | null = null

export function loadSearchIndex(): Promise<SearchEntry[]> {
  if (!cache) {
    cache = fetch("/search-index.json")
      .then((r) => (r.ok ? (r.json() as Promise<SearchEntry[]>) : []))
      .catch(() => {
        cache = null
        return []
      })
  }
  return cache!
}
