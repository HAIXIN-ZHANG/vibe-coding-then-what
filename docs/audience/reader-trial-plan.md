# Phase 1 reader trial · plan

*PM (Claude), 28 November 2026. Runs after T-011, on the deployed revised edition. Roadmap Phase 1: "a reading with three to five target readers, to check whether the writing works. This is not promotion."*

## What it is for

To find out whether real target readers can explain a flagship mechanism after reading the piece once, without help, and where they stall. It is not a satisfaction survey. The audience panel's simulated readers produce hypotheses; this trial produces evidence ([PRD verification](../product/volume-one-public-edition.md#verification)).

## Who

Three to five people the author can ask personally. Between them, they cover:

- **an AI builder** (P1): ships small apps with AI and reads Chinese;
- **a career changer or newer developer** (P2);
- **an experienced engineer strong in one layer** — for example front end only — to check accuracy and tone.

No one who has read drafts or helped with the project. The author decides who is asked and when.

## What they read

Each person reads one piece, on their own phone or computer:

- F1 · 一个页面，究竟连着什么？
- F2 · 页面出现之前，浏览器在忙什么？
- F3 · 两版各答对三题，哪一版还能给学员用？

Assign pieces so that each is read by at least one person. F2 goes to someone who has not studied browser internals.

## How

1. Send the link and one sentence: "请像平时读文章一样读这一篇，读完告诉我。" (Read it as you would any article, and tell me when you've finished.) No briefing about what to look for.
2. Afterwards, in a short call or by voice message, ask three questions in this order. Do not prompt:
   - **Explain:** "用你自己的话讲讲，这篇里那个问题是怎么发生的？" (In your own words, how did the problem in this piece happen?)
   - **Changed condition:** the piece's own question, for example F1 "如果他按下按钮后断网了呢？" (What if his connection dropped after he pressed the button?) or F2 "把筛选挪到 Worker 里，按钮还会卡吗？" (If the filtering moved into a Worker, would the button still freeze?).
   - **Where it lost you:** "哪一段你读得最慢，或者跳过了？" (Which part did you read most slowly, or skip?)
3. Ask permission before recording anything. Keep notes, not recordings, unless the person agrees.

## What to record

Record each answer in a row in `docs/audience/reader-trial-<date>.md`. Keep the person's identity out of the public repository: use R1, R2 and so on, plus the persona type.

| Column | What goes in it |
| --- | --- |
| Reader | R1, plus the persona type |
| Piece | F1, F2 or F3 |
| Device | Phone or computer |
| Finished? | Yes or no |
| Explained the mechanism? | Yes, partly or no, with their words, paraphrased |
| Changed condition | Right, partly or wrong |
| Where they stalled | The section, and what they said |
| Reader-interface issues noticed | Anything about the site itself |

Keep what they did (stalled, skipped, answered wrongly) apart from what they said they liked.

## What happens next

- A stall that two readers share goes back to the Writer as a T-011 follow-up.
- Interface issues go to T-010 follow-ups.
- Nothing from the trial is used in promotion (roadmap rule 3).
