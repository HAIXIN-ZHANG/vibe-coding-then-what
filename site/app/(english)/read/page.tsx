import { ReadingIndex } from '../../../components/reading-index.tsx';
import { bookCatalog } from '../../../config/books.ts';
import { getMessages } from '../../../config/i18n.ts';
import { readingMetadata } from '../../../config/page-metadata.ts';

const messages = getMessages('en');
export const metadata = readingMetadata('en', 'work', { kind: 'directory', route: bookCatalog.work.editions.en.entry,
  title: `${messages.contents} | ${messages.title}` });

export default function Chapters() {
  return <ReadingIndex locale="en" />;
}
