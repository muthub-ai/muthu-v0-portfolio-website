import { essays as coreEssays, notes as coreNotes, type Essay } from "@/content/essays"
import { moreEssays, moreNotes } from "@/content/essays-more"
import { contextEngineeringEssays } from "@/content/context-engineering"
import { initiatives, type Initiative } from "@/content/initiatives"
import type { Block, ThemeSlug } from "@/content/site"

// Drafts are visible in local development, or anywhere NEXT_PUBLIC_SHOW_DRAFTS=true is set.
// A production build on Vercel hides them until their status is "published".
export const showDrafts = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true"

export const essays: Essay[] = [...coreEssays, ...moreEssays, ...contextEngineeringEssays]
export const notes = [...coreNotes, ...moreNotes]

type Visible = { status: "draft" | "published" }
const visible = <T extends Visible>(item: T) => item.status === "published" || showDrafts

export function getEssays(theme?: ThemeSlug): Essay[] {
  return essays
    .filter(visible)
    .filter((e) => !theme || e.theme === theme)
    .sort((a, b) => (b.published ?? "9999").localeCompare(a.published ?? "9999"))
}

export function getEssay(slug: string) {
  return getEssays().find((e) => e.slug === slug)
}

export function getNotes() {
  return notes.filter(visible).sort((a, b) => (b.published ?? "9999").localeCompare(a.published ?? "9999"))
}

export function getNote(slug: string) {
  return getNotes().find((n) => n.slug === slug)
}

export function getInitiatives(): Initiative[] {
  return initiatives
}

export function getInitiative(slug: string) {
  return initiatives.find((i) => i.slug === slug)
}

export function dateLabel(item: { status: "draft" | "published"; published?: string; plannedFor: string }) {
  if (item.status === "published" && item.published) {
    return new Date(`${item.published}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
  }
  return `Draft · ${item.plannedFor}`
}

function blockText(block: Block) {
  if ("text" in block) return block.text
  return block.items.join(" ")
}

export function readingMinutes(body: Block[]) {
  const words = body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 230))
}

// Markdown twins: the same blocks rendered as plain Markdown for agents and /*.md routes.
export function blocksToMarkdown(body: Block[]) {
  return body
    .map((block) => {
      switch (block.type) {
        case "p":
          return block.text
        case "h2":
          return `## ${block.text}`
        case "ul":
          return block.items.map((item) => `- ${item}`).join("\n")
        case "ol":
          return block.items.map((item, index) => `${index + 1}. ${item}`).join("\n")
        case "quote":
          return `> ${block.text}`
        case "bottomLine":
          return `**Bottom line:** ${block.text}`
        case "code":
          return "```" + (block.lang ?? "") + "\n" + block.text + "\n```"
      }
    })
    .join("\n\n")
}

export function getSeries(name: string) {
  return getEssays()
    .filter((e) => e.series?.name === name)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0))
}

// Most recent publish or update date across visible writing, for the footer's "Last updated" line.
export function lastUpdated(): string | null {
  const dates = [...getEssays(), ...getNotes()]
    .flatMap((item) => [item.published, "updated" in item ? item.updated : undefined])
    .filter((d): d is string => Boolean(d))
    .sort()
  const latest = dates[dates.length - 1]
  if (!latest) return null
  return new Date(`${latest}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
}
