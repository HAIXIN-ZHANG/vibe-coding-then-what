import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bookCatalog } from '../site/config/books.ts';
import { parseBasePath } from '../site/config/deployment.ts';
import { englishEditions } from '../site/content/english-edition.ts';
import { chapterManifest, chapterPath } from '../site/content/manifest.ts';
import { createStaticPreview } from './static-preview.mjs';

const mount = '/__reader-measurement';
const reportPath = mount + '/report/';
const files = {
  model: 'reading-measurement.mjs',
  collector: 'local-reading-collector.mjs',
};

export async function createLocalReadingPreview({ directory, basePath, port = 4337 } = {}) {
  const prefix = parseBasePath(basePath);
  const routes = {};
  for (const locale of ['en', 'zh']) {
    const { home, entry } = bookCatalog.work.editions[locale];
    routes[prefix + home] = { surface: 'home' };
    routes[prefix + entry] = { surface: 'contents' };
    routes[prefix + bookCatalog.life.editions[locale].home] = { surface: 'other', companion: true };
    for (const chapter of chapterManifest) {
      if (locale === 'en' && !englishEditions[chapter.id]) continue;
      routes[prefix + chapterPath(chapter, locale)] = {
        surface: locale === 'zh' || englishEditions[chapter.id]?.source ? 'body' : 'other', chapterId: chapter.id, locale,
      };
    }
  }
  const scriptTag = `<script type="module" src="${prefix}${mount}/collector.mjs"></script>`;
  const report = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Local reading report</title>
    <h1>Local reading report</h1><p>Counts for this browser tab during this opt-in loopback preview. Open this page in the same tab after reading.</p>
    <p>Chapter body page views are full reading pages in either language. Chapter overview page views are English previews. An overview never counts as a body-open session. PDF link clicks count reader actions, not completed downloads.</p>
    <p>Reports from the automated validation command use synthetic sessions. Unknown sources stay unknown.</p>
    <p><a href="${prefix}/">English home</a> · <a href="${prefix}/zh/">中文首页</a></p>
    <pre id="local-reading-report" aria-live="polite">Loading local report…</pre>${scriptTag}</html>`;
  const js = 'text/javascript; charset=utf-8';
  const assets = new Map([
    [mount + '/routes.mjs', { body: Buffer.from(`export const routes = ${JSON.stringify(routes)}; export const pdfPath = ${JSON.stringify(prefix + "/downloads/volume-one-zh-a5.pdf")};\n`), contentType: js }],
    [reportPath, { body: Buffer.from(report), contentType: 'text/html; charset=utf-8' }],
  ]);
  for (const [name, file] of Object.entries(files)) {
    assets.set(`${mount}/${name}.mjs`, { body: await readFile(new URL(file, import.meta.url)), contentType: js });
  }
  return createStaticPreview({ directory, basePath: prefix, port, localOverlay: {
    assets,
    decorate: bytes => Buffer.from(bytes.toString('utf8').replace('</head>', scriptTag + '</head>')),
  } });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [directory, rawPort = '4337', basePath = ''] = process.argv.slice(2);
  const port = Number(rawPort);
  assert.ok(directory && /^\d+$/.test(rawPort) && port >= 0 && port <= 65535,
    'Usage: node scripts/local-reading-preview.mjs <export-directory> [port=4337] [prefix]');
  const server = await createLocalReadingPreview({ directory, basePath, port });
  const url = `http://127.0.0.1:${server.address().port}${parseBasePath(basePath)}`;
  console.log(`Opt-in local reading preview: ${url}/\nIn the same tab, open the report: ${url}${reportPath}`);
  for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => server.close());
}
