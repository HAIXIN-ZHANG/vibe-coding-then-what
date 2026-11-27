# Reading experience V2

> **Historical design reference, 28 November 2026.** The V4 design replaces the V2 and V3.1 candidates: one design system with three accents, four paper tones and serif text ([PDR-009](../decisions/pdr-009-reader-feature-triage.md)), drawn in the Editorial Reader V4 Figma file. Frame identities and review evidence below stay valid as history. Current requirements are in the [PRD](../product/volume-one-public-edition.md).

Author design review · 21 November 2026. The layouts below describe the proposed reading experience. The density comparison uses an earlier local manuscript fixture. Implementation status is tracked separately on the [board](../coordination.md).

Use [16 · Editorial reading experience](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=320-147) for the editorial homepage, return visits and compact navigation. [17 · Reading details](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=327-200) holds the current section toolbar, correction and copy feedback, rail, pagination and reference links. The [V2 design index](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=267-33) links to existing reader foundations, earlier explorations and candidates. The frames show representative states. The website implements the transitions.

## Reviewing the Figma file

Start at the [design index](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=267-33). Follow a reader from the [two book homes](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=353-232) to the [book selector](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=357-234). Use the [paired typography specimens](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=339-200) to compare the same layout in English and Simplified Chinese.

Name project-owned design files, folders, pages, sections, components, variants and layers in English. Give a layer a functional name such as `Resume reading link`. Distinguish locale and viewport where useful, for example `Work book home / ZH / Mobile`. Keep the actual interface copy in the language of its edition.

Place a short English caption directly beneath each Chinese screen or documented state, outside the prototype frame. Describe the reader’s action and its outcome. Call out an unavailable translation or a proposed interaction when it affects what the reviewer sees. At handoff, check the caption at canvas scale, the localised copy in Present mode and the destination of each changed interaction.

## From the homepage to the first chapter

The first screen pairs the approved title and byline with the matching Route C cover. A new reader can open the introduction directly or scroll into an excerpt and the available chapter list. English entry points open an English chapter overview while a translation is pending. That overview offers the Chinese original explicitly. The enrolment illustration accompanies the system overview chapter. Planned themes remain distinct from readable chapters. [English desktop](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=320-152) · [Chinese mobile](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=320-180)

Use the existing [localized identity](../../site/config/i18n.ts), [homepage copy](../../site/components/home-content.ts) and [Route C artwork](../../book/assets/covers/cover-c-route-en-zh.png) when updating a frame. Verify both visible cover titles against the interface. The web thumbnails and Figma fills share the same artwork.

Use the URL to determine the edition. The English home, directory and chapter use `/`, `/read/` and `/read/<slug>/`. Their Chinese counterparts add `/zh`. The [language control](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=325-189) switches to the corresponding page. Maintain the current edition across ordinary navigation, resumed reads and refreshes, including under the Pages base path. The [English chapter overview](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=333-267) gives the title, a short reason to read the chapter and a plain language-availability notice. “Read the Chinese original” opens the matching Chinese chapter. “Chapters” and “Next chapter” keep the reader in English.

If English search has no translated material to search, say so and offer the English chapter directory. A saved Chinese heading leads to an English chapter overview from the English interface. Opening that overview should preserve the original Chinese reading position. Restore a fragment across editions only when the target heading has a verified counterpart. Otherwise open the matching chapter at its start.

## Edition typography and language review

[18 · Edition typography](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=339-200) pairs equivalent content at identical widths. Compare the [English](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=339-204) and [Chinese](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=339-233) 980 px homepages for title wraps, byline, subtitle and excerpt. Compare the two 390 px views for reading rhythm. The English article excerpt is design copy only. Until a translation is reviewed and admitted, the English chapter URL uses the availability view in section 17.

| Edition | Reading specimen | What to preserve |
| --- | --- | --- |
| English | Inter, 16 px on 25 px leading | Wrap at words. Let titles and buttons grow with their labels. Inspect long words, diacritics and paragraph spacing in each new Latin-script locale. |
| Simplified Chinese | Noto Sans SC, 15 px on 26.25 px leading | Respect full-width punctuation, Chinese line breaking and mixed technical terms on the text baseline. Keep paragraph gaps near 14 px at default zoom. |

