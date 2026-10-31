window.QUIZ_BANK = {
  id: "api-apps-hard",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "ch01",
      domain: "Anthropic apps",
      select: 2,
      stem: "A travel company is piloting computer use to book hotel rooms on partner sites through a desktop browser. The engineer runs the loop on her own workstation, where her banking and e-mail sessions are open in other windows, and in one test the agent clicked an 'Accept and pay' button on its own. Which two changes follow the precautions in the computer-use documentation? (Choose two.)",
      options: [
        { id: "a", text: "Run the booking browser in a separate profile with saved passwords and stored sign-ins turned off" },
        { id: "b", text: "Move the loop into a dedicated virtual machine or container with minimal privileges and no saved logins" },
        { id: "c", text: "Add a system-prompt rule that Claude re-checks the booking details on screen before any payment click is made" },
        { id: "d", text: "Have a person confirm each payment or terms-of-service step before the agent's click is carried out" }
      ],
      correct: ["b", "d"],
      why: "The note on Lesson 65, Anthropic apps, relays the precautions from the computer-use documentation on platform.claude.com: a dedicated virtual machine or container with minimal privileges, no access to sensitive data such as account login information, an allowlist of internet domains, and a person who confirms decisions with real-world consequences and anything that needs affirmative consent, such as completing financial transactions or agreeing to terms of service. Moving the loop off a workstation with live banking and mail sessions (b) and gating each payment on a person (d) are two items on that list. A separate browser profile (a) changes nothing about what the agent can reach: Lesson 65, Anthropic apps, describes computer use as tools for a full desktop environment, and Claude works from screenshots of the whole screen with mouse and keyboard actions, so the banking and mail windows stay within reach on the same machine with the same privileges. A re-check rule in the system prompt (c) is a prompting tip for reliability, not a safety precaution: the agent still decides on its own to pay, and the documentation warns that instructions found on web pages or in images can override yours, which is why it asks for a human confirmation instead."
    },
    {
      id: "ch02",
      domain: "Anthropic apps",
      select: 1,
      stem: "A logistics firm wants Claude to re-key shipment records into its inventory client, a native Windows desktop application that was never given an API. Each record type opens a differently laid-out entry screen, so whoever types the data has to look at the screen first. According to the course, which of the four proposed designs can do the job?",
      options: [
        { id: "a", text: "The Playwright MCP server, with which Claude enters each record through the client's entry screens" },
        { id: "b", text: "Claude Code's terminal access, with which Claude enters each record through the client's entry screens" },
        { id: "c", text: "Screenshots sent to Claude as image input, with which Claude enters each record through the client's entry screens" },
        { id: "d", text: "Anthropic's computer use tools, with which Claude enters each record through the client's entry screens" }
      ],
      correct: ["d"],
      why: "Lesson 65, Anthropic apps, describes computer use as a collection of tools that lets Claude interact with a full desktop computer environment: interact with desktop applications and perform tasks that require visual interface navigation. The note on that lesson adds how it works: Claude receives screenshots and returns mouse and keyboard commands, which your application carries out in an environment you control, so Claude both sees each screen and acts on it (d). The Playwright server (a) is listed in Lesson 68, Enhancements with MCP servers, as giving Claude browser automation capabilities for testing and troubleshooting; a native Windows program is not a page in a browser. Terminal access (b), one of the built-in tools in Lesson 66, Claude Code setup, runs commands directly from the conversation: it can start the program but gives Claude no view of its windows, which the changing layouts require. Screenshots sent as image input (c), as in Lesson 47, Image support, let Claude read each screen, but a request with images gives Claude no way to click or type into the client; pairing the screenshots with mouse and keyboard actions is what the computer use tools add."
    },
    {
      id: "ch03",
      domain: "Anthropic apps",
      select: 1,
      stem: "A team lead watched the course's Claude Code demo and wants to show new hires the moment that best illustrates 'autonomous problem-solving', one of the four agent principles the module lists. Which moment from the demo should she pick?",
      options: [
        { id: "a", text: "Claude wrote a descriptive commit message after it had looked over every change in the codebase" },
        { id: "b", text: "Claude added error handling for missing and unsupported files to the document conversion tool" },
        { id: "c", text: "Claude proposed test cases for the conversion tool before any of its code was written" },
        { id: "d", text: "Claude created and activated a virtual environment and installed packages from the README's steps" }
      ],
      correct: ["b"],
      why: "Lesson 65, Anthropic apps, names four principles the two applications demonstrate: tool integration and usage, multi-step task execution, environmental interaction and autonomous problem-solving. In the video of Lesson 67, Claude Code in action, Claude's summary after implementing the plan says it added error handling for non-existent or unsupported file types, and the instructor calls this definitely appropriate 'even though it wasn't something that I actually asked for explicitly': Claude found a gap in the request and closed it on its own (b). The other three moments are Claude carrying out a task the instructor set. He asks Claude to stage and commit all changes, and Claude looks over the changes and writes the message (a). He asks Claude to think of tests and not to write any code yet, and Claude proposes them (c). He asks Claude to read the README and execute its setup directions, and Claude creates and activates a virtual environment and installs the dependencies (d)."
    },
    {
      id: "ch04",
      domain: "Setup",
      select: 1,
      stem: "A platform team is rolling out Claude Code and sorts the requests developers expect to make in the first week: some will work with the built-in tools from the setup lesson, and some need an MCP server registered first. According to the module, which request do the built-in tools serve on their own?",
      options: [
        { id: "a", text: "Read the design decision recorded for the feature in the team's Confluence space before planning" },
        { id: "b", text: "Read the spacing and colour values of one frame in the design team's Figma file before coding" },
        { id: "c", text: "Search the web for an error message and read the forum threads that discuss the same failure" },
        { id: "d", text: "Click through a public demo site's signup form in a browser and report what goes wrong" }
      ],
      correct: ["c"],
      why: "Lesson 66, Claude Code setup, lists the built-in tools: file operations (search, read and edit files), terminal access (run commands from the conversation) and web access (search documentation, fetch code examples, and more), plus MCP server support for adding further tools. Searching the web for an error and reading the threads it turns up is that built-in web access (c). Each of the other requests matches a server from the list in Lesson 68, Enhancements with MCP servers, which adds a capability the built-in set does not have: mcp-atlassian allows Claude to access Confluence and Jira (a), figma-context-mcp exposes Figma designs to Claude (b), and playwright-mcp gives Claude browser automation for testing and troubleshooting, which clicking through a signup form needs even on a public site (d)."
    },
    {
      id: "ch05",
      domain: "Setup",
      select: 1,
      stem: "An insurer is letting five of its developers try Claude Code on their own laptops. None of them has a Claude subscription or an Anthropic account, and the insurer's policy is that every model call is billed to and logged in its own Amazon Bedrock account. The course's setup lesson says that the first run of claude asks you to log in to your Anthropic account. According to the current documentation, how should the developers handle that step?",
      options: [
        { id: "a", text: "Have developers choose Amazon Bedrock at the login prompt and sign in with the insurer's AWS credentials" },
        { id: "b", text: "Have developers put the insurer's AWS access key into ANTHROPIC_API_KEY, which Claude Code routes to Bedrock" },
        { id: "c", text: "Have developers register Amazon Bedrock as an MCP server, so that Claude Code sends its model calls through it" },
        { id: "d", text: "Have developers install a Bedrock edition of Claude Code from the AWS console, which skips the Anthropic login" }
      ],
      correct: ["a"],
      why: "Lesson 66, Claude Code setup, says the first run of claude asks you to log in to your Anthropic account; the lesson note adds that Claude Code can also run through a cloud provider (Amazon Bedrock, Google Cloud or Microsoft Foundry) instead of a Claude plan. The Amazon Bedrock page on code.claude.com/docs gives the route for people who have AWS credentials: run claude, select the third-party platform and then Amazon Bedrock at the login prompt, and the wizard asks how you authenticate to AWS and saves the settings for you (a). The same page points a team-wide deployment to the manual setup with CLAUDE_CODE_USE_BEDROCK=1 and pinned model versions, and notes that /logout is unavailable on Bedrock because authentication is handled through AWS credentials. ANTHROPIC_API_KEY (b) holds a key for Anthropic's own API; Bedrock is switched on by its own setting and reads credentials from the AWS SDK credential chain. An MCP server (c) adds tools, prompts and resources to Claude Code, as Lesson 68, Enhancements with MCP servers, explains; it does not change which provider serves the model. There is no separate Bedrock edition (d): the same installation is pointed at Bedrock through the login wizard or environment settings."
    },
    {
      id: "ch06",
      domain: "Setup",
      select: 2,
      stem: "A platform team installed Claude Code on its Windows laptops with WinGet, because IT allows software only through a package manager. A month later two complaints arrive: most laptops still run the release installed on day one, and on one laptop Claude Code seems to ignore the settings file. Which two steps match the current documentation? (Choose two.)",
      options: [
        { id: "a", text: "Run winget upgrade for the Claude Code package, since WinGet installs do not update themselves by default" },
        { id: "b", text: "Move Claude Code on the laptops to the stable release channel, since the default one holds releases back for weeks" },
        { id: "c", text: "Run claude doctor on that laptop, since it shows settings-file validation errors without starting a session" },
        { id: "d", text: "Run /doctor prompt-audit in a Claude Code session on that laptop, since it checks the settings file for errors" }
      ],
      correct: ["a", "c"],
      why: "The note on Lesson 66, Claude Code setup, lists Homebrew and WinGet next to the recommended native installer and names claude doctor as the diagnostic command; the setup page on code.claude.com/docs adds the details: native installations update themselves in the background, while Homebrew, WinGet and Linux package-manager installations need a manual upgrade by default — for WinGet, winget upgrade Anthropic.ClaudeCode, or the CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE variable to let Claude Code run it (a) — and claude doctor prints read-only installation and settings diagnostics without starting a session, including settings-file validation errors (c). The release channel (b) does not explain a laptop stuck on its day-one release: the default channel, latest, receives releases as soon as they ship, and stable is the one that runs about a week behind, so switching would not bring a package-manager install forward. /doctor prompt-audit (d) is a different check: the memory documentation describes it as an audit of instruction files such as CLAUDE.md, rules and skills for outdated or conflicting content, not of the JSON settings file."
    },
    {
      id: "ch07",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A team lead wants Claude Code to follow the rule 'run the linter before every commit' for everyone who works on the repository. The course video adds such a rule by typing it after a # sign and picking the project scope, but she cannot find that shortcut in the current command reference. According to the current documentation, how should she add the rule?",
      options: [
        { id: "a", text: "Run /init again and pass the rule as a special direction, so that /init writes it into CLAUDE.md" },
        { id: "b", text: "State the rule in the session and run /context, which saves the rules into CLAUDE.md" },
        { id: "c", text: "Run /memory, open the project CLAUDE.md from its list of memory files, and add the line to it" },
        { id: "d", text: "Switch on auto memory in /memory and state the rule once, so that Claude records it for everyone on the repository" }
      ],
      correct: ["c"],
      why: "Lesson 67, Claude Code in action, adds a note with the # shortcut and asks whether it goes to project, local or user memory; the lesson note says the current documentation has no # shortcut and names the documented routes — open the files with /memory, or ask Claude directly to 'add this to CLAUDE.md' — and the memory page on code.claude.com/docs confirms that /memory lists the CLAUDE.md files and opens the one you select in your editor; the project file is the one shared with the team through git (c). /init (a) scans the codebase to generate a starting file and, when a CLAUDE.md already exists, suggests improvements rather than overwriting it; it is the setup tool, not the documented way to add one rule. /context (b) shows what is loaded into the context, including the memory files; it does not write anything to them. Auto memory (d) holds notes Claude writes for itself, and the documentation describes it as machine-local and stored per repository under ~/.claude/projects, so the rule would not reach the rest of the team."
    },
    {
      id: "ch08",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A consultant works in a dozen client repositories, each with its own committed CLAUDE.md that she may not change. She wants Claude Code to follow her personal rule — commit messages in the imperative mood, under sixty characters — in every repository she opens, without adding anything to the clients' repositories. Where should the rule go?",
      options: [
        { id: "a", text: "A CLAUDE.local.md at the root of each client repository, since local memory is kept out of version control" },
        { id: "b", text: "The settings.json file in her ~/.claude folder, since settings there apply to every project she opens" },
        { id: "c", text: "The first message of every session, so that the rule is in place before any commit is made" },
        { id: "d", text: "The user-level CLAUDE.md in her ~/.claude folder, which Claude Code reads for every project" }
      ],
      correct: ["d"],
      why: "Lesson 67, Claude Code in action, names three scopes: project (shared with everyone on the project), local (personal notes not checked into git) and user (used across all your projects); the lesson note gives the user file's location, ~/.claude/CLAUDE.md. A rule that must follow one person into every repository is user memory (d). A CLAUDE.local.md (a) is personal but project-specific: she would create twelve files inside the clients' working trees, which the constraint forbids. ~/.claude/settings.json (b) configures permissions and tooling; instructions for Claude live in memory files, not in settings. A message at the start of each session (c) is not memory at all and has to be repeated every time."
    },
    {
      id: "ch09",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A developer's ~/.claude/CLAUDE.md says 'format Python with tabs', and the CLAUDE.md committed at the root of her project says 'format Python with four spaces'. Across a week of sessions started at the project root, Claude formats some new modules with tabs and others with spaces. According to the memory documentation, what explains this?",
      options: [
        { id: "a", text: "Both files are concatenated into one context and neither overrides the other, so Claude may follow either rule" },
        { id: "b", text: "The user file is read after the project file and overrides it, so spaces appear where Claude copies existing code" },
        { id: "c", text: "The two files are loaded in a different order in each session, so Claude follows whichever rule it read last" },
        { id: "d", text: "The project file loads only after Claude edits a file in its folder, so the first edits follow the user rule alone" }
      ],
      correct: ["a"],
      why: "The note on Lesson 67, Claude Code in action, says the memory files do not override each other but are joined into one context, and the memory page on code.claude.com/docs confirms it: all discovered CLAUDE.md files are concatenated into context rather than overriding each other, and if two instructions contradict each other Claude may pick one arbitrarily, so the files should be kept consistent (a). Option b gets both the order and the rule wrong: user-level content is loaded before project content, and neither file overrides the other. Option c invents a varying order: the files are loaded in a fixed order, from the broadest scope to the most specific. Option d describes the on-demand loading that applies to CLAUDE.md files in subdirectories; the file in the directory where the session starts is loaded at launch."
    },
    {
      id: "ch10",
      domain: "CLAUDE.md",
      select: 2,
      stem: "Eight months after a team ran /init, it replaced pip with uv and unittest with pytest across pyproject.toml and its CI scripts. Claude Code still proposes pip install and python -m unittest whenever it sets up or tests the project. Which two actions will NOT stop these outdated proposals? (Choose two.)",
      options: [
        { id: "a", text: "Correct the outdated commands in CLAUDE.md by hand and commit the updated file to the repository" },
        { id: "b", text: "Run /init again, which proposes changes to the existing CLAUDE.md instead of overwriting it" },
        { id: "c", text: "Run /clear before each request, so that every conversation starts from an empty context" },
        { id: "d", text: "Update the README's setup and test sections to uv and pytest and commit the change to the repo" }
      ],
      correct: ["c", "d"],
      why: "Lesson 67, Claude Code in action: /init writes what Claude learns about the project, including the build commands, into CLAUDE.md, which 'automatically gets included as context in all future conversations'; the video adds that projects change over time and that you can edit the file by hand or rerun /init so that Claude updates it, and the memory page on code.claude.com/docs notes that /init on an existing CLAUDE.md suggests improvements rather than overwriting it. Both of those change the file and stop the stale proposals (a, b). /clear (c) clears the conversation history and resets context, as the same lesson puts it, but the lesson note points out that project memory survives it, so the next conversation loads the same outdated CLAUDE.md. Updating the README (d) leaves that file untouched: the README is not one of the memory files Claude Code includes in every conversation, while CLAUDE.md is, and it still lists pip and unittest."
    },
    {
      id: "ch11",
      domain: "Workflows",
      select: 1,
      stem: "A developer asks Claude Code to plan a tool that converts PDF and Word files to markdown and tells it not to write any code yet. She reviews the plan, approves it and has Claude implement it. The tool works, but it re-implements a conversion that a helper in document.py already provides, and it is registered differently from the existing tool in math.py. Which step, added before her planning request, would most directly have prevented both problems?",
      options: [
        { id: "a", text: "Having Claude brainstorm test cases for the conversion tool and write them as tests first" },
        { id: "b", text: "Having Claude read and analyze the source files that the new feature is meant to build on" },
        { id: "c", text: "Having Claude run the project's existing test suite so that it sees how the current tools behave" },
        { id: "d", text: "Having Claude list the project's installed dependencies so that it knows which conversion libraries exist" }
      ],
      correct: ["b"],
      why: "Lesson 67, Claude Code in action, step 1: identify the files relevant to the feature and ask Claude to read and analyze them first, because that 'gives Claude examples of your coding patterns and existing functionality it can build upon'. In the video those files are math.py, 'an example of a tool that has already been put together', and document.py, which 'includes a very helpful function, binary document to markdown', and the lesson's example plan that follows includes 'Leverages existing binary_document_to_markdown function'; the existing pattern and the existing helper are exactly what the two problems missed (b). Brainstorming tests (a) is the second step of the lesson's test-driven workflow, which itself begins by feeding Claude the same relevant files; the tests describe what the new feature should do and give Claude success criteria for it, not examples of the code it should reuse. Running the existing suite (c) uses terminal access to report which tests pass or fail; it is not the step the lesson uses to show Claude the project's patterns and helpers. Listing the installed dependencies (d) tells Claude which libraries it may import, but not that document.py already wraps the conversion or how math.py registers its tool, so Claude could still re-implement the helper and register the tool its own way."
    },
    {
      id: "ch12",
      domain: "Workflows",
      select: 1,
      stem: "A team will have Claude Code add a parser for a legacy invoice format to an existing service. For every sample invoice, the reviewers can state exactly which fields the parser must return. Which of the lesson's two workflows fits this feature better, and why?",
      options: [
        { id: "a", text: "The plan-first one, since Claude writes and runs a test after it implements the plan, as in the demo" },
        { id: "b", text: "The test-driven one, since Claude writes every test it brainstorms, so that no field goes unchecked" },
        { id: "c", text: "The plan-first one, since reviewers can check every field against the plan before code exists" },
        { id: "d", text: "The test-driven one, since the selected tests give Claude clear success criteria to work toward" }
      ],
      correct: ["d"],
      why: "Lesson 67, Claude Code in action, offers the test-driven workflow 'for even better results': feed context, have Claude think of test cases, select the most relevant tests and have Claude write them, then have Claude write code that passes them, iterating until all tests pass; 'this approach often produces more robust code because Claude has clear success criteria to work toward'. Exact expected fields for each sample are such criteria, written down before the code (d). Writing every brainstormed test (b) skips the selection step: in the video the instructor keeps tests one through five and drops 6, 7 and 8 as more specialized than the feature needs. In the plan-first demo Claude does write a test and run the suite after implementing the plan (a), but that test is written for code Claude has already produced, so it does not set the target the implementation iterates toward. A plan (c) lays out the approach and steps, as the lesson's planning step says; it holds no output that reviewers could check field by field, because nothing has been run yet."
    },
    {
      id: "ch13",
      domain: "Workflows",
      select: 1,
      stem: "A developer had Claude Code implement a feature, then stashed the changes so that the working tree is clean, and asked Claude in the same session to build the same feature again using the test-driven workflow, in order to compare the two results. The second implementation reproduces the first one almost line for line. What is the most likely cause?",
      options: [
        { id: "a", text: "Claude Code caches the files it read earlier in the session, so it still sees the first implementation on disk" },
        { id: "b", text: "The first implementation is still in the conversation history, so Claude is reusing its own earlier answer" },
        { id: "c", text: "Claude updated CLAUDE.md after the first implementation, so the design is now part of the project memory" },
        { id: "d", text: "The test-driven workflow converges on the same design for the same feature, so a close match is expected" }
      ],
      correct: ["b"],
      why: "In the video of Lesson 67, Claude Code in action, the instructor does exactly this comparison: he stashes the first implementation and, before starting the test-driven workflow, runs /clear 'so it doesn't cheat off its previous solution' — the conversation history, not the disk, is where the earlier solution survives (b). Option a has nothing to stand on: after the stash the files are gone from disk, and Claude reads files from disk when it needs them; only the conversation still holds the first solution. Claude does not rewrite CLAUDE.md on its own (c): the lesson changes it through /init or a note you add, and the memory documentation lists you as the author of CLAUDE.md. Option d has it backwards: tests describe behaviour, not code, and a near-verbatim copy of the first implementation comes from the model seeing that implementation, which it does in the same session."
    },
    {
      id: "ch14",
      domain: "Workflows",
      select: 1,
      stem: "A team runs Claude Code in acceptEdits mode and, following the lesson, asks Claude for a plan before any code is written; twice Claude edited files before anyone had reviewed its plan. The team's rule is that no file may change until a person approves the plan, and it wants Claude Code itself to hold edits back until then and to let Claude carry the plan out afterwards. Which setup does that?",
      options: [
        { id: "a", text: "Plan mode, set by a 'defaultMode: plan' line in the project's CLAUDE.md, so that edits wait for the plan's approval" },
        { id: "b", text: "Auto mode, started with claude --permission-mode auto, so that edits wait for the plan's approval" },
        { id: "c", text: "Plan mode, started with claude --permission-mode plan, so that edits wait for the plan's approval" },
        { id: "d", text: "Auto mode, set by a 'defaultMode: auto' line in the project's CLAUDE.md, so that edits wait for the plan's approval" }
      ],
      correct: ["c"],
      why: "Lesson 67, Claude Code in action, separates planning from implementation by telling Claude not to write any code yet; the lesson note points out that current Claude Code builds this step in as plan mode (/plan, Shift+Tab or claude --permission-mode plan), and the permission-modes page on code.claude.com/docs confirms that in plan mode Claude reads files, runs shell commands to explore and writes a plan but does not edit your source, that edits stay blocked until you approve the plan, and that approving it switches the session to the mode you pick so Claude starts editing (c). A 'defaultMode: plan' line in CLAUDE.md (a) switches nothing: Lesson 67 describes CLAUDE.md as a file that is included as context in every conversation, and the memory page says Claude treats it as context, not enforced configuration; the starting mode comes from the --permission-mode flag or from permissions.defaultMode in a settings file. Auto mode (b) runs everything without routine permission prompts, with a separate classifier model reviewing actions in the background, so edits never wait for a person to approve a plan. A 'defaultMode: auto' line in CLAUDE.md (d) fails on both counts: CLAUDE.md is not configuration, and auto mode would not hold edits for a person's approval in any case."
    },
    {
      id: "ch15",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "A developer registered the documents server with the command from the lesson and has used it for weeks in that repository. For a hotfix she clones the same repository a second time into another folder; Claude Code sessions started in the new folder do not list the server, while sessions in the first folder still do. What explains this?",
      options: [
        { id: "a", text: "The lesson's command saved the server at local scope, which is tied to the folder where it was added" },
        { id: "b", text: "The lesson's command saved the server in .mcp.json, which the new clone lacks until the file is committed" },
        { id: "c", text: "The lesson's command saved the server at user scope, which a new folder picks up after its first restart" },
        { id: "d", text: "The server entry carries over, but each new folder has to approve it in /mcp before Claude Code connects" }
      ],
      correct: ["a"],
      why: "Lesson 68, Enhancements with MCP servers, registers the server with claude mcp add and no scope flag; the lesson note lists the scopes — local, the default, private to you and limited to this project; project, a .mcp.json at the project root shared through version control; user, all your projects — and the MCP page on code.claude.com/docs explains how local scope is kept: Claude Code stores a local-scoped server in ~/.claude.json under that project's path, so the same server does not appear in your other projects, and a second clone in another folder is another project path (a). Project scope (b) has to be chosen with --scope project; the lesson's command never wrote a .mcp.json. User scope (c) is not the default either, and a user-scoped server would load in every project on the machine, the new folder included. The approval prompt (d) is for project-scoped servers that come from a .mcp.json file; a local-scoped entry is not carried over to another path at all."
    },
    {
      id: "ch16",
      domain: "MCP in Claude Code",
      select: 2,
      stem: "A team's Sentry MCP server is hosted at an HTTPS URL and protected by OAuth. A developer runs 'claude mcp add sentry -- <url>', following the stdio pattern from the lesson note, and the server fails to connect. Which two steps match the current documentation? (Choose two.)",
      options: [
        { id: "a", text: "Register it with --transport http and the URL, since the stdio form expects a command it can launch" },
        { id: "b", text: "Run /mcp in the session, which shows the server's status and takes you through the OAuth browser login" },
        { id: "c", text: "Re-add it with claude mcp add-json and only the URL in the entry, so that it is read as a remote server" },
        { id: "d", text: "Pass the OAuth token with --env on the add command, so that the server receives it when it starts" }
      ],
      correct: ["a", "b"],
      why: "Lesson 68, Enhancements with MCP servers, registers a local server by giving Claude Code the command that starts it; the lesson note covers remote servers, and code.claude.com/docs confirms it: a remote server is added with claude mcp add --transport http <name> <url>, because everything after -- is treated as the command that launches a stdio server (a), and inside a session /mcp shows each server's status and handles OAuth authentication — you follow the steps in your browser (b). An add-json entry with a url and no type (c) is a configuration error: the documentation says Claude Code reads an entry without a type as a stdio server and skips it, so the type has to be given as http. --env (d) sets environment variables for a server process that Claude Code launches itself; a remote server is not launched locally, and an OAuth server is signed in to through /mcp rather than handed a token on the command line."
    },
    {
      id: "ch17",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "While a Claude Code session is open in one terminal, a developer registers the documents server from a second terminal in the same project folder with claude mcp add, then asks the open session to convert a .docx fixture to markdown. Claude replies that it has no tool for reading Word files. What is the most likely explanation?",
      options: [
        { id: "a", text: "A server added from another terminal is saved at user scope, which the open session picks up after /clear" },
        { id: "b", text: "The registration wrote the config, but the server has to be started with claude mcp serve before use" },
        { id: "c", text: "The conversion is exposed as a resource, which Claude Code reads when it is mentioned with @ in the prompt" },
        { id: "d", text: "The open session connected to its servers when it started, so the server registered later is not in it" }
      ],
      correct: ["d"],
      why: "Lesson 68, Enhancements with MCP servers: 'Once registered, Claude Code will automatically connect to your server when it starts up', and in the video the instructor ends the running session with Ctrl-C, registers the server and starts Claude Code again before using the tool; a session that was already running when the server was registered has not connected to it (d). Option a is wrong on both counts: the note on Lesson 68 gives local, not user, as the default scope of claude mcp add, and Lesson 67, Claude Code in action, describes /clear as clearing the conversation history and resetting context, not as reloading servers. claude mcp serve (b) is, per the MCP page on code.claude.com/docs, the way to use Claude Code itself as an MCP server that other applications can connect to; a server added with claude mcp add is started by Claude Code from the command you registered. The documents server exposes document_path_to_markdown as a tool (c), not a resource, and in Lesson 68 the plain request 'Convert the tests/fixtures/mcp_docs.docx file to markdown' is enough: Claude 'will automatically use your custom tool'."
    }
  ]
};
