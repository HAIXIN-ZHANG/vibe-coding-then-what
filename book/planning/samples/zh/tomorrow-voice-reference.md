# 明天再研究

- **Purpose:** Author-approved Chinese voice specimen for [the editorial baseline](../../editorial-brief.md#calibrating-the-voice-before-wider-drafting).
- **Approval:** 2026-11-18 (Australia/Perth); the author accepted the final trial after feedback on sentence rhythm and literary quality.
- **Scope:** Preserve the approved text below verbatim. Fictional teaching scenario; not an account of the author's production experience.
- **Status:** Editorial voice acceptance only. Not a published chapter, English manuscript, independent technical/manuscript review or authorization to rewrite accepted sources.
- **Use:** Calibrate observation, warmth, light humor, connected paragraphs and varied sentence length; do not mandate the scene, metaphor or structure in every chapter.
- **Adopted in the preface (27 November 2026):** On the author's decision, the first five paragraphs, from 「AI 写得很快」 to 「报名的人在哪里看？」, open the [M4 preface candidate](../../../revisions/zh/volume-one-m4/00-before-we-start.md) verbatim. The rest of this specimen remains calibration only.

---

AI 写得很快，快到你还没想清楚自己要什么，它已经礼貌地完成了。

看着那个能运行的页面，你很高兴。至于它究竟完成了什么，你决定明天再研究。很多产品的故事，就是从这个明天开始的。

比如，你正在帮朋友做一个活动网站。他准备办一场周末分享会，需要一个报名功能：姓名、邮箱，一个提交按钮。你把要求交给 AI，起身倒了杯水，回来时，表单已经摆在那里，整齐得像是早就等着你了。输入框有提示，按钮有动画，提交之后还会出现一句“期待与你见面”。你填上自己的名字，看着绿色提示轻轻浮出来，觉得这个下午忽然宽裕了不少。

以前，这样的功能怎么也要占掉几个小时。现在，杯子里的水还热着，你已经开始调整按钮的圆角。AI 让一些原本需要耐心的事情变得轻巧，这种快乐很实在。你把链接发给朋友，合上电脑，那个尚未读过的接口文件安静地留在编辑器里。

第二天，朋友问：“报名的人在哪里看？”

你重新打开网站。页面仍然很好看，欢迎的话也很热情，只是找不到名单。翻过代码才发现，表单接上的是一个临时接口：它收到请求，返回成功，却没有保存报名信息。昨天你检查了邮箱格式，试了两遍按钮，甚至嫌那抹绿色太亮，唯独没有顺着请求往后走，看看自己的名字最后落在了哪里。

你当时当然有理由觉得事情已经完成。页面反馈及时，流程没有报错，AI 还列出了一份条理清楚的修改说明。只是你们一直在用“报名功能”这四个字谈论几件略有不同的事：你眼前是一个能提交的表单，朋友需要一份可以查看的名单，而屏幕另一边的人，可能已经把周六下午空了出来。他没有读过接口文件。他相信那句“期待与你见面”，就像相信一封已经收到的邀请。

沿着这份期待，系统的轮廓才慢慢清楚。页面收集信息，网络把它送到后端，后端检查内容，再交给数据库保存。等这些必要步骤完成，页面才有依据告诉用户：你的报名记下了。每一段都需要有人负责，也需要把结果交代给下一段。漂亮的界面替整个流程开口说了话，我们便要知道，它凭什么这样说。

接上数据库之后，还会遇到一些不那么显眼的麻烦。名字已经存好了，确认的回复却在途中丢失，浏览器迟迟等不到消息。用户以为自己没有点上，又按了一次按钮，于是系统收到两次提交，而他始终只想报一次名。我们后面会慢慢拆解这些问题。此刻先记住：屏幕上的安静，有时藏着已经发生、只是尚未被确认的事情。

过去，有些思考会在写代码时自然找上门来。写到保存逻辑，你发现还缺一张表；写到错误处理，你才认真考虑网络中断的可能。如今，实现来得很快，这些停顿却未必会一起到来。完整的页面摆在面前，让人很容易把“我看见它工作了”，当作“我理解它怎样工作”。这很诱人，尤其是在一个忙碌的下午。

所以，下次可以在动手前，多说几句朴素的话：报名要保存在哪里，组织者怎样查看，什么情况下可以告诉用户成功，暂时确认不了时又该如何解释。它们听起来甚至不太像技术问题，却会决定后面的代码应该怎样写。你仍然可以让 AI 帮忙，把省下的时间留给这些问题，也留给一杯不必在键盘旁放凉的水。

等那个绿色提示再次出现，你会更清楚它意味着什么：到了周六，有人带着那份确认来到门口，而名单上，确实有他的名字。
