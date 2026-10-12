import { execSync } from "node:child_process"

// "Last updated" for the footer: the date of the latest commit, read at build time (and on each request in dev).
// Falls back to the build date when git history is not available.
export function siteLastUpdated(): { iso: string; label: string } {
  let date = new Date()
  try {
    const out = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
    if (out) date = new Date(out)
  } catch {
    // no git: keep the build date
  }
  return {
    iso: date.toISOString().slice(0, 10),
    label: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" }),
  }
}
