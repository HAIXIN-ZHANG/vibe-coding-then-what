import { test as base, expect } from '@playwright/test';
import { loadBook } from '../../site/content/load-book.ts';
import { readingLocator } from '../../site/content/reading-locator.ts';
import { legacyHeadingAliases } from '../../site/content/manifest.ts';
import { readingStorageKey } from '../../site/reading-progress/model.ts';
import { withBasePath } from '../../site/config/deployment.ts';
import { getMessages } from '../../site/config/i18n.ts';

const chapters = (await loadBook()).map(readingLocator);
const [opening, chapter] = chapters;
const at = path => withBasePath(path, process.env.NEXT_PUBLIC_BASE_PATH);
const saved = (item = chapter, headingId = item.headings[1].id) => ({ version: 1, chapterId: item.chapterId, headingId, sourceHash: item.sourceHash });
const raw = value => JSON.stringify(value);
const snapshot = page => page.evaluate(key => window.localStorage.getItem(key), readingStorageKey);
const panel = page => page.locator('.continue-reading');
const test = base.extend({
  health: [async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await use();
    expect(errors, 'uncaught/console browser errors').toEqual([]);
  }, { auto: true }],
});

async function seed(page, value) {
  await page.evaluate(({ key, value }) => {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  }, { key: readingStorageKey, value });
}
async function ready(page, href = chapter.href) {
  await page.goto(at(href));
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
}
async function section(page, index) {
  const heading = chapter.headings[index];
  await page.locator('.outline-rail a').filter({ hasText: heading.title }).click();
  await expect(page.locator(`[id="${heading.id}"]`)).toBeFocused();
  await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
  return heading;
}

test('Continue starts absent, records a deliberate section and returns only by explicit native link', async ({ page }, testInfo) => {
  await page.goto(at('/zh/read/'));
  await expect(panel(page)).toHaveCount(0);
  await expect(page.locator('.available-chapters a')).toHaveCount(chapters.length);
  await ready(page);
  const heading = await section(page, 2);
  const target = page.locator(`[id="${heading.id}"]`);
  const destination = new URL(`${at(chapter.href)}#${encodeURIComponent(heading.id)}`, page.url()).href;
  const reloads = [];
  await expect.poll(() => snapshot(page)).toBe(raw(saved(chapter, heading.id)));
  for (const locale of ['zh', 'en']) {
    await page.goto(at(locale === 'zh' ? '/zh/read/' : '/read/'));
    const copy = getMessages(locale).continueReading;
    await expect(panel(page).getByRole('heading', { name: copy.title })).toBeVisible();
    await expect(panel(page)).toContainText(chapter.title);
    await expect(panel(page)).toContainText(heading.title);
    const link = panel(page).getByRole('link');
    await expect(link).toHaveAttribute('href', `${at(chapter.href)}#${encodeURIComponent(heading.id)}`);
    await expect(link).toHaveAttribute('hreflang', 'zh');
    await link.focus(); await link.press('Enter');
    await expect(target).toBeFocused();
    await expect(page).toHaveURL(destination);
    await page.reload();
    // Passive reload may restore document focus. It must retain the explicit section and saved place.
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    await expect(page).toHaveURL(destination);
    await expect(target).toBeInViewport({ ratio: 1 });
    await expect.poll(() => target.evaluate(element => {
      const clearance = Math.max(...['.site-header', '.reading-tools'].map(selector => {
        const item = document.querySelector(selector);
        return item && window.getComputedStyle(item).position === 'sticky' ? item.getBoundingClientRect().bottom : 0;
      }));
      return element.getBoundingClientRect().top >= clearance - 1;
    }), { message: 'reloaded section remains below sticky reader chrome' }).toBe(true);
    expect(await snapshot(page)).toBe(raw(saved(chapter, heading.id)));
    reloads.push(await target.evaluate((element, locale) => ({ locale, url: window.location.href,
      activeTag: document.activeElement?.tagName, activeId: document.activeElement?.id,
      headingId: element.id, top: element.getBoundingClientRect().top, bottom: element.getBoundingClientRect().bottom,
    }), locale));
  }
  await testInfo.attach('native-reload-position', { body: JSON.stringify(reloads, null, 2), contentType: 'application/json' });
  for (const route of ['/', '/zh/']) {
    await page.goto(at(route));
    await expect(panel(page)).toHaveCount(0);
  }
});

