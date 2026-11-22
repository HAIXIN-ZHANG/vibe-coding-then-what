import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages } from '../../../../../config/i18n.ts';
import { getBook } from '../../../../../content/book.ts';
import { ChapterReader } from '../../../../../components/reading/chapter-reader.tsx';

type ChapterPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getBook()).map(chapter => ({ slug: chapter.entry.slug }));
}

export async function generateMetadata({ params }: ChapterPageProps): Promise<Metadata> {
  const [{ slug }, chapters] = await Promise.all([params, getBook()]);
  const chapter = chapters.find(item => item.entry.slug === slug);
  if (!chapter) notFound();
  return { title: chapter.title, description: `${chapter.title} · ${getMessages('zh').editionLabel}。` };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const [{ slug }, chapters] = await Promise.all([params, getBook()]);
  const chapter = chapters.find(item => item.entry.slug === slug);
  if (!chapter) notFound();
  return <ChapterReader chapter={chapter} chapters={chapters.map(item => item.entry)} />;
}
