import { about, now } from "@/content/about"
import { playbook } from "@/content/playbook"
import { archive } from "@/content/archive"
import { site, themeName, themes } from "@/content/site"
import { blocksToMarkdown, dateLabel, getEssay, getEssays, getInitiative, getInitiatives, getNote, getNotes } from "@/lib/content"

// Markdown copies of every page, served at /<path>.md and listed in /llms.txt.
const footer = `\n\n---\n${site.displayName} · ${site.url} · ${site.disclosure}\n`

export function homeMarkdown() {
  const essays = getEssays().slice(0, 5)
  return (
    `# ${site.displayName}\n\n> ${site.tagline}\n\n${site.shortBio}\n\n` +
    `## Featured initiatives\n\n${getInitiatives()
      .filter((i) => i.featured)
      .map((i) => `- [${i.title}](${site.url}/initiatives/${i.slug}.md): ${i.summary}`)
      .join("\n")}\n\n` +
    `## Latest writing\n\n${essays.map((e) => `- [${e.title}](${site.url}/writing/${e.slug}.md) (${dateLabel(e)}): ${e.summary}`).join("\n")}\n\n` +
    `## Profiles\n\n${site.social.map((s) => `- [${s.label}](${s.url})`).join("\n")}` +
    footer
  )
}

export function writingMarkdown() {
  return (
    `# Writing\n\nEssays and notes on governed AI in financial services by ${site.displayName}.\n\n` +
    themes
      .map((t) => {
        const list = getEssays(t.slug)
        if (!list.length) return ""
        return `## ${t.name}\n\n${list.map((e) => `- [${e.title}](${site.url}/writing/${e.slug}.md) (${dateLabel(e)}): ${e.summary}`).join("\n")}\n\n`
      })
      .join("") +
    `## Notes\n\n${getNotes().map((n) => `- [${n.title}](${site.url}/writing/${n.slug}.md): ${n.summary}`).join("\n")}\n\n` +
    `## From the archive (Medium)\n\n${archive.map((a) => `- [${a.title}](${a.url}) (${a.date}): ${a.summary}`).join("\n")}` +
    footer
  )
}

export function themeMarkdown(slug: string) {
  const theme = themes.find((t) => t.slug === slug)
  if (!theme) return null
  const list = getEssays(theme.slug)
  return (
    `# ${theme.name}\n\n${theme.blurb}\n\n` +
    list.map((e) => `- [${e.title}](${site.url}/writing/${e.slug}.md) (${dateLabel(e)}): ${e.summary}`).join("\n") +
    footer
  )
}

export function essayMarkdown(slug: string) {
  const essay = getEssay(slug)
  if (essay) {
    return (
      `# ${essay.title}\n\nBy ${site.displayName} · ${themeName(essay.theme)} · ${dateLabel(essay)}\n\n> ${essay.summary}\n\n` +
      `${blocksToMarkdown(essay.body)}\n\n*${essay.source}*` +
      footer
    )
  }
  const note = getNote(slug)
  if (note) {
    return `# ${note.title}\n\nNote by ${site.displayName} · ${dateLabel(note)}\n\n${blocksToMarkdown(note.body)}\n\n*${note.source}*` + footer
  }
  return null
}

export function initiativesMarkdown() {
  return (
    `# Initiatives\n\nPublic summaries of work ${site.displayName} has led.\n\n` +
    getInitiatives()
      .map((i) => `- [${i.title}](${site.url}/initiatives/${i.slug}.md) (${i.organization}, ${i.period}): ${i.summary}`)
      .join("\n") +
    footer
  )
}

export function initiativeMarkdown(slug: string) {
  const i = getInitiative(slug)
  if (!i) return null
  const list = (items: string[]) => items.map((x) => `- ${x}`).join("\n")
  return (
    `# ${i.title}\n\n${i.organization} · ${i.period} · Role: ${i.role}\n\n> ${i.summary}\n\n` +
    (i.stats.length ? `${i.stats.map((s) => `- **${s.value}** ${s.label}`).join("\n")}\n\n` : "") +
    `## Problem\n\n${i.problem}\n\n## Approach\n\n${list(i.approach)}\n\n## Governance\n\n${list(i.governance)}\n\n` +
    `## Outcome\n\n${list(i.outcome)}\n\n## Lesson\n\n${i.lesson}\n\nTechnologies: ${i.technologies.join(", ")}` +
    (i.links?.length ? `\n\nLinks: ${i.links.map((l) => `[${l.label}](${l.url})`).join(", ")}` : "") +
    footer
  )
}

