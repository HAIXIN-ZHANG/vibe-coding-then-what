# Volume I · structure and revision plan

Updated 28 November 2026 by the PM and Delivery Lead roles ([PDR-008](../../docs/decisions/pdr-008-roles-and-modes.md)). This page fixes the book's framework and the order of revision. The [outline](outline.md) remains the content map for each part, and the [editorial brief](editorial-brief.md) and the author's [voice sample](samples/zh/tomorrow-voice-reference.md) set the voice. Codex drafts the revision batches from the per-chapter plans; the author gives the final voice pass.

## The framework is settled

The book keeps its shape: the preface, eight parts and the closing. Its 51 pieces follow one weekend-course enrolment from the success message to AI inside the product. The order of the parts stays as it is: page, interface, API, data, waiting, release, incidents, AI.

Three structural additions are already drafted in [`book/revisions/zh/volume-one-m4/`](../revisions/zh/volume-one-m4/). The author approved them on 27–28 November.

| Addition | Effect |
| --- | --- |
| New preface opening, from the voice sample | The premise of the title appears on the first screen |
| Eight part openers and a whole-book map | Each part says what AI did at that layer, where it hides trouble, and what the part shows |
| Part 8 closing chapter trimmed from about 3,900 to about 1,100 characters | The production story moves to the guide, so the fishing image appears only in the closing |

**Kept deliberately:**

- **The order of Part 2.** 《标题长了半行，按钮去哪儿了？》 ends with the school asking to "少点一下", which opens 《校方想少点一下》. That chapter's route is then used by 《点了"报名"，我还有机会看一眼上课时间吗？》.
- **The bookend.** The preface's friend asks where the sign-ups are. 《AI 写完以后，我们还需要做什么？》 in Part 8 returns to that same weekend event and answers it.
- **No new chapters.** Gaps are filled by deepening existing pieces.

## What the structure review found

Character counts below are real characters from the comparison edition, about 126,500 in total, with a median piece of about 2,200.

- **The AI chapters are the thinnest.** Part 8's AI-in-product pieces run roughly 1,100–2,700 characters. The flagship AI-evaluation chapter is about 1,360, and 《我只是问周日有没有位子》 has no sections at all. This is the part closest to the book's title.
- **The parts are uneven.** Part 1 averages about 6,000 characters per piece over three pieces. Parts 6 and 7 average under 2,000, yet release and incident recovery are central to what happens after "it runs".
- **There are two registers.** The four earliest pieces are long and end with a sources section: the first chapter, browser foundations, the API contract and 《AI 写完以后》. The first chapter's headings ("边界：……" "状态：……" "时间：……") read like a textbook. The other 46 pieces are short and story-led.
- **One title is a question without its question mark:** 《第二页怎么又有那门课》.

## Flagship pieces · five

| Order | Piece | Why it is a flagship |
| --- | --- | --- |
| 1 | [一个页面，究竟连着什么？](../revisions/zh/volume-one-making-of/01-a-page-and-a-system.md) | The first chapter every reader opens. Bring its voice into line with the rest and keep its content. Added on 28 November |
| 2 | [页面出现之前，浏览器在忙什么？](../revisions/zh/volume-one-making-of/02-browser-foundations.md) | Already has a full English adaptation |
| 3 | [两版各答对三题，哪一版还能给学员用？](../revisions/zh/volume-one-making-of/p8-good-answer.md) | AI evaluation, the title's theme. It needs the most deepening |
| 4 | [校方想少点一下](../revisions/zh/volume-one-making-of/p2-one-less-click.md) | Part 2 calibration sample: from evidence to a design decision. **Start from** the Writer's [standard-sample manuscript r1](../revisions/zh/volume-one-standard-samples-20261126/p2-one-less-click.md), about 8,000 characters against the original's 5,800, in review since 26 November |
| 5 | [最后一把椅子，两个人同时伸手](../revisions/zh/volume-one-making-of/p4-roll-call.md) | Part 4 calibration sample: transactions and concurrency. **Start from** the Writer's [standard-sample manuscript r1](../revisions/zh/volume-one-standard-samples-20261126/p4-roll-call.md), about 6,800 characters against the original's 2,200. Its PostgreSQL two-session example has not been executed |

