import { englishEditions, englishStatus } from '../../site/content/english-edition.ts';
import { test, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import { bookSelectionPath, getMessages, localePath } from '../../site/config/i18n.ts';
import { withBasePath } from '../../site/config/deployment.ts';
import { chapterManifest, chapterPath } from '../../site/content/manifest.ts';
import { readingStorageKey } from '../../site/reading-progress/model.ts';

const at = pathname => withBasePath(pathname, process.env.NEXT_PUBLIC_BASE_PATH);
const english = getMessages('en');
const chinese = getMessages('zh');
const englishChapters = chapterManifest.filter(chapter => englishEditions[chapter.id]);
const ai = englishChapters.find(chapter => chapter.id === 'P810');
const section = '回到那句确认';
const savedPosition = JSON.stringify({ version: 1, chapterId: ai.id, headingId: section, sourceHash: ai.sha256 });
const getProgress = page => page.evaluate(key => window.localStorage.getItem(key), readingStorageKey);
const setProgress = (page, value) => page.evaluate(({ key, value }) => {
  if (value === null) window.localStorage.removeItem(key);
  else window.localStorage.setItem(key, value);
}, { key: readingStorageKey, value });
const aiSection = chapterPath(ai) + '#' + encodeURIComponent(section);

test('fresh English reading stays in the edition through every overview and ordered chapter link', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(at('/'));
  await page.locator('.home-reading-action a').click();
  for (const [index, chapter] of englishChapters.entries()) {
    const edition = englishEditions[chapter.id];
    const article = page.locator('main article');
    await expect(page).toHaveURL(new URL(at(chapterPath(chapter, 'en')), page.url()).href);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveTitle(`${english.chapterLabels[chapter.id]} | ${english.title}`);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', `${english.chapterBenefits[chapter.id]} ${englishStatus(chapter.id)}.`);
    await expect(article.getByRole('heading', { level: 1 })).toHaveText(english.chapterLabels[chapter.id]);
    if (edition.source) await expect(article).toHaveAttribute('data-source-sha256', edition.sha256);
    else {
      await expect(article).toContainText(english.chapterBenefits[chapter.id]);
      await expect(article).toContainText(english.chapterAvailability);
      await expect(article.locator('pre, .section-actions, [data-source-sha256]')).toHaveCount(0);
    }
    const original = page.getByRole('link', { name: english.readOriginal, exact: true });
    await expect(original).toHaveAttribute('href', at(chapterPath(chapter)));
    await expect(original).toHaveAttribute('hreflang', 'zh');
    const adjacent = page.locator('nav.chapter-pagination');
    const previous = englishChapters[index - 1];
    if (previous) await expect(adjacent.locator('[rel="prev"]')).toHaveAttribute('href', at(chapterPath(previous, 'en')));
    else await expect(adjacent.locator('[rel="prev"]')).toHaveCount(0);
    if (index < englishChapters.length - 1) await adjacent.locator('[rel="next"]').click();
    else {
      await expect(adjacent.locator('[rel="next"]')).toHaveCount(0);
      await page.screenshot({ path: testInfo.outputPath('english-overview-390.png') });
      await adjacent.getByRole('link', { name: /Browse chapters/ }).click();
      await expect(page).toHaveURL(new URL(at('/read/'), page.url()).href);
    }
  }
  expect(await getProgress(page)).toBeNull();
});

