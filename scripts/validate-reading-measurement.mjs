import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';
import { parseBasePath } from '../site/config/deployment.ts';
import { createLocalReadingPreview } from './local-reading-preview.mjs';
import { summarizeReading } from './reading-measurement.mjs';
import { createStaticPreview } from './static-preview.mjs';

const directory = process.argv[2];
const basePath = parseBasePath(process.argv[3]);
const server = await createLocalReadingPreview({ directory, basePath, port: 0 });
const plain = await createStaticPreview({ directory, basePath, port: 0 });
const origin = 'http://127.0.0.1:' + server.address().port;
const reportPath = basePath + '/__reader-measurement/report/';
const zh = basePath + '/zh/';
const chapters = zh + 'read/';
const ai = chapters + 'after-ai-finishes/';
let browser;
const sessions = new Map();

try {
  browser = await chromium.launch();
  const plainUrl = 'http://127.0.0.1:' + plain.address().port;
  const normal = await globalThis.fetch(plainUrl + zh);
  assert.doesNotMatch(await normal.text(), /__reader-measurement/);
  assert.equal((await globalThis.fetch(plainUrl + reportPath)).status, 404);
  const enabled = await globalThis.fetch(origin + zh);
  assert.match(await enabled.text(), /__reader-measurement\/collector\.mjs/);

  async function session(name, action, options = {}) {
    const { height = 480, failure, hasTouch = false } = options;
    const context = await browser.newContext({ baseURL: origin, viewport: { width: 320, height }, serviceWorkers: 'block', hasTouch });
    await context.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
    // These controls simulate browser denial. The preview still runs its normal collector.
    if (failure) await context.addInitScript(mode => {
      if (mode === 'denied') Object.defineProperty(globalThis, 'sessionStorage', { get() { throw new globalThis.DOMException('Denied', 'SecurityError'); } });
      const originalSetItem = globalThis.Storage.prototype.setItem;
      if (mode === 'write') globalThis.Storage.prototype.setItem = function (key, value) {
        if (key === 'vctw.local-verification.v2') throw new globalThis.DOMException('Full', 'QuotaExceededError');
        return originalSetItem.call(this, key, value);
      };
    }, failure);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await action(page, context);
      await page.goto(reportPath);
      const output = page.locator('#local-reading-report');
      await expect(output).toContainText('"measurableSessions"');
      const { session, report } = JSON.parse(await output.textContent());
      assert.deepEqual(report, summarizeReading([session]));
      assert.deepEqual(errors, []);
      sessions.set(name, session);
    } finally { await context.close(); }
  }
  const readChapter = page => expect(page.locator('[data-chapter-id="P810"]')).toBeVisible();
  const settled = page => page.waitForLoadState('networkidle');

  await session('entry-to-body', async page => {
    await page.goto(zh); await settled(page);
    const timeOrigin = await page.evaluate(() => globalThis.performance.timeOrigin);
    await page.getByRole('link', { name: '查看章节目录', exact: true }).click();
    await expect(page.locator('.reading-index')).toBeVisible(); await settled(page);
    assert.equal(await page.evaluate(() => globalThis.performance.timeOrigin), timeOrigin, 'normal Next client navigation');
    await page.locator('.available-chapters').getByRole('link', { name: /AI 写完以后/ }).click();
    await readChapter(page); await settled(page);
    assert.equal(await page.evaluate(() => globalThis.performance.timeOrigin), timeOrigin, 'client navigation into the body');
    await page.reload(); await readChapter(page); await settled(page);
    await page.goto(chapters + 'browser-foundations/');
    await expect(page.locator('[data-chapter-id="F01"]')).toBeVisible(); await settled(page);
    await page.goBack(); await readChapter(page); await settled(page);
    await page.keyboard.press('PageDown');
  });
  await session('contents-keyboard', async page => {
    await page.goto(chapters); await settled(page);
    const endLink = page.locator('.reading-index > a:last-child');
    await expect(endLink).not.toBeInViewport();
    await page.keyboard.press('End');
    await expect(endLink).toBeInViewport({ ratio: 1 });
    await page.keyboard.press('Home');
    await page.keyboard.press('End');
    await expect(endLink).toBeInViewport({ ratio: 1 });
  });
  await session('contents-initially-visible', async page => {
    await page.goto(basePath + '/read/');
    await expect(page.locator('.reading-index > a:last-child')).toBeInViewport({ ratio: 1 });
    await settled(page);
  }, { height: 2400 });
  await session('direct-deep-link', async page => {
    await page.goto(ai + '#' + encodeURIComponent('三个人说的好了'));
    await readChapter(page); await settled(page);
    await page.reload(); await readChapter(page); await settled(page);
    await page.keyboard.press('PageDown');
  });
  await session('untranslated', async page => {
    await page.goto(basePath + '/'); await settled(page);
    await page.locator('.home-chapters a').last().click();
    await expect(page.locator('[data-chapter-overview="P810"]')).toBeVisible(); await settled(page);
  });
  await session('english-body', async page => {
    await page.goto(basePath + '/read/before-we-start/'); await settled(page);
    await expect(page.locator('[data-chapter-id="opening"]')).toBeVisible();
  });
  await session('pdf-link', async page => {
    await page.goto(zh); await settled(page);
    const file = page.waitForEvent('download');
    await page.locator('a[download][href$="volume-one-zh-a5.pdf"]').click();
    await file;
  });
  await session('denied', async page => {
    await page.goto(ai); await readChapter(page); await settled(page);
  }, { failure: 'denied' });
  await session('failed-write', async page => {
    await page.goto(zh); await settled(page);
  }, { failure: 'write' });
  await session('failed-http', async page => {
    assert.equal((await page.goto(chapters + 'not-a-verified-chapter/')).status(), 404);
  });
  await session('fresh-context', async () => {});
  await session('contents-touch-emulation', async (page, context) => {
    await page.goto(basePath + '/read/'); await settled(page);
    const endLink = page.locator('.reading-index > a:last-child');
    await expect(endLink).not.toBeInViewport();
    const cdp = await context.newCDPSession(page);
    for (let swipe = 0; swipe < 20 && !await endLink.evaluate(element =>
      element.getBoundingClientRect().bottom <= globalThis.innerHeight); swipe++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 155, y: 410 }] });
      for (const y of [345, 280, 215, 150, 85]) {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 155, y }] });
      }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    await expect(endLink).toBeInViewport({ ratio: 1 });
  }, { hasTouch: true });

  for (const name of ['denied', 'failed-write', 'failed-http', 'fresh-context']) assert.equal(sessions.get(name), null, name);
  const report = summarizeReading([...sessions.values()]);
  assert.deepEqual(report, {
    measurableSessions: 8, bodyOpenSessions: 3, entrySessions: 6,
    entrySessionsOpeningBody: 1, entryToBodyRate: 1/6,
    contentsEndReachedSessions: 2, contentsEndInitiallyVisibleSessions: 1,
    pdfLinkClicks: 1, chapterBodyPageViews: { 'P810:zh': 5, 'F01:zh': 1, 'opening:en': 1 },
    chapterOverviewPageViews: { 'P810:en': 1 },
    entrySources: { unknown: 8, 'same-origin': 0, 'other-origin': 0 },
  }, JSON.stringify(Object.fromEntries(sessions)));
  assert.equal(summarizeReading([sessions.get('direct-deep-link')]).entryToBodyRate, null);
  console.log(JSON.stringify({ synthetic: true, basePath: basePath || '/', fixtures: Object.fromEntries(sessions), report, zeroDenominatorRate: null }, null, 2));
} finally {
  await browser?.close();
  await Promise.all([server, plain].map(listener => new Promise(resolve => listener.close(resolve))));
}
