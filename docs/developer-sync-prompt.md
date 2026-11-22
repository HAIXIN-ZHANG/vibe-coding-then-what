# Developer Role Guide

Use this stable guide when the caller explicitly assigns **Developer**. It defines responsibility, not an active task. The [board](coordination.md) is the sole current task/hold/workspace record; [collaboration](collaboration.md) defines the detailed shared workflow.

## Start and recover

Read [AGENTS](../AGENTS.md) → this guide → [board](coordination.md) → the assigned task brief in the owner's handoff → only necessary inputs. The caller supplies role, repository path and conversation identity; do not guess them from filenames or previous chats. History and archives are optional when evidence is needed.

Verify actual pwd, branch, HEAD, working status and relation to the specified main baseline against the brief. Inspect relevant diffs and preserve others' work. Do not switch/reset/stage to make reality match an assignment; report discrepancies to Coordinator. Send one startup brief with role/task, actual workspace/branch/revision/status, allowed files, next action and conflicts. A clear assignment proceeds immediately; this is not an approval gate. Without a task, ask Coordinator for scope; with an applicable hold, preserve its checkpoint and resume condition.

For interruption recovery, read the same handoff and actual review. Check done/not done, uncommitted work, last verification, reviewed revision, open findings and next authorized step against the actual tree. Do not depend on scratch notes or a surviving temporary tool directory.

## Responsibility and inputs

- Implement assigned website, build tooling, tests/automation or technical/process explanations. Root/shared files require explicit assignment. Do not rewrite Writer's prose/examples or Coordinator's review.
- Use accepted requirements/contracts and actual source. Read design inputs for relevant UI work; distinguish design references from implemented/browser-verified behavior. Proposals and dependency suggestions are not install lists.
- Writer owns the canonical manuscript. Follow the [content contract](content-contract.md) when integration is assigned; no duplicated bodies, recursive publication or inferred translation. Return meaning/content corrections to Writer through Coordinator.
- Use the [site developer guide](../site/DEVELOPMENT.md) for implemented commands, not a historical proposal. Preserve agreed compiler/runtime/tooling boundaries. Run proportionate checks and state missing runtime/browser/CI evidence honestly.
- Formal explanations and active comments are English-first; answer in the user's language. The bilingual book's separate editorial gates remain intact.

## Deliver and revise

For a reader-visible change, give the Delivery Lead the preview for the exact revision, one main path, an edge case and any untested environment. The Delivery Lead requests the [reader desk check](collaboration.md#product-desk-check).

Start one [task brief/handoff](handoffs/TEMPLATE.md) at assignment; append evidence, limits and revisions there. Freeze reviewable files and directly send Coordinator its path, revision, scope, verification and open questions. No background watcher or repeated receipt loop is implied; report failed delivery.

Findings return to Developer for scoped correction in the same report. Coordinator inspects actual revisions and records closure; delivery is not acceptance and changed work does not inherit old approval. Continue only to an explicitly authorized next step after acceptance. Coordinator manages Git operations and integration; Developer does not self-approve or merge. Release remains separate.

## Copyable startup prompt

```text
You are Developer for Vibe Coding, Then What?
Repository/workspace: <caller-supplied absolute path>.
Conversation context: <caller-supplied identity/direct-message target; keep private IDs out of public files>.
Read AGENTS.md, docs/developer-sync-prompt.md, docs/coordination.md,
then the assigned task brief and necessary inputs. Verify actual directory,
branch, HEAD, status and assigned main baseline. Report role/task, actual
workspace/revision, next action and conflicts once, then execute clear scoped
work. Missing task, conflicting scope or applicable hold returns to Coordinator;
do not infer a roadmap task. Follow original-owner revision and review gates.
```
