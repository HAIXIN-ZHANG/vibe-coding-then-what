import Link from 'next/link';
import { bookCatalog } from '../../config/books.ts';
import { getMessages, type Locale } from '../../config/i18n.ts';
import { chapterNeighbors, chapterPath, type ChapterEntry } from '../../content/manifest.ts';
import { ChapterArrow } from './chapter-arrow.tsx';

export function ChapterPagination({ locale, chapter, chapters }: { locale: Locale; chapter: ChapterEntry; chapters: readonly ChapterEntry[] }) {
  const messages = getMessages(locale);
  const labels = messages.pagination;
  const { previous, next } = chapterNeighbors(chapters, chapter);
  return <nav className="chapter-pagination" aria-label={labels.label}>
    {previous ? <Link href={chapterPath(previous, locale)} rel="prev">
      <span className="pagination-label"><ChapterArrow direction="back" />{labels.previous}</span>
      <span className="pagination-title">{messages.chapterLabels[previous.id] ?? previous.title}</span>
    </Link> : null}
    {next ? <Link href={chapterPath(next, locale)} rel="next">
      <span className="pagination-label">{labels.next}<ChapterArrow direction="forward" /></span>
      <span className="pagination-title">{messages.chapterLabels[next.id] ?? next.title}</span>
    </Link> : <Link href={bookCatalog[chapter.bookId].editions[locale].entry} className="pagination-index">
      <span className="pagination-label">{labels.last}</span>
      <span className="pagination-title">{labels.directory}</span>
    </Link>}
  </nav>;
}
