import type { Metadata } from 'next';
import Link from 'next/link';
import { getEnglishBook } from '../../../../content/book.ts';
import { englishEditions, hasEnglishEdition, englishStatus } from '../../../../content/english-edition.ts';
import { MarkdownContent } from '../../../../components/reading/markdown-content.tsx';
import { PassageLanding } from '../../../../components/reading/chapter-media.tsx';
import { ReadingProgress } from '../../../../components/reading/reading-progress.tsx';
import { readingLocator } from '../../../../content/reading-locator.ts';
import { notFound } from 'next/navigation';
import { ChapterPagination } from '../../../../components/reading/chapter-pagination.tsx';
import { getMessages, localePath } from '../../../../config/i18n.ts';
import { chapterManifest, chapterPath, chaptersForBook } from '../../../../content/manifest.ts';
import { readingMetadata } from '../../../../config/page-metadata.ts';

type OverviewProps = { params: Promise<{ slug: string }> };
const messages = getMessages('en');
const chapters = chaptersForBook(chapterManifest, 'work').filter(entry => hasEnglishEdition(entry.id));

export const dynamicParams = false;

export function generateStaticParams() {
  return chapters.map(({ slug }) => ({ slug }));
}

async function getChapter(params: OverviewProps['params']) {
  const { slug } = await params;
  const chapter = chapters.find(entry => entry.slug === slug);
  if (!chapter) notFound();
  return chapter;
}

export async function generateMetadata({ params }: OverviewProps): Promise<Metadata> {
  const chapter = await getChapter(params);
  return readingMetadata('en', chapter.bookId, { kind: englishEditions[chapter.id]?.source ? 'chapter' : 'overview', chapterId: chapter.id, route: chapterPath(chapter, 'en'),
    title: `${messages.chapterLabels[chapter.id]} | ${messages.title}`,
    description: `${messages.chapterBenefits[chapter.id]} ${englishStatus(chapter.id)}.` });
}

export default async function ChapterOverview({ params }: OverviewProps) {
  const chapter = await getChapter(params);
  const body = (await getEnglishBook()).find(item => item.entry.id === chapter.id);
  if (body) return <section className="english-reading">
    <article className="chapter-prose" data-chapter-id={chapter.id} data-source-sha256={body.entry.sha256}>
      <PassageLanding />
      <ReadingProgress chapter={readingLocator(body)} locale="en" />
      <MarkdownContent node={body.tree} locale="en" sharing={{ chapterId: chapter.id, chapterTitle: body.title, sourceHash: body.entry.sha256 }} />
    </article>
    <Link href={chapterPath(chapter)} hrefLang="zh">{messages.readOriginal}</Link>
    <ChapterPagination locale="en" chapter={chapter} chapters={chapters} />
  </section>;
  return <article className="chapter-overview" data-chapter-overview={chapter.id}>
    <h1>{messages.chapterLabels[chapter.id]}</h1>
    <p className="chapter-overview-benefit">{messages.chapterBenefits[chapter.id]}</p>
    <p className="chapter-overview-availability">{messages.chapterAvailability}.</p>
    <div className="chapter-overview-actions">
      <Link className="button" href={chapterPath(chapter)} hrefLang="zh">
        {messages.readOriginal} <span aria-hidden="true">→</span>
      </Link>
      <Link className="text-link" href={localePath('en', 'read/')}>{messages.contents}</Link>
    </div>
    <ChapterPagination locale="en" chapter={chapter} chapters={chapters} />
  </article>;
}
