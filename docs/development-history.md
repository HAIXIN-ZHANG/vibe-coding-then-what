# Development History

Original evidence snapshot: 2026-11-15; later integration addendum: 2026-11-16 (Australia/Perth), through PR #14. This map describes delivered, reviewed and preserved work. The [Roadmap](archive/roadmap-2026-11-27.md) describes future scope; neither page is an execution authorization. For operating detail, use the [coordination board](coordination.md), [collaboration rules](collaboration.md) and [main developer guide](../site/DEVELOPMENT.md).

**Current record pointer — 2026-11-16:** the [canonical Delivery Milestone 1 ledger](delivery/milestone-1.md) consolidates original expectations, actual review/rework, mainline integrations through PR #16 and the remaining Release Readiness gates. PR #15 search/sharing and PR #16 public-document/license closeout are merged at main `9684c3c1e56323f879500c0f462ef44505b47cd7`. Goal 1's foundation is accepted/merged; permanent E2E/CI, dependency reassessment, gated Pages CD and verified online/rollback evidence remain Milestone 1 work, with deployment still held. The snapshots, table rows, failed/interrupted attempts and dated limits below are retained unchanged; their pauses and pending states are not a live queue. Product Goals/Delivery Milestones are the current terms; legacy Stage/Beta names remain in historical evidence.

The original history package was assembled against main `4ff4a1ffd32209e80f64a60bd12766f3864ea489` and completed through PR #7, whose actual head/checks/squash result are recorded below. The original DS01 Design Tokens and Day/Night Themes work remains a separate, **unaccepted checkpoint**; the later new foundation has its own acceptance and integration. This history is not a live assignment queue: the board owns current workspaces, tasks, holds and next actions. Historical narrative from the former long board is retained in the [single archive](archive/coordination-before-onboarding.md); it is not required startup reading.

## Later integrations — 2026-11-16

PR #12 merged the separately reviewed [theme foundation](reviews/beta1-theme-foundation.md), accepted [opening r2 and outline r4 alignment](reviews/beta1-opening-alignment.md), and current source-hash contract metadata. Selected DS01 reuse retained the strict compiler boundary without accepting the original checkpoint wholesale. PR #13 merged the independently reviewed [reading components](reviews/beta1-reading-components.md). Their immutable Git/CI evidence is appended to the ledger below; these later outcomes do not turn earlier incomplete browser checks into passes.

PR #14 merged the [initial Chinese reader](reviews/beta1-chapter-reader.md), rendering only opening/G01 reviewed sources with responsive reading/navigation, System/Day/Night, source-derived anchors and source figures/tables. English availability remains explicit rather than inventing a translation. The [runtime guide](../site/DEVELOPMENT.md) owns implementation details. At this merged baseline, no static search, section-link copy, English manuscript or deployed site was present; subsequent execution is scoped only through the board.

The reader stage first stopped at a usage-limit checkpoint with insufficient evidence. Following the author's resumption, Developer corrected and reverified the remaining findings; Coordinator performed affected re-review before acceptance and integration. The [reader review](reviews/beta1-chapter-reader.md) and [owner handoff](handoffs/developer/beta1-chapter-reader.md) preserve failed/provisional checks, resumed evidence and their limits. Local Chrome matrices and root/Pages export checks are not complete assistive-technology certification, a permanent E2E suite or deployment. CI/merge facts below are later execution evidence, separate from the review's pre-merge snapshot.

Separately, the [Beta 2 palette design](reviews/reading-palettes-design.md) passed technical handoff review, not production acceptance. Three direct swatches—Original / Mist Blue / Soft Grey—retain independent System/Day/Night. The original 111 Figma variables remain, plus 22 design-only additions: 133 live variables, four collections, three pages and 14 text styles; production mapping stays 111. [Palette scope and remaining gates](design/reading-palettes-spec.md) do not release Beta 2 implementation or publication.

## Original outcome map — 2026-11-15 snapshot

Human-readable names are primary. Legacy references remain for existing paths, review findings and historical links; they are not renamed CI jobs or new stages. The following map, five delivery cases and decision-evolution table retain the original snapshot's evidence and limits, not today's assignment queue; later integrations above supersede its live shell/reader/theme status.

