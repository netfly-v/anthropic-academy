window.QUIZ_BANK = {
  id: "skills",
  passPercent: 70,
  questions: [
    {
      id: "q01",
      domain: "What skills are",
      select: 1,
      stem: "A team wants Claude to follow a long pull-request checklist only when someone asks for a review. The checklist should not sit in context while they are debugging. Where should it live?",
      options: [
        { id: "a", text: "CLAUDE.md, because project rules load into every conversation" },
        { id: "b", text: "A skill, because the body loads only when the request matches or the skill is invoked" },
        { id: "c", text: "An MCP server, because checklists are external tools" },
        { id: "d", text: "A hook on every file save, so the checklist runs whether or not anyone asked" }
      ],
      correct: ["b"],
      why: "CLAUDE.md is for rules that must always apply. A skill keeps the checklist out of context until a review is actually requested."
    },
    {
      id: "q02",
      domain: "What skills are",
      select: 1,
      stem: "You want everyone who clones the repository to get the team's brand and review skills without a separate install. Where do you put them?",
      options: [
        { id: "a", text: "~/.claude/skills on your laptop only" },
        { id: "b", text: ".claude/skills in the repository, committed with the code" },
        { id: "c", text: "A SKILL.md file directly in the repository root" },
        { id: "d", text: ".claude/skills/SKILL.md, with no skill directory around the file" }
      ],
      correct: ["b"],
      why: "Project skills live in .claude/skills/<name>/SKILL.md. Personal skills in the home directory do not travel with the clone, and a SKILL.md at the skills root is not discovered."
    },
    {
      id: "q03",
      domain: "What skills are",
      select: 2,
      stem: "A new teammate asks what Claude Code actually loads when a session starts, and how a person can force a skill. Which two statements are correct?",
      options: [
        { id: "a", text: "At startup Claude loads each skill's name and description, not the full SKILL.md body" },
        { id: "b", text: "The full body of every skill is inserted into every conversation at startup" },
        { id: "c", text: "You can invoke a personal or project skill with / followed by its directory name" },
        { id: "d", text: "A skill never runs unless you type a slash command" }
      ],
      correct: ["a", "c"],
      why: "Startup context stays small because only name and description are loaded. The same skill can still be called explicitly with /directory-name, or matched automatically from the description."
    },
    {
      id: "q04",
      domain: "Creating a skill",
      select: 1,
      stem: "A repository contains a project skill named code-review. You also have a personal skill named code-review, and the company deploys an enterprise skill with that same name. Which copy runs?",
      options: [
        { id: "a", text: "The project skill, because the repository is what you have open" },
        { id: "b", text: "The personal skill, because your home directory is checked first" },
        { id: "c", text: "The enterprise skill, because managed settings outrank personal, project, and plugin skills" },
        { id: "d", text: "The plugin skill, because installed plugins override local files" }
      ],
      correct: ["c"],
      why: "Same-name conflicts resolve Enterprise, then Personal, then Project, then Plugins. Different names do not compete in this hierarchy."
    },
    {
      id: "q05",
      domain: "Creating a skill",
      select: 1,
      stem: "You rewrote the instructions in SKILL.md, but the running Claude Code session still follows the old checklist. What is the first thing to do?",
      options: [
        { id: "a", text: "Rename the skill so the new text gets a new command" },
        { id: "b", text: "Restart Claude Code so it rescans skills" },
        { id: "c", text: "Add the body of the skill to CLAUDE.md as well" },
        { id: "d", text: "Set allowed-tools, or the file is ignored" }
      ],
      correct: ["b"],
      why: "The skill list is collected when the session starts. Edits and deletions take effect after a restart."
    },
    {
      id: "q06",
      domain: "Creating a skill",
      select: 1,
      stem: "A skill whose description says only \"Helps with docs\" does not run when you ask to update the install section of the README. The file is valid and listed. What should you change?",
      options: [
        { id: "a", text: "The description, so it says what the skill does and includes phrases you actually use" },
        { id: "b", text: "The directory name, because matching uses the folder name rather than the description" },
        { id: "c", text: "The priority, by moving the skill from the project into a plugin" },
        { id: "d", text: "allowed-tools, because a skill cannot trigger until tools are listed" }
      ],
      correct: ["a"],
      why: "Automatic selection is a semantic match against the description. A vague description has nothing to overlap with a specific request."
    },
    {
      id: "q07",
      domain: "Configuration",
      select: 1,
      stem: "A skill sets allowed-tools to Read, Grep, and Glob. During that turn Claude calls Edit. Which statement matches current Claude Code behavior?",
      options: [
        { id: "a", text: "Edit is impossible while the skill is active, because allowed-tools is a hard allowlist" },
        { id: "b", text: "Read, Grep, and Glob are pre-approved for that turn; Edit stays available under the normal permission rules" },
        { id: "c", text: "allowed-tools permanently grants those tools for the rest of the session" },
        { id: "d", text: "Omitting allowed-tools blocks every tool except Read" }
      ],
      correct: ["b"],
      why: "allowed-tools skips the approval prompt for the listed tools on the invoking turn. To remove Edit and Write, list them in disallowed-tools. The grant clears on your next message."
    },
    {
      id: "q08",
      domain: "Configuration",
      select: 2,
      stem: "A skill's guide is 2,000 lines, plus a validation script. Which two choices keep context small?",
      options: [
        { id: "a", text: "Keep SKILL.md as a short map and put the long guide in references/ for Claude to open only when needed" },
        { id: "b", text: "Tell Claude to run the script and use its output, rather than reading the script into context" },
        { id: "c", text: "Paste the whole guide into SKILL.md so nothing can be missed" },
        { id: "d", text: "Put the guide in references/ and expect it to load automatically at startup" }
      ],
      correct: ["a", "b"],
      why: "Progressive disclosure loads supporting files only when the instructions say to. A script's source is expensive in context; its output is not, if Claude runs it instead of reading it."
    },
    {
      id: "q09",
      domain: "Configuration",
      select: 1,
      stem: "You want the onboarding skill to use Sonnet and to stop asking permission for a fixed set of read commands. Which frontmatter is the right shape?",
      options: [
        { id: "a", text: "name and description only; model and tools cannot be set on a skill" },
        { id: "b", text: "name, description, allowed-tools, and model" },
        { id: "c", text: "model inside the markdown body, because frontmatter is only the description" },
        { id: "d", text: "disallowed-tools listing Read, so Claude is forced to use Read" }
      ],
      correct: ["b"],
      why: "name and description are required. allowed-tools pre-approves tools, and model selects which Claude model the skill should use. disallowed-tools removes tools; it does not grant them."
    },
    {
      id: "q10",
      domain: "Skills vs other features",
      select: 1,
      stem: "You want a linter to run every time Claude writes a file, without anyone asking for it in chat. Which mechanism fits?",
      options: [
        { id: "a", text: "A skill whose description mentions linting" },
        { id: "b", text: "A hook on the file-write event" },
        { id: "c", text: "A subagent that starts a fresh context for every save" },
        { id: "d", text: "An MCP server, because linting is an external product" }
      ],
      correct: ["b"],
      why: "Hooks are event-driven. Skills are request-driven. A linter that must run on every save should not wait for the user's wording to match a description."
    },
    {
      id: "q11",
      domain: "Skills vs other features",
      select: 1,
      stem: "You want a wide repository search to happen without filling the main conversation with intermediate file reads. What should you use?",
      options: [
        { id: "a", text: "A skill, so the search instructions join the current conversation" },
        { id: "b", text: "A subagent, so the work runs in a separate context and returns a result" },
        { id: "c", text: "CLAUDE.md, so the search procedure is present in every turn" },
        { id: "d", text: "A hook, so the search fires whenever a file is saved" }
      ],
      correct: ["b"],
      why: "A skill adds instructions to the current conversation. A subagent is isolated, does the work, and returns the outcome."
    },
    {
      id: "q12",
      domain: "Skills vs other features",
      select: 2,
      stem: "A project needs an always-on rule \"never change the database schema\" and a way to file tickets in an external tracker. Which two choices are appropriate?",
      options: [
        { id: "a", text: "Put the schema rule in CLAUDE.md" },
        { id: "b", text: "Connect the tracker through an MCP server, and let a skill describe when to file a ticket" },
        { id: "c", text: "Replace both needs with one skill, because skills include external systems by themselves" },
        { id: "d", text: "Put the schema rule in a hook description so it loads only when the user mentions databases" }
      ],
      correct: ["a", "b"],
      why: "Always-on constraints belong in CLAUDE.md. MCP supplies the external tool. A skill can say how to use that tool, but it does not replace the integration."
    },
    {
      id: "q13",
      domain: "Sharing skills",
      select: 1,
      stem: "The skill tells Claude where packages live in this monorepo. It is useless in other repositories. How should the team share it?",
      options: [
        { id: "a", text: "Publish it as a marketplace plugin so every project installs it" },
        { id: "b", text: "Commit it under .claude/skills in this repository" },
        { id: "c", text: "Keep it only in ~/.claude/skills and ask teammates to copy the file" },
        { id: "d", text: "Deploy it as an enterprise skill because any team convention must be global" }
      ],
      correct: ["b"],
      why: "Repository-specific instructions belong in project skills and arrive with git clone. Plugins and enterprise settings are for skills that should travel across projects or be mandatory."
    },
    {
      id: "q14",
      domain: "Sharing skills",
      select: 1,
      stem: "You delegate a frontend review to a custom subagent. The accessibility-audit skill exists in .claude/skills, but the subagent ignores it. What is missing?",
      options: [
        { id: "a", text: "Nothing. Subagents inherit every skill from the parent conversation" },
        { id: "b", text: "A skills field in the subagent file that names accessibility-audit" },
        { id: "c", text: "A slash command typed inside the subagent after it starts" },
        { id: "d", text: "Moving the skill into CLAUDE.md so built-in Explorer can see it" }
      ],
      correct: ["b"],
      why: "Subagents start from a clean context. Only custom agents load skills, and only the ones listed in their frontmatter, at start rather than on demand. Built-in agents such as Explorer cannot use skills."
    },
    {
      id: "q15",
      domain: "Sharing skills",
      select: 2,
      stem: "An admin wants company-wide review standards and wants to limit plugin installs to approved sources. Which two statements are correct?",
      options: [
        { id: "a", text: "An enterprise skill overrides a personal, project, or plugin skill with the same name" },
        { id: "b", text: "strictKnownMarketplaces can restrict plugin sources to specific GitHub repos or npm packages" },
        { id: "c", text: "Plugin skills outrank enterprise skills" },
        { id: "d", text: "Built-in Plan and Verify agents will apply the enterprise skill automatically" }
      ],
      correct: ["a", "b"],
      why: "Managed settings are the highest priority for a shared name, and strictKnownMarketplaces is how an organization limits where plugins come from. Built-in agents still do not receive skills."
    },
    {
      id: "q16",
      domain: "Troubleshooting",
      select: 2,
      stem: "Claude answers \"what skills are available\" and your new skill is absent. The description is fine. Which two checks come first?",
      options: [
        { id: "a", text: "SKILL.md is inside a named directory, not directly under the skills root" },
        { id: "b", text: "The file name is exactly SKILL.md" },
        { id: "c", text: "Add more trigger phrases to the description" },
        { id: "d", text: "Run chmod +x on SKILL.md" }
      ],
      correct: ["a", "b"],
      why: "If the skill is missing from the list, the structure failed. Description wording matters only after it loads. Execute permission matters for scripts at runtime, not for discovering SKILL.md."
    },
    {
      id: "q17",
      domain: "Troubleshooting",
      select: 1,
      stem: "The skill loads on Windows, then a referenced script fails because of the path written in SKILL.md. Which fix matches the course checklist?",
      options: [
        { id: "a", text: "Write the path with backslashes because the machine is Windows" },
        { id: "b", text: "Use forward slashes in the path everywhere, including on Windows" },
        { id: "c", text: "Rename the skill so the path is shorter" },
        { id: "d", text: "Move the script into CLAUDE.md" }
      ],
      correct: ["b"],
      why: "Runtime path failures are often separators or missing execute permission. The checklist says to use forward slashes even on Windows, and chmod +x for scripts."
    },
    {
      id: "q18",
      domain: "Troubleshooting",
      select: 1,
      stem: "Your personal skill code-review never runs. The company has an enterprise skill with the same name. The personal file validates. What is going on?",
      options: [
        { id: "a", text: "Personal skills always beat enterprise skills when both exist" },
        { id: "b", text: "The enterprise skill is shadowing yours because of the priority order" },
        { id: "c", text: "Plugin cache must be cleared before any personal skill can load" },
        { id: "d", text: "The description is too specific, so Claude refuses enterprise and personal copies alike" }
      ],
      correct: ["b"],
      why: "A higher-priority skill with the same name wins every time. Rename the personal skill, or talk to the admin if the enterprise copy is the thing that should change."
    }
  ]
};
