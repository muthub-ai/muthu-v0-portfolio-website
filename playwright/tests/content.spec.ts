import { test, expect } from "@playwright/test"
import { essays as coreEssays, notes as coreNotes } from "../../content/essays"
import { moreEssays, moreNotes } from "../../content/essays-more"
import { contextEngineeringEssays } from "../../content/context-engineering"
import { playbooks } from "../../content/playbooks"
import { sourceDates } from "../fixtures/source-dates"

// Content rules that need no browser. They guard the date-integrity work of October 2026 and the house style.

type Block = { type: string; text?: string; items?: string[] }
type Piece = { slug: string; title: string; published?: string; updated?: string; status?: string; related?: string[]; body: Block[] }

const essays = [...coreEssays, ...moreEssays, ...contextEngineeringEssays] as unknown as Piece[]
const notes = [...coreNotes, ...moreNotes] as unknown as Piece[]
const all = [...essays, ...notes]
const today = new Date().toISOString().slice(0, 10)
const bySlug = new Map(all.map((p) => [p.slug, p]))
const effective = (p: Piece) => p.updated ?? p.published ?? ""
const textOf = (p: Piece) => p.body.flatMap((b) => (b.items ? b.items : b.text ? [b.text] : [])).join("\n")
const links = (p: Piece) => [...textOf(p).matchAll(/\]\(([^)\s]+)\)/g)].map((m) => m[1])
const live = all.filter((p) => p.status !== "planned")

test("slugs are unique across essays and notes", () => {
  expect(new Set(all.map((p) => p.slug)).size).toBe(all.length)
})

test("dates are ISO, not in the future, and updated is never before published", () => {
  for (const p of live) {
    expect(p.published, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(p.published! <= today, `${p.slug} is dated in the future`).toBeTruthy()
    if (p.updated) {
      expect(p.updated, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(p.updated >= p.published!, `${p.slug} updated before published`).toBeTruthy()
    }
  }
})

test("no piece cites a known source published after the piece's own date", () => {
  const problems: string[] = []
  for (const p of live) {
    for (const url of links(p)) {
      for (const s of sourceDates) {
        if (url.includes(s.match) && s.date > effective(p)) {
          problems.push(`${p.slug} (${effective(p)}) cites ${s.what} (${s.date})`)
        }
      }
    }
  }
  expect(problems).toEqual([])
})

test("internal links resolve and never point to a later piece", () => {
  const problems: string[] = []
  for (const p of live) {
    for (const url of links(p)) {
      const m = url.match(/^\/writing\/([a-z0-9-]+)$/)
      if (!m) continue
      const target = bySlug.get(m[1])
      if (!target) problems.push(`${p.slug} links missing /writing/${m[1]}`)
      else if (effective(target) > effective(p)) problems.push(`${p.slug} (${effective(p)}) links later piece ${target.slug} (${effective(target)})`)
    }
  }
  expect(problems).toEqual([])
})

test("related slugs exist", () => {
  for (const p of essays) for (const r of p.related ?? []) expect(bySlug.has(r), `${p.slug} -> ${r}`).toBeTruthy()
})

test("external links are https", () => {
  for (const p of live) for (const url of links(p)) if (/^[a-z]+:/.test(url)) expect(url.startsWith("https://"), `${p.slug}: ${url}`).toBeTruthy()
})

test("essays keep the house structure", () => {
  for (const p of essays.filter((e) => e.status !== "planned")) {
    expect(p.body[0]?.type, `${p.slug} opener`).toBe("p")
    expect(p.body[0]?.text?.startsWith("**"), `${p.slug} bold opener`).toBeTruthy()
    expect(p.body.at(-1)?.type, `${p.slug} bottom line`).toBe("bottomLine")
  }
})

test("no em or en dashes in published prose", () => {
  for (const p of live) expect(/[–—]/.test(textOf(p) + p.title), p.slug).toBeFalsy()
})

test("playbooks have unique slugs, review dates and checkable points", () => {
  expect(new Set(playbooks.map((p) => p.slug)).size).toBe(playbooks.length)
  for (const pb of playbooks) {
    expect(pb.reviewed <= today, pb.slug).toBeTruthy()
    expect(pb.items.length, pb.slug).toBeGreaterThan(4)
    for (const it of pb.items) expect(it.check.length, `${pb.slug}: ${it.title}`).toBeGreaterThan(10)
  }
})
