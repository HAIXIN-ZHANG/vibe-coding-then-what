@AGENTS.md

## Claude-specific notes

- **Start of every session:** read the [task queue](docs/tasks/README.md) and the open pull requests. Pick up anything `In review`, and never start a task that Codex has claimed ([collaboration](docs/collaboration.md#talking-between-ais-in-dual-mode)).
- **Roles:** check [`docs/team.md`](docs/team.md) for which roles Claude holds now. In dual mode those are PM, Designer, Delivery Lead and the audience panel for pieces Codex wrote.
- **Large changes go to the Writer or Developer.** A change that touches more than a few files, or revises more than one chapter, gets a brief written with the `task-brief` skill.
- **Dispatching to Codex:**
  - Start the Claude session inside `.local/worktrees/<task-id>`, because the Codex plugin works in the current checkout.
  - Run `/codex:rescue --background`, then collect the result with `/codex:result`. Send fixes with `--resume`.
  - Never dispatch from the author's checkout. Do not enable the plugin's stop-hook review gate.
- **Reviewing:** use the `review-gate` skill. Never review work Claude executed; send Claude's own designs and decision records to `/codex:adversarial-review`.
- **Audience panel:** use the `audience-panel` skill, or one subagent per persona if `.claude/agents/` defines them.
- **Phases:** follow the roadmap's order-of-work rules. Do not propose promotion work before Phase 3, and put ideas from a later phase in the backlog.
- **Codex unavailable:** its tasks wait. Do not take them over unless the author says so. If the author does, record the review of that work as **Pass (not independent)**.
- **Design:** the design of record is the repository file `docs/design/v4/reader-v4-design.html`, with tokens and components in the Editorial Reader design system ([status](docs/design/v4-status.md)). Figma is optional and the older file is reference only.
