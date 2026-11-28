# Product Goals and Delivery Milestones — Writer audit

Owner: Writer. Revision: r2. Date: 2026-11-16 (Australia/Perth). Frozen for W-PD-01–04 affected review; original r1 audit/amendment evidence is retained below as history. The [alignment review](../../reviews/product-delivery-alignment.md) owns actual acceptance; the [board](../../coordination.md) owns assignments and holds.

## Task brief

- **Authority/objective:** Coordinator assigned a bounded editorial/public-readiness audit of the parallel Product Goals/Delivery Milestones proposal against merged PR #15 source and accepted reviews. Return line-level findings and exact proposed wording, not changes to shared inputs. This does not accept new chapter research, prose, implementation or a license.
- **Sole writable file:** this new `docs/handoffs/writer/product-delivery-alignment.md`. Read-only inputs: `README.md`, `docs/project-vision.md`, `docs/roadmap.md`, `docs/stage-summary.zh-CN.md`, `CONTRIBUTING.md`, `docs/licensing-and-readiness.md`, `SECURITY.md` and necessary source/design/review references. Preserve all parallel input edits, code and other owners' reports.
- **Verified workspace/baseline:** `/Users/haixin/Desktop/code/vibe-coding-then-what`, branch `main`, HEAD `039c9ee8d09f6b6d3422655825611a1b1b7e70e8`. Coordinator reports merged PR #15 and passing PR/main CI; Writer will not relabel that as a fresh remote verification. At startup the four tracked product documents and board are modified; contribution/license-decision notes and the review are untracked. No Git write, branch switch, dependency, external call, LICENSE, publication or outbound receipt loop.
- **Audit questions:** consistent Product Goals versus Delivery Milestones and historical aliases; many-to-many mapping; Goals 2/3 near-term and Goal 4 conditional; eight parts/48 adjustable units; two Chinese/zero English and honest release status; existing search/sharing versus future resume/bookmarks; optional paths/reflection/simulated API without a compulsory capstone; approved-content/translation/publication intake; contribution/security/license wording without invented terms, channels or promises.
- **Evidence boundary:** distinguish source behavior, accepted evidence and proposals. Coordinator owns legal primary-source verification and overall decisions. This report checks consistency/claims, not legal advice or independent runtime certification. Recommend bounded editorial/content slices with prerequisites and useful acceptance, without authorizing work.
- **Checks/next boundary:** record exact observed input hashes and line references, verify local report links/anchors and whitespace, freeze the report digest after the final write, then stop for direct Coordinator review. Shared corrections require a separate original-owner assignment; no automatic manuscript, translation or engineering continuation.

## Additional bounded edit assignment — recorded before edits

Coordinator relayed the latest human product-owner handoff explicitly adding only `docs/roadmap.md` and `docs/project-vision.md` to this report's writable scope. Preserve all their parallel additions. Clarify that Goals 1–3 focus on improving this single book; a new umbrella brand/project name, logo and broader commercial expansion belong to conditional Goal 4 (former Stage 4), informed by earlier outcomes. Preserve the current title, factual author profile and incidental individual career/collaboration opportunities. Correct active Stage 4 wording without renaming historical headings/anchors.

Actual pre-edit SHA-256: roadmap `00263c70ce13d6eefa882ee6f6bb990112b77ce219a4dafa455b7a405beb381a`; vision `050c9adcfa619dfa9fd33f26e6c9eb38147264862b86de6e11c2c1dcd5a2ce5a`. Only these minimal clarifications and this same report are authorized edits. Remaining audit findings stay proposals until separately assigned.

The parallel product owner is actively applying a newly reported human choice of MIT for code and CC BY-SA 4.0 for book/original diagrams. README, CONTRIBUTING, licensing/readiness and the new license files remain that owner's in-flight work. Earlier undecided wording observed during this audit is not a final finding against the new decision. Coordinator owns verification of actual frozen notices, code-snippet/third-party scope and official legal texts; Writer does not author license files or approve legal terms.

The owner subsequently delivered the local license notices for review. Coordinator additionally authorized correction of current license-undecided/TBU wording in the same two writable documents, using links to the selected notices and preserving provenance/contribution checks. Pre-edit hashes after the focus clarification: roadmap `c544a4dbd9eb3468d48d4ebee02033e80eb2d8106ab67f8d14985437c43f156a`; vision `958d96b4c9caaa509bc3cb27048741fafa6b777e45496661c2961faa2147f2e4`. Read actual MIT, content notice, updated contribution/readiness prose and README. No reserved license/public-entry file is writable by Writer; root still owns primary-text/legal verification and final acceptance. Chinese summary has no contradictory current license-selection claim to flag.

