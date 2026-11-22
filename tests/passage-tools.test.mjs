import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseMarkdown } from '../site/content/markdown.ts';
import { chapterRecordings, findRecording, formatDuration } from '../site/content/chapter-recordings.ts';
import { parseSizes, applySizes } from '../site/theme/reading-size.ts';
import { passageUrl, readBookmarks, contextText } from '../site/components/reading/passage-model.ts';
import { correctionUrl } from '../site/components/reading/sharing.ts';

const paragraphs = source => parseMarkdown(source).tree.children.filter(node => node.type === 'paragraph').map(node => node.data.passageId);

test('a paragraph survives an unrelated insertion and duplicates have distinct destinations', () => {
  const original = paragraphs('# One\n\nOld.\n\nRepeat.\n\nRepeat.\n\n## Two\n\nOld.');
  const later = paragraphs('# One\n\nInsert.\n\nOld.\n\nRepeat.\n\nRepeat.\n\n## Two\n\nOld.');
  assert.deepEqual(later.slice(1), original);
  assert.equal(new Set(original).size, 4);
  const result = new URL(passageUrl('https://example.test/prefix/zh/read/sample/?private=a#old', 'Two', original[3], 'abcdef0123456789'));
  assert.equal(result.searchParams.get('section'), 'Two');
  assert.equal(result.searchParams.get('v'), 'abcdef012345');
  assert.equal(result.searchParams.has('private'), false);
  assert.equal(result.hash, '#' + original[3]);
});

test('bookmark storage is restricted to real same-deployment reader paths', () => {
  const mark = { title: 'Book', label: 'Chapter', href: '/demo/zh/read/intro/#x' };
  const damaged = [mark, { ...mark, href: '//example.org/demo/zh/read/intro/' }, { ...mark, href: 'javascript:alert(1)' },
    { ...mark, href: '/demo/zh/read/../../not-a-chapter' }, { ...mark, href: '/demo2/zh/read/intro/' }, null];
  assert.deepEqual(readBookmarks(JSON.stringify(damaged), 'https://example.test', '/demo'), [mark]);
  assert.deepEqual(readBookmarks('not json', 'https://example.test', ''), []);
});

test('only an explicitly included excerpt reaches an issue draft; editable context retains source and question', () => {
  const context = { chapterTitle: 'Chapter', chapterId: 'sample', sourceHash: 'abcdef', locale: 'en' };
  const excerpt = 'Excerpt the reader chose';
  const link = 'https://example.test/read/sample/#pick';
  assert.doesNotMatch(new URL(correctionUrl(context, 'Three', link)).searchParams.get('body'), /Excerpt the reader chose/);
  assert.match(new URL(correctionUrl(context, 'Three', link, excerpt)).searchParams.get('body'), /Excerpt the reader chose/);
  const card = contextText(false, 'Chapter', 'Three', excerpt, link, context.sourceHash);
  for (const expected of [link, 'abcdef', excerpt, 'assumptions']) assert.ok(card.includes(expected));
});

test('reading overrides apply independently and resetting sizes leaves appearance intact', () => {
  const props = new Map(), attrs = new Map([['data-accent', 'rose']]);
  const root = { style: { setProperty: (key, value) => props.set(key, value), removeProperty: key => props.delete(key) },
    toggleAttribute: (key, on) => on ? attrs.set(key, '') : attrs.delete(key) };
  const options = parseSizes('{"preset":"small","body":"large","notes":"bogus","x":1}');
  assert.deepEqual(options, { preset: 'small', body: 'large' });
  applySizes(root, options);
  assert.equal(props.get('--reader-size-body'), '1.375rem');
  assert.equal(props.get('--reader-size-code'), '0.875rem');
  applySizes(root, { title: 'large' });
  assert.equal(props.size, 1);
  assert.ok(!attrs.has('data-reader-body'));
  applySizes(root, {});
  assert.equal(props.size, 0);
  assert.equal(attrs.get('data-accent'), 'rose');
});

test('recordings match edition and exact text and published files exist', () => {
  const track = { chapterId: 'a', locale: 'zh', sourceHash: 'a'.repeat(64), audio: '/audio/zh/a.m4a', durationSeconds: 65.9 };
  assert.equal(findRecording('a', 'zh', track.sourceHash, [track]), track);
  assert.equal(findRecording('a', 'en', track.sourceHash, [track]), undefined);
  assert.equal(findRecording('a', 'zh', 'older', [track]), undefined);
  assert.equal(formatDuration(track.durationSeconds), '1:05');
  for (const item of chapterRecordings) {
    assert.match(item.audio, /^\/audio\/(?:zh|en)\/[a-z0-9-]+\.(?:m4a|mp3|ogg|wav)$/);
    assert.match(item.sourceHash, /^[a-f0-9]{64}$/);
    assert.ok(Number.isFinite(item.durationSeconds) && item.durationSeconds > 0);
    assert.ok(readFileSync(new URL('../site/public' + item.audio, import.meta.url)).length > 0);
  }
});
