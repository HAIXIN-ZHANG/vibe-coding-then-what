'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// CSS selects the initial header layout; the compact disclosure opens natively.
export function ChapterHeaderMenu({ label, responsive, children }: { label: string; responsive: boolean; children: ReactNode }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const links = useRef<HTMLDivElement>(null);
  const summary = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = menu.current;
    if (!element || !responsive) return;
    // A native disclosure can already own focus while scripts are still loading.
    // CSS may hide and blur it before resize, so retain that initial owner too.
    let lastFocus: Element | null = document.activeElement;
    const trackFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target !== document.body) lastFocus = event.target;
    };
    function reconcile() {
      if (!element) return;
      const compact = window.innerWidth < 900 && !!document.querySelector('.chapter-layout, .home-layout, .english-reading, .chapter-overview');
      if (element.hasAttribute('data-compact') && (element.dataset.compact === 'true') === compact) return;
      const active = document.activeElement === document.body ? lastFocus : document.activeElement;
      element.dataset.compact = String(compact);
      if (compact && links.current?.contains(active)) summary.current?.focus({ preventScroll: true });
      if (!compact) {
        if (element.contains(active)) links.current?.querySelector('a')?.focus({ preventScroll: true });
        element.open = false;
      }
    }
    function outside(event: PointerEvent) {
      if (!(event.target instanceof Element) || element?.contains(event.target) || links.current?.contains(event.target)) return;
      lastFocus = null;
      if (element?.dataset.compact !== 'true' || !element.open) return;
      const needsReturn = element.contains(document.activeElement) && !event.target.closest('a, button, input, summary, [tabindex]');
      element.open = false;
      if (needsReturn) summary.current?.focus({ preventScroll: true });
    }
    function overlay(event: Event) {
      if ((event as ToggleEvent).newState === 'open' && event.target instanceof Element && element?.dataset.compact === 'true' && !element.contains(event.target)) element.open = false;
    }
    reconcile(); window.addEventListener('resize', reconcile); document.addEventListener('pointerdown', outside, true);
    document.addEventListener('focusin', trackFocus, true);
    document.addEventListener('beforetoggle', overlay, true);
    return () => {
      window.removeEventListener('resize', reconcile);
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('focusin', trackFocus, true);
      document.removeEventListener('beforetoggle', overlay, true);
    };
  }, [pathname, responsive]);
  function close() {
    if (menu.current?.dataset.compact !== 'true') return;
    menu.current.open = false; summary.current?.focus({ preventScroll: true });
  }
  return <><div ref={links} className="chapter-header-links">{children}</div>
    {responsive ? <details ref={menu} className="chapter-header-menu" onBlur={event => {
      const element = event.currentTarget;
      if (element.dataset.compact === 'true' && event.relatedTarget instanceof Node && !element.contains(event.relatedTarget)) element.open = false;
    }} onKeyDown={event => {
    if (event.key === 'Escape' && menu.current?.open && menu.current.dataset.compact === 'true') { event.preventDefault(); event.stopPropagation(); close(); }
  }} onToggle={event => {
    if (!event.currentTarget.open || event.currentTarget.dataset.compact !== 'true') return;
    for (const details of document.querySelectorAll<HTMLDetailsElement>('.reading-tools details[open]')) details.open = false;
    for (const popover of document.querySelectorAll<HTMLElement>('.appearance-panel:popover-open')) popover.hidePopover();
  }} onClick={event => { if (event.target instanceof Element && event.target.closest('a')) close(); }}>
    <summary ref={summary} aria-label={label}><span aria-hidden="true">☰</span></summary>
    <div className="chapter-header-disclosure-links">{children}</div>
  </details> : null}</>;
}
