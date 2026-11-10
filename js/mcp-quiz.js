window.QUIZ_BANK = {
  id: "mcp",
  passPercent: 70,
  questions: [
    {
      id: "mc01",
      domain: "MCP basics",
      select: 1,
      stem: "Your company wants Claude to work with several AWS services. A teammate assumes that only Anthropic can publish MCP servers. According to the course, who can author an MCP server?",
      options: [
        { id: "a", text: "Only Anthropic, which reviews every server before clients can connect to it" },
        { id: "b", text: "Only the owner of the wrapped service, since the server must call that service's API" },
        { id: "c", text: "Anyone; service providers often publish official servers, as AWS might for its services" },
        { id: "d", text: "Only vendors whose servers are registered in the MCP specification" }
      ],
      correct: ["c"],
      why: "Anyone can create an MCP server implementation. Service providers often make their own official ones, for example AWS for its various services."
    },
    {
      id: "mc02",
      domain: "MCP basics",
      select: 2,
      stem: "Which two statements about MCP servers match the course? (Choose two.)",
      options: [
        { id: "a", text: "They come with tool schemas and functions already written, so your app does not author them" },
        { id: "b", text: "They run inside the model, so Claude reaches outside services without your application" },
        { id: "c", text: "They must be hosted by Anthropic before Claude can use any of their tools" },
        { id: "d", text: "Each one acts as an interface to an outside service, exposing tools, prompts and resources" }
      ],
      correct: ["a", "d"],
      why: "An MCP server wraps an outside service and exposes tools, prompts and resources in a standardized way, with the tool definitions and execution already implemented. Your application still reaches it through an MCP client."
    },
    {
      id: "mc03",
      domain: "MCP basics",
      select: 1,
      stem: "The course calls MCP 'transport agnostic'. What does that mean?",
      options: [
        { id: "a", text: "MCP servers can be used with any language model, not only with Claude" },
        { id: "b", text: "The client and server can talk over different protocols, such as stdio on one machine or HTTP" },
        { id: "c", text: "Each server may define its own message format, and clients adapt to it" },
        { id: "d", text: "Tool results may be returned in whatever data format the server prefers" }
      ],
      correct: ["b"],
      why: "Transport agnostic means the connection can use different protocols. The most common setup runs client and server on the same machine over standard input/output; HTTP and other network protocols also work, while the message types are fixed by the MCP spec."
    },
    {
      id: "mc04",
      domain: "MCP client",
      select: 1,
      stem: "Claude's reply contains a tool_use block for a tool that lives on an MCP server. What happens next in the course's request flow?",
      options: [
        { id: "a", text: "Your server runs the tool function itself and sends the output back to Claude" },
        { id: "b", text: "Your server asks the MCP client to run it, and the client sends a CallToolRequest to the MCP server" },
        { id: "c", text: "The MCP client sends a new ListToolsRequest first, to confirm the tool still exists" },
        { id: "d", text: "Claude connects to the MCP server directly and receives a CallToolResult" }
      ],
      correct: ["b"],
      why: "Your server no longer executes tools. It asks the MCP client, which sends a CallToolRequest; the MCP server runs the tool and returns a CallToolResult, which your server passes back to Claude as a tool result."
    },
    {
      id: "mc05",
      domain: "MCP client",
      select: 1,
      stem: "The course project builds an MCP client and an MCP server side by side. What does the course say about a typical real-world project?",
      options: [
        { id: "a", text: "It usually implements one side: a client that uses others' servers, or a server for others to use" },
        { id: "b", text: "It usually needs both, because every MCP server ships with the only client that can reach it" },
        { id: "c", text: "It usually builds only the server, because the MCP client is part of Claude itself" },
        { id: "d", text: "It usually builds only the client, because only service providers may publish servers" }
      ],
      correct: ["a"],
      why: "On a real project you typically write either a client, to connect to servers other engineers built, or a server, to give developers access to your service. The course builds both only to show how they work together."
    },
    {
      id: "mc06",
      domain: "MCP client",
      select: 1,
      stem: "In the course project, the MCPClient class wraps the SDK's ClientSession instead of using the session directly. Why?",
      options: [
        { id: "a", text: "ClientSession can only list tools, so the class adds the ability to call them" },
        { id: "b", text: "The session needs careful resource cleanup, and the class handles connecting and cleaning up" },
        { id: "c", text: "ClientSession talks to Claude, so the class redirects it to the MCP server" },
        { id: "d", text: "The class turns the server's tools into Python functions that Claude imports" }
      ],
      correct: ["b"],
      why: "ClientSession is the actual connection to the server and must be cleaned up when the program is done with it. Wrapping it in a custom class that handles that cleanup is common practice."
    },
    {
      id: "mc07",
      domain: "Tools and Inspector",
      select: 1,
      stem: "The course's edit_document tool takes doc_id, old_str and new_str. What does it do when the document ID exists?",
      options: [
        { id: "a", text: "Replaces old_str with new_str in the document's in-memory content, a plain find-and-replace" },
        { id: "b", text: "Overwrites the whole document with new_str and keeps old_str as an undo copy" },
        { id: "c", text: "Returns the edited text to Claude without saving it, so Claude can confirm first" },
        { id: "d", text: "Appends new_str to the document after the first line that contains old_str" }
      ],
      correct: ["a"],
      why: "After checking the ID, the tool runs docs[doc_id].replace(old_str, new_str) on the in-memory dictionary. The old_str description warns that the text must match exactly, including whitespace."
    },
    {
      id: "mc08",
      domain: "Tools and Inspector",
      select: 1,
      stem: "You started the inspector with mcp dev mcp_server.py and opened the local URL in your browser. What must you do before you can list and run your tools?",
      options: [
        { id: "a", text: "Click Connect, which starts your MCP server and changes the status to Connected" },
        { id: "b", text: "Enter an Anthropic API key, because the inspector asks Claude to run each tool" },
        { id: "c", text: "Start uv run main.py in another terminal so the CLI can forward tool calls" },
        { id: "d", text: "Upload mcp_server.py on the Tools tab so the inspector can read its tools" }
      ],
      correct: ["a"],
      why: "The Connect button starts your server. After that, List Tools in the Tools section shows its tools, and Run Tool calls them without Claude or the CLI app."
    },
    {
      id: "mc09",
      domain: "Tools and Inspector",
      select: 1,
      stem: "In the inspector, edit_document on deposition.md reports success but shows no document text. How do you confirm that the edit was applied?",
      options: [
        { id: "a", text: "Restart the inspector and open mcp_server.py, because state is reset after every call" },
        { id: "b", text: "Run read_doc_contents with the same document ID, since the inspector keeps server state between calls" },
        { id: "c", text: "Ask Claude through the CLI, because the inspector cannot display document contents" },
        { id: "d", text: "Run edit_document again with the same inputs; a second success confirms the first" }
      ],
      correct: ["b"],
      why: "edit_document only edits and does not return the document. The inspector keeps server state between tool calls, so running the read tool next shows whether the change was saved."
    },
    {
      id: "mc10",
      domain: "Resources",
      select: 1,
      stem: "A recipe MCP server must let clients fetch the list of all recipe names and the full text of a single recipe. How does the course suggest exposing this?",
      options: [
        { id: "a", text: "One direct resource that returns every recipe with its full text, for the client to filter" },
        { id: "b", text: "Two resources, one per read operation: a direct one for the names, a templated one for a recipe" },
        { id: "c", text: "A tool for the list of names and a separate direct resource for each recipe's text" },
        { id: "d", text: "One templated resource whose parameter is left empty to get the list of names" }
      ],
      correct: ["b"],
      why: "You usually define one resource for each distinct read operation. The list needs no parameters, so it is a direct resource; a single recipe takes its ID from a templated URI."
    },
    {
      id: "mc11",
      domain: "Resources",
      select: 1,
      stem: "A resource declared with mime_type=\"application/json\" returns list(docs.keys()). What does the course say about turning that list into JSON?",
      options: [
        { id: "a", text: "The function must call json.dumps itself, or the resource read fails" },
        { id: "b", text: "The client receives a Python list object, so no conversion happens on either side" },
        { id: "c", text: "The mime_type makes the SDK parse the data in the client, with no client code needed" },
        { id: "d", text: "The SDK serializes the return value; the client gets JSON text that it parses itself" }
      ],
      correct: ["d"],
      why: "The MCP Python SDK serializes whatever the resource function returns. The mime_type is only a hint, so the client's read_resource parses application/json text with json.loads."
    },
    {
      id: "mc12",
      domain: "Resources",
      select: 1,
      stem: "The CLI reads docs://documents/report.pdf, which the server declares with mime_type=\"text/plain\". What does the course's read_resource return?",
      options: [
        { id: "a", text: "The whole ReadResourceResult, so the caller can choose which item to use" },
        { id: "b", text: "The text of the first item in result.contents, returned as a plain string" },
        { id: "c", text: "A Python object produced by json.loads from the document's text" },
        { id: "d", text: "Every item in result.contents, joined together in order" }
      ],
      correct: ["b"],
      why: "read_resource takes result.contents[0]. Only when its mimeType is application/json does it call json.loads; otherwise it returns resource.text unchanged."
    },
    {
      id: "mc13",
      domain: "Prompts",
      select: 1,
      stem: "The course's format prompt returns [base.UserMessage(prompt)]. What else can a function decorated with @mcp.prompt return?",
      options: [
        { id: "a", text: "Nothing else; the SDK rejects a list with more than one user message" },
        { id: "b", text: "A system prompt string that each client must set before calling Claude" },
        { id: "c", text: "Several user and assistant messages, to build a more complex conversation flow" },
        { id: "d", text: "A tool_use block that makes Claude call edit_document right away" }
      ],
      correct: ["c"],
      why: "A prompt returns a list of messages that are sent directly to Claude, and the list can include multiple user and assistant messages."
    },
    {
      id: "mc14",
      domain: "Prompts",
      select: 1,
      stem: "The CLI calls get_prompt(\"format\", {\"doc_id\": \"plan.md\"}). What happens to that dictionary?",
      options: [
        { id: "a", text: "It is sent to Claude as a second user message after the prompt text" },
        { id: "b", text: "Its keys become keyword arguments of the prompt function, so plan.md goes into the prompt" },
        { id: "c", text: "It becomes the input of a tool call that Claude has to run first" },
        { id: "d", text: "It is turned into a resource URI that the server then reads" }
      ],
      correct: ["b"],
      why: "Arguments provided by the client become keyword arguments in the prompt function, which interpolates doc_id into the prompt and returns the messages."
    },
    {
      id: "mc15",
      domain: "Choosing primitives",
      select: 1,
      stem: "Claude's interface has an 'Add from Google Drive' button that lists documents and adds the chosen one's contents to the chat as context. Which primitive would the course use to build it?",
      options: [
        { id: "a", text: "A tool, because Claude decides which document belongs in the chat" },
        { id: "b", text: "A prompt, because the user starts the action by clicking a button" },
        { id: "c", text: "A resource, because app code decides which documents to list and injects the content" },
        { id: "d", text: "A tool and a prompt together, because both the user and Claude take part" }
      ],
      correct: ["c"],
      why: "Resources are app-controlled: the application knows which documents to render and handles injecting the chosen content. A click alone does not make it a prompt, since no predefined workflow starts."
    },
    {
      id: "mc16",
      domain: "Choosing primitives",
      select: 2,
      stem: "Following the course's decision guide, which two features call for tools on an MCP server? (Choose two.)",
      options: [
        { id: "a", text: "Showing project names in an autocomplete list as the user types" },
        { id: "b", text: "Letting Claude fetch live exchange rates whenever it decides it needs them" },
        { id: "c", text: "Offering a /summarize command that users pick from a menu" },
        { id: "d", text: "Letting Claude create a tracker ticket when it judges the conversation needs one" }
      ],
      correct: ["b", "d"],
      why: "Tools give Claude new capabilities that it decides to use on its own. An autocomplete list is app data (a resource), and a user-picked command is a predefined workflow (a prompt)."
    }
  ]
};