## Delivered amendments and overall assessment

Changed only roadmap and vision, plus this report. Added one focus paragraph to each: Goals 1–3 improve the current book; a new umbrella identity/name, logo and broader commercial expansion wait for evidence-led Goal 4. Current title, author profile and incidental individual opportunities remain. Changed the active Stage 4 reference in roadmap's Beta 4 objective to Goal 4 (formerly Stage 4), retaining every heading. Replaced live license-undecided wording with links to the selected notices and outstanding provenance/contribution/publication checks, including the obsolete open-decision row. No historical snapshot or license file was rewritten.

The proposal otherwise preserves the important distinctions:

- Product Goals express reader outcomes; Delivery Milestones express deliverable slices. The rule is explicitly many-to-many, with Goals 2/3 near-term and Goal 4 conditional. No goal number, milestone number or merged commit proves publication.
- Eight parts and 48 adjustable units remain planning, with only opening/G01 approved Chinese bodies and zero English bodies. README accurately separates available source reading from an unreleased website. PR #15's search/sharing is merged at this assignment's baseline; resume/bookmarks, paragraph selection and the learning pilots are future scope.
- Reflection, paths and one simulated API sample are optional. The complete explanation must remain readable without exercises, a capstone, an account, hosted AI or a cloud sandbox. The proposal does not authorize new manuscripts or translation.
- Updated local license documents distinguish original programming samples from prose/text diagrams, and preserve third-party terms and contributor ownership. This is a consistency observation, not legal acceptance. Coordinator still verifies notices, material-specific rights and official license text before integration.

## r1 findings — historical proposed wording

Line references below identify the frozen input/output hashes recorded at the end. These are Writer recommendations for Coordinator judgment, not self-issued review decisions or permission to edit reserved/shared files.

### W-PD-01 — update the new mapping's stale integration wording

**Priority: P2, status accuracy.** [Roadmap](../../archive/roadmap-2026-11-27.md), lines 78 and 83: the new table describes search/heading sharing as implemented “on the recorded branch” and asks to verify final integration. The current main baseline already includes merged PR #15. Resume/bookmarks and passage selection remain future work; they must not be conflated with heading sharing.

Proposed status-cell wording, respectively:

> Merged PR #15 supplies current-language search and heading navigation; the runtime guide and actual PR execution record retain behavior and verification limits. New discovery metadata needs its own scoped review.

> Merged PR #15 supplies heading-link copy/recovery and editable correction drafts. Passage targeting/selection remains planned; preserve changed-content fallback, mobile/keyboard access and explicit selected-text disclosure.

Keep dated PR #14 paragraphs elsewhere unchanged. These proposed replacements were not applied: the granted edits were focus/Stage 4/license alignment only.

### W-PD-02 — qualify collapsible explanations as a renderer dependency

**Priority: P2 prerequisite clarification, not a claim that a proposed feature must already exist.** Roadmap lines 47 and 211 suggest expandable explanations in reviewed Markdown. [The current parser](../../../site/content/markdown.ts), lines 26–29 and 40, permits an explicit node subset and rejects raw HTML/unsupported nodes; [the renderer](../../../site/components/reading/markdown-content.tsx) has no manuscript disclosure node. Native details used for navigation/section actions do not give book Markdown that capability.

Proposed wording for the reflection row, also usable to qualify Goal 2:

> Start with an optional reviewed Markdown question and a visible explanation using the supported content format. Collapsible presentation requires a separately reviewed renderer/content contract; do not enable arbitrary HTML or MDX to obtain it. The static explanation remains complete without answering.

Plain reflection content can be the first bounded editorial slice; a disclosure implementation is a separate technical/design slice. No renderer or manuscript was changed here.

### W-PD-03 — avoid an unconditional contribution-review promise

**Priority: P3 editorial recommendation.** [CONTRIBUTING](../../../CONTRIBUTING.md), line 13, says “a maintainer will review” every small proposed PR, while the same paragraph rules out a response deadline. No review capacity or service commitment was established in this audit.

Proposed replacement sentence:

