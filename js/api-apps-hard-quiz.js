window.QUIZ_BANK = {
  id: "api-apps-hard-v2",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "ch01",
      domain: "Anthropic apps",
      select: 2,
      stem: "A team's coding assistant reads a bug report and returns, in one reply, the shell commands and code edits a developer should apply by hand. The team wants it to act as an agent the way Claude Code does. Which two changes get it there? (Choose two.)",
      options: [
        { id: "a", text: "Let Claude ask clarifying questions about the bug before it proposes any commands or edits" },
        { id: "b", text: "Give Claude tools that run commands and edit files, so that it carries out each step itself" },
        { id: "c", text: "Give Claude the full repository in its prompt, so that each step it proposes fits the code exactly" },
        { id: "d", text: "Let Claude see the result of what it just did and decide what to do next, until the bug is fully fixed" }
      ],
      correct: ["b", "d"],
      why: "Lesson 65, Anthropic apps, presents Claude Code and computer use as 'perfect examples of AI agents in action' and lists the principles they demonstrate: 'tool integration and usage', 'multi-step task execution', 'environmental interaction' and 'autonomous problem-solving'. Lesson 66, Claude Code setup, shows what that means for Claude Code: it can 'search, read, and edit files in your project' and 'run commands directly from the conversation'. Giving Claude tools that carry out the commands and edits supplies tool use (b); letting it see the result of what it just did and decide what to do next until the bug is fixed supplies multi-step execution, interaction with the environment and autonomous problem-solving — as in Lesson 67, Claude Code in action, where Claude 'will iterate on the implementation until all tests pass' (d). Clarifying questions (a) improve what Claude knows before it replies, but Claude still only writes instructions: a person carries them out, and Claude never sees the outcome. The whole repository in the prompt (c) is more context — Lesson 67 says 'the more context and structure you provide, the better results you'll get' — but the reply is still a set of instructions for a person to apply, so Claude neither acts nor observes.",
      why_ru: "Урок 65 „Приложения Anthropic“ представляет Claude Code и Computer Use как «отличные примеры AI-агентов в действии» и перечисляет принципы, которые они показывают: «подключение и использование инструментов», «выполнение задач в несколько шагов», «взаимодействие со средой» и «самостоятельное решение задач». Урок 66 „Установка Claude Code“ показывает, что это значит для Claude Code: он умеет «искать, читать и редактировать файлы проекта» и «запускать команды прямо из разговора». Инструменты, которые сами выполняют команды и правки, дают Claude использование инструментов (b); возможность видеть результат только что сделанного и решать, что делать дальше, пока ошибка не будет исправлена, даёт выполнение в несколько шагов, взаимодействие со средой и самостоятельное решение задач — как в уроке 67 „Claude Code в работе“, где Claude «будет дорабатывать реализацию, пока все тесты не пройдут» (d). Уточняющие вопросы (a) улучшают то, что Claude знает до ответа, но Claude по-прежнему только пишет инструкции: выполняет их человек, а результата Claude так и не видит. Весь репозиторий в промпте (c) — это больше контекста (урок 67 говорит: «чем больше контекста и структуры вы даёте, тем лучше результат»), но ответ всё равно остаётся набором инструкций, которые применяет человек, так что Claude и не действует, и не наблюдает."
    },
    {
      id: "ch02",
      domain: "Anthropic apps",
      select: 1,
      stem: "A logistics firm wants Claude to re-key shipment records into a native Windows program that has no API. Each record type opens a differently laid-out entry screen, so whoever enters the data has to look at the screen first. Which approach lets Claude do the job?",
      options: [
        { id: "a", text: "The Playwright MCP server, added to Claude Code so that Claude can work through each record in turn" },
        { id: "b", text: "Claude Code's terminal access, which lets Claude run a command for each record from the conversation" },
        { id: "c", text: "Screenshots sent to Claude as image input, so that it can read each entry screen before entering a record" },
        { id: "d", text: "Computer use, running in a full desktop environment on which the shipment program has been installed" }
      ],
      correct: ["d"],
      why: "Lesson 65, Anthropic apps: computer use is 'a collection of tools that allow Claude to interact with a full desktop computer environment', so Claude can 'interact with desktop applications' and 'perform tasks that require visual interface navigation' — what changing entry screens in a native program call for (d). Playwright (a) appears in Lesson 68, Enhancements with MCP servers, as giving Claude 'browser automation capabilities'; a native Windows program is not a page in a browser. Terminal access (b), one of Claude Code's built-in tools in Lesson 66, Claude Code setup, runs commands from the conversation; a program with no API that takes data only through its screens gives those commands nothing to call, and Claude never sees the screens. Screenshots sent as images (c) let Claude read each screen, but they give it no way to click or type into the program; seeing the desktop and acting on it is what the computer use tools add.",
      why_ru: "Урок 65 „Приложения Anthropic“: Computer Use — это «набор инструментов, которые позволяют Claude работать в полноценной среде настольного компьютера», поэтому Claude может «работать с настольными приложениями» и «выполнять задачи, для которых нужно ориентироваться в графическом интерфейсе» — а именно этого требуют меняющиеся экраны ввода в нативной программе (d). Playwright (a) упоминается в уроке 68 „MCP-серверы в Claude Code“ как сервер, который даёт Claude «автоматизацию браузера»; нативная программа для Windows — не страница в браузере. Доступ к терминалу (b), один из встроенных инструментов Claude Code в уроке 66 „Установка Claude Code“, запускает команды из разговора; у программы без API, которая принимает данные только через свои экраны, этим командам нечего вызывать, а экранов Claude так и не видит. Скриншоты, отправленные как изображения (c), позволяют Claude прочитать каждый экран, но не дают ему возможности щёлкать или вводить текст в программе; видеть рабочий стол и действовать на нём — это и добавляют инструменты Computer Use."
    },
    {
      id: "ch03",
      domain: "Anthropic apps",
      select: 1,
      stem: "A team wants an agent that bumps a library version in a repository, runs the test suite and fixes whatever breaks. One engineer proposes computer use, since it 'takes Claude's capabilities much further'. Which choice fits the task best?",
      options: [
        { id: "a", text: "Computer use, since driving an editor and a terminal window on the desktop covers every step of the task" },
        { id: "b", text: "Claude Code, since each step is a file edit or a command, which its built-in tools carry out directly" },
        { id: "c", text: "Both apps, with computer use making the edits and Claude Code running the tests and reading the results" },
        { id: "d", text: "Claude Code with the Playwright MCP server added, so that the agent has more tools to draw on" }
      ],
      correct: ["b"],
      why: "Lesson 65, Anthropic apps: Claude Code is 'a terminal-based coding assistant' ready to 'edit files and fix bugs' and 'help with development workflows', while computer use is for websites, desktop applications and 'tasks that require visual interface navigation'. Lesson 66, Claude Code setup, gives Claude Code built-in file operations ('search, read, and edit files in your project') and terminal access ('run commands directly from the conversation'), so bumping the version, running the suite and fixing the failures are all steps it performs directly (b). Computer use could drive an editor and a terminal (a), but nothing in this task requires visual interface navigation, so working through their windows only stands in for the file and command tools Claude Code already has. Splitting the task (c) hands the edits to the application that has to reach files through the screen. Playwright (d), in Lesson 68, Enhancements with MCP servers, adds 'browser automation capabilities'; the task involves no browser — a test suite runs as a command, and Claude Code reads its output in the terminal — so more tools add nothing that fits it.",
      why_ru: "Урок 65 „Приложения Anthropic“: Claude Code — «помощник по программированию в терминале», готовый «редактировать файлы и исправлять ошибки» и «помогать с рабочими процессами разработки», а Computer Use нужен для сайтов, настольных приложений и «задач, для которых нужно ориентироваться в графическом интерфейсе». Урок 66 „Установка Claude Code“ даёт Claude Code встроенную работу с файлами («поиск, чтение и редактирование файлов проекта») и доступ к терминалу («запуск команд прямо из разговора»), поэтому поднять версию, запустить набор тестов и исправить сбои — всё это шаги, которые он выполняет напрямую (b). Computer Use мог бы управлять редактором и терминалом (a), но ничто в этой задаче не требует ориентироваться в графическом интерфейсе, так что работа через их окна лишь подменяет инструменты для файлов и команд, которые у Claude Code уже есть. Разделение задачи (c) отдаёт правки тому приложению, которому до файлов приходится добираться через экран. Playwright (d) в уроке 68 „MCP-серверы в Claude Code“ добавляет «автоматизацию браузера»; браузера в задаче нет — набор тестов запускается командой, а его вывод Claude Code читает в терминале, — так что дополнительные инструменты не добавляют ничего, что ей подходит."
    },
    {
      id: "ch04",
      domain: "Setup",
      select: 1,
      stem: "A platform team sorts the requests developers will make in Claude Code's first week: some work with the built-in tools, others need an MCP server registered first. Which request do the built-in tools serve on their own?",
      options: [
        { id: "a", text: "Read the design decision recorded for the feature in the team's Confluence space before planning" },
        { id: "b", text: "Read the spacing and colour values of one frame in the design team's Figma file before coding" },
        { id: "c", text: "Search the web for an error message and read the forum threads that discuss the same failure" },
        { id: "d", text: "Click through a demo site's signup form in a browser and report what goes wrong" }
      ],
      correct: ["c"],
      why: "Lesson 66, Claude Code setup, lists the built-in tools: file operations ('search, read, and edit files in your project'), terminal access ('run commands directly from the conversation') and web access ('search documentation, fetch code examples, and more'), plus MCP server support to 'add additional tools by connecting MCP servers'. Searching the web for an error and reading the threads it finds is built-in web access (c). Each other request matches a server from the list in Lesson 68, Enhancements with MCP servers, which adds a capability the built-in set lacks: mcp-atlassian 'allows Claude to access Confluence and Jira' (a), figma-context-mcp 'exposes Figma designs to Claude' (b), and playwright-mcp 'gives Claude browser automation capabilities for testing and troubleshooting' — clicking through a form is browser automation, not searching and fetching (d).",
      why_ru: "Урок 66 „Установка Claude Code“ перечисляет встроенные инструменты: работу с файлами («поиск, чтение и редактирование файлов проекта»), доступ к терминалу («запуск команд прямо из разговора») и доступ к вебу («поиск документации, получение примеров кода и другое»), а также поддержку MCP-серверов, чтобы получать «новые инструменты через подключение MCP-серверов». Поиск ошибки в вебе и чтение найденных тредов — это встроенный доступ к вебу (c). Каждой из остальных просьб соответствует сервер из списка в уроке 68 „MCP-серверы в Claude Code“, который добавляет возможность, отсутствующую во встроенном наборе: mcp-atlassian «даёт Claude доступ к Confluence и Jira» (a), figma-context-mcp «открывает Claude доступ к макетам Figma» (b), а playwright-mcp «даёт Claude автоматизацию браузера для тестирования и отладки» — пройти форму по щелчкам значит автоматизировать браузер, а не искать и получать данные (d)."
    },
    {
      id: "ch05",
      domain: "Setup",
      select: 2,
      stem: "A team wants Claude Code to look up orders in the company's in-house order service, which has only an internal REST API. Which two steps give Claude Code this capability as a tool of its own? (Choose two.)",
      options: [
        { id: "a", text: "Build an MCP client for Claude Code, so that it can open a connection to the order service" },
        { id: "b", text: "List the order service as an MCP server in CLAUDE.md, so that Claude Code adds its tools" },
        { id: "c", text: "Build a custom MCP server that exposes the order lookups as tools for Claude Code to call" },
        { id: "d", text: "Register an MCP server for the order service with Claude Code from the command line" }
      ],
      correct: ["c", "d"],
      why: "Lesson 66, Claude Code setup, lists 'MCP Server support - Add additional tools by connecting MCP servers' among Claude Code's tools and says the integration lets you extend Claude Code 'by adding specialized tools for databases, APIs, or any other services you work with'. Lesson 68, Enhancements with MCP servers: 'Claude Code has an MCP client built right into it, which means you can connect MCP servers', and a team's set-up can include 'custom servers for your internal tools and APIs'. So the team builds the server side — a custom MCP server that exposes the lookups as tools (c) — and registers it: 'You use the command line to register your server', and 'once registered, Claude Code will automatically connect to your server when it starts up' (d). An MCP client (a) is the part Claude Code already has built in. CLAUDE.md (b) is context that 'automatically gets included as context in all future conversations' (Lesson 67, Claude Code in action); it is not where servers are set up — the lesson registers them from the command line.",
      why_ru: "Урок 66 „Установка Claude Code“ называет среди инструментов Claude Code «поддержку MCP-серверов — новые инструменты через подключение MCP-серверов» и говорит, что эта интеграция позволяет расширять Claude Code «специализированными инструментами для баз данных, API и любых других сервисов, с которыми вы работаете». Урок 68 „MCP-серверы в Claude Code“: «в Claude Code встроен MCP-клиент, поэтому к нему можно подключать MCP-серверы», а в рабочий процесс команды могут входить «собственные серверы для ваших внутренних инструментов и API». Значит, команда делает серверную часть — собственный MCP-сервер, который предоставляет поиск заказов в виде инструментов (c), — и регистрирует его: «сервер регистрируется из командной строки», и «после регистрации Claude Code будет автоматически подключаться к серверу при запуске» (d). MCP-клиент (a) — та часть, которая в Claude Code уже встроена. CLAUDE.md (b) — это контекст, который «автоматически добавляется во все будущие разговоры» (урок 67 „Claude Code в работе“); серверы там не настраиваются — в уроке их регистрируют из командной строки."
    },
    {
      id: "ch06",
      domain: "Setup",
      select: 1,
      stem: "On a fresh Linux laptop, a developer runs the lesson's install command, npm install -g @anthropic-ai/claude-code, before she has logged in to any Anthropic account. The shell answers that npm is not found. What went wrong?",
      options: [
        { id: "a", text: "She skipped the first step, installing Node.js, which provides the npm command the install step uses" },
        { id: "b", text: "She skipped logging in to her Anthropic account, which the install step needs before it can download" },
        { id: "c", text: "She ran the command outside a Node.js project folder, so npm could not be found in the current directory" },
        { id: "d", text: "The global -g install needs administrator rights, so the shell cannot find npm until she runs it as admin" }
      ],
      correct: ["a"],
      why: "Lesson 66, Claude Code setup, gives three steps in order: install Node.js ('check if you already have it by running npm help in your terminal'), install Claude Code with npm install -g @anthropic-ai/claude-code, then run claude to start and log in. The install step runs npm, and the lesson's own test for Node.js is whether npm answers, so 'npm is not found' means the first step was skipped (a). The missing login (b) is a red herring: logging in is the third step — 'when you run the claude command for the first time, it will prompt you to log in' — and comes after the install. Neither the folder (c) nor missing rights (d) would hide the command: the lesson checks only whether npm answers in the terminal, and 'not found' means the npm command itself is missing.",
      why_ru: "Урок 66 „Установка Claude Code“ даёт три шага по порядку: установить Node.js («проверить, есть ли он уже, можно командой npm help в терминале»), установить Claude Code командой npm install -g @anthropic-ai/claude-code, затем запустить claude и войти в аккаунт. Шаг установки запускает npm, а проверка Node.js в самом уроке — отвечает ли npm, поэтому «npm не найден» означает, что первый шаг пропущен (a). Отсутствие входа в аккаунт (b) — ложный след: вход — третий шаг («при первом запуске команды claude она попросит войти в аккаунт»), и он идёт после установки. Ни папка (c), ни отсутствие прав (d) не скрыли бы команду: урок проверяет лишь, отвечает ли npm в терминале, а «не найден» означает, что нет самой команды npm."
    },
    {
      id: "ch07",
      domain: "CLAUDE.md",
      select: 1,
      stem: "Every Claude Code session on a team's repository follows a rule, 'prefer pathlib over os.path', that no one can find in the code or the README. A developer added it weeks ago with a shortcut typed during a session. Where should the team look to change it?",
      options: [
        { id: "a", text: "In CLAUDE.md, since notes added with the # command are written into that file and can be edited there" },
        { id: "b", text: "In the conversation history of the session where the note was added, since later sessions build on it" },
        { id: "c", text: "In the results of the last /init scan, which Claude Code keeps apart from CLAUDE.md and rereads in each session" },
        { id: "d", text: "In the prompts of the team's MCP servers, since server prompts are the templates Claude applies to its work" }
      ],
      correct: ["a"],
      why: "Lesson 67, Claude Code in action: 'You can also quickly add notes to your CLAUDE.md file using the # command', and the command list repeats '# - Adds notes to your CLAUDE.md file'; the file 'automatically gets included as context in all future conversations', which is why every session follows the rule. So the note sits in CLAUDE.md, an ordinary file the team can edit (a). Conversation history (b) belongs to one conversation — /clear 'clears conversation history and resets context' — and does not carry a note into later sessions. /init (c) does not keep separate results: 'Claude summarizes everything it learns in a special file called CLAUDE.md'. MCP prompts (d) are what a server can expose 'for templates' (Lesson 68, Enhancements with MCP servers); a note added during a session does not go to a server.",
      why_ru: "Урок 67 „Claude Code в работе“: «быстро добавлять заметки в CLAUDE.md можно и командой #», и список команд это повторяет: «# — добавляет заметки в файл CLAUDE.md»; файл «автоматически добавляется как контекст во все будущие разговоры», поэтому правилу и следует каждая сессия. Значит, заметка лежит в CLAUDE.md — обычном файле, который команда может редактировать (a). История разговора (b) относится к одному разговору — /clear «очищает историю разговора и сбрасывает контекст» — и не переносит заметку в последующие сессии. /init (c) не хранит отдельных результатов: «всё, что Claude узнал, он кратко записывает в специальный файл CLAUDE.md». Промпты MCP (d) — это то, что сервер может предоставлять «для шаблонов» (урок 68 „MCP-серверы в Claude Code“); заметка, добавленная во время сессии, на сервер не попадает."
    },
    {
      id: "ch08",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A consultant works in many client repositories, each with a committed CLAUDE.md she may not change. She wants to set up her personal commit-message rule once and have Claude Code follow it in every repository she opens, including future clients'. Where should the rule go?",
      options: [
        { id: "a", text: "In one repository's local CLAUDE.md, since local memory is personal and follows her across projects" },
        { id: "b", text: "In her user-level CLAUDE.md, since user memory is used across all of the projects she works on" },
        { id: "c", text: "In a # note saved once to project memory, since a note added with # applies wherever she works" },
        { id: "d", text: "In the project CLAUDE.md of a repository she owns, since her own project memory covers all her work" }
      ],
      correct: ["b"],
      why: "Lesson 67, Claude Code in action, names three CLAUDE.md scopes: project ('shared between all engineers working on the project'), local ('your personal notes that aren't checked into git') and user ('used across all your projects'). A personal rule set up once for every repository, present and future, is user memory (b). Local memory (a) is personal, but the page describes it only as 'your personal notes that aren't checked into git' and gives 'used across all your projects' to the user scope alone. A # note (c) is saved to whichever memory you pick — 'project, local, or user' — and project memory belongs to one project and is shared with its engineers, which here means a committed file she may not change. A project CLAUDE.md (d) belongs to its own project, 'shared between all engineers working on the project'; owning the repository does not make it apply to her other projects — reaching all of them is what the user scope is for.",
      why_ru: "Урок 67 „Claude Code в работе“ называет три области действия CLAUDE.md: Project (проект) — «общий для всех инженеров, работающих над проектом», Local (локальный) — «ваши личные заметки, которые не попадают в git» и User (пользовательский) — «действует во всех ваших проектах». Личное правило, настроенное один раз для всех репозиториев, нынешних и будущих, — это пользовательская память (b). Локальная память (a) личная, но страница описывает её только как «ваши личные заметки, которые не попадают в git», а слова «действует во всех ваших проектах» относит лишь к пользовательской области. Заметка через # (c) сохраняется в ту память, которую вы выберете: «проекта (project), локальную (local) или пользовательскую (user)», а память проекта принадлежит одному проекту и общая для его инженеров, то есть здесь это закоммиченный файл, который ей менять нельзя. CLAUDE.md проекта (d) относится к своему проекту и «общий для всех инженеров, работающих над проектом»; то, что репозиторий принадлежит ей, не распространяет его на другие её проекты — чтобы охватить их все, и нужна пользовательская область."
    },
    {
      id: "ch09",
      domain: "CLAUDE.md",
      select: 1,
      stem: "A team runs /init on a large service. The generated CLAUDE.md captures the build commands and coding style well but says almost nothing about the billing module's strict rules, which matter most to the team. What would have made the generated file cover them?",
      options: [
        { id: "a", text: "Running /init with a special direction about the billing module, so Claude attends to that area" },
        { id: "b", text: "Running /clear right before /init, so that the scan is not shaped by earlier chat about other modules" },
        { id: "c", text: "Running /init a second time, so that the follow-up scan fills in what the first pass skipped over" },
        { id: "d", text: "Writing the billing rules into a user-level CLAUDE.md first, so that /init builds the new file around them" }
      ],
      correct: ["a"],
      why: "Lesson 67, Claude Code in action: /init 'tells Claude to scan your entire codebase and understand your project's structure, dependencies, coding style, and architecture', and 'when running /init, you can add special directions for areas you want Claude to focus on'; the generated file then includes 'build commands, coding guidelines, and project-specific patterns that Claude should follow'. A module the team cares most about is exactly such an area, so a special direction given with /init is what makes the file cover it (a). /clear (b) 'clears conversation history and resets context'; it does not change what the scan looks at or what it emphasises. A second run (c) scans the same codebase with no new instruction; the page gives no reason it would weigh the billing module differently, and the lever it names for focus is the special direction. A user-level CLAUDE.md (d) is not a direction given with /init, the mechanism the page offers, and it is personal — 'used across all your projects' — so the rules would sit in one person's file instead of the team's.",
      why_ru: "Урок 67 „Claude Code в работе“: /init «говорит Claude просканировать всю кодовую базу и разобраться в структуре проекта, зависимостях, стиле кода и архитектуре», и «запуская /init, можно добавить особые указания — на какие области Claude стоит обратить внимание»; в созданном файле затем будут «команды сборки, правила оформления кода и характерные для проекта приёмы, которым Claude должен следовать». Модуль, который для команды важнее всего, — как раз такая область, поэтому именно особое указание при запуске /init заставляет файл его охватить (a). /clear (b) «очищает историю разговора и сбрасывает контекст»; на то, что сканируется и на чём делается акцент, это не влияет. Повторный запуск (c) сканирует ту же кодовую базу без нового указания; страница не даёт оснований считать, что модуль биллинга получит другой вес, а рычаг для фокуса, который она называет, — особое указание. Пользовательский CLAUDE.md (d) — не указание при запуске /init, то есть не тот механизм, который предлагает страница, и он личный («действует во всех ваших проектах»), так что правила оказались бы в файле одного человека, а не команды."
    },
    {
      id: "ch10",
      domain: "CLAUDE.md",
      select: 1,
      stem: "Months after a team ran /init, it moved the project from pip to uv and from unittest to pytest. Claude Code still proposes pip install and python -m unittest whenever it sets up or tests the project. Which action fixes the cause?",
      options: [
        { id: "a", text: "Run /clear before each request, so that every conversation starts from an empty context" },
        { id: "b", text: "Correct the commands in the README and commit it, so that the project's own documentation shows them" },
        { id: "c", text: "Correct the commands in the project's CLAUDE.md and commit it, so that every engineer's sessions get them" },
        { id: "d", text: "Tell Claude at the start of each session to use uv and pytest, so that the conversation sets it right" }
      ],
      correct: ["c"],
      why: "Lesson 67, Claude Code in action: /init scans the codebase and writes what Claude learns into CLAUDE.md — 'the generated file will include build commands' — and the file 'automatically gets included as context in all future conversations'. The months-old project file still lists pip and unittest, so the fix is to correct that file and commit it for the whole team (c). /clear (a) 'clears conversation history and resets context', but the outdated CLAUDE.md is included in the next conversation all the same. The README (b) is not the file the lesson says is included in every conversation; CLAUDE.md is, and it would still list the old commands. A reminder at the start of each session (d) corrects one conversation at a time, while the outdated file keeps loading into every new one; it works around the cause instead of fixing it.",
      why_ru: "Урок 67 „Claude Code в работе“: /init сканирует кодовую базу и записывает то, что узнал Claude, в CLAUDE.md («в созданном файле будут команды сборки»), а файл «автоматически добавляется как контекст во все будущие разговоры». Файл проекта, созданный несколько месяцев назад, всё ещё указывает pip и unittest, поэтому решение — исправить этот файл и закоммитить его для всей команды (c). /clear (a) «очищает историю разговора и сбрасывает контекст», но устаревший CLAUDE.md всё равно попадает в следующий разговор. README (b) — не тот файл, который, по словам урока, добавляется в каждый разговор; таков CLAUDE.md, и в нём по-прежнему остались бы старые команды. Напоминание в начале каждой сессии (d) исправляет по одному разговору за раз, а устаревший файл продолжает загружаться в каждый новый; это обходит причину, а не устраняет её."
    },
    {
      id: "ch11",
      domain: "Workflows",
      select: 1,
      stem: "A developer has Claude Code plan a PDF-and-Word-to-markdown tool without writing code, then has it implement that plan. The tool works but duplicates a conversion helper in document.py and is registered unlike the existing tool in math.py. Which earlier step would have prevented both problems?",
      options: [
        { id: "a", text: "Having Claude brainstorm test cases for the conversion tool and write them as tests first" },
        { id: "b", text: "Having Claude read and analyze the source files that the new feature is meant to build on" },
        { id: "c", text: "Having Claude run the project's existing test suite so that it sees how the current tools behave" },
        { id: "d", text: "Having Claude list the project's installed dependencies so that it knows which conversion libraries exist" }
      ],
      correct: ["b"],
      why: "Lesson 67, Claude Code in action, step 1 of the workflow: identify the files relevant to the feature and ask Claude to read and analyze them first, because this 'gives Claude examples of your coding patterns and existing functionality it can build upon'. The lesson's own example begins with 'Read the math.py and document.py files', and the plan that follows 'leverages existing binary_document_to_markdown function' and registers the tool with the MCP server — the existing pattern and the existing helper are exactly what this run missed (b). Brainstorming and writing tests first (a) is the test-driven workflow, which itself starts by showing Claude the relevant files; tests describe what the new tool must do, not which existing code to reuse. Running the existing suite (c) reports which tests pass; it does not point Claude at the helper or at how tools are registered. Listing the dependencies (d) shows which libraries could be imported, not that document.py already wraps the conversion or how math.py's tool is registered.",
      why_ru: "Урок 67 „Claude Code в работе“, шаг 1 рабочего процесса: найти файлы, относящиеся к функции, и попросить Claude сначала прочитать и проанализировать их, потому что так у Claude будут «примеры ваших приёмов кодирования и уже существующая функциональность, на которую можно опереться». Пример в самом уроке начинается с «Read the math.py and document.py files», а следующий за ним план «использует существующую функцию binary_document_to_markdown» и регистрирует инструмент в MCP-сервере — существующий образец и существующая вспомогательная функция и есть то, что упустили в этом прогоне (b). Сначала придумать и написать тесты (a) — это рабочий процесс через тесты, который и сам начинается с того, что Claude показывают нужные файлы; тесты описывают, что должен делать новый инструмент, а не какой существующий код использовать повторно. Запуск существующего набора тестов (c) сообщает, какие тесты проходят; он не указывает Claude ни на вспомогательную функцию, ни на то, как регистрируются инструменты. Список зависимостей (d) показывает, какие библиотеки можно импортировать, но не то, что document.py уже оборачивает конвертацию, и не то, как зарегистрирован инструмент в math.py."
    },
    {
      id: "ch12",
      domain: "Workflows",
      select: 1,
      stem: "A team builds a CSV importer with the test-driven workflow. After Claude reads the relevant files, tests are brainstormed and all of them are written; Claude then iterates until they pass. In production the importer fails on empty files. Why did Claude consider the importer finished?",
      options: [
        { id: "a", text: "Its success criteria were the written tests, and none checked empty files, so passing them all meant done" },
        { id: "b", text: "It had read the relevant files, and none of them showed any other part of the codebase handling empty input" },
        { id: "c", text: "It worked from a plan instead of the tests, and that plan listed no step for handling empty input files" },
        { id: "d", text: "It judged the code against the coding guidelines in CLAUDE.md, which say nothing about empty input files" }
      ],
      correct: ["a"],
      why: "Lesson 67, Claude Code in action: in the test-driven workflow Claude writes code that passes the tests and 'will iterate on the implementation until all tests pass'; the approach works 'because Claude has clear success criteria to work toward'. The tests are the criteria, so once every written test passed the importer counted as done, and no test checked empty files (a). Reading the relevant files (b) gives Claude 'examples of your coding patterns and existing functionality it can build upon'; it does not define when the work is finished. The test-driven workflow has no planning step (c): its steps are feeding context, thinking of test cases, writing the tests and writing code that passes them. CLAUDE.md (d) holds 'build commands, coding guidelines, and project-specific patterns'; in this workflow the finish line is the tests passing, not a check against those guidelines.",
      why_ru: "Урок 67 „Claude Code в работе“: в рабочем процессе через тесты Claude пишет код, проходящий тесты, и «будет дорабатывать реализацию, пока все тесты не пройдут»; подход работает, «потому что у Claude есть чёткие критерии успеха, к которым можно стремиться». Тесты и есть критерии, поэтому, как только прошёл каждый написанный тест, импортёр считался готовым, а пустые файлы не проверял ни один тест (a). Чтение нужных файлов (b) даёт Claude «примеры ваших приёмов кодирования и уже существующую функциональность, на которую можно опереться»; оно не определяет, когда работа закончена. В рабочем процессе через тесты нет шага планирования (c): его шаги — дать контекст, придумать тестовые сценарии, написать тесты и написать код, который их проходит. CLAUDE.md (d) содержит «команды сборки, правила оформления кода и характерные для проекта приёмы»; в этом рабочем процессе финишная черта — прохождение тестов, а не сверка с этими правилами."
    },
    {
      id: "ch13",
      domain: "Workflows",
      select: 1,
      stem: "A developer had Claude Code implement a feature, stashed the changes so the working tree is clean, and asked Claude in the same session to build it again with the test-driven workflow. The second implementation repeats the first almost line for line. What is the most likely cause?",
      options: [
        { id: "a", text: "Claude Code reloads the files it edited earlier from disk, so it still sees the first implementation there" },
        { id: "b", text: "The first implementation is still in the conversation history, so Claude ends up reusing its earlier answer" },
        { id: "c", text: "Claude saved the first implementation's design to CLAUDE.md, so it is now part of the project memory" },
        { id: "d", text: "The test-driven workflow converges on one design for a given feature, so a close match is expected" }
      ],
      correct: ["b"],
      why: "Lesson 67, Claude Code in action: /clear 'clears conversation history and resets context'. Without it, everything from the first attempt — the files Claude read and the code it wrote — is still in the conversation the second attempt runs in, so Claude reuses its earlier answer; running /clear first gives a fair comparison (b). The stash removed the code from disk (a): a clean working tree holds nothing of the first implementation, and the only copy left is in the conversation. CLAUDE.md (c) is written through /init and the # command, and the developer used neither; any change to the repository's CLAUDE.md would also have gone into the stash that left the working tree clean. Tests describe what a feature must do, not how its code is written (d), so the workflow does not by itself yield a line-for-line copy; that comes from Claude seeing the first version.",
      why_ru: "Урок 67 „Claude Code в работе“: /clear «очищает историю разговора и сбрасывает контекст». Без этой команды всё из первой попытки — прочитанные Claude файлы и написанный им код — остаётся в разговоре, в котором идёт вторая попытка, поэтому Claude повторно использует свой прежний ответ; если сначала выполнить /clear, сравнение будет честным (b). Stash убрал код с диска (a): в чистом рабочем дереве нет ничего от первой реализации, и единственная оставшаяся копия — в разговоре. CLAUDE.md (c) записывается через /init и команду #, а разработчик не использовал ни то, ни другое; любое изменение CLAUDE.md в репозитории тоже попало бы в stash, после которого рабочее дерево стало чистым. Тесты описывают, что должна делать функция, а не как написан её код (d), поэтому сам по себе рабочий процесс не даёт копии строка в строку; она получается оттого, что Claude видит первую версию."
    },
    {
      id: "ch14",
      domain: "Workflows",
      select: 2,
      stem: "A team wants to run the lesson's workflows for new features as unattended scripts, with no developer involved. Which two of these parts of the work does the lesson leave to the developer, so that the scripts would need a replacement for them? (Choose two.)",
      options: [
        { id: "a", text: "Picking which of the candidate test cases are worth writing as real tests" },
        { id: "b", text: "Coming up with candidate test cases that might validate the new feature" },
        { id: "c", text: "Confirming that the plan is solid before the work moves on to coding" },
        { id: "d", text: "Judging how to change the code after each failing test until the suite passes" }
      ],
      correct: ["a", "c"],
      why: "Of these four parts, Lesson 67, Claude Code in action, leaves two with the developer (it also has the developer identify the relevant files in Step 1, which is not offered here). In the test-driven workflow you 'select the most relevant tests and have Claude write them' (a); in the first workflow, 'once you have a solid plan, ask Claude to implement it', so whether the plan is solid is the developer's call (c). The other two are Claude's work: 'Have Claude brainstorm what tests would validate your new feature' (b), and 'Claude will iterate on the implementation until all tests pass', so reworking the code after a failing test is Claude's part too (d).",
      why_ru: "Из этих четырёх частей урок 67 „Claude Code в работе“ оставляет разработчику две (ещё разработчик в шаге 1 находит нужные файлы, но этого среди вариантов нет). В рабочем процессе через тесты сказано: «выберите самые важные тесты и попросите Claude их написать» (a); в первом рабочем процессе — «когда есть хороший план, попросите Claude его реализовать», так что решать, хорош ли план, должен разработчик (c). Остальные две — работа Claude: «пусть Claude перечислит, какие тесты проверят новую функцию» (b), и «Claude будет дорабатывать реализацию, пока все тесты не пройдут», так что переделка кода после проваленного теста — тоже часть работы Claude (d)."
    },
    {
      id: "ch15",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "A team is building an MCP server for Claude Code. Claude should be able to create new tickets in the team's tracker, and developers want a reusable 'triage this bug report' request with a fixed structure that they can start from. How should the server expose the two?",
      options: [
        { id: "a", text: "Creating tickets as a resource, and the triage request as a prompt for developers to start from" },
        { id: "b", text: "Creating tickets as a resource Claude writes to, and the triage request as a tool Claude can call" },
        { id: "c", text: "Both as tools, since everything Claude does through an MCP server is an action it takes" },
        { id: "d", text: "Creating tickets as a tool, and the triage request as a prompt that serves as its reusable template" }
      ],
      correct: ["d"],
      why: "Lesson 68, Enhancements with MCP servers: 'Each MCP server can expose different types of functionality to Claude through three main components: Tools (for taking actions), Prompts (for templates), and Resources (for accessing data).' Creating a ticket is an action, so it is a tool; a reusable request with a fixed structure is a template, so it is a prompt (d). Option a gets the template right but makes the action a resource, which is for accessing data, not for changing anything in the tracker. Option b makes the same mistake with tickets and turns the template into an action. Option c treats every capability as an action, though the lesson gives templates a component of their own.",
      why_ru: "Урок 68 „MCP-серверы в Claude Code“: «каждый MCP-сервер может давать Claude разные виды функциональности через три основных компонента: инструменты (Tools — для действий), промпты (Prompts — для шаблонов) и ресурсы (Resources — для доступа к данным)». Создание тикета — действие, значит, это инструмент; повторно используемый запрос с фиксированной структурой — шаблон, значит, это промпт (d). Вариант a верно определяет шаблон, но делает действие ресурсом, тогда как ресурс нужен для доступа к данным, а не для того, чтобы что-то менять в трекере. Вариант b повторяет ту же ошибку с тикетами и превращает шаблон в действие. Вариант c считает действием любую возможность, хотя урок выделяет для шаблонов отдельный компонент."
    },
    {
      id: "ch16",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "After setting up the documents server, a developer asks Claude Code to convert report.docx to markdown. Claude calls the server's document_path_to_markdown tool and gets back an error: 'unsupported file type'. Converting PDF files through the same tool works. Which component should she check first?",
      options: [
        { id: "a", text: "Claude Code's MCP client, which may pass Word files to the server in a form the tool cannot read" },
        { id: "b", text: "Claude's tool arguments, which may give a path to a file that does not exist on her machine" },
        { id: "c", text: "The tool's own code, which may not accept .docx at the step that works out each file's type" },
        { id: "d", text: "The server's registration, which may limit the tool to the file types it was registered for" }
      ],
      correct: ["c"],
      why: "The plan for this tool in Lesson 67, Claude Code in action, lists what the tool itself does: it 'takes a file path parameter', 'validates the file exists', 'determines file type from extension', 'reads binary data from file' and leverages the existing conversion function. An 'unsupported file type' answer comes from the type step inside the tool's own code, and PDFs going through the same tool show that the rest of the chain works (c). The client (a) does not handle the document: Claude passes a path, and the tool reads the binary data from the file itself. A wrong path (b) would not produce this message: 'unsupported file type' does not describe a missing file, and the plan checks that 'the file exists' as a step of its own. Registration (d) is not the cause either: the tool was reached and returned the error itself, and the plan puts the step that 'determines file type from extension' inside the tool, while Lesson 68, Enhancements with MCP servers, describes registration only as 'You use the command line to register your server'.",
      why_ru: "План этого инструмента в уроке 67 „Claude Code в работе“ перечисляет, что делает сам инструмент: он «принимает параметр с путём к файлу», «проверяет, что файл существует», «определяет тип файла по расширению», «читает двоичные данные из файла» и использует существующую функцию конвертации. Ответ «unsupported file type» исходит от шага определения типа в собственном коде инструмента, а то, что PDF проходят через тот же инструмент, показывает, что остальная цепочка работает (c). Клиент (a) документ не обрабатывает: Claude передаёт путь, а двоичные данные из файла инструмент читает сам. Неверный путь (b) не дал бы такого сообщения: «unsupported file type» не описывает отсутствующий файл, а проверка того, что «файл существует», в плане — отдельный шаг. Регистрация (d) тоже не причина: вызов дошёл до инструмента, и ошибку тот вернул сам, а шаг, который «определяет тип файла по расширению», план помещает внутрь инструмента, тогда как урок 68 „MCP-серверы в Claude Code“ описывает регистрацию только словами «сервер регистрируется из командной строки»."
    },
    {
      id: "ch17",
      domain: "MCP in Claude Code",
      select: 1,
      stem: "A developer starts a Claude Code session in the morning. At noon she adds the documents server to Claude Code in a second terminal, then asks the morning session to convert a .docx fixture to markdown. Claude replies that it has no tool for Word files. What explains this?",
      options: [
        { id: "a", text: "The registration takes effect only after /clear, which reloads the tools the session can use" },
        { id: "b", text: "The session's context has grown since the morning, so the new tool's definitions were left out" },
        { id: "c", text: "The request did not name document_path_to_markdown, and Claude uses MCP tools only when told to" },
        { id: "d", text: "The session loaded its servers when it started up, which was before the registration took place" }
      ],
      correct: ["d"],
      why: "Lesson 68, Enhancements with MCP servers: 'Once registered, Claude Code will automatically connect to your server when it starts up.' The morning session started before the server was added, so it never connected to the documents server; starting Claude Code again brings the tool in (d). /clear (a) 'clears conversation history and resets context', as Lesson 67, Claude Code in action, puts it; it is about the conversation, while Lesson 68 ties connecting to servers to start-up. A grown context (b) is not the reason: the session never connected to the new server, so there were no tool definitions to leave out, and the lessons tie a server's tools to connecting at start-up, not to how long a conversation is. Naming the tool (c) is not needed: when you ask Claude to 'Convert the tests/fixtures/mcp_docs.docx file to markdown', 'it will automatically use your custom tool'.",
      why_ru: "Урок 68 „MCP-серверы в Claude Code“: «после регистрации Claude Code будет автоматически подключаться к серверу при запуске». Утренняя сессия запустилась до того, как сервер добавили, поэтому к серверу documents она так и не подключилась; повторный запуск Claude Code добавит инструмент (d). /clear (a) «очищает историю разговора и сбрасывает контекст», как сказано в уроке 67 „Claude Code в работе“; эта команда касается разговора, а урок 68 связывает подключение к серверам с запуском. Разросшийся контекст (b) — не причина: сессия так и не подключилась к новому серверу, поэтому и определений инструментов, которые можно было бы пропустить, не было, а уроки связывают инструменты сервера с подключением при запуске, а не с длиной разговора. Называть инструмент (c) не нужно: если попросить Claude «Convert the tests/fixtures/mcp_docs.docx file to markdown», «он сам воспользуется вашим инструментом»."
    }
  ]
};
