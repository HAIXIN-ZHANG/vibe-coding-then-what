import { VolumeOneDownload } from './volume-one-download.tsx';
import type { Locale } from '../config/i18n.ts';
import Link from 'next/link';
import { site } from '../config/site.ts';
import { getMessages, localePath } from '../config/i18n.ts';
import { getBook, getEnglishBook } from '../content/book.ts';
import { englishStatus, hasEnglishEdition } from '../content/english-edition.ts';
import { chapterPath } from '../content/manifest.ts';
import { readingParts } from '../content/reading-parts.ts';
import { ChapterNavigation } from './reading/chapter-navigation.tsx';
import { homeContent } from './home-content.ts';
import { readingLocator } from '../content/reading-locator.ts';
import { ContinueReading } from './reading/continue-reading.tsx';

export async function ReadingIndex({ locale }: { locale: Locale }) {
  const english = locale === 'en' ? (await getEnglishBook()).map(readingLocator) : [];
  const messages = getMessages(locale);
  const copy = homeContent[locale];
  const chapters = await getBook();
  const groups = readingParts(chapters.map(chapter => chapter.entry).filter(entry => locale === 'zh' || hasEnglishEdition(entry.id)), locale);
  const closing = chapters.find(chapter => chapter.entry.part === 9);
  return (
    <div className="directory-layout">
      <aside className="directory-sidebar home-sidebar">
        <ChapterNavigation label={copy.navigation} showAvailability={false} groups={[{
          id: 'book', title: copy.book, chapters: [
            { id: 'overview', title: copy.overview, availability: '', status: 'available', href: localePath(locale) },
            { id: 'directory', title: messages.contents, availability: '', status: 'available', href: localePath(locale, 'read/'), current: true },
          ],
        }]} />
      </aside>
      <section className="reading-index" aria-labelledby="contents-title">
        <p className="eyebrow">{copy.book}</p>
        <h1 id="contents-title">{messages.directory.title}</h1>
        <p className="availability-note">{messages.availableNotice(chapters.length)}</p>
        {locale === 'en' ? <p>{messages.englishUnavailable}</p> : <p><VolumeOneDownload /></p>}
        <ContinueReading locale={locale} english={english} chapters={chapters.map(readingLocator)} />
        <section className="directory-chapters home-chapters" aria-labelledby="directory-available">
          <h2 id="directory-available">{messages.directory.available}</h2>
          <p id="directory-availability" className="visually-hidden">{locale === 'en' ? 'English editions' : messages.chineseEdition}</p>
          {groups.map(part => <section key={part.id} aria-labelledby={part.id}>
            <h3 id={part.id}>{part.title}</h3>
            <ol className="available-chapters" start={part.entries[0].order}>{part.entries.map(chapter => <li key={chapter.id}>
              <span className="directory-chapter-number" aria-hidden="true">{String(chapter.order).padStart(2, '0')}</span>
              <div>
                <Link href={chapterPath(chapter, locale)} hrefLang={locale} aria-describedby="directory-availability">
                  <span className="directory-chapter-title" lang={messages.chapterLabels[chapter.id] ? undefined : 'zh-CN'}>
                    {messages.chapterLabels[chapter.id] ?? chapter.title}
                  </span>
                  <span className="directory-chapter-language" aria-hidden="true">{locale === 'en' ? englishStatus(chapter.id) : '中文'} →</span>
                </Link>
                {messages.chapterBenefits[chapter.id] ? <p>{messages.chapterBenefits[chapter.id]}</p> : null}
              </div>
            </li>)}</ol>
            {locale === 'zh' && part.id === 'part-9' && closing ? <ul className="closing-sections">
              {closing.headings.filter(heading => heading.level === 2).map(heading => <li key={heading.id}>
                <Link href={chapterPath(closing.entry) + '#' + encodeURIComponent(heading.id)}>{heading.title}</Link>
              </li>)}
            </ul> : null}
          </section>)}
        </section>
        <a className="text-link" href={site.issues}>{messages.suggest} <span aria-hidden="true">↗</span></a>
      </section>
    </div>
  );
}
