import { HomePage } from '../../../components/home-page.tsx';
import { bookCatalog } from '../../../config/books.ts';
import { readingMetadata } from '../../../config/page-metadata.ts';

export const metadata = readingMetadata('zh', 'work', { kind: 'home', route: bookCatalog.work.editions.zh.home });

export default function Home() {
  return <HomePage locale="zh" />;
}
