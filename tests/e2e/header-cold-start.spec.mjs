import { test, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';
import { chapterManifest, chapterPath } from '../../site/content/manifest.ts';
import { readingStorageKey } from '../../site/reading-progress/model.ts';

const at = route => withBasePath(route, process.env.NEXT_PUBLIC_BASE_PATH);
const browserChapter = chapterManifest.find(chapter => chapter.id === 'F01');
const sectionId = '标题怎样出现在屏幕上';
const sectionPath = chapterPath(browserChapter) + '#' + encodeURIComponent(sectionId);

function geometry(page) {
  return page.evaluate(() => {
    const rectangle = selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const { top, height, bottom } = element.getBoundingClientRect();
      return { top, height, bottom };
    };
    return {
      header: rectangle('.site-header'), heading: rectangle('main h1'),
      paragraph: rectangle('article > p'), target: rectangle('[id="标题怎样出现在屏幕上"]'),
      tools: rectangle('.reading-tools'), scrollWidth: document.documentElement.scrollWidth, viewport: window.innerWidth,
    };
  });
}

async function delayScripts(page) {
  let release;
  let requests = 0;
  const gate = new Promise(resolve => { release = resolve; });
  const pattern = /\/_next\/static\/.*\.js(?:\?|$)/;
  const handler = async route => { requests += 1; await gate; await route.continue(); };
  await page.route(pattern, handler);
  return {
    requests: () => requests, release,
    cleanup: async () => { release(); await page.unroute(pattern, handler); },
  };
}

for (const width of [320, 390]) {
  test(`cold header, title and prose keep their initial geometry at ${width}px`, async ({ browser, baseURL }, testInfo) => {
    for (const route of ['/', '/zh/', chapterPath(browserChapter), '/zh/read/a-page-and-a-system/', '/read/browser-foundations/']) {
      const context = await browser.newContext({ baseURL, viewport: { width, height: 760 } });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const scripts = await delayScripts(page);
        try {
          await page.goto(at(route), { waitUntil: 'commit' });
          await expect(page.locator('main h1')).toBeVisible();
          await expect(page.locator('.site-header')).toHaveCSS('border-bottom-style', 'solid');
          await page.evaluate(() => document.fonts.ready);
          await expect.poll(scripts.requests).toBeGreaterThan(0);
          const before = await geometry(page);
          scripts.release();
          await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
          await page.waitForLoadState('networkidle');
          const after = await geometry(page);
          await testInfo.attach('geometry-' + encodeURIComponent(route), {
            body: JSON.stringify({ route, width, before, after, requests: scripts.requests() }, null, 2),
            contentType: 'application/json',
          });
          await expect(page.locator('.chapter-header-menu > summary')).toBeVisible();
          for (const key of ['header', 'heading', 'paragraph']) {
            if (!before[key]) continue;
            expect(Math.abs(after[key].top - before[key].top), route + ' ' + key).toBeLessThanOrEqual(1);
            expect(Math.abs(after[key].height - before[key].height), route + ' ' + key).toBeLessThanOrEqual(1);
          }
          expect(after.scrollWidth).toBeLessThanOrEqual(width);
          expect(errors).toEqual([]);
        } finally { await scripts.cleanup(); }
      } finally { await context.close(); }
    }
  });
}

