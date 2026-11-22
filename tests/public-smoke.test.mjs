import { englishEditions } from '../site/content/english-edition.ts';
import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'node:http';
import { createReleaseMetadata, pagesBasePath } from '../scripts/release-metadata.mjs';
import { smokePublicRelease, validatePublicTarget } from '../scripts/public-smoke.mjs';
import { alternateLocalePath, bookSelectionPath, getMessages, localePath } from '../site/config/i18n.ts';

const commit = 'd390f53420f88deda0627328d140be058a91feac';
const english = getMessages('en');
const companionPath = 'books/everyday-life/';
const companionTitles = { en: 'Where Does the Saved Time Go?', zh: '省下来的时间，去哪儿了？' };

async function fixture(change, run) {
  const metadata = createReleaseMetadata(commit, pagesBasePath);
  const documents = new Map();
  function set(route, body, type = 'text/html', status = 200) { documents.set(`${pagesBasePath}${route}`, { body, type, status }); }
  set('/release.json', JSON.stringify(metadata), 'application/json');
  for (const route of ['/', '/read/', '/zh/', '/zh/read/', ...metadata.chapters.map(chapter => chapter.route)]) {
    const chapter = metadata.chapters.find(item => item.route === route);
    set(route, `<html lang="${route.startsWith('/zh/') ? 'zh-CN' : 'en'}"><link rel="stylesheet" href="${pagesBasePath}/style.css"><script src="${pagesBasePath}/app.js"></script><p>${english.englishUnavailable}</p>${chapter ? `<article data-source-sha256="${chapter.sha256}">中文</article>` : ''}</html>`);
  }
  for (const chapter of metadata.chapters.filter(c => englishEditions[c.id])) {
    const overview = alternateLocalePath(chapter.route, 'zh');
    documents.get(`${pagesBasePath}/read/`).body += `<a href="${pagesBasePath}${overview}">Overview</a>`;
    if (englishEditions[chapter.id].source) set(overview, `<html lang="en"><article data-chapter-id="${chapter.id}" data-source-sha256="${englishEditions[chapter.id].sha256}">English</article><a href="${pagesBasePath}${chapter.route}">Original</a></html>`);
    else set(overview, `<html lang="en"><article data-chapter-overview="${chapter.id}"><p>${english.chapterAvailability}</p><a href="${pagesBasePath}${chapter.route}">Original</a></article></html>`);
  }
  for (const locale of ['en', 'zh']) {
    const messages = getMessages(locale);
    const home = pagesBasePath + localePath(locale);
    const route = localePath(locale, companionPath);
    const companion = pagesBasePath + route;
    const selection = pagesBasePath + bookSelectionPath(locale);
    const title = companionTitles[locale];
    const landing = documents.get(home);
    landing.body = landing.body.replace('</html>',
      `<nav id="books" class="volume-switch book-choices"><a href="${home}">${messages.title}</a><a href="${companion}">${title}</a></nav></html>`);
    set(route, `<html lang="${messages.lang}"><head><title>${title}</title></head><body>
      <header><a class="books-link" href="${selection}">${messages.books}</a></header>
      <main><article class="companion-overview"><nav class="volume-switch"><a href="${home}">I</a><a href="${companion}" aria-current="page">II</a></nav><h1>${title}</h1></article></main>
      </body></html>`);
  }
  set('/style.css', 'body{color:black}', 'text/css');
  set('/app.js', 'console.log("public")', 'text/javascript');
  set('/search-index/en.json', JSON.stringify({ version: 1, locale: 'en', entries: metadata.chapters.filter(c => englishEditions[c.id]?.source)
    .map(chapter => ({ chapterId: chapter.id, chapterTitle: 'English', headingId: 'heading', headingTitle: 'heading',
      locale: 'en', sourceHash: englishEditions[chapter.id].sha256, href: alternateLocalePath(chapter.route, 'zh') + '#heading', text: 'Full chapter' })) }), 'application/json');
  set('/search-index/zh.json', JSON.stringify({ version: 1, locale: 'zh', entries: metadata.chapters.map(chapter => ({
    chapterId: chapter.id, chapterTitle: '中文', headingId: 'heading', headingTitle: 'heading',
    locale: 'zh', sourceHash: chapter.sha256, href: `${chapter.route}#heading`, text: '正文',
  })) }), 'application/json');
  set('/__release-smoke-missing__/', '<meta name="robots" content="noindex"><h1>Page not found</h1><p>这一页还没找到</p>', 'text/html', 404);
  change(documents);
  const server = createServer((request, response) => {
    const item = documents.get(new URL(request.url, 'http://127.0.0.1').pathname);
    response.writeHead(item?.status ?? 404, { 'Content-Type': item?.type ?? 'text/html' });
    response.end(item?.body ?? 'missing');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await run(`http://127.0.0.1:${server.address().port}${pagesBasePath}/`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('public smoke defaults to loopback and rejects alternate origins, prefixes and credentials', () => {
  assert.equal(validatePublicTarget().hostname, '127.0.0.1');
  assert.equal(validatePublicTarget(`https://haixin-zhang.github.io${pagesBasePath}/`).protocol, 'https:');
  for (const url of [
    'https://example.com/vibe-coding-then-what/', 'http://haixin-zhang.github.io/vibe-coding-then-what/',
    'http://127.0.0.1:4179/', `http://user@127.0.0.1${pagesBasePath}/`,
    `http://127.0.0.1${pagesBasePath}/?secret=1`, `http://127.0.0.1${pagesBasePath}/#fragment`,
  ]) assert.throws(() => validatePublicTarget(url));
});

test('public smoke checks identity, actual routes/assets, approved Chinese search and real 404 over HTTP', async () => {
  await fixture(() => {}, async url => {
    const result = await smokePublicRelease({ url, commit });
    const routes = 6 + createReleaseMetadata(commit, pagesBasePath).chapters.length + Object.keys(englishEditions).length;
    assert.equal(result.commit, commit); assert.equal(result.routes, routes); assert.equal(result.assets, 2);
    // Metadata + reading routes + two assets + two indexes + actual 404.
    assert.equal(result.requests, routes + 6);
    await assert.rejects(smokePublicRelease({ url, commit: 'a'.repeat(40) }), /identity/);
  });
});

test('public smoke detects missing assets, prefix leaks, soft 404, unreviewed search and fabricated English', async () => {
  const alterations = [
    docs => docs.delete(`${pagesBasePath}/app.js`),
    docs => { const doc = docs.get(`${pagesBasePath}/`); doc.body = doc.body.replace(`${pagesBasePath}/style.css`, '/style.css'); },
    docs => { docs.get(`${pagesBasePath}/__release-smoke-missing__/`).status = 200; },
    docs => { const doc = docs.get(`${pagesBasePath}/search-index/zh.json`); const json = JSON.parse(doc.body); json.entries[0].sourceHash = 'a'.repeat(64); doc.body = JSON.stringify(json); },
    docs => { const doc = docs.get(`${pagesBasePath}/search-index/en.json`); doc.body = JSON.stringify({ version: 1, locale: 'en', entries: [{}] }); },
    docs => { const doc = docs.get(`${pagesBasePath}/read/`); doc.body = doc.body.replace(english.englishUnavailable, 'Ready'); },
    docs => { docs.get(`${pagesBasePath}/read/`).body += `<a href="${pagesBasePath}/read/invented/">invented</a>`; },
    docs => { docs.get(`${pagesBasePath}/read/a-page-and-a-system/`).body += '<article data-source-sha256="unexpected">Body</article>'; },
  ];
  for (const change of alterations) await fixture(change, async url => {
    await assert.rejects(smokePublicRelease({ url, commit }));
  });
});

test('public smoke rejects misleading Volume II responses and broken book selection', async t => {
  const enRoute = pagesBasePath + localePath('en', companionPath);
  const zhRoute = pagesBasePath + localePath('zh', companionPath);
  const enHome = pagesBasePath + localePath('en');
  const zhHome = pagesBasePath + localePath('zh');
  const enChoice = pagesBasePath + bookSelectionPath('en');
  const zhChoice = pagesBasePath + bookSelectionPath('zh');
  const cases = [
    ['missing route', docs => docs.delete(zhRoute), /unexpected HTTP status/],
    ['HTTP 200 serving the same-language Work book', docs => {
      docs.get(enRoute).body = docs.get(enHome).body;
    }, /wrong companion title or content/],
    ['HTTP 200 with the wrong document language', docs => {
      const doc = docs.get(zhRoute);
      doc.body = doc.body.replace('<html lang="zh-CN">', '<html lang="en">').replace('<main>', '<main lang="zh-CN">');
    }, /wrong document language/],
    ['Volume I marked current', docs => {
      const doc = docs.get(enRoute);
      doc.body = doc.body.replace(' aria-current="page"', '').replace('<nav class="volume-switch"><a ', '<nav class="volume-switch"><a aria-current="page" ');
    }, /incorrect current volume/],
    ['Books link targets the other edition', docs => {
      const doc = docs.get(zhRoute);
      doc.body = doc.body.replace(zhChoice, enChoice);
    }, /missing usable same-edition Books link/],
    ['Books link drops the fragment', docs => {
      const doc = docs.get(enRoute);
      doc.body = doc.body.replace(enChoice, enHome);
    }, /missing usable same-edition Books link/],
    ['Books link is hidden', docs => {
      const doc = docs.get(enRoute);
      doc.body = doc.body.replace('class="books-link"', 'class="books-link" hidden');
    }, /missing usable same-edition Books link/],
    ['books target exists only in a script', docs => {
      const doc = docs.get(zhHome);
      doc.body = doc.body.replace('id="books"', 'id="elsewhere"').replace('</html>', '<script>const sample = \'<nav id="books" class="book-choices"></nav>\';</script></html>');
    }, /missing usable book selection anchor/],
    ['landing choice points to another edition', docs => {
      const doc = docs.get(enHome);
      doc.body = doc.body.replace(enRoute, zhRoute);
    }, /incorrect book selection destinations/],
  ];
  for (const [name, change, expected] of cases) await t.test(name, async () => {
    await fixture(change, async url => assert.rejects(smokePublicRelease({ url, commit }), expected));
  });
});
