window.QUIZ_BANK = {
  id: "platform-101",
  passPercent: 70,
  questions: [
    {
      id: "pl01",
      domain: "Platform & models",
      select: 1,
      stem: "Your help desk prototype makes one Claude call per ticket. Next quarter it will make thousands, and the team needs retries, queues, and observability. Which layer of the Claude Platform does the course say covers this?",
      options: [
        { id: "a", text: "Primitives: the Messages API, tool use, files, and the other building blocks you call from code" },
        { id: "b", text: "Infrastructure: managed agents, retries, queues, and observability for scaling past a prototype" },
        { id: "c", text: "Controls: the dashboards and evals your team uses once the system is live" },
        { id: "d", text: "None; retries and queues are outside the platform and must be written into your own client" }
      ],
      correct: ["b"],
      why: "The course's shorthand is: build with primitives, scale on infrastructure, run with control. Retries, queues, observability, and managed agents make up the infrastructure layer."
    },
    {
      id: "pl02",
      domain: "Platform & models",
      select: 1,
      stem: "A teammate's script prints message.content directly and expects a plain string. The course's code-review example handles the response differently. What does it do?",
      options: [
        { id: "a", text: "Calls message.text, which joins all blocks into a single string" },
        { id: "b", text: "Reads only message.content[0], because Claude returns exactly one block" },
        { id: "c", text: "Loops over message.content and checks each block's type, printing the text blocks" },
        { id: "d", text: "Sets a response_format parameter so that content comes back as a string" }
      ],
      correct: ["c"],
      why: "content is an array of blocks, not a string. Claude can return text, tool calls, and thinking, so the course always loops and checks each block's type."
    },
    {
      id: "pl03",
      domain: "Platform & models",
      select: 1,
      stem: "You are about to build a feature that tags incoming support emails by product area. Before writing production code, how does the course suggest picking the model?",
      options: [
        { id: "a", text: "Start with the most capable model and drop down only if the bill becomes a problem" },
        { id: "b", text: "Run 20–30 representative examples through Haiku first, and step up to Sonnet, then Opus, only if quality doesn't hold" },
        { id: "c", text: "Pick Sonnet for every feature, because it is the balanced tier for production work" },
        { id: "d", text: "Ask Claude in the Console which model it recommends for the task" }
      ],
      correct: ["b"],
      why: "A small evaluation on your real workload, run from Haiku upward, finds the cheapest model whose output you would actually ship."
    },
    {
      id: "pl04",
      domain: "Platform & models",
      select: 1,
      stem: "An operations dashboard has one document processing route. It classifies every incoming file, drafts client updates, and writes RFP responses. Which setup matches the course?",
      options: [
        { id: "a", text: "Claude Fable for all three, since it is the most capable tier" },
        { id: "b", text: "Haiku for all three, because the route handles high volume" },
        { id: "c", text: "Haiku to classify files, Sonnet to draft client updates, and Opus only for RFP responses" },
        { id: "d", text: "A separate endpoint for each model, since one route can call only one model" }
      ],
      correct: ["c"],
      why: "The course routes work per task inside the same endpoint: one queue, three models, picked per task. Fable costs more than Opus and is reserved for work where that extra capability pays off."
    },
    {
      id: "pl05",
      domain: "Agent loop & tools",
      select: 1,
      stem: "Your agent loop breaks on end_turn and, for every other stop reason, sends the messages to Claude again. One reply is cut off at max_tokens. What happens, according to the course?",
      options: [
        { id: "a", text: "The loop resends the same request again and again, because nothing new was added to messages, and you pay each time" },
        { id: "b", text: "The SDK raises an exception, so the loop stops on its own" },
        { id: "c", text: "Claude continues the cut-off reply automatically on the next request" },
        { id: "d", text: "The API changes the stop reason to tool_use so the loop can recover" }
      ],
      correct: ["a"],
      why: "Loop only while the stop reason is tool_use. Without a branch that breaks on any other stop reason, a max_tokens reply leaves messages unchanged and the same paid request repeats."
    },
    {
      id: "pl06",
      domain: "Agent loop & tools",
      select: 2,
      stem: "You are building the course's compliance agent, which looks up building codes while reviewing a structural report. Following the lesson, which two parts are yours to own? (Choose two.)",
      options: [
        { id: "a", text: "The loop that sends messages, checks the stop reason, and feeds tool results back" },
        { id: "b", text: "Deciding which building code section is relevant to each part of the report" },
        { id: "c", text: "The tools, such as the lookup that queries your building-code library" },
        { id: "d", text: "Training Claude on your building-code library before the first request" }
      ],
      correct: ["a", "c"],
      why: "The recap puts it plainly: you own the loop and the tools, Claude owns the reasoning. Choosing which section to look up is Claude's decision."
    },
    {
      id: "pl07",
      domain: "Agent loop & tools",
      select: 1,
      stem: "You give Claude two tools, get_weather and get_forecast, and ask what to pack for a three-day trip. How does Claude decide which tool to call for each part of the question?",
      options: [
        { id: "a", text: "It calls the tools in the order they appear in the tools array" },
        { id: "b", text: "It reads each tool's description and maps \"today\" and \"the next few days\" to the matching tool" },
        { id: "c", text: "Your runTool switch statement inspects the prompt and picks the tool" },
        { id: "d", text: "It picks the tool whose input schema has the fewest required fields" }
      ],
      correct: ["b"],
      why: "Claude chooses from the descriptions; your switch only dispatches after Claude has named a tool. Vague descriptions are the number one reason agents misfire."
    },
    {
      id: "pl08",
      domain: "Agent loop & tools",
      select: 1,
      stem: "Your TypeScript agent has grown into a while loop, a stop-reason switch, and a handwritten JSON schema for every function. What does switching to the SDK's tool runner give you?",
      options: [
        { id: "a", text: "Your tools run on Anthropic's servers, so you no longer write run functions" },
        { id: "b", text: "Tool descriptions become optional, because the runner infers them from function names" },
        { id: "c", text: "Nothing yet; the runner exists only in the Python SDK, so the code must be ported first" },
        { id: "d", text: "Each tool is defined once with a short Zod schema, and the runner handles the tool_use and tool_result loop" }
      ],
      correct: ["d"],
      why: "With betaZodTool each tool gets a Zod schema that also validates Claude's input, and awaiting the runner returns the final message. Your run functions still execute in your code."
    },
    {
      id: "pl09",
      domain: "Agent loop & tools",
      select: 2,
      stem: "Your team is turning on thinking for a compliance review that runs on Claude Opus 5. Which two statements match the course? (Choose two.)",
      options: [
        { id: "a", text: "Thinking is adaptive and on by default; Claude decides when and how much to think, with no token budget to pick" },
        { id: "b", text: "Thinking should also be raised for simple classification and extraction, since it improves every task" },
        { id: "c", text: "The effort parameter goes inside output_config, with levels from low to max and high as the default" },
        { id: "d", text: "The full reasoning text comes back in every response, whatever the thinking setting" }
      ],
      correct: ["a", "c"],
      why: "On Opus 5 you dial depth with output_config.effort. A summary of the reasoning comes back only with \"display\": \"summarized\", and on simple tasks thinking just adds latency and cost."
    },
    {
      id: "pl10",
      domain: "Extending the agent",
      select: 1,
      stem: "Your agent will use the memory tool and the bash tool. A teammate assumes Anthropic runs them the same way it runs web search. What does the course say?",
      options: [
        { id: "a", text: "Anthropic runs both in its sandbox, and their results come back inside the same response" },
        { id: "b", text: "They are client tools: Claude already knows their schemas, but your application runs them, with storage you provide for memory" },
        { id: "c", text: "You must write full JSON schemas for both, exactly as for any custom tool" },
        { id: "d", text: "They work only inside managed agents, not on a messages.create call" }
      ],
      correct: ["b"],
      why: "Client tools run where your code runs. Anthropic publishes their schemas and trains Claude on them; four SDKs ship a memory helper, and your application runs the bash shell itself."
    },
    {
      id: "pl11",
      domain: "Extending the agent",
      select: 1,
      stem: "You uploaded a status-report Skill and attached it through container.skills on a messages.create call, but the Skill cannot run its bundled scripts. What is missing, according to the course?",
      options: [
        { id: "a", text: "The skills-2025-10-02 beta header, which every Skill request still requires" },
        { id: "b", text: "The full text of SKILL.md, pasted into the system prompt of each request" },
        { id: "c", text: "The code execution tool in the tools array, because on the API Skills run inside its container" },
        { id: "d", text: "A fresh upload of the Skill with client.skills.create before every request" }
      ],
      correct: ["c"],
      why: "Skills are generally available, so the beta header is no longer required. They run in the code execution tool's container, which is what lets a Skill's procedure do real work."
    },
    {
      id: "pl12",
      domain: "Extending the agent",
      select: 1,
      stem: "Your agent must read tasks from Asana, follow your team's weekly report template, and query your internal inventory database. Which assignment matches the course's guidance?",
      options: [
        { id: "a", text: "MCP for Asana, a Skill for the report template, and a custom tool for the inventory database" },
        { id: "b", text: "Custom tools for all three, so that you control every piece of integration code" },
        { id: "c", text: "A Skill for Asana, MCP for the report template, and a custom tool for the database" },
        { id: "d", text: "MCP for all three, because MCP replaces both tools and Skills" }
      ],
      correct: ["a"],
      why: "Tools are for your stuff, Skills for your processes, and MCP for everyone else's stuff. Asana maintains its MCP server, so changes to its API don't land on you."
    },
    {
      id: "pl13",
      domain: "Extending the agent",
      select: 1,
      stem: "You connect a Slack MCP server through the MCP connector. Claude should be able to search messages and list channels but not post or delete. How does the course configure this?",
      options: [
        { id: "a", text: "Leave the toolset at its default, which exposes only the read tools" },
        { id: "b", text: "Drop the authorization token so the server falls back to read-only access" },
        { id: "c", text: "In the mcp_toolset entry, disable all tools with default_config and enable only search_messages and list_channels in configs" },
        { id: "d", text: "List the write tools in the system prompt and ask Claude not to call them" }
      ],
      correct: ["c"],
      why: "By default every tool on the server is available. Disabling all of them and enabling specific ones keeps the server read-only and keeps unused tool definitions out of context."
    },
    {
      id: "pl14",
      domain: "Context management",
      select: 1,
      stem: "A support agent should remember a user's preferences and last week's decisions when the user comes back for a new session. Which of the course's four context patterns fits?",
      options: [
        { id: "a", text: "Server-side compaction, which summarizes old turns into a single block" },
        { id: "b", text: "Prompt caching, which reuses the stable parts of a request at lower cost" },
        { id: "c", text: "Just-in-time context, which loads data only when a tool asks for it" },
        { id: "d", text: "The memory tool, where Claude reads and writes a memory directory backed by storage you implement" }
      ],
      correct: ["d"],
      why: "Each pattern handles a different failure mode: caching handles cost, compaction handles window size, and the memory tool handles statelessness across sessions."
    },
    {
      id: "pl15",
      domain: "Context management",
      select: 2,
      stem: "A long-running agent is getting expensive, and its conversations are growing toward the context window limit. Which two statements match the course? (Choose two.)",
      options: [
        { id: "a", text: "Server-side compaction is opted into with a context_management key, and the API summarizes old turns once input crosses the trigger threshold" },
        { id: "b", text: "Just-in-time context is a first-class API feature, switched on with a request parameter" },
        { id: "c", text: "When the window fills up, the API silently drops the oldest messages and carries on" },
        { id: "d", text: "Prompt caching marks stable parts such as the system prompt and tool definitions, so later calls reuse them at a fraction of the cost" }
      ],
      correct: ["a", "d"],
      why: "Just-in-time context is the one design pattern among the four, not an API switch. Once the window is full the request fails, which is why compaction exists."
    },
    {
      id: "pl16",
      domain: "Managed agents",
      select: 1,
      stem: "On the course's Kanban board, a managed agent picks up a ticket to optimize website performance. How does the agent know when the work is actually done?",
      options: [
        { id: "a", text: "It stops after a fixed number of tool calls configured on the session" },
        { id: "b", text: "A rubric defines done, and a separate grader in its own context window checks the output, so Claude fixes what it missed and resubmits" },
        { id: "c", text: "The developer watching the event stream sends a stop message when satisfied" },
        { id: "d", text: "Claude reviews its own output in the same context and stops once it agrees" }
      ],
      correct: ["b"],
      why: "Outcomes are rubrics plus graders that define and check what done looks like. In the demo, the grader's feedback loop took the Lighthouse score to 96."
    },
    {
      id: "pl17",
      domain: "Managed agents",
      select: 1,
      stem: "Your app creates a managed agent session, sends the kickoff user.message event, and only then opens the event stream. The first agent events never show up. What does the course recommend?",
      options: [
        { id: "a", text: "Open the event stream before sending the kickoff, since it delivers only events that occur after it opens" },
        { id: "b", text: "Create a new agent for every session, because an agent cannot be reused" },
        { id: "c", text: "Switch the environment's networking to unrestricted so events can reach your app" },
        { id: "d", text: "Send the kickoff twice so the stream catches the second copy" }
      ],
      correct: ["a"],
      why: "The stream delivers only events that happen after it opens. If the connection drops later, the session's event history is on the server: list past events and skip duplicates."
    },
    {
      id: "pl18",
      domain: "Claude Code",
      select: 1,
      stem: "You open a project with a stubbed weather.ts in Claude Code and want it to finish the Claude API integration in one go. What does the course say a good prompt does?",
      options: [
        { id: "a", text: "Pastes the whole Claude API reference, so nothing has to be guessed" },
        { id: "b", text: "Says only \"finish this\", because the Claude API skill fills in everything else" },
        { id: "c", text: "Lists every line of code to write, so Claude Code only has to type it" },
        { id: "d", text: "Names the file to change, the pattern to use, and the end state you expect" }
      ],
      correct: ["d"],
      why: "With the file, the pattern (such as the tool runner), and the end state named, Claude Code writes the code, runs it, and fixes errors in place. The built-in Claude API skill loads when it detects the TypeScript SDK, or via /claude-api."
    }
  ]
};
