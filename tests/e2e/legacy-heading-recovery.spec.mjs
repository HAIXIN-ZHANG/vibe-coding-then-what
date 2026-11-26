import { test, expect } from '@playwright/test';
import { chapterManifest, chapterPath, legacyHeadingAliases } from '../../site/content/manifest.ts';
import { englishEditions } from '../../site/content/english-edition.ts';
import { readingStorageKey } from '../../site/reading-progress/model.ts';
import { englishReadingKey } from '../../site/reading-progress/store.ts';
import { withBasePath } from '../../site/config/deployment.ts';

const at = route => withBasePath(route, process.env.NEXT_PUBLIC_BASE_PATH);
const opening = chapterManifest.find(chapter => chapter.id === 'opening');
const savedChapter = chapterManifest.find(chapter => chapter.id === 'P810');
const alias = legacyHeadingAliases.find(item => item.chapterId === opening.id);
const invalidFragments = ['no-such-heading', '%E0%A4%A'];

async function records(page) {
  return page.evaluate(({ chinese, english }) => ({
    chinese: window.localStorage.getItem(chinese), english: window.localStorage.getItem(english),
  }), { chinese: readingStorageKey, english: englishReadingKey });
}

test('same-page missing and malformed headings recover at the chapter start and preserve both edition records', async ({ page, context }, testInfo) => {
  const chinese = JSON.stringify({ version: 1, chapterId: savedChapter.id, headingId: null, sourceHash: savedChapter.sha256 });
  const english = JSON.stringify({ version: 1, chapterId: 'F01', headingId: null, sourceHash: englishEditions.F01.sha256 });
  await context.addInitScript(({ chineseKey, englishKey, chinese, english }) => {
    if (window.localStorage.getItem(chineseKey) === null) window.localStorage.setItem(chineseKey, chinese);
    if (window.localStorage.getItem(englishKey) === null) window.localStorage.setItem(englishKey, english);
  }, { chineseKey: readingStorageKey, englishKey: englishReadingKey, chinese, english });
  await page.setViewportSize({ width: 320, height: 760 });
  const path = at(chapterPath(opening));
  const realUrl = path + '#' + encodeURIComponent(alias.legacyId);
  const observations = [];
  for (const invalid of invalidFragments) {
    await page.goto(realUrl);
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    await expect(page.locator(`[id="${alias.legacyId}"]`)).toBeFocused();
    await expect(page.locator(`[id="${alias.headingId}"]`)).toBeInViewport();
    const startingY = await page.evaluate(() => window.scrollY);
    await page.mouse.move(160, 450);
    await page.mouse.wheel(0, 1400);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(startingY + 800);
    await expect.poll(async () => (await records(page)).chinese).not.toBe(chinese);
    const beforeY = await page.evaluate(() => window.scrollY);
    const before = await records(page);
    expect(before.english).toBe(english);
    await page.evaluate(fragment => {
      const link = document.createElement('a');
      link.href = '#' + fragment;
      link.textContent = 'Expired heading test';
      link.style.cssText = 'position:fixed;top:24px;left:10px;z-index:99;background:white;color:black';
      document.body.append(link);
    }, invalid);
    await page.getByRole('link', { name: 'Expired heading test' }).click();
    await expect(page).toHaveURL(new URL(path, page.url()).href);
    await expect(page.locator('article h1')).toBeFocused();
    await expect(page.locator('article h1')).toBeInViewport({ ratio: 1 });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    expect(await records(page)).toEqual(before);
    await page.getByRole('link', { name: 'Expired heading test' }).evaluate(link => link.remove());
    await page.goBack();
    await expect(page).toHaveURL(new URL(realUrl, page.url()).href);
    await expect.poll(() => page.evaluate(({ id, beforeY }) => {
      if (Math.abs(window.scrollY - beforeY) <= 1) return true;
      const target = document.getElementById(id).getBoundingClientRect();
      const tools = document.querySelector('.reading-tools').getBoundingClientRect();
      return target.top >= tools.bottom && target.bottom <= window.innerHeight;
    }, { id: alias.headingId, beforeY })).toBe(true);
    expect(await records(page)).toEqual(before);
    observations.push({ invalid, beforeY, afterBackY: await page.evaluate(() => window.scrollY), records: before });
  }
  await testInfo.attach('legacy-heading-recovery', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

test('a new page with an invalid heading preserves its query and current Chinese and English progress', async ({ page, context }) => {
  await page.goto(at('/zh/'));
  const chinese = JSON.stringify({ version: 1, chapterId: savedChapter.id, headingId: null, sourceHash: savedChapter.sha256 });
  const english = JSON.stringify({ version: 1, chapterId: 'F01', headingId: null, sourceHash: englishEditions.F01.sha256 });
  await page.evaluate(({ chineseKey, englishKey, chinese, english }) => {
    window.localStorage.setItem(chineseKey, chinese);
    window.localStorage.setItem(englishKey, english);
  }, { chineseKey: readingStorageKey, englishKey: englishReadingKey, chinese, english });
  const expected = { chinese, english };
  for (const invalid of invalidFragments) {
    const direct = await context.newPage();
    try {
      const target = at(chapterPath(opening)) + '?heading-recovery=1';
      await direct.goto(target + '#' + invalid);
      await expect(direct).toHaveURL(new URL(target, direct.url()).href);
      await expect(direct.locator('article h1')).toBeFocused();
      await expect(direct.locator('article h1')).toBeInViewport({ ratio: 1 });
      expect(await records(direct)).toEqual(expected);
    } finally { await direct.close(); }
  }
});
