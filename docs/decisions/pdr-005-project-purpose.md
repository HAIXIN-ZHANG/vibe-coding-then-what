# PDR-005 · Project purpose and priorities across the three works

Status: **Accepted.** On 27 November 2026 the author confirmed the purpose, the priorities and the answers below, which came from an outside review. Decision-maker: author. Recorded: 27 November 2026 against main `9acaa05`. Implementation PR: none.

Execution happens later, in one coordinated pass (see [Adoption sequence](#adoption-sequence)). This record does not itself change the roadmap, the PRD or the board.

## Context

The vision, roadmap and PRD define the audience, the milestones and the three works. None of them says what the project is for from the author's point of view. As a result, everything ran in parallel. On 27 November nine streams were active or planned at once, all of them depending on one author's review time.

## Purpose stated by the author

1. **Personal synthesis.** After a period of reading and project work, the author wants to organise the fundamentals an engineer needs in the AI era. The tone is light and humorous rather than a textbook register.
2. **Professional portfolio.** The works belong to the author's public portfolio. They are linked from the résumé and LinkedIn and maintained over the long term.
3. **Three works with different roles:**
   - **Volume I** covers engineering fundamentals.
   - **The production guide** explains how this book was made, from vibe coding through role-based agent sessions to agentic coding.
   - **Volume II** is a lighter, conversational look at everyday life with AI.

## Decisions

**Primary outcome** (amended below: a goal for after Volume I is finished). A professional visitor arriving from LinkedIn or the résumé sees two things within a few minutes: the author's engineering judgment, and how the author works with AI. Volume I remains the maintained base. Its full revision is not the gate for presenting the work.

**Work-in-progress limit.** Run at most two writing streams and one engineering stream at a time. Initially:

- Writing: the Volume I flagship pieces and the production guide.
- Engineering: the V4 reader design, then its implementation slices. This was amended on 27 November; it previously read "closing out the V3 reader candidate".

**Volume I flagship pieces.** Each gets the revised depth standard and a reviewed English adaptation, in this order:

1. [Browser foundations](../../book/revisions/zh/volume-one-making-of/02-browser-foundations.md). Its English adaptation already exists.
2. [Two versions each answered three questions correctly](../../book/revisions/zh/volume-one-making-of/p8-good-answer.md): AI evaluation.
3. The Part 2 discovery calibration sample, from the [M4 standard-samples brief](../handoffs/m4-standard-samples.md).
4. The Part 4 last-seat calibration sample from the same brief, with its PostgreSQL example executed where available.

Pieces 3 and 4 receive English adaptations after their Chinese revision is accepted. Other pieces stay published with honest version and status labels.

**Amended 28 November 2026:** the first chapter, 《一个页面，究竟连着什么？》, becomes a fifth flagship piece and is revised first. It is the first chapter every reader opens, and it still reads in the earlier textbook register. The [structure and revision plan](../../book/planning/volume-one-revision-plan.md) holds the current order of the five pieces and the English plan.

**Production guide.**

- The six-chapter concept and its through-narrative exist only in the author's private preservation branch. Move their public-safe text into main and remove private recovery paths.
- Draft in Chinese, the author's strongest voice. Adapt each chapter into English and publish the English version first.
- Each chapter points to repository evidence: PRs, handoffs, reviews, rework and failures.

**Volume II.**

- Serialise it on the existing site with the Volume I chapter reader. The existing shelf and overview page stay as they are; no new Volume II design is needed.
- Distribute each piece on Chinese platforms rather than LinkedIn.
- Start after the guide's first chapter is published, at roughly one piece every two weeks.
- The formal M5 release and EPUB are unscheduled.

**Measurement: Umami Cloud, Hobby plan.** The [official pricing page](https://umami.is/pricing), checked on 27 November 2026, listed:

- $0 per month;
- up to 100K events a month;
- one website (both books share one GitHub Pages site);
- six months of data retention;
- custom events.

How to adopt it:

- Reuse the event definitions from the local measurement preview. Do not deploy the project's own collector.
- Tag outbound LinkedIn links with UTM parameters, and read LinkedIn's own post analytics alongside the site data.
- Export the data monthly if a longer history is wanted.
- Add a short reader-facing privacy notice.
- The author creates the account. Enabling the script remains its own authorised change.
- **Timing, amended 28 November 2026:** measurement starts after the revised edition is public. With the books unfinished there is little to measure; until then, use LinkedIn's own post analytics and replies.

Alternatives considered on the same day:

- Plausible: paid from about $9 a month, with no free plan.
- GoatCounter: free for non-commercial use, but its hosted limits are unclear.
- Cloudflare Web Analytics: free, but custom-event support could not be confirmed.

**Signals to observe.** No targets are set; record what is actually observed:

- chapter visits referred from posts;
- conversations, messages or interviews that mention the work;
- peer shares or citations;
- author-page visits.

Flagship chapters also keep a real-reader check: can a target reader explain the mechanism afterwards?

## Disposition of work in progress · 27 November 2026

| Stream | Decision |
| --- | --- |
| Volume I calibration samples | Continue (writing stream 1) |
| PostgreSQL last-seat example | Continue as evidence for the Part 4 sample |
| V3 reader candidate (landing, F01 reader, panels, toolbar, UI release integration) | **Amended 27 Nov: hold, do not merge.** Keep the branches. A V4 design system and Figma redesign are under way ([PDR-006](pdr-006-two-desk-workflow.md)); merging V3 first would mean redoing the same surfaces. Reuse V3 code when V4 slices are implemented |
| EN/ZH design pairing | Narrow to the states the flagship pieces need |
| Typography and Figma review | Body text uses the serif option (A), chosen by the author. Close the review as part of the reader close-out. Fix observed defects only; chapter-swipe gestures and new motion stay out of scope ([PRD O05](../product/volume-one-public-edition.md#decisions-needed-before-release-scope-is-frozen)) |
| Volume II serial design | Pause; reuse the Volume I reader |
| Production guide | Move to writing stream 2 |
| Local measurement collector | Stop; use the event definitions with Umami |
| Listening chapter script | Freeze until the flagship and guide work has shipped |

Also deferred until observed signals justify them:

- the web print-edition viewer;
- the offline bookshelf;
- the M6 store-app decision;
- explanatory video;
- update feeds, topic filters and chapter discussions.

## Amendment · Volume I first, promotion last (28 November 2026)

The author's words, relayed by the Designer session and confirmed as the author's direction: LinkedIn posts can wait indefinitely; market presentation comes only once the books are substantially written. Everything goes into finishing Volume I's framework and content first. Then the guide and Volume II. Only after that, promotion and new features, including LinkedIn presentation and the résumé update.

This changes the decisions above as follows:

- **Primary outcome:** the professional-visitor outcome is a goal for after Volume I is finished, not a gate for the current work.
- **Work in progress:** Volume I writing is the main writing stream. The guide moves to Phase 2, after Volume I. The Volume II serial also waits for Phase 2. The limit of two writing streams and one engineering stream still applies.
- **Adoption sequence:** step 4 (author and works page, share cards, first LinkedIn post) moves to Phase 3. The five-reader trial stays in Phase 1, because it checks the writing rather than promoting it. Step 5 keeps the flagship pieces and moves guide chapter 1 to Phase 2.
- **Signals:** promotion signals apply from Phase 3. Until then, the signal that matters is whether target readers can explain a flagship mechanism.

The [roadmap](../roadmap.md) holds the three phases.

## Alternatives considered

- **All three works in parallel** (the previous roadmap). Rejected: it spreads one author across three manuscripts and several reader features before any signal exists.
- **Volume I first, companions later.** The review first proposed this. It was dropped once the portfolio purpose was stated, because the guide is the most distinctive evidence of how the author works.
- **Guide first, Volume I paused.** Rejected: visitors need readable flagship chapters to sample.

## Consequences

- **Roadmap.** Supersedes the M4/M5 ordering of the guide and the life volume in the 22 November approved direction. [PDR-001](pdr-001-first-volume.md) remains compatible.
- **PRD.** Amends the effect of [PRD O02](../product/volume-one-public-edition.md#decisions-needed-before-release-scope-is-frozen): Chinese remains the Volume I source and full translation stays unscheduled, but the flagship pieces need English adaptations.
- **Public claims.** AI disclosure stays explicit. The guide claims no first-person experience beyond what the repository shows. Private handoffs and transcripts stay out of public text.
- **Risk.** Some readers discount a book written with AI. The guide answers with evidence of the author's own review, rejection and correction decisions.

## Adoption sequence

These steps are carried out together, later. Owners follow [Collaboration](../collaboration.md).

0. **Close out work in progress** according to the disposition table. *Coordinator.*
1. **This record.** *Author: done.*
2. **Replace the roadmap.** Write a roadmap of at most two pages (purpose, Now/Next/Later, frozen items with their thaw conditions, signals) and archive the current file. Update current-facing links. In historical records, repoint anchored links to the archive without changing their content. Then:
   - shorten the board to one screen;
   - add P0/P1 priorities and a current-gap table to the PRD;
   - remove stale facts from the vision.
3. **Lighten the process** in [Collaboration](../collaboration.md):
   - Full handoff and review only for reader-visible, irreversible or externally published changes. Everything else needs a PR description and CI.
   - One record per task.
   - Document budgets: roadmap two pages, board one screen, PRD 1,500 words, review one page.
   - State authorisation once, on the board.
4. **Presentation basics:** author and works page, share cards, a five-reader trial and the first LinkedIn post. Measurement moves to after the revised edition is public.
5. **Flagship pieces and guide chapter 1** in English.
6. **Four-week retrospective.** Record the continue / revise / stop decisions as a new PDR or an amendment.

Evidence: [README author section](../../README.md#about-the-author); [roadmap M4/M5](../archive/roadmap-2026-11-27.md#approved-milestones-24-direction--2026-11-18); [Volume I contents](../../book/revisions/zh/volume-one-making-of/README.md); [M3 delivery record](../delivery/milestone-3.md) (local-only measurement preview and the unpublished listening script).
