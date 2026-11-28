# PDR-009 · Which reader features to keep, defer, pause or stop

Status: **Accepted.** The author went through the feature list on 28 November 2026, after a desk review of comparable reading products, and confirmed it. Decision-maker: author. Recorded: 28 November 2026 against main `9acaa05`. This record amends the accent choice in [PDR-006](pdr-006-two-desk-workflow.md#design-amendments-to-pdr-003).

## Context

The earlier roadmap, now [archived](../archive/roadmap-2026-11-27.md), collected many feature ideas from the author's early exploration. The author was clear that these were ideas, not commitments. The goal of this triage is a reading product with a modern, high-quality feel, where that quality comes from typography, white space and restrained detail rather than effects.

## Decisions

**This edition**, in the [PRD](../product/volume-one-public-edition.md). Amended 28 November: the author and works page, quote cards and RSS move to Phase 3 (promotion), after the books are substantially written ([PDR-005 amendment](pdr-005-project-purpose.md#amendment--volume-i-first-promotion-last-28-november-2026)):

- **Kept:** search, continue reading, bookmarks, text size, sharing a section, the language switch, paper tones with light and dark, figures that open and return, share cards, the author and works page, part openers and the map, and the existing PDF download.
- **Three accent colours** instead of one (author, 28 November). Readers choose an accent and a paper tone separately. Three accents across four paper tones in light and dark give 24 combinations to check for contrast, half of what six would need. The author confirmed the four paper tones on 28 November: **White, Paper, Mist and Quiet grey**, each with a dark version. Mist is the cool pale blue of the cover background. The accents are Blue (the cover blue, default), Iris and Graphite.
- **Quote cards.** Select a passage and get an image with the book title, chapter and link, for LinkedIn or WeChat Moments. These are P1 and build on the existing section sharing.
- **Margin notes, designed now and built when needed.** On wide screens, notes sit beside the text; on phones, a bottom sheet opens from a visible control. A count on 28 November found no footnotes, callouts or Markdown images in the 51 comparison pieces, only 19 code blocks and 14 tables. Margin notes are therefore built only once revised pieces add notes; until then, V4 shows one example state.
- **Feedback for readers who find a problem** (P0). Every chapter keeps the GitHub issue draft, with the chapter, section and any selected text filled in. Make it easy to find from every chapter. GitHub only for now (author, 28 November). An email route for readers without a GitHub account comes later, when the Volume II serial brings readers who are not engineers, and needs a dedicated address.
- **An RSS feed** for new and revised chapters. It is generated statically, so it has almost no cost.

**Designed in V4, built later:**

- one interactive figure, for the Part 4 last-seat flagship piece;
- transitions between chapters using View Transitions, which fall back to a normal page load;
- a ⌘K search palette on desktop.

**Later, after the revised edition has readers:**

- glossary hover cards and a case index;
- two or three curated reading routes;
- paragraph-level passage links;
- an update feed page;
- email subscription and an email feedback route, which wait for the Volume II serial and need a dedicated address and account the author chooses;
- Umami measurement;
- more English chapters, EPUB, the Volume II serial and links between the books.

**Paused.** The idea is kept and the design files are preserved, but no work is done until readers show a need:

- the web print-edition viewer;
- the store app;
- the listening chapter (its script exists);
- explanatory video and three-card short reads;
- topic filters;
- more AI question cards and context bundles;
- side-by-side bilingual reading and translation-drift notices;
- import and export of reading records;
- a concept map;
- swipe and pull-to-next-chapter gestures;
- quizzes;
- accounts and cross-device sync, hosted AI chat on the site, and a comments system. These three were moved from stopped to paused by the author.

**Stopped:**

- **The offline bookshelf:** the downloadable PDF already covers offline reading.
- **The live code sandbox.**
- **The project's own measurement collector.** Measurement is still planned, through Umami, a third-party service. Only the home-built collector is stopped.
- **Six accent colours,** replaced by the three accents above.

## Design direction

- **Typography carries most of the quality:**
  - serif body text;
  - about 30–36 Chinese characters per line with a line height of about 1.8, and 60–72 characters per line in English;
  - a clear hierarchy from part opener to caption;
  - CJK punctuation trimming and hanging punctuation where the browser supports them.
- **Motion only at changes of state:** opening, closing, changing chapter and viewing a figure.
  - Interface motion runs 150–300 ms.
  - The bottom sheet uses about 500 ms with an iOS-like curve.
  - No ease-in, no scroll hijacking, no infinite loops.
  - Reduced motion falls back to fades.
- **The shelf** shows the three books as covers with a light 3D hover, each in its own colour. CSS transforms are enough; WebGL is not needed.

## Alternatives considered

- **Keep the full early feature set on the roadmap.** Rejected: it spreads one author's time before any reader signal exists.
- **One accent colour only.** This was the 27 November design proposal. The author preferred to offer readers a choice, so three accents is the compromise.

Evidence: a desk review on 28 November of Stripe Press, Pelican Books online, Tufte CSS and Gwern's sidenotes, Josh Comeau's courses, Emil Kowalski's Vaul drawer, cross-document View Transitions, WeChat Read's quote images, the Kodeco reader and the Web Browser Engineering newsletter. Browser-support details came partly from caniuse snippets and must be rechecked before implementation.
