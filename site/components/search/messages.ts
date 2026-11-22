import type { Locale } from '../../config/i18n.ts';

const messages = {
  en: {
    title: 'Search chapters', close: 'Close', clear: 'Clear search', placeholder: 'Search chapters…',
    scope: 'Search language: English', ready: 'Search published chapters', hint: 'Type a word or phrase. Only reviewed public content is indexed.',
    loading: 'Preparing search…', empty: 'No matching published content', fewer: 'Try fewer words, or clear your search.',
    failed: 'Search is unavailable', retryHint: 'Your query is retained. Try again or browse available chapters.', retry: 'Try again',
    unavailable: 'No English chapters are available to search yet.', chinese: 'Browse Chinese chapters', browse: 'Browse available chapters',
    results: 'matches · Chinese edition', chapterResult: 'Chapter', sectionResult: 'Section',
  },
  zh: {
    title: '搜索章节', close: '关闭', clear: '清除搜索', placeholder: '搜索章节…',
    scope: '搜索语言：中文', ready: '搜索已提供的章节', hint: '输入词语或短语，仅搜索已审阅的公开内容。',
    loading: '正在准备搜索…', empty: '没有匹配的公开内容', fewer: '试试更少的词语，或清除搜索。',
    failed: '搜索暂时不可用', retryHint: '已保留搜索内容。请重试，或查看可阅读章节。', retry: '重试',
    unavailable: '目前没有可搜索的英文正文。', chinese: '查看中文章节', browse: '查看可阅读章节', results: '条匹配 · 中文完整版', chapterResult: '章节入口', sectionResult: '小节',
  },
} satisfies Record<Locale, Record<string, string>>;

export function searchMessages(locale: Locale) { return messages[locale]; }
