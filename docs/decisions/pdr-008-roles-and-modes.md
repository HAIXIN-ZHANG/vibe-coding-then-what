# PDR-008 · Roles as hats, bound to AI tools by mode

Status: **Accepted.** On 28 November 2026 the author asked for these roles: a PM for product and market, a Designer, a Delivery Lead for tasks and stage reviews, a Developer and a Writer for front-line work, and a set of audience-test roles. The project must work with one AI (Codex only) or two (Codex and Claude). The author asked the reviewer to fix the design where needed, and accepted the result. Decision-maker: author. Recorded: 28 November 2026 against main `9acaa05`. This record amends [PDR-006](pdr-006-two-desk-workflow.md); the parts it does not change still apply.

## Context

PDR-006 split the work into two tool desks: Claude for judgment, Codex for execution. The author now wants recognisable roles again. The earlier experience with standing role chats in one tool showed two costs: process documents grew to about 260,000 words, and same-model peer review was not independent ([PDR-006](pdr-006-two-desk-workflow.md#context)).

## Decision

**A role is a hat, not a standing chat.** Roles say what work is done and how it is accepted. A [team file](../team.md) says which AI wears each hat in the current mode. Switching between one and two AIs changes only that file.

| Role | Owns | Reviews | Card |
| --- | --- | --- | --- |
| **PM**, product and market | Direction, PRD, priorities, market and reader research, decision records | Stage acceptance: is this the right thing for readers? It does not review every task | [pm](../roles/pm.md) |
| **Designer** | Reading experience, design system, Figma | Design fidelity on reader-visible tasks | [designer](../roles/designer.md) |
| **Delivery Lead** | Task breakdown, briefs, sequencing, integration decisions | Task review: was the brief done correctly, with evidence? | [delivery-lead](../roles/delivery-lead.md) |
| **Writer** | Manuscript drafts and adaptations against a revision plan | None | [writer](../roles/writer.md) |
| **Developer** | Site, tests, tooling, migrations; Git operations after approval | None | [developer](../roles/developer.md) |
| **Audience panel** | Simulated reader runs from five persona cards | Hypotheses only, never acceptance | [audience-panel](../roles/audience-panel.md) |
| **Author** | Goals, voice, scope, publication | The voice pass, the final reader verdict with real readers, and authorising publication | — |

**Layered review, by risk.**

- Every task gets a Delivery Lead review.
- Reader-visible tasks also get a Designer check and an audience-panel run.
- Stage checkpoints add the PM's acceptance.
- Prose and publication always end with the author.

No task passes through every layer by default.

**Independence.**

- Whoever executes a task never reviews it.
- With two AIs, the reviewer and the audience panel use the model that did not produce the work.
- With one AI, review happens in a fresh session that works from the review checklist, and the record says plainly that the reviewer is the same model.

**Modes** (set in the [team file](../team.md)):

| Role | Dual: Codex + Claude | Codex only | Claude only |
| --- | --- | --- | --- |
| PM, Designer, Delivery Lead | Claude | Codex, each in its own session | Claude |
| Writer | Codex. Claude writes only revision plans and reference samples | Codex | Claude |
| Developer | Codex | Codex | Claude |
| Audience panel | The model that did not write the piece | A fresh Codex session | A fresh Claude session |

**Communication in dual mode.**

- **Claude orchestrates in one direction.** The Delivery Lead dispatches a task from the task's worktree with `/codex:rescue --background`, then collects it with `/codex:result`. It reviews the actual diff and sends fixes with `--resume`.
- **Codex does not call Claude back.** When the author opens Codex directly, it reads the [task queue](../tasks/README.md) and the task file.
- **The task file holds the record;** no chat relay is needed. Each role writes only its own section.

**Efficiency rules.**

- At most two writing streams and one engineering stream run at a time.
- Acceptance commands are written in the brief.
- Parallel tasks touch disjoint files.
- Status lives only in the queue, and decisions live only in decision records.

## Consequences

- **New documents:** [team file](../team.md), six [role cards](../roles/), the [audience personas](../audience/personas.md) and the [task template](../tasks/TEMPLATE.md). The four 26 November role guides are archived by T-004.
- **Rewritten:** `AGENTS.md`, `CLAUDE.md`, the collaboration page, the chapter workflow and the PR template. Drafts are in [T-004-drafts](../tasks/T-004-drafts/). Older references to the "Claude desk" and "Codex desk" now mean the roles that each tool holds in dual mode.
- **Shared skills:** six instead of four, adding `audience-panel` and `product-review`.
- **Evidence status:** simulated readers stay labelled as simulated. A panel report can trigger a revision but can never accept one.
