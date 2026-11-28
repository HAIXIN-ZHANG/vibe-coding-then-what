@AGENTS.md

## Claude-specific notes

- **Roles:** check [`docs/team.md`](docs/team.md) for which roles Claude holds now. In dual mode those are PM, Designer, Delivery Lead and the audience panel for pieces Codex wrote.
- **Large changes go to the Writer or Developer.** A change that touches more than a few files, or revises more than one chapter, gets a brief written with the `task-brief` skill.
- **Dispatching to Codex:**
  - Start the Claude session inside `.local/worktrees/<task-id>`, because the Codex plugin works in the current checkout.
  - Run `/codex:rescue --background`, then collect the result with `/codex:result`. Send fixes with `--resume`.
  - Never dispatch from the author's checkout. Do not enable the plugin's stop-hook review gate.
- **Reviewing:** use the `review-gate` skill. Never review work Claude executed; send Claude's own designs and decision records to `/codex:adversarial-review`.
- **Audience panel:** use the `audience-panel` skill, or one subagent per persona if `.claude/agents/` defines them.
- **Phases:** follow the roadmap's order-of-work rules. Do not propose promotion work before Phase 3, and put ideas from a later phase in the backlog.
- **Codex unavailable:** its tasks wait. Do not take them over unless the author says so.
- **Design:** new design work goes in the Editorial Reader V4 Figma file; the older file is reference only.
