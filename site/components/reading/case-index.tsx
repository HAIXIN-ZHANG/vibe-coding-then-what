import { withBasePath } from '../../config/deployment.ts';
import { BrowserShortReading, browserShortReadingAnchor } from './browser-short-reading.tsx';

const cases = [
  { slug: 'p3-callback', section: '四个编号别写在同一个格里', text: '转换商已经回信，老师为什么还找不到讲义？' },
  { slug: 'p5-receipt', section: '旧手机又找到信号了', text: '幂等与迟到的重试：取消后，旧手机又发来报名申请。' },
  { slug: 'p7-restore', section: '跑完了才有一个用过的数字', text: '恢复演练：分清可能丢了多久的数据，以及读者等了多久。' },
  { slug: 'p8-good-answer', section: '给错误各找一把椅子', text: '评估 AI：同样答对三题，哪一种错误需要停下来？' },
] as const;

export function CaseIndex() {
  return <>
    <details className="case-index">
      <summary id="case-index">按问题找案例</summary>
      <ul>{cases.map(item =>
        <li key={item.slug}><a href={withBasePath(
          '/zh/read/' + item.slug + '/#' + encodeURIComponent(item.section), process.env.NEXT_PUBLIC_BASE_PATH,
        )}>{item.text}</a></li>)}
        <li><a href={'#' + browserShortReadingAnchor}>短读：我就想搜一门课</a></li>
      </ul>
    </details>
    <BrowserShortReading />
  </>;
}
