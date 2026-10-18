import { test, expect } from '@playwright/test';
import { initiatives } from '../../content/initiatives';
import { essays as coreEssays } from '../../content/essays';
import { moreEssays } from '../../content/essays-more';
import { contextEngineeringEssays } from '../../content/context-engineering';
const essays = [...coreEssays, ...moreEssays, ...contextEngineeringEssays];

// Run against `pnpm dev` (drafts visible). Checks identity, structure, agent-readable files and content hygiene.

const pages = ['/', '/writing', '/initiatives', '/about', '/reach', '/now'];

for (const path of pages) {
  test(`${path} renders with one h1, canonical and Open Graph`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/muthub\.org/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /og-image\.png/);
  });
}

test('home page has Person structured data', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(raw ?? '{}');
  const person = data['@graph'].find((node: { '@type': string }) => node['@type'] === 'Person');
  expect(person.name).toBe('Muthukrishnan Bommiah');
  expect(person.sameAs).toContain('https://www.linkedin.com/in/mbommiah/');
});

for (const item of initiatives) {
  test(`initiative ${item.slug} renders`, async ({ page }) => {
    const response = await page.goto(`/initiatives/${item.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(item.title);
  });
}

for (const essay of essays) {
  test(`essay ${essay.slug} renders with Article schema and a Markdown twin`, async ({ page, request }) => {
    await page.goto(`/writing/${essay.slug}`);
    await expect(page.locator('h1')).toHaveText(essay.title);
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(JSON.parse(raw ?? '{}')['@type']).toBe('Article');
    const md = await request.get(`/writing/${essay.slug}.md`);
    expect(md.status()).toBe(200);
    expect(await md.text()).toContain(`# ${essay.title}`);
  });
}

test('llms.txt, RSS, sitemap and robots are served', async ({ request }) => {
  expect(await (await request.get('/llms.txt')).text()).toContain('# Muthukrishnan (Muthu) Bommiah');
  expect(await (await request.get('/rss.xml')).text()).toContain('<rss');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('https://muthub.org/initiatives/ai-augmented-sdlc');
  expect(sitemap).not.toContain('vercel.app');
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: https://muthub.org/sitemap.xml');
  expect((await request.get('/index.md')).status()).toBe(200);
});

test('old project URLs redirect to initiatives', async ({ page }) => {
  await page.goto('/projects/unified-ml-platform');
  await expect(page).toHaveURL(/\/initiatives\/unified-ml-platform$/);
});

test('no stale or private strings on the home page', async ({ page }) => {
  await page.goto('/');
  const text = (await page.locator('body').innerText()).toLowerCase();
  for (const banned of ['available for new projects', '[cite', 'portofolio', 'copliot', 'last updated may 2025', '210-415']) {
    expect(text).not.toContain(banned);
  }
});

test('the Knowledge Foundation band sits under the hero and links to the wiki', async ({ page }) => {
  await page.goto('/');
  const band = page.getByTestId('knowledge-foundation');
  await expect(band).toBeVisible();
  await expect(band.getByRole('heading', { level: 2 })).toHaveText('The essays, as a graph you can walk.');
  await expect(band.getByRole('link', { name: 'Explore the graph →' })).toHaveAttribute('href', 'https://wiki.muthub.org/');
  // Live counts from graph.json, or the last known figures: never empty.
  for (const dd of await band.locator('dd').allInnerTexts()) expect(dd).toMatch(/^\d+$/);
  // Directly after the hero (the first section), before "Featured".
  const order = await page.evaluate(() => [...document.querySelectorAll('main > section, main section[data-testid]')].map((s) => s.getAttribute('data-testid') || s.getAttribute('aria-labelledby') || ''));
  expect(order.indexOf('knowledge-foundation')).toBeLessThan(order.indexOf('featured'));
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(over).toBeLessThanOrEqual(1);
});
