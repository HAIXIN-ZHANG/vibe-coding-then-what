import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { englishEditions } from './english-edition.ts';
import type { LoadedChapter } from './load-book.ts';
import { chapterManifest } from './manifest.ts';
import { parseMarkdown, walkMarkdown } from './markdown.ts';
import { resolveChapterLink } from './links.ts';

export async function loadEnglishBook(chinese: readonly LoadedChapter[], root = process.cwd()): Promise<LoadedChapter[]> {
  const chapters: LoadedChapter[] = [];
  for (const original of chapterManifest) {
    const edition = englishEditions[original.id];
    if (!edition?.source || !edition.sha256) continue;
    if (edition.chineseSha256 !== original.sha256 || edition.slug !== original.slug) throw new Error('Unmatched adaptation: ' + original.id);
    const bytes = await readFile(path.resolve(root, edition.source));
    if (createHash('sha256').update(bytes).digest('hex') !== edition.sha256) throw new Error('Changed English source: ' + original.id);
    const parsed = parseMarkdown(bytes.toString('utf8'));
    chapters.push({ ...parsed, entry: { ...original, title: parsed.title, locale: 'en', source: edition.source, sha256: edition.sha256 } });
  }
  const targets = [...chapters, ...chinese];
  for (const chapter of chapters) walkMarkdown(chapter.tree, node => {
    if (node.type === 'link') node.url = resolveChapterLink(node.url, chapter.entry, targets);
  });
  return chapters;
}
