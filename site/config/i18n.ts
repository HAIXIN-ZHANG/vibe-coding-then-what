import type { AccentPreference } from '../theme/runtime.ts';

export const defaultLocale = 'en';

export type Locale = 'en' | 'zh';

type Messages = {
  lang: string;
  title: string;
  titleLines: readonly [string, string];
  description: string;
  home: string;
  contents: string;
  navigation: string;
  skip: string;
  feedback: string;
  authorLabel: string;
  authorName: string;
  authorCaption: string;
  bookInformation: string;
  browse: string;
  repository: string;
  reading: string;
  emptyTitle: string;
  emptyDescription: string;
  suggest: string;
  missing: string;
  missingDescription: string;
  back: string;
  switchLabel: string;
  switchText: string;
  appearance: string;
  accentColor: string;
  accentNames: Readonly<Record<AccentPreference, string>>;
  systemTheme: string;
  dayTheme: string;
  nightTheme: string;
  currentAppearance: string;
  systemAppearanceHint: string;
  explicitAppearanceHint: string;
  editionLabel: string;
  availableNotice: (count: number) => string;
  englishUnavailable: string;
  chineseEdition: string;
  chapterLabels: Readonly<Record<string, string>>;
  startReading: string;
  chapterBenefits: Readonly<Record<string, string>>;
  directory: { title: string; available: string; planned: string; openChinese: string };
  continueReading: { title: string; destination: string; lastRead: string; return: string; local: string; shared: string; fallback: string };
};

