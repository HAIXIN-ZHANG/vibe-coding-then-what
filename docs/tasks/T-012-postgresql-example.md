# T-012 · Check the Part 4 PostgreSQL example

## Brief

*Delivery Lead (Claude), 28 November 2026. Base: main. Mode: any. Needs the author's authorisation to pull a PostgreSQL container image, because that is an installation.*

- **Goal.** The two-session example in 最后一把椅子，两个人同时伸手 ([Writer r1](../../book/revisions/zh/volume-one-standard-samples-20261126/p4-roll-call.md)) has actually been run. Its prose can say what happened instead of what should happen (PRD O07).
- **Executor.** Developer.
- **Environment.**
  - The official `postgres` image, at an exact current major version (for example `postgres:17.x`), run locally with Docker.
  - A throwaway database.
  - No data beyond the example's fictional rows.
  - Record the exact version from `SELECT version();`.
- **Steps.**
  1. Create the example's two tables and seed `school-a/s-8` with one remaining seat and no enrolments, exactly as in the manuscript.
  2. In two `psql` sessions, run each schedule from 把两个时钟拨慢一些 in the manuscript's order:
     - 甲 commits;
     - 甲 rolls back, then 乙 commits.
     Capture both sessions' full transcripts, including waits, row counts and errors.
  3. Run the retry and cancellation steps from 更新零行… and 取消一次，椅子回来几次. Check that cancelling once returns exactly one seat.
  4. Record the isolation level in use (`SHOW transaction_isolation;`).
  5. Compare each result with the manuscript's claims and with the Writer's paper trace in the [handoff](../handoffs/writer/m4-standard-samples.md). List every mismatch.
- **Must not change.** The manuscript. This task only produces evidence; the Writer revises in T-011.
- **Acceptance.**
  - Transcripts committed under `book/revisions/zh/volume-one-standard-samples-20261126/evidence/p4-roll-call-<date>.md`, with the version, the commands and the outputs.
  - A table: claim, result as observed, match or mismatch.
  - The container and its volume removed afterwards. Say so in the Handoff.

## Change of plan · 28 November 2026

The author decided that a step-by-step trace is enough for now, so nothing was pulled or installed. The Delivery Lead traced every schedule against the PostgreSQL 18 documentation: [desk trace](../../book/revisions/zh/volume-one-standard-samples-20261126/evidence/p4-roll-call-desk-trace-20261128.md). It found no mismatch in results and three wording findings for the Writer (T-011, F5 round). The container run in the brief above is kept as an optional later step, and still needs the author's authorisation if it is wanted.

## Handoff

## Review

## Integration