test('Continue rejects corrupt destinations and uses the current chapter start for stale positions', async ({ page }) => {
  await page.goto(at('/zh/read/'));
  for (const value of ['bad JSON', raw({ ...saved(), version: 2 }), ' '.repeat(2049),
    raw({ ...saved(), chapterId: 'removed' }), raw({ ...saved(), href: 'https://untrusted.example/' })]) {
    await seed(page, value); await page.reload();
    await expect(panel(page)).toHaveCount(0);
    await expect(page.locator('.available-chapters a')).toHaveCount(chapters.length);
  }
  for (const position of [{ ...saved(), sourceHash: 'a'.repeat(64) }, { ...saved(), headingId: 'removed-heading' },
    { ...saved(), headingId: legacyHeadingAliases[0].legacyId }]) {
    await seed(page, raw(position)); await page.reload();
    await expect(panel(page).getByRole('link')).toHaveAttribute('href', at(chapter.href));
    await expect(panel(page).locator('.continue-fallback')).toBeVisible();
    await panel(page).getByRole('link').click();
    await expect(page).toHaveURL(new URL(at(chapter.href), page.url()).href);
    await expect(page.locator('h1')).toBeInViewport();
    expect(await snapshot(page)).toBe(raw(position));
    await page.goto(at('/zh/read/'));
  }
});

test('shared and legacy entry, passive movement, overlays and resize never replace confirmed progress', async ({ page }) => {
  await page.goto(at('/zh/read/')); const confirmed = raw(saved(opening)); await seed(page, confirmed);
  const alias = legacyHeadingAliases[0];
  for (const [item, id] of [[chapter, chapter.headings[3].id], [opening, alias.legacyId]]) {
    await ready(page, `${item.href}#${encodeURIComponent(id)}`);
    await expect(page.locator(`[id="${id}"]`)).toBeFocused();
    expect(await snapshot(page)).toBe(confirmed);
  }
  await ready(page);
  await page.evaluate(() => { window.scrollTo(0, 600); });
  const search = page.getByRole('button', { name: '搜索章节', exact: true });
  await search.focus(); await search.press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape'); await expect(search).toBeFocused();
  const appearance = page.locator('.appearance-trigger');
  await appearance.click(); await page.getByRole('radio', { name: '深色', exact: true }).check();
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => { document.querySelector('article h2').focus({ preventScroll: true }); });
  await page.waitForTimeout(800);
  expect(await snapshot(page)).toBe(confirmed);
  // A real document-moving wheel gesture in the prose owns the new position.
  await page.mouse.move(180, 500); await page.mouse.wheel(0, 600);
  await expect.poll(async () => JSON.parse(await snapshot(page)).chapterId).toBe(chapter.chapterId);
  const next = JSON.parse(await snapshot(page));
  expect(next.sourceHash).toBe(chapter.sourceHash);
  expect(next.headingId === null || chapter.headings.some(heading => heading.id === next.headingId)).toBe(true);
  await page.locator('article h2').first().focus();
  await page.keyboard.press('End');
  await expect.poll(async () => JSON.parse(await snapshot(page)).headingId).toBe(chapter.headings.at(-1).id);
});

test('blocked writes latch for the mounted recorder and denied storage never invents Continue', async ({ browser, baseURL }) => {
  for (const failure of ['getter', 'read', 'quota']) {
    const context = await browser.newContext({ baseURL }); const page = await context.newPage(); const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(({ key, failure }) => {
      window.progressAttempts = 0;
      if (failure === 'getter') Object.defineProperty(window, 'localStorage', { get() { throw Error('denied'); } });
      else {
        const get = window.Storage.prototype.getItem, set = window.Storage.prototype.setItem;
        window.Storage.prototype.getItem = function(name) { if (failure === 'read' && name === key) throw Error('denied'); return get.call(this, name); };
        window.Storage.prototype.setItem = function(name, value) {
          if (name === key) { window.progressAttempts++; throw new window.DOMException('denied', 'QuotaExceededError'); }
          return set.call(this, name, value);
        };
      }
    }, { key: readingStorageKey, failure });
    await ready(page);
    await section(page, 1); await section(page, 2);
    await page.waitForTimeout(800);
    await section(page, 3);
    await page.mouse.move(650, 500); await page.mouse.wheel(0, 400);
    await page.waitForTimeout(800);
    expect(await page.evaluate(() => window.progressAttempts)).toBe(failure === 'quota' ? 1 : 0);
    await page.goto(at('/zh/read/')); await expect(panel(page)).toHaveCount(0);
    await expect(page.locator('.available-chapters a')).toHaveCount(chapters.length);
    expect(errors).toEqual([]);
    await context.close();
  }
});

