# PDR-010 · V4 design accepted; edition label, supported browsers and English adaptation note

Status: **Accepted.** On 28 November 2026 the author told the team to adopt the proposals as written, choosing the usual industry practice in each case. Decision-maker: author. Recorded on 28 November 2026 against PR #53, branch `claude/priority-volume-one-first`.

## Context

The V4 design and the [PRD](../product/volume-one-public-edition.md) held three proposals for open decisions. The author accepted the design and all three proposals together.

## Decisions

1. **The V4 design is the design of record for Phase 1.** [`docs/design/v4/reader-v4-design.html`](../design/v4/reader-v4-design.html), 39 frames. [T-010](../tasks/T-010-v4-reader.md) may start once its other start conditions are met. Roadmap rule 4 still applies: the design freezes at the end of Phase 1.
2. **O01 · edition label.** The reader shows no version name. The status labels 新修订 and 初版 come from the manifest field `revision` and say which pieces are revised. Each public update gets dated release notes in the repository. This follows the usual practice for continuously updated web books: label pieces by state and log the changes, rather than naming the edition.
3. **O04 · supported browsers.** Safari on iOS and iPadOS 17 or later, and the latest two major versions of desktop Safari, Chrome and Edge. These are checked for every T-010 slice. Firefox is supported in a narrower sense: it must stay readable and usable, but it does not need the typographic enhancements (`text-wrap: balance` and similar). This follows the common "last two versions" support policy.
4. **O10 · English after a Chinese revision.** The English adaptation is not changed in Phase 1. Its page shows one line, "Adapted from the first Chinese edition. The Chinese chapter has since been revised", which links to the revised Chinese chapter. The note appears only when the Chinese source hash recorded for the adaptation differs from the current Chinese hash. This follows the usual pattern on translated documentation sites, which say a translation is out of date and link to the original.

## Consequences

- T-010 slice 8 builds the adaptation note, since it is no longer conditional.
- T-010 acceptance checks the four browser families in O04. Real-device checks on an iPhone and an iPad stay with the author ([v4 status](../design/v4-status.md)).
- The Designer adds the new V4 components to the design system: the dock, cover, status tag, toast, popover, search palette and bookmarks sheet.
- O07 stays open. Whether the Part 4 PostgreSQL example is promised as runnable still depends on actually running it in [T-012](../tasks/T-012-postgresql-example.md). That run pulls a container image, so it needs the author's separate authorisation at the time.
