# T-004 · Roles, modes and a lighter process in the repository

## Brief

*Delivery Lead (Claude), 28 November 2026. Base: main after T-003. Executor: Developer. Mode: any.*

**Goal.** The repository works the same way with Codex alone, Claude alone, or both, under [PDR-008](../decisions/pdr-008-roles-and-modes.md), which amends [PDR-006](../decisions/pdr-006-two-desk-workflow.md). The old four-role process documents move to the archive, and the board fits on one screen.

**Already written, to integrate as is:**

- [`docs/team.md`](../team.md);
- [`docs/roles/`](../roles/), six cards;
- [`docs/audience/personas.md`](../audience/personas.md);
- [`docs/tasks/TEMPLATE.md`](TEMPLATE.md);
- [PDR-008](../decisions/pdr-008-roles-and-modes.md).

**Drafts to place** are in [T-004-drafts/](T-004-drafts/).

### 1. Entry and rule files

| Draft | Destination | Before replacing |
| --- | --- | --- |
| `AGENTS.md` | `AGENTS.md` | Archive the old one as `docs/archive/AGENTS-2026-11-27.md` |
| `CLAUDE.md` | `CLAUDE.md` (new). Its first line, `@AGENTS.md`, stays first | — |
| `collaboration.md` | `docs/collaboration.md` | Archive as `docs/archive/collaboration-2026-11-27.md` |
| `chapter-workflow.md` | `book/planning/chapter-workflow.md` | Archive as `docs/archive/chapter-workflow-2026-11-27.md` |
| `PULL_REQUEST_TEMPLATE.md` | `.github/PULL_REQUEST_TEMPLATE.md` | — |
| `CODEOWNERS` | `.github/CODEOWNERS` (comment lines only; the owner line is unchanged) | — |

The new collaboration page keeps the headings "Workspace and main checkout" and "Product desk check", so that the links that point to them keep working. The new chapter workflow keeps the heading "Editorial collaboration: two reviews, distinct questions", for `book/planning/templates/chapter-analysis.md`.

### 2. The board

Move `docs/coordination.md` to `docs/archive/coordination-2026-11-27.md` unchanged. Create a new `docs/coordination.md` of at most about 40 lines, with these headings only:

- **Active now:** at most three tasks, each with its ID, role, tool, worktree and state.
- **Waiting on the author:** the list from the roadmap.
- **Held:** the V3 branches in the PDR-005 disposition table, held until V4 slices reuse them.
- **History:** one link to the archive.

### 3. Old role guides and templates

Move these to `docs/archive/roles-2026-11-27/`, unchanged:

- `docs/coordinator-role.md`, `docs/product-design-role.md`, `docs/writer-sync-prompt.md` and `docs/developer-sync-prompt.md`;
- `docs/handoffs/TEMPLATE.md` and `docs/reviews/TEMPLATE.md`.

### 4. Role names in current documents

In these files, change only the role names and the links to the moved files. Recount the files on the base.

- `docs/agent-notes-policy.md`
- `docs/security/access-policy.md`
- `docs/content-contract.md`
- `docs/release.md`
- `site/IMPLEMENTATION.md`
- `site/DEVELOPMENT.md`
- `book/planning/editorial-brief.md`
- `book/planning/tasks.md`

| Old | New |
| --- | --- |
| Coordinator / Delivery Lead (Coordinator/Reviewer) | Delivery Lead |
| Product & Design Lead · Reader Experience | PM (product decisions) or Designer (design), according to the sentence |
| Writer, Developer | unchanged |
| board | board (`docs/coordination.md`) or task queue (`docs/tasks/README.md`), according to the sentence |
| handoff (as a task record) | the task file's Handoff section |

`book/planning/tasks.md` is reduced to a pointer to the [task queue](README.md) and the [revision plan](../../book/planning/volume-one-revision-plan.md). Move its old content to `docs/archive/book-tasks-2026-11-27.md`.

### 5. Shared skills

