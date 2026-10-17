import { site, themeName } from "@/content/site"
import { playbooks } from "@/content/playbooks"
import { figureMeta } from "@/components/figures"
import { dateLabel, getEssays, getInitiatives, getNotes, itemTags } from "@/lib/content"
import type { Block } from "@/content/site"

// The static search index served at /search-index.json and used by the Cmd+K dialog and /search.
// Built at deploy time from the same content as the pages, so it can never drift from the site.

import type { SearchEntry } from "@/lib/search-score"
export type { SearchEntry }

const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`_]/g, "")
    .replace(/\s+/g, " ")
    .trim()

function blocksText(body: Block[]) {
  return plain(
    body
      .map((b) => {
        if (b.type === "figure") return `${figureMeta[b.name].title}. ${figureMeta[b.name].caption}`
        if ("text" in b) return b.text
        return b.items.join(" ")
      })
      .join(" "),
  ).slice(0, 4000)
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = []

  for (const e of getEssays()) {
    entries.push({
      url: `/writing/${e.slug}`,
      title: e.title,
      kind: "Essay",
      meta: `${themeName(e.theme)} · ${dateLabel(e)}`,
      summary: plain(e.summary),
      text: `${itemTags(e).map((t) => t.name).join(" ")} ${blocksText(e.body)}`,
    })
  }
  for (const n of getNotes()) {
    entries.push({
      url: `/writing/${n.slug}`,
      title: n.title,
      kind: "Note",
      meta: `Note · ${dateLabel(n)}`,
      summary: plain(n.summary),
      text: `${itemTags(n).map((t) => t.name).join(" ")} ${blocksText(n.body)}`,
    })
  }
  for (const i of getInitiatives()) {
    entries.push({
      url: `/initiatives/${i.slug}`,
      title: i.title,
      kind: "Initiative",
      meta: `${i.organization} · ${i.period}`,
      summary: plain(i.summary),
      text: plain([i.problem, ...i.approach, ...i.governance, ...i.outcome, i.lesson, i.technologies.join(" ")].join(" ")),
    })
    for (const [n, level] of (i.architecture?.levels ?? []).entries()) {
      entries.push({
        url: `/initiatives/${i.slug}#level-${n + 1}`,
        title: `${level.title}: ${i.title.replace(/ \(open prototype\)$/, "")}`,
        kind: "Architecture",
        meta: "C4 model",
        summary: plain(level.text),
        text: plain(`${figureMeta[level.figure].alt} ${figureMeta[level.figure].caption}`),
      })
    }
  }
  for (const p of playbooks) {
    entries.push({
      url: `/playbooks/${p.slug}`,
      title: p.title,
      kind: "Playbook",
      meta: `Playbook · ${p.items.length} points`,
      summary: plain(p.summary),
      text: plain([...p.intro, ...p.items.map((it) => `${it.title}. ${it.text} ${it.check}`)].join(" ")),
    })
  }
  const pages: [string, string, string][] = [
    ["/about", "About", `${site.shortBio} How I think and lead. Career, education, certifications, speaker kit and disclosures.`],
    ["/now", "Now", "What I am focused on this quarter."],
    ["/reach", "Reach me", "Speaking, podcasts, advisory and peer exchanges; how to get in touch."],
    ["/playbooks", "Playbooks", "Evergreen checklists for governing AI in a bank."],
    ["/writing", "Writing", "All essays and notes, by theme and tag."],
  ]
  for (const [url, title, summary] of pages) entries.push({ url, title, kind: "Page", meta: "Page", summary, text: summary })

  return entries
}
