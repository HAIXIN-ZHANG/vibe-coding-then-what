import { expect, test } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';
import { readingStorageKey } from '../../site/reading-progress/model.ts';

const at = path => withBasePath(path, process.env.NEXT_PUBLIC_BASE_PATH);
const sectionTitle = '从“有这个标题”到“标题在这里”';
const diagramHeadingTitle = '标题怎样出现在屏幕上';
const height = 834;

function passagePosition(diagram) {
  return diagram.evaluate(element => {
    const stickyBottom = [...document.querySelectorAll('.site-header, .reading-tools')]
      .filter(item => window.getComputedStyle(item).position === 'sticky')
      .reduce((edge, item) => Math.max(edge, item.getBoundingClientRect().bottom), 0);
    const explanation = [...element.closest('article').querySelectorAll('p')]
      .find(paragraph => paragraph.textContent.startsWith('箭头表示这些工作的依赖'));
    const { top, bottom } = element.getBoundingClientRect();
    return {
      top, bottom, stickyBottom, explanationBottom: explanation.getBoundingClientRect().bottom,
      readingLine: stickyBottom + 0.43 * (window.innerHeight - stickyBottom),
    };
  });
}

async function readDiagram(page, diagram, heading, width) {
  const position = await passagePosition(diagram);
  const headingTop = await heading.evaluate(element => element.getBoundingClientRect().top);
  // The 51-chapter edition places the diagram inside its own H3. On some font
  // stacks centring only the diagram leaves that heading below the reading edge.
  // Read into the subsection intentionally, while keeping the complete figure visible.
  const centerFigure = (position.top + position.bottom) / 2 - position.readingLine;
  const enterSubsection = headingTop - position.stickyBottom;
  await page.mouse.move(width * 0.6, height * 0.64);
  await page.mouse.wheel(0, Math.round(Math.max(centerFigure, enterSubsection)));
}

async function expectReadable(diagram, label) {
  await expect.poll(async () => {
    const position = await passagePosition(diagram);
    const { top, bottom, stickyBottom, explanationBottom } = position;
    return { ...position, readable: top >= stickyBottom - 1 && bottom <= height && explanationBottom <= height };
  }, { message: label }).toMatchObject({ readable: true });
}

for (const [from, to] of [[1194, 375], [375, 1194]]) {
  test(`split view ${from}→${to} keeps the diagram in view and reading controls usable`, { tag: '@smoke' }, async ({ page }) => {
    await page.setViewportSize({ width: from, height });
    await page.goto(at('/zh/'));
    await page.locator('.home-chapters').getByRole('link', {
      name: '页面出现之前，浏览器在忙什么？', exact: true,
    }).click();
    await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
    await page.evaluate(() => document.fonts.ready.then(() => undefined));

    const outline = page.locator('.mobile-outline details');
    const summary = outline.locator('summary');
    const heading = page.getByRole('heading', { name: sectionTitle, exact: true });
    await summary.press('Enter');
    await outline.getByRole('link', { name: sectionTitle, exact: true }).press('Enter');
    await expect(heading).toBeFocused();
    await expect(outline).toHaveJSProperty('open', false);
    const sectionUrl = page.url();

    const diagram = page.locator('.chapter-prose pre').filter({ hasText: '合成与呈现画面' });
    const diagramHeading = page.getByRole('heading', { level: 3, name: diagramHeadingTitle, exact: true });
    const diagramUrl = await diagramHeading.getByRole('link').evaluate(link => link.href);
    const diagramId = await diagramHeading.getAttribute('id');
    await readDiagram(page, diagram, diagramHeading, from);
    await expectReadable(diagram, 'diagram and explanation are readable before narrowing or widening');
    const saved = () => page.evaluate(key => window.localStorage.getItem(key), readingStorageKey);
    await expect.poll(async () => JSON.parse(await saved())?.headingId).toBe(diagramId);
    const original = await saved();

    await page.setViewportSize({ width: to, height });
    // Let breakpoint rendering and the reader's next-frame position adjustment run.
    await page.evaluate(async () => {
      for (let frame = 0; frame < 5; frame++) await new Promise(window.requestAnimationFrame);
    });
    await expectReadable(diagram, 'same diagram and explanation remain below the tools after resizing');
    await expect(page).toHaveURL(sectionUrl);
    expect(await saved()).toBe(original);

    await summary.press('Enter');
    await expect(outline).toHaveJSProperty('open', true);
    await page.keyboard.press('Escape');
    await expect(outline).toHaveJSProperty('open', false);
    await expect(summary).toBeFocused();
    const y = await page.evaluate(() => window.scrollY);
    await page.keyboard.press('PageDown');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(y + 25);
    await expect(summary).toBeFocused();
    // Page Down can still be animating after the first observed scroll movement.
    await page.evaluate(async () => {
      let previousY = window.scrollY;
      for (let stableFrames = 0; stableFrames < 6;) {
        await new Promise(window.requestAnimationFrame);
        const currentY = window.scrollY;
        stableFrames = currentY === previousY ? stableFrames + 1 : 0;
        previousY = currentY;
      }
    });

    // Return to the same passage by wheel before leaving, so Continue should still point to this section.
    await readDiagram(page, diagram, diagramHeading, to);
    await expectReadable(diagram, 'reader can return to the passage after keyboard scrolling');
    await expect.poll(async () => JSON.parse(await saved())?.headingId).toBe(diagramId);
    await page.locator('.site-header .wordmark').click();
    await page.getByRole('link', { name: '继续上次阅读', exact: true }).press('Enter');
    await expect(page).toHaveURL(diagramUrl);
    await expect(diagramHeading).toBeFocused();
    await expect(diagramHeading).toBeInViewport({ ratio: 1 });
  });
}

test('an outline fragment stays below sticky tools across a breakpoint at different text metrics', { tag: '@smoke' }, async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(at('/zh/read/a-page-and-a-system/'));
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
  // Exercise a different heading wrap and earlier prose height on all hosts.
  await page.addStyleTag({ content: 'html { font-size: 105%; }' });
  const title = '时间：先发生什么，用户要等到哪里？';
  const outline = page.locator('.mobile-outline details');
  await outline.locator('summary').press('Enter');
  await outline.getByRole('link', { name: title, exact: true }).press('Enter');
  const heading = page.getByRole('heading', { name: title, exact: true });
  await expect(heading).toBeFocused();
  const url = page.url();

  const navigation = page.locator('.mobile-book-navigation details');
  const summary = navigation.locator('summary');
  await summary.press('Enter');
  await navigation.locator('a[aria-current="page"]').focus();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('#main')).toBeFocused();
  await expect(heading).toBeInViewport({ ratio: 1 });
  await page.getByRole('separator', { name: '调整章节栏宽度' }).focus();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(summary).toBeFocused();
  await expect.poll(() => heading.evaluate(element => element.getBoundingClientRect().top -
    document.querySelector('.reading-tools').getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(0);
  await expect(heading).toBeInViewport({ ratio: 1 });
  await expect(page).toHaveURL(url);
});