Create `.agents/skills/<name>/SKILL.md`, which Codex scans, and add a relative symlink `.claude/skills/<name>` → `../../.agents/skills/<name>`. Frontmatter has `name` and `description` only, and each body is under about 60 lines. Bodies must stay tool-neutral; tool-specific steps belong only in `CLAUDE.md` or the Codex configuration.

| Skill | When it triggers | Body must cover |
| --- | --- | --- |
| `task-brief` | Writing or updating a task file | The template sections; goal, base, steps, must not change, acceptance with exact commands; extra review layers by risk; under about two pages |
| `review-gate` | Reviewing a task before integration | Read the diff and evidence first; check every acceptance item; three verdicts; finding format; recheck after a changed revision; never review your own work; state the reviewer's model |
| `product-review` | A PM stage check | Walk the PRD journeys on the exact revision; record Pass, Pass with follow-ups, or Fix and recheck; keep real-reader evidence separate |
| `audience-panel` | Rehearsing a reading with simulated readers | The [personas](../audience/personas.md) protocol and report template; "Simulated readers. Hypotheses only."; run by the non-writing model |
| `chapter-intake` | Admitting a revised manuscript to the site | Manifest path and hash; search index; links and anchors; English edition registry; `npm run check`, `npm run build:pages`, `npm run verify:export` and the smoke E2E; recording the author's voice pass |
| `release-check` | Preparing or verifying a public release | Root and Pages builds; export check; release metadata; public smoke test; recording the deployed SHA; authorisation before deploying |

**Optional:** one Claude subagent per persona in `.claude/agents/reader-p1.md` … `reader-p5.md`, each with `name`, `description` and `tools: Read, Grep, Glob`, and a body that quotes its persona row and the protocol.

### 6. Tool settings

**`.claude/settings.json`** (committed):

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)", "Bash(npm test)", "Bash(git status*)", "Bash(git diff*)",
      "Bash(git log*)", "Bash(git worktree list*)"
    ],
    "deny": [
      "Bash(git push --force*)", "Bash(git push -f*)", "Bash(git push * main*)",
      "Bash(git reset --hard*)", "Read(./.env*)"
    ]
  }
}
```

**`.codex/config.toml`** (committed):

```toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
```

Do not add `.claude/settings.local.json`, and do not touch the author's `~/.codex/config.toml`.

### 7. Links

**Archived copies keep working links.** Moving a file into `docs/archive/` (or `docs/archive/roles-2026-11-27/`) breaks its own relative links. After each move, rewrite only those link paths so they resolve from the new folder, and add the one-line note "Archived copy. Relative links were adjusted on <date> so they still resolve from `docs/archive/`; nothing else changed." T-003 did the same.

Repoint every link to a moved file. The rule is the same as in T-003:

- **Historical files** (`docs/handoffs/`, `docs/reviews/`, `docs/archive/`, `docs/development-history.md`, `docs/delivery/milestone-1.md`, `docs/delivery/milestone-2.md`): change the path to the archived copy and keep the anchor. Change nothing else.
- **Current files:** point to the new page or the relevant role card.

### Must not change

- Site output and manuscripts.
- The contents of archived files.
- `.github/workflows/` and branch protection.
- The repository slug.
- The author's personal tool configuration.

### Acceptance

- A link checker over `docs/`, `book/`, `AGENTS.md`, `CLAUDE.md` and `.github/` reports no missing file or anchor targets. Record the command and its output.
- `ls -l .claude/skills` shows six relative symlinks that resolve.
- Each archived file differs from its original on the base only in its link lines and the archive note. Show `git diff --word-diff` against the base for each one.
- `docs/coordination.md` is at most about 40 lines.
- `npm run check` and `npm run build:pages` pass, with no site output changed.
- Three smoke tests, reported as observed:
  - Codex lists the six skills.
  - A fresh Claude Code session shows `CLAUDE.md` loaded with `AGENTS.md` imported.
  - One session per mode reads `docs/team.md` and names its own roles correctly.

## Handoff

## Review

## Integration
