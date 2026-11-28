# Project vision

Updated 28 November 2026. This page covers who the books are for, what they try to do, and what kind of reading product the site is. The [roadmap](roadmap.md) holds the order of work; decisions and their reasons are in the [decision records](decisions/README.md). The earlier, longer vision is [archived](archive/project-vision-2026-11-27.md).

## The premise

AI now does the work, and it runs. The person who asked for it often cannot say what it actually did. That gap is where these books live. An engineer in this era needs the fundamentals behind what AI built: not to distrust AI, but to judge it, check it and fix it when it breaks.

The author writes from his own reading, projects and recent working life. The tone is light, literary and a little humorous, closer to a story than to documentation, and the books keep his uncertainty where he is unsure ([PDR-007](decisions/pdr-007-titles-and-positioning.md)).

## Three works

| Work | For | What a reader gets |
| --- | --- | --- |
| **《AI 写完了，能跑，然后呢？》 / *AI Wrote It. It Runs. Then What?*** | People who can build with AI but cannot yet explain why it works or breaks: engineers strong in one layer, career changers, newer developers | One course-enrolment story, followed through the page, API, data, background work, release, incidents and AI inside the product, explained precisely enough to check |
| **《活交给 AI，我去钓会儿鱼》 / *Leave It to the Agents. I'm Going Fishing.*** | Engineers, tech leads and hiring managers weighing how to work with AI | A short, honest account of this project: vibe coding, role-playing agents, then two AIs checking each other, with the rework left in |
| **《省下来的时间，去哪儿了？》 / *Where Does the Saved Time Go?*** | Everyday readers; no coding needed | Conversational pieces on how AI changes work, home and free time, each with a small practice to take away |

Each work can be read on its own. Together they also form the author's public portfolio, maintained over the long term ([PDR-005](decisions/pdr-005-project-purpose.md)).

## What Volume I covers

Eight parts follow one system:

1. the page and the system behind it;
2. what the learner sees, from product questions to frontend and design systems;
3. APIs and the people on both sides of them;
4. records, queries and copies;
5. waiting, traffic and retries;
6. getting the program to the learner;
7. finding evidence when something breaks;
8. AI inside the product and beside the workbench.

The [outline](../book/planning/outline.md) holds the content of each part, and the [structure and revision plan](../book/planning/volume-one-revision-plan.md) holds the current revision order.

Two AI threads stay distinct. **AI in the product** covers deciding whether AI fits, grounding, permissions, evaluation and release decisions. **AI at the workbench** covers verifying what a coding assistant produced. Neither turns the book into a tool manual.

Outside the main line: model training, GPU and inference operations, and large data-platform administration. Specialist patterns such as CQRS, sagas, Kubernetes and multi-region design appear only as optional comparisons.

## The reading product

The website is the books' home, not a file listing.

- **Calm reading:** comfortable long-form text on phones, tablets and desktops, with serif body text, one accent colour, a choice of paper tones, and light and dark modes.
- **Navigation:** clear contents and a book selector; search that stays in the reader's language; share links to a section; figures that open and close without losing the reader's place; return to where you left off on the same device.
- **Honest about what exists:** which chapters are available in which language, and which works are still in development.
- **No accounts, no hosted AI chat, no comments.** Readers may copy an editable question into their own AI tool.

The [PRD](product/volume-one-public-edition.md) holds the next edition's requirements and acceptance scenarios.

## Languages

- **Manuscripts** are Chinese-first; English follows as an adaptation of stable Chinese text.
- **Reader-facing copy** follows the edition in the URL.
- **Project documents** are English-first. The author's summary is in Chinese: the [stage summary](stage-summary.zh-CN.md).

## Principles

- Explain mechanisms precisely enough to check. Separate documented behaviour, experiments, the author's experience, teaching assumptions and recommendations.
- Do not invent readers, traffic, clients, outcomes or income. Professional visibility may follow; it is not promised.
- AI assists with research, drafting and revision. The author decides, checks and is responsible. This is stated openly in the preface.
- Licences: code under [MIT](../LICENSE) and original prose and diagrams under [CC BY-SA 4.0](../LICENSE-CONTENT.md). Third-party rights are checked case by case.
- Formal publishing, paid editions and commercial trials are considered only after the revised edition has readers, as a separate decision.
