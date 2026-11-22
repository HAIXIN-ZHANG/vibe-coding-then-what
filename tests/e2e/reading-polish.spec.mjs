import { test as base, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';
import { expectVisibleKeyboardFocus } from './support/reading-assertions.mjs';

const at = path => withBasePath(path, process.env.NEXT_PUBLIC_BASE_PATH);
const test = base.extend({ health: [async ({ page }, use) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await use(); expect(errors).toEqual([]);
}, { auto: true }] });

async function chapter(page) {
  await page.goto(at('/zh/read/browser-foundations/'));
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced', 'true');
}

async function measurePassage(page) {
  await page.evaluate(() => new Promise(resolve => window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))));
  return page.evaluate(() => {
    const readableTop = Math.max(0, ...[...document.querySelectorAll('.site-header, .reading-tools')]
      .filter(element => window.getComputedStyle(element).position === 'sticky')
      .map(element => element.getBoundingClientRect().bottom));
    const visible = [...document.querySelectorAll('.chapter-prose > p')].flatMap((paragraph, index) => {
      const bounds = paragraph.getBoundingClientRect();
      if (bounds.bottom <= readableTop || bounds.top >= window.innerHeight) return [];
      const range = document.createRange();
      range.selectNodeContents(paragraph);
      const readable = [...range.getClientRects()].some(rect => rect.bottom > readableTop && rect.top < window.innerHeight);
      if (!readable) return [];
      return [{
        index, offset: bounds.top - readableTop,
        lineHeight: Number.parseFloat(window.getComputedStyle(paragraph).lineHeight),
      }];
    });
    return { visible, scrollY: window.scrollY };
  });
}

test('quiet reset retains the reading passage and keyboard focus across saved and clamped widths', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 }); await chapter(page);
  const grip = page.getByRole('separator', { name: '调整章节栏宽度' });
  const reset = page.getByRole('button', { name: '重置宽度', exact: true });
  const persistedWidth = () => page.evaluate(() => JSON.parse(window.localStorage.getItem('btf.readerNavigation')).width);
  async function checkReset(label, trigger = reset) {
    await page.evaluate(() => window.scrollTo(0, 600));
    await trigger.focus();
    const before = await measurePassage(page);
    const passage = before.visible[0];
    expect(passage, 'a prose paragraph must be readable before reset').toBeDefined();
    await trigger.press('Enter');
    await expect(reset).toHaveCount(0);
    await expect(grip).toHaveAttribute('aria-valuenow', '248');
    const after = await measurePassage(page);
    await testInfo.attach(label, { body: JSON.stringify({ before, after }), contentType: 'application/json' });
    await expectVisibleKeyboardFocus(grip);
    const same = after.visible.find(paragraph => paragraph.index === passage.index);
    expect(same, 'the same prose paragraph must remain readable after reset').toBeDefined();
    // Rewrapping can move a line at the reading edge.
    expect(Math.abs(same.offset - passage.offset), 'the passage must stay within one line of its previous viewport position')
      .toBeLessThanOrEqual(Math.max(same.lineHeight, passage.lineHeight) + 1);
    expect(await persistedWidth()).toBe(248);
  }
  await expect(reset).toHaveCount(0);
  await expect(page.locator('.sidebar-width-controls')).toHaveCount(0);
  await grip.focus(); await grip.press('End'); await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await expect(reset).toBeVisible();
  await page.setViewportSize({ width: 900, height: 900 });
  await expect(grip).toHaveAttribute('aria-valuenow', '300'); await expect(reset).toBeVisible();
  expect(await persistedWidth()).toBe(360);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(grip).toHaveAttribute('aria-valuenow', '360');
  await checkReset('wide rail to default');
  await grip.press('Home'); await expect(grip).toHaveAttribute('aria-valuenow', '224');
  await checkReset('narrow rail to default');
  await grip.press('End');
  await page.setViewportSize({ width: 900, height: 900 });
  await expect(grip).toHaveAttribute('aria-valuenow', '300');
  expect(await persistedWidth()).toBe(360);
  await checkReset('clamped rail to default');
  await grip.press('ArrowRight'); await expect(reset).toBeVisible();
  await checkReset('keyboard reset on the separator', grip);
});

