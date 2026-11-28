# Chapter workflow

Updated 28 November 2026. This page covers how a chapter goes from plan to published text. Roles are defined in [`docs/roles/`](../../docs/roles/). The current batch order is in the [structure and revision plan](volume-one-revision-plan.md), and the voice is set by the [editorial brief](editorial-brief.md) and the author's [voice sample](samples/zh/tomorrow-voice-reference.md). The earlier analysis-first workflow is [archived](../../docs/archive/chapter-workflow-2026-11-27.md).

## The path of one chapter

| Step | Who | Produces | Moves on when |
| --- | --- | --- | --- |
| 1. Revision plan | PM, or the Delivery Lead for a batch | The chapter's question, the reader's starting point, the mechanism and its conditions, the example or figure, joins to its neighbours, and a decision to keep, deepen or merge. Written after reading the whole piece | The plan is in the task brief |
| 2. Draft | Writer | A full draft within the plan, with checkable claims cited | The Handoff lists what changed and what is uncertain |
| 3. Audience panel | The model that did not write it | Persona reports: where readers stalled, their explanation, revision prompts | Prompts are taken in or explicitly declined |
| 4. Review | Delivery Lead | A verdict against the plan and the standards below | Pass |
| 5. Voice pass | Author | Accepted wording | The author says so |
| 6. Intake | Developer | The chapter admitted under the [content contract](../../docs/content-contract.md) with the `chapter-intake` skill | Integrated; publication is separate |

A substantive change to the mechanism, the evidence or the scope during drafting goes back to step 1. Ordinary wording edits do not.

## Editorial collaboration: two reviews, distinct questions

The plan and the draft answer different questions, and both are checked.

**At the plan:**

- What recognisable moment makes the reader care?
- Why was the original decision plausible?
- What should the reader be able to explain afterwards?
- Is the example technically sound, with its assumptions stated?

**At the draft:**

- Do the scene and the mechanism stay connected?
- Does each detail earn its space?
- Can the reader follow without looking terms up?
- Is the voice light and literary, without lecturing, forced jokes or decorative metaphor?
- Are the facts, versions and conditions right?

Correctness cannot wait for the draft. An entertaining explanation must still be true.

## Standards for every revised piece

- Open on something a reader can see happen, and build the scene: what someone wants, what they know and what follows their choice ([scene-led direction](samples/zh/scene-led-technical-writing-20261127.md)).
- Pause where a real decision arises; let the reader guess, then answer with the mechanism and its conditions. Irony comes from the situation's own contradiction and is explained.
- Explain the mechanism and its conditions precisely enough to check. Use a worked example, numbers or a figure where prose alone leaves the reader guessing.
- Let the reader reason about one changed condition.
- Label teaching assumptions near their first use, and keep them apart from the author's real experience.
- Use narrative headings, not a taxonomy. Add a short sources list when the piece makes checkable claims.
- Keep it to one sitting's read. A revision may grow to one and a half or two times its length.
- English is an adaptation: it keeps meaning, certainty and comic timing, keeps code and technical names as they are, and records its source revision.

## Files

- Revision candidates go in `book/revisions/zh/<batch>/`. The published comparison edition is never edited in place.
- Each chapter's plan lives in its task brief, not in a separate analysis file. The older analyses under `analyses/` are history.
- Evidence the reviewer needs belongs in the task file, not in scratch notes.
