# Reading palettes — Beta 2 design and implementation contract

**Historical study — superseded future direction (2026-11-17):** retain the original three-background decisions, variables and review evidence below. They were not implemented and are no longer the target for new code. The [current V2 direction](../archive/roadmap-2026-11-27.md#current-design-direction--milestone-2-refresh-2026-11-17) is neutral Light/Dark/System plus six independent accent choices, designed in a separate Figma page before author-confirmed implementation. This banner changes status only; no old Figma asset, design review, runtime token or permission is changed.

Updated: 2026-11-16 (Australia/Perth). Owner: Coordinator, design/contracts. **Figma design updated and reviewed for technical handoff; production implementation remains on hold.** After the initial planning spike, the author explicitly authorized this document/Figma update. The [actual design review](../reviews/reading-palettes-design.md) records the inspected revision and limits; the author's visual judgment remains separate. The [board](../coordination.md) owns the implementation hold and subsequent assignments. This document does not authorize coding, integration or deployment.

## Decision and purpose

Start with **three reading palettes**, each supporting Day and Night: **six effective visual combinations**, not six independent palette choices. Keep the existing **System / Day / Night** appearance preference separate. A reader choosing a blue surface should not lose automatic day/night behavior.

| Palette label | Direction | Figma Day canvas | Figma Night canvas |
| --- | --- | --- | --- |
| Original | Existing restrained green-neutral identity; default | `#f8faf9` | `#111617` |
| Mist Blue | Low-saturation blue-neutral surfaces | `#f0f5fa` | `#121b27` |
| Soft Grey | Neutral grey surfaces | `#f1f2f4` | `#191b20` |

These sRGB values are now represented in the Beta 2 Figma studies; they are not additions to the production Panda mapping. Original preserves the accepted production surfaces and text roles. Alternate surfaces, secondary text and the picker's scoped control perimeter are recorded below. Subjective distinction/comfort still benefits from physical-display feedback; a later revision must not add colors simply to fill a quota.

The feature serves deliberate reading preference. It is not a color playground, a medical accessibility treatment, an eye-protection claim or a reason to change the default for everyone. No user study establishes an objectively best palette count; three is this project's design judgment based on its quiet reading purpose, small-screen controls and validation cost.

## Why not six, eight, twelve or sixteen palettes?

The following is only a base combination count: palette × two effective appearances × five reference widths. It excludes focus/hover/disabled states, storage failures, languages, browser engines and content variants.

| Independent palettes | Effective Day/Night combinations | Base width/appearance combinations | Assessment for this book |
| --- | --- | --- | --- |
| **3** | **6** | **30** | Recommended: existing identity plus two distinct restrained alternatives |
| 6 | 12 | 60 | No demonstrated need for the additional choices; consider later only for a clear unmet preference |
| 8 | 16 | 80 | More swatches and adjacent-role validation without an identified reading benefit |
| 12 | 24 | 120 | Too much selection UI for the current feature purpose |
| 16 | 32 | 160 | An editor-like customization catalog; outside scope |

Do not add saturated pink/purple/red themes, rainbow grids, gradients or unrestricted hex/opacity pickers merely to increase the count. A later fourth option needs a concrete reader need and a complete contrast/behavior review; more choices are not a release goal.

## Interaction and reading experience

- Place the controls in **Beta 2 Reading preferences / Appearance**, using one labelled group for appearance and a separate group for palette. Do not add a second independent theme engine or make the Header crowded with swatches.
- In Beta 2, the existing Header appearance trigger opens a contextual, nonmodal Reading preferences panel. Include a 44px Close action. Close/Escape returns focus to the trigger; an outside press dismisses the panel without stealing the pressed target's natural focus. Selecting a palette keeps the panel open. Constrain the panel to the viewport with internal vertical scrolling when height is limited; the long Figma artboards do not validate small-height/landscape behavior.
- **Author-confirmed control: exactly three directly visible, clickable color swatches.** Each swatch is the choice itself; do not wrap a tiny sample in a text button, add visible name captions, or hide the choices in a dropdown. Use restrained rounded color blocks in one row, with a thin selected ring and checkmark. Swatches show the candidate surface for the current Day/Night appearance.
- Preserve native radio behavior and accessible names **Original / Mist Blue / Soft Grey** without visible button labels. Optional concise tooltips may identify the shades; selecting must work without a tooltip. The checkmark and focus/selection outlines distinguish state beyond hue; [WCAG Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) requires another visual means when color conveys information.
- The current Original + System default remains until the reader explicitly selects otherwise. Apply on selection, never on hover. Selecting Original restores the palette while preserving the separate appearance preference.
- Preserve scroll position, source content, keyboard focus and layout. Palette selection must not remount the chapter, reset its heading anchor, close unrelated navigation or change text size/weight.
- Avoid color cycling, full-screen fades and animated transitions through intermediate low-contrast colors. Do not add timers, ambient-light sensing or surprise automatic palette changes. Only System appearance follows the existing OS preference.
- Keep the controls reachable and readable at 320px, with the existing 44px product action-target standard. Preserve visible focus, keyboard selection and meaningful accessible names.
- Respect browser/system forced-color and contrast preferences. Do not disable forced-color adjustment to preserve a branded tint. Higher contrast and platform/device checks remain acceptance work, not a claim of this spike.

## Color and design-system boundaries

### Product references and visual direction

Reference research: 2026-11-16. These are interaction/design references, not dependencies, licensed assets to import or proof that this book needs the same number of themes.

| Reference | Documented pattern | What this project should adopt |
| --- | --- | --- |
| [Readwise Reader Appearance](https://docs.readwise.io/reader/docs/faqs/appearance) | Mobile reading themes appear in a row in Appearance; they coordinate background, text and highlights. Theme choice and Light/Auto/Dark are distinct. The documentation includes a Night exception that remains dark. | Most relevant functional reference: directly visible choices, coherent reading colors and separate palette/appearance state. Keep this project's three choices and consistent Day/Night pairing; do not copy the full catalog or special exceptions. |
| [Apple Books reading settings](https://support.apple.com/guide/iphone/read-books-iphc1af7c57/27/ios/27) | Official help describes Themes & Settings for background mode, page theme and typography. | Keep reading preferences in a quiet contextual panel, preserving the chapter as the dominant surface. Theme cards/font bundles are not the requested three plain swatches. |
| [macOS Appearance](https://support.apple.com/en-gb/guide/mac-help/mchl52e1c2d2/mac) and [Apple's Mac Basics guide](https://www.apple.com/hk/en/business/docs/resources/Employee_Starter_Guide_Mac_Basics.pdf) | Appearance separates light/dark behavior from accent/highlight color. The older official Ventura guide supplies an illustration of the color-choice control. | Compact directly selectable color samples and precise selection feedback. Accent color changes controls, which differs from this reading-surface feature; do not transfer its saturated color set or treat an older screenshot as the latest macOS pixel specification. |

Readwise's official [theme-row image](https://docs.readwise.io/images/reader-appearance_theme-row.png), [light examples](https://docs.readwise.io/images/reader-appearance_themes-light.png) and [dark examples](https://docs.readwise.io/images/reader-appearance_themes-dark.png) are linked as references only. No third-party screenshots were copied into the repository or rebranded as this project's design. Readwise's documented reading-theme picker is mobile-specific; its web availability is not inferred.

Source boundary: the Readwise documentation was opened directly. Apple Support search-index excerpts support the functional descriptions above, but direct support-page reads returned HTTP 429 during this pass. The official Apple PDF was accessible; it is explicitly historical. This research is not a logged-in product audit or a claim that every current version uses identical geometry.

The implemented Figma direction is **quiet, precise macOS-style color selection**:

- Three 44px visible rounded swatches, with 48px effective targets and 16px gaps; use the existing 12px control-radius role rather than introducing a new radius for this feature.
- Keep each sample's actual surface color. Unselected swatches have a subtle, legible perimeter. Selection adds a 2px semantic ring separated from the block by approximately 3px, plus a small 14–16px checkmark. Focus must remain visibly distinct from selection.
- No text-button container, permanent visible caption, colored glow, oversized shadow or layout movement. Accessible names and optional tooltips identify the palettes. The three blocks remain the complete selection UI.
- Hover may strengthen the edge without changing the page palette; selection changes the coherent surface immediately. Preserve the current no-flash/no-color-cycle motion requirement.
- In Night, show the actual dark samples with clear outlines/checks. Check that neighboring dark hues remain useful choices on real displays; do not use bright Day swatches as a misleading Night preview.

The Figma review below covers this refinement. The separate browser specimen establishes direct selection, not production implementation. Palette count, Beta 2 timing and the implementation hold remain unchanged.

Change a coordinated set of surface/foreground roles, not the background alone: canvas, surface, subtle/code/table surfaces, secondary text and any necessary control boundaries. Keep the established link/action identity and the meaning of warning/error/success states consistent. Text diagrams and code must remain legible; images and diagrams must not be indiscriminately tinted or inverted.

[Apple's color guidance](https://developer.apple.com/design/human-interface-guidelines/color.md) supports consistent color meanings and checking custom colors across light, dark and increased-contrast contexts. This informs the proposal; it does not prescribe three palettes or certify this website.

Use existing semantic roles and shared recipes. Do not create a token for each page/node, duplicate all component styles or rename the 111 existing Figma variable IDs. The new Figma handoff shows the same representative reading content and preference states in the retained three-page foundation/component/page structure. Beta 1 UI04 remains its accepted baseline; the new studies are explicitly Beta 2.

Text targets: ordinary body, secondary text and links should meet at least **4.5:1** against their actual background; use the same target here even where large-text exceptions could apply. [WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) defines the applicable text thresholds. Necessary graphical/control-state cues should meet **3:1** against adjacent colors under [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Decorative separators and inactive controls are not automatically subject to that same rule. Calculate with unrounded values and check real rendered backgrounds, including opacity/material layers.

## Figma handoff — 2026-11-16

| Source | Link | Actual scope |
| --- | --- | --- |
| Tokens | [Reading palette additions](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=216-24) | Six Day/Night surface-role examples; aliases and geometry contract |
| Components | [Controls and state matrices](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=217-468) | Default/Hover/Focus/Disabled independently combined with selection, in both appearances |
| PaletteSwatch source | [217:418](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=217-418) | 3 palettes × 2 selection states × 4 interaction states = 24 reusable variants; this is still only three reader choices |
| PalettePicker source | [217:467](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=217-467) | Three selected-palette variants, each containing three swatch instances; six cross-selection click reactions |
| Page Designs | [Reading palette studies](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=220-354) | Six 1440px chapter studies plus 320px Day/Mist Blue and Night/Soft Grey; open preferences, diagram, code and comparison table |
| Direct panel preview | [Mist Blue / Day](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=220-688) | Three direct blocks, small check/selection ring, independent appearance group and Close |

The file still has **three pages, four collections and 14 text styles**. Additions are **12 primitive colors, eight semantic colors and two semantic layout aliases**, bringing the design file to **133 variables**. The original 111 IDs/values and the application's existing reference mapping remain unchanged. Original uses `bg/canvas`, `bg/surface`, `bg/subtle` and `fg/muted`; alternatives use `palette/mistBlue/bg/*`, `palette/softGrey/bg/*` and `palette/fg/muted`. The swatch perimeter alone uses `palette/border/control`. Reuse existing foreground, link, accent, notice, focus and radius roles.

New semantic colors alias primitives in the existing Light/Dark collection; no six-mode collection or parallel theme controller was introduced. `palette/target` aliases `space/48`; `palette/gap` aliases `space/16`. The visible sample remains 44px with `shape/control` (12px). A small reusable `Icon/close` (`222:400`) plugs into the existing IconButton's swap slot; it is not another interaction library. Added WEB syntax is a proposed design contract, not generated production CSS or Code Connect.

| Palette | Day surface / subtle / secondary | Night surface / subtle / secondary |
| --- | --- | --- |
| Original | `#ffffff` / `#f0f3f2` / `#5c6b64` | `#1b2425` / `#1b2425` / `#aabbb4` |
| Mist Blue | `#f8fbff` / `#e5edf5` / `#53645c` | `#1b2939` / `#1b2939` / `#aabbb4` |
| Soft Grey | `#fafbfc` / `#e7e9ed` / `#53645c` | `#23262d` / `#23262d` / `#aabbb4` |

The Beta 2 picker perimeter resolves to `#61756a` Day / `#aabbb4` Night. This does not change the established `border/control` role or recolor every existing component. Each swatch always displays its own palette's canvas for the effective appearance, including when another palette is selected.

Figma click reactions illustrate selection changes inside PalettePicker only. Page backgrounds are explicit review studies; the prototype does not automatically recolor the chapter, persist preferences or establish native keyboard/accessibility behavior. Close/dismissal behavior is specified, not wired/validated as an application flow. English UI/layout specimens were reused; no manuscript, translation, image asset or paid service was added.

## Proposed engineering boundary

This is a proposed contract for a later Developer assignment, not code to apply now:

- Palette preference: `original | mist-blue | soft-grey`. Retain existing appearance values `system | light | dark` and the existing controller's effective mode.
- Use one small typed palette-to-semantic-role map with explicit Day/Night values. No backend, account synchronization, model calls, new external fonts or extra UI library is needed for the basic feature.
- Persist only the validated enum locally, independently of appearance. A proposed key is `btf.reading-palette`; retain compatibility namespaces rather than bulk-renaming existing theme storage.
- Missing/invalid/unavailable storage falls back to Original. Failed writes must still allow the current selection in memory. A stale palette value must not prevent the page or appearance controller from starting.
- Resolve the palette before first paint alongside the accepted appearance bootstrap. Avoid a fresh default-color flash before hydration and avoid duplicating competing bootstrap/subscription logic. Test actual emitted scripts and computed styles.
- Returning to Original must not reset System/Day/Night, language, chapter, reading position or other preferences. Cross-tab behavior must use the correct storage area, preserving the previously fixed sessionStorage isolation.

## Spike evidence and limitations

An independent interactive reading specimen was created outside the application. It supports all three named palettes and System/Day/Night, uses fixed layout/type and retains the green link identity. It has no application integration, production storage or network-backed feature. Its Original surfaces/text mirror the current foundation; the study's stronger control-outline candidate is **not** an approved change to the production default.

An offline WCAG relative-luminance calculation checked **96 candidate color pairs** across six variants: body/secondary/link text against canvas/surface/subtle backgrounds, action text, and focus/control cues. Threshold assertions use unrounded values; the table shows rounded minima across the checked backgrounds.

| Palette / appearance | Body minimum | Secondary minimum | Link minimum | Focus minimum | Control cue minimum |
| --- | --- | --- | --- | --- | --- |
| Original / Day | 12.95:1 | 5.03:1 | 6.14:1 | 6.14:1 | 4.41:1 |
| Original / Night | 14.12:1 | 7.90:1 | 10.45:1 | 10.45:1 | 7.90:1 |
| Mist Blue / Day | 12.23:1 | 5.31:1 | 5.80:1 | 5.80:1 | 4.17:1 |
| Mist Blue / Night | 13.15:1 | 7.36:1 | 9.74:1 | 9.74:1 | 7.36:1 |
| Soft Grey / Day | 11.90:1 | 5.16:1 | 5.64:1 | 5.64:1 | 4.05:1 |
| Soft Grey / Night | 13.50:1 | 7.56:1 | 9.99:1 | 9.99:1 | 7.56:1 |

Candidate text/action pairs passed 4.5:1; checked focus/control cues passed 3:1. This does **not** validate all production component states, semantic notices, transparent layers or a complete WCAG conformance level. Numeric contrast does not establish subjective comfort for every reader.

The initial specimen passed **12 viewport/palette/appearance cases** (736/320px × three palettes × Day/Night) plus two System appearance changes; no observed page errors or horizontal overflow, and the choice targets retained at least 44px height. Day/Night screenshots were visually inspected. The author subsequently clarified that the selection must be three direct color blocks; the earlier text-button presentation is superseded by the interaction contract above. Candidate colors and contrast calculations are unchanged. Temporary calculations and browser evidence are under `/tmp/vctw-palette-spike/`; they supplement this durable record. The conversation's interactive specimen is a design study, not a published site or application source.

The revised three-swatch control was checked separately in 12 width/palette/appearance combinations: direct label/swatch clicks change the checked native radio and preview, each target measures 48×48px around a 44×44px visible color block, selection has a ring/checkmark, and 320px layout has no horizontal overflow. Native arrow-key radio selection also passed. A 320px control screenshot was inspected. These checks accept the specimen interaction only; production implementation remains on hold.

At the spike checkpoint, no Figma variables or production theme colors had been written. The later authorized Figma update is recorded above. Not tested: physical devices/displays, Safari/Firefox, forced colors/increased contrast, production first-paint persistence, every code/notice/table/interaction state, assistive technologies or reader comfort.

The final Figma pass independently resolved actual variables from the six desktop studies and checked the same **96 opaque color pairs**: no threshold failures; minimum checked text contrast **5.03:1**, minimum checked focus/control cue **4.05:1**. All eight preference panels contain exactly three distinct samples, 48px choice targets and a 44px Close target, within their screen widths. Two narrow studies contain four 288px local scroll regions around 704px code/table content. Inspected screenshots covered the token reference, component states, desktop Day/Night, the direct panel and narrow Night, including affected rechecks after corrections. These are design/static geometry checks, not production browser acceptance.

## Delivery order and acceptance

1. Resume and finish the current Beta 1 chapter-reader review after the author's usage-limit reset and explicit continuation; do not merge unreviewed reader code.
2. Complete the remaining authorized Beta 1 work through its own assignments/reviews. Palette work must not displace the core reading experience.
3. The Beta 2 design/token update is now complete for technical handoff on the reused UI04 layout specimen, including code, table, navigation and a callout. Before implementation acceptance, repeat the review with actual integrated chapter content and relevant notice states in both appearances; inspect real displays and limited-height viewports.
4. Assign implementation only under a later explicit task. Add meaningful palette/appearance/storage/first-paint and browser regression checks; preserve the current default and unrelated preferences. Extend the production token/reference mapping only as part of that reviewed implementation.
5. Require actual review, unchanged accepted source, exact-head CI and authorized merge. Deployment remains separate.

The author authorized this Figma/document update while holding website implementation. Resetting the limit alone is not a message to resume or permission to skip these gates. No new implementation task is queued by this document.
