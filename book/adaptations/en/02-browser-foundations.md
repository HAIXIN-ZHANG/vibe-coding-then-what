# How the Browser Builds a Page

You can see the course title. You can type into the search box. You’ve even pressed Search. The list of courses hasn’t budged.

In the previous chapter we followed a request from a course page to the service and its database. This time we’ll stay in the browser. It has some work to do before a title can appear on the screen, and quite a bit left to do afterwards. We’ll use the same fictional course site and keep just a heading, a search field, a button and a few course cards. Watch what each one is waiting for.

## Three ways a search can keep you waiting

You open the course list. There’s no heading yet. “This site’s a bit slow,” you say. On another visit the heading and search box are already there. You type a few words, but the Search button is still disabled. Later the button is available. You press it and there’s a long pause before anything changes. “A bit slow” will do for all three, at least until someone asks you to fix it.

Has the content arrived? Can the browser draw it? Has the page set up its search behaviour? Has the code that handles a click had a chance to run? Several of these questions can matter on the same visit. A blank screenshot gives us little to go on about the speed of the server. A screenshot of a button tells us remarkably little about what will happen if we press it.

Let’s settle a few details about this particular page. Its initial HTML includes the heading, the search field and some course cards. The head of the document refers to an external stylesheet. JavaScript will take care of search. The button has `type="button"` and starts out disabled. The script installs the handler and only then enables the button.

We chose the disabled state to let students see when this search is ready. Other sites can make a different choice. For the rest of the chapter, that’s the button we’re watching.

## From incoming text to a document you can change

What arrives as HTML is text. The browser has to pick out elements and their relationships to build a document. Here’s a piece of the structure. It has just enough in it to talk about the controls.

```html
<h1>Find your next course</h1>
<label for="query">Course keywords</label>
<input id="query" type="search">
<button id="search" type="button" disabled>Search</button>
<section class="course-card">Browser fundamentals</section>
```

The label belongs to the input because its `for` value matches the input’s `id`. The `disabled` attribute makes the button unavailable. The browser already knows what both of those things mean.

