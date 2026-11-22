import Link from 'next/link';
import { BookChoiceAnchor } from './book-choice-anchor.tsx';
import Image from 'next/image';
import { withBasePath } from '../config/deployment.ts';
import { getMessages, type Locale } from '../config/i18n.ts';
import { bookCatalog, type BookId } from '../config/books.ts';

export const companionCopy = {
  en: {
    ...bookCatalog.life.editions.en,
    switchLabel: 'Choose a volume', work: 'Volume I · Work', life: 'Volume II · Life', first: 'Volume I',
    more: 'About Volume II', heading: 'Inside the book',
    topics: ['A little help with everyday tasks', 'When the other side uses AI too', 'Deciding what to keep for yourself'],
    previews: [
      'A learner has the screenshots and the dates, but the email is still a blank page. What changes when asking for help gets a little easier?',
      'The learner writes in a minute. Customer support replies in seconds. On Monday the enrolment is still missing. Who can actually put it right?',
      'A plugin sits unfinished. A paper book is waiting. With one evening to spare, which would you pick up?',
    ],
    note: 'The chapters are in the works. Open a theme for a glimpse of the stories.',
  },
  zh: {
    ...bookCatalog.life.editions.zh,
    switchLabel: '选择分册', work: '上册 · 工作', life: '下册 · 生活', first: '上册',
    more: '了解下册', heading: '这本书想聊什么',
    topics: ['先让它帮个小忙', '当对面也用上了 AI', '接下来，我怎么选'],
    previews: [
      '截图有了，日期也记得，申诉邮件却迟迟没有开头。如果 AI 能帮一个原本打算放弃的人把话说清楚，会有什么不同？',
      '学员一分钟写好邮件，客服几秒钟就回了信。到了星期一，名单上还是没有他。究竟谁能把这件事办好？',
      '做了一半的插件还在，看到一半的纸书也在。如果今晚真能腾出两个小时，你想先打开哪一个？',
    ],
    note: '章节还在准备中。展开这三辑，可以先看看我们想聊的故事。',
  },
} as const;

export function companionPath(locale: Locale) {
  return bookCatalog.life.editions[locale].entry;
}

export function VolumeSwitch({ locale, current, availableChapters }: { locale: Locale; current: BookId; availableChapters?: number }) {
  const copy = companionCopy[locale];
  const work = bookCatalog.work.editions[locale];
  if (availableChapters !== undefined) {
    const messages = getMessages(locale);
    return <nav className="volume-switch book-choices" id="books" aria-label={copy.switchLabel}>
      <BookChoiceAnchor />
      <Link href={work.home} aria-current="page" className="selected-volume">
        <Image unoptimized alt="" src={withBasePath(work.cover.src, process.env.NEXT_PUBLIC_BASE_PATH)} width={39} height={52} />
        <span>{work.title}</span>
        <small>{messages.availableNotice(availableChapters)}</small>
      </Link>
      <Link href={companionPath(locale)}>
        <span>{copy.title}</span>
        <small>{copy.status}</small>
      </Link>
    </nav>;
  }
  return <nav className="volume-switch" aria-label={copy.switchLabel}>
    <Link href={work.home} aria-current={current === 'work' ? 'page' : undefined}>{copy.work}</Link>
    <Link href={companionPath(locale)} aria-current={current === 'life' ? 'page' : undefined}>{copy.life}</Link>
  </nav>;
}

export function CompanionBook({ locale }: { locale: Locale }) {
  const copy = companionCopy[locale];
  return <article className="companion-overview">
    <VolumeSwitch locale={locale} current="life" />
    <header className="companion-hero">
      <div className="companion-heading">
        <p className="home-byline">{copy.status}</p>
        <h1>{copy.title}</h1>
        <p className="intro">{copy.description}</p>
      </div>
      <div className="book-cover companion-cover">
        <Image unoptimized src={withBasePath(copy.cover.src, process.env.NEXT_PUBLIC_BASE_PATH)}
          width={480} height={640} alt={copy.cover.alt} />
      </div>
    </header>
    <section className="companion-themes" aria-labelledby="companion-themes">
      <div><h2 id="companion-themes">{copy.heading}</h2><p className="availability-note">{copy.note}</p></div>
      <div className="theme-list">{copy.topics.map((topic, i) =>
        <details key={topic} open={i === 0} name="volume-two-themes">
          <summary>{topic}<span aria-hidden="true" /></summary>
          <p>{copy.previews[i]}</p>
        </details>)}</div>
    </section>
  </article>;
}
