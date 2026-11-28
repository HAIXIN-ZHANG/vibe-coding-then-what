# M4 standard samples — remaining delta, r1

26 November 2026 · Concept for independent Delivery review; no manuscript changes yet. Scope: the two accepted Chinese samples, not their surrounding chapters or a whole-part rewrite.

## Part 2: keep the reader's experiment intact

Retain the recruitment/interview/questionnaire story, both paper choices, eight result papers, evidence worksheet, state flow, JSON and bounded A/B comparison. They already connect an observation to a changed design and give the reader something to try. The worksheet's unfilled next observation is useful; do not replace it with invented success. Keep HTTP 200 with an empty array distinct from HTTP 503, and selection distinct from submitting an application.

No new P2 diagram is justified by the current read. Preserve every byte before `### 走完两版以后` and all 28 internal links. Only after the reveal, refine the existing state-flow explanation so its labels have one meaning at a time: “查看场次／返回／选择／确认／重试” are user actions; “读到场次／空列表／读取失败” are read outcomes. Keep the adjacent state/evidence/action table; do not add a second table or explain the hidden prototype choices in advance. Add at most one concrete cross-check to the existing failure-paper exercise: a failed read cannot supply `s-8`, while an empty successful read supplies no selectable session. Preserve the option to return in both cases.

The adjacent course-card chapter leads naturally into the school's request; the sample ends at the two controls' different promises. Preserve these joins. Procurement, teaching administration, teacher and learner already have distinct functions. Do not rename them or introduce a job-title roll call.

## Part 4: make the relationship visible beside the SQL

Keep PG 18 / Read Committed, both schemas, partial uniqueness, the bad and correct schedules, zero-row readback, rollback-before-read and cancellation by enrolment ID. Place one original compact relationship figure after the paragraph explaining `school-a`, `s-8` and generated enrolment IDs, before the partial-index paragraph. Proposed semantic source:

```text
enrolments（报名记录，多行）
  school_id + session_id
          │ 同一对字段引用
          ▼
sessions（场次，一行）
  school_id + session_id（联合主键）
  capacity / remaining
```

Caption/accessible text: each enrolment refers to exactly one existing school/session pair; that session may have zero or many enrolment records. The arrow means a foreign-key reference, not execution order or a lock. Historical cancelled records may remain; only active records enter the seat count, and at most one active record per school/session/learner is allowed. These last two conditions remain in the adjacent prose/index, not a second diagram legend. This adds the row/reference grain missing from the interleaving tables. Do not add another before/after totals table: the five existing cases already provide it.

Clarify once that 甲 and 乙 are two learners at 甲校; they are not the two schools. Beside the first parameterised update, map `$1/$2/$3` to the existing school/session/learner example, keeping `$4` beside cancellation. State that these are application-bound snippets with conditional branches, not a script to paste in sequence. Keep the existing control flow and rollback paths, rather than duplicating them. The join from counted seats to concurrent writes, then to current versus historical names, remains unchanged.

## Acceptance and evidence boundary

Read each changed passage with its immediate neighbours; preserve the humour and fictional setting. Check figure direction, composite identity, zero-to-many cardinality, parameter meanings and invariant against the existing DDL; check the two JSON blocks, 28 links and protected prefix byte-for-byte. Confirm README routes to both samples and the unchanged comparison chapters. A5 line width, figure legibility and choice/result pagination require later actual proofs; Markdown checks do not establish them.

Existing official references stay in place. The figure is original and derived from this chapter's schema, not third-party artwork or a database experiment. Developer owns actual environment/version and two-session evidence. Use only evidence actually delivered and reviewed; retain paper-reasoning labels if execution is unavailable. No new runnable-example promise, changed mechanism, external research or publication follows from this concept.
