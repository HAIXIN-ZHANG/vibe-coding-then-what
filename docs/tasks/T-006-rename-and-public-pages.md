# T-006 · Rename to the new titles and refresh the public pages

## Brief

*Delivery Lead, 28 November 2026. Base: main after T-001. Executor: Developer.*

**Goal.** Readers and visitors see the [PDR-007](../decisions/pdr-007-titles-and-positioning.md) titles everywhere that is current, and the public pages describe all three works accurately. URLs stay the same.

**Steps.**

1. Replace `README.md` with [T-006-drafts/README.md](T-006-drafts/README.md), and `docs/reader-roadmap.md` with [T-006-drafts/reader-roadmap.md](T-006-drafts/reader-roadmap.md).
2. In `CONTRIBUTING.md`:
   - change the first paragraph's title to *AI Wrote It. It Runs. Then What?*;
   - replace "Maintainers review proposed changes" with `The Delivery Lead reviews proposed changes ([collaboration](docs/collaboration.md))`, a link relative to the repository root;
   - leave everything else as it is.
3. `LICENSE-CONTENT.md` was already updated on 28 November (scope and attribution title); leave it as it is.
4. Site titles and metadata: book titles, subtitles, `<title>`, Open Graph and Twitter descriptions, the shelf, the home page and the release metadata label, wherever the old English or Chinese title appears in `site/`. The closing's title becomes 《今天就到这儿吧》 together with T-007.
5. Current planning documents, title lines only: `book/planning/editorial-brief.md`, `book/planning/outline.md` and `book/planning/volume-two-outline.md`.

**Must not change.**

- The repository slug, base path or any URL, slug or anchor.
- The 209-page PDF and its `edition.json`.
- Historical records under `docs/handoffs/`, `docs/reviews/`, `docs/archive/` and `docs/delivery/`.
- The comparison manuscripts under `book/revisions/zh/volume-one-making-of/`.

**Acceptance.**

- `grep -rn "Vibe Coding, Then What\|用 AI 写代码：能跑" README.md CONTRIBUTING.md LICENSE-CONTENT.md docs/reader-roadmap.md site/ book/planning/` returns only intentional historical mentions. List any that remain, with the reason.
- `npm run check`, `npm run build:pages` and `npm run verify:export` pass, as do the existing E2E suites for both base paths. Update test expectations only where they assert the title text.
- Screenshots of the EN and ZH home pages at 390 px and 1440 px, plus one shared-link preview (Open Graph), attached to the Handoff.
- Every link in the new README and reader roadmap resolves.

## Handoff

## Review

## Integration
