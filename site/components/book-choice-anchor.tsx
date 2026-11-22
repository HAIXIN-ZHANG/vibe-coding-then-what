'use client';

import { useLayoutEffect } from 'react';

// The preceding compact header may finish sizing after a same-page fragment lands.
export function BookChoiceAnchor() {
  useLayoutEffect(() => {
    if (window.location.hash !== '#books') return;
    const nav = document.getElementById('books');
    if (!nav) return;
    const header = document.querySelector('.site-header');
    const restore = () => {
      if (window.location.hash === '#books' && nav.getBoundingClientRect().top < 0) nav.scrollIntoView({ block: 'start' });
    };
    const observer = new ResizeObserver(restore);
    if (header) observer.observe(header);
    const controller = new AbortController();
    const stop = () => { observer.disconnect(); controller.abort(); };
    for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown', 'hashchange'])
      window.addEventListener(type, stop, { passive: true, signal: controller.signal });
    restore();
    return stop;
  }, []);
  return null;
}