| Outcome | State at this snapshot | Evidence |
| --- | --- | --- |
| Website Foundation and Bilingual Routing | Code/config/static-build review accepted; already in initial main; browser acceptance incomplete | [Handoff](handoffs/developer/D02.md), [review](reviews/D02.md), legacy D02 |
| Continuous Integration and Merge Protection | Access baseline and CI integrated; three cloud checks required after actual success | [Access review](reviews/SEC01.md), [CI review](reviews/CI01.md), legacy SEC01/CI01 |
| Strict TypeScript Migration | Accepted and merged; runtime/JSX unchanged after extension normalization | [Handoff](handoffs/developer/TS01.md), [review](reviews/TS01.md), legacy TS01 |
| Design Tokens and Day/Night Themes | Local implementation/build evidence preserved; independent browser/integration acceptance incomplete | [Checkpoint handoff](handoffs/developer/DS01.md), [review checkpoint](reviews/DS01.md), legacy DS01 |
| Reusable Reading Components | Authorized future scope, currently paused; not delivered | [Roadmap](archive/roadmap-2026-11-27.md), legacy CMP01 |
| Responsive Chapter Reading | Initial content contract accepted; renderer and reading UI not delivered; paused | [Content contract](content-contract.md), legacy PAGE01 |
| Browser Validation and E2E Tests | Necessary tools/small E2E suite authorized; full acceptance and permanent tests not completed; paused | [Review checkpoint](reviews/DS01.md), legacy QA01 |
| GitHub Pages Release | Authorized only after code/content/QA acceptance; not deployed; paused | [Access policy](security/access-policy.md), legacy DEP01 |
| Reviewed Opening and Shared Foundations | Chinese drafts accepted and merged; not yet rendered on the website | [Writing review](reviews/W02.md), [integration](reviews/INT01.md), legacy W02/INT01 |
| Chapter Analysis and Manuscript Review Workflow | Process/templates accepted; each actual chapter still has two gates | [Workflow review](reviews/WF01.md), legacy WF01 |
| Browser Fundamentals — Research and Outline | Analysis r1 accepted and merged; proposed experiments not run | [Analysis review](reviews/F01A.md), legacy F01A |
| Browser Fundamentals — Manuscript | Separate gate; not delivered, currently paused | [Chapter workflow](../book/planning/chapter-workflow.md), legacy F01M |
| Project Documentation Integration | Earlier 28-file documentation package merged; outline remained a proposal | [Review](reviews/DOC01.md), legacy DOC01 |
| AI Development Workflow and Delivery History | Accepted and merged through PR #7; this completed task does not release later product work | [Handoff](handoffs/developer/DOC02.md), [review and integration record](reviews/ai-development-documentation.md), legacy DOC02 |

## Five delivery cases

### Website Foundation and Bilingual Routing

**Problem and scope.** The author wanted code to support a book, using familiar React/Next.js/npm tools, with English as the default and Chinese routes available. Developer first wrote a proposal; the author then directly released the foundation work. There is no invented acceptance of the proposal-only stage.

**Delivery and choice.** A small static-export site supplied home pages, honest empty indexes, language navigation and a bilingual 404. Separate root layouts provide each document's language and metadata. One Pages-level 404 defaults to English with Chinese recovery text; it does not dynamically infer an invalid URL's language. The multiple-layout implementation uses the pinned Next experimental global-not-found option, with upgrade revalidation required.

**Review and revision.** Coordinator accepted code/config/static builds but recorded actual browser access limitations. A non-blocking suggestion strengthened exported title, language-destination and 404 noindex assertions; Developer reran the affected checks. HTML/link checks were not described as visual or keyboard acceptance.

**Evidence and result.** Four behavior tests and both root/Pages exports passed, each checking five HTML pages and 73 references. The D02 commit was already identical to initial main, so integration verified equality rather than creating an artificial PR. [Original handoff](handoffs/developer/D02.md), [review R1/R2](reviews/D02.md) and [integration record](reviews/INT01.md) retain the limits.

### Continuous Integration and Merge Protection

