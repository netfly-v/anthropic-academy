window.QUIZ_BANK = {
  id: "api-final",
  passPercent: 70,
  questions: [
    {
      id: "f01",
      domain: "Accessing the API",
      select: 1,
      stem: "A mobile app calls the Claude API directly from the phone with the API key bundled in the app. What is wrong with this design?",
      options: [
        { id: "a", text: "Nothing, as long as the key is obfuscated" },
        { id: "b", text: "The key can be extracted from the app; requests should go through your own server, which holds the key" },
        { id: "c", text: "The API only accepts requests from browsers" },
        { id: "d", text: "Mobile apps must use a different model" }
      ],
      correct: ["b"],
      why: "API keys are secrets: keep them on your server and never ship them to clients."
    },
    {
      id: "f02",
      domain: "Accessing the API",
      select: 1,
      stem: "Your chatbot forgets what the user said two messages ago. What is the most likely cause?",
      options: [
        { id: "a", text: "The model's memory was reset by Anthropic" },
        { id: "b", text: "The API is stateless and your code doesn't send the previous user and assistant messages with each request" },
        { id: "c", text: "The system prompt is too long" },
        { id: "d", text: "Streaming is disabled" }
      ],
      correct: ["b"],
      why: "Claude keeps no conversation state between requests; you resend the history in messages every time."
    },
    {
      id: "f03",
      domain: "Accessing the API",
      select: 1,
      stem: "A response ends mid-sentence and stop_reason is \"max_tokens\". What does that tell you?",
      options: [
        { id: "a", text: "Claude finished its answer naturally" },
        { id: "b", text: "The output hit the max_tokens limit you set; raise it or ask for a shorter answer" },
        { id: "c", text: "A stop sequence was matched" },
        { id: "d", text: "Claude wants to call a tool" }
      ],
      correct: ["b"],
      why: "max_tokens caps output length; end_turn means a natural finish, stop_sequence a matched stop string, tool_use a tool request."
    },
    {
      id: "f04",
      domain: "Accessing the API",
      select: 1,
      stem: "On a current model you need Claude's reply to always be valid JSON matching a schema. What is the most reliable approach?",
      options: [
        { id: "a", text: "Prefill the assistant turn with an opening brace" },
        { id: "b", text: "Use structured outputs (output_config.format with a JSON schema)" },
        { id: "c", text: "Set temperature to 0 and hope" },
        { id: "d", text: "Add 'IMPORTANT: JSON ONLY' in capital letters" }
      ],
      correct: ["b"],
      why: "Structured outputs constrain the response to the schema; prefill returns a 400 error on Claude 4.6+ models."
    },
    {
      id: "f05",
      domain: "Prompt evaluation",
      select: 1,
      stem: "Why does the course call prompt evaluation the most important practice to adopt?",
      options: [
        { id: "a", text: "It makes requests cheaper" },
        { id: "b", text: "A prompt that looks fine in a few manual tries can fail for real users; only systematic testing on many cases shows how good it is" },
        { id: "c", text: "Anthropic requires evals before granting API access" },
        { id: "d", text: "Evals replace the need for prompt engineering" }
      ],
      correct: ["b"],
      why: "Evals give an objective score you can compare across prompt versions before shipping."
    },
    {
      id: "f06",
      domain: "Prompt evaluation",
      select: 1,
      stem: "You want to compare prompt v1 and prompt v2 fairly. What must stay the same between the two runs?",
      options: [
        { id: "a", text: "Nothing; regenerate everything each time" },
        { id: "b", text: "The test dataset and the grading method; only the prompt under test changes" },
        { id: "c", text: "Only the model name" },
        { id: "d", text: "The prompt text" }
      ],
      correct: ["b"],
      why: "Change one variable at a time; otherwise you can't tell what caused the score difference."
    },
    {
      id: "f07",
      domain: "Prompt evaluation",
      select: 1,
      stem: "You need to check that outputs are valid Python and also judge how well they answer the task. Which grading setup fits?",
      options: [
        { id: "a", text: "Only a human reviewer" },
        { id: "b", text: "A code grader for syntax plus a model grader for quality, combined into one score" },
        { id: "c", text: "Only a model grader for everything" },
        { id: "d", text: "Only string length checks" }
      ],
      correct: ["b"],
      why: "Code graders are fast and exact for checkable properties; model graders handle subjective quality."
    },
    {
      id: "f08",
      domain: "Prompt evaluation",
      select: 1,
      stem: "Writing an eval framework seems like a big project. What does the course's wrap-up point out?",
      options: [
        { id: "a", text: "You must buy a commercial eval platform" },
        { id: "b", text: "Evals don't need a fancy framework; much of the course's eval code was written by Claude itself" },
        { id: "c", text: "Evals only work for classification tasks" },
        { id: "d", text: "Evals require at least 10,000 test cases" }
      ],
      correct: ["b"],
      why: "A simple dataset + run + grade loop is enough to start, and Claude can help generate both data and code."
    },
    {
      id: "f09",
      domain: "Prompt engineering",
      select: 1,
      stem: "According to the course, which technique matters most when writing a prompt?",
      options: [
        { id: "a", text: "Using as many examples as possible" },
        { id: "b", text: "Being clear and direct: state the task and what you expect at the start" },
        { id: "c", text: "Writing the prompt in all capitals" },
        { id: "d", text: "Hiding the task in the middle of the context" }
      ],
      correct: ["b"],
      why: "The wrap-up names clarity and directness as chief among the prompting techniques."
    },
    {
      id: "f10",
      domain: "Prompt engineering",
      select: 1,
      stem: "Your prompt includes a long contract and the user's question. Claude sometimes confuses the two. What helps most?",
      options: [
        { id: "a", text: "Remove the question" },
        { id: "b", text: "Wrap each part in descriptive XML tags, such as <contract> and <question>" },
        { id: "c", text: "Put everything on one line" },
        { id: "d", text: "Raise max_tokens" }
      ],
      correct: ["b"],
      why: "XML tags separate content from instructions and make each part easy to refer to."
    },
    {
      id: "f11",
      domain: "Prompt engineering",
      select: 1,
      stem: "A classifier keeps mislabeling sarcastic reviews. Besides clear instructions, what is the course's go-to fix?",
      options: [
        { id: "a", text: "Add examples (one-shot or multi-shot) that include tricky sarcastic cases with the correct label" },
        { id: "b", text: "Ask Claude to be more careful" },
        { id: "c", text: "Use a shorter system prompt" },
        { id: "d", text: "Lower max_tokens" }
      ],
      correct: ["a"],
      why: "Examples of corner cases show Claude exactly what you expect."
    },
    {
      id: "f12",
      domain: "Prompt engineering",
      select: 1,
      stem: "Which rewrite follows current prompting guidance best for a rule about formatting?",
      options: [
        { id: "a", text: "DO NOT EVER USE MARKDOWN!!!" },
        { id: "b", text: "Write the answer as plain paragraphs of prose." },
        { id: "c", text: "Markdown is bad." },
        { id: "d", text: "No markdown, no lists, no headers, no bold, no nothing." }
      ],
      correct: ["b"],
      why: "Tell Claude what to do instead of what not to do; current models follow calm, specific instructions well."
    },
    {
      id: "f13",
      domain: "Tool use",
      select: 1,
      stem: "Which part of a tool definition most influences whether Claude picks the right tool at the right time?",
      options: [
        { id: "a", text: "The order of tools in the list" },
        { id: "b", text: "A detailed description of what the tool does, when to use it, and what each input means" },
        { id: "c", text: "A short tool name" },
        { id: "d", text: "The programming language of the function" }
      ],
      correct: ["b"],
      why: "Claude sees only the name, description and input_schema, so the description does most of the work."
    },
    {
      id: "f14",
      domain: "Tool use",
      select: 1,
      stem: "Your agent loop should keep going while Claude wants tools. What condition ends the loop?",
      options: [
        { id: "a", text: "After exactly two requests" },
        { id: "b", text: "When the response's stop_reason is no longer \"tool_use\"" },
        { id: "c", text: "When the response contains any text block" },
        { id: "d", text: "When the user sends a new message" }
      ],
      correct: ["b"],
      why: "Run the requested tools, send tool_result blocks, and repeat until Claude stops asking for tools."
    },
    {
      id: "f15",
      domain: "Tool use",
      select: 1,
      stem: "A database tool times out. How should you report this to Claude?",
      options: [
        { id: "a", text: "Don't send anything; Claude will retry by itself" },
        { id: "b", text: "Send a tool_result with the matching tool_use_id, an error message, and is_error set to true" },
        { id: "c", text: "Crash the application" },
        { id: "d", text: "Send the error as a new system prompt" }
      ],
      correct: ["b"],
      why: "Every tool_use needs a tool_result; a clear error lets Claude adjust or explain the failure."
    },
    {
      id: "f16",
      domain: "Tool use",
      select: 1,
      stem: "What is the key difference between the web search tool and a get_weather tool you write yourself?",
      options: [
        { id: "a", text: "Web search is a server tool that Anthropic executes; get_weather is a client tool that your code executes" },
        { id: "b", text: "Web search needs no tools array entry" },
        { id: "c", text: "get_weather runs on Anthropic's servers" },
        { id: "d", text: "There is no difference" }
      ],
      correct: ["a"],
      why: "Server tools run on Anthropic's side and return results in the same response; client tools need your code to run them."
    },
    {
      id: "f17",
      domain: "RAG",
      select: 1,
      stem: "Why chunk a 500-page manual for RAG instead of sending all of it with every question?",
      options: [
        { id: "a", text: "Claude cannot read text longer than one page" },
        { id: "b", text: "Sending only relevant chunks keeps prompts smaller, cheaper and more focused, and scales past the context window" },
        { id: "c", text: "Chunking improves the model's weights" },
        { id: "d", text: "Embeddings require exactly one page per chunk" }
      ],
      correct: ["b"],
      why: "RAG retrieves the few chunks that matter for each question."
    },
    {
      id: "f18",
      domain: "RAG",
      select: 1,
      stem: "You build semantic search for a Claude app. Where do the embeddings come from?",
      options: [
        { id: "a", text: "From the Messages API with an embeddings flag" },
        { id: "b", text: "From a separate embedding model, such as Voyage AI, since Anthropic doesn't offer its own embedding model" },
        { id: "c", text: "From prompt caching" },
        { id: "d", text: "Claude returns them in every response" }
      ],
      correct: ["b"],
      why: "Anthropic's docs point to Voyage AI; use input_type document for chunks and query for questions."
    },
    {
      id: "f19",
      domain: "RAG",
      select: 1,
      stem: "Users search for exact error codes like 'E-4412', and semantic search keeps returning loosely related chunks. What does the course add?",
      options: [
        { id: "a", text: "A larger embedding model only" },
        { id: "b", text: "A lexical BM25 index alongside vector search, merging both result lists" },
        { id: "c", text: "Higher temperature" },
        { id: "d", text: "Fewer chunks" }
      ],
      correct: ["b"],
      why: "BM25 is strong at exact rare terms; hybrid retrieval combines it with semantic similarity."
    },
    {
      id: "f20",
      domain: "RAG",
      select: 1,
      stem: "How does reciprocal rank fusion combine results from two retrievers?",
      options: [
        { id: "a", text: "By adding their raw similarity scores" },
        { id: "b", text: "By summing 1 / (k + rank) for each chunk across the result lists, so only ranks matter" },
        { id: "c", text: "By keeping only results both retrievers agree on" },
        { id: "d", text: "By asking Claude to vote" }
      ],
      correct: ["b"],
      why: "Ranks are comparable across retrievers even when raw scores are on different scales."
    },
    {
      id: "f21",
      domain: "Features of Claude",
      select: 1,
      stem: "You enable thinking on a current Claude model (Opus 4.7 or newer). Which configuration is correct?",
      options: [
        { id: "a", text: "thinking: {type: \"enabled\", budget_tokens: 8000}" },
        { id: "b", text: "thinking: {type: \"adaptive\"}, optionally tuning depth with effort" },
        { id: "c", text: "temperature: 2" },
        { id: "d", text: "A beta header named thinking-2024" }
      ],
      correct: ["b"],
      why: "budget_tokens returns a 400 error on Claude Opus 4.7 and newer; adaptive thinking with effort replaces it."
    },
    {
      id: "f22",
      domain: "Features of Claude",
      select: 1,
      stem: "A long system prompt and tool list are identical across thousands of requests. Which feature cuts their cost and latency?",
      options: [
        { id: "a", text: "Citations" },
        { id: "b", text: "Prompt caching with a cache_control breakpoint after the stable prefix" },
        { id: "c", text: "Streaming" },
        { id: "d", text: "Lower max_tokens" }
      ],
      correct: ["b"],
      why: "Cache reads cost about a tenth of normal input; the default cache lifetime is 5 minutes, refreshed on each hit."
    },
    {
      id: "f23",
      domain: "Features of Claude",
      select: 1,
      stem: "A legal team must check exactly which passage of a PDF supports each claim in Claude's answer. What do you enable?",
      options: [
        { id: "a", text: "Citations on the document block" },
        { id: "b", text: "Extended thinking" },
        { id: "c", text: "Code execution" },
        { id: "d", text: "A higher temperature" }
      ],
      correct: ["a"],
      why: "Citations return the cited text and its location (pages for PDFs) alongside each claim."
    },
    {
      id: "f24",
      domain: "Features of Claude",
      select: 1,
      stem: "You want Claude to analyze a large CSV with Python. How do the pieces fit together?",
      options: [
        { id: "a", text: "Paste the CSV into a tool description" },
        { id: "b", text: "Upload the file with the Files API and add the code execution tool; Claude runs code in Anthropic's sandbox, which has no network access" },
        { id: "c", text: "Ask Claude to download the file from your laptop" },
        { id: "d", text: "Code execution needs your own server to run the code" }
      ],
      correct: ["b"],
      why: "The Files API (client.files) gets data into the container; code execution is a server tool."
    },
    {
      id: "f25",
      domain: "MCP",
      select: 1,
      stem: "What problem does MCP mainly solve for an app that integrates with many services?",
      options: [
        { id: "a", text: "It trains Claude on each service" },
        { id: "b", text: "Tool definitions and their execution come packaged in MCP servers, often by the service owner, so you don't write and maintain them yourself" },
        { id: "c", text: "It removes the need for API keys" },
        { id: "d", text: "It makes responses faster" }
      ],
      correct: ["b"],
      why: "MCP shifts the burden of writing tools from your app to reusable servers."
    },
    {
      id: "f26",
      domain: "MCP",
      select: 1,
      stem: "A remote MCP server runs on a company's cloud and many clients connect over the network. Which standard transport fits?",
      options: [
        { id: "a", text: "stdio" },
        { id: "b", text: "Streamable HTTP" },
        { id: "c", text: "Email" },
        { id: "d", text: "WebRTC" }
      ],
      correct: ["b"],
      why: "The spec's standard transports are stdio (local subprocess) and Streamable HTTP (remote)."
    },
    {
      id: "f27",
      domain: "MCP",
      select: 1,
      stem: "Your app shows a list of a user's documents in a dropdown, fetched from an MCP server. Which primitive should the server expose?",
      options: [
        { id: "a", text: "A tool" },
        { id: "b", text: "A resource, because the application decides when to read it" },
        { id: "c", text: "A prompt" },
        { id: "d", text: "A sampling request" }
      ],
      correct: ["b"],
      why: "Tools are model-controlled, resources app-controlled, prompts user-controlled."
    },
    {
      id: "f28",
      domain: "MCP",
      select: 1,
      stem: "During development you want to call your MCP server's tools and see raw responses without Claude in the loop. What do you use?",
      options: [
        { id: "a", text: "The MCP Inspector" },
        { id: "b", text: "The Message Batches API" },
        { id: "c", text: "Prompt caching" },
        { id: "d", text: "Claude Code's /init" }
      ],
      correct: ["a"],
      why: "The Inspector lists and runs tools, resources and prompts directly against your server."
    },
    {
      id: "f29",
      domain: "Claude Code",
      select: 1,
      stem: "You want a preference ('I prefer pytest over unittest') to apply in every project on your machine, but not to be shared with teammates. Where does it go?",
      options: [
        { id: "a", text: "./CLAUDE.md in each repository" },
        { id: "b", text: "~/.claude/CLAUDE.md (user scope)" },
        { id: "c", text: ".mcp.json" },
        { id: "d", text: "The system prompt of the Messages API" }
      ],
      correct: ["b"],
      why: "User memory applies to all your projects; project memory is shared via git; local memory is per project and private."
    },
    {
      id: "f30",
      domain: "Claude Code",
      select: 1,
      stem: "Before a large refactor you want Claude Code to research the code and propose steps without editing anything. What fits?",
      options: [
        { id: "a", text: "Run /clear" },
        { id: "b", text: "Ask for a plan and say not to write code yet, or switch to plan mode" },
        { id: "c", text: "Delete CLAUDE.md" },
        { id: "d", text: "Add a new MCP server" }
      ],
      correct: ["b"],
      why: "Context → plan → implement; plan mode (/plan, Shift+Tab) makes the planning step explicit."
    },
    {
      id: "f31",
      domain: "Claude Code",
      select: 1,
      stem: "Your team wants Claude Code to read Sentry errors and Jira tickets. What is the course's approach?",
      options: [
        { id: "a", text: "Copy errors and tickets into CLAUDE.md by hand" },
        { id: "b", text: "Connect MCP servers for those services, since Claude Code includes an MCP client" },
        { id: "c", text: "Write a new Claude Code release" },
        { id: "d", text: "Use computer use to click through the websites" }
      ],
      correct: ["b"],
      why: "MCP servers extend Claude Code with tools for the services your team already uses."
    },
    {
      id: "f32",
      domain: "Claude Code",
      select: 1,
      stem: "Why is Claude Code a useful case study for agent design?",
      options: [
        { id: "a", text: "It uses a hidden model trained only for code" },
        { id: "b", text: "It solves open-ended tasks by combining a small set of abstract tools (bash, read, edit, grep) and inspecting results" },
        { id: "c", text: "It has one specialized tool per programming task" },
        { id: "d", text: "It never runs commands" }
      ],
      correct: ["b"],
      why: "Abstract, combinable tools plus environment inspection are the course's two key agent lessons."
    },
    {
      id: "f33",
      domain: "Agents & workflows",
      select: 1,
      stem: "A content tool must first pick a genre for a topic, then use the matching prompt template. Which pattern is this?",
      options: [
        { id: "a", text: "Parallelization" },
        { id: "b", text: "Routing" },
        { id: "c", text: "Evaluator-optimizer" },
        { id: "d", text: "Chaining without classification" }
      ],
      correct: ["b"],
      why: "A router classifies the input and sends it to exactly one specialized pipeline."
    },
    {
      id: "f34",
      domain: "Agents & workflows",
      select: 1,
      stem: "A report generator writes a draft, then a separate Claude call checks it against a rubric and sends feedback until it passes. Which pattern?",
      options: [
        { id: "a", text: "Routing" },
        { id: "b", text: "Evaluator-optimizer" },
        { id: "c", text: "Parallelization (voting)" },
        { id: "d", text: "Retrieval augmented generation" }
      ],
      correct: ["b"],
      why: "Producer → grader → feedback loop until the output is accepted."
    },
    {
      id: "f35",
      domain: "Agents & workflows",
      select: 1,
      stem: "You must check one contract against legal, financial and security criteria, each independent of the others. Which pattern fits best?",
      options: [
        { id: "a", text: "Chaining, one criterion after another" },
        { id: "b", text: "Parallelization: one focused request per criterion at the same time, then an aggregation step" },
        { id: "c", text: "An open-ended agent with web search" },
        { id: "d", text: "A single prompt with all criteria" }
      ],
      correct: ["b"],
      why: "Independent sub-tasks run in parallel; dependent steps call for chaining."
    },
    {
      id: "f36",
      domain: "Agents & workflows",
      select: 1,
      stem: "Which statement reflects the course's final advice on agents?",
      options: [
        { id: "a", text: "Always build agents; workflows are outdated" },
        { id: "b", text: "Agents are exciting, but workflows usually give better accuracy and reliability; use agents only when the task can't be planned in advance" },
        { id: "c", text: "Agents are always cheaper than workflows" },
        { id: "d", text: "Agents can't use tools" }
      ],
      correct: ["b"],
      why: "Users want products that work consistently; choose the simplest architecture that solves the problem."
    }
  ]
};
