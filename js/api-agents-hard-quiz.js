window.QUIZ_BANK = {
  id: "api-agents-hard",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "ah01",
      domain: "Workflows vs agents",
      select: 1,
      stem: "A fintech team built an agent to process supplier invoices. It was given tools to extract fields from the PDF, look up the purchase order, compare the totals and post a ledger entry. Every invoice goes through those four stages in the same order, and every input is a PDF in one of three supplier templates. In production about 15% of runs end with no ledger entry, and each failed run took a different path, so the team cannot write a regression test that reproduces a failure. What is the best next step?",
      options: [
        { id: "a", text: "Wrap each run in a grader call that checks for the ledger entry and re-runs the agent whenever it is missing" },
        { id: "b", text: "List the four stages in order in the agent's system prompt and instruct it to finish each before the next" },
        { id: "c", text: "Log every tool call, then replay each failed path and turn it into a regression test for the agent" },
        { id: "d", text: "Rebuild the feature as a code-driven sequence of the four stages, calling Claude inside each stage as needed" }
      ],
      correct: ["d"],
      why: "Lesson 69, Agents and workflows, gives the rule of thumb: when you can picture the exact flow of steps, build a workflow; Lesson 75, Workflows vs agents, lists the symptoms this team sees as the downsides of agents (lower successful completion rate; harder to instrument, test and evaluate because you do not know which steps an agent will execute) and the cure as the benefit of workflows (each step is known, so they are far easier to test and evaluate) — with four fixed stages and three known input templates, the task is a workflow candidate, and the lesson's recommendation is to use workflows where possible (d). Option a wraps the unpredictable process in an evaluator-optimizer loop: it retries failures but leaves the path unknown and untestable. Option b keeps Claude in charge of the sequence; the course defines a workflow as a predetermined series of calls driven by your code, and an instruction list does not give you per-step tests. Option c is the lesson note's advice for an agent you have to keep (log tool calls to analyse failures); here the agent is not required, so it treats the symptom rather than the cause."
    },
    {
      id: "ah02",
      domain: "Workflows vs agents",
      select: 1,
      stem: "An e-commerce company's product-description generator is a workflow: fetch the catalogue entry, draft the description, check it against the style guide, store it. It is the company's main revenue feature and an evaluation suite monitors its output. Merchants have started asking for things the workflow cannot do — 'write it in the voice of our spring campaign', 'produce three variants and tell me which did best for similar products', 'compare it with the competitor's listing' — and the requests change from week to week. The product manager proposes rebuilding the whole generator as an agent with catalogue, search and storage tools. The standard descriptions must stay exactly as reliable as they are today. What should the team do?",
      options: [
        { id: "a", text: "Have the drafting step handle the merchant requests through added prompt instructions, keeping the workflow as is" },
        { id: "b", text: "Keep the workflow for standard descriptions and route each merchant request to a new workflow built for its type" },
        { id: "c", text: "Keep the workflow for standard descriptions and add an agent as a separate path for the open-ended requests" },
        { id: "d", text: "Rebuild the generator as an agent and keep the evaluation suite running on its standard descriptions" }
      ],
      correct: ["c"],
      why: "Lesson 75, Workflows vs agents, recommends focusing on workflows where possible and resorting to agents only when they are truly required, and says when each fits: workflows for well-defined processes, agents for unpredictable, varied user requests, since agents can handle novel situations that weren't anticipated during development. The standard descriptions are a well-defined process that already runs as a workflow; the merchant requests change from week to week and include things the workflow cannot do. Keeping the workflow for the first and adding an agent for the second applies that recommendation to each kind of request (c). The course does not present this split as a named pattern; the closest it comes is Lesson 72, Routing workflows, where one product sends different kinds of input down different paths, each with its own workflow, prompts or tools. Option b keeps the split but turns each merchant request type into a new fixed workflow; Lesson 72, Routing workflows, says routing works when you can clearly define categories that cover your use cases, and Lesson 75, Workflows vs agents, lists among the downsides of workflows that you need to know the exact inputs to the flow, and requests that change every week give neither. Option a keeps the merchant requests inside the existing workflow, which by the stem cannot do them; Lesson 75 lists as a downside of workflows that they are far less flexible, dedicated to solving specific types of tasks. Option d moves the standard descriptions onto an agent, which Lesson 75 lists with a lower successful task completion rate and less predictable behaviour than a workflow; the stem requires those descriptions to stay exactly as reliable, and an evaluation suite measures that reliability without restoring it."
    },
    {
      id: "ah03",
      domain: "Workflows vs agents",
      select: 1,
      stem: "A research-assistant agent answers analysts' open-ended requests with search, fetch and spreadsheet tools. QA wrote tests that assert the exact sequence of tool calls for each sample request. A third of the tests fail on any given day although the analysts rate the answers as correct, because the agent reaches the same answer through different tool sequences. The team must keep an automated regression suite. What is the best change?",
      options: [
        { id: "a", text: "Assert on the final answer and end state of each case, and record each run's trace to diagnose failures" },
        { id: "b", text: "Fix the order of tool calls in the system prompt so that every run follows the sequence the tests expect" },
        { id: "c", text: "Replace the agent with a chaining workflow whose steps match the sequences the tests already assert" },
        { id: "d", text: "Assert that each run ends without a tool error, since the exact answer is allowed to vary between runs" }
      ],
      correct: ["a"],
      why: "Lesson 75, Workflows vs agents, explains why the tests are flaky: an agent is harder to instrument, test and evaluate precisely because you often do not know what series of steps it will execute, and the lesson note draws the practical conclusion — judge an agent by its end result (was the task solved) and log the tool calls so failures can be analysed — a trace of each run (a). Option b tries to force a fixed path onto an agent through the prompt; it trades away the flexibility that open-ended requests need and still gives no guarantee of the sequence. Option c would be the lesson's preferred answer if the steps were known, but open-ended analyst requests are the case Lesson 75, Workflows vs agents, reserves agents for, and the tests themselves show that several different sequences lead to a correct answer, so no single chain matches them. Option d keeps the suite green at the price of checking nothing the analysts care about: a run can finish cleanly with a wrong answer, and the lesson note's point is to judge whether the task was solved."
    },
    {
      id: "ah04",
      domain: "Workflows vs agents",
      select: 2,
      stem: "An insurer replaced its claims-letter workflow, in which staff filled in a form and four fixed Claude calls with one narrow prompt each drafted the letter, with a single agent that has the same four capabilities as tools and reads the customer's email as it is. Staff like no longer having to fit each claim into the form's fields, but on the same claim types the letters now contain more factual slips than before. Which two statements explain these two observations? (Choose two.)",
      options: [
        { id: "a", text: "The workflow needed its exact inputs up front, which constrained staff in a way that the agent does not" },
        { id: "b", text: "The agent behaves more predictably than a fixed chain of calls, which is why staff find it easier to use" },
        { id: "c", text: "The agent took more upfront design than the workflow, so its prompts are less tuned to these claim types" },
        { id: "d", text: "Each workflow call kept Claude on one narrow subtask, and that focus generally gives higher accuracy" }
      ],
      correct: ["a", "d"],
      why: "Lesson 75, Workflows vs agents, lists among the downsides of workflows a generally more constrained user experience, because you need to know the exact inputs to the flow, and among the benefits of agents a more flexible user experience; the transcript adds that while workflows expect a very particular set of inputs, agents can create their own inputs based on queries received from the user. That is why staff like handing the agent the email as it is (a). The first benefit of workflows in the same lesson is that Claude can focus on one subtask at a time, generally leading to higher accuracy, and the transcript says this increased focus generally leads to higher accuracy compared to agents, which explains the extra slips on the same claim types (d). Statement b reverses the lesson: more predictable and reliable execution is listed as a benefit of workflows, and less predictable behavior as a downside of agents. Statement c reverses it too: requiring more upfront planning and design work is listed as a downside of workflows, not of agents."
    },
    {
      id: "ah05",
      domain: "Evaluator-optimizer",
      select: 1,
      stem: "A design tool turns a hand-drawn wireframe into a web page with an evaluator-optimizer loop. Step one asks Claude to describe the wireframe; step two has Claude write HTML from that description; step three renders the page to a screenshot; step four asks Claude whether the screenshot matches the step-one description and, if it does not, sends its notes back to step two, for up to five rounds. Most pages are accepted in the first or second round, yet designers keep finding accepted pages that lack small elements drawn in the wireframe, such as a search icon or a secondary button, and spot checks show that the step-one descriptions leave those elements out. What is the best fix?",
      options: [
        { id: "a", text: "Raise the cap on rounds to give step two more chances to add the elements the designers found missing" },
        { id: "b", text: "Send the grader's notes back to step one as well, and regenerate the description on every round" },
        { id: "c", text: "Have step four compare the screenshot with the original wireframe, not with the step-one description" },
        { id: "d", text: "Ask step one for a more detailed description that includes a checklist of every element it sees" }
      ],
      correct: ["c"],
      why: "Lesson 69, Agents and workflows: in the lesson's image-to-CAD workflow the grader is asked to compare the rendering against the original image the user uploaded, and the loop repeats until the grader accepts the output. Here the grader compares the screenshot with Claude's own description from step one, so anything the description left out can never be flagged; judging against the original wireframe restores the reference the pattern relies on, and the missing elements then reach step two as feedback (c). Option a assumes the five-round cap is cutting the loop short, but the pages are accepted in the first or second round — the cycle ends when the grader accepts, so extra rounds would never run. Option b routes notes the grader never writes: a grader that checks against the incomplete description sees no gap to report, so the description is regenerated without being corrected. Option d reduces omissions at the source but leaves the grader checking against an intermediate text, so whatever the description still misses is accepted."
    },
    {
      id: "ah06",
      domain: "Parallelization",
      select: 1,
      stem: "A legal team reviews each uploaded contract against twelve independent checklists. The review is a parallelization workflow: twelve requests, each carrying the full 60-page contract first and then one checklist, are sent at the same moment, and an aggregation call merges the findings. Billing shows that each of the twelve requests pays for the full contract, and prompt caching, which the team enabled on the contract block, reports almost no cache hits. A reviewer must see the merged findings within a couple of minutes of uploading. What should the team change?",
      options: [
        { id: "a", text: "Submit the twelve requests through the Message Batches API, which processes them asynchronously at half price" },
        { id: "b", text: "Merge the twelve checklists into one request so that the contract is read and billed a single time" },
        { id: "c", text: "Send the twelve checks one after another in a chain, passing the previous findings to the next request" },
        { id: "d", text: "Send one request first, wait for its response to begin, and then release the other eleven together" }
      ],
      correct: ["d"],
      why: "The note to Lesson 70, Parallelization workflows, relays the prompt-caching documentation: a cache entry becomes available only after the first response starts, so if you need cache hits for parallel requests, wait for the first response before sending the rest — twelve requests fired at the same instant all miss the cache and each pays for the whole contract (d). Option a does cut the price in half, but the Batches API is asynchronous and most batches finish within an hour, which breaks the minutes-level latency the reviewer needs. Option b is the single massive prompt the lesson warns against: Claude has to juggle twelve sets of criteria at once, losing the focused attention and reliability that motivated the split. Option c makes twelve independent checks sequential, multiplying latency, and Lesson 71, Chaining workflows, reserves chaining for subtasks that depend on one another."
    },
    {
      id: "ah07",
      domain: "Parallelization",
      select: 1,
      stem: "A travel company's itinerary builder sends four requests in parallel for each trip — one picks the flights, one the hotel, one plans the daily activities and one suggests restaurants — and an aggregation call assembles the itinerary. Each request has its own prompt and tools, and each was tested on its own and performs well. Customers complain that the planned activities and restaurants are routinely on the far side of the city from the hotel, and the aggregation call has started adding 'getting around' tips to cover the distance. What is the most likely cause?",
      options: [
        { id: "a", text: "The four requests use different prompts and tools, so each one makes its own assumptions about the trip" },
        { id: "b", text: "The activity and restaurant requests depend on the hotel choice, made in a request running beside them" },
        { id: "c", text: "The aggregation call receives four finished results but has no instructions for resolving conflicts" },
        { id: "d", text: "The activity and restaurant requests have no map tool, so they cannot judge distances within the city" }
      ],
      correct: ["b"],
      why: "Lesson 70, Parallelization workflows: the pattern fits tasks that can be meaningfully separated — each parallel sub-task should be able to operate independently and contribute a distinct piece of analysis to the final decision. Activities and restaurants depend on where the hotel is, and that choice is being made at the same moment in another request, so the plans cannot agree (b); Lesson 71, Chaining workflows, is the pattern for such non-parallelizable subtasks — choose the hotel first and pass its location on, after which activities and restaurants can run in parallel. Option a is the misconception Lesson 70, Parallelization workflows, corrects: parallelized sub-tasks do not need to be identical and can each have a specialized prompt, set of tools or evaluation criteria. Option c puts the fix at the wrong stage: the aggregation call compares finished results and cannot move a hotel or re-plan the days, which is why it is papering over the distance. Option d gives the two requests a way to measure distance but not the hotel's location to measure from, since that is decided in parallel."
    },
    {
      id: "ah08",
      domain: "Parallelization",
      select: 1,
      stem: "A loan-screening workflow evaluates each application in six parallel requests — credit history, income, collateral, fraud signals, regulatory flags and affordability. Each request is built from a shared template that holds the applicant's form answers, followed by a block with that evaluation's own criteria, and an aggregation call issues the recommendation from the six results. Five of the six evaluations have been validated against underwriters' decisions. The fraud evaluation, however, keeps answering that it cannot judge the application without the device and session data, which the platform records with every application. What is the best fix?",
      options: [
        { id: "a", text: "Add the device and session data to the aggregation call, so that it can weigh them against the fraud analysis" },
        { id: "b", text: "Add the device and session data to the shared template, so that every evaluation works from the same inputs" },
        { id: "c", text: "Add the device and session data to the fraud request's own block, so that its criteria can be applied to them" },
        { id: "d", text: "Add a seventh parallel request for the device and session data, so that it reports fraud signals by itself" }
      ],
      correct: ["c"],
      why: "Lesson 70, Parallelization workflows: the parallelized sub-tasks do not need to be identical — each can have a specialized prompt, set of tools or evaluation criteria — and easier optimization is listed as a benefit: you can refine one evaluation without affecting the others. Putting the device and session data into the fraud request's own block gives that evaluation what its criteria need and leaves the five validated evaluations exactly as they were (c). Option a works at the wrong stage: the aggregation call compares the finished analyses, and the fraud analysis it receives still says it cannot judge. Option b changes the inputs of all six requests, including the five validated ones, which would then need validating again and would have to ignore material unrelated to their criteria — the opposite of the focused attention the pattern is for. Option d adds a seventh analysis but leaves the fraud evaluation without the data its criteria call for, so the aggregator still receives a fraud verdict that says it cannot judge, next to device findings that lack the application's context."
    },
    {
      id: "ah09",
      domain: "Chaining",
      select: 1,
      stem: "A content team's chain has four steps, each a separate Claude request built from its own template: choose a topic from a trending list, research the topic, write a 60-second video script, write a title from the script. The research step returns rich, specific material several thousand tokens long, and the titles match the scripts, yet the scripts read as broad overviews of the topic. The script request is its template filled in with the topic chosen in step one: the house style guide, which asks for a friendly tone for a wide audience, the topic, and the instruction 'Using the research you did in the previous step, write the script.' What is the most likely cause of the generic scripts?",
      options: [
        { id: "a", text: "The script request holds none of the research, since each call keeps no memory of the calls before it" },
        { id: "b", text: "The research is too long to fit in the script request, so it is left out and the model writes from what it knows" },
        { id: "c", text: "The style guide's call for a wide audience outweighs the research, so the model trades the specifics for reach" },
        { id: "d", text: "The 60-second format leaves no room for the research, so the model condenses it into a broad overview" }
      ],
      correct: ["a"],
      why: "Lesson 71, Chaining workflows: a chain splits the work into focused steps that build on each other, and in the lesson's own example the follow-up request provides the article Claude just wrote together with targeted revision instructions. Lesson 06, Multi-turn conversations, explains why each step's input has to be passed in: Claude does not store the conversation, and each request is completely independent and knows nothing about the previous ones. The script request is filled in with the topic only; its instruction points to research that Claude did in another request, which this request does not contain, so Claude writes from general knowledge (a). Option b also has the research missing but blames its length; nothing in the chain drops it, since the template has no place for it, and the documentation (Context windows) gives Claude models a context window of 1M or 200k tokens and answers an input that is too long with a 400 error, not by trimming it. Options c and d blame how the model weighs the research against the style guide or condenses it for the 60-second format, but the research never reaches the script request, so there is nothing to weigh or condense."
    },
    {
      id: "ah10",
      domain: "Chaining",
      select: 1,
      stem: "A retailer writes product descriptions with a two-step chain: a first request drafts the text, and a second request revises it to remove any price and any name on the company's list of competitors. Quality is now good, but the second request doubled the cost per description, and a sample shows that about one draft in ten contains a price or a listed competitor. Quality must not drop. What is the best change?",
      options: [
        { id: "a", text: "Drop the revision request and add worked examples of compliant descriptions to the drafting prompt" },
        { id: "b", text: "Check each draft in code for prices and competitor names, and pass flagged drafts to the revision call" },
        { id: "c", text: "Ask the drafting request to check its own output against the constraints and correct it before replying" },
        { id: "d", text: "Enable prompt caching on the revision request, billing the draft it receives at the cached rate" }
      ],
      correct: ["b"],
      why: "Lesson 71, Chaining workflows, lists as advantages of chaining that you can do non-LLM processing between tasks and that chaining suits cases where you need to process or validate outputs between steps; the lesson note describes such checks as gates — simple code that runs the revision step only when it finds a problem. Prices and names from the company's competitor list are patterns that simple code can find, so most drafts skip the second request while the flagged ones are still revised (b). Option a removes the step that is catching the violations and relies on the drafting prompt, but the lesson's long-prompt problem is that Claude may keep violating constraints however carefully the prompt is written. Option c folds revision back into the drafting request, which the lesson says loses the focus that made the two-step approach work: Claude has to balance writing with constraint adherence. Option d misapplies Lesson 50, Prompt caching, which says caching is useful only when you send the same content again: every draft is new content, and the revision call still runs and is billed for its output, so the cost per description barely moves."
    },
    {
      id: "ah11",
      domain: "Routing",
      select: 1,
      stem: "A support assistant routes each ticket with a classification call into one of three pipelines, each with its own prompt and tools: billing works with the invoice tools, technical with the incident-record tools and account with the profile tools. Since an outage last month, tickets asking for a service credit on the next invoice have been labelled 'billing', and the billing pipeline has been quoting credit amounts that are wrong. The classifier's evaluation set still passes. What is the best fix?",
      options: [
        { id: "a", text: "Add examples to the classification prompt so that credit requests are labelled 'technical' from now on" },
        { id: "b", text: "Forward tickets that mention an outage and an invoice to both the billing and the technical pipelines and merge the replies" },
        { id: "c", text: "Give the classification call access to the incident records so it states the correct credit before forwarding the ticket" },
        { id: "d", text: "Define a new category for credit requests whose dedicated pipeline carries both invoice and incident tooling" }
      ],
      correct: ["d"],
      why: "Lesson 72, Routing workflows, makes two points that decide this: routing works when you can clearly define categories that cover your use cases, and each pipeline carries its own workflow, prompts or tools optimized for its category. A request that needs both invoice and incident tools is a use case none of the three categories covers — the classifier labels it as designed, which is why its evaluation set passes — so the fix is a category of its own with a pipeline equipped for it (d). Option a relabels the tickets into the technical pipeline, which has the incident tools but no invoice tools — the same failure from the other side. Option b abandons the architecture's key property that input goes to one specialized pipeline; each pipeline would still answer with half the tools, and merging two incomplete replies does not produce a correct credit. Option c asks the router to answer the ticket, but the router's job is categorization; the specialized processing happens in the pipeline."
    },
    {
      id: "ah12",
      domain: "Routing",
      select: 2,
      stem: "A team is reviewing the design of a routing workflow for a content tool that classifies a user's topic into one of six genres and then generates a video script. Four statements appear in the design document. Which two are consistent with the course? (Choose two.)",
      options: [
        { id: "a", text: "The pipelines can share one prompt template with the genre filled in as a variable, since the router has already chosen it" },
        { id: "b", text: "The router can send a borderline topic to its two most likely pipelines, so that the better of the two scripts is kept" },
        { id: "c", text: "The classification call can run on a smaller model than the pipelines, since labelling the topic is the simpler task" },
        { id: "d", text: "A pipeline can be an entire workflow with its own tools and prompts, since each one serves a single genre" }
      ],
      correct: ["c", "d"],
      why: "Lesson 72, Routing workflows, describes each pipeline as able to have its own workflow, prompts or tools optimized for its category (d); the lesson note on a cheap model for the router points out that classification is a simple task and cites the example from Anthropic's 'Building effective agents' of sending simple requests to a smaller model such as Haiku, so the categorization call need not run on the model the pipelines use (c). Statement a undoes the point of routing: the lesson starts from the fact that a single generic prompt cannot handle educational and entertainment topics effectively, and gives each category its own specialized prompt template. Statement b breaks the architecture's key insight that user input goes to one specialized pipeline, not several, which is what lets each pipeline be optimized for its category; the lesson also weighs routing by whether the benefit of specialized processing outweighs the overhead of the routing step, and running two pipelines per topic adds to that overhead."
    },
    {
      id: "ah13",
      domain: "Agents & tools",
      select: 1,
      stem: "An office assistant agent has three tools: find_rooms, check_availability and book_room. Requests that need one tool, such as 'which rooms have a projector?', are answered well. Requests that need several, such as 'book a room with a projector for 3 pm', end with a reply like 'Let me check which of these rooms is free at 3 pm', and nothing is booked. In the logs, the last API response of every such run has stop_reason 'tool_use' and a call to check_availability. What is the most likely cause?",
      options: [
        { id: "a", text: "The application stops after one tool round instead of running each further call and returning its result" },
        { id: "b", text: "check_availability returns its results in a shape Claude cannot use, so the run ends before any room is booked" },
        { id: "c", text: "The system prompt does not say that tools may be used one after another, so Claude stops after the first one" },
        { id: "d", text: "The max_tokens limit is too low, so the response is cut off before Claude can make the remaining tool calls" }
      ],
      correct: ["a"],
      why: "Lesson 73, Agents and tools: the real power of agents lies in their ability to combine simple tools, and Claude chains them — for 'What day of the week is it in 11 days?' it calls get_current_datetime followed by add_duration_to_datetime; that chaining rests on the loop recalled in the lesson's note: Claude asks for a tool, your code runs it, and the result goes back. Lesson 34, Implementing multiple turns, says the key to whether Claude wants a tool is stop_reason, which is 'tool_use' when it does, and the loop keeps going until Claude gives a final answer without asking for tools; the documentation (Handling stop reasons) defines 'tool_use' as Claude calling a tool that you need to run. A last response with stop_reason 'tool_use' is Claude asking for check_availability; the run ended there, so the application never executed the call or sent its result back (a). Option b blames the tool's output, but the call in the last response was never executed, so none of its results reached Claude. Option c assumes Claude stopped of its own accord, yet its last response is a request for the next tool. Option d would end on stop_reason 'max_tokens', which the same documentation defines as Claude stopping because it reached the max_tokens limit, not on 'tool_use'."
    },
    {
      id: "ah14",
      domain: "Agents & tools",
      select: 1,
      stem: "A social-video agent has three tools: write_script; make_video, which generates a cover image, synthesizes the voice-over and assembles the clip with FFmpeg in a single call; and post_media. Plain 'make and post a video about X' requests work well. Customers now want to step in along the way: one wants to choose between two cover images before anything else is made, another wants to hear the voice-over before the clip is assembled, and a third wants the voice-over redone, and nothing else, after seeing the first cut. Where customers step in differs from request to request. What should the team change?",
      options: [
        { id: "a", text: "Add a review flag to make_video so that it pauses after the cover image, the voice-over and the clip for approval" },
        { id: "b", text: "Replace make_video with image, speech and FFmpeg-through-bash tools so that the agent decides where to pause" },
        { id: "c", text: "Have the system prompt tell the agent to ask each customer where they want to step in, so it can plan the run up front" },
        { id: "d", text: "Add preview_cover and preview_voice tools so that those assets can be approved before make_video is called" }
      ],
      correct: ["b"],
      why: "Lesson 73, Agents and tools, recommends tools that Claude can combine in creative ways and uses this very product: bash with FFmpeg, generate_image, text_to_speech and post_media together support both the plain create-and-post flow and interactive ones in which the agent generates a sample image first, gets the user's approval and then proceeds — adapting to feedback and preferences in a way that would be difficult with a rigid workflow. make_video is a rigid workflow packed into one tool; splitting it into step tools lets the agent stop, show, redo or continue wherever a request needs (b). Option a adds pauses at three fixed points inside the bundled tool; it still cannot produce two covers to choose from or redo the voice-over alone after the cut without re-running every stage. Option c has the agent ask in advance, but the bundled tool still cannot stop part-way, and the third customer decides after seeing the cut. Option d bolts dedicated preview tools onto the bundle for two foreseen interventions — the hyper-specialized approach Lesson 73, Agents and tools, contrasts with abstract tools; make_video still generates its own cover and voice-over, and the next kind of intervention needs yet another tool."
    },
    {
      id: "ah15",
      domain: "Environment inspection",
      select: 1,
      stem: "An agent posts short videos to a social platform through a post_media tool. The video is assembled with FFmpeg earlier in the run, which prints several hundred lines. The platform's upload call answers with HTTP 204 and an empty body on success, and post_media returns that empty body to Claude as its result. Reviewing traces, the team sees that in most runs the agent calls post_media two or three times, each time remarking that it will try again, and the platform shows duplicate posts. The platform offers no de-duplication, and each duplicate costs the customer money. What is the most likely cause?",
      options: [
        { id: "a", text: "The system prompt lacks a rule that post_media is called once per video, so the agent repeats the call to be safe" },
        { id: "b", text: "The empty tool result gives the model no evidence that the upload went through, so it treats the action as not done" },
        { id: "c", text: "The upload is slow, so the agent issues a second post_media call before the first one has returned" },
        { id: "d", text: "The FFmpeg output earlier in the run crowds out the tool result, so the agent loses track of the posts it already made" }
      ],
      correct: ["b"],
      why: "Lesson 74, Environment inspection: Claude operates blindly and needs to observe the results of its actions; the lesson's design question is 'How will Claude know if this action worked?' and one of its concrete answers is checking API responses for expected data. An empty tool result is no observation at all, so the agent cannot tell a successful post from a failed one and does what the traces show — tries again (b); the fix is to return something observable, such as the post's id or URL, or to let the agent look the post up. Option a adds a rule where the agent lacks information; a rule cannot tell it whether the first call succeeded. Option c assumes the agent fires a second call while the first is still running, but in the tool-use loop the application executes each requested tool and sends the result back before Claude continues (the loop recalled in the note to Lesson 73, Agents and tools), so every retry comes after the empty result has arrived. Option d has no support in the traces: nothing is dropped from the context, and the agent sees its own first call — it repeats it because the result told it nothing, not because it forgot."
    },
    {
      id: "ah16",
      domain: "Environment inspection",
      select: 1,
      stem: "A team built a dependency-upgrade agent that works on customer repositories. Its tools are write_file and run_tests, and the system prompt tells it which framework version to move to. In practice it overwrites configuration files with content that references modules the repository does not have, and the team has been pasting a description of each repository's layout into the prompt by hand. Repositories differ from customer to customer and cannot be described in advance. What should the team add first?",
      options: [
        { id: "a", text: "Add a grader call that compares each written file with the test results and sends the agent back to fix it" },
        { id: "b", text: "Add tools that let the agent list, search and read the code of whichever project it is working on" },
        { id: "c", text: "Add each repository's file tree to the system prompt automatically when the agent starts a run" },
        { id: "d", text: "Add a router that sorts each repository by framework and hands it to a pipeline built for that framework" }
      ],
      correct: ["b"],
      why: "Lesson 74, Environment inspection: before Claude can modify a file it needs to understand its current contents — read before write — and when designing an agent you should provide tools and instructions that let Claude observe the results of its actions. An agent with write_file and run_tests can act but cannot look, so it writes configuration for a repository it has never seen; listing, searching and reading tools (the glob, grep and read tools of Claude Code in Lesson 73, Agents and tools) let it discover the layout and contents itself, which is what the varying repositories require (b). Option a checks after the damage is done and still leaves the agent writing blind on the next file. Option c automates the hand-written description, but a tree is a list of names: the agent still cannot read the files it is about to overwrite. Option d specializes the work by framework, but each pipeline still writes to a repository it cannot see, and Lesson 72, Routing workflows, ties routing to categories that cover your use cases, while these repositories differ from customer to customer within the same framework."
    },
    {
      id: "ah17",
      domain: "Environment inspection",
      select: 2,
      stem: "A reporting agent builds each customer's monthly PDF report by writing a plotting and layout script, running it with its bash tool and emailing the file. Its system prompt tells it to check its work, and traces show that after every run it reads the script's console output and lists the output folder to confirm that the PDF was written, then emails it. Customers have begun returning reports whose chart labels overlap and cannot be read, and some reports lack a section the customer asked for. Which two changes to the system prompt address the root cause? (Choose two.)",
      options: [
        { id: "a", text: "Tell the agent to render each page to an image and look at the images before it emails the report" },
        { id: "b", text: "Tell the agent to list the customer's requested sections in a comment at the top of the script before writing it" },
        { id: "c", text: "Tell the agent to check the finished report against the customer's request before it emails the file" },
        { id: "d", text: "Tell the agent to extract the report's text and confirm every chart label is present before it emails it" }
      ],
      correct: ["a", "c"],
      why: "Lesson 74, Environment inspection: the design question is 'How will Claude know if this action worked?', and the transcript stresses that Claude needs a way of evaluating the result of an action, often beyond whatever a tool returns. The agent's checks show that the script ran and that a file exists; they never look at the report itself. The lesson's system-prompt instructions for the video agent are the model: use FFmpeg to extract screenshots from the video to visually inspect the output, and compare the generated content against the original requirements, so that output can be verified before the task is considered complete. Rendering the pages and looking at them catches unreadable labels (a), and checking the finished report against the request catches a missing section (c). Option b plans the sections before the script is written but still gives the agent no way to see whether the finished report contains them. Option d does inspect the output, but through its text: overlapping labels are a visual defect, and every label is present in the text even when two are drawn on top of each other, which is why the lesson's video agent looks at screenshots; it also does nothing for the missing section."
    }
  ]
};
