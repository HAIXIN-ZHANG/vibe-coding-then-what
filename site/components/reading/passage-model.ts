import { sectionUrl } from './sharing.ts';

export function passageUrl(location: string, headingId: string, passageId: string, version: string) {
  const result = new URL(sectionUrl(location, headingId));
  if (passageId) {
    result.searchParams.set('section', headingId);
    result.hash = passageId;
  }
  result.searchParams.set('v', version.slice(0, 12));
  return result.href;
}

export type Bookmark = { href: string; title: string; label: string };
export function readBookmarks(raw: string | null, origin: string, prefix: string): Bookmark[] {
  let data: unknown;
  try { data = JSON.parse(raw ?? '[]'); } catch { return []; }
  if (!Array.isArray(data)) return [];
  return data.filter((item): item is Bookmark => {
    if (!item || typeof item.href !== 'string' || typeof item.title !== 'string' || typeof item.label !== 'string') return false;
    try {
      const url = new URL(item.href, origin);
      return !url.username && !url.password && url.origin === origin && url.pathname.startsWith(prefix + '/') &&
        /^\/(?:zh\/)?read\/[a-z0-9-]+\/$/.test(url.pathname.slice(prefix.length));
    } catch { return false; }
  });
}

export function contextText(zh: boolean, title: string, section: string, excerpt: string, url: string, version: string) {
  return zh ? [
    '我想弄清楚这段话里的一个判断：', '', title + ' · ' + section,
    excerpt, '', '请分开说明原文支持的结论、你作的假设，以及还缺什么证据。', '', url, '原稿 SHA-256 ' + version,
  ].join('\n') : [
    'Help me examine a claim in this passage:', '', title + ' · ' + section,
    excerpt, '', 'Distinguish what the passage supports from your assumptions and any missing evidence.', '', url, 'Source SHA-256 ' + version,
  ].join('\n');
}
