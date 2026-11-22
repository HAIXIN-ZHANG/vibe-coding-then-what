# Pages release and recovery

The release operator is a maintainer explicitly assigned to the release or recovery. That operator coordinates review, Git integration, setting verification, dispatch and observed public acceptance under the owner's applicable authorization. In the project's existing workflow, Coordinator performs that responsibility. This runbook grants no additional access or publication authorization: preserve the protected public repository, required checks and main-only `github-pages` environment.

Expected URL: <https://haixin-zhang.github.io/vibe-coding-then-what/>. An expected URL or successful build is not evidence that the site is live.

## Automatic release and manual recovery

After a successful CI **push** run for `main`, Pages release automatically validates and deploys that run's source revision. Pull-request runs, failed CI and other branches cannot trigger a release. The release rebuilds the Pages export from that exact source, verifies its routes and assets, and runs the core browser journeys on the rebuilt files; immediately before deployment, the workflow checks that the source is still current `main`. A stale release fails closed. The concurrency group queues up to 100 pending runs; stale revisions fail closed. If the latest release is skipped or fails, investigate the run and manually dispatch the current reviewed main. Automatic release does not itself prove public smoke or rollback acceptance.

The manual dispatch remains available for current `main` and runs the full source and browser checks before the same latest-main gate. Historical-run reruns cannot restore an older revision through this gate: restore earlier content through a reviewed revert or fix on main, then verify CI and the new release. Do not rerun an older source revision expecting it to bypass the latest-main guard.

### Browser checks while the design evolves

Pull requests run lint, type checks, unit tests, both static builds and export verification. On each export, Chromium exercises the tests tagged `@smoke` for entry, chapter navigation, search, resume, links without JavaScript and split-view reading. A push to main runs the full browser suite on the Pages prefix and smoke on root. To check a branch on both paths before merging a redesign, run **CI → Run workflow** on that branch. This dispatch does not publish the site.

## Release gate and optional manual dispatch

1. Review the actual implementation and resolve findings with its original owner. Merge only after the reviewed PR head passes `Quality`, `Static export (root)` and `Static export (pages)`. Verify those same three checks and their actual steps on the exact integrated `main` SHA. Record that SHA and the check-run links in Coordinator's release review.
2. Confirm Pages Source is GitHub Actions, the default HTTPS domain has no unexpected custom domain, and the `github-pages` environment still allows only `main`, with no tags. These are operator preconditions; this workflow does not change settings or protections.
3. For a manual release or recovery, in Actions → **Pages release** → **Run workflow**, select **main**. There is no commit/revision input. Verify the resulting run's event is `workflow_dispatch`, ref is `refs/heads/main` and full head SHA is the reviewed integrated SHA. If main moved to an unreviewed revision, stop before dispatch; if an incorrect run was already dispatched, do not accept it as the intended release. Repeat review/checks for the new main before release.
4. Follow the build and deploy jobs to completion. The run checks out the immutable event SHA, installs the lockfile, rebuilds and verifies the Pages export, then runs smoke on automatic release or the full source and browser checks on manual release. It then writes `release.json`, checks the ordinary-file export boundary, uploads only `site/out` and deploys that artifact. Build has only `contents:read`; the separate environment-gated deploy job has `contents:read` for the latest-main check and `pages:write`/`id-token:write`, and no checkout/npm step. Failed browser evidence is limited to the existing public-test artifact directory with seven-day retention.
5. Record run URL/attempt, exact SHA, actual successful steps, deploy URL and timestamp. A deploy-job success still requires the public acceptance below. Keep current and previous known-good run IDs and their source SHAs for recovery.

Workflow concurrency uses `pages-production`, `cancel-in-progress:false` and `queue:max`; a new run does not cancel a running deployment. GitHub allows up to 100 pending runs, but ordering of starts is not guaranteed. Observe the latest release and never manually cancel an active deploy as a routine release technique.

## Exact public identity and HTTP checks

Use the reviewed source checkout matching the expected release SHA and its existing locked tooling. This matters because the smoke helper compares the public chapter set/hashes against that checkout's canonical reviewed manifest. Do not alter a shared dirty workspace to prepare it; the release operator can use a separate verified checkout.

```sh
npm run release:smoke -- https://haixin-zhang.github.io/vibe-coding-then-what/ FULL_40_CHARACTER_RELEASE_SHA
```

Replace the placeholder with the actual reviewed SHA from the run. The helper makes at most 80 read-only GET requests to the exact Pages origin/prefix, with cache-busting, ten-second request timeouts and a 90-second overall deadline; it refuses credentials, alternate origins, redirects and other prefixes. Its default target is IPv4 loopback, so omitting the URL never contacts production. It checks:

- `release.json`: exact full commit, project prefix, version and complete approved Chinese chapter IDs/routes/source hashes; no additional fields or internal paths.
- Both language homes/indexes and every approved Chinese chapter: HTTP 200, document language, an explicit notice that English chapter bodies are unavailable, approved rendered chapter hashes, same-origin/prefixed script/style/preload/icon references and real successful asset responses.
- Actual English/Chinese search JSON: English has no invented corpus; Chinese contains every approved chapter and only matching identities/hashes/routes.
- An unknown prefixed route: actual HTTP 404, bilingual recovery text and noindex.

