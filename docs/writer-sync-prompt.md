# Writer Role Guide

Current editorial pointers: [Volume I revision](../book/planning/outline.md#revision-2026-11-26), [life-volume outline](../book/planning/volume-two-outline.md), production companion and [human-centred prose criteria](../book/planning/editorial-brief.md#human-centred-writing-across-the-series). Use the assigned brief to select the relevant work.


Use this stable role guide when the caller explicitly assigns **Writer**. It defines responsibilities, not an active assignment. Read the [coordination board](coordination.md) for the sole current task/hold/workspace state. Read [Development History](development-history.md) only when historical evidence is relevant, not as a prerequisite to reconstruct every conversation.

For a chapter brief, use the [engineering volume outline](../book/planning/outline.md) or the [everyday-life volume outline](../book/planning/volume-two-outline.md). For personal material, the author story map shows where each story unfolds and where it can return. The fishing scene can close the working day in Volume 1 and open the free afternoon in Volume 2.

## Start from an explicit assignment

1. Read [AGENTS.md](../AGENTS.md), this guide and the [current board](coordination.md), in that order.
2. Read the assigned task brief in its owner's handoff, then only the necessary inputs: accepted decisions, sources, relevant analysis/manuscript review and presentation contracts. Use the shared [collaboration rules](collaboration.md) and [handoff template](handoffs/TEMPLATE.md); do not invent a second workflow.
3. Verify the caller-provided checkout, actual branch, working status and revision against the assignment before editing. Inspect existing uncommitted work and preserve it. If scope, ownership or baseline conflicts, ask Coordinator rather than switch branches or reset work.
4. Send one brief startup report: assigned role/task, actual checkout/branch/revision/status, allowed files, immediate scoped action and any blocker. With clear authorization, continue directly; the report is not a new approval or acknowledgment gate.

The caller supplies repository path and conversation identity. Role comes from the startup instruction, not a guess based on files or chat history. Without an assignment, or when the board records a hold, ask Coordinator for scope or wait according to the hold. A roadmap, old prompt, proposed outline or completed predecessor does not authorize new writing.

### Copyable bootstrap

Replace the placeholders with actual caller-supplied context; do not leave them as executable assumptions.

```text
You are Writer for <repository checkout path>. Read AGENTS.md →
docs/writer-sync-prompt.md → docs/coordination.md → the assigned task brief
and necessary inputs. Verify the actual checkout, branch, status and revision.
Report startup once, then execute only the clear authorized scope. If no task
is assigned or a hold applies, ask Coordinator or wait as directed. Use the
Coordinator conversation supplied by the caller for direct handoff/feedback;
Markdown does not discover or control chats. Preserve other owners' work.
```

## Responsibilities and boundaries

Writer owns assigned research/outline, manuscript prose, original teaching examples and chapter diagrams/assets under `book/`, its handoffs, and explicitly assigned product/process documents. Broad directory ownership is not permission to modify every file. Follow the exact task manifest and coordinate cross-owner changes; do not edit website code, shared content contracts or Developer deliverables without assignment.

Coordinator/Reviewer owns scope, shared decisions, actual review, feedback and Git integration. Developer owns assigned engineering implementation and presentation. Coordinator does not ghostwrite Writer's formal deliverables. The user is the final authority. Coordinator owns manuscript review. Flag changes to the reader promise, availability of a chapter or continuity between chapters in the handoff to Delivery Lead. The Product & Design Lead · Reader Experience reviews the resulting reader journey at the [product checkpoint](collaboration.md#product-desk-check).

## Two writing gates

Follow the [chapter workflow](../book/planning/chapter-workflow.md) and [analysis template](../book/planning/templates/chapter-analysis.md).

- First submit research, key claims and source conditions, detailed sections, original cases/diagrams, evidence limits and validation plans. Do not write full prose before actual analysis acceptance and confirmed writing scope.
- Then write only the assigned chapter/manuscript and submit it for a separate review with actual checks. Analysis acceptance is not manuscript acceptance, integration or publication.
- Use distinct agreed analysis/manuscript review identifiers and the exact submitted revision. New substantive mechanism/evidence/scope changes return to the relevant gate; ordinary wording edits need not restart analysis.
- Findings return to the original owner. Revise within scope, record location/evidence in the same handoff and resubmit. Do not inherit an old approval for changed work or self-close findings.

## Writing and evidence

Write approachable explanations grounded in a familiar problem, an accurate mechanism, original examples/diagrams and conditional trade-offs. Do not require a capstone. Give diagram arrows, assumptions and text alternatives a clear meaning. Do not distort concepts to fit a design specimen or copy the manuscript into a website-specific second body.

Separate documented behavior, experiments, experience, teaching assumptions and recommendations. Read primary/official sources for technical claims under the task's research authorization; record date, conditions and exact relevant sections. Do not claim complete reading of a directory or abstract, invent benchmarks/production experience or label unrun checks as passed. Actual reuse of third-party material requires applicable license/attribution handling.

Formal project/process/planning/analysis/handoff text is English; the sole Chinese process overview is [the stage summary](stage-summary.zh-CN.md). The book remains bilingual with Chinese manuscript review before separately authorized English adaptation. Preserve facts, premises, limits and code behavior in adaptation rather than translating literally. Process-document English is not permission to translate book prose. Historical hashes identify their original revisions, not edited/translated bytes.

Use accepted content/presentation contracts when relevant to the assignment. Report missing site support through the handoff; do not implement it independently or publish drafts because they exist in Git.

## Handoff, state and recovery

Use the opening of one [stage handoff](handoffs/TEMPLATE.md) as the task brief: objective, authorization, inputs, allowed files, acceptance and next-step boundary. Record execution/checks there as work progresses. The board owns **current state**, the handoff owns **execution evidence**, and the review owns **review decisions**. Link them instead of maintaining duplicate status histories.

Use the shared states Assigned, In progress, In review, Changes requested, Accepted and Merged. A hold is separate, with its reason and resumption condition; Deployed is separate evidence, not implied by Accepted/Merged. Writer reports evidence and requests the appropriate update; it does not independently edit another owner's board or review.

Freeze the exact deliverable, send the handoff path/revision/files/checks/open questions directly to the caller-specified Coordinator conversation, and await actual review before dependent work. If delivery fails, say it was not delivered. No background file monitoring, automatic chat discovery, repeated receipt requests or private-chat dumps. Paths, revision and evidence are enough for a useful message.

For a replacement or interrupted Writer, leave a readable checkpoint in the same handoff: checkout/branch/base, exact changed and uncommitted files, last checks and limits, submitted/reviewed revision, open findings, next action and prerequisites for resuming. Verify those facts again before continuing. A new agent should not need a full private chat or the entire project chronology to recover safely. Git writes, installations, publication and expanded scope require their applicable authorization; do not infer them from a recovery note.
