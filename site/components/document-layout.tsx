import type { ReactNode } from 'react';
import type { Locale } from '../config/i18n.ts';
import { companionCopy } from './companion-book.tsx';
import { BooksLink } from './books-link.tsx';
import { AppearanceControl } from './ui/appearance-control.tsx';
import { LanguageSwitch } from './language-switch.tsx';
import { SiteHeader } from './site-header.tsx';
import { site } from '../config/site.ts';
import { getMessages } from '../config/i18n.ts';
import { ThemeHead } from '../app/theme-head.tsx';
import '../styles/global.css';

type DocumentLayoutProps = {
  children: ReactNode;
  locale: Locale;
  languageHome?: boolean;
  companion?: boolean;
};

export function DocumentLayout({ children, locale, languageHome = false, companion = false }: DocumentLayoutProps) {
  const messages = getMessages(locale);
  return (
    <html lang={messages.lang} suppressHydrationWarning>
      <ThemeHead />
      <body>
        <a className="skip-link" href="#main">{messages.skip}</a>
        {companion ? <header className="site-header shell companion-header">
          <BooksLink locale={locale} />
          <nav aria-label={messages.navigation}>
            <LanguageSwitch locale={locale} />
            <AppearanceControl locale={locale} />
          </nav>
        </header> : <SiteHeader locale={locale} languageHome={languageHome} />}
        <main className="shell main" id="main" tabIndex={-1}>{children}</main>
        <footer className="site-footer shell">
          <div className="footer-identity">
            <p>{companion ? companionCopy[locale].title : messages.title}</p>
            <p className="footer-byline">{messages.authorLabel}{messages.authorName}</p>
            <p>{companion ? companionCopy[locale].status : messages.editionLabel}</p>
          </div>
          <a href={site.issues}>{messages.feedback} <span aria-hidden="true">↗</span></a>
        </footer>
      </body>
    </html>
  );
}