**Problem and scope.** A public repository needed issue/PR feedback without allowing visitors to update the original source, and the author wanted deliberate integration rather than arbitrary merges. Access control and code checks were separate tasks.

**Delivery and choice.** Coordinator configured and verified server-side main protection, including administrators, PRs and force-push/deletion restrictions. Required approval count stayed zero for the single-account local-review arrangement; a Markdown rule was not presented as server enforcement. Developer later supplied a read-only PR/main workflow with stable Quality/root/Pages jobs, pinned official Actions and the same prefix for each build/verification pair.

**Review and revision.** Coordinator reviewed the actual workflow and locally checked its structure, then inspected real cloud job success before enabling the required check names. The protection update was independently read back; failed API attempts were recorded as rejected attempts, not saved settings. New revisions needed their own successful run.

**Evidence and result.** Access PR #2 and CI PR #4 merged. The final CI head passed all three jobs in [run 43664998230](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/actions/runs/43664998230). The [access baseline](security/access-policy.md) and [CI review](reviews/CI01.md) record exact controls, heads and limits. This did not deploy Pages or establish absolute account security.

### Strict TypeScript Migration

**Problem and scope.** The author requested TypeScript after the original JavaScript foundation. Developer scoped a migration preserving routes, messages, markup and behavior, with actual type checking in CI.

**Delivery and choice.** Eighteen application modules moved to TS/TSX with strict checking, typed locale/messages/props/metadata and generated Next route declarations. Existing Node tools retained `.mjs` and native Node type stripping rather than adding a runner. Type stripping itself was not counted as a type check. The selected TypeScript version matched the inspected ESLint tooling support range.

**Review and revision.** Coordinator confirmed that declaration checking also passed and requested removal of an unnecessary `skipLibCheck:true`; Developer changed it to false and reverified. Coordinator independently compared all 18 emitted runtime/JSX modules after import-extension normalization. The development-only minimatch advisory remained documented under its actual configuration conditions, without forcing a major override to manufacture zero audit findings.

**Evidence and result.** PR #5 merged after [run 43666204903](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/actions/runs/43666204903); the resulting main push also passed [run 43666511864](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/actions/runs/43666511864). See the [handoff](handoffs/developer/TS01.md) and [review R1/R2](reviews/TS01.md). No UI, manuscript renderer or deployment was added.

### Design Tokens and Day/Night Themes

**Problem and scope.** The author selected PandaCSS. UI03 supplied a three-page design system, semantic geometry and Day/Night roles, but a design artifact did not establish website behavior.

**Delivery and investigation.** Developer read the 111 Figma variables, 58 actual alias targets and 14 text styles, then implemented a theme controller, pre-body bootstrap and system/explicit preference behavior in a separate branch. Actual compilation exposed upstream Panda build-declaration errors. Peer compatibility ranges alone had not demonstrated a passing build.

**Review correction and trade-off.** Coordinator's probes supported separating build-only Panda definitions from the application. The application retained strict/full declaration checking; a second strict compiler checked handwritten build definitions while skipping only upstream build-tool declaration internals. Missing public types were supplied explicitly. Developer verified both compiler coverage and negative probes. This adds a visible tooling boundary and does not repair the upstream declarations.

**Evidence and limit.** The preserved handoff reports clean generation/install, both compilers, ten tests, root/Pages builds and comparisons against actual CSS. Coordinator inspected sources and compiler behavior, but did not complete independent first-paint, hydration, keyboard or screenshot acceptance. The temporary browser script passed syntax checking only and never ran. The work is saved as [checkpoint 4da2578](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/4da2578048f8df113fed92d99e084f644a9a788e), explicitly **not an accepted reviewed head, main merge or deployed theme**. [Review checkpoint](reviews/DS01.md).

### Reviewed Writing and Browser Fundamentals — Research and Outline

**Problem and scope.** The author wanted connected explanations supported by research, with chapter analysis reviewed before prose. Writer owns the source body; a website implementation does not approve its content.

**Revision example.** In the opening/shared-foundations draft, Coordinator returned distinctions between duplicate-action rejection and an existing registration, and between an empty query and a prior operation's terminal failure. Writer revised the teaching examples; R1–R3 were closed in the separate manuscript review. The full outline remained a proposal rather than inheriting that acceptance.

