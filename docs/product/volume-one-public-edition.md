# Volume I public edition · product requirements

Status: draft for scope and feasibility review. Prepared 26 November 2026 by Product & Design Lead · Reader Experience. Originally prepared against integrated main `c50854f`; the M4 scope amendment below uses main `9742626` and author direction confirmed on 26 November 2026. This document specifies the next reader-facing edition; it does not certify the current release or authorise every implementation slice. The [board](../coordination.md) owns assignments and the [release ledger](../delivery/milestone-3.md) owns delivered evidence.

## Reader and purpose

The core reader is a Full-stack AI Engineer who can build something with AI and wants to understand the decisions and systems needed to deliver it. Product managers, designers, frontend/backend engineers, cloud/operations and data practitioners should also be able to enter the relevant part without reading every earlier chapter.

The reader should be able to follow one meaningful question from intention through design, implementation, data, delivery and operation, explain the mechanism, and reason about a changed condition. The book should sound like an observant practitioner: natural, precise, sometimes amused and sometimes unsure. A literary voice and technical depth support the same task.

The website lets someone discover the book, start reading, find a topic, inspect an explanation and return after interruption. A reader can currently use the web edition or the existing A5 download; the new edition must describe any difference between those editions honestly. Presenting the work publicly should not require a reader to understand our delivery process.

## Baseline and unresolved quality

| Area | Evidence at this draft baseline | Consequence for the next edition |
| --- | --- | --- |
| Chinese book | 51 published pieces; the [making-of reading order](../../book/revisions/zh/volume-one-making-of/README.md) is the comparison edition | Preserve it while revising; an existing full draft is not evidence that the author's new depth concerns are resolved |
| English | Two full adaptations and two overviews, recorded in the [edition registry](../../site/content/english-edition.ts) | Show actual availability. Do not infer translated text from an English design specimen |
| Print | Reviewed 209-page A5 identified by [edition metadata](../../book/print/volume-one/edition.json) | Keep its identity. New manuscripts do not silently update this PDF |
| Reading size | Existing [control](../../site/components/ui/reading-size-control.tsx) adjusts the chapter preset and body/title/heading/code/notes separately | Improve discovery and default reading comfort; reuse the feature rather than build a second preference system |
| Bookmarks and resume | Existing [passage tools](../../site/components/reading/passage-tools.tsx); local reading position, books and locale-aware navigation | Automatic Continue currently resumes at heading level; browser Back can preserve a more precise viewed position. Keep bookmarks separate and preserve current data or provide a tested migration |
| Visual direction | V3.1 candidate and subsequent motion/reader decisions; paired language and device work incomplete | A design reference is not implemented or accepted behaviour |
| Feedback | Author reports shallow technical explanations, uneven text comfort and unclear controls; simulated personas supplied further hypotheses | Track author feedback separately from independent human sessions; no usability success rate has been measured here |

Writer and Developer supplied separate read-only scope/capability audits on 26 November. They confirm the existing eight-part manuscript coverage and role-based text controls, while distinguishing the unadmitted samples, unexecuted PG18 concurrency example and untested rendered text roles. Delivery retains their exact-version evidence in the scoped review. Any subsequent implementation-readiness claim must refresh those checks for its candidate. Reading source code here establishes that a capability exists, not that it is easy to use.

## Edition boundary

The first volume and its core reading paths take priority. The life volume and professional production guide have separate outlines and are not release prerequisites. Keep the existing second-book overview accurate; no new second-book chapters are required for this edition.

### Confirmed M4 first batch

On 26 November 2026 the author accepted a Chinese-first revision: assess all eight parts against the deeper explanatory standard, improve weak sections and their connections, and preserve sound material rather than rewrite all 51 pieces. This is the direction for the revision round; the board assigns its individual batches.

The current batch refines the two reviewed calibration chapters into reference samples, adds only necessary explanatory diagrams/tables, and checks the database example against available execution facilities. In parallel, pair the existing reader designs in EN and ZH for home, reading, contents, text settings and note/figure return. Reuse the published bilingual browser chapter for paired reading content; an English design specimen is not a new approved translation. Website implementation and the remaining manuscript batches follow review of these samples and designs and require their own concrete assignments.

Preserve the current two full English adaptations and two overviews with accurate availability; full-book translation is not part of this batch. After the revision round stabilises, deliver a matching new PDF alongside that revised reading edition. Keep the identified 209-page comparison intact until then. These samples are not admitted web sources or a replacement PDF merely because this scope is confirmed.

Content requirements below apply to the assigned chapters and their immediate joins. Reviewing the eight-part structure does not itself assign a new system map, expansion of the closing chapter, or a rewrite of every piece. Identify those changes from actual gaps before assigning them.

Required outcomes for scope review:

