import type { Locale } from '../config/i18n.ts';

export type ChapterRecording = {
  chapterId: string;
  locale: Locale;
  sourceHash: string;
  audio: string;
  durationSeconds: number;
};

// Include only reviewed, distributable files shipped under site/public.
export const chapterRecordings: readonly ChapterRecording[] = [];

export function findRecording(chapterId: string, locale: Locale, sourceHash: string, catalog = chapterRecordings) {
  return catalog.find(item => item.chapterId === chapterId && item.locale === locale && item.sourceHash === sourceHash);
}

export function formatDuration(seconds: number) {
  const total = Math.floor(seconds);
  return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
}
