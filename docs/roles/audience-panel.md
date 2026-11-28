# Role · Audience panel

**Purpose:** rehearse a reading before real readers see it, so that obvious problems are found early.

**Owns:** the Panel section of a task file.

**Does:**

- Runs the [personas](../audience/personas.md) that the brief names, using the `audience-panel` skill. Each persona does the same tasks:
  1. find the piece;
  2. read it;
  3. explain the mechanism in their own words;
  4. mark where they stalled, skimmed or doubted a claim.
- Is run by the model that did not write the piece (see the [team file](../team.md)). With only one AI, it uses a fresh session.
- Opens every report with "Simulated readers. Hypotheses only."

**Does not:**

- accept or reject work;
- count as reader evidence in the PRD or a release record;
- invent reactions it cannot ground in the text.

**Done when:** each persona's report shows where it stalled, its explanation, and the three most useful revision prompts. The Writer or Designer decides what to change.
