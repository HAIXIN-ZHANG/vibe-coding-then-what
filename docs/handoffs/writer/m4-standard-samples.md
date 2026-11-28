# M4 standard samples — Writer handoff

26 November 2026 · **In review: manuscript r1.** Delivery accepted concept r1 at SHA-256 `51e5f3be7889723bac2c0cc0b92b1c5151df554cc07b0c6f57f1fd9fe2ee386b`; the approved narrow revision is complete. Delivery's explicit M4 assignment supersedes the older board in this worktree.

## Scope and recovery point

Writer workspace: `.local/worktrees/m4-samples-writer-20261126`; branch `codex/m4-samples-writer-20261126`; verified HEAD/base `9742626edc8f4089c396a5c5e6b1e508886f98c2`. Startup status contained only the two intentionally copied, untracked sample directories identified by Delivery. No ownership conflict found.

Write boundary: `book/revisions/zh/volume-one-standard-samples-20261126/` and this handoff. Old calibration, making-of, website and the 209-page PDF remain untouched. No Git writes, dependencies, external calls or database execution by Writer.

Deliverable: [remaining-delta concept](../../../book/revisions/zh/volume-one-standard-samples-20261126/concept.md), SHA-256 `51e5f3be7889723bac2c0cc0b92b1c5151df554cc07b0c6f57f1fd9fe2ee386b`. The [candidate reader entry](../../../book/revisions/zh/volume-one-standard-samples-20261126/README.md) now opens the revised complete samples. The original calibration comparison remains unchanged; no website or PDF admission is implied.

Next action: Delivery's independent second-round facts/language/continuity review of the two manuscript hashes below. No further manuscript change while awaiting concrete review. Delivery reports that Developer has no runnable PG environment; harness preparation is not execution evidence. Product reader acceptance and integration remain separate.

## Input identities

Current authority was read in the sibling `m4-samples-delivery-20261126` worktree. These hashes identify the bytes observed at this checkpoint, not an instruction to freeze another owner's live board.

| Authority input | SHA-256 |
| --- | --- |
| `docs/coordination.md` | `fa26b348cc08bf951db2700dcb9260d99c8810de3ba8f5bc5e6286b14ff14181` |
| `docs/handoffs/m4-standard-samples.md` | `d4cbbd501b7b400a8ca55a39fd46fe58dcd499db0265df44f6a4c3c639a265fd` |

The five local calibration files are read-only comparison inputs. At concept submission, both candidate manuscripts and README matched them byte-for-byte. The manuscript changes below are measured against these same inputs; README remains byte-identical.

| Calibration input | SHA-256 |
| --- | --- |
| `README.md` | `0b6ca1125fb7c86d4a99db1fd65f490c10fa024e7246aafe10edb9bd9b2c397c` |
| `concept.md` | `092baedc5065548f8fe59b612f66f77f8d946bbf60a0c6dc6dfa29625e69f714` |
| `p2-one-less-click.md` | `e56feacfb876fb9214bf7d032b863770e1bd3f9a2885bac42717e6fce5af3f16` |
| `p4-roll-call.md` | `a759948b606a2f1ea6e8edf4e7905cdcde2fc83b029d3ae69b781c3069d45fb5` |
| `status.md` | `4006863c9ffb7b9d8cee1aa5dcdbb5730a9492e35b06ab4a82c64df8bd9a77b2` |

Also read: Writer role guide; outline revision map; editorial technical/translation and human-centred criteria; approved Chinese voice sample; historical calibration status. Prior source review, SQLite checks and unavailable-PG findings are historical evidence, not fresh execution in this workspace. No official-source browsing was performed for this concept.

## Concept-stage read and checks

- Read both complete candidate manuscripts. Read the openings and endings of `p2-course-card`, `05-enrolment-controls`, `p4-last-seat` and `p4-who-owns-the-row` in making-of for immediate joins; this is not a claim of a new whole-volume read.
- P2 protected prefix: bytes before `### 走完两版以后` match calibration; SHA-256 `5274a76afdd17ced72d0a111228e08c92db277322d7200abb721ee7f0f6dcdf4`. All 28 fragment links uniquely resolve to existing headings. Two fenced JSON examples parse. Nine README links resolve to existing local files.
- Existing P2 material already supplies observations, hypotheses, a revised route, empty/failure distinctions and bounded business/task outcomes. Proposed change only makes flow labels easier to read; no additional prototype or evidence table.
- Existing P4 material already supplies transaction exits, current-state readback and old-cancellation identity. Proposed figure explains composite reference and row grain, rather than restaging the race. Proposed parameter aid does not turn fragments into an unconditional runnable script.
- Kept the move from card layout to discovery, discovery to control promises, JOIN counts to concurrency, and concurrency to record ownership. No adjacent chapter edit is needed by this read. These are Writer judgments submitted for review, not human reader results.
- No A5 rendering, browser/prototype interaction or PostgreSQL concurrency run took place. Actual layout and execution evidence retain their assigned owners and gates.

