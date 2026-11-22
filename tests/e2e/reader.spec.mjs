import { test as base, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { loadBook } from '../../site/content/load-book.ts';
import { chapterManifest, chapterPath, legacyHeadingAliases } from '../../site/content/manifest.ts';
import { withBasePath } from '../../site/config/deployment.ts';
import { getMessages } from '../../site/config/i18n.ts';
import { readingParts } from '../../site/content/reading-parts.ts';
import { homeContent } from '../../site/components/home-content.ts';

const at = pathname => withBasePath(pathname, process.env.NEXT_PUBLIC_BASE_PATH);
const [opening, g01, browserChapter] = chapterManifest;
const closing = chapterManifest.at(-1);

const test = base.extend({
  health: [async ({ page }, use, testInfo) => {
    const pageErrors = [], consoleErrors = [], expected = new Set();
    page.on('pageerror', error => pageErrors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push({ text: message.text(), url: message.location().url });
    });
    await use({ allowHttpFailure: (url, status) => expected.add(`${url}|${status}`) });
    const unexpected = consoleErrors.filter(error => {
      const status = /^Failed to load resource: the server responded with a status of (\d+) \([^)]*\)$/.exec(error.text)?.[1];
      return !status || !expected.has(`${error.url}|${status}`);
    });
    if (pageErrors.length || consoleErrors.length) await testInfo.attach('browser-errors', {
      body: JSON.stringify({ pageErrors, consoleErrors, expectedHttpFailures: [...expected] }, null, 2), contentType: 'application/json',
    });
    expect(pageErrors, 'unexpected uncaught browser errors').toEqual([]);
    expect(unexpected, 'unexpected browser console errors').toEqual([]);
  }, { auto: true }],
});

async function openSearch(page) {
  await page.getByRole('button', { name: '搜索章节', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return dialog;
}

test('every real search match remains available with a truthful count and contextual highlights', async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(at('/zh/read/'));
    const dialog = await openSearch(page);
    await dialog.getByRole('searchbox').fill('报名');
    await expect(dialog.getByRole('status')).toHaveText('112 条匹配 · 中文完整版');
    const links = dialog.locator('.search-results a');
    await expect(links).toHaveCount(112);
    const response = await page.request.get(at('/search-index/zh.json'));
    const index = await response.json();
    const expected = index.entries.filter(entry => `${entry.chapterTitle} ${entry.headingTitle} ${entry.text}`.includes('报名'));
    expect(new Set(await links.evaluateAll(elements => elements.map(element => element.getAttribute('href'))))).toEqual(new Set(expected.map(entry => at(entry.href))));
    const excerpts = await dialog.locator('.search-results li').evaluateAll(items => items.map(item => ({
      firstMatch: item.querySelector('mark')?.textContent, length: Array.from(item.querySelector('p').innerText).length,
    })));
    expect(excerpts.every(({ firstMatch, length }) => firstMatch === '报名' && length <= 66)).toBe(true);
    await dialog.getByRole('searchbox').press('ArrowDown');
    for (let index = 1; index < 112; index++) await page.keyboard.press('ArrowDown');
    await expect(links.last()).toBeFocused();
    const destination = new URL(await links.last().getAttribute('href'), page.url());
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(destination.href);
    await expect(page.locator(`[id="${decodeURIComponent(destination.hash.slice(1))}"]`)).toBeFocused();
  }
});

