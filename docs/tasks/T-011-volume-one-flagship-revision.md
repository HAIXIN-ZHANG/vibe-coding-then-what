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
4. F5 (review of the existing r1 against the T-012 desk trace, then a revision).
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
- No unlabelled measurement. F5's SQL says it was traced against the PostgreSQL 18 documentation and not run, linking the desk trace, unless a later run replaces that.
- `npm run check`, `npm run build:pages` and `npm run verify:export` pass after each admission.
- After the whole batch, the reader trial runs ([plan](../audience/reader-trial-plan.md)).

## Product and design notes

## Handoff

## Panel

## Review

### F4 · 校方想少点一下 · Writer r1 · 28 November 2026

*Delivery Lead (Claude), against the [F4 plan](../../book/planning/phase-one-chapter-plans.md). Manuscript: [`p2-one-less-click.md`](../../book/revisions/zh/volume-one-standard-samples-20261126/p2-one-less-click.md), Writer r1, SHA-256 prefix `c9461126`. Independent: Codex wrote it and Claude reviewed it.*

**Verdict: Fix and recheck.** The thinking is the strongest in the batch, so revise only what is listed here. Do not redraft.

What already meets the [content standard](../product/volume-one-public-edition.md#content-standard-for-revised-pieces):

- **The opening** is a line someone says at a meeting, and the joke lands at once (“纸上连个按钮都没有，省起来倒是很快”).
- **Each step changes the next for a stated reason.** Interviews lead to a hypothesis, the hypothesis to two sketches, Xiao Lin's actual walk to a change of direction, and the change to a four-column record whose last row is honestly left “待记录”. The live-test section says what three people cannot show (“不能告诉采购同事全校省了百分之多少时间”). The randomised design states its population, its sticky assignment and its denominators, including people who leave before the entry shows. It also notes that two groups competing for the last seat are not independent.
- **Changed conditions are built in:** swap the success page for a failure page, then for an empty list.
- **The API states are right:** HTTP 200 with an empty `sessions` array is not HTTP 503, and neither is evidence that a class was cancelled.
- **Joins:** the previous piece ends “能不能少点一下，干脆在卡片上就让人报名？” and this one opens on that request. This piece ends on the two buttons; the next opens on them.
- **Length:** about 5,700 Chinese characters, 6,600 non-space characters outside code. This is on target, so cut rather than grow.

Findings:

1. **Blocking · structure.** The eight papers (纸一 to 纸八) are eight `###` headings joined by anchor links. On a phone this means up to eight jumps and back. It adds eight entries to the chapter's contents and to the section actions, and it cannot work in print or the PDF. The plan already chose the table route, so take it:
   - Show 甲版 and 乙版 as one figure (图 2-x, a paper-prototype sketch in the [V4 figure style](../design/v4/reader-v4-design.html#content)).
   - Ask the reader to choose in each before reading on.
   - Replace 纸一 to 纸八 with one table (表 2-x): paper, what is on it, where each mark leads, whether the list of names changes.
   - Keep two papers as prose moments: 纸一 (“这时没人去动老师的名单”) and 纸七 (“已选周六上午十点。尚未报名。”).
   - Adjust “两份能亲手点的草图就在书里” to match. The clickable version is the Phase 3 interactive feature.
2. **Should fix · density.** The two measures in 人不多的时候 (paragraphs from “真有足够多的人来” to the end of the section) are correct but read as one long specification. Put the two measures side by side in a small table: who counts, what counts as success, the window, what is left unknown. Keep the prose for why each rule exists. Target about 300 fewer characters in that section.
3. **Should fix · text diagrams.** The two `text` diagrams (the three borrowed routes, and the 查看场次 flow) are up to 87 characters wide. At 320 px they scroll sideways inside the code well. Redraw the flow as a figure with a text description (图 2-y). The three-route sketch can become three short lines of prose.
4. **Should fix · the recruitment paragraph.** The paragraph from “可以先请教务同意” to “凭印象替全班报名参加访谈” lists four channels and two consent rules in one paragraph. Split it at “让人自己留下愿意被联系的方式”, so the consent rule stands on its own.
5. **Check · sources.**
   - The GOV.UK interviews guide and the Kohavi et al. DOI (10.1007/s10618-008-0114-1, the 2009 *Data Mining and Knowledge Discovery* survey of controlled experiments on the web) both resolved on 28 November.
   - The AAPOR best-practices page returned 403 to an automated request. Open it by hand and confirm it covers question wording and pretesting, which is what the sentence before it claims.

Recheck after revision: the structure, the two new figures, the length, and the joins.

### F5 · 最后一把椅子，两个人同时伸手 · Writer r1 · 28 November 2026

*Delivery Lead (Claude), against the [F5 plan](../../book/planning/phase-one-chapter-plans.md) and the [T-012 desk trace](../../book/revisions/zh/volume-one-standard-samples-20261126/evidence/p4-roll-call-desk-trace-20261128.md). Manuscript: [`p4-roll-call.md`](../../book/revisions/zh/volume-one-standard-samples-20261126/p4-roll-call.md), Writer r1, SHA-256 prefix `ab41a8d2`. Independent: Codex wrote it and Claude reviewed it.*

**Verdict: Pass with follow-ups.** The follow-ups are small and are made in the F5 round. After that, only the changed passages need rechecking.

What already meets the standard:

- **The opening** is a race the reader can see: two people, one seat.
- **The mechanism checks out.** Every schedule and result matches PostgreSQL 18's documented behaviour in the desk trace. The piece states its database and isolation level, and says plainly that the snippets cannot be pasted and run in order.
- **Changed conditions are there:** a rollback, a repeated press, capacity two with one learner in two windows, and cancelling twice.
- **The voice holds** (“请数据库来劝架”, “向家具店解释这套业务”).
- **Joins:** it opens on the previous piece's counted seats and ends by handing over to the next piece's records.
- **Length:** about 3,100 Chinese characters, 3,800 non-space characters outside code, against a target of about 3,300 plus SQL.

Follow-ups:

1. **Wording, line 52.** Make it clear that the arrow, not the foreign key, “没有…加锁” (trace finding 1).
2. **Wording, lines 95, 109 and 115.** 乙 is released only when 甲 actually rolls back, not when 甲's INSERT fails (trace finding 2).
3. **Label, line 203.** Change “纸上推演” to “按 PostgreSQL 18 文档逐句推演，未在数据库上实跑” and link the trace in the Handoff (trace finding 3).
4. **Figure.** Replace the text timeline (“甲 条件更新一行 ─ 写报名 ─ 提交 …”) with 图 4-x, the two-session timeline: 甲 and 乙 in two lanes against one row of `remaining`, showing the wait, the re-check and the zero rows. This is the plan's most-needed Part 4 figure. It also becomes the static fallback for the Phase 2 interactive figure.
5. **Figure.** Redraw the text relationship sketch (`enrolments` → `sessions`) in the V4 figure style, keeping its prose description.


## Integration
