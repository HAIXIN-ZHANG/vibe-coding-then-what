import assert from 'node:assert/strict';
import test from 'node:test';
import { loadBook } from '../site/content/load-book.ts';
import { readingLocator } from '../site/content/reading-locator.ts';
import { parseReadingPosition, resolveReadingPosition, readingStorageKey } from '../site/reading-progress/model.ts';
import { createReadingStore } from '../site/reading-progress/store.ts';
import { legacyHeadingAliases } from '../site/content/manifest.ts';

const chapters = (await loadBook()).map(readingLocator);
const chapter = chapters[1];
const position = { version: 1, chapterId: chapter.chapterId, headingId: chapter.headings[1].id, sourceHash: chapter.sourceHash };

test('Continue projects only current public identities and live headings from approved sources', () => {
  assert.equal(chapters.length, 51);
  assert.deepEqual(chapters.slice(0, 3).map(item => item.chapterId), ['opening', 'G01', 'F01']);
  for (const item of chapters) {
    assert.deepEqual(Object.keys(item).sort(), ['chapterId', 'headings', 'href', 'sourceHash', 'title']);
    assert.ok(item.headings.length >= 1);
    assert.equal(item.headings[0].title, item.title);
    assert.deepEqual(Object.keys(item.headings[0]).sort(), ['id', 'title']);
    assert.doesNotMatch(JSON.stringify(item), /book\/|docs\/|review|children|position/);
    for (const alias of legacyHeadingAliases.filter(alias => alias.chapterId === item.chapterId)) {
      assert.ok(!item.headings.some(heading => heading.id === alias.legacyId));
    }
  }
});

test('saved positions are bounded strict records, never stored URLs or executable content', () => {
  assert.deepEqual(parseReadingPosition(JSON.stringify(position)), position);
  assert.ok(parseReadingPosition(JSON.stringify({ ...position, headingId: null })));
  for (const raw of [null, '', 'broken', 'null', '[]', '"text"', '{}',
    JSON.stringify({ ...position, version: 2 }), JSON.stringify({ ...position, chapterId: '../outside' }),
    JSON.stringify({ ...position, sourceHash: 'invalid' }), JSON.stringify({ ...position, headingId: 3 }),
    JSON.stringify({ ...position, headingId: '' }), JSON.stringify({ ...position, headingId: 'x'.repeat(513) }),
    JSON.stringify({ ...position, href: 'https://untrusted.example/' }), ' '.repeat(2049)]) {
    assert.equal(parseReadingPosition(raw), null, String(raw).slice(0, 120));
  }
  const result = resolveReadingPosition(JSON.stringify(position), chapters);
  assert.equal(result.href, `${chapter.href}#${encodeURIComponent(position.headingId)}`);
  assert.equal(result.stale, false);
});

test('source and heading mismatches use the current chapter start; removed chapters disappear', () => {
  for (const replacement of [{ sourceHash: 'a'.repeat(64) }, { headingId: 'javascript:alert(1)' }, { headingId: legacyHeadingAliases[0].legacyId }]) {
    const result = resolveReadingPosition(JSON.stringify({ ...position, ...replacement }), chapters);
    assert.equal(result.href, chapter.href);
    assert.equal(result.stale, true);
    assert.equal(result.heading, undefined);
  }
  assert.equal(resolveReadingPosition(JSON.stringify({ ...position, chapterId: 'removed' }), chapters), null);
  const start = resolveReadingPosition(JSON.stringify({ ...position, headingId: null }), chapters);
  assert.equal(start.href, chapter.href);
  assert.equal(start.stale, false);
});

test('storage guards getter/read/write/verification failures without a volatile success value', () => {
  for (const access of [() => { throw Error('getter denied'); }, () => null,
    () => ({ getItem() { throw Error('read denied'); }, setItem() {} }),
    () => ({ getItem() { return null; }, setItem() { throw Error('quota denied'); } }),
    () => ({ getItem() { return null; }, setItem() {} })]) {
    const store = createReadingStore(access);
    let notifications = 0;
    store.subscribe(() => notifications++);
    assert.equal(store.write(position), false);
    assert.equal(store.getSnapshot(), null);
    assert.equal(notifications, 0);
  }
});

test('stable storage snapshots reflect durable values and notify only after verified writes', () => {
  const values = new Map(); let writes = 0, notifications = 0;
  const store = createReadingStore(() => ({ getItem: key => values.get(key) ?? null, setItem(key, value) { writes++; values.set(key, value); } }));
  const unsubscribe = store.subscribe(() => notifications++);
  assert.equal(store.write(position), true);
  assert.equal(store.getSnapshot(), JSON.stringify(position));
  assert.equal(store.getSnapshot(), store.getSnapshot());
  assert.equal(store.write(position), true);
  assert.equal(writes, 1);
  assert.equal(notifications, 2);
  unsubscribe(); values.set(readingStorageKey, 'corrupt'); store.notify();
  assert.equal(store.getSnapshot(), null);
  assert.equal(notifications, 2);
});
