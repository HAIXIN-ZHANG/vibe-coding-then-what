'use client';

import Link from 'next/link';
import { bookSelectionPath, getMessages, type Locale } from '../config/i18n.ts';
import { rememberBookReturn } from './reading/book-return.ts';

export function BooksLink({ locale }: { locale: Locale }) {
  return <Link className="books-link" href={bookSelectionPath(locale)} onNavigate={rememberBookReturn}>
    {getMessages(locale).books}
  </Link>;
}
