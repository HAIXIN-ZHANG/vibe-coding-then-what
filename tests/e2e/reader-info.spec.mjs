import { test as base, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';
import { expectUsableCredit, expectVisibleKeyboardFocus } from './support/reading-assertions.mjs';
import { chapterManifest } from '../../site/content/manifest.ts';

const at = path => withBasePath(path, process.env.NEXT_PUBLIC_BASE_PATH);
const chapter = '/zh/read/browser-foundations/';
const test = base.extend({ health: [async ({ page }, use) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  await use(); expect(errors).toEqual([]);
}, { auto:true }] });

async function reader(page) {
  await page.goto(at(chapter));
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced','true');
}
async function info(page) {
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.getByRole('contentinfo')).toHaveCount(0);
  await page.locator('.site-footer a').evaluate(e=>e.focus());
  expect(await page.locator('.site-footer a').evaluate(e=>document.activeElement===e)).toBe(false);
  const dock=page.getByRole('region',{name:'本书信息',exact:true});
  await expect(dock).toHaveCount(1);
  await expect(dock.locator('.book-info-label')).toHaveText('作者');
  await expect(dock.locator('.book-info-name')).toHaveText('缸子太子与世界');
  const feedback=dock.getByRole('link',{name:'提问与纠错',exact:true});
  await expect(feedback).toHaveAttribute('href','https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues');
  await expectUsableCredit(dock);
  await expect(page.locator('#reader-book-navigation')).not.toContainText('缸子太子与世界');
  await expect(page.locator('article')).toHaveAttribute('data-source-sha256',chapterManifest[2].sha256);
  return {dock,feedback};
}

test('reader dock stays outside the chapter scroller at the top and chapter end across desktop widths and modes',async({page},testInfo)=>{
  const measurements=[];
  for (const {width,theme} of [{width:1325,theme:'light'},{width:1006,theme:'dark'}]) {
    await page.setViewportSize({width,height:width===1325?1267:900}); await page.emulateMedia({colorScheme:theme}); await reader(page);
    const {dock,feedback}=await info(page), nav=page.locator('#reader-book-navigation');
    const geometry=await dock.evaluate(e=>{
      const nav=document.getElementById('reader-book-navigation'),rail=e.closest('.book-rail');
      const rect=x=>{const r=x.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right};};
      return {dock:rect(e),nav:rect(nav),rail:rect(rail),siblings:e.parentElement===nav.parentElement,contained:nav.contains(e),overflow:document.documentElement.scrollWidth>window.innerWidth};
    });
    expect(geometry.siblings).toBe(true); expect(geometry.contained).toBe(false);
    expect(geometry.nav.bottom).toBeLessThanOrEqual(geometry.dock.top);
    expect(geometry.dock.bottom).toBeLessThanOrEqual(geometry.rail.bottom); expect(geometry.overflow).toBe(false);
    const top=await dock.evaluate(e=>e.getBoundingClientRect().top);
    await nav.evaluate(e=>{e.scrollTop=e.scrollHeight;});
    expect(await dock.evaluate(e=>e.getBoundingClientRect().top)).toBe(top);
    await nav.locator('a').last().focus(); await page.keyboard.press('Tab'); await expect(feedback).toBeFocused();
    await page.keyboard.press('Tab'); await expect(page.getByRole('separator')).toBeFocused();
    for (const [key,value] of [['Home','224'],['End','360'],['Enter','248']]) {
      await page.getByRole('separator').press(key); await expect(page.getByRole('separator')).toHaveAttribute('aria-valuenow',value);
      await expect(dock).toBeVisible();
      expect(await dock.locator('.book-info-name').evaluate(e=>e.scrollWidth<=e.clientWidth)).toBe(true);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    }
    await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:testInfo.outputPath(`reader-dock-${width}-${theme}-top.png`)});
    await page.locator('.chapter-pagination').scrollIntoViewIfNeeded();
    await expect(feedback).toBeInViewport();
    await page.screenshot({path:testInfo.outputPath(`reader-dock-${width}-${theme}-end.png`)});
    measurements.push({width,theme,...geometry});
  }
  await page.getByRole('button',{name:'收起章节栏',exact:true}).click();
  await expect(page.getByRole('region',{name:'本书信息'})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'展开章节栏',exact:true})).toBeFocused();
  await page.getByRole('button',{name:'隐藏章节栏',exact:true}).filter({visible:true}).press('Enter');
  await expect(page.getByRole('region',{name:'本书信息'})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'显示章节栏',exact:true})).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page.getByRole('button',{name:'收起章节栏',exact:true})).toBeFocused();
  await info(page);
  await testInfo.attach('desktop-dock-geometry',{body:JSON.stringify(measurements,null,2),contentType:'application/json'});
});

test('short desktop rail uses one outer scroller and real wheel and Tab reach amplified information',async({page},testInfo)=>{
  await page.setViewportSize({width:1006,height:360}); await reader(page);
  const {feedback}=await info(page),rail=page.locator('.expanded-book-rail'),nav=page.locator('#reader-book-navigation');
  await expect.poll(()=>nav.evaluate(e=>window.getComputedStyle(e).overflowY)).toBe('visible');
  await rail.evaluate(e=>{
    const nodes=[...e.querySelectorAll('a,p,li,.book-info-label,.book-info-name')];
    const metrics=nodes.map(e=>({e,size:parseFloat(window.getComputedStyle(e).fontSize),line:parseFloat(window.getComputedStyle(e).lineHeight)}));
    for(const {e,size,line} of metrics){e.style.fontSize=`${size*2}px`;e.style.lineHeight=`${line*2}px`;}
  });
  const box=await rail.boundingBox(); await page.mouse.move(box.x+50,box.y+80); await page.mouse.wheel(0,10000);
  await expect(feedback).toBeInViewport();
  expect(await rail.evaluate(e=>e.scrollTop)).toBeGreaterThan(0);
  expect(await nav.evaluate(e=>e.scrollTop)).toBe(0);
  await page.getByRole('button',{name:'收起章节栏',exact:true}).focus();
  await expect(page.getByRole('button',{name:'收起章节栏',exact:true})).toBeInViewport();
  await nav.locator('a').last().focus(); await page.keyboard.press('Tab'); await expect(feedback).toBeFocused(); await expect(feedback).toBeInViewport();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('reader-dock-short-200-percent.png')});
});

