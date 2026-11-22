import { withBasePath } from '../../config/deployment.ts';
import type { Locale } from '../../config/i18n.ts';
import { chapterManifest, chapterPath } from '../../content/manifest.ts';

export const browserShortReadingAnchor = 'three-waits';
export const browserShortReadingSection = '同样是慢等的可能不是一件事';
const opening = chapterManifest.find(entry => entry.bookId === 'work' && entry.id === 'opening');
const browser = chapterManifest.find(entry => entry.bookId === 'work' && entry.id === 'F01');
if (!opening || !browser) throw new Error('The short reading needs its reviewed chapters');
const samplePath = `${chapterPath(opening)}#${browserShortReadingAnchor}`;
const browserPath = `${chapterPath(browser)}#${encodeURIComponent(browserShortReadingSection)}`;

export function BrowserShortReadingLink({ locale, returning = false }: { locale: Locale; returning?: boolean }) {
  return <a className="text-link" href={withBasePath(samplePath, process.env.NEXT_PUBLIC_BASE_PATH)} hrefLang="zh">
    {locale === 'en' ? 'Read the browser sample in Chinese' : returning ? '回到短读《我就想搜一门课》' : '短读：我就想搜一门课'}
  </a>;
}

// Story and observations from the reviewed M3 browser sample (fb8f0b84…545d6).
const waits = [
  {
    title: '标题呢？',
    observation: '从打开课程页到这一刻，标题还没露面。要查它等在哪儿，可以先看页面和样式文件什么时候到，再对照浏览器什么时候把标题画出来。',
  },
  {
    title: '能打字了，能搜吗？',
    observation: '三个字已经输进去，搜索却还不能按。这个页面让脚本先装好处理点击的函数，再启用按钮。要是一直不能按，就去看脚本有没有取到、执行时有没有报错。',
  },
  {
    title: '点过了，怎么还有《网页排版》？',
    observation: '点下去和看见结果之间，旧列表留了一会儿。要分清原因，得把点击、处理开始和画面更新的时刻排在一起。如果发了请求，也看它何时发出、何时返回。处理可能还没轮到，也可能已经在等结果。',
  },
];

export function BrowserShortReading() {
  return <section className="browser-short-reading" aria-labelledby={browserShortReadingAnchor}>
    <h2 id={browserShortReadingAnchor} tabIndex={-1}>短读：我就想搜一门课</h2>
    <p>你打开课程列表，想找《浏览器基础》。朋友问：“慢在哪儿？”你指指屏幕，连个标题都还没露面。等“找到下一门课程”出来，你把“浏览器”三个字打进框里，旁边的搜索按钮却还不能按。按钮终于能用了。你点了一下，《网页排版》还好端端地待在列表里。手指刚要再点，它才从屏幕上消失，只剩你要找的那门课。朋友问：“刚才那一下，卡在哪儿了？”这回，光指着屏幕可说不准。</p>
    <ol>{waits.map(wait => <li key={wait.title}>
      <strong>{wait.title}</strong>
      <p>{wait.observation}</p>
    </li>)}</ol>
    <a className="text-link" href={withBasePath(browserPath, process.env.NEXT_PUBLIC_BASE_PATH)}>读正文：同样是“慢”，等的可能不是一件事</a>
  </section>;
}
