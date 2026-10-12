import type { MetadataRoute } from "next"
import { site, themes } from "@/content/site"
import { getEssays, getInitiatives, getNotes } from "@/lib/content"

// Generated at build time. Drafts are excluded automatically in production builds.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", lastModified: Date = now) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  })

  return [
    page("/", 1, "weekly"),
    page("/writing", 0.9, "weekly"),
    ...themes.map((t) => page(`/writing/theme/${t.slug}`, 0.7, "weekly")),
    page("/initiatives", 0.8, "monthly"),
    page("/about", 0.8, "monthly"),
    page("/reach", 0.5, "yearly"),
    page("/now", 0.5, "monthly"),
    ...getEssays().map((e) => page(`/writing/${e.slug}`, 0.8, "monthly", e.updated || e.published ? new Date(`${e.updated ?? e.published}T12:00:00Z`) : now)),
    ...getNotes().map((n) => page(`/writing/${n.slug}`, 0.5, "yearly")),
    ...getInitiatives().map((i) => page(`/initiatives/${i.slug}`, 0.7, "yearly")),
  ]
}
