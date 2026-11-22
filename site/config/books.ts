export const bookCatalog = {
  work: {
    id: 'work',
    state: 'reviewed-drafts',
    editions: {
      en: {
        title: 'Vibe Coding, Then What?',
        description: 'Understanding the Systems We Build, and Learning to Live with What We Can’t Fully Control',
        home: '/', entry: '/read/',
        cover: { src: '/illustrations/route-c-en.webp', alt: 'Book cover with the author at a laptop between two cats, above a blue route diagram' },
        availability: (count: number) => `${count} entries in the full Chinese edition. Selected chapters are available in English.`,
      },
      zh: {
        title: '用 AI 写代码：能跑，然后呢？',
        description: '看懂我们构建的系统，也学着与无法完全掌控的事相处。',
        home: '/zh/', entry: '/zh/read/',
        cover: { src: '/illustrations/route-c-zh.webp', alt: '作者和两只猫围着笔记本电脑，下方是一条蓝色路线' },
        availability: (count: number) => `中文完整版 · 共 ${count} 篇可阅读。`,
      },
    },
  },
  life: {
    id: 'life',
    state: 'in-development',
    editions: {
      en: {
        title: 'Where Does the Saved Time Go?',
        description: 'When everyday tasks get faster, what do we want to do with the time we save?',
        home: '/books/everyday-life/', entry: '/books/everyday-life/',
        cover: { src: '/illustrations/life-a-en.webp', alt: 'Book cover showing the author playing with two cats after work' },
        status: 'Volume II · In development',
      },
      zh: {
        title: '省下来的时间，去哪儿了？',
        description: '当事情做得越来越快，我们想怎样度过省下来的时间？',
        home: '/zh/books/everyday-life/', entry: '/zh/books/everyday-life/',
        cover: { src: '/illustrations/life-a-zh.webp', alt: '封面上，作者站着挥动逗猫棒，两只猫一只跃起，一只趴在脚边' },
        status: '下册 · 筹备中',
      },
    },
  },
} as const;

export type BookId = keyof typeof bookCatalog;
