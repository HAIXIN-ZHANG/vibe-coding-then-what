# Vibe Coding, Then What? — agent entry

> **Transition notice · 28 November 2026. Read this first.**
>
> The project's direction, titles and roles changed on 27–28 November ([decision records PDR-005 to PDR-009](docs/decisions/README.md)), and the [roadmap](docs/roadmap.md) and [PRD](docs/product/volume-one-public-edition.md) were rewritten. Roles are now PM, Designer, Delivery Lead, Writer, Developer and an audience panel. They are bound to Codex and Claude by the [team file](docs/team.md), with cards in [`docs/roles/`](docs/roles/).
>
> The rest of this file still describes the earlier four-role process. It is replaced when [T-004](docs/tasks/T-004-two-desk-structure.md) lands. Until then, where this file conflicts with the team file, the role cards, the task queue or a decision record, those newer sources win. The next work is listed in the [task queue](docs/tasks/README.md); start with T-002 and T-004.

Vibe Coding, Then What? is the engineering volume of the [two-book series](book/planning/outline.md#two-book-series) and the current focus of the reading website. Consult [README](README.md), [project vision](docs/project-vision.md) and [roadmap](docs/roadmap.md) when the assigned task needs product context; they are not mandatory startup reading or execution authorization.

The human author is the final authority. Work only on a concrete user/Coordinator assignment; roadmaps, historical prompts and document updates do not authorize execution. Preserve user and other owners' changes. Flag scope/ownership conflicts to Coordinator.

Use **Product Goals** for reader needs/outcomes (formerly Stages) and **Delivery Milestones** for concrete design, implementation and verification scope (formerly Betas). Their numbering is not a one-to-one completion rule. Preserve legacy labels/filenames in dated evidence; use the current terms in new assignments and current-facing explanations.

## Start or recover the project team

In a new Codex chat opened at this repository, the author can use this one-line startup request:

> 启动或恢复本项目的四角色团队。当前对话担任 Coordinator，请复用已有项目对话，创建缺少的角色对话，按看板开始已授权任务，到产品检查点通知产品与设计对话验收。

For this request, follow [team startup](docs/collaboration.md#team-startup) once. Count the current Coordinator among the four. A role-specific task, review request or ordinary repo read follows its own scope.

## Start here

1. Use the caller's explicitly assigned role: [Delivery Lead (Coordinator/Reviewer)](docs/coordinator-role.md), [Writer](docs/writer-sync-prompt.md), [Developer](docs/developer-sync-prompt.md) or [Product & Design Lead · Reader Experience](docs/product-design-role.md). Do not infer it from the checkout or previous chat.
2. Read the [board](docs/coordination.md) for current assignments, holds and workspaces, then the linked task brief and necessary inputs. History and archives are optional evidence, not startup prerequisites.
3. Verify actual directory, branch, HEAD, working status and relation to the assigned main baseline before editing. Report role/task, actual workspace/revision, next scoped action and conflicts once; continue clear authorized work directly. This is not another approval gate. Missing assignment or an applicable hold means no invented work.

Keep the author's main checkout clean and readable. Perform assigned edits in the role's separate branch/worktree; [Collaboration](docs/collaboration.md#workspace-and-main-checkout) defines recovery and main-update ownership.

AGENTS is the shared entry; the caller/tool must supply access and context. These documents do not guarantee automatic loading by every tool.

## Four roles and boundaries

- **Product & Design Lead · Reader Experience:** product direction, design and reader-experience acceptance at the [product checkpoints](docs/delivery/milestone-2.md#product-desk-checkpoints).
- **Delivery Lead (Coordinator/Reviewer):** architecture/contracts, assignments, actual review, feedback, shared status and Git integration. Does not substitute product implementation, chapter prose or executor implementation explanations.
- **Writer:** assigned research, outlines, manuscripts, examples and teaching diagrams; analysis and manuscript have separate gates.
- **Developer:** assigned website/tooling and technical/process explanations, with actual checks and limits.

[Collaboration](docs/collaboration.md) is the sole detailed ownership/workflow authority. Coordinator owns engineering review; Product & Design Lead · Reader Experience owns the reader verdict. Findings return to the original owner; changed revisions require affected re-review. Maintain one [task brief/handoff](docs/handoffs/TEMPLATE.md) per stage and a separate [Coordinator review](docs/reviews/TEMPLATE.md).

## Authorization and evidence

Coordinator manages Git writes/integration; executors do not self-approve, stage, commit, push or merge. Installation, external calls, access changes, expanded scope and publication need applicable user authorization. Respect existing authorization without inventing routine approval gates. Never weaken protection/checks to merge. Review acceptance, CI, merge and deployment are separate facts; see [access policy](docs/security/access-policy.md) and [SECURITY](SECURITY.md).

Answer in the user's language. Formal technical/product/process explanations and active code/design comments are English-first; the bilingual book retains Chinese-first manuscript review. Distinguish documented behavior, actual experiments, experience, assumptions and recommendations. Verify volatile claims with primary sources when authorized; do not invent sources, measurements or experience. Respect licenses and attribution.

## Book voice and reading design

Use English for design file, folder and layer names. Place an English reviewer caption below each Chinese screen, outside the reader interface. Follow the [Figma handoff conventions](docs/design/reading-experience-v2.md#reviewing-the-figma-file).

For reader-facing work, use the [editorial baseline](book/planning/editorial-brief.md) and the author's [approved Chinese voice sample](book/planning/samples/zh/tomorrow-voice-reference.md). Start with an observable moment. Explain the underlying system precisely enough for the reader to check the claim. Vary sentence length, keep the dry humour, and preserve the author's uncertainty. Chinese gets an author prose pass. English gets a contextual adaptation pass against the Chinese for meaning, degree of certainty and comic timing.

Reader-facing copy follows the URL edition, including menus, saved chapter titles, errors, accessibility labels and previews. Cross editions through a deliberate reader action. Preserve meaningful technical names and code; use the [language and typography criteria](docs/design/reading-experience-v2.md#edition-typography-and-language-review). Represent chapter and translation availability accurately.

For web and print, give the text room, use a clear typographic hierarchy and keep illustration close to the passage it serves. Use the [outline](book/planning/outline.md) for editorial placement and the handoff for this edition's provisional artwork, preferences and proof. Public copy should tell a reader what they can read or do. Record implementation and review evidence in the internal handoff.

Follow the [document/notes policy](docs/agent-notes-policy.md). Keep credentials, private transcripts and unnecessary personal details out of this public repository. Shared files and direct messages do not share chat histories or continuously watch files. Silence, delivery and elapsed time are not approval.

## Human-centred work across the series

Apply the author's 26 November 2026 direction to both volumes, the production companion and the reader. Give prose a recognisable point of view, concrete consequences and enough explanation to support the reader's judgment. Match structure to the material; review repeated chapter formulas, slogans and unnecessary summaries. Preserve factual accuracy and the author's uncertainty. Use the [editorial criteria](book/planning/editorial-brief.md#human-centred-writing-across-the-series) and [real-use review](docs/product-design-role.md#real-use-review) when reviewing the assigned deliverable. Simulated readers provide hypotheses; record actual human feedback and device experience separately.
