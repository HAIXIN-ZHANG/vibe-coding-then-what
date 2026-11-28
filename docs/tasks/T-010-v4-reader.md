# T-010 · V4 reader

## Brief

*Delivery Lead and Designer (Claude), 28 November 2026. Base: main after T-006. Mode: dual (Claude designs and reviews, Codex builds). The author accepted the design on 28 November 2026 ([PDR-010](../decisions/pdr-010-v4-acceptance-and-edition.md)), with the edition label, browser support and English note decided at the same time.*

- **Goal.** Phase 1's reader interface is live and then frozen (roadmap rule 4). A reader on a phone or a desktop gets a book-like page and a quiet interface: one serif column, a chapter opener, a next-chapter card, a bottom sheet for contents and text settings, one style for figures, code and tables, part openers, honest status labels, and a GitHub route for reporting a problem.
- **Executor.** Developer (Codex).
- **Design of record.** [`docs/design/v4/reader-v4-design.html`](../design/v4/reader-v4-design.html). Open it in a browser. It has 39 frames with English reviewer captions, the layout and motion tables, and an acceptance table that matches the slices below. Values come from the Editorial Reader design system (author-private artifact), which since 28 November also documents the seven V4 components and the V4 sizes ([status](../design/v4-status.md#design-system-follow-up)). Its tokens are copied into the design file. Where this brief and the design file disagree, the design file wins; report the conflict in the Handoff.
- **Inputs.**
  - [PRD](../product/volume-one-public-edition.md): R01–R16.
  - [PDR-009](../decisions/pdr-009-reader-feature-triage.md): what is kept, deferred, paused and stopped, and the 28 November art direction.
  - [V4 status](../design/v4-status.md): decisions and device checks.
  - Held V3 work: commit `87a3483` on local branch `codex/m4-ui-release-20261127` (48 files, not reviewed). Reuse a piece only where it already matches V4, and name what was reused in the Handoff. Never merge the branch as a whole.

### Slices

Eight slices, one pull request each, in this order. Each slice must pass review before the next one starts, unless the Delivery Lead says two can run together.

| # | Slice | Design frames | PRD | Main files, as far as can be seen today |
| --- | --- | --- | --- | --- |
| 1 | **Typography and skeleton.** Serif reading faces; one centred column of 640 px (34em max below 1200 px); Chinese justified with keep-all titles; English left-aligned; margin notes from 1280 px, inline below; remove the three-column layout and the "On this page" column | Chapter opener ×3, layout and type tables | R05, R10, R12 | `panda/tokens.ts`, `panda/global-styles.ts`, `site/components/reading/reader-layout.tsx`, `on-this-page.tsx`, `markdown-content.tsx` |
| 2 | **Chrome, noise and bookmarks.** One header that is transparent at the top and glass once scrolled, hiding on scroll down; 2 px progress line; phone dock (Contents, Search, Text, Bookmark); section actions only on heading hover, focus or long-press; faint prose links; bookmark toast, bookmarks sheet and honest failure, kept separate from Continue | Opener, chapter end, bookmarks ×2 | R04, R07 | `site-header.tsx`, `reading-tools.tsx`, `reading-progress.tsx`, `section-actions.tsx`, `chapter-header-menu.tsx` |
| 3 | **Opener, end and status.** Part label, chapter number, title, lead and reading time (300 Chinese characters or 200 English words a minute, code excluded, computed at build time); next-chapter card whose sentence is the next chapter's first line; previous, share and report actions; 新修订 and 初版 labels read from content data | Opener, chapter end, contents | R01, R02, R08 | `chapter-reader.tsx`, `chapter-navigation.tsx`, `chapter-pagination.tsx`, `site/content/` (data only) |
| 4 | **Figures, code and tables.** Inset wells (radius 16 for figures, 12 for code); numbered captions per chapter (图 2-1, 代码 2-1, 表 2-1); code and wide tables scroll inside their well, never the page; figure view that grows from its position and returns focus and a 1.5 s highlight to the passage | Style guide ×2, figure view ×2 | R06 | `code-block.tsx`, `comparison-table.tsx`, `chapter-media.tsx`, `enrolment-figure.tsx`, `callout.tsx` |
| 5 | **Sheets and settings.** One bottom-sheet component (500 ms, `cubic-bezier(0.32, 0.72, 0, 1)`, momentum close, focus trap, Escape); contents as a sheet on phones and a pinnable 300 px sidebar from 1200 px; text settings with a five-stop size slider, four page tones, appearance and three accents; per-role sizes behind a pushed level that reuses the existing role-size control and its storage | Contents ×2, settings ×2 | R05, R08, R12 | `ui/reading-size-control.tsx`, `ui/appearance-control.tsx`, `site/theme/*`, `book-navigation.tsx`, `sidebar-preference.ts` |
| 6 | **Home and part pages.** A typographic cover component (book colour, serif title, spine, 10° turn at rest); first-visit and returning home with one primary action; a three-book shelf with honest status; part opener pages and the whole-book map (content arrives through T-007) | Home ×3, part opener, map | R01, R09, R14 | `home-page.tsx`, `home-content.ts`, `companion-book.tsx`, `book-choice-anchor.tsx`, new part-page route |
| 7 | **Search, feedback, errors and failure states.** Edition-scoped search as a phone sheet and a desktop palette, with arrow-key navigation and landing below the header; the GitHub issue-draft sheet with prefilled book, chapter, section and selected text; 404; the moved-section fallback sentence; a failed figure shows its text description; the storage-denied banner; 320 px at 1.45× with no page scroll | Search ×2, report sheet, 404, moved link, failure ×3 | R03, R11, R12, R15 | `site/components/search/*`, `passage-tools.tsx`, `sharing.ts`, `not-found-content.tsx`, `global-not-found.tsx`, `chapter-media.tsx` |
| 8 | **English edition and wide panels.** Paired English home, contents, search and 404; the per-chapter language sheet; the adaptation-out-of-date note (PRD O10, decided); from 600 px, settings as a popover and bookmarks, report and language as a centred dialog; the footer at chapter ends and on home | English ×6, tablet ×2, desktop footer | R08, R10 | `language-switch.tsx`, `site/config/i18n.ts`, `home-page.tsx`, `document-layout.tsx` |

### Status labels: data, not hand-typed text

Slice 3 adds one field to `ChapterEntry` in `site/content/manifest.ts`: `revision: 'revised' | 'first-edition'`. The reader shows 新修订 for `revised` and 初版 for `first-edition`. English entries do not show these labels.

- Every existing entry starts as `first-edition`.
- A piece becomes `revised` only when the Delivery Lead's Review of the task that revised it records a Pass against the PRD content standard. That task (T-007 for the preface, T-011 for the flagship pieces and Part 8) sets the field in the same PR as the manuscript.
- The trimmed Part 8 chapter and the retitled closing stay `first-edition` until they are reviewed against the standard. A trim or a new title is not a revision.
- The Handoff of the task that sets an entry to `revised` names the Review that passed it.

For slice 8's adaptation note, each English adaptation records the SHA-256 of the Chinese source it was adapted from. When that differs from the current Chinese entry's hash, the build marks the adaptation as out of date.

### Reuse map: what to keep from the earlier reader

*Designer (Claude), 28 November 2026, from a review of the live site at 375 and 1440 px, the held V3 commit `87a3483`, the [V2 and V3 design notes](../design/reading-experience-v2.md) and the existing tests. The author asked for this map.*

The earlier reader was strong on behaviour, edge cases, accessibility and tests. It was weak on visual feel. V4 replaces the look, so keep the behaviour and re-skin it.

- Files on main are reused in place.
- Files marked **held** exist only in `87a3483` on `codex/m4-ui-release-20261127`. Take them one file at a time with `git show 87a3483:<path>`, and never merge that branch.
- An existing test changes only where V4 changes the behaviour. Name each changed assertion in the Handoff.

| Slice | Keep as it is | Adapt to V4 | Tests to keep passing |
| --- | --- | --- | --- |
| 1 · Typography and skeleton | The relative-unit type sizes; position-keeping when the column changes (`reading-viewport.ts`) | Move the body from sans to serif. Replace the three-column layout and the draggable sidebar width (`sidebar-preference.ts`) with one 640 px column | `reader.spec.mjs`, `reader-split-view.spec.mjs`, `header-cold-start.spec.mjs`, `reading-measurement.test.mjs` |
| 2 · Chrome, noise and bookmarks | The return rules (`continue-reading.tsx`, `book-return.ts`): a saved section opens directly; a changed chapter or missing section explains the change and opens the chapter start; denied storage falls back to the start. Escape returns focus to the trigger. The copy-link fallback, which shows a selectable link when the clipboard is blocked (`section-actions.tsx`, `sharing.ts`) | Move the section actions into heading hover and long-press, and remove the per-section “链接与纠错” disclosures. Rebuild the toolbar as the Dock | `continue.spec.mjs`, `legacy-heading-recovery.spec.mjs`, `reading-polish.spec.mjs`, `reading-toolbar-links.spec.mjs`, `sidebar-hidden.spec.mjs`, `reading-progress.test.mjs`, `sidebar.test.mjs` |
| 3 · Opener, end and status | Previous and next chapters at the leading and trailing edges, sized to their titles (`chapter-pagination.tsx`, `chapter-arrow.tsx`) | Use the one-line chapter descriptions in `site/config/i18n.ts` (for example `G01`) as the lead where the manuscript has none. Do not invent leads for the rest | `reader-info.spec.mjs`, `case-reading.spec.mjs` |
| 4 · Figures, code and tables | The code-block header with a language label and a copy button (`code-block.tsx`); `comparison-table.tsx`; the 0.18em gap where a link meets Chinese text | Redraw the home page's static four-step enrolment figure (`enrolment-figure.tsx` with `site/public/illustrations/home-systems-*.svg`: 提交 · 检查 · 保存 · 确认) to the V4 figure style, as a candidate for chapter 1’s first figure (plan F1). It does not belong on the home page | `passage-tools.test.mjs` |
| 5 · Sheets and settings | **Held:** per-role sizes, with a session-only fallback when storage is denied (`site/components/ui/reading-size-control.tsx`, `site/theme/reading-size.ts`, `tests/e2e/f01-reader.spec.mjs`). This is the V4 disclosure “分别调整标题、代码和注释” and the storage-denied banner | Replace the dropdown-and-rows form with the V4 controls: size steps, tone swatches, appearance and accent. Keep the storage logic | `passage-preferences.spec.mjs`, `theme.test.mjs`; **held** `f01-reader.spec.mjs` |
| 6 · Home and part pages | The two-book routing and separate progress per book (`site/config/books.ts`, `/books/everyday-life/`, legacy progress read as Volume I Chinese). The one-tap “选书 / Books” link (`books-link.tsx`, `book-choice-anchor.tsx`). The A5 PDF link (`volume-one-download.tsx`) | Fold “探索系统” (`home-content.ts`) into the part openers and the whole-book map. Replace the hero card and its four equal actions with the cover, one primary action and the shelf. Keep the short route “短读：我就想搜一门课” (`browser-short-reading.tsx`) as a secondary link in contents and at the end of the browser chapter, not on the home page. **Held:** take the hydration-stable landing header from `landing-reader-bridge.spec.mjs` | `case-reading.spec.mjs`; **held** `landing-reader-bridge.spec.mjs` |
| 7 · Search, feedback, errors and failure states | Search messages that state what was searched (`search/messages.ts`). The GitHub issue draft, which opens only when the reader follows the link. The not-found copy (`not-found-content.tsx`) | Restyle the search as the phone sheet and the desktop SearchPalette. Move the correction action from the sections to the chapter end and the passage menu | `search-sharing.test.mjs`, `public-smoke.test.mjs`; **held** `panel-followup.spec.mjs` (an empty English search declares what it searched) |
| 8 · English edition and wide panels | The edition rules: the URL sets the edition, and crossing editions is a deliberate action. Chinese-only pieces are counted, not given invented English titles, with a “Read the Chinese original” action (`language-switch.tsx`, `site/config/i18n.ts`). A Chinese bookmark opened from English names its original language (held `f01-reader.spec.mjs`) | Wide panels become the Popover and the 480 px dialog | `english-edition.spec.mjs`, `i18n.test.mjs`, `deployment.test.mjs`, `static-preview.test.mjs` |

**Not carried forward** (V4 replaced these deliberately): the three-column skeleton, sans-serif body text, 24 per-section disclosures in one chapter, the SaaS-style home hero, the settings form, two rows of phone buttons, six accents (now three) and the draggable sidebar width.

**Kept for later phases.** Leave this code in place and do not delete it in T-010:

- the case index (`case-index.tsx`) and the short reading route, for curated routes after the revised edition has readers ([PDR-009](../decisions/pdr-009-reader-feature-triage.md));
- “听本章” chapter listening (`chapter-media.tsx`), until a reviewed recording exists;
- the illustrated covers (`book/assets/covers/cover-c-route-en-zh.png`, `site/public/illustrations/route-c-*.webp`, `life-a-*.webp`). Volume I’s cover still carries the old title and needs re-lettering. Its “browser → branch → database” strip is a candidate motif for figures and part openers. Before reuse, record the artwork’s source and usage rights.

### Decisions already made, so do not reopen them

- No drop cap. No chapter-change animation in Phase 1 (View Transitions are Phase 3). No ⌘K palette features beyond the look and arrow keys. No email feedback. No quote cards, RSS or author page.
- Accent choices are Blue, Iris and Graphite; page tones are White, Paper, Mist and Quiet grey, each light and dark. The old six accents are removed, and a stored old value falls back to Blue.
- **Fonts.** Spectral is self-hosted as a Latin subset (SIL Open Font License; add its notice). Chinese uses local faces only, "Songti SC", then "Noto Serif SC", then the system serif, with no CJK web font in Phase 1. A CJK web font would be a new decision.
- **No new runtime dependency.** The sheet, slider and palette are built in the codebase. Ask before adding any package.

### Must not change

- Manuscripts, manifest hashes and the search corpus. T-007 owns those.
- URLs, slugs, anchors and the base path. Existing links and saved positions must keep working.
- Existing storage keys (`vctw.reading-sizes.v1`, the theme and accent keys). Migrate values; do not reset them.
- `.github/workflows/`, branch protection and the repository slug.
- English editions stay as they are apart from interface strings. Interface copy follows the URL edition.

### Acceptance, per slice

- `npm run check`, `npm run build:pages` and `npm run verify:export` pass. Paste the last lines of each.
- The existing E2E suites still pass, updated only where the design changed the behaviour. Name each changed assertion and the reason.
- New E2E coverage for the slice's states, including at least one keyboard-only path and one with reduced motion.
- Screenshots of each frame the slice covers, at 320, 390, 1024 and 1440 px, light and dark, plus Paper and one non-Blue accent, placed next to the design frame in the Handoff.
- Contrast measured from the shipped tokens for each tone, light and dark: body 7:1 or higher, secondary text and accent 4.5:1 or higher.
- No horizontal page scroll at 320 px with the largest text size.
- Browser support as decided in [PDR-010](../decisions/pdr-010-v4-acceptance-and-edition.md): the E2E suites run in Chromium, as today. Check the slice by hand in Safari, and in Safari on iOS 17 or later (a simulator is acceptable; the author checks real devices). Adding a WebKit Playwright project downloads a browser in CI, so propose it in the Handoff rather than adding it. In Firefox, confirm the slice is readable and usable; the typographic enhancements may be missing there.

### Extra layers

- **Designer check (Claude)** on every slice: compare against the design file at the four widths, then Pass, Pass with follow-ups, or Fix and recheck.
- **Audience panel** after slices 3 and 6, with personas P1, P2 and P4.
- **PM stage check** after slice 8: walk the PRD journeys on the deployed preview. Device checks on a real iPhone and iPad before the final Pass: Songti SC on iOS, serif strokes in dark mode, the feel of the sheet, and text-spacing-trim and hanging-punctuation.
- **Freeze.** After the final Pass, typography, colour and layout changes need a decision record approved by the author.

## Product and design notes

## Handoff

## Panel

## Review

## Integration
