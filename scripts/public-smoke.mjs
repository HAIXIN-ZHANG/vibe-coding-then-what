import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pagesBasePath, createReleaseMetadata, verifyReleaseMetadata } from './release-metadata.mjs';
import { readSearchIndex } from '../site/content/search.ts';
import { alternateLocalePath, bookSelectionPath, getMessages, localePath } from '../site/config/i18n.ts';
import { englishEditions } from '../site/content/english-edition.ts';
import { bookCatalog } from '../site/config/books.ts';
import { site } from '../site/config/site.ts';

const companions = Object.entries(bookCatalog.life.editions).map(([locale, book]) => ({ locale, title: book.title, route: book.home }));

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/\s([\w-]+)(?:="([^"]*)")?/g)]
    .map(([, name, value]) => [name, value ?? '']));
}

function isAvailable(attrs) {
  return !Object.hasOwn(attrs, 'hidden') && attrs['aria-hidden'] !== 'true' && attrs['aria-disabled'] !== 'true';
}

function linksIn(fragment) {
  return [...fragment.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .map(([, tag, text]) => ({ attrs: attributes(tag), text: text.trim() }));
}

function navigationWithClass(html, className) {
  return [...html.matchAll(/<nav\b([^>]*)>([\s\S]*?)<\/nav>/g)]
    .map(([, tag, body]) => ({ attrs: attributes(tag), body }))
    .find(({ attrs }) => attrs.class?.split(/\s+/).includes(className));
}

function verifyCompanion(html, landing, { locale, route, title }) {
  const article = html.match(/<article class="companion-overview">([\s\S]*?)<\/article>/)?.[1];
  assert.ok(html.includes(`<title>${title}</title>`) && article?.includes(`<h1>${title}</h1>`), `${route}: wrong companion title or content`);

  const volumes = navigationWithClass(article, 'volume-switch');
  assert.ok(volumes && isAvailable(volumes.attrs), `${route}: missing volume switch`);
  const current = linksIn(volumes.body).filter(({ attrs }) => attrs['aria-current'] === 'page' && isAvailable(attrs));
  assert.deepEqual(current.map(({ attrs }) => attrs.href), [pagesBasePath + route], `${route}: incorrect current volume`);

  const header = html.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1] ?? '';
  const choicesPath = pagesBasePath + bookSelectionPath(locale);
  assert.ok(linksIn(header).some(({ attrs, text }) => attrs.class?.split(/\s+/).includes('books-link') &&
    attrs.href === choicesPath && isAvailable(attrs) && text === getMessages(locale).books),
  `${route}: missing usable same-edition Books link to ${choicesPath}`);

  const choices = navigationWithClass(landing, 'book-choices');
  assert.ok(choices?.attrs.id === 'books' && isAvailable(choices.attrs), `${choicesPath}: missing usable book selection anchor`);
  const destinations = linksIn(choices.body).filter(({ attrs }) => isAvailable(attrs)).map(({ attrs }) => attrs.href);
  assert.deepEqual(destinations, [pagesBasePath + localePath(locale), pagesBasePath + route],
    `${choicesPath}: incorrect book selection destinations`);
}

export function validatePublicTarget(value = `http://127.0.0.1:4179${pagesBasePath}/`) {
  const url = new URL(value);
  const publicOrigin = url.origin === site.publicOrigin;
  const loopback = url.protocol === 'http:' && url.hostname === '127.0.0.1';
  assert.ok(publicOrigin || loopback, 'Smoke target must be the official Pages origin or explicit IPv4 loopback');
  assert.ok(!url.username && !url.password && !url.search && !url.hash, 'Smoke target must not contain credentials/query/fragment');
  assert.equal(url.pathname, `${pagesBasePath}/`, 'Smoke target must use the exact Pages prefix');
  return url;
}

