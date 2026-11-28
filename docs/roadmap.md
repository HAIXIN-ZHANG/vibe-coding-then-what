# Roadmap

Updated 28 November 2026 (Australia/Perth). This page sets the order of work and the conditions for changing it. Decisions live in the [decision records](decisions/README.md); individual tasks live in the [task queue](tasks/README.md). The roadmap used until 27 November, including Delivery Milestones 1–6, is [archived unchanged](archive/roadmap-2026-11-27.md).

## Why the project exists

AI now does the work and it runs, but the person who asked often cannot say what it did. These books follow that gap, each in its own register:

- Volume I covers the system behind AI-built software.
- The guide covers working with AI to make things.
- Volume II covers everyday life with AI.

All three keep the same light, story-like voice. The project is the author's personal synthesis and public portfolio, maintained over the long term ([PDR-005](decisions/pdr-005-project-purpose.md), [PDR-007](decisions/pdr-007-titles-and-positioning.md)).

| Work | Role | Where it stands |
| --- | --- | --- |
| **《AI 写完了，能跑，然后呢？》 / *AI Wrote It. It Runs. Then What?*** | Flagship: the system behind code AI wrote | 51 Chinese pieces and a 209-page A5 edition published; selective revision under way. English: preface and browser chapter |
| **《活交给 AI，我去钓会儿鱼》 / *Leave It to the Agents. I'm Going Fishing.*** | Half-length guide, from vibe coding to agentic coding, using this project as the case | Concept and trial narrative exist; to be restructured into three stages |
| **《省下来的时间，去哪儿了？》 / *Where Does the Saved Time Go?*** | Conversational serial on living with AI | 20-chapter outline and two voice samples; serial not started |

## Order of work · rules for every role and AI

