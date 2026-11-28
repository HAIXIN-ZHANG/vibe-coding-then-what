# 最后一把椅子 · desk trace against PostgreSQL 18

*Delivery Lead (Claude), 28 November 2026. Manuscript: [`p4-roll-call.md`](../p4-roll-call.md), Writer r1. The author decided on 28 November that a step-by-step trace is enough for now, so T-012 does not pull a container.*

## What this is, and what it is not

The manuscript's SQL was traced statement by statement against the PostgreSQL 18 documentation. The trace follows each statement's snapshot, the row locks it takes, and when it waits. **Nothing was executed.** No database version, timing or output was observed. Where the documentation does not state a behaviour, the trace says so and does not lean on it.

Sources, all PostgreSQL 18 and read on 28 November 2026:

- [13.2.1 Read Committed](https://www.postgresql.org/docs/18/transaction-iso.html#XACT-READ-COMMITTED). Each command starts with a new snapshot. An UPDATE that meets a row changed by a transaction still in progress waits for it to commit or roll back. After a rollback, the waiting UPDATE proceeds with the row it originally found. After a commit, it re-evaluates its WHERE clause against the updated version of the row.
- [13.3.2 Row-level locks](https://www.postgresql.org/docs/18/explicit-locking.html#LOCKING-ROWS). An UPDATE that does not change key columns takes FOR NO KEY UPDATE. That lock conflicts with another FOR NO KEY UPDATE and with FOR UPDATE (Table 13.3).
- [13.3.4 Deadlocks](https://www.postgresql.org/docs/18/explicit-locking.html#LOCKING-DEADLOCKS). Deadlocks are detected and one transaction is aborted. A consistent lock order is the recommended defence, and the first lock a transaction takes on an object should be the strongest it will need.
- [SET TRANSACTION, Compatibility](https://www.postgresql.org/docs/18/sql-set-transaction.html). PostgreSQL allows the commas between transaction modes to be omitted, so `BEGIN ISOLATION LEVEL READ COMMITTED READ ONLY` is accepted.

## Schedules traced

Starting state for each schedule: `sessions('school-a','s-8')` with capacity 1 and remaining 1, and no enrolments, unless a schedule says otherwise. The row is called S.

**Broken version, read and then write an absolute value** (manuscript table in 把两个时钟拨慢一些):

1. 甲 reads remaining 1. 乙 reads remaining 1.
2. 甲 runs `SET remaining = 0` and inserts learner-a, then commits.
3. 乙 runs `SET remaining = 0`. 甲 has already committed, so 乙 takes no wait. 乙 inserts learner-b and commits.
4. Result: remaining 0, two active rows. The CHECK passes. The partial unique index passes, because the learners differ. 0 + 2 ≠ 1. **Matches** the manuscript.

**Conditional update, 甲 commits:**

1. 甲 runs `UPDATE … WHERE remaining > 0`. It matches S, takes FOR NO KEY UPDATE on S, and returns remaining 0. This is not yet committed.
2. 乙 runs the same UPDATE. Its snapshot still shows remaining 1, so S matches. The row is locked by 甲, so 乙 **waits**.
3. 甲 inserts learner-a and commits.
4. 乙 re-evaluates `remaining > 0` against the updated version of S. 0 > 0 is false, so 乙's UPDATE returns **zero rows**. The application rolls back. Result: remaining 0, learner-a active. **Matches.**

**Conditional update, 甲 rolls back:**

1. Steps 1 and 2 as above.
2. 甲's INSERT fails. 甲's transaction is now aborted but **still holds its lock on S**.
3. 甲 sends ROLLBACK, and only then is 乙 released. 乙 proceeds with the row it originally found: remaining becomes 0, one row is returned. 乙 inserts learner-b and commits.
4. Result: remaining 0, learner-b active. **Matches.** See finding 2 about when 乙 is released.

**Repeat by 甲 after taking the last seat:**

1. Starting state: remaining 0, learner-a active.
2. The UPDATE's snapshot shows 0, so it matches no row. It returns zero rows at once, takes no lock and does not wait.
3. Rollback. The read-only LEFT JOIN returns remaining 0 and learner-a's enrolment ID. The manuscript's row "有本人有效报名编号" applies. **Matches.**

**Capacity 2, same learner in two windows:**

1. The first window takes 2 to 1, inserts and commits.
2. The second window takes 1 to 0, and its INSERT violates `one_active_place_per_learner`.
3. The transaction is aborted, and further statements in it are refused until it ends. ROLLBACK restores 1.
4. Result: 1 / 1. **Matches.**
5. If the two windows run at the same time instead, the second UPDATE waits on S, re-evaluates 1 > 0 as true, and then hits the same unique conflict. The outcome is the same.

**Cancel once, then cancel again with the same enrolment ID:**

1. Starting state: 0 / 1.
2. `SELECT … FOR UPDATE` locks S. UPDATE enrolments changes one row to cancelled. `remaining + 1` gives 1, which passes `remaining <= capacity`. Commit. Result: 1 / 0.
3. The repeat locks S. The enrolment UPDATE, under a new snapshot, sees `cancelled` and changes zero rows. Rollback. Result: 1 / 0. **Matches.**
4. If the two cancellations arrive at the same time, the second waits on S. Once the first commits, the second's enrolment UPDATE starts with a fresh snapshot and changes zero rows. Exactly one seat comes back. **Matches** 取消一次，椅子回来几次.

**Lock order:**

- Enrolment takes S first, through its UPDATE (FOR NO KEY UPDATE), then inserts into enrolments.
- Cancellation takes S first, through FOR UPDATE, then updates enrolments.
- Both paths lock S before any enrolment row, and their locks on S conflict, so they serialise on S. The trace found no lock-order cycle between these two paths.
- Cancellation's first lock on S is its strongest one, which follows the documented advice.

## Claims table

| Claim (manuscript line) | Traced result | Verdict |
| --- | --- | --- |
| Read-then-write leaves remaining 0 with two active rows; no constraint fires (62–69) | As stated | Match |
| 乙 waits for 甲 on the same row (83) | 乙's snapshot still matches S, and S is locked | Match |
| After 甲 commits, 乙 re-checks the condition and updates zero rows (83) | Documented WHERE re-evaluation | Match |
| After 甲 rolls back, 乙 gets the seat (109, 116) | Documented; 乙 is released at 甲's ROLLBACK | Match; see finding 2 |
| Final rows for both schedules (119) | 0 / learner-a, and 0 / learner-b | Match |
| A repeat after taking the last seat updates zero rows; the read-only query shows the learner's enrolment (125–150) | Zero rows with no wait; the LEFT JOIN returns the ID | Match |
| `BEGIN … READ COMMITTED READ ONLY` without a comma (130) | Accepted (SET TRANSACTION compatibility note) | Match |
| Capacity 2, same learner: the second INSERT conflicts; rollback; 1 / 1 (154) | As stated, sequential or concurrent | Match |
| Statements after an error in the same transaction are refused (154) | Aborted-transaction behaviour | Match |
| Cancelling twice returns one seat (185, table 187–193) | As stated, including concurrent cancellations | Match |
| Same lock order on every path reduces mutual waiting (121, 160) | Both paths lock S first; no cycle found | Match |
| Remaining + active rows = capacity after every commit (56, 195) | Holds in every schedule traced | Match |
| "它没有规定哪条 SQL 先执行，也没有替任何事务加锁" (52) | Ambiguous: see finding 1 | Wording |
| "本章表格是依据上述条件的纸上推演，尚未…实跑" (203) | Still true; can now name what was checked | Wording; see finding 3 |

## Findings for the Writer (T-011, F5 round)

1. **Line 52, foreign-key wording.** "它" can be read as the foreign key, not the arrow. Inserting a referencing row does make PostgreSQL check, and in current versions lock, the referenced session row. The cited PostgreSQL pages do not document that lock, so the book should claim neither that it happens nor that it does not. Suggested direction: say that the arrow in the figure shows only the reference, not execution order or locks.
2. **Lines 95, 109 and 115, when 乙 is released.** 乙 keeps waiting after 甲's INSERT fails, until 甲 actually sends ROLLBACK. An application that catches the error and keeps the connection open without rolling back leaves 乙 waiting until a lock timeout. Half a sentence in the control-flow paragraph would make "回滚" visibly part of what frees the seat.
3. **Line 203, labelling.** Keep the honesty. Replace "纸上推演" with a statement of what was done: "按 PostgreSQL 18 文档逐句推演过等待与重新判断，未在数据库上实跑". The two-connection run stays a suggestion for readers.

No mismatch was found between the manuscript's results and the documented behaviour.

## What a real run would still add

A real run would show the exact error codes and messages (unique violation, the aborted-transaction notice) and the version string. It would also confirm the foreign-key lock in finding 1 by observation. None of this is needed for the manuscript's claims. A run can be added later if the author wants it, as T-012 with a container.
