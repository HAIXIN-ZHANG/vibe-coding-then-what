import { bookCatalog, type BookId } from '../config/books.ts';
import type { Locale } from '../config/i18n.ts';
export type ChapterEntry = {
  id: string;
  bookId: BookId;
  locale: Locale;
  slug: string;
  title: string;
  order: number;
  part: number;
  source: string;
  sha256: string;
  status: 'reviewed-draft';
  review: string;
};

const volumeReview = 'book/revisions/zh/volume-one-making-of/README.md';

export const chapterManifest: readonly ChapterEntry[] = [
  {
    id: 'opening', bookId: 'work', locale: 'zh', slug: 'before-we-start', title: '写在前面：能跑，然后呢？', order: 1, part: 0,
    source: 'book/revisions/zh/volume-one-making-of/00-before-we-start.md',
    sha256: '168aeecdb063085511e7807bc33d10fb266ce1b2d0757b4ded0c1455b3c5c891', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'G01', bookId: 'work', locale: 'zh', slug: 'a-page-and-a-system', title: '一个页面，究竟连着什么？', order: 2, part: 1,
    source: 'book/revisions/zh/volume-one-making-of/01-a-page-and-a-system.md',
    sha256: '85df9e451d0cb25b071dff7e1353a6a261ed0c30dd77a037f8d5895e93bd7ca1', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'F01', bookId: 'work', locale: 'zh', slug: 'browser-foundations', title: '页面出现之前，浏览器在忙什么？', order: 3, part: 1,
    source: 'book/revisions/zh/volume-one-making-of/02-browser-foundations.md',
    sha256: '833d20da8d946635221af05e264d506cc9e5d5692c24b75fccb2812cd57b854d', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p1-course-boundaries', bookId: 'work', locale: 'zh', slug: 'p1-course-boundaries', title: '多了一份讲义，得多开几台机器？', order: 4, part: 1,
    source: 'book/revisions/zh/volume-one-making-of/p1-course-boundaries.md',
    sha256: 'f3b168bfb270072a039a4e57264c2c55d950f83733fd43a33773760e5d220c67', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-course-card', bookId: 'work', locale: 'zh', slug: 'p2-course-card', title: '标题长了半行，按钮去哪儿了？', order: 5, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-course-card.md',
    sha256: '4b228169f2dd54043f08b3743c4ff248b6e6b32ed60a581641762ce61618aca5', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-one-less-click', bookId: 'work', locale: 'zh', slug: 'p2-one-less-click', title: '校方想少点一下', order: 6, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-one-less-click.md',
    sha256: 'e371ff144a6721d9fca914991da2062f8e17f3dd15287a31be3ccc9b1f4c0c78', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: '05-enrolment-controls', bookId: 'work', locale: 'zh', slug: '05-enrolment-controls', title: '点了“报名”，我还有机会看一眼上课时间吗？', order: 7, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/05-enrolment-controls.md',
    sha256: '5953182abe5c9b240721f4c19c528d26b632405da26af013134e30ca678ad44b', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: '06-colour-token-intent', bookId: 'work', locale: 'zh', slug: '06-colour-token-intent', title: '“确认报名”要换颜色，为什么课程链接也跟着变了？', order: 8, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/06-colour-token-intent.md',
    sha256: '30e83be84f836bc795379eb4608e0579f127fc3d083b54880380032e807db9e2', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-component-state', bookId: 'work', locale: 'zh', slug: 'p2-component-state', title: '两个开关都开了，按钮该听谁的？', order: 9, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-component-state.md',
    sha256: 'd84a50e7888ea2505500642fb8e8ac2bb0ac2a975084662d09fc447e284100e0', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-form-wait', bookId: 'work', locale: 'zh', slug: 'p2-form-wait', title: '邮箱改好了，刚才那一下还算数吗？', order: 10, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-form-wait.md',
    sha256: '519b3dbf0841f775801eb4ef06eb6811d8e20573f0a2768d470ea492dcacdca5', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-two-windows', bookId: 'work', locale: 'zh', slug: 'p2-two-windows', title: '左边已经报好名，右边怎么还可以报？', order: 11, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-two-windows.md',
    sha256: '8940c6992604b24d99bbc109e76ed5ed63a6ef8e306c0e3203a4b22ab5513f3c', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p2-first-screen', bookId: 'work', locale: 'zh', slug: 'p2-first-screen', title: '课程介绍已经出来了，“我的报名”还在等谁？', order: 12, part: 2,
    source: 'book/revisions/zh/volume-one-making-of/p2-first-screen.md',
    sha256: '3efc1b1f3e17c982b3b497d72ff0807d668d76a79a92cae1fc290f602cac9ece', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p3-request', bookId: 'work', locale: 'zh', slug: 'p3-request', title: '请求出门以后，谁签收了它？', order: 13, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/p3-request.md',
    sha256: 'b82a195f3d10c8c5f09b12d9cc0a1c815778b69f8ede67e06d56ef1bdbb6cf67', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: '04-api-contract', bookId: 'work', locale: 'zh', slug: '04-api-contract', title: '没有找到课程，还是没有查到结果？', order: 14, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/04-api-contract.md',
    sha256: 'a259b0c83bdb52bceaf5234e7ed2ad696fb67218cad2bad4bbbf619d7d64d109', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p3-turn-page', bookId: 'work', locale: 'zh', slug: 'p3-turn-page', title: '第二页怎么又有那门课', order: 15, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/p3-turn-page.md',
    sha256: '6a3ffdbd716fe8513ffa5f4a9bbe0bb9d749733f71159df753a9c483b3417882', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p3-private-handout', bookId: 'work', locale: 'zh', slug: 'p3-private-handout', title: '两个学校都有一本《第一讲》', order: 16, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/p3-private-handout.md',
    sha256: '1e2f834159e856104660d27ecd0a219929c55d44efd2cd16741100b82d796224', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p3-callback', bookId: 'work', locale: 'zh', slug: 'p3-callback', title: '转换商说“已完成”，老师就能打开了吗？', order: 17, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/p3-callback.md',
    sha256: '5c8eb2f23c933c3594ff30aa54b9c6e805e6e3adc003de226449edc6364cb7f5', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p3-new-file', bookId: 'work', locale: 'zh', slug: 'p3-new-file', title: '新讲义上传到一半，旧的还能读吗？', order: 18, part: 3,
    source: 'book/revisions/zh/volume-one-making-of/p3-new-file.md',
    sha256: '23ee9f0a5954de77a1b2de02f87ee5a872cbbbf7e34d254f532a646e6c5f06d4', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-derived', bookId: 'work', locale: 'zh', slug: 'p4-derived', title: '昨天搜得到的讲义，今天还该在吗？', order: 19, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-derived.md',
    sha256: '51179a131e1a65ac2e3d593294b8b3705d62ac939f24ce90ef4ac3d4cf54a653', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-enrolment-events', bookId: 'work', locale: 'zh', slug: 'p4-enrolment-events', title: '按钮响了两声，教室里该摆几把椅子？', order: 20, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-enrolment-events.md',
    sha256: '55055ad720a12b7c0698ade7970c332c0dfaa1bfc1124295fc3a644bcab0d6ce', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-last-seat', bookId: 'work', locale: 'zh', slug: 'p4-last-seat', title: '两个人、三份讲义，怎么数出了六个报名？', order: 21, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-last-seat.md',
    sha256: '61747e2d01b211fe081b390b461bbd6335dab3ac3897f94219ae52e3957391c6', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-roll-call', bookId: 'work', locale: 'zh', slug: 'p4-roll-call', title: '最后一把椅子，两个人同时伸手', order: 22, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-roll-call.md',
    sha256: 'de2225728984ee3d79282f56c7500458d1096c52e480f0afc2fb6265a2663abe', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-who-owns-the-row', bookId: 'work', locale: 'zh', slug: 'p4-who-owns-the-row', title: '换了课名，为什么要给三个人打电话？', order: 23, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-who-owns-the-row.md',
    sha256: '8fdc4c112e56609cab4c4ef208da573bc6e1f02991df7f553853b54813d8ecc3', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p4-sunday-report', bookId: 'work', locale: 'zh', slug: 'p4-sunday-report', title: '周日的那一课，怎么算到了下星期？', order: 24, part: 4,
    source: 'book/revisions/zh/volume-one-making-of/p4-sunday-report.md',
    sha256: 'df5bbcb991283f846864a474064bff576f020b3bb34d1e6848cb382cf8364ef9', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-opening-time', bookId: 'work', locale: 'zh', slug: 'p5-opening-time', title: '九点整，大家一起按下去', order: 25, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-opening-time.md',
    sha256: '164e0318a7efea64051fc9363db8793f6ec25f18bcbbc74239c29bc90ddc2d95', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-first-minute', bookId: 'work', locale: 'zh', slug: 'p5-first-minute', title: '九点零一分，队伍究竟还剩多少人？', order: 26, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-first-minute.md',
    sha256: '8cb0dbc2898050fa62f965a27487ebea0ca277e497ad4e7ccb11e745abc89c47', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-receipt', bookId: 'work', locale: 'zh', slug: 'p5-receipt', title: '再试一次，用的是哪一次的号码', order: 27, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-receipt.md',
    sha256: '6004c7db05a2e69045192947c9ff4df6dd5f22a89c4308a6b9cf75b7387df5b3', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-handout-job', bookId: 'work', locale: 'zh', slug: 'p5-handout-job', title: '笔记本合上了，谁还在转那份讲义？', order: 28, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-handout-job.md',
    sha256: 'c35d88e1cb7b6b5cc59e30670c9097a11495bdd3618cb08f521baa7646995b10', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-two-imports', bookId: 'work', locale: 'zh', slug: 'p5-two-imports', title: '百份讲义到了九十九份，老师该重传哪一本？', order: 29, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-two-imports.md',
    sha256: '6ff2b630aff9bdc91bba41a9bcf4e2394746de1c108ceea84b837724c13446ba', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p5-replay', bookId: 'work', locale: 'zh', slug: 'p5-replay', title: '修好了搜索，能不能别再给老师寄一封信？', order: 30, part: 5,
    source: 'book/revisions/zh/volume-one-making-of/p5-replay.md',
    sha256: '09c10b1de6b45841fb85094272151f82c661834fb83343f370551b54f50724cc', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-room', bookId: 'work', locale: 'zh', slug: 'p6-room', title: '同一份程序，搬家以后少了什么？', order: 31, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-room.md',
    sha256: '126055e32e1e23069e261f01321728e55e4a89759c0125a946dc3e56edb6bd2d', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-recoverable-worker', bookId: 'work', locale: 'zh', slug: 'p6-recoverable-worker', title: '转到第四页时，谁记得前三页？', order: 32, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-recoverable-worker.md',
    sha256: '485a842323c5fbb9cc3538366442a2939b0d9e5ae551e76853dfff1ea9c11c69', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-converter-change', bookId: 'work', locale: 'zh', slug: 'p6-converter-change', title: '换了转换器，两所学校都得重来吗？', order: 33, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-converter-change.md',
    sha256: '79d452e4dfa7d2d44500c48a6794472197839052f2bcddccf790cc50b03d9570', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-cost', bookId: 'work', locale: 'zh', slug: 'p6-cost', title: '文件都放对了，学校究竟在付哪几笔钱？', order: 34, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-cost.md',
    sha256: '2600ff512fbb6032b7fa609de9aca3821763430979f3319d13178cf5b7b5e283', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-compatible-change', bookId: 'work', locale: 'zh', slug: 'p6-compatible-change', title: '新按钮上线那晚，旧页面还开着', order: 35, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-compatible-change.md',
    sha256: '183e6516410227e22b0cab82651932755a8a6a16e6b6f25140ae6868dae1445c', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p6-release', bookId: 'work', locale: 'zh', slug: 'p6-release', title: '上线以后，去王老师那边坐一会儿', order: 36, part: 6,
    source: 'book/revisions/zh/volume-one-making-of/p6-release.md',
    sha256: '04936d7005152e40fce44afe5a6bb353f3c40243953cb1abf03f7d12f492098a', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-slow-search', bookId: 'work', locale: 'zh', slug: 'p7-slow-search', title: '大家都说搜索慢，先看谁的钟？', order: 37, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-slow-search.md',
    sha256: 'ed9f0afda93091edd9cde08074533b313ac6e2075b464934f3ea5558eafcb29b', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-small-sample', bookId: 'work', locale: 'zh', slug: 'p7-small-sample', title: '只有三条追踪，能说哪一次慢？', order: 38, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-small-sample.md',
    sha256: 'a3c947a12abd4431a1b129280bea8781aa97075b64bff50771ccd4ebfbb979e5', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-queue-incident', bookId: 'work', locale: 'zh', slug: 'p7-queue-incident', title: '搜索恢复了，那份讲义还在排队', order: 39, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-queue-incident.md',
    sha256: '7eaec61e926ae860c4577397eb09da52ce6fa89f8412ddec358628f4a67b2fb8', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-return-traffic', bookId: 'work', locale: 'zh', slug: 'p7-return-traffic', title: '工人回来了，要一口气把门全打开吗？', order: 40, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-return-traffic.md',
    sha256: 'b3b9e96f989fa30eb6b8e6eb3b55ba3c5064e0361c78256bd0d5952de7954c5a', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-restore', bookId: 'work', locale: 'zh', slug: 'p7-restore', title: '备份是绿色的，名单能拿回来吗？', order: 41, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-restore.md',
    sha256: 'aadc5a8a84339125bf80c6020520bdcb6b9f5804c7f36b470402198b98caa92b', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p7-reopen', bookId: 'work', locale: 'zh', slug: 'p7-reopen', title: '名单找回来了，可以开门了吗？', order: 42, part: 7,
    source: 'book/revisions/zh/volume-one-making-of/p7-reopen.md',
    sha256: '82f5dfed92910e94a3f9020d4595d19f7a7783adb45c0a471bac987ac4a0da52', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-ask', bookId: 'work', locale: 'zh', slug: 'p8-ask', title: '“我能报这门课吗？”要请模型来答吗？', order: 43, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-ask.md',
    sha256: 'abc488904f7de8bdf76b8e7d2fcb9e18c50c48b4205470e81009ea042bade0d2', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-reschedule', bookId: 'work', locale: 'zh', slug: 'p8-reschedule', title: '我只是问周日有没有位子', order: 44, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-reschedule.md',
    sha256: '8c7f6fdb05e30682bec4ee8e033cc8015a9b1904584253a3c4c8797aa887730e', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-stream', bookId: 'work', locale: 'zh', slug: 'p8-stream', title: '读到半句话，我还能换个问题吗？', order: 45, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-stream.md',
    sha256: 'ed5d4c412620d323207600a6a3317233debcd399aac5e09d27ded1e31bfb1476', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-handout-answer', bookId: 'work', locale: 'zh', slug: 'p8-handout-answer', title: '助手翻到的是谁的第十二页？', order: 46, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-handout-answer.md',
    sha256: '8266d75967e101317bbdd64effff562b2f625e64e9f7931c259f917003dc9674', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-good-answer', bookId: 'work', locale: 'zh', slug: 'p8-good-answer', title: '两版各答对三题，哪一版还能给学员用？', order: 47, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-good-answer.md',
    sha256: '40dcaa588f5f390b3ee4989653933d4039989d670c1b299faa6a17fbb7b894b6', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-release-decision', bookId: 'work', locale: 'zh', slug: 'p8-release-decision', title: '答得快了，怎么有更多人点了“问老师”？', order: 48, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-release-decision.md',
    sha256: 'faf1457e373920e54b99b599da2f9421b58769809254cb71917c5ce139619a52', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'P810', bookId: 'work', locale: 'zh', slug: 'after-ai-finishes', title: 'AI 写完以后，我们还需要做什么？', order: 49, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/03-after-ai-finishes.md',
    sha256: '34d30e3d6c8cda8180c778449682bd8edb93749a0c9fdd848ac823f9ff938a70', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'p8-return-to-reader', bookId: 'work', locale: 'zh', slug: 'p8-return-to-reader', title: '按钮很守信用，我却想回去改需求', order: 50, part: 8,
    source: 'book/revisions/zh/volume-one-making-of/p8-return-to-reader.md',
    sha256: 'bf909c7b39c2309ca90347d8f35bf71a0320ef19acf5059e957ad4363bfc2cad', status: 'reviewed-draft', review: volumeReview,
  },
  {
    id: 'closing', bookId: 'work', locale: 'zh', slug: 'closing', title: '程序员下班指南：今天就到这儿吧', order: 51, part: 9,
    source: 'book/revisions/zh/volume-one-making-of/closing.md',
    sha256: 'ba1b057cff4815bca2fb1b5c6d4542796e5068aab0c9ed98001acaddce4b089a', status: 'reviewed-draft', review: volumeReview,
  },
];

