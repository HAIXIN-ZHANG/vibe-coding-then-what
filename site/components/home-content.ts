import type { Locale } from '../config/i18n.ts';

// Supplemental homepage UI only; the approved identity and chapter copy stay in i18n.ts.
export const homeContent = {
  en: {
    book: 'The book', navigation: 'Book navigation', overview: 'Overview', read: 'Read in Chinese',
    explore: 'Explore the systems',
    example: 'One enrolment example', exampleTitle: 'What happens after you click Enrol?',
    exampleCaption: 'Example shown: a successful enrolment',
    illustrationAlt: 'Four connected stages in a successful enrolment: submit, check, save and confirm.',
    stages: ['Submit', 'Check', 'Save', 'Confirm'],
  },
  zh: {
    book: '本书', navigation: '全书导航', overview: '首页', read: '开始阅读',
    explore: '探索系统',
    example: '一个报名示例', exampleTitle: '点击报名之后，会发生什么？',
    exampleCaption: '图示：一次成功的报名',
    illustrationAlt: '一次成功报名中的四个相连阶段：提交、检查、保存和确认。',
    stages: ['提交', '检查', '保存', '确认'],
  },
} satisfies Record<Locale, {
  book: string; navigation: string; overview: string; read: string; explore: string;
  example: string; exampleTitle: string; exampleCaption: string; illustrationAlt: string;
  stages: readonly string[];
}>;