Font names identify the design specimens. A system fallback needs equivalent coverage and visual review. Japanese and Korean can reuse page structure; choose local fonts and review character forms, mixed scripts, punctuation, word spacing and wrapping with readers of each language. These are extension references for future decisions.

**Language acceptance for a future implementation.** Read each URL entirely in its own language, including page title, cover and alt text, byline, navigation, search results and empty states, reading progress, previous/next chapter names, menus, button tooltips, screen-reader labels, clipboard failures, feedback, page errors and shared-link previews. Use “Language / English / Simplified Chinese” in the English picker and “语言 / 英语 / 简体中文” in the Chinese picker. Only choosing the other edition or the explicit original-language action crosses editions. Share URLs, code, faithful identifiers, official product names and established technical terms such as AI or HTML retain their necessary spelling. Translate editorial labels such as “design system” to “设计系统” in the Chinese contents.

Check both a fresh visit and a Chinese saved position opened from the English homepage. Use localized chapter titles in the return action; omit an untranslated section label or offer the English overview. An empty English search offers its English directory. Inspect narrow and wide screenshots and the accessible names in both locales; record each accidental foreign string with its screen, state and expected copy. For each edition, review a real phone, enlarged text and actual font fallback before accepting the reading layout.

## Reading density

At the default browser text size, the homepage excerpt label is 18 px and its chapter list titles are 16 px. Chinese chapter paragraphs use 15 px type with 26.25 px line height and 14 px vertical margins. Chapter and section headings keep their distinct sizes. Set text in relative units so readers can enlarge it.

The [wide chapter layout](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=333-243) gives the main text the extra desktop space up to 52 rem. At 1400 px, this leaves about 55 full-width Chinese characters per line at the default size. In the same G01 manuscript fixture the column measured 358 px at a viewport of 390, 770 px at 1082 and 832 px at 1400. At 1400 the article height fell from 8017 to 6505 px. Preserve the width cap on larger screens and check for horizontal overflow at 320 px and at enlarged text sizes. Individual reading-size controls remain a later milestone.

## Returning to the book

| Reading record in this browser | Homepage and directory behavior |
| --- | --- |
| No usable record, storage unavailable or chapter unknown | Home offers the introduction. The directory lists the available chapters. |
| Current chapter and valid saved heading | Show the saved heading and link directly to it. With a chapter-only record, return to the chapter start. [Saved place](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=321-168) |
| Known chapter with a changed source or missing saved heading | Name the chapter, explain the change and explicitly offer its beginning. An English return opens the localized overview while translation is pending. [Changed section](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=321-174) |

Opening a shared chapter or section link goes to its specified destination. A saved position is used when the reader chooses to resume.

## Compact navigation and section actions

- Home, directory and chapter share the compact site header below the 900 px breakpoint. At default text size the local review measured 61 px at widths of 320, 390 and 768 px. Preserve room for enlarged text and a 44 px action target. Tab from the last menu link dismisses the menu and leaves focus on Appearance. Escape inside the menu returns focus to its trigger. [Menu open](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=321-218) · [Focus after Tab](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=321-235)
- Each heading keeps its native fragment link. The ellipsis opens a single row of actions. Below 600 px the row sits at the bottom safe area, with the passage visible above it. On wider screens it sits beside the heading and can open above or below. The close button remains available in every view. Escape returns focus to the trigger; tapping outside dismisses the tools.
- Copying a link closes the tools and briefly changes the trigger to a checkmark with a screen-reader announcement. A blocked clipboard opens a selectable link. Choosing correction replaces the action row with the section title, an editable GitHub draft link, and optional source details. Only following the link opens GitHub. The earlier Figma section-action frames document the previous stacked layout.

## Cover and interaction details

