import { BrowserShortReadingLink } from './reading/browser-short-reading.tsx';
import { VolumeOneDownload } from './volume-one-download.tsx';
import type { Locale } from '../config/i18n.ts';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '../config/site.ts';
import { getMessages, localePath } from '../config/i18n.ts';
import { withBasePath } from '../config/deployment.ts';
import { chapterManifest, chapterPath, chaptersForBook } from '../content/manifest.ts';
import { getBook, getEnglishBook } from '../content/book.ts';
import { readingLocator } from '../content/reading-locator.ts';
import { HomeReadingAction } from './reading/continue-reading.tsx';
import { readingParts } from '../content/reading-parts.ts';
import { VolumeSwitch } from './companion-book.tsx';
import { hasEnglishEdition } from '../content/english-edition.ts';
import { ChapterNavigation } from './reading/chapter-navigation.tsx';
import { homeContent } from './home-content.ts';

export async function HomePage({ locale }: { locale: Locale }) {
  const english = locale === 'en' ? (await getEnglishBook()).map(readingLocator) : [];
  const messages = getMessages(locale), copy = homeContent[locale];
  const work = chaptersForBook(chapterManifest, 'work');
  const entries = work.filter(chapter => locale === 'zh' || hasEnglishEdition(chapter.id));
  const groups = readingParts(entries, locale);
  const positions = (await getBook()).map(readingLocator);
  const illustration = <figure className="home-system-figure">
    <p className="home-example-label">{copy.example}</p>
    <h2>{copy.exampleTitle}</h2>
    <picture>
      <source media="(max-width: 899px)" srcSet={withBasePath('/illustrations/home-systems-mobile.svg', process.env.NEXT_PUBLIC_BASE_PATH)} width={304} height={54} />
      <Image unoptimized src={withBasePath('/illustrations/home-systems-desktop.svg', process.env.NEXT_PUBLIC_BASE_PATH)}
        width={410} height={112} alt={copy.illustrationAlt} />
    </picture>
    <ol className="home-system-stages" aria-hidden="true">{copy.stages.map(stage => <li key={stage}>{stage}</li>)}</ol>
    <figcaption>{copy.exampleCaption}</figcaption>
  </figure>;
  return <div className="home-layout">
    <aside className="home-sidebar">
      <details open className="home-navigation">
        <summary aria-label={copy.navigation}><span aria-hidden="true">☰</span><span className="home-navigation-label">{copy.book}</span></summary>
        <div className="home-navigation-body">
          <Link className="home-overview" href={localePath(locale)} aria-current="page">{copy.overview}</Link>
          <ChapterNavigation showAvailability={false} label={copy.navigation} groups={groups.map(part => ({
            id: part.id, title: part.title, chapters: part.entries.map(chapter => ({
              id: chapter.id, title: messages.chapterLabels[chapter.id] ?? chapter.title, availability: messages.chineseEdition,
              status: 'available', href: chapterPath(chapter, locale), lang: messages.chapterLabels[chapter.id] ? undefined : 'zh-CN',
            })),
          }))} />
        </div>
      </details>
    </aside>
    <section className="book-intro" aria-labelledby="book-title">
      <VolumeSwitch locale={locale} current="work" availableChapters={work.length} />
      <div className="home-hero">
        <div className="home-hero-copy">
          <h1 id="book-title">{messages.titleLines[0]}<span>{messages.titleLines[1]}</span></h1>
          <p className="intro">{messages.description}</p>
          <div className="actions">
            <HomeReadingAction locale={locale} english={english} chapters={positions} firstLabel={copy.read} />
            <BrowserShortReadingLink locale={locale} />
            <Link className="text-link" href={localePath(locale, 'read/')}>{messages.browse} <span aria-hidden="true">→</span></Link>
          </div>
          {locale === 'zh' ? <VolumeOneDownload /> : null}
          <p className="availability-note">{messages.availableNotice(work.length)}</p>
        </div>
        {illustration}
      </div>
      <section className="home-chapters" aria-labelledby="start-reading">
        <h2 id="start-reading">{messages.startReading}</h2>
        {locale === 'en' ? <p className="availability-note">{messages.englishUnavailable}</p> : null}
        <ol>{entries.map((chapter, index) => <li key={chapter.id}>
          <span className="home-chapter-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <Link href={chapterPath(chapter, locale)} hrefLang={locale} lang={messages.lang}>
              <span className="home-chapter-title" lang={messages.chapterLabels[chapter.id] ? undefined : 'zh-CN'}>{messages.chapterLabels[chapter.id] ?? chapter.title}</span><span className="home-chapter-arrow" aria-hidden="true">→</span>
            </Link>
            {messages.chapterBenefits[chapter.id] ? <p>{messages.chapterBenefits[chapter.id]}</p> : null}
          </div>
        </li>)}</ol>
      </section>
      <section className="home-topics" aria-labelledby="home-topics-title">
        <h2 id="home-topics-title">{copy.explore}</h2>
        <ol>{groups.filter(part => !['part-0', 'part-9'].includes(part.id)).map((part, index) => <li key={part.id}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <h3><Link href={localePath(locale, 'read/') + '#' + part.id}>{part.title}</Link></h3>
        </li>)}</ol>
      </section>
      <a className="home-repository text-link" href={site.repository}>{messages.repository} <span aria-hidden="true">↗</span></a>
    </section>
  </div>;
}
