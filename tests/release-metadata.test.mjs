import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, writeFile, readFile, symlink, link, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { chapterManifest } from '../site/content/manifest.ts';
import { createReleaseMetadata, verifyReleaseMetadata, writeReleaseMetadata, inspectReleaseOutput, pagesBasePath } from '../scripts/release-metadata.mjs';

const commit = 'd390f53420f88deda0627328d140be058a91feac';

test('release metadata exposes only exact public identities, canonical routes and reviewed hashes', () => {
  const metadata = createReleaseMetadata(commit, pagesBasePath);
  assert.deepEqual(Object.keys(metadata), ['version', 'commit', 'basePath', 'english', 'chapters']);
  assert.deepEqual(metadata.chapters.map(item => item.sha256), chapterManifest.map(item => item.sha256));
  for (const item of metadata.chapters) assert.deepEqual(Object.keys(item), ['id', 'locale', 'route', 'sha256']);
  verifyReleaseMetadata(JSON.parse(JSON.stringify(metadata)), commit);
  for (const change of [
    value => { value.commit = 'a'.repeat(40); },
    value => { value.basePath = '/elsewhere'; },
    value => { value.chapters[0].sha256 = 'b'.repeat(64); },
    value => { value.chapters[0].id = 'unreviewed'; },
    value => { value.chapters[0].route = '/read/invented/'; },
    value => { value.chapters.pop(); },
    value => { value.english[0].kind = 'overview'; },
    value => { value.source = '/private/path'; },
  ]) {
    const invalid = globalThis.structuredClone(metadata); change(invalid);
    assert.throws(() => verifyReleaseMetadata(invalid, commit));
  }
});

test('release metadata rejects ambiguous commit/prefix/manifest inputs', () => {
  for (const sha of [undefined, '', 'HEAD', commit.slice(0, 7), commit.toUpperCase(), 'g'.repeat(40), `${commit}\n`]) {
    assert.throws(() => createReleaseMetadata(sha, pagesBasePath));
  }
  for (const prefix of [undefined, '', '/', `${pagesBasePath}/`, '//example.com', '/wrong', `${pagesBasePath}/../elsewhere`]) {
    assert.throws(() => createReleaseMetadata(commit, prefix));
  }
  assert.throws(() => createReleaseMetadata(commit, pagesBasePath, []));
  assert.throws(() => createReleaseMetadata(commit, pagesBasePath, [chapterManifest[0], chapterManifest[0]]));
});

test('release writer requires a complete ordinary export and never overwrites existing metadata', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'vctw-release-'));
  try {
    await assert.rejects(inspectReleaseOutput(directory), /Missing export/);
    await writeFile(path.join(directory, 'index.html'), 'home');
    await writeFile(path.join(directory, '404.html'), 'missing');
    const written = await writeReleaseMetadata(directory, commit, pagesBasePath);
    assert.deepEqual(written.files, ['404.html', 'index.html', 'release.json']);
    verifyReleaseMetadata(JSON.parse(await readFile(path.join(directory, 'release.json'), 'utf8')), commit);
    await assert.rejects(writeReleaseMetadata(directory, commit, pagesBasePath), /EEXIST/);
    await symlink(path.join(directory, 'index.html'), path.join(directory, 'leak.html'));
    await assert.rejects(inspectReleaseOutput(directory), /symlinks/);
    await rm(path.join(directory, 'leak.html'));
    await link(path.join(directory, 'index.html'), path.join(directory, 'hard.html'));
    await assert.rejects(inspectReleaseOutput(directory), /ordinary files/);
    await rm(path.join(directory, 'hard.html'));
    await writeFile(path.join(directory, '.env'), 'must not upload');
    await assert.rejects(inspectReleaseOutput(directory), /hidden output/);
  } finally { await rm(directory, { recursive: true, force: true }); }
});
