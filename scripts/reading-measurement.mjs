// This model is served only by the opt-in loopback preview.
const entrySurfaces = new Set(['home', 'contents']);
const surfaces = new Set([...entrySurfaces, 'body', 'other']);
const storageKey = 'vctw.local-verification.v2';
const flags = ['bodyOpened', 'contentsEndReached', 'contentsEndInitiallyVisible'];
const sourceKinds = new Set(['unknown', 'same-origin', 'other-origin']);

function parseSession(raw, allowedKeys) {
  if (raw === null) return undefined;
  const value = JSON.parse(raw);
  if (!value || !surfaces.has(value.entry) || !sourceKinds.has(value.source) || Object.keys(value).length !== flags.length + 5 ||
      flags.some(flag => typeof value[flag] !== 'boolean') || !Number.isSafeInteger(value.pdfLinkClicks) || value.pdfLinkClicks < 0 || !value.overviewPageViews || Array.isArray(value.overviewPageViews) ||
      typeof value.overviewPageViews !== 'object' || !value.chapterPageViews ||
      typeof value.chapterPageViews !== 'object' || Array.isArray(value.chapterPageViews) ||
      [...Object.entries(value.chapterPageViews), ...Object.entries(value.overviewPageViews)].some(([key, count]) => !allowedKeys.has(key) ||
        !Number.isSafeInteger(count) || count < 1)) throw new Error('Invalid synthetic session');
  return value;
}

const chapterKey = ({ chapterId, locale }) => `${chapterId}:${locale}`;

export function classifySource(referrer, origin) {
  if (!referrer) return 'unknown';
  try {
    const source = new URL(referrer);
    if (!['http:', 'https:'].includes(source.protocol)) return 'unknown';
    return source.origin === origin ? 'same-origin' : 'other-origin';
  } catch { return 'unknown'; }
}

export function readReadingSession(getStorage, allowlistedChapters) {
  try {
    return parseSession(getStorage().getItem(storageKey), new Set(allowlistedChapters.map(chapterKey))) ?? null;
  } catch { return null; }
}

export function observeReading(getStorage, observation, allowlistedChapters = []) {
  if (!surfaces.has(observation.surface)) return null;
  try {
    const storage = getStorage();
    const active = allowlistedChapters.find(chapter => chapter.chapterId === observation.chapterVisit?.chapterId &&
      chapter.locale === observation.chapterVisit?.locale && chapter.surface === observation.surface);
    const state = parseSession(storage.getItem(storageKey), new Set(allowlistedChapters.map(chapterKey))) ?? {
      entry: observation.surface,
      source: sourceKinds.has(observation.source) ? observation.source : 'unknown',
      bodyOpened: false,
      contentsEndReached: false,
      contentsEndInitiallyVisible: false,
      chapterPageViews: {}, overviewPageViews: {}, pdfLinkClicks: 0,
    };
    state.bodyOpened ||= observation.surface === 'body';
    if (observation.surface === 'contents') {
      state.contentsEndInitiallyVisible ||= observation.initiallyVisible === true;
      state.contentsEndReached ||= observation.reachedByScroll === true && observation.initiallyVisible !== true;
    }
    if (active) {
      const key = chapterKey(active);
      const views = active.surface === 'body' ? state.chapterPageViews : state.overviewPageViews;
      const count = (views[key] ?? 0) + 1;
      if (!Number.isSafeInteger(count)) return null;
      views[key] = count;
    }
    if (observation.pdfClick && Number.isSafeInteger(state.pdfLinkClicks + 1)) state.pdfLinkClicks++;
    const raw = JSON.stringify(state);
    storage.setItem(storageKey, raw);
    return storage.getItem(storageKey) === raw ? state : null;
  } catch {
    return null;
  }
}

export function summarizeReading(sessions) {
  const observed = sessions.filter(Boolean);
  const cohort = observed.filter(session => entrySurfaces.has(session.entry));
  const opened = cohort.filter(session => session.bodyOpened).length;
  const chapterBodyPageViews = {};
  const chapterOverviewPageViews = {};
  const entrySources = { unknown: 0, 'same-origin': 0, 'other-origin': 0 };
  for (const session of observed) {
    for (const [key, count] of Object.entries(session.chapterPageViews)) chapterBodyPageViews[key] = (chapterBodyPageViews[key] ?? 0) + count;
    for (const [key, count] of Object.entries(session.overviewPageViews)) chapterOverviewPageViews[key] = (chapterOverviewPageViews[key] ?? 0) + count;
  }
  for (const session of observed) entrySources[session.source]++;
  return {
    measurableSessions: observed.length,
    bodyOpenSessions: observed.filter(session => session.bodyOpened).length,
    entrySessions: cohort.length,
    entrySessionsOpeningBody: opened,
    entryToBodyRate: cohort.length ? opened / cohort.length : null,
    contentsEndReachedSessions: observed.filter(session => session.contentsEndReached).length,
    contentsEndInitiallyVisibleSessions: observed.filter(session => session.contentsEndInitiallyVisible).length,
    pdfLinkClicks: observed.reduce((sum, session) => sum + session.pdfLinkClicks, 0),
    chapterBodyPageViews,
    chapterOverviewPageViews,
    entrySources,
  };
}