test('mobile outline stays nearby without shifting position on opening or hiding anchor targets', async ({ page }) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(at(chapterPath(g01)));
    const summary = page.locator('.mobile-outline summary');
    await summary.click();
    const target = page.locator('.mobile-outline').getByRole('link', { name: '时间：先发生什么，用户要等到哪里？', exact: true });
    const hash = decodeURIComponent((await target.getAttribute('href')).slice(1));
    await target.click();
    const heading = page.locator(`[id="${hash}"]`);
    await expect(heading).toBeFocused();
    await expect(summary).toBeInViewport();
    const position = await page.evaluate(() => window.scrollY);
    await summary.focus(); await summary.press('Enter');
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
    await summary.press('Escape');
    await expect(summary).toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
    const geometry = await page.evaluate(id => ({
      heading: document.getElementById(id).getBoundingClientRect().top,
      toolbar: document.querySelector('.reading-tools').getBoundingClientRect().bottom,
    }), hash);
    expect(geometry.heading).toBeGreaterThanOrEqual(geometry.toolbar);
    await page.locator('.reading-tools').evaluate(element => {
      const samples = [...element.querySelectorAll('summary')].map(summary => ({ summary,
        size: parseFloat(window.getComputedStyle(summary).fontSize), line: parseFloat(window.getComputedStyle(summary).lineHeight) }));
      for (const { summary, size, line } of samples) {
        summary.style.fontSize = `${size * 2}px`; summary.style.lineHeight = `${line * 2}px`;
      }
    });
    await summary.press('Enter');
    await expect(target).toBeVisible();
    await target.focus(); await target.press('Enter');
    await expect(heading).toBeFocused();
    await expect.poll(() => heading.evaluate(element => element.getBoundingClientRect().top >=
      window.document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
});

test('both home locales show exactly the approved Chinese reading destinations and current availability', async ({ page }) => {
  for (const locale of ['en', 'zh']) {
    await page.goto(at(locale === 'en' ? '/' : '/zh/'));
    const links = page.locator('.home-chapters a');
    await expect(links).toHaveCount(chapterManifest.length);
    await expect(page.locator('.home-hero-copy > .availability-note')).toHaveText(getMessages(locale).availableNotice(chapterManifest.length));
    for (const [index, chapter] of chapterManifest.entries()) {
      await expect(links.nth(index)).toHaveAttribute('href', at(chapterPath(chapter)));
      await expect(links.nth(index)).toHaveAttribute('hreflang', 'zh');
      await expect(links.nth(index).locator('.home-chapter-title')).toHaveText(getMessages(locale).chapterLabels[chapter.id] ?? chapter.title);
    }
    if (locale === 'en') await expect(page.locator('.home-chapters')).toContainText('English chapters are not available yet.');
    await links.last().click(); await expect(page.locator('article')).toHaveAttribute('data-source-sha256', closing.sha256);
  }
});

test('localized chrome and matching page roles remain coherent across languages and viewport sizes', async ({ page }, testInfo) => {
  const headerObservations = [];
  async function roles() {
    return page.evaluate(() => Object.fromEntries(Object.entries({
      header: '.site-header', brand: '.wordmark', content: '.book-intro, .reading-index, .chapter-column',
      title: 'h1', body: 'body', search: '.search-trigger', nav: '.site-header nav',
    }).map(([role, selector]) => {
      const element = document.querySelector(selector), style = window.getComputedStyle(element), rect = element.getBoundingClientRect();
      return [role, {
        left: rect.left, width: rect.width, height: rect.height,
        type: [style.fontFamily, style.fontSize, style.fontWeight, style.lineHeight, style.letterSpacing],
      }];
    })));
  }
  for (const width of [1440, 768, 375, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const snapshots = {};
    for (const locale of ['en', 'zh']) for (const kind of ['home', 'index']) {
      const route = `${locale === 'zh' ? '/zh' : ''}/${kind === 'index' ? 'read/' : ''}`;
      const messages = getMessages(locale);
      await page.goto(at(route));
      await expect(page).toHaveTitle(kind === 'home' ? messages.title : `${messages.contents} | ${messages.title}`);
      await expect(page.locator('.wordmark')).toHaveText(messages.title);
      await expect(page.locator('.wordmark')).toHaveAttribute('aria-label', `${messages.title} · ${messages.home}`);
      await expect(page.locator('.wordmark')).toHaveAttribute('lang', messages.lang);
      const brandGeometry = await page.locator('.wordmark').evaluate(element => {
        const bounds = element.getBoundingClientRect();
        const phraseLines = [...element.children].map(phrase => {
          const range = document.createRange(); range.selectNodeContents(phrase);
          return new Set([...range.getClientRects()].map(rect => rect.top)).size;
        });
        return { height: bounds.height, phraseLines };
      });
      expect(brandGeometry.height).toBeGreaterThanOrEqual(44);
      expect(brandGeometry.phraseLines, 'book-title phrases must not split internally').toEqual([1, 1]);
      await expect(page.getByRole('navigation', { name: messages.navigation, exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true })).toBeVisible();
      if (kind === 'index') {
        await expect(page.locator('.reading-index > .availability-note')).toHaveText(messages.availableNotice(chapterManifest.length));
        const links = page.locator('.available-chapters a');
        await expect(links).toHaveCount(chapterManifest.length);
        for (const [index, chapter] of chapterManifest.entries()) {
          await expect(links.nth(index).locator('.directory-chapter-title')).toHaveText(messages.chapterLabels[chapter.id] ?? chapter.title);
          await expect(links.nth(index)).toHaveAttribute('href', at(chapterPath(chapter)));
          await expect(links.nth(index)).toHaveAttribute('hreflang', 'zh');
          if (!messages.chapterLabels[chapter.id]) await expect(links.nth(index).locator('.directory-chapter-title')).toHaveAttribute('lang', 'zh-CN');
        }
        if (locale === 'en') await expect(page.locator('.reading-index')).toContainText(messages.englishUnavailable);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      snapshots[`${locale}-${kind}`] = await roles();
      if (width < 900) {
        const controls = page.locator('.wordmark, .search-trigger, .chapter-header-menu > summary, .site-header nav a, .appearance-trigger').filter({ visible: true });
        const geometry = await controls.evaluateAll(elements => {
          const header = document.querySelector('.site-header').getBoundingClientRect();
          return { availableWidth: document.documentElement.clientWidth, header: { left:header.left,right:header.right,top:header.top,bottom:header.bottom }, controls:elements.map(element => {
            const r=element.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
            return { tag:element.tagName,left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height,hit:element.contains(hit) };
          }) };
        });
        for (const control of geometry.controls) {
          expect(control.height, `${width}px ${locale} ${kind} header target height`).toBeGreaterThanOrEqual(44);
          if (control.tag === 'BUTTON' || control.tag === 'SUMMARY') expect(control.width).toBeGreaterThanOrEqual(44);
          expect(control.left).toBeGreaterThanOrEqual(geometry.header.left); expect(control.right).toBeLessThanOrEqual(geometry.header.right + 0.5);
          expect(control.top).toBeGreaterThanOrEqual(geometry.header.top); expect(control.bottom).toBeLessThanOrEqual(geometry.header.bottom);
          expect(control.right).toBeLessThanOrEqual(geometry.availableWidth); expect(control.hit).toBe(true);
        }
        for (let i=0;i<geometry.controls.length;i++) for (let j=i+1;j<geometry.controls.length;j++) {
          const a=geometry.controls[i],b=geometry.controls[j];
          expect(Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1, `${width}px ${locale} ${kind} header controls must not overlap`).toBe(false);
        }
        await controls.first().focus();
        for (let i=0;i<await controls.count();i++) {
          if (i) await page.keyboard.press('Tab');
          await expect(controls.nth(i)).toBeFocused();
        }
        headerObservations.push({ width,locale,kind,...geometry });
      }
    }
    for (const kind of ['home', 'index']) {
      const en = snapshots[`en-${kind}`], zh = snapshots[`zh-${kind}`];
      for (const role of ['brand', 'title', 'body', 'search']) expect(zh[role].type, `${width}px ${kind} ${role} typography`).toEqual(en[role].type);
      // Localized labels can need different row counts; each narrow target is checked above.
    }
    await page.goto(at(chapterPath(g01)));
    await expect(page).toHaveTitle(`${g01.title} | ${getMessages('zh').title}`);
    const reading = await roles();
    // Chapter views have a full-width V2 header and their own bounded reading column.
    expect(reading.header.width).toBeLessThanOrEqual(width);
    expect(reading.content.width).toBeGreaterThan(0);
    expect(reading.content.width).toBeLessThanOrEqual(width);
    await expect(page.locator('.wordmark')).toHaveAttribute('aria-label', `${getMessages('zh').title} · ${getMessages('zh').home}`);
    for (const chapter of [g01, opening]) {
      if (chapter !== g01) await page.goto(at(chapterPath(chapter)));
      const title = page.locator('article h1 .heading-link');
      await expect(title).toHaveText(chapter.title);
      const phraseLines = await title.evaluate(element => {
        const text = element.firstChild, phrases = element.textContent.match(/[^：，。！？]+[：，。！？]?/gu);
        let offset = 0;
        return phrases.map(phrase => {
          const range = document.createRange(); range.setStart(text, offset); offset += phrase.length; range.setEnd(text, offset);
          return { phrase, lines: new Set([...range.getClientRects()].map(rect => rect.top)).size };
        });
      });
      for (const phrase of phraseLines) expect(phrase.lines, `short title phrase ${phrase.phrase}`).toBe(1);
    }
  }
  await attachGeometry(testInfo, 'localized-header-controls', headerObservations);
});

test('approved browser chapter renders illustrative source safely and every indexed heading remains reachable', async ({ page, request }, testInfo) => {
  const response = await request.get(at('/search-index/zh.json'));
  expect(response.status()).toBe(200);
  const entries = (await response.json()).entries.filter(entry => entry.chapterId === browserChapter.id);
  const source = (await loadBook()).find(chapter => chapter.entry.id === browserChapter.id);
  expect(entries.map(entry => entry.headingId)).toEqual(source.headingIds);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(at(chapterPath(browserChapter)));
    await expect(page).toHaveTitle(`${browserChapter.title} | ${getMessages('zh').title}`);
    const article = page.locator('article');
    await expect(article).toHaveAttribute('data-chapter-id', browserChapter.id);
    await expect(article).toHaveAttribute('data-source-sha256', browserChapter.sha256);
    await expect(article.getByRole('heading', { level: 1 })).toHaveText(browserChapter.title);
    await expect(article.locator('pre')).toHaveCount(4);
    await expect(article.locator('table')).toHaveCount(2);
    await expect(article.locator('pre').first()).toContainText('<input id="query" type="search">');
    await expect(article.locator('#query, #search, .course-card')).toHaveCount(0);
    await expect(article.getByRole('link', { name: '返回：一个页面，究竟连着什么？', exact: true }))
      .toHaveAttribute('href', at(chapterPath(g01)));
    await expect(page.locator('.chapter-pagination a[rel="prev"]')).toHaveAttribute('href', at(chapterPath(g01)));
    await expect(page.locator('.chapter-pagination a[rel="next"]')).toHaveAttribute('href', at(chapterPath(chapterManifest[3])));
    for (const [label, theme] of [[getMessages('zh').dayTheme, 'light'], [getMessages('zh').nightTheme, 'dark']]) {
      await chooseAppearance(page, label);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.screenshot({ path: testInfo.outputPath(`browser-chapter-${width}-${theme}.png`) });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
    const regions = await article.locator('pre, [role="region"]').evaluateAll(elements => elements.map(element => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, viewport: window.innerWidth, width: element.clientWidth, overflow: window.getComputedStyle(element).overflowX };
    }));
    expect(regions).toHaveLength(6);
    for (const region of regions) {
      expect(region.width).toBeGreaterThan(0);
      expect(region.left).toBeGreaterThanOrEqual(0);
      expect(region.right).toBeLessThanOrEqual(region.viewport);
      expect(region.overflow).toMatch(/^(auto|scroll)$/);
    }
    await attachGeometry(testInfo, `browser-content-geometry-${width}`, regions);
    if (width <= 390) {
      const code = article.locator('pre').first(); await code.focus(); await code.press('ArrowRight');
      expect(await code.evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
      await expect.poll(() => code.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
    }
    for (const entry of entries) {
      const dialog = await openSearch(page);
      await dialog.getByRole('searchbox').fill(entry.headingTitle);
      const target = dialog.locator(`.search-results a[href="${at(entry.href)}"]`);
      await expect(target).toHaveCount(1);
      await expect(target.locator('strong')).toHaveText(entry.headingTitle);
      await target.click();
      await expect(page).toHaveURL(new URL(at(entry.href), page.url()).href);
      await expect(page.locator(`[id="${entry.headingId}"]`)).toBeFocused();
    }
    if (width < 900) await page.locator('.chapter-header-menu > summary').click();
    await page.getByRole('link', { name: 'Switch to English', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${at('/read/')}$`));
    await expect(page.locator('.reading-index')).toContainText(getMessages('en').englishUnavailable);
    const missingEnglish = await request.get(at('/read/browser-foundations/'));
    expect(missingEnglish.status()).toBe(404);
  }
});

test('enlarged header text wraps controls instead of overlapping intact book-title phrases', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  for (const locale of ['en', 'zh']) {
    await page.goto(at(locale === 'zh' ? '/zh/' : '/'));
    // Explicit computed-text enlargement is a text stress test, not native browser zoom.
    await page.locator('header').evaluate(header => {
      const samples = [...header.querySelectorAll('*')].map(element => {
        const style = window.getComputedStyle(element);
        return { element, size: Number.parseFloat(style.fontSize), line: Number.parseFloat(style.lineHeight) };
      });
      for (const { element, size, line } of samples) {
        element.style.fontSize = `${size * 2}px`;
        if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`;
      }
    });
    const geometry = await page.locator('header').evaluate(header => {
      const search = header.querySelector('.search-trigger').getBoundingClientRect();
      return [...header.querySelectorAll('.wordmark span')].map(phrase => {
        const rect = phrase.getBoundingClientRect();
        return {
          left: rect.left, right: rect.right, viewport: window.innerWidth,
          overlaps: rect.left < search.right && rect.right > search.left && rect.top < search.bottom && rect.bottom > search.top,
        };
      });
    });
    for (const phrase of geometry) {
      expect(phrase.overlaps, 'enlarged title must not overlap Search').toBe(false);
      expect(phrase.left).toBeGreaterThanOrEqual(0);
      expect(phrase.right).toBeLessThanOrEqual(phrase.viewport);
    }
    await page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.search-trigger')).toBeFocused();
  }
});

test('entry, truthful availability, approved chapters, previous/next and static 404', { tag: '@smoke' }, async ({ page, request }) => {
  await page.goto(at('/'));
  await expect(page).toHaveTitle('Vibe Coding, Then What?');
  await page.getByRole('link', { name: /Browse chapters/ }).click();
  await expect(page).toHaveURL(new RegExp(`${at('/read/')}$`));
  await expect(page.getByText('English chapters are not available yet.', { exact: false })).toBeVisible();
  await page.locator('.available-chapters').getByRole('link', { name: getMessages('en').chapterLabels[opening.id], exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(opening.title);
  await expect(page.locator('article')).toHaveAttribute('data-source-sha256', opening.sha256);
  await expect(page.locator('article')).not.toContainText('中文初稿 · 待 review');
  await page.locator('.chapter-pagination a[rel="next"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(g01.title);
  await expect(page.locator('article')).toHaveAttribute('data-source-sha256', g01.sha256);
  await expect(page.locator('.chapter-pagination a[rel="next"]')).toHaveAttribute('href', at(chapterPath(browserChapter)));
  await page.locator('.chapter-pagination a[rel="next"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(browserChapter.title);
  await expect(page.locator('article')).toHaveAttribute('data-source-sha256', browserChapter.sha256);
  await expect(page.locator('.chapter-pagination a[rel="next"]')).toHaveAttribute('href', at(chapterPath(chapterManifest[3])));
  await expect(page.locator('.chapter-pagination a[rel="prev"]')).toHaveAttribute('href', at(chapterPath(g01)));
  await page.locator('.chapter-pagination a[rel="prev"]').click();
  await expect(page).toHaveURL(new RegExp(`${at(chapterPath(g01))}$`));
  await page.locator('.chapter-pagination a[rel="prev"]').click();
  await expect(page).toHaveURL(new RegExp(`${at(chapterPath(opening))}$`));
  await page.getByRole('link', { name: 'Switch to English', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${at('/read/')}$`));
  const missing = await request.get(at('/not-a-reviewed-chapter/'));
  expect(missing.status()).toBe(404);
  const body = await missing.text();
  expect(body).toContain('Page not found'); expect(body).toContain('这一页还没找到');
});

test('Chinese search uses the real prefixed resource, native heading focus and Escape return', { tag: '@smoke' }, async ({ page, baseURL }) => {
  await page.goto(at('/zh/read/'));
  const fetched = page.waitForResponse(response => response.url() === new URL(at('/search-index/zh.json'), baseURL).href);
  const dialog = await openSearch(page);
  const response = await fetched;
  expect(response.status()).toBe(200);
  const index = await response.json();
  expect(index.locale).toBe('zh'); expect(index.entries.length).toBeGreaterThan(0);
  expect(index.entries.every(entry => chapterManifest.some(chapter => chapter.id === entry.chapterId && chapter.sha256 === entry.sourceHash))).toBe(true);
  await dialog.getByRole('searchbox').fill('状态');
  const first = dialog.locator('.search-results a').first();
  await expect(first).toBeVisible();
  const destination = new URL(await first.getAttribute('href'), page.url());
  expect(destination.origin).toBe(new URL(baseURL).origin);
  expect(destination.pathname).toBe(at(chapterPath(g01)));
  const headingId = decodeURIComponent(destination.hash.slice(1));
  expect(index.entries.some(entry => entry.headingId === headingId && entry.chapterId === g01.id)).toBe(true);
  await dialog.getByRole('searchbox').press('Enter');
  await expect(page).toHaveURL(destination.href);
  await expect(page.locator(`[id="${headingId}"]`)).toBeFocused();
  await expect(page.locator('dialog')).not.toBeVisible();
  const reopened = await openSearch(page);
  await reopened.getByRole('searchbox').fill('报名');
  await reopened.getByRole('searchbox').press('Escape');
  await expect(page.locator('.search-trigger')).toBeFocused();
  await openSearch(page);
  await expect(page.getByRole('searchbox')).toHaveValue('报名');
});

test('search locks the reading position while results scroll and restores normal document scrolling on close or navigation', async ({ page }) => {
  await page.goto(at(chapterPath(g01)));
  for (const closeWith of ['Escape', 'Close', 'result']) {
    const heading = page.locator('article h2').nth(1);
    if (closeWith === 'Escape') { await heading.focus(); await page.keyboard.press('Control+k'); }
    else await page.getByRole('button', { name: '搜索章节', exact: true }).click();
    const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
    if (await dialog.getByRole('searchbox').inputValue()) await dialog.getByRole('searchbox').fill('');
    await expect(dialog).toContainText('搜索已提供的章节');
    const position = await page.evaluate(() => window.scrollY);
    await page.mouse.move(2, 850);
    await page.mouse.wheel(0, 500);
    // A rendered frame observes the delivered wheel; no sleep or retry can hide movement.
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(resolve)));
    expect(await page.evaluate(() => window.scrollY), 'modal backdrop must not scroll the reader').toBe(position);
    await dialog.getByRole('searchbox').fill('状态');
    const first = dialog.locator('.search-results a').first();
    await expect(first).toBeVisible();
    const destination = new URL(await first.getAttribute('href'), page.url());
    const bounds = await dialog.boundingBox();
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height - 20);
    await page.mouse.wheel(0, 500);
    await expect.poll(() => dialog.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
    if (closeWith === 'Escape') await page.keyboard.press('Escape');
    else if (closeWith === 'Close') await dialog.getByRole('button', { name: '关闭', exact: true }).click();
    else { await dialog.getByRole('searchbox').press('Enter'); await expect(page).toHaveURL(destination.href); }
    await expect(dialog).not.toBeVisible();
    if (closeWith !== 'result') {
      await expect(closeWith === 'Escape' ? heading : page.locator('.search-trigger')).toBeFocused();
      expect(await page.evaluate(() => window.scrollY)).toBe(position);
    } else await expect(page.locator(`[id="${decodeURIComponent(destination.hash.slice(1))}"]`)).toBeFocused();
    const restored = await page.evaluate(() => window.scrollY);
    // After dismissal, wheel the real reading column; the sidebar intentionally isolates its scrolling.
    const column = await page.locator('.chapter-column').boundingBox();
    const point = { x: column.x + column.width / 2, y: 850 };
    expect(await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest('.chapter-column'), point)).toBe(true);
    await page.mouse.move(point.x, point.y); await page.mouse.wheel(0, 150);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(restored);
  }
});

test('actual search failure/retry retains the query through loading and error', async ({ page, baseURL, health }) => {
  const url = new URL(at('/search-index/zh.json'), baseURL).href;
  let release, calls = 0;
  const gate = new Promise(resolve => { release = resolve; });
  health.allowHttpFailure(url, 503);
  await page.route(url, async route => {
    if (++calls === 1) { await gate; await route.fulfill({ status: 503, body: 'Temporary search failure' }); }
    else await route.continue();
  });
  try {
    await page.goto(at('/zh/read/'));
    const dialog = await openSearch(page);
    await dialog.getByRole('searchbox').fill('状态');
    await expect(dialog.locator('.search-feedback')).toHaveAttribute('aria-busy', 'true');
    release();
    await expect(dialog.getByRole('status')).toHaveText('搜索暂时不可用');
    await expect(dialog.getByRole('searchbox')).toHaveValue('状态');
    await dialog.getByRole('button', { name: '重试', exact: true }).click();
    await expect(dialog.locator('.search-results a').first()).toBeVisible();
    await expect(dialog.getByRole('searchbox')).toHaveValue('状态');
    expect(calls).toBe(2);
  } finally { release(); }
});

test('English search is honest and never fetches another-language corpus', { tag: '@smoke' }, async ({ page }) => {
  const resources = [];
  page.on('request', request => { if (request.url().includes('/search-index/')) resources.push(request.url()); });
  await page.goto(at('/read/'));
  await page.getByRole('button', { name: 'Search chapters', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('status')).toHaveText('No English chapters are available to search yet.');
  await expect(dialog.locator('.search-results a')).toHaveCount(0);
  expect(resources).toEqual([]);
  await dialog.getByRole('link', { name: /Browse Chinese chapters/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(getMessages('zh').directory.title);
  await expect(page).toHaveURL(new RegExp(`${at('/zh/read/')}$`));
});

async function chooseAppearance(page, label) {
  if (!await page.locator('.appearance-panel').isVisible()) await page.getByRole('button', { name: /^外观:/ }).click();
  const choice = page.getByRole('radio', { name: label, exact: true });
  await choice.check();
  await expect(page.locator('.appearance-panel')).toBeVisible();
  await choice.press('Escape');
}

test('appearance separates System/Light/Dark and persists explicit choices across refresh', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(at(chapterPath(g01)));
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const dialog = await openSearch(page);
  await dialog.getByRole('searchbox').fill('状态');
  const result = dialog.locator('.search-results a').first();
  await expect(result).toBeVisible();
  const destination = new URL(await result.getAttribute('href'), page.url());
  await dialog.getByRole('searchbox').press('Enter');
  await expect(page).toHaveURL(destination.href);
  await expect(page.locator(`[id="${decodeURIComponent(destination.hash.slice(1))}"]`)).toBeFocused();
  await expect(page.locator('.appearance-trigger')).toBeInViewport();
  // The chapter desktop header is sticky; the mobile offscreen reveal is checked below.
  await chooseAppearance(page, getMessages('zh').dayTheme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await chooseAppearance(page, getMessages('zh').nightTheme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'dark');
  await chooseAppearance(page, '跟随系统');
  expect(await page.evaluate(() => window.localStorage.getItem('btf.theme'))).toBeNull();
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
  await page.getByRole('button', { name: /^外观:/ }).click();
  await expect(page.getByRole('radio', { name: '跟随系统', exact: true })).toBeFocused();
  await page.mouse.move(600, 400);
  await page.mouse.wheel(0, 400);
  await expect(page.locator('.appearance-panel')).not.toBeVisible();
  await expect(page.locator('.appearance-trigger')).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await page.getByRole('button', { name: /^外观:/ }).click();
  await expect(page.locator('.appearance-panel')).toBeVisible();
  await page.setViewportSize({ width: 320, height: 900 });
  await expect(page.locator('.appearance-panel')).not.toBeVisible();
  await expect(page.locator('.appearance-trigger')).toBeFocused();
  await page.locator('.mobile-outline summary').click();
  const mobileTarget = page.locator('.mobile-outline a').last();
  await mobileTarget.click();
  expect(await page.locator('.appearance-trigger').evaluate(element => element.getBoundingClientRect().bottom)).toBeLessThan(0);
  const beforeReveal = await page.evaluate(() => window.scrollY);
  await chooseAppearance(page, getMessages('zh').nightTheme);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(beforeReveal);
});

test('denied storage retains usable System fallback and a session-only choice', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', {
    configurable: true, get() { throw new Error('Test storage denial'); },
  }));
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(at('/zh/read/'));
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await chooseAppearance(page, getMessages('zh').dayTheme);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('copy denial reveals a real manual URL and correction is deliberate preview only', async ({ page, context, baseURL }) => {
  await page.addInitScript(() => Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true, value: { async writeText() { throw new Error('Test clipboard denial'); } },
  }));
  const external = [];
  page.on('request', request => { if (new URL(request.url()).origin === 'https://github.com') external.push(request.url()); });
  await page.goto(`${at(chapterPath(g01))}?discard=private#old`);
  const actions = page.locator('.section-actions').nth(1);
  const headingId = await actions.getAttribute('data-heading-id');
  await actions.locator('summary').click();
  await actions.getByRole('button', { name: '复制本节链接', exact: true }).click();
  const expected = new URL(at(chapterPath(g01)), baseURL); expected.hash = encodeURIComponent(headingId);
  await expect(actions.getByRole('textbox', { name: '本节链接', exact: true })).toHaveValue(expected.href);
  await expect(actions.getByRole('status')).toContainText('无法自动复制');
  await expect(actions.locator('.correction-preview')).toHaveCount(0);
  await actions.getByRole('button', { name: '查看纠错信息', exact: true }).click();
  await expect(actions.locator('.correction-preview')).toContainText(g01.sha256);
  const issue = new URL(await actions.getByRole('link', { name: /在 GitHub 查看并编辑草稿/ }).getAttribute('href'));
  expect(issue.origin + issue.pathname).toBe('https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues/new');
  expect(issue.searchParams.get('body')).toContain(expected.href);
  expect(issue.searchParams.get('body')).toContain(g01.sha256);
  expect(issue.searchParams.get('body')).not.toContain('discard=private');
  expect(context.pages()).toHaveLength(1); expect(external).toEqual([]);
});

function tableGeometry(elements) {
  return elements.map(element => {
    const bounds = element.getBoundingClientRect();
    return {
      left: bounds.left, right: bounds.right, viewport: window.innerWidth,
      clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, scrollLeft: element.scrollLeft,
      overflowX: window.getComputedStyle(element).overflowX,
    };
  });
}

async function attachGeometry(testInfo, name, geometry) {
  await mkdir(testInfo.outputDir, { recursive: true });
  const file = testInfo.outputPath(`${name}.json`);
  await writeFile(file, JSON.stringify(geometry, null, 2));
  await testInfo.attach(name, { path: file, contentType: 'application/json' });
}

test('narrow keyboard navigation bounds real tables and preserves local code overflow', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(at(chapterPath(g01)));
  const skip = page.getByRole('link', { name: '跳到正文', exact: true });
  await skip.focus(); await expect(skip).toBeInViewport();
  expect(await skip.evaluate(element => window.getComputedStyle(element).outlineStyle)).not.toBe('none');
  await skip.press('Enter'); await expect(page.locator('main')).toBeFocused();
  const summary = page.locator('.mobile-book-navigation summary');
  await summary.focus(); await summary.press('Enter');
  const details = page.locator('.mobile-book-navigation details');
  await expect(details).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  await expect(details.getByRole('link').first()).toBeFocused();
  await page.keyboard.press('Escape'); await expect(summary).toBeFocused();
  await expect(details).not.toHaveAttribute('open', '');
  const code = page.locator('article pre').first();
  await code.focus(); await expect(code).toBeFocused();
  const table = page.locator('article [role="region"]').first();
  await table.focus(); await expect(table).toBeFocused();
  expect(await page.locator('article pre').evaluateAll(elements => elements.some(element => element.scrollWidth > element.clientWidth))).toBe(true);
  const geometry = await page.locator('article [role="region"]').evaluateAll(tableGeometry);
  expect(geometry.length).toBeGreaterThan(0);
  for (const region of geometry) {
    expect(region.clientWidth).toBeGreaterThan(0);
    expect(region.left).toBeGreaterThanOrEqual(-1);
    expect(region.right).toBeLessThanOrEqual(region.viewport + 1);
    expect(region.overflowX).toMatch(/^(auto|scroll)$/);
  }
  await attachGeometry(testInfo, 'real-content-table-geometry', geometry);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath('narrow-reader.png') });
});

test('bounded long inline-code fixture scrolls within the actual rendered table', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto(at(chapterPath(g01)));
  const region = page.locator('article [role="region"]').first();
  await expect(region.locator('table')).toBeVisible();
  const before = await region.evaluate(element => ({ clientWidth: element.clientWidth, scrollWidth: element.scrollWidth }));
  // Test-only content, using the existing table and its real inline-code styling; no width/CSS override.
  const fixtureText = 'RV03_LONG_TABLE_VALUE_'.repeat(32);
  await region.evaluate((element, text) => {
    const cell = element.querySelector('tbody td');
    if (!cell) throw new Error('Approved rendered table cell is missing');
    const code = document.createElement('code'); code.textContent = text;
    cell.replaceChildren(code);
    element.dataset.e2eFixture = 'rv03-bounded-long-inline-code';
    element.scrollLeft = 0;
  }, fixtureText);
  await expect.poll(() => region.evaluate(element => element.scrollWidth - element.clientWidth)).toBeGreaterThan(0);
  await region.focus(); await expect(region).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => region.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  const [after] = await region.evaluateAll(tableGeometry);
  expect(after.overflowX).toMatch(/^(auto|scroll)$/);
  expect(after.left).toBeGreaterThanOrEqual(-1);
  expect(after.right).toBeLessThanOrEqual(after.viewport + 1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  await attachGeometry(testInfo, 'bounded-long-table-geometry', {
    fixture: 'rv03-bounded-long-inline-code', characters: fixtureText.length, before, after,
  });
  await page.screenshot({ path: testInfo.outputPath('long-table-fixture.png') });
});

// These bounded fixtures exercise production recipes without publishing a fixture route.
test('V2 twelve appearance/accent combinations render readable controls without recoloring neutral or warning roles', async ({ page }, testInfo) => {
  await page.goto(at('/'));
  // Confirm the real React preference handler before inserting QA nodes into its managed tree.
  await page.locator('.appearance-trigger').click();
  const initialDark = page.getByRole('radio', { name: getMessages('en').nightTheme, exact: true });
  await initialDark.check();
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await initialDark.press('Escape');
  await page.evaluate(({ buttonClass, noticeClass }) => {
    const fixture = document.createElement('div'); fixture.id = 'v2-palette-fixture';
    const button = document.createElement('button'); button.className = buttonClass; button.textContent = 'QA primary action';
    const notice = document.createElement('aside'); notice.className = noticeClass; notice.textContent = 'QA warning meaning';
    fixture.append(button, notice); document.querySelector('main').append(fixture);
  }, { buttonClass: 'action action--visual_primary', noticeClass: 'reading-callout__root reading-callout__root--tone_caution' });
  const colors = ['blue', 'green', 'purple', 'orange', 'rose', 'graphite'];
  const measurements = [], neutral = new Map(), warning = new Map(), accentRoles = new Map();
  const trigger = page.locator('.appearance-trigger'), panel = page.locator('.appearance-panel');
  function contrast(first, second) {
    const luminance = value => value.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => v / 255)
      .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
      .reduce((sum, value, i) => sum + value * [0.2126, 0.7152, 0.0722][i], 0);
    const a = luminance(first), b = luminance(second); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
  for (const [label, mode] of [[getMessages('en').dayTheme, 'light'], [getMessages('en').nightTheme, 'dark']]) for (const accent of colors) {
    await trigger.click();
    await page.getByRole('radio', { name: label, exact: true }).check();
    await page.locator(`[data-accent-option="${accent}"]`).click();
    await expect(panel).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-accent', accent);
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await page.screenshot({ path: testInfo.outputPath(`appearance-${mode}-${accent}.png`) });
    await page.getByRole('radio', { name: getMessages('en').accentNames[accent], exact: true }).press('Escape');
    const fixtureButton = page.locator('#v2-palette-fixture button');
    await fixtureButton.focus();
    const read = () => page.evaluate(() => {
      const style = selector => window.getComputedStyle(document.querySelector(selector));
      const canvas = style('html'), body = style('body'), button = style('#v2-palette-fixture button');
      const link = style('.home-chapters .home-chapter-arrow'), notice = style('#v2-palette-fixture aside');
      return { canvas: canvas.backgroundColor, text: body.color, link: link.color, buttonText: button.color,
        button: button.backgroundColor, border: button.borderTopColor, outline: button.outlineColor, outlineStyle: button.outlineStyle,
        warning: [notice.color, notice.backgroundColor] };
    });
    const normal = await read();
    if (!accentRoles.has(mode)) accentRoles.set(mode, new Set());
    accentRoles.get(mode).add(normal.link);
    await fixtureButton.hover(); const hover = await read();
    expect(contrast(normal.text, normal.canvas)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(normal.link, normal.canvas)).toBeGreaterThanOrEqual(4.5);
    for (const state of [normal, hover]) {
      expect(contrast(state.buttonText, state.button)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(state.border, state.button)).toBeGreaterThanOrEqual(3);
      expect(contrast(state.border, state.canvas)).toBeGreaterThanOrEqual(3);
    }
    expect(normal.outlineStyle).not.toBe('none');
    expect(contrast(normal.outline, normal.canvas)).toBeGreaterThanOrEqual(3);
    if (neutral.has(mode)) expect(normal.canvas).toBe(neutral.get(mode)); else neutral.set(mode, normal.canvas);
    if (warning.has(mode)) expect(normal.warning).toEqual(warning.get(mode)); else warning.set(mode, normal.warning);
    await fixtureButton.evaluate(element => { element.disabled = true; });
    expect(await fixtureButton.isDisabled()).toBe(true);
    await fixtureButton.evaluate(element => { element.disabled = false; });
    measurements.push({ mode, accent, normal, hover });
  }
  for (const [mode, roles] of accentRoles) expect(roles.size, `${mode}: selecting each named accent must change its visible accent role`).toBe(colors.length);
  await attachGeometry(testInfo, 'appearance-computed-colors', measurements);
});

test('V2 native groups remain open, wrap readable names and preserve focus across actual viewport changes', async ({ page }, testInfo) => {
  for (const { locale, width } of [{locale:'en',width:1440},{locale:'zh',width:390},{locale:'en',width:320},{locale:'zh',width:320}]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(at(locale === 'en' ? '/' : '/zh/'));
    const m = getMessages(locale), trigger = page.locator('.appearance-trigger'), panel = page.locator('.appearance-panel');
    await trigger.click();
    const group = page.getByRole('group', { name: m.accentColor, exact: true });
    await expect(group.getByRole('radio')).toHaveCount(6);
    const blue = group.getByRole('radio', { name: m.accentNames.blue, exact: true });
    await blue.focus(); await blue.press('ArrowRight');
    await expect(group.getByRole('radio', { name: m.accentNames.green, exact: true })).toBeChecked();
    await expect(panel).toBeVisible();
    const light = page.getByRole('radio', { name: m.dayTheme, exact: true });
    await light.focus(); await light.press('Space');
    await expect(panel).toBeVisible(); await expect(light).toBeFocused();
    const geometry = await page.locator('.accent-option').evaluateAll(elements => elements.map(element => {
      const swatch = element.querySelector('.accent-swatch').getBoundingClientRect();
      const name = element.lastElementChild, bounds = name.getBoundingClientRect(), range = document.createRange();
      range.selectNodeContents(name);
      return { target: { width: swatch.width, height: swatch.height }, nameWidth: bounds.width,
        textWidth: Math.max(...[...range.getClientRects()].map(rect => rect.width)), lines: range.getClientRects().length };
    }));
    for (const entry of geometry) { expect(entry.target.width).toBeGreaterThanOrEqual(44); expect(entry.target.height).toBeGreaterThanOrEqual(44); expect(entry.textWidth).toBeLessThanOrEqual(entry.nameWidth); }
    await page.screenshot({ path: testInfo.outputPath(`appearance-${locale}-${width}.png`) });
    await light.press('Escape'); await expect(trigger).toBeFocused(); await expect(panel).not.toBeVisible();
    await trigger.click();
    // Deliberate outside focus must survive native light-dismiss.
    const outside = page.locator('.book-intro .actions a').first();
    await outside.evaluate(element => element.addEventListener('click', event => event.preventDefault(), { once: true }));
    await outside.click(); await expect(outside).toBeFocused();
    await expect(panel).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  }
  await page.goto(at('/')); await page.locator('.appearance-trigger').click();
  await page.locator('.appearance-panel').evaluate(panel => {
    const samples = [panel, ...panel.querySelectorAll('*')].map(element => {
      const style = window.getComputedStyle(element);
      return { element, size: parseFloat(style.fontSize), line: parseFloat(style.lineHeight) };
    });
    for (const { element, size, line } of samples) {
      element.style.fontSize = `${size * 2}px`;
      if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`;
    }
  });
  for (const label of await page.locator('.accent-option').all()) {
    const input = label.locator('input'); await input.focus(); await input.press('Space');
    await expect(input).toBeChecked();
    expect(await label.locator(':scope > span').last().evaluate(element => {
      return element.scrollWidth <= element.clientWidth && element.scrollHeight <= element.clientHeight;
    })).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  await page.screenshot({ path: testInfo.outputPath('appearance-320-enlarged.png') });
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
  const selected = page.locator('.accent-option:has(input:checked)');
  await selected.locator('input').focus();
  await expect(selected.locator('.accent-check')).toBeVisible();
  expect(await selected.locator('.accent-swatch').evaluate(e => window.getComputedStyle(e).outlineStyle)).toBe('solid');
  await page.screenshot({ path: testInfo.outputPath('appearance-forced-colors.png') });
});

test('V2 accent bootstrap, refresh, OS, cross-tab and quota failures preserve independent preferences', async ({ page, context }) => {
  await page.addInitScript(() => {
    if (!window.sessionStorage.getItem('qa-seeded')) {
      window.localStorage.setItem('btf.theme', 'system'); window.localStorage.setItem('btf.accent', 'purple'); window.sessionStorage.setItem('qa-seeded', 'true');
    }
    new window.MutationObserver(() => {
      const root = document.documentElement;
      if (!window.__qaFirstAppearance && root?.dataset.accent && root.dataset.theme) {
        window.__qaFirstAppearance = { accent: root.dataset.accent, mode: root.dataset.theme, beforeBody: !document.body };
      }
    }).observe(document, { subtree: true, attributes: true, childList: true });
  });
  await page.emulateMedia({ colorScheme: 'dark' }); await page.goto(at('/zh/read/'));
  expect(await page.evaluate(() => window.__qaFirstAppearance)).toEqual({ accent: 'purple', mode: 'dark', beforeBody: true });
  await page.emulateMedia({ colorScheme: 'light' }); await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'purple');
  await page.evaluate(() => window.__btfTheme.setPreference('dark'));
  await page.emulateMedia({ colorScheme: 'light' }); await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const other = await context.newPage();
  await other.goto(at('/'));
  await other.evaluate(() => { window.localStorage.setItem('btf.accent', 'rose'); });
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'rose');
  await other.evaluate(() => { window.sessionStorage.setItem('btf.accent', 'blue'); });
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'rose');
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-accent', 'rose');
  await other.evaluate(() => { window.localStorage.setItem('btf.accent', 'not-a-color'); });
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'blue');
  await other.evaluate(() => window.localStorage.clear());
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
  await other.close();
  await page.evaluate(() => {
    window.Storage.prototype.setItem = () => { throw new window.DOMException('QA quota', 'QuotaExceededError'); };
    window.__btfTheme.setAccent('orange');
  });
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'orange');
  await expect(page.locator('html')).toHaveAttribute('data-theme-preference', 'system');
});

for (const javaScriptEnabled of [true, false]) test(`reviewed source identity and legacy section links work with JavaScript ${javaScriptEnabled ? 'on' : 'off'}`, async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const legacyId = '关于本书的-ai-协作', canonicalId = '我为什么想写这本书';
  const observations = [];
  if (javaScriptEnabled) await page.addInitScript(() => {
    // Control the production resize-listener ordering without replacing native hash navigation.
    const add = window.addEventListener.bind(window), remove = window.removeEventListener.bind(window), wrapped = new Map();
    window.__holdFragmentResize = false; window.__fragmentResizeQueue = [];
    window.addEventListener = (type, listener, options) => {
      if (type !== 'resize' || typeof listener !== 'function') return add(type, listener, options);
      const callback = event => { if (window.__holdFragmentResize) window.__fragmentResizeQueue.push(() => listener(event)); else listener(event); };
      wrapped.set(listener, callback); return add(type, callback, options);
    };
    window.removeEventListener = (type, listener, options) => remove(type, wrapped.get(listener) ?? listener, options);
    const scroll = window.Element.prototype.scrollIntoView;
    window.__fragmentScrollCalls = 0;
    window.Element.prototype.scrollIntoView = function (...args) { window.__fragmentScrollCalls++; return scroll.apply(this, args); };
  });
  async function fragmentGeometry(id) {
    return page.evaluate(({ id, canonicalId }) => {
      const target = window.document.getElementById(id), heading = window.document.getElementById(canonicalId);
      const toolbar = window.document.querySelector('.reading-tools'), header = window.document.querySelector('.site-header');
      const stickyHeader = window.getComputedStyle(header).position === 'sticky' ? header.getBoundingClientRect().bottom : 0;
      return { width: window.innerWidth, target: id, focus: window.document.activeElement.id,
        headingTop: heading.getBoundingClientRect().top, toolbarBottom: toolbar.getBoundingClientRect().bottom,
        stickyHeader, scrollMargin: window.getComputedStyle(target).scrollMarginTop,
        compact: window.document.querySelector('.chapter-header-menu').dataset.compact,
        overflow: window.document.documentElement.scrollWidth > window.innerWidth };
    }, { id, canonicalId });
  }
  async function assertFragmentLanding(id) {
    // Observe the measured-layout repair, never accept a frame with an obscured heading.
    await expect.poll(async () => {
      const geometry = await fragmentGeometry(id);
      return geometry.focus === id && geometry.headingTop >= Math.max(geometry.toolbarBottom, geometry.stickyHeader) && !geometry.overflow;
    }, { message: `Focused fragment ${id} must clear the actual sticky surfaces` }).toBe(true);
    const geometry = await fragmentGeometry(id);
    expect(geometry.headingTop).toBeGreaterThanOrEqual(Math.max(geometry.toolbarBottom, geometry.stickyHeader));
    return geometry;
  }
  try {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      for (const id of [legacyId, canonicalId]) {
        await page.goto(`http://127.0.0.1:4179${at(chapterPath(opening))}#${encodeURIComponent(id)}`);
        const target = page.locator(`[id="${id}"]`);
        await expect(target).toBeFocused();
        await expect(page.locator('article')).toHaveAttribute('data-source-sha256', opening.sha256);
        await expect(page.locator('.reading-attribution')).toHaveCount(0);
        await expect(page.locator('.site-footer')).toBeHidden();
        await expect(page.locator('.book-info-name')).toHaveCount(2);
        for (const name of await page.locator('.book-info-name').all()) await expect(name).toHaveText('缸子太子与世界');
        await expect(page.locator('article')).toContainText('作者：缸子太子与世界');
        await expect(page.locator('article')).toContainText('这本书从资料整理、正文起草到反复修改，都有 AI 的帮助。');
        await expect(page.locator('article')).not.toContainText('创作方式：AI 全程辅助创作');
        const geometry = await assertFragmentLanding(id);
        observations.push(geometry);
        if (id === legacyId) {
          await page.screenshot({ path: testInfo.outputPath(`intake-${width}-legacy-direct.png`) });
          await expect(target).toHaveAttribute('role', 'group');
          await expect(target).toHaveAccessibleName('我为什么想写这本书');
          await page.keyboard.press('Tab');
          await expect(target.locator('.heading-link')).toBeFocused();
          await page.keyboard.press('Enter');
          await expect(page.locator(`[id="${canonicalId}"]`)).toBeFocused();
          expect(decodeURIComponent(new URL(page.url()).hash.slice(1))).toBe(canonicalId);
        }
        await page.screenshot({ path: testInfo.outputPath(`intake-${width}-${id === legacyId ? 'legacy-keyboard' : 'canonical'}.png`) });
      }
    }
    if (javaScriptEnabled) {
      for (const width of [390, 320]) {
        await page.setViewportSize({ width: 1440, height: 844 });
        await page.goto(`http://127.0.0.1:4179${at(chapterPath(opening))}#${encodeURIComponent(canonicalId)}`);
        await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
        await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'false');
        await assertFragmentLanding(canonicalId);
        await page.evaluate(() => { window.__holdFragmentResize = true; });
        await page.setViewportSize({ width, height: 844 });
        await page.goto(`http://127.0.0.1:4179${at(chapterPath(opening))}#${encodeURIComponent(legacyId)}`);
        const beforeRelease = await fragmentGeometry(legacyId);
        await page.evaluate(() => {
          window.__holdFragmentResize = false;
          window.__fragmentResizeQueue.splice(0).forEach(run => run());
        });
        await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
        observations.push({ controlledResize: width, beforeRelease, afterRelease: await assertFragmentLanding(legacyId) });
        await page.screenshot({ path: testInfo.outputPath(`fragment-controlled-${width}.png`) });
        await page.keyboard.press('Tab'); await page.keyboard.press('Enter');
        await expect(page.locator(`[id="${canonicalId}"]`)).toBeFocused();
        await assertFragmentLanding(canonicalId);
      }
      // A settled fragment does not keep owning the viewport after deliberate reading scroll.
      const position = await page.evaluate(() => window.scrollY);
      await page.mouse.move(180, 500); await page.mouse.wheel(0, 200);
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(position);
      await page.evaluate(() => { window.__fragmentScrollCalls = 0; });
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
      await page.evaluate(() => new Promise(resolve => new window.ResizeObserver((_, observer) => { observer.disconnect(); window.requestAnimationFrame(resolve); }).observe(window.document.querySelector('.reading-tools'))));
      expect(await page.evaluate(() => window.__fragmentScrollCalls)).toBe(0);
    }
    const response = await page.request.get(`http://127.0.0.1:4179${at('/search-index/zh.json')}`);
    const index = await response.json();
    expect(index.entries).toHaveLength((await loadBook()).reduce((total, chapter) => total + chapter.headingIds.length, 0));
    expect(index.entries.some(entry => entry.headingId === legacyId)).toBe(false);
    for (const entry of chapterManifest) {
      expect(index.entries.filter(item => item.chapterId === entry.id).every(item => item.sourceHash === entry.sha256)).toBe(true);
    }
    for (const locale of ['en', 'zh']) {
      const messages = getMessages(locale);
      await page.goto(`http://127.0.0.1:4179${at(locale === 'en' ? '/' : '/zh/')}`);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', messages.description);
      await expect(page.locator('h1')).toHaveText(messages.titleLines.join(''));
    }
    await attachGeometry(testInfo, 'source-intake-fragments', observations);
    expect(errors).toEqual([]);
  } finally { await context.close(); }
});

test('V2 desktop navigation resizes, collapses, hides and restores its validated width', async ({ page }, testInfo) => {
  const spacing = [];
  async function headerSpacing() {
    const measured = await page.locator('.chapter-header-links').evaluate(element => {
      const links = [...element.querySelectorAll('a')].map(link => link.getBoundingClientRect());
      return { width: window.innerWidth, cssGap: window.getComputedStyle(element).columnGap,
        gaps: links.slice(1).map((link, i) => link.left - links[i].right) };
    });
    expect(measured.gaps.every(gap => gap >= 0), 'navigation links must not overlap').toBe(true); spacing.push(measured);
  }
  await page.goto(at(chapterPath(g01))); await headerSpacing();
  const layout = page.locator('.chapter-layout'), grip = page.getByRole('separator', { name: '调整章节栏宽度' });
  await expect(layout).toHaveAttribute('data-enhanced', 'true');
  await expect(grip).toHaveAttribute('aria-valuenow', '248');
  await grip.focus(); await grip.press('ArrowRight');
  await expect(grip).toHaveAttribute('aria-valuenow', '256');
  await grip.press('End'); await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await grip.press('Home'); await expect(grip).toHaveAttribute('aria-valuenow', '224');
  await grip.press('Enter'); await expect(grip).toHaveAttribute('aria-valuenow', '248');
  let box = await grip.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + 200); await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 56, box.y + 200, { steps: 5 }); await page.mouse.up();
  await expect(grip).toHaveAttribute('aria-valuenow', '304');
  // A cancelled captured pointer must restore the prior value and leave dragging disabled.
  box = await grip.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + 200); await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 24, box.y + 200);
  await grip.dispatchEvent('pointercancel', { pointerId: 1 }); await page.mouse.up();
  await expect(grip).toHaveAttribute('aria-valuenow', '304');
  await expect(layout).toHaveAttribute('data-resizing', 'false');
  await grip.focus(); await grip.press('End');
  await page.setViewportSize({ width: 900, height: 900 });
  await expect(grip).toHaveAttribute('aria-valuenow', '300'); await headerSpacing();
  expect(await page.evaluate(() => JSON.parse(window.localStorage.getItem('btf.readerNavigation')).width)).toBe(360);
  await page.setViewportSize({ width: 1440, height: 900 }); await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await page.getByRole('button', { name: '收起章节栏', exact: true }).click();
  await expect(layout).toHaveAttribute('data-sidebar', 'collapsed');
  await expect(page.getByRole('button', { name: '展开章节栏', exact: true })).toBeFocused();
  expect(await page.locator('.book-rail').evaluate(element => element.getBoundingClientRect().width)).toBeGreaterThan(0);
  expect(await page.locator('.book-rail').evaluate(element => element.getBoundingClientRect().width)).toBeLessThan(360);
  await page.reload(); await expect(layout).toHaveAttribute('data-sidebar', 'collapsed');
  await page.getByRole('button', { name: '展开章节栏', exact: true }).click();
  await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await page.getByRole('button', { name: '隐藏章节栏', exact: true }).filter({ visible: true }).click();
  await expect(layout).toHaveAttribute('data-sidebar', 'hidden');
  await expect(page.getByRole('button', { name: '显示章节栏', exact: true })).toBeFocused();
  const index = await (await page.request.get(at('/search-index/zh.json'))).json();
  const entry = index.entries.find(entry => entry.chapterId === g01.id && entry.headingTitle.startsWith('时间'));
  await page.goto(at(entry.href));
  const target = page.locator(`[id="${entry.headingId}"]`);
  await expect(target).toBeFocused();
  await expect(layout).toHaveAttribute('data-sidebar', 'hidden');
  const geometry = await target.evaluate(element => ({ top: element.getBoundingClientRect().top,
    header: window.document.querySelector('.site-header').getBoundingClientRect().bottom,
    tools: window.document.querySelector('.reading-tools').getBoundingClientRect().bottom }));
  expect(geometry.top).toBeGreaterThanOrEqual(Math.max(geometry.header, geometry.tools));
  await page.getByRole('button', { name: '显示章节栏', exact: true }).click();
  await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await page.getByRole('button', { name: '重置宽度', exact: true }).click(); await expect(grip).toHaveAttribute('aria-valuenow', '248');
  await attachGeometry(testInfo, 'restored-sidebar-fragment', geometry);
  await attachGeometry(testInfo, 'desktop-header-spacing', spacing);
});

