import Link from 'next/link';
import { DocumentLayout } from '../components/document-layout.tsx';
import { NotFoundContent } from '../components/not-found-content.tsx';
import { getMessages } from '../config/i18n.ts';
import { missingMetadata } from '../config/page-metadata.ts';

export const metadata = missingMetadata();

export default function GlobalNotFound() {
  const chinese = getMessages('zh');
  return (
    <DocumentLayout locale="en" languageHome>
      <NotFoundContent locale="en" />
      <aside className="error-translation" lang="zh-CN" aria-label="中文说明">
        <h2>{chinese.missing}</h2>
        <p>{chinese.missingDescription}</p>
        <Link href="/zh/">返回中文首页 <span aria-hidden="true">→</span></Link>
      </aside>
    </DocumentLayout>
  );
}
