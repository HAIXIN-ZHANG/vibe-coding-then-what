import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBook } from '../../../../../content/book.ts';
import { ChapterReader } from '../../../../../components/reading/chapter-reader.tsx';
import { chapterPath } from '../../../../../content/manifest.ts';
import { getMessages } from '../../../../../config/i18n.ts';
import { readingMetadata } from '../../../../../config/page-metadata.ts';

type ChapterPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getBook()).map(chapter => ({ slug: chapter.entry.slug }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const [{ slug }, chapters] = await Promise.all([params, getBook()]);
  const chapter = chapters.find(item => item.entry.slug === slug);
  if (!chapter) notFound();
  return readingMetadata('zh', chapter.entry.bookId, { kind: 'chapter', chapterId: chapter.entry.id, route: chapterPath(chapter.entry),
    title: `${chapter.title} | ${getMessages('zh').title}`,
    description: `${chapter.title} · 中文全卷。` });
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const [{ slug }, chapters] = await Promise.all([params, getBook()]);
  const chapter = chapters.find(item => item.entry.slug === slug);
  if (!chapter) notFound();
  return <ChapterReader chapter={chapter} chapters={chapters.map(item => item.entry)} />;
}