test('counterpart and stale English resume start at the chapter top while retaining Chinese progress', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 690 });
  await page.goto(at(aiSection));
  await setProgress(page, savedPosition);
  await page.locator('.chapter-header-menu > summary').click();
  const toEnglish = page.getByRole('link', { name: chinese.switchLabel, exact: true });
  await expect(toEnglish).toHaveText('英语');
  await expect(toEnglish).toHaveAttribute('href', at(chapterPath(ai, 'en')));
  await toEnglish.click();
  await expect(page).toHaveURL(new URL(at(chapterPath(ai, 'en')), page.url()).href);
  expect(await getProgress(page)).toBe(savedPosition);
  const menu = page.locator('.chapter-header-menu');
  await menu.locator('summary').click();
  expect(await menu.ariaSnapshot()).not.toMatch(/\p{Script=Han}/u);
  const toChinese = menu.getByRole('link', { name: english.switchLabel, exact: true });
  await expect(toChinese).toHaveText('Simplified Chinese');
  await expect(toChinese).toHaveAttribute('href', at(chapterPath(ai)));
  await toChinese.click();
  await expect(page).toHaveURL(new URL(at(chapterPath(ai)), page.url()).href);
  expect(await getProgress(page)).toBe(savedPosition);

  const stale = JSON.stringify({ ...JSON.parse(savedPosition), sourceHash: 'a'.repeat(64) });
  await setProgress(page, stale);
  await page.goto(at('/read/'));
  const resume = page.locator('.continue-reading');
  await expect(resume).toContainText(english.chapterLabels[ai.id]);
  await expect(resume).toContainText(english.continueReading.fallback);
  expect(await resume.ariaSnapshot()).not.toMatch(/\p{Script=Han}/u);
  await resume.getByRole('link', { name: english.continueReading.restart, exact: true }).click();
  await expect(page).toHaveURL(new URL(at(chapterPath(ai, 'en')), page.url()).href);
  await page.getByRole('link', { name: english.readOriginal, exact: true }).click();
  await expect(page).toHaveURL(new URL(at(chapterPath(ai)), page.url()).href);
  expect(await getProgress(page)).toBe(stale);
});

async function expectBookChoices(page, locale) {
  const selection = at(bookSelectionPath(locale));
  await expect(page).toHaveURL(new URL(selection, page.url()).href);
  if (page.viewportSize().width < 900) await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
  await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
  const choices = page.locator('#books');
  const messages = getMessages(locale);
  const links = choices.getByRole('link');
  await expect(links).toHaveCount(2);
  const work = links.nth(0), life = links.nth(1);
  await expect(work).toHaveAttribute('aria-current', 'page');
  await expect(work).toHaveAttribute('href', at(localePath(locale)));
  await expect(work.locator('span')).toHaveText(messages.title);
  await expect(work.locator('small')).toHaveText(messages.availableNotice(chapterManifest.length));
  await expect(life).toHaveAttribute('href', at(localePath(locale, 'books/everyday-life/')));
  await expect(life.locator('span')).toHaveText(locale === 'en' ? 'Where Does the Saved Time Go?' : '省下来的时间，去哪儿了？');
  await expect(life.locator('small')).toHaveText(locale === 'en' ? 'Volume II · In development' : '下册 · 筹备中');
  for (const card of [work, life]) {
    await expect(card).toBeInViewport({ ratio: 1 });
    await expect(card.locator('span')).toBeInViewport({ ratio: 1 });
    await expect(card.locator('small')).toBeInViewport({ ratio: 1 });
  }
  return { work, life };
}

for (const locale of ['en', 'zh']) for (const width of [320, 390]) {
  test(`first Books click exposes both titles and statuses at ${width}px in ${locale}, with and without progress`, async ({ page }, testInfo) => {
    const messages = getMessages(locale);
    const home = localePath(locale);
    const companion = at(localePath(locale, 'books/everyday-life/'));
    const chapter = at(locale === 'en' ? chapterPath(ai, 'en') : aiSection);
    const books = () => page.getByRole('link', { name: messages.books, exact: true });
    await page.setViewportSize({ width, height: 760 });

    for (const progress of [null, savedPosition]) {
      await page.goto(at(home));
      await setProgress(page, progress);
      await expect(books()).toHaveCount(1);
      await books().click();
      const { life } = await expectBookChoices(page, locale);
      await life.click();
      await expect(page).toHaveURL(new URL(companion, page.url()).href);
      await expect(page.getByRole('link', { name: messages.switchLabel, exact: true })).toHaveAttribute('href',
        at(localePath(locale === 'en' ? 'zh' : 'en', 'books/everyday-life/')));
      await expect(books()).toBeInViewport();
      await books().click();
      await expectBookChoices(page, locale);
      await page.goBack();
      await expect(page).toHaveURL(new URL(companion, page.url()).href);
      expect(await getProgress(page)).toBe(progress);

      await page.goto(chapter);
      await expect(page.locator('.chapter-header-menu')).toHaveAttribute('data-compact', 'true');
      await expect(page.locator('.chapter-header-menu')).not.toHaveAttribute('open', '');
      if (locale === 'zh') {
        await expect(page.locator('.mobile-book-navigation details')).not.toHaveAttribute('open', '');
        await expect(page.locator(`[id="${section}"]`)).toBeInViewport();
      }
      await expect(books()).toHaveCount(1);
      await expect(books()).toBeInViewport();
      await books().click();
      await expectBookChoices(page, locale);
      const bounds = await page.locator('#books a').evaluateAll(elements => elements.map(element => {
        const box = element.getBoundingClientRect();
        return { top: box.top, bottom: box.bottom };
      }));
      await writeFile(testInfo.outputPath(`books-${locale}-${width}-${progress ? 'saved' : 'fresh'}.json`), JSON.stringify(bounds));
      await page.screenshot({ path: testInfo.outputPath(`books-${locale}-${width}-${progress ? 'saved' : 'fresh'}.png`) });
      await page.goBack();
      await expect(page).toHaveURL(new URL(chapter, page.url()).href);
      if (locale === 'zh') await expect(page.locator(`[id="${section}"]`)).toBeInViewport();
      expect(await getProgress(page)).toBe(progress);
    }
  });
}

