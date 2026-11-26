# Vibe Coding, Then What? — v1 Content Framework

Updated: 2026-11-26. Owner: Writer. **The author has confirmed the v1 positioning, Junior–Senior audience and eight-part direction.** This is the current content framework, replacing the former three-part/45-chapter proposal as the organizing plan. Working reading-page names and splits remain editable; this framework is not individual chapter research, manuscript, website or publication acceptance.

Book/project: **Vibe Coding, Then What?** — **Understanding the Systems We Build, and Learning to Live with What We Can’t Fully Control**. Start from engineers who have built with AI and want to understand the systems behind their products. This branding entry preserves Junior–Senior Full-stack + AI Product Engineer coverage and the eight-part/48-adjustable-unit framework below; it is not a beginner-from-zero or complete-knowledge promise. The [editorial baseline](editorial-brief.md#author-confirmed-purpose-and-reading-experience) states the two connected themes of system understanding and useful AI collaboration amid wider uncertainty.

[Vision](../../docs/project-vision.md) · [Editorial baseline](editorial-brief.md) · [Writing gates](tasks.md) · [Current task/holds](../../docs/coordination.md)

<a id="revision-2026-11-26"></a>

## Reader-led revision · 26 November 2026

The author's whole-book feedback accepts the natural, literary voice and asks for stronger technical precision, explanatory depth and connections across product, design, frontend, backend, database/data, cloud and operations. The comparison edition is the [51-piece making-of manuscript](../revisions/zh/volume-one-making-of/README.md), with its 209-page A5. This is the current revision direction; subsequent source changes need their own reviewed edition. The earlier eight-part topic inventory below remains a coverage reference.

| Part | Explain well enough to reason about | Case and useful comparison | Explanatory evidence to draft | Bridge and revision action |
| --- | --- | --- | --- | --- |
| 1 · Page and system | HTML/DOM, CSS layout, JavaScript events, request/response and persisted state. Explain what seeing a success message can establish. | Follow checking a course time, then enrolment. Compare a page reload before and after a confirmed write. | Browser/service/database sequence, a small HTML/event/request example, and a table matching visible messages to evidence. | Keep the working registration scene; supplement browser fundamentals. End at the gap between the button's behaviour and the user's intention. |
| 2 · Product, design and frontend | Find the problem and audience; recruit beyond successful users; ask about recent behaviour; compare prototypes; explain semantic HTML, component state, tokens, focus, validation and stale requests. | Someone wants to check Saturday's time before deciding. Compare original booking/ticketing task flows, then two original prototypes. Follow the shared component into two applications. | Stakeholder/task map, two low-fidelity flows, observed-versus-assumed evidence, UI/API state table, short state/async code example. | Expand the existing discovery and component stories so each decision has an observable consequence. Lead to the API evidence needed before confirming success. |
| 3 · API and backend | HTTP methods/status, validation, authentication/authorization, tenant boundaries, timeout uncertainty, idempotency and pagination contracts. | Empty search versus failed search; a response lost after enrolment; a second organisation requesting the wrong file. Briefly compare a transfer whose receipt is missing. | Request/response examples, permission matrix and outcome table, stable operation identifier with its scope explained. | Preserve reviewed permission cases; add the contract and evidence needed to resolve uncertainty. Lead to database guarantees. |
| 4 · Database and data | Schema, keys/constraints, transactions, isolation/concurrency, indexes and query shape; event grain, denominators, late arrivals/cancellation and report corrections. | Two requests for the last place. A short original bank-transfer worked example shows an atomic invariant. Trace clicks, confirmations and valid enrolments in a small dataset. | ER diagram, before/after rows, two-request interleaving, SQL/transaction excerpt, event schema and a worked report with units and denominator. | Deepen existing races and reports. Explain what is guaranteed and under which conditions. End at the load these operations impose at peak time. |
| 5 · Async work and reliability | Arrival/service rates, queue backlog, bounded concurrency, retries/backoff, deduplication, cancellation, ordering and event delivery. | Peak enrolments and a batch of handouts; one task fails; an old phone resends after cancellation. Compare one command with independent completion subscribers. | Capacity calculation with units, task state machine, retry/cancellation timeline, queue/worker and event-subscriber map. | Reuse the delayed-phone case. Show how a durable task survives repetition, then ask what happens when its process disappears. |
| 6 · Cloud and delivery | DNS/TLS and ingress in the request path; compute versus durable storage; function/worker/container choices; secrets/permissions; CI/CD, compatible data changes, rollback and cost. | A laptop closes during conversion; two deployments coexist while old jobs remain queued. Compare short API work with a long resumable import. | Deployment map including object storage and queue, workload trade-off table, old/new compatibility table, release/rollback steps and an assumption-based cost example. | Expand the existing cloud chapters around actual decisions. End with a successful deployment whose user still cannot open the file. |
| 7 · Observability, on-call and recovery | Connect logs, metrics and traces to a user attempt; identifiers, sampling, useful alerts, mitigation, root-cause evidence, backup/restore and recovery objectives. | The user cannot open a file while a health check is green. Trace the attempt, restore service, then verify the user's file and roster. | Correlated log/trace excerpts, incident timeline, hypothesis/evidence table, restore checklist and data-loss/interruption calculation. | Keep reviewed recovery examples; make evidence and stop conditions legible. End by asking whether a healthy service also gives a correct AI answer. |
| 8 · AI and end-to-end delivery | Grounding/retrieval, context, streaming/cancel, tool authority, confirmation, evaluation, independent test evidence and measured product outcomes. | Implementation and tests share the same false “received means success” premise. Compare answers with equal scores but different permission consequences. Reuse the actual book-making workflow. | Retrieval/tool sequence, small evaluation set with expected evidence, permission table, A/B plan with stable eligible denominator and guardrails. | Expand the decision to retain/change/withdraw the product. Cross-reference Parts 2 and 4 for discovery and data. Close with the author's responsibility and life beyond the next tool. |

Each chapter needs a brief orientation, one question worth answering, a concrete case, the mechanism with its conditions, and an opportunity to reason about a different outcome. Vary how these appear on the page. Give basic explanations in the main text when they are needed to follow the story. Use a relevant snippet, worked numbers or diagram where prose alone leaves the reader guessing.

Keep the registration/handout thread where it carries cause and consequence. Use small original comparison cases where another familiar situation explains a mechanism better. Prefer task-based roles and portable situations; use personal names only when they help the story. Classical ideas can be explained with independently constructed examples, original diagrams and primary technical sources. Changing names alone does not establish originality. Reference IDs need a nearby explanation and a named figure/table or record source, including when a chapter is read independently.

Add a short whole-book orientation and a system map that readers can revisit as each part adds a responsibility. Expand the closing movement around information overload, choosing and reviewing AI assistance, stopping experiments, and ordinary rest/hobbies. Keep the author's fishing and paper-book preferences as personal experience. The life volume carries the longer social and everyday-life exploration.

Suggested calibration chapters are Part 2 discovery/prototyping and Part 4 transactions/data. They test different kinds of depth before scaling revision. These two samples are authorised in the current batch; the [board](../../docs/coordination.md) owns execution. Content and explanatory figure/table drafts precede final typography, illustration and PDF polish in M4. The report of blurry PDF text remains a symptom pending inspection of the actual file, font embedding and rendered/printed samples.

## Two-book series

The author has chosen a two-book frame. The proposed series name is **“AI，然后呢？”两部曲**. Volume one keeps its approved Chinese and English titles. The series label remains a working name. The confirmed companion titles are 《省下来的时间，去哪儿了？》 and *Where Does the Saved Time Go?*.

| Volume | Reader and question | Material |
| --- | --- | --- |
| 1 · 《用 AI 写代码：能跑，然后呢？》 | A Full-stack AI Engineer follows one feature from the first question to evidence after release. Did the reader actually get what they came for? | Follow one enrolment through interface, service, data and human acceptance. Put the media editing and test-review parallel where it helps the reader judge an outcome. Keep the imagined rereading of the first edition and the float on the water as the personal close. |
| 2 · 《省下来的时间，去哪儿了？》 | Readers encountering AI at home, at work or on the receiving end of a service. What becomes easier, who benefits, and how can a person judge what to try or keep doing for themselves? | Start with an ordinary letter. Follow quicker drafting into verification, access to services, changing jobs and choices about attention. See the [chapter plan and transfer map](volume-two-outline.md). |

Volume 1 leans toward work and Volume 2 toward life. Their seam is deliberately porous: the second book may retell the fishing moment or a line from the first closing, in enough detail for a new reader to feel it. The first follows a programmer learning to call it a day; the second picks up what happens with that free afternoon. The author story map locates personal material across both books. The shared product example is a missing enrolment. In volume one, the developer checks the record. In volume two, someone outside the system needs a useful answer. Each volume supplies enough context to read it first.

## Reading model and evidence boundaries

A “page” below is an independently readable teaching unit, not a printed page, finished Markdown file or URL. The 48 working labels organize the explanation; their count is not a target or limit. Do not create a new file for every label in this planning task. Chinese prose remains Chinese-first, with separately authorized English adaptation.

Junior, Mid and Senior readers share the same text: **essential mechanism → concrete engineering example → optional deeper trade-off**. Explain prerequisites briefly or link their main home. Junior does not mean no development experience; Senior does not require reading every specialist sidebar. There is no promise of a job level or compulsory integrated project.

The opening and G01 Chinese manuscripts retain their historical [W02 review](../../docs/reviews/W02.md) provenance and existing paths. The opening's subsequent book-name replacement was accepted separately as branding-only work in the [branding review](../../docs/reviews/vibe-coding-rebrand.md). G01 anchors P1.1 but does not pre-approve new success-criteria material. [F01A](analyses/F01.md) remains the accepted browser analysis supporting P1.2; the separate [F01M manuscript review](../../docs/reviews/F01M.md) accepted Chinese r3. Local manifest/route/search intake is implemented; the independent [chapter-intake review](../../docs/reviews/milestone-2-chapter-intake.md) owns its final acceptance decision. The local allowlist includes opening/G01/F01; [PR #26](https://github.com/HAIXIN-ZHANG/vibe-coding-then-what/pull/26) integrated the reviewed changes into remote main `5a0c2d8930962a4e80b9973669fee6d4df56aaad`. Public release remains separate; the last verified public edition still includes only opening/G01. Wider changes return to analysis review. No chapter slug or identity is renamed by a planning label.

The opening's later editorial alignment of its AI-assisted product entry, reader guidance and eight-part orientation is accepted at r2 in the [opening review](../../docs/reviews/beta1-opening-alignment.md). The [content contract](../../docs/content-contract.md) identifies the current approved source hash and rendering requirements; reader implementation and publication require their own gates. Source acceptance does not establish a working reader or publication. G01 and F01 analysis are unchanged.

**Core:** AI product architecture is required v1 reading, alongside product goals, frontend, APIs/data, reliability, delivery and operations. Using AI to develop is a separate delivery thread; neither substitutes for the other. Cases recur throughout instead of becoming a required capstone. Parts are navigable by question but dependencies remain visible.

## Part 1 — Product Goals and the Full-stack Architecture Map

Establish what success means and where code, data and trust live before choosing a pattern. Start with one useful product feature, not a complete cloud diagram.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P1.1 — What result are we promising the user?** | User task, success/failure/unknown outcomes, acceptance criteria, responsibility/state/time/dependencies and quality constraints; read structure/sequence/state diagrams. Existing G01 is the accepted foundation, not a complete new product brief. | A learner searches, enrolls and returns later to a saved record; distinguish UI success from stored facts and response loss. | Additional business success measures require fresh analysis; no invented conversion or productivity results. Link P4.3 for concurrency and P8.1 for AI suitability. |
| **P1.2 — Before the page appears, what is the browser doing?** | HTML/CSS/JS, DOM/style/layout/paint, resources, main thread/events, visible versus ready; preserve accepted F01A's seven-part causal explanation. | Course search: delayed stylesheet, behavior not installed and busy handling are different waits. | No new trace/benchmark or guaranteed paint after await; Worker/protocol/render strategies remain the accepted analysis's boundaries. [F01M r3 source accepted](../../docs/reviews/F01M.md); local intake implemented with its own review decision; Git integration completed through PR #26; public availability remains separately unverified. |
| **P1.3 — Which architecture decision are we actually making?** | Map presentation, module/deployment, communication, async processing, data, hosting, AI orchestration and tenant/control dimensions; locate browser/service/database/trust boundaries. | A course app can combine static public pages, a modular service and queued upload work without becoming microservices. | Overview locates choices, not full implementation. See the architecture map below and each mechanism's main page; no single “most advanced” architecture. |
| **P1.4 — Types passed. What still needs validation?** | Static types versus runtime/external data, component/API contracts, null/optional/error handling and basic algorithm/data-structure cost intuition needed for later examples. | A typed course response omits a field at runtime; validate at the boundary instead of treating a type annotation as a check. | Essential reasoning about work/data size, not type gymnastics or interview algorithms. Package/build mechanics live in P6.1; query costs in P4.2. |

## Part 2 — Frontend Design Systems and Product Interaction

Connect visible rules and behavior to the user's task, including AI interaction. Do not create a page per CSS/framework term.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P2.1 — What happens when real content meets the design?** | Hierarchy/type/spacing, box model, Flex/Grid, content-driven responsive layout, long/empty/multilingual content and useful motion. | The same course card with a long title, no image and narrow viewport. | Detailed animation engines and CSS catalogues deferred; show just enough layout mechanism to explain failures. |
| **P2.2 — Components exist. Why a Design System?** | Principles/shared language/foundations/patterns/library versus system, Figma/code relationship, documentation, ownership and maintenance cost. | Similar enrollment controls diverge across two product areas. | Atomic Design as an optional organizing lens, not mandatory levels or a tool migration. |
| **P2.3 — Why give the same blue different names?** | Primitive/semantic/optional component tokens, purpose/reference, themes/states/color combinations and CSS variables. | Add a second brand without unintentionally changing links, selection and destructive actions together. | No required extra token layer or provider-specific configuration; comparison must retain contrast and state meaning. |
| **P2.4 — What should a component promise?** | Props/events/behavior/state contracts, composition/variants/controlled behavior, primitive versus business responsibility, cohesion/coupling, Figma mapping, version/deprecation/migration and checks. | A Button accumulates conflicting flags; revise its contract and tell callers how to migrate. | SOLID/DRY/KISS/YAGNI explain concrete decisions, not acronym lists. Component-showcase/Code Connect tools are examples, not site scope. |
| **P2.5 — Who owns this state?** | Local/shared/URL/server/derived state, single source of truth, data flow and cache synchronization. | Search input, URL filters, result list and selected course disagree after navigation. | One representative framework window; no survey of every state library. Memory/context in P8.4 is a different responsibility. |
| **P2.6 — Can the user finish the form?** | Input/client-server validation, pending/unknown/error/recovery, focus/keyboard/names/contrast, native semantics/ARIA and optimistic-update conditions. | Enrollment by keyboard after a validation failure or uncertain response. | Accessibility is also applied across other pages. Business idempotency/authorization guarantees live in P5.3/P3.3; UI disabling alone cannot provide them. |
| **P2.7 — How should an interface behave while work is unfinished?** | Loading/empty/error, out-of-order/stale results, cancel/retry/poll/push feedback; AI streaming/partial answers, citations, stop/edit/confirm/recovery and user control. | Search A returns after search B; an AI course answer stops mid-sentence and the learner edits the request. | Main home for visible interaction behavior. P8.3 supplies model-stream/cancel/recovery contract; do not promise cancel reverses server/tool effects. |
| **P2.8 — Where is the page made, and why is it slow?** | CSR/SSR/static/hydration, BFF purpose, server/client boundaries, resource/list/image/execution costs and observable responsiveness. | Public course detail versus an authenticated dashboard; a large list handles input slowly. | Framework choice follows discovery/update/interaction/hosting needs. Advanced scheduling is optional; main-thread foundations remain P1.2 and diagnosis P7.2. |

## Part 3 — APIs, Backend Boundaries and External Integration

Follow one request and define its agreements before dividing services.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P3.1 — Where does one request travel?** | Essential HTTP/request-response/status, DNS/TLS/proxy/routing/service/data path; timeouts and failure location; HTTP/webhook/poll/SSE/WebSocket roles. | Trace a course-search request from browser entry to response and compare notification delivery needs. | Protocol internals optional. Detailed cloud networking belongs P6.3; connection choice is not a universal live-update upgrade ladder. |
| **P3.2 — What exactly does the API promise?** | Input/output/runtime validation, expected errors, pagination/cursors, compatibility/versioning, request identity and meaningful success; REST/RPC/GraphQL trade-offs. | A filtered result list changes between pages; the UI receives a structured refusal instead of an untyped error string. | Contract descriptions/checks, not a full API-framework guide; tests P6.4 and model-output contract P8.2. |
| **P3.3 — Who may read or change this resource?** | Authentication versus authorization, sessions/tokens, ownership/roles/tenant context, entitlements, usage/audit boundaries and relevant XSS/CSRF concerns. | Two organizations share the course product but cannot read each other's uploads; paid access differs from login. | Basic tenant/data-access reasoning is core; advanced isolation topologies optional. AI retrieval/tool permissions extend this in P8.5/P8.7, not replace it. |
| **P3.4 — Where should business rules live?** | Layers, modular monolith, Ports and Adapters, dependency direction, information hiding, transaction/business boundaries and triggers/costs for service splits. | Separate enrollment rules from email delivery and a replaceable storage adapter in one application. | DDD as a boundary vocabulary; microservices/CQRS/Event Sourcing optional comparisons, not inevitable evolution. |
| **P3.5 — What should catch this error, and what must still be cleaned up?** | Expected versus unexpected failure, try/catch/rethrow/translation, async rejection, cancellation, finally/resource cleanup and safe error context. | A fetch receives HTTP 404 without a network rejection; a failed upload must release resources without exposing private details. | Language-specific examples kept small; no blanket catch-and-ignore or retry-everything. Retry policy P5.3, operational evidence P7.1. |
| **P3.6 — What happens at the boundary with another service?** | Files/object storage, upload/download access, external APIs, credentials, webhook verification/replay/duplicates, adapter contracts and failure handling. | Upload course material then receive an external processing callback twice. | Concrete provider-neutral flow, not payment/storage-provider adoption. Durable dedup P5.3 and processing state P5.4; no new external service in this project. |

## Part 4 — Databases, Search and Product Data Flow

Make stored facts trustworthy and retrievable. Analytics coverage serves product decisions and maintenance, not a specialist data-platform course.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P4.1 — What facts do we store, and in what shape?** | Entities/relations/keys/constraints, normalization/redundancy, relational/document trade-offs, ORM mappings/query boundaries, source versus derived data. | Model users/courses/enrollments/documents; distinguish a unique constraint from an ORM convenience method. | ORM is a mechanism window, not library selection. Object storage P3.6 and deployment migrations P6.5. |
| **P4.2 — The query returns rows. Are they right and affordable?** | Basic SQL JOIN/NULL/aggregation/grain/duplicates, indexes/execution plans, pagination/N+1, connection pools and work/data-size costs. Bind data values; keep query structure application-controlled, allowlisting selectable identifiers/sort directions. | A course list makes one extra query per card; a report doubles counts after a join. Search text is bound; `sort=newest` maps to fixed `created_at DESC`, rejecting unapproved choices. | ORM alone guarantees neither injection safety nor authorization; P3.3 owns access rules. Essential algorithmic intuition and plan reading are core; CTE/windows optional when needed, engine internals deferred. |
| **P4.3 — Who gets the last place?** | ACID, transaction boundaries/isolation basics, locks/optimistic concurrency, constraints, lost updates and interleaving. | Two enrollment requests race for one remaining place; compare protected invariants. | Necessary isolation anomalies belong in core, not only Senior notes. Consensus/sharding/advanced distributed protocols are optional/deferred; retries P5.3. |
| **P4.4 — What does the cache save, and what can become stale?** | Browser/CDN/application cache, keys/tenant scope/TTL/invalidation, freshness, hot spots, failure and consistency cost. | Rename a course or revoke access while an old result remains cached. | Main home for ordinary cache correctness; AI semantic/prompt cache quality and authorization conditions extend it in P8.9. |
| **P4.5 — What makes a result relevant and allowed?** | Keyword/inverted-index versus vector similarity intuition, embeddings as derived representations, filtering/ranking/index freshness and authorized query scope. | Exact course code should match reliably while a paraphrased learning goal benefits from similarity search. | Search foundations here; hybrid/reranking as a bridge, with full ingestion-to-grounded-answer RAG in P8.5. No vector database requirement or retrieval-quality guarantee. |
| **P4.6 — Where did this product metric come from?** | OLTP versus analytics, business tracking/events/CDC, batch/stream/ETL/ELT, collection/transformation/scheduling, metric definition/grain/lineage/freshness, late/duplicate/deleted data and rerun/backfill. | Two course-completion reports disagree after late events and a corrected enrollment. | Core data-flow/metric reasoning; warehouses/lakes/lakehouses and dbt/Airflow/DataFrame are optional comparisons. Spark/platform administration and ML training are outside v1's main line. |

## Part 5 — Asynchronous Work, Traffic and Reliability

Separate capacity from correctness and from when work finishes. High concurrency, async and serverless can coexist; none is the next mandatory step after another.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P5.1 — How slow is it, and how much can it handle?** | Latency/throughput/concurrency, percentiles/load patterns, resource bottlenecks/pools, capacity estimates versus measurements and scaling. | Enrollment opens at one time; fast average latency hides a slow tail under load. | Illustrative numbers must be labelled, measured claims tested. No performance result inferred from user count; load test role P6.4. |
| **P5.2 — Who gets capacity when demand grows?** | Rate limits, quotas/entitlements, admission control, backpressure, queue bounds and overload feedback; client debounce reduces requests but is not server protection. | One tenant consumes the report queue; debouncing a search field does not stop direct API traffic. | Main policy home for limits and quota accounting. AI token/concurrency budgets apply it in P8.9; billing-platform implementation deferred. |
| **P5.3 — Can this failure safely be tried again?** | Timeouts/deadlines/cancellation, unknown outcomes, retries/backoff/jitter/budgets, idempotency/deduplication, circuit breaker/fallback and cleanup. | Enrollment writes succeed but the response is lost; a slow provider is retried by several callers at once. | Explain retry/cancel limits, not exactly-once slogans or global rollback. Cross-service compensation introduced in P5.5; data restore P7.4. |
| **P5.4 — Who keeps working after the page closes?** | Request execution versus worker/task lifecycle, accepted versus complete, durable state/status queries/poll/push, checkpoints/progress/ownership and user cancellation semantics. | A course upload begins processing; user leaves and returns while a worker has restarted. | Logical web–queue–worker flow can use different hosting. Long AI tasks reuse it in P8.6 rather than invent an entirely separate task system. |
| **P5.5 — Queue, event or subscription: who receives what?** | Commands/events, competing consumers/pub-sub/event streams, Service Bus as one broker example, ack/order/delivery/retention/dead-letter/replay, consumer checkpoints and Outbox failure windows. | Upload completion triggers indexing and notifications; duplicate delivery and a DB/message dual-write failure need explicit recovery. | Basic delivery/consistency is core; Saga compensation, CQRS/Event Sourcing and sophisticated replay become optional worked comparisons. No broker or Azure service is selected for the project. |

## Part 6 — Cloud Runtime, Testing and Delivery

Cover the operations needed to deliver and maintain this product, not every cloud or DevOps specialty.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P6.1 — It runs locally. What must exist in the environment?** | Process/ports/files/exit/resources, dependency versions/lockfiles/artifacts, environment/config/secrets, container images/network/volumes and health. | API starts locally but the deployed worker lacks a secret or writes to an ephemeral path. | A few explained shell/curl/log checks; no Linux command catalogue. Types P1.4, cloud identity P6.3. |
| **P6.2 — What should run this workload?** | Managed service, persistent service/container and Functions/Lambda; lifecycle/state/concurrency/time limits, scaling/cost/operational responsibility. | Compare hosting for a short API call and long document-processing task. | Conditions rather than provider checklists. Kubernetes/Service Mesh/multi-region operation are optional depth or later specialist material; no platform migration. |
| **P6.3 — How does traffic enter, and what may the workload access?** | DNS/TLS/CDN/proxy, public/private network/subnet/ingress/egress, IAM/workload identity, secrets and health probes. | Browser can reach the public API while only its worker can access a private document store. | Enough topology and trust reasoning to diagnose; not full cloud-network certification. Request semantics P3.1, tenant policy P3.3. |
| **P6.4 — What evidence says this change works?** | Unit/integration/contract/E2E/smoke/load purpose, boundaries/test data, deterministic versus external dependencies, accessibility and failure paths. | Test enrollment rule, DB constraint, API pagination and browser recovery separately, then smoke-check a release. | No universal test-count/coverage claim. AI task-quality evals in P8.8 supplement these checks rather than replace them. |
| **P6.5 — How does a change reach users safely?** | Git/PR/review/CI/CD/artifacts/environments, secret/config changes, DB migration/compatibility, feature flags, gradual release, rollback versus roll-forward and verification; IaC/drift basics. | Ship an optional API field and compatible DB change before exposing a new enrollment UI. | Simple controlled release first; complex orchestration/IaC estates optional. Operational mitigation P7.3; backups/restoration P7.4 are different from code rollback. |

## Part 7 — Observability, Debugging and Recovery

Follow evidence from the user's symptom to the responsible boundary, then verify recovery.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P7.1 — Which evidence connects these events?** | Structured logs/metrics/traces, correlation IDs/context propagation, sampling, redaction/access/retention, cardinality and collection cost. | One upload request, queued task and downstream call need a usable chain without logging the private document. | OpenTelemetry as a conceptual instrumentation window, not a required provider or full collector course. Model prompts/output need separate privacy/quality handling P8.7/P8.8. |
| **P7.2 — The user sees a failure. Where do we look next?** | Browser error/RUM/source maps/release version; DevTools→API→logs/trace→DB hypothesis checks; distinguish symptoms, timing and root-cause evidence. | A fictitious course search shows a slow UI: use an original Datadog RUM/APM-shaped correlation example to follow request to DB, alongside generic evidence. | Datadog is one teaching window, not a product manual, installed integration, paid-service choice or actual incident. Sampling/CORS/instrumentation limits must be stated; no invented screenshot or result. |
| **P7.3 — What should we do while it is broken?** | User-impact SLI/SLO, actionable alerts, dependency degradation, incident triage/mitigation/runbook/verification and learning from failure. | Document processing backlog grows; stop new work, provide honest status, recover and check user-visible progress. | Simple useful targets first; no enterprise incident platform. AI answer quality is separately evaluated P8.8; healthy latency does not prove correct answers. |
| **P7.4 — Can we restore the data we promised to keep?** | Backup versus successful restore, RPO/RTO objectives, restore/recovery exercise, consistency/access checks and post-recovery verification. | Restore accidentally deleted enrollment/document metadata, then reconcile derived search indexes. | Not equivalent to retry/restart/code rollback. Multi-region disaster platforms optional; no claimed recovery times without tests. |

## Part 8 — AI Product Architecture and AI-assisted Delivery

All ten page topics form v1's required AI coverage. Advanced branches within them remain skippable. This is a product architecture thread plus a distinct development-collaboration thread, not an optional AI-tools appendix.

| Working page / main question | Necessary explanation | Original teaching example | Optional depth / boundary |
| --- | --- | --- | --- |
| **P8.1 — Does this task need AI?** | User need/success criteria, rules versus ordinary search/model/hybrid, uncertainty, review burden and failure tolerance. | Exact course prerequisites use rules; fuzzy document questions may need retrieval/model support. | No default agent or “AI everywhere.” Links P1.1/P4.5; no promised quality or conversion gain. |
| **P8.2 — What can the model response safely become?** | Input boundary/model request, structured output/runtime validation, refusal/timeout/provider errors, semantic checks and safe fallback states. | Model returns a course classification with valid JSON but an invalid course identifier, or refuses a request. | Provider-neutral contract before a small verified SDK window; format validation is not factual correctness or authorization. Uses P1.4/P3.2/P3.5. |
| **P8.3 — How does the user stay in control?** | Streaming transport/partial/terminal states, stop versus cancellation of remote work, edit/retry/confirm/recover, citations/provenance and consequential-action confirmation. | Learner stops a partial answer, revises the question, then confirms a proposed enrollment action separately. | Owns end-to-end stream/control contract; P2.7 owns visual/focus/accessibility patterns. No cancel-as-undo guarantee; tool/task state P5.4/P8.6. |
| **P8.4 — What should the model know, remember or forget?** | Prompt/context engineering, token budgets, session transcript versus business state versus persistent memory, selection/retrieval/summarization, permissions and lifecycle. | A long tutoring session needs the current course and authorized sources, not every prior message or an invented durable enrollment fact. | Compaction/retrieval trade-offs core intuition; elaborate memory systems optional. Model context is not the authoritative business database. |
| **P8.5 — How does a document become an authorized, grounded answer?** | Ingestion/parse/chunk/embed/index, keyword/vector/hybrid/rerank retrieval, user/tenant filtering, update/delete/version/citations and retrieval-versus-generation failure. | Upload, replace and later delete a private course guide; a different tenant must not retrieve old fragments or citations. | Main RAG lifecycle home; P4.5 supplies search primitives and P4.6 incremental-data reasoning. No RAG correctness guarantee, vector-store requirement or full data-platform lesson. |
| **P8.6 — Who chooses and executes the next step?** | Structured generation/workflow/tool calling/agent loop, parameters/state/long tasks, budgets/stopping/checkpoints/human review and execution ownership. | Read-only course lookup needs one call; a multi-step document report uses a bounded workflow; compare a tool-selecting agent only when justified. | Multi-agent coordination is optional, not default; tasks/queues/retry reuse P5.3–P5.5. Historical pattern articles do not establish current SDK APIs. |
| **P8.7 — What is the AI allowed to read or do?** | Prompt injection/untrusted documents, tool argument/runtime/business validation, least privilege/tenant isolation, confirmation/sandbox/audit, secrets and output exposure; MCP interface versus authorization. | A retrieved file asks the model to export another tenant's data; the executor rejects it regardless of model wording. | Core trust boundaries first; detailed OAuth/MCP-version mechanics researched per chapter, not assumed from a protocol name or a prompt instruction. |
| **P8.8 — How do we know an AI change is better?** | Task success metrics, evaluation dataset/provenance, normal/edge/adversarial cases, failure taxonomy, deterministic checks/human calibration/model grading, regression and feedback loops. | Correct citation with unsupported answer, missed relevant paragraph, prohibited tool call and good answer with slow delivery are distinct failures. | Main task-quality/evals home; operational signals P7.1–P7.3 and software tests P6.4 remain necessary. No single model score proves product reliability. |
| **P8.9 — Which model and operating budget fit this feature?** | Quality/latency/cost trade-offs, model selection, context/output budgets, concurrency/rate/quota, cache scope, fallback, prompt/model/version changes and controlled rollout. | Compare smaller/faster versus more capable models for classification and grounded answers; isolate per-tenant budget and cache access. | Reuses capacity/limits/cache/release mechanisms P5.1/P5.2/P4.4/P6.5; teaches AI-specific judgment, not current price/ranking tables or inference-engine operation. |
| **P8.10 — How do we deliver this with coding AI?** | Requirement/acceptance decomposition, relevant context/Markdown/contracts, tool boundaries, skills for repeated methods, diff review/tests/release verification and handoff. | Add one enrollment-status improvement: agree unknown outcomes, inspect the actual diff, verify behavior and turn repeated review steps into a bounded skill. | Separate from adding model capability to the product. No full chat dump, unnecessary multi-agent hierarchy, compulsory project or unsupported productivity claim. |

## Architecture map: choices on different axes

Use this original classification as a teaching map at P1.3 and revisit the relevant axis in context. It is not an exhaustive pattern standard, ranking or one-prescription-per-product catalogue.

| Decision axis | Combinable choices | Main explanation |
| --- | --- | --- |
| Presentation/composition | CSR, SSR, static generation and BFF | P1.2/P2.8; BFF adapter boundaries P3.4 |
| Code and deployment boundaries | Layers, modular monolith, Ports and Adapters, selectively independent services | P3.4 |
| Communication | HTTP API, webhook, polling, SSE, WebSocket | P3.1/P3.6, visible behavior P2.7 |
| Background coordination | Web–queue–worker, event-driven consumers and task state | P5.4/P5.5 |
| Data responsibility | Database, cache, object storage, keyword/vector search and derived analytics | P4.1–P4.6/P3.6 |
| Hosting | Managed service/runtime, containers/persistent services, Functions/Lambda | P6.1–P6.3 |
| AI decision/execution | Structured generation, RAG, predefined workflow, tool-selecting agent | P8.1–P8.7 |
| Product control | Tenants, entitlements, usage quotas and audit | P3.3/P5.2/P7.1/P8.7/P8.9 |

A layered modular application may expose HTTP, process queued work in a managed runtime, use a DB plus search index and add RAG. High concurrency, async and serverless answer different questions. Introduce more machinery only after identifying the changed condition, guarantee and cost; 2026 popularity is not a sufficient reason.

## Cross-part homes and linked cases

| Shared subject | Main home | What other pages add without repeating it |
| --- | --- | --- |
| Goals and acceptance | P1.1 | P8.1 AI suitability; P8.8 output-quality criteria, not new product requirements from the model |
| AI interaction | P2.7 for interface state/focus/control | P8.3 stream/terminal/remote-action contract; P5.4 durable task lifecycle |
| Search, retrieval and data | P4.5 search primitives; P4.6 product-data flow | P8.5 full RAG ingestion/permission/update/delete/citation chain, referencing rather than retelling SQL and indexing |
| Software correctness versus quality/health | P6.4 software tests; P7.1–P7.3 operational evidence | P8.8 task-quality evals; combine them rather than call one a replacement |
| Capacity, quotas, performance and cost | P5.1/P5.2/P4.4 | P2.8 browser cost; P8.9 AI-specific model/token/cache economics; P7.1 telemetry cost |
| Errors and recovery | P3.5 error boundaries; P5.3 retry safety | P7.3 incident mitigation/P7.4 data restore; P8.2/P8.3 model/stream outcomes |
| Trust, security and accessibility | P3.3/P8.7 trust; P2.6 accessibility foundations | Enforce throughout components, queries/cache, data/telemetry, tests and tool execution; not an end checklist |

Recurring original cases connect the parts: themes/components (P2), authorized search (P2/P3/P4/P7), upload/processing (P3/P5/P6/P7/P8.5), last-place enrollment (P1/P4/P5/P6), trustworthy learning reports (P4.6/P7), AI course assistance (P2.7/P8) and coding-AI delivery (P8.10 with tests/release references). Each begins with a simple assumed design and changes one condition. They are explanations, not compulsory implementation exercises or real employer incidents. Datadog is one evidence-navigation example, not a newly required service.

## Depth and scope limits

Core mechanisms include relevant algorithmic work/cost intuition, basic SQL/isolation/constraints, async ordering, limits, retries, access control, tests and recovery reasoning. Every page carries its own optional boundary; readers must not need an advanced sidebar to understand the essential guarantee.

CQRS/Event Sourcing/Saga/consensus/sharding, Kubernetes/Service Mesh and multi-region designs are skippable comparisons or later extensions, not independent required v1 courses. Model training/fine-tuning/GPU/inference engines and large data-platform administration are outside the main line. Dedicated DevOps/data volumes can be discussed later without inventing a plugin architecture, extension system or site features now.

Representative React/Vue/Angular, backend frameworks, SQL/ORMs, message/cloud providers and AI SDKs may illustrate a meaningful difference after the principle. No provider/library, paid service or book-wide technology stack is selected by this map. Concrete versions/guarantees remain chapter research. Security, accessibility, testing, observability and performance recur in the examples themselves.

## Legacy proposal mapping — all 45 entries retained for traceability

This table supersedes the old proposal's organization, not its historical record in Git/[W01 handoff](../../docs/handoffs/writer/W01.md). No old ID becomes a URL or an accepted new manuscript. “Merged” below means editorial coverage combined into a planning home, not Git integration or review acceptance.

| Legacy proposal | New main home | Disposition and scope boundary |
| --- | --- | --- |
| G01 | P1.1 | Existing accepted source retained byte-for-byte; any added goal/acceptance material needs review |
| F01 | P1.2 | Accepted analysis scope retained; F01M r3 manuscript source separately accepted; local intake implemented with separate review, Git integration completed through PR #26, public release separately unverified; no acceptance of other pages |
| F02 | P2.1 | Real-content/layout scope retained |
| F03 | P2.2 | Design System scope retained |
| F04 | P2.3 | Token/theme scope retained; still no sample prose |
| F05 | P2.4 | Contract/composition with governance/version connections |
| F06 | P2.5 | State-ownership scope retained |
| F07 | P2.6 | Form/accessibility combined, retry guarantee linked P5.3 |
| F08 | P2.7 | Async interface scope, extended by new AI controls subject to chapter analysis |
| F09 | P2.6 | Accessibility foundations merged; applied across all cases |
| F10 | P2.8 | Rendering/performance scope, BFF mapped as separate composition choice |
| F11 | P1.4/P6.1 | Split types/runtime validation from dependencies/build environment |
| F12 | P2.4/P6.4 | Design/code/version/governance plus test strategy, not a separate duplicated tool chapter |
| B01 | P3.1/P6.3 | Request semantics and hosting-network topology separated |
| B02 | P3.2 | API agreement/compatibility retained |
| B03 | P3.3 | Trust/tenant scope retained; AI extension P8.7 |
| B04 | P3.4 | Modules/architecture retained; CQRS/Event Sourcing optional |
| B05 | P4.1/P3.6 | Business model versus file/storage integration separated |
| B06 | P4.2 | SQL/cost retained; analytic grain example linked P4.6 |
| B07 | P4.3 | Transaction/isolation basics remain core, advanced distribution optional |
| B08 | P4.4 | Cache/freshness retained; AI-specific economics P8.9 |
| B09 | P5.1/P5.2 | Split performance/capacity from admission/quotas/backpressure |
| B10 | P5.4 | Task lifecycle retained, long AI work reuses it |
| B11 | P5.5 | Queue/event/subscription retained |
| B12 | P5.3/P5.5 | Retry/idempotency versus message/Outbox windows; Saga optional |
| B13 | P6.2 | Serverless moved to hosting comparison, not an async upgrade |
| B14 | P6.1 | Runtime/debug fundamentals retained |
| B15 | P6.3 | Network/identity retained |
| B16 | P6.1/P6.2 | Containers/hosting combined; Kubernetes/Service Mesh optional/later |
| B17 | P6.5 | Delivery/migrations/IaC basics retained; testing home P6.4 |
| B18 | P7.1–P7.4 | Split signals, evidence navigation, incident mitigation and restore |
| B19 | P4.6 | Product analytics/data-flow core retained, platform detail optional |
| B20 | P4.6 | Incremental/late/rerun/backfill merged into one product-data narrative |
| B21 | P4.6 | Warehouse/lake/tool detail optional; distributed-platform operation later |
| B22 | P4.6 | Metric definitions/quality/lifecycle retained |
| B23 | P8.1/P8.2/P8.3/P8.9 | AI suitability/contract/interaction/operating trade-offs separated |
| B24 | P4.5/P8.5 | Search primitives versus complete authorized RAG lifecycle |
| B25 | P8.4/P8.6/P8.7/P8.8 | Context/state, execution, security and evaluation separated; multi-agent optional |
| C01 | P2.2–P2.4 | Theme case embedded across principles/contracts/migration |
| C02 | P2.5/P2.7/P3.2/P3.3/P4.2/P4.4/P7.2 | Authorized-search case links homes; no second full definitions chapter |
| C03 | P3.6/P5.3–P5.5/P6/P7/P8.5 | Upload case carried through storage, work, delivery, recovery and indexing |
| C04 | P1.1/P4.3/P5.1–P5.3/P7.3 | Enrollment case retains correctness/capacity distinction |
| C05 | P4.6/P7.1/P7.4 | Learning-report case, quality evidence and source/derived recovery |
| C06 | P2.7/P8.1–P8.9 | AI product case becomes required cross-part material, not a lone optional finale |
| C07 | P8.10/P6.4/P6.5 | Coding-AI delivery remains distinct with verification/release links |

## Planning-source checks, not chapter research approval

Access date: **2026-11-15**. Read only the body sections identified below, not complete books, linked documentation trees or all vendor guidance. These readings check the organization/boundaries; they do not verify every future chapter mechanism or choose a provider. The eight-part structure and original cases are this project's editorial design, not copied source expression, code or diagrams.

| Source and sections actually read | Limited use in this plan |
| --- | --- |
| [Azure architecture styles](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/): introduction/quick tour, N-tier/Web-Queue-Worker/Microservices; [Web-Queue-Worker](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/web-queue-worker): components/when to use | Distinguish code/deployment/processing choices and explain request/worker separation; not Azure adoption or exhaustive style coverage |
| [Azure AI architecture pattern](https://learn.microsoft.com/en-us/azure/well-architected/ai/architecture-pattern): high-level architecture/workload composition | Separate pretrained-model application engineering from optional training/fine-tuning; broader vendor pattern is not all v1 required scope |
| [Secure multitenant RAG](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/secure-multitenant-rag): introduction, Identity, tenant/authorization requirements and Data filtering | Place identity/permissions through retrieval, not only in the chat UI; no copied topology or healthcare case |
| [Anthropic Building effective agents](https://www.anthropic.com/research/building-effective-agents): dated introduction, What are agents? and tooling-history notice | 2024 workflow/agent distinction as a design vocabulary; its own notice says tooling has changed, so it is not current SDK/API instruction |
| [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): context/prompt definitions and retrieval/agentic-search discussion (redirects to the research page) | Context selection/lifecycle deserves its own explanation; not a claim more context, memory or autonomy is always better |
| [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices): evaluation types/reading, anti-patterns, Design your eval process, Identify where you need evals and platform-transition notice | Separate task objectives/data/metrics/regression/human judgment from uptime. Use conceptual guidance, not the platform as a selected dependency; no vendor example thresholds or API adoption |
| [MCP security best practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices): Purpose and Scope, Token Passthrough/Risks (redirected versioned tutorial) | Protocol use does not replace credential/audience/access controls. A moving latest link is not a pinned project protocol version |
| [OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/): signal definition and supported signals overview | Separate operational outputs/traces/metrics/logs from AI answer-quality judgment; no SDK/collector selection |
| [Datadog Connect RUM and Traces](https://docs.datadoghq.com/tracing/other_telemetry/rum/): Overview, Prerequisites and Setup RUM introduction | One correlation teaching window needs instrumentation/configuration and may incur charges; no install/account/screenshot/service use authorized |
| [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch): introduction and Checking response status | Error-boundary example separates HTTP response status from rejected network promise; detailed cleanup/cancel behavior remains chapter research |
| [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html): Introduction, SQL Injection in ORM Query Languages, Parameterized Queries and Allow-List Input Validation; read for r2 | Separating bound values from fixed/allowlisted query structure belongs in P4.2 core; ORM use does not itself guarantee safety. No copied code or whole-security-guide audit |

## Review and next gate

Review this framework for coverage, depth, independent reading and cross-part continuity. Names/splits can change after reader/editorial feedback; there is no fixed physical length. A future page starts only with a concrete assignment and accepted analysis scope, then separate manuscript review. Content/publication routing follows its own contract. This planning update does not lift product, prose, translation, UI, schema, E2E or deployment holds.
