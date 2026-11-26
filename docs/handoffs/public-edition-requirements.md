# Public-edition requirements — handoff

26 November 2026 · Product owns requirements and product decisions; Delivery owns review, assignments and Git integration. The [board](../coordination.md) owns current status. The [independent review](../reviews/public-edition-requirements.md) records findings and acceptance.

## Assignment and boundaries

The author authorised a lightweight first-volume PRD, key decision records, a documentation migration map and a read-only recovery check. This is preparation before bounded reader design/implementation. It does not authorise new prose, translations, illustrations, audio, device purchases, dependencies or changes to publication scope.

Product supplies `docs/product/volume-one-public-edition.md`, `docs/product/document-migration.md`, `docs/decisions/README.md` and PDR-001 through PDR-004. Delivery adds discoverable pointers in project-brief, roadmap and board, plus this handoff/review. Writer checks manuscript scope. Developer checks actual capabilities and follows documented entry points. Neither executor rewrites Product's files; findings return to Product.

## Baseline and comparison material

Product started at main `c50854f6de4ba1a967abff277898f684c7ee5d63`. The assembled document candidate starts at `5353d696a14ef794eb85059a4c1b86eadd665aa1`, after the separately reviewed cold-start repair in [PR48](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/pull/48). The requirements do not certify a newer runtime or V3.1 implementation. Read the public [release identity](https://haixin-zhang.github.io/vibe-coding-then-what/release.json) separately.

The repository contains the [51-piece Chinese reading edition](../../book/revisions/zh/volume-one-making-of/README.md), [two English bodies and two overviews](../../site/content/english-edition.ts), and the [209-page approved print identity](../../book/print/volume-one/edition.json). The two calibration manuscripts are reviewed local comparison samples, not admitted web/PDF sources:

| Sample | Frozen SHA-256 | Status and limits |
| --- | --- | --- |
| Part 2, product discovery and prototype iteration | `e56feacfb876fb9214bf7d032b863770e1bd3f9a2885bac42717e6fce5af3f16` | Concept/manuscript and Product reader review passed; interactive paper choices retained. No new full-book or A5 approval |
| Part 4, last-seat transaction/concurrency | `a759948b606a2f1ea6e8edf4e7905cdcde2fc83b029d3ae69b781c3069d45fb5` | Reviewed with explicit database assumptions and paper traces. No PostgreSQL dual-session execution claimed; role-name consistency and print proof remain follow-ups |

Delivery retains their exact reading entry and original evidence with the assigned Writer workspace. The samples and private recovery archives are deliberately not copied into this public documentation batch. Obtain the assigned comparison entry from Delivery before a task requiring their full text; do not substitute an older similarly named chapter.

## Workspace and recovery contract

The author's primary checkout remains clean main. Product, Writer, Developer and Delivery use separate assigned branches/worktrees under the [workspace policy](../collaboration.md#workspace-and-main-checkout). Private machine paths, chat identities and archive contents are not public release inputs.

On recovery, read AGENTS → the explicit role guide → board → this handoff/review and the linked PRD. Verify the actual baseline, branch, HEAD and working status. Delivery supplies the current role-specific directory/branch and any private sample entry. If no directory is assigned, remain read-only and obtain that assignment; neither the repository root nor a historical worktree is an implicit workspace. Preserve existing changes and do not reconstruct ownership from a chat's default directory.

## Verification and next boundary

Review current capabilities versus proposed refinements, local links/anchors, exact draft identities and the migration map's five recovery questions. The original Developer has prior project experience: this is a document-only recovery check with that limitation, not a blind onboarding experiment or human reader study. Writer independently checks source coverage and the unresolved manuscript/executable-example promises.

The first pass found that the board did not expose a current handoff/review or explain how to obtain the private comparison entry. This handoff and its board pointer address that gap. Writer and Developer’s affected r2 rechecks passed; the review preserves the failed first pass, corrected entry, exact input identity and method limitations. Delivery accepted the documents as a draft, not as implementation or release-scope approval.

Requirements may be integrated as a reviewed **draft** while release decisions remain open. O01–O07 in the [PRD](../product/volume-one-public-edition.md#decisions-needed-before-release-scope-is-frozen) remain with their named owners. Next design or manuscript work needs a concrete assignment stating which decisions it depends on. No implementation follows automatically from merging these documents. Larger historical document moves remain outside this first migration slice.
