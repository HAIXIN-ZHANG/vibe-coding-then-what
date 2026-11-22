/* global window */
import { routes, pdfPath } from './routes.mjs';
import { classifySource, observeReading, readReadingSession, summarizeReading } from './model.mjs';

const document = window.document;
const allowed = Object.values(routes).filter(route => route.chapterId);
const getStorage = () => window.sessionStorage;
const output = document.getElementById('local-reading-report');
const unknown = { session: null, report: summarizeReading([]) };

function showReport() {
  const session = readReadingSession(getStorage, allowed);
  output.textContent = JSON.stringify(session ? { session, report: summarizeReading([session]) } : unknown, null, 2);
}

if (output) {
  showReport();
  window.addEventListener('pageshow', showReport);
  document.addEventListener('visibilitychange', showReport);
} else {
  let visit = null;
  let frame = 0;
  let intentUntil = 0;
  let unavailable = false;

  function surfaceIsReady(route) {
    if (route.chapterId) {
      const attribute = route.surface === 'body' ? 'data-chapter-id' : 'data-chapter-overview';
      const article = document.querySelector(`main article[${attribute}]`);
      return article?.getAttribute(attribute) === route.chapterId &&
        document.documentElement.lang === (route.locale === 'zh' ? 'zh-CN' : 'en');
    }
    return !!document.querySelector(route.surface === 'home' ? '.home-layout'
      : route.surface === 'contents' ? '.reading-index' : '.companion-overview');
  }

  function endVisible() {
    const end = document.querySelector('.reading-index > a:last-child')?.getBoundingClientRect();
    return !!end && end.top >= 0 && end.bottom <= window.innerHeight;
  }

  function observe(checkScroll = false) {
    if (unavailable || document.visibilityState !== 'visible') return;
    const pathname = window.location.pathname;
    const route = routes[pathname];
    if (!route) { visit = null; return; }
    if (!surfaceIsReady(route)) return;
    if (visit?.pathname !== pathname) {
      visit = { pathname, y: window.scrollY, initiallyVisible: route.surface === 'contents' && endVisible(), reached: false };
      const state = observeReading(getStorage, {
        surface: route.surface,
        initiallyVisible: visit.initiallyVisible,
        source: classifySource(document.referrer, window.location.origin),
        chapterVisit: route.chapterId ? { chapterId: route.chapterId, locale: route.locale } : undefined,
      }, allowed);
      unavailable = state === null;
      return;
    }
    if (route.surface !== 'contents' || !checkScroll || visit.reached || visit.initiallyVisible ||
        window.performance.now() > intentUntil || window.scrollY <= visit.y || !endVisible()) return;
    const state = observeReading(getStorage, { surface: 'contents', reachedByScroll: true }, allowed);
    visit.reached = true;
    unavailable = state === null;
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest?.('a[href]');
    if (!event.isTrusted || !anchor || anchor.origin !== window.location.origin || anchor.pathname !== pdfPath) return;
    const route = routes[window.location.pathname];
    if (route && visit) observeReading(getStorage, { surface: route.surface, pdfClick: true }, allowed);
  }, true);

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(() => {
      frame = 0;
      observe();
    });
  };
  const arm = event => { if (event.isTrusted) intentUntil = window.performance.now() + 2500; };
  const keyboard = event => {
    if (['End', 'PageDown', 'ArrowDown', ' ', 'Tab'].includes(event.key)) arm(event);
  };
  const observer = new window.MutationObserver(schedule);
  observer.observe(document.querySelector('main') ?? document.body, {
    childList: true, subtree: true, attributes: true,
    attributeFilter: ['data-chapter-id', 'data-chapter-overview'],
  });
  window.addEventListener('scroll', () => observe(true), { passive: true });
  window.addEventListener('wheel', arm, { passive: true });
  window.addEventListener('touchmove', arm, { passive: true });
  window.addEventListener('pointerdown', arm, { passive: true });
  window.addEventListener('keydown', keyboard, { passive: true });
  window.addEventListener('popstate', () => observe());
  window.addEventListener('pageshow', event => {
    if (event.persisted) visit = null;
    observe();
  });
  document.addEventListener('visibilitychange', schedule);
  observe();
}
