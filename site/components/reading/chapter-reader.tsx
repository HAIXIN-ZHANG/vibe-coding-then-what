import { Fragment } from 'react';
import Link from 'next/link';
import { ChapterAudio, PassageLanding } from './chapter-media.tsx';
import { CaseIndex } from './case-index.tsx';
import { BrowserShortReadingLink, browserShortReadingSection } from './browser-short-reading.tsx';
import { findRecording } from '../../content/chapter-recordings.ts';
import { EnrolmentFigure } from './enrolment-figure.tsx';
import type { LoadedChapter } from '../../content/load-book.ts';
import type { ChapterEntry } from '../../content/manifest.ts';
import { chapterPath } from '../../content/manifest.ts';
import { BookNavigation } from './book-navigation.tsx';
import { OnThisPage } from './on-this-page.tsx';
import { MarkdownContent } from './markdown-content.tsx';
import { ReaderLayout } from './reader-layout.tsx';
import { readingLocator } from '../../content/reading-locator.ts';
import { ReadingProgress } from './reading-progress.tsx';
import { BookInfo } from './book-info.tsx';

export function ChapterReader({ chapter, chapters }: { chapter: LoadedChapter; chapters: readonly ChapterEntry[] }) {
  const index = chapters.findIndex(entry => entry.id === chapter.entry.id);
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const bookNavigation = <BookNavigation chapters={chapters} currentId={chapter.entry.id} />;
  const outline = <OnThisPage label="本章目录" headings={chapter.headings} />;
  const diagram = chapter.entry.id === 'G01' ? chapter.tree.children.find(node =>
    node.type === 'code' && node.data?.sectionTitle === '先画一张够用的图') : undefined;
  const audio = findRecording(chapter.entry.id, 'zh', chapter.entry.sha256);
  const sharing = { chapterId: chapter.entry.id, chapterTitle: chapter.title, sourceHash: chapter.entry.sha256 };
  return <ReaderLayout navigation={bookNavigation} outline={outline} bookInfo={<BookInfo locale="zh" />}>
      <article className="chapter-prose" data-chapter-id={chapter.entry.id} data-source-sha256={chapter.entry.sha256}>
        <PassageLanding />
        <ReadingProgress chapter={readingLocator(chapter)} />
        {chapter.tree.children.map((node, index) => <Fragment key={index}>
          {node === diagram ? <EnrolmentFigure /> : null}
          <MarkdownContent node={node} sharing={sharing} />
          {chapter.entry.id === 'F01' && node.type === 'heading' && node.data?.id === browserShortReadingSection &&
            <p><BrowserShortReadingLink locale="zh" returning /></p>}
          {node.type === 'heading' && node.depth === 1 && audio && <ChapterAudio recording={audio} />}
        </Fragment>)}
      </article>
      {chapter.entry.id === 'opening' && <CaseIndex />}
      <nav className="chapter-pagination" aria-label="前后章节">
        {previous ? <Link href={chapterPath(previous)} rel="prev"><span>上一章</span>{previous.title}</Link> : null}
        {next ? <Link href={chapterPath(next)} rel="next"><span>下一章</span>{next.title}</Link>
          : <Link href="/zh/read/"><span>已到当前最后一章</span>返回可阅读章节</Link>}
      </nav>
  </ReaderLayout>;
}
