# Project Vision: Vibe Coding, Then What?

Updated: 2026-11-21 (Australia/Perth). The author confirmed a [two-book series](../book/planning/outline.md#two-book-series). The engineering volume follows people building systems with AI. The companion follows people living with the resulting changes, including readers who have never written code. Each can be read independently. The eight parts below belong to the engineering volume. `TBU` means information or a decision is still needed, not that a feature exists.

[Project entry](../README.md) · [Roadmap](roadmap.md) · [Development history](development-history.md) · [Chinese stage summary](stage-summary.zh-CN.md)

This document owns the audience, content scope and product direction. The roadmap owns future dependencies and acceptance checkpoints; Development History records what happened and the evidence behind it. The old `project-brief.md` remains a compatibility entry. Writer's detailed outline and Developer's implementation records have separate responsibilities. Accepted changes should reach the appropriate shared document rather than create competing project descriptions.

The [Delivery Milestone 1 record](delivery/milestone-1.md) is the canonical comparison of first-delivery expectations, accepted outcomes, rework and verified initial-publication evidence, with retained maintenance and recovery limits. Goal 1's foundation and the bounded initial public release are verified; current assignments belong only in the board.

**Product planning update — approved 2026-11-18:** [Roadmap](roadmap.md#approved-milestones-24-direction--2026-11-18) distinguishes Product Goals from Delivery Milestones and owns the detailed routes/acceptance. Milestone 2 completes coherent Chinese core-draft coverage across the eight parts, with essential reader support (reviewed/confirmed V2 core and minimum local Continue) and basic aggregate measurement; 48 working units do not mean 48 mandatory files. Milestone 3 refines the whole-book Chinese first edition, adapts stable Chinese sources into separately reviewed English batches and selects useful extensions. Milestone 4 packages and distributes the free first book, with updates, topic filters, discussions, referrals and aggregate reader feedback. Milestone 4 also covers the separate professional guide and the life volume’s concepts, samples and reviewed writing batches. Milestone 5 covers formal companion publication and stable EPUB; richer cross-book discovery depends on real content and demand. Optional pilots do not hold up core writing. Planning approval does not assign all writing, implementation or publication; the board alone owns live work.

Goals 1–3 focus on making this book and its reading experience useful under the current title. The broader author portfolio and refined bookshelf belong to Delivery Milestone 4; the basic two-book entry is in the integrated M3 reader. A simple entry can link this book and actual later works, including career or life writing, without requiring a second completed guide; richer multi-guide features depend on real content and reader need. This is future planning, not an assigned build. A separate umbrella brand or logo remains a later decision. Amazon publication and broader commercialization are deferred until after Delivery Milestone 4, informed by earlier outcomes. Factual author information and incidental career or collaboration opportunities remain within the current scope.

## Reader feedback refinement · 26 November 2026

The [current Volume I revision](../book/planning/outline.md#revision-2026-11-26) develops technical depth across the full delivery path while preserving the approved voice. The [life volume](../book/planning/volume-two-outline.md) explains the mechanisms behind everyday consequences. The professional companion follows the author’s actual delegation and review process across all six chapters. Apply human-centred writing and real-use acceptance across all three works. The integrated reader already has a basic two-book entry; M4 refines that entry and reading experience.

## 1. What we want to make

**Vibe Coding, Then What?**

**Understanding the Systems We Build, and Learning to Live with What We Can’t Fully Control**

**《用 AI 写代码：能跑，然后呢？》**

Chinese supporting description (editorial summary, not a separately finalized subtitle): **从故事中理解系统，思考 AI 带来的便利与困惑，建立做产品的判断，也学习与不确定性相处。**

Create a story-led book connecting foundational engineering ideas, product judgment and the human experience of building with AI, maintained through a static reading website. Readers can follow the narrative or return to a concrete question. The project and book use **Vibe Coding, Then What?**; the repository slug is **`vibe-coding-then-what`**. Beyond the Frontend and Engineer Better are historical working names.

The first edition is a connected guide for **Full-stack + AI Product Engineers, from Junior through Senior**. Start from engineers who have built with AI and want to understand gaps in how their product works. Connect user tasks and success criteria with interfaces, Design Systems, APIs, business/data rules, asynchronous work, cloud delivery, observability, recovery and AI product architecture. Help readers judge how the parts cooperate and verify changes under real constraints. A working AI-assisted product is the entry point; the goal is informed product and engineering judgment, not a claim that AI-written code is inherently wrong.

**Author-confirmed editorial direction (2026-11-18):** understanding systems and using AI while living with its wider uncertainty are connected themes. The latter includes verification, delegation, learning, changing working practices and human agency, beyond operational reliability. Aim for an observant practitioner's voice, sharing experience and conditional advice with literary care, warmth and restraint. Stories connect foundations across the product while necessary technical explanation remains complete. The [editorial baseline](../book/planning/editorial-brief.md) owns voice, examples and sample calibration. This direction does not automatically reorganize the eight parts, change accepted manuscripts or establish a published new edition.

The author is **Jason Zhang**, with AI assistance throughout creation. The website is the book's reading product, not simply a list of Markdown files. Both the explanations and the reading experience need validation through actual sample chapters and feedback.

**Maintenance and measurement direction:** maintain reviewed Markdown as the shared source for the website and later verified exports, with meaningful change notes, stable links, corrections and dated checks for time-sensitive claims. The approved Milestone 2 plan includes basic aggregate measurement; Milestone 3 uses feedback and those signals for maintenance and adds click reporting only for actual export links. Estimated visitors, body-open sessions, entry-to-body rate, contents-end reach, chapter visits, available download-link clicks and broad sources describe navigation and access. They do not measure reading completion or comprehension. The [roadmap](roadmap.md#candidate-lightweight-readership-measurement) retains privacy, event/session deduplication, provider/cost evaluation and evidence limits. No analytics provider, account, script or deployment is selected by this plan.

The site remains the reading and discovery hub. After Delivery Milestone 4, evaluate optional paid convenient formats or relevant services and, if worthwhile, an established storefront for transactions and delivery. Preserve open-reading and existing license rights; do not imply current sales, paid subscribers or author-owned exclusive rights to others' contributions.

## 2. Readers

The author has confirmed **Junior–Senior Full-stack + AI Product Engineer** as the v1 audience and positioning; this is no longer a public-positioning TBU. Readers may be strongest in frontend, backend or end-to-end delivery and want to connect the parts into products that can be built, evaluated, operated and recovered.

Use one common text with three layers:

| Reading need | How the shared text helps |
| --- | --- |
| Junior: build reliable mental models | Explain essential mechanisms, terms and a small normal/failure example without assuming prior distributed-systems or AI knowledge |
| Mid: connect implementation and product behavior | Trace one engineering example across UI/API/data/runtime, including failures, tests and evidence |
| Senior: inspect conditions and trade-offs | Offer skippable comparisons, boundary changes and operational/economic consequences without making every specialist mechanism required |

These are reading needs, not a validated market segmentation or a promise of promotion. Readers should have some practical development exposure; the book does not restart from every language's syntax. More experienced readers can fill gaps or follow deeper trade-offs, while new-to-topic readers can follow the essential argument.

**AI product architecture is required v1 content**, not an optional final demo. It includes deciding whether AI is appropriate, model integration/validation, user control, context/state, authorized RAG, workflow/tool execution, security, evals and operating trade-offs. **Coding AI is a distinct development/delivery thread:** requirements, context/contracts, skills, diff review, tests and release verification. Neither replaces the other or turns the book into a tool manual.

Do not promise employment, income, productivity or a job level, or present teaching cases as the author's production experience.

## 3. Editorial choices

| Choice | Practice | Evidence of success |
| --- | --- | --- |
| Begin with familiar problems | Sharing a component, placing search state, recovering from a timeout | The opening makes the reason to keep reading clear |
| Be approachable and accurate | Build intuition, then explain mechanisms and limits | Analogies support rather than distort the explanation |
| Connect the layers | Revisit one feature through UI, APIs, data and operations | Readers can trace how a decision affects other parts |
| Make choices conditional | Explain the need before comparing a few representative implementations | Benefits, costs and unsuitable conditions are explicit |
| Teach AI product engineering and AI-assisted delivery separately | Required AI architecture plus contextual coding-AI examples, not generic prompts in every chapter | Readers can distinguish product capability from development assistance and verify both |
| Respect attention | Short connected sections, explained terms, useful diagrams and optional depth | Readers can follow the argument and recover context after a break |

These are editorial choices, not claims that nobody has used them before. Their value must be demonstrated through completed content.

## 4. Content map

The author-confirmed v1 framework has **eight parts**. The [detailed content framework](../book/planning/outline.md) owns independent reading-page questions, necessary knowledge, original examples, depth boundaries and the complete old-to-new mapping. Page labels are planning aids, not routes, schema or a count of finished chapters. The old three-part/45-chapter proposal is historical; its useful scope is redistributed rather than silently discarded.

| Part | Reader outcome |
| --- | --- |
| 1. Product Goals and the Full-stack Architecture Map | Define user success and boundaries, locate browser execution and static/runtime contracts, distinguish combinable architecture dimensions |
| 2. Frontend Design Systems and Product Interaction | Make layout, tokens, component contracts, state, accessibility, async/AI controls and rendering serve the product task |
| 3. APIs, Backend Boundaries and External Integration | Define HTTP/API/permission agreements, business modules, error/cleanup responsibilities and file/external/webhook boundaries |
| 4. Databases, Search and Product Data Flow | Reason about models/ORM/SQL/constraints/transactions/cache/search and trustworthy product metrics/data lifecycle |
| 5. Asynchronous Work, Traffic and Reliability | Separate capacity from correctness; design quotas/backpressure, timeout/retry safety, tasks, queues/events and consistency windows |
| 6. Cloud Runtime, Testing and Delivery | Choose runtime/hosting/network identity and produce evidence through tests, controlled builds/releases/migrations and rollback/roll-forward |
| 7. Observability, Debugging and Recovery | Follow frontend-to-data evidence, define useful operational signals/alerts and verify incident/data recovery |
| 8. AI Product Architecture and AI-assisted Delivery | Build controlled, evaluated AI capabilities and separately collaborate with coding AI; ten working reading units, not ten completed chapters |

Connected original examples recur across the parts: themes, authorized search, upload/processing, last-place enrollment, learning reports, AI course assistance and coding-AI delivery. They are explanatory cases, not compulsory capstones or a separate duplicate definitions section. Case size/code volume follows the question, not a page quota.

Architecture choices occupy different axes: CSR/SSR/static/BFF; layers/modular monolith/Ports and Adapters/services; HTTP/webhooks/poll/SSE/WebSocket; web–queue–worker/events; database/cache/object/search/vector; managed runtime/container/functions; structured generation/RAG/workflow/agent; tenant/entitlement/quota/audit controls. They can be combined. High concurrency, async and serverless are not a maturity ladder.

Essential algorithmic, SQL/isolation, limits/retries, security, accessibility, testing, observability and performance reasoning belongs in core explanations. CQRS/Event Sourcing/Saga/consensus/sharding, Kubernetes/Service Mesh and multi-region designs are optional comparisons or later extensions. DevOps and data cover what delivering and maintaining a product requires; specialist volumes may be considered later. Model training/fine-tuning/GPU/inference-engine operation and large data-platform administration are outside the v1 main line. This does not introduce an extension/plugin architecture or new website features.

**Accepted material stays scoped:** five reviewed Chinese originals now exist: opening, G01, F01, [P8.10's complete AI-assisted-development article](../book/drafts/zh/03-after-ai-finishes.md), with its separate [concept](reviews/P810A.md) and [manuscript review](reviews/P810M.md), and [P3.2's API-contract article](../book/drafts/zh/04-api-contract.md), accepted in [P32M](reviews/P32M.md). Both new articles remain reviewed sources without reader intake or publication. The local manifest admits opening/G01/F01, and all three are publicly readable in the [verified V2 reader release](reviews/v2-fragment-release-fix.md#verified-public-release). English manuscript bodies remain absent. F01's earlier accepted manuscript/intake reached remote main through PR #26. The opening adopts the accepted r3 with the Chinese pen name and a brief AI acknowledgment. G01 and F01 adopt their accepted voice copies. All three canonical revisions passed [local reader verification](reviews/existing-source-intake.md) and are included in the five originals. The [content contract](content-contract.md) and exact-revision reviews retain source identity and intake limits. Placement here does not accept expanded text, all 48 working units or publication. Every new prose batch still needs an assigned analysis gate and separate manuscript review.

## 5. Languages and content forms

- **Book:** Simplified Chinese and English. Review Chinese drafts first, then adapt the English in stages. Preserve technical meaning rather than matching every sentence literally.
- **Website:** English by default with Chinese access. Existing bilingual routes do not mean the complete book has two finished editions.
- **Project documentation:** English for project, engineering, collaboration, planning, analysis, handoff, review and template documents, including historical records. The single exception is the concise [Chinese stage summary](stage-summary.zh-CN.md). This documentation policy does not translate the Chinese manuscript or change Chinese UI resources.
- **Initial content contract:** [opening/G01](content-contract.md) established the first two Chinese inputs with IDs, slugs/order, reviewed hashes and missing-English navigation rules. Its additive local extension admitted the separately reviewed F01 source. The [verified V2 reader release](reviews/v2-fragment-release-fix.md#verified-public-release) includes all three sources. English chapter bodies do not exist; the English UI identifies Chinese availability without fabricated English chapter routes. The reviewed P8.10 and P3.2 sources have not entered the manifest. Broader full-book schema, later language-version notices and future counterparts remain **TBU**. Neither the original two-source public edition nor the three-source local reader is complete bilingual-book coverage.
- **Primary forms:** Markdown prose, original diagrams, necessary code, comparisons and reflection questions with analysis.
- **Later forms:** Milestone 3 plans one actual, versioned PDF or EPUB export from reviewed sources, validated before use, and small editable copy-only AI cards/context bundles where useful. M3 includes one reviewed Chinese listening chapter. Further narration, short videos, mocked interactive examples and offline reading depend on reader evidence. The roadmap owns their detailed gates; none is an existing capability implied by this list.

## 6. Reading product

The visual direction is restrained and macOS-inspired: clear hierarchy, light navigation chrome, quiet borders and generous space for prose, without simulating operating-system windows. Desktop layouts expose chapter groups and an in-page outline; mobile prioritizes the text and reveals navigation as needed. Styling must preserve legibility, keyboard access, focus feedback and narrow-screen usability.

The [UI04 design review](reviews/beta1-design-alignment.md) follows the historical [UI03 review](reviews/UI03.md) and retained [design handoff](design/reading-experience-v1.md). The dated handoff reported three Figma pages—Tokens, Components and Page Designs—four collections and 14 text styles. Its original 111 variables remain; 22 later Beta 2 palette design variables brought that recorded inventory to 133, while production mapping remains 111. The reviewed [Beta 1 target](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-388) separates available Chinese reviewed drafts from the eight-part planned map; English interface labels and English layout specimens do not imply English manuscripts. The design specifies System/Day/Night, current-reading-language search with an honest empty English corpus and deliberate Chinese-index recovery, plus real section links and copy/correction recovery. Optional question cards retain a card-free baseline and visible/editable context for copying, then manual pasting/review in the reader's own tool. Shared links and source versions must be real, not invented specimen metadata.

The professional language/layout re-review accepted the design for technical handoff: a 704px available-reading column, separate planned-map panel, auto-layout wrapping and narrow search/copy references. Mobile search uses an input rather than the desktop shortcut trigger. PRs #12–15 merged the reviewed theme, components, two-source Chinese reader and current-language search/section-link/correction flow; PR #16 closed public-document/license alignment. Their original design/runtime/review boundaries remain distinct. The [Milestone 1 record](delivery/milestone-1.md) owns the comparison and integration sequence; the [runtime guide](../site/DEVELOPMENT.md) owns actual behavior and limits. No verified deployed Pages reading URL or optional AI cards are established by those merges.

PandaCSS is user-selected. The original DS01 checkpoint remains frozen and unaccepted; the separately reviewed [new foundation](reviews/beta1-theme-foundation.md) merged selected reuse rather than accepting that entire tree. Park UI / Ark UI were optional recommendations, not evidence that a component suite was installed. Author visual judgment, runtime accessibility, integration and deployment remain separate evidence boundaries.

The [later-delivery concepts (legacy Beta 2)](https://www.figma.com/design/3GYIfJz8xSPGx3AE3RRkKi?node-id=129-475) and [three-background study](design/reading-palettes-spec.md) remain historical design-only references. Its [dated review](reviews/reading-palettes-design.md) is preserved, but Original / Mist Blue / Soft Grey are no longer the future implementation target. The [current V2 direction](roadmap.md#current-design-direction--milestone-2-refresh-2026-11-17) uses a separate Figma page, neutral light/dark surfaces, System preference and six independent accent choices. V2 needs independent review and author confirmation before a bounded code upgrade. No new palette, local-reading-state UI or V2 implementation is assigned by this vision; the board owns the hold. Existing first-delivery assets and accepted local F01 work stay intact. Optional AI experiments remain deferred.

Readers can use the accepted index/search, source heading links and correction drafts while writing proceeds. The [V2 reader is verified in production](reviews/v2-fragment-release-fix.md#verified-public-release). The V2 homepage is a separate follow-up. M2's planned essential reader includes the reviewed/author-confirmed V2 core and minimum local Continue, with explicit URL precedence, device-only disclosure and changed-target/storage recovery. M3 adds feedback-driven bookmarks/preferences/print, limited related-reading/reference aids and passage feedback. A few difficult diagrams may benefit from progressive disclosure, retaining a useful static/text explanation.

Delivery Milestones are separate from book editions and chapter publication. The [roadmap](roadmap.md#3-reading-product-releases-and-product-rationale) defines Milestone 1 basic reading, Milestone 2 Chinese core-draft completion with essential reading/measurement, Milestone 3 first-edition refinement/reviewed English batches and selected useful extensions, Milestone 4 author and reader discovery, professional guide production and life-volume writing, and Milestone 5 life-volume publication and stable EPUB. Historical Beta aliases remain traceable. The author authorized bounded initial publication on 2026-11-17, lifting the earlier deployment hold. The initial public release was verified at `8c29f4dfbab684eb7623600f304cdce197951bcc`: two reviewed Chinese drafts, zero English manuscript bodies, with maintained E2E/CI, manual Pages CD, actual public acceptance and same-source rebuild/redeploy evidence. The [canonical readiness record](delivery/milestone-1.md#6-release-readiness-remains-in-delivery-milestone-1) retains the unresolved moderate tooling advisory and unexercised distinct-version rollback/byte-identical restoration limits. Later UI revisions require their own review, integration and deployment evidence; they are not included in that public-release claim. The first public reading edition did not need to wait for the complete manuscript, optional AI cards or later pilots. Other career guides are later editorial extensions, not a requirement to build a platform.

## 7. Low-cost AI extensions and audio

Explore a small number of curated question cards with copyable context: a question, necessary assumptions, a short relevant passage, source links and content version. Placement and quantity should follow the chapter's needs, not a fixed quota.

Cards may ask for another example, a counterexample or a check of understanding. Show the exact content before copying; readers can edit it and paste it into their own tools. Do not send book text automatically or require third-party account authorization. Maintain and review cards with their chapters so old assumptions do not silently survive revisions.

The initial site does not host AI chat, store model keys, perform live inference or run autonomous agents. Readers' own tools may consume their own quotas; the project does not guarantee model output quality. Downloadable context Markdown and fillable design handoffs are later candidates. Model-based recommendations and personalized Q&A are outside the initial scope.

Audio is a separate exploration using pre-generated publication assets, not inference on every visit. It should help understanding and review: narrate explanations, normally skip raw code, give short descriptions of diagrams/tables, and omit Markdown punctuation and URLs. Generate and check audio before publishing; play existing assets on the website.

M3 delivers a single Chinese listening chapter with manually reviewed audio. M4 evaluates wider Volume I coverage and one captioned explanatory clip. M5 can reuse the workflow after Volume II chapters are reviewed. For the M3 sample, automatic incremental regeneration needs separate justification and is not a prerequisite. After material changes, update only the affected narration. Label older audio or withhold it until a matching version is available. Model, execution location, storage and automation choices follow a single-chapter listening trial; they remain undecided.

## 8. References and disclosures

The earlier positioning discussion used [The Engineering Handbook](https://github.com/handbook-academy/engineering-handbook) as a reference for organizing engineering knowledge, and [HowToLiveBetter](https://github.com/eternity4719/HowToLiveBetter) for accessible browsing, ongoing updates and public feedback. These are references, not claims of originality, partnership or endorsement. This editorial translation does not constitute a new audit of those projects.

Jason Zhang is the author. AI assists with structure, research organization, prose, examples, diagrams and editing. Distinguish documented behavior, experiments, experience, teaching assumptions and unverified ideas. Drafted, reviewed, merged and published are different states.

Explain principles independently. The owner selected [MIT for project code and original programming samples](../LICENSE) and [CC BY-SA 4.0 for original book prose and teaching diagrams](../LICENSE-CONTENT.md). Actual reuse still requires review of provenance, applicable terms, attribution and contribution scope; third-party rights are not cleared by the owner's selection. The [licensing/readiness notes](licensing-and-readiness.md) define scope and remaining checks; reference projects' licenses do not automatically apply here.

Do not invent users, traffic, company cases, productivity improvements or income. Professional visibility may follow from the work but is not a promised outcome. Recheck technology choices against the environment in which they will be used.

## 9. Responsibilities

| Area | Supplies or authors detail | Decision / acceptance |
| --- | --- | --- |
| Positioning, shared requirements, priorities and disclosures | Writer drafts assigned product documents; owners propose scoped changes | Author decides; Coordinator assigns and reviews |
| Detailed outline, manuscript, examples and question-card text | Writer | Coordinator reviews the actual deliverable; author is final authority |
| Website implementation, content loading, validation and operational instructions | Developer | Coordinator reviews evidence and limitations |
| Chapter status, cross-role consistency and integration | Owners report evidence; Coordinator maintains accepted status | Coordinator verifies; author is final authority |

Writer authors assigned revisions of this document and the roadmap; Coordinator reviews and integrates rather than ghostwriting the formal explanation. Current assignments/holds are recorded only in the [board](coordination.md); this content framework does not lift manuscript, translation or engineering holds. Later ownership changes must be explicit. `TBU` does not authorize unlimited research, installation, paid services or publication.