> Small, self-contained changes may be proposed through a pull request and considered against the project direction, technical correctness and writing quality; acceptance, review and response times are not guaranteed.

Keep the rights/provenance requirements and substantial-change discussion. This file remains the other owner's work; no edit was made.

### W-PD-04 — distinguish proposed Beta 4 from existing milestone scopes

**Priority: P3 naming refinement.** Roadmap line 24 calls all four Beta scopes existing, then correctly calls Beta 4 a proposal; line 240 labels Beta 4 historical. Preserve existing heading IDs and old records, but qualify the new alias explanation.

Proposed replacement for the correspondence sentence:

> Delivery Milestones 1–3 retain the existing Beta 1–3 aliases; proposed Delivery Milestone 4 uses the planning alias Beta 4. These numbers are independent of Product Goal numbering.

Proposed line 240: `**Delivery Milestone 4** (planning alias: Beta 4; proposed).` This is a recommendation, not an additional rename performed by Writer.

## Content, location and translation intake

Roadmap lines 107–112, 155–158 and 266–271 preserve the right review/publication direction. Make the following sequence explicit in any assigned execution brief; it is not a new blanket writing authorization:

1. Assign the exact chapter or content change. New substantive mechanisms/examples require accepted analysis plus confirmed writing scope; an analysis or outline entry is not manuscript acceptance. Ordinary corrections to existing accepted prose need affected content review, not an invented full-chapter restart.
2. Review actual Chinese prose, diagrams, citations, limitations and any reflection explanation. English adaptation is separately assigned and reviewed for meaning/technical invariants; it is not generated automatically from Chinese availability or a contribution license. Keep the English corpus empty until accepted counterparts exist.
3. Check provenance, relevant license scope and contributor credits separately from correctness. The owner's MIT/CC selection does not clear every asset. The local content notice explicitly treats original programming samples differently from prose and text diagrams even inside fenced blocks; unresolved material-specific rights return to Coordinator/owner.
4. Developer extends the explicit source manifest only after content acceptance: stable identity/path, locale, order, reviewed hash and provenance. The same canonical body must supply reading, navigation and search. A path/index page is also public content needing explicit intake; never expose planning, analyses or every Markdown file by directory discovery.
5. Validate actual destinations and English availability, root/Pages output, source/hash drift and required checks. Content review, integration and deployed acceptance remain distinct. No license, issue or merged manuscript automatically publishes the site.

Current heading IDs derive from heading text and collision order. A copied heading URL is real, but it is not a guarantee across future wording edits. Book/chapter/section sharing should be evaluated before paragraph/selection contracts; do not promise stable paragraph identity from list position, a text ordinal or current heading generation. Preserve deliberate section/chapter fallback and visible notice when an old target no longer resolves.

## Suggested bounded slices — proposals, not assignments

| Slice and owner | Prerequisite and reader purpose | Useful acceptance and maintenance boundary |
| --- | --- | --- |
| Approved-content intake and one ordinary reading path — Writer content; Developer publication | Select only genuinely accepted chapters; add no new mechanisms by implication. Help a reader find a sensible sequence through available material. | Every path link resolves to approved content; prerequisites and missing translations are honest. Update manifest/navigation/search together when authorized. No taxonomy platform or second source body; repeat review when targets/content change. |
| One reflection question with a visible explanation — Writer, with Coordinator content review | Choose one suitable accepted topic and assign the exact source change; reopen analysis only for substantive new reasoning. | Reading is complete without answering; explanation and counterexample are accurate, keyboard/read order is ordinary prose. Confirm rendering/index extraction after approved hash changes. Defer collapse until W-PD-02's contract exists. |
| One explicitly simulated API example — Writer meaning; Developer only under a separate implementation assignment | Define a single request/response problem, mocked normal/failure states, reset behavior and equivalent static explanation. | Label simulated behavior before interaction; no real request, real credential, personal data or invented performance result. Check keyboard/mobile operation and deterministic transitions; no hosted AI/account/sandbox adoption. Keep one small sample, review assumptions when source changes. |
| Resume/bookmarks and later passage sharing — Developer implementation; Writer labels/content identity input | Use real reviewed chapters and a separately scoped storage/location contract. Design concepts are not accepted runtime states. | Device-only disclosure; blocked/invalid storage and deleted/renamed targets recover visibly. Preserve deliberate navigation/focus and manual links. Start with chapter/section; paragraph identity and selection are later reviewed dependencies, not a claim of current support. |

