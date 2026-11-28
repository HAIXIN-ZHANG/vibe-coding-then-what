# T-010 · V4 reader

## Brief

*Delivery Lead and Designer (Claude), 28 November 2026. Base: main after T-006. Mode: dual (Claude designs and reviews, Codex builds). The author's acceptance of the design is the start condition.*

- **Goal.** Phase 1's reader interface is live and then frozen (roadmap rule 4). A reader on a phone or a desktop gets a book-like page and a quiet interface: one serif column, a chapter opener, a next-chapter card, a bottom sheet for contents and text settings, one style for figures, code and tables, part openers, honest status labels, and a GitHub route for reporting a problem.
- **Executor.** Developer (Codex).
- **Design of record.** [`docs/design/v4/reader-v4-design.html`](../design/v4/reader-v4-design.html). Open it in a browser. It has 27 frames with English reviewer captions, the layout and motion tables, and an acceptance table that matches the slices below. Values come from the Editorial Reader design system, version 10 (author-private artifact; its tokens are copied into the design file). Where this brief and the design file disagree, the design file wins; report the conflict in the Handoff.
- **Inputs.**
  - [PRD](../product/volume-one-public-edition.md): R01–R16.
  - [PDR-009](../decisions/pdr-009-reader-feature-triage.md): what is kept, deferred, paused and stopped, and the 28 November art direction.
  - [V4 status](../design/v4-status.md): decisions and device checks.
  - Held V3 work: commit `87a3483` on local branch `codex/m4-ui-release-20261127` (48 files, not reviewed). Reuse a piece only where it already matches V4, and name what was reused in the Handoff. Never merge the branch as a whole.

### Slices

One pull request per slice, in this order. Each slice must pass review before the next one starts, unless the Delivery Lead says two can run together.

| # | Slice | Design frames | PRD | Main files, as far as can be seen today |
| --- | --- | --- | --- | --- |
| 1 | **Typography and skeleton.** Serif reading faces; one centred column of 640 px (34em max below 1200 px); Chinese justified with keep-all titles; English left-aligned; margin notes from 1280 px, inline below; remove the three-column layout and the "On this page" column | Chapter opener ×3, layout and type tables | R05, R10, R12 | `panda/tokens.ts`, `panda/global-styles.ts`, `site/components/reading/reader-layout.tsx`, `on-this-page.tsx`, `markdown-content.tsx` |
| 2 | **Chrome, noise and bookmarks.** One header that is transparent at the top and glass once scrolled, hiding on scroll down; 2 px progress line; phone dock (Contents, Search, Text, Bookmark); section actions only on heading hover, focus or long-press; faint prose links; bookmark toast, bookmarks sheet and honest failure, kept separate from Continue | Opener, chapter end, bookmarks ×2 | R04, R07 | `site-header.tsx`, `reading-tools.tsx`, `reading-progress.tsx`, `section-actions.tsx`, `chapter-header-menu.tsx` |
| 3 | **Opener, end and status.** Part label, chapter number, title, lead and reading time (300 Chinese characters or 200 English words a minute, code excluded, computed at build time); next-chapter card whose sentence is the next chapter's first line; previous, share and report actions; 新修订 and 初版 labels read from content data | Opener, chapter end, contents | R01, R02, R08 | `chapter-reader.tsx`, `chapter-navigation.tsx`, `chapter-pagination.tsx`, `site/content/` (data only) |
| 4 | **Figures, code and tables.** Inset wells (radius 16 for figures, 12 for code); numbered captions per chapter (图 2-1, 代码 2-1, 表 2-1); code and wide tables scroll inside their well, never the page; figure view that grows from its position and returns focus and a 1.5 s highlight to the passage | Style guide ×2, figure view ×2 | R06 | `code-block.tsx`, `comparison-table.tsx`, `chapter-media.tsx`, `enrolment-figure.tsx`, `callout.tsx` |
| 5 | **Sheets and settings.** One bottom-sheet component (500 ms, `cubic-bezier(0.32, 0.72, 0, 1)`, momentum close, focus trap, Escape); contents as a sheet on phones and a pinnable 300 px sidebar from 1200 px; text settings with a five-stop size slider, four page tones, appearance and three accents; per-role sizes behind a pushed level that reuses the existing role-size control and its storage | Contents ×2, settings ×2 | R05, R08, R12 | `ui/reading-size-control.tsx`, `ui/appearance-control.tsx`, `site/theme/*`, `book-navigation.tsx`, `sidebar-preference.ts` |
| 6 | **Home and part pages.** A typographic cover component (book colour, serif title, spine, 10° turn at rest); first-visit and returning home with one primary action; a three-book shelf with honest status; part opener pages and the whole-book map (content arrives through T-007) | Home ×3, part opener, map | R01, R09, R14 | `home-page.tsx`, `home-content.ts`, `companion-book.tsx`, `book-choice-anchor.tsx`, new part-page route |
| 7 | **Search, feedback and errors.** Edition-scoped search as a phone sheet and a desktop palette, with arrow-key navigation and landing below the header; the GitHub issue-draft sheet with prefilled book, chapter, section and selected text; 404; the moved-section fallback sentence | Search ×2, report sheet, 404, moved link | R03, R11, R15 | `site/components/search/*`, `passage-tools.tsx`, `sharing.ts`, `not-found-content.tsx`, `global-not-found.tsx` |

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

### Extra layers

- **Designer check (Claude)** on every slice: compare against the design file at the four widths, then Pass, Pass with follow-ups, or Fix and recheck.
- **Audience panel** after slices 3 and 6, with personas P1, P2 and P4.
- **PM stage check** after slice 7: walk the PRD journeys on the deployed preview. Device checks on a real iPhone and iPad before the final Pass: Songti SC on iOS, serif strokes in dark mode, the feel of the sheet, and text-spacing-trim and hanging-punctuation.
- **Freeze.** After the final Pass, typography, colour and layout changes need a decision record approved by the author.

## Product and design notes

## Handoff

## Panel

## Review

## Integration
