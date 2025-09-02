
import { test, expect } from '@playwright/test';

test('homepage displays name', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('Muthukrishnan Bommiah');
});

test('navigation bar contains Experience', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000');
  // The desktop nav is the first nav element in the DOM
  const nav = page.locator('nav').first();
  await expect(nav).toContainText('Experience');
});

test('experience section is visible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('Executive Director, Principal Architect Cloud Data and Al');
});

test('credentials section is visible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('IBM WebSphere Advanced Certification');
});

test('skills section is visible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('Technical Skills');
});

test('key initiatives section is visible', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('body')).toContainText('Key Initiatives');
});
