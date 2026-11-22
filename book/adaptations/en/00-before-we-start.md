# Before We Start: It Runs. Then What?

**By Jar & Prince Explore the World**

## Why I wanted to write this book

One thing worries me about writing a book on AI. By the time I put the last full stop in place, will the tool on page one still have the same name? Even the words “the latest guide” look a little nervous on the cover.

So I set myself a modest target. In three to five years, I’d like to be able to take this book off the shelf and still find something useful in it. A tool might need updating, an example mending. With any luck, the account of how a system works, how a choice changes a product, and how we live with the things that keep changing will hold up a little longer. Once I’ve collected enough new questions and experience, perhaps there’ll be a second edition. For now I’d like to write one good enough to outlast the list of things I absolutely must learn this week.

On the front end we have design systems. On the back end we have system design. Swap two words and there’s suddenly rather a lot more to do.

That was one of the thoughts that got me started. Components, APIs, databases, deployments. Each has its own rules and its own reasons. I wanted to understand where the rules came from and how all those pieces ever managed to become one product.

Over the past year the economy has often felt sluggish to me, and there have been changes at work too. At home I read, looked into bits of code and tried out a few ideas that AI had made easier to attempt. Some went straight back on the shelf. Very few became things I actually kept using. I found myself returning to an older idea. I had a collection of questions left over from reading and building things. Perhaps they belonged in a book.

A book has a table of contents. My questions seldom arrive in that order. I might understand how a page submits a form and how a database saves a record, yet still want to stop somewhere between the two. The page has just told someone, “You’re enrolled.” Who told the page it could say that? I used to put one book down, pick up another and try to work my way back from the other end.

With AI I can stay where the question occurred to me. I can ask for a different example, or for the bit of code I ought to open next. I’m glad when the explanation makes sense. When we get to the line that tells a student they have a place, I still like to go and look for myself. Eventually I asked AI to help organise a contents page, draft passages and work through revisions. It went better than I expected. An idea I’d left sitting around for years finally had a first page.

Working with AI can feel a little like opening one of those mystery boxes. You can write a remarkably detailed request and still be surprised by what comes out. A smaller task and a look inside while the work is under way give you a chance to catch a wrong turn early. Even a beautifully written set of instructions can leave quite a bit of the afternoon unaccounted for.

The past year has reminded me that life has a few outcomes I can’t plan either. I want to do good work, including the technical work I care about, and leave some room around it. I’d prefer my career to have less than the entire vote on how I’m doing.

There are two cats behind the name on this book, Jar and Prince. I’ve come to know them quite well. Call either of them and there’s still some room for negotiation. What feels familiar to me is having to adjust my expectations even as I get to know something better. Cats have their own needs. When I want to understand what an AI has done, I need to look at how it works and what evidence it has given me. The cats are also a useful reminder that there’s a world worth getting to know on this side of the screen.

If you’ve made a few things that run, perhaps that’s a good place for us to meet.

AI helped me organise the material for this book, draft it and revise it many times. I’m grateful for the help. Something I’d been thinking about for a long time is now something another person can read and argue with. The decisions about what belongs here, the checks against the original sources, and the duty to say where I’ve made an assumption or left something unverified are mine.

## What the teacher needs when she opens the door

Picture a weekend photography class. It’s Friday, and before the teacher leaves she wants two things. One is a class list she can call names from on Saturday. The other is a handout her students can read tonight. If a name is missing, she needs to know whether the student ever booked or the list is out of date. If someone can’t open the handout, it would be good to find out before she goes home whether the whole class is locked out or one student is holding the key to the wrong school.

We’ll come in on the student’s side. Lin hasn’t decided whether to go. All he sees at first is the course title. As he decides to book, checks his calendar and wonders about a different session, the page has reason to ask a little more of him. Follow him and you’ll see just how many hands that little promise, “You’re enrolled,” has to pass through. When a friend shows you a lovely new button on their phone, by all means admire it. Once they’ve finished, try asking, “Where will the teacher find my name tomorrow?”

## Start with something you’ve already built

I wrote this first for the full-stack AI engineer who has to get a product into people’s hands. Take on the weekend class and on the first day you may never open your editor. The school wants one fewer click. Does Lin want to check the time, or has he decided to book? Eventually you’ll get to the words on the screen, the ID the API returns, the old page that’s still open on the evening you release the new one. On Friday the teacher gets her list and the report says she has one more student than she can find. Off you go again. Does that column count people? What if one of them pressed twice?

Say you mostly build interfaces. This is the first time you’ve followed a booking request all the way to the function that saves it. Does the ID it hands back give your page enough evidence to say “You’re enrolled”? Understand that one stretch and you can keep going. Someone who’s spent years on the back end might stop at the same function with a different question. Suppose the record was saved but the reply never made it to the student. What should the page say then? There’s room on the same page for both of you.

You can also follow one piece of work. The teacher uploads a handout and shuts her laptop. What makes it possible for someone to open it tomorrow? Near the front of the book you’ll meet a progress message. Further in, you’ll find a job record that can still identify the handout after a process restarts. If that’s the part you need, you can go straight to [Who’s still converting the handout once the laptop is closed? (in Chinese)](../../revisions/zh/volume-one-making-of/p5-handout-job.md). The site and the school are invented so we can follow questions like these. When I get to something I’ve actually worked on, I’ll say so.

AI has two jobs in this story. At the workbench it can write an interface and its tests. If both take “You’re enrolled” to mean the same wrong thing, the tests can all go green. Have Lin close the page and open it again. Have the teacher check the list for that particular session. Inside the product, the course assistant tells Lin to meet at the south gate if it rains. Which school’s notice did it read? He asks whether there’s room on Sunday. Who gave the assistant permission to move his booking? Did it actually move him? The evidence for that lives somewhere else.

For now, take a page that already works. You enter your name, press the button and see “Success”. So far, so good. Close the page. What happens when you open it again?

[Read A Page and the System Behind It in Chinese](../../revisions/zh/volume-one-making-of/01-a-page-and-a-system.md) · [Continue in English with How the Browser Builds a Page](02-browser-foundations.md)
