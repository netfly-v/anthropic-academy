window.QUIZ_BANK = {
  id: "claude-code-101",
  passPercent: 70,
  questions: [
    {
      id: "cb01",
      domain: "Agentic basics",
      select: 1,
      stem: "A developer has been pasting code back and forth between Claude.ai and their editor. According to the course, what is the key difference when they switch to Claude Code?",
      options: [
        { id: "a", text: "Claude Code uses a separate code-only model that cannot hold a normal conversation" },
        { id: "b", text: "Claude Code loads the whole repository into its context window at startup" },
        { id: "c", text: "Claude Code works as an agent with direct access to your files, terminal, and codebase, so it does the work itself" },
        { id: "d", text: "Claude Code only suggests edits; you still apply every change by hand" }
      ],
      correct: ["c"],
      why: "Unlike Claude.ai, Claude Code reads and edits files and runs commands itself. It does not load the whole codebase; it searches strategically for what it needs."
    },
    {
      id: "cb02",
      domain: "Agentic basics",
      select: 1,
      stem: "After you enter a prompt, Claude Code runs an agentic loop. Which description matches the course?",
      options: [
        { id: "a", text: "Gather context, take action, verify the results, and loop again until they meet the goal" },
        { id: "b", text: "Take one action, report it, and wait for a new prompt before checking anything" },
        { id: "c", text: "Write a full plan file, then run every step without checking the results" },
        { id: "d", text: "Verify the existing code first, then gather context only if a test fails" }
      ],
      correct: ["a"],
      why: "Claude gathers context, acts, and checks the results, repeating until they are complete and verifiable. You can add context, interrupt, or steer at any point in the loop."
    },
    {
      id: "cb03",
      domain: "Agentic basics",
      select: 1,
      stem: "You turn on auto mode for a long refactor. How does the course describe what happens while Claude works?",
      options: [
        { id: "a", text: "Claude asks before every file edit and shell command, as in manual mode" },
        { id: "b", text: "Claude only reads files and runs commands to explore, then presents a plan" },
        { id: "c", text: "Every action runs unchecked, so a destructive command cannot be stopped" },
        { id: "d", text: "Claude skips routine permission prompts while a background classifier screens most actions and blocks risky ones" }
      ],
      correct: ["d"],
      why: "The classifier targets actions that are irreversible, destructive, or aimed outside your environment. When something is blocked, Claude usually finds a safer approach or asks you for the go-ahead."
    },
    {
      id: "cb04",
      domain: "Getting started",
      select: 2,
      stem: "Your team is deciding where to run Claude Code. Which two statements about the surfaces match the course? (Choose two.)",
      options: [
        { id: "a", text: "The JetBrains plugin runs the claude command, so Claude Code must be installed in the terminal first" },
        { id: "b", text: "Claude Code on the web can open any folder on your laptop, not only GitHub repositories" },
        { id: "c", text: "Homebrew and winget installs auto-update by default, just like the install script" },
        { id: "d", text: "New features ship in the terminal first, so it is the best bet for staying on the cutting edge" }
      ],
      correct: ["a", "d"],
      why: "The JetBrains plugin opens a pane with the terminal experience next to your editor. The web version is limited to GitHub repositories, and Homebrew and winget installs don't auto-update by default."
    },
    {
      id: "cb05",
      domain: "Getting started",
      select: 1,
      stem: "You want Claude's file edits to go through without prompts, but you still want to approve anything beyond basic filesystem commands, such as a deploy script. Which mode do you pick with Shift+Tab?",
      options: [
        { id: "a", text: "Manual mode" },
        { id: "b", text: "Auto-accept mode" },
        { id: "c", text: "Plan mode" },
        { id: "d", text: "Auto mode" }
      ],
      correct: ["b"],
      why: "Auto-accept approves file edits and common filesystem commands such as mkdir, mv, and rm; other commands still ask. Auto mode drops routine prompts altogether and relies on a background check instead."
    },
    {
      id: "cb06",
      domain: "Getting started",
      select: 1,
      stem: "Why does the course recommend doing the Explore and Plan steps in plan mode, before Claude writes any code?",
      options: [
        { id: "a", text: "Plan mode uses a larger context window, so the plan can include the whole codebase" },
        { id: "b", text: "Claude can't edit files there, so you review and revise the plan before any code exists, the best point to course-correct" },
        { id: "c", text: "Plan mode commits each step automatically, so the history is easier to review" },
        { id: "d", text: "Plan mode skips reading files and relies on web searches, which is faster" }
      ],
      correct: ["b"],
      why: "In plan mode Claude reads files and runs shell commands to explore but doesn't edit your source. Check that the plan names the files you expected and ask for revisions before you approve it."
    },
    {
      id: "cb07",
      domain: "Daily workflows",
      select: 2,
      stem: "You approve a plan for a new settings page in a web app. Which two steps does the course recommend to make the coding phase smoother? (Choose two.)",
      options: [
        { id: "a", text: "Remove the test suite for now, so failing tests don't slow Claude down" },
        { id: "b", text: "Make the success criteria explicit, so Claude knows what correct looks like" },
        { id: "c", text: "Switch back to plan mode, so Claude can edit files while it explores" },
        { id: "d", text: "Install the Claude in Chrome extension, so Claude Code can test the UI in a browser tab" }
      ],
      correct: ["b", "d"],
      why: "Clear success criteria and tools such as Claude in Chrome cut the back-and-forth. A test suite helps too, as long as the tests are a reliable source of truth."
    },
    {
      id: "cb08",
      domain: "Daily workflows",
      select: 1,
      stem: "You're deep into one feature, the context window is nearly full, and you need to keep going with a memory of what you've done. Which command fits, and what is the catch?",
      options: [
        { id: "a", text: "/clear; it keeps the key decisions and drops only tool results" },
        { id: "b", text: "/compact; it summarizes the conversation so far, but some details may be lost" },
        { id: "c", text: "/context; it frees space by unloading the files Claude has read" },
        { id: "d", text: "/compact; it keeps every message word for word in a compressed form" }
      ],
      correct: ["b"],
      why: "/compact summarizes everything up to that point and drops unneeded tool results, which can lose detail. /clear removes everything and suits a new feature; /context only shows what uses the space."
    },
    {
      id: "cb09",
      domain: "Daily workflows",
      select: 1,
      stem: "A teammate keeps prompts very short, like \"fix the login bug,\" to save context. What does the course say about this?",
      options: [
        { id: "a", text: "It backfires: without clear instructions Claude explores more and reasons on its own, which uses far more context" },
        { id: "b", text: "It works, because your prompts are the main source of context usage" },
        { id: "c", text: "It works, but only while the session is in plan mode" },
        { id: "d", text: "It makes no difference, because prompts are not counted in the context window" }
      ],
      correct: ["a"],
      why: "A vague prompt looks smaller but costs more context in the long run. A specific prompt saves Claude a lot of exploration."
    },
    {
      id: "cb10",
      domain: "Daily workflows",
      select: 1,
      stem: "Claude's latest change is wrong as a whole. You run /rewind, pick the prompt that produced it, and choose Restore code and conversation. What is not rolled back?",
      options: [
        { id: "a", text: "Edits Claude made to files with its editing tools" },
        { id: "b", text: "The messages after the prompt you picked" },
        { id: "c", text: "Files changed by shell commands Claude ran, such as a package install" },
        { id: "d", text: "Nothing; /rewind restores the entire state of the machine" }
      ],
      correct: ["c"],
      why: "/rewind (or Esc twice on an empty prompt) restores Claude's own edits and the conversation. Changes made through shell commands are outside what it tracks."
    },
    {
      id: "cb11",
      domain: "Daily workflows",
      select: 1,
      stem: "You run /code-review on a change before committing it. What does the reviewer do?",
      options: [
        { id: "a", text: "It reviews from inside your session, so it can use everything Claude already decided" },
        { id: "b", text: "It fixes each finding at once and commits the result for you" },
        { id: "c", text: "It posts its findings on the pull request, because it is the same as Claude Code Review" },
        { id: "d", text: "It reviews the change in a clean context, without your session's history, and edits nothing unless you ask" }
      ],
      correct: ["d"],
      why: "A fresh reviewer doesn't carry the history of the session that wrote the code. Claude Code Review is a separate team product for GitHub pull requests; /code-review reports in your conversation."
    },
    {
      id: "cb12",
      domain: "Memory, subagents & skills",
      select: 1,
      stem: "You're starting a brand-new project with Claude Code. What does the course recommend about CLAUDE.md?",
      options: [
        { id: "a", text: "Start without one, note where you keep course-correcting Claude, and run /init when you're ready" },
        { id: "b", text: "Write a long CLAUDE.md before the first session so Claude never has to explore" },
        { id: "c", text: "Copy another project's CLAUDE.md so every repository shares the same rules" },
        { id: "d", text: "Skip it entirely, since Claude reads CLAUDE.md only after /compact" }
      ],
      correct: ["a"],
      why: "Starting without one shows which corrections you actually repeat, which keeps the file compact and focused. /init then generates a first version from the codebase."
    },
    {
      id: "cb13",
      domain: "Memory, subagents & skills",
      select: 1,
      stem: "You ask Claude to create a code-reviewer subagent in .claude/agents/, a folder that didn't exist when the session started. The file is saved, but the subagent isn't available. What should you do?",
      options: [
        { id: "a", text: "Paste the subagent's prompt into CLAUDE.md so it loads at startup" },
        { id: "b", text: "Restart Claude Code so it loads the new subagent" },
        { id: "c", text: "Rename the file to SKILL.md" },
        { id: "d", text: "Add the subagent's name to .mcp.json" }
      ],
      correct: ["b"],
      why: "Subagents in .claude/agents/ work in the current project and those in ~/.claude/agents/ in all your projects. A folder created mid-session is picked up after a restart."
    },
    {
      id: "cb14",
      domain: "Memory, subagents & skills",
      select: 1,
      stem: "You want Claude to use TypeScript strict mode in every task, and to follow your commit-message format only when it writes commits. Where should each instruction live?",
      options: [
        { id: "a", text: "Both in CLAUDE.md, because skills run only when you type a slash command" },
        { id: "b", text: "Strict mode in a skill, the commit format in CLAUDE.md" },
        { id: "c", text: "Strict mode in CLAUDE.md, the commit format in a skill" },
        { id: "d", text: "Both in a skill, because skills load into every conversation" }
      ],
      correct: ["c"],
      why: "CLAUDE.md loads into every conversation, so always-on rules go there. A skill loads only its name and description until a request matches, which suits task-specific knowledge like a commit format."
    },
    {
      id: "cb15",
      domain: "MCP & hooks",
      select: 1,
      stem: "With claude mcp add you connect two servers: one for your team's hosted issue tracker and one that runs a Python script on your laptop. Which server types fit?",
      options: [
        { id: "a", text: "Stdio for the tracker, HTTP for the script" },
        { id: "b", text: "HTTP for both, because every MCP server connects over the network" },
        { id: "c", text: "Stdio for both, because Claude Code only runs local servers" },
        { id: "d", text: "HTTP for the hosted tracker, stdio for the local script" }
      ],
      correct: ["d"],
      why: "HTTP servers are remote services hosted by the provider; stdio servers are local processes on your machine. /mcp then shows what is connected and lets you disable servers."
    },
    {
      id: "cb16",
      domain: "MCP & hooks",
      select: 1,
      stem: "You need only a few GitHub operations, and the gh CLI is already installed. Why might the course prefer gh over a GitHub MCP server here?",
      options: [
        { id: "a", text: "The CLI is more context-efficient, because it doesn't add a listing for each tool to the context" },
        { id: "b", text: "MCP servers cannot reach GitHub, only local files" },
        { id: "c", text: "The CLI runs without any permission checks, so it is faster" },
        { id: "d", text: "MCP tools are disabled whenever a matching CLI exists" }
      ],
      correct: ["a"],
      why: "Each connected MCP server adds its tool names and instructions to context even when idle. Use /mcp to disable servers you aren't actively using."
    },
    {
      id: "cb17",
      domain: "MCP & hooks",
      select: 1,
      stem: "You want Prettier to run every time Claude edits or creates a file. Which hook setup does the course use?",
      options: [
        { id: "a", text: "A PreToolUse hook with the matcher \"Bash\"" },
        { id: "b", text: "A UserPromptSubmit hook with no matcher" },
        { id: "c", text: "A PostToolUse hook with the matcher \"Edit|Write\"" },
        { id: "d", text: "A Stop hook with the matcher \"Edit|Write\"" }
      ],
      correct: ["c"],
      why: "PostToolUse fires after a tool call completes, and the matcher limits it to the Edit and Write tools. Unlike an instruction in CLAUDE.md, the hook runs every time."
    },
    {
      id: "cb18",
      domain: "MCP & hooks",
      select: 2,
      stem: "Your team keeps hook scripts in the repository and wants everyone who clones it to get the same hooks. Which two steps match the course? (Choose two.)",
      options: [
        { id: "a", text: "Create the hooks with /hooks, which writes them into each teammate's settings" },
        { id: "b", text: "Configure the hooks in .claude/settings.json and commit that file" },
        { id: "c", text: "Reference the scripts with the CLAUDE_PROJECT_DIR variable so they work from any working directory" },
        { id: "d", text: "Describe the hooks in CLAUDE.md so Claude runs them when they seem relevant" }
      ],
      correct: ["b", "c"],
      why: "Hooks in .claude/settings.json are project-level and travel with the repo. /hooks only shows a read-only list, and CLAUDE.md is guidance, not a guaranteed run."
    }
  ]
};
