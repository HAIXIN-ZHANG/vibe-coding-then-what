# PDR-006 · Two-desk workflow: Claude reviews and designs, Codex executes

Status: **Accepted.** On 27 November 2026 the author asked to move review, design, research and exploration to Claude and to use Codex mainly for execution. The author delegated the remaining choices to the reviewer, who decided them as recorded below. The author may override any of them. Decision-maker: author, with delegated detail. Recorded: 27 November 2026 against main `9acaa05`. Implementation PR: none. Executed together with the [PDR-005 adoption sequence](pdr-005-project-purpose.md#adoption-sequence). **Amended by [PDR-008](pdr-008-roles-and-modes.md) on 28 November 2026:** roles replace the two desks, and the desk table below now means the roles each tool holds in dual mode.

## Context

The project ran four role chats in one tool: Coordinator, Writer, Developer, and Product & Design. All four used the same model. Peer review between them was therefore not independent, and the author was not satisfied with the design and review output. The author wants a second tool with a different job: Claude Code for judgment, Codex for execution.

## Decision

**Desks.**

| Work | Desk |
| --- | --- |
| Product direction, PRD, decision records, design and Figma | Claude |
| Market and source research, exploration, task briefs and acceptance criteria | Claude |
| Final review before any merge | Claude |
| Website code, tests, PDF/export, migrations, renames, repository restructuring, manuscript revision batches | Codex |
| Commit, PR, CI and merge after Claude's approval and the author's authorisation | Codex |
| Reader verdict | Real readers and the author. Claude provides design critique only |

**Independence.**

- Claude does not approve its own design or prose.
- Claude's designs and decision records get a Codex adversarial review. Claude's prose also gets the author's voice pass.
- Codex's code and prose are reviewed by Claude.

**Amendment · 28 November 2026: Claude plans, Codex makes the large changes.** The author clarified the split: Claude mainly plans, and large concrete changes go to Codex.

- **Claude:**
  - plans, decides and specifies;
  - writes task briefs and acceptance criteria;
  - writes short reference samples that set a standard, such as the preface opening, the part openers and the trimmed Part 8 chapter of 27 November;
  - reviews.
- **Codex** carries out large or multi-file changes:
  - renames;
  - document migrations and link repointing;
  - repository restructuring;
  - site changes;
  - manuscript revision batches;
  - integration.
- **Rule of thumb:** a change that touches more than a few files, or revises more than one chapter, gets a task brief in [`docs/tasks/`](../tasks/README.md), and Codex executes it.

**Who writes manuscripts.** This supersedes the 27 November rule, under which Claude was the default writer for flagship pieces, with a blind comparison.

- Claude writes the revision plan for each chapter, plus at most one reference sample per batch.
- Codex drafts the batch against that plan and the author's voice sample.
- Claude reviews the draft, and the author does the voice pass.

The blind comparison is no longer required. The author may still ask for one.

**Communication.** In order of preference:

1. **The repository is the contract.** Use one file per task, `docs/tasks/T-xxx.md`, with Brief, Handoff, Review and Integration sections:
   - Claude writes the Brief and the Review;
   - Codex writes the Handoff and the Integration notes.
2. **Delegation from Claude Code.** Use the official [`openai/codex-plugin-cc`](https://github.com/openai/codex-plugin-cc):
   - `/codex:rescue --background` hands over a task;
   - `/codex:adversarial-review` challenges a design.
   
   It works in the checkout where the Claude session runs, so start that session inside the task's worktree. Do not enable its stop-hook review gate, which the README warns drains usage limits.
3. **Direct CLI.** `codex exec -C <worktree> -s workspace-write -o <file>` runs a bounded task. `codex queue --thread <name> --message <text> --resume` adds a message to an existing Codex session. These were checked against the local `codex-cli 0.171.0-alpha` help on 27 November 2026; flags may change.
4. **Codex calling Claude.** Use `claude -p --output-format json`, with `--resume` to continue. Do not rely on `claude mcp serve`, which is not documented. `codex mcp-server` is deprecated.

**Repository structure for both tools.**

- `AGENTS.md` stays the shared, tool-neutral entry. Claude Code reads it when no `CLAUDE.md` exists.
- Add `CLAUDE.md` whose first line is `@AGENTS.md`, followed only by Claude-desk notes. Once `CLAUDE.md` exists, Claude reads only `CLAUDE.md` and its imports.
- Shared skills live in `.agents/skills/<name>/SKILL.md`, which Codex scans. Each skill is symlinked into `.claude/skills/`. Use only the portable frontmatter fields, `name` and `description`. Initial skills: `task-brief`, `review-gate`, `chapter-intake`, `release-check`.
- Commit `.claude/settings.json`:
  - allow the project's npm scripts and `codex exec`;
  - deny force-push, pushes to `main` and `git reset --hard`.
  
  Keep `.claude/settings.local.json` uncommitted.
- Add `.codex/config.toml` with workspace-write sandboxing and on-request approvals.
- Archive the four role guides. The desk rules live in one page, [Collaboration](../collaboration.md), instead of separate desk guides (amended 28 November 2026, to keep the number of documents down). Existing handoffs and reviews remain unchanged as history.

**File ownership.**

- Claude writes `docs/decisions`, `docs/product`, `docs/design`, and the Brief and Review sections of `docs/tasks`.
- Codex writes `site/`, `tests/` and `scripts/`, and the Handoff and Integration sections of `docs/tasks`.
- In `book/`, Codex writes the revision batches. Claude writes only the per-chapter revision plans and the reference samples named in a task brief.
- Two desks never edit the same file in the same task.

## Design amendments to PDR-003

These are decided by the reviewer under the author's delegation:

- **One accent colour** instead of six. Readers can choose a paper background (white, paper, light grey, dark) instead. *Superseded on 28 November by [PDR-009](pdr-009-reader-feature-triage.md): three accents, and paper tones White, Paper, Mist and Quiet grey, each with a dark version.*
- **Serif body text**, option A, chosen by the author. The web-font loading strategy is part of the V4 design.
- **No horizontal chapter swipe** (the print-edition viewer is frozen) and **no end-of-chapter pull** in the main flow. An explicit next-chapter control remains. Bottom sheets are allowed on mobile when a visible button opens them.
- The V4 Figma redesign happens in a new file, because the existing file is read-only for the connected account. The original file is preserved.

## Alternatives considered

- **Keep four roles in Codex.** Rejected: same-model peer review is not independent, and the author is not satisfied with the results.
- **Move everything to Claude.** Rejected: one tool would review its own work again, and Codex remains useful for bounded execution.
- **Let the plugin drive Codex directly in the author's checkout.** Rejected: it breaks [PDR-004](pdr-004-author-main.md). Delegation always runs inside a task worktree.

## Prerequisites

- The author installs the plugin (`/plugin marketplace add openai/codex-plugin-cc`, `/plugin install codex@openai-codex`, `/codex:setup`) and signs in to Codex. The plugin and the Codex app share one usage limit.
- Figma edit access for the connected account, or a new file in its drafts.
- Pause the existing Codex role chats before the structure changes, so two desks do not edit the board, roadmap or collaboration files at the same time.

Evidence: [Claude Code memory and AGENTS.md](https://code.claude.com/docs/en/memory.md), [Claude Code skills](https://code.claude.com/docs/en/skills.md), [Claude Code settings](https://code.claude.com/docs/en/settings.md), [Claude Code headless mode](https://code.claude.com/docs/en/headless.md), [Codex skills](https://learn.chatgpt.com/docs/build-skills.md), [Codex plugin for Claude Code](https://github.com/openai/codex-plugin-cc).