test('V2 chapter navigation remains usable with invalid or denied preference storage', async ({ page }) => {
  await page.goto(at(chapterPath(g01)));
  await page.evaluate(() => window.localStorage.setItem('btf.readerNavigation', '{"mode":"hidden","width":"100vw"}'));
  await page.reload();
  await expect(page.getByRole('separator', { name: '调整章节栏宽度' })).toHaveAttribute('aria-valuenow', '248');
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { configurable: true, get() { throw new Error('QA denied'); } }));
  await page.reload();
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-sidebar', 'expanded');
  await page.getByRole('button', { name: '收起章节栏', exact: true }).click();
  await expect(page.getByRole('button', { name: '展开章节栏', exact: true })).toBeFocused();
  await page.getByRole('button', { name: '展开章节栏', exact: true }).click();
  const grip = page.getByRole('separator', { name: '调整章节栏宽度' });
  await grip.focus(); await grip.press('ArrowRight'); await expect(grip).toHaveAttribute('aria-valuenow', '256');
});

test('V2 nearby navigation closes without scrolling, coordinates overlays and reconciles breakpoint focus', async ({ page }) => {
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(at(chapterPath(g01)));
    const book = page.locator('.mobile-book-navigation details'), summary = book.locator('summary');
    const outline = page.locator('.mobile-outline details'), outlineSummary = outline.locator('summary');
    await outlineSummary.click();
    const section = outline.getByRole('link', { name: '时间：先发生什么，用户要等到哪里？', exact: true });
    const id = decodeURIComponent((await section.getAttribute('href')).slice(1));
    await section.click(); await expect(page.locator(`[id="${id}"]`)).toBeFocused();
    const position = await page.evaluate(() => window.scrollY);
    await summary.focus(); await summary.press('Enter');
    await expect(book).toHaveAttribute('open', '');
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
    const current = book.getByRole('link', { name: new RegExp(g01.title) });
    await current.focus(); await current.press('Escape'); await expect(summary).toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
    await summary.press('Enter'); await outlineSummary.click();
    await expect(book).not.toHaveAttribute('open', ''); await expect(outline).toHaveAttribute('open', '');
    await outlineSummary.press('Escape');
    await summary.focus(); await summary.press('Enter');
    await page.keyboard.press('Control+k'); await expect(page.getByRole('dialog')).toBeVisible();
    await expect(book).not.toHaveAttribute('open', ''); await page.keyboard.press('Escape');
    await summary.focus(); await summary.press('Enter'); await current.focus();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(book).not.toHaveAttribute('open', ''); await expect(page.locator('#main')).toBeFocused();
    const grip = page.getByRole('separator', { name: '调整章节栏宽度' }); await grip.focus();
    await page.setViewportSize({ width, height: 844 }); await expect(summary).toBeFocused();
    // A resize reflows earlier prose and the responsive figure. The current heading must remain readable.
    const heading = page.locator(`[id="${id}"]`);
    await expect(heading).toBeInViewport({ ratio: 1 });
    await expect.poll(() => heading.evaluate(element => element.getBoundingClientRect().top -
      window.document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(0);
    expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const menu = page.locator('.chapter-header-menu'), menuSummary = menu.locator('summary');
    await menuSummary.click(); await expect(menu).toHaveAttribute('open', '');
    const menuPosition = await page.evaluate(() => window.scrollY);
    await menuSummary.press('Escape'); await expect(menuSummary).toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(menuPosition);
    await menuSummary.press('Enter'); await page.keyboard.press('Control+k');
    await expect(menu).not.toHaveAttribute('open', ''); await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await menuSummary.click(); await page.locator('.appearance-trigger').click();
    await expect(menu).not.toHaveAttribute('open', ''); await expect(page.locator('.appearance-panel')).toBeVisible();
    await summary.focus(); await summary.press('Enter');
    await expect(page.locator('.appearance-panel')).not.toBeVisible(); await expect(book).toHaveAttribute('open', '');
    await summary.press('Escape');
    await menuSummary.click(); await menu.getByRole('link', { name: 'Switch to English', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${at('/read/')}$`));
    await page.locator('.available-chapters a').nth(1).click();
    await expect(page.locator('article')).toHaveAttribute('data-chapter-id', g01.id);
    await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
  }
});

test('V2 real chapter remains readable across appearances, accents, widths and enlarged text', async ({ page }, testInfo) => {
  const measurements = [];
  for (const [width, mode] of [[1440,'light'],[900,'dark'],[768,'light'],[390,'dark'],[320,'light']]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(at(chapterPath(g01)));
    await page.evaluate(({ mode }) => { window.__btfTheme.setPreference(mode); window.__btfTheme.setAccent(mode === 'light' ? 'blue' : 'purple'); }, { mode });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await expect(page.locator('html')).toHaveAttribute('data-accent', mode === 'light' ? 'blue' : 'purple');
    await expect(page.locator('article h1')).toHaveText(g01.title);
    await expect(page.locator('article')).toHaveAttribute('data-source-sha256', g01.sha256);
    await expect(page.locator('.chapter-context')).toHaveText('中文 · 完整版');
    await expect(page.locator('#reader-book-navigation')).toContainText('第八部分');
    const geometry = await page.evaluate(() => {
      const article = window.document.querySelector('article'), header = window.document.querySelector('.site-header');
      return { width: window.innerWidth, article: article.getBoundingClientRect().width,
        header: header.getBoundingClientRect().height, overflow: window.document.documentElement.scrollWidth > window.innerWidth,
        rail: window.document.querySelector('.book-rail').getBoundingClientRect().width,
        firstParagraphTop: article.querySelector(':scope > p').getBoundingClientRect().top };
    });
    expect(geometry.overflow).toBe(false); expect(geometry.article).toBeGreaterThan(0); expect(geometry.article).toBeLessThanOrEqual(geometry.width); measurements.push({ mode, ...geometry });
    if ([1440, 390, 320].includes(width)) await page.screenshot({ path: testInfo.outputPath(`reader-${width}-${mode}.png`) });
    for (const surface of await page.locator('article pre, article [role="region"]').all()) {
      await surface.scrollIntoViewIfNeeded(); await surface.focus();
      expect(await surface.evaluate(element => element.scrollWidth >= element.clientWidth)).toBe(true);
      expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  }
  await page.setViewportSize({ width: 320, height: 844 }); await page.goto(at(chapterPath(g01)));
  await page.evaluate(() => {
    const elements = [...window.document.querySelectorAll('.site-header, .site-header a, .site-header button, article, article h1, article h2, .reading-tools summary')];
    const styles = elements.map(element => ({ element, size: parseFloat(window.getComputedStyle(element).fontSize), line: parseFloat(window.getComputedStyle(element).lineHeight) }));
    for (const { element, size, line } of styles) { element.style.fontSize = `${size * 2}px`; if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`; }
  });
  expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  const headerControls = await page.locator('.wordmark, .search-trigger, .chapter-header-menu > summary, .appearance-trigger').evaluateAll(elements => elements.map(element => {
    const { left, right, top, bottom } = element.getBoundingClientRect(); return { left, right, top, bottom };
  }));
  for (let i = 0; i < headerControls.length; i++) for (let j = i + 1; j < headerControls.length; j++) {
    const a = headerControls[i], b = headerControls[j];
    expect(Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1).toBe(false);
  }
  await page.screenshot({ path: testInfo.outputPath('reader-320-enlarged-entry.png') });
  await page.locator('.mobile-outline summary').click();
  const link = page.locator('.mobile-outline a').last(), id = decodeURIComponent((await link.getAttribute('href')).slice(1));
  await link.click(); const heading = page.locator(`[id="${id}"]`); await expect(heading).toBeFocused();
  expect(await heading.evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(await page.locator('.reading-tools').evaluate(element => element.getBoundingClientRect().bottom));
  await page.screenshot({ path: testInfo.outputPath('reader-320-enlarged.png') });
  await attachGeometry(testInfo, 'reader-widths', measurements);
});

test('V2 static navigation retains real chapters and headings without JavaScript', { tag: '@smoke' }, async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await page.goto(`http://127.0.0.1:4179${at(chapterPath(opening))}`);
    await page.locator('.mobile-book-navigation summary').click();
    await page.locator('.mobile-book-navigation').getByRole('link', { name: new RegExp(g01.title) }).click();
    await expect(page.locator('article h1')).toHaveText(g01.title);
    await page.locator('.mobile-outline summary').click();
    const link = page.locator('.mobile-outline a').last(), id = decodeURIComponent((await link.getAttribute('href')).slice(1));
    await link.click(); await expect(page.locator(`[id="${id}"]`)).toBeFocused();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.getByRole('separator', { name: '调整章节栏宽度' })).not.toBeVisible();
    await page.locator('.book-rail').getByRole('link', { name: new RegExp(browserChapter.title) }).click();
    await expect(page.locator('article')).toHaveAttribute('data-source-sha256', browserChapter.sha256);
    expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
  } finally { await context.close(); }
});


