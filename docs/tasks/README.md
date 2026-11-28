# Tasks

Each task gets one file, `T-xxx-<slug>.md`, with four sections:

- **Brief.** Written by Claude: the goal, the files in scope, what must not change, and the acceptance checks.
- **Handoff.** Written by Codex: what changed, the checks that were run, and what remains open.
- **Review.** Written by Claude: a verdict of pass, pass with follow-ups, or fix and recheck.
- **Integration.** Written by Codex, after the author authorises it: the PR, CI and merge.

See [PDR-008](../decisions/pdr-008-roles-and-modes.md) and the [team file](../team.md) for who does what, and the [template](TEMPLATE.md) for the sections.

**Status values:** `Queued`, `Ready`, `In progress · <tool> · <branch> · <date>` (the claim), `In review`, `Fix and recheck`, `Pass`, `Pass (not independent)` and `Integrated`, plus `Paused` or `Blocked` with a reason. The hand-off rules are drafted in [T-004](T-004-drafts/collaboration.md#talking-between-ais-in-dual-mode) and take effect when T-004 lands. This index is the queue; the [board](../coordination.md) keeps only a pointer here once the process migration (T-004) lands.

## Queue · prepared 28 November 2026

None of these tasks is started. Codex picks them up when it is available again, one engineering task at a time, in this order unless the author reorders them. Claude writes each detailed brief just before the task starts, so that it matches the current main branch.

| ID | Task | Executes | Depends on | Status |
| --- | --- | --- | --- | --- |
| T-001 | **Integrate the 27–28 November work.** Open a PR for branch `claude/pdr-005-project-purpose`, together with T-004 so that new and old rules are never mixed on main. It contains: PDR-005–009; the new roadmap (T-003), PRD, vision, project index and Chinese stage summary, with the archived originals; team, role cards, personas and task template; the Volume I revision plan and candidates; the guide material; the Writer standard samples and scene-led input brought in from their branches; and the widened content licence. Merge the 27 November delivery-branch roadmap note into the archive history if needed. Prose is not yet admitted to the site. | Codex | Author authorises the PR | Merged to main by PR at the author's instruction on 28 November, ahead of T-004; `AGENTS.md` carries a transition notice until T-004 lands |
| T-002 | **Settle work in progress.** Record each M4 branch as held, preserved or closed according to the PDR-005 disposition table. Merge nothing from V3. List the 18 prunable `/tmp` worktrees for the author to approve before any are removed. | Codex | T-001 | Ready |
| T-003 | **Replace the roadmap.** Claude supplies the new roadmap text (at most two pages). Codex archives the current file unchanged to `docs/archive/`, then repoints the 81 inbound links: current-facing documents point to the new roadmap; anchored links in historical records point to the archive with no other edits. | Claude text and migration (author instruction, 28 Nov) | T-001 | Done 28 Nov. Reviewed 28 Nov: Pass, by mechanical checks; not independent ([brief and review](T-003-replace-roadmap.md)) |
| T-004 | **Roles, modes and a lighter process.** Place the new `AGENTS.md`, `CLAUDE.md`, collaboration page, chapter workflow and PR template. Archive the old role guides and templates, rename roles in seven current documents, add six shared skills with Claude symlinks, add tool settings, and shorten the board to one screen. The team file, role cards, personas and task template are already written. | Codex, from Claude's specification | T-003 | Ready: [brief](T-004-two-desk-structure.md) and [drafts](T-004-drafts/). Paused 28 Nov when work moved to UI/UX |
| T-005 | **Product documents.** PRD, vision, project index and Chinese stage summary rewritten, with the old versions archived. | PM (Claude) | — | Done 28 Nov |
| T-006 | **Rename to the PDR-007 titles and refresh the public pages.** Update site titles and metadata, README and current documents (25 files), leaving the repository slug and URLs unchanged. Keep historical records and the 209-page PDF as they are. Replace the README and reader roadmap from drafts. The cover artwork with the English title is regenerated in the design track. | Codex | T-001 | Ready: [brief](T-006-rename-and-public-pages.md) and [drafts](T-006-drafts/) |
| T-007 | **Admit the Volume I candidates to the site.** Adopt the revised preface, the trimmed Part 8 chapter and the retitled closing: update manifest hashes, search, links and tests. Add part openers and the whole-book map, which need part-introduction support in the reader. | Codex | T-006; part-opener rendering needs the V4 design | Partly ready |
| T-008 | **Bring the production guide into main.** Publish public-safe copies of the guide's concept and through-narrative from the author's preservation branch, with private paths removed. Claude then writes the restructuring plan into three stages (PDR-007). | Codex migration, Claude plan | T-001 | Ready |
| T-009 | **Measurement.** Integrate Umami with the existing event definitions, add a privacy notice and verify the counts. | Codex | Revised edition public; author creates the Umami account | Later (author, 28 Nov) |
| T-010 | **V4 reader** (the author and works page waits for Phase 3). Eight slices, one PR each, built from the [V4 design](../design/v4/reader-v4-design.html), reusing held V3 code where it already matches. | Claude design and review, Codex build | T-006 (design accepted 28 Nov, [PDR-010](../decisions/pdr-010-v4-acceptance-and-edition.md)) | Ready after T-006: [brief](T-010-v4-reader.md) |
| T-011 | **Volume I flagship revision and Part 8.** The five flagship pieces and the eight Part 8 pieces, one round per piece: Codex drafts, Claude reviews, the panel rehearses, the author does the voice pass. English adaptations wait for Phase 3. | Codex drafts, from Claude's plans | T-007; F5 also needs T-012 | Ready after T-007: [brief](T-011-volume-one-flagship-revision.md) and [per-chapter plans](../../book/planning/phase-one-chapter-plans.md) |
| T-012 | **Check the Part 4 PostgreSQL example.** Desk trace of every schedule against the PostgreSQL 18 documentation, instead of a container run (author, 28 Nov). | Delivery Lead (Claude) | — | Done 28 Nov: [trace](../../book/revisions/zh/volume-one-standard-samples-20261126/evidence/p4-roll-call-desk-trace-20261128.md). A container run is optional later |
| T-013 | **Phase 1 reader trial** with three to five target readers on F1–F3. | Author runs it; PM (Claude) prepares and records | T-011, deployed | Planned: [plan](../audience/reader-trial-plan.md) |

## Backlog

Ideas that do not belong to the current phase are listed here, not designed or built (roadmap rule 2). Phase 3 items are already listed in the [roadmap](../roadmap.md#phase-3--promotion-and-expansion).

| Idea | Phase | Raised |
| --- | --- | --- |
| Link-preview (Open Graph) images | 3 | Designer, 28 Nov |
