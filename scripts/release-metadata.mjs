import assert from 'node:assert/strict';
import { lstat, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { englishEditions } from '../site/content/english-edition.ts';
import { chapterManifest, chapterPath, validateManifest } from '../site/content/manifest.ts';
import { loadBook } from '../site/content/load-book.ts';
import { parseBasePath } from '../site/config/deployment.ts';
import { site } from '../site/config/site.ts';

export const pagesBasePath = site.publicBasePath;

export function createReleaseMetadata(commit, basePath, entries = chapterManifest) {
  assert.ok(typeof commit === 'string' && commit.length === 40, 'A full lowercase commit SHA is required');
  assert.match(commit ?? '', /^[a-f0-9]{40}$/, 'A full lowercase commit SHA is required');
  assert.equal(parseBasePath(basePath), pagesBasePath, 'Release prefix must match the Pages project');
  validateManifest(entries);
  // Publish only the approved identity/hash projection, never source or review paths.
  return {
    version: 1, commit, basePath,
    english: entries.filter(entry => englishEditions[entry.id]).map(entry => {
      const edition = englishEditions[entry.id];
      return { id: entry.id, locale: 'en', kind: edition.source ? 'body' : 'overview', route: chapterPath(entry, 'en'),
        chineseSha256: entry.sha256, ...(edition.source ? { sha256: edition.sha256 } : {}) };
    }),
    chapters: entries.map(entry => ({ id: entry.id, locale: entry.locale, route: chapterPath(entry), sha256: entry.sha256 })),
  };
}

export function verifyReleaseMetadata(value, commit, basePath = pagesBasePath) {
  assert.deepEqual(value, createReleaseMetadata(commit, basePath), 'Public release identity or approved chapter set differs');
}

// The Pages uploader dereferences links. Refuse them and unexpected hidden content before upload.
export async function inspectReleaseOutput(directory) {
  const files = [];
  async function visit(current, relative = '') {
    const info = await lstat(current);
    assert.ok(!info.isSymbolicLink(), `Release output must not contain symlinks: ${relative || '.'}`);
    if (info.isDirectory()) {
      for (const name of await readdir(current)) {
        assert.ok(!name.startsWith('.') || (relative === '' && name === '.nojekyll'), `Unexpected hidden output: ${name}`);
        await visit(path.join(current, name), relative ? `${relative}/${name}` : name);
      }
    } else {
      assert.ok(info.isFile() && info.nlink === 1, `Release output must contain ordinary files only: ${relative}`);
      files.push(relative);
    }
  }
  await visit(directory);
  for (const name of ['index.html', '404.html']) assert.ok(files.includes(name), `Missing export: ${name}`);
  return files.sort();
}

export async function writeReleaseMetadata(directory, commit, basePath) {
  const metadata = createReleaseMetadata(commit, basePath);
  await loadBook();
  await inspectReleaseOutput(directory);
  // A fresh build is required. Never follow or overwrite an existing release.json.
  await writeFile(path.join(directory, 'release.json'), `${JSON.stringify(metadata, null, 2)}\n`, { flag: 'wx' });
  const files = await inspectReleaseOutput(directory);
  return { metadata, files };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { metadata, files } = await writeReleaseMetadata(
    fileURLToPath(new URL('../site/out/', import.meta.url)), process.env.RELEASE_SHA, process.env.NEXT_PUBLIC_BASE_PATH,
  );
  console.log(`Release ${metadata.commit}: ${files.length} static files; ${metadata.chapters.length} approved chapters; prefix ${metadata.basePath}`);
}
