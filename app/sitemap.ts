import type { MetadataRoute } from "next"
import { getAllProjects } from "@/lib/data"
import { siteUrl } from "@/lib/seo"

// Generated at build time so new initiative pages are always listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllProjects().map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
