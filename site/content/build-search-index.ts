import type { Nodes } from 'mdast';
import type { BookId } from '../config/books.ts';
import type { Locale } from '../config/i18n.ts';
import { loadedChaptersForBook, type LoadedChapter } from './load-book.ts';
import type { SearchEntry, SearchIndex } from './search.ts';
import { chapterPath } from './manifest.ts';
import { nodeText } from './markdown.ts';

function publicText(node: Nodes): string {
  if ('value' in node) return node.value;
  if ('children' in node) return node.children.map(publicText).join(['paragraph', 'heading', 'strong', 'emphasis', 'link', 'tableCell'].includes(node.type) ? '' : ' ');
  return node.type === 'break' ? ' ' : '';
}

export function buildSearchIndex(chapters: readonly LoadedChapter[], locale: Locale, bookId: BookId = 'work'): SearchIndex {
  const entries: SearchEntry[] = [];
  for (const chapter of loadedChaptersForBook(chapters, bookId).filter(item => item.entry.locale === locale)) {
    let current: SearchEntry | undefined;
    for (const node of chapter.tree.children) {
      if (node.type === 'heading') {
        const headingId = node.data?.id;
        if (!headingId) throw new Error('Search needs the reader heading IDs');
        current = {
          chapterId: chapter.entry.id, chapterTitle: chapter.title, headingId, headingTitle: nodeText(node),
          locale, sourceHash: chapter.entry.sha256, href: `${chapterPath(chapter.entry)}#${encodeURIComponent(headingId)}`, text: '',
        };
        entries.push(current);
      } else if (current) current.text = `${current.text} ${publicText(node)}`.replace(/\s+/gu, ' ').trim();
    }
  }
  return { version: 1, locale, entries };
}
