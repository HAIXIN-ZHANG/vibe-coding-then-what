'use client';

import type { Locale } from '../config/i18n.ts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languageSwitchTarget } from '../config/i18n.ts';

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const targetLocale = locale === 'en' ? 'zh' : 'en';
  const { href, text, ariaLabel } = languageSwitchTarget(pathname, locale, process.env.NEXT_PUBLIC_BASE_PATH || '');

  return (
    <Link href={href} hrefLang={targetLocale} aria-label={ariaLabel}>
      {text}
    </Link>
  );
}
