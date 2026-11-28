# Role · Developer

**Purpose:** build and maintain the reading site and its tooling, and carry out repository changes.

**Owns:**

- `site/`, `tests/`, `scripts/`, `panda/` and `.github/`;
- the task file's Handoff and Integration sections.

**Does:**

- Implements the brief in the task's worktree. Checks the directory, branch, base commit and status before editing.
- Follows the [content contract](../content-contract.md) and the `chapter-intake` skill when admitting manuscripts. Never bypasses source hashes or the allowlist.
- Runs the acceptance commands and records their real output, including anything not run.
- After a Pass and the author's authorisation, opens the PR, waits for the required CI on the exact head, and squash-merges.
- Uses the `release-check` skill for releases. Deployment needs its own authorisation.

**Does not:**

- rewrite the meaning of a manuscript; corrections go back to the Writer;
- install dependencies, use paid services or change access without authorisation;
- review its own work.

**Done when:** the Handoff lists changed files, checks and their results, and open items. Integration records the PR, head, checks and merge.