test('sidebar actions remain recognizable in 44px controls across collapse, hide and restore', async ({ page }) => {
  await page.setViewportSize({ width: 1261, height: 900 }); await chapter(page);
  async function icon(button, kind) {
    const image = button.locator(`[data-sidebar-icon="${kind}"]`);
    await expect(image).toBeVisible();
    const geometry = await image.evaluate(element => {
      const box = element.getBoundingClientRect(), button = element.closest('button').getBoundingClientRect(), style = window.getComputedStyle(element);
      return { width: box.width, height: box.height, target: [button.width, button.height], mask: style.maskImage, color: style.color, paint: style.backgroundColor };
    });
    expect(geometry.width).toBeGreaterThan(0); expect(geometry.height).toBeGreaterThan(0);
    expect(geometry.target.every(value => value >= 44)).toBe(true);
    expect(geometry.mask).toContain(`${at(`/icons/reader/${kind}.svg`)}`);
    expect(geometry.paint).toBe(geometry.color);
    const response = await page.request.get(at(`/icons/reader/${kind}.svg`)); expect(response.status()).toBe(200);
    expect(await response.text()).toContain('<svg');
  }
  const collapse = page.getByRole('button', { name: '收起章节栏', exact: true }); await icon(collapse,'collapse');
  await collapse.focus(); await collapse.press('Enter');
  const expand = page.getByRole('button', { name: '展开章节栏', exact: true }); await expect(expand).toBeFocused(); await icon(expand,'expand');
  const hide = page.getByRole('button', { name: '隐藏章节栏', exact: true }).filter({ visible: true });
  await icon(hide,'hide'); await hide.press('Enter');
  const reopen = page.getByRole('button', { name: '显示章节栏', exact: true }); await expect(reopen).toBeFocused(); await icon(reopen,'reopen');
  await reopen.press('Enter'); await expect(collapse).toBeFocused();
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-sidebar','expanded');
});

test('reading text and headings enlarge without clipping or page overflow', async ({ page }, testInfo) => {
  for (const width of [1261,390,320]) {
    await page.setViewportSize({ width, height: 900 }); await chapter(page);
    const metrics = () => page.evaluate(() => Object.fromEntries(['article','article h1','article h2'].map(selector => {
      const style = window.getComputedStyle(document.querySelector(selector)); return [selector,parseFloat(style.fontSize)];
    })));
    const before = await metrics();
    expect(before['article h1']).toBeGreaterThanOrEqual(before['article h2']);
    expect(before['article h2']).toBeGreaterThanOrEqual(before.article);
    // Text amplification is deliberately separate from native browser zoom.
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    const after = await metrics();
    for (const role of Object.keys(before)) expect(after[role]).toBeGreaterThan(before[role]);
    await expect(page.locator('article h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`reading-amplified-${width}.png`) });
  }
});

test('reading actions retain forced-color focus and usable visible icons', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1261, height: 900 }); await chapter(page);
  const trigger = page.locator('.appearance-trigger'), search = page.locator('.search-trigger');
  await trigger.focus(); await trigger.press('Enter');
  await expect(page.locator('.appearance-panel')).toBeVisible();
  await page.getByRole('radio', { name: '深色', exact: true }).check();
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
  await page.emulateMedia({ forcedColors: 'active' });
  for (const control of [trigger,search,page.getByRole('button',{name:'收起章节栏',exact:true})]) {
    await control.focus(); await control.press('Shift+Tab'); await page.keyboard.press('Tab');
    await expectVisibleKeyboardFocus(control);
  }
  const image = page.locator('[data-sidebar-icon="collapse"]');
  const forced = await image.evaluate(e => ({ paint:window.getComputedStyle(e).backgroundColor,color:window.getComputedStyle(e).color,adjust:window.getComputedStyle(e).forcedColorAdjust }));
  expect(forced.paint).not.toBe('rgba(0, 0, 0, 0)');
  await page.screenshot({ path:testInfo.outputPath('reader-forced-colors.png') });
  await page.getByRole('button',{name:'收起章节栏',exact:true}).press('Enter');
  await expect(page.getByRole('button',{name:'展开章节栏',exact:true})).toBeFocused();
  await search.click(); await expect(page.getByRole('dialog')).toBeVisible(); await page.keyboard.press('Escape'); await expect(search).toBeFocused();
  await expect(page.getByText('Reading size',{exact:true})).toHaveCount(0);
});

