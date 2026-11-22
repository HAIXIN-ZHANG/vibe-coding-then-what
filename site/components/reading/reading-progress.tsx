'use client';

import { useEffect } from 'react';
import type { ReadingLocator, ReadingPosition } from '../../reading-progress/model.ts';
import { englishReadingKey, subscribeExternalReadingChange, writeEnglishReadingPosition, writeReadingPosition } from '../../reading-progress/store.ts';
import { withBasePath } from '../../config/deployment.ts';

export function ReadingProgress({ chapter, locale = 'zh' }: { chapter: ReadingLocator; locale?: 'en' | 'zh' }) {
  useEffect(() => {
    const article = document.querySelector<HTMLElement>(`article[data-chapter-id="${CSS.escape(chapter.chapterId)}"]`);
    if (!article) return;
    const controller = new AbortController();
    let gesture: { y: number; expires: number } | null = null;
    let dragging = false, failed = false, lastAttempt = -Infinity, timer = 0, frame = 0, lastScrollY = window.scrollY;
    let pending: ReadingPosition | null = null;
    const overlay = () => !!document.querySelector('dialog[open], .appearance-panel:popover-open');
    const suspended = () => document.visibilityState !== 'visible' || overlay();
    const position = (headingId: string | null): ReadingPosition => ({ version: 1, chapterId: chapter.chapterId, headingId, sourceHash: chapter.sourceHash });
    const flush = () => {
      window.clearTimeout(timer); timer = 0;
      if (!pending || failed || suspended()) { pending = null; return; }
      const current = pending; pending = null; lastAttempt = window.performance.now();
      // A blocked/quota-limited recorder stays disabled until this chapter mounts again.
      failed = !(locale === 'en' ? writeEnglishReadingPosition : writeReadingPosition)(current);
    };
    const stage = (headingId: string | null) => {
      if (failed || suspended()) return;
      pending = position(headingId);
      const remaining = 750 - (window.performance.now() - lastAttempt);
      if (remaining <= 0) flush();
      else if (!timer) timer = window.setTimeout(flush, remaining);
    };
    const disarm = () => { gesture = null; dragging = false; };
    const cancelPending = () => {
      disarm(); pending = null; window.clearTimeout(timer); timer = 0;
      window.cancelAnimationFrame(frame); frame = 0;
    };
    const external = subscribeExternalReadingChange(cancelPending, locale === 'en' ? englishReadingKey : undefined);
    const arm = (event: Event) => {
      if (!event.isTrusted || failed || suspended() || !(event.target instanceof Element)) return;
      if (event.target.closest('input, textarea, select, [contenteditable], button, summary, [role="separator"]')) return;
      if (!article.contains(event.target) && !event.target.closest('.book-rail, .outline-rail, .reading-disclosure-body') &&
        event.target !== document.body && event.target !== document.documentElement) return;
      // Compositor scrolling can precede delivery of the trusted wheel event.
      // Compare against the last observed document scroll, not that already-moved offset.
      gesture = { y: lastScrollY, expires: window.performance.now() + 500 };
    };
    const key = (event: KeyboardEvent) => {
      gesture = null;
      if (!event.altKey && !event.ctrlKey && !event.metaKey && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) arm(event);
    };
    const scroll = () => {
      const intent = gesture;
      const y = window.scrollY;
      lastScrollY = y;
      if (!intent || window.performance.now() > intent.expires || suspended()) { gesture = null; return; }
      if (Math.abs(y - intent.y) < 1) return;
      const bounds = article.getBoundingClientRect();
      if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;
      const header = document.querySelector('.site-header'), tools = document.querySelector('.reading-tools');
      const stickyBottom = Math.max(...[header, tools].map(element => element && window.getComputedStyle(element).position === 'sticky' ? element.getBoundingClientRect().bottom : 0));
      const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const heading = [...chapter.headings].reverse().find(item => {
        const element = document.getElementById(item.id);
        return element && article.contains(element) && element.getBoundingClientRect().top <= (atEnd ? window.innerHeight : stickyBottom + 32);
      });
      stage(heading?.id ?? null);
    };
    const section = (event: MouseEvent) => {
      gesture = null;
      if (!event.isTrusted || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || !(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download') || anchor.target && anchor.target.toLowerCase() !== '_self') return;
      const hash = anchor.hash, href = anchor.href;
      if (!hash || anchor.origin !== window.location.origin || anchor.pathname !== withBasePath(chapter.href, process.env.NEXT_PUBLIC_BASE_PATH) || anchor.search !== window.location.search) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
      if (!target || !article.contains(target)) return;
      const id = target.classList.contains('legacy-heading-target') ? target.getAttribute('aria-labelledby') : target.id;
      if (!chapter.headings.some(item => item.id === id)) return;
      queueMicrotask(() => {
        if (event.defaultPrevented || !anchor.isConnected) return;
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          if (window.location.href === href && document.activeElement === target) stage(id);
        });
      });
    };
    const pointer = (event: PointerEvent) => {
      disarm();
      dragging = event.isTrusted && event.button === 0 && event.clientX >= document.documentElement.clientWidth;
      if (dragging) arm(event);
    };
    const listen = <K extends keyof WindowEventMap>(type: K, listener: (event: WindowEventMap[K]) => void, capture = false) => {
      window.addEventListener(type, listener, { passive: true, capture, signal: controller.signal });
    };
    listen('wheel', arm, true); listen('touchmove', arm, true); listen('keydown', key, true);
    listen('pointerdown', pointer, true); listen('pointermove', event => { if (dragging) arm(event); }, true);
    listen('pointerup', () => { dragging = false; });
    listen('scroll', scroll); listen('click', section);
    for (const type of ['resize', 'focusin', 'hashchange', 'popstate'] as const) listen(type, disarm);
    listen('pagehide', cancelPending);
    document.addEventListener('visibilitychange', cancelPending, { signal: controller.signal });
    listen('beforetoggle', event => { if ((event as ToggleEvent).newState === 'open') cancelPending(); }, true);
    return () => {
      controller.abort(); external(); window.clearTimeout(timer); window.cancelAnimationFrame(frame);
    };
  }, [chapter, locale]);
  return null;
}