Higher-cost exports/audio, sandbox embeds, new guides, brand/logo and broader commercial products remain conditional/scoped work. The existing author bio/opportunity entry remains permitted; no near-term business launch or mandatory capstone follows from these suggestions.

## Contribution, security and license checks

README continues to identify Jason Zhang and AI assistance without production/client/traffic claims. CONTRIBUTING separates public corrections from suspected vulnerabilities and prohibits private material. [SECURITY](../../../SECURITY.md), lines 9–11, conditionally refers to private reporting **if offered**, otherwise an owner-published private method; it does not establish that either channel exists or promise response time. Channel availability was not tested. If neither exists, do not invent a destination or ask for exploit details in public; Coordinator should resolve a safe reporting route before promising one.

No current Chinese-summary license contradiction was found. Current README, MIT/content notices and readiness text describe the selected owner decision; earlier undecided snapshots in this report are historical observations. Writer has not approved legal wording, relicensed third-party assets, promised moderation/review capacity or verified source license compatibility. Coordinator owns the primary-source and material-rights review.

## r1 frozen outputs, observed inputs and verification — historical

Only the two authorized documents and this new handoff were changed by Writer. The first two hashes below define Writer's submitted documents; the rest identify **observed other-owner inputs**, not Writer acceptance/freeze authority over them.

| File | SHA-256 |
| --- | --- |
| `docs/roadmap.md` — submitted | `1c2dcb61bb55cfa0f02a3fd05b55fcf58dec610b68d86dc61d25501e340a3291` |
| `docs/project-vision.md` — submitted | `d74029eea92ddf5c44a8c21c772705fc0ed0869c614849af58d956776d0164fb` |
| `README.md` — observed | `b4630975fd6efd8a30fc8ced1222fc742a545afba4035d5a75e099281f5bbf6b` |
| `docs/stage-summary.zh-CN.md` — observed | `74f1776307142325703403659e9f3534047e401bb2067c9fbd30154d484672df` |
| `CONTRIBUTING.md` — observed | `84665929f240690615691f33de0d59eea1a70ede228f0b75f8f034103bc074af` |
| `docs/licensing-and-readiness.md` — observed owner delivery | `f437f48f6b950061eeb42b07dd9ddc19efa32f678136b8aba19ffec02828fa35` |
| `LICENSE` — observed owner delivery | `5df221f88567a69a217e90acb595a1a130bf5b528996a3e8903ab7640cda2122` |
| `LICENSE-CONTENT.md` — observed owner delivery | `f8e841ea0fe3e01b1e7a59c383f9a97d364980c799091399d4c83e62d8725d3d` |
| `SECURITY.md` — unchanged input | `6c65502c5a6b4ca78197e96caf0fa762ad9f203d52258f66424865dac0acd71a` |

Actual local preservation check: reversing only Writer's focus/Stage 4/license changes reconstructs **both complete pre-edit parallel-input hashes** recorded above. All heading bytes remain identical. This proves the owner's preceding additions were retained, rather than comparing only with old main and losing their work. Content framework still has eight parts/48 units. Book, site, Panda, scripts, tests, dependency manifests and SECURITY have no diff from HEAD.

Local checks passed across the read inputs and report: **105 relative destinations, including one heading anchor**, balanced fences, all nine observed/submitted hashes, and preserved source/runtime/security scope. `git diff --check` passed. Sources inspected include the actual approved manifest/load/Markdown/render/search/location helpers and accepted reader/search/closeout evidence. No new browser/build/runtime experiment, external provider check, legal-primary-source review, cloud CI or remote protection refresh was run or claimed by Writer. No dependency, code change, Git write, outbound message or deployment occurred.

## Recovery and next boundary

Please review the two narrow amendments and W-PD-01–04 recommendations against the observed input revision. Only Coordinator can decide findings/acceptance and assign shared corrections. Do not treat this audit or suggested slices as chapter research acceptance, a manuscript assignment, QA release, license approval or implementation authorization. Preserve all other owners' files and history. This report excludes its own digest from its body; the final tool result/response supplies it after the last write. Frozen for direct review; stop here without a receipt loop or follow-on work.

## r2 — exact revision assignment recorded before edits

