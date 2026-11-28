# T-011 · Volume I flagship revision and Part 8

## Brief

*Delivery Lead (Claude), 28 November 2026. Base: main after T-007. Mode: dual (Codex drafts as Writer, Claude reviews, the author does the voice pass).*

- **Goal.** The five flagship pieces and Part 8 meet the [PRD content standard](../product/volume-one-public-edition.md#content-standard-for-revised-pieces). Each is admitted to the site with its status set to `revised`. A reader can explain each piece's mechanism in their own words and check one claim from it.
- **Executor.** Writer (Codex).
- **Inputs.**
  - The [per-chapter plans](../../book/planning/phase-one-chapter-plans.md): what each piece keeps, deepens or moves, its figures, the changed condition, its joins, the target length and what to verify.
  - The [revision plan](../../book/planning/volume-one-revision-plan.md) and [scene-led direction](../../book/planning/samples/zh/scene-led-technical-writing-20261127.md).
  - The author's [voice sample](../../book/planning/samples/zh/tomorrow-voice-reference.md).
  - The [V4 figure style](../design/v4/reader-v4-design.html#content).
  - For F4 and F5, the Writer's [standard-sample handoff](../handoffs/writer/m4-standard-samples.md).

### Rounds

Work one piece per round, in the order of the plans' [order of work](../../book/planning/phase-one-chapter-plans.md#order-of-work):

1. F1.
2. F2.
3. F4 (review of the existing r1, then a revision).
4. F5 (review of the existing r1 after T-012, then a revision).
5. Part 8: 43, then 44 and 46 together, then 45, F3 (47) and 48, then a join pass over 49 and 50.

Each round has these steps:

1. **Draft** in `book/revisions/zh/volume-one-p1/<slug>.md`. Never overwrite `volume-one-making-of/`, which stays the comparison edition.
2. **Figures** as SVG in `site/public/figures/<chapter>/`, each with a caption and a text description in the manuscript, following the V4 style guide. The Developer wires them in only after the manuscript passes.
3. **Handoff** in this file, for each piece:
   - its length;
   - what changed against the plan, and why if it departed;
   - each source checked, with the anchor;
   - every example number, marked fictional or measured.
4. **Review** by the Delivery Lead: Pass, Pass with follow-ups, or Fix and recheck.
5. **Panel.** F1 and F2: P1, P2. F3 and Part 8: P1, P2, P3. F4 and F5: P1, P2. Simulated readers. Hypotheses only.
6. **Author voice pass.** Nothing is admitted without it.
7. **Admission** by the Developer, as in T-007: manifest path and hash, search index, links, `revision: 'revised'`, and the figures.

### Must not change

- The comparison edition in `volume-one-making-of/`, the 209-page PDF, and the English adaptations, which change only in Phase 3 (PRD O08 and O10).
- The fictional course world: 小林, the teacher, the two schools, R17, the 北门 and 南门. Characters may gain lines, not new backstories.
- Titles of pieces, unless the plan proposes a change and the author approves it.

### Acceptance

- Each piece is within its target length, or its Handoff explains why not.
- Every source link resolves, and the cited passage says what the text claims.
- No unlabelled measurement. F5's SQL is either run (T-012 transcript linked) or labelled "未实际运行".
- `npm run check`, `npm run build:pages` and `npm run verify:export` pass after each admission.
- After the whole batch, the reader trial runs ([plan](../audience/reader-trial-plan.md)).

## Product and design notes

## Handoff

## Panel

## Review

## Integration