After parsing there’s a heading node, an input node, a button node, and a place for each in the document. A program can find them, read them and change them. This representation is the **Document Object Model**, or DOM. Changing the course title can be as simple as replacing the text in one of its nodes. [HTML parsing model](https://html.spec.whatwg.org/multipage/parsing.html#overview-of-the-parsing-model)

CSS supplies visual rules. How large is the heading? How wide is a card? How much space should there be between the input and the button? The browser organises the style rules into a representation called the **CSS Object Model**, or CSSOM. Rules can now be matched to that course card in the document.

JavaScript can attach behaviour to the document. Our script finds the button and registers a function to run when someone clicks it. That’s what *adding an event listener* means here. Once the search returns results, the program can replace the course list.

HTML also comes with behaviour of its own. A link can take you to another page. A form can submit according to the rules of HTML. The student can usually type into a plain search field as soon as it’s available. We’ve given our button a different arrangement. It stays disabled while it waits for the script that implements search. The controls on a page can come to life at different times.

So far we have a heading in a document the browser built from the HTML. There’s still the small matter of how big to make it and where on the screen to put it.

## What the browser can do while the files arrive

The browser can usually start parsing the HTML while the rest of it is still arriving. As it finds references to stylesheets and scripts it discovers other resources to fetch. A picture at the bottom of the site can still be on its way while you’re reading the first line.

Consider the stylesheet in the head of our document. Assume it’s enabled, applies to screens and supplies rules the browser needs for the page’s initial appearance. Until it has fetched and processed those rules, the browser may hold off displaying content. That’s one kind of **render-blocking** dependency.

HTML parsing can continue during that wait. A stylesheet meant only for print is a different proposition when you’re looking at a screen. The useful question is which rules this particular display depends on. [Render-blocking resources and the critical path](https://web.dev/learn/performance/understanding-the-critical-path#render-blocking-resources)

Scripts can hold up something else. A script can change the document the parser is in the middle of building. Take an **external classic script encountered by the parser in the initial HTML**. There are three common arrangements.

| Script attributes | While the file is fetched | When the script runs |
| --- | --- | --- |
| Neither `async` nor `defer` | The parser waits for the fetch and execution. | The parser continues past the script once that work is done. |
| `defer` | Fetching can overlap parsing. | It runs after parsing. Multiple scripts of this kind run in document order. |
| `async` | Fetching can overlap parsing. | It runs as soon as it’s ready, possibly interrupting parsing. Document order gives no execution-order guarantee across these scripts. |

It’s the *fetch* that can overlap parsing. These attributes don’t move the JavaScript onto a second execution thread. Module scripts and scripts added dynamically have rules of their own. On our page the search script needs to find the button. Has the parser reached it yet? What if the handler uses a function supplied by another script? Adding `async` everywhere could exchange a wait for a missing function. [The HTML script element](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)

Even while the parser waits, a browser may scan ahead for resource references and start fetching those files. A stylesheet can also hold up a script that needs to run, which in turn can hold up parsing. Follow the dependencies on the actual page. In our first wait, applicable styles at the head of the document can delay the heading’s appearance. In the second, the heading and the input can be on screen while a late or failed script leaves Search disabled. Those are two different places to look.

## How a heading finds its place

Suppose the styles we need are ready. The browser works out which rules apply to the heading and computes values such as its font size and colour. That’s **style calculation**. It still needs to determine the heading’s width and height, the position of the first card and where the next one will start. That’s **layout**.

With the geometry worked out, there’s visual content to draw, including the letters, the background and the border. That part is **paint**. **Compositing** brings visual pieces together for presentation. A course card needs both a place on the screen and something to show there.

### How the heading reaches the screen

```text
HTML → DOM ─────────┐
                    ├→ Compute applicable styles
CSS  → style rules ─┘              ↓
                           Work out geometry
                                   ↓
                           Paint visual content
                                   ↓
                          Composite and present
```

Read the arrows as dependencies. The document supplies the heading and its relationships. The rules supply its style. Together they give the browser what it needs to determine the heading’s size and position, draw it and present it. The diagram doesn’t assign those jobs to particular threads. DOM nodes and layout boxes needn’t correspond one for one either.

Suppose you change just the text colour on our card. The words can stay the same size and in the same place, so the browser can skip a new layout. Now narrow the card until a long title wraps onto a second line. The card may grow taller. The next card may have to move down. Both changes could start with a single property in the editor. They’ve given the browser different jobs to do. [The pixel pipeline](https://web.dev/articles/rendering-performance#the_pixel_pipeline)

For much the same reason, a change to the DOM needn’t cause the entire page to be laid out and painted again. Ask which visible things actually depend on the change. And keep these two moments apart for later. At one moment the code has changed the document. At another, the browser has done enough visual work for a student to see the result.

## The button is there. Who gets the click?

Back at our search box, the script finds the button, adds the listener and enables the control. Our search now has the pieces we said it needed. If the fetch failed or the script threw an error before it got that far, a perfectly legible heading might sit above a permanently disabled button. Check the setup and the error before investigating the speed of the search API. It may never have received a call.

Even a successfully installed handler has to get a turn to run. On an ordinary page, most of its JavaScript and much of the document parsing, style and layout work involve the **main thread**. A long stretch of synchronous computation can keep other work that needs that thread waiting. [Tasks and the main thread](https://web.dev/articles/optimize-long-tasks#what_is_the_main_thread)

Suppose we enable search and then start an expensive synchronous pass through the courses. The student clicks the enabled button partway through. The listener exists. Its handler may still have to wait until the current work finishes. The old list can stay on screen throughout, a fair imitation of a button that does nothing. That appearance alone can’t tell us that the click was lost for good, or that the listener was missing.

## What’s waiting while a search is running?

This time the handler does get to run. We want to show “Searching”, filter the courses, then show the matches. Follow the operations in order.

```text
On a search click:
  Change the status text to “Searching”
  Run a lengthy synchronous filter
  Write the matches into the list
  Change the status text to “Search complete”
```

That first change really happened in the DOM. It was followed immediately by a stretch of computation. By the time the browser has a chance to present a new frame, the same node may already say “Search complete”. If you step through the program, you’ll meet “Searching” on the way. The person who pressed the button might never see it.

**Changing the DOM gives no guarantee that the very next frame will show that change.** To find out what a particular page presented, look at the execution and rendering record.

Browsers schedule units of work called **tasks**. Handling an input event can start a task. Its handler can call half a dozen functions before it returns. Each function call doesn’t buy the browser a break to update the screen. The **event loop** helps choose and run the work that’s ready. While code keeps running, other work may have to wait. There are different sources of tasks. You can’t infer the order of everything a page does by drawing one long queue.

Try another implementation. The handler starts an asynchronous request to the server and awaits its result. While the request is outstanding, the function can suspend its remaining work. The main thread is free to do other things. Waiting for the list to come back takes time, but the function doesn’t need to spend that time on the CPU.

Now try putting `async` on our expensive filter. The computation hasn’t acquired a thread of its own. An `async` function runs synchronously up to its first `await`. Ordinary computation after the wait also takes execution time on the thread that runs it. The response can arrive promptly and the page can still be unresponsive while it processes all those courses. [How async functions run](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description)

Here’s one possible sequence. Read each row from left to right. The spacing is there to show order, not elapsed time.

```text
Resource:   Start request ── wait for response ── response arrives
Execution:  Start and suspend   do other work     → resume → change DOM
Display:    Previous frame ────────────────────────────────→ update when possible
```

These are three views of the same search. The resource can arrive before the waiting code gets a turn. That code can change the DOM before the screen updates. The rows don’t represent three dedicated threads, and none of the arrows promises a particular frame on the next screen refresh.

One more detail if you’re following an `await` in your own code. Promise continuations use **microtasks**. At a microtask checkpoint, the browser keeps processing pending microtasks, including ones added along the way. Awaiting a Promise that has already settled doesn’t guarantee a frame before your function continues. The HTML processing model gives tasks, microtask checkpoints and rendering opportunities distinct roles. [Event loop processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

The page’s main thread is only part of the browser. A network fetch can keep making progress. Some scrolling of content that’s already on screen can use the compositor, so being able to scroll proves little by itself about whether the main thread is free. A Web Worker gives certain computations a separate JavaScript execution environment. It can exchange messages with the page, but it can’t reach in and edit the page’s DOM. [Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#web_workers_api)

Before we give this small school a second place to run JavaScript, it’s worth finding out what we’re waiting for. Which result is outstanding? Which bit of code is still working? Did the intermediate state have a chance to appear? The answers help us choose whether to do less work, split it up or move some of it elsewhere.

## Where would you look next?

| What you can see | One possible explanation | Evidence to look for |
| --- | --- | --- |
| The heading hasn’t appeared. | The HTML or a resource needed for display may still be on its way. Execution or rendering work may also be waiting. | In Network, check resource status, order and dependencies. Line them up with a Performance recording of the load if needed. |
| The heading is visible. Search is disabled. | The script may be late, may have failed, or may still be waiting for a condition it needs during setup. | Check the script request, Console errors and the code that installs the handler and enables the button. |
| Search is enabled. Handling the click or showing feedback takes time. | The main thread may be occupied. The handler may already have started and be waiting for something else. | Compare the time of input with the start of handling, main-thread activity, related requests and changes in feedback. |

A script can be slow to arrive *and* do too much work when it gets there. A different site might disable its button for a business reason. Each row gives us a next observation to make.

For instance, in the **Network** panel in Chrome DevTools, find the search script. Is its request still pending? Has the request for matching courses even gone out? Look at the Timing breakdown. Waiting for the first byte includes a network round trip and the time the server takes to prepare its response. You can’t read back-end execution time straight from that number. Even the time shown for reading the response body can be affected by the browser being busy. [Network timing explained](https://developer.chrome.com/docs/devtools/network/reference#timing-explanation)

If the script is in and the button is enabled, record the interaction in **Performance**. Line up the input, main-thread activity and visual updates. Did a job ahead of the handler keep it waiting? Or did the handler start on time and then wait for a response? Bring in the Console errors and the actual condition for enabling the button as you narrow it down. [Capture and analyse a performance recording](https://developer.chrome.com/docs/devtools/performance/overview#capture-and-analyze-a-performance-report)

Try one last question. The search field is visible and the script request returned `200`. How do you know the search works?

You don’t, yet. The script may have arrived without finishing execution. It may have failed just before installing the listener. The listener may be in place behind a long stretch of other work. Check the button’s readiness condition, try the search and see what happens to the results.

You may also see `DOMContentLoaded`. By that milestone the HTML has been parsed and the relevant deferred scripts have run. It doesn’t wait for all images or for `async` scripts. Stylesheets can affect its timing indirectly when scripts have to wait for them. It’s a useful clue to the progress of a load. The browser has no idea that a working course search happens to be the entire reason Lin opened the page. [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)

If you want AI to help with the investigation, give it something to investigate. What was missing from the screen? Which action produced no feedback? Which resources had arrived? Was there an error, or a stretch of activity worth looking at in the recording? Ask it to explain how those pieces might depend on each other, then check its account against this page. If its suggestion is “make the script asynchronous”, you now have a few fairly specific follow-up questions.

The heading appeared, the button became available, the request went out. You know where to look for evidence of each. The teacher has something else in mind. She’d like the class to read a handout before they meet. Once she uploads it and closes her laptop, who’s still there to do the work?

## Sources and further reading

- How characters and tokens become a document. [HTML parsing model, WHATWG](https://html.spec.whatwg.org/multipage/parsing.html#overview-of-the-parsing-model)
- How script declarations affect fetching and execution, including the external classic scripts in our table. [The script element, WHATWG](https://html.spec.whatwg.org/multipage/scripting.html#the-script-element)
- Which resources can hold up rendering and which can hold up parsing. [Understanding the critical path, web.dev](https://web.dev/learn/performance/understanding-the-critical-path#render-blocking-resources)
- Style, layout, paint and compositing, including the work some visual changes can skip. [Rendering performance, web.dev](https://web.dev/articles/rendering-performance#the_pixel_pipeline)
- Why a long task can delay the next interaction. [Optimise long tasks, web.dev](https://web.dev/articles/optimize-long-tasks#what_is_the_main_thread)
- What the document milestone waits for. [DOMContentLoaded, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
- The synchronous part of an asynchronous function and what happens after a wait. [Async functions, MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#description)
- How task selection, microtask checkpoints and rendering opportunities fit together. [Event loops, WHATWG](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)
- What a worker can do and how it communicates with its page. [Using Web Workers, MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#web_workers_api)
- Where to inspect a request and record an interaction. Panel details can change between versions. [Network timing](https://developer.chrome.com/docs/devtools/network/reference#timing-explanation) and [Performance recordings](https://developer.chrome.com/docs/devtools/performance/overview#capture-and-analyze-a-performance-report) in Chrome DevTools.

[Revisit A Page and the System Behind It in Chinese](../../revisions/zh/volume-one-making-of/01-a-page-and-a-system.md)
