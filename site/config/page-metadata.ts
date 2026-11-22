import type { Metadata } from 'next';
import { bookCatalog, type BookId } from './books.ts';
import { withBasePath } from './deployment.ts';
import { getMessages, type Locale } from './i18n.ts';
import { site } from './site.ts';

type ReadingSurface = { kind: 'home' | 'directory' | 'companion' }
  | { kind: 'chapter' | 'overview'; chapterId: string };
type PageIdentity = ReadingSurface & { route: string; title?: string; description?: string };

export function seriesMetadataName(locale: Locale): string {
  const author = getMessages(locale).authorName;
  return locale === 'zh' ? `${author}的书` : `Books by ${author}`;
}

export function readingMetadata(locale: Locale, bookId: BookId, page: PageIdentity): Metadata {
  const edition = bookCatalog[bookId].editions[locale];
  const title = page.title ?? edition.title;
  const description = page.description ?? edition.description;
  // A local mount and a rehearsal prefix do not claim a different public canonical URL.
  const url = (route: string) => new URL(withBasePath(route, site.publicBasePath), site.publicOrigin);
  const cover = { url: url(edition.cover.src), alt: edition.cover.alt, width: 480, height: 640 };
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url(page.route).href },
    openGraph: {
      type: page.kind === 'chapter' ? 'article' : 'website',
      siteName: seriesMetadataName(locale), locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      title, description, url: url(page.route), images: [cover],
    },
    twitter: { card: 'summary', title, description, images: [cover] },
    other: {
      'vctw:series': site.id, 'vctw:book': bookId, 'vctw:edition': locale, 'vctw:surface': page.kind,
      ...('chapterId' in page ? { 'vctw:chapter': page.chapterId } : {}),
    },
  };
}

export function missingMetadata(): Metadata {
  const english = getMessages('en');
  const seriesName = seriesMetadataName('en');
  const title = `${english.missing} | ${seriesName}`;
  return {
    title: { absolute: title }, description: english.missingDescription,
    openGraph: { type: 'website', siteName: seriesName, locale: 'en_AU', title, description: english.missingDescription },
    other: { 'vctw:series': site.id, 'vctw:edition': 'en', 'vctw:surface': 'not-found' },
  };
}
