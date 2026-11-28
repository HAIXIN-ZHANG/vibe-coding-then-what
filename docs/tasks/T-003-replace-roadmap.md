# T-003 · Replace the roadmap

## Brief

*Claude, 28 November 2026. Base: main after T-001 lands.*

**Goal.** Replace the 100 KB roadmap with the two-page text that was drafted as `T-003-roadmap-draft.md`, now placed at [docs/roadmap.md](../roadmap.md). Keep the old roadmap intact and keep every link working.

**Steps.**

1. Move `docs/roadmap.md` to `docs/archive/roadmap-2026-11-27.md` unchanged, using `git mv` so that history follows the file.
2. Create `docs/roadmap.md` from the draft. The draft's links are written relative to `docs/`, so they resolve once the file is at `docs/roadmap.md`. Delete the draft afterwards.
3. Repoint inbound links in two groups. There were 44 files with 81 links on 27 November; recount them on the base.
   - **Historical files** (31 at the last count): `docs/handoffs/`, `docs/reviews/`, `docs/archive/`, `docs/development-history.md`, `docs/delivery/milestone-1.md`, `docs/delivery/milestone-2.md`, `docs/design/reading-experience-v1.md` and `docs/design/reading-palettes-spec.md`. Change only the path, to the archive file, and keep the anchor. Change nothing else in these files.
   - **Current files** (13): `AGENTS.md`, `docs/coordination.md`, `docs/stage-summary.zh-CN.md`, `docs/project-brief.md`, `docs/product-design-role.md`, `docs/project-vision.md`, `docs/design/reading-experience-v2.md`, `docs/decisions/pdr-001-first-volume.md`, `docs/decisions/pdr-005-project-purpose.md`, `docs/delivery/milestone-3.md`, `book/planning/editorial-brief.md`, `book/planning/chapter-workflow.md` and `book/planning/tasks.md`. Apply this table:

| Old anchor | New target |
| --- | --- |
| no anchor | `roadmap.md` (new) |
| `#candidate-lightweight-readership-measurement` | Archive, same anchor. The definitions still apply until T-009 replaces them |
| `#current-priorities-after-the-reader-review`, `#m4-opening-prerequisite--…`, `#approved-milestones-24-direction--2026-11-18` | New roadmap `#phase-1--finish-volume-i` in current-facing prose. In decision records (PDR-001, PDR-005), use the archive with the same anchor, because they cite what was decided then |
| Any other anchor | Archive, same anchor |

**Must not change.** Any file content other than link targets, the archive's bytes, the repository slug or URLs, and the site build. `site/` does not link to the roadmap; confirm this and change nothing there.

**Acceptance.**

- A link checker over `docs/`, `book/` and `AGENTS.md` reports no missing file or anchor targets. Record the command and its output.
- `git diff --stat` touches only link lines, apart from the move and the new file. Show `git diff --word-diff` for a sample of three historical files.
- The archive differs from the old `docs/roadmap.md` on the base only in its link paths and the archive note (amended 28 November; see the Handoff).
- `npm run lint` and the existing documentation checks pass, if any apply.

## Handoff

*Executed by Claude on 28 November 2026 at the author's instruction ("做好"), on branch `claude/pdr-005-project-purpose`.*

- `git mv docs/roadmap.md docs/archive/roadmap-2026-11-27.md`. The base file's SHA-256 prefix is `ca3f0e5bb44ab459`. **Deviation from the brief:** the archive is no longer byte-identical. Its relative links broke one folder deeper, so link paths were adjusted and a one-line archive note was added. The original bytes remain in git history at the base commit.
- The new `docs/roadmap.md` comes from the draft, and the draft file is removed.
- Links repointed in 18 files by the brief's rules. Historical files point to the archive with their anchors kept. Current anchored links go to the new `#next--…` section, except in PDR-001 and PDR-005, which point to the archive.
- Check: every link to either roadmap file across all `.md` files resolves, including anchors (0 problems).
- Not run: `npm run check` and the builds, because the site does not link to the roadmap; recorded as not run.

## Review

*Delivery Lead (Claude), 28 November 2026, at the author's request, against main `0bd5134`. **This review is not independent:** Claude also executed the task. The brief asked for Codex or the author to review it. To limit that weakness, the verdict rests on mechanical checks that do not depend on the reviewer's judgement. The author can still ask Codex for an independent pass.*

**Verdict: Pass.** One broken anchor is fixed in this change. It was introduced later, by PR #53, not by T-003.

Checks:

- **The archive matches the original.**
  - The original file was taken from `9acaa05:docs/roadmap.md`, SHA-256 prefix `ca3f0e5bb44ab459`, as in the Handoff.
  - With link targets masked, the only difference from `docs/archive/roadmap-2026-11-27.md` is the added archive note and its blank line.
  - Both copies have 112 links. Resolved from their own folders (`docs/` and `docs/archive/`), all 112 point to the same file and anchor as before.
  - So the Handoff's stated deviation, link paths plus one note, is the whole deviation.
- **Historical files changed only their roadmap links.** Each historical file the brief lists, as changed in `43fe74d`, was compared with roadmap link targets masked. Thirteen files changed only those link lines. Two other files showed other changes, neither of them T-003's:
  - `docs/handoffs/public-edition-requirements.md` repoints the PRD link to its archived copy, the same pattern for T-005's archive.
  - `docs/handoffs/writer/m4-standard-samples.md` is a new file brought into main by the same PR.
- **Link checker.**
  - It ran over `docs/`, `book/` and `AGENTS.md`, plus `README.md`: 330 Markdown files, every relative link, and every heading anchor using GitHub-style slugs.
  - Of the 38 problems it reported:
    - 33 are links in `T-004-drafts/` and `T-006-drafts/`. Those files are written to sit at the repository root, and the links resolve from there.
    - 3 are angle-bracket links containing `(english)` and `(chinese)` route folders, which the checker's pattern cuts short. All three files exist.
    - 1 is a root-relative example inside the T-006 brief's instructions.
    - 1 is real: `book/planning/tasks.md` linked to `roadmap.md#phase-1--finish-volume-i`, a heading that never existed under that name. PR #53 renamed the Phase 1 heading while that link was being written. It now points to `#phase-1--volume-i-v1-the-book-settles-and-the-design-stops-changing`.
  - No other link to either roadmap file is broken.
- **The site has no roadmap links.** `site/` contains no link to the roadmap, so the build was unaffected, as the Handoff states.

Not checked: the brief's `git diff --word-diff` samples. The masked comparisons above cover the same question more completely.

## Integration

*Codex fills this in, after the author authorises it.*
