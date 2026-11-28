# T-xxx · <task name>

Each section is written once per round by the role named. A rework round appends to the same section.

## Brief

*Delivery Lead, <date>. Base: <commit or "main after T-yyy">. Mode: <dual / Codex only / Claude only>.*

- **Goal:** what is true when this is done, for a reader or for the repository.
- **Executor:** Writer or Developer, as held in the [team file](../team.md).
- **Inputs:** revision plan, design frames and decisions to follow.
- **Steps:**
- **Must not change:**
- **Acceptance:** exact commands and checks, and the evidence to record.
- **Extra layers** (reader-visible tasks only): Designer check, audience panel personas, PM stage check.

## Product and design notes

*PM or Designer, only if the brief asks for them.*

## Handoff

*Writer or Developer.* Changed files, what was checked and how (with real output), what was not run, and open questions. Update it at every stopping point, not only at the end. Record the branch and its head commit, and the next step, so that another session can continue from this file alone.

## Panel

*Audience panel, only if the brief asks.* Use the [report template](../audience/personas.md#report-template).

## Review

*Delivery Lead.* Verdict: Pass, Pass with follow-ups, or Fix and recheck. Findings: location, expected, blocking or not. State whether the reviewer is the same model as the executor; if so, the verdict reads **Pass (not independent)** and an independent review is still owed.

## Integration

*Developer, after a Pass and the author's authorisation.* PR, head, required checks and merge. Deployment, if authorised, is recorded separately.