test('non-reader localized footer identifies the approved author below the title', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const routes = [
    { path:'/', locale:'en', title:'Vibe Coding, Then What?', byline:'Author: Jar & Prince Explore the World', feedback:'Questions & corrections' },
    { path:'/read/', locale:'en', title:'Vibe Coding, Then What?', byline:'Author: Jar & Prince Explore the World', feedback:'Questions & corrections' },
    ...['/zh/','/zh/read/'].map(path => ({ path, locale:'zh', title:'用 AI 写代码：能跑，然后呢？', byline:'作者：缸子太子与世界', feedback:'提问与纠错' })),
  ];
  const observations = [];
  for (const {width,theme} of [{width:320,theme:'light'},{width:390,theme:'dark'},{width:1261,theme:'light'}]) for (const [index, route] of routes.entries()) {
    await page.setViewportSize({ width, height:900 }); await page.emulateMedia({ colorScheme:theme });
    await page.goto(at(route.path)); await expect(page.locator('html')).toHaveAttribute('data-theme',theme);
    expect(new URL(page.url()).pathname).toBe(at(route.path));
    const footer = page.getByRole('contentinfo'), byline = footer.locator('.footer-byline');
    await expect(footer.locator('.footer-identity > p').first()).toHaveText(route.title);
    await expect(byline).toHaveText(route.byline); await expect(byline.locator('a')).toHaveCount(0);
    await expect(footer.getByRole('link',{ name:route.feedback })).toHaveAttribute('href','https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues');
    await expect(page.locator('.reading-attribution')).toHaveCount(0);
    async function measure() {
      return footer.evaluate(element => {
        const [title,byline] = element.querySelectorAll('.footer-identity > p'), feedback = element.querySelector(':scope > a');
        const rect = e => { const r=e.getBoundingClientRect(); return { left:r.left,right:r.right,top:r.top,bottom:r.bottom,width:r.width,height:r.height }; };
        return { title:rect(title),byline:rect(byline),feedback:rect(feedback),font:window.getComputedStyle(byline).fontSize,
          overflow:document.documentElement.scrollWidth>window.innerWidth,bylineOverflow:byline.scrollWidth>byline.clientWidth };
      });
    }
    await footer.scrollIntoViewIfNeeded(); const geometry=await measure();
    expect(geometry.byline.top).toBeGreaterThanOrEqual(geometry.title.bottom);
    expect(geometry.overflow).toBe(false); expect(geometry.bylineOverflow).toBe(false);
    expect(geometry.byline.left).toBeGreaterThanOrEqual(0); expect(geometry.byline.right).toBeLessThanOrEqual(width);
    if (width<768) expect(geometry.feedback.top).toBeGreaterThanOrEqual(geometry.byline.bottom);
    observations.push({ width,theme,path:route.path,...geometry });
    await footer.screenshot({ path:testInfo.outputPath(`footer-${index}-${route.locale}-${theme}-${width}.png`) });
    if (width===320) {
      // Double actual text metrics; this tests text amplification, not native browser zoom.
      await footer.evaluate(element => {
        const metrics=[...element.querySelectorAll('p,a')].map(e=>({ e,size:parseFloat(window.getComputedStyle(e).fontSize),line:parseFloat(window.getComputedStyle(e).lineHeight) }));
        for (const { e,size,line } of metrics) { e.style.fontSize=`${size*2}px`; e.style.lineHeight=`${line*2}px`; }
      });
      const enlarged=await measure(); expect(parseFloat(enlarged.font)).toBeGreaterThan(parseFloat(geometry.font));
      expect(enlarged.byline.top).toBeGreaterThanOrEqual(enlarged.title.bottom);
      expect(enlarged.feedback.top).toBeGreaterThanOrEqual(enlarged.byline.bottom);
      expect(enlarged.overflow).toBe(false); expect(enlarged.bylineOverflow).toBe(false);
      await footer.screenshot({ path:testInfo.outputPath(`footer-${index}-${route.locale}-${theme}-320-amplified.png`) });
    }
  }
  await testInfo.attach('footer-locales-geometry',{ body:JSON.stringify(observations,null,2),contentType:'application/json' });
});
