import { englishEditions } from '../content/english-edition.ts';
import type { AccentPreference } from '../theme/runtime.ts';
import { bookCatalog } from './books.ts';

export const defaultLocale = 'en';

export type Locale = 'en' | 'zh';

type Messages = {
  lang: string;
  title: string;
  titleLines: readonly [string, string];
  description: string;
  home: string;
  contents: string;
  books: string;
  editionLabel: string;
  chineseEdition: string;
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
  availableNotice: (count: number) => string;
  englishUnavailable: string;
  chapterAvailability: string;
  readOriginal: string;
  pagination: { label: string; previous: string; next: string; last: string; directory: string };
  chapterLabels: Readonly<Record<string, string>>;
  startReading: string;
  chapterBenefits: Readonly<Record<string, string>>;
  directory: { title: string; available: string; planned: string; rowAction: string };
  continueReading: { title: string; lastRead: string; return: string; resume: string; restart: string; local: string; shared: string; fallback: string };
};

const messages = {
  en: {
    lang: 'en',
    title: bookCatalog.work.editions.en.title,
    titleLines: ['Vibe Coding,', 'Then What?'],
    description: bookCatalog.work.editions.en.description,
    home: 'Home',
    contents: 'Chapters',
    books: 'Books', editionLabel: 'Chinese edition with selected chapters in English', chineseEdition: 'Chinese edition',
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
    switchLabel: 'Switch to Simplified Chinese',
    switchText: 'Simplified Chinese',
    appearance: 'Appearance',
    accentColor: 'Accent colour',
    accentNames: { blue: 'Blue', green: 'Green', purple: 'Purple', orange: 'Orange', rose: 'Rose', graphite: 'Graphite' },
    systemTheme: 'System',
    dayTheme: 'Light',
    nightTheme: 'Dark',
    currentAppearance: 'Current appearance',
    systemAppearanceHint: 'Follow device appearance.',
    explicitAppearanceHint: 'This site uses your selected appearance instead of the device setting.',
    availableNotice: bookCatalog.work.editions.en.availability,
    englishUnavailable: 'Full English chapters are marked below. Other English entries introduce the Chinese originals.',
    chapterAvailability: 'English translation pending',
    readOriginal: 'Read the Chinese original',
    pagination: { label: 'Chapter navigation', previous: 'Previous chapter', next: 'Next chapter', last: 'Last available chapter', directory: 'Browse chapters' },
    chapterLabels: {
      opening: 'Before We Start: It Runs. Then What?',
      G01: 'A Page and the System Behind It',
      F01: 'How the Browser Builds a Page',
      P810: 'What Do We Do After AI Finishes Writing the Code?',
    },
    startReading: 'Start reading',
    directory: { title: 'Explore the chapters', available: 'English chapters and overviews', planned: 'Coming in the book', rowAction: 'Overview' },
    continueReading: {
      title: 'Continue reading', lastRead: 'Last read:', return: 'Return to your chapter',
      resume: 'Continue reading', restart: 'Open chapter start',
      local: 'Your place in the Chinese original stays saved in this browser.',
      shared: 'Shared links take priority.',
      fallback: 'This chapter or section has changed. Start at the top of the chapter.',
    },
    chapterBenefits: {
      opening: 'Why a working AI-built product is the start of the engineering conversation.',
      G01: 'Follow one feature through the interface, service and database—and the failures between them.',
      F01: 'Separate resource waits, code execution and visual updates to understand why a visible page can still respond late.',
      P810: 'Trace one enrolment through AI-written code and decide what to check before calling it done.',
    },
  },
  zh: {
    lang: 'zh-CN',
    title: bookCatalog.work.editions.zh.title,
    titleLines: ['用 AI 写代码：', '能跑，然后呢？'],
    description: bookCatalog.work.editions.zh.description,
    home: '首页',
    contents: '章节目录',
    books: '选书', editionLabel: '中文完整版', chineseEdition: '中文 · 完整版',
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
    switchLabel: '切换至英语',
    switchText: '英语',
    appearance: '外观',
    accentColor: '强调色',
    accentNames: { blue: '蓝色', green: '绿色', purple: '紫色', orange: '橙色', rose: '玫红', graphite: '石墨' },
    systemTheme: '跟随系统',
    dayTheme: '浅色',
    nightTheme: '深色',
    currentAppearance: '当前外观',
    systemAppearanceHint: '跟随设备的外观设置。',
    explicitAppearanceHint: '本网站使用所选外观，不再跟随系统。',
    availableNotice: bookCatalog.work.editions.zh.availability,
    englishUnavailable: '部分章节另有英文版。',
    chapterAvailability: '中文 · 已审阅草稿',
    readOriginal: '阅读中文原稿',
    pagination: { label: '前后章节', previous: '上一章', next: '下一章', last: '已到当前最后一章', directory: '返回可阅读章节' },
    chapterLabels: {},
    startReading: '从这里开始读',
    directory: { title: '浏览章节', available: '可阅读的中文章节', planned: '后续主题', rowAction: '中文' },
    continueReading: {
      title: '继续上次阅读', lastRead: '上次读到：', return: '回到上次位置',
      resume: '继续上次阅读', restart: '从本章开头读起',
      local: '进度仅保存在此浏览器。', shared: '位置失效时进入章节开头；外部分享链接优先。',
      fallback: '章节或小节内容已更新，将从章节开头继续阅读。',
    },
    chapterBenefits: {
      opening: '为什么产品能跑起来之后，我们还需要理解它背后的系统。',
      G01: '顺着一个功能，串起界面、服务、数据库，以及它们之间的问题。',
      F01: '分清资源等待、代码执行和画面更新，理解页面为什么看得见却还不一定能及时响应。',
      P810: '顺着一条报名记录读懂 AI 写的代码，看看交付前还要亲自确认什么。',
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

export function bookSelectionPath(locale: Locale): string {
  return `${bookCatalog.work.editions[locale].home}#books`;
}

export function languageSwitchTarget(pathname: string, locale: Locale, basePath: string = '') {
  const messages = getMessages(locale);
  const path = basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
    ? pathname.slice(basePath.length) || '/'
    : pathname;
  const slug = locale === 'zh' && /^\/zh\/read\/([^/]+)\/?$/.exec(path)?.[1];
  if (slug && !Object.values(englishEditions).some(entry => entry.slug === slug)) {
    return { href: '/read/', text: messages.switchText, ariaLabel: messages.switchLabel };
  }
  const href = locale === 'zh' ? path.replace(/^\/zh(?=\/|$)/, '') || '/' : `/zh${path === '/' ? '/' : path}`;
  return { href, text: messages.switchText, ariaLabel: messages.switchLabel };
}

export function alternateLocalePath(pathname: string, locale: Locale, basePath: string = ''): string {
  return languageSwitchTarget(pathname, locale, basePath).href;
}
