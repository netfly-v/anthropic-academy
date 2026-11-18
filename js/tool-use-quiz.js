window.QUIZ_BANK = {
  id: "tool-use",
  passPercent: 70,
  questions: [
    {
      id: "tu01",
      domain: "Tool definitions",
      select: 1,
      stem: "Claude picks the right project tool but passes \"0142\" where your backend needs the full job number \"MEG-2026-0142\". Following the course's rule to fix only the part at fault, what do you change?",
      options: [
        { id: "a", text: "The tool's description, adding more sentences about when to use the tool and when not to" },
        { id: "b", text: "The tool list, splitting the tool into one tool per project field so each input is simpler" },
        { id: "c", text: "The schema and examples: give the format in the parameter's own description and add input_examples" },
        { id: "d", text: "The model, since a value in the wrong format shows that the model is too small for this kind of task" }
      ],
      correct: ["c"],
      why: "A value of the wrong type or format points at the schema and the examples, not the description. Give the format in the parameter's description, add input_examples, and rerun your eval."
    },
    {
      id: "tu02",
      domain: "Tool definitions",
      select: 1,
      stem: "An assistant has four thin tools, get_project_phase, get_project_hours, get_project_lead and get_project_deadline, each with a one-line description. Claude often calls several of them, or the wrong one, for a single question. What does the course recommend?",
      options: [
        { id: "a", text: "Combine them into one tool with a parameter, such as fields, that says which project facts to return" },
        { id: "b", text: "Keep all four and add a fifth tool whose only job is to tell Claude which of the four it should call" },
        { id: "c", text: "Set disable_parallel_tool_use so that Claude can call only one of the four in each response" },
        { id: "d", text: "Remove the descriptions so Claude chooses by tool name, which is shorter and less ambiguous" }
      ],
      correct: ["a"],
      why: "A good description can't help much when tools overlap. Meridian merged four overlapping tools into lookup_project_status with a fields parameter; the permit and billing tools stayed because they do different jobs."
    },
    {
      id: "tu03",
      domain: "Tool definitions",
      select: 1,
      stem: "You rewrote your tool definitions and want to know whether Claude now picks the right tools. How does the course measure the change?",
      options: [
        { id: "a", text: "Ask Claude to rate the old and new descriptions and keep the set it scores higher" },
        { id: "b", text: "Compare the token counts of the two sets and keep the shorter one, since it is cheaper to send" },
        { id: "c", text: "Ship the new set and count user complaints about wrong answers over the next week" },
        { id: "d", text: "Run the same fixed set of test questions, labeled with the right tool calls, against both sets on the same model" }
      ],
      correct: ["d"],
      why: "An eval is a fixed set of test questions with known right answers, run against Claude and scored. Meridian ran 30 labeled questions with each set of tools on claude-sonnet-5: 14/30 before the rewrite, 26/30 after."
    },
    {
      id: "tu04",
      domain: "Strict tool use",
      select: 1,
      stem: "With \"strict\": true on a tool, how does the API make sure the input Claude writes matches the tool's input_schema?",
      options: [
        { id: "a", text: "It checks each finished tool call against the schema and silently retries until one passes" },
        { id: "b", text: "It compiles the schema into a grammar, and at each token Claude can pick only tokens the grammar allows" },
        { id: "c", text: "It adds the schema to the system prompt together with an instruction to follow it exactly" },
        { id: "d", text: "It converts each invalid value to the right type, such as \"2\" to 2, after Claude writes it" }
      ],
      correct: ["b"],
      why: "This is grammar-constrained sampling: an integer field can only get an integer, because no other token can be picked. Without strict, Claude usually follows the schema, but nothing enforces it."
    },
    {
      id: "tu05",
      domain: "Strict tool use",
      select: 2,
      stem: "You turn on strict tool use for the queue_stamp_request tool. What does the tool definition need? (Choose two.)",
      options: [
        { id: "a", text: "\"strict\": true at the top level, beside name, description and input_schema" },
        { id: "b", text: "\"strict\": true inside input_schema, next to the properties it should enforce" },
        { id: "c", text: "\"additionalProperties\": false on every object in the schema" },
        { id: "d", text: "minimum and maximum on numeric fields, so the grammar enforces the bounds too" }
      ],
      correct: ["a", "c"],
      why: "The flag sits outside the schema, and strict requires additionalProperties: false on every object. Bounds such as minimum and maximum aren't supported and return a 400, so check them in your validator and state them in the field's description."
    },
    {
      id: "tu06",
      domain: "Strict tool use",
      select: 1,
      stem: "Strict tool use is on, but your validator still rejects license numbers like \"PE 46196\". The handwritten schema lists pe_license_number as a plain string, while the validator requires ^PE-\\d{5}$. What fix does the course recommend?",
      options: [
        { id: "a", text: "Turn strict off, because strict and the validator end up checking the same thing twice" },
        { id: "b", text: "Set tool_choice to any so that Claude is forced to fill in the license number" },
        { id: "c", text: "Raise max_tokens so that Claude has room to write out the full license number" },
        { id: "d", text: "Generate the schema from the validator, such as a Pydantic class, so it carries the same pattern" }
      ],
      correct: ["d"],
      why: "Strict makes the input match the schema, so the schema must say what the validator says. Write the rules once in the validator (Pydantic in Python, Zod in TypeScript) and generate the schema from it, for example with model_json_schema()."
    },
    {
      id: "tu07",
      domain: "Parallel & streaming",
      select: 1,
      stem: "Claude answers a site check with three tool_use blocks in one response. Your loop, written for one tool call, runs only the first block and sends back its single tool_result. What happens?",
      options: [
        { id: "a", text: "Claude waits, then asks for the other two lookups again in its next response" },
        { id: "b", text: "The API rejects the request, because two of the tool calls never got their results" },
        { id: "c", text: "Anthropic runs the remaining two tools on its own side and adds their results for you" },
        { id: "d", text: "Claude answers from the one result and marks the other two lookups as skipped" }
      ],
      correct: ["b"],
      why: "Every tool_use block needs its own tool_result. Collect every tool_use block in the response, for example with [b for b in resp.content if b.type == \"tool_use\"], and run them all."
    },
    {
      id: "tu08",
      domain: "Parallel & streaming",
      select: 1,
      stem: "Your loop runs every tool call, but it sends each tool_result back in its own user message. Over the conversation, Claude makes fewer parallel tool calls. What is the likely reason?",
      options: [
        { id: "a", text: "Each extra message counts against a limit on parallel tool calls per conversation" },
        { id: "b", text: "Separate result messages switch on disable_parallel_tool_use for the rest of the run" },
        { id: "c", text: "The history now reads as if Claude asked for one tool at a time, so it keeps doing that" },
        { id: "d", text: "Claude can't match results to calls across separate messages, so it stops asking for several" }
      ],
      correct: ["c"],
      why: "Put every tool_result in the next single user message. Splitting the results across messages makes the conversation look sequential, which is a common reason Claude makes fewer parallel tool calls."
    },
    {
      id: "tu09",
      domain: "Parallel & streaming",
      select: 1,
      stem: "You switch your tool loop to client.messages.stream() so the screen can say \"Looking up project...\" instead of showing a frozen spinner. Which event lets you show the chosen tool first?",
      options: [
        { id: "a", text: "content_block_start, which carries the tool's name while its input is still empty" },
        { id: "b", text: "content_block_stop, which is the first point at which the tool's name is known" },
        { id: "c", text: "message_delta, which carries stop_reason tool_use once the whole call is written" },
        { id: "d", text: "The last input_json_delta, which completes the input that holds the tool's name" }
      ],
      correct: ["a"],
      why: "A streamed tool call opens with content_block_start (name first), then input_json_delta pieces, then content_block_stop. stream.get_final_message() returns the same kind of object as messages.create(), so the rest of the loop doesn't change."
    },
    {
      id: "tu10",
      domain: "Server tools",
      select: 1,
      stem: "Your code execution request to analyze 12 CSV files comes back with stop_reason \"pause_turn\" instead of a finished answer. What should your code do?",
      options: [
        { id: "a", text: "Run the Python from the response yourself and send its output back in a tool_result" },
        { id: "b", text: "Treat the text so far as the final answer, since pause_turn means Claude has finished" },
        { id: "c", text: "Resend the original request with a higher max_tokens, so that the turn has room to finish without pausing" },
        { id: "d", text: "Send the response's content back as an assistant message, with the same tools, so Claude continues" }
      ],
      correct: ["d"],
      why: "Code execution is a server tool, so you write no handler and send no tool_result. When the API pauses a long-running turn, return its content as an assistant message with the same tools, and Claude carries on."
    },
    {
      id: "tu11",
      domain: "Server tools",
      select: 2,
      stem: "Meridian adds the web_search_20260209 tool to check four standards references against official sites. Which two statements match the course? (Choose two.)",
      options: [
        { id: "a", text: "Your code runs each search through a handler and returns the results in a tool_result" },
        { id: "b", text: "allowed_domains takes bare domains such as csagroup.org, and their subdomains are included" },
        { id: "c", text: "The answer arrives as one text block after the last search, so reading the first text block is enough" },
        { id: "d", text: "On Claude 4.6 and later models, dynamic filtering keeps only the relevant parts of the results in context" }
      ],
      correct: ["b", "d"],
      why: "Web search is a server tool: no handler and no tool_result. allowed_domains takes bare domains with no https://, and dynamic filtering is on by default in web_search_20260209 on Claude 4.6+. The answer can span several text blocks, so join them all."
    },
    {
      id: "tu12",
      domain: "Computer use",
      select: 2,
      stem: "Meridian automates PlotDesk, a desktop app with no API, through computer use on the Messages API. Which two statements match the course's setup? (Choose two.)",
      options: [
        { id: "a", text: "Claude connects to the desktop over VNC and clicks on its own once you share the address" },
        { id: "b", text: "Claude only asks for actions; your program carries each one out and sends back the result" },
        { id: "c", text: "Each session gets a dedicated container with no credentials and no directories mounted from the host" },
        { id: "d", text: "Your program and API key run inside the desktop container so actions reach the API faster" }
      ],
      correct: ["b", "c"],
      why: "Claude never connects to the desktop: your program takes the screenshots, clicks and types, and returns the results. Text on the screen can mislead Claude, so the desktop runs in a dedicated container that holds only what the task needs, with your program and key outside."
    },
    {
      id: "tu13",
      domain: "Computer use",
      select: 1,
      stem: "A team wants Claude to export reports from a product that has both a command line and a desktop app. A colleague suggests computer use. What does the course advise?",
      options: [
        { id: "a", text: "Use the command line, because every screenshot stays in the conversation and each step costs more" },
        { id: "b", text: "Use computer use, because clicking through the screens is closest to how a person does the job" },
        { id: "c", text: "Use computer use, but implement every toolset action so that nothing is sent as disabled" },
        { id: "d", text: "Use the browser use tool, because it can drive any desktop window without a full desktop" }
      ],
      correct: ["a"],
      why: "When software has an MCP server, an API or a command line, use that instead. Computer use is for software with none of these, like PlotDesk; the browser use tool fits tasks that stay inside web pages."
    },
    {
      id: "tu14",
      domain: "Tool costs",
      select: 1,
      stem: "You print usage.input_tokens for each request of an agent loop. Request 1 has 606 input tokens; request 37 has 47,905, almost all of it timesheets returned by earlier, independent lookups. Which feature cuts this most?",
      options: [
        { id: "a", text: "Prompt caching, with cache_control on the last tool in the tools list" },
        { id: "b", text: "Strict tool use, so that each timesheet comes back in a shorter format" },
        { id: "c", text: "Programmatic tool calling, so results stay with Claude's script and only its printout reaches Claude" },
        { id: "d", text: "Streaming, so that each tool result reaches Claude in pieces instead of all at once" }
      ],
      correct: ["c"],
      why: "The growth is old tool results sent again with every request, not what every request sends (606 tokens: tool definitions, system prompt and question). With programmatic tool calling, Meridian's run fell from 42 requests and 1,124,799 input tokens to 3 requests and 28,486."
    },
    {
      id: "tu15",
      domain: "Tool costs",
      select: 1,
      stem: "You set up programmatic tool calling so that Claude's script can call get_employee_hours. Besides adding the code execution tool, what marks the tool as callable from the script?",
      options: [
        { id: "a", text: "\"strict\": true on get_employee_hours, so the script always gets valid input" },
        { id: "b", text: "An allowed_callers field on the tool that names the code execution tool" },
        { id: "c", text: "tool_choice set to force get_employee_hours whenever the script runs" },
        { id: "d", text: "disable_parallel_tool_use, so the script calls one tool at a time" }
      ],
      correct: ["b"],
      why: "allowed_callers names the code execution tool at version code_execution_20260120 or later. Strict tools and disable_parallel_tool_use aren't supported, and tool_choice can't force a call from the script. Also send the container's ID back and describe each result's shape."
    },
    {
      id: "tu16",
      domain: "Tool costs",
      select: 1,
      stem: "A second agent sends the same 14 tool definitions, about 3,305 tokens, with every request. How does the course cache all of them with one line?",
      options: [
        { id: "a", text: "Add cache_control to the first tool, so everything after it is cached" },
        { id: "b", text: "Add cache_control to every tool, so each definition is cached separately" },
        { id: "c", text: "Move the definitions into the system prompt and mark the system prompt with cache_control" },
        { id: "d", text: "Add cache_control to the last tool, which caches the whole list as the prefix" }
      ],
      correct: ["d"],
      why: "Caching stores the request's prefix up to the cache point you mark, so the last tool covers the whole list. On Sonnet 5 a cache read costs a tenth of the normal input price, and changing any tool definition loses the cache."
    }
  ]
};
