# Documentation migration map

> **Historical, 28 November 2026.** This migration map was carried out in a different form. The roadmap, PRD, vision and project index were rewritten, with their originals in `docs/archive/`. Roles now follow [PDR-008](../decisions/pdr-008-roles-and-modes.md). This page records the 26 November plan only.

Draft · 26 November 2026. Product owns the proposed information architecture; Delivery owns scoped moves, reviews and integration. No archive deletion or broad rewriting is authorised by this table. Source baseline: main c50854f plus the preserved design candidate.

## Responsibilities

The public-edition PRD states the current release requirements and open scope. The roadmap states sequence/dependencies, the board states active owners/holds, handoffs preserve recovery, and reviews/delivery records preserve evidence. Decision records explain a small number of choices; they are not another execution board.

Keep public reader copy concise and useful. Formal development/product/design documents are English-first; Chinese manuscripts and the author's Chinese overview retain their purpose. Do not publish private transcripts, local recovery locations or internal feedback merely to make every file reachable from README.

| Existing source | Proposed treatment | Destination / owner | Preservation and completion check |
| --- | --- | --- | --- |
| README and reader-roadmap | Retain; keep actual availability and useful reading paths | Public entry / Delivery | No private queue, speculative translation or unaccepted artifact promises |
| project-vision | Retain positioning; avoid repeating current release checklist | Vision / Product | First volume, life volume and guide remain distinguishable |
| project-brief | Shorten as an authority index | Link PRD, decision index and current design authority / Delivery | Preserve identity link; mark its V1 design link historical rather than treating it as current |
| roadmap | Extract release acceptance details into PRD; shorten current section; label dated stages | Roadmap retains sequencing / Delivery | Keep old anchors and decisions reachable; no loss of historical milestone meanings |
| coordination | Retain only a short current entry and pointers at the top; move lengthy dated narrative only in a separately reviewed edit | Board / Delivery | A new owner can identify current work/hold/workspace without reading hundreds of historical lines |
| reading-experience-v1/v2 | Retain as scoped references; add a version-status map when design guidance is integrated | Design entry / Product | Preserve original frame IDs and historical review claims; do not silently rename V1 as V3 |
| V3.1 and motion handoffs | Extract settled decisions into records; retain candidate gaps and design evidence | Current design index / Product | No missing EN/ZH pairs, static states or exported loops marked ready; do not duplicate old HTML study as current UI |
| book outline/editorial baseline | Retain content authority; link PRD rather than copy it | Writer | Current eight-part revision and two calibration limits remain clear |
| delivery/review records | Retain immutable scope and identities; add subsequent review as new evidence | Delivery | Accepted source, CI, merge, deployment and reader test remain separate facts |
| role guides/AGENTS | Retain concise startup and ownership; link authorities | Delivery | Main stays clean, role workspaces explicit; no PRD copied into each guide |
| private handoffs/backups | Retain with recovery owner; exclude private details from public migration | Delivery private records | Unpublished manuscripts/designs remain recoverable; local preservation is not public acceptance |

## First migration slice

Create the PRD and decision index, review their content, then add narrowly scoped links to the project entry, roadmap and board through Delivery. Mark the surviving V1 design link as historical and expose a current candidate entry only when that referenced source is actually integrated. Do not copy the preserved old roadmap over current main. Larger historical moves follow a link/anchor inventory and are not needed to ship this first slice.

## Cold-start handoff check

After candidate documents are stable, the existing Developer will perform a read-only recovery check using only AGENTS, project-brief and their discoverable document links as the stated evidence. This reviewer already knows the project: the exercise can expose documentation gaps, but is not a blind or context-independent onboarding test. Do not use private chat explanations to repair a missing document answer. Ask them to locate:

1. What is being delivered now, and what is explicitly later?
2. Which manuscript, website and PDF versions exist, and which are candidates?
3. Which decisions are settled, which remain open, and who decides them?
4. Which real reading actions establish acceptance and which tests have not run?
5. Where should the next owner work, and what must happen before implementation or publication?

The reviewer cites file/section evidence and records wrong turns, contradictions and dead ends. Correct the documents and repeat only affected questions. This document-recovery check is not a real-reader usability study. Record prior familiarity with the project alongside the result. A later reviewer new to the project could provide stronger onboarding evidence, but that additional exercise is not assigned here. The [stage review](../reviews/public-edition-requirements.md) records the checks completed for each candidate, their findings, affected rechecks and reviewer limitations. Refer to that versioned evidence for the actual outcome.
