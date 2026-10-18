window.QUIZ_BANK = {
  id: "api-apps",
  passPercent: 70,
  questions: [
    {
      id: "c01",
      domain: "Anthropic apps",
      select: 1,
      stem: "Why does the course study Claude Code and Computer Use right before the section on agents?",
      options: [
        { id: "a", text: "They are the only products that can call the Claude API" },
        { id: "b", text: "They are real-world agents that show tool integration, multi-step execution, interaction with an environment and autonomous problem-solving" },
        { id: "c", text: "They replace the need to write your own agents" },
        { id: "d", text: "They are required to pass the certification" }
      ],
      correct: ["b"],
      why: "The module treats both apps as case studies of what makes agents effective."
    },
    {
      id: "c02",
      domain: "Anthropic apps",
      select: 1,
      stem: "In a Computer Use integration, who actually performs a click that Claude requests?",
      options: [
        { id: "a", text: "Anthropic's servers, inside a hosted desktop" },
        { id: "b", text: "Your application, in an environment you control (ideally a sandboxed VM or container)" },
        { id: "c", text: "The user's browser extension, automatically" },
        { id: "d", text: "Claude itself, directly on the user's machine" }
      ],
      correct: ["b"],
      why: "Computer use is a client toolset: Claude asks for screenshots, clicks and typing; your code executes them and returns the results."
    },
    {
      id: "c03",
      domain: "Anthropic apps",
      select: 1,
      stem: "You are adding Computer Use with a Claude 5.5 model on the Claude API. Which tool definition fits current docs?",
      options: [
        { id: "a", text: "{\"type\": \"computer_20250124\"} with a beta header" },
        { id: "b", text: "{\"type\": \"computer_toolset_20260801\"}, no beta header needed" },
        { id: "c", text: "A custom tool named computer with your own JSON schema only" },
        { id: "d", text: "{\"type\": \"bash_20250124\"}" }
      ],
      correct: ["b"],
      why: "Claude 5.5+ on the Claude API accepts only the computer toolset; earlier computer_2025xxxx versions return an error there."
    },
    {
      id: "c04",
      domain: "Setup",
      select: 1,
      stem: "Which set lists capabilities that Claude Code has out of the box, according to the course?",
      options: [
        { id: "a", text: "File search/read/edit, running terminal commands, web access, and MCP server support" },
        { id: "b", text: "Only code completion inside the editor" },
        { id: "c", text: "Image generation and voice calls" },
        { id: "d", text: "Database hosting and deployment to Anthropic's cloud" }
      ],
      correct: ["a"],
      why: "Claude Code works with your files and terminal, can search the web, and is extended with MCP servers."
    },
    {
      id: "c05",
      domain: "Setup",
      select: 1,
      stem: "A teammate on a free claude.ai plan installed Claude Code but can't use it. What is the most likely reason?",
      options: [
        { id: "a", text: "Node.js is missing" },
        { id: "b", text: "Claude Code requires a Pro, Max, Team, Enterprise or Console account (or a cloud provider); the free plan doesn't include it" },
        { id: "c", text: "Claude Code only works on Linux" },
        { id: "d", text: "They must first run /init" }
      ],
      correct: ["b"],
      why: "Current docs: the free claude.ai plan does not include Claude Code access."
    },
    {
      id: "c06",
      domain: "Setup",
      select: 1,
      stem: "The course installs Claude Code with npm. What is the recommended install method in the current docs?",
      options: [
        { id: "a", text: "Building from source" },
        { id: "b", text: "The native installer (e.g. curl -fsSL https://claude.ai/install.sh | bash), which needs no Node.js and auto-updates" },
        { id: "c", text: "pip install claude-code" },
        { id: "d", text: "Downloading a VS Code extension only" }
      ],
      correct: ["b"],
      why: "npm still works (Node.js 22+), but the native installer is recommended; Homebrew and WinGet are also available."
    },
    {
      id: "c07",
      domain: "CLAUDE.md",
      select: 1,
      stem: "What does running /init do in a project?",
      options: [
        { id: "a", text: "Creates a new git repository" },
        { id: "b", text: "Scans the codebase and writes a CLAUDE.md with commands, conventions and architecture notes that load into future sessions" },
        { id: "c", text: "Installs all dependencies" },
        { id: "d", text: "Resets Claude's model weights for this project" }
      ],
      correct: ["b"],
      why: "CLAUDE.md is included as context in every later conversation; /init can also take extra focus instructions."
    },
    {
      id: "c08",
      domain: "CLAUDE.md",
      select: 1,
      stem: "You want personal notes for one project (your sandbox URL) that teammates should not see in git. Where do they go?",
      options: [
        { id: "a", text: "./CLAUDE.md" },
        { id: "b", text: "~/.claude/CLAUDE.md" },
        { id: "c", text: "./CLAUDE.local.md, added to .gitignore" },
        { id: "d", text: ".mcp.json" }
      ],
      correct: ["c"],
      why: "Local scope is personal and project-specific; project scope is shared via git; user scope applies to all your projects."
    },
    {
      id: "c09",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A rule 'always add type hints to function arguments' should apply to everyone on the team. Which scope fits?",
      options: [
        { id: "a", text: "Project (CLAUDE.md committed to the repository)" },
        { id: "b", text: "Local" },
        { id: "c", text: "User" },
        { id: "d", text: "None; Claude Code cannot store rules" }
      ],
      correct: ["a"],
      why: "Project memory is shared with all engineers through version control."
    },
    {
      id: "c10",
      domain: "CLAUDE.md",
      select: 1,
      stem: "Your project already has a CLAUDE.md and you run /init again. What happens in current Claude Code?",
      options: [
        { id: "a", text: "The file is deleted and recreated from scratch" },
        { id: "b", text: "/init refuses to run" },
        { id: "c", text: "/init suggests improvements instead of overwriting the file" },
        { id: "d", text: "A second file CLAUDE2.md is created" }
      ],
      correct: ["c"],
      why: "Per the memory docs, /init suggests improvements when CLAUDE.md exists; you can also edit the file via /memory."
    },
    {
      id: "c11",
      domain: "Workflows",
      select: 1,
      stem: "You want Claude Code to add a complex feature. Which approach does the course recommend for the best results?",
      options: [
        { id: "a", text: "Type one short request and accept whatever is produced" },
        { id: "b", text: "Point Claude to relevant files to read, ask for a plan without code, then ask it to implement the plan" },
        { id: "c", text: "Write the code yourself and ask Claude only to format it" },
        { id: "d", text: "Ask Claude to implement first, then plan afterwards" }
      ],
      correct: ["b"],
      why: "Claude is an effort multiplier: context → plan → implement lets it tackle much more complex tasks."
    },
    {
      id: "c12",
      domain: "Workflows",
      select: 1,
      stem: "Why does the course tell you to explicitly say 'don't write any code yet' during the planning step?",
      options: [
        { id: "a", text: "Code written during planning is billed twice" },
        { id: "b", text: "So Claude focuses on the approach and steps first, and the later implementation builds on that reviewed plan" },
        { id: "c", text: "Claude Code cannot write code and plan in the same session" },
        { id: "d", text: "It disables the file tools permanently" }
      ],
      correct: ["b"],
      why: "Separating planning from implementation produces a plan you can review; current Claude Code also has a dedicated plan mode for this."
    },
    {
      id: "c13",
      domain: "Workflows",
      select: 1,
      stem: "In the test-driven workflow, what is the step right after Claude writes the selected tests?",
      options: [
        { id: "a", text: "Ask Claude to write code that passes the tests, iterating until they pass" },
        { id: "b", text: "Delete the failing tests" },
        { id: "c", text: "Run /clear" },
        { id: "d", text: "Deploy to production" }
      ],
      correct: ["a"],
      why: "Tests give Claude clear success criteria, which tends to produce more robust code."
    },
    {
      id: "c14",
      domain: "Workflows",
      select: 1,
      stem: "You finished one task and start an unrelated one. You want an empty conversation but keep project memory. Which command?",
      options: [
        { id: "a", text: "/init" },
        { id: "b", text: "/clear" },
        { id: "c", text: "/compact" },
        { id: "d", text: "/mcp" }
      ],
      correct: ["b"],
      why: "/clear starts fresh (CLAUDE.md still loads); /compact instead summarizes the same conversation to free space."
    },
    {
      id: "c15",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "Your local MCP server starts with 'uv run main.py'. Which command registers it in current Claude Code?",
      options: [
        { id: "a", text: "claude mcp add documents -- uv run main.py" },
        { id: "b", text: "claude install documents main.py" },
        { id: "c", text: "mcp dev main.py --claude" },
        { id: "d", text: "/init documents uv run main.py" }
      ],
      correct: ["a"],
      why: "Syntax: claude mcp add [options] <name> -- <command> [args]. The -- separates Claude's options from the server command."
    },
    {
      id: "c16",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "Your team should all get the same MCP server configuration when they clone the repository. Which scope do you use?",
      options: [
        { id: "a", text: "local (the default)" },
        { id: "b", text: "user" },
        { id: "c", text: "project, stored in .mcp.json at the project root" },
        { id: "d", text: "There is no way to share MCP servers" }
      ],
      correct: ["c"],
      why: "Project-scoped servers are written to .mcp.json and shared via version control; local and user scopes stay private to you."
    },
    {
      id: "c17",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "You want Claude Code to read Jira tickets, check production errors and notify the team when done. What does the course suggest?",
      options: [
        { id: "a", text: "Paste everything into CLAUDE.md" },
        { id: "b", text: "Combine several MCP servers (e.g. Jira/Atlassian, Sentry, Slack) that match your workflow" },
        { id: "c", text: "Use Computer Use for every service" },
        { id: "d", text: "Fine-tune Claude on your tickets" }
      ],
      correct: ["b"],
      why: "The real power comes from combining MCP servers for the tools your team already uses."
    }
  ]
};
