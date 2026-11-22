import { loadEnglishBook } from '../site/content/load-english.ts';
import assert from 'node:assert/strict';
import test from 'node:test';
import { loadBook } from '../site/content/load-book.ts';
import { buildSearchIndex } from '../site/content/build-search-index.ts';
import { normalizeSearch, searchEntries, readSearchIndex, highlightSearch } from '../site/content/search.ts';
import { sectionUrl, correctionUrl } from '../site/components/reading/sharing.ts';

const chapters = await loadBook();
const chinese = buildSearchIndex(chapters, 'zh');
const english = buildSearchIndex(chapters, 'en');

test('static indexes contain only approved public sections, real IDs and source revisions', () => {
  assert.equal(chinese.entries.length, chapters.reduce((count, chapter) => count + chapter.headingIds.length, 0));
  assert.deepEqual(new Set(chinese.entries.map(entry => entry.chapterId)), new Set(chapters.map(chapter => chapter.entry.id)));
  assert.equal(chinese.entries.length, 221);
  assert.ok(!chinese.entries.some(entry => entry.headingId === '关于本书的-ai-协作'));
  assert.deepEqual(english.entries, []);
  for (const entry of chinese.entries) {
    const chapter = chapters.find(item => item.entry.id === entry.chapterId);
    assert.ok(chapter);
    assert.equal(entry.sourceHash, chapter.entry.sha256);
    assert.ok(chapter.headingIds.includes(entry.headingId));
    assert.equal(decodeURIComponent(entry.href.split('#')[1]), entry.headingId);
    assert.equal(entry.href.split('#')[0], `/zh/read/${chapter.entry.slug}/`);
    assert.deepEqual(Object.keys(entry).sort(), ['chapterId', 'chapterTitle', 'headingId', 'headingTitle', 'locale', 'sourceHash', 'href', 'text'].sort());
  }
  assert.doesNotMatch(JSON.stringify(chinese), /book\/(?:drafts|revisions)|docs\/|\.local|待 review|frontmatter/);
  assert.match(JSON.stringify(chinese), /作者：缸子太子与世界/);
  assert.deepEqual(readSearchIndex(JSON.parse(JSON.stringify(chinese)), 'zh'), chinese);
});

test('Chinese literal matching ranks the actual heading above incidental body mentions', () => {
  const results = searchEntries(chinese, '状态', 'zh');
  assert.ok(results.length > 1);
  assert.equal(results[0].entry.headingTitle, '状态：我们在描述哪一份事实？');
  assert.equal(results[0].entry.chapterId, 'G01');
  assert.ok(results[0].entry.href.endsWith('#%E7%8A%B6%E6%80%81%E6%88%91%E4%BB%AC%E5%9C%A8%E6%8F%8F%E8%BF%B0%E5%93%AA%E4%B8%80%E4%BB%BD%E4%BA%8B%E5%AE%9E'));
  const fullHeading = '时间：先发生什么，用户要等到哪里？';
  assert.equal(searchEntries(chinese, fullHeading, 'zh')[0].entry.headingTitle, fullHeading);
  assert.ok(searchEntries(chinese, '报名 数据库', 'zh').length);
  const [story] = searchEntries(chinese, '光秃秃只印一个页码', 'zh');
  assert.equal(story.entry.chapterId, 'p8-return-to-reader');
  assert.equal(story.entry.headingId, '第一百零六页老师怎么已经合上电脑了');
  assert.equal(searchEntries(chinese, '不存在的词语', 'zh').length, 0);
});

test('queries normalize Unicode, case and whitespace while keeping literal punctuation', () => {
  assert.equal(normalizeSearch('  ＡＩ\t 产品\n '), 'ai 产品');
  assert.deepEqual(searchEntries(chinese, 'HTTP', 'zh'), searchEntries(chinese, '  ｈｔｔｐ  ', 'zh'));
  assert.ok(searchEntries(chinese, '202 Accepted', 'zh').length);
  const entry = { ...chinese.entries[0], headingTitle: 'Café a+b', text: 'Literal [x].* and a+b; not axxb.', href: '/zh/read/before-we-start/#test', headingId: 'test' };
  const index = { version: 1, locale: 'zh', entries: [entry] };
  assert.equal(searchEntries(index, 'cafe\u0301', 'zh').length, 1);
  assert.equal(searchEntries(index, '[x].*', 'zh').length, 1);
  assert.equal(searchEntries(index, 'a+b', 'zh').length, 1);
  assert.equal(searchEntries(index, 'a.*b', 'zh').length, 0);
  for (const query of ['', ' \n\t ']) assert.deepEqual(searchEntries(chinese, query, 'zh'), []);
});

