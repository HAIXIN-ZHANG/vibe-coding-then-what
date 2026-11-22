'use client';

import { englishStatus, hasEnglishEdition } from '../../content/english-edition.ts';
import { useSyncExternalStore } from 'react';
import type { Locale } from '../../config/i18n.ts';
import { alternateLocalePath, getMessages } from '../../config/i18n.ts';
import { withBasePath } from '../../config/deployment.ts';
import type { ReadingLocator } from '../../reading-progress/model.ts';
import { resolveReadingPosition } from '../../reading-progress/model.ts';
import { getEnglishReadingSnapshot, getReadingSnapshot, getServerReadingSnapshot, subscribeEnglishReading, subscribeReadingPosition } from '../../reading-progress/store.ts';
import { action } from '../../styled-system/recipes/action.js';

type ReadingProps = { locale: Locale; chapters: readonly ReadingLocator[]; english?: readonly ReadingLocator[] };

function useLastPosition(locale: Locale, chapters: readonly ReadingLocator[], english: readonly ReadingLocator[] = []) {
  const raw = useSyncExternalStore(subscribeReadingPosition, getReadingSnapshot, getServerReadingSnapshot);
  const result = resolveReadingPosition(raw, chapters);
  const localEnglish = useSyncExternalStore(subscribeEnglishReading, getEnglishReadingSnapshot, getServerReadingSnapshot);
  if (locale === 'zh') return result;
  const savedEnglish = resolveReadingPosition(localEnglish, english);
  if (savedEnglish || !result) return savedEnglish;
  if (!hasEnglishEdition(result.chapter.chapterId)) return null;
  return {
    ...result,
    href: alternateLocalePath(result.chapter.href, 'zh'),
    chapter: { ...result.chapter, title: getMessages(locale).chapterLabels[result.chapter.chapterId] },
    heading: undefined,
  };
}

export function HomeReadingAction({ locale, chapters, english, firstLabel }: ReadingProps & { firstLabel: string }) {
  const result = useLastPosition(locale, chapters, english);
  const copy = getMessages(locale).continueReading;
  const label = result?.stale ? copy.restart : result ? copy.resume : firstLabel;
  const firstChapter = locale === 'zh' ? chapters[0].href : alternateLocalePath(chapters[0].href, 'zh');
  return <div className="home-reading-action">
    <a className={action({ visual: 'primary' })} hrefLang={locale} aria-describedby={result?.stale ? 'last-section changed-section' : result ? 'last-section' : undefined}
      href={withBasePath(result?.href ?? firstChapter, process.env.NEXT_PUBLIC_BASE_PATH)}>
      {label} <span aria-hidden="true">→</span>
    </a>
    {result ? <small id="last-section">{result.heading?.title ?? result.chapter.title}{locale === 'en' ? ` · ${englishStatus(result.chapter.chapterId)}` : ''}</small> : null}
    {result?.stale ? <small id="changed-section">{copy.fallback}</small> : null}
  </div>;
}

export function ContinueReading({ locale, chapters, english }: ReadingProps) {
  const result = useLastPosition(locale, chapters, english), messages = getMessages(locale), m = messages.continueReading;
  if (!result) return null;
  return <section className="continue-reading" aria-labelledby="continue-reading-title">
    <h2 id="continue-reading-title">{m.title}</h2>
    {locale === 'en' ? <p className="continue-language">{englishStatus(result.chapter.chapterId)}</p> : null}
    <strong className="continue-chapter" lang={messages.lang}>{result.chapter.title}</strong>
    {result.heading ? <p>{m.lastRead} <span>{result.heading.title}</span></p> : null}
    {result.stale ? <p className="continue-fallback">{m.fallback}</p> : null}
    <a className={action({ visual: 'primary' })} href={withBasePath(result.href, process.env.NEXT_PUBLIC_BASE_PATH)} hrefLang={locale}>
      {result.stale ? m.restart : m.return} <span aria-hidden="true">→</span>
    </a>
    <p className="continue-local">{m.local}</p>
    <p>{m.shared}</p>
  </section>;
}
