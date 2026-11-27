# Collaboration

Updated 28 November 2026. This page describes how the author and the AI roles work together ([PDR-008](decisions/pdr-008-roles-and-modes.md)). The roles are described in [`roles/`](roles/), and the [team file](team.md) says which AI holds each one. The earlier four-role workflow is [archived](archive/collaboration-2026-11-27.md).

## Roles in one table

| Role | Owns | Reviews |
| --- | --- | --- |
| Author | Goals, voice, scope, publication | Voice pass; final reader verdict with real readers |
| PM | Direction, PRD, research, decision records | Stage acceptance (the product desk check) |
| Designer | Reading experience, design system, Figma | Design fidelity on reader-visible tasks |
| Delivery Lead | Briefs, sequencing, integration decisions | Every task, against its brief |
| Writer | Manuscript drafts and adaptations | None |
| Developer | Site, tests, tooling, migrations, Git operations | None |
| Audience panel | Simulated reader runs | None: hypotheses only |

Whoever executes a task never reviews it. With two AIs, the reviewer and the audience panel use the model that did not produce the work. With one AI, review happens in a fresh session that works from the checklist, and the record says plainly that the reviewer is the same model.

## When a task file is needed

Open a task from the [template](tasks/TEMPLATE.md) if a change does any of the following:

- changes what a reader sees or can do;
- is hard to undo (publishing, deleting, migrating, rewriting history);
- goes public outside the repository;
- touches more than a few files;
- revises more than one chapter.

Anything else needs a PR description, CI and a Delivery Lead look at the diff. A typo fix needs only CI.

## Review layers, by risk

| Change | Delivery Lead | Designer | Audience panel | PM | Author |
| --- | --- | --- | --- | --- | --- |
| Internal, tooling, documents | ✓ | | | | |
| Reader-visible site change | ✓ | ✓ | ✓ | | |
| Manuscript revision | ✓ | | ✓ | | ✓ voice pass |
| Stage close or public release | ✓ | ✓ | | ✓ | ✓ authorises |

## Task lifecycle

**Queued → Briefed → In progress → In review → Fix and recheck or Pass → Integrated.**

- **Paused** and **Blocked** are notes on top of a state, each with its reason and the condition for resuming.
- Each section of a task file is written once per round, not once per step.
- Status lives in the [task queue](tasks/README.md). The [board](coordination.md) shows only what is active now.
- Work in progress is limited to two writing streams and one engineering stream. Parallel tasks must touch disjoint files.

## Workspace and main checkout

- The author's checkout stays clean on `main`.
- Each task works in `.local/worktrees/<task-id>`, on branch `<tool>/<task-id>`.
- Unpublished drafts and private recovery copies stay out of the public main branch. A stash is never their only copy.
- Main moves only by a reviewed merge.

## Talking between AIs in dual mode

- **The task file is the record.** Each role writes only its own section, so no chat relay is needed.
- **The Delivery Lead dispatches in one direction.** From the task's worktree it runs `/codex:rescue --background`, collects with `/codex:result`, reviews the actual diff, and sends fixes with `--resume`. Codex does not call Claude back.
- **When the author opens Codex directly,** it reads the queue and the task file and continues from there.
- **No message is approval:** silence, a received message or time passing does not approve anything.

## Product desk check

At a stage close, or when one change affects edition switching, saved position, access to the text or claims about available content:

1. The Delivery Lead supplies the PM with the exact revision, a preview, the main journey, one edge case, the checks already run and the environments not yet tested.
2. The PM walks the journeys as a reader, using the `product-review` skill, and records **Pass**, **Pass with follow-ups**, or **Fix and recheck**.
3. Fixes go back to the original executor as a task round.
4. Real-reader sessions are recorded separately and outrank both the PM's walkthrough and the audience panel.

## Integration and publication

- The Developer opens the PR only after a Pass and the author's authorisation.
- The required CI must pass on the exact reviewed head. Then squash-merge.
- Never weaken branch protection.
- Deployment is a separate step and needs its own authorisation.
- The [release runbook](release.md) covers releases.

## Budgets and records

- **Size limits:** roadmap two pages; board one screen; PRD about 1,500 words; a review section about one page; a role card about 40 lines.
- **Authorisation** is stated once, on the board or in the brief.
- **Dated history** goes to `docs/archive/`. Current pages say what is true now.
- **Privacy:** keep credentials, private transcripts and private recovery paths out of the public repository. Scratch notes follow the [notes policy](agent-notes-policy.md).