test('language boundaries never fall back to a different corpus', () => {
  assert.deepEqual(searchEntries(chinese, '状态', 'en'), []);
  assert.deepEqual(searchEntries(english, '状态', 'en'), []);
  assert.deepEqual(searchEntries({ ...chinese, entries: chinese.entries.map(entry => ({ ...entry, locale: 'en' })) }, '状态', 'zh'), []);
  assert.throws(() => readSearchIndex(chinese, 'en'));
  assert.throws(() => readSearchIndex({ ...english, entries: [{ ...chinese.entries[0], locale: 'en' }] }, 'en'), /Invalid search entry/);
});

test('ranking ties are stable and excerpts stay bounded near a real body match', () => {
  const entries = [0, 1, 2].map(number => ({ ...chinese.entries[0], chapterId: String(number), chapterTitle: 'Fixture', headingTitle: 'Section', text: '前文'.repeat(80) + 'needle' + '后文'.repeat(80) }));
  const results = searchEntries({ version: 1, locale: 'zh', entries }, 'needle', 'zh');
  assert.deepEqual(results.map(result => result.entry.chapterId), ['0', '1', '2']);
  assert.ok(results[0].excerpt.includes('needle'));
  assert.ok(Array.from(results[0].excerpt).length <= 142);
});

test('all matching sections remain reachable beyond the former twelve-result limit', () => {
  const expected = chinese.entries.filter(entry => normalizeSearch(`${entry.headingTitle} ${entry.chapterTitle} ${entry.text}`).includes('报名'));
  assert.equal(expected.length, 112);
  const results = searchEntries(chinese, '报名', 'zh');
  assert.equal(results.length, expected.length);
  assert.deepEqual(new Set(results.map(result => result.entry.href)), new Set(expected.map(entry => entry.href)));
});

test('excerpts locate original graphemes after normalization expands or combines text', () => {
  const samples = [
    { text: 'ﬃ'.repeat(100) + 'needle' + '后文'.repeat(80), query: 'needle', hit: 'needle' },
    { text: '前文'.repeat(60) + 'ﬃ' + '后文'.repeat(80), query: 'ffi', hit: 'ﬃ' },
    { text: 'e\u0301'.repeat(100) + 'needle' + '后文'.repeat(80), query: 'needle', hit: 'needle' },
    { text: '前文'.repeat(60) + 'cafe\u0301' + '后文'.repeat(80), query: 'café', hit: 'cafe\u0301' },
    { text: '😀'.repeat(100) + 'needle' + '𠮷'.repeat(100), query: 'needle', hit: 'needle' },
    { text: '前文'.repeat(60) + '👩‍💻𠮷' + '后文'.repeat(80), query: '👩‍💻𠮷', hit: '👩‍💻𠮷' },
  ];
  for (const sample of samples) {
    const entry = { ...chinese.entries[0], headingTitle: 'Fixture', chapterTitle: 'Fixture', text: sample.text };
    const [result] = searchEntries({ version: 1, locale: 'zh', entries: [entry] }, sample.query, 'zh');
    assert.ok(result, `match for ${sample.query}`);
    assert.ok(result.excerpt.includes(sample.hit), `original hit must survive: ${sample.query}`);
    assert.ok(result.excerpt.isWellFormed(), 'no split supplementary character');
    const excerpt = result.excerpt.replace(/^…|…$/gu, '');
    assert.ok(sample.text.includes(excerpt), 'excerpt must remain an original text slice');
  }
});