## Revision record

Concept r1 wrote only `concept.md` and this handoff. At that gate, the three initial candidate files and all five calibration files were unchanged. Delivery subsequently accepted the relationship figure and small action/outcome/parameter clarifications; there is no page or word target.


## Manuscript r1 — submitted for second-round review

Full reader texts: [Part 2](../../../book/revisions/zh/volume-one-standard-samples-20261126/p2-one-less-click.md) and [Part 4](../../../book/revisions/zh/volume-one-standard-samples-20261126/p4-roll-call.md). Read either from the unchanged README, with the same four comparison-neighbour links.

| Candidate | SHA-256 |
| --- | --- |
| `p2-one-less-click.md` | `c9461126cf381b1eac148acfb2f42435fdf10bd06016f3352feec95fa851eea2` |
| `p4-roll-call.md` | `ab41a8d27a329cf901a34783e131e6ae05a07d5fd1a53cd9f6575350ba2f1b11` |
| `README.md` | `0b6ca1125fb7c86d4a99db1fd65f490c10fa024e7246aafe10edb9bd9b2c397c` |

### Exact delta and reader effect

- P2, “走完两版以后”: two paragraph changes. The existing text flow now explicitly distinguishes user actions from read outcomes, including no completed read. The existing failure-paper exercise contrasts missing usable `s-8` evidence with a successful empty session list; both retain return routes. No new diagram/table/prototype and no pre-reveal hints.
- P4, “先把一把椅子摆进两张表”: identify learner A/B as `learner-a`/`learner-b`, both at school A. Add one original text relationship figure from the existing DDL. Parentheses express the composite field pair. The adjacent prose supplies the complete text alternative: each enrolment references one existing school/session, and a session can have zero or many enrolment records. The arrow is a reference, not a schedule or lock. Active-only uniqueness remains in the adjacent original paragraph/index.
- P4, “把两个时钟拨慢一些”: bind both learners' `$1/$2` to `school-a/s-8` and distinguish `$3` in the insert; state that conditional application snippets cannot be pasted in sequence. After the existing two schedules, name the committed session row and winning active learner row for each outcome. Both outcomes leave remaining zero and one active enrolment. No additional schedule, result table or SQL branch.
- P4, ACID/verification section: explicitly retain the unexecuted PostgreSQL two-session boundary. This is a limitation of available evidence, not a claim that the harness has failed or passed. `$4`, rollback-before-read, same-person zero-seat retries and cancellation conditions are unchanged.

### Actual checks and prose read

- Read both complete revised chapters, then compared affected paragraphs to the old text. Preserved the restrained jokes, fictional setup, chapter openings/endings and immediate joins assessed at the concept gate. Split the new committed-row explanation from the waiting/error paragraph to keep the two jobs readable.
- Byte comparison: all five calibration input hashes above unchanged; accepted concept and candidate README unchanged. Protected P2 prefix remains `5274a76afdd17ced72d0a111228e08c92db277322d7200abb721ee7f0f6dcdf4`.
- Programmatic checks: all 28 paper fragment links retain their exact sequence and uniquely resolve; both fenced JSON examples parse; nine README file links resolve. All chapter heading lists and external source URLs are unchanged. Code fences are balanced. All six P4 SQL blocks are byte-identical to calibration.
- Manual schema-to-figure trace: both FK columns are NOT NULL, reference the composite session primary key, and appear together in the figure. The schema allows zero-to-many historical enrolment records, while the adjacent partial unique index limits active duplicates per learner. The figure asserts neither transaction order nor automatic cross-table count enforcement.
- Manual parameter-to-result trace (paper reasoning only): `school-a/s-8`, initial remaining one/no enrolments → A commit leaves remaining zero/A active; A rollback followed by B commit leaves remaining zero/B active. These identify the existing schedules' rows; no new result has been measured. Cancellation still targets the returned enrolment ID as `$4`, and changes remaining only after one active record changes.
- No new source claim or source URL was introduced. No PostgreSQL/SQLite execution, dependency installation, external request, browser run, A5 rendering or Git write occurred in this revision. Source references were preserved rather than re-browsed. Actual rendered width/page breaks and actual PG concurrency remain unverified.

Changed this round: only the two candidate manuscript files and this handoff. Stop point: complete manuscript r1, ready for independent review; no publication or PDF work authorised.
