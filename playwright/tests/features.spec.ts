import { test, expect } from "@playwright/test"
import { playbooks } from "../../content/playbooks"
import { tags } from "../../content/tags"

// Behaviour of the features added in the October 2026 final pass. Runs against `pnpm start` in CI.

test.describe("security and plumbing", () => {
  test("security headers are set", async ({ request }) => {
    const res = await request.get("/")
    const h = res.headers()
    expect(h["content-security-policy"]).toContain("default-src 'self'")
    expect(h["strict-transport-security"]).toContain("max-age=")
    expect(h["x-content-type-options"]).toBe("nosniff")
    expect(h["x-frame-options"]).toBe("DENY")
    expect(h["referrer-policy"]).toBeTruthy()
    expect(h["x-powered-by"]).toBeUndefined()
  })

  test("Markdown twins are noindex and HTML pages are not", async ({ request }) => {
    const md = await request.get("/writing/capture-the-why.md")
    expect(md.status()).toBe(200)
    expect(md.headers()["x-robots-tag"]).toContain("noindex")
    const html = await request.get("/writing/capture-the-why")
    expect(html.headers()["x-robots-tag"]).toBeUndefined()
  })

  test("unknown pages return 404 with a search box", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist")
    expect(res?.status()).toBe(404)
    await expect(page.locator("#site-search")).toBeVisible()
  })

  test("the old playbook URL redirects", async ({ page }) => {
    await page.goto("/playbook")
    await expect(page).toHaveURL(/\/playbooks\/governing-coding-agents$/)
  })

  test("search index is served and lists essays and playbooks", async ({ request }) => {
    const index = await (await request.get("/search-index.json")).json()
    expect(index.length).toBeGreaterThan(40)
    const kinds = new Set(index.map((e: { kind: string }) => e.kind))
    for (const k of ["Essay", "Initiative", "Playbook"]) expect(kinds.has(k)).toBeTruthy()
  })
})

test.describe("header", () => {
  test("nav has Reach me as a plain link, plus LinkedIn and GitHub", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Main" }).first()
    for (const label of ["Initiatives", "Writing", "Playbooks", "About", "Reach me"]) {
      await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible()
    }
    await expect(page.getByRole("link", { name: "LinkedIn profile" }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "GitHub profile" }).first()).toBeVisible()
    await expect(page.locator(".brand-cursor")).toHaveCount(1)
  })

  test("mobile menu opens and the name stays on one line", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    const brand = page.getByRole("link", { name: /Muthukrishnan Bommiah/ }).first()
    const box = await brand.boundingBox()
    expect(box!.height).toBeLessThan(48)
    await page.getByRole("button", { name: "Menu" }).click()
    await expect(page.locator("#mobile-menu").getByRole("link", { name: "Reach me" })).toBeVisible()
  })

  test("theme toggle switches to dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" })
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto("/")
    await page.getByRole("button", { name: "Switch to dark theme" }).first().click()
    await expect(page.locator("html")).toHaveClass(/dark/)
  })
})

test.describe("search", () => {
  test("slash opens search; typing finds results; Enter opens one", async ({ page }) => {
    await page.goto("/")
    await page.keyboard.press("/")
    const dialog = page.getByRole("dialog", { name: "Search muthub.org" })
    await expect(dialog).toBeVisible()
    await page.keyboard.type("harness")
    await expect(dialog.getByRole("option").first()).toBeVisible()
    await page.keyboard.press("Enter")
    await expect(page).not.toHaveURL(/\/$/)
    await expect(dialog).toBeHidden()
  })

  test("Ctrl+K toggles search and Escape closes it", async ({ page }) => {
    await page.goto("/writing")
    await page.keyboard.press("Control+k")
    const dialog = page.getByRole("dialog", { name: "Search muthub.org" })
    await expect(dialog).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })

  test("no results message, and the search page works", async ({ page }) => {
    await page.goto("/search?q=zzzqqxx")
    await expect(page.getByText(/No matches for/)).toBeVisible()
    await page.goto("/search?q=context")
    await expect(page.getByRole("option").first()).toBeVisible()
  })
})

test.describe("playbooks", () => {
  test("index lists every playbook", async ({ page }) => {
    await page.goto("/playbooks")
    await expect(page.locator("h1")).toHaveText("Playbooks")
    for (const pb of playbooks) await expect(page.locator(`a[href="/playbooks/${pb.slug}"]`).first()).toBeVisible()
  })

  for (const pb of playbooks) {
    test(`${pb.slug} renders with HowTo data and an assessment`, async ({ page }) => {
      const res = await page.goto(`/playbooks/${pb.slug}`)
      expect(res?.status()).toBe(200)
      const scripts = await page.locator('script[type="application/ld+json"]').allTextContents()
      expect(scripts.some((s) => s.includes('"HowTo"'))).toBeTruthy()
      const a = await page.goto(`/playbooks/${pb.slug}/assessment`)
      expect(a?.status()).toBe(200)
    })
  }

  test("assessment scores answers, names the band and lists gaps", async ({ page }) => {
    const pb = playbooks.find((p) => p.slug === "governing-coding-agents")!
    await page.goto(`/playbooks/${pb.slug}/assessment`)
    const sets = page.locator("fieldset")
    await expect(sets).toHaveCount(pb.items.length)
    const n = pb.items.length
    for (let i = 0; i < n; i++) {
      const choice = i === 0 || i === 1 ? "No" : i === 2 ? "Partly" : "Yes"
      await sets.nth(i).getByText(choice, { exact: true }).click()
    }
    const expected = Math.round((((n - 3) * 2 + 1) / (n * 2)) * 100)
    await expect(page.getByText(String(expected), { exact: true })).toBeVisible()
    await expect(page.getByText("Close these first")).toBeVisible()
    await page.getByRole("button", { name: "Start over" }).click()
    await expect(page.getByText(/Answer all \d+ points/)).toBeVisible()
  })
})

test.describe("writing", () => {
  test("every tag page renders", async ({ page }) => {
    for (const t of tags) {
      const res = await page.goto(`/writing/tag/${t.slug}`)
      expect(res?.status(), t.slug).toBe(200)
      await expect(page.locator("h1")).toHaveCount(1)
    }
  })

  test("an essay shows sources, topics and keep reading", async ({ page }) => {
    await page.goto("/writing/the-ai-native-sdlc")
    await expect(page.getByText("Sources cited", { exact: false }).first()).toBeVisible()
    await expect(page.getByText("Keep reading").first()).toBeVisible()
  })
})

test.describe("reach", () => {
  test("Reach page offers LinkedIn and no email address", async ({ page }) => {
    await page.goto("/reach")
    const li = page.getByRole("link", { name: /Connect on LinkedIn/ })
    await expect(li).toHaveAttribute("href", /linkedin\.com\/in\/mbommiah/)
    const html = await page.content()
    expect(html).not.toMatch(/mailto:/i)
    expect(html).not.toMatch(/@gmail\.com/i)
  })
})