test('V2 breakpoint focus does not override a deliberate click away from the desktop grip', async ({ page }) => {
  await page.goto(at(chapterPath(g01)));
  const grip = page.getByRole('separator', { name: '调整章节栏宽度' });
  await grip.focus(); await expect(grip).toBeFocused();
  await page.locator('.site-header').click({ position: { x: 490, y: 31 } });
  await expect(page.locator('body')).toBeFocused();
  const position = await page.evaluate(() => window.scrollY);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.mobile-book-navigation summary')).not.toBeFocused();
  await expect(page.locator('body')).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(position);
});


test('V2 home uses approved local art and real localized reading rows across viewports and appearance', async ({ page }, testInfo) => {
  const observations = [];
  for (const locale of ['en', 'zh']) for (const [width, mode] of [[1440,'light'],[390,'dark'],[320,'light']]) {
    const m = getMessages(locale), copy = homeContent[locale];
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(at(locale === 'en' ? '/' : '/zh/'));
    await page.evaluate(mode => { window.__btfTheme.setPreference(mode); window.__btfTheme.setAccent(mode === 'light' ? 'green' : 'purple'); }, mode);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await expect(page.locator('html')).toHaveAttribute('data-accent', mode === 'light' ? 'green' : 'purple');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(m.titleLines.join(''));
    await expect(page.locator('.home-hero-copy .intro')).toHaveText(m.description);
    await expect(page.locator('.home-chapters a')).toHaveCount(chapterManifest.length);
    await expect(page.locator('.home-hero-copy .eyebrow')).toHaveCount(0);
    await expect(page.locator('.home-chapters li')).toHaveCount(chapterManifest.length);
    await expect(page.locator('.home-chapters li > div > span, .home-sidebar .reading-nav__availability')).toHaveCount(0);
    await expect(page.locator('.home-topics li p')).toHaveCount(0);
    await expect(page.locator('.home-topics li')).toHaveCount(8);
    await expect(page.locator('.home-topics a')).toHaveCount(8);
    const image = page.getByRole('img', { name: copy.illustrationAlt, exact: true });
    await image.scrollIntoViewIfNeeded(); await image.evaluate(element => element.decode());
    const geometry = await image.evaluate(element => {
      const bounds = element.getBoundingClientRect(), list = window.document.querySelector('.home-chapters').getBoundingClientRect();
      return { source: new URL(element.currentSrc).pathname, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight,
        width: bounds.width, height: bounds.height, left: bounds.left, right: bounds.right, chapterTop: list.top, top: bounds.top,
        overflow: window.document.documentElement.scrollWidth > window.innerWidth };
    });
    const mobile = width < 900;
    expect(geometry.source.startsWith(at('/illustrations/'))).toBe(true);
    expect(geometry.naturalWidth).toBeGreaterThan(0); expect(geometry.naturalHeight).toBeGreaterThan(0);
    expect(geometry.width / geometry.height).toBeCloseTo(geometry.naturalWidth / geometry.naturalHeight, 2);
    expect(geometry.width).toBeGreaterThan(0); expect(geometry.left).toBeGreaterThanOrEqual(0); expect(geometry.right).toBeLessThanOrEqual(width);
    expect(geometry.overflow).toBe(false);
    if (mobile) expect(geometry.top).toBeGreaterThan(geometry.chapterTop);
    observations.push({ locale, mode, viewport: width, ...geometry });
    await page.evaluate(() => window.scrollTo(0, 0));
    if ([1440, 390, 320].includes(width)) await page.screenshot({ path: testInfo.outputPath(`home-${locale}-${width}-${mode}.png`), fullPage: true });
  }
  await attachGeometry(testInfo, 'home-assets-geometry', observations);
});

