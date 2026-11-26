# PDR-004 · Keep the author's main checkout usable

Status: author-confirmed; initial migration completed, upkeep continues. Decision-maker: author. Decision and recording date: 26 November 2026. Policy PR: #47, merged as c50854f.

## Context and choice

Hundreds of accumulated changes prevented the author switching branches in VS Code. Keep the author's primary checkout clean on current main. Each role edits its own assigned branch/worktree. Delivery reviews and integrates accepted batches, then fast-forwards the author checkout.

Committing every local file to public main would mix accepted changes with unpublished drafts and private recovery records. A temporary stash alone would leave recovery and ownership unclear. Preserve unmerged work in verified durable private recovery copies; migration must stop concurrent writers and account for tracked/untracked files and relevant ignored assets.

## Consequences

Agents must use the assigned working directory explicitly even when their chat opens at the author's path. An archived manuscript or design is not accepted/public just because it has a recovery commit. Keep private paths and archive identities in the local handoff; preserve historical evidence and never reset/clean to hide a mismatch. Main advances after reviewed merge, not after a task merely finishes.

Authority: [workspace policy](../collaboration.md#workspace-and-main-checkout), [agent entry](../../AGENTS.md). Verification of a new update checks author branch, clean state and remote identity separately; the original migration does not prove future updates occurred.
