import { expect, test, type Locator, type Page } from '@playwright/test';

const BASE_URL = 'https://www.epinova.no/';

const MAIN_MENU_LINKS = [
  { name: 'Tjenestene', href: '/tjenestene/' },
  { name: 'Prosjektene', href: '/arbeidene/' },
  { name: 'Følg med', href: '/folg-med/' },
  { name: 'Kompetansesenter', href: '/kompetanse/' },
  { name: 'Menneskene', href: '/menneskene/' },
  { name: 'Jobb', href: '/bli-med/' },
] as const;

const FAGOMRADER_LINKS = [
  { name: 'E-handel og nettbutikk', href: '/tjenestene/e-handel-og-nettbutikk/' },
  { name: 'Nettsted og selvbetjening', href: '/tjenestene/nettsted-og-selvbetjening/' },
  { name: 'Intranett og samhandling', href: '/tjenestene/intranett-og-samhandling/' },
  { name: 'Vedlikehold og videreutvikling', href: '/tjenestene/vedlikehold-og-videreutvikling/' },
  { name: 'Digital tjenesteplattform', href: '/tjenestene/digital-tjenesteplattform/' },
  { name: 'Strategi og rådgivning', href: '/tjenestene/digital-strategi-og-radgivning/' },
  { name: 'Test og kvalitetssikring', href: '/tjenestene/test-og-kvalitetssikring/' },
  { name: 'AI-assistent', href: '/tjenestene/ai-assistent/' },
  { name: 'Proxima', href: '/proxima/' },
] as const;

async function dismissCookies(page: Page): Promise<void> {
  const overlay = page.locator('#coiOverlay');
  const overlayVisible = await overlay.isVisible().catch(() => false);
  if (!overlayVisible) return;

  const acceptCandidates: Locator[] = [
    page.getByRole('button', { name: /accept|godta|godkjen|allow|alle/i }),
    overlay.getByRole('button', { name: /accept|godta|godkjen|allow|alle/i }),
    overlay.locator('button[id*="accept" i], button[class*="accept" i], button[data-action*="accept" i]').first(),
  ];

  for (const button of acceptCandidates) {
    if (await button.isVisible().catch(() => false)) {
      await button.click({ timeout: 3000 }).catch(() => undefined);
      await overlay.waitFor({ state: 'hidden', timeout: 4000 }).catch(() => undefined);
      if (!(await overlay.isVisible().catch(() => false))) return;
    }
  }

  await page.keyboard.press('Escape').catch(() => undefined);
  await overlay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => undefined);
}

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await dismissCookies(page);
});

test('1) Main menu: all 6 links go to correct URLs', async ({ page }) => {
  const nav = page.locator('nav.header__navigation').first();
  await expect(nav).toBeVisible();

  const links = nav.locator('a');
  await expect(links).toHaveCount(6);

  for (const { name, href } of MAIN_MENU_LINKS) {
    const link = nav.getByRole('link', { name, exact: true });
    await expect(link).toBeVisible();

    await link.click();
    await page.waitForLoadState('domcontentloaded');
    await expect.poll(() => new URL(page.url()).pathname).toBe(href);

    await page.goBack({ waitUntil: 'domcontentloaded' });
    await dismissCookies(page);
  }
});

test('2) Header menu follows while scrolling (sticky behavior)', async ({ page }) => {
  const header = page.locator('.header.header--default').first();
  await expect(header).toBeVisible();

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);

  await expect(header).toBeVisible();
  const topAfterScroll = await header.evaluate((el) => Math.round(el.getBoundingClientRect().top));
  expect(topAfterScroll).toBeLessThanOrEqual(5);
});

test('3) Jumbotron title contains text', async ({ page }) => {
  const title = page.locator('p.jumbotron__title').first();
  await expect(title).toBeVisible();

  const text = (await title.textContent())?.trim() ?? '';
  expect(text.length).toBeGreaterThan(10);
});

test('4) Våre fagområder has all 9 expected links', async ({ page }) => {
  const sectionTitle = page
    .locator('h2.content-list-icon__title.content-list-icon__title--green')
    .filter({ hasText: 'Våre fagområder' });
  await expect(sectionTitle).toBeVisible();

  const section = page.locator('section.content-list-icon').first();
  const links = section.locator('h3.content-list-icon__heading a');
  await expect(links).toHaveCount(9);

  for (const { name, href } of FAGOMRADER_LINKS) {
    const link = links.filter({ hasText: name }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
  }
});
