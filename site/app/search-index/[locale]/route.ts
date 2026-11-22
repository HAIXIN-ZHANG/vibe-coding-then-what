import { getBook, getEnglishBook } from '../../../content/book.ts';
import { buildSearchIndex } from '../../../content/build-search-index.ts';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() { return [{ locale: 'en.json' }, { locale: 'zh.json' }]; }

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const filename = (await params).locale;
  const locale = filename === 'en.json' ? 'en' : filename === 'zh.json' ? 'zh' : null;
  if (!locale) return new Response(null, { status: 404 });
  return Response.json(buildSearchIndex(locale === 'en' ? await getEnglishBook() : await getBook(), locale));
}
