#!/usr/bin/env node
/**
 * Public-content guardrail for muthub.org. Runs before every build (see "prebuild" in package.json).
 *
 * 1. Built-in checks: leftovers that should never ship (AI-draft markers, known typos,
 *    availability banners, phone numbers).
 * 2. Private blocklist: terms that must never appear on the public site (internal system names,
 *    unreleased work, vendor names). The list itself is confidential, so it is NOT in this repo.
 *    It is read from .confidential-terms.txt (git-ignored, one term per line, # for comments)
 *    or from the PUBLIC_CONTENT_BLOCKLIST environment variable (terms separated by newlines or "|").
 *    Matching is whole-word and case-insensitive; prefix a term with "case:" to match case exactly
 *    (for names that are also ordinary words).
 *
 * Exits with code 1 and lists every hit if anything is found.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { extname, join, relative } from "node:path"

const root = process.cwd()
const scanDirs = ["app", "components", "content", "lib", "public"]
const scanExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".mdx", ".txt", ".xml", ".css"])

const builtInChecks = [
  { label: "AI citation marker", pattern: /\[cite(_start|_end)?[:\]]/i },
  { label: "typo: Portofolio", pattern: /portofolio/i },
  { label: "typo: Copliot", pattern: /copliot/i },
  { label: "spaced acronym", pattern: /\b(A I|M L Ops)\b/ },
  { label: "availability banner", pattern: /(not )?available for new projects|open to work|available for hire/i },
  { label: "phone number", pattern: /\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/ },
  { label: "stale footer stamp", pattern: /last updated (january|february|march|april|may|june|july|august|september|october|november|december) \d{4}/i },
  { label: "unsupported scale claim", pattern: /petabyte/i },
]

function loadPrivateTerms() {
  const fromFile = existsSync(join(root, ".confidential-terms.txt"))
    ? readFileSync(join(root, ".confidential-terms.txt"), "utf8")
    : ""
  const fromEnv = process.env.PUBLIC_CONTENT_BLOCKLIST ?? ""
  return `${fromFile}\n${fromEnv.replaceAll("|", "\n")}`
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function* walk(dir) {
  if (!existsSync(dir)) return
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      yield* walk(full)
    } else if (scanExtensions.has(extname(entry))) {
      yield full
    }
  }
}

const privateTerms = loadPrivateTerms()
const checks = [
  ...builtInChecks,
  ...privateTerms.map((entry, index) => {
    const caseSensitive = entry.startsWith("case:")
    const term = caseSensitive ? entry.slice("case:".length) : entry
    return {
      label: `private blocklist term #${index + 1}`,
      pattern: new RegExp(`(^|[^A-Za-z0-9])${escapeRegExp(term)}([^A-Za-z0-9]|$)`, caseSensitive ? "" : "i"),
    }
  }),
]

const hits = []
for (const dir of scanDirs) {
  for (const file of walk(join(root, dir))) {
    const lines = readFileSync(file, "utf8").split("\n")
    lines.forEach((line, lineIndex) => {
      for (const check of checks) {
        if (check.pattern.test(line)) {
          hits.push(`${relative(root, file)}:${lineIndex + 1}  ${check.label}`)
        }
      }
    })
  }
}

if (privateTerms.length === 0) {
  console.warn("check-public-content: no private blocklist found (.confidential-terms.txt or PUBLIC_CONTENT_BLOCKLIST); ran built-in checks only.")
}

if (hits.length > 0) {
  console.error(`check-public-content: ${hits.length} problem(s) found. Fix before publishing:\n`)
  for (const hit of hits) console.error(`  ${hit}`)
  process.exit(1)
}

console.log(`check-public-content: clean (${builtInChecks.length} built-in checks, ${privateTerms.length} private terms).`)