const messages = {
  en: {
    lang: 'en',
    title: 'Vibe Coding, Then What?',
    titleLines: ['Vibe Coding,', 'Then What?'],
    description: 'Understanding the Systems We Build, and Learning to Live with What We Can’t Fully Control',
    home: 'Home',
    contents: 'Chapters',
    navigation: 'Main navigation',
    skip: 'Skip to content',
    feedback: 'Questions & corrections',
    authorLabel: 'Author: ',
    authorName: 'Jar & Prince Explore the World',
    authorCaption: 'Author',
    bookInformation: 'Book information',
    browse: 'Browse chapters',
    repository: 'View on GitHub',
    reading: 'READ',
    emptyTitle: 'Chapters are on their way',
    emptyDescription: 'No chapters are available to read yet. They will appear here when ready.',
    suggest: 'Ask a question or suggest a topic',
    missing: 'Page not found',
    missingDescription: 'The link may be incorrect, or the page may have moved.',
    back: 'Back to home',
    switchLabel: 'Switch to Chinese',
    switchText: '中文',
    appearance: 'Appearance',
    accentColor: 'Accent colour',
    accentNames: { blue: 'Blue', green: 'Green', purple: 'Purple', orange: 'Orange', rose: 'Rose', graphite: 'Graphite' },
    systemTheme: 'System',
    dayTheme: 'Light',
    nightTheme: 'Dark',
    currentAppearance: 'Current appearance',
    systemAppearanceHint: 'Follow device appearance.',
    explicitAppearanceHint: 'This site uses your selected appearance instead of the device setting.',
    editionLabel: 'Complete Chinese edition',
    availableNotice: count => `Read the complete Chinese edition in ${count} entries.`,
    englishUnavailable: 'English chapters are not available yet. The links below open the Chinese originals.',
    chineseEdition: 'Chinese · Complete edition',
    chapterLabels: {
      opening: 'Before We Start: It Runs. Then What?',
      G01: 'A Page and the System Behind It',
      F01: 'How the Browser Builds a Page',
    },
    startReading: 'Start reading in Chinese',
    directory: { title: 'Explore the chapters', available: 'Available in Chinese', planned: 'Coming in the book', openChinese: 'Chinese' },
    continueReading: {
      title: 'Continue reading', destination: 'Chinese original', lastRead: 'Last read:', return: 'Return to your place',
      local: 'Progress is saved in this browser only.', shared: 'Shared links take priority. Missing positions open the chapter start.',
      fallback: 'This chapter or section has changed. Continue from the chapter start.',
    },
    chapterBenefits: {
      opening: 'Why a working AI-built product is the start of the engineering conversation.',
      G01: 'Follow one feature through the interface, service and database—and the failures between them.',
      F01: 'Separate resource waits, code execution and visual updates to understand why a visible page can still respond late.',
    },
  },
  zh: {
    lang: 'zh-CN',
    title: '用 AI 写代码：能跑，然后呢？',
    titleLines: ['用 AI 写代码：', '能跑，然后呢？'],
    description: '看懂我们构建的系统，也学着与无法完全掌控的事相处。',
    home: '首页',
    contents: '章节目录',
    navigation: '主导航',
    skip: '跳到正文',
    feedback: '提问与纠错',
    authorLabel: '作者：',
    authorName: '缸子太子与世界',
    authorCaption: '作者',
    bookInformation: '本书信息',
    browse: '查看章节目录',
    repository: '在 GitHub 查看项目',
    reading: '阅读',
    emptyTitle: '章节准备中',
    emptyDescription: '目前还没有可阅读的章节。内容整理完成后，将在这里列出。',
    suggest: '向我们提问或提出建议',
    missing: '这一页还没找到',
    missingDescription: '链接可能有误，或者页面已移动。',
    back: '返回首页',
    switchLabel: 'Switch to English',
    switchText: 'English',
    appearance: '外观',
    accentColor: '强调色',
    accentNames: { blue: '蓝色', green: '绿色', purple: '紫色', orange: '橙色', rose: '玫红', graphite: '石墨' },
    systemTheme: '跟随系统',
    dayTheme: '浅色',
    nightTheme: '深色',
    currentAppearance: '当前外观',
    systemAppearanceHint: '跟随设备的外观设置。',
    explicitAppearanceHint: '本网站使用所选外观，不再跟随系统。',
    editionLabel: '中文完整版',
    availableNotice: count => `中文完整版 · 共 ${count} 篇可阅读`,
    englishUnavailable: '英文正文尚未提供，下方链接可阅读中文原文。',
    chineseEdition: '中文 · 完整版',
    chapterLabels: {},
    startReading: '从这里开始读',
    directory: { title: '浏览章节', available: '可阅读的中文章节', planned: '后续主题', openChinese: '中文' },
    continueReading: {
      title: '继续上次阅读', destination: '中文原稿', lastRead: '上次读到：', return: '回到上次位置',
      local: '进度仅保存在此浏览器。', shared: '位置失效时进入章节开头；外部分享链接优先。',
      fallback: '章节或小节内容已更新，将从章节开头继续阅读。',
    },
    chapterBenefits: {
      opening: '为什么产品能跑起来之后，我们还需要理解它背后的系统。',
      G01: '顺着一个功能，串起界面、服务、数据库，以及它们之间的问题。',
      F01: '分清资源等待、代码执行和画面更新，理解页面为什么看得见却还不一定能及时响应。',
    },
  },
} satisfies Record<Locale, Messages>;

export function getMessages(locale: Locale = defaultLocale): Messages {
  if (!Object.hasOwn(messages, locale)) throw new Error(`Unsupported locale: ${locale}`);
  return messages[locale];
}

export function localePath(locale: Locale, suffix: string = ''): string {
  getMessages(locale);
  return `${locale === 'zh' ? '/zh' : ''}/${suffix}`;
}

export function alternateLocalePath(pathname: string, locale: Locale, basePath: string = ''): string {
  getMessages(locale);
  const path = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
    ? pathname.slice(basePath.length) || '/'
    : pathname;
  if (locale === 'zh') {
    if (/^\/zh\/read\/[^/]+\/?$/.test(path)) return '/read/';
    return path.replace(/^\/zh(?=\/|$)/, '') || '/';
  }
  return `/zh${path === '/' ? '/' : path}`;
}
