'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import type { Locale } from '../../config/i18n.ts';
import type { SearchEntry, SearchIndex } from '../../content/search.ts';
import { localePath } from '../../config/i18n.ts';
import { withBasePath } from '../../config/deployment.ts';
import { readSearchIndex, searchEntries, normalizeSearch, highlightSearch } from '../../content/search.ts';
import { Button } from '../ui/button.tsx';
import { searchMessages } from './messages.ts';

export function SearchControl({ locale }: { locale: Locale }) {
  const m = searchMessages(locale), id = useId();
  const dialog = useRef<HTMLDialogElement>(null), input = useRef<HTMLInputElement>(null), results = useRef<HTMLOListElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null), chapterNavigation = useRef<(() => void) | null>(null);
  useEffect(() => () => chapterNavigation.current?.(), []);
  const [query, setQuery] = useState(''), [composing, setComposing] = useState(false);
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const loadIndex = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await fetch(withBasePath(`/search-index/${locale}.json`, process.env.NEXT_PUBLIC_BASE_PATH), { cache: 'no-store' });
      if (!response.ok) throw new Error('Search index unavailable');
      setIndex(readSearchIndex(await response.json(), locale)); setStatus('ready');
    } catch { setStatus('error'); }
  }, [locale]);
  const open = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.current.showModal(); input.current?.focus({ preventScroll: true });
    if (status === 'idle') void loadIndex();
  }, [loadIndex, status]);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.isComposing || event.altKey || !(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || event.target.closest('input, textarea, select'))) return;
      event.preventDefault(); open();
    };
    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, [open]);
  const matches = index && !composing ? searchEntries(index, query, locale) : [];
  const highlight = (value: string) => highlightSearch(value, query).map((part, index) => part.matched
    ? <mark key={index}>{part.text}</mark> : part.text);
  function closeForNavigation() {
    // Native result anchors assign destination focus after the dialog's immediate restoration.
    returnFocus.current = null;
    chapterNavigation.current?.();
    dialog.current?.close();
  }
  function navigateChapter(event: MouseEvent<HTMLAnchorElement>, entry: SearchEntry) {
    closeForNavigation();
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(event.currentTarget.href);
    const focusChapter = () => {
      if (window.location.href !== destination.href) return false;
      const title = document.querySelector<HTMLElement>(`article[data-chapter-id="${CSS.escape(entry.chapterId)}"] h1`);
      if (!title) return false;
      title.focus({ preventScroll: true }); title.scrollIntoView({ block: 'start', behavior: 'instant' });
      return true;
    };
    if (window.location.pathname === destination.pathname) {
      event.preventDefault(); window.history.pushState(null, '', destination.href); focusChapter();
    } else {
      // Focus belongs only to this exact navigation, not a later section URL or user action.
      const sourceURL = window.location.href, controller = new AbortController();
      let expiry = 0;
      const observer = new MutationObserver(() => {
        if (window.location.href !== sourceURL && window.location.href !== destination.href || focusChapter()) cleanup();
      });
      const cleanup = () => {
        observer.disconnect(); controller.abort(); window.clearTimeout(expiry);
        if (chapterNavigation.current === cleanup) chapterNavigation.current = null;
      };
      observer.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });
      chapterNavigation.current = cleanup;
      for (const type of ['pointerdown', 'keydown', 'wheel', 'touchstart', 'popstate', 'hashchange', 'pagehide']) {
        window.addEventListener(type, cleanup, { capture: true, passive: true, signal: controller.signal });
      }
      // A failed/abandoned route must not retain a focus observer indefinitely; this never retries navigation.
      expiry = window.setTimeout(cleanup, 10_000);
    }
  }
  const hasQuery = !!normalizeSearch(query);
  const emptyCorpus = status === 'ready' && !index?.entries.length;
  const headline = emptyCorpus ? m.unavailable : status === 'loading' ? m.loading : status === 'error' ? m.failed
    : !hasQuery || composing ? m.ready : matches.length ? `${matches.length} ${m.results}` : m.empty;
  return <>
    <Button visual="search" className="search-trigger" aria-label={m.title} aria-haspopup="dialog" aria-controls={id} onClick={open}>
      <span className="search-trigger-icon" aria-hidden="true" style={{ maskImage: `url("${withBasePath('/icons/reader/search.svg', process.env.NEXT_PUBLIC_BASE_PATH)}")` }} /><span className="search-trigger-label">{m.title}</span><kbd aria-hidden="true">⌘ / Ctrl K</kbd>
    </Button>
    <dialog ref={dialog} id={id} className="search-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-scope`}
      onCancel={event => { if (composing) event.preventDefault(); }}
      onClose={() => { if (returnFocus.current?.isConnected && returnFocus.current.getClientRects().length) returnFocus.current.focus({ preventScroll: true }); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
      }}
      onKeyDown={event => {
        if (composing || event.nativeEvent.isComposing || event.keyCode === 229) {
          if (event.key === 'Escape') event.preventDefault();
          return;
        }
        // Search inputs may consume Escape to clear text before the dialog sees a cancel event.
        if (event.key === 'Escape') { event.preventDefault(); dialog.current?.close(); return; }
        const links = [...(results.current?.querySelectorAll<HTMLAnchorElement>('a') || [])];
        const active = links.indexOf(document.activeElement as HTMLAnchorElement);
        if (event.key === 'ArrowDown' && links.length && (event.target === input.current || active >= 0)) {
          event.preventDefault(); links[Math.min(active + 1, links.length - 1)].focus();
        } else if (event.key === 'ArrowUp' && active >= 0) {
          event.preventDefault(); if (active === 0) input.current?.focus(); else links[active - 1].focus();
        } else if (event.key === 'Enter' && event.target === input.current && links.length) {
          event.preventDefault(); links[0].click();
        }
      }}>
      <div className="search-dialog-heading"><h2 id={`${id}-title`}>{m.title}</h2><Button visual="quiet" onClick={() => dialog.current?.close()}>{m.close}</Button></div>
      <label className="search-label" htmlFor={`${id}-input`}>{m.title}</label>
      <div className="search-field">
        <input ref={input} id={`${id}-input`} type="search" value={query} maxLength={160} autoComplete="off" placeholder={m.placeholder}
          onChange={event => setQuery(event.target.value)} onCompositionStart={() => setComposing(true)} onCompositionEnd={() => setComposing(false)} />
        {query ? <Button visual="quiet" onClick={() => { setQuery(''); input.current?.focus(); }}>{m.clear}</Button> : null}
      </div>
      <p className="search-scope" id={`${id}-scope`}>{m.scope}</p>
      <section className="search-feedback" aria-busy={status === 'loading'}>
        <p className="search-status" role="status">{headline}</p>
        {emptyCorpus || (status === 'ready' && hasQuery && !matches.length) ? <Link href={localePath(locale, 'read/')} onClick={closeForNavigation}>{m.browse} →</Link>
          : status === 'error' ? <><p>{m.retryHint}</p><Button visual="quiet" onClick={() => void loadIndex()}>{m.retry}</Button></>
            : status !== 'loading' && (!hasQuery || composing || !matches.length) ? <p>{hasQuery && !composing ? m.fewer : m.hint}</p> : null}
        {status === 'ready' && !!matches.length ? <ol ref={results} className="search-results">{matches.map(({ entry, kind, href, excerpt }) => {
          const label = <><span>{kind === 'chapter' ? m.chapterResult : <>{m.sectionResult}{normalizeSearch(entry.headingTitle) !== normalizeSearch(entry.chapterTitle) ? <> · {highlight(entry.chapterTitle)}</> : null}</>}</span>
            <strong>{highlight(kind === 'chapter' ? entry.chapterTitle : entry.headingTitle)}</strong></>;
          return <li key={href} data-search-kind={kind}>
            {kind === 'chapter' ? <Link href={href} onClick={event => navigateChapter(event, entry)}>{label}</Link>
              : <a href={withBasePath(href, process.env.NEXT_PUBLIC_BASE_PATH)} onClick={closeForNavigation}>{label}</a>}
            {excerpt ? <p>{highlight(excerpt)}</p> : null}
          </li>;
        })}</ol> : null}
      </section>
      {locale === 'zh' ? <Link className="search-browse" href={localePath(locale, 'read/')} onClick={closeForNavigation}>{m.browse} →</Link> : null}
    </dialog>
  </>;
}
