window.QUIZ_BANK = {
  id: "api-tools",
  passPercent: 70,
  questions: [
    {
      id: "t01",
      domain: "Tool use basics",
      select: 1,
      stem: "A user asks your app for today's weather. You add a get_weather tool. Who actually calls the weather API?",
      options: [
        { id: "a", text: "Claude calls the weather API directly from Anthropic's servers" },
        { id: "b", text: "Your code: Claude returns a tool_use block, your server runs the function and sends back a tool_result" },
        { id: "c", text: "The SDK calls it automatically whenever a schema is present" },
        { id: "d", text: "Nobody; Claude answers from training data once the schema is provided" }
      ],
      correct: ["b"],
      why: "For client tools Claude only requests the call. Your server executes the function and returns the result so Claude can write the final answer."
    },
    {
      id: "t02",
      domain: "Tool use basics",
      select: 1,
      stem: "How does your code know that Claude wants a tool to be run?",
      options: [
        { id: "a", text: "The response text contains the word 'tool'" },
        { id: "b", text: "The response has stop_reason \"tool_use\" and contains tool_use blocks" },
        { id: "c", text: "response.usage.tool_calls is greater than zero" },
        { id: "d", text: "The first content block is always the tool call" }
      ],
      correct: ["b"],
      why: "The loop in the course checks response.stop_reason != \"tool_use\" to decide whether to stop, and finds calls by filtering content blocks with type \"tool_use\"."
    },
    {
      id: "t03",
      domain: "Tool functions",
      select: 1,
      stem: "Your tool function receives an empty location string. What does the course recommend?",
      options: [
        { id: "a", text: "Silently return an empty result" },
        { id: "b", text: "Raise an error with a clear message such as 'Location cannot be empty' so Claude can retry with a proper value" },
        { id: "c", text: "Guess a default city" },
        { id: "d", text: "Stop the whole conversation" }
      ],
      correct: ["b"],
      why: "Validate inputs and give meaningful error messages. When the error is returned in a tool_result with is_error, Claude can see it and retry with corrected arguments."
    },
    {
      id: "t04",
      domain: "Tool schemas",
      select: 1,
      stem: "Which three top-level fields make up a user-defined tool definition in the course?",
      options: [
        { id: "a", text: "id, type, input" },
        { id: "b", text: "name, description, input_schema" },
        { id: "c", text: "function, args, returns" },
        { id: "d", text: "tool_use_id, content, is_error" }
      ],
      correct: ["b"],
      why: "name identifies the tool, description says what it does, when to use it and what it returns, and input_schema is the JSON Schema of its arguments."
    },
    {
      id: "t05",
      domain: "Tool schemas",
      select: 2,
      stem: "Claude keeps calling the wrong tool or calls yours with missing arguments. Which two changes address this best?",
      options: [
        { id: "a", text: "Write a fuller description: what the tool does, when to use it, what it returns, and what each parameter means" },
        { id: "b", text: "Set strict: true on the tool so inputs must match the schema" },
        { id: "c", text: "Shorten the description to one word to reduce tokens" },
        { id: "d", text: "Remove the input_schema so Claude can pass any arguments" }
      ],
      correct: ["a", "b"],
      why: "The course recommends 3-4 sentence descriptions; Anthropic's docs call detailed descriptions the most important factor. strict: true guarantees schema-valid inputs."
    },
    {
      id: "t06",
      domain: "Message blocks",
      select: 1,
      stem: "Claude replies with a text block and a tool_use block. What should you append to the message history?",
      options: [
        { id: "a", text: "Only the text, since the tool call is already handled" },
        { id: "b", text: "The full response.content as an assistant message, preserving every block" },
        { id: "c", text: "Only the tool_use block as a user message" },
        { id: "d", text: "Nothing; the API remembers tool calls" }
      ],
      correct: ["b"],
      why: "Claude is stateless. Your tool_result will reference the tool_use id, so the assistant message with that block must be in the history you send next."
    },
    {
      id: "t07",
      domain: "Tool results",
      select: 1,
      stem: "What links a tool_result block to the request it answers?",
      options: [
        { id: "a", text: "Its position in the content list" },
        { id: "b", text: "tool_use_id, which must equal the id of the matching tool_use block" },
        { id: "c", text: "The tool name" },
        { id: "d", text: "The timestamp of the call" }
      ],
      correct: ["b"],
      why: "Each call has a unique id; results may be returned in a different order and are matched by tool_use_id."
    },
    {
      id: "t08",
      domain: "Tool results",
      select: 1,
      stem: "Claude requests two calculator calls in one response. How should you return the results?",
      options: [
        { id: "a", text: "Two separate user messages, one per result" },
        { id: "b", text: "One user message containing both tool_result blocks, each with its own tool_use_id" },
        { id: "c", text: "One result only; Claude will ask again for the other" },
        { id: "d", text: "As plain text in the next assistant message" }
      ],
      correct: ["b"],
      why: "Every tool_use needs a tool_result, and all results for a turn go in a single user message right after the assistant message."
    },
    {
      id: "t09",
      domain: "Tool results",
      select: 1,
      stem: "Your follow-up user message puts a text block before the tool_result block. What happens?",
      options: [
        { id: "a", text: "Claude ignores the text" },
        { id: "b", text: "The API returns a 400 error; tool_result blocks must come first, text only after them" },
        { id: "c", text: "It works the same either way" },
        { id: "d", text: "The tool is called again" }
      ],
      correct: ["b"],
      why: "Per the docs, in the user message with tool results the tool_result blocks must come first in the content array."
    },
    {
      id: "t10",
      domain: "Tool results",
      select: 1,
      stem: "After sending the tool result, you remove the tools parameter from the final request because no more calls are expected. What does the course say?",
      options: [
        { id: "a", text: "That is correct and saves tokens" },
        { id: "b", text: "Keep including the tool schema; Claude needs it to understand the tool references in the history" },
        { id: "c", text: "Replace it with tool_choice none" },
        { id: "d", text: "Move the schema into the system prompt" }
      ],
      correct: ["b"],
      why: "The history contains tool_use and tool_result blocks, so the request still needs the tool definitions."
    },
    {
      id: "t11",
      domain: "Conversation loop",
      select: 1,
      stem: "A user asks 'What day is 103 days from today?'. Why does the course build a while loop around chat()?",
      options: [
        { id: "a", text: "To retry failed network calls" },
        { id: "b", text: "Claude may need several tools in sequence (current date, then add duration), so you keep calling until it stops requesting tools" },
        { id: "c", text: "To stream the answer word by word" },
        { id: "d", text: "Because the API only allows one tool per conversation" }
      ],
      correct: ["b"],
      why: "Each response may request another tool. The loop runs tools and resends history until stop_reason is no longer tool_use."
    },
    {
      id: "t12",
      domain: "Conversation loop",
      select: 1,
      stem: "One of your tools raises an exception during run_tools. What should the loop send back?",
      options: [
        { id: "a", text: "Nothing for that call; skip it" },
        { id: "b", text: "A tool_result for the same tool_use_id with the error text and is_error: true" },
        { id: "c", text: "A new user question asking Claude to try again" },
        { id: "d", text: "End the conversation with an error to the user" }
      ],
      correct: ["b"],
      why: "Every tool_use must be answered. Returning the error with is_error lets Claude explain the problem or retry with different input."
    },
    {
      id: "t13",
      domain: "Multiple tools",
      select: 1,
      stem: "You add a fourth tool to the reminder assistant. Following the course's pattern, which steps are needed?",
      options: [
        { id: "a", text: "Only write the function; Claude discovers it automatically" },
        { id: "b", text: "Write the function, define its schema, add the schema to the tools list, and add a branch for it in run_tool" },
        { id: "c", text: "Retrain the model with the new tool" },
        { id: "d", text: "Create a separate conversation loop for the new tool" }
      ],
      correct: ["b"],
      why: "The core loop does not change. New tools need an implementation, a schema, registration in tools, and routing in run_tool."
    },
    {
      id: "t14",
      domain: "Streaming tools",
      select: 1,
      stem: "With streaming on, a long tool argument arrives after a pause and then all at once. Why, by default?",
      options: [
        { id: "a", text: "The network buffers large responses" },
        { id: "b", text: "The API buffers and validates each complete top-level key-value pair against the schema before sending it" },
        { id: "c", text: "Claude generates tool arguments only after the text is finished" },
        { id: "d", text: "max_tokens is too low" }
      ],
      correct: ["b"],
      why: "Default tool streaming validates top-level pairs before forwarding chunks, which causes delays followed by bursts."
    },
    {
      id: "t15",
      domain: "Streaming tools",
      select: 2,
      stem: "You enable fine-grained tool streaming. Which two statements are true?",
      options: [
        { id: "a", text: "Argument chunks arrive as soon as Claude generates them" },
        { id: "b", text: "Your code must handle partial or invalid JSON, because the API no longer validates it" },
        { id: "c", text: "The API now guarantees schema-valid arguments" },
        { id: "d", text: "Tool calls no longer need tool_result blocks" }
      ],
      correct: ["a", "b"],
      why: "Fine-grained streaming removes buffering and validation. Today it is enabled per tool with eager_input_streaming: true; guard the parse and return invalid input with is_error."
    },
    {
      id: "t16",
      domain: "Built-in tools",
      select: 1,
      stem: "You give Claude the text editor tool. What must your application still provide?",
      options: [
        { id: "a", text: "Nothing; Anthropic edits the files on its servers" },
        { id: "b", text: "The implementation of the file operations (view, create, replace, insert) that Claude requests" },
        { id: "c", text: "A full JSON schema written from scratch" },
        { id: "d", text: "A separate model fine-tuned for editing" }
      ],
      correct: ["b"],
      why: "The schema is built into Claude and you pass a small versioned stub, but the text editor is a client tool: your code performs the operations on your files."
    },
    {
      id: "t17",
      domain: "Built-in tools",
      select: 1,
      stem: "How does the web search tool differ from the reminder tools you built?",
      options: [
        { id: "a", text: "You must implement the search function and return results yourself" },
        { id: "b", text: "It is a server tool: Anthropic runs the searches inside the same request and returns server_tool_use and web_search_tool_result blocks" },
        { id: "c", text: "It only works with streaming" },
        { id: "d", text: "It cannot be limited in any way" }
      ],
      correct: ["b"],
      why: "You only add the schema (type, name, optional max_uses and domain filters). Claude searches and cites sources without your tool loop."
    },
    {
      id: "t18",
      domain: "Built-in tools",
      select: 1,
      stem: "A health app should only cite research from nih.gov and run at most five searches per request. Which configuration fits?",
      options: [
        { id: "a", text: "{\"type\": \"web_search_20250305\", \"name\": \"web_search\", \"max_uses\": 5, \"allowed_domains\": [\"nih.gov\"]}" },
        { id: "b", text: "{\"type\": \"web_search_20250305\", \"name\": \"web_search\", \"blocked_domains\": [\"nih.gov\"]}" },
        { id: "c", text: "A system prompt saying 'only use nih.gov', with no tool options" },
        { id: "d", text: "{\"name\": \"web_search\", \"max_tokens\": 5}" }
      ],
      correct: ["a"],
      why: "max_uses caps the number of searches and allowed_domains restricts results to trusted sources, as in the course's PubMed example."
    }
  ]
};