// Historical public and preview fragments resolve to current sections.
export const legacyHeadingAliases: readonly { chapterId: string; legacyId: string; headingId: string }[] = [
  { chapterId: 'opening', legacyId: '关于本书的-ai-协作', headingId: '我为什么想写这本书' },
  { chapterId: 'opening', legacyId: 'ai-也在这张图里', headingId: '我为什么想写这本书' },
  { chapterId: 'opening', legacyId: '例子会重复问题会变深', headingId: '老师明天要带什么去开门' },
  { chapterId: 'opening', legacyId: '原理要讲清楚选择要有条件', headingId: '从你已经做过的事情开始' },
  { chapterId: 'P810', legacyId: '三个人说的好了', headingId: '回到那句确认' },
  { chapterId: 'opening', legacyId: '往后看也往旁边看', headingId: '老师明天要带什么去开门' },
  { chapterId: 'p2-component-state', legacyId: '用一个动作试试这个组件', headingId: '两个窗口一张没回来的收条' },
  { chapterId: 'p3-request', legacyId: '第二页怎么又有那门课', headingId: '请求出门以后谁签收了它' },
  { chapterId: 'p3-private-handout', legacyId: '上传到一半', headingId: '两个学校都有一本第一讲' },
  { chapterId: 'p4-last-seat', legacyId: '两把椅子的问题解决了最后一把呢', headingId: '两张明细表约在了同一间教室' },
  { chapterId: 'p4-derived', legacyId: '报表里的周六', headingId: '昨天搜得到的讲义今天还该在吗' },
  { chapterId: 'p5-opening-time', legacyId: '再试一次用的是哪一次的号码', headingId: '九点整大家一起按下去' },
  { chapterId: 'p7-slow-search', legacyId: '可是讲义真的堆起来了', headingId: '大家都说搜索慢先看谁的钟' },
  { chapterId: 'p8-ask', legacyId: '半句话里的时间', headingId: '我能报这门课吗要请模型来答吗' },
];

