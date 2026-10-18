window.QUIZ_BANK = {
  id: "api-features",
  passPercent: 70,
  questions: [
    {
      id: "f01",
      domain: "Thinking",
      select: 1,
      stem: "Your prompt is already well optimized but accuracy on a hard reasoning task is still below target. What does the course suggest trying, and at what cost?",
      options: [
        { id: "a", text: "Raise temperature; it is free" },
        { id: "b", text: "Enable extended thinking, accepting higher cost (thinking tokens are billed) and higher latency" },
        { id: "c", text: "Use prefill to force a longer answer" },
        { id: "d", text: "Shorten the prompt to save tokens" }
      ],
      correct: ["b"],
      why: "Use evals first; add thinking when prompting alone is not enough. Thinking improves reasoning but costs output tokens and time."
    },
    {
      id: "f02",
      domain: "Thinking",
      select: 1,
      stem: "What is the purpose of the signature field on a thinking block?",
      options: [
        { id: "a", text: "It identifies which model version produced the answer" },
        { id: "b", text: "It is a cryptographic token that verifies the thinking was produced by Claude and not modified" },
        { id: "c", text: "It stores the user's API key" },
        { id: "d", text: "It controls the thinking budget" }
      ],
      correct: ["b"],
      why: "The signature protects the reasoning from tampering; thinking blocks must be passed back unchanged in later turns."
    },
    {
      id: "f03",
      domain: "Thinking",
      select: 1,
      stem: "You migrate code from claude-sonnet-4-0 to claude-opus-5-5 and keep thinking={\"type\": \"enabled\", \"budget_tokens\": 4000}. What happens, per current docs?",
      options: [
        { id: "a", text: "It works exactly the same" },
        { id: "b", text: "The request returns a 400; on Claude 4.7+ models use thinking={\"type\": \"adaptive\"} and control depth with effort" },
        { id: "c", text: "The budget is silently doubled" },
        { id: "d", text: "Thinking is ignored but the request succeeds" }
      ],
      correct: ["b"],
      why: "Manual budget_tokens is deprecated on 4.6 and rejected on 4.7 and later; adaptive thinking plus output_config.effort replaces it."
    },
    {
      id: "f04",
      domain: "Thinking",
      select: 1,
      stem: "With manual extended thinking (on models that support it), which constraint applies to budget_tokens?",
      options: [
        { id: "a", text: "At least 1,024 tokens and less than max_tokens" },
        { id: "b", text: "Exactly equal to max_tokens" },
        { id: "c", text: "Any value; max_tokens is ignored" },
        { id: "d", text: "At most 256 tokens" }
      ],
      correct: ["a"],
      why: "The minimum is 1,024 and thinking tokens count toward max_tokens, so the budget must leave room for the answer."
    },
    {
      id: "f05",
      domain: "Vision",
      select: 1,
      stem: "Claude miscounts marbles in a photo when asked 'How many marbles are in this image?'. What does the course recommend?",
      options: [
        { id: "a", text: "Send the same image three times" },
        { id: "b", text: "Apply prompt engineering: give a step-by-step counting methodology or a one-shot example image with a known count" },
        { id: "c", text: "Convert the image to PDF" },
        { id: "d", text: "Increase max_tokens" }
      ],
      correct: ["b"],
      why: "The same techniques as text apply: detailed steps, verification, and examples improve visual accuracy."
    },
    {
      id: "f06",
      domain: "Vision",
      select: 2,
      stem: "Which two are valid ways to give Claude an image in a Messages API request?",
      options: [
        { id: "a", text: "An image block with a base64 source and the correct media_type" },
        { id: "b", text: "An image block that references a file_id uploaded via the Files API" },
        { id: "c", text: "Pasting the binary bytes into a text block" },
        { id: "d", text: "Setting system=\"image.png\"" }
      ],
      correct: ["a", "b"],
      why: "Image blocks accept base64, URL, or file_id sources. Text blocks cannot carry images."
    },
    {
      id: "f07",
      domain: "PDF",
      select: 1,
      stem: "You adapt the course's image code to send a PDF. Which change is required?",
      options: [
        { id: "a", text: "Keep type \"image\" and set media_type to \"text/plain\"" },
        { id: "b", text: "Use a block of type \"document\" with media_type \"application/pdf\"" },
        { id: "c", text: "Send the PDF as a tool_result" },
        { id: "d", text: "PDFs must be converted to text first" }
      ],
      correct: ["b"],
      why: "PDFs go in document blocks. Claude reads text, images, charts and tables in the PDF."
    },
    {
      id: "f08",
      domain: "Citations",
      select: 1,
      stem: "Users of your document Q&A app want to verify where each claim came from. What do you add?",
      options: [
        { id: "a", text: "A system prompt saying 'always cite sources'" },
        { id: "b", text: "\"citations\": {\"enabled\": true} (and a title) on the document block, then render the citation fields in your UI" },
        { id: "c", text: "A higher temperature" },
        { id: "d", text: "Structured outputs with a 'sources' field" }
      ],
      correct: ["b"],
      why: "Citations return cited_text, document index/title and page numbers (or character positions for plain text). Citations cannot be combined with structured outputs."
    },
    {
      id: "f09",
      domain: "Citations",
      select: 1,
      stem: "You enable citations on a plain-text document instead of a PDF. How are locations reported?",
      options: [
        { id: "a", text: "As page numbers" },
        { id: "b", text: "As character positions in the text" },
        { id: "c", text: "As line numbers only" },
        { id: "d", text: "Locations are not available for text" }
      ],
      correct: ["b"],
      why: "PDF citations use page locations; plain-text citations use character start and end indexes."
    },
    {
      id: "f10",
      domain: "Prompt caching",
      select: 1,
      stem: "When is prompt caching most useful?",
      options: [
        { id: "a", text: "Every request is completely different" },
        { id: "b", text: "Many requests repeat the same large prefix, such as a long system prompt, tool schemas or a document you ask many questions about" },
        { id: "c", text: "You want different answers each time" },
        { id: "d", text: "Prompts are shorter than 100 tokens" }
      ],
      correct: ["b"],
      why: "Caching reuses work on an identical prefix. It only helps when that exact content is sent again while the cache is alive."
    },
    {
      id: "f11",
      domain: "Prompt caching",
      select: 1,
      stem: "You place a cache breakpoint on the last user message. On the next request you add the word 'please' to the first message. What happens?",
      options: [
        { id: "a", text: "Only the first message is reprocessed" },
        { id: "b", text: "The cache misses: content up to the breakpoint must be identical, so everything is processed again" },
        { id: "c", text: "Claude ignores small edits" },
        { id: "d", text: "The request fails" }
      ],
      correct: ["b"],
      why: "Any change before or at the breakpoint invalidates that cached prefix."
    },
    {
      id: "f12",
      domain: "Prompt caching",
      select: 1,
      stem: "In which order does the API assemble the cached prefix?",
      options: [
        { id: "a", text: "messages → system → tools" },
        { id: "b", text: "tools → system → messages" },
        { id: "c", text: "system → messages → tools" },
        { id: "d", text: "The order is random" }
      ],
      correct: ["b"],
      why: "Because tools come first, a change to a tool invalidates everything after it; stable parts should come first."
    },
    {
      id: "f13",
      domain: "Prompt caching",
      select: 2,
      stem: "Which two statements about prompt caching match current Anthropic docs?",
      options: [
        { id: "a", text: "The default cache lifetime is 5 minutes; a 1-hour TTL is opt-in with \"ttl\": \"1h\"" },
        { id: "b", text: "You can define up to 4 cache breakpoints per request" },
        { id: "c", text: "Cache reads cost more than regular input tokens" },
        { id: "d", text: "Prompts shorter than the minimum return an error" }
      ],
      correct: ["a", "b"],
      why: "Reads cost a fraction of base input price; writes cost more. Too-short prefixes are simply not cached, with no error."
    },
    {
      id: "f14",
      domain: "Prompt caching",
      select: 1,
      stem: "Your second request shows cache_read_input_tokens=1772 and cache_creation_input_tokens=0. What does that mean?",
      options: [
        { id: "a", text: "The cache was rebuilt" },
        { id: "b", text: "1,772 tokens of the prefix were read from cache instead of being processed again" },
        { id: "c", text: "The request failed" },
        { id: "d", text: "1,772 output tokens were generated" }
      ],
      correct: ["b"],
      why: "cache_creation_input_tokens reports cache writes; cache_read_input_tokens reports cache hits."
    },
    {
      id: "f15",
      domain: "Code execution & Files",
      select: 1,
      stem: "Claude's code execution container has no network access. How do you get a CSV into it for analysis?",
      options: [
        { id: "a", text: "Ask Claude to download it from your website" },
        { id: "b", text: "Upload it with the Files API and include a container_upload block with the file_id" },
        { id: "c", text: "Paste a URL into the system prompt" },
        { id: "d", text: "It is impossible" }
      ],
      correct: ["b"],
      why: "The Files API is the way data gets in and out of the sandbox; generated files can be downloaded by their file IDs."
    },
    {
      id: "f16",
      domain: "Code execution & Files",
      select: 1,
      stem: "Who runs the code when you add the code execution tool to a request?",
      options: [
        { id: "a", text: "Your server, like a client tool" },
        { id: "b", text: "Anthropic, in an isolated sandbox: it is a server tool, so you provide only the tool type, not an implementation" },
        { id: "c", text: "The user's browser" },
        { id: "d", text: "No code runs; Claude only writes it" }
      ],
      correct: ["b"],
      why: "Code execution is a server tool. Responses include the code (server tool use blocks) and execution results."
    }
  ]
};
