'use client';

import { getMessages } from '../../config/i18n.ts';
import { BooksLink } from '../books-link.tsx';
import { takeBookReturn } from './book-return.ts';

import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { IconButton } from '../ui/icon-button.tsx';
import { Button } from '../ui/button.tsx';
import { ReadingTools } from './reading-tools.tsx';
import { ReadingDisclosure } from './reading-disclosure.tsx';
import { preserveReadingViewport } from './reading-viewport.ts';
import { SidebarIcon } from './sidebar-icon.tsx';
import { effectiveSidebarWidth, readSidebarPreference, sidebarBreakpoint, sidebarDefault,
  sidebarMin, sidebarStorageKey, sidebarWidthLimit } from './sidebar-preference.ts';
import type { SidebarMode, SidebarPreference } from './sidebar-preference.ts';

const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const viewportSnapshot = () => window.innerWidth;
const serverViewport = () => 1440;
function subscribeViewport(listener: () => void) {
  window.addEventListener('resize', listener);
  return () => window.removeEventListener('resize', listener);
}
function initialPreference(): SidebarPreference {
  try { return readSidebarPreference(window.localStorage.getItem(sidebarStorageKey)); } catch { return sidebarDefault; }
}

export function ReaderLayout({ navigation, outline, bookInfo, children }: { navigation: ReactNode; outline: ReactNode; bookInfo: ReactNode; children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const grip = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<Element | null>(null);
  const [preference, setPreference] = useState(initialPreference);
  const preferenceRef = useRef(preference);
  const drag = useRef<{ pointer: number; x: number; width: number; original: SidebarPreference } | null>(null);
  const viewport = useSyncExternalStore(subscribeViewport, viewportSnapshot, serverViewport);
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const applied = ready ? preference : sidebarDefault;
  const [resizing, setResizing] = useState(false);
  const width = effectiveSidebarWidth(applied.width, viewport);
  const limit = sidebarWidthLimit(viewport);

  function apply(next: SidebarPreference, persist = true) {
    preferenceRef.current = next; setPreference(next);
    if (persist) try { window.localStorage.setItem(sidebarStorageKey, JSON.stringify(next)); } catch { /* Keep the session choice. */ }
  }
  function cancelDrag() {
    const current = drag.current;
    if (!current) return;
    drag.current = null; setResizing(false);
    preferenceRef.current = current.original; setPreference(current.original);
    if (grip.current?.hasPointerCapture(current.pointer)) grip.current.releasePointerCapture(current.pointer);
  }
  useLayoutEffect(() => {
    let narrowFrame = 0;
    const updateViewport = () => {
      const current = drag.current;
      if (current) {
        drag.current = null; setResizing(false);
        preferenceRef.current = current.original; setPreference(current.original);
        if (grip.current?.hasPointerCapture(current.pointer)) grip.current.releasePointerCapture(current.pointer);
      }
      // CSS may hide/blur a descendant before the browser dispatches resize.
      const active = document.activeElement === document.body && lastFocused.current?.isConnected ? lastFocused.current : document.activeElement;
      if (window.innerWidth < sidebarBreakpoint && active?.closest('.book-rail, .desktop-reopen')) {
        const summary = root.current?.querySelector<HTMLElement>('.mobile-book-navigation summary');
        summary?.focus({ preventScroll: true });
        const hash = window.location.hash;
        window.cancelAnimationFrame(narrowFrame);
        if (summary && hash) narrowFrame = window.requestAnimationFrame(() => {
          if (window.innerWidth >= sidebarBreakpoint || document.activeElement !== summary || window.location.hash !== hash) return;
          let heading: HTMLElement | null;
          try { heading = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
          const tools = root.current?.querySelector('.reading-tools');
          if (!tools || !heading?.matches('.chapter-prose :is(h1,h2,h3,h4)')) return;
          const { top, bottom } = heading.getBoundingClientRect();
          const readableTop = tools.getBoundingClientRect().bottom;
          if (top < readableTop && bottom > readableTop) {
            window.scrollBy({ top: Math.floor(top - readableTop) - 2, behavior: 'instant' });
          }
        });
      } else if (window.innerWidth >= sidebarBreakpoint && active?.closest('.mobile-book-navigation') ||
        window.innerWidth >= 1200 && active?.closest('.mobile-outline')) {
        document.getElementById('main')?.focus({ preventScroll: true });
      }
    };
    const recordFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target !== document.body) lastFocused.current = event.target;
    };
    const recordPointerIntent = (event: PointerEvent) => {
      if (event.target instanceof Node && !lastFocused.current?.contains(event.target)) lastFocused.current = null;
    };
    document.addEventListener('focusin', recordFocus, true);
    document.addEventListener('pointerdown', recordPointerIntent, true);
    window.addEventListener('resize', updateViewport);
    const header = document.querySelector<HTMLElement>('.site-header');
    const measureHeader = () => root.current?.style.setProperty('--reader-header-height', `${header?.getBoundingClientRect().height ?? 68}px`);
    const observer = new ResizeObserver(measureHeader);
    if (header) observer.observe(header);
    measureHeader();
    return () => { window.cancelAnimationFrame(narrowFrame); window.removeEventListener('resize', updateViewport); document.removeEventListener('focusin', recordFocus, true); document.removeEventListener('pointerdown', recordPointerIntent, true); observer.disconnect(); };
  }, []);
  useLayoutEffect(() => {
    const layout = root.current;
    if (!ready || !layout) return;
    const releaseViewport = preserveReadingViewport(layout);
    const header = document.querySelector<HTMLElement>('.site-header');
    const tools = layout.querySelector<HTMLElement>('.reading-tools');
    const returnTop = takeBookReturn();
    let pendingHash = returnTop === undefined ? window.location.hash : '';
    let frame = 0;
    let returnFrame = 0;
    const correctFragment = () => {
      frame = 0;
      if (!pendingHash || pendingHash !== window.location.hash) return;
      let target: HTMLElement | null = null;
      try { target = document.getElementById(decodeURIComponent(pendingHash.slice(1))); }
      catch { /* A malformed fragment has no target. */ }
      if (!target) {
        if (pendingHash.toLowerCase() === '#top' || /^#passage-[a-f0-9]{24}(?:-\d+)?$/.test(pendingHash)) return;
        pendingHash = '';
        const chapterStart = new URL(window.location.href);
        chapterStart.hash = '';
        window.history.replaceState(window.history.state, '', chapterStart);
        layout.querySelector<HTMLElement>('.chapter-prose h1')?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      if (!layout.contains(target) || document.activeElement !== target) return;
      // Native fragment navigation can precede the measurement of the sticky tools.
      layout.style.setProperty('--reader-header-height', `${header?.getBoundingClientRect().height ?? 68}px`);
      tools?.parentElement?.style.setProperty('--reading-tools-height', `${tools.getBoundingClientRect().height}px`);
      const clearance = Number.parseFloat(getComputedStyle(target).scrollMarginTop);
      if (Math.abs(target.getBoundingClientRect().top - clearance) > 1) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    const schedule = () => { if (!frame && pendingHash) frame = window.requestAnimationFrame(correctFragment); };
    const navigate = () => { if (!returnFrame) { pendingHash = window.location.hash; schedule(); } };
    const repeatFragment = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]');
      if (!(link instanceof HTMLAnchorElement) || !layout.contains(link) || link.hasAttribute('download') || link.target && link.target.toLowerCase() !== '_self') return;
      const href = link.href, hash = link.hash;
      if (!hash || href !== window.location.href) return;
      try {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (!target || !layout.contains(target)) return;
      } catch { return; }
      // Repeating a native fragment does not emit hashchange. Re-arm after all click handlers,
      // without replacing the browser's focus/scroll or overriding a canceled navigation.
      queueMicrotask(() => {
        if (event.defaultPrevented || !link.isConnected || href !== window.location.href) return;
        pendingHash = hash; schedule();
      });
    };
    // A fragment owns its landing only until the reader deliberately scrolls or interacts again.
    const relinquish = () => { pendingHash = ''; window.cancelAnimationFrame(returnFrame); returnFrame = 0; };
    const observer = new ResizeObserver(schedule);
    for (const element of [header, tools, layout.querySelector('.reader-body')]) if (element) observer.observe(element);
    window.addEventListener('hashchange', navigate);
    window.addEventListener('click', repeatFragment);
    const intents = ['pointerdown', 'wheel', 'touchstart', 'keydown'] as const;
    for (const type of intents) window.addEventListener(type, relinquish, { capture: true, passive: true });
    if (returnTop === undefined) schedule();
    else returnFrame = window.requestAnimationFrame(() => {
      returnFrame = 0;
      window.scrollTo({ top: returnTop, behavior: 'instant' });
      const bookLink = window.innerWidth < sidebarBreakpoint ? layout.querySelector<HTMLElement>('.mobile-books .books-link') : document.querySelector<HTMLElement>('.site-header .books-link');
      bookLink?.focus({ preventScroll: true });
    });
    return () => {
      releaseViewport();
      window.cancelAnimationFrame(frame); window.cancelAnimationFrame(returnFrame); observer.disconnect(); window.removeEventListener('hashchange', navigate);
      window.removeEventListener('click', repeatFragment);
      for (const type of intents) window.removeEventListener(type, relinquish, true);
    };
  }, [ready]);

  function mode(next: SidebarMode) {
    cancelDrag(); apply({ ...preferenceRef.current, mode: next });
    window.requestAnimationFrame(() => root.current?.querySelector<HTMLElement>(
      next === 'expanded' ? '[data-collapse-sidebar]' : next === 'collapsed' ? '[data-expand-sidebar]' : '[data-reopen-sidebar]',
    )?.focus({ preventScroll: true }));
  }
  function resetWidth() {
    cancelDrag();
    apply({ ...preferenceRef.current, width: sidebarDefault.width });
    // The conditional reset disappears; keep keyboard focus on the stable resizing control.
    grip.current?.focus({ preventScroll: true });
  }
  const style = { '--reader-rail-width': applied.mode === 'hidden' ? '0px' : applied.mode === 'collapsed' ? '64px' : `${width}px` } as CSSProperties;
  return <div ref={root} className="chapter-layout" data-sidebar={applied.mode} data-enhanced={ready} data-resizing={resizing} style={style}>
    <aside className="book-rail" aria-label="章节栏">
      <div className="expanded-book-rail">
        <div className="sidebar-controls reader-js-controls">
          <span>本书</span>
          <IconButton visual="toolbar" label="收起章节栏" title="收起章节栏" data-collapse-sidebar onClick={() => mode('collapsed')}><SidebarIcon kind="collapse" /></IconButton>
          <IconButton visual="toolbar" label="隐藏章节栏" title="隐藏章节栏" onClick={() => mode('hidden')}><SidebarIcon kind="hide" /></IconButton>
        </div>
        <div className="sidebar-content" id="reader-book-navigation">{navigation}</div>
        {ready && preference.width !== sidebarDefault.width ? <div className="sidebar-width-controls reader-js-controls">
          <Button visual="toolbar" onClick={resetWidth}>重置宽度</Button>
        </div> : null}
        {bookInfo}
        <div ref={grip} role="separator" tabIndex={ready ? 0 : -1} aria-label="调整章节栏宽度" aria-orientation="vertical"
          aria-controls="reader-book-navigation" aria-valuemin={sidebarMin} aria-valuemax={limit} aria-valuenow={width}
          aria-describedby="sidebar-resize-help" className="sidebar-resize reader-js-controls"
          onKeyDown={event => {
            const next = event.key === 'ArrowLeft' ? width - 8 : event.key === 'ArrowRight' ? width + 8 :
              event.key === 'Home' ? sidebarMin : event.key === 'End' ? limit : event.key === 'Enter' ? sidebarDefault.width : null;
            if (next !== null) { event.preventDefault(); apply({ ...preferenceRef.current, width: Math.max(sidebarMin, Math.min(next, limit)) }); }
          }}
          onPointerDown={event => {
            if (event.button !== 0 || !event.isPrimary) return;
            event.preventDefault(); event.currentTarget.focus({ preventScroll: true });
            drag.current = { pointer: event.pointerId, x: event.clientX, width, original: preferenceRef.current };
            event.currentTarget.setPointerCapture(event.pointerId); setResizing(true);
          }} onPointerMove={event => {
            const current = drag.current;
            if (!current || current.pointer !== event.pointerId) return;
            apply({ ...preferenceRef.current, width: Math.max(sidebarMin, Math.min(Math.round(current.width + event.clientX - current.x), limit)) }, false);
          }} onPointerUp={event => {
            if (drag.current?.pointer !== event.pointerId) return;
            drag.current = null; setResizing(false); apply(preferenceRef.current);
            event.currentTarget.releasePointerCapture(event.pointerId);
          }} onPointerCancel={cancelDrag} onLostPointerCapture={cancelDrag} />
        <p className="visually-hidden" id="sidebar-resize-help">左右方向键每次调整8像素，Home和End跳到边界，Enter或重置宽度恢复248像素。</p>
      </div>
      <div className="collapsed-book-rail reader-js-controls">
        <IconButton visual="toolbar" label="展开章节栏" title="展开章节栏" data-expand-sidebar onClick={() => mode('expanded')}><SidebarIcon kind="expand" /></IconButton>
        <IconButton visual="toolbar" label="隐藏章节栏" title="隐藏章节栏" onClick={() => mode('hidden')}><SidebarIcon kind="hide" /></IconButton>
      </div>
    </aside>
    <div className="reader-body">
      <div className="chapter-column">
        <ReadingTools>
          <div className="mobile-books"><BooksLink locale="zh" /></div>
          <div className="desktop-reopen reader-js-controls"><IconButton visual="toolbar" label="显示章节栏" title="显示章节栏" data-reopen-sidebar onClick={() => mode('expanded')}><SidebarIcon kind="reopen" /></IconButton></div>
          <div className="mobile-book-navigation"><ReadingDisclosure label="章节导航" compactLabel="章节">{navigation}{bookInfo}</ReadingDisclosure></div>
          <div className="mobile-outline"><ReadingDisclosure label="本章目录">{outline}</ReadingDisclosure></div>
        </ReadingTools>
        <p className="chapter-context">{getMessages('zh').chineseEdition}</p>
        {children}
      </div>
      <aside className="outline-rail">{outline}</aside>
    </div>
  </div>;
}
