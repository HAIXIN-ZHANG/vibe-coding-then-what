# Volume I revised edition · product requirements

Updated 28 November 2026. This document covers what the next public edition of *AI Wrote It. It Runs. Then What?* must do for a reader, and how we will know. The order of work is set by the [roadmap](../roadmap.md) and the reasons by the [decision records](../decisions/README.md). The previous version of this document is [archived](../archive/volume-one-public-edition-2026-11-26.md).

## Reader and promise

**Who it is for.** People who can already build something with AI but cannot explain why it works, or why it breaks. That includes engineers strong in one layer, career changers and newer developers. From Phase 3 (promotion), a second group arrives from LinkedIn or the author's résumé.

**What it promises.** Readers follow one course-enrolment story from a button that says "success", through the page, the API, the database, background work, release, recovery and AI inside the product. Afterwards they can explain why the outcome happened and what would change it. It reads like a story, not a manual.

## What this edition contains

| Area | In this edition |
| --- | --- |
| Chinese manuscript | The 51 published pieces. The new preface opening, taken from the author's voice sample. The eight part openers and the whole-book map. The trimmed Part 8 chapter. The closing retitled 《今天就到这儿吧》. The five flagship pieces revised to the depth standard: the first chapter, browser foundations, the AI-evaluation chapter, and the Part 2 and Part 4 calibration samples ([revision plan](../../book/planning/volume-one-revision-plan.md)) |
| English | Full adaptations of the preface, the first chapter, browser foundations and the AI-evaluation chapter. The other English pages stay as honest overviews that link to the Chinese text |
| Titles | The [PDR-007](../decisions/pdr-007-titles-and-positioning.md) titles across the site. URLs unchanged |
| Reader | The journeys below, in the V4 design (direction A + B): three accent colours, four paper tones, serif body text and margin notes ([PDR-009](../decisions/pdr-009-reader-feature-triage.md)). Quote cards and RSS move to Phase 3 |
| Presentation | Not in this edition. The author and works page, share cards and quote cards move to Phase 3, promotion ([roadmap](../roadmap.md#phase-3--promotion-and-new-features)) |
| Print | The 209-page A5 edition stays as it is. A matching new PDF follows once the whole revision round is stable; it is not part of this edition |

**Out of scope:** accounts and sync, hosted AI and comments (all paused); the web print-edition viewer, the store app and video (paused); the offline bookshelf and code sandbox (stopped); swipe or pull-to-next-chapter gestures; and site measurement, which starts after this edition is public.

## Content standard for revised pieces

- **Open on something a reader can see happen**, not on a definition.
- **Explain the mechanism and its conditions** precisely enough to check. Use a worked example, numbers or a figure where prose alone leaves the reader guessing.
- **Let the reader reason about a changed condition**, so they can say what would happen if one thing were different.
- **Keep the voice:** light, literary, a little humorous, with the author's uncertainty intact. Vary the structure rather than repeating a template.
- **Label teaching assumptions** and keep them apart from the author's real experience.
- **English is an adaptation, not a translation:** it keeps the meaning, the degree of certainty and the comic timing.

## Reading journeys

**P0** must work for this edition to ship. **P1** should work; a known gap is acceptable if it is stated. The current-state column describes main on 28 November 2026, inferred from the reader code and its end-to-end tests. Real devices have not been checked.

| ID | Journey and expected outcome | Priority | Current state | Gap for this edition |
| --- | --- | --- | --- | --- |
| R01 | **First visit.** Start reading and the contents are visible; the first action opens an available chapter. No invented progress | P0 | Exists | Restyle in V4 |
| R02 | **Return visit.** Continue names and opens the saved chapter and heading. From the beginning stays available. A stale record falls back to the chapter honestly | P0 | Exists, at heading level | Copy must not promise exact paragraph return |
| R03 | **Shared link while another position is saved.** The link wins. A missing section falls back within its chapter, with an explanation | P0 | Exists | None |
| R05 | **Change text size while reading.** The passage stays recognisable; body, headings, code, captions and quotes all scale; preferences persist, or are honestly session-only | P0 | Control exists | Default mobile size feels small and the control is hard to find (author feedback). Fix both in V4; check on a real phone |
| R06 | **Open a figure or note, then close it.** The explanation has context; closing returns to the passage and a sensible focus | P0 | Only for specific figures | A general figure view with return. Flagship pieces depend on diagrams |
| R08 | **Read EN or ZH; use contents, next and previous, search and the language switch.** Ordinary paths stay in the URL's edition; an overview offers the Chinese original without pretending to be a translation | P0 | Exists | Recheck after the rename and the new English pieces |
| R11 | **Search, an empty result, or corrupt saved data.** Search covers only available text, with clear recovery; bad storage never blocks reading | P0 | Exists | None |
| R12 | **Switch accent, paper tone, light or dark, reduced motion; a failed image.** Text stays legible and selected controls are identifiable without colour alone; failed images leave captions and a way back | P0 | Six accents exist | Three accents and four paper tones (24 combinations); test failed images |
| R15 | **Report a problem.** From any chapter, a reader can open a GitHub issue with the chapter, section and selected text filled in. Nothing is sent without the reader's action | P0 | GitHub issue draft exists | Make the entry easy to find from every chapter. Email comes later, with the Volume II serial |
| R04 | **Open contents mid-chapter, pick a section, close.** The heading is visible below the fixed controls; focus returns sensibly | P1 | Exists on desktop | Contents in a bottom sheet on mobile |
| R07 | **Bookmark a passage, revisit it, remove it.** It is independent of automatic resume; a failed write never claims success | P1 | Exists | Restyle |
| R09 | **Chapter → book home or book selection → Back.** Labels are distinct; language and place are kept; planned books are labelled as planned | P1 | Exists | Two-book landing becomes three works |
| R10 | **Tablet split view; keyboard and touch.** The passage and figure stay in view; sidebars yield before the prose is squeezed | P1 | Tested in emulation | Real iPad check |
| R13, R16 | **Arriving from LinkedIn at an author and works page; sharing a quote card.** | Phase 3 | Missing | Deferred with promotion (PDR-005 amendment, 28 November) |
| R14 | **Part openers and the whole-book map.** Each part starts with its opener, and the map can be reached from any chapter | P1 | Missing | Reader support for part introductions |

## Verification

- **Devices and browsers:** a real iPhone and iPad in Safari, plus desktop Safari and Chrome. Emulation alone does not count.
- **Coverage:** both languages; four paper tones, each in light and dark; reduced motion; denied storage; a failed image.
- **Audience panel first:** before real readers, the [audience panel](../roles/audience-panel.md) rehearses each flagship piece with the relevant [personas](../audience/personas.md). Its reports are hypotheses for revision, never acceptance.
- **Human reading:** five target readers each read one flagship piece without coaching, then explain the mechanism in their own words. Record where they stalled, separately from what they said.
- **Who records what:** the Developer records build, test and device results in the task file. The Delivery Lead reviews them, and the PM runs the product desk check. The author gives the final reader verdict.

## Signals after release

No targets are set; record what actually happens. For this edition, the signal that matters is whether readers can explain a mechanism, and where they stall. Promotion signals start in Phase 3: post replies, peer shares, and conversations that mention the work.

Site measurement starts after this edition is public ([PDR-005](../decisions/pdr-005-project-purpose.md#decisions)).

## Decisions needed before release scope is frozen

| ID | Decision | Status |
| --- | --- | --- |
| O01 | Public name for this edition. "Beta1" was the author's earlier candidate | Open: author |
| O02 | Languages | Decided: Chinese first, with English for the preface and the flagship pieces ([PDR-005](../decisions/pdr-005-project-purpose.md#consequences)) |
| O03 | PDF | Decided: the 209-page edition stays; a new PDF follows the stable revision |
| O04 | Which devices and browser versions count as supported | Open: author, before V4 acceptance |
| O05 | Chapter gestures | Decided: none in the main flow; an explicit next-chapter control ([PDR-006](../decisions/pdr-006-two-desk-workflow.md#design-amendments-to-pdr-003)) |
| O06 | How much manuscript this edition revises | Decided: the five flagship pieces plus the preface, part openers and Part 8 trim; the remaining parts follow in later batches |
| O07 | Whether the Part 4 PostgreSQL example is promised as runnable | Open: it depends on actually executing it |
| O09 | Email feedback route | Decided: GitHub only for this edition; email later, with a dedicated address ([PDR-009](../decisions/pdr-009-reader-feature-triage.md)) |
| O08 | Which flagship pieces get English in this edition | Proposed: the first chapter, browser foundations and the AI-evaluation chapter; the two calibration samples after their Chinese revision. Author to confirm |

## Design reference and constraints

- **Design system:** the [Editorial Reader design system](https://claude.ai/artifact/YWreQbgH39fzcEYqkFvPXL). It is a proposal until the V4 Figma design is accepted.
- **Figma:** new screens go in the Editorial Reader V4 file. The older file, including the V3.1 candidate, is reference only.
- **Layout:** long-form comfort comes first. Text, code, tables and captions must fit at 320 px and when text is enlarged; a narrow-layout overlap of book-card artwork with its text was seen on 26 November and needs rechecking.
- **Motion:** no scroll hijacking, no infinite animation loops, and an alternative for every action under reduced motion.
- **Language pairs:** Chinese and English screens are designed as matching pairs, with English layer names and reviewer captions placed outside the reader interface.