- Any authorised revision within the eight-part book follows the [content map](../../book/planning/outline.md#revision-2026-11-26) and [editorial baseline](../../book/planning/editorial-brief.md). Each included revised source has concept, manuscript and reader review.
- A new visitor can find readable material; a returning visitor can deliberately resume or begin again.
- Readers can find a chapter or section, move between chapters, inspect a note/figure, and return to the same context.
- Default mobile text is comfortable on the agreed real devices; text controls are discoverable and do not break the reading surface.
- The URL edition governs interface language and ordinary navigation. Translation availability remains truthful.
- Links, controls, focus, overlays and saved state remain usable across reflow, interruptions and failures.

Out of this edition's core implementation scope: accounts, cloud synchronisation, a hosted AI assistant, public comments infrastructure, a native store app, automatic video narration, a complete new illustration catalogue, and the second book/guide's full manuscripts. These can only enter through an explicit scope decision. Existing share/correction/copy-context, sidebar collapse/resize and book navigation are preserved.

## Content acceptance

Each chapter selected for revision opens with enough orientation to understand the question, supplies the conditions behind its mechanism, and gives a worked example or explanatory visual where prose alone is insufficient. A reader should be able to explain why the outcome happened and what would change it. Use flexible narrative structures rather than mechanically repeating five headings.

The eight-part assessment should examine how the system and its decisions connect and whether a whole-book orientation/system map is needed; creating that map requires an assigned task. Within the selected scope, give each revised part an understandable starting situation and resolve its problem before passing its consequences onward. Product and design decisions receive the same explanatory care as API, database, cloud and on-call work. Keep the discovery, experimental evidence and delivery decisions visible.

Original portable cases may supplement the course/handout thread. A familiar banking-transfer problem can explain an invariant without reworking someone else's distinctive story. State teaching assumptions, distinguish author experience from fictional dialogue, identify example records near their first use, and label referenced figures/tables. Keep source and reuse checks in the chapter workflow. The author's voice and meaning govern English adaptation, including humour; literal translation is insufficient.

The two calibration chapters test evidence-to-design decisions and transaction/concurrency depth. Their acceptance does not approve all 51 revised pieces or a new PDF. If a later batch assigns revision of the off-duty closing, develop concrete choices and reflection without turning them into promises of employment, health or financial outcomes. The life volume carries the longer social exploration.

## Reading journeys and acceptance scenarios

These are requirements to test against the candidate, not claims of current acceptance.

| ID | Task and starting condition | Observable outcome and recovery |
| --- | --- | --- |
| R01 | First visit, no valid local position | Start reading and contents are visible; the first action opens an available chapter. No invented progress or objectless Bookmark action |
| R02 | Valid saved position, return via home | Continue names and opens the correct saved chapter/heading in the current edition; do not describe this as exact paragraph restoration. From beginning remains available. A stale record offers an honest chapter-level fallback rather than a dead destination |
| R03 | Open a shared section URL while a different position is saved | The explicit URL wins. It is not replaced by the saved location. A missing section falls back within the appropriate chapter with a comprehensible explanation |
| R04 | Open contents from mid-chapter, choose a section, close contents | The chosen heading and opening passage are visible below fixed controls. Dismissal returns focus appropriately and does not jump to the chapter start |
| R05 | Change body size while reading, then change another text role or reset | Controls show the effective choice. The relevant passage remains recognisable; inspect actual body, H1/H2, pre/inline code, caption, figcaption and blockquote rather than only CSS variables. Prose, code, tables and captions remain accessible. Text settings do not enlarge raster/SVG lettering; inspect those separately. Preferences persist when storage is available; session-only behaviour is honest when it is not |
| R06 | Open a note or figure, inspect it, close/Back | The explanation has context and a clear exit. Return restores the invoking passage and sensible focus. Expanded content does not leave a persistent panel over the next paragraph |
| R07 | Bookmark a specific passage, revisit it, remove it | The target is identifiable. Automatic resume remains independent. A failed write does not display a durable success; preserve access to copying the passage link |
| R08 | Read EN or ZH; use contents, next/previous, search and language switch | Ordinary paths remain in the URL edition. A deliberate switch retains the corresponding chapter when available; an overview clearly offers the Chinese original without pretending to be a translation |
| R09 | From a chapter, visit its book home or the book selection page, then Back | Both destinations have clear distinct labels. Same-language navigation and the original reading location are retained; a planned book is labelled as such |
| R10 | Resize tablet to narrow split view, or switch between keyboard and touch | The passage/figure remains in context. Sidebars yield space before squeezing prose; focus is visible and does not remain inside an unavailable panel |
| R11 | Search for a section; encounter empty results or a malformed saved item | Search exposes only available body text with understandable edition-specific recovery. Invalid stored data does not prevent ordinary reading |
| R12 | Switch appearance/accent, enable reduced motion, or fail an image load | Text remains legible and selected controls identifiable without colour alone. Reduced motion preserves all actions and state. Failed images leave meaningful text/captions and a working return path |

## Design reference and constraints

Use English for design page/frame/component names and review notes. Pair EN and ZH equivalents by journey, viewport and state; put English reviewer notes outside the Chinese interface. Latin-script and Chinese samples guide future localisation but do not prove Japanese, Korean or other languages are supported.

- [Reader V3.1 review](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=470-1675): candidate, not a complete working prototype.
- [Motion and illustration](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=481-1669): finite feedback and explanatory states; playback and implementation checks remain necessary.
- [Book layout studies](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=473-1669): proportions and hierarchy, not a complete printable edition.

Neutral light/dark surfaces, independent six-colour accents, restrained borders/shadows and stable body text remain the direction. Do not copy an exported infinite animation loop into the product. No scroll hijacking or mandatory gesture; every navigation action needs a discoverable alternative. Chapter swipe versus viewport pagination is unresolved and is not a dependency of ordinary chapter links. The early HTML motion study is older than the final first/return and Bookmark copy.

A 26 November candidate check at 320 px also showed book-card artwork overlapping title/description text; preserve this as a narrow-layout finding to reproduce against the implementation baseline and repair in the appropriate reader slice. It is not evidence that the candidate header change caused it. Long-form comfort has priority over an impressive transition. Inspect actual long titles, paragraphs, inline links, code, tables and captions; do not certify a blank mock-up. Specific font sizes, line lengths and final illustration treatment belong to the M4 design/proof task, with the author's real-phone feedback as an input.

## Proposed verification plan

Existing 320/390 px phone layouts, tablet landscape/narrow split view and desktop are useful candidate test conditions, not a promised support matrix. Confirm devices, browser versions, zoom and text settings in O04. Compare both available languages and twelve light/dark × accent combinations, plus System switching. Check keyboard/focus, reduced motion, failed storage, missing assets and restored old records. A responsive emulator does not replace real iPhone/iPad reading.

For a human read, ask a participant to find a topic, read a passage, enlarge text, inspect a figure and return after interruption without coaching where the controls are. Record observed obstacles and the participant's account separately. Recruitment and a sample size are not claimed or assigned by this document.

Before release, Delivery supplies exact source/build/commit identities and engineering results; Product reviews the corresponding reading journeys. Author approval covers manuscript voice and material scope decisions. Unresolved blockers remain explicit. Do not weaken navigation or content checks because visual design is changing.

## Decisions needed before release scope is frozen

| ID | Decision or remaining detail | Current treatment and status | Owner / when |
| --- | --- | --- | --- |
| O01 | Public edition name/version | “Beta 1” is the author's candidate label; internal Delivery Milestone numbers and historical aliases stay unchanged | Author with Product, before release naming/copy |
| O02 | Required launch languages and translation coverage | Confirmed for this round: Chinese first; retain two English adaptations and two overviews with accurate availability. No full translation batch | Writer/Delivery preserve availability; Product reviews language paths |
| O03 | PDF and revised reading edition | Confirmed direction: synchronise a new PDF once the revision round is stable; preserve the 209-page comparison. Exact export and release batch still needs assignment and review | Writer/Developer prepare matching sources and export; Product/Delivery verify before release |
| O04 | Real devices/browsers, type defaults and measurable acceptance | Use the proposed verification tasks to choose targets; do not invent a universal size or declare untested devices supported | Product/Developer and author, before design acceptance |
| O06 | Manuscript depth included in this round | Confirmed direction: assess all eight parts and deepen weak areas, not a blanket rewrite. Current writing assignment covers only the two reference samples; later batches and the final release content list follow their review | Product/Writer identify gaps; Delivery assigns bounded batches |
| O07 | Are executable database examples a public promise? | PG18 examples currently have source-backed reasoning and paper traces; no local dual-session PostgreSQL execution is claimed | Writer/Developer with Product, before describing the example as verified runnable |
| O05 | Scope of new chapter/page gestures | Retain explicit next/previous and browser Back; a gesture study is optional | Product with author, only if a later slice proposes it |

O02, O03 and O06 record confirmed direction with the execution limits above; O01, O04, O05 and O07 remain unresolved. The header repair and requirements-document integration are complete at the amended baseline. Remaining open decisions do not prevent the assigned sample and paired-design work. Any next design slice must identify which decisions it depends on. The [decision index](../decisions/README.md) records accepted direction separately from these proposals.

## Delivery sequence

1. Close the existing code fix and keep author main clean; preserve comparison sources.
2. Review this PRD, the [migration table](document-migration.md) and decision records against Writer/Developer findings.
3. Run a documentation-only recovery check; record the reviewer’s existing project experience and resolve ambiguity in the sources rather than a private explanation.
4. Apply the confirmed first-batch scope, refine the two reference samples and pair the designs. Resolve relevant remaining decisions before assigning one complete reading journey for implementation.
5. Review that journey on its exact candidate, then expand. Admit manuscripts and export artifacts only through their separate gates.

The board owns who is working now. This sequence is not a second task queue. No date, business metric or universal method validation is promised.
