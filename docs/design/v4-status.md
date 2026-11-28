# V4 reader design · status

Updated 28 November 2026. This page collects where the V4 design stands, so that no session has to rely on chat history. Decisions are in [PDR-009](../decisions/pdr-009-reader-feature-triage.md); the order of work is in the [roadmap](../roadmap.md#order-of-work--rules-for-every-role-and-ai).

## Direction

Direction **A + B**:

- **Reading area (A):** book-like. The part name and chapter number are centred above a serif title, followed by a lead paragraph and the reading time. Margin notes appear from 1280 px.
- **Interface (B):** restrained. A nearly invisible top bar, a thin progress line, and a next-chapter card separated by a hairline.
- **No drop cap.** C's illustrations appear only on the part opener pages, in Phase 2 or later.

The author wants a modern, high-quality, Apple-like feel.

## Artefacts

All are private to the author.

| What | Where | State |
| --- | --- | --- |
| Design system "Editorial Reader" | [artifact](https://claude.ai/artifact/YWreQbgH39fzcEYqkFvPXL) | Version 9. 86 tokens; 8 themes; 3 accents; 24 combinations contrast-checked; components ReadingPage, Button, SegmentedControl, Sheet, TextSettings, Shelf, with ChapterPull marked Exploration |
| Direction prototype | [artifact](https://claude.ai/artifact/U5gvDekt9RpSSFbbSP2XBy) | A + B is the default view; real browser-chapter text; widths 390, 1024 and 1440; four paper tones plus dark |
| Research report | [artifact](https://claude.ai/artifact/KHgkrkqg7BWUJAtxtBiFnp) | Version 3, rewritten for A + B |
| Body-type comparison | [artifact](https://claude.ai/artifact/JDLXP2bjNkpRHwh5ZiNY3C) | The serif option A was chosen |

## Design-system edits held until the author says to publish

1. **Reader features › Report a problem:** GitHub only. The issue draft is prefilled with the book, chapter, section and selected text, and the reader reviews it before submitting. An email route is planned for the Volume II serial; leave room for it in the layout but do not show it now.
2. **Chinese body text is justified, English left-aligned.** ReadingPage's "Don't justify text on the web" applies to English only. Typography also mentions `text-spacing-trim`.
3. **Margin notes start at 1280 px** instead of 1440, both in the README layout section and in ReadingPage.
4. **Reading time:** about 300 Chinese characters or 200 English words a minute, excluding code blocks, shown once in the chapter opener.
5. **Phase labels:** quote cards, RSS and the author page are marked Phase 3.

## Figma

- The author's seat is **View** in both teams, so the original file is read-only and creating a file fails ("Invalid planKey").
- Once the seat is Full or Dev, create **Editorial Reader V4** with one set of variables and text styles, actually applied to the frames.
- The old file has 9 variable collections and 47 text styles from the BTF, V2 and V3 generations, and its sampled frames used none of them.

## Still to design for Phase 1

In order of importance:

1. **A style guide for figures, tables and code.** The book has 19 code blocks and 14 tables, and the browser chapter has only 2 figures. The guide covers line weight, colour, labels, numbering (图 2-1), captions, opening and returning, dark mode, grayscale print and phone widths.
2. **Part opener pages and the whole-book map.** The text is in [part-openers.md](../../book/revisions/zh/volume-one-m4/part-openers.md).
3. **Version status labels** for revised and not-yet-revised pieces.
4. **Search, 404 and the footer.**
5. **Typographic covers:** one cover component, a book colour, a serif title and a darker spine.

Link-preview images, quote cards, RSS and the author page wait for Phase 3.

## To verify on real devices

- Whether Songti SC is available on iOS.
- Whether serif strokes become too thin in dark mode.
- How the Vaul-style bottom sheet feels to the hand.
- How text-spacing-trim (Chrome and Edge 123+) and hanging-punctuation (Safari only) behave. Both are enhancements; Firefox supports neither.
