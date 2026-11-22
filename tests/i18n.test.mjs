import assert from 'node:assert/strict';
import test from 'node:test';
import { alternateLocalePath, defaultLocale, getMessages } from '../site/config/i18n.ts';
import { chapterManifest } from '../site/content/manifest.ts';

test('localized book identity and English catalog labels preserve the Chinese-only publication boundary', () => {
  assert.equal(getMessages('en').description, 'Understanding the Systems We Build, and Learning to Live with What We Can’t Fully Control');
  assert.equal(getMessages('zh').description, '看懂我们构建的系统，也学着与无法完全掌控的事相处。');
  assert.equal(getMessages('en').title, 'Vibe Coding, Then What?');
  assert.equal(getMessages('zh').title, '用 AI 写代码：能跑，然后呢？');
  assert.deepEqual(Object.keys(getMessages('en').chapterLabels), ['opening', 'G01', 'F01']);
  for (const chapter of chapterManifest) {
    assert.equal(chapter.locale, 'zh');
    const englishLabel = getMessages('en').chapterLabels[chapter.id];
    if (englishLabel) assert.doesNotMatch(englishLabel, /\p{Script=Han}/u);
    assert.equal(getMessages('zh').chapterLabels[chapter.id] ?? chapter.title, chapter.title);
  }
});

test('availability reflects a public count without importing the source manifest into shared messages', () => {
  assert.match(getMessages('en').availableNotice(chapterManifest.length), /complete Chinese edition in 51 entries/);
  assert.match(getMessages('zh').availableNotice(chapterManifest.length), /中文完整版 · 共 51 篇可阅读/);
  assert.equal(getMessages('en').chapterLabels.F01, 'How the Browser Builds a Page');
});

test('English is default and unknown languages are rejected', () => {
  assert.equal(defaultLocale, 'en');
  assert.equal(getMessages().lang, 'en');
  assert.equal(getMessages('zh').lang, 'zh-CN');
  assert.throws(() => getMessages('fr'), /Unsupported locale/);
});

test('language switching preserves the current page without doubling the deployment prefix', () => {
  const cases = [
    ['/', 'en', '', '/zh/'],
    ['/read/', 'en', '', '/zh/read/'],
    ['/zh/', 'zh', '', '/'],
    ['/zh/read/', 'zh', '', '/read/'],
    ['/vibe-coding-then-what/', 'en', '/vibe-coding-then-what', '/zh/'],
    ['/vibe-coding-then-what/zh/', 'zh', '/vibe-coding-then-what', '/'],
    ['/vibe-coding-then-what/read/', 'en', '/vibe-coding-then-what', '/zh/read/'],
    ['/vibe-coding-then-what/zh/read/', 'zh', '/vibe-coding-then-what', '/read/'],
  ];
  for (const [pathname, locale, basePath, expected] of cases) {
    assert.equal(alternateLocalePath(pathname, locale, basePath), expected);
  }
});

test('both locale accent groups name all six independent choices', () => {
  assert.deepEqual([getMessages('en').systemTheme, getMessages('en').dayTheme, getMessages('en').nightTheme], ['System', 'Light', 'Dark']);
  assert.deepEqual([getMessages('zh').dayTheme, getMessages('zh').nightTheme], ['浅色', '深色']);
  for (const locale of ['en', 'zh']) {
    const m = getMessages(locale);
    assert.ok(m.accentColor.trim());
    assert.deepEqual(Object.keys(m.accentNames), ['blue', 'green', 'purple', 'orange', 'rose', 'graphite']);
    assert.equal(new Set(Object.values(m.accentNames)).size, 6);
    for (const label of Object.values(m.accentNames)) assert.ok(label.trim());
  }
});