export function chapterPath(chapter: Pick<ChapterEntry, 'slug' | 'bookId'> & { locale?: Locale }, locale: Locale = chapter.locale ?? 'zh'): string {
  return `${bookCatalog[chapter.bookId].editions[locale].home}read/${chapter.slug}/`;
}

export function chaptersForBook(entries: readonly ChapterEntry[], bookId: BookId): ChapterEntry[] {
  return entries.filter(entry => entry.bookId === bookId);
}

export function chapterNeighbors(entries: readonly ChapterEntry[], chapter: ChapterEntry) {
  const chapters = chaptersForBook(entries, chapter.bookId);
  const index = chapters.findIndex(entry => entry.id === chapter.id);
  if (index < 0) return {};
  return { previous: chapters[index - 1], next: chapters[index + 1] };
}

export function validateManifest(entries: readonly ChapterEntry[]): void {
  const identities = new Set<string>();
  const routes = new Set<string>();
  const sources = new Set<string>();
  const previousOrder = new Map<BookId, number>();
  if (!entries.length) throw new Error('The reviewed manifest must not be empty');
  for (const chapter of entries) {
    if (!Object.hasOwn(bookCatalog, chapter.bookId)) throw new Error(`Unknown book: ${chapter.id}`);
    const identity = `${chapter.locale}/${chapter.id}`;
    const route = chapterPath(chapter);
    if (identities.has(identity) || routes.has(route) || sources.has(chapter.source)) {
      throw new Error(`Duplicate chapter identity, route or source: ${chapter.id}`);
    }
    if (chapter.locale !== 'zh' || chapter.status !== 'reviewed-draft' || !chapter.id || !chapter.title || !chapter.review) {
      throw new Error(`Incomplete reviewed chapter: ${chapter.id}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(chapter.slug) || !/^[a-f0-9]{64}$/.test(chapter.sha256)) {
      throw new Error(`Invalid slug or source hash: ${chapter.id}`);
    }
    if (!/^book\/(?:[\w-]+\/)*[\w-]+\.md$/.test(chapter.source)) {
      throw new Error(`Source must be a Markdown path inside book/: ${chapter.id}`);
    }
    if (!Number.isInteger(chapter.part) || chapter.part < 0 || chapter.part > 9) throw new Error(`Invalid reading part: ${chapter.id}`);
    if (!Number.isSafeInteger(chapter.order) || chapter.order <= (previousOrder.get(chapter.bookId) ?? 0)) {
      throw new Error(`Chapter order must be unique and increasing: ${chapter.id}`);
    }
    identities.add(identity); routes.add(route); sources.add(chapter.source); previousOrder.set(chapter.bookId, chapter.order);
  }
}

validateManifest(chapterManifest);
