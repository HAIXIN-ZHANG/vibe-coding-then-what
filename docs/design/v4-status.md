# V4 reader design · status

Updated 28 November 2026, after the V4 design was completed. This page collects where the V4 design stands, so that no session has to rely on chat history. Decisions are in [PDR-009](../decisions/pdr-009-reader-feature-triage.md); the order of work is in the [roadmap](../roadmap.md#order-of-work--rules-for-every-role-and-ai).

## Direction

Direction **A + B**:

- **Reading area (A):** book-like. The part name and chapter number are centred above a serif title, followed by a lead paragraph and the reading time. Margin notes appear from 1280 px.
- **Interface (B):** restrained. A nearly invisible top bar, a thin progress line, and a next-chapter card separated by a hairline.
- **No drop cap.** C's illustrations appear only on the part opener pages, in Phase 2 or later.

The author wants a modern, high-quality, Apple-like feel.

## Design of record

**[`docs/design/v4/reader-v4-design.html`](v4/reader-v4-design.html)** is the complete Phase 1 design. Open it in a browser. It has 27 frames with English reviewer captions:

- home, first visit and returning, on phone and desktop;
- the chapter opener in Chinese and English, and on desktop with a margin note;
- the style guide for code, tables and figures, with the figure view and the return to the passage;
- the part opener and the whole-book map;
- contents as a phone sheet and as a pinned desktop sidebar;
- text settings and per-role sizes;
- search, with a no-results state;
- the chapter end and the report-a-problem sheet;
- bookmarks;
- three tone, dark and accent combinations;
- the 404 page and the moved-section fallback.

It also holds the V3.1 → V4 change table, the layout, type and motion rules, and the acceptance table for [T-010](../tasks/T-010-v4-reader.md). The same page is published as an author-private artifact (https://claude.ai/artifact/Mi5obCcxQMJBLMHL9Tw2Fp, version 3); edit both together.

Figma is no longer a blocker. The author's seat is View, so the V3.1 file stays read-only as history. If the seat is upgraded later, the design can be redrawn there, but the repository file stays the reference until a decision record changes it.

## Other artefacts

All are private to the author.

| What | Where | State |
| --- | --- | --- |
| Design system "Editorial Reader" | [artifact](https://claude.ai/artifact/YWreQbgH39fzcEYqkFvPXL) | Version 10. The five held edits were published on 28 November: GitHub-only reporting, Chinese justified, margin notes from 1280 px, reading time, and phase labels. Typographic covers and no drop cap are also recorded |
| Direction prototype | [artifact](https://claude.ai/artifact/U5gvDekt9RpSSFbbSP2XBy) | Version 5. A + B is the default view, at widths 390, 1024 and 1440 |
| Research report | [artifact](https://claude.ai/artifact/KHgkrkqg7BWUJAtxtBiFnp) | Version 3, rewritten for A + B |
| Body-type comparison | [artifact](https://claude.ai/artifact/JDLXP2bjNkpRHwh5ZiNY3C) | The serif option A was chosen |

## Decided in the V4 design (28 November)

- **Phone chrome:** one header that hides on scroll, plus a glass dock with Contents, Search, Text and Bookmark.
- **Contents:** a bottom sheet on phones; from 1200 px, a 300 px sidebar that is closed by default and can be pinned.
- **Text settings:**
  - a five-stop size slider (0.9, 1, 1.15, 1.3, 1.45×);
  - four page tones, appearance, and three accents;
  - per-role sizes on a pushed level that reuses the existing control.
- **Status labels:** 新修订 for pieces revised to the depth standard, 初版 for the comparison edition.
- **Fonts:** Spectral self-hosted as a Latin subset. Chinese uses local faces only in Phase 1.
- **Chinese titles:** `word-break: keep-all`, so lines break at punctuation and never inside a word.
- **Measured contrast** on the design file's values: body text at least 13.4:1, secondary labels and accent at least 5.4:1.

## To verify on real devices

- Whether Songti SC is available on iOS.
- Whether serif strokes become too thin in dark mode.
- How the Vaul-style bottom sheet feels to the hand.
- How text-spacing-trim (Chrome and Edge 123+) and hanging-punctuation (Safari only) behave. Both are enhancements; Firefox supports neither.
