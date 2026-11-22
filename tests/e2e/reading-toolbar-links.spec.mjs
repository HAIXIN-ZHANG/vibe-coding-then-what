import { test as base, expect } from '@playwright/test';
import { withBasePath } from '../../site/config/deployment.ts';
import { expectVisibleKeyboardFocus } from './support/reading-assertions.mjs';
import { chapterManifest } from '../../site/content/manifest.ts';

const at=path=>withBasePath(path,process.env.NEXT_PUBLIC_BASE_PATH);
const route='/zh/read/browser-foundations/';
const test=base.extend({health:[async({page},use)=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await use();expect(errors).toEqual([]);
},{auto:true}]});
const bodyLinks=['DOM，Document Object Model','web.dev 的关键路径说明'];

async function reader(page,width=1188,theme='light'){
  await page.setViewportSize({width,height:900});await page.emulateMedia({colorScheme:theme});await page.goto(at(route));
  await expect(page.locator('.chapter-layout')).toHaveAttribute('data-enhanced','true');
}
async function clearance(page,target,panel){
  await expect.poll(()=>target.evaluate((e,panelSelector)=>{
    const tools=document.querySelector('.reading-tools'),header=document.querySelector('.site-header');
    const sticky=window.getComputedStyle(header).position==='sticky'?header.getBoundingClientRect().bottom:0;
    const panel=panelSelector?document.querySelector(panelSelector):null;
    return e.getBoundingClientRect().top>=Math.max(tools.getBoundingClientRect().bottom,sticky,panel?.getBoundingClientRect().bottom??0)-1;
  },panel)).toBe(true);
}

test('nearby tools separate scrolling status, retain native disclosure focus and disappear when no action is visible',async({page},testInfo)=>{
  for(const {width,theme} of [{width:1188,theme:'light'},{width:390,theme:'dark'},{width:320,theme:'light'}]){
    await reader(page,width,theme);const status=page.locator('.chapter-context'),tools=page.locator('.reading-tools'),summary=page.locator('.mobile-outline summary');
    await expect(status).toHaveText('中文 · 完整版');expect(await status.evaluate(e=>e.closest('.reading-tools'))).toBeNull();
    await expect(summary).toHaveText('本章目录');expect((await summary.boundingBox()).height).toBeGreaterThanOrEqual(44);
    const position=await page.evaluate(()=>window.scrollY),top=await page.locator('article').evaluate(e=>e.getBoundingClientRect().top);
    await summary.focus();await summary.press('Enter');await expect(page.locator('.mobile-outline details')).toHaveAttribute('open','');
    await expectVisibleKeyboardFocus(summary);
    expect(await page.locator('article').evaluate(e=>e.getBoundingClientRect().top)).toBe(top);
    expect(await page.evaluate(()=>window.scrollY)).toBe(position);
    await page.screenshot({path:testInfo.outputPath(`toolbar-${width}-${theme}-open.png`)});
    await summary.press('Escape');await expect(summary).toBeFocused();
    await page.evaluate(()=>window.scrollTo(0,600));
    expect(await status.evaluate(e=>e.getBoundingClientRect().bottom)).toBeLessThan(0);
    await expect(tools).toBeInViewport();
    await page.screenshot({path:testInfo.outputPath(`toolbar-${width}-${theme}-scrolled.png`)});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  }
  await reader(page,1261);await expect(page.locator('.reading-tools')).toBeHidden();
  expect(await page.locator('.reading-tools').boundingBox()).toBeNull();
  await page.getByRole('button',{name:'隐藏章节栏',exact:true}).filter({visible:true}).click();
  await expect(page.locator('.reading-tools')).toBeVisible();const reopen=page.getByRole('button',{name:'显示章节栏',exact:true});
  await expect(reopen).toBeFocused();await reopen.press('Enter');await expect(page.locator('.reading-tools')).toBeHidden();
  await expect(page.getByRole('button',{name:'收起章节栏',exact:true})).toBeFocused();
});