test('V2 home keyboard navigation, real search, language menu and enlarged text preserve usable links', async ({ page }, testInfo) => {
  for (const locale of ['en', 'zh']) {
    const m = getMessages(locale), copy = homeContent[locale];
    await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(at(locale === 'en' ? '/' : '/zh/'));
    const sidebar = page.locator('.home-navigation'), summary = sidebar.locator('summary');
    const expandedWidth = await page.locator('.home-sidebar').evaluate(element => element.getBoundingClientRect().width);
    await summary.focus(); await summary.press('Enter'); await expect(sidebar).not.toHaveAttribute('open', '');
    expect(await page.locator('.home-sidebar').evaluate(element => element.getBoundingClientRect().width)).toBeGreaterThan(0);
    expect(await page.locator('.home-sidebar').evaluate(element => element.getBoundingClientRect().width)).toBeLessThan(expandedWidth);
    await summary.press('Enter'); await expect(sidebar).toHaveAttribute('open', '');
    expect(await page.locator('.home-sidebar').evaluate(element => element.getBoundingClientRect().width)).toBeCloseTo(expandedWidth, 0);
    const first = page.getByRole('link', { name: copy.read, exact: true });
    await first.focus(); await first.press('Enter'); await expect(page.locator('article')).toHaveAttribute('data-chapter-id', opening.id);
    await page.goto(at(locale === 'en' ? '/' : '/zh/'));
    await page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true }).click();
    const dialog = page.getByRole('dialog');
    if (locale === 'zh') {
      await dialog.getByRole('searchbox').fill('报名'); await expect(dialog.locator('.search-results a')).toHaveCount(112);
    } else await expect(dialog).toContainText('English');
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
    await expect(page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true })).toBeFocused();
    await page.setViewportSize({ width: 320, height: 844 });
    const menu = page.locator('.chapter-header-menu'), menuSummary = menu.locator('summary');
    await expect(menu).toHaveAttribute('data-compact', 'true'); await expect(menuSummary).toBeVisible();
    await menuSummary.focus(); await menuSummary.press('Enter'); await expect(menu).toHaveAttribute('open', '');
    await menuSummary.press('Escape'); await expect(menuSummary).toBeFocused();
    await menuSummary.press('Enter');
    await menu.getByRole('link', { name: m.switchLabel, exact: true }).click();
    const targetLocale = locale === 'en' ? 'zh' : 'en', targetMessages = getMessages(targetLocale);
    await expect(page).toHaveURL(new URL(at(targetLocale === 'zh' ? '/zh/' : '/'), page.url()).href);
    await expect(page.locator('html')).toHaveAttribute('lang', targetMessages.lang);
    await expect(page.locator('#book-title')).toBeVisible();
    await expect(page.locator('#book-title')).toHaveText(targetMessages.titleLines.join(''));
  }
  await page.goto(at('/zh/'));
  await page.evaluate(() => {
    const elements = [...window.document.querySelectorAll('.site-header, .site-header a, .site-header button, .home-hero-copy h1, .home-hero-copy .intro, .home-chapters a')];
    const sizes = elements.map(element => ({ element, size: parseFloat(window.getComputedStyle(element).fontSize), line: parseFloat(window.getComputedStyle(element).lineHeight) }));
    for (const { element, size, line } of sizes) { element.style.fontSize = `${size * 2}px`; if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`; }
  });
  expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  for (const link of await page.locator('.home-chapters a').all()) { await link.focus(); await expect(link).toBeFocused(); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.screenshot({ path: testInfo.outputPath('home-320-enlarged.png'), fullPage: true });
});


test('V2 homepage keeps native art, chapter links and desktop collapse available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    for (const locale of ['en', 'zh']) {
      await page.setViewportSize({ width: 390, height: 844 }); await page.goto(`http://127.0.0.1:4179${at(locale === 'en' ? '/' : '/zh/')}`);
      await expect(page.locator('.home-chapters a')).toHaveCount(chapterManifest.length);
      await expect(page.getByRole('img', { name: homeContent[locale].illustrationAlt })).toBeVisible();
      const switchLink = page.getByRole('link', { name: getMessages(locale).switchLabel, exact: true });
      await expect(switchLink).toBeVisible();
      expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.locator('.home-navigation > summary').click();
      await expect(page.locator('.home-navigation')).not.toHaveAttribute('open', '');
      await page.locator('.home-navigation > summary').click();
      await page.locator('.home-chapters a').last().click();
      await expect(page.locator('article')).toHaveAttribute('data-source-sha256', closing.sha256);
    }
  } finally { await context.close(); }
});

