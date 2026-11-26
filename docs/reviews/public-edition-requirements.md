# Public-edition requirements — independent review

26 November 2026 · Delivery Lead / Coordinator. Gate: formal requirements/decision documentation and bounded read-only recovery. [Handoff](../handoffs/public-edition-requirements.md). This review does not accept new website behaviour, manuscript admission or a new PDF.

## Scope and current outcome

Read Product's seven draft files in full and the three current entry-point changes against main `5353d69`. Independently checked 61 local links/anchors in the new documents and changed current sections; no missing targets. Writer and Developer supplied separate content/capability audits, then reviewed the assembled candidate. Affected r2 rechecks passed. Outcome: accepted as a requirements/decision **draft**, with O01–O07 still open and no new implementation or manuscript authority.

The current 51-piece source, two full English adaptations/two overviews and 209-page PDF are existing release inputs. Size controls, bookmarks and heading-level Continue already exist. Browser Back preserving a viewed paragraph is distinct from automatic resume. Physical devices, full translated coverage, new layout readiness and PostgreSQL concurrency execution are not established by this document review.

## Findings and closure

| ID | Finding and consequence | Owner / resolution | Status |
| --- | --- | --- | --- |
| REQ-01 | English baseline called two overviews “introductions”; could blur availability | Product changed to “two overviews”; compared against the edition registry | Closed in PRD f1069354… |
| REQ-02 | “Context-independent” method overstated a returning Developer's independence | Product disclosed prior project knowledge and renamed the procedure document-only recovery | Closed in PRD f1069354… and migration `751b9012…` |
| REQ-03 | Whole-book system-map/closing criteria could be read separately as an authorised all-volume rewrite despite O06 | Product must scope criteria to explicitly selected content; Writer and Delivery recheck | Closed: Product revised PRD `dff5b98b…`; Delivery read the complete changed paragraphs and Writer independently passed the affected scope check |
| REQ-04 | Board exposed roles but no current handoff/review or route to obtain exact private sample/workspace inputs | Delivery added a public-safe handoff, comparison hashes and explicit assignment-before-editing boundary; private paths remain private | Closed: original Developer followed the corrected entry and answered all five questions from documents; exact private inputs remain an explicit Delivery-supplied prerequisite |

The first read-only pass is retained as a failed recovery entry, not relabelled successful after verbal clarification. It did find the right current capabilities and open decisions. Its existing-project-knowledge limitation applies to all later passes.

## Affected recheck evidence

The r2 twelve-file candidate manifest SHA-256 is `8a5ffc6926f4d2f3e20cfb8560ba628027be66ee139884874747822086cd4461`. It names the Product PRD `dff5b98b6d5a099b383e7be1d29f8b8a34a4864d00d69c3daf526e2f299b27fa` and unchanged four PDRs/index, plus the corrected entry points. Delivery read both independent reports in full and rechecked the actual changed PRD and entry files.

Writer confirmed the source baseline, PDF identity and exact sample hashes; its r2 report closes the sample-entry and O06 scope findings. Developer recorded the actual AGENTS/project-brief → board → handoff/review trail, mapped R01–R12 to existing/refine/new/decision-needed capabilities, and recovered all five migration answers in r2. Its first pass had correctly failed the missing entry; that history is retained. Prior project knowledge and the need to obtain private inputs remain explicit limitations. The review does not pretend that the public repository contains private samples or automatically grants a workspace.

Delivery independently checked 71 current-scope local link/anchor occurrences with no missing target. Developer checked 111 local occurrences across the four affected r2 files with no missing target; external Figma/PR links were not re-fetched by that documentation pass. Product independently matched and reviewed the five Delivery-owned r2 files, accepting roles, draft/open boundaries and private-input handling. Subsequent final edits only record these completed outcomes, correct spacing and point from the migration document to this evidence; their diff remains subject to the final integration check.

R03’s fallback explanation and R06’s possible figure/note expansion need interpretation when a later journey is selected. They are not evidence of an existing lightbox or an instruction to build one now. No browser/device/AT suite or PostgreSQL concurrent execution was performed for this documentation gate.

## Integration boundary

After exact-file affected reviews pass, Delivery may integrate only these requirements, decisions and entry pointers under the author's existing authorisation. Open author decisions remain visibly draft/open. The associated PR records the actual reviewed commit, required checks and merge; the release identity independently records deployment. No private archive, calibration prose, runtime implementation or historical evidence rewrite belongs in this batch.
