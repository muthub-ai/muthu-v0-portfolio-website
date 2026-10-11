import { test, expect } from '@playwright/test';
import { projects } from '../../lib/projects';

// Phase 0 guardrails: identity, structured data, crawl files and content hygiene.

test('home page has one h1 with the full name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Muthukrishnan Bommiah');
});

test('home page carries canonical, Open Graph and X card tags', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https:\/\/muthub\.org\/?$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /https:\/\/muthub\.org\/og-image\.png/);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[name="generator"]')).toHaveCount(0);
});

test('home page has valid Person structured data', async ({ page }) => {
  await page.goto('/');
  const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
  const data = JSON.parse(raw ?? '{}');
  const person = data['@graph'].find((node: { '@type': string }) => node['@type'] === 'Person');
  expect(person.name).toBe('Muthukrishnan Bommiah');
  expect(person.jobTitle).toBe('Distinguished Engineer');
  expect(person.sameAs).toContain('https://www.linkedin.com/in/mbommiah/');
});

test('no stale or private content on the home page', async ({ page }) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  for (const banned of ['available for new projects', '[cite', 'Portofolio', 'Copliot', 'Last updated May 2025', '210-415']) {
    expect(text.toLowerCase()).not.toContain(banned.toLowerCase());
  }
});

for (const project of projects) {
  test(`initiative page renders with its own canonical: ${project.slug}`, async ({ page }) => {
    const response = await page.goto(`/projects/${project.slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(project.title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://muthub.org/projects/${project.slug}`);
  });
}

test('robots.txt points at the muthub.org sitemap', async ({ request }) => {
  const body = await (await request.get('/robots.txt')).text();
  expect(body).toContain('Sitemap: https://muthub.org/sitemap.xml');
  expect(body).toContain('User-agent: OAI-SearchBot');
});

test('sitemap lists only muthub.org URLs', async ({ request }) => {
  const body = await (await request.get('/sitemap.xml')).text();
  expect(body).toContain('<loc>https://muthub.org/</loc>');
  expect(body).not.toContain('vercel.app');
  for (const project of projects) {
    expect(body).toContain(`https://muthub.org/projects/${project.slug}`);
  }
});

test('old resume PDF is gone', async ({ request }) => {
  const response = await request.get('/Muthu_resume.pdf');
  expect(response.status()).toBe(404);
});
