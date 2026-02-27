import { expect, test } from '@playwright/test';

const BASE_URL = 'https://www.epinova.no/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
});

test('Performance example: navigation timing budget', async ({ page }) => {
  const navigationTiming = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (!nav) return null;
    return {
      domContentLoadedMs: nav.domContentLoadedEventEnd,
      loadMs: nav.loadEventEnd,
    };
  });

  expect(navigationTiming).not.toBeNull();
  expect(navigationTiming!.domContentLoadedMs).toBeLessThan(5000);
  expect(navigationTiming!.loadMs).toBeLessThan(9000);
});

test('Other example: no broken links in header nav (status < 400)', async ({ page, request }) => {
  const links = page.locator('nav.header__navigation a');
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (!href) continue;

    const url = new URL(href, BASE_URL).toString();
    const response = await request.get(url);
    expect(response.status(), `Broken link: ${url}`).toBeLessThan(400);
  }
});