test('match highlighting preserves source graphemes, contextual case and literal text', () => {
  for (const [text, query, expected] of [
    ['before ﬃ after', 'ffi', 'ﬃ'], ['before cafe\u0301 after', 'CAFÉ', 'cafe\u0301'],
    ['before 👩‍💻𠮷 after', '👩‍💻𠮷', '👩‍💻𠮷'], ['ΟΣ after', 'ος', 'ΟΣ'],
    ['<script>alert(1)</script>', 'alert(1)', 'alert(1)'], ['前\t\n 文 needle', '文 needle', '文 needle'],
  ]) {
    const parts = highlightSearch(text, query);
    assert.equal(parts.map(part => part.text).join(''), text);
    assert.ok(parts.filter(part => part.matched).map(part => part.text).join(' ').includes(expected));
  }
});

test('malformed, wrong-language or unsafe fetched index data is rejected for retry', () => {
  for (const value of [null, {}, { ...chinese, version: 99 }, { ...chinese, entries: 'wrong' },
    { ...chinese, entries: [{ ...chinese.entries[0], href: 'javascript:alert(1)' }] },
    { ...chinese, entries: [{ ...chinese.entries[0], sourceHash: 'unreviewed' }] },
    { ...chinese, entries: [{ ...chinese.entries[0], headingId: 'different' }] },
  ]) assert.throws(() => readSearchIndex(value, 'zh'));
});

test('section sharing uses actual origin, deployment prefix and encoded heading without query leakage', () => {
  for (const prefix of ['', '/vibe-coding-then-what']) {
    const url = sectionUrl(`http://localhost:44771${prefix}/zh/read/a-page-and-a-system/?private=discard#old`, '状态 / API & 数据？');
    const parsed = new URL(url);
    assert.equal(parsed.origin, 'http://localhost:44771');
    assert.equal(parsed.pathname, `${prefix}/zh/read/a-page-and-a-system/`);
    assert.equal(parsed.search, '');
    assert.equal(decodeURIComponent(parsed.hash.slice(1)), '状态 / API & 数据？');
    assert.ok(!url.includes('%25E7'));
  }
  assert.throws(() => sectionUrl('file:///tmp/example.html', 'heading'));
});

test('correction drafts encode only explicit public chapter, heading, revision and real URL context', () => {
  const context = { chapterId: 'G01', chapterTitle: '标题 & question?', sourceHash: chapters[1].entry.sha256 };
  const location = sectionUrl('https://preview.example/reading/zh/read/a-page-and-a-system/?discard=yes', '状态？');
  const url = new URL(correctionUrl(context, '状态？ & API', location));
  assert.equal(url.origin + url.pathname, 'https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues/new');
  assert.equal(url.searchParams.get('title'), '纠错：标题 & question? · 状态？ & API');
  const body = url.searchParams.get('body');
  for (const expected of [context.chapterTitle, context.chapterId, context.sourceHash, '状态？ & API', location]) assert.ok(body.includes(expected));
  assert.doesNotMatch(body, /private=|discard=|book\/|docs\/|prompt|logs/);
  assert.ok(body.startsWith(`章节：${context.chapterTitle} (${context.chapterId})\n小节：状态？ & API\n链接：${location}\n原稿版本 SHA-256：${context.sourceHash}\n`));
  assert.ok(body.endsWith('建议修改：\n'));
});

test('an exact real chapter title groups only inherited hits and retains the actual H1 fragment', () => {
  const title = chapters.find(chapter => chapter.entry.id === 'F01').title;
  const original = JSON.stringify(chinese);
  const results = searchEntries(chinese, title, 'zh');
  assert.equal(chinese.entries.filter(entry => entry.chapterId === 'F01').length, 10);
  assert.equal(results.length, 2);
  assert.deepEqual(results.map(result => result.kind), ['chapter', 'section']);
  assert.equal(results[0].href, '/zh/read/browser-foundations/');
  const h1 = chinese.entries.find(entry => entry.chapterId === 'F01' && entry.headingTitle === title);
  assert.equal(results[1].href, h1.href);
  assert.equal(results[1].entry, h1);
  assert.equal(results[0].excerpt, '');
  assert.equal(JSON.stringify(chinese), original, 'presentation grouping must not mutate the index/schema');
  assert.deepEqual(readSearchIndex(JSON.parse(original), 'zh'), chinese);
  const signup = searchEntries(chinese, '报名', 'zh');
  assert.equal(signup.length, 112);
  assert.ok(signup.every(result => result.kind === 'section' && result.href === result.entry.href));
});