The helper does not submit issues, follow external correction links, execute JavaScript or prove browser behavior. If propagation gives a mismatch, record the actual result and retry after a short bounded interval; never change the expected SHA merely to match stale public output.

## Public browser acceptance

After HTTP identity checks pass, the release operator uses the actual public site in a browser. Record the observed URL/SHA, viewport, actions/results and relevant evidence separately from local and CI results. Check the chapter set and interface belonging to the expected release SHA; a feature merged on newer main is not automatically part of an older deployment or recovery target.

- English default entry → Chinese directory → every admitted Chinese chapter, including opening → G01 → F01 for the recorded three-chapter edition; exercise previous/next links. Language switching preserves the honest absence of English chapter bodies; verify a missing English chapter URL returns an actual 404 too.
- Chinese search loads the public index, returns a real reviewed heading and navigates/focuses it. English search explains the absent corpus without inventing results.
- System/Light/Dark preference works and survives refresh when storage is available. Search/share/correction UI renders correctly; inspect the correction preview without submitting an external issue.
- At 320px and a normal desktop width, keyboard focus remains visible, navigation remains usable and the page has no horizontal overflow; code blocks and tables stay within their intended containers. Verify an overflowing code block scrolls locally. Ordinary tables may fit and are not required to overflow.
- An unknown URL renders the bilingual 404 and links back under the project prefix. Check the browser for unexpected console/page errors and failed site asset requests.

The maintained Playwright suite stays loopback-only. A local/CI pass does not replace these observations of actual hosting/CDN behavior. The release operator records acceptance and requests any factual public-status documentation update afterward.

## Recovery and return to the intended release

1. Identify a previously observed known-good release, its source SHA and public acceptance evidence. Diagnose the current failure and preserve the failing run and its logs.
2. Restore the desired source with a narrowly reviewed revert or fix PR. Preserve protected main and required checks; do not force-push, weaken protections or rerun an old release expecting it to pass the latest-main guard.
3. After the replacement reaches main and all CI jobs pass, follow its automatic Pages run. If necessary, manually dispatch the current main. Verify `release.json` against the actual new main SHA and perform the public HTTP/browser checks above.
4. Record the recovery, including the prior known-good evidence, replacement revision, actual release run and public checks. A reviewed revert preserves historical commits; it does not reproduce an earlier artifact byte-for-byte.

Production release concurrency can hold up to 100 pending runs, but start order is not guaranteed. The latest-main guard prevents known stale revisions from deploying; inspect the newest main CI and run a manual dispatch if needed. A successful action does not replace public smoke checks.

## Local reproduction and output boundary

After the installed runtime/browser prerequisites in the [developer guide](../site/DEVELOPMENT.md):

```sh
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run check
npm run build:pages
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run verify:export
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run test:e2e
RELEASE_SHA=FULL_40_CHARACTER_RELEASE_SHA NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run release:metadata
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what node scripts/static-preview.mjs
# In a second terminal:
npm run release:smoke -- http://127.0.0.1:4179/vibe-coding-then-what/ FULL_40_CHARACTER_RELEASE_SHA
```

For a local uncommitted implementation check, explicitly label metadata's SHA as the baseline/test identity; it does not make uncommitted files that published revision. Production identity comes from the immutable CI-validated or manually dispatched checkout. Stamping requires a fresh export with no existing `release.json`, verifies the actual reviewed manuscript hashes and refuses symlinks, hardlinks, unusual files or hidden content (except an ordinary root `.nojekyll`). Do not upload repository directories, traces, env files, caches or dependencies as Pages content. No source/review file paths, private credentials or machine paths are included in metadata.

## Official action pins and limits

Verified against the official GitHub release/tag API and commit-specific `action.yml` on 2026-11-17:

| Action | Release | Full commit |
| --- | --- | --- |
| upload-pages-artifact | [v5.0.0](https://github.com/actions/upload-pages-artifact/releases/tag/v5.0.0) | `fc324d3547104276b827a68afc52ff2a11cc49c9` |
| deploy-pages | [v5.0.1](https://github.com/actions/deploy-pages/releases/tag/v5.0.1) | `368f82528645a54fb793d4d04e342629a3f51346` |

The uploader is composite and pins its nested upload-artifact to `bbbca2ddaa5d8feaa63e36b76fdaad77386f024f` (v7.0.0); deploy-pages runs Node24. Existing checkout/setup-node/diagnostic uploader pins remain those documented in the developer guide. This workflow follows [GitHub's separate Pages build/deploy requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages); it does not invoke configure-pages or mutate settings. Official top-level pins do not freeze hosted runner images or the runtime patch. Dependency maintenance remains a separate disposition; this pipeline does not resolve or silently accept advisory findings.
