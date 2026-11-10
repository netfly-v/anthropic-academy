window.QUIZ_BANK = {
  id: "claude-code",
  passPercent: 70,
  questions: [
    {
      id: "cc01",
      domain: "Long sessions",
      select: 2,
      stem: "Midway through a long refactor, the context window is filling up and Claude has started to drift. Which two statements about compaction and rewind are correct? (Choose two.)",
      options: [
        { id: "a", text: "Text you write after /compact tells Claude what the summary should keep" },
        { id: "b", text: "Checkpoints exist only for turns where Claude edited files, so chat-only turns cannot be rewound" },
        { id: "c", text: "\"Summarize up to here\" compresses everything before the checkpoint and keeps the later messages intact" },
        { id: "d", text: "A plain /compact keeps every important detail, so instructions after the command change nothing" }
      ],
      correct: ["a", "c"],
      why: "Anything written after /compact shapes what the summary keeps. Every user prompt creates a checkpoint, and \"Summarize up to here\" compresses a long setup phase while leaving the implementation intact."
    },
    {
      id: "cc02",
      domain: "Long sessions",
      select: 1,
      stem: "You start a run with /goal and the condition \"the billing code is clean and easy to maintain.\" Why is this a weak completion condition?",
      options: [
        { id: "a", text: "/goal accepts only conditions that name one file or directory, so this scope is too broad" },
        { id: "b", text: "The evaluator only reads the transcript, so the condition should be checkable from output such as a test run" },
        { id: "c", text: "The evaluator checks the condition only once, before Claude takes its first turn" },
        { id: "d", text: "Goal conditions must be shell commands, which the evaluator runs by itself after every turn" }
      ],
      correct: ["b"],
      why: "A fast evaluator decides whether \"done\" is met by reading the transcript. Write conditions it can verify from what Claude produces, like \"all tests in src/billing pass.\""
    },
    {
      id: "cc03",
      domain: "Long sessions",
      select: 1,
      stem: "You want two Claude sessions to work on the same repository at the same time. Both need the git-ignored .env.local file. What setup does the course recommend?",
      options: [
        { id: "a", text: "Run both sessions in the same checkout and use /loop so they take turns editing" },
        { id: "b", text: "Commit .env.local so that every checkout and worktree receives it from git" },
        { id: "c", text: "Give each session its own worktree and list .env.local in a .worktreeinclude file at the repo root" },
        { id: "d", text: "Give each session its own worktree and delete each one by hand, since worktrees are never cleaned up" }
      ],
      correct: ["c"],
      why: "Separate worktrees keep sessions from clobbering each other's files. .worktreeinclude copies git-ignored files into each worktree, and a clean worktree is removed automatically when its session exits."
    },
    {
      id: "cc04",
      domain: "CLAUDE.md & skills",
      select: 1,
      stem: "Your project CLAUDE.md has grown to 500 lines, so you split it into three files and reference them with @path imports. What does this change?",
      options: [
        { id: "a", text: "It organizes the rules, but imported files expand inline at launch, so Claude reads the same amount of context" },
        { id: "b", text: "Imported files load only when Claude decides they are relevant, which shrinks the startup context" },
        { id: "c", text: "Imported rules become enforced configuration instead of guidance" },
        { id: "d", text: "Imported files are read only after the first /compact of the session" }
      ],
      correct: ["a"],
      why: "Imports are for organization. Everything still loads up front, so they do not reduce what Claude has to read."
    },
    {
      id: "cc05",
      domain: "CLAUDE.md & skills",
      select: 1,
      stem: "Claude keeps adding default exports even though your CLAUDE.md says \"Don't use default exports.\" Which rewrite follows the course's advice on phrasing rules?",
      options: [
        { id: "a", text: "IMPORTANT: YOU MUST avoid default exports." },
        { id: "b", text: "Follow best practices for exports in this project." },
        { id: "c", text: "Avoid default exports where possible." },
        { id: "d", text: "Use named exports, not default exports." }
      ],
      correct: ["d"],
      why: "A rule that only bans something leaves the door open; naming the replacement makes it specific and checkable. Emphasis is a budget to spend on the few rules that hurt most when broken."
    },
    {
      id: "cc06",
      domain: "CLAUDE.md & skills",
      select: 1,
      stem: "Your verification skill fires after a refactor, runs the test suite, and every test is green. Why does the skill still read the diff before it reports pass?",
      options: [
        { id: "a", text: "The skill's description triggers only on diffs, so it has to load one" },
        { id: "b", text: "To confirm that no test was weakened just to make the suite pass" },
        { id: "c", text: "To count the changed lines for the pass/fail report" },
        { id: "d", text: "Because Claude cannot see test results unless the diff is in context" }
      ],
      correct: ["b"],
      why: "A test can be quietly loosened so it passes no matter what. Done means the gates were run and observed, with the evidence stated, not just a green run."
    },
    {
      id: "cc07",
      domain: "Permissions & hooks",
      select: 1,
      stem: "Your CLAUDE.md says \"never push to main,\" and Claude respects it most of the time. For unattended runs that is not good enough. What does the course recommend?",
      options: [
        { id: "a", text: "Rewrite the rule in capitals with IMPORTANT so it gets top priority" },
        { id: "b", text: "Move the rule into the local CLAUDE.md so it loads after the project file" },
        { id: "c", text: "Enforce it with a PreToolUse hook, which runs before the action and can block it" },
        { id: "d", text: "Turn the rule into a skill whose description mentions git pushes" }
      ],
      correct: ["c"],
      why: "CLAUDE.md and skills are instructions Claude follows; a hook is code that runs. A PreToolUse hook can actually stop the push, which is real enforcement."
    },
    {
      id: "cc08",
      domain: "Permissions & hooks",
      select: 1,
      stem: "A nightly CI job runs Claude Code with no one watching. Only a fixed set of pre-approved tools may run, and anything else must be refused at once instead of waiting for approval. Which permission mode fits?",
      options: [
        { id: "a", text: "Manual" },
        { id: "b", text: "Plan" },
        { id: "c", text: "Bypass permissions" },
        { id: "d", text: "Don't ask" }
      ],
      correct: ["d"],
      why: "Don't ask allows only pre-approved tools and auto-denies everything else with no prompt, so the pipeline never hangs. Bypass permissions skips all checks and belongs only in isolated containers or VMs."
    },
    {
      id: "cc09",
      domain: "Permissions & hooks",
      select: 1,
      stem: "In auto mode Claude refactors authentication. Every action was allowed, but the new code is broken. What explains this, and what does the course pair with auto mode?",
      options: [
        { id: "a", text: "The classifier checks intent, not correctness; add a Stop hook that runs the tests when Claude finishes" },
        { id: "b", text: "Auto mode reviews only Bash commands, not edits; switch to plan mode for refactors" },
        { id: "c", text: "The classifier approves all local edits; switch to accept edits so each edit is tested first" },
        { id: "d", text: "Auto mode runs the tests before each action, so the test suite must be incomplete" }
      ],
      correct: ["a"],
      why: "The classifier guards intent before each action and lets broken but harmless code through. A Stop hook that runs the tests guards correctness after Claude finishes."
    },
    {
      id: "cc10",
      domain: "Permissions & hooks",
      select: 2,
      stem: "You are writing hook scripts for Claude Code. Which two statements about hook behavior are correct? (Choose two.)",
      options: [
        { id: "a", text: "Exit code 1 does not block the action; to block, the script must exit 2" },
        { id: "b", text: "updatedInput is merged into the original input, so you send only the fields you change" },
        { id: "c", text: "Exiting 2 from a PostToolUse hook stops the tool call before it runs" },
        { id: "d", text: "To re-inject context after compaction, use SessionStart with the compact matcher, not PostCompact" }
      ],
      correct: ["a", "d"],
      why: "Only exit 2 blocks; other non-zero codes are logged and Claude carries on. updatedInput replaces the whole input object, and PostToolUse fires after the tool has already run."
    },
    {
      id: "cc11",
      domain: "Automation",
      select: 2,
      stem: "You plan to rely on a routine for a nightly check of outdated dependencies. Which two statements about routines are correct? (Choose two.)",
      options: [
        { id: "a", text: "The routine runs on your own machine, so that machine must stay on overnight" },
        { id: "b", text: "Each run starts from a fresh clone of the repository's default branch" },
        { id: "c", text: "A recurring schedule can run at most once an hour" },
        { id: "d", text: "Each run continues in the working tree that the previous run left behind" }
      ],
      correct: ["b", "c"],
      why: "Routines run on Anthropic's infrastructure, from a fresh clone each time, and by default push only to claude/-prefixed branches. They are a research preview, and schedules more frequent than hourly are not supported."
    },
    {
      id: "cc12",
      domain: "Automation",
      select: 1,
      stem: "A script runs claude -p with --output-format json and a --json-schema. Where does the object that matches your schema appear?",
      options: [
        { id: "a", text: "In the structured_output field of the JSON response" },
        { id: "b", text: "In the result field, as the text of Claude's final answer" },
        { id: "c", text: "On standard error, separate from the normal output" },
        { id: "d", text: "In a file that Claude Code writes next to the script" }
      ],
      correct: ["a"],
      why: "With a JSON schema and the JSON output format, Claude constrains its output to the schema, and the matching object lands in structured_output, ready for jq."
    },
    {
      id: "cc13",
      domain: "Automation",
      select: 1,
      stem: "Your team wants to comment \"@claude implement the spec in the linked issue\" on a pull request and have Claude push the commits. Which option fits?",
      options: [
        { id: "a", text: "Enable the managed Code Review service and set it to run on every push" },
        { id: "b", text: "Run /install-github-app and add a claude-code-action workflow that listens for @claude" },
        { id: "c", text: "Enable Code Review and comment @claude review so it applies its findings" },
        { id: "d", text: "Add the request to CLAUDE.md so Claude watches pull requests for comments" }
      ],
      correct: ["b"],
      why: "Code Review posts findings as inline comments and never approves, blocks, or fixes the PR. When the job goes beyond review, such as implementing changes from a comment, use the GitHub Action."
    },
    {
      id: "cc14",
      domain: "Verification & plugins",
      select: 1,
      stem: "An unattended run finishes, and Claude's summary of the changes reads perfectly. Before you ship the work, where does the course say to start?",
      options: [
        { id: "a", text: "With Claude's summary, then spot-check a few of the files it mentions" },
        { id: "b", text: "With the diff: run /code-review, then read git diff and look for files outside the plan" },
        { id: "c", text: "With the auto mode log, because the classifier has already judged correctness" },
        { id: "d", text: "By asking the same session to confirm that its own changes are correct" }
      ],
      correct: ["b"],
      why: "A tidy summary can hide a change to a file you didn't expect; the diff shows it. The classifier never judges correctness, and a fresh reviewer catches what the original run talked itself past."
    },
    {
      id: "cc15",
      domain: "Verification & plugins",
      select: 1,
      stem: "You install a community plugin only for its skills. It also ships PreToolUse and Stop hooks, and you already have your own PreToolUse hook. What happens?",
      options: [
        { id: "a", text: "Your PreToolUse hook replaces the plugin's, because local configuration wins" },
        { id: "b", text: "The plugin's hooks stay inactive until you invoke one of its skills" },
        { id: "c", text: "The plugin's PreToolUse hook replaces yours, because the newest install wins" },
        { id: "d", text: "Both PreToolUse hooks fire and the plugin's Stop hook runs too, so read its hooks before installing" }
      ],
      correct: ["d"],
      why: "Plugin components run alongside yours: hooks stack, and you get them whether or not you read them. A plugin runs code with your privileges, so check its details first."
    },
    {
      id: "cc16",
      domain: "Verification & plugins",
      select: 1,
      stem: "You package your team's working .claude setup as a plugin. Which statement about the .claude-plugin/plugin.json manifest is correct?",
      options: [
        { id: "a", text: "It is required; without it Claude Code cannot discover any of the plugin's components" },
        { id: "b", text: "It must list the path of every skill, agent, and hook file in the plugin" },
        { id: "c", text: "It is optional; if present, name is the only required field, and it namespaces the skills" },
        { id: "d", text: "version is the only required field, and the name defaults to the repository owner" }
      ],
      correct: ["c"],
      why: "Claude Code discovers components by directory convention. The name prefixes skills as name:skill-name so they don't collide, and the version is what makes updates work across the team."
    }
  ]
};