test('exact chapter-title search keeps chapter and real H1 destinations distinct through mouse and keyboard navigation', async ({ page }, testInfo) => {
  const index = await (await page.request.get(at('/search-index/zh.json'))).json();
  const h1 = index.entries.find(entry => entry.chapterId === browserChapter.id && entry.headingTitle === browserChapter.title);
  const deep = index.entries.find(entry => entry.chapterId === browserChapter.id && entry.headingId !== h1.headingId);
  const observations = [];
  for (const width of [1440, 390, 320]) for (const samePage of [false, true]) for (const kind of ['chapter', 'section']) for (const method of ['mouse', 'keyboard']) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(at(samePage ? deep.href : chapterPath(g01)));
    const dialog = await openSearch(page), input = dialog.getByRole('searchbox');
    await input.fill(width === 320 ? `  ${browserChapter.title.normalize('NFKC')}  ` : browserChapter.title);
    await expect(dialog.getByRole('status')).toHaveText('2 条匹配 · 中文完整版');
    await expect(dialog.locator('.search-results a')).toHaveCount(2);
    const chapterResult = dialog.locator('[data-search-kind="chapter"] a'), sectionResult = dialog.locator('[data-search-kind="section"] a');
    await expect(chapterResult).toHaveAttribute('href', at(chapterPath(browserChapter)));
    await expect(sectionResult).toHaveAttribute('href', at(h1.href));
    await expect(chapterResult.locator('span')).toHaveText('章节入口');
    await expect(sectionResult.locator('span')).toHaveText('小节');
    await expect(sectionResult.locator('mark')).toHaveCount(1);
    for (const result of [chapterResult, sectionResult]) await expect(result.locator('strong mark')).toHaveText(browserChapter.title);
    expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    if (!samePage && kind === 'chapter' && method === 'mouse') await page.screenshot({ path: testInfo.outputPath(`exact-title-${width}.png`) });
    const target = kind === 'chapter' ? chapterResult : sectionResult;
    if (method === 'mouse') await target.click();
    else {
      await input.press('ArrowDown'); if (kind === 'section') await page.keyboard.press('ArrowDown');
      await expect(target).toBeFocused(); await page.keyboard.press('Enter');
    }
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page).toHaveURL(new URL(at(kind === 'chapter' ? chapterPath(browserChapter) : h1.href), page.url()).href);
    const heading = page.locator(`article [id="${h1.headingId}"]`);
    await expect(heading).toBeFocused();
    await expect(page.locator('article')).toHaveAttribute('data-source-sha256', browserChapter.sha256);
    await expect.poll(() => heading.evaluate(element => {
      const tools = window.document.querySelector('.reading-tools'), header = window.document.querySelector('.site-header');
      return element.getBoundingClientRect().top >= Math.max(tools.getBoundingClientRect().bottom,
        window.getComputedStyle(header).position === 'sticky' ? header.getBoundingClientRect().bottom : 0);
    })).toBe(true);
    observations.push({ width, samePage, kind, method, url: page.url(), focus: await heading.getAttribute('id') });
  }
  // The input's direct Enter route uses the grouped chapter, with no fragment manufactured.
  await page.goto(at(chapterPath(g01))); const dialog = await openSearch(page);
  await dialog.getByRole('searchbox').fill(browserChapter.title); await expect(dialog.locator('.search-results a')).toHaveCount(2);
  await dialog.getByRole('searchbox').press('Enter');
  await expect(page).toHaveURL(new URL(at(chapterPath(browserChapter)), page.url()).href);
  await expect(page.locator('article h1')).toBeFocused();
  // A differently titled section still needs its chapter context above the heading.
  const sectionDialog = await openSearch(page);
  await sectionDialog.getByRole('searchbox').fill(deep.headingTitle);
  const distinctSection = sectionDialog.locator(`[data-search-kind="section"] a[href="${at(deep.href)}"]`);
  await expect(distinctSection.locator('span')).toHaveText(`小节 · ${browserChapter.title}`);
  await expect(distinctSection.locator('strong')).toHaveText(deep.headingTitle);
  await page.keyboard.press('Escape');
  await attachGeometry(testInfo, 'exact-title-navigation', observations);
});

