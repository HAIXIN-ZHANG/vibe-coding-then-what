'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Home and reader views share the compact header; indexes and no-JS pages retain inline links.
export function ChapterHeaderMenu({ label, children }: { label: string; children: ReactNode }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = menu.current;
    if (!element) return;
    function reconcile() {
      if (!element) return;
      const compact = window.innerWidth < 900 && !!document.querySelector('.chapter-layout, .home-layout, .english-reading, .chapter-overview');
      if ((element.dataset.compact === 'true') === compact) return;
      const active = document.activeElement;
      element.dataset.compact = String(compact); element.open = !compact;
      if (compact && element.contains(active)) summary.current?.focus({ preventScroll: true });
      else if (!compact && active === summary.current) element.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    }
    function outside(event: PointerEvent) {
      if (element?.dataset.compact !== 'true' || !element.open || !(event.target instanceof Element) || element.contains(event.target)) return;
      const needsReturn = element.contains(document.activeElement) && !event.target.closest('a, button, input, summary, [tabindex]');
      element.open = false;
      if (needsReturn) summary.current?.focus({ preventScroll: true });
    }
    function overlay(event: Event) {
      if ((event as ToggleEvent).newState === 'open' && event.target instanceof Element && element?.dataset.compact === 'true' && !element.contains(event.target)) element.open = false;
    }
    reconcile(); window.addEventListener('resize', reconcile); document.addEventListener('pointerdown', outside, true);
    document.addEventListener('beforetoggle', overlay, true);
    return () => { window.removeEventListener('resize', reconcile); document.removeEventListener('pointerdown', outside, true); document.removeEventListener('beforetoggle', overlay, true); };
  }, [pathname]);
  function close() {
    if (menu.current?.dataset.compact !== 'true') return;
    menu.current.open = false; summary.current?.focus({ preventScroll: true });
  }
  return <details ref={menu} open className="chapter-header-menu" onKeyDown={event => {
    if (event.key === 'Escape' && menu.current?.open && menu.current.dataset.compact === 'true') { event.preventDefault(); event.stopPropagation(); close(); }
  }} onToggle={event => {
    if (!event.currentTarget.open || event.currentTarget.dataset.compact !== 'true') return;
    for (const details of document.querySelectorAll<HTMLDetailsElement>('.reading-tools details[open]')) details.open = false;
    for (const popover of document.querySelectorAll<HTMLElement>('.appearance-panel:popover-open')) popover.hidePopover();
  }} onClick={event => { if (event.target instanceof Element && event.target.closest('a')) close(); }}>
    <summary ref={summary} aria-label={label}><span aria-hidden="true">☰</span></summary>
    <div className="chapter-header-links">{children}</div>
  </details>;
}