for(const javaScriptEnabled of [true,false]) test(`mobile chapter disclosure keeps information reachable with JavaScript ${javaScriptEnabled?'on':'off'}`,async({browser,baseURL},testInfo)=>{
  const context=await browser.newContext({baseURL,javaScriptEnabled}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try {
    for(const {width,theme} of [{width:320,theme:'dark'},{width:390,theme:'light'}]) {
      await page.setViewportSize({width,height:844}); await page.emulateMedia({colorScheme:theme}); await page.goto(at(chapter));
      await expect(page.locator('.site-footer')).toBeHidden(); await expect(page.getByRole('contentinfo')).toHaveCount(0);
      const summary=page.locator('.mobile-book-navigation summary'); await summary.click();
      const {dock,feedback}=await info(page),panel=page.locator('.mobile-book-navigation .reading-disclosure-body');
      await panel.locator('nav[aria-label="全书导航"] a').last().focus(); await page.keyboard.press('Tab'); await expect(feedback).toBeFocused(); await expect(feedback).toBeInViewport();
      expect(await panel.evaluate(e=>e.scrollTop)).toBeGreaterThan(0);
      expect(await dock.evaluate(e=>e.previousElementSibling?.getAttribute('aria-label'))).toBe('全书导航');
      await page.screenshot({path:testInfo.outputPath(`reader-info-${width}-${theme}-js-${javaScriptEnabled}.png`)});
      if(width===320){
        await panel.evaluate(e=>{
          const metrics=[...e.querySelectorAll('a,p,li,.book-info-label,.book-info-name')].map(e=>({e,size:parseFloat(window.getComputedStyle(e).fontSize),line:parseFloat(window.getComputedStyle(e).lineHeight)}));
          for(const {e,size,line} of metrics){e.style.fontSize=`${size*2}px`;e.style.lineHeight=`${line*2}px`;}
        });
        await panel.locator('nav[aria-label="全书导航"] a').last().focus();await page.keyboard.press('Tab');
        await expect(feedback).toBeFocused();await expect(feedback).toBeInViewport();
        expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
        await page.screenshot({path:testInfo.outputPath(`reader-info-320-${theme}-js-${javaScriptEnabled}-amplified.png`)});
      }
      if(javaScriptEnabled){await feedback.press('Escape');await expect(summary).toBeFocused();}
      else await summary.click();
      await expect(page.getByRole('region',{name:'本书信息'})).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  } finally {await context.close();}
});

test('English directory retains its footer and opens the actual Chinese reader dock',async({page})=>{
  await page.setViewportSize({width:320,height:844});await page.goto(at('/read/'));
  await expect(page.getByRole('contentinfo').locator('.footer-byline')).toHaveText('Author: Jar & Prince Explore the World');
  await page.locator(`.available-chapters a[href="${at(chapter.replace('/zh/', '/'))}"]`).click();
  await page.getByRole('link', { name: 'Read the Chinese original', exact: true }).click();
  await expect.poll(()=>new URL(page.url()).pathname).toBe(at(chapter));
  await page.locator('.mobile-book-navigation summary').click();await info(page);
});

test('credit and feedback remain readable, focusable and bounded at narrow sidebar widths',async({page},testInfo)=>{
  for(const {theme,key} of [{theme:'light',key:'Home'},{theme:'dark',key:'Enter'}]){
    await page.setViewportSize({width:1261,height:900});await page.emulateMedia({colorScheme:theme});await reader(page);
    const grip=page.getByRole('separator');await grip.focus();await grip.press(key);
    const {dock,feedback}=await info(page);
    await grip.press('Shift+Tab');await expectVisibleKeyboardFocus(feedback);
    await dock.screenshot({path:testInfo.outputPath(`credit-${theme}-focus.png`)});
    await dock.evaluate(e=>{
      const metrics=[...e.querySelectorAll('a,.book-info-label,.book-info-name')].map(e=>({e,size:parseFloat(window.getComputedStyle(e).fontSize),line:parseFloat(window.getComputedStyle(e).lineHeight)}));
      for(const{e,size,line}of metrics){e.style.fontSize=`${size*2}px`;e.style.lineHeight=`${line*2}px`;}
    });
    await expectUsableCredit(dock);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    await expect(dock.locator('.book-info-name')).toBeVisible();
    await expect(feedback).toBeInViewport();
    await dock.screenshot({path:testInfo.outputPath(`credit-${theme}-amplified.png`)});
    await page.emulateMedia({forcedColors:'active'});await grip.focus();await grip.press('Shift+Tab');
    await expectVisibleKeyboardFocus(feedback);
    const icon=feedback.locator('.book-info-icon'); await expect(icon).toBeVisible();
    expect(await icon.evaluate(e=>window.getComputedStyle(e).backgroundColor)).not.toBe('rgba(0, 0, 0, 0)');
    await dock.screenshot({path:testInfo.outputPath(`credit-${theme}-forced.png`)});
    await page.emulateMedia({forcedColors:'none'});
  }
});
