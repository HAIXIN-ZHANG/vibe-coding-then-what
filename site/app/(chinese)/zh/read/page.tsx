import { ReadingIndex } from '../../../../components/reading-index.tsx';
import { bookCatalog } from '../../../../config/books.ts';
import { getMessages } from '../../../../config/i18n.ts';
import { readingMetadata } from '../../../../config/page-metadata.ts';

const messages = getMessages('zh');
export const metadata = readingMetadata('zh', 'work', { kind: 'directory', route: bookCatalog.work.editions.zh.entry,
  title: `${messages.contents} | ${messages.title}` });

export default function Chapters() {
  return <ReadingIndex locale="zh" />;
}
