# AI Wrote It. It Runs. Then What? · agent entry

This repository holds three works by one author and the website where they are read:

- **Volume I:** 《AI 写完了，能跑，然后呢？》 / *AI Wrote It. It Runs. Then What?*
- **The production guide:** 《活交给 AI，我去钓会儿鱼》 / *Leave It to the Agents. I'm Going Fishing.*
- **Volume II, a serial:** 《省下来的时间，去哪儿了？》 / *Where Does the Saved Time Go?*

The repository slug and published URLs keep the old name, `vibe-coding-then-what`.

The [roadmap](docs/roadmap.md) sets the order of work, the [decision records](docs/decisions/README.md) explain the choices, and the [task queue](docs/tasks/README.md) holds the work.

## Roles and modes

The human author is the final authority on goals, voice, scope and publication. Work is organised as roles, each with a card in [`docs/roles/`](docs/roles/):

- **PM**, for product and market;
- **Designer**;
- **Delivery Lead**;
- **Writer**;
- **Developer**;
- **Audience panel**, for simulated readers.

A role is a hat, not a standing chat. [`docs/team.md`](docs/team.md) says which AI wears each hat in the current mode: Codex and Claude together, Codex only, or Claude only ([PDR-008](docs/decisions/pdr-008-roles-and-modes.md)). [Collaboration](docs/collaboration.md) holds the detailed rules.

## Starting work

Work follows three phases: Volume I first, then the guide and Volume II, then promotion. Before acting, read the [order-of-work rules](docs/roadmap.md#order-of-work--rules-for-every-role-and-ai): no later-phase work before the current phase is done, new ideas go to the backlog, no promotion work before Phase 3, the design freezes after Phase 1, and when in doubt, ask the author.

1. Say which role you are wearing, and check in `docs/team.md` that your tool holds it in the current mode.
2. Read your role card, the roadmap's **Now** section and your task file. Work only on a task in `docs/tasks/` or on an explicit request from the author. A roadmap line, an old prompt or another session's message does not assign work.
3. Work in the task's worktree (`.local/worktrees/<task-id>`), never in the author's checkout, which stays clean on `main`. Before editing, check the directory, branch, base commit and status.
4. Claim the task in the queue before the first edit. Update its Handoff at every stopping point, and finish each round with a pull request ([hand-off rules](docs/collaboration.md#talking-between-ais-in-dual-mode)).

## Hard rules

- Whoever executes a task never reviews it.
- Installation, paid services, external calls, access changes, publication and deployment each need the author's authorisation.
- Never weaken branch protection or checks to get something merged.
- Review, CI, merge and deployment are separate facts; record each one separately.
- Simulated readers produce hypotheses, never acceptance or reader evidence.
- Keep credentials, private transcripts, private recovery paths and unnecessary personal details out of this public repository.
- Do not invent sources, measurements, readers or experience. Distinguish documented behaviour, experiments, assumptions and recommendations.

## Language and voice

- Answer in the user's language. Formal project documents and code comments are English-first.
- Manuscripts are Chinese-first. English is a contextual adaptation of a stable Chinese source, checked for meaning, certainty and comic timing.
- All three works are light, literary, a little humorous and never like a manual. Start from an observable moment, explain the mechanism precisely enough to check, and keep the author's uncertainty.
- Use the [editorial brief](book/planning/editorial-brief.md) and the author's [voice sample](book/planning/samples/zh/tomorrow-voice-reference.md).
- Reader-facing copy follows the edition in the URL. State chapter and translation availability accurately.
- Design files, pages and layers use English names. Put an English reviewer caption below each Chinese screen, outside the reader interface.