**Research gate.** The later Browser Fundamentals analysis established a seven-part causal explanation, evidence boundaries, examples/diagrams and proposed validation. Coordinator independently checked the cited official sections and accepted analysis r1 without requiring invented traces or performance numbers. Manuscript writing remained a separate gate.

**Evidence and result.** W02 PR #1 merged reviewed Chinese drafts. Research PR #6 merged after [run 43669313631](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/actions/runs/43669313631). See [W02 review](reviews/W02.md), [workflow review](reviews/WF01.md) and [analysis review](reviews/F01A.md). No Browser Fundamentals manuscript, English adaptation or browser experiment result is delivered by those PRs.

## Decision evolution

These are recorded changes of direction or constraints, not reconstructed motives or measured productivity claims.

| Earlier position | New fact or feedback | Decision and responsibility | Cost, validation and remaining work |
| --- | --- | --- | --- |
| Former names Beyond the Frontend / `beyond-the-frontend` and 《前端往后看：能跑，然后呢？》 appear in historical evidence | Author approved Vibe Coding, Then What? / 《Vibe Coding 之后：能跑，然后呢？》, subtitle Understand the Systems Behind Your AI-Built Products, and slug `vibe-coding-then-what` | Coordinator renamed the same GitHub repository and updated About/origin; Developer migrates active engineering branding/Pages prefix and Writer aligns assigned editorial entries, with code review/integration still separate | Historical names, reviews, handoffs and checkpoint hashes retain their original identity; the opening's single-title replacement is separately reviewed and does not accept other prose, theme work or deployment |
| Broad practical-engineering audience, with AI product coverage not yet a required main line | Author explicitly confirmed v1 for Junior–Senior Full-stack + AI Product Engineers and an eight-part direction | AI product architecture becomes core reading, distinct from coding-AI delivery; Writer owns vision/detailed outline and Developer synchronizes entries under Coordinator review | Shared explanations layer mechanisms, examples and optional depth; DevOps/data support product delivery, specialist volumes remain future options. This is a direction decision, not accepted new research/manuscripts or website functionality; [scope handoff](handoffs/developer/full-stack-ai-book-scope.md) records the bounded documentation change |
| Familiar JavaScript/JSX foundation | Author explicitly requested TypeScript | Developer migrated; Coordinator required actual strict coverage and reviewed emitted behavior | Additional type/tool dependencies; 18-module comparison and cloud CI passed; browser UI acceptance remained separate |
| All TypeScript could use full declaration checking | New Panda dependency exposed upstream declaration errors | Developer investigated; Coordinator approved isolated strict build-tool checking while preserving application checks | Another compiler boundary and a documented declaration exception; local probes/builds passed, final theme review remains incomplete |
| Design references were mostly Day/two viewport samples | Design review found narrow-header overflow and insufficient Night/state references | Coordinator's historical design revisions added responsive/Night variants, semantic roles and clearer annotations | More design references to maintain; structural/color checks passed, not DOM/browser acceptance |
| A roadmap or message could be mistaken for release of the next stage | Author required per-stage review and direct feedback between existing roles | Coordinator defined scope and two chapter gates; owners send versioned handoffs, revise and resubmit | Explicit coordination instead of unattended execution; process acceptance does not approve any later artifact |
| CI/protection or a successful first run might be treated as enough to merge | Actual cloud results and changed revisions needed separate verification | Coordinator enabled observed checks only after success and merged matching reviewed heads | Each proposed head needs fresh checks; Markdown and a zero GitHub approval count do not replace the local review record |
| An embedded AI service was one possible reading direction | The recorded first-release direction favors questions/context for the reader's own tools | Author-approved planning uses inspectable, copyable cards instead of paid embedded chat | No model backend is implemented; actual cards/clipboard behavior remain future work, with no claimed cost or user benefit measurements |

## Verified integration ledger

Abbreviated commit labels link to full immutable SHAs. A **reviewed PR head** is the proposed revision; the **squash merge** is a different commit on main. Later translations of handoffs/reviews do not make their current bytes identical to historical hashed snapshots.

