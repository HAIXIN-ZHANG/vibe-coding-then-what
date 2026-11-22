# Formal documents and agent notes

Use the caller's assigned checkout, verified against the [board](coordination.md); never select a historical directory from old prompts. This policy defines storage, not an active task or workspace.

## Formal project sources

Store formal sources in the repository and use the [collaboration workflow](collaboration.md). A commit does not automatically publish a document as a website chapter.

- Writer owns assigned book planning, manuscripts, teaching assets and product/editorial explanations.
- Developer owns assigned website/tooling and technical/process explanations. `site/IMPLEMENTATION.md` preserves a proposal; `site/DEVELOPMENT.md` describes implemented commands/behavior.
- Executors begin one task brief/handoff under `docs/handoffs/<role>/` at assignment and append execution, revisions and recovery there.
- Coordinator decides shared contracts/scope/status and writes actual judgments under `docs/reviews/`. Assigned executors record accepted explanations without deciding their own acceptance.
- Product & Design Lead · Reader Experience owns reader-experience findings. Coordinator records the attributed product verdict alongside the technical judgment in the stage review.
- The board owns live assignments/holds/workspaces; stable role guides describe responsibility; history/archive preserves past evidence. Link these sources rather than maintaining duplicate queues.

Formal sources can contain clearly labelled proposals, unresolved questions and accepted decisions. Formal technical/product/process explanations and active comments are English-first; temporary/secondary handoffs may be Chinese. The bilingual manuscript sequence remains separate.

## Optional local notes

Use ignored `.local/notes/writer/` or `.local/notes/developer/` only when useful. Notes can hold temporary ideas/source leads, not a second maintained formal body or a required duplicate log. Do not store credentials or unnecessary personal details.

Git exclusion is not access isolation. Agents sharing an account/checkout may read these files; worktrees are not secret storage. Website builds and public artifacts must exclude `.local/`.

## Deliverable and recovery

Move useful conclusions into the owning formal source with status and evidence. Other roles must recover without scratch notes or private chats. A task handoff must preserve done/not done, exact uncommitted owner files, checkout/branch/base, last checks/limits, reviewed revision, open findings, next action and resume condition. Temporary logs/screenshots may supplement this record but must not be its only recovery evidence.

Preserve existing files and reports; this policy does not authorize relocation/deletion or overwriting. Propose uncertain classifications to the owning role through Coordinator. Storage acceptance does not release work, lift a hold or authorize installation, external calls, Git writes or publication.
