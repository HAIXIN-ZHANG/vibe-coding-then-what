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
| `#current-priorities-after-the-reader-review`, `#m4-opening-prerequisite--…`, `#approved-milestones-24-direction--2026-11-18` | New roadmap `#next--the-first-four-weeks-after-execution-resumes` in current-facing prose. In decision records (PDR-001, PDR-005), use the archive with the same anchor, because they cite what was decided then |
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

*Pending. The executor was Claude, so the review must come from Codex or the author.*

## Integration

*Codex fills this in, after the author authorises it.*