export function aboutMarkdown() {
  return (
    `# About ${site.displayName}\n\n${about.mission}\n\n${about.paragraphs.join("\n\n")}\n\n` +
    `## How I think about AI in a bank\n\n${about.principles.ai.map((p, i) => `${i + 1}. **${p.title}** ${p.text}`).join("\n")}\n\n` +
    `## How I lead\n\n${about.principles.lead.map((p, i) => `${i + 1}. **${p.title}** ${p.text}`).join("\n")}\n\n` +
    `## Career\n\n${about.career.map((c) => `- **${c.org}** (${c.period}): ${c.detail}`).join("\n")}\n\n` +
    `## Education\n\n${about.education.map((e) => `- ${e.degree}, ${e.school}`).join("\n")}\n\n` +
    `## Certifications\n\n${about.certifications.join(" · ")}\n\n` +
    `## Bio (short)\n\n${about.bios.short}\n\n## Bio (long)\n\n${about.bios.long}` +
    footer
  )
}

export function reachMarkdown() {
  return (
    `# Reach ${site.displayName}\n\nEmail: ${site.email}\n\n## Happy to talk about\n\n${about.reach.yes.map((x) => `- ${x}`).join("\n")}\n\n` +
    `## Not a fit\n\n${about.reach.no.map((x) => `- ${x}`).join("\n")}` +
    footer
  )
}

export function nowMarkdown() {
  return `# Now\n\nUpdated ${now.updated}.\n\n${now.items.map((x) => `- ${x}`).join("\n")}` + footer
}

export function playbookMarkdown() {
  return (
    `# ${playbook.title}\n\n> ${playbook.summary}\n\nLast reviewed ${playbook.reviewed}.\n\n${playbook.intro.join("\n\n")}\n\n` +
    playbook.items.map((item, i) => `## ${i + 1}. ${item.title}\n\n${item.text}\n\n**Check:** ${item.check}`).join("\n\n") +
    `\n\n${playbook.closing}` +
    footer
  )
}

export function llmsTxt() {
  const essays = getEssays()
  return (
    `# ${site.displayName}\n\n> ${site.description}\n\n` +
    `Every page on this site is also available as Markdown by adding .md to its URL. ${site.disclosure}\n\n` +
    `## Core pages\n\n` +
    `- [Home](${site.url}/index.md): who ${site.name} is and what he works on\n` +
    `- [About](${site.url}/about.md): biography, career, education, certifications and speaker bios\n` +
    `- [Initiatives](${site.url}/initiatives.md): case studies of work he has led\n` +
    `- [Writing](${site.url}/writing.md): essays and notes\n` +
    `- [Playbook](${site.url}/playbook.md): ${playbook.title}\n` +
    `- [Now](${site.url}/now.md): current focus\n` +
    `- [Reach me](${site.url}/reach.md): how to get in touch\n\n` +
    `## Initiatives\n\n${getInitiatives().map((i) => `- [${i.title}](${site.url}/initiatives/${i.slug}.md): ${i.summary}`).join("\n")}\n\n` +
    (essays.length ? `## Essays\n\n${essays.map((e) => `- [${e.title}](${site.url}/writing/${e.slug}.md): ${e.summary}`).join("\n")}\n\n` : "") +
    `## Archive\n\n${archive.map((a) => `- [${a.title}](${a.url}): ${a.summary}`).join("\n")}\n\n` +
    `## Optional\n\n- [Architecture-as-Code reference platform](https://aac.muthub.org): working prototype of an architecture control plane\n${site.social.map((s) => `- [${s.label}](${s.url})`).join("\n")}\n`
  )
}
