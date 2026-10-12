import { themes } from "@/content/site"
import { getEssays, getInitiatives, getNotes } from "@/lib/content"
import {
  aboutMarkdown,
  essayMarkdown,
  homeMarkdown,
  initiativeMarkdown,
  initiativesMarkdown,
  nowMarkdown,
  reachMarkdown,
  themeMarkdown,
  writingMarkdown,
} from "@/lib/markdown"

// Markdown twins. next.config.mjs rewrites /index.md, /<page>.md and /<section>/<slug>.md here.
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return [
    { path: [] },
    { path: ["writing"] },
    { path: ["initiatives"] },
    { path: ["about"] },
    { path: ["reach"] },
    { path: ["now"] },
    ...[...getEssays(), ...getNotes()].map((e) => ({ path: ["writing", e.slug] })),
    ...getInitiatives().map((i) => ({ path: ["initiatives", i.slug] })),
    ...themes.map((t) => ({ path: ["writing", "theme", t.slug] })),
  ]
}

function render(path: string[]): string | null {
  const [section, slug, sub] = path
  if (section === "writing" && slug === "theme" && sub) return themeMarkdown(sub)
  if (!section || section === "index") return homeMarkdown()
  if (!slug) {
    switch (section) {
      case "writing":
        return writingMarkdown()
      case "initiatives":
        return initiativesMarkdown()
      case "about":
        return aboutMarkdown()
      case "reach":
        return reachMarkdown()
      case "now":
        return nowMarkdown()
      default:
        return null
    }
  }
  if (section === "writing") return essayMarkdown(slug)
  if (section === "initiatives") return initiativeMarkdown(slug)
  return null
}

export function GET(_request: Request, { params }: { params: { path?: string[] } }) {
  const body = render(params.path ?? [])
  if (!body) return new Response("Not found", { status: 404 })
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } })
}
