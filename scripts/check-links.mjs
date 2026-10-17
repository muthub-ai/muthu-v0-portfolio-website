#!/usr/bin/env node
/**
 * Link checker for muthub.org.
 *
 *   node scripts/check-links.mjs                 internal links: every sitemap URL and every same-site link on those pages
 *   node scripts/check-links.mjs --external      also external links found in essays (weekly; report only, never blocks a PR)
 *
 * BASE_URL (default http://localhost:3000) is the running site. Sitemap URLs on https://muthub.org are rewritten to it.
 * Exits 1 when an internal link fails (or, with --external --strict, when an external one does).
 */
const base = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "")
const external = process.argv.includes("--external")
const strict = process.argv.includes("--strict")
const site = "https://muthub.org"

const toLocal = (url) => (url.startsWith(site) ? base + url.slice(site.length) : url)

async function get(url, method = "GET") {
  try {
    // One slow host must not stall the whole run.
    const res = await fetch(url, { method, redirect: "follow", headers: { "user-agent": "muthub-link-check" }, signal: AbortSignal.timeout(15000) })
    return { status: res.status, text: method === "GET" ? await res.text() : "" }
  } catch (e) {
    return { status: 0, text: String(e) }
  }
}

const sitemap = await get(`${base}/sitemap.xml`)
if (sitemap.status !== 200) {
  console.error(`sitemap.xml returned ${sitemap.status}`)
  process.exit(1)
}
const pages = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => toLocal(m[1]))
const internal = new Set(pages)
const outside = new Map() // url -> first page that links it
for (const page of pages) {
  const { status, text } = await get(page)
  if (status !== 200) continue
  for (const m of text.matchAll(/href="([^"#]+)/g)) {
    const href = m[1].replaceAll("&amp;", "&")
    if (href.startsWith("/") && !href.startsWith("//")) internal.add(base + href)
    else if (href.startsWith(site)) internal.add(toLocal(href))
    else if (/^https?:\/\//.test(href) && !outside.has(href)) outside.set(href, page)
  }
}

const failures = []
for (const url of internal) {
  if (/\/_next\//.test(url)) continue
  const { status } = await get(url, "HEAD").then((r) => (r.status === 405 ? get(url) : r))
  if (status >= 400 || status === 0) failures.push(`${status} ${url}`)
}
console.log(`internal: ${internal.size} checked, ${failures.length} failed`)
failures.forEach((f) => console.log(`  FAIL ${f}`))

let externalFailures = []
if (external) {
  for (const [url, from] of outside) {
    let { status } = await get(url, "HEAD")
    if (status === 405 || status === 403 || status === 0) ({ status } = await get(url))
    // 401/403/429, and non-standard codes such as LinkedIn's 999, mean "bot blocked", not "gone": report them separately.
    if (status === 404 || status === 410 || status === 0 || (status >= 500 && status < 600)) externalFailures.push(`${status} ${url} (from ${from})`)
    else if (status >= 400) console.log(`  WARN ${status} ${url}`)
  }
  console.log(`external: ${outside.size} checked, ${externalFailures.length} broken`)
  externalFailures.forEach((f) => console.log(`  BROKEN ${f}`))
}

process.exit(failures.length || (strict && externalFailures.length) ? 1 : 0)
