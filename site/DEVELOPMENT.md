# Developing the reading site

The website is a static Next.js export. The [Chinese contents](https://haixin-zhang.github.io/vibe-coding-then-what/zh/read/) and [English contents](https://haixin-zhang.github.io/vibe-coding-then-what/read/) show what readers can open. The [release record](https://haixin-zhang.github.io/vibe-coding-then-what/release.json) identifies the deployed commit and its chapter routes.

## Environment and commands

Run from the repository root with Node 24 and npm 11. Use the checked-in package lock. Panda generates its styles during development, type checking and builds. The export is written to `site/out/`.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run verify:export
npm run test:e2e
```

Playwright needs its matching Chromium browser. On a new development machine the dedicated setup command is `npm run test:e2e:install`. The project also supports a subpath deployment. Rebuild before checking it so every generated asset and navigation link has the same prefix.

```sh
npm run build:pages
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run verify:export
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run test:e2e
```

## Source-to-page reader

The [Chinese manifest](content/manifest.ts) binds each approved manuscript to its book, stable identifier, slug, order and source fingerprint. [English edition entries](content/english-edition.ts) identify full adaptations and chapter overviews. The [book catalog](config/books.ts) supplies titles, covers, availability and same-language destinations for the two books. Keep an existing public slug when replacing its source. Check old shared headings and saved positions when editing section titles.

The build reads the listed Markdown files, verifies source fingerprints and parses a constrained set of headings, paragraphs, lists, links, code and tables. It resolves internal links before generating the page. Search indexes include the approved body text in the requested language, with its chapter identity and real heading destinations. Keep a pending translation or overview out of that language's body index. See the [content contract](../docs/content-contract.md).

The [print edition](../book/print/volume-one/README.md) has its own ordered source fingerprint and reference PDF. The website links to the downloadable copy. Any new print requires its own pagination, diagram, prototype and link checks.

## Local editorial reading layout

Reading settings live on the device. Appearance and text size have independent resets. Chapter outlines and passage links provide destinations that also work as ordinary browser links. Test a changed or missing fragment, blocked storage, the mobile toolbar, keyboard focus and the visible passage when a split view changes width. Context cards present editable text before copying. Adding a recording requires its reviewed file, duration, source fingerprint and distribution rights in the [recording catalog](content/chapter-recordings.ts).

## Maintained browser verification

Run the smoke group with `npm run test:e2e:smoke` and the full suite with `npm run test:e2e`. Use the freshly built deployment prefix for both. The suite exercises navigation, actual search results, stored reading positions, passage tools and movement between books. Resize from each starting width. Inspect the diagram, the paragraph beside it and the keyboard target after closing an overlay. Device emulation can check responsive behaviour. Record physical-device or assistive-technology observations separately.

### Design stability and release verification gates

[CI](../.github/workflows/ci.yml) runs the quality and static-export gates. The [Pages workflow](../.github/workflows/pages.yml) checks the revision before deploying the rebuilt artifact. Verify the public release metadata at the merge SHA, then walk the ordinary reader route and a saved or shared position. The [release and recovery runbook](../docs/release.md) describes promotion and recovery. [Dated implementation notes](../docs/development-history.md) retain the earlier verification history.

## Optional local measurement

To exercise the collector deliberately on an existing export, pick a free loopback port. For a Pages build:

```sh
node scripts/local-reading-preview.mjs site/out 4398 /vibe-coding-then-what
```

Open the URL printed by the preview, read a chapter or an overview and open the report URL in the same tab. The report counts observed entry sessions, chapter bodies and overviews separately, plus clicks on the print PDF. A click measures the action on the link. The collector runs only in this explicit local preview. The public static site does not send reading events.
