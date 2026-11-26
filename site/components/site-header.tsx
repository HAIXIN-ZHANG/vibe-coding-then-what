import type { Locale } from '../config/i18n.ts';
import Link from 'next/link';
import { site } from '../config/site.ts';
import { getMessages, localePath } from '../config/i18n.ts';
import { LanguageSwitch } from './language-switch.tsx';
import { AppearanceControl } from './ui/appearance-control.tsx';
import { ChapterHeaderMenu } from './reading/chapter-header-menu.tsx';
import { SearchControl } from './search/search-control.tsx';
import { BooksLink } from './books-link.tsx';

export function SiteHeader({ locale, languageHome = false }: { locale: Locale; languageHome?: boolean }) {
  const messages = getMessages(locale);
  const otherLocale = locale === 'en' ? 'zh' : 'en';
  return (
    <header className={languageHome ? 'site-header shell' : 'site-header shell responsive-header'}>
      <Link className="wordmark" href={localePath(locale)} aria-label={`${messages.title} · ${messages.home}`} lang={messages.lang}>
        <span>{messages.title.slice(0, -messages.titleLines[1].length)}</span><span>{messages.titleLines[1]}</span>
      </Link>
      <SearchControl locale={locale} />
      <nav aria-label={messages.navigation}>
        <BooksLink locale={locale} />
        <ChapterHeaderMenu label={messages.navigation} responsive={!languageHome}>
        <Link href={localePath(locale, 'read/')}>{messages.contents}</Link>
        {languageHome ? (
          <Link href={localePath(otherLocale)} hrefLang={otherLocale} aria-label={messages.switchLabel}>
            {messages.switchText}
          </Link>
        ) : <LanguageSwitch locale={locale} />}
        <a href={site.repository} lang="en">GitHub <span aria-hidden="true">↗</span></a>
        </ChapterHeaderMenu>
        <AppearanceControl locale={locale} />
      </nav>
    </header>
  );
}
