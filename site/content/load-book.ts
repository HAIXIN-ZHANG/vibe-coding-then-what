import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import type { BookId } from '../config/books.ts';
import type { ChapterEntry } from './manifest.ts';
import type { ParsedMarkdown } from './markdown.ts';
import { chapterManifest, legacyHeadingAliases, validateManifest } from './manifest.ts';
import { applyLegacyHeadingAlias, parseMarkdown, walkMarkdown } from './markdown.ts';
import { resolveChapterLink } from './links.ts';

export type LoadedChapter = ParsedMarkdown & { entry: ChapterEntry };

export function loadedChaptersForBook(chapters: readonly LoadedChapter[], bookId: BookId): LoadedChapter[] {
  return chapters.filter(chapter => chapter.entry.bookId === bookId);
}

export async function loadBook(root: string = process.cwd(), entries: readonly ChapterEntry[] = chapterManifest): Promise<LoadedChapter[]> {
  validateManifest(entries);
  const bookRoot = await realpath(path.join(root, 'book'));
  const chapters = await Promise.all(entries.map(async entry => {
    const source = await realpath(path.join(root, entry.source));
    if (!source.startsWith(`${bookRoot}${path.sep}`)) throw new Error(`Source escapes book/: ${entry.id}`);
    const bytes = await readFile(source);
    if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256) throw new Error(`Reviewed source hash mismatch: ${entry.id}`);
    const parsed = parseMarkdown(bytes.toString('utf8'));
    if (parsed.title !== entry.title) throw new Error(`Source H1 differs from reviewed title: ${entry.id}`);
    for (const alias of legacyHeadingAliases.filter(alias => alias.chapterId === entry.id)) {
      applyLegacyHeadingAlias(parsed, alias.legacyId, alias.headingId);
    }
    return { entry, ...parsed };
  }));
  for (const chapter of chapters) walkMarkdown(chapter.tree, node => {
    if (node.type === 'link') node.url = resolveChapterLink(node.url, chapter.entry, chapters);
  });
  return chapters;
}