test('normalized exact titles group each distinct chapter while preserving every genuine heading/body hit', () => {
  const makeEntry = (chapterId, headingId, headingTitle, text, chapterTitle = 'Café AI') => ({
    ...chinese.entries[0], chapterId, chapterTitle, headingId, headingTitle, text,
    href: `/zh/read/${chapterId}/#${encodeURIComponent(headingId)}`,
  });
  const first = [makeEntry('first', 'title', 'Café AI', ''), makeEntry('first', 'other', 'Overview', ''),
    makeEntry('first', 'section', 'Café AI mechanisms', ''), makeEntry('first', 'body', 'Evidence', 'We checked Café AI in the example.')];
  const second = [makeEntry('second', 'title', 'CAFÉ AI', '', 'Ｃａｆé ＡＩ'), makeEntry('second', 'other', 'Details', '', 'Ｃａｆé ＡＩ')];
  const index = { version: 1, locale: 'zh', entries: [...first, ...second] };
  const expectedSections = [first[0], first[2], first[3], second[0]];
  for (const query of ['Café AI', '  ＣＡＦÉ\n  ＡＩ\t', 'cafe\u0301 ai']) {
    const results = searchEntries(index, query, 'zh');
    assert.deepEqual(results.filter(result => result.kind === 'chapter').map(result => result.href), ['/zh/read/first/', '/zh/read/second/']);
    assert.deepEqual(new Set(results.filter(result => result.kind === 'section').map(result => result.href)), new Set(expectedSections.map(entry => entry.href)));
    for (const result of results.filter(result => result.kind === 'section')) assert.equal(result.href, result.entry.href);
    assert.ok(results.every(result => result.entry.sourceHash === chinese.entries[0].sourceHash));
  }
  const genuineOnly = searchEntries({ ...index, entries: expectedSections }, 'Café AI', 'zh');
  assert.equal(genuineOnly.length, expectedSections.length);
  assert.ok(genuineOnly.every(result => result.kind === 'section'), 'no inherited-only hit means no manufactured chapter group');
  for (const query of ['Café', 'AI', 'Café A']) {
    const partial = searchEntries(index, query, 'zh');
    assert.equal(partial.length, index.entries.length);
    assert.ok(partial.every(result => result.kind === 'section' && result.href === result.entry.href));
  }
  assert.deepEqual(searchEntries(index, 'Café AI', 'en'), []);
});

test('chapter result priority is independent of how many exact-title terms boost a real H1', () => {
  const title = 'alpha bravo charlie delta echo foxtrot golf hotel india juliet kilo lima';
  const entry = { ...chinese.entries[0], chapterTitle: title, headingTitle: title, text: title };
  const inherited = { ...entry, headingId: 'other', headingTitle: 'Other', text: '', href: '/zh/read/before-we-start/#other' };
  const index = { version: 1, locale: 'zh', entries: [entry, inherited] };
  const results = searchEntries(index, title, 'zh');
  assert.equal(results[0].kind, 'chapter');
  assert.equal(results[0].href, '/zh/read/before-we-start/');
  assert.equal(results[1].kind, 'section');
  assert.ok(results[1].score > results[0].score, 'section relevance must not defeat explicit chapter priority');
  assert.ok(searchEntries(index, 'alpha bravo', 'zh').every(result => result.kind === 'section'));
});

test('English search contains only reviewed English headings and links back to that edition', async () => {
  const reviewed = await loadEnglishBook(await loadBook());
  const index = readSearchIndex(buildSearchIndex(reviewed, 'en'), 'en');
  assert.deepEqual([...new Set(index.entries.map(entry => entry.chapterId))], reviewed.map(chapter => chapter.entry.id));
  for (const chapter of reviewed) {
    const results = searchEntries(index, chapter.title, 'en');
    assert.ok(results.length && results.every(result => !result.href.startsWith('/zh/')));
  }
  assert.deepEqual(searchEntries(index, '周日的名单', 'en'), []);
});