Coordinator accepted W-PD-01/02/04 and the bounded W-PD-03 editorial correction for implementation by the original owner. Allowed files now: roadmap, vision (retain accepted amendments), CONTRIBUTING paragraph 13's review-capacity sentence only, and this same handoff. The license owner's temporary reservation is complete, but its license/provenance wording and every other reserved file remain unchanged. No README, SECURITY, license notice, code, Git or deployment edit.

Verified root/branch/HEAD remain `/Users/haixin/Desktop/code/vibe-coding-then-what`, `main`, `039c9ee8d09f6b6d3422655825611a1b1b7e70e8`. Starting SHA-256: roadmap `1c2dcb61bb55cfa0f02a3fd05b55fcf58dec610b68d86dc61d25501e340a3291`, vision `d74029eea92ddf5c44a8c21c772705fc0ed0869c614849af58d956776d0164fb`, CONTRIBUTING `84665929f240690615691f33de0d59eea1a70ede228f0b75f8f034103bc074af`. Preserve all other parallel changes and r1 history. Apply only the four findings, verify exact pre/post preservation and links/whitespace, freeze three-document digests plus report, then stop for Coordinator re-review. Future Figma-only design is not Writer's follow-on assignment.

### r2 revision history and affected checks

| Finding | Actual revision | Evidence and review boundary |
| --- | --- | --- |
| W-PD-01 | The discover/read and share/respond mapping cells now identify merged PR #15 search, heading navigation, copy/recovery and editable correction drafts. They distinguish future resume/bookmarks and passage targeting/selection, and retain runtime/PR authority for verification limits. | Only the two assigned status cells changed. No future feature or deployed result is claimed. Await Coordinator affected closure. |
| W-PD-02 | Goal 2 and the reflection row now begin with a supported plain Markdown question and visible explanation; collapse requires a separately reviewed parser/render/search contract. Arbitrary HTML/MDX is not enabled; static reading remains complete. | Only the two assigned explanation passages changed; no parser, rendering, search, manuscript or research change. Await Coordinator affected closure. |
| W-PD-03 | Replaced only paragraph 13's review-capacity sentence with the exact requested wording: small PRs may be proposed, accepted changes require review, and a response/review is not guaranteed. | The surrounding substantial-change and non-guaranteed-acceptance sentences, all other paragraphs and license/provenance text are byte-identical. Await Coordinator affected closure. |
| W-PD-04 | The correspondence sentence distinguishes existing Beta 1–3 aliases from proposed Beta 4; its milestone label says planning alias/proposed. The many-to-many rule and every historical heading remain. | Only those two assigned naming passages changed. No numbering, heading anchor, goal scope or old acceptance record was renamed. Await Coordinator affected closure. |

### r2 current frozen document manifest

| File | SHA-256 |
| --- | --- |
| `docs/roadmap.md` | `bf38b1b51d03e49a864ecd2510dd35713cf54f3f100727e8c5c50b0922825e39` |
| `docs/project-vision.md` — accepted r1 amendments retained, no r2 edit | `d74029eea92ddf5c44a8c21c772705fc0ed0869c614849af58d956776d0164fb` |
| `CONTRIBUTING.md` — review sentence only | `fdacf72630d84ee787e7e7ddd3fb4036bdef712ba48ad4b28657ad031e895dee` |

Exact preservation checks passed: restoring only six roadmap passages reproduces its complete r1 hash; restoring only the one CONTRIBUTING review-capacity sentence reproduces its complete owner-delivery hash. Vision retains its exact r1 hash. All headings are unchanged. README, Chinese summary, license notices, licensing/readiness and SECURITY retain the observed hashes in the historical r1 table. The eight-part/48-unit scope, author/current-title/focus amendments and selected MIT/CC BY-SA notices are preserved. No book, site, Panda, scripts, tests, dependency or SECURITY changes were made.

Affected relative-link/anchor/fence and whitespace checks passed. No runtime, browser, Figma, legal-source or cloud check was needed or claimed for these wording corrections. The report's final digest is supplied after its last write; it is excluded from the self-referential manifest. The earlier r1 findings, manifests and stop conditions remain historical evidence; this r2 manifest defines the submitted three-document revision.

Please re-review actual r2 for W-PD-01–04. Writer has addressed the requested changes without self-closing the findings or accepting other owners' work. Freeze the three documents and this handoff for direct Coordinator review; no further rewrite, Figma execution, manuscript, feature, Git action, publication or outbound receipt loop follows.