Both homepage languages use the Route C cover. Two branching lines and a fading dot pattern extend the cover illustration into the surrounding space. The cover responds to a fine pointer; the book and reading entry remain visible at rest. Section tools use a short directional entrance and a drawn confirmation check. Reduced motion shows the final state immediately. The passage itself remains stationary.

## Inline references

A reference sits on the body-text baseline. Give the link .18em of room on an edge touching a Chinese character; punctuation and existing spaces provide their own separation. Keep the underlying text intact for copying and searching. The resting link mixes the selected accent and text ink. A fine, close underline identifies it in all six accents. Hover and keyboard focus use the full accent, with a visible focus outline. Long references can wrap across lines.

At the end of a chapter, the previous destination sits at the leading edge and the next destination at the trailing edge. Each takes the space its title needs. On narrow columns the links wrap onto separate rows, keeping their direction. The first chapter keeps its single forward link on the right. The final chapter offers the reader index in that spot. Titles use text ink; the directional arrows and hover state pick up the reading accent.

The book rail uses two text sizes. Its heading and chapter links use 14 px at default settings; group labels, the planned parts and the credit use 13 px. The author caption and name share a baseline. Reviewed status appears once above the readable group. The selected chapter has a quiet surface and an accent edge. Use a 20 px line icon in a 44 px target for each rail control. Collapse retains a compact rail; Hide clears the rail and leaves a way to reopen it. The separator supports pointer dragging and keyboard adjustments. Offer a quiet reset after a width change; keep the pixel count out of the visible reading interface. Short standalone “返回” and “继续阅读” chapter links share the pager’s directional arrow. References within sentences keep their ordinary underline.

## Finishing details

Keep the page and its chrome neutral in both appearances. Apply the selected accent to the active edge, directional arrows, focus ring and link interaction. Keep readable titles in text ink. Use the same text baseline through mixed Chinese and English links. Give toolbar controls a quiet resting surface and show a subtle fill on hover. Reserve the soft shadow for the open action surface. Keyboard focus stays visible and a touch reader can reach every action directly. Animate the toolbar for 160 ms and the confirmation stroke for 210 ms. With reduced motion, show the final state immediately.

For chapter references, link the primary source where it resolves a concrete reader question. Keep research dates and detailed provenance in the editorial record. Required credit travels with reused material. Show a small further-reading list only when it adds something beyond the inline links.

## Delivery and future work

