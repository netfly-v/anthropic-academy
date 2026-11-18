window.QUIZ_BANK = {
  id: "subagents",
  passPercent: 70,
  questions: [
    {
      id: "sb01",
      domain: "Subagent basics",
      select: 1,
      stem: "You ask Claude Code which service in an unfamiliar codebase handles refunds. It hands the question to the Explore subagent, which reads 15 files and runs several searches. What ends up in your main context window?",
      options: [
        { id: "a", text: "All 15 file reads and searches, so you can audit how the answer was found" },
        { id: "b", text: "Your question and the subagent's summary; the intermediate reads and searches stay in the subagent's own context" },
        { id: "c", text: "Nothing at all; the answer is written only to a transcript file" },
        { id: "d", text: "The subagent's system prompt followed by every tool call it made" }
      ],
      correct: ["b"],
      why: "The subagent works in a separate context window and returns only a summary. The tradeoff is that the main conversation does not see how it reached its conclusions."
    },
    {
      id: "sb02",
      domain: "Subagent basics",
      select: 2,
      stem: "The main agent launches a subagent. What does the subagent's starting context contain? (Choose two.)",
      options: [
        { id: "a", text: "A custom system prompt from the subagent's configuration file" },
        { id: "b", text: "The full history of the main conversation so far" },
        { id: "c", text: "A task description written by the parent agent based on what you asked for" },
        { id: "d", text: "The results of every tool call the main thread has made" }
      ],
      correct: ["a", "c"],
      why: "A subagent starts in a fresh context window; its starting context includes its system prompt and the task description the parent writes. It does not see the main conversation."
    },
    {
      id: "sb03",
      domain: "Subagent basics",
      select: 1,
      stem: "You turn on plan mode, and Claude researches and analyzes your codebase before presenting a plan. Which built-in subagent is meant for this?",
      options: [
        { id: "a", text: "General purpose" },
        { id: "b", text: "Explore" },
        { id: "c", text: "Plan" },
        { id: "d", text: "A custom code reviewer from .claude/agents/" }
      ],
      correct: ["c"],
      why: "Plan is used during plan mode for research before presenting a plan. Explore is for fast searching and navigation; general purpose is for multi-step tasks that need both exploration and action."
    },
    {
      id: "sb04",
      domain: "Creating subagents",
      select: 1,
      stem: "You want your security-review subagent to be available in every project on your machine, not only in the current repository. Where should its file go?",
      options: [
        { id: "a", text: "~/.claude/agents/ in your home directory" },
        { id: "b", text: ".claude/agents/ in the current project" },
        { id: "c", text: "CLAUDE.md, under a \"Subagents\" heading" },
        { id: "d", text: ".claude/skills/ in the current project" }
      ],
      correct: ["a"],
      why: "A file in ~/.claude/agents/ is user-level and shared across all your projects. A file in .claude/agents/ is project-level and available only in that project."
    },
    {
      id: "sb05",
      domain: "Creating subagents",
      select: 2,
      stem: "Claude only uses your docs-checker subagent when you name it explicitly. You want Claude to delegate to it on its own. Which two changes does the course recommend? (Choose two.)",
      options: [
        { id: "a", text: "Include the word \"proactively\" in the description field" },
        { id: "b", text: "Set the model field to opus so the subagent is picked more often" },
        { id: "c", text: "Add concrete example conversations to the description that show when to delegate" },
        { id: "d", text: "Choose a brighter color so the main agent notices the subagent" }
      ],
      correct: ["a", "c"],
      why: "The description controls when Claude decides to use the subagent. \"Proactively\" and specific trigger examples make automatic delegation more likely; model and color do not affect it."
    },
    {
      id: "sb06",
      domain: "Creating subagents",
      select: 1,
      stem: "One subagent only tidies short changelog entries and should be fast. Another does complex architecture analysis. Which model settings match the course's guidance?",
      options: [
        { id: "a", text: "opus for both, because subagents run in a separate context" },
        { id: "b", text: "haiku for the changelog subagent, opus for the architecture subagent" },
        { id: "c", text: "inherit for the changelog subagent, haiku for the architecture subagent" },
        { id: "d", text: "No model field; subagents cannot choose a model" }
      ],
      correct: ["b"],
      why: "Haiku suits fast, lightweight tasks and Opus suits complex analysis; Sonnet sits in between, and inherit reuses the main conversation's model."
    },
    {
      id: "sb07",
      domain: "Designing subagents",
      select: 1,
      stem: "When the main agent delegates to your code-review subagent, its input prompt only says \"use git diff to find the current changes.\" You want it to list the exact files to review. What should you change?",
      options: [
        { id: "a", text: "Add to the subagent's description: \"You must tell the agent precisely which files you want it to review\"" },
        { id: "b", text: "Put the list of files in the subagent's color field" },
        { id: "c", text: "Give the subagent Edit and Write so it can find the files itself" },
        { id: "d", text: "Rename the subagent file so the main agent rereads it" }
      ],
      correct: ["a"],
      why: "The name and description of every subagent go into the main agent's system prompt, and the main agent uses the description as guidance when it writes the input prompt."
    },
    {
      id: "sb08",
      domain: "Designing subagents",
      select: 1,
      stem: "Your research subagent often runs much longer than needed and returns summaries the main agent struggles to use. What does the course call the single most important improvement?",
      options: [
        { id: "a", text: "Switch the subagent to haiku so it finishes sooner" },
        { id: "b", text: "Remove Read and Grep from its tools so it cannot keep exploring" },
        { id: "c", text: "Tell it in the description that it is an expert researcher" },
        { id: "d", text: "Define a structured output format in its system prompt, the body of the subagent file" }
      ],
      correct: ["d"],
      why: "An output format gives natural stopping points: the subagent knows it is done once every section is filled, and it returns information the main thread can use."
    },
    {
      id: "sb09",
      domain: "Designing subagents",
      select: 2,
      stem: "You are tuning a code-review subagent. Which two changes follow the course's design patterns? (Choose two.)",
      options: [
        { id: "a", text: "Give it Edit and Write so it can fix the issues it finds" },
        { id: "b", text: "Add an \"Obstacles Encountered\" section to its output format for workarounds, environment quirks and commands that needed special flags" },
        { id: "c", text: "Have it return only \"approved\" or \"changes needed\" to save tokens" },
        { id: "d", text: "Give it Bash so it can run git diff, but not Edit or Write" }
      ],
      correct: ["b", "d"],
      why: "Reported obstacles save the main thread from rediscovering the same fixes. A reviewer needs Bash for git diff but should not change code; Edit and Write belong to agents whose job is to modify files."
    },
    {
      id: "sb10",
      domain: "When to delegate",
      select: 1,
      stem: "You built a checkout feature with Claude over many turns in the main thread. Why does the course suggest a reviewer subagent instead of asking the same thread to review it?",
      options: [
        { id: "a", text: "Subagents always run on a stronger model than the main thread" },
        { id: "b", text: "The main thread helped write the code and struggles to see it with fresh eyes; a subagent reviews the changes in a separate context without that history" },
        { id: "c", text: "The main thread is not allowed to run git diff" },
        { id: "d", text: "Reviews done in the main thread are not saved to the transcript" }
      ],
      correct: ["b"],
      why: "Claude reviews code better when it is presented as someone else's work. The subagent's system prompt can also hold project-specific review standards, so the criteria stay consistent across the team."
    },
    {
      id: "sb11",
      domain: "When to delegate",
      select: 1,
      stem: "A teammate proposes a chain of three subagents: one reproduces a bug, the next debugs it, the last one fixes it. What does the course say about this design?",
      options: [
        { id: "a", text: "It works well because each subagent has a narrow, focused job" },
        { id: "b", text: "It works as long as all three subagents use the same model" },
        { id: "c", text: "It tends to fail: each step depends on what the previous one discovered, and information gets lost in the handoff" },
        { id: "d", text: "It is the recommended setup for any bug that touches more than one file" }
      ],
      correct: ["c"],
      why: "Sequential pipelines work only when the steps are truly independent. Bug fixing almost never is, so that work belongs in the main thread."
    },
    {
      id: "sb12",
      domain: "When to delegate",
      select: 1,
      stem: "The course's decision rule asks one question: does the intermediate work matter? Which task is the best fit for a subagent?",
      options: [
        { id: "a", text: "Running the test suite while you diagnose the failing tests" },
        { id: "b", text: "A \"you are a Kubernetes specialist\" subagent for deployment questions" },
        { id: "c", text: "Writing landing-page copy with a custom system prompt about tone, audience and style" },
        { id: "d", text: "Tracing a crash step by step, deciding each next step from the last finding" }
      ],
      correct: ["c"],
      why: "Claude Code's default prompt favors concise technical writing, so a copywriting subagent does something the main thread can't. Test runners hide the output you need, and expert personas add nothing Claude doesn't already know."
    }
  ]
};