test('real inline links preserve source text and readable focus in both themes',async({page},testInfo)=>{
  for(const theme of ['light','dark']){
    await reader(page,1188,theme);
    for(const name of bodyLinks){
      const link=page.getByRole('link',{name,exact:true});await link.scrollIntoViewIfNeeded();
      const s=await link.evaluate(e=>{const s=window.getComputedStyle(e),p=window.getComputedStyle(e.parentElement);return{font:s.fontSize,line:s.lineHeight,weight:s.fontWeight,parent:[p.fontSize,p.lineHeight,p.fontWeight],display:s.display,whiteSpace:s.whiteSpace,underline:s.textDecorationLine,text:e.textContent,next:e.nextSibling?.textContent};});
      expect([s.font,s.line,s.weight]).toEqual(s.parent);
      expect(s.display).toBe('inline');expect(s.whiteSpace).not.toBe('nowrap');expect(s.underline).toContain('underline');
      expect(s.text).toBe(name);await expect(link).toHaveAttribute('href',/^https:\/\//);
      if(name===bodyLinks[1])expect(s.next.startsWith('区分了这两类依赖。')).toBe(true);
      await link.hover();await expect(link).toBeVisible();
      await page.mouse.move(1,1);await link.focus();await link.press('Shift+Tab');await page.keyboard.press('Tab');await expectVisibleKeyboardFocus(link);
    }
    await page.screenshot({path:testInfo.outputPath(`prose-link-${theme}-focus.png`)});
    await expect(page.locator('article')).toHaveAttribute('data-source-sha256',chapterManifest[2].sha256);
  }
});

test('enlarged inline English and Chinese links wrap without chips, clipping or page overflow and remain visible in forced colors',async({page},testInfo)=>{
  await reader(page,320,'dark');
  const before=await page.getByRole('link',{name:bodyLinks[0],exact:true}).evaluate(e=>parseFloat(window.getComputedStyle(e).fontSize));
  await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
  for(const name of bodyLinks){
    const link=page.getByRole('link',{name,exact:true});await link.scrollIntoViewIfNeeded();
    const g=await link.evaluate(e=>({font:window.getComputedStyle(e).fontSize,bg:window.getComputedStyle(e).backgroundColor,rects:[...e.getClientRects()].map(r=>({left:r.left,right:r.right})),width:window.innerWidth}));
    expect(parseFloat(g.font)).toBeGreaterThan(before);expect(g.rects.length).toBeGreaterThan(1);
    for(const r of g.rects){expect(r.left).toBeGreaterThanOrEqual(0);expect(r.right).toBeLessThanOrEqual(g.width);}
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
    await page.screenshot({path:testInfo.outputPath(`link-320-amplified-${bodyLinks.indexOf(name)}.png`)});
  }
  await page.emulateMedia({forcedColors:'active'});const link=page.getByRole('link',{name:bodyLinks[1],exact:true});await link.focus();await link.press('Shift+Tab');await page.keyboard.press('Tab');
  expect(await link.evaluate(e=>window.getComputedStyle(e).textDecorationLine)).toBe('underline');
  await expectVisibleKeyboardFocus(link);
  await page.screenshot({path:testInfo.outputPath('prose-link-forced-colors.png')});
});

for(const javaScriptEnabled of [true,false])test(`direct fragments and open native outline clear the real enlarged toolbar with JavaScript ${javaScriptEnabled?'on':'off'}`,async({browser,baseURL},testInfo)=>{
  const context=await browser.newContext({baseURL,javaScriptEnabled}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try{
    for(const width of [1188,390,320]){
      await page.setViewportSize({width,height:900});await page.goto(at(route));
      const href=await page.locator('.outline-rail a').nth(1).getAttribute('href'),id=decodeURIComponent(href.slice(1));
      await page.goto(`${at(route)}${href}`);const target=page.locator(`[id="${id}"]`);await expect(target).toBeFocused();await clearance(page,target);
      await page.evaluate(()=>{document.documentElement.style.fontSize='200%';});
      const summary=page.locator('.mobile-outline summary');await summary.focus();await summary.press('Enter');
      const panel=page.locator('.mobile-outline .reading-disclosure-body');await expect(panel).toBeVisible();
      const next=page.locator('.mobile-outline a').nth(2),nextId=decodeURIComponent((await next.getAttribute('href')).slice(1));
      await next.click();const destination=page.locator(`[id="${nextId}"]`);await expect(destination).toBeFocused();
      if(javaScriptEnabled)await expect(panel).toBeHidden();else await expect(panel).toBeVisible();
      await clearance(page,destination,javaScriptEnabled?null:'.mobile-outline .reading-disclosure-body');
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
      await page.screenshot({path:testInfo.outputPath(`toolbar-fragment-${width}-js-${javaScriptEnabled}.png`)});
    }
    expect(errors).toEqual([]);
  }finally{await context.close();}
});