**English:** new English adaptations move to Phase 3, the promotion phase (PDR-005 amendment, 28 November). The existing English preface and browser chapter stay as they are.

## Revision order after the flagship pieces

**Phase 1** covers the flagship pieces and Part 8. The other batches below are **Phase 2** maintenance; until then, those pieces carry honest status labels.

Each batch covers one part. Before drafting, the Delivery Lead reads every piece in the part in full and writes a short plan for each one: keep, deepen or merge; the mechanism to explain; the worked example or figure; and the joins to its neighbours.

1. **Part 8, AI in the product.** Deepen how answers are grounded in the right school's documents, what a tool is allowed to change, what happens when a stream is stopped halfway, and how a release is judged.
2. **Parts 6 and 7, release and incidents.** Deepen how compatible versions overlap, what costs money, how alerts are written, and how a recovery is proven.
3. **Part 3's permission chapter** 《两个学校都有一本《第一讲》》, at about 1,000 characters, carries tenant isolation.
4. **Parts 2, 4 and 5.** These are in better shape; check the joins and update the examples only where needed.

## Short pieces · default decisions, confirmed after a full reading

| Piece | Length | Default |
| --- | --- | --- |
| 两个学校都有一本《第一讲》 | about 1,000 characters | Deepen. Tenant isolation is too important for two short sections |
| “我能报这门课吗？”要请模型来答吗？ | about 1,160 | Deepen, in the Part 8 batch |
| 我只是问周日有没有位子 | about 1,080, no sections | Deepen. It is about tool authority over the roster |
| 上线以后，去王老师那边坐一会儿 | about 1,020 | Consider merging into the preceding chapter, 《新按钮上线那晚，旧页面还开着》, which covers the same feature |
| 备份是绿色的，名单能拿回来吗？ | about 1,120 | Consider merging with 《名单找回来了，可以开门了吗？》, which continues the same morning |

A short piece is not a fault in itself. Short reads suit this book. Merge only when two pieces tell one scene, and deepen only where a reader cannot yet check the claim.

**The Writer's existing drafts.** The two calibration samples were already revised on 26 November ([handoff](../../docs/handoffs/writer/m4-standard-samples.md)): an accepted calibration r1 and a later standard-sample manuscript r1 that is still in review. Pieces 4 and 5 continue from the later r1. Their review is the first task when execution resumes; they are not rewritten from scratch.

## Scene-led writing · the author's direction of 27 November

The author asked to borrow some techniques from short posts, without losing technical depth ([archived input with a fictional specimen](samples/zh/scene-led-technical-writing-20261127.md)):

- **Build the scene.** The reader knows what someone wants, what they know, and what happens after their choice.
- **Pause where a decision arises,** let the reader guess, then answer with the conditions behind the mechanism. Suspense never replaces explanation.
- **Restrained irony** comes from a contradiction in the situation, such as passing tests that share the code's mistaken premise. Explain the contradiction instead of ending on a slogan.
- **Use a diagram, worked data or a short code excerpt** when it makes the reasoning checkable, never as decoration.
- **Vary chapter shape and paragraph rhythm.** This is not a hook–question–twist–three-lessons template, not one sentence per line, and not a collection of social posts.

These principles apply to every revision batch. The fictional transfer specimen ("转账失败……收到了") stays a teaching scene; the abbreviation "CRA" from the discussion was never defined and is not used.

## Consistent conventions

- **Headings** use a narrative style, never a taxonomy.
- **Sources:** a revised piece ends with a short sources list only when it makes claims a reader could check against them.
- **Questions:** every title that is a question ends with "？".
- **Assumptions:** teaching assumptions are labelled near their first use and kept apart from the author's real experience.
- **Length:** a revised piece may grow, often to one and a half or two times its length, but it stays one sitting's read.

## Decided on 28 November

- **The closing's title** becomes 《今天就到这儿吧》, decided by the author. The readers are not only programmers, and the closing guides nothing. The body is unchanged. The candidate is [closing.md](../revisions/zh/volume-one-m4/closing.md); the site title follows in T-007.

## Open for the author

- **Which flagship pieces get English, and when** (PRD O08).
