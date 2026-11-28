# PDR-007 · Titles, readers and voice for the three works

Status: **Accepted.** The author confirmed the titles and positioning on 27 November 2026 after an outside desk review. Decision-maker: author. Recorded: 27 November 2026 against main `9acaa05`. Implementation PR: none. The rename is executed with the [PDR-005 adoption sequence](pdr-005-project-purpose.md#adoption-sequence).

## Context

Three things were unclear before this decision:

- **The English title of Volume I** used the 2025 term "vibe coding". That put it beside two established books, Gene Kim and Steve Yegge's *Vibe Coding* (IT Revolution, October 2025) and Addy Osmani's *Beyond Vibe Coding* (O'Reilly, 2025), and tied it to a term that may date quickly.
- **The Chinese title of Volume I** made the reader the subject ("用 AI 写代码"). The author's premise has AI as the actor.
- **The guide's title** 《我去钓会儿鱼》 did not explain itself.

## The shared premise · the author's words, 27 November 2026

People now let AI do the work. It runs, but they do not know what it did. An engineer in this era therefore needs the fundamentals behind what AI built. All three works keep a light, story-like, occasionally humorous voice rather than a manual or documentation register.

## Decisions

| Work | Chinese | English |
| --- | --- | --- |
| Volume I | 《AI 写完了，能跑，然后呢？》<br>Subtitle: AI 写的代码背后，那套系统的故事 | ***AI Wrote It. It Runs. Then What?***<br>Subtitle: *Stories from the system behind the code you didn't write* |
| Volume II | 《省下来的时间，去哪儿了？》<br>Subtitle: AI 时代的生活闲谈 | ***Where Does the Saved Time Go?***<br>Subtitle: *Small talk on living with AI* |
| Production guide | 《活交给 AI，我去钓会儿鱼》<br>Subtitle: 一本书从 vibe coding 写到 agentic coding 的经过 | ***Leave It to the Agents. I'm Going Fishing.***<br>Subtitle: *How one book went from vibe coding to agentic coding* |

**Volume I.**

- **Reader:** people who can already build something with AI but cannot explain why it works or why it breaks. That covers engineers strong in one layer, career changers and newer developers. Senior engineers are reviewers and referrers rather than the core reader. The story-led voice lowers the barrier, which is why this reader is broader than "1–5 years of experience".
- **Positioning:** a story book about the system, not a handbook about AI tools. Neither comparable book is written this way.
- **Scope:** "Organise all the fundamentals" stays the long-term ambition. The flagship pieces set the depth bar; other pieces are maintained over time.

**Volume II.**

- **Content:** a conversational guide to life with AI. It covers practical tips, ways of living and reflections, and how AI changes everyday life and productivity. It is less technical, but AI stays central.
- **"Time" is the umbrella.** Each piece ends with one or two small practices the reader can take away, so the social observation in the current outline also gives something usable.
- **Format:** published as a serial first ([PDR-005](pdr-005-project-purpose.md)).

**Production guide.**

- **Length:** a half-length book of about 60 A5 pages (roughly 30,000–40,000 Chinese characters). It stays light and not deep.
- **Structure,** around the three stages the author named:
  1. **Vibe coding.** One person and one chat window: fast, but nothing survives the chat.
  2. **Role-based collaboration.** Four role chats, handoffs and peer review. The process documents grew to about 260,000 words before being cut back.
  3. **Agentic coding.** Roles bound to two different AIs, which delegate and check each other's work ([PDR-006](pdr-006-two-desk-workflow.md)).

  A short opening and a close ("I can finally go fishing") frame the three stages.
- **Timing:**
  - Stages 1 and 2 can be drafted now from repository evidence.
  - Stage 3 is written after the roles-and-modes workflow ([PDR-008](pdr-008-roles-and-modes.md)) has run on real tasks.
  - The existing six-chapter concept is restructured into these stages, not discarded.
- **Shared voice:** all three works sound like one engineer talking with the reader. The author and works page states this.

## Consequences

- **Rename scope:** site titles, metadata, README, the cover artwork that carries the English title, and the next PDF. The current English title appears in 25 files.
- **What does not change:**
  - The repository slug `vibe-coding-then-what` and published URLs, so links already shared keep working.
  - The approved 209-page PDF, which remains the earlier edition under its original title.
  - Dated historical records, which keep the titles they used at the time.
- **Supersedes:** the title and audience statements in the [project vision](../project-vision.md) and the earlier title lines in the [outline](../../book/planning/outline.md#two-book-series) and the [life-volume outline](../../book/planning/volume-two-outline.md).
- **Series name:** still open, decided in Phase 3. Amended 28 November 2026 (author): the "…Then What?" candidate and the 「然后呢」 pattern are dropped. The three works (Volume I, the guide and Volume II, "two and a half books") each cover something different, so the series is not named by forcing one phrase onto all of them. Having no series name is an acceptable outcome; the author and works page can list the three works with one line each. Any name appears only on that page.

## Alternatives considered

- **Volume I English:** keep *Vibe Coding, Then What?* (crowded and dated); *It Runs. Then What?* (AI missing from the main title, which the author rejected); *AI Wrote the Code. Now What?* (shorter, but drops the "it runs" beat); *It Works on My Screen* (too close to an existing title, *It Works on My Machine*).
- **Volume I Chinese:** keep 《用 AI 写代码：能跑，然后呢？》 (reader as subject, textbook tone); 《AI 写的代码能跑，然后呢？》 (searchable but flat).
- **Guide:** keep 《我去钓会儿鱼》 with an explanatory subtitle (still opaque at first glance); 《我什么时候敢去钓鱼？》 (no AI in the title).

## Evidence

Desk research only, with no reader interviews or demand data:

- the [Stack Overflow 2025 Developer Survey](https://stackoverflow.blog/2025/07/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here): 80% of developers use AI tools, 29% trust their accuracy, and 66% spend more time fixing almost-right AI code;
- [Workday, January 2026](https://newsroom.workday.com/2026-01-14-New-Workday-Research-Companies-Are-Leaving-AI-Gains-on-the-Table): nearly 40% of AI time savings are lost to rework, among 3,200 active AI users at large organisations;
- the competing books on [IT Revolution](https://itrevolution.com/product/vibe-coding-book/) and [O'Reilly](https://www.oreilly.com/library/view/beyond-vibe-coding/9798341634749), and the Traditional Chinese edition [《Vibe Coding 聖經》](https://www.books.com.tw/products/0011044617).

No Simplified Chinese story-led book on the system behind AI-built software was found in one search round; that is not proof of absence. A title collision search on 27 November found no book titled *AI Wrote It. It Runs. Then What?* or *Leave It to the Agents. I'm Going Fishing.*