test('a pending chapter result never takes focus back from a later search interaction', async ({ page }) => {
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  let held = 0;
  await page.route('**/*', async route => {
    if (new URL(route.request().url()).pathname.includes('/zh/read/browser-foundations')) { held++; await gate; }
    await route.continue();
  });
  try {
    await page.goto(at(chapterPath(g01)));
    const dialog = await openSearch(page);
    await dialog.getByRole('searchbox').fill(browserChapter.title);
    await expect(dialog.locator('.search-results a')).toHaveCount(2);
    await dialog.locator('[data-search-kind="chapter"] a').click();
    await expect(dialog).not.toBeVisible();
    await expect.poll(() => held).toBeGreaterThan(0);
    await page.getByRole('button', { name: '搜索章节', exact: true }).click();
    await expect(dialog).toBeVisible(); await expect(dialog.getByRole('searchbox')).toBeFocused();
    release();
    await expect(page.locator('article')).toHaveAttribute('data-chapter-id', browserChapter.id);
    await expect(page).toHaveURL(new URL(at(chapterPath(browserChapter)), page.url()).href);
    await expect(dialog).toBeVisible(); await expect(dialog.getByRole('searchbox')).toBeFocused();
    await expect(page.locator('article h1')).not.toBeFocused();
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
  } finally { release(); }
});

test('V2 directory shows only real localized Chinese reading rows across viewports and appearances', async ({ page }, testInfo) => {
  const observations = [];
  for (const locale of ['en', 'zh']) for (const [width, mode] of [[1440,'light'],[390,'dark'],[320,'light']]) {
    const m = getMessages(locale);
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ colorScheme: mode });
    await page.goto(at(locale === 'en' ? '/read/' : '/zh/read/'));
    await expect(page).toHaveTitle(`${m.contents} | ${m.title}`);
    await expect(page.locator('html')).toHaveAttribute('lang', m.lang);
    await expect(page.locator('html')).toHaveAttribute('data-theme', mode);
    await expect(page.locator('#contents-title')).toHaveText(m.directory.title);
    await expect(page.locator('.reading-index > .availability-note')).toHaveText(m.availableNotice(chapterManifest.length));
    await expect(page.locator('#directory-available')).toHaveText(m.directory.available);
    const links = page.locator('.available-chapters a');
    await expect(links).toHaveCount(chapterManifest.length);
    for (const [index, chapter] of chapterManifest.entries()) {
      await expect(links.nth(index)).toHaveAttribute('href', at(chapterPath(chapter)));
      await expect(links.nth(index)).toHaveAttribute('hreflang', 'zh');
      await expect(links.nth(index)).toHaveAccessibleName(m.chapterLabels[chapter.id] ?? chapter.title);
      await expect(links.nth(index)).toHaveAccessibleDescription(m.chineseEdition);
      await expect(links.nth(index).locator('.directory-chapter-language')).toHaveText(`${m.directory.openChinese} →`);
      if (m.chapterBenefits[chapter.id]) await expect(page.locator('.available-chapters li').nth(index).locator('p')).toHaveText(m.chapterBenefits[chapter.id]);
      expect((await links.nth(index).boundingBox()).height).toBeGreaterThanOrEqual(44);
    }
    await expect(page.locator('.directory-chapters h3')).toHaveText(readingParts(chapterManifest, locale).map(part => part.title));
    if (locale === 'en') await expect(page.locator('.reading-index')).toContainText(m.englishUnavailable);
    const sidebar = page.locator('.directory-sidebar');
    if (width === 1440) {
      await expect(sidebar).toBeVisible();
      await expect(sidebar.getByRole('link', { name: m.contents, exact: true })).toHaveAttribute('aria-current', 'page');
      await expect(sidebar.getByRole('link', { name: homeContent[locale].overview, exact: true })).toHaveAttribute('href', at(locale === 'en' ? '/' : '/zh/'));
      expect((await sidebar.boundingBox()).width).toBeGreaterThan(0);
    } else await expect(sidebar).not.toBeVisible();
    const geometry = await page.locator('.reading-index').evaluate(element => {
      const rect = element.getBoundingClientRect(), style = window.getComputedStyle(element);
      return { left: rect.left, width: rect.width, color: style.color, background: window.getComputedStyle(window.document.body).backgroundColor,
        scrollWidth: window.document.documentElement.scrollWidth };
    });
    expect(geometry.scrollWidth).toBeLessThanOrEqual(width);
    observations.push({ locale, mode, width, ...geometry });
    await page.screenshot({ path: testInfo.outputPath(`directory-${locale}-${width}-${mode}.png`), fullPage: true });
  }
  await attachGeometry(testInfo, 'directory-geometry', observations);
});