export async function smokePublicRelease({ url, commit } = {}) {
  const target = validatePublicTarget(url);
  const expected = createReleaseMetadata(commit, pagesBasePath);
  const deadline = globalThis.AbortSignal.timeout(90_000);
  const requestBudget = 10 + expected.chapters.length + expected.english.length + 60;
  let requests = 0;
  async function get(route, status = 200, type = /text\/html/) {
    const destination = new URL(`${pagesBasePath}${route}`, target.origin);
    destination.searchParams.set('release-check', commit);
    assert.ok(++requests <= requestBudget, 'Public smoke request budget exceeded');
    const response = await globalThis.fetch(destination, {
      redirect: 'error', cache: 'no-store', signal: globalThis.AbortSignal.any([deadline, globalThis.AbortSignal.timeout(10_000)]),
    });
    assert.equal(response.status, status, `${route}: unexpected HTTP status`);
    assert.match(response.headers.get('content-type') || '', type, `${route}: unexpected content type`);
    const text = await response.text();
    assert.ok(text.length > 0 && text.length < 5_000_000, `${route}: unexpected response size`);
    return text;
  }
  verifyReleaseMetadata(JSON.parse(await get('/release.json', 200, /application\/json/)), commit);
  const assets = new Set();
  const overviews = new Map(expected.chapters.filter(entry => englishEditions[entry.id]).map(chapter => [alternateLocalePath(chapter.route, 'zh'), chapter]));
  const routes = ['/', '/read/', '/zh/', '/zh/read/', ...expected.chapters.map(chapter => chapter.route),
    ...overviews.keys(), ...companions.map(book => book.route)];
  const landings = new Map();
  for (const route of routes) {
    const html = await get(route);
    const document = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<!--[\s\S]*?-->/g, '');
    const overview = overviews.get(route);
    const companion = companions.find(book => book.route === route);
    const locale = route.startsWith('/zh/') ? 'zh' : 'en';
    const root = document.match(/<html\b[^>]*>/)?.[0] ?? '';
    assert.equal(attributes(root).lang, getMessages(locale).lang, `${route}: wrong document language`);
    if (route === '/' || route === '/zh/') landings.set(locale, document);
    if (companion) verifyCompanion(document, landings.get(locale), companion);
    if (route === '/read/') {
      assert.ok(html.includes(getMessages('en').englishUnavailable), 'English translation status must be explicit');
      const links = [...html.matchAll(/href="([^"#]+)"/g)].map(([, link]) => link);
      for (const overviewRoute of overviews.keys()) assert.ok(links.includes(pagesBasePath + overviewRoute), `Missing English overview: ${overviewRoute}`);
      assert.ok(links.filter(link => link.startsWith(`${pagesBasePath}/read/`) && link !== `${pagesBasePath}/read/`)
        .every(link => overviews.has(link.slice(pagesBasePath.length))), 'Unexpected English chapter route');
    }
    const adaptation = overview && englishEditions[overview.id];
    if (adaptation?.source) {
      assert.ok(document.includes(`data-chapter-id="${overview.id}"`) && document.includes(`data-source-sha256="${adaptation.sha256}"`), `${route}: missing reviewed English body`);
      assert.ok(document.includes(`href="${pagesBasePath}${overview.route}"`), `${route}: missing Chinese original`);
    } else if (overview) {
      assert.ok(html.includes(`data-chapter-overview="${overview.id}"`) && html.includes(getMessages('en').chapterAvailability),
        `${route}: missing English overview or translation status`);
      assert.ok(html.includes(`href="${pagesBasePath}${overview.route}"`) && !html.includes('data-source-sha256'),
        `${route}: incorrect original link or unexpected manuscript`);
    }
    const chapter = expected.chapters.find(item => item.route === route);
    if (chapter) assert.ok(html.includes(`data-source-sha256="${chapter.sha256}"`), `${route}: wrong reviewed source hash`);
    for (const match of html.matchAll(/<(script|link)\b[^>]*>/g)) {
      const tag = match[0];
      if (match[1] === 'link' && !/rel="(?:stylesheet|preload|modulepreload|icon)"/.test(tag)) continue;
      const reference = /(?:src|href)="([^"]+)"/.exec(tag)?.[1]?.replaceAll('&amp;', '&');
      if (!reference) continue;
      const asset = new URL(reference, new URL(`${pagesBasePath}${route}`, target.origin));
      assert.ok(asset.origin === target.origin && asset.pathname.startsWith(`${pagesBasePath}/`), `Asset escaped Pages prefix: ${reference}`);
      assets.add(asset.pathname.slice(pagesBasePath.length) + asset.search);
    }
  }
  assert.ok(assets.size > 0 && assets.size <= 60, 'Expected a bounded set of actual site assets');
  for (const asset of assets) {
    const extension = new URL(asset, target.origin).pathname.split('.').at(-1);
    const type = extension === 'css' ? /text\/css/ : extension === 'js' ? /(?:javascript|ecmascript)/ : /image\//;
    await get(asset, 200, type);
  }
  for (const locale of ['en', 'zh']) {
    const index = readSearchIndex(JSON.parse(await get(`/search-index/${locale}.json`, 200, /application\/json/)), locale);
    const allowed = locale === 'zh' ? expected.chapters : [...overviews].filter(([, c]) => englishEditions[c.id].source)
      .map(([route, c]) => ({ id: c.id, route, sha256: englishEditions[c.id].sha256 }));
    {
      for (const chapter of allowed) assert.ok(index.entries.some(entry => entry.chapterId === chapter.id), `Missing search chapter: ${chapter.id}`);
      for (const entry of index.entries) assert.ok(allowed.some(chapter =>
        entry.chapterId === chapter.id && entry.sourceHash === chapter.sha256 && entry.href.startsWith(`${chapter.route}#`)), 'Search contains unapproved identity/hash/route');
    }
  }
  const missing = await get('/__release-smoke-missing__/', 404);
  assert.ok(missing.includes('Page not found') && missing.includes('这一页还没找到') && /noindex/.test(missing), 'Expected actual bilingual noindex 404');
  return { commit, routes: routes.length, assets: assets.size, requests };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [url, commit] = process.argv.slice(2);
  console.log(JSON.stringify(await smokePublicRelease({ url, commit })));
}
