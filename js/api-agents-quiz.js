window.QUIZ_BANK = {
  id: "api-agents",
  passPercent: 70,
  questions: [
    {
      id: "g01",
      domain: "Workflows vs agents",
      select: 1,
      stem: "Your app converts an uploaded photo of a part into a STEP file, always via the same steps. Which architecture fits best?",
      options: [
        { id: "a", text: "An agent with a large set of general tools" },
        { id: "b", text: "A workflow: a predetermined series of Claude calls, since you can picture every step in advance" },
        { id: "c", text: "A single prompt with no code around it" },
        { id: "d", text: "Computer Use" }
      ],
      correct: ["b"],
      why: "Use workflows when you know the exact flow; agents when you can't predict the task or its parameters."
    },
    {
      id: "g02",
      domain: "Workflows vs agents",
      select: 1,
      stem: "Which statement correctly describes an agent, as defined in the course?",
      options: [
        { id: "a", text: "A fixed pipeline of prompts executed in order" },
        { id: "b", text: "Claude is given a goal and a set of tools and is expected to figure out how to reach the goal with those tools" },
        { id: "c", text: "Any request that uses a system prompt" },
        { id: "d", text: "A model fine-tuned for one task" }
      ],
      correct: ["b"],
      why: "In agents Claude plans and directs its own tool use; in workflows your code defines the path."
    },
    {
      id: "g03",
      domain: "Workflows vs agents",
      select: 2,
      stem: "Which TWO are downsides of agents compared with workflows?",
      options: [
        { id: "a", text: "Lower successful task completion rate" },
        { id: "b", text: "Harder to instrument, test and evaluate, since the sequence of steps is unknown in advance" },
        { id: "c", text: "They cannot ask users for more information" },
        { id: "d", text: "They cannot use tools" }
      ],
      correct: ["a", "b"],
      why: "Agents gain flexibility (novel tasks, asking for input) at the cost of reliability and testability."
    },
    {
      id: "g04",
      domain: "Workflows vs agents",
      select: 1,
      stem: "A product manager wants 'an AI agent' for a support form with five fixed request types. What does the course recommend?",
      options: [
        { id: "a", text: "Always build an agent; users expect it" },
        { id: "b", text: "Prefer a workflow where possible and use agents only when truly required; users care about reliability, not architecture" },
        { id: "c", text: "Use both an agent and a workflow for every request" },
        { id: "d", text: "Avoid Claude entirely" }
      ],
      correct: ["b"],
      why: "Workflows give the predictability most production apps need; reach for agents only for open-ended needs."
    },
    {
      id: "g05",
      domain: "Evaluator-optimizer",
      select: 1,
      stem: "In the evaluator-optimizer pattern, what happens when the grader rejects the producer's output?",
      options: [
        { id: "a", text: "The workflow stops with an error" },
        { id: "b", text: "Feedback goes back to the producer, which improves the output, and the cycle repeats until the grader accepts it" },
        { id: "c", text: "The grader rewrites the output itself" },
        { id: "d", text: "The user is asked to grade it manually" }
      ],
      correct: ["b"],
      why: "Producer → grader → feedback loop → accepted output. In practice, also cap the number of iterations."
    },
    {
      id: "g06",
      domain: "Parallelization",
      select: 1,
      stem: "Your material recommender gives inconsistent results with one huge prompt containing criteria for six materials. What does the parallelization pattern suggest?",
      options: [
        { id: "a", text: "Add even more criteria to the same prompt" },
        { id: "b", text: "Send one request per material with specialized criteria at the same time, then aggregate the analyses in a final Claude call" },
        { id: "c", text: "Ask the user to pick the material" },
        { id: "d", text: "Chain the six materials one after another, each depending on the previous" }
      ],
      correct: ["b"],
      why: "Split into independent sub-tasks, run them in parallel, then aggregate into one decision."
    },
    {
      id: "g07",
      domain: "Parallelization",
      select: 2,
      stem: "Which TWO are benefits of parallelization named in the course?",
      options: [
        { id: "a", text: "Each sub-task prompt can be tested and improved independently" },
        { id: "b", text: "Adding a new option is just another parallel request, without rewriting existing prompts" },
        { id: "c", text: "It removes the need for an aggregation step" },
        { id: "d", text: "It guarantees lower token usage than one prompt" }
      ],
      correct: ["a", "b"],
      why: "Focused attention, easier optimization, better scalability and reliability. It usually uses more tokens, not fewer."
    },
    {
      id: "g08",
      domain: "Parallelization",
      select: 1,
      stem: "Must the parallel sub-tasks in a parallelization workflow be identical?",
      options: [
        { id: "a", text: "Yes, they must use the same prompt" },
        { id: "b", text: "No, each can have its own specialized prompt, tools or evaluation criteria" },
        { id: "c", text: "Yes, otherwise aggregation is impossible" },
        { id: "d", text: "No, but they must use different models" }
      ],
      correct: ["b"],
      why: "The course stresses that parallel sub-tasks don't need to be identical."
    },
    {
      id: "g09",
      domain: "Chaining",
      select: 1,
      stem: "Claude keeps adding emojis and mentioning it is an AI despite a long list of constraints. What chaining fix does the course show?",
      options: [
        { id: "a", text: "Repeat the constraints three times in capital letters" },
        { id: "b", text: "Accept the first draft, then send a focused follow-up request with the draft and targeted revision steps" },
        { id: "c", text: "Lower max_tokens" },
        { id: "d", text: "Switch to parallel requests" }
      ],
      correct: ["b"],
      why: "A separate revision step lets Claude focus only on fixing violations instead of juggling creation and constraints."
    },
    {
      id: "g10",
      domain: "Chaining",
      select: 1,
      stem: "When is chaining preferred over parallelization?",
      options: [
        { id: "a", text: "When sub-tasks are independent of each other" },
        { id: "b", text: "When each step depends on the output of the previous one (non-parallelizable subtasks)" },
        { id: "c", text: "When you need the lowest latency" },
        { id: "d", text: "Never; they are the same pattern" }
      ],
      correct: ["b"],
      why: "Chaining splits a task into sequential steps, optionally with non-LLM processing or checks between them."
    },
    {
      id: "g11",
      domain: "Routing",
      select: 1,
      stem: "In a routing workflow, where does the user's input go after classification?",
      options: [
        { id: "a", text: "To all specialized pipelines at once" },
        { id: "b", text: "To exactly one specialized pipeline chosen by the category" },
        { id: "c", text: "Back to the user for confirmation" },
        { id: "d", text: "To an aggregator" }
      ],
      correct: ["b"],
      why: "Only one pipeline receives the input, so each pipeline can be optimized for its category."
    },
    {
      id: "g12",
      domain: "Routing",
      select: 1,
      stem: "Your router must return exactly one of six genres so your code can pick a template. What is the most robust approach on current models?",
      options: [
        { id: "a", text: "Prefill the assistant turn with the first letter of the genre" },
        { id: "b", text: "Use structured outputs (or a tool) with a JSON schema whose field is an enum of the genres" },
        { id: "c", text: "Ask Claude to answer in all caps" },
        { id: "d", text: "Parse the first word of free text and hope it matches" }
      ],
      correct: ["b"],
      why: "A schema with an enum guarantees a valid category; prefill returns a 400 error on Claude 4.6+ models."
    },
    {
      id: "g13",
      domain: "Agents & tools",
      select: 1,
      stem: "A user asks 'When does my 90-day warranty expire?' and the agent has datetime tools. What does a good agent do first?",
      options: [
        { id: "a", text: "Calls set_reminder immediately" },
        { id: "b", text: "Asks the user when they got the warranty, then calculates with add_duration_to_datetime" },
        { id: "c", text: "Guesses the purchase date" },
        { id: "d", text: "Refuses because no warranty tool exists" }
      ],
      correct: ["b"],
      why: "Agents can recognize missing information and ask for it before combining tools."
    },
    {
      id: "g14",
      domain: "Agents & tools",
      select: 1,
      stem: "Why does Claude Code have tools like bash, read, edit and grep but no 'refactor code' or 'run tests' tool?",
      options: [
        { id: "a", text: "Those features are paid add-ons" },
        { id: "b", text: "Abstract, combinable tools let Claude handle countless tasks the developers never explicitly planned for" },
        { id: "c", text: "Claude cannot refactor code" },
        { id: "d", text: "Specialized tools are not allowed by the API" }
      ],
      correct: ["b"],
      why: "Reasonably abstract tools are the key to flexible agents; Claude composes them into complex workflows."
    },
    {
      id: "g15",
      domain: "Environment inspection",
      select: 1,
      stem: "A video-generation agent produces clips with misplaced dialogue. Following the course, what should you add?",
      options: [
        { id: "a", text: "A bigger max_tokens value" },
        { id: "b", text: "System prompt instructions to verify output, e.g. run whisper.cpp for timestamped captions and FFmpeg to extract frames for inspection" },
        { id: "c", text: "A rule to never use bash" },
        { id: "d", text: "A second agent that posts faster" }
      ],
      correct: ["b"],
      why: "Agents need ways to observe the results of their actions; tell Claude how to inspect what it produced."
    },
    {
      id: "g16",
      domain: "Environment inspection",
      select: 1,
      stem: "Which practice best reflects 'environment inspection' when an agent modifies files?",
      options: [
        { id: "a", text: "Write the whole file from memory" },
        { id: "b", text: "Read the current file contents before modifying it" },
        { id: "c", text: "Edit without reading to save tokens" },
        { id: "d", text: "Delete and recreate the file every time" }
      ],
      correct: ["b"],
      why: "Read before write, screenshot after UI actions, check API responses: always ask 'how will Claude know this worked?'"
    },
    {
      id: "g17",
      domain: "Environment inspection",
      select: 1,
      stem: "In Computer Use, why does Claude receive a screenshot after each action?",
      options: [
        { id: "a", text: "For logging only; Claude ignores it" },
        { id: "b", text: "Because a click could change anything; without seeing the result Claude can't know whether the action worked or what the new state is" },
        { id: "c", text: "To reduce costs" },
        { id: "d", text: "Screenshots are required by the Messages API for every tool" }
      ],
      correct: ["b"],
      why: "Claude operates blindly otherwise; observing the environment enables progress tracking and error correction."
    }
  ]
};
