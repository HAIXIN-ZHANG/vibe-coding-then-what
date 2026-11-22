# Volume I · Chinese A5 edition

The [downloadable PDF](../../../site/public/downloads/volume-one-zh-a5.pdf) is the reviewed 209-page edition of 22 November 2026. Its [reading order](../../revisions/zh/volume-one-making-of/README.md) contains 51 Chinese chapters. The [edition record](edition.json) identifies the approved PDF bytes, ordered source digest and reference browser.

## Rebuild

Use the project's Node 24 environment and installed packages from the root `package-lock.json`. The reference print environment uses macOS, Swift with PDFKit, locally installed Google Chrome, and Python 3 with the [pinned pypdf dependency](requirements.txt). Page breaks depend on the Songti SC, PingFang SC and Menlo fonts. The renderer uses the pinned Playwright and Markdown libraries in the website lockfile. No publication credentials or hosted services are required.

Run from the repository root:

```sh
node book/print/volume-one/make-volume.mjs --check-inputs
node book/print/volume-one/make-volume.mjs --stage proof-1
```

Each whole-book build writes to a fresh directory under `.artifacts/print/`. Read `proof-1/volume-one-zh-a5.pdf` and `proof-1/source-map.json` there. A repeated run needs a new stage name. The default browser is the local Chrome channel; `VCTW_PRINT_CHROME` can select a compatible executable. `VCTW_PRINT_PYTHON` can select a Python interpreter containing pypdf.

The first pass takes actual destinations from a printed PDF. The second prints those folios into the contents and the paper choices. The checks follow all 54 contents entries, match the ordered prose to each chapter, confirm chapter starts, flag missing folios or oversized figures/tables, and check the physical reveal after the two prototype choice pages. The reviewed book places the choices on facing pages 42–43 and the outcomes on 44–45.

## Release checks

For an edition update, review the new ordered source digest before changing `edition.json`. Rebuild in a new stage, check the chapter boundaries and prototype spreads in a PDF reader, then publish the accepted bytes and record their SHA-256. A reproduced proof can have a different checksum because Chrome writes the production time into PDF metadata. Use this command to identify the distributed copy:

```sh
shasum -a 256 site/public/downloads/volume-one-zh-a5.pdf
```

The [Route C cover](../../assets/covers/cover-c-route-en-zh.png) is the approved print cover. The enrolment figure reuses the [site SVG](../../../site/public/illustrations/home-systems-desktop.svg). The browser diagram comes from the chapter source. The PDF contains the author's credit and a link to the [project content notice](../../../LICENSE-CONTENT.md). Fonts are supplied by the build environment.