test('pending progress is canceled by hidden-page, pagehide, overlay and another-tab changes', async ({ page, context }) => {
  for (const reason of ['hidden', 'pagehide', 'overlay', 'external', 'external-clear']) {
    await ready(page); await section(page, 1);
    const confirmed = await snapshot(page);
    await section(page, 2);
    // The second section is staged within the bounded write interval.
    expect(await snapshot(page)).toBe(confirmed);
    let expected = confirmed;
    if (reason === 'hidden') await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' });
      document.dispatchEvent(new window.Event('visibilitychange'));
    });
    if (reason === 'pagehide') await page.evaluate(() => window.dispatchEvent(new window.PageTransitionEvent('pagehide')));
    if (reason === 'overlay') await page.getByRole('button', { name: '搜索章节', exact: true }).click();
    if (reason === 'external' || reason === 'external-clear') {
      const other = await context.newPage(); await other.goto(at('/read/'));
      expected = reason === 'external-clear' ? null : raw(saved(opening)); await seed(other, expected);
      await other.close();
    }
    await page.waitForTimeout(850);
    expect(await snapshot(page)).toBe(expected);
    if (reason === 'overlay') await page.keyboard.press('Escape');
  }
});

test('Continue responds to real local-storage changes while ignoring unrelated storage areas', async ({ page, context }) => {
  await page.goto(at('/read/'));
  const other = await context.newPage(); await other.goto(at('/zh/read/'));
  await seed(other, raw(saved()));
  await expect(panel(page)).toContainText(chapter.title);
  // Same-origin iframe sessionStorage events must not be confused with localStorage.
  await page.evaluate(({ key, next }) => {
    window.localStorage.setItem(key, next);
    window.dispatchEvent(new window.StorageEvent('storage', { key, storageArea: window.sessionStorage, newValue: next }));
    window.dispatchEvent(new window.StorageEvent('storage', { key: 'btf.theme', storageArea: window.localStorage, newValue: 'dark' }));
  }, { key: readingStorageKey, next: raw(saved(opening)) });
  await expect(panel(page)).toContainText(chapter.title);
  await seed(other, null); await expect(panel(page)).toHaveCount(0);
  await seed(other, raw(saved())); await expect(panel(page)).toContainText(chapter.title);
  await other.evaluate(() => window.localStorage.clear()); await expect(panel(page)).toHaveCount(0);
  await other.close();
});

test('Continue remains readable and keyboard reachable across locales, themes and screen sizes', async ({ page }, testInfo) => {
  test.setTimeout(45_000);
  await page.goto(at('/read/')); await seed(page, raw(saved()));
  for (const {width,mode,locale} of [
    {width:1440,mode:'light',locale:'en'}, {width:1440,mode:'dark',locale:'zh'},
    {width:390,mode:'dark',locale:'en'}, {width:390,mode:'light',locale:'zh'},
    {width:320,mode:'light',locale:'en'}, {width:320,mode:'dark',locale:'zh'},
  ]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(mode => window.localStorage.setItem('btf.theme', mode), mode);
    await page.goto(at(locale === 'zh' ? '/zh/read/' : '/read/'));
    await expect(page).toHaveTitle(`${getMessages(locale).contents} | ${getMessages(locale).title}`);
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await expect(panel(page)).toBeVisible();
    await expect(panel(page).locator('.continue-chapter')).toHaveAttribute('lang', 'zh-CN');
    const link = panel(page).getByRole('link'); await link.focus();
    await page.keyboard.press('Tab'); await page.keyboard.press('Shift+Tab');
    await expect(link).toBeFocused();
    const geometry = await link.evaluate(element => {
      const style = window.getComputedStyle(element), rect = element.getBoundingClientRect();
      return { height: rect.height, left: rect.left, right: rect.right, outline: style.outlineStyle, width: document.documentElement.scrollWidth };
    });
    expect(geometry.height).toBeGreaterThanOrEqual(44);
    expect(geometry.left).toBeGreaterThanOrEqual(0); expect(geometry.right).toBeLessThanOrEqual(width);
    expect(geometry.width).toBeLessThanOrEqual(width); expect(geometry.outline).not.toBe('none');
    const path = testInfo.outputPath(`continue-${locale}-${mode}-${width}.png`);
    await panel(page).screenshot({ path });
    await testInfo.attach(`Continue ${locale} ${mode} ${width}`, { path, contentType: 'image/png' });
  }
});

