# Reading experience design — UI04 / Delivery Milestone 1

**Current use — historical baseline:** preserve this Milestone 1/UI04 record and its later quality corrections as reference. The [V2 direction](../archive/roadmap-2026-11-27.md#current-design-direction--milestone-2-refresh-2026-11-17) is a separate page/design gate, with neutral appearance and six independent accents. Three-background and resume specimens below are historical inputs, not current implementation assignments. This closeout does not re-inspect or modify live Figma; inventory statements below belong to their named review dates.

Updated: 2026-11-17 (Australia/Perth). This document retains the **UI04 / Delivery Milestone 1 technical handoff** (historical Beta 1), separately labelled future Delivery Milestone 2 concepts and palette addendum. Coordinator's [design review](../reviews/beta1-design-alignment.md) records that stage's acceptance; later production font/locale/layout corrections and publication evidence belong to the [Pages review](../reviews/pages-release-pipeline.md) and [runtime guide](../../site/DEVELOPMENT.md). The current [whole-product review](../reviews/milestone-1-product-polish.md) is a separate gate. No fresh live Figma inspection or future-palette implementation is claimed. Product Goals and Delivery Milestones are separate terms; historical labels, IDs, filenames and all source sections below remain evidence of their dated stages.

**Target versus implementation:** PR12–16 delivered the theme/components, two-source Chinese reader and [search/sharing](../handoffs/developer/beta1-search-sharing.md). The twenty-eight tests and temporary browser reviews described by that historical stage are not the current suite count. PR20–24 subsequently integrated maintained root/Pages CI/browser checks, manual Pages CD and reviewed production corrections. Actual initial publication and same-source recovery are recorded separately; read [public release metadata](https://haixin-zhang.github.io/vibe-coding-then-what/release.json) for the deployed identity rather than assuming every accepted source revision is live. The [content contract](../content-contract.md) still limits publication to approved sources; AI preview/copy and future palette implementation remain absent. These checks do not certify full UI04/accessibility conformance or accept the entire historical DS01 checkpoint.

**Search/sharing alignment:** Developer read the live SearchFeedback127:95, SearchField139:124, mobile/narrow129:445/134:458 and SectionActions127:160/129:466 through read-only design context for the search/sharing stage. The implementation uses the existing semantic geometry/colors, real input and Close controls, one feedback state at a time and genuine current-language data. English absence is explicit; chapter actions are restrained disclosures beside stable source headings, with actual runtime URLs, manual-copy recovery and reader-reviewed GitHub drafts. Stacked design examples are documentation rather than a product screen. No Figma edit, new asset/font/token mapping, optional AI card or Beta2 control is assigned by this alignment; actual browser evidence and limits belong to the [stage handoff](../handoffs/developer/beta1-search-sharing.md) and [independent review](../reviews/beta1-search-sharing.md).

**Delivery record and remaining gate:** the [canonical ledger](../delivery/milestone-1.md), [board](../coordination.md) and actual reviews own current scope and acceptance. The author superseded the earlier deployment hold; initial public HTTP/Chromium acceptance and validated same-source rebuild/redeploy are observed, while this product-polish revision still needs its own acceptance/integration/public recheck. Moderate development-dependency maintenance, a distinct prior-version recovery exercise and broader browser/accessibility coverage retain their documented limits. This wrapper alignment changes no Figma asset or historical design body; future design work remains separately scoped.

## Independent quality corrections — pending second review

The author separately authorized D-01/D-02 corrections after the minimal release. Existing search nodes [390px129:445](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-445) and [320px134:458](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=134-458) now each show only the absent-English-corpus state with a visible trigger/recovery/return contract. Other examples are independent scenes in the [quality correction matrix239:1026](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=239-1026): Ready, Loading, Results, No matches, Fetch failure and No English corpus at each width. These are labelled design specimens, not six simultaneous runtime states. Existing SearchField/SearchFeedback instances, variable bindings and typography are reused; historical hidden example nodes remain recoverable. New layout containers organize the handoff rather than add a token collection or runtime capability.

The [desktop catalog129:392](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-392) and [mobile catalog129:405](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-405) now each contain two separate existing navigation-component instances with underlined link labels, semantic link color, minimum44px action areas and explicit Chinese-reader hyperlink destinations. The [separate link-contract/state column242:1058](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=242-1058) shows exact paths and existing Hover/Focus variants. Original Chinese title layers are retained hidden rather than destroyed. No future palette/component source, variable/style inventory or permission was changed. Actual execution/limits are in the [correction handoff](../handoffs/developer/quality-findings-2026-11-17.md); the original quality reviewer decides independent acceptance.

## Current design sources and retained identity

Figma file: [Vibe Coding, Then What? — reading design](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-388). This is a descriptive project link, not a claim that a new file was created or every historical folder label was renamed. Exactly three pages remain: Tokens (`0:1`), Components (`22:135`) and Page Designs (`2:2`). Existing node IDs and the **111-variable Beta 1 baseline** are retained. The separately scoped Beta 2 palette additions bring the live design to **133 variables, still four collections and 14 text styles**; the production mapping remains at its reviewed baseline. Legacy BTF style/collection namespaces intentionally preserve compatibility with DS01's saved ID-based mapping; they are not obsolete brand text to bulk-replace.

The UI04 addition comprises **eight families with 24 variants**: six Beta 1 families (including the conditional copy trial and SearchField) and two Beta 2 preview families. The earlier seven-family/21-variant count preceded the final SearchField correction. The later palette addition supplies two more families/27 variants and one close-icon atom, detailed below; these counts describe separate stages, not a replacement inventory. Existing semantic colors, geometry aliases, text styles and auto layout are reused; no new token collection, font package or flattened UI image was needed.

| Current target | Stable node/link | Contract and boundary |
| --- | --- | --- |
| Foundations | [40:12](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=40-12) | Retained primitive/semantic roles and typography; old WEB syntax and DS01 mapping are not Code Connect or generated main CSS |
| Components page | [22:135](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=22-135) | Existing sources plus eight additional families; reuse meaningful structures rather than make one component per frame |
| Page Designs | [2:2](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=2-2) | Beta 1 primary reading and isolated later concepts on the existing page |
| Appearance picker | [127:69](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-69) | Three preference variants: System, Day, Night; explicit return to System |
| Search states | [127:95](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-95) | Ready, loading, results, no match and unavailable; current-reading-language scope |
| Search text entry | [139:124](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=139-124), set [139:134](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=139-134) | SearchField Default `139:128`, Focus `139:130`, Disabled `139:132`; distinct from the search-opening trigger |
| Chapter availability | [127:134](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-134) | Chinese reviewed draft, missing English and planned; specimen labels cannot create published destinations |
| Section actions | [127:160](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-160) | Native section links, copy feedback/manual recovery and deliberate GitHub correction |
| Optional AI question trial | [127:186](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-186) | Editable preview, copied and manual-copy states, conditional on an actually reviewed trial |
| Beta 2 preview families | [127:212](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-212), [127:231](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=127-231) | Two variants each; local return/bookmark and optional reading-preference concepts, outside the Beta 1 baseline |
| Updated Beta 1 states | [129:388](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-388) | Day/Night availability, mobile entry, appearance/language recovery, search, copy and section actions |
| Desktop and mobile availability | [129:392](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-392), [129:416](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-416), [129:405](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-405) | Real Chinese source labels with separate available-reading and planned-map presentation; Day/Night desktop and mobile references |
| 320px search and copy | [134:458](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=134-458), [134:473](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=134-473) | Narrow query/recovery, context and actions; still need real browser/focus/clipboard verification |
| Separate Beta 2 section | [129:475](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-475) | Local resume/bookmark, changed-position recovery, terminology placement and optional preferences; visibly later-stage specimens |

Existing home and seven chapter-layout IDs are retained: `4:11` / `4:220` / `24:71` for home references, and `4:115`, `4:256`, `24:177`, `24:330`, `25:71`, `25:183`, `25:311` for desktop/mobile/Night/compact/tablet/narrow chapter references. Their current baseline is **card-free**. A separate optional trial specimen must not make AI cards mandatory or imply those layouts are rendered by main.

## Beta 2 palette addendum — design only

The author authorized the three direct color-block design on 2026-11-16. [Palette spec](reading-palettes-spec.md) owns the complete interaction/color contract; [actual review](../reviews/reading-palettes-design.md) owns inspection, corrections and acceptance limits. This does not alter Beta 1 implementation scope or resume the paused Developer task.

- [Token additions](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=216-24): 12 new primitives, eight semantic colors and two semantic layout aliases; existing 111 IDs/values retained. New semantic colors use the existing Light/Dark modes. New WEB names are proposed contracts, absent from the production reference mapping.
- [Palette controls](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=217-468): PaletteSwatch set `217:418` has 24 variants (palette × selected × Default/Hover/Focus/Disabled); PalettePicker set `217:467` has three selected-palette variants and six cross-selection prototype reactions. An `Icon/close` atom `222:400` uses the existing IconButton swap slot. Actual native keyboard/focus/persistence behavior remains an implementation gate.
- [Page studies](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=220-354): six 1440px Day/Night studies reuse UI04 English layout specimens, plus two 320px studies with local code/table scroll regions. The [direct Day panel](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=220-688) shows the intended quiet control; [narrow Night](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=220-1558) shows the constrained panel and correct effective-theme icon.

Reader choices are **Original / Mist Blue / Soft Grey**, each represented by a 44px color block in a 48px target with 16px gaps; no visible name captions or text-button wrappers. Selection uses a small check and accent ring; focus has a distinct outer ring. Keep System/Day/Night separate, preserve the default Original and retain semantic link/action/notice meanings. The existing Header appearance trigger can open the expanded Beta 2 preferences; no extra header swatch row is required. Include Close, Escape and outside-press dismissal, viewport fitting and appropriate focus recovery as specified.

The final pass resolved 96 opaque color pairs from actual Figma consumers with no selected-threshold failures, verified three distinct samples in every panel, inspected editable layers and reviewed affected screenshots. It does not establish full accessibility, physical-display comfort, prototype flow completion, application integration, first-paint behavior or limited-height viewport acceptance. UI04's remaining Beta 1 behavior below remains its own contract.

## Current Beta 1 behavior contract

- **Brand and content availability:** use Vibe Coding, Then What? and the approved subtitle. The eight-part map is planned orientation, distinct from the actually approved Chinese opening/G01 inputs. Preserve draft/body-language notices; no invented English manuscript, publication date/count or clickable unpublished next chapter. At the last available chapter, return to available reading. The existing opening's organizational update remains a separate Writer gate.
- **Search:** search approved public content in the current reading language. With no English chapter corpus, show an honest availability explanation and a deliberate link to the Chinese chapter index; do not silently cross languages or fabricate English results. Older English result examples are future-corpus layout specimens, not current data. Distinguish loading, no match and unavailable/index failure, preserve query context and offer retry or browse recovery. SearchField is text entry, distinct from a trigger that opens search; mobile search `129:445` and `134:458` use the actual field and omit a desktop Command-K hint. Rich filters/categories remain later concepts unless separately scoped.
- **Appearance:** the 44px compact header trigger shows effective Day/Night and opens the Appearance picker. It does not expose the stored preference as a misleading two-state toggle. The picker offers **System / Day / Night**, with a clear selected preference and a route back to System. System follows environment; an explicit preference overrides it until changed. Before-paint resolution, persistence/invalid storage, refresh, media changes and cross-tab behavior require implementation evidence.
- **Section links and correction:** use native stable heading links with clear “Copy section link” and “Report a correction” actions. Copy feedback and a visible selectable manual fallback remain available if clipboard access fails. GitHub reporting is deliberate; replace specimen context with real public chapter/heading/revision data only when it exists, without sending private prompt text automatically.
- **Optional question-copy trial:** the seven main chapter layouts remain usable without a card. A separately reviewed trial may expose exact visible/editable question/context, source/version, copy success/failure and manual selection. Readers review/paste into their own tools. No live inference, model keys, hidden automatic transmission or fabricated provenance is implied. Deferral does not block basic reading.
- **Navigation and responsive content:** reuse semantic heading/nav/toolbar/footer structure and real available destinations. Current long branding, ordered part labels, figure/code/table overflow, missing-language explanations and context notes must fit narrow, tablet and wide layouts. Existing UI03 breakpoints/type roles remain design inputs, not runtime acceptance. Reader-facing explanations stay concise; implementation constraints belong in component descriptions and this contract.

## Composition, bindings and review evidence

Coordinator's actual review inspected original home/chapter, Day/Night, 1024/768/320px and new sections, then repeated professional wording/typography/layout inspection. Action names were normalized (Search chapters, Copy section link, Report a correction, Observability & recovery). Variant-text mismatches and narrow clipping were corrected. Desktop availability uses two auto-layout columns, with 704px available-reading content beside a distinct planned-map panel; the eight entries are ordered lines, not spaces used to imitate columns. Day/Night actions remain parallel.

The inspected views remain editable frames/text/vectors/instances, with no full-page UI raster fill. New source families bind semantic color/geometry and text styles. The radius diagnostic was corrected to inspect the **four individual corner bindings**, each aliasing `shape/card`, rather than infer missing bindings from the aggregate key. Existing Inter/JetBrains Mono and Noto Sans SC styles support the English/code/actual Chinese labels. This is not a font-package delivery claim for the website.

Final text-containment inspection found no text exceeding its immediate parent horizontally in the inspected existing principal views and both Beta sections; new family overview frames did not overlap. Specific semantic text/canvas ratios measured by Coordinator: Day default 13.79, muted 5.35, accent 6.54; Night default 16.26, muted 9.10, accent 12.04. These source-color and structure checks do not certify all alpha/state compositions, runtime responsiveness or WCAG conformance.

Durable evidence is the [review](../reviews/beta1-design-alignment.md), exact IDs, scope and limits here. Screenshots/diagnostics under `/tmp/beta1-design-review/` are supplementary; they are neither the sole handoff nor application screenshots. No new access/account audit or Code Connect publication is claimed. Developer's saved DS01 audit establishes agreement with the historical token snapshot, not an automatic verification of every changed live instance.

## Beta 2 previews and outstanding gates

Beta 2 concepts are confined to `129:475` and labelled later-stage families. Resume/bookmarks are local-device ideas with missing/changed-position recovery; glossary placement is a concept, not an accepted glossary definition. Preferences remain optional. No audio player, offline engine, accounts/cloud sync, hosted chat, full-book export or speculative control is promoted into primary Beta 1 reading. Beta 3 stays in the [roadmap](../archive/roadmap-2026-11-27.md); a preview never assigns its implementation.

Technical design/professional re-review is accepted for handoff, with author visual judgment retained. Runtime reading/search/clipboard, theme first paint/persistence/hydration, keyboard/focus/assistive technology, real content/fonts, safe allowlist/index output, root/subpath behavior and release/publication gates remain outstanding. No immediate code-only fix was identified by the source audit; future implementation needs exact assigned files and separate acceptance. Do not run or merge DS01 as a consequence of this document.

## Historical UI03 handoff — preserved record

The following sections retain the UI03 source wording and IDs (headings are nested here for clarity). Former file/folder/brand names, two-state ThemeControl and chapter/question specimens describe that historical revision. Current behavior is the UI04 contract above; old stage/pause language is not an active assignment. Historical [UI03](../reviews/UI03.md) and [UI02](../reviews/UI02.md) reviews are unchanged.

Design date: 2026-11-14. Revision: v3 / UI03. Decision/review owner: Coordinator; this English technical handoff is maintained by Developer under the delegated documentation task. The three-page organization, English annotations, semantic layout and design re-review are complete; author visual acceptance remains pending. The original file and this path are retained. See [UI03](../reviews/UI03.md) and historical [UI02](../reviews/UI02.md).

Figma UI, page titles, component notes and native annotations are English-first, with Chinese only where necessary. Day/Night and the bilingual book plan remain unchanged. UI03 itself did not implement the website. Since then, TS01 merged and DS01 implemented the token/theme foundation pending review; full component/page/browser acceptance remains separate. See the [runtime guide](../../site/DEVELOPMENT.md) and stage handoffs for current code status.

### Design sources

- Team: HAIXIN's Starter team.
- Project: [Beyond the Frontend Folder](https://www.figma.com/files/team/1563112246153281261/folder/690927640). The user authorized its creation and moving this design into it; its location was verified in desktop Figma.
- File: [Beyond the Frontend · Reading Experience v1](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=4-11).
- Exactly three pages: `01 · Tokens` (0:1), `02 · Components` (22:135), `03 · Page Designs` (2:2). Page designs group Day, Responsive, Interactions, Night and Night interactions vertically. Responsive layouts and modes are no longer separate pages. The design uses native text, Auto Layout, component instances and vectors.

| Reference | Figma node | Purpose |
| --- | --- | --- |
| Token reference | [40:12](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=40-12) | Day/Night roles, semantic space/size/radius, typography and recipe examples; replaces 2:65 |
| Component library | [22:135](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=22-135) | 13 expanded families, separated variants, English slots/recipe/behavior notes |
| Page overview | [2:2](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=2-2) | Reading, responsive, interaction and Day/Night references together |
| Desktop home | [4:11](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=4-11) | Brand, reading entry, three learning paths and examples |
| Desktop chapter | [4:115](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=4-115) | Book navigation, prose, on-page outline, diagrams and question card |
| Mobile home | [4:220](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=4-220) | Single-column reading paths and clear entry |
| Mobile English chapter | [4:256](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=4-256) | 17px prose, chapter entry, stacked diagrams and theme choice |
| Desktop search | [7:53](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=7-53) | Query, categories, excerpts and closing |
| Mobile chapter navigation | [7:87](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=7-87) | English grouped navigation and current chapter |
| AI question preview | [7:125](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=7-125) | Inspect question, assumptions and provenance before copying |
| Required states | [7:142](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=7-142) | Empty search, missing translation and copy feedback |
| Night home | [24:71](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=24-71) | Same structure and semantic roles as Day |
| Night desktop chapter | [24:177](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=24-177) | Dark reading, diagrams, question card and selected theme |
| Night mobile chapter | [24:330](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=24-330) | Mobile Night reference |
| 1024px compact | [25:71](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=25-71) | Narrower book navigation; hide the right outline |
| 768px tablet | [25:183](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=25-183) | On-demand navigation and centered prose |
| 320px narrow | [25:311](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=25-311) | Narrow Header retaining action targets |
| Code and comparison table | [22:80](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=22-80) | Technical-reading specimens |
| Responsive/theme notes | [22:119](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=22-119) | Notes moved to Page Designs, plus component annotations |

Chapter names, search results, English prose and code in Figma are layout specimens, not an accepted public table of contents or English manuscript. Mobile specimens changed from Chinese to English design copy without editing `book/`. The accepted [content contract](../content-contract.md) governs actual reading inputs and publication state.

### Visual and responsive rules

Use a lightly translucent navigation layer, pill theme selection, restrained radii and generous reading space. Day uses a pale canvas with deep green accents; Night uses charcoal with soft green accents. Prose surfaces remain solid; materials are concentrated in navigation. This is a web reading design, not a claim to implement UIKit or full Liquid Glass.

- The desktop specimen is 1440px wide, with a 248px book sidebar, prose maximum 704px and an on-page outline on the right.
- The mobile specimen is 390px, with 20px prose gutters, on-demand navigation, vertically stacked diagrams and chapter tools at the top.
- At ≥1200px show both navigation rails; 900–1199px retains a 224px book rail and hides the right outline; 768–899px hides fixed rails and uses 32px gutters; below 768px use single-column prose and on-demand navigation. At ≤360px use Narrow Header and 16px gutters. Specimens cover 1440/1024/768/390/320px; intermediate widths and text enlargement still need implementation checks.
- English UI/prose uses Inter, Chinese long-form styles use Noto Sans SC, and code uses JetBrains Mono. Although SF Pro was listed as available, actual nodes reported it missing, so the initial design used renderable alternatives. Confirm delivered fonts and system fallbacks; do not distribute SF Pro. DS01 currently declares local preference stacks only, without font downloads or a claim that those fonts are installed.
- Desktop prose is 18/30px, mobile English 17/29px; mobile primary headings 32/40px and section headings 24/32px. UI and prose have distinct text styles; preserve Chinese styles for later manuscripts.
- Use a 4px spacing rhythm and 6/12/20px radii. Each theme option has a 44×44px action target; Button, IconButton and navigation controls have explicit targets.
- Inline links are underlined. Navigation communicates selection through position, text and surface treatment. Focus has a visible ring; motion respects reduced-motion preference.

### Tokens and component layers

The user selected PandaCSS. At the UI03 design checkpoint, code still used legacy CSS and no style migration was performed. DS01 subsequently mapped the foundation; that does not imply that all Figma components, Code Connect or later features are implemented.

At the UI03/Beta 1 checkpoint, Figma had 111 variables: 24 primitive colors, 22 semantic colors, 29 raw space/radius/size/stroke values and 36 semantic layout aliases, plus 14 text styles and two effect styles. The later Beta 2 palette addendum above brings the live file to 133 variables without replacing that baseline. Semantic colors have Light/Dark modes; semantic geometry aliases raw values. Roles include `fg.link`, `focus.ring`, `bg.selected`, `bg.hover`, `bg.disabled`, `fg.disabled` and `border.focus`, alongside material/shadow roles.

Name geometry by purpose: `control.paddingInline`, `card.padding`, `prose.blockGap`, `layout.gutterMobile`, `table.cellBlock`, `shape.control`, `shape.card`, `size.actionMin` and `size.proseMax`. These are bound to actual properties, not merely described. Recipe/slot-recipe notes identify properties, slots and states. Pixels in Tokens show resolved values; fixed zero spacing, icon geometry and a few structural sizes do not need unique aliases.

| Layer | Project responsibility | PandaCSS/Figma contract |
| --- | --- | --- |
| Primitives and semantics | Color roles, spacing, type scale, radius | `tokens`, `semanticTokens`, text styles; e.g. `bg.canvas`, `fg.muted`, `accent.default` |
| Basic components | Buttons, links, search entry, badges | Recipes; button Default/Hover/Focus/Disabled and navigation Default/Selected |
| Reading patterns | Navigation items, reading cards, question cards, search results | Slot recipes where needed; shared APIs for repeated structure |
| Page composition | Home, chapters, mobile navigation and search views | Compose existing foundations rather than duplicate them |

These layers are the project's organization, not a universal design-system standard. The design's minimal source set is Button, IconButton, ThemeControl, SiteHeader, ChapterToolbar, Chapter navigation item, Badge, Search trigger, Reading path card, Callout, AIQuestionCard, CodeBlock and ComparisonTable. Button/IconButton have Default/Hover/Focus/Disabled; navigation has Default/Selected/Hover/Focus; Header has Desktop/Compact/Narrow; ThemeControl has Light/Dark. Actual execution remains limited to each assigned stage.

Teaching diagrams preserve editable layers and explanations. Use semantic HTML for prose. Consolidate TOC, search and feedback structures when actual reuse supports it; do not create a component for every frame. Code/table sources are specimens, not connected chapter content at UI03.

All variables have explicit scopes and WEB syntax. The original CSS names were implementation targets, not generated code. DS01's `panda/figma-reference.json` records source IDs, actual alias targets, original WEB syntax and Panda paths; generated variables normalize camelCase to kebab-case. This mapping does not edit Figma or establish Code Connect.

### Historical library options

These UI03 options do not add dependencies to the current foundation task. DS01 uses only its necessary Panda/PostCSS/type tooling; future libraries require their own compatible use case and assignment.

| Tool | Proposed use | Boundary |
| --- | --- | --- |
| [PandaCSS](https://panda-css.com/docs) | Tokens, semantic roles, recipes and responsive conditions | Build-time generation; statically extractable styles and explicit variants |
| [Park UI](https://park-ui.com/docs/introduction) | Selected editable component/recipe sources | Based on PandaCSS and Ark UI; maintain imported source locally, without importing an entire suite |
| [Ark UI](https://ark-ui.com/docs/overview/about) | Headless Dialog/Drawer/Tooltip behavior where needed | Visuals remain project-owned; actual focus, keyboard and screen-reader behavior still needs testing |
| [Lucide React](https://lucide.dev/guide/react) | A few named search/close/menu/copy icons | Import only needed icons; icon-only buttons still require accessible names |
| [Pagefind](https://pagefind.app/docs/) | Candidate for later static search | Validate real Chinese/English retrieval, language isolation and subpaths before selection |

The historical proposal was PandaCSS with a small Park UI subset and Ark UI for complex behavior. Native links, buttons and static prose do not need an interaction runtime solely for consistent appearance. Static export remains the website model; client code is limited to features that actually require it. UI03's recommendations were based on official documentation, not package installation or compatibility tests. TS01 has since completed the actual TypeScript migration; its earlier pending note is historical.

### Interaction requirements

- Search: a visible trigger or shortcut outside text input opens it; Escape/close returns focus. Distinguish loading, results, empty and failure. Preserve the query and offer retry or chapter browsing after failure. Search covers only current-language approved public content; Figma results are specimens.
- Mobile chapter navigation: locate the current chapter; closing returns focus without losing reading position. A modal drawer manages focus and background scrolling; chapter destinations remain native links.
- On-page outline: derive stable anchors from actual headings and expose current position with `aria-current`. Diagrams need text explanations. Wide code/tables scroll locally, not across the entire page.
- AI question card: display the complete copyable content and permit edits first. Include actual confirmed chapter URL, anchor and revision in copied text. Replace specimen metadata with real values. Expose success/failure to screen readers and preserve manual selection after clipboard failure. No model request is implied.
- Missing translation: explain availability and provide an explicit choice instead of silently changing language. The accepted content contract now defines the initial untranslated-chapter behavior; implementation still belongs to PAGE01.
- Theme: follow the system by default; persist an explicit Day/Night choice with priority over system changes. Determine the initial mode before paint; switch text, icons, borders, notices and shadows together. Use opaque fallbacks when reduced transparency or missing blur support requires them.
- Audio remains a later single-chapter experiment; do not present a working player in this iteration. Reading recovery, glossary popovers and paragraph sharing require separate assignments.

Figma contains theme mode/variant actions and retained or reconnected reading/search/question previews. Those connections are not website functionality or complete prototype click acceptance. Actual search, clipboard, focus trapping, shortcuts, scroll behavior, system following and persistence require code/browser evidence.

### Access evidence

SEC01 recheck on 2026-11-14 opened Share and Share settings in desktop Figma: Anyone / View was selected, Edit was not, and view/comment access was explicit. The file list showed Owner and project inheritance; only HAIXIN ZHANG appeared as an inherited editor. No further change was needed. Viewer copy/save/export was allowed; copying does not grant editing of the original. This was not an exhaustive team-membership or account-integration audit. See [SEC01](../reviews/SEC01.md) and the [access baseline](../security/access-policy.md).

Earlier UI02 work tightened the Folder team default from editing/inviting/changing access to viewing/commenting, with the user's explicit confirmation. The file link was **Anyone can view**; inherited editing showed the current Owner, with no additional direct editors found. Owner access remained; unrelated team/project settings were not changed.

These are file/account controls. An agent authorized through the same Owner account may still edit; Figma does not provide Writer/Developer account isolation here. Assigned scope still constrains each role.

### UI03 checks and remaining acceptance

The review covered three pages and 13 component families; all 17 original screen/state frame IDs remain. Screenshots covered Tokens, component overview, Day composition, mobile Day/Night, 320px and feedback states. Fixes addressed Header height/insets, overly wide documentation, black theme-source fallback fills, a filled disabled icon, short swatch rows, and recipe/binding inconsistencies. Search gained loading/failure recovery guidance.

All 111 variable alias targets existed; all 36 semantic layout variables were aliases. No variable used `ALL_SCOPES`, and each had WEB syntax. Inspected page/component Auto Layout children had no structural overflow; repaired token swatch rows passed recheck. Page Designs contained 154 instances and no full-page bitmap. Text and annotations were English. Twenty Day/Night foreground/background pairs met the selected thresholds: normal text 4.5:1 and focus 3:1. This does not certify every state, alpha composition or DOM accessibility behavior.

Mobile Search/Prompt still has behavior guidance without complete separate narrow layouts. Implementation must verify 200% text zoom, keyboard/screen readers, theme initialization and clipboard results. UI03 did not change/re-audit permissions; its access context comes from UI02/SEC01. The design stage itself did not install dependencies, change website code, commit, push or deploy.

Author visual direction, reading comfort and feature density remain acceptance items. Coordinator then assigns implementation, mapping and content scope; the design artifact alone never releases a full rewrite, fonts or publishing. Subsequent authorized DS01/CMP01/PAGE01/QA01/DEP01 gates are recorded separately and are currently paused. Complete the current documentation review/integration, then discuss overall project design before any resumption.

### UI02 historical checks

UI02 inspected 17 screen/state frames, with screenshots of home, Day/Night desktop/mobile chapters, compact/tablet/narrow layouts, dark search/question previews and code/table specimens. Fixes addressed 320px Header overflow, tablet footer width and Night theme selection. No missing fonts remained in inspected pages; final responsive specimens had no horizontal overflow. At that checkpoint, 55 variables had explicit scopes and WEB syntax.

Eighteen resolved semantic foreground/background pairs met the selected targets: text 4.5:1 and control boundaries 3:1. Body/canvas contrast was approximately 13.79:1 Day and 16.26:1 Night; secondary text/canvas 5.35:1 and 9.10:1; button text 6.86:1 and 12.04:1. These checks do not cover every alpha layer/state or establish full accessibility conformance. References: [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) and [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials), used sparingly for sustained reading.

## V2 footer attribution — local candidate

Historical r2 placement: the reader portion was superseded by the author-approved r3 dock below. This specimen remains the home/directory/non-reader footer reference; it is not the current reader composition.

The2026-11-20 author-approved amendment removes the unclear bare pen name from [BookNavigation](../../site/components/reading/book-navigation.tsx) and places a labelled byline below the book title in the existing [DocumentLayout](../../site/components/document-layout.tsx) footer. The design reference is [the footer specimen297:122](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=297-122), with [Chinese desktop297:123](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=297-123) and [English narrow297:128](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=297-128). The title uses the existing14px UI role; the secondary author line uses the existing13/20 small role, semantic muted text and natural wrapping. Feedback remains a separate action; narrow layouts stack it below the identity. No card, avatar, new font/profile link or copyright/license change is added.

The current UI locale selects explicit Author/作者 labels and the approved README identities, centrally defined in [i18n](../../site/config/i18n.ts): Jar & Prince Explore the World / 缸子太子与世界. The [introduction's formal author line](../../book/drafts/zh/00-before-we-start.md) and manuscript bytes remain unchanged; no per-chapter header byline is added. The [r2 Developer handoff](../handoffs/developer/v2-reading-polish.md#r2-assignment--explicit-footer-author-identity) owns actual implementation/checks and remaining limits. This is a local candidate, not a public release; earlier design evidence above remains historical.

## V2 reader information dock — r3 local candidate

Historical r3 visual treatment: its fixed-bottom composition remains, while the selected r5A refinement below replaces its stacked author/underlined feedback styling.

The author rejected the reader's whole horizontal footer and selected the bottom of the expanded book sidebar. References: [desktop dock299:3](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=299-3), [mobile chapter menu299:14](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=299-14), and transparent44px feedback targets [300:2](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=300-2)/[300:3](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=300-3). The dock shares the sidebar surface with a subtle divider: author caption12/19 without a colon, approved name14/22 medium, and quiet feedback13/19. It adds no repeated book title, card, avatar, font or decorative asset.

[BookInfo](../../site/components/reading/book-info.tsx) is a server-rendered slot supplied by [ChapterReader](../../site/components/reading/chapter-reader.tsx) to [ReaderLayout](../../site/components/reading/reader-layout.tsx), structurally separate from the desktop navigation scroller. At short desktop heights the full rail can scroll; mobile/no-JS places the same information at the end of the existing scrollable chapter disclosure. Collapsed/hidden sidebars use existing expand/reopen recovery. Reader pages hide the global horizontal footer through structural CSS; non-reader pages retain the r2 reference. Approved localized identities, the introduction's byline and manuscript/source contracts remain unchanged. The same [Developer handoff](../handoffs/developer/v2-reading-polish.md#r3-assignment--reader-information-dock) owns actual checks, limits and affected review; implementation is not publication or broader device/AT acceptance.

## V2 reading toolbar, links and credit — final local candidate

R4 references: [1188px reading column302:6](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=302-6), [390px Night expanded302:14](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=302-14), [320px enlarged302:25](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=302-25), [Day302:34](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=302-34) and [Night302:48 link states](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=302-48). Only navigation remains sticky; truthful language/draft status scrolls normally.18px list icons,44px targets, neutral surfaces and accent focus retain native disclosure/overlay behavior. The visible label stays constant to match its accessible name, with native expanded semantics and selected surface expressing the open state.52px is a default row baseline, not a fixed height. Empty wide-screen tools are hidden; measured and scalable no-JS heading clearance remains. Specimen cards/fonts/paragraphs are excluded.

Prose links inherit body typography with subdued Light `#455D80`/Dark `#B0C7E3`,1px underline/3px offset, primary-text hover/2px underline and accent focus. A0.075em inline edge margin supplies optical separation without editing text or adding tracking. Links wrap naturally; heading anchors/section actions/navigation remain outside this treatment.

R5 selects A: [248px Day305:8](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=305-8), [224px Night hover305:22](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=305-22), [mobile focus305:65](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=305-65) and [18px message source305:84](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=305-84). Caption/name share a naturally wrapping row; neutral message-icon feedback stays separate with44px target, no default underline, neutral hover and2px accent focus. The inset divider,14px following space,4px credit/action gap and8px bottom preserve the secondary hierarchy. Existing system fonts, approved identities, mobile/no-JS access and fixed desktop composition remain; B, cards, avatars and new profiles are excluded. The [same handoff](../handoffs/developer/v2-reading-polish.md#r5a-closeout-assignment-and-implementation) records actual final checks and limits. No deployment is claimed.