| Record | Reviewed/proposed source | Main result or preserved checkpoint |
| --- | --- | --- |
| Website foundation; no artificial PR | [d0965a1](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/d0965a172196091c9781f4ffea6b8dc9941ae6c5) | Already initial main; [equality check](reviews/INT01.md) |
| [PR #1](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/1) — reviewed writing | [13513c9](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/13513c91edf6b8a201222ab11b90cafee07c9d36) | [71b29c7](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/71b29c7885812e19936de5c1c0cbb73dd6347271) |
| [PR #2](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/2) — access baseline | [ea934e6](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/ea934e64453900f3be1194f1ae431a7c814fe20b) | [c8993ce](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/c8993cec0eb94203cae3a57104462e2dd67f2e3f) |
| [PR #3](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/3) — documentation | [f4790e1](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/f4790e1916aee7a1c0bea376e96a350e8bd64839) | [884129b](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/884129bb313e62160321a0c1c1422452a237478a) |
| [PR #4](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/4) — CI | [b7c6a91](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/b7c6a910a48917eadf72cf0074d68d1541b96e97) | [15c3c7a](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/15c3c7af75413d0a5aa4de87baa43ca9f28b9f05) |
| [PR #5](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/5) — TypeScript | [c0418f1](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/c0418f132e76e19d130b5a073a658e9644656d56) | [92a0edf](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/92a0edf67774966871e8e85e2b82ab02dc3a5e99) |
| [PR #6](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/6) — research/outline | [51cb205](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/51cb2053e8f142cb2b46762430cde882da45fd02) | [4ff4a1f](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/4ff4a1ffd32209e80f64a60bd12766f3864ea489) |
| [PR #7](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/pull/7) — AI workflow and delivery history | [dd08e7a](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/dd08e7aa4a6e13f949bd389d8919e23a96f07a1d); Quality and both Static export jobs passed in [run 43672904569](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/actions/runs/43672904569) | [aafc467](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/aafc467860a80a4ad0918d08055336079ebf0e98); no deployment |
| Unaccepted theme checkpoint; no accepted PR | Source started from TypeScript main `92a0edf` | [4da2578](https://github.com/HAIXIN-ZHANG/beyond-the-frontend/commit/4da2578048f8df113fed92d99e084f644a9a788e), separate from main |
| [PR #12](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/pull/12) — new foundation and opening alignment | Reviewed head `23c3d19586d03e3cfb5d84044f0db7015c51188e`; all Quality/root/Pages jobs and steps passed in [run 43791847318](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/actions/runs/43791847318) | Squash [2534b90](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/commit/2534b90d23c3624e4ce393aa02f52df4dea75e06); no deployment |
| [PR #13](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/pull/13) — reading components | Reviewed head `70aed2f3b966f4e8ca144a1df7cd05326d4add8a`; all three jobs/steps passed in [run 43796441747](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/actions/runs/43796441747) | Squash [a96fd21](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/commit/a96fd2134c09989667a16d728a9f1b00f21c6580); no deployment |
| [PR #14](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/pull/14) — initial Chinese reader | Reviewed head `936dc6d53ddbecddb53e8b91e10ccd02b510f7bf`; all three jobs/steps passed in [run 43837284406](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/actions/runs/43837284406) | Squash [612950a](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/commit/612950a68d0d0b9bfc149b9e2236c7143020d1bf); merged main passed [run 43838067080](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/actions/runs/43838067080); no deployment |

The original history package checked actual local Git ancestry/commits and GitHub PR metadata, plus named cloud runs/job outcomes; PR #7's completed result is included in this ledger. At that historical readback, repository About metadata described the earlier NEStory app; that snapshot did not establish a later alignment. No live account-security re-audit, DS browser run or deployment was performed to create that original history. The 2026-11-16 additions use the named stage reviews and Coordinator's verified PR/CI/merge execution facts; this documentation update did not rerun those browser/cloud checks or audit current protection settings. Stable commits and saved review summaries are durable evidence; old temporary screenshots/previews/logs may no longer exist. No Figma images are relabeled as application screenshots. For new-agent startup, use [AGENTS](../AGENTS.md) and the board rather than reconstructing this chronology.