For an earlier local M2 snapshot, the implementation review passed 60 Node checks and 65 Chromium cases. Root and GitHub Pages subpath exports passed. The menu was also exercised at 320 × 568 with enlarged text, 390 × 700, 740 × 360 in landscape and 1366 × 820. Native Safari and VoiceOver remain open checks. See the [developer guide](../../site/DEVELOPMENT.md#local-editorial-reading-layout), [interaction regression cases](../../tests/e2e/reading-polish.spec.mjs) and [return-path cases](../../tests/e2e/continue.spec.mjs). Public release status belongs to the delivery record.

System, Light and Dark use neutral surfaces with six independent accent choices. [R6 reading sizes and accent refinements](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=315-137) remain an M3 candidate. The reader-edition handoff owns the print proof and illustration direction. The [roadmap](../roadmap.md) keeps Chinese manuscript coverage as M2’s main outcome.

<a id="m3-reader-experience"></a>

## M4 opening · Editorial Reader V3, reading interactions and illustration

**Design handoff · 22 November 2026.** M3 settles the manuscript and base layout. M4 opens with the V3 reader, figure placement and rough storyboards. Final artwork and in-chapter motion follow in the second half of M4 after the manuscript is settled. Reader feedback and two draft storyboards The [V3 design handoff](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=385-932) includes desktop, iPad, keyframes and shared components. Use the book title to return to its home and the visible 选书 link to reach both books from any chapter. Use one header and one footer across book and chapter contexts.

<a id="m4-reader-interaction-review"></a>
### M4 opening interaction review

The public website runs the previous reader. The [V3 series prototype](https://www.figma.com/proto/3GYIfJz8xSPGx3AE3RRkKi/Editorial-Reader?node-id=380-28&starting-point-node-id=380%3A28) and [long iPad chapter](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=438-1523) are design evidence. Seven role-based reviewers tried the preceding V3 iteration. The following refinements still need browser acceptance.

| Reader situation | Design and acceptance |
| --- | --- |
| Choosing a book again | The cover and title open the book home. A first visit offers the book entry. When a bookmark exists, show the saved section and offer a direct return. Save each book separately on the device. On migration, assign the previous bookmark to the matching book only. Resolve an outdated section to the chapter. Verify both books after closing and reopening the browser. |
| Deciding how to explore a question | On the Work home show the text entry beside the enrolment figure. From search, name the exact figure step and also offer a fresh start. Keep the chapter-end link with its destination title. |
| Comparing two outcomes | The course card contains the single start button. At either ending switch directly to the other outcome. Both cards stay put. Keep the stored row constant and update the learner’s observation. Name the missing receipt. Keep replay secondary and return in reach. A figure entered from an English screen offers an English return label. |
| Reading a long chapter | Small, standard and large body sizes use 16/29, 18/32 and 22/38 px size/line-height pairs in the proof. Store the choice locally across chapters and sessions. When changing size, retain the current heading and nearby text. Test Chinese and English, 390 px and actual iPad Split View, including browser zoom. |
| Using controls without a mouse | Allow at least a 44 × 44 design target for actions. Use an independent focus ring, selected text or check, and distinct hover, pressed and keyboard-focus states. Use meaningful button/link names. Test Tab, Shift+Tab, Enter, Space on buttons, and Escape on a popover. Restore focus to the invoking control. Announce the changed outcome once and keep the reader’s position. Test foreground contrast in both themes and each accent, touch and reduced motion. Figma does not certify browser or assistive-technology behaviour. |

Use the book jackets and serif titles for identity, generous reading margins and neutral paper for the long text, and a single accent for the active detail. Keep elevation on tools above the page. Test quotation copying alongside native iPad selection before adding it to the reader. State-specific figure links remain a later decision.

**Visual review brief.** Retain the current V2 as the comparison. For the next design review, show two art directions using the same cover, chapter titles and passage: one with restrained editorial typography and generous cover placement, the other extending the cover’s original system lines into a diagram-led opening. Choose whichever makes the first reading action easier to find and the diagram easier to understand. Carry that direction into the shipped reader. Use English frame and layer names and add English notes beneath Chinese specimens.

| Surface | Design and try with actual content |
| --- | --- |
| Home and contents | Let the cover, a line of prose and one clear start or resume action lead the first screen. Give part titles, chapter names and the current chapter distinct weights and aligned edges. Keep the chapter list easy to scan on a phone. |
| Chapter | Tune Chinese and English type separately. Compare a long heading, a mixed-script inline link, a note, a table and the adjacent paragraphs. Let the column use the available width up to a comfortable line length. Align previous and next with their reading directions. |
| Controls and motion | Use neutral surfaces and the six accents for selection, focus and actions. Use a quiet hover fill, short feedback when a link is copied, and a soft shadow when a section menu rises above the page. Close via a visible control, touch or Escape and return focus to its trigger. Keep the paragraph stationary. Respect reduced motion with an immediate final state. Use the existing timing and focus tokens described above. |
| Original artwork · second half of M4 | Writer marks the precise sentence and what the image must clarify. Designer produces an editable master, a narrow-screen treatment and a print-ready asset. Developer places the reviewed image directly after the passage that calls for it, reserves its dimensions, and supplies the caption and text alternative. Keep a record of the source and usage rights. |

**Static figure candidate for the second half of M4:** the browser chapter’s three waits. Show the same course page before its heading appears, after search is visible but unavailable, and after a click while results are pending. A reader should be able to tell the three states apart in a phone-sized stack and in grayscale on paper. Reuse the enrolment diagram where it already explains the request. For an atmospheric illustration, try the float in the closing passage with the approved cat references if the cats appear. Compare the page with and without it; leave the last sentence room to land.

**Desk check.** First compare the designs side by side. Then read from home to chapter using touch and keyboard; close a tool mid-paragraph, change text size and resume after leaving. Check at 320/390 px and on a wide display, with 200% zoom, both appearances and reduced motion. Confirm that link baselines align, visual focus remains visible, no control covers the passage after dismissal and image loading keeps the text in place. Review the final art inside the exported PDF as well as the running site.

<a id="chapter-listening"></a>

### Chapter listening

On a chapter with a reviewed recording in the current language, place a quiet “听本章” action below the title, with the duration taken from the file. A reader starts playback explicitly and can continue reading while the controls remain inline. Offer play/pause, a labelled seek control, elapsed and total time, and playback speed. Use keyboard and touch controls with visible focus. Pages without matching audio go straight into the prose. If the audio fails, keep the text readable and offer retry.

At the M3 desk check, listen to the sample with the screen off, switch apps, return to the passage and try the controls at phone width. For the M4 browser clip use a still poster and captions. Fetch the media on demand so the reading page does not download a whole recording or video on arrival.

## Two-volume entry

The [series entry study](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=344-200) pairs the existing English desktop and Chinese mobile homes with a companion overview for each. The main action opens or resumes Volume I. A compact secondary entry below the cover opens the Volume II overview. This earlier study used static theme labels. The current design in section 20 lets readers expand three story previews, with the first open on arrival. The confirmed English cover title is *Where Does the Saved Time Go?*. Use the existing type, neutral surfaces, reading accents and appearance controls across both volumes.

Both overview routes use the stable suffix `books/everyday-life/` inside the current language. Selecting Volume I returns to its home in the same language. Changing the interface language on the Volume II overview keeps Volume II selected. Opening the overview leaves reading progress alone. Existing Volume I routes, anchors and progress remain usable. Before the first Volume II chapter enters the reader, scope chapter identity, previous/next, search results and resume by book and edition. Read the legacy unscoped progress as Volume I Chinese. Use the reviewed edition when deciding whether to offer a reading action. Finish the cover and print opener with real manuscript material.


### Choosing a volume

Use a localized two-link selector on both landing pages. Mark the current URL with aria-current. Volume I opens the existing engineering home and reading action. Volume II opens the companion in the same language. Its title page uses the localized Life A cover of the author playing with his cats. The fishing scene remains available as alternate artwork. The three native disclosures preview the planned themes using concrete story questions. They work with a keyboard and without hydration. A theme preview does not count as a published chapter. The desktop composition sets type beside the illustration; narrow screens stack them.

Reference patterns: [Basecamp Books](https://basecamp.com/books) lists actions per available edition, and [Shape Up](https://basecamp.com/shapeup) has its own reading entry. [Google SRE Books](https://sre.google/books/) groups related works; the [Workbook contents](https://sre.google/workbook/table-of-contents/) stay scoped to the selected book. These inform navigation and availability. [Figma 20 · Work and Life](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=353-232) shows the current four desktop/mobile entry frames. Section 19 retains the earlier entry study.

Section 20 connects each alternate volume selector to its same-language frame. The secondary link on each Volume I cover also opens Volume II. The header link on each companion overview now opens the book choices on the shared landing page. On the English Volume I frame, label direct Chinese reading actions “Read the introduction in Chinese” or “Continue reading in Chinese”. Keep English navigation in English. Show the active volume by weight and a short underline, including in dark mode. At phone widths both labels must fit and the current volume must still be recognizable with colour removed.

### One click back to the landing page

Keep a visible “选书” / “Books” link in the desktop and mobile reader header of either book, even when the chapter sidebar is closed. Give it the same destination from each book’s home. A single tap opens the two book choices on the existing landing page at `/zh/#books` or `/#books`, with the deployment prefix where applicable. Keep both titles and their reading status at that anchor. Use a normal link so a reader arriving midway through a shared chapter can leave immediately and use browser Back to return. Preserve their saved place. [Figma · landing page at the book selector](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=357-234).
