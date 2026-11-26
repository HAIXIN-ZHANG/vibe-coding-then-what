# PDR-002 · Resume and Bookmark

Status: confirmed product direction; runtime acceptance is candidate-specific. Decision-maker: author, with Product's design clarification. Decision evidence: reader feedback resolution of 26 November 2026; recorded the same day. No new runtime PR is asserted by this record.

## Context and choice

“Save” can mean keeping a place automatically or explicitly collecting a passage. The existing reader already has local bookmarks and reading position. Keep automatic resume separate from the explicit Bookmark/Bookmarked action. A bookmark identifies its target and supports revisit/removal. The home page does not expose Bookmark without a passage object.

A valid return visit prioritises Continue reading and also offers From beginning. A first visit offers Start reading and contents. An explicit shared passage URL takes precedence over saved position. Keep storage device-local; this decision adds neither accounts nor cloud synchronisation.

## Alternatives and consequences

Using one generic Save label would obscure which action persists what. Requiring a bookmark to resume would add an unnecessary task. These are rationale comparisons, not findings from a measured reader study. Invalid/stale targets need honest fallback; failed storage must not claim durable success. Reuse the implemented model and test recovery rather than inventing another storage format without a migration.

Evidence: [M3 capabilities](../delivery/milestone-3.md), [passage tools](../../site/components/reading/passage-tools.tsx), [V3.1 feedback note](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi/?node-id=487-1912). The note records design intent, not verified browsing. Acceptance: PRD R01–R03 and R07.
