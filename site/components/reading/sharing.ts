export type SharingContext = { chapterId: string; chapterTitle: string; sourceHash: string; locale?: 'zh' | 'en' };

export function sectionUrl(currentUrl: string, headingId: string): string {
  const url = new URL(currentUrl);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Sharing requires an actual web location');
  url.search = ''; url.hash = encodeURIComponent(headingId);
  return url.href;
}

export function correctionUrl(context: SharingContext, heading: string, url: string, excerpt?: string): string {
  const issue = new URL('https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues/new');
  const en = context.locale === 'en';
  issue.searchParams.set('title', en ? `Correction: ${context.chapterTitle} · ${heading}` : `纠错：${context.chapterTitle} · ${heading}`);
  const fields = en
    ? [`Chapter: ${context.chapterTitle} (${context.chapterId})`, `Section: ${heading}`, `Link: ${url}`, `Source SHA-256: ${context.sourceHash}`]
    : [`章节：${context.chapterTitle} (${context.chapterId})`, `小节：${heading}`, `链接：${url}`, `原稿版本 SHA-256：${context.sourceHash}`];
  if (excerpt) fields.push(excerpt);
  fields.push('', en ? 'Suggested correction:' : '建议修改：', '');
  issue.searchParams.set('body', fields.join('\n'));
  return issue.href;
}
