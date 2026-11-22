import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const stage = process.argv[2];
const json = async file => JSON.parse(await readFile(path.join(stage, file), 'utf8'));
const map = await json('source-map.json');
const pdf = await json('pdf-audit.json');
const normalize = value => value.normalize('NFKC').replace(/\s/gu, '');
const flatOutline = nodes => nodes.flatMap(node => [node, ...flatOutline(node.children)]);
const allBookmarks = flatOutline(pdf.outline);
const withoutFooter = page => page.text.replace(new RegExp(`\\s*${page.page} / ${pdf.pageCount}\\s*$`), '');
const blankPages = pdf.pages.filter(page => !normalize(withoutFooter(page))).map(page => page.page);
assert.equal(blankPages.length, 0, 'The proof must have no empty page');
const starts = map.chapters.map((chapter, i) => {
  const body = pdf.pages[chapter.start - 1];
  const heading = allBookmarks.find(node => node.page === chapter.start && normalize(node.label) === normalize(chapter.title));
  assert.ok(heading, `No native heading bookmark on p. ${chapter.start}: ${chapter.title}`);
  const prefix = normalize((chapter.openingPartLabel ?? '') + chapter.title);
  const text = normalize(withoutFooter(body));
  const atTop = text.startsWith(prefix);
  const openingOffset = chapter.openingExcerpt ? text.indexOf(chapter.openingExcerpt, text.indexOf(prefix) + prefix.length) : -1;
  const titleFromTopPt = body.heightPt - heading.y;
  if (map.pagination === 'chapter') {
    const previous = map.chapters[i - 1];
    if (previous) assert.equal(chapter.start, previous.end + 1, `Expected the next physical page after ${previous.file}`);
    assert.ok(atTop && titleFromTopPt < 76, `The first printed heading is not near the page top: ${chapter.title}`);
    assert.ok(!chapter.openingExcerpt || (openingOffset >= prefix.length && openingOffset < prefix.length + 100),
      `Opening prose must appear on p. ${chapter.start}: ${chapter.title}`);
  }
  return { file: chapter.file, title: chapter.title, part: chapter.part, page: chapter.start,
    topOfPage: atTop, titleFromTopPt, openingOffset, firstLines: withoutFooter(body).split('\n').filter(Boolean).slice(0, 6) };
});
await writeFile(path.join(stage, 'chapter-start-audit.json'), JSON.stringify({ pagination: map.pagination, blankPages, starts }, null, 2) + '\n');
console.log(`${starts.length} chapters inspected, ${starts.filter(page => page.topOfPage).length} begin with their title group; no empty pages`);
