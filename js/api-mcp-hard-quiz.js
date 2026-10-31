window.QUIZ_BANK = {
  id: "api-mcp-hard",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "mh01",
      domain: "MCP basics",
      select: 1,
      stem: "A team building a support assistant wants to connect a popular project-tracking SaaS. Two MCP servers exist for it: an official one published by the vendor, and one from a well-known open-source integration project that exposes more operations. The assistant will update customer tickets through the company's admin account. Which consideration should drive the choice between the two servers?",
      options: [
        { id: "a", text: "Whether the server covers the most operations, since a wider tool set handles more kinds of requests" },
        { id: "b", text: "Whether each tool's description states its effects, since Claude then knows which calls are safe for the admin account" },
        { id: "c", text: "Whether the server is the vendor's official one, since the client checks an official server's tools before Claude calls them" },
        { id: "d", text: "Whether the team trusts the server's publisher, since the server runs code and receives data on the team's behalf" }
      ],
      correct: ["d"],
      why: "Lesson 54, Introducing MCP: 'Anyone can create an MCP server implementation. Often, service providers themselves will make their own official MCP implementations', and the lesson note gives the criterion for choosing between such servers: an MCP server executes code and receives data on your behalf, so connect servers from trusted sources and give them the minimum rights. Both servers here have a known publisher, so what decides is which of them the team trusts with an account that can change customer tickets (d). Extra operations (a) do not outweigh that: operations beyond what the assistant needs widen what Claude and the server can do through the admin account, the opposite of the note's advice to give servers the minimum rights. Tool descriptions (b) are what Claude uses to decide when and how to call a tool (note to Lesson 57, Defining tools with MCP), but the server's publisher writes them, and the tools themselves are 'authored and executed inside a dedicated MCP server' (Lesson 54), so a well-written description says nothing binding about what the server's code does with the account. Official status (c) brings no check by the client: the client sends a ListToolsRequest, gets back the list of tools and later sends a CallToolRequest for the tool Claude picked (Lesson 55, MCP clients), and the course's client returns the tools from the result as they are (Lesson 59, Implementing a client); the specification likewise tells clients to treat tool annotations as untrusted unless they come from trusted servers (modelcontextprotocol.io, Tools), so the trust decision stays with the team."
    },
    {
      id: "mh02",
      domain: "MCP basics",
      select: 1,
      stem: "A company runs an internal ticketing system with a REST API. Its engineers want Claude to work with tickets from tools they already use, all three of which support MCP: Claude Desktop, Claude Code and a partner's chat assistant. The company has no plans for an assistant of its own. Following the course's advice on real-world projects, what should the team build around the ticketing API?",
      options: [
        { id: "a", text: "An MCP client that wraps the ticketing API, which each of those tools then loads to reach the tickets" },
        { id: "b", text: "An MCP server and an MCP client shipped as a pair, so that each of those tools gets both halves" },
        { id: "c", text: "An MCP server wrapping the ticketing API, which each of those tools reaches through its own client" },
        { id: "d", text: "A plugin for each of those tools that calls the ticketing API whenever Claude asks for a ticket" }
      ],
      correct: ["c"],
      why: "Lesson 56, Project setup: 'In real-world projects, you typically implement either an MCP client or an MCP server, not both' — a server 'to expose your service to other developers', a client 'to connect to existing MCP servers' — and the course builds both 'purely for educational purposes'. The consumers here already contain the client side: Claude Code 'has an MCP client built right into it' (Lesson 68, Enhancements with MCP servers), and the note in Lesson 54, Introducing MCP, says the same server can be connected to Claude Code, Claude Desktop, an IDE or your own app. What is missing is the server that wraps the ticketing API (c). Option a gives the wrapper role to the wrong side: the client is the communication bridge inside the consuming application (Lesson 55, MCP clients), while the server is the wrapper around the outside service (Lesson 54). Option b copies the course's teaching setup, which Lesson 56 says real projects do not follow. Option d rebuilds the integration once per host — the work an MCP server removes by packaging it into a reusable component 'that any application can connect to' (Lesson 54)."
    },
    {
      id: "mh03",
      domain: "MCP basics",
      select: 2,
      stem: "A travel company's assistant now gets bookings through a provider's official MCP server, reached through an MCP client in its app. Since the switch, input tokens per request have roughly tripled, though conversations are as long as before. The provider's server lists 120 tools, and the assistant uses about 10 of them. Which two statements about the growth and its fix are accurate? (Choose two.)",
      options: [
        { id: "a", text: "The client can name the booking tools in its list request, so the server returns just those definitions" },
        { id: "b", text: "Each listed tool reaches Claude as a definition in every request, so the full list adds to every call" },
        { id: "c", text: "MCP also adds the server's resources and prompts to each request, so the growth comes from more than tools" },
        { id: "d", text: "The app's code assembles each request to Claude, so it can pass on just the booking tools it needs" }
      ],
      correct: ["b", "d"],
      why: "Lesson 54, Introducing MCP: MCP servers and tool use are 'complementary', and the lesson note adds that Claude still sees ordinary tool definitions (name, description, schema). Lesson 55, MCP clients: the app asks the client for the tool list (ListToolsRequest/ListToolsResult) and then 'has everything needed to make the initial request to Claude - both the user's question and the available tools', so every listed tool travels to Claude as a definition in the request, and the tool-use documentation counts the names, descriptions and schemas in the tools parameter as input tokens (platform.claude.com, Tool use with Claude, Pricing) — that is the growth (b). The app's own code builds that request — the note to Lesson 59, Implementing a client, says the app converts the listed tools into the Claude API's tools format — so it can pass on just the tools the assistant needs (d). The list request cannot name tools (a): in Lesson 55 the client asks the server what tools it provides, and the ListToolsResult 'contains a list of all the different tools that it can provide' (video); the specification's tools/list request takes only a pagination cursor (modelcontextprotocol.io, Tools), so the narrowing has to happen where the app builds the request to Claude. Resources and prompts are not added by themselves: the app's code decides when to read a resource and a user decides when a prompt runs (Lesson 64, MCP review), so c is wrong."
    },
    {
      id: "mh04",
      domain: "Clients & transport",
      select: 1,
      stem: "A CLI assistant connected to an issue-tracker MCP server answers 'which tickets are assigned to me?' with a raw JSON dump. Tracing shows the app asks the client to run the tool Claude requested, receives the CallToolResult, and prints its content to the terminal. The team wants the user to see a sentence like 'You have three tickets: …' and has no templating layer of its own. What should the app do with the result instead?",
      options: [
        { id: "a", text: "Return it to Claude as the tool result in a follow-up message and show the user Claude's reply" },
        { id: "b", text: "Ask the MCP server to render the result for the user, since the tool's author knows what it looks like" },
        { id: "c", text: "Parse it inside the client by its MIME type, the way resource contents are handled before they are used" },
        { id: "d", text: "Add output-format wording to the tool's description so the server returns prose" }
      ],
      correct: ["a"],
      why: "Lesson 55, MCP clients: after the client hands back the CallToolResult, 'your server sends the tool results back to Claude in a follow-up message', and only then does Claude write the formatted answer that your server passes to the user — the tool-call loop stays in the app, and the client's job ends at fetching the result (a). The server returns data for the tool call; nothing in the flow asks it to render output for a user (b). Parsing by MIME type is what the client does with resource contents in Lesson 61, Accessing resources; a tool result goes back to Claude, not into the UI (c). The description tells Claude when and how to call the tool (Lesson 57, Defining tools with MCP); it does not change what the function returns (d)."
    },
    {
      id: "mh05",
      domain: "Clients & transport",
      select: 1,
      stem: "A document server built with the course's SDK has so far been started by a CLI on each developer's laptop. The company now wants a single copy of it running on a separate host, used by several web apps that other teams deploy elsewhere. A reviewer asks what the move involves. Which plan is accurate?",
      options: [
        { id: "a", text: "Serve it over an HTTP-based MCP transport, so the apps' clients send it the same list and call messages as before" },
        { id: "b", text: "Keep the stdio transport, since a stdio server on that host accepts list and call messages from any client that connects" },
        { id: "c", text: "Give each tool its own HTTP endpoint on that host, as MCP's HTTP transport does, so the apps' clients call tools by URL" },
        { id: "d", text: "Point the apps at the inspector's port on that host, since the inspector already serves the tools over HTTP" }
      ],
      correct: ["a"],
      why: "Lesson 55, MCP clients: MCP is 'transport agnostic' — the most common setup runs client and server on the same machine over standard input/output, but 'MCP clients and servers can also connect over HTTP, WebSockets' and other network protocols, and once connected they 'exchange specific message types defined in the MCP specification' (ListToolsRequest, CallToolRequest and so on). The lesson note names Streamable HTTP as the specification's standard network transport, in which each message is an HTTP POST to a single MCP endpoint, and the current specification says protocol semantics are identical on every transport (modelcontextprotocol.io, Transports), so the move changes how client and server connect, not the messages (a). Stdio is the transport for a server on the same machine as its client — in the note's words, the server is the client's subprocess and the messages go through its standard streams — so a stdio server on another host is not something the apps can connect to (b). Per-tool endpoints (c) are not how MCP's HTTP transport works: the tools are still listed and called with the same messages, all sent to one MCP endpoint. The inspector is a development tool for testing a server 'without connecting to a full application' (Lesson 58, The server inspector), not the endpoint through which production clients reach it (d)."
    },
    {
      id: "mh06",
      domain: "Clients & transport",
      select: 1,
      stem: "While debugging a failing 'list my open pull requests' request, a developer adds request logging to the app's MCP client, expecting to capture the HTTP call to GitHub's API. The log shows the ListToolsRequest and a CallToolRequest with the arguments Claude supplied, but no call to GitHub at all. What explains the missing call?",
      options: [
        { id: "a", text: "The call left through the session's transport, not the client class, so the app's logging sits one layer too high" },
        { id: "b", text: "The server reaches GitHub itself once it is handed the tool call, so that traffic shows up in the server's own logs" },
        { id: "c", text: "Claude performed the GitHub lookup while producing the tool-use block, so no request to GitHub passes through the app" },
        { id: "d", text: "The server returns the GitHub request inside its CallToolResult, and the app sends it later, outside the client's logging" }
      ],
      correct: ["b"],
      why: "Lesson 55, MCP clients (video): 'The MCP client, however, doesn't actually run the tool. It's going to send a call tool request off to the MCP server. The MCP server will receive that request and make a follow request off to GitHub.' The client's part is to send the CallToolRequest and pass the CallToolResult back to the app — 'the MCP client in turn would hand the result off to our server' — so its log is complete, and the GitHub request happens only inside the server (b). Option a looks for the GitHub call in the client's own plumbing; the session is 'the actual connection to our MCP server' (Lesson 59, Implementing a client), so it carries the MCP messages the log already shows, not a call to GitHub. Option c mistakes the model's role: Claude only responds 'with some tool use message part' (Lesson 55), and the server does the work. Option d turns the result around: 'GitHub returns the repository data, which flows back through the MCP server as a CallToolResult' (Lesson 55), so the result carries data the server has already fetched, not a request for the app to send."
    },
    {
      id: "mh07",
      domain: "Server",
      select: 1,
      stem: "A team's document server exposes a read tool and an edit tool. In the MCP Inspector both run as expected, including an edit followed by a read that shows the change. In the chat app, however, Claude answers 'change X to Y in plan.md' by reading the document and describing the edit in prose, and the edit tool is never invoked. Request logs show the full tool list, edit tool included, on every request. What does the inspector result tell the team?",
      options: [
        { id: "a", text: "The server works; the inspector validated the definitions Claude gets, so the edit tool's description can be ruled out" },
        { id: "b", text: "The server works; the inspector showed the server's own schemas, so the client's rebuilt schemas should be compared with them" },
        { id: "c", text: "The server works; the inspector ran the tools without a model, so Claude's tool choice has to be tested in the app" },
        { id: "d", text: "The server works; the inspector showed the edit tool returns nothing, so it must return the edited text for Claude to call it" }
      ],
      correct: ["c"],
      why: "Lesson 58, The server inspector: the inspector lets you 'test your functionality without connecting to a full application' and 'eliminates the need to wire up your server to Claude'; the lesson note draws the consequence — it checks whether the server executes tools correctly, not whether Claude selects them, and selection is checked in the app, with an eval, as in the prompt-evaluation block (c). For the same reason the inspector cannot clear the edit tool's description (a): the description and the Field descriptions are what Claude uses to decide when and how to call a tool (note to Lesson 57, Defining tools with MCP), and no model read them in the inspector. There are no rebuilt schemas to compare (b): the schema is generated on the server by the SDK from the decorator, type hints and Field descriptions (Lesson 57), the client returns the tools from the ListToolsResult as they are (Lesson 59, Implementing a client), and the app only carries them over into the API's tools format (note to Lesson 59). The edit tool returns nothing by design — 'that tool does not actually return the document's contents. It just edits the document' (Lesson 58, video) — and Claude picks a tool before it sees any result: 'Claude examines the tools and decides it needs to call one' (Lesson 55, MCP clients), and the tool-use documentation says Claude decides 'based on the user's request and the tool's description', so an edited text in the result would not make Claude call the tool (d)."
    },
    {
      id: "mh08",
      domain: "Server",
      select: 1,
      stem: "A document server stores PDF reports under IDs such as 'quarterly-report.pdf'. Users refer to documents by bare names like 'quarterly-report', so Claude first calls the read tool with that string, gets a not-found error, retries with '.pdf' added and then answers. The product owner wants the first read call to succeed, because the retry adds a model round trip to every such question. What should the server's author change?",
      options: [
        { id: "a", text: "Add a tool that lists the stored IDs with their extensions, described so that Claude calls it before any read" },
        { id: "b", text: "Expose each document as a templated resource keyed by its full ID, extension included, so Claude reads it by URI" },
        { id: "c", text: "Offer a 'find document' prompt that users run first, so the exact .pdf ID is already in the chat" },
        { id: "d", text: "Describe the ID parameter as the stored file name, .pdf extension included, and give an example ID" }
      ],
      correct: ["d"],
      why: "Lesson 57, Defining tools with MCP: 'The Field class from Pydantic provides parameter descriptions that help Claude understand what each argument expects', and the lesson note adds that the description and the Field descriptions are what Claude uses to decide when and how to call a tool. Claude's mistake is the format of the argument, so a parameter description saying that an ID is the stored file name with its .pdf extension, with an example, lets the first call succeed (d). A list tool (a) makes the read succeed only after another tool call, and every tool call is a model round trip — the call goes back to the app and the result returns to Claude in a follow-up message (Lesson 55, MCP clients) — so it costs what the retry cost. In the course's architecture resources are read by the app's code, not chosen by Claude (Lesson 61, Accessing resources; Lesson 64, MCP review), so a templated resource keyed by the full ID leaves Claude's read call as it was (b). Prompts are user-controlled (Lesson 64): a 'find document' prompt depends on users running it before each question, and Claude's own call is unchanged when they do not (c)."
    },
    {
      id: "mh09",
      domain: "Server",
      select: 2,
      stem: "A document MCP server's read tool returns the entire document, and some documents run to hundreds of pages. Requests from the chat app now fail with an input-too-large error whenever Claude reads one of them, yet users need answers that quote exact passages from anywhere in such documents. Which two server changes solve this? (Choose two.)",
      options: [
        { id: "a", text: "Give the read tool a page-range parameter, so that Claude can read a long document a few pages at a time" },
        { id: "b", text: "Expose the pages of each document as templated resources, so that Claude reads just the pages it needs by URI" },
        { id: "c", text: "Add a search tool to the server, so that Claude gets back just the parts of a document matching its query" },
        { id: "d", text: "Have the read tool split a document into page-numbered blocks, so that each block Claude reads stays under the input limit" }
      ],
      correct: ["a", "c"],
      why: "Lesson 57, Defining tools with MCP: the server defines each tool, its typed parameters and their Field descriptions, which 'help Claude understand what each argument expects', and the tool function decides what comes back — so the payload is cut down in the tools themselves: a page-range parameter lets Claude read a long document a few pages at a time (a), and a search tool returns just the matching parts, which Claude can quote (c). In the course's architecture resources are read by the app's code and placed into the prompt (Lesson 61, Accessing resources; Lesson 64, MCP review); Claude does not fetch them itself, so per-page templated resources (Lesson 60, Defining resources) leave Claude's read call as it was (b). Splitting a document into page-numbered blocks leaves the result's size unchanged: the whole tool result goes back to Claude in the follow-up message (Lesson 55, MCP clients), so the request is just as large as before (d)."
    },
    {
      id: "mh10",
      domain: "Resources",
      select: 1,
      stem: "A CRM team is adding an MCP server behind its agent desktop app. When an agent opens a customer record, the app is to show that customer's open orders in a side panel. The panel shows one customer at a time, and new customers are added all day. How should the server expose the open orders?",
      options: [
        { id: "a", text: "As a direct resource for each customer, with that customer's ID fixed in the resource's URI" },
        { id: "b", text: "As a prompt that takes the customer ID and returns the open orders as messages" },
        { id: "c", text: "As a templated resource with a parameter in its URI that carries the customer's ID" },
        { id: "d", text: "As a direct resource for open orders, with the customer ID passed alongside the URI in the read" }
      ],
      correct: ["c"],
      why: "Lesson 60, Defining resources: 'Direct Resources: Static URIs that don't change' versus 'Templated Resources: URIs with parameters' — 'use direct resources for static data, templated resources for parameterized queries' — and for a templated URI 'the Python SDK automatically parses parameters from the URI and passes them as keyword arguments to your function', so one templated resource serves every customer, including those added today (c). A direct resource has a fixed URI written into the server's code, so one per customer cannot keep up with customers added during the day (a). A read carries only the URI — 'your client sends a ReadResourceRequest with a URI' — so a direct resource has nothing besides the URI through which a customer ID could travel (d). A prompt returns user and assistant messages meant to be sent to Claude (Lesson 62, Defining prompts), while data that the app fetches for its own UI is what resources are for (Lesson 64, MCP review) (b)."
    },
    {
      id: "mh11",
      domain: "Resources",
      select: 1,
      stem: "A developer adds a parameterized resource for fetching one document by ID to a server that already has a direct resource listing documents. After restarting the inspector and connecting, the Resources list still shows the listing resource alone. The developer concludes the new resource failed to register. What is the most likely explanation?",
      options: [
        { id: "a", text: "The URI parameter name does not match the function's argument name, so the SDK skipped the resource" },
        { id: "b", text: "The resource is registered; parameterized ones appear in the inspector under Resource Templates, not Resources" },
        { id: "c", text: "The resource lacks a MIME type, and the inspector lists a resource once it knows how to display its contents" },
        { id: "d", text: "The resource is registered, but the inspector lists it after the first successful read of one document from the server" }
      ],
      correct: ["b"],
      why: "Lesson 60, Defining resources: in the inspector 'Resources: Lists your direct/static resources' and 'Resource Templates: Shows templated resources that accept parameters'; the video makes the same point — listing resources shows the static docs://documents alone, and the fetch-by-ID resource appears when you list the resource templates (b). The lesson says the parameter name in the URI becomes the function's keyword argument and describes no silent dropping of a resource (a). The MIME type is a hint for the client about the returned data, not a condition for being listed (c). Listing is discovery; it does not depend on a prior read (d)."
    },
    {
      id: "mh12",
      domain: "Resources",
      select: 2,
      stem: "A team builds its own client app with a document picker on top of the course's document server. The developer asks the MCP client to list the server's resources and shows the result in the picker. Instead of the document IDs, the picker shows one entry named 'list_docs' with the URI docs://documents and the MIME type application/json. Which two statements explain the result and the fix? (Choose two.)",
      options: [
        { id: "a", text: "The picker has to list resource templates too, because each document ID shows up there as an entry under docs://documents" },
        { id: "b", text: "Reading docs://documents returns one contents entry per document ID, because the SDK sends an application/json list item by item" },
        { id: "c", text: "The picker has to read docs://documents instead, because a list call describes resources and does not return their data" },
        { id: "d", text: "Reading docs://documents returns the IDs as JSON text, which the client parses because the MIME type is application/json" }
      ],
      correct: ["c", "d"],
      why: "Lesson 60, Defining resources: the direct resource docs://documents is registered with mime_type application/json, and its function returns the list of document IDs only when the resource is read — on a read resource request 'the MCP server is going to look at the exact URI that we put inside of here, and then run the function we put together'; listing, like the inspector's Resources list, only shows which resources exist, with their name, URI and MIME type (c). The same video shows what the read returns: 'it has a text property and inside there is all the data that we are returning serialized as JSON string', and Lesson 61, Accessing resources, has the client take the first element of the result's contents and call json.loads on its text when the MIME type is application/json (d). So the read does not return one contents entry per ID: 'The MCP Python SDK automatically serializes your return values' (Lesson 60), and the whole list arrives as that one JSON string, which is why the client needs only the first element (Lesson 61) (b). The resource templates list shows a single entry, the fetch_doc template docs://documents/{doc_id}, not one entry per document (Lesson 60) (a)."
    },
    {
      id: "mh13",
      domain: "Prompts",
      select: 1,
      stem: "A document server ships a 'summarize' prompt written like the course's 'format' prompt and taking a document ID; the course-style CLI exposes it as /summarize and gets good summaries. A second team's review tool uses the same prompt but, by policy, sends Claude the prompt's messages without any of the server's tools. There the summaries come back vague and generic. The server author can change the server but neither client. What should the author change?",
      options: [
        { id: "a", text: "Have the prompt function put the document's ID and title in the first message, so Claude knows which one to summarize" },
        { id: "b", text: "Have the prompt function add an assistant message that opens the summary, so Claude continues it from the document" },
        { id: "c", text: "Have the prompt function spell out the summary's structure, so that Claude's output stops being generic" },
        { id: "d", text: "Have the prompt function read the document from the store and put its text into the messages it returns" }
      ],
      correct: ["d"],
      why: "Lesson 62, Defining prompts: a prompt function runs on the server and returns a list of messages 'that can be sent straight to Claude'; the course's format prompt interpolates only the document ID — 'implicitly, we are kind of asking Claude to fetch the document ID's contents using the read document tool' — and Lesson 63, Prompts in the client, adds that Claude 'can then use tools to fetch additional data'. Without tools that route is closed, so the prompt has to carry the document itself, and the function, which runs next to the document store, can put the text into the message (d). An ID and a title still give Claude nothing to summarize (a). An assistant message — prompts are 'a set of user and assistant messages' (Lesson 62) — can open the reply but cannot supply text Claude never received (b). Detailed instructions are the lesson's advice for a prompt that already has its input, but here the input is missing, so the summary stays generic (c)."
    },
    {
      id: "mh14",
      domain: "Prompts",
      select: 1,
      stem: "A team's own chat client runs a document server's prompts as slash commands, the way the course's CLI does. To save a round trip on every command, a developer proposes that the client request each prompt once at startup, with no arguments, store the text it gets back and fill in the user's values on later runs, as with a template. The server's prompts are written like the course's format prompt, which takes the ID of the document to format. Which assessment of the proposal is accurate?",
      options: [
        { id: "a", text: "It does not fit: the server writes the arguments into a prompt's messages when it is requested, so the values go in that request" },
        { id: "b", text: "It does not fit: the prompt list, not a prompt request, returns each prompt's text, so the client should store the list instead" },
        { id: "c", text: "It fits: a prompt request returns the text with a slot for each argument, so the client can fill in the user's values itself" },
        { id: "d", text: "It fits: the server needs the values when Claude calls its tools, not for the prompt, so the text can be requested once and reused" }
      ],
      correct: ["a"],
      why: "Lesson 63, Prompts in the client: the get-prompt call 'retrieves a specific prompt with arguments interpolated into it' — 'you provide arguments that get passed to the prompt function as keyword arguments', and the function uses them 'inside the prompt itself' — and the messages it returns are fed to Claude; Lesson 62, Defining prompts, shows the format prompt writing the document ID into its text, and in the inspector 'the document ID was interpolated into it'. The values therefore travel in each request for the prompt, which is why the course's CLI asks for the document before it gets the prompt ('System prompts for required arguments', Lesson 63), and a request with no arguments has no ID to write in; the specification lists missing required arguments among the errors a server should return (modelcontextprotocol.io, Prompts) (a). The prompt list does not carry the text (b): the client lists the prompts, each with the name and description the server gave it (Lesson 62), and gets the messages from a separate request for one prompt (Lesson 63); in the specification a listed prompt has a name, a description and its arguments, but no messages. There is no slot to fill in (c): the request returns finished messages with the values already in them, as in the specification's example. The values are not kept for the tools (d): they go to the prompt function, and Claude then calls the tools with what the messages tell it, as when it reads the document named in the format prompt (Lesson 63)."
    },
    {
      id: "mh15",
      domain: "Primitives",
      select: 1,
      stem: "A team's document assistant reaches its remote MCP server, served over Streamable HTTP, through an MCP client in the app. Claude calls the server's read and edit tools; the app's document picker lists and reads documents as resources; users run /format, one of the server's prompts. To cut code, the team plans to drop its client and attach the server through the Claude API's MCP connector instead. Which statement about the plan is accurate?",
      options: [
        { id: "a", text: "The connector cannot take over the tools, the picker or /format, since it attaches servers the API starts over stdio" },
        { id: "b", text: "The connector can take over the tool calls, but not the picker or /format, since those are started from the app" },
        { id: "c", text: "The connector can take over all three uses, since it gives the API the server's tools, resources and prompts" },
        { id: "d", text: "The connector can take over the tools and /format, since prompt messages reach Claude in the request as tools do" }
      ],
      correct: ["b"],
      why: "Lesson 64, MCP review: tools are model-controlled ('Claude alone is really responsible for deciding when to run a given tool'), resources are app-controlled ('some code running inside of your app is going to decide that it needs some data'), and prompts are user-controlled. The note to Lesson 59, Implementing a client, describes the MCP connector as attaching a remote Streamable HTTP server in the request, with the API itself calling its tools, and the connector documentation states the limit: 'Of the feature set of the MCP specification, only tool calls are currently supported', and you keep your own client 'when you need local servers, prompts, resources' (platform.claude.com, MCP connector). So the read and edit tools can move to the connector, while the picker, which the app's code drives, and /format, which users start, still go through the team's own client (b). The connector needs a server 'publicly exposed through HTTP' — 'Local STDIO servers cannot be connected directly' — and this server already runs over Streamable HTTP (a). The API does not read resources or get prompts on the app's behalf (c). A prompt is not part of the request the way tool definitions are: the client gets its messages when a user picks it and only then sends them to Claude (Lesson 63, Prompts in the client), so /format cannot move either (d)."
    },
    {
      id: "mh16",
      domain: "Primitives",
      select: 2,
      stem: "A design review of the MCP server behind a support desk lists how four capabilities are exposed today. Issuing a refund, which Claude carries out when an agent asks for one, is a resource whose URI is read to trigger it. The returns policy, which the app adds to the prompt whenever the returns tab is open, comes from a tool that the app's client calls. The stock lookup that Claude makes when a customer asks about availability is a tool. The customer's contact details, which the app shows in the ticket header, come from a resource. Which two changes should the review recommend? (Choose two.)",
      options: [
        { id: "a", text: "Expose refunds as a tool, since issuing one changes data instead of returning it" },
        { id: "b", text: "Expose the returns policy as a resource, since the app decides when the policy is added" },
        { id: "c", text: "Expose the stock lookup as a resource, since it returns data and changes nothing" },
        { id: "d", text: "Expose the contact details as a tool, so that Claude fetches them when an answer needs them" }
      ],
      correct: ["a", "b"],
      why: "Lesson 60, Defining resources: resources 'expose data to clients, similar to GET request handlers', for 'scenarios where you need to fetch information rather than perform actions' — 'Resources expose data, tools perform actions' — and Lesson 64, MCP review, makes tools the primitive Claude decides to run, so a refund that Claude carries out belongs in a tool (a). Lesson 64 also makes resources app-controlled: the app's code decides it needs the data, to show it in the UI or to augment a prompt, so a policy that the app adds whenever the returns tab is open is a resource, and fetching it through a tool the app calls turns the model around (b). The stock lookup is Claude's decision, which keeps it a tool even though it reads data — the course's own server serves documents both ways, a read tool for Claude and a resource for the app (Lessons 57 and 60), so c would take the decision away from Claude. The contact details feed the header whatever Claude does, so they are app data and stay a resource; as a tool they would arrive when Claude chose to call it, not when the header is drawn (d)."
    },
    {
      id: "mh17",
      domain: "Primitives",
      select: 1,
      stem: "The author of a document MCP server has published a tested 'summarize document' workflow as one of the server's prompts. A product manager now asks for every connected client app to run it automatically, with no action from the user, as soon as a document is created. The client apps are built by other teams, and the author cannot change them. What should the author tell the product manager?",
      options: [
        { id: "a", text: "Yes: a client app fills in a prompt's document-ID argument itself, so the prompt starts once a new document's ID appears" },
        { id: "b", text: "Yes: if the prompt's description says to run it on new documents, client apps act on what the description says" },
        { id: "c", text: "No: the server would first have to expose the workflow as a resource, which clients then read for each new document" },
        { id: "d", text: "No: each client decides when to get a prompt and send it to Claude, and a server has no message that starts one" }
      ],
      correct: ["d"],
      why: "Lesson 64, MCP review: prompts are user-controlled — 'a user decides when a prompt is going to run', by 'clicking on some UI element, like a button or a menu option', or with a slash command — and the lesson adds that 'these are high-level guidelines'; the current specification likewise says prompts are 'designed to be user-controlled', that this 'refers to who decides when the prompt is used, not who authors its content', and that 'the protocol itself does not mandate any specific user interaction model' (modelcontextprotocol.io, Prompts). Either way, the decision sits in the client: the client asks for a prompt and the server returns its messages (Lesson 63, Prompts in the client), and the current specification says 'servers do not initiate JSON-RPC requests' (modelcontextprotocol.io, Transports), so the author can publish the prompt but cannot start it in client apps the author does not control (d). In the course flow a client does not fill in a prompt's arguments and start it by itself: the user selects a prompt, and the client then asks for the required arguments, such as which document to format (Lesson 63) (a). A prompt's description is there so that 'users understand what each prompt does' (Lesson 62, Defining prompts), not an instruction that clients carry out (b). A resource would not help either: resources are app-controlled, so it is the client's own code that decides when to read one (Lesson 64), and a read returns data rather than running a workflow with Claude — 'Resources expose data, tools perform actions' (Lesson 60, Defining resources) (c)."
    }
  ]
};
