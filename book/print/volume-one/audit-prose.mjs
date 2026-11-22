import { fromMarkdown } from 'mdast-util-from-markdown';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTableFromMarkdown } from 'mdast-util-gfm-table';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const stage = process.argv[2];
const readJson = async name => JSON.parse(await readFile(path.join(stage, name), 'utf8'));
const report = await readJson('source-map.json');
const proof = await readJson('pdf-audit.json');
const normalized = input => input.normalize('NFKC').replace(/\s/gu, '');
const withoutPaperReferences = input => input
  .replace(/〔(纸[一二三四五六七八])\s*·\s*第\s*\d+\s*页〕/gu, '（$1）')
  .replace(/〔第\s*\d+\s*页(?:\s*·[^〕]+)?〕/gu, '');
const content = block => 'value' in block ? block.value : block.children?.map(content).join('') ?? '';
function readableBlocks(node) {
  if (['heading', 'paragraph', 'code'].includes(node.type)) return [node];
  if (node.type === 'blockquote' && content(node) === '中文初稿 · 待 review') return [];
  if (['root', 'list', 'listItem', 'blockquote'].includes(node.type)) return node.children.flatMap(readableBlocks);
  return [];
}
let checked = 0;
const absent = [];

for (const entry of report.chapters) {
  const manuscript = await readFile(path.join(stage, 'source-files', entry.file), 'utf8');
  const tree = fromMarkdown(manuscript, {
    extensions: [gfmTable()], mdastExtensions: [gfmTableFromMarkdown()],
  });
  let offset = 0;
  const extracted = proof.pages.slice(entry.start - 1, entry.end).map(page =>
    normalized(withoutPaperReferences(page.text).replace(new RegExp(`\\s*${page.page} / ${proof.pageCount}\\s*$`), '')),
  ).join('');
  for (const block of readableBlocks(tree)) {
    const source = normalized(content(block));
    if (!source) continue;
    checked++;
    const start = extracted.indexOf(source, offset);
    if (start >= 0) offset = start + source.length;
    else absent.push({ file: entry.file, line: block.position.start.line, kind: block.type, sample: source.slice(0, 30) });
  }
}
console.log(JSON.stringify({ checked, unmatchedCount: absent.length, unmatched: absent }, null, 2));
