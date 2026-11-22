import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pagesBasePath, createReleaseMetadata, verifyReleaseMetadata } from './release-metadata.mjs';
import { readSearchIndex } from '../site/content/search.ts';

export function validatePublicTarget(value = `http://127.0.0.1:4179${pagesBasePath}/`) {
  const url = new URL(value);
  const publicOrigin = url.origin === 'https://haixin-zhang.github.io';
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
  const routes = ['/', '/read/', '/zh/', '/zh/read/', ...expected.chapters.map(chapter => chapter.route)];
  const assetLimit = 60;
  // One metadata document, two search indexes and the missing-page probe.
  const requestBudget = routes.length + assetLimit + 4;
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
  for (const route of routes) {
    const html = await get(route);
    const english = route === '/' || route === '/read/';
    assert.ok(html.includes(`lang="${english ? 'en' : 'zh-CN'}"`), `${route}: wrong document language`);
    if (route === '/read/') {
      assert.ok(html.includes('English chapters are not available yet'), 'English absence must be explicit');
      assert.ok(!/href="[^"#]*\/read\/(?!["?#])[^"#]+\//.test(html.replaceAll(`${pagesBasePath}/zh/read/`, '/chinese/')), 'Unexpected English chapter route');
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
  assert.ok(assets.size > 0 && assets.size <= assetLimit, 'Expected a bounded set of actual site assets');
  for (const asset of assets) {
    const extension = new URL(asset, target.origin).pathname.split('.').at(-1);
    const type = extension === 'css' ? /text\/css/ : extension === 'js' ? /(?:javascript|ecmascript)/ : /image\//;
    await get(asset, 200, type);
  }
  for (const locale of ['en', 'zh']) {
    const index = readSearchIndex(JSON.parse(await get(`/search-index/${locale}.json`, 200, /application\/json/)), locale);
    if (locale === 'zh') {
      assert.ok(index.entries.length > 0, 'Chinese search must include reviewed content');
      for (const chapter of expected.chapters) assert.ok(index.entries.some(entry => entry.chapterId === chapter.id), `Missing Chinese search chapter: ${chapter.id}`);
      for (const entry of index.entries) assert.ok(expected.chapters.some(chapter =>
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