test('no-JS directory and shared chapter links remain static without a Continue panel', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false }); const page = await context.newPage();
  for (const locale of ['en', 'zh']) {
    await page.goto(at(locale === 'zh' ? '/zh/read/' : '/read/'));
    await expect(panel(page)).toHaveCount(0);
    await expect(page.locator('.available-chapters a')).toHaveCount(chapters.length);
    await page.locator('.directory-chapters a').nth(1).click();
    await expect(page.locator('article')).toHaveAttribute('data-chapter-id', chapter.chapterId);
  }
  const id = chapter.headings[2].id;
  await page.goto(at(`${chapter.href}#${encodeURIComponent(id)}`));
  await expect(page.locator(`[id="${id}"]`)).toBeInViewport();
  await context.close();
});

test('a saved public pre-R2 heading resumes at the chapter start and the old shared URL still lands at its successor', async ({ page }) => {
  const old = { version: 1, chapterId: 'opening', headingId: '例子会重复问题会变深',
    sourceHash: 'b4d0dd040e183cebc0400526ca5b317d23db1dc406e0bd5b00e3af74a940f521' };
  await page.goto(at('/zh/read/'));
  await seed(page, raw(old));
  await page.reload();
  await expect(panel(page).locator('.continue-fallback')).toBeVisible();
  await expect(panel(page).locator('a')).toHaveAttribute('href', at(opening.href));
  await panel(page).locator('a').click();
  await expect(page.locator('article h1')).toBeInViewport();
  await page.goto(at(opening.href) + '#' + encodeURIComponent(old.headingId));
  await expect(page.locator(`[id="${old.headingId}"]`)).toBeFocused();
  await expect(page.locator('[id="往后看也往旁边看"]')).toBeInViewport();
  expect(await snapshot(page)).toBe(raw(old));
});

test('Chinese homepage offers the deliberate saved position and restarts a stale chapter', { tag: '@smoke' }, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(at('/zh/'));
  const link = page.locator('.home-reading-action a');
  await expect(link).toHaveAccessibleName('阅读中文原稿');
  await expect(link).toHaveAttribute('href', at(opening.href));
  await page.goto(at(chapter.href));
  await ready(page);
  const heading = chapter.headings[2];
  await page.locator('.mobile-outline summary').click();
  await page.locator('.mobile-outline a').filter({ hasText: heading.title }).click();
  await expect(page.locator(`[id="${heading.id}"]`)).toBeFocused();
  await expect.poll(() => snapshot(page)).toBe(raw(saved(chapter, heading.id)));
  await page.goto(at('/zh/'));
  await expect(link).toHaveAccessibleName('继续上次阅读');
  await expect(link).toHaveAccessibleDescription(heading.title);
  await link.press('Enter');
  await expect(page.locator(`[id="${heading.id}"]`)).toBeFocused();
  await page.goto(at('/zh/'));
  await seed(page, raw({ ...saved(chapter, heading.id), sourceHash: 'a'.repeat(64) }));
  await page.reload();
  await expect(link).toHaveAccessibleName('从本章开头读起');
  await expect(link).toHaveAttribute('href', at(chapter.href));
  await expect(link).toHaveAccessibleDescription(/从章节开头/);
  await page.goto(at('/'));
  await expect(page.getByRole('link', { name: 'Read in Chinese', exact: true })).toHaveAttribute('href', at(opening.href));
});
