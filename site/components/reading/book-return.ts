const bookReturnKey = 'vctwBookReturn';

export function rememberBookReturn() {
  if (!document.querySelector('article.chapter-prose')) return;
  try {
    window.history.replaceState({
      ...window.history.state,
      [bookReturnKey]: { href: window.location.href, top: window.scrollY },
    }, '');
  } catch { /* The book link stays usable when history updates are unavailable. */ }
}

export function takeBookReturn(): number | undefined {
  const state = window.history.state;
  const position = state?.[bookReturnKey];
  if (position?.href !== window.location.href || !Number.isFinite(position.top) || position.top < 0) return;
  const next = { ...state };
  delete next[bookReturnKey];
  try { window.history.replaceState(next, ''); } catch { /* Keep native history usable. */ }
  return position.top;
}
