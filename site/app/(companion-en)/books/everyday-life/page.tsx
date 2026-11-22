import { CompanionBook } from '../../../../components/companion-book.tsx';
import { bookCatalog } from '../../../../config/books.ts';
import { readingMetadata } from '../../../../config/page-metadata.ts';

export const metadata = readingMetadata('en', 'life', { kind: 'companion', route: bookCatalog.life.editions.en.home });

export default function VolumeTwo() {
  return <CompanionBook locale="en" />;
}
