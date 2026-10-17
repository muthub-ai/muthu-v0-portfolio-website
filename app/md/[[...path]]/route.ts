import { themes } from "@/content/site"
import { playbooks } from "@/content/playbooks"
import { tags } from "@/content/tags"
import { getEssays, getInitiatives, getNotes } from "@/lib/content"
import {
  aboutMarkdown,
  essayMarkdown,
  homeMarkdown,
  initiativeMarkdown,
  initiativesMarkdown,
  nowMarkdown,
  playbookMarkdown,
  playbooksMarkdown,
  tagMarkdown,
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
    { path: ["playbooks"] },
    ...playbooks.map((p) => ({ path: ["playbooks", p.slug] })),
    ...tags.map((t) => ({ path: ["writing", "tag", t.slug] })),
    ...[...getEssays(), ...getNotes()].map((e) => ({ path: ["writing", e.slug] })),
    ...getInitiatives().map((i) => ({ path: ["initiatives", i.slug] })),
    ...themes.map((t) => ({ path: ["writing", "theme", t.slug] })),
  ]
}

function render(path: string[]): string | null {
  const [section, slug, sub] = path
  if (section === "writing" && slug === "theme" && sub) return themeMarkdown(sub)
  if (section === "writing" && slug === "tag" && sub) return tagMarkdown(sub)
  if (section === "playbooks" && slug) return playbookMarkdown(slug)
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
      case "playbooks":
        return playbooksMarkdown()
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
