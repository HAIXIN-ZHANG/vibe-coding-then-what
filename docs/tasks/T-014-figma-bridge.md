# T-014 · Figma bridge plugin: start once, draw from descriptions

## Brief

*Delivery Lead (Claude), 28 November 2026. Base: main. Mode: dual. Codex builds the plugin and Claude reviews it. **First in the queue (author, 28 November): Codex starts here.***

- **Goal.** The author starts one plugin in Figma's desktop app once per session. After that, Claude or Codex can draw and redraw designs in the author's own Figma draft with no further clicks, and check each result from exported images and a measurement report. This replaces the paid Figma MCP write path, which the author's free Starter plan with a View seat cannot use ([v4 status](../design/v4-status.md)).
- **Executor.** Developer (Codex). **Reviewer.** Delivery Lead and Designer (Claude).

### How it works

```text
Claude or Codex ── writes ──▶ description file (JSON)
                                      │
local receiver (Node, 127.0.0.1 only) ◀── polls every few seconds ── Figma plugin (open in the desktop app)
        ▲                                                              │ draws with the Figma Plugin API
        └──────── PNG exports + JSON report ◀──────────────────────────┘
```

1. **Plugin** (`tools/figma-bridge/plugin/`).
   - Contains `manifest.json`, `code.js` and `ui.html`, written in plain JavaScript with no build step and no dependencies.
   - The author imports it once with Plugins → Development → Import plugin from manifest.
   - When run, it opens a small window that stays open. It polls the receiver for a new description, draws it, and posts back the results.
   - Network access is limited to the receiver: `devAllowedDomains` lists `http://localhost:<port>` only.
2. **Receiver** (`tools/figma-bridge/receiver.mjs`).
   - Uses only Node's built-in modules, with no `npm install`.
   - Binds to `127.0.0.1` only. It serves the latest description from a folder and saves what the plugin posts back.
   - Needs a session token: the receiver prints a random token at start, the author pastes it once into the plugin window, and the receiver rejects any request without it.
3. **Description format** (`tools/figma-bridge/SCHEMA.md`, plus a JSON Schema).
   - A generic tree, not a hard-coded screen:
     - frames with auto layout;
     - rectangles, ellipses and lines;
     - text, with family, style, size, line height, letter spacing and alignment;
     - SVG imported as editable vectors;
     - images, placed from a local file path that the receiver serves as bytes;
     - components and instances.
   - Every colour, size and type value can refer to a design variable by name instead of a literal.
   - Each draw replaces the nodes it created last time under a named page and frame, and never touches other nodes in the file.
4. **Variables.** From the design system's `tokens.json`, create one Figma variable collection for colour, with the eight themes as modes, plus collections for spacing, radius and size. Represent the three accents so that switching accent re-points the accent aliases, matching the design system's README.
5. **Report.** After each draw, export every top-level frame as PNG at 1× and 2×. Write a JSON report that lists, for every node:
   - its name, type, position and size;
   - its fill and stroke, and whether each is bound to a variable;
   - its font, size, line height and letter spacing;
   - its auto-layout padding and gap.

   The report also lists every missing font and every failed image or SVG.

### Privacy

The plugin, the receiver and the schema are generic and go in the public repository. Descriptions of real screens use the private design system, so they live in `.local/figma-bridge/` (git-ignored), next to `.local/design-system/`. Example descriptions in the repository use made-up values only.

### Steps

1. Build the receiver and the plugin, with the token and the localhost-only binding.
2. Write the schema and the variable import.
3. Write one public example description (`tools/figma-bridge/examples/smoke.json`). It covers:
   - a frame with auto layout;
   - text in Spectral and in Noto Serif SC;
   - one rectangle bound to a variable;
   - one imported SVG;
   - one placed image with editable text on top.
4. Write `tools/figma-bridge/README.md`. It covers how to import the plugin, how to start the receiver (`node tools/figma-bridge/receiver.mjs`), how to paste the token, how to stop, and what the plugin can and cannot touch.
5. Run the smoke test with the author (see Acceptance). The author starts the plugin. Codex does not operate the author's Figma.

### Must not change

- The site, its tests and its dependencies.
- No new npm packages.
- No third-party Figma plugins or bridges.
- No Figma REST API tokens.
- Nothing in the author's existing Figma files: drawing happens only in a draft that the author names.

### Acceptance

- **Start once, many draws.** The author runs the plugin once. Without restarting it, three successive descriptions (the smoke test, then two edits to it) are drawn, exported and reported. The receiver log shows each round.
- **Fidelity.** In the smoke test, every colour is bound to a variable, switching the variable mode from White to Paper · dark recolours the frame, the SVG is an editable vector, and the image sits under editable text. The report's numbers match the description within 1 px.
- **Safety.**
  - Requests without the token are rejected; show the log line.
  - The receiver is not reachable from another machine on the network; show that it binds to `127.0.0.1`.
  - Drawing a second time leaves nodes the plugin did not create untouched.
- **Failure reporting.** A missing font, a bad SVG and a missing image file each appear in the report, and the draw does not stop at the first error.
- `npm run check` still passes. The new files are linted if the existing lint already covers `tools/`; otherwise say so.

### Review

Claude reviews:

- the code, especially the network surface;
- the schema, checking it can express the V4 frames;
- one round-trip run, comparing the PNGs and the report with the description.

If it passes, Claude writes the V4 descriptions and draws the design into the author's draft, one section at a time.

## Handoff

## Review

## Integration
