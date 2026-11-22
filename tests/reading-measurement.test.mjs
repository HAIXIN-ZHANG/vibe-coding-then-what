import assert from 'node:assert/strict';
import test from 'node:test';
import { classifySource, observeReading, summarizeReading } from '../scripts/reading-measurement.mjs';

function fixtureSession(allowlistedChapters = []) {
  const storage = new Map();
  const getStorage = () => ({
    getItem: key => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  });
  return (surface, flags) => observeReading(getStorage, { surface, ...flags }, allowlistedChapters);
}

test('only entrance sessions form the denominator and actual body opens deduplicate', () => {
  const viaHome = fixtureSession();
  viaHome('home');
  viaHome('contents');
  viaHome('body');
  const direct = fixtureSession();
  direct('body');
  const untranslated = fixtureSession();
  untranslated('home');
  const contentsOnly = fixtureSession();
  contentsOnly('contents', { reachedByScroll: true });
  const shortContents = fixtureSession();
  const report = summarizeReading([
    viaHome('body'), direct('body'), untranslated('other'),
    contentsOnly('contents', { reachedByScroll: true }),
    shortContents('contents', { initiallyVisible: true, reachedByScroll: true }),
    null,
  ]);
  assert.deepEqual(report, {
    measurableSessions: 5, bodyOpenSessions: 2,
    entrySessions: 4, entrySessionsOpeningBody: 1, entryToBodyRate: .25,
    contentsEndReachedSessions: 1, contentsEndInitiallyVisibleSessions: 1,
    pdfLinkClicks: 0, chapterBodyPageViews: {},
    chapterOverviewPageViews: {},
    entrySources: { unknown: 5, 'same-origin': 0, 'other-origin': 0 },
  });
  assert.equal(summarizeReading([direct('body'), null]).entryToBodyRate, null);
  assert.equal(summarizeReading([untranslated('other')]).entryToBodyRate, 0);
});

test('allowlisted chapter page views distinguish editions, reloads and repeated samples', () => {
  const original = { chapterId: 'P810', locale: 'zh' };
  const overview = { chapterId: 'P810', locale: 'en' };
  const observe = fixtureSession([{ ...original, surface: 'body' }, { ...overview, surface: 'other' }]);
  observe('home');
  observe('other', { chapterVisit: overview });
  observe('body', { chapterVisit: original });
  observe('body', { chapterVisit: original });
  observe('body');
  observe('body', { chapterVisit: { ...original, chapterId: 'non-allowlisted' } });
  observe('body', { chapterVisit: overview });
  const report = summarizeReading([observe('body')]);
  assert.deepEqual(report.chapterBodyPageViews, { 'P810:zh': 2 });
  assert.deepEqual(report.chapterOverviewPageViews, { 'P810:en': 1 });
  assert.equal(summarizeReading([observe('body')]).bodyOpenSessions, 1);
});

test('denied reads, malformed storage, throwing or ignored writes and unavailable pages return no observation', () => {
  const reject = () => { throw new Error('Synthetic access failure'); };
  for (const getStorage of [
    reject,
    () => ({ getItem: reject }),
    () => ({ getItem: () => '{invalid' }),
    () => ({ getItem: () => null, setItem: reject }),
    () => ({ getItem: () => null, setItem() {} }),
  ]) assert.equal(observeReading(getStorage, { surface: 'body' }), null);
  assert.equal(observeReading(fixtureSession, { surface: 'failed' }), null);
});

test('source keeps a bounded category and leaves absent referrers unknown', () => {
  const origin = 'http://127.0.0.1:4437';
  for (const referrer of ['', 'unknown', 'file:///private/local.txt']) assert.equal(classifySource(referrer, origin), 'unknown');
  assert.equal(classifySource(origin + '/chapter/?secret=hidden', origin), 'same-origin');
  assert.equal(classifySource('https://example.invalid/private', origin), 'other-origin');
});

test('English text counts as a body view while a PDF click does not count as an open or a completed transfer', () => {
  const chapter = { chapterId: 'opening', locale: 'en', surface: 'body' };
  const observe = fixtureSession([chapter]);
  observe('home');
  const download = summarizeReading([observe('home', { pdfClick: true })]);
  assert.equal(download.pdfLinkClicks, 1);
  assert.equal(download.bodyOpenSessions, 0);
  const report = summarizeReading([observe('body', { chapterVisit: chapter })]);
  assert.deepEqual(report.chapterBodyPageViews, { 'opening:en': 1 });
  assert.deepEqual(report.chapterOverviewPageViews, {});
});