The author, 28 November 2026: the product comes first, and its packaging, including LinkedIn, follows once there is a product. **Version 1 means Volume I is settled and its design is no longer changing.** Recorded in the [PDR-005 amendment](decisions/pdr-005-project-purpose.md#amendment--volume-i-first-promotion-last-28-november-2026).

1. **Do not start a later phase's work until the current phase's completion criteria are met.** There are three exceptions:
   - fixing bugs;
   - noting raw material for the guide (PR links, rework, rejected options), but not drafting its prose;
   - an exception the author explicitly approves.
2. **A new idea outside the current phase goes into the backlog** in the [task queue](tasks/README.md). It is not designed or built.
3. **Promotion work is not proposed before Phase 3.** That covers posts, the résumé, share cards and measurement. It never interrupts writing the book.
4. **The design freezes when Phase 1 ends.** After that, a major change to typography, colour or layout needs a decision record that the author approves.
5. **If it is unclear which phase something belongs to, ask the author.**

## Now · while Codex is unavailable

Codex has no quota, so every Writer and Developer task waits in the [queue](tasks/README.md). Claude holds the PM, Designer and Delivery Lead roles ([team](team.md)) and prepares Phase 1 without making large changes itself:

- **Per-chapter revision plans** for the five flagship pieces and for Part 8.
- **Audience-panel rehearsals.**
- **The V4 reader design:** done on 28 November. The [design of record](design/v4/reader-v4-design.html) covers every Phase 1 screen, and the [T-010 brief](tasks/T-010-v4-reader.md) splits it into seven slices. It waits for the author's acceptance.

## Phase 1 · Volume I v1: the book settles and the design stops changing

**Work.**

- **Close out the process work:** integrate the 27–28 November work, then T-002 and T-004.
- **Rename** to the new titles (T-006).
- **Admit** the revised preface, the trimmed Part 8 chapter, the retitled closing, the part openers and the whole-book map (T-007).
- **Revise the five flagship pieces** (T-011). The Writer's standard-sample r1 drafts are the starting point for the Part 2 and Part 4 pieces.
- **Deepen Part 8**, the thinnest part and the one closest to the title.
- **Run the Part 4 PostgreSQL example** where the facilities allow it.
- **Build the V4 reader** (T-010):
  - typography, the single-column skeleton, and chapter openers and ends;
  - the phone bottom sheet, and text settings (size, paper tone, accent);
  - one style guide for figures, tables and code blocks;
  - part openers and the whole-book map;
  - version status labels;
  - reporting a problem through GitHub.
- **A reading with three to five target readers,** to check whether the writing works. This is not promotion.

**Done when:**

- The framework is fixed, the five flagship pieces have passed review, and Part 8 is deepened.
- The V4 core interface is live and frozen.
- The reader trial is recorded.
- Other pieces carry honest status labels. They do not all need rewriting.

## Phase 2 · The guide and Volume II

- **The guide,** in three stages (T-008 moves its material first). Stage 3 waits until the roles-and-modes workflow has run on real tasks.
- **The Volume II serial**, in Volume I's reader.
- **The remaining Volume I revision batches** as ongoing maintenance: Parts 6 and 7, then Part 3's permission chapter, then Parts 2, 4 and 5 ([revision plan](../book/planning/volume-one-revision-plan.md#revision-order-after-the-flagship-pieces)).
- **A new A5 edition** once the revisions are stable. The 209-page edition stays available until then.

## Phase 3 · Promotion and expansion

- **English adaptations** of the flagship pieces and the guide, mainly for LinkedIn readers. The existing English preface and browser chapter stay.
- **Presentation:** the author and works page, share and quote cards, and RSS.
- **Outreach and measurement:** LinkedIn posts and presentation, the résumé update, Volume II distribution on Chinese platforms, and Umami measurement.
- **Features designed in V4 but not yet built:** the Part 4 interactive figure, chapter transitions and the ⌘K palette. The 3D shelf is also refined.
- **Later features and formats** ([PDR-009](decisions/pdr-009-reader-feature-triage.md)):
  - email subscription and email feedback;
  - glossary cards, reading routes, paragraph links and an update feed;
  - further English adaptations;
  - collecting Volume II into a book;
  - EPUB editions.

## Frozen, and what would thaw it

| Item | Thaw condition |
| --- | --- |
| Web print-edition viewer (facing pages, page turns) | Readers repeatedly ask to read the typeset layout on the web; the PDF link remains |
| Store app | Returning readers repeatedly ask for something the web and PDF cannot do |
| Listening chapter (script exists) | A voice cleared for distribution and an end-to-end listening review |
| Explanatory video and three-card short reads | Posts or readers show a passage that needs motion |
| Topic filters | Enough reviewed chapters and readers asking to browse by question |
| End-of-chapter pull and swipe gestures | Real-device reading shows a need the visible next-chapter control does not meet |
| More AI question cards, side-by-side bilingual reading, a concept map, record import and export, quizzes | Observed reader requests |
| Accounts and sync, hosted AI chat, comments | Paused by the author on 28 November; reconsider only with a clear reader need and a privacy plan |

**Stopped:**

- the offline bookshelf (the PDF covers offline reading) and the live code sandbox;
- the project's own measurement collector (Umami, a third-party service, is planned for later);
- six accent colours, replaced by three accents and four paper tones ([PDR-009](decisions/pdr-009-reader-feature-triage.md));
- standing role chats, replaced by roles as hats bound to tools by mode ([PDR-008](decisions/pdr-008-roles-and-modes.md)).

## Signals to observe

**Phases 1 and 2:** whether target readers can explain a flagship mechanism after reading it, and where they stall. **Phase 3 only:** promotion signals. No targets are set; record what actually happens. Until site measurement starts, use LinkedIn's own post analytics and the replies people actually send.

- chapter visits referred from posts;
- conversations, messages or interviews that mention the work;
- peer shares or citations;
- author-page visits;
- whether target readers can explain a flagship mechanism afterwards.

Visits measure access, not reading or understanding.

## Waiting on the author

- Accept the [V4 design](design/v4/reader-v4-design.html), or say what to change. A Figma seat upgrade is optional now.
- Decide supported devices and browsers ([PRD O04](product/volume-one-public-edition.md#decisions-needed-before-release-scope-is-frozen)) and what English readers see after the Chinese browser chapter is revised (O10). Both have proposals.
- Decide when to run the five-person reading.
- Pick the Chinese platforms for Volume II, in Phase 3.
- Decide the public edition label, from [PRD O01](product/volume-one-public-edition.md#decisions-needed-before-release-scope-is-frozen).
- Choose a series name; "…Then What?" is a candidate.
