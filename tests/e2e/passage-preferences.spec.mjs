import { test, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';

const chapter = withBasePath('/zh/read/p8-good-answer/', process.env.NEXT_PUBLIC_BASE_PATH);
test.use({ viewport: { width: 390, height: 844 } });

test('reading-size changes keep the panel usable and survive reload independently of accent', async ({ page }) => {
  await page.goto(chapter);
  const opener = page.locator('.appearance-trigger:visible').first();
  await opener.click();
  const panel = page.locator('.appearance-panel:popover-open');
  await panel.locator('[data-accent-option="green"]').click();
  await panel.getByLabel('全章字号').selectOption('large');
  await panel.getByText('分别调整字号').click();
  await panel.getByLabel('小节标题').selectOption('small');
  await expect(page.locator('article p[data-passage-section]').first()).toHaveCSS('font-size', '22px');
  await expect(page.locator('article h2').first()).toHaveCSS('font-size', '20px');
  await panel.getByLabel('小节标题').press('Escape');
  await expect(opener).toBeFocused();
  await page.reload();
  await expect(page.locator('article h2').first()).toHaveCSS('font-size', '20px');
  await opener.click();
  await page.getByRole('button', { name: '恢复默认字号' }).click();
  await expect(page.locator('html')).not.toHaveAttribute('data-reader-body', '');
  await expect(page.locator('html')).toHaveAttribute('data-accent', 'green');
});

test('passage bookmark, editable card and explicit excerpt inclusion recover from a stale link', async ({ page }) => {
  await page.goto(chapter);
  const actions = page.locator('article .section-actions').nth(1);
  await actions.locator(':scope > summary').click();
  await actions.locator('.passage-tools > summary').click();
  const target = actions.getByLabel('选择段落');
  await target.selectOption({ index: 1 });
  const paragraphId = await target.inputValue();
  await actions.getByRole('button', { name: '加书签' }).click();
  await actions.getByText('本机书签').click();
  const link = new URL(await actions.locator('.passage-tools li a').first().getAttribute('href'), page.url());
  expect(link.hash).toBe('#' + paragraphId);
  await actions.getByRole('button', { name: '编辑 AI 上下文卡' }).click();
  const card = actions.getByLabel('可编辑的原文、问题与出处');
  await expect(card).toHaveValue(new RegExp(paragraphId));
  await card.fill('我自己的问题');
  await page.evaluate(() => Object.defineProperty(window.navigator, 'clipboard', { configurable: true, value: undefined }));
  await actions.getByRole('button', { name: '复制卡片' }).click();
  await expect(actions.getByLabel('手动复制')).toHaveValue('我自己的问题');
  await actions.getByRole('button', { name: '反馈这一处' }).click();
  const feedback = actions.locator('.passage-feedback');
  const draft = feedback.getByRole('link');
  const excerpt = await feedback.locator('blockquote').textContent();
  expect(new URL(await draft.getAttribute('href')).searchParams.get('body')).not.toContain(excerpt);
  await feedback.getByRole('checkbox').check();
  expect(new URL(await draft.getAttribute('href')).searchParams.get('body')).toContain(excerpt);
  await page.goto(link.href);
  await expect(page.locator('#' + paragraphId)).toBeInViewport();
  link.hash = 'passage-' + '0'.repeat(24);
  await page.goto(link.href);
  await expect.poll(() => page.evaluate(() => document.activeElement.id)).toBe(link.searchParams.get('section'));
});
