import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chapterManifest, chapterPath, legacyHeadingAliases, validateManifest } from '../site/content/manifest.ts';
import { loadBook } from '../site/content/load-book.ts';
import { applyLegacyHeadingAlias, parseMarkdown, nodeText, walkMarkdown } from '../site/content/markdown.ts';
import { resolveChapterLink } from '../site/content/links.ts';
import { alternateLocalePath } from '../site/config/i18n.ts';

test('all 51 approved sources load with original titles, attribution, diagrams and citations', async () => {
  const chapters = await loadBook();
  const indexPath = 'book/revisions/zh/volume-one-making-of/README.md';
  const bytes = await readFile(indexPath);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), 'cea851dcbdda205357a4ead2519870d475619a8cab3af66ab62b0b64637d585a');
  const names = [...new Set([...bytes.toString().matchAll(/\]\(([^)#]+\.md)\)/g)].map(([, name]) => name))];
  assert.equal(chapters.length, 51);
  assert.deepEqual(chapters.map(chapter => path.basename(chapter.entry.source)), names);
  assert.deepEqual(Array.from({ length: 10 }, (_, part) => chapters.filter(chapter => chapter.entry.part === part).length),
    [1, 3, 8, 6, 6, 6, 6, 6, 8, 1]);
  const readingOrder = createHash('sha256');
  for (const file of [indexPath, ...chapters.map(chapter => chapter.entry.source)]) {
    readingOrder.update(file).update('\0').update(await readFile(file)).update('\0');
  }
  assert.equal(readingOrder.digest('hex'), 'e03d1343bdee7e304e16240b1991dee6dd741ae5ae6b4a4f8d9a8418b8c7af2a');
  assert.equal(chapters[0].title, '写在前面：能跑，然后呢？');
  assert.match(nodeText(chapters[0].tree), /作者：缸子太子与世界/);
  assert.match(nodeText(chapters[0].tree), /这本书从资料整理、正文起草到反复修改，都有 AI 的帮助/);
  assert.equal(chapters[1].tree.children.filter(node => node.type === 'code').length, 4);
  assert.equal(chapters[1].tree.children.filter(node => node.type === 'table').length, 2);
  const urls = [];
  for (const chapter of chapters) walkMarkdown(chapter.tree, node => { if (node.type === 'link') urls.push(node.url); });
  assert.ok(urls.includes('/zh/read/a-page-and-a-system/'));
  assert.ok(urls.includes('/zh/read/before-we-start/'));
  assert.ok(urls.some(url => url.startsWith('https://www.rfc-editor.org/')));
  assert.doesNotMatch(nodeText(chapters[0].tree), /中文初稿 · 待 review/);
});

test('all 27 previously published identities, routes and heading targets survive the edition change', async () => {
  const r2 = 'book/revisions/zh/volume-one-r2/';
  const catalog = await readFile(r2 + 'README.md', 'utf8');
  const names = [...new Set([...catalog.matchAll(/\]\(([^)#]+\.md)\)/g)].map(([, name]) => name))];
  const special = {
    '00-before-we-start.md': ['opening', 'before-we-start'],
    '01-a-page-and-a-system.md': ['G01', 'a-page-and-a-system'],
    '02-browser-foundations.md': ['F01', 'browser-foundations'],
    '03-after-ai-finishes.md': ['P810', 'after-ai-finishes'],
  };
  assert.equal(names.length, 27);
  const chapters = await loadBook();
  for (const name of names) {
    const slug = path.basename(name, '.md');
    const [id, publicSlug] = special[name] ?? [slug, slug];
    const chapter = chapters.find(item => item.entry.id === id);
    assert.ok(chapter, name);
    assert.equal(chapterPath(chapter.entry), `/zh/read/${publicSlug}/`);
    const previous = parseMarkdown(await readFile(r2 + name, 'utf8'));
    const available = new Set(chapter.headingIds);
    walkMarkdown(chapter.tree, node => {
      if (node.type === 'heading') for (const alias of node.data?.legacyIds ?? []) available.add(alias);
    });
    for (const id of previous.headingIds) assert.ok(available.has(id), `${name}#${id}`);
  }
});

test('the approved browser chapter retains fenced illustrative HTML and its canonical link back to G01', async () => {
  const chapters = await loadBook();
  const browser = chapters.find(chapter => chapter.entry.id === 'F01');
  assert.equal(browser.title, '页面出现之前，浏览器在忙什么？');
  assert.equal(browser.entry.sha256, '833d20da8d946635221af05e264d506cc9e5d5692c24b75fccb2812cd57b854d');
  assert.equal(browser.tree.children.filter(node => node.type === 'code').length, 4);
  assert.equal(browser.tree.children.filter(node => node.type === 'table').length, 2);
  assert.equal(browser.tree.children.find(node => node.type === 'code').lang, 'html');
  const links = browser.tree.children.filter(node => node.type === 'paragraph')
    .flatMap(node => node.children.filter(child => child.type === 'link').map(child => child.url));
  assert.ok(links.includes(chapterPath(chapters.find(chapter => chapter.entry.id === 'G01').entry)));
  assert.ok(links.some(url => url.startsWith('https://html.spec.whatwg.org/')));
});

test('manifest rejects duplicates, invalid order, traversal and absent review provenance', () => {
  assert.doesNotThrow(() => validateManifest(chapterManifest));
  for (const replacement of [
    { ...chapterManifest[1], id: 'opening' }, { ...chapterManifest[1], slug: 'before-we-start' },
    { ...chapterManifest[1], source: chapterManifest[0].source }, { ...chapterManifest[1], order: 1 },
    { ...chapterManifest[1], source: 'book/../private.md' }, { ...chapterManifest[1], slug: '../outside' },
    { ...chapterManifest[1], sha256: 'unreviewed' }, { ...chapterManifest[1], review: '' },
  ]) assert.throws(() => validateManifest([chapterManifest[0], replacement]));
  assert.throws(() => validateManifest([]));
  assert.equal(chapterPath(chapterManifest[1]), '/zh/read/a-page-and-a-system/');
});

test('changed bytes, missing files and symlinks outside book fail instead of silently rendering', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'vctw-source-test-'));
  try {
    await mkdir(path.join(root, 'book'));
    const body = '# Fixture\n\nReviewed text.\n';
    const entry = { ...chapterManifest[0], id: 'fixture', title: 'Fixture', source: 'book/fixture.md', sha256: createHash('sha256').update(body).digest('hex') };
    await writeFile(path.join(root, entry.source), body);
    assert.equal((await loadBook(root, [entry]))[0].title, 'Fixture');
    await writeFile(path.join(root, entry.source), body + 'Changed');
    await assert.rejects(loadBook(root, [entry]), /hash mismatch/);
    await rm(path.join(root, entry.source));
    await assert.rejects(loadBook(root, [entry]), /ENOENT/);
    await writeFile(path.join(root, 'outside.md'), body);
    await symlink(path.join(root, 'outside.md'), path.join(root, entry.source));
    await assert.rejects(loadBook(root, [entry]), /escapes book/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test('the exact stale preamble alone is omitted; substantive and later blockquotes survive', () => {
  const parsed = parseMarkdown('# Title\n\n> 中文初稿 · 待 review\n\n> Keep this caveat.\n\n## Section\n\n> 中文初稿 · 待 review\n');
  assert.equal(parsed.tree.children.filter(node => node.type === 'blockquote').length, 2);
  assert.match(nodeText(parsed.tree), /Keep this caveat/);
  assert.match(nodeText(parsed.tree), /中文初稿 · 待 review/);
  assert.equal(parseMarkdown('# Title\n\n> 中文初稿 · 待 review\n> Additional context\n').tree.children[1].type, 'blockquote');
});

test('headings use source text with deterministic Unicode IDs and collision-safe duplicate suffixes', () => {
  const source = '# Title\n\n## 中文：标题？\n\n## Hello\n\n## Hello\n\n### Hello-2\n\n## `API` 与 **数据**\n';
  const first = parseMarkdown(source);
  assert.deepEqual(first.headingIds, ['title', '中文标题', 'hello', 'hello-2', 'hello-2-2', 'api-与-数据']);
  assert.deepEqual(first.headings.map(heading => heading.title), ['中文：标题？', 'Hello', 'Hello', 'Hello-2', 'API 与 数据']);
  assert.deepEqual(parseMarkdown(source).headings, first.headings);
  assert.throws(() => parseMarkdown('Text\n\n# Title'), /exactly one H1/);
  assert.throws(() => parseMarkdown('# Title\n\n# Another title'), /exactly one H1/);
});

test('Markdown retains ordered lists, inline markup and fenced text without executing HTML', () => {
  const parsed = parseMarkdown('# Title\n\n3. **A**\n4. *B*\n\n```text\n<script>literal</script>\n  → preserve spacing\nonClick="literal code"\n```\n\n| Key | Value |\n| --- | --- |\n| `x` | **y** |');
  assert.equal(parsed.tree.children.find(node => node.type === 'list').start, 3);
  assert.match(parsed.tree.children.find(node => node.type === 'code').value, /<script>literal<\/script>\n {2}→ preserve spacing/);
  assert.match(parsed.tree.children.find(node => node.type === 'code').value, /onClick="literal code"/);
  assert.equal(parsed.tree.children.find(node => node.type === 'table').children.length, 2);
  for (const unsafe of ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>', '<iframe src="x"></iframe>']) {
    assert.throws(() => parseMarkdown('# Title\n\n' + unsafe), /unsafe Markdown node: html/);
  }
});

test('relative links use only reviewed routes and real heading IDs; citation fragments survive', () => {
  const current = chapterManifest[0];
  const targets = chapterManifest.map(entry => ({ entry, headingIds: ['title', '中文标题'] }));
  assert.equal(resolveChapterLink('01-a-page-and-a-system.md#中文标题', current, targets), '/zh/read/a-page-and-a-system/#%E4%B8%AD%E6%96%87%E6%A0%87%E9%A2%98');
  assert.equal(resolveChapterLink('#title', current, targets), '#title');
  const citation = 'https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.3';
  assert.equal(resolveChapterLink(citation, current, targets), citation);
  for (const url of ['future.md', '../../planning/private.md', '01-a-page-and-a-system.md#missing', '/book/drafts/zh/private.md']) {
    assert.throws(() => resolveChapterLink(url, current, targets));
  }
});

test('dangerous and obfuscated schemes are rejected after Markdown entity decoding', () => {
  const entry = chapterManifest[0];
  const targets = [{ entry, headingIds: [] }];
  for (const url of ['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,x', 'vbscript:x', '//attacker.invalid/x', 'java\tscript:x', '%6aavascript:alert(1)', '\\attacker.invalid']) {
    assert.throws(() => resolveChapterLink(url, entry, targets), url);
  }
  const parsed = parseMarkdown('# Title\n\n[bad](javascript&colon;alert)');
  const link = parsed.tree.children[1].children[0];
  assert.equal(link.url, 'javascript:alert');
  assert.throws(() => resolveChapterLink(link.url, entry, targets), /Unsafe/);
});

test('untranslated chapter switches to the English index once under both deployment prefixes', () => {
  for (const prefix of ['', '/vibe-coding-then-what']) for (const chapter of chapterManifest) {
    assert.equal(alternateLocalePath(prefix + chapterPath(chapter), 'zh', prefix), '/read/');
  }
});

test('legacy public and preview fragments resolve without entering canonical headings', async () => {
  const chapters = await loadBook();
  assert.equal(legacyHeadingAliases.length, 14);
  for (const { chapterId, legacyId, headingId } of legacyHeadingAliases) {
    const chapter = chapters.find(item => item.entry.id === chapterId);
    const target = chapter.tree.children.find(node => node.type === 'heading' && node.data.id === headingId);
    assert.ok(target?.data.legacyIds.includes(legacyId));
    assert.ok(!chapter.headingIds.includes(legacyId));
  }
  for (const [alias, targetId] of [['old', 'absent'], ['main', 'section'], ['title', 'section'], ['section', 'section'], ['<unsafe>', 'section']]) {
    assert.throws(() => applyLegacyHeadingAlias(parseMarkdown('# Title\n\n## Section'), alias, targetId), /missing|invalid or collides/);
  }
  const parsed = parseMarkdown('# Title\n\n## Section\n\n## Other');
  applyLegacyHeadingAlias(parsed, 'old', 'section');
  assert.throws(() => applyLegacyHeadingAlias(parsed, 'old', 'other'), /collides/);
  assert.doesNotThrow(() => applyLegacyHeadingAlias(parsed, 'another', 'section'));
});