test('desktop chapter headers offer one same-language Books action and Back returns to the chapter', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 840 });
  for (const locale of ['en', 'zh']) {
    const chapter = at(locale === 'en' ? chapterPath(ai, 'en') : aiSection);
    await page.goto(chapter);
    const books = page.getByRole('link', { name: getMessages(locale).books, exact: true });
    await expect(books).toHaveCount(1);
    await expect(books).toBeInViewport();
    await books.click();
    await expectBookChoices(page, locale);
    await page.goBack();
    await expect(page).toHaveURL(new URL(chapter, page.url()).href);
  }
});

for (const [width, shared] of [[320, true], [1280, true], [320, false]]) {
  test(`Back restores the visible passage after scrolling at ${width}px ${shared ? 'from a shared heading' : 'without a fragment'}`, async ({ page }, testInfo) => {
    const headingId = '顺着一个名字往后走';
    const route = at(chapterPath(ai) + (shared ? '#' + encodeURIComponent(headingId) : ''));
    await page.setViewportSize({ width, height: 760 });
    await page.goto(route);
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    await expect(page.locator(shared ? `[id="${headingId}"]` : 'article h1')).toBeInViewport({ ratio: 1 });
    const passage = () => page.evaluate(() => {
      const readableTop = Math.max(0, ...[...document.querySelectorAll('.site-header, .reading-tools')]
        .filter(element => window.getComputedStyle(element).position === 'sticky').map(element => element.getBoundingClientRect().bottom));
      const paragraphs = [...document.querySelectorAll('article > p')];
      const index = paragraphs.findIndex(element => element.getBoundingClientRect().bottom > readableTop + 16);
      return { index, offset: index < 0 ? null : paragraphs[index].getBoundingClientRect().top - readableTop, y: window.scrollY };
    });
    const start = await passage();
    await page.mouse.move(width / 2, 500);
    await page.mouse.wheel(0, 1750);
    await expect.poll(async () => (await passage()).index).toBeGreaterThan(start.index + 2);
    await expect.poll(async () => JSON.parse(await getProgress(page))?.chapterId).toBe(ai.id);
    const before = await passage();
    const progress = await getProgress(page);
    const books = page.getByRole('link', { name: chinese.books, exact: true });
    await expect(books).toBeInViewport();
    await books.click();
    await expectBookChoices(page, 'zh');
    await page.goBack();
    await expect(page).toHaveURL(new URL(route, page.url()).href);
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
    const after = await passage();
    const measurement = testInfo.outputPath('paragraph-before-and-after-back.json');
    await writeFile(measurement, JSON.stringify({ start, before, after }));
    await testInfo.attach('paragraph-before-and-after-back', { path: measurement, contentType: 'application/json' });
    expect(after.index).toBe(before.index);
    expect(Math.abs(after.offset - before.offset)).toBeLessThanOrEqual(1);
    expect(await getProgress(page)).toBe(progress);
  });
}
