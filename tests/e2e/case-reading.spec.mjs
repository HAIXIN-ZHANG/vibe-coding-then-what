import { test, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';

const at = route => withBasePath(route, process.env.NEXT_PUBLIC_BASE_PATH);
const opening = '/zh/read/before-we-start/';
const browserSection = '同样是慢等的可能不是一件事';

for (const javaScriptEnabled of [true, false]) {
  test.describe(`short reading with JavaScript ${javaScriptEnabled ? 'on' : 'off'}`, () => {
    test.use({ javaScriptEnabled, viewport: { width: javaScriptEnabled ? 390 : 320, height: 760 } });

    test('localized home entries, the existing case index and the short reading preserve real destinations', async ({ page }) => {
      const sampleRoute = at(opening + '#three-waits');
      await page.goto(at('/'));
      const englishEntry = page.getByRole('link', { name: 'Read the browser sample in Chinese' });
      await expect(englishEntry).toHaveAttribute('hreflang', 'zh');
      await expect(englishEntry).toHaveAttribute('href', sampleRoute);
      await englishEntry.click();
      const sample = page.getByRole('region', { name: '短读：我就想搜一门课' });
      const heading = sample.getByRole('heading');
      await expect(heading).toBeInViewport();
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
      await expect(sample.getByRole('listitem')).toHaveCount(3);
      await expect(sample.locator('video, iframe')).toHaveCount(0);

      await page.goto(at('/zh/'));
      await page.getByRole('link', { name: '短读：我就想搜一门课' }).click();
      await expect(heading).toBeInViewport();

      await page.goto(at(opening + '#case-index'));
      const index = page.locator('.case-index');
      await index.locator('summary').click();
      await expect(index.getByRole('link')).toHaveCount(5);
      await index.getByRole('link', { name: '转换商已经回信，老师为什么还找不到讲义？' }).click();
      await expect(page.locator('[id="四个编号别写在同一个格里"]')).toBeInViewport();
      await page.goBack();
      await expect(index.locator('summary')).toBeInViewport();
      if (await index.getAttribute('open') === null) await index.locator('summary').click();
      await index.getByRole('link', { name: '短读：我就想搜一门课' }).click();
      await expect(heading).toBeInViewport();

      await sample.getByRole('link', { name: /读正文/ }).click();
      const section = page.locator(`[id="${browserSection}"]`);
      await expect(section).toBeInViewport();
      expect(decodeURIComponent(new URL(page.url()).hash)).toBe(`#${browserSection}`);
      const back = page.getByRole('link', { name: '回到短读《我就想搜一门课》' });
      if (javaScriptEnabled) await back.press('Enter'); else await back.click();
      await expect(page).toHaveURL(new URL(sampleRoute, page.url()).href);
      await expect(heading).toBeInViewport();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize().width);
    });
  });
}
