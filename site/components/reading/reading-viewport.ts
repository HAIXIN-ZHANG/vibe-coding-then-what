// Retain a live passage through width changes. The reader's URL and Continue record
// still identify sections and are independent of this same-document adjustment.
type Passage = {
  article: HTMLElement;
  element: HTMLElement;
  fraction: number;
  offset: number;
  path: string;
};

export function preserveReadingViewport(layout: HTMLElement): () => void {
  let width = window.innerWidth;
  let captureFrame = 0;
  let restoreFrame = 0;
  let passage: Passage | null = null;
  const chrome = [document.querySelector('.site-header'), layout.querySelector('.reading-tools')];
  const readableTop = () => chrome.reduce((edge, element) =>
    element && getComputedStyle(element).position === 'sticky'
      ? Math.max(edge, element.getBoundingClientRect().bottom)
      : edge, 0);
  const currentPath = () => window.location.pathname + window.location.hash;

  function capture() {
    captureFrame = 0;
    if (window.innerWidth !== width || restoreFrame) return;
    const article = layout.querySelector<HTMLElement>('.chapter-prose');
    passage = null;
    if (!article || window.scrollY < 1) return;
    const top = readableTop();
    const height = window.innerHeight - top;
    const readingLine = top + height * .43;
    const blocks = [...article.children].filter((node): node is HTMLElement =>
      node instanceof HTMLElement && node.matches('h1,h2,h3,h4,h5,h6,p,ul,ol,blockquote,pre,figure,.legacy-heading-target'));
    let nearest: { element: HTMLElement; rect: DOMRect; distance: number } | undefined;
    for (const element of blocks) {
      const target = element.querySelector('pre') ?? element;
      const rect = target.getBoundingClientRect();
      if (rect.height === 0 || rect.bottom <= top || rect.top >= window.innerHeight) continue;
      const distance = Math.max(rect.top - readingLine, readingLine - rect.bottom, 0);
      if (!nearest || distance < nearest.distance) nearest = { element: target, rect, distance };
    }
    if (!nearest) return;
    const { element, rect } = nearest;
    // Keep a visible block's top. For a passage extending above the tools, retain
    // the relative point within the block currently crossing the reading line.
    const point = rect.top >= top ? rect.top : Math.min(readingLine, rect.bottom - 1);
    passage = { article, element, fraction: (point - rect.top) / rect.height, offset: point - top, path: currentPath() };
  }

  function scheduleCapture() {
    if (!captureFrame && !restoreFrame && window.innerWidth === width) captureFrame = window.requestAnimationFrame(capture);
  }

  function resize() {
    const next = window.innerWidth;
    if (next === width) return;
    width = next;
    window.cancelAnimationFrame(captureFrame);
    captureFrame = 0;
    window.cancelAnimationFrame(restoreFrame);
    const retained = passage;
    if (!retained) { restoreFrame = 0; scheduleCapture(); return; }
    // Wait for the reader's breakpoint classes, sticky chrome and browser scroll
    // restoration before aligning the same live block within the new viewport.
    restoreFrame = window.requestAnimationFrame(() => {
      restoreFrame = window.requestAnimationFrame(() => {
        restoreFrame = 0;
        if (window.innerWidth !== width || currentPath() !== retained.path || !layout.contains(retained.article) ||
            !retained.article.contains(retained.element)) { scheduleCapture(); return; }
        const rect = retained.element.getBoundingClientRect();
        const top = readableTop();
        const offset = Math.min(retained.offset, Math.max(0, window.innerHeight - top - 32));
        const delta = rect.top + retained.fraction * rect.height - (top + offset);
        if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'instant' });
        scheduleCapture();
      });
    });
  }

  const takeControl = () => {
    if (!restoreFrame) return;
    window.cancelAnimationFrame(restoreFrame);
    restoreFrame = 0;
    scheduleCapture();
  };
  const intents = ['pointerdown', 'wheel', 'touchstart', 'keydown'] as const;
  for (const type of intents) window.addEventListener(type, takeControl, { capture: true, passive: true });
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', scheduleCapture, { passive: true });
  window.addEventListener('hashchange', scheduleCapture);
  scheduleCapture();
  return () => {
    window.cancelAnimationFrame(captureFrame);
    window.cancelAnimationFrame(restoreFrame);
    window.removeEventListener('resize', resize);
    window.removeEventListener('scroll', scheduleCapture);
    window.removeEventListener('hashchange', scheduleCapture);
    for (const type of intents) window.removeEventListener(type, takeControl, true);
  };
}