test('a shared fragment and a deliberate Continue keep the real section readable', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 760 });
  const scripts = await delayScripts(page);
  try {
    await page.goto(at(sectionPath), { waitUntil: 'commit' });
    await expect(page.locator('article h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const before = await geometry(page);
    scripts.release();
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    const target = page.locator(`[id="${sectionId}"]`);
    await expect(target).toBeFocused();
    await expect(target).toBeInViewport({ ratio: 1 });
    await page.waitForLoadState('networkidle');
    const after = await geometry(page);
    await testInfo.attach('shared-fragment', { body: JSON.stringify({ before, after }), contentType: 'application/json' });
    // The initial CSS tool-height fallback is reconciled to the measured sticky bar.
    // Both landings must retain the same visible heading below that bar.
    expect(before.target.top).toBeGreaterThanOrEqual(before.tools.bottom);
    expect(before.target.bottom).toBeLessThanOrEqual(760);
    expect(after.target.bottom).toBeLessThanOrEqual(760);
    expect(after.target.top).toBeGreaterThanOrEqual(after.tools.bottom);
  } finally { await scripts.cleanup(); }

  const record = JSON.stringify({ version: 1, chapterId: browserChapter.id, headingId: sectionId, sourceHash: browserChapter.sha256 });
  await page.evaluate(({ key, record }) => window.localStorage.setItem(key, record), { key: readingStorageKey, record });
  await page.goto(at('/zh/'));
  const continueLink = page.locator('.home-reading-action a');
  await expect(continueLink).toHaveAttribute('href', at(sectionPath));
  await continueLink.press('Enter');
  await expect(page.locator(`[id="${sectionId}"]`)).toBeFocused();
  await expect(page.locator(`[id="${sectionId}"]`)).toBeInViewport({ ratio: 1 });
  const resumed = await geometry(page);
  expect(resumed.target.top).toBeGreaterThanOrEqual(resumed.tools.bottom);
  expect(await page.evaluate(key => window.localStorage.getItem(key), readingStorageKey)).toBe(record);
  await testInfo.attach('resumed-section', { body: JSON.stringify(resumed), contentType: 'application/json' });
});

test('native compact navigation opens before hydration and preserves breakpoint focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  const scripts = await delayScripts(page);
  const menu = page.locator('.chapter-header-menu');
  const summary = menu.locator('summary');
  try {
    await page.goto(at(chapterPath(browserChapter)), { waitUntil: 'commit' });
    await expect(page.locator('article h1')).toBeVisible();
    await summary.press('Enter');
    await expect(menu).toHaveAttribute('open', '');
    await expect(menu.getByRole('link', { name: '章节目录', exact: true })).toBeVisible();
    scripts.release();
    await expect(menu).toHaveAttribute('data-compact', 'true');
    await expect(menu).toHaveAttribute('open', '');
    await summary.press('Escape');
    await expect(summary).toBeFocused();
    await expect(menu).not.toHaveAttribute('open', '');
    await page.setViewportSize({ width: 1000, height: 760 });
    const inline = page.locator('.chapter-header-links a').first();
    await expect(inline).toBeFocused();
    await page.setViewportSize({ width: 320, height: 760 });
    await expect(summary).toBeFocused();
    await summary.press('Enter');
    await menu.getByRole('link', { name: '章节目录', exact: true }).focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(menu).not.toHaveAttribute('open', '');
    await expect(page.locator('.appearance-trigger')).toBeFocused();
  } finally { await scripts.cleanup(); }
});

test('focus established before hydration survives a browser blur before resize', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  const scripts = await delayScripts(page);
  const menu = page.locator('.chapter-header-menu');
  const summary = menu.locator('summary');
  try {
    await page.goto(at(chapterPath(browserChapter)), { waitUntil: 'commit' });
    await expect(page.locator('article h1')).toBeVisible();
    await summary.focus();
    await expect(summary).toBeFocused();
    scripts.release();
    await expect(menu).toHaveAttribute('data-compact', 'true');
    await expect(summary).toBeFocused();
    // Reproduce CSS hiding a focused element before the resize event is delivered.
    await summary.evaluate(element => element.blur());
    await page.setViewportSize({ width: 1000, height: 760 });
    const inline = page.locator('.chapter-header-links a').first();
    await expect(inline).toBeFocused();
    await inline.evaluate(element => element.blur());
    await page.setViewportSize({ width: 320, height: 760 });
    await expect(summary).toBeFocused();
  } finally { await scripts.cleanup(); }
});

test('script-free header retains real inline language and chapter links', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 320, height: 760 } });
  try {
    const page = await context.newPage();
    for (const [route, directory] of [['/', '/read/'], ['/zh/', '/zh/read/'], [chapterPath(browserChapter), '/zh/read/']]) {
      await page.goto(at(route));
      const links = page.locator('.site-header .chapter-header-links');
      await expect(links.locator('a[hreflang]')).toBeVisible();
      await expect(page.locator('.chapter-header-menu')).toBeHidden();
      const contents = links.locator(`a[href="${at(directory)}"]`);
      await expect(contents).toBeVisible();
      await contents.click();
      await expect(page).toHaveURL(new URL(at(directory), page.url()).href);
    }
  } finally { await context.close(); }
});
