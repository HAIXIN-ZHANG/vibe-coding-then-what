import { bookCatalog, type BookId } from '../config/books.ts';
import type { Locale } from '../config/i18n.ts';

export type SearchEntry = {
  chapterId: string; chapterTitle: string; headingId: string; headingTitle: string;
  locale: Locale; sourceHash: string; href: string; text: string;
};
export type SearchIndex = { version: 1; locale: Locale; entries: SearchEntry[] };
export type SearchResult = { kind: 'chapter' | 'section'; href: string; entry: SearchEntry; excerpt: string; score: number };
export type SearchFragment = { text: string; matched: boolean };

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/\s+/gu, ' ').trim();
}

function normalizedText(value: string) {
  const segments = [...graphemes.segment(value)];
  const offsets: number[] = [];
  let normalized = '';
  for (const [index, { segment }] of segments.entries()) {
    // An entire grapheme owns every code unit produced by normalization/casing.
    // This keeps ligatures, combining marks and surrogate pairs in their source cluster.
    for (const character of segment.normalize('NFKC').toLowerCase()) {
      if (/\s/u.test(character)) {
        if (!normalized || normalized.endsWith(' ')) continue;
        normalized += ' '; offsets.push(index);
      } else {
        normalized += character;
        for (let unit = 0; unit < character.length; unit++) offsets.push(index);
      }
    }
  }
  if (normalized.endsWith(' ')) offsets.pop();
  // Whole-string lowercasing retains contextual case rules (for example Greek sigma).
  return { text: normalizeSearch(value), offsets, segments };
}

function matchRanges(value: string, query: string): { start: number; end: number }[] {
  const normalized = normalizedText(value), ranges: { start: number; end: number }[] = [];
  for (const term of new Set(normalizeSearch(query).split(' ').filter(Boolean))) {
    for (let at = normalized.text.indexOf(term); at !== -1; at = normalized.text.indexOf(term, at + term.length)) {
      const first = normalized.segments[normalized.offsets[at]], last = normalized.segments[normalized.offsets[at + term.length - 1]];
      if (first && last) ranges.push({ start: first.index, end: last.index + last.segment.length });
    }
  }
  return ranges.sort((a, b) => a.start - b.start || b.end - a.end);
}

export function highlightSearch(value: string, query: string): SearchFragment[] {
  const merged: { start: number; end: number }[] = [];
  for (const range of matchRanges(value, query)) {
    const previous = merged.at(-1);
    if (previous && range.start <= previous.end) previous.end = Math.max(previous.end, range.end);
    else merged.push({ ...range });
  }
  const fragments: SearchFragment[] = [];
  let cursor = 0;
  for (const { start, end } of merged) {
    if (cursor < start) fragments.push({ text: value.slice(cursor, start), matched: false });
    fragments.push({ text: value.slice(start, end), matched: true }); cursor = end;
  }
  if (cursor < value.length) fragments.push({ text: value.slice(cursor), matched: false });
  return fragments;
}

function searchExcerpt(value: string, query: string): string {
  const segments = [...graphemes.segment(value)], first = matchRanges(value, query)[0];
  const hit = first ? segments.findIndex(segment => segment.index === first.start) : 0;
  const lastHit = first ? segments.findIndex(segment => segment.index + segment.segment.length === first.end) + 1 : 0;
  const start = Math.max(0, hit - 16), end = Math.min(segments.length, Math.max(start + 64, lastHit));
  const excerpt = segments.slice(start, end).map(segment => segment.segment).join('');
  return `${start ? '…' : ''}${excerpt}${end < segments.length ? '…' : ''}`;
}

export function searchEntries(index: SearchIndex, query: string, locale: Locale): SearchResult[] {
  const phrase = normalizeSearch(query);
  if (!phrase || index.locale !== locale) return [];
  const terms = [...new Set(phrase.split(' '))];
  const groupedChapters = new Set<string>();
  return index.entries.filter(entry => entry.locale === locale).flatMap<SearchResult>(entry => {
    const heading = normalizeSearch(entry.headingTitle), chapter = normalizeSearch(entry.chapterTitle), text = normalizeSearch(entry.text);
    if (!terms.every(term => `${heading} ${chapter} ${text}`.includes(term))) return [];
    if (chapter === phrase && !terms.every(term => `${heading} ${text}`.includes(term))) {
      const identity = `${entry.locale}/${entry.chapterId}`;
      if (groupedChapters.has(identity)) return [];
      groupedChapters.add(identity);
      // Group only inherited title hits; the indexed section and real section matches stay intact.
      return [{ kind: 'chapter', href: entry.href.split('#')[0], entry, excerpt: '', score: 200 }];
    }
    const score = (heading === phrase ? 100 : 0) + (heading.includes(phrase) ? 20 : 0) +
      terms.reduce((total, term) => total + (heading.includes(term) ? 8 : 0) + (chapter.includes(term) ? 3 : 0) + (text.includes(term) ? 1 : 0), 0);
    const excerpt = searchExcerpt(entry.text, query);
    return [{ kind: 'section', href: entry.href, entry, excerpt, score }];
  }).sort((a, b) => Number(a.kind === 'section') - Number(b.kind === 'section') || b.score - a.score);
}

export function readSearchIndex(value: unknown, locale: Locale, bookId: BookId = 'work'): SearchIndex {
  if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1 ||
    !('locale' in value) || value.locale !== locale || !('entries' in value) || !Array.isArray(value.entries)) throw new Error('Invalid search index');
  const prefix = bookCatalog[bookId].editions[locale].home + 'read/';
  for (const entry of value.entries) {
    if (!entry || typeof entry !== 'object' || ['chapterId', 'chapterTitle', 'headingId', 'headingTitle', 'sourceHash', 'href', 'text'].some(key => typeof entry[key] !== 'string') ||
      entry.locale !== locale || !/^[a-f0-9]{64}$/.test(entry.sourceHash) ||
      (!entry.href.startsWith(prefix) || !/^[a-z0-9-]+\/#/.test(entry.href.slice(prefix.length))) || entry.href.split('#').length !== 2 ||
      entry.href.split('#')[1] !== encodeURIComponent(entry.headingId)) throw new Error('Invalid search entry');
  }
  return value as SearchIndex;
}