test('V2 directory keyboard links, locale changes, search, appearance and enlarged text remain usable', async ({ page }, testInfo) => {
  for (const locale of ['en', 'zh']) {
    const m = getMessages(locale), route = at(locale === 'en' ? '/read/' : '/zh/read/');
    await page.setViewportSize({ width: 1440, height: 950 });
    for (const [index, chapter] of chapterManifest.entries()) {
      await page.goto(route);
      const link = page.locator('.available-chapters a').nth(index);
      await link.focus(); await expect(link).toBeFocused(); await link.press('Enter');
      await expect(page).toHaveURL(new URL(at(chapterPath(chapter)), page.url()).href);
      await expect(page.locator('article')).toHaveAttribute('data-source-sha256', chapter.sha256);
    }
    await page.goto(route);
    await page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true }).click();
    const dialog = page.getByRole('dialog'); await expect(dialog).toBeVisible();
    if (locale === 'zh') {
      await dialog.getByRole('searchbox').fill('报名'); await expect(dialog.locator('.search-results a')).toHaveCount(112);
    } else await expect(dialog).toContainText('English');
    await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
    await expect(page.getByRole('button', { name: locale === 'en' ? 'Search chapters' : '搜索章节', exact: true })).toBeFocused();
    await page.getByRole('button', { name: new RegExp(m.appearance) }).click();
    await page.getByRole('radio', { name: m.nightTheme, exact: true }).check();
    await page.keyboard.press('Escape');
    await page.reload(); await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.setViewportSize({ width: 320, height: 844 });
    await page.getByRole('link', { name: m.switchLabel, exact: true }).click();
    const targetLocale = locale === 'en' ? 'zh' : 'en', target = getMessages(targetLocale);
    await expect(page).toHaveURL(new URL(at(targetLocale === 'zh' ? '/zh/read/' : '/read/'), page.url()).href);
    await expect(page.locator('html')).toHaveAttribute('lang', target.lang);
    await expect(page.locator('#contents-title')).toHaveText(target.directory.title);
    await page.goto(route);
    await page.evaluate(() => {
      const root = window.document.querySelector('.reading-index');
      const sizes = [...root.querySelectorAll('h1, h2, p, a, span, li')].map(element => {
        const style = window.getComputedStyle(element);
        return { element, size: parseFloat(style.fontSize), line: parseFloat(style.lineHeight) };
      });
      for (const { element, size, line } of sizes) {
        element.style.fontSize = `${size * 2}px`; if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`;
      }
    });
    expect(await page.evaluate(() => window.document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    for (const link of await page.locator('.available-chapters a').all()) { await link.focus(); await expect(link).toBeFocused(); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: testInfo.outputPath(`directory-${locale}-320-enlarged.png`), fullPage: true });
  }
});

test('V2 directory retains real chapter routes and bilingual 404 without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
  const page = await context.newPage();
  try {
    for (const locale of ['en', 'zh']) {
      await page.goto(at(locale === 'en' ? '/read/' : '/zh/read/'));
      await expect(page.locator('#contents-title')).toHaveText(getMessages(locale).directory.title);
      const links = page.locator('.available-chapters a'); await expect(links).toHaveCount(chapterManifest.length);
      await links.last().click(); await expect(page.locator('article')).toHaveAttribute('data-source-sha256', closing.sha256);
      await page.setViewportSize({ width: 1440, height: 950 });
      await page.goto(at(locale === 'en' ? '/read/' : '/zh/read/'));
      await page.locator('.directory-sidebar a').first().click();
      await expect(page.locator('#book-title')).toBeVisible();
      await page.setViewportSize({ width: 320, height: 844 });
    }
    const response = await page.goto(at('/missing-directory-regression/'));
    expect(response.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
    await expect(page.locator('body')).toContainText('这一页还没找到');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  } finally { await context.close(); }
});

test('repeating the current native section remeasures enlarged tools without a hashchange or overriding later intent', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    window.__holdSameFragmentResize = false; window.__sameFragmentResizeQueue = []; window.__sameFragmentHashChanges = 0;
    const OriginalResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        super((entries, observer) => {
          if (window.__holdSameFragmentResize && entries.some(entry => entry.target.matches('.reading-tools'))) {
            window.__sameFragmentResizeQueue.push(() => callback(entries, observer));
          } else callback(entries, observer);
        });
      }
    };
    window.addEventListener('hashchange', () => window.__sameFragmentHashChanges++);
    const scroll = window.Element.prototype.scrollIntoView;
    window.__sameFragmentScrollCalls = 0;
    window.Element.prototype.scrollIntoView = function (...args) { window.__sameFragmentScrollCalls++; return scroll.apply(this, args); };
  });
  const observations = [];
  for (const method of ['mouse', 'keyboard']) for (let repetition = 0; repetition < 3; repetition++) {
    await page.setViewportSize({ width: 320, height: 844 }); await page.goto(at(chapterPath(g01)));
    const summary = page.locator('.mobile-outline summary'); await summary.click();
    const link = page.locator('.mobile-outline').getByRole('link', { name: '时间：先发生什么，用户要等到哪里？', exact: true });
    const id = decodeURIComponent((await link.getAttribute('href')).slice(1)), heading = page.locator(`[id="${id}"]`);
    await link.click(); await expect(heading).toBeFocused();
    await expect.poll(() => page.evaluate(() => window.__sameFragmentHashChanges)).toBe(1);
    const destination = page.url();
    await summary.focus(); await summary.press('Enter'); await summary.press('Escape'); await expect(summary).toBeFocused();
    await page.locator('.reading-tools').evaluate(element => {
      window.__holdSameFragmentResize = true; window.__sameFragmentHashChanges = 0;
      const samples = [...element.querySelectorAll('summary')].map(node => ({ node,
        size: parseFloat(window.getComputedStyle(node).fontSize), line: parseFloat(window.getComputedStyle(node).lineHeight) }));
      for (const { node, size, line } of samples) { node.style.fontSize = `${size * 2}px`; node.style.lineHeight = `${line * 2}px`; }
    });
    await summary.press('Enter'); await expect(link).toBeVisible();
    if (method === 'mouse') await link.click();
    else { await link.focus(); await link.press('Enter'); }
    await expect(heading).toBeFocused(); await expect(page).toHaveURL(destination);
    await expect.poll(() => heading.evaluate(element => element.getBoundingClientRect().top >=
      window.document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.__sameFragmentResizeQueue.length)).toBeGreaterThan(0);
    await page.evaluate(() => {
      window.__holdSameFragmentResize = false; window.__sameFragmentResizeQueue.splice(0).forEach(run => run());
    });
    const geometry = await heading.evaluate(element => ({ top: element.getBoundingClientRect().top,
      bottom: window.document.querySelector('.reading-tools').getBoundingClientRect().bottom,
      focus: window.document.activeElement === element, hashChanges: window.__sameFragmentHashChanges }));
    expect(geometry.top).toBeGreaterThanOrEqual(geometry.bottom); expect(geometry.hashChanges).toBe(0);
    observations.push({ method, repetition, ...geometry });
    // A canceled click, even canceled by a later window listener, must not re-arm correction.
    await heading.evaluate(element => {
      window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' }));
      window.scrollTo(0, 0); element.focus({ preventScroll: true }); window.__sameFragmentScrollCalls = 0;
      const anchor = window.document.querySelector('.mobile-outline a[href="' + window.location.hash + '"]');
      window.addEventListener('click', event => event.preventDefault(), { once: true });
      anchor.dispatchEvent(new window.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
    });
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
    expect(await page.evaluate(() => window.__sameFragmentScrollCalls)).toBe(0);
    if (repetition === 0) {
      await summary.focus(); await summary.press('Enter'); await expect(link).toBeVisible();
      await page.evaluate(() => { window.__sameFragmentScrollCalls = 0; });
      await link.click({ modifiers: ['ControlOrMeta'] });
      for (const other of page.context().pages()) if (other !== page) await other.close();
      await expect(page).toHaveURL(destination);
      expect(await page.evaluate(() => window.__sameFragmentScrollCalls)).toBe(0);
    }
    // Real wheel intent also releases a successful repeated-fragment landing before a later resize.
    await summary.focus(); await summary.press('Enter'); await expect(link).toBeVisible(); await link.click();
    await expect(heading).toBeFocused();
    await expect.poll(() => heading.evaluate(element => element.getBoundingClientRect().top >=
      window.document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBe(true);
    const position = await page.evaluate(() => window.scrollY);
    await page.mouse.move(180, 500); await page.mouse.wheel(0, 160);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(position);
    await page.evaluate(() => { window.__sameFragmentScrollCalls = 0; });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => new Promise(resolve => new window.ResizeObserver((_, observer) => {
      observer.disconnect(); window.requestAnimationFrame(resolve);
    }).observe(window.document.querySelector('.reading-tools'))));
    expect(await page.evaluate(() => window.__sameFragmentScrollCalls)).toBe(0);
  }
  await attachGeometry(testInfo, 'repeated-fragment-landing', observations);
});

test('Closing sections, chapter cross-links, the supplemental figure and old shared fragments remain directly reachable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto(at('/zh/read/'));
  const closingLinks = page.locator('.closing-sections a');
  await expect(closingLinks).toHaveCount(3);
  await closingLinks.last().click();
  await expect(page.getByRole('heading', { name: '我去钓会儿鱼' })).toBeInViewport();
  await expect(page.locator('.chapter-pagination [rel="next"]')).toHaveCount(0);
  await expect(page.locator('.chapter-pagination')).toContainText('已到当前最后一章');
  for (const { chapterId, legacyId, headingId } of legacyHeadingAliases) {
    const chapter = chapterManifest.find(entry => entry.id === chapterId);
    await page.goto(at(chapterPath(chapter) + '#' + encodeURIComponent(legacyId)));
    await expect(page.locator(`[id="${legacyId}"]`)).toBeFocused();
    const heading = page.locator(`[id="${headingId}"]`);
    await expect(heading).toBeInViewport({ ratio: 1 });
    await expect.poll(() => heading.evaluate(element =>
      element.getBoundingClientRect().top - window.document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(0);
  }
  await page.goto(at(chapterPath(opening)));
  await page.locator('article').getByRole('link', { name: '老师合上电脑之后，谁还在转那份讲义' }).click();
  await expect(page.locator('article')).toHaveAttribute('data-chapter-id', 'p5-handout-job');
  await page.goto(at(chapterPath(g01)));
  const figure = page.locator('.enrolment-figure');
  await expect(figure.getByRole('img')).toHaveAccessibleName(homeContent.zh.illustrationAlt);
  await expect(figure.locator('figcaption')).toHaveText(homeContent.zh.exampleCaption);
  const svg = await figure.getByRole('img').evaluate(async image => { await image.decode(); return new URL(image.currentSrc).pathname; });
  expect(svg).toBe(at('/illustrations/home-systems-mobile.svg'));
});

test('the paper prototype opens its authored states and returns, and the approved A5 downloads', async ({ page }) => {
  const prototype = chapterManifest.find(entry => entry.id === 'p2-one-less-click');
  const route = at(chapterPath(prototype));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route + '#' + encodeURIComponent('甲版列表'));
  const article = page.locator('article');
  await article.getByRole('link', { name: '报名', exact: true }).click();
  await expect(page.locator('[id="纸一"]')).toBeFocused();
  await article.getByRole('link', { name: '返回原卡', exact: true }).first().click();
  await expect(page.locator('[id="甲版列表"]')).toBeFocused();
  await article.getByRole('link', { name: '查看场次', exact: true }).click();
  await expect(page.locator('[id="纸五"]')).toBeFocused();
  await article.getByRole('link', { name: '选周六十点这一场', exact: true }).click();
  await expect(page.locator('[id="纸七"]')).toBeFocused();
  await article.getByRole('link', { name: '走完两版以后', exact: true }).last().click();
  await expect(page.locator('[id="走完两版以后"]')).toBeFocused();

  await page.goto(at('/zh/read/'));
  const link = page.getByRole('link', { name: '下载中文 A5 PDF' });
  await expect(link).toHaveAttribute('href', at('/downloads/volume-one-zh-a5.pdf'));
  const download = page.waitForEvent('download');
  await link.click();
  const pdf = await download;
  expect(pdf.suggestedFilename()).toBe('volume-one-zh-a5.pdf');
  expect(await pdf.failure()).toBeNull();
});
