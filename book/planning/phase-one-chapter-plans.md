# Phase 1 · per-chapter revision plans

*Delivery Lead (Claude), 28 November 2026. Each plan follows a full reading of the piece on main at `c966781`. These plans drive [T-011](../../docs/tasks/T-011-volume-one-flagship-revision.md). The structure and the order come from the [revision plan](volume-one-revision-plan.md), and the bar is the [PRD content standard](../../docs/product/volume-one-public-edition.md#content-standard-for-revised-pieces).*

Every plan answers the same questions:

- keep, deepen or merge;
- what the reader sees happen first;
- which mechanism must become checkable;
- the worked example or figure;
- the changed condition the reader reasons about;
- the joins to neighbouring pieces;
- a target length;
- what must stay;
- what must be verified before the piece can be called revised.

The plans do not prescribe sentences. The Writer drafts and the author does the voice pass.

Lengths count Chinese characters only (CJK ideographs), excluding code, tables and links.

## Rules for every piece in this batch

- **Figures follow the V4 style guide** ([design](../../docs/design/v4/reader-v4-design.html#content)). Each text-art diagram becomes an SVG figure numbered per chapter (图 1-1), with a caption and a text description for when the image fails to load. Keep a text-art diagram only where the arrangement of characters is itself the point.
- **Example numbers are fictional and labelled as such.** Measurements appear only if they were actually run, with the version and date.
- **Hedging is spent where the uncertainty really is.** In the current text, sentences of the form "这不是说……而是……" and "并不保证……" sometimes come three to a paragraph. Keep the ones that protect a real misreading and cut the ones that guard against nobody.
- **Each piece ends on a question or a scene that the next piece picks up.** No closing summaries.
- **No product names for models or vendors.** MCP may stay as a named protocol. Version-sensitive claims cite a primary source.
- **Status.** A piece becomes `revised` only after the Delivery Lead's Review passes it against the content standard ([T-010 status labels](../../docs/tasks/T-010-v4-reader.md#status-labels-data-not-hand-typed-text)).

## Flagship pieces

### F1 · 一个页面，究竟连着什么？ (`01-a-page-and-a-system.md`, about 4,700)

**Decision.** Keep the content and bring the voice into line with the rest of the book. This is the first chapter every reader opens.

**What works.** The opening (报名成功, then three failures on one page) and the R17 scene with 小林 and the teacher are the book at its best. The lost-response sequence and the AI task brief are concrete and checkable.

**What to change.**

1. **Thread the scene through the four middle sections** (边界, 状态, 时间, 依赖). From 从用户要完成的事开始 onwards, the chapter switches to essay mode and 小林 disappears until the AI section. Each section should open on one moment from the R17 evening or the next morning, then explain. This also breaks up the repeated boundary/state/time/dependency formula that the editorial brief warns about.
2. **Re-anchor or cut the 202 Accepted aside.** The learning-report example introduces a feature the reader has never seen. Either tie it to the teacher exporting Friday's list (a real wait in this story) or reduce it to two sentences.
3. **Tie the email dependency to the R17 morning.** 小林 has his confirmation but no email: does the seat exist?
4. **Draw three figures:**
   - 图 1-1, the browser, service and database;
   - 图 1-2, the lost-response sequence, as a two-lane timeline;
   - 图 1-3, the page-state diagram.
   The C4 link stays.
5. **Cut about a third of the defensive hedges** in 状态 and 再想一步.

**Changed condition already present.** 小林 loses his connection after pressing the button. Keep it, and make it the explicit question of the 状态 section.

**Joins.** The preface's friend asks where the sign-ups are, and this chapter starts the course story. The closing line points to the browser, which chapter 2 picks up. Keep both.

**Length.** 4,500–5,200.

**Must stay.** The AI task brief block, word for word or close to it: readers can copy it. Both sources.

**Verify.** The OWASP anchor and RFC 9110 §15.3.3.

### F2 · 页面出现之前，浏览器在忙什么？ (`02-browser-foundations.md`, about 5,200)

**Decision.** Keep the mechanism and make the opening scene-led. The figures do much of the work.

**What works.** The three kinds of waiting, the script table, and the 正在搜索 example of a DOM change that never paints. The evidence table and the DevTools steps make the claims checkable. The sources are primary (HTML spec, MDN, web.dev, Chrome docs).

**What to change.**

1. **Open on the frozen search.** The Chinese opens with an explanation, 页面出现之后，事情也没结束. The English adaptation already opens better, on the course title, the typed search and the list that hasn't budged. Take that observable moment back into the Chinese, in the Chinese voice; do not translate the English.
2. **Make the AI angle concrete in the last section.** The AI suggests "make the filter `async`". The reader predicts whether the button still freezes and checks it with the Performance panel. This is the book's title applied to one line of code.
3. **Draw three figures:**
   - 图 2-1, how a title reaches the screen (already drawn in the V4 design);
   - 图 2-2, resource, execution and screen on three rows;
   - 图 2-3, a frame strip showing 正在搜索 written to the DOM and overwritten before any frame paints.
   The script table becomes 表 2-1.
4. **Thin the hedging.** The microtask paragraph and the main-thread paragraph each carry two or three qualifiers. Keep the qualifiers that prevent a wrong inference (a scroll does not prove an idle main thread; `await` is not a paint instruction) and drop the rest.

**Changed condition.** The filter moves to a Web Worker. What gets faster, and what can the worker not touch? The DOM stays with the page. The current text names this; make it the reader's question.

**Joins.** The opening follows chapter 1's closing pointer. The ending leads to the 讲义 question in chapter 3. Keep both.

**English.** The adaptation is left unchanged until Phase 3. After this revision it will be out of date, which PRD O10 covers.

**Length.** 5,000–5,800.

**Verify.** Every source link and anchor, and the DevTools panel names against current Chrome documentation.

### F3 · 两版各答对三题，哪一版还能给学员用？ (`p8-good-answer.md`, about 1,200)

**Decision.** Deepen substantially. This piece carries the title's theme, how to judge an AI-built answer, and it is now the thinnest in Part 8.

**What works.** The 北门 nod in the opening. The four cards. The rule that a privacy breach outranks the score ("两个模型一致赞成一份午餐，并不能替厨房下单").

**What is missing.** The reader is told evaluation has parts but never sees one run.

1. **Show the four cards as a table** (表 8-1). Columns: the question, the materials allowed, the identity and permission, what counts as done, and how the result is checked (deterministic or human). Then run version 甲 and version 乙 against it in the text, card by card.
2. **Make the release gate explicit.** One failure on the permission card blocks the release, whatever the score. Draw it as a small figure (图 8-1): the cards on the left, a gate in the middle, the outcome on the right.
3. **Make grader calibration concrete with fictional numbers.**
   - Twenty answers are judged by a teacher and by a model grader. They agree on seventeen.
   - The three disagreements all involve weather conditions, so the grader is not trusted on that kind of question.
4. **Make variation concrete.** Card 2 is run five times and passes four. What does the team do with four out of five?
5. **Add a held-out set and a growing set.**
   - Keep the cards used to tune prompts apart from the cards used to judge a release.
   - Add new cards only from permitted, anonymised real questions.
6. **Move the cost and latency section** (谁来付这次等待) to the release-decision piece (Part 8 plan below). Leave one paragraph here. The piece should be about whether an answer is good enough to ship.

**Changed condition.** A second school joins with its own handouts. Which cards still hold, and which need copies per school?

**Joins.** It follows the handout-retrieval piece, whose three failure layers become cards here. It ends on the sentence that hands over to the release decision (第一行字早出来一秒…).

**Length.** 3,000–3,800.

**Must stay.** The opening, the lunch-sandwich joke and the permission-first rule.

**Verify.** Any claim about model-graded evaluation is stated as a practice and its limits, not as a vendor feature.

### F4 · 校方想少点一下 (`p2-one-less-click.md`, Writer standard-sample r1, about 6,000)

**Decision.** Review r1, which is still pending, then revise only what the review finds. Do not redraft from the original. The [Writer handoff](../../docs/handoffs/writer/m4-standard-samples.md) records the concept-gate decisions.

**Review against:**

- **Structure.** 纸一 to 纸八 are eight subsections under one section. Check whether a reader can follow the two paper prototypes without a scratch pad. If not, present the walk as one table (表 2-x: paper, what the learner looks for, what happened) and keep two or three of the papers as prose moments.
- **Evidence chain.** The piece moves from "上一次" interviews through borrowed patterns and paper prototypes to a live test. Check that each step changes the next sketch for a stated reason, and that no step claims more than its evidence. The live-test section (人不多的时候，值不值得上线试？) must say what a small sample cannot show.
- **Joins.** The previous piece is 标题长了半行; the next is 点了"报名"…. The Writer checked the openings and endings; recheck them after any change.
- **Sources.** GOV.UK, AAPOR and Kohavi et al.: check that the links resolve and say what the text says they say.

**Figure.** 图 2-x: the two list versions (甲版, 乙版) as a paper-prototype sketch in the V4 figure style. This replaces the two `###` list blocks if the table route is taken.

**Interactive "choose your path".** This is a Phase 3 reader feature. In Phase 1 the paths stay in prose.

**Length.** Hold around 6,000. Cut, do not grow.

### F5 · 最后一把椅子，两个人同时伸手 (`p4-roll-call.md`, Writer standard-sample r1, about 3,300 plus SQL)

**Decision.** Review r1. Its PostgreSQL two-session example **has not been executed**, so run it first ([T-012](../../docs/tasks/T-012-postgresql-example.md)). The prose is revised to match what the run shows.

**Review against:**

- **The schedules.** Check that the two schedules in 把两个时钟拨慢一些 match the T-012 transcript. The handoff's parameter trace is paper reasoning only.
- **Isolation claims.** Check every claim in 那四个字母保护了哪一种不走运 about isolation levels, row locks and `UPDATE … WHERE remaining > 0` against the PostgreSQL documentation for the version T-012 used. State the level (PostgreSQL defaults to Read Committed).
- **Retry and cancel.** Check that cancelling once returns exactly one seat in the SQL as written.
- **The email warning** (don't hold the session lock while sending mail). Keep it. It joins forward to background work.

**Figure.** 图 4-x: the two-session timeline, with 甲 and 乙 in two lanes against one row of `remaining`. It shows where each waits, commits or gets zero rows. This is the most-needed figure in Part 4.

**Changed condition already present:** cancellation. Keep it.

**Joins.** The previous piece is 两个人、三份讲义，怎么数出了六个报名？ and the next is 换了课名，为什么要给三个人打电话？. Both were checked at the concept gate; recheck them after any change.

**Length.** Hold around 3,300 plus SQL.

**Labelling.** If T-012 cannot run, the piece stays `first-edition` and the SQL is labelled "未实际运行" (not actually run), per PRD O07.

## Part 8 · AI in the product

Part 8 is the part closest to the book's title and the thinnest. The revision plan names four mechanisms to deepen:

- grounding in the right school's documents;
- what a tool may change;
- a stream stopped halfway;
- judging a release.

The pieces in order (manifest order 43–50), with a decision for each:

| # | Piece | Now | Decision | Target |
| --- | --- | --- | --- | --- |
| 43 | “我能报这门课吗？”要请模型来答吗？ | 1,000 | Deepen | 2,000–2,500 |
| 44 | 我只是问周日有没有位子 | 960, no sections | Deepen, taking in material from 46 | 2,200–2,800 |
| 45 | 读到半句话，我还能换个问题吗？ | 1,500 | Keep; verify accessibility claims | 1,600–2,000 |
| 46 | 助手翻到的是谁的第十二页？ | 2,400 | Keep and refocus on retrieval | 2,200–2,600 |
| 47 | 两版各答对三题，哪一版还能给学员用？ | 1,200 | Flagship F3 above | 3,000–3,800 |
| 48 | 答得快了，怎么有更多人点了“问老师”？ | 1,840 | Deepen; take in the cost section from 47 | 2,400–2,900 |
| 49 | AI 写完以后，我们还需要做什么？ | 3,460 | Keep; check the bookend joins | unchanged |
| 50 | 按钮很守信用，我却想回去改需求 | 966 (trimmed in T-007) | Keep as trimmed | unchanged |

### 43 · Can the model say whether I can enrol?

- **Mechanism.** Checking a structured answer in layers:
  1. the call finished;
  2. the output parses;
  3. the fields have the right shape;
  4. the values are allowed (C-99 does not exist);
  5. the course is visible to this learner;
  6. each claim in the reason points to an authorised passage.
- **Figure.** 图 8-x: the three answers (right code with a source; right code with an invented 外拍; wrong code with a moving reason) against the six layers, marked where each one fails. The text already describes this comparison; draw it.
- **Changed condition.** The prerequisite record is missing. What should the page say? The current text says it; make it the reader's question.
- **Keep.** The poster-slogan opening. The two kinds of "能". Memory versus business records ("兴高采烈地替名单盖章").
- **Join.** It ends on 钥匙能动名单, which opens 44. Keep it.

### 44 · I only asked if Sunday has a seat

- **Mechanism.** Tool authority:
  - a read tool and a write tool;
  - the model drafts and the person confirms;
  - the server re-checks identity and scope;
  - an operation ID makes a resend idempotent;
  - one transaction moves the seat;
  - a lost reply is resolved by looking up the ID.
- **Merge.** Move 46's last two sections here (这一步是谁选的，又由谁去做？ and 请模型替我挑，仍要有人替系统决定). They are about who may act, not about retrieval. That leaves 46 focused, and this piece gets the sections it lacks.
- **Structure.** Three or four sections:
  1. asking only;
  2. the draft and the confirmation;
  3. the last seat and the transaction (one paragraph pointing back to Part 4's 最后一把椅子, not a re-explanation);
  4. the tunnel and the receipt.
- **Figure.** 图 8-x: the sequence. Question, read tool, draft shown, 小林 confirms, server checks, transaction, receipt, then the lost reply looked up by ID.
- **Keep.** The acceptance test in the last paragraph: "拿开鼠标，只打那句…两份名单都该纹丝不动". It is the best checkable moment in Part 8.

### 45 · Halfway through a sentence, can I change the question?

- **Keep.** It already teaches generation IDs, late fragments, cancellation versus business state, and screen-reader announcements.
- **Verify.** Check the accessibility advice against the WAI-ARIA Authoring Practices and MDN on `aria-live` and `aria-busy`, and cite one of them. The text currently has no sources.
- **Figure.** 表 8-x: the termination table the text already describes (completed, stopped by the reader, connection error), with what the interface shows and what the reader can do for each.
- **Trim.** The first paragraph is a dense summary of the whole piece before its first scene. Move it after 小林听到了哪个字？ or cut it.

### 46 · Whose page twelve did the assistant open?

- **Refocus on retrieval.** Upload metadata, chunking that keeps conditions together, hybrid search, tenant filtering before the model sees anything, re-ranking, citations that re-authorise, and index versioning and withdrawal. Then the three failure layers: wrong candidates, right candidates but wrong extraction, and another school's text in the candidates.
- **Move out** the agent and workflow sections to 44 (above).
- **Figure.** 图 8-x: the retrieval path. Upload, chunks, index, tenant filter, candidates, re-rank, model, answer with citation. Mark where each of the three failures happens.
- **Keep.** The 北门 and 南门 opening. "态度十分认真的北门". The replay-material paragraph about not keeping every handout forever.

### 48 · Answers got faster. Why did more people press 问老师?

- **Deepen the uncertainty in plain language.**
  - With 100 learners per version, 8 against 16 is a difference a careful reader should not treat as settled.
  - Worked fictional check: a two-proportion test gives roughly *p* ≈ 0.08. Say what that means without the formula: at this size, a difference like this turns up fairly often by chance alone.
  - The piece already refuses to over-claim; give the reader the tool to see why.
- **Take in the cost section from 47.** Quality, time to first line, time to a useful answer and resources per useful answer, compared on the same questions. The budget fallback. The note that the cache key carries identity and version. Fit it into the decision "要不要让更多人试？".
- **Figure.** 图 8-x: the two groups of 100. Who asked again, who got no first line, and the unknown — people who went to the wrong gate and never asked.
- **Keep.** "再也没找过我们的用户…最不方便拿来庆祝的一类人". The correction for answers already sent.

### 49 · What do we still need to do after the AI finishes?

- **Keep.** It is the bookend to the preface's friend.
- **Check.** The joins on both sides after 48 and 50 change. Also check that its AI-review steps do not now repeat what 43–48 teach in more depth. Where they overlap, point back in a clause instead of re-explaining.

### 50 · The button keeps its word, but I want to change the requirement

- **Keep as trimmed** to about 1,100 characters in [`volume-one-m4/p8-return-to-reader.md`](../revisions/zh/volume-one-m4/p8-return-to-reader.md), admitted by T-007.
- **Check.** The join to the closing, 《今天就到这儿吧》.

## Order of work

1. **T-007 admits** the preface, the trimmed piece 50, the closing, the part openers and the map.
2. **T-012 runs the PostgreSQL example.** It can run in parallel with step 3.
3. **F1, then F2.** The opening chapters set the voice for the rest.
4. **F4 and F5:** review r1, then revise. F5 waits for T-012.
5. **Part 8 in order:** 43, then 44 and 46 together (the merge moves material between them), then 45, F3 (47) and 48. Finish with a join pass over 49 and 50.

Each piece goes through:

1. the Writer's draft;
2. the Delivery Lead's review;
3. an audience-panel rehearsal with the personas named in its task;
4. the author's voice pass;
5. its status set to `revised`.

The [reader trial](../../docs/audience/reader-trial-plan.md) uses F1, F2 and F3.
