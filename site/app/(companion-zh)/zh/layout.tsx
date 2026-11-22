import type { ReactNode } from 'react';
import { DocumentLayout } from '../../../components/document-layout.tsx';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocumentLayout locale="zh" companion>{children}</DocumentLayout>;
}
