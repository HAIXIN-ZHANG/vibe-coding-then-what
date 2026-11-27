# Uncommitted baseline closeout and V2 transition review

Date: 2026-11-17 (Australia/Perth). Owner/reviewer: Coordinator. **Outcome: preserve the accepted local baseline; closeout/document alignment complete within this scope. Git integration, public release and V2 design acceptance remain separate pending gates.** The author requested this review before further visual development. [The board](../coordination.md) owns current assignments/holds; [the roadmap](../archive/roadmap-2026-11-27.md#current-design-direction--milestone-2-refresh-2026-11-17) and [Milestone 2 record](../delivery/milestone-2.md#design-direction-and-next-delivery-priority--2026-11-17) own the new direction.

## Actual workspace and recovery boundary

- Checkout: `/Users/haixin/Desktop/code/vibe-coding-then-what`.
- Branch/HEAD: `main@95a6bec69e26cbe13fe9f5d9433ee91e07632091`; the local `origin/main` tracking ref matches. No fetch or live remote-head/protection audit was performed; a tracking ref is not proof of current server state.
- At closeout start: **36 changed source/document files:24 tracked modifications and12 untracked files**. None was deleted, reset, staged or discarded. Developer and Writer were idle with their preceding tasks closed.
- A content-addressed local recovery copy of all36 starting files was made before these alignment edits: `.local/recovery/uncommitted-closeout-2026-11-17/before/files/`, with `before/manifest.json`. It excludes `.git`, dependencies, ignored secrets, generated output and private conversations. The existing31-file recovery archive remains intact.
- Final closeout source/file hashes are stored alongside it under `final/manifest.json` and `final/files/`. These ignored copies supplement the durable decisions and exact accepted revisions below; they are not artifacts to publish or stage.

This task changes only current coordination/planning status and historical-design banners, plus this review. It makes no product-code/manuscript/Figma/dependency/access change and no Git write, PR, merge or deployment. The new review is not another standing agent or replacement for earlier independent decisions.

## Work to retain

| Work | Actual evidence / revision | Disposition |
| --- | --- | --- |
| Search completeness, Unicode-safe excerpts, mobile result density, nearby outline, truthful home entry and bounded search/catalog design corrections | [Original independent quality reinspection](quality-findings-2026-11-17.md) accepted its named r1; [executor record](../handoffs/developer/quality-findings-2026-11-17.md) preserves reproductions and limits | Keep. The real14-result regression, original-text matching and accessible navigation are useful correctness work independent of V2 styling |
| Browser Fundamentals / P1.2 Chinese manuscript | [F01M scope](F01M-scope.md) and [manuscript review](F01M.md), final r3 `54b983945710303a7e790706d86b9acc3884f50f6ae82f06dbde71711967ca24` | Keep exact source. Examples/diagrams are conceptual; no browser performance experiment or English adaptation was approved |
| Third-chapter local intake | [Intake review](milestone-2-chapter-intake.md), Developer r4 handoff `e783997bb5518bc94ccd57ad73694a693a6bbaeff2fd3fba0d2c8ccd2dd49401`, all11 payload hashes independently match | Keep. Local manifest/home/index/search/navigation/verifier/tests admit only opening/G01/F01, with29 Chinese search entries and no English body |
| Continuation/bookmark preparation | [Preparation r2](milestone-2-preparation.md) accepted a bounded proposal, not implementation | Keep as reusable input. Do not implement it from the old “Continue next” recommendation; review placement/behavior against V2 first |
| Original / Mist Blue / Soft Grey study | [Historical specification](../design/reading-palettes-spec.md) and its [dated design review](reading-palettes-design.md) | Preserve evidence and old assets. Superseded as the future coding target; no production three-background feature needs to be removed |
| V2 direction added by the design owner | Existing roadmap/Milestone 2 additions retained | Current future direction: separate V2 page, neutral resolved light/dark surfaces, System preference and6 independent accents. Exact colors/design states/implementation are not accepted by this closeout |

The initial quality hashes describe their named earlier revision. Later authorized F01 intake changed shared home/i18n/test files; its exact later review, not an old whole-file digest, owns those bytes. Source review, code/artifact review, integration and publication are not interchangeable.

## Actual closeout verification

1. Independently matched the final intake handoff and **all11 current payload digests** against its reviewed manifest. Independently matched opening/G01/F01 source hashes. Protected parser, search, Panda styles, reading-tools/disclosure, theme and package/lockfile bytes match their accepted intake-assignment snapshot. No runtime change was made by the design-planning update or this closeout.
2. Independently verified all31 ignored recovery files against their existing manifest. The36-file pre-alignment recovery copy was verified byte-for-byte during capture; the final recovery manifest records the post-alignment source set.
3. Ran the existing **read-only root export verifier again**:8 pages,165 local references,29 Chinese/0 English entries, indexed heading targets valid. Current ignored `site/out` is the root export. Log: `/tmp/vctw-closeout-export-2026-11-17.log`.
4. Reused only exact-revision runtime evidence that still matches the current code: Coordinator's44 Node/lint/strict checks, fresh root build plus16 root E2E, handed-over Pages verifier plus16 Pages E2E, and actual1440/390/320×844 captures under both prefixes. Those tests were genuinely run in the intake review; **they were not rerun as new V2 tests in this documentation closeout**. Logs `/tmp/vctw-intake-independent-{check,root-build,root-export,root-e2e}.log` and `/tmp/vctw-intake-independent-pages-e2e.log` remain available.
5. Reviewed the design owner's new roadmap/delivery sections against active board/vision/spec wording. Aligned stale prospective priorities and relative Markdown links/anchors, checked whitespace, and preserved dated decisions and source bodies. `git diff --check` passed. No build, package installation, Figma operation or external service call was needed.

No new cloud CI, live GitHub permission audit, public smoke/deployment, Safari/WebKit, Firefox, physical-device, screen-reader or native-zoom result is claimed. Earlier dependency disposition and distinct-version rollback limits remain in their dated records; this is not a fresh advisory scan or a blanket security clearance. The last verified public edition is still the two-source edition; accepted local F01 is not published.

## Contradictions resolved and current hold

- Roadmap's opening already specified V2, but its later Goal 2/Milestone 2 priorities still said to implement resume first and evaluate the old background palettes. The current priority now points to V2 design/review/author confirmation; the feature backlog remains available without acting as an assignment.
- Milestone 2's completed content-first table and “B1 Continue next” conclusion are now explicitly dated/superseded. Accepted quality/chapter/intake work remains accepted and useful.
- The vision and three-background specification no longer present that old study as the future implementation target. UI04/Milestone 1 records remain reference material, with a status banner rather than rewritten review history.
- Old Figma page/variable inventories are identified as dated evidence. The design-owner record names `04 · Reading Experience V2`; this closeout did not inspect its live content or modify it. A page name or empty page is not a delivered/approved design.

**Hold:** no old-background-palette implementation, continuation/bookmark implementation or V2 UI coding from previous recommendations. Do not modify Milestone 1 assets to simulate a new design. The separate design owner can continue its user-authorized V2 design work; it must return actual file/page/node links and states for review. Coordinator independently reviews the design/technical boundaries, the author confirms the design, then Developer receives a concrete implementation slice. A roadmap update alone does not release code.

System selects the effective light/dark appearance; it is not a third rendered background. The6 accents are independent control/link/emphasis choices, not6 background themes. Blue is proposed only. Exact shades, contrast across states/modes, non-color selection/focus indicators, responsive navigation/width controls and precise first implementation scope remain design decisions. Selection feedback/prompts/richer discovery are experiments or later candidates, not hidden requirements for this baseline.

## Concrete safe integration proposal — not executed

**Recommend one coherent baseline PR for the accepted quality/F01 work and its necessary closeout documents, with V2 implementation kept separate.** Quality fixes and F01 intake overlap in `site/config/i18n.ts`, `site/components/home-page.tsx`, `tests/e2e/reader.spec.mjs` and `site/DEVELOPMENT.md`. There are no separate committed feature heads to cherry-pick. Blindly splitting current files/hunks into historical commits risks missing dependencies or accepting a revision different from the one tested. The historical hash/review records do not require reconstructing those stages as new commits.

Once Git writes are explicitly authorized:

1. Recheck the current tree and recovery manifest; verify the intended remote, actual remote main and live required protections/checks. Keep the shared dirty checkout intact. If remote main moved, assess its diff and conflict ownership before applying the accepted source bundle.
2. Create an isolated worktree/branch such as `codex/reviewed-reading-baseline` from that verified baseline. Apply the complete frozen accepted bundle and necessary linked documents there; omit ignored recovery copies, `.local`, build output and screenshots. Do not switch/reset the shared checkout, force-push or introduce V2 code during packaging.
3. Validate the packaged revision: source hashes/public boundaries, lint/strict/Node, matching root+Pages builds/verifiers and maintained Chromium suite. Compare the actual staged diff and exact source digests against this accepted bundle. Any substantive delta returns to its original owner and affected review.
4. Commit/push/open the scoped PR only within the granted authority. Link original independent quality review, F01M and intake acceptance plus this closeout; explicitly state local3/public2, absent English bodies and unverified limits. Require **Quality**, **Static export (root)** and **Static export (pages)** to pass at the actual proposed head; local passes are not cloud results.
5. Merge only if separately authorized and all matching protections/checks are satisfied; never weaken them. Manual Pages release remains another deliberate authorization/verification step at an immutable integrated revision. Do not turn a baseline PR or V2 design approval into automatic deployment.

No branch/worktree, stage, commit, push, PR, merge, protection change or deployment was performed by this proposal. The exact candidate files/hashes are available in the final local recovery manifest; the reviewed source bodies remain separately identified above. A later doc-only follow-up is possible, but do not fragment the overlapping runtime baseline merely to manufacture more PRs.

## Pending decisions and next owner

- **Author/Git authority:** whether to permit isolated packaging, commit/push/PR; merge and publication remain distinct. Existing authorization for this task covers review/closeout, not those Git mutations.
- **V2 design owner/author:** deliver the independent V2 page with actual components/states, choose/verify the six accents and obtain the author's visual confirmation. Milestone 1 remains reference.
- **Coordinator/Developer:** after design confirmation, assess compatibility with current Panda semantic roles/theme controller and preserve chapter/search/navigation contracts, then assign the smallest reviewed upgrade. Do not assume every new visual idea is part of Milestone 2 implementation.

Existing source work is stable enough to retain and package; it does not need to be discarded while design continues independently. Current executors are closed and informed of the new boundary. Resume code or integration only through a new concrete authorized assignment, preserving this recovery state and the separate design gate.
