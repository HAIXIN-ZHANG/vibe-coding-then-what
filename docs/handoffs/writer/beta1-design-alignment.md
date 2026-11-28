# Beta 1 Design Readiness — Editorial Alignment Audit

Revision: r2 alignment. Date: 2026-11-15 (Australia/Perth). Owner: Writer. Original r1 audit accepted; necessary post-design documentation alignment frozen for review. Task briefs precede their execution evidence. Current tasks/holds belong to the [board](../../coordination.md).

## Task brief

- **Authorization/objective:** the user requested alignment between roadmap, design and code documentation, with Beta 1 as the main design and only a small explicit Beta 2 preview. Coordinator assigned a read-only editorial/reader-flow audit and proposed short English UI copy, not Figma changes or implementation.
- **Workspace/base:** `/Users/haixin/Desktop/code/vibe-coding-then-what`, verified `main` at `630ab7e57dd2139c87e2bdd3e90cd981c008a6fd`, clean at startup. Explicit workdir and absolute edit path used; the old closed board task is superseded only by this narrow assignment.
- **Inputs:** AGENTS → Writer guide → board → task brief; roadmap sections 3/4, vision, README, eight-part outline, initial content contract and UI03 design handoff. Read code/docs only as needed to distinguish current behavior from future design, without modifying them.
- **Only allowed output:** this `docs/handoffs/writer/beta1-design-alignment.md`. Preserve every other source, manuscript, design and configuration; no Git writes.
- **Acceptance:** identify necessary reader-flow omissions/ambiguities and classify Beta 1 must / conditional / Beta 2 preview / Beta 3 future. Distinguish 48 planning units from available prose, English UI from Chinese chapter bodies, missing-language/status/prerequisite/navigation/feedback handling, copy-preview/manual-paste from hosted AI chat, and later reading/audio/export candidates. Provide truthful short English copy without invented English chapters, metrics or release dates.
- **Boundaries/next step:** root Coordinator owns design decisions/Figma operations. No rewritten plan/outline/opening, provider/license choice, new chapter, site work or broad documentation cleanup. Submit actual audit evidence for review, then revise only this assignment's findings; do not treat recommendations as accepted requirements or implemented features.

## Audit findings

**Conclusion:** the roadmap's Beta staging is sufficient for an editorially coherent reading design, but the historical UI03 specimens need explicit content-availability, language, status and preview boundaries before being used as Beta 1 acceptance references. These are document-to-design alignment findings, **not observations of the current Figma canvas**. Coordinator owns actual design decisions and inspection. Current code still has an honest empty reading index, not the proposed chapter flow.

### Evidence actually inspected

