import { site, themeName } from "@/content/site"
import { getEssays, getNotes } from "@/lib/content"

export const dynamic = "force-static"

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

// RSS 2.0 feed of published essays and notes (drafts appear only in local preview).
export function GET() {
  const items = [
    ...getEssays().map((e) => ({ slug: e.slug, title: e.title, summary: e.summary, published: e.published, category: themeName(e.theme) })),
    ...getNotes().map((n) => ({ slug: n.slug, title: n.title, summary: n.summary, published: n.published, category: "Note" })),
  ].sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escape(site.name)}: Writing</title>
<link>${site.url}/writing</link>
<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
<description>${escape("Essays and notes on governed AI in financial services.")}</description>
<language>en-us</language>
${items
  .map(
    (i) => `<item>
<title>${escape(i.title)}</title>
<link>${site.url}/writing/${i.slug}</link>
<guid isPermaLink="true">${site.url}/writing/${i.slug}</guid>
<description>${escape(i.summary)}</description>
<category>${escape(i.category)}</category>
${i.published ? `<pubDate>${new Date(`${i.published}T12:00:00Z`).toUTCString()}</pubDate>` : ""}
</item>`,
  )
  .join("\n")}
</channel>
</rss>`

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
