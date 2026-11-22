# Contributing

Help improve **Vibe Coding, Then What?** through corrections, suggestions or a focused pull request. For reading links, available chapters and the book's direction, start with the [README](README.md). This page covers contributing to the book and its supporting website.

## Report a problem or suggest an improvement

Open a [GitHub issue](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/issues) for a typo, incorrect explanation, broken link, accessibility concern or feature suggestion. Where possible, include the page URL and section, what you expected, what happened, and a reliable source if the report concerns a technical claim. A short report is welcome; do not include private information or credentials.

For a security vulnerability, follow [SECURITY.md](SECURITY.md) rather than posting exploit details publicly.

## Propose changes

For a substantial change or a new chapter, start with an issue to discuss scope and evidence. Small, self-contained changes may be proposed through a pull request. Maintainers review proposed changes for technical accuracy, clarity and fit with the book.

Write explanations, examples and diagrams in your own words and design. Do not copy third-party text, images, diagrams or code without permission under applicable terms. Identify external sources and disclose any third-party material and its license. Do not submit private, employer-confidential or personal information.

## Choose the language for your change

Write chapters, captions, figure descriptions and navigation in the language of the edition. For a translated chapter, preserve what the original claims, including its uncertainty, and adapt the examples and humour where a literal translation would lose the point. Keep code identifiers, API names and product names in their original form.

Use English for shared contributor and developer instructions, release procedures, filenames and design-layer names. Add a short English note to a Chinese design specimen when someone inspecting the source needs to understand the interaction. A Chinese editorial outline, author reading note or localized reader guide can stay in Chinese. Link to the document that owns each decision so there is only one set of instructions to maintain.

## Run the website locally

Use **Node.js 24** and **npm 11**, as specified by [.nvmrc](.nvmrc) and [package.json](package.json). Run commands from the repository root. The examples below use a POSIX shell, such as macOS or Linux:

```sh
npm ci
NEXT_PUBLIC_BASE_PATH='' npm run dev
```

Open the address printed by Next.js, normally `http://localhost:3000/`. The English and Chinese entries are `/` and `/zh/`. Each edition’s contents show which chapters you can read in that language. There is no database or application backend to configure. Installation and development commands generate the required PandaCSS files automatically.

See the [developer guide's setup](site/DEVELOPMENT.md#environment-and-commands) for implementation details and [source-to-page contract](site/DEVELOPMENT.md#source-to-page-reader) for reviewed manuscript intake. A draft file does not automatically become a website chapter. Keep changes focused; do not update manuscript hashes or the chapter allowlist to bypass review.

## Validate a website change

Run the quality checks, then build and verify the root-path export:

```sh
npm run check
NEXT_PUBLIC_BASE_PATH='' npm run build
NEXT_PUBLIC_BASE_PATH='' npm run verify:export
```

`check` runs lint, strict application/tooling TypeScript checks and Node tests. To check rendered behavior, install the project's Chromium browser if needed, then test the export just built:

```sh
npm run test:e2e:install
NEXT_PUBLIC_BASE_PATH='' npm run test:e2e
```

Also verify the GitHub Pages project path before proposing a website change:

```sh
npm run build:pages
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run verify:export
NEXT_PUBLIC_BASE_PATH=/vibe-coding-then-what npm run test:e2e
```

Browser tests use the local static export in `site/out/`, start their own server at `127.0.0.1:4179` and do not build automatically. Keep the base path identical for each build, verifier and browser run; each build replaces the previous export. The [browser verification guide](site/DEVELOPMENT.md#maintained-browser-verification) covers Linux browser prerequisites and failure traces. Generated output, local notes and browser artifacts do not belong in commits.

In a pull request, describe the problem, the change and the checks actually performed, including anything untested. The [CI workflow](.github/workflows/ci.yml) runs quality checks and both export/browser configurations. For a documentation-only correction, check the affected wording, links and command references; distinguish source inspection from commands you actually ran.

## Release and recovery

A pull request, review, merge and public deployment are separate steps. Merging does not automatically publish the website. Maintainers use the manual [Pages release workflow](.github/workflows/pages.yml); the [release and recovery runbook](docs/release.md) explains exact-revision checks, dispatch, public verification and recovery from an observed known-good release. Follow that runbook for release operations rather than treating a local build as publication.

## Licensing status

Project source code and original programming samples are offered under the [MIT License](LICENSE); original book prose and teaching diagrams in `book/drafts/` are offered under [CC BY-SA 4.0](LICENSE-CONTENT.md). Before proposing a contribution, ensure you have the rights needed to submit it under the applicable project license, identify any third-party material and discuss exceptions with a maintainer. Do not assume a contribution changes ownership of your work or that these terms override third-party rights.