| Input | Relevant evidence | Limit |
| --- | --- | --- |
| [Roadmap sections 3/4](../../archive/roadmap-2026-11-27.md#3-reading-product-releases-and-product-rationale) | Beta 1 entry/navigation/readability/static search/language/sharing; conditional card trial; Beta 2 local reading improvements and independent pilots; Beta 3 selective extensions; separate release/content/QA gates | Planning, not delivered behavior or reader-test results |
| [Vision](../../project-vision.md), [README](../../../README.md), [outline](../../../book/planning/outline.md) | Confirmed identity/subtitle, Junior–Senior layered text, eight parts and 48 adjustable planning units, Chinese-first writing, incomplete book/site | No full English corpus, measured outcomes or dates |
| [Initial content contract](../../content-contract.md) | Only opening/G01 reviewed Chinese inputs, explicit IDs/slugs, canonical Chinese routes, no English bodies, other-language index recovery, allowlist/heading navigation | Accepted future implementation contract; not a working renderer. Search/cards are outside the older foundational implementation scope, despite being later Beta planning priorities. |
| [UI03 design handoff](../../design/reading-experience-v1.md), [UI03 review](../../reviews/UI03.md) | Existing home/chapter/search/mobile/question/missing-translation/copy-state specimens; English chapter copy is expressly a specimen; narrow Search/Prompt layouts incomplete; audio later | Historical design documentation read, not a live Figma/node/screenshot audit or visual/accessibility acceptance |
| `site/components/reading-index.tsx`, `site/config/i18n.ts`, route entry points | Reading index renders empty-state copy and issue link; English/Chinese messages and routes exist; main does not render the chapters or implement the proposed search/cards | Limited source inspection, not build/browser/E2E or full code review |

## 1. Beta 1 must — make the minimum reading flow truthful

The following are recommended **design-reference requirements**, not new implementation assignments. A Beta 1 target frame must be labelled as a target when shown alongside today's empty-index code.

| ID / gap or ambiguity | Why it matters / recommended design treatment | Evidence / acceptance question |
| --- | --- | --- |
| B1-01: available reading versus the book plan | Use two distinct areas: available reviewed drafts and an optional compact eight-part overview labelled planned. Do not render 48 active chapter destinations, progress percentages or a complete-book claim. No link to uncreated chapter pages. | Outline + contract: can a reader tell what can be read now versus where the book is going? |
| B1-02: English interface versus Chinese prose | Keep language of interface/navigation distinct from availability of the chapter body. English entry labels must explicitly identify Chinese reading and link to the canonical Chinese chapter. Do not imply an English adaptation exists from an English UI label, specimen title or toggle. | Contract: can an English-entry reader predict the destination language before following a chapter link? |
| B1-03: missing-translation path | When switching from an untranslated chapter, show an explicit explanation and destination to the English chapter index, not a fabricated `/en/read/...` counterpart, empty article, silent text translation or generic 404. A missing page and an unavailable translation are different states. | Contract + UI03 missing state: does the reader have a named route back to available content and retain a clear way to the Chinese chapter? |
| B1-04: readable chapter status | Separate body language and editorial status: Chinese / Reviewed draft. “Research outline accepted” is not a publishable chapter status and should not add F01 to the reading list. Do not expose internal reviewer IDs as user-facing badges. | Contract + README: can a reader distinguish a reviewed, still-evolving draft from a finished edition? |
| B1-05: a useful starting point and local orientation | Global entry briefly states practical development exposure, shared essential/example/optional-depth structure and a clear first reading action. Within actual chapters, show book/part location, heading outline and previous/next derived only from allowed content; at the last available chapter offer contents/planned overview rather than a nonexistent next chapter. | Roadmap + contract: entry → opening → G01 → heading → return/next/contents works without knowing the internal plan. Actual chapter prerequisites/learning outcomes need Writer-reviewed metadata/copy, not invented reading times. |
| B1-06: source/version/context without pretending completion | Keep author/AI disclosure, technical sources and teaching assumptions when rendering. Use actual reviewed-draft/version provenance if available; do not invent a revision date, completion count or performance statistic. The opening's old three-part orientation is already a separately scoped release-alignment dependency; design cannot rewrite it. | Contract + outline: is real source text preserved and known outdated orientation resolved by its owner before being sold as the v1 overview? |
| B1-07: basic search boundary | Search only explicitly approved public chapter bodies/resources, not planning/analysis/handoffs or 48 future labels. Identify each result's body language and heading destination. Provide query-preserving no-results/failure recovery. Clarify current-language versus available-language search before finalizing frames. | UI03 says current-language search; actual initial prose is Chinese only. See decision D1 below rather than silently infer an all-language engine. |
| B1-08: share and report a precise location | Provide stable chapter/heading link sharing and one simple GitHub correction route. A report should name chapter, heading and real source/release version when available, without hidden transmission or fabricated author contact. No comments/login/feedback backend needed. | Roadmap: can a reader copy a location and deliberately open the real issue destination? Prefilled draft text, if later chosen, is still reviewed/submitted by the reader. |
| B1-09: complete basic states and narrow layout | Day/Night/system, mobile chapter menu and in-page outline must retain readable labels, keyboard/focus/close recovery and local code/table overflow. Search must represent empty/failure; missing translation must not rely on a tooltip. Default typography works without Beta 2 settings. | UI03 has partial narrow Search/Prompt guidance only. Actual responsive/focus/clipboard/accessibility tests remain necessary after implementation; no claim from text review. |
| B1-10: return to following the system theme | Expose an explicit System choice alongside Day/Night, with selected state and a clear distinction between saved explicit choice and following the OS. A two-option specimen alone does not explain how a reader resets an override. | Roadmap system/default requirement versus UI03's Light/Dark component description: can a reader deliberately restore system following? Coordinator separately reported this gap from its live Figma inspection; Writer has not inspected the canvas. |

### Short English copy for Beta 1 target frames

These are **proposed UI strings**, not accepted English manuscript titles or changed chapter metadata. In available-content cards, keep the actual Chinese chapter display title from the contract and use the English text below as navigation labels/supporting copy. No new publication date or metric.

| Surface / condition | Suggested short English copy | Guardrail |
| --- | --- | --- |
| Brand | **Vibe Coding, Then What?** / **Understand the Systems Behind Your AI-Built Products** | Exact confirmed identity; not a new English chapter title |
| Global entry | **Built with AI. Now understand what makes it work.** | Supporting UI proposal; no claim AI code is wrong |
| Reader expectations | **Some development experience helps. Start with the essentials; explore deeper trade-offs when useful.** | No level selector or job promise needed |
| Today's repo/documentation entry | **Online reading is in preparation. Reviewed Chinese drafts are available in the repository.** | Current truth, not a launch frame's fabricated live link |
| Beta 1 available-content heading | **Available reading** | Use only if the approved inputs are actually rendered in that target/release |
| English label above opening's Chinese title | **Opening · Read in Chinese** | Link actual canonical Chinese route when implemented, not an English body |
| English label above G01's Chinese title | **Common foundations · Read in Chinese** | The actual Chinese display title stays intact |
| Chapter badge and explanation | **Reviewed draft** / **Reviewed for this version. The book is still evolving.** | Use only actual reviewed inputs; not “complete” |
| Language badge | **Chinese content** | Separate from reviewed status/interface language |
| Planned overview | **Book plan** / **Eight parts are planned. Chapter names and splits may change.** | Do not make every planned unit a working article link |
| First reading action in implemented Beta 1 | **Start reading in Chinese** | Today use explicit repository draft links; do not pretend the site renderer exists |
| Chapter tools | **Contents** / **On this page** / **Previous** / **Next available chapter** | Next exists only where the approved list supplies it; at end use **Back to contents** |
| Theme choice | **System** / **Day** / **Night** | System means follow the device preference; explicit choices persist. State is not conveyed by color alone. |
| Untranslated chapter | **This chapter is available in Chinese. An English version is not available yet.** | No auto-translated text/date promise |
| Explicit language destinations | **Read in Chinese** / **Browse the English chapter index** | English index must honestly explain missing English chapters; no fake counterpart |
| Empty English chapter index | **No English chapters are available yet. You can read the available Chinese drafts.** | Show actual Chinese destinations; do not hide availability under an unexplained disabled item |
| Empty search | **No matching published content. Try another term or browse available chapters.** | Final “published” wording follows actual approved release; do not index private/planning content |
| English-language search with no English bodies | **No English chapters are available to search yet. Browse Chinese chapters.** | One proposed strict current-language policy, pending D1; do not display this as a network failure |
| Search failure | **Search could not load. Your query is still here. Try again or browse chapters.** | Preserve input; don't claim a result count when search failed |
| Sharing | **Copy section link** / **Link copied** / **Could not copy. Select the link to copy it.** | No misleading toast if clipboard failed; retain selectable URL |
| Correction link | **Report a correction on GitHub** | Destination `https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues`; reader controls submission |

## 2. Beta 1 conditional — AI question cards, not a hosted assistant

The roadmap permits a small trial, **not a release prerequisite**. Existing chapter bodies have no assigned/reviewed copy cards. A Figma card may be a clearly labelled illustrative interaction specimen; it is not an approved addition to opening/G01 or a tested prompt. Keep a card-free baseline reading frame so deferral does not block basic reading.

If selected and separately assigned, show the entire editable question/context before copying. Include only necessary, approved passages plus actual chapter/heading URL and revision; do not copy hidden context, internal analysis, private notes or a full chat. A user explicitly chooses what to copy, then pastes/submits in their own tool; the site never automatically sends text, opens a model session or holds credentials. Copy is not model execution and not confirmation of consequential actions described in a teaching example.

| Surface / condition | Suggested English copy | Behavior/authority boundary |
| --- | --- | --- |
| Card label | **Try this question in your AI tool** | Optional learning aid, not “Ask our AI” |
| Preview action | **Review question and context** | Opens the visible/editable material before copying |
| Preview helper | **Check the question and selected context. Edit them before copying.** | Editing applies only to this local copy, not official prose |
| Source note | **Source: this chapter and section** | Attach actual URL/revision in final implementation; specimen notes must not masquerade as real metadata |
| Explicit copy action | **Copy question and context** | Deliberate local copy, no separate ritual consent screen or automatic send |
| Success / next step | **Copied. Paste into your own AI tool and review before sending.** | User controls submission and any account/quota use |
| Copy failure | **Could not copy. Select the text and copy it manually.** | Preserve text/edit state, report accessibly |
| Optional limitation | **Your AI tool's response may need checking against the chapter and sources.** | No promised better answer or approved output |

Candidate example question for a design specimen only: **What is the difference between a request failing and not knowing its outcome?** It fits G01's existing topic but is not a shipped card or evidence of model behavior. No model/provider logo, send button, answer bubble, typing state, token meter or model-selection UI is needed.

## 3. Beta 2 preview — a few labelled future concepts

**Recommendation:** at most two preview compositions, kept outside the Beta 1 primary flow: (1) return to reading/local bookmark and (2) a terminology explanation in context. This is an editorial recommendation about presentation density, not a fixed product quota. Other Beta 2 ideas can remain a short note; no toolbar full of disabled future controls. A preview must carry **Beta 2 concept · Not available in Beta 1**, with prototype-only navigation confined to its preview area.

| Candidate | Possible short English copy | Preview boundary |
| --- | --- | --- |
| Resume/local bookmark — first choice | **Continue reading** / **Save this place** / **Saved on this device** | Only demonstrate **Continue** when the specimen explicitly supplies prior local state. No cross-device/account promise or fabricated progress. Missing/changed heading needs a recovery example. |
| Invalid saved place | **This section has changed. Open the chapter from the beginning.** | A recovery specimen, not a new resume implementation |
| Glossary/context explanation — second choice | **Explain this term** / **Read the full explanation** | Definition must be an approved short explanation/link, not an invented formal glossary. Beta 1 can already use ordinary prerequisite/related-reading links. |
| Reading preferences — note or separate concept only | **Text size** / **Reading width** / **Reset to default** | Candidate after good defaults; no claim current settings persist or an accessibility problem requires configuring them |
| Print styles | **Print this page** | Browser-printing intent, not a validated PDF-export pipeline; not a shipped Beta 1 control |
| One-format export pilot | **Export trial** / **One reviewed chapter · PDF or EPUB** | Choose format only after its own trial scope; no full-book download, ready export or simultaneous-format promise |
| One-chapter listening pilot | **Listening trial · One chapter** | Audio pre-generated/reviewed separately; no working player, duration, voice or “Listen now” CTA until actual asset exists |

Resume, bookmarks, glossary/topic index and reading preferences are useful Beta 2 directions. Print styling differs from an export pipeline; a single listening trial differs from full-book/versioned audio automation. Pilots may be deferred independently of practical reading improvements. Do not imply Beta 2 is scheduled, funded or guaranteed as a bundle.

## 4. Beta 3 future — keep out of the principal Beta 1 frames

Versioned chapter listening/automated refresh, offline website/PWA behavior, selective interactive diagrams and downloadable AI context bundles remain evidence-led candidates after smaller trials. They are different from Beta 1 copy cards, static explanatory diagrams, browser print styles or a Beta 2 one-chapter audio/export test. Cross-device accounts, hosted AI chat, automatic translation and auto-publication are outside planned betas, not simply hidden Beta 3 controls.

Suggested annotation, not a live action: **Future concept · Requires a separate trial and review.** No feature timeline, finished assets, provider adoption or expanded platform architecture follows.

## 5. Decisions for Coordinator before design sign-off

| Decision | Writer recommendation | Impact / unresolved boundary |
| --- | --- | --- |
| D1: search language scope | Retain UI03's strict current-language search for the minimum, with explicit zero-English-corpus explanation and a named Chinese browsing choice. Alternatively approve clearly labelled cross-language discovery before depicting its results. | Do not silently change the content/language contract, invent translation or show English excerpts from nonexistent English prose. Basic search is a Beta 1 plan but a separate implementation scope from the old foundational contract. |
| D2: specimen versus real available content | Use actual opening/G01 Chinese titles and status in one key reading flow; keep the 48-unit map labelled planned. Mark English-prose/AI-card examples as specimens outside the actual availability demonstration. | Design may use labels translated for navigation, but not claim reviewed English chapter bodies or new content metadata. Opening's old structure still needs its separate editorial review before launch overview. |
| D3: question-card release | Keep a card-free Beta 1 baseline; use only a labelled conditional preview until an owner is assigned copy/context review and clipboard/accessibility checks. | No mandatory chapter-card rewrite, hosted model or hidden send action. |
| D4: Beta 2 preview density | Preview local return/bookmark and one glossary interaction separately; mention preferences/print/audio/export without promoting them to primary actions. Category/filter-rich search is Beta 2 unless a separately accepted minimum needs it; ordinary chapter grouping remains Beta 1 navigation. | Root decides the small selection; no engineering assignment or new accepted glossary/audio asset created here. |
| D5: status/feedback/release boundaries | Use Reviewed draft / Chinese content, real issue URL and real canonical chapter/heading destinations after implementation. Licensing/publication prerequisites remain release decisions. | Current code is empty-index foundation; the design audit neither chooses licenses nor declares reading/search live. |

## 6. Suggested read-through acceptance scenario

Coordinator can use the following as a document-informed design inspection, then later code/browser checks under separate scope:

1. From the English home, understand the book/audience and see that only the approved Chinese material is available; the eight-part plan is not a published catalog.
2. Deliberately open the Chinese opening, continue to G01 and inspect a real heading/diagram; retain clear draft/body-language labels and working outline/return controls at narrow width.
3. Choose English from the untranslated chapter; receive an availability explanation and an explicit English-index destination, then find the actual Chinese reading option without a fabricated counterpart.
4. Try a search with no English corpus/no match/failure; recover through a named available-content route while preserving the query as applicable. Share a section and open GitHub correction intentionally.
5. If cards are selected, inspect/edit visible context, copy deliberately, receive success/failure and manually paste/review in an external tool. No request is sent by the site.
6. Move to a separate labelled Beta 2 preview; the primary Beta 1 page still works without resume/bookmarks/glossary/preferences/audio/export.

This scenario has **not been run** against Figma or code. It is a review aid, not implementation/browser/accessibility acceptance or user research.

## 7. Actual verification, limitations and recovery

- Actual startup: new repository path, main/HEAD and clean status checked; all commands use the new explicit workdir. Wrote only this English handoff; no Git operations or source/design changes.
- Read the named local documentation sections and limited current index/message sources. No website browsing, external research, Figma tools/screenshots, build, E2E or reader recruitment. Therefore findings compare recorded contracts and specimens rather than assert a current visual defect.
- Coordinator subsequently reported its own live Figma findings (old brand/three categories, System recovery gap, category/resume scope and fictional English chapter/next specimens). These support the places to inspect, but do not become Writer screenshots or an independent visual confirmation. Coordinator changed the shared checkout to `codex/beta1-design-alignment` from the same base while preserving this handoff; Writer verified the actual branch afterward and made no Git write.
- Actual handoff checks passed: one H1, English text, no conflict/trailing-space markers, consistent table columns, eight relative destinations and one heading anchor. `git diff --check` passed; this new untracked file also received the explicit Python whitespace check.
- Nine protected inputs matched HEAD byte-for-byte: README, vision, roadmap, outline, content contract, design handoff, opening, G01 and F01 analysis. Opening SHA-256 remains `805d2ebd747d63c65f8383275d3a3f709df40e960b0994a71eadc06837dfa8d0`; G01 `b928e5df21876c0ca49a3c227eb6c7e20723b3f22bb9c7cb2d560cc198db62d2`; F01 analysis `abd0c4a77ea3da21db2584b88e544e093eb2693af1f7c499addd0c23719bed52`. No tracked diff existed at that check; Writer's only output is this handoff.
- Recommendations remain proposals until actual review and decisions. Coordinator owns design changes, any updated requirements and subsequent bounded assignments. No new content routes/schema/card assets/English chapters or license decisions were made.

Recovery: this one uncommitted handoff is Writer's only output from main `630ab7e57dd2139c87e2bdd3e90cd981c008a6fd`. Preserve concurrent Coordinator/Developer work; verify actual branch/status/revision, read this brief and review, then respond only to scoped findings. Other product/manuscript holds remain; no task is auto-selected from the audit.

## r2 task brief — necessary alignment after design review

The author required actual design and professional language/typography review before document alignment. Coordinator completed and recorded both rounds in [the design review](../../reviews/beta1-design-alignment.md), accepted Writer r1, then explicitly assigned this second stage. Only `docs/project-vision.md` (reading-product/design pointer), `docs/roadmap.md` (UI04/language-search/conditional-card/preview wording), `docs/stage-summary.zh-CN.md` (one actual-design-versus-shell paragraph) and this handoff may change. Keep the eight-part outline, README, manuscript and content contract frozen; no Beta reorganization or broad cleanup.

Inputs are Coordinator's actual review and stable Figma targets: Beta 1 `129:388`, Beta 2 `129:475`, source pages/components/tokens unchanged in identity. Preserve three pages, 111 variables/four collections and 14 styles; seven added families/21 variants are design evidence, not implemented components. Describe current-reading-language search with honest English empty corpus, conditional editable-copy/manual-paste cards, explicit System/Day/Night and isolated Beta 2 concepts. Beta 3 stays in the roadmap. Professional review is accepted for handoff with author visual judgment retained; no runtime accessibility/implementation acceptance.

Workspace remains `/Users/haixin/Desktop/code/vibe-coding-then-what`, actual branch `codex/beta1-design-alignment`, HEAD `630ab7e57dd2139c87e2bdd3e90cd981c008a6fd`. Coordinator owns Figma/Git; Writer only aligns the assigned explanation after reading actual evidence. Existing shell checks (four tests) belong to Coordinator, not Writer and not conformance proof. Freeze and request affected review; no product/prose hold is lifted.

### r2 actual result and final-source update

Read Coordinator's actual design/professional re-review before editing. Its final mobile-search addendum supersedes the earlier seven-family/21-variant checkpoint: SearchField is separate from Search trigger, mobile has no desktop shortcut hint, and final detailed inventory is eight added families/24 variants. The three pages/111 variables/four collections/14 styles remain. Product documents link the authoritative review/design inventory rather than repeat changing family counts. Writer did not operate or independently inspect Figma.

| Exact file | Necessary alignment |
| --- | --- |
| `docs/project-vision.md` | Restrained macOS-inspired/content-led direction, UI04 review and stable Beta target links, available Chinese versus plan/English specimens, System/Day/Night, language-search/card limits, professional layout and shell-versus-design distinction |
| `docs/roadmap.md` | UI04 reference without Beta/outline restructuring, current-reading-language search and English empty corpus recovery, conditional copy/manual-paste card baseline, isolated Beta 2 concept scope versus print/export/listening pilots |
| `docs/stage-summary.zh-CN.md` | One actual-design paragraph with review/Figma links, final mobile-search distinction, Beta boundaries and clear unimplemented shell status |
| `docs/handoffs/writer/beta1-design-alignment.md` | This second task brief, actual source/evidence and frozen result; original accepted r1 audit/history retained |

Actual checks: four Writer files passed H1/table/whitespace/local-destination/heading-anchor checks (52 destinations, two anchors before the final note; final recheck confirms the same links). Formal alignment text remains English except the designated summary and existing approved identity text. `git diff --check` passed. The six recorded frozen sources—README, outline, content contract, opening, G01 and F01 analysis—have unchanged hashes from the r2 start. Original opening/G01 hashes remain as recorded in r1; no chapter source, slug, metadata contract or AI-card manuscript was added.

No build/browser/E2E, reader test, Figma operation, Git write, license choice or release was performed by Writer. Coordinator's four passing tests are attributed only to the current shell. Other owners' concurrent design handoff/board/source-guide changes are separate, not Writer deliveries.

Please review the affected four-file revision against the final UI04 decisions. Once accepted, only Coordinator integration and any specifically returned feedback remain; no implementation/prose hold is lifted. Recovery uses the same assigned root/branch/base, actual status and this versioned handoff; preserve other owners' files and do not resume from the original r1 recommendation list as an execution queue.
