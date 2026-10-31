window.QUIZ_BANK = {
  id: "api-mcp-hard-v2",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "mh01",
      domain: "MCP basics",
      select: 1,
      stem: "A team's chatbot will connect its MCP client to servers from five vendors, each wrapping a different service. Why can the team write the client's logic for listing and calling tools once, rather than once per vendor?",
      options: [
        { id: "a", text: "Each vendor ships a client for its own server, so the app only has to call whichever client matches" },
        { id: "b", text: "Every server answers the same MCP message types, so the requests to list and run tools match for each" },
        { id: "c", text: "Claude adapts to each vendor's tool format at run time, so the client can pass every tool on unchanged" },
        { id: "d", text: "The vendors agree on shared tool names and schemas, so one tool list fits all five of their servers" }
      ],
      correct: ["b"],
      why: "Lesson 55, MCP clients: 'Once connected, the client and server exchange specific message types defined in the MCP specification' — the client asks 'what tools do you provide?' with a ListToolsRequest and has one run with a CallToolRequest — and 'the client handles all the message passing and protocol details for you'. Every MCP server answers those same messages, which is why Lesson 54, Introducing MCP, calls servers 'reusable components that any application can connect to' (b). No vendor-specific client is needed (a): the team's one client is 'the communication bridge between your server and MCP servers' (Lesson 55). Claude does not translate formats (c): the app gets the tools from the client and sends them to Claude 'along with the user's question' (Lesson 59, Implementing a client), and Claude 'examines the tools' it is given (Lesson 55, MCP clients). The tools themselves differ from server to server (d): 'Each MCP server acts as an interface to some outside service' (Lesson 54) and lists its own tools; what the five servers share is the message types, not the tool names or schemas.",
      why_ru: "Урок 55 „MCP-клиенты“: «после подключения клиент и сервер обмениваются сообщениями определённых типов, заданных в спецификации MCP» — клиент спрашивает «какие у тебя инструменты?» запросом ListToolsRequest и просит выполнить один из них запросом CallToolRequest, — и «клиент берёт на себя передачу сообщений и все детали протокола». Каждый MCP-сервер отвечает на эти же сообщения, поэтому урок 54 „Введение в MCP“ называет серверы «переиспользуемыми компонентами, к которым может подключиться любое приложение» (b). Отдельный клиент для каждого поставщика не нужен (a): единственный клиент команды — «мост между вашим сервером и MCP-серверами» (урок 55). Claude не переводит форматы (c): приложение получает инструменты от клиента и отправляет их Claude «вместе с вопросом пользователя» (урок 59 „Реализация клиента“), а Claude «изучает инструменты», которые ему переданы (урок 55 „MCP-клиенты“). Сами инструменты у разных серверов разные (d): «каждый MCP-сервер — интерфейс к какому-то внешнему сервису» (урок 54), и у каждого свой список инструментов; общее у пяти серверов — типы сообщений, а не имена или схемы инструментов."
    },
    {
      id: "mh02",
      domain: "MCP basics",
      select: 1,
      stem: "A company's ticketing system has a REST API. Engineers want Claude to work with tickets from three chat tools that already support MCP; the company will not build an assistant of its own. Following the course's advice for real projects, what should the team build?",
      options: [
        { id: "a", text: "An MCP client that wraps the ticketing API, which each of those tools then loads to reach the tickets" },
        { id: "b", text: "An MCP server and an MCP client shipped as a pair, so that each of those tools gets both halves" },
        { id: "c", text: "An MCP server wrapping the ticketing API, which each of those tools reaches through its own client" },
        { id: "d", text: "A plugin for each of those tools that calls the ticketing API whenever Claude asks for a ticket" }
      ],
      correct: ["c"],
      why: "Lesson 56, Project setup: 'In real-world projects, you typically implement either an MCP client or an MCP server, not both' — 'An MCP server to expose your service to other developers' or 'An MCP client to connect to existing MCP servers' — and the course builds both 'purely for educational purposes'. Tools that already support MCP play the client's part — connecting 'to existing MCP servers' (Lesson 56); what is missing is a server around the ticketing API, which packages the integration into one of the 'reusable components that any application can connect to' (Lesson 54, Introducing MCP) (c). Option a gives the wrapper role to the wrong side: the client is 'the communication bridge between your server and MCP servers' (Lesson 55, MCP clients), while 'Each MCP server acts as an interface to some outside service' (Lesson 54). Option b copies the course's teaching setup, which Lesson 56 says real projects do not follow. Option d rebuilds the integration once per tool — the integration code that, by Lesson 54, MCP spares you from writing yourself.",
      why_ru: "Урок 56 „Подготовка проекта“: «в реальных проектах обычно реализуют либо MCP-клиент, либо MCP-сервер, а не оба» — «MCP-сервер — чтобы открыть ваш сервис другим разработчикам» или «MCP-клиент — чтобы подключаться к существующим MCP-серверам», — а курс строит оба «исключительно в учебных целях». Чат-инструменты, которые уже поддерживают MCP, играют роль клиента — подключаются «к существующим MCP-серверам» (урок 56); не хватает сервера вокруг API тикет-системы, который упакует интеграцию в один из «переиспользуемых компонентов, к которым может подключиться любое приложение» (урок 54 „Введение в MCP“) (c). Вариант a отдаёт роль обёртки не той стороне: клиент — «мост между вашим сервером и MCP-серверами» (урок 55 „MCP-клиенты“), а «каждый MCP-сервер — интерфейс к какому-то внешнему сервису» (урок 54). Вариант b повторяет учебную схему курса, которой, как говорит урок 56, реальные проекты не следуют. Вариант d заново строит интеграцию для каждого чат-инструмента — тот самый интеграционный код, от написания которого, согласно уроку 54, MCP вас избавляет."
    },
    {
      id: "mh03",
      domain: "MCP basics",
      select: 2,
      stem: "An assistant switched to a provider's MCP server that lists 120 tools, of which it uses about 10. Input tokens per request have roughly tripled, though conversations are as long as before. Which two statements about the growth and its fix are accurate? (Choose two.)",
      options: [
        { id: "a", text: "The client can name the tools it needs in its list request, so the server returns just those definitions" },
        { id: "b", text: "Each listed tool reaches Claude as a definition in every request, so the full list adds to every call" },
        { id: "c", text: "MCP also adds the server's resources and prompts to each request, so the growth comes from more than tools" },
        { id: "d", text: "The app's own code assembles each request to Claude, so it can pass on just the tools the assistant needs" }
      ],
      correct: ["b", "d"],
      why: "Lesson 55, MCP clients: before the first request the app asks the client for tools, the client sends a ListToolsRequest and gets back 'a list of available tools', and only then does the app have 'everything needed to make the initial request to Claude - both the user's question and the available tools'; Lesson 59, Implementing a client: 'These tools are sent to Claude along with the user's question'. Every listed tool therefore travels in every request as a definition, which is where the extra input comes from (b). The same lessons show that the app's own code builds that request — 'Our code uses the client to get available tools' — so it can send Claude only the tools the assistant uses (d). The list request does not name tools (a): the client asks 'what tools do you provide?', and the course's method 'gets all available tools from the server' (Lesson 59). Resources and prompts are not added by themselves (c): the app fetches a resource when a user mentions a document (Lesson 61, Accessing resources), and a prompt is fetched when a user selects it (Lesson 63, Prompts in the client).",
      why_ru: "Урок 55 „MCP-клиенты“: перед первым запросом приложение просит у клиента инструменты, клиент отправляет ListToolsRequest и получает в ответ «список доступных инструментов», и только тогда у приложения есть «всё для первого запроса к Claude — и вопрос пользователя, и доступные инструменты»; урок 59 „Реализация клиента“: «эти инструменты отправляются Claude вместе с вопросом пользователя». Значит, каждый инструмент из списка уходит в каждом запросе в виде описания — отсюда и прирост входных токенов (b). Те же уроки показывают, что этот запрос собирает собственный код приложения — «наш код получает доступные инструменты через клиент», — поэтому он может отправлять Claude только те инструменты, которыми пользуется ассистент (d). Запрос списка не называет инструменты (a): клиент спрашивает «какие у тебя инструменты?», а метод из курса «получает все доступные инструменты с сервера» (урок 59). Ресурсы и промпты сами по себе не добавляются (c): приложение получает ресурс, когда пользователь упоминает документ (урок 61 „Чтение ресурсов“), а промпт запрашивается, когда пользователь его выбирает (урок 63 „Промпты в клиенте“)."
    },
    {
      id: "mh04",
      domain: "Clients & transport",
      select: 1,
      stem: "A CLI assistant answers 'which tickets are assigned to me?' with a raw JSON dump. Tracing shows the app has the client run the tool Claude requested, then prints the CallToolResult. The team wants a sentence like 'You have three tickets'. What should the app do instead?",
      options: [
        { id: "a", text: "Return it to Claude as the tool result in a follow-up message, so the user is shown Claude's reply" },
        { id: "b", text: "Ask the MCP server to render the result for the user, since the tool's author knows what it looks like" },
        { id: "c", text: "Parse it inside the client by its MIME type, the way resource contents are handled before they are used" },
        { id: "d", text: "Add wording to the tool description so that the server returns a sentence instead of the raw JSON" }
      ],
      correct: ["a"],
      why: "Lesson 55, MCP clients: once the CallToolResult reaches the app, 'Your server sends the tool results back to Claude in a follow-up message. Claude now has all the information it needs to formulate a complete response', and 'Claude responds with the formatted answer, which your server passes back to the user' (a). The server's part ends at returning the data as a CallToolResult; nothing in the flow asks it to render an answer for the user (b). Parsing by MIME type is what the client does with resource contents (Lesson 61, Accessing resources), and parsed JSON is still data, not a sentence (c). The tool's schema and descriptions are what Claude gets in order to call the tool — 'The @mcp.tool decorator automatically generates the JSON schema that Claude needs' (Lesson 57, Defining tools with MCP); what the server returns is decided by the tool's function, not by its description (d).",
      why_ru: "Урок 55 „MCP-клиенты“: когда CallToolResult доходит до приложения, «ваш сервер отправляет результаты инструмента обратно Claude в следующем сообщении. Теперь у Claude есть всё, чтобы составить полный ответ», и «Claude отвечает оформленным ответом, и ваш сервер передаёт его пользователю» (a). Роль MCP-сервера заканчивается тем, что он возвращает данные в виде CallToolResult; ничто в этом потоке не просит его оформлять ответ для пользователя (b). Разбор по MIME-типу — это то, что клиент делает с содержимым ресурсов (урок 61 „Чтение ресурсов“), а разобранный JSON — всё ещё данные, а не предложение (c). Схема и описания инструмента — то, что получает Claude, чтобы вызвать инструмент: «декоратор @mcp.tool автоматически генерирует JSON-схему, нужную Claude» (урок 57 „Инструменты в MCP“); что возвращает сервер, определяет функция инструмента, а не его описание (d)."
    },
    {
      id: "mh05",
      domain: "Clients & transport",
      select: 1,
      stem: "A document chat app's requests to Claude list only the read tool, so Claude says it cannot edit documents. The server's ListToolsResult, logged as it arrives at the client, also has only the read tool, though the server's code has an edit function. Where is the fault?",
      options: [
        { id: "a", text: "In the app's request to Claude, which should add the edit tool to the tools that the client returned" },
        { id: "b", text: "In the client's list method, which should return every function on the server, not just the listed tools" },
        { id: "c", text: "In the server, where the edit function is not defined as a tool, so the list that it returns leaves it out" },
        { id: "d", text: "In Claude's tool choice, since Claude sets aside a tool whose description does not fit the request" }
      ],
      correct: ["c"],
      why: "Lesson 59, Implementing a client: the client's list method 'gets all available tools from the server' and returns 'the tools from the result', and 'These tools are sent to Claude along with the user's question'; Lesson 55, MCP clients: the ListToolsResult is the server's answer to 'what tools do you provide?'. The result logged at the client already lacks the edit tool, so the gap is in the server: Lesson 57, Defining tools with MCP, makes a function a tool through the tool decorator, which 'automatically generates the JSON schema that Claude needs', and a function that is not defined that way is not listed (c). The app can only send Claude the tools the client returned (a), and the client returns what the server listed, not every function in the server's code (b). Claude did not set the tool aside (d): the requests never contained it, and Claude chooses only among the tools it is sent — 'Claude examines the tools and decides it needs to call one' (Lesson 55).",
      why_ru: "Урок 59 „Реализация клиента“: метод списка в клиенте «получает все доступные инструменты с сервера» и возвращает «инструменты из результата», а «эти инструменты отправляются Claude вместе с вопросом пользователя»; урок 55 „MCP-клиенты“: ListToolsResult — ответ сервера на вопрос «какие у тебя инструменты?». В результате, записанном в лог на стороне клиента, инструмента правки уже нет, значит, пробел — на сервере: в уроке 57 „Инструменты в MCP“ функция становится инструментом через декоратор инструмента, который «автоматически генерирует JSON-схему, нужную Claude», а функция, не описанная таким образом, в список не попадает (c). Приложение может отправить Claude только те инструменты, которые вернул клиент (a), а клиент возвращает то, что перечислил сервер, а не все функции в коде сервера (b). Claude не отбрасывал инструмент (d): его не было ни в одном запросе, а Claude выбирает только среди переданных ему инструментов — «Claude изучает инструменты и решает, что нужно вызвать один из них» (урок 55)."
    },
    {
      id: "mh06",
      domain: "Clients & transport",
      select: 1,
      stem: "Tracing a 'list my open pull requests' request, a developer logs every request the app's MCP client sends, expecting to see the call to GitHub's API. The log shows a ListToolsRequest and a CallToolRequest with Claude's arguments, but no GitHub call. What explains the missing GitHub call?",
      options: [
        { id: "a", text: "The call left through the session's transport, not the client class, so the app's logging sits one layer too high" },
        { id: "b", text: "The server reaches GitHub itself once it is handed the tool call, so that traffic appears only in the server's own records" },
        { id: "c", text: "Claude performed the GitHub lookup while producing the tool-use block, so no request to GitHub passes through the app" },
        { id: "d", text: "The server returns the GitHub request inside its CallToolResult, and the app sends it later, outside the client's logging" }
      ],
      correct: ["b"],
      why: "Lesson 55, MCP clients: 'The MCP client sends a CallToolRequest to the MCP server, which then makes the actual request to GitHub', and 'GitHub returns the repository data, which flows back through the MCP server as a CallToolResult, then to the MCP client'. The client's log is complete: the request to GitHub happens only inside the server (b). The session is 'The actual connection to the server' (Lesson 59, Implementing a client), so it carries the MCP messages the log already shows, not a call to GitHub (a). Claude only 'responds with a tool use request' (Lesson 55); it does not reach GitHub itself (c). The CallToolResult carries the data the server has already fetched, not a request for the app to send (d).",
      why_ru: "Урок 55 „MCP-клиенты“: «MCP-клиент отправляет CallToolRequest MCP-серверу, а тот делает настоящий запрос к GitHub», и «GitHub возвращает данные о репозиториях, которые идут обратно через MCP-сервер в виде CallToolResult, затем к MCP-клиенту». Лог клиента полон: запрос к GitHub происходит только внутри сервера (b). Сессия — это «само соединение с сервером» (урок 59 „Реализация клиента“), поэтому по ней идут MCP-сообщения, которые уже есть в логе, а не вызов GitHub (a). Claude лишь «отвечает запросом на вызов инструмента» (урок 55); сам он к GitHub не обращается (c). CallToolResult несёт данные, которые сервер уже получил, а не запрос, который приложению нужно отправить (d)."
    },
    {
      id: "mh07",
      domain: "Server",
      select: 1,
      stem: "A document server's read and edit tools work in the MCP Inspector. Asked in the chat app to change X to Y in plan.md, Claude only describes the edit; every request carries both tools with the schemas the inspector lists. What does the inspector result tell the team?",
      options: [
        { id: "a", text: "The server works; the inspector validated the definitions Claude gets, so the edit tool's description can be ruled out" },
        { id: "b", text: "The server works; the inspector showed the server's own schemas, so the client's rebuilt schemas should be compared with them" },
        { id: "c", text: "The server works; the inspector ran the tools without a model, so Claude's tool choice has to be tested in the app" },
        { id: "d", text: "The server works; the edit tool returns only a success message, so it must return the new text before Claude will call it" }
      ],
      correct: ["c"],
      why: "Lesson 58, The server inspector: the inspector lets you 'test your functionality without connecting to a full application' and 'eliminates the need to wire up your server to Claude or another application just to test basic functionality'. Both tools ran there with no model involved, so the result shows that the server executes them correctly and says nothing about whether Claude chooses the edit tool; only a test in the app, with Claude, can show that (c). For the same reason it cannot clear the edit tool's description (a): no model read it in the inspector, and descriptions are written for Claude — the parameter descriptions 'help Claude understand what each argument expects' (Lesson 57, Defining tools with MCP). Comparing schemas (b) is already done by the stem: every request carries both tools with the same schemas the inspector lists, so nothing was lost or changed on the way, and the open question is why Claude does not choose the edit tool. The edit tool's result does not drive the choice (d): Claude decides to call a tool before it sees any result — 'Claude examines the tools and decides it needs to call one' (Lesson 55, MCP clients) — and Lesson 58 itself checks an edit by running the read tool again.",
      why_ru: "Урок 58 „MCP Inspector“: инспектор позволяет «проверять работу без подключения к полному приложению», и с ним «не нужно подключать сервер к Claude или другому приложению ради проверки базовой функциональности». Оба инструмента запускались там без участия модели, поэтому результат показывает, что сервер выполняет их правильно, и ничего не говорит о том, выбирает ли Claude инструмент правки; показать это может только проверка в приложении, вместе с Claude (c). По той же причине результат инспектора не может снять подозрения с описания инструмента правки (a): в инспекторе его не читала никакая модель, а описания пишутся для Claude — описания параметров «помогают Claude понять, что ожидает каждый аргумент» (урок 57 „Инструменты в MCP“). Сравнение схем (b) уже сделано в условии: каждый запрос несёт оба инструмента с теми же схемами, что показывает инспектор, значит, по пути ничего не потерялось и не изменилось, и открытым остаётся вопрос, почему Claude не выбирает инструмент правки. Результат инструмента правки на выбор не влияет (d): Claude решает вызвать инструмент раньше, чем видит какой-либо результат, — «Claude изучает инструменты и решает, что нужно вызвать один из них» (урок 55 „MCP-клиенты“), — а урок 58 и сам проверяет правку, снова запуская инструмент чтения."
    },
    {
      id: "mh08",
      domain: "Server",
      select: 1,
      stem: "Every stored document ID is the name plus '.pdf', but users give just the name, so Claude's first read call fails with not-found and a retry with '.pdf' succeeds. The team wants the first read call to succeed without any extra tool call. What should the server's author change?",
      options: [
        { id: "a", text: "Add the stored IDs to the read tool's not-found error, so that Claude's retry picks the right ID at once" },
        { id: "b", text: "Expose each document as a templated resource keyed by its full ID, extension included, so Claude reads it by URI" },
        { id: "c", text: "Offer a 'find document' prompt that users run first, so that the exact .pdf ID is already in the chat" },
        { id: "d", text: "Describe the ID parameter as the name plus '.pdf' and give an example, since Claude reads that text" }
      ],
      correct: ["d"],
      why: "Lesson 57, Defining tools with MCP: 'The Field class from Pydantic provides parameter descriptions that help Claude understand what each argument expects.' Claude's mistake is the format of the argument, so a parameter description saying that every ID is the document name plus '.pdf', with an example, lets the first call succeed (d). Listing the IDs in the error (a) helps the retry, but the retry is still a second tool call: the error goes back to Claude as a tool result 'in a follow-up message' (Lesson 55, MCP clients), and only then does Claude try again. A templated resource (b) is read by the app, which 'uses the MCP client to fetch that resource' and puts it into the prompt (Lesson 61, Accessing resources); Claude's own read call goes through the tool and stays as it was. A prompt (c) runs only when a user selects it (Lesson 63, Prompts in the client), so users who just ask a question still hit the failing first call.",
      why_ru: "Урок 57 „Инструменты в MCP“: «класс Field из Pydantic задаёт описания параметров, которые помогают Claude понять, что ожидает каждый аргумент». Ошибка Claude — в формате аргумента, поэтому описание параметра, где сказано, что каждый ID — это имя документа плюс «.pdf», и приведён пример, позволяет первому вызову пройти успешно (d). Список ID в сообщении об ошибке (a) помогает повторной попытке, но повтор — это всё равно второй вызов инструмента: ошибка возвращается к Claude как результат инструмента «в следующем сообщении» (урок 55 „MCP-клиенты“), и только тогда Claude пробует снова. Шаблонный ресурс (b) читает приложение, которое «через MCP-клиент получает этот ресурс» и подставляет его в промпт (урок 61 „Чтение ресурсов“); собственный вызов чтения у Claude идёт через инструмент и остаётся прежним. Промпт (c) запускается, только когда пользователь его выбирает (урок 63 „Промпты в клиенте“), поэтому пользователи, которые просто задают вопрос, всё так же упираются в неудачный первый вызов."
    },
    {
      id: "mh09",
      domain: "Server",
      select: 2,
      stem: "Claude asks a document server's find-and-replace edit tool to change 'Status: Draft' to 'Status: Final' in plan.md, which reads 'Status - Draft'. The tool returns its usual success message, yet a later read through the same server still shows 'Status - Draft'. Which two statements explain this? (Choose two.)",
      options: [
        { id: "a", text: "Claude's find text differs from the line in plan.md, so the replace step had nothing to change" },
        { id: "b", text: "The later read returned a copy cached before the edit, not the document as the server holds it now" },
        { id: "c", text: "The client replaced the tool's error with a success message, so the failure did not reach Claude" },
        { id: "d", text: "The tool's error handling covers only a document that does not exist, so it reported success here" }
      ],
      correct: ["a", "d"],
      why: "Lesson 57, Defining tools with MCP: the edit tool 'performs simple find-and-replace operations on documents', taking 'the text to find, and the replacement text'. 'Status: Draft' does not occur in a document that reads 'Status - Draft', so the replace had nothing to change (a). The same lesson says 'Both tools include basic error handling to manage cases where Claude requests a document that doesn't exist'; plan.md exists, so no error case applies, and the tool returns its usual success message although nothing changed (d). A cached copy (b) would not explain anything: the read tool lets Claude 'read any document by its ID' from the server (Lesson 57), and since the find text occurs nowhere in plan.md, the edit could not have changed it in any copy. The client does not rewrite results (c): the result 'flows back through the MCP server as a CallToolResult, then to the MCP client, and finally to your server' (Lesson 55, MCP clients), and here the tool raised no error that could have been replaced.",
      why_ru: "Урок 57 „Инструменты в MCP“: инструмент правки «делает простой поиск и замену в документах» и принимает «искомый текст и текст замены». «Status: Draft» не встречается в документе, где написано «Status - Draft», поэтому замене нечего было менять (a). В том же уроке сказано: «в обоих инструментах есть базовая обработка ошибок на случай, если Claude запросит несуществующий документ»; plan.md существует, так что ни один случай ошибки не подходит, и инструмент возвращает обычное сообщение об успехе, хотя ничего не изменилось (d). Кешированная копия (b) ничего бы не объяснила: инструмент чтения позволяет Claude «прочитать любой документ по ID» с сервера (урок 57), а раз искомого текста в plan.md нет нигде, правка не могла изменить его ни в одной копии. Клиент не переписывает результаты (c): результат «идёт обратно через MCP-сервер в виде CallToolResult, затем к MCP-клиенту и, наконец, к вашему серверу» (урок 55 „MCP-клиенты“), а здесь инструмент не выбросил ошибки, которую можно было бы подменить."
    },
    {
      id: "mh10",
      domain: "Resources",
      select: 1,
      stem: "A CRM desktop app shows, in a side panel, the open orders of the customer whose record is open. It shows one customer at a time, and new customers are added all day. How should the CRM's MCP server expose the open orders?",
      options: [
        { id: "a", text: "As a direct resource for each customer, with that customer's ID fixed in the resource's URI" },
        { id: "b", text: "As a prompt that takes the customer ID and returns the open orders as messages" },
        { id: "c", text: "As a templated resource with a parameter in its URI that carries the customer's ID" },
        { id: "d", text: "As a direct resource for open orders, with the customer ID passed alongside the URI in the read" }
      ],
      correct: ["c"],
      why: "Lesson 60, Defining resources: 'Direct Resources: Static URIs that don't change' and 'Templated Resources: URIs with parameters, like docs://documents/{doc_id}' — 'Use direct resources for static data, templated resources for parameterized queries' — and 'the Python SDK automatically parses parameters from the URI and passes them as keyword arguments to your function', so one templated resource serves every customer, including those added today (c). Direct resources have fixed URIs, so one per customer cannot keep up with customers added during the day (a). Parameters reach a resource through its URI — the SDK 'parses parameters from the URI and passes them as keyword arguments' — and the lesson keeps direct resources for 'static data' and templated ones for 'parameterized queries', so per-customer orders need a template rather than a direct resource with an ID beside it (d). A prompt returns 'a list of messages that can be sent straight to Claude' (Lesson 62, Defining prompts), while data that the app shows in its own UI is what resources 'expose ... to clients' for, like the document list behind autocomplete (Lesson 60) (b).",
      why_ru: "Урок 60 „Ресурсы“: «прямые ресурсы — статические URI, которые не меняются» и «шаблонные ресурсы — URI с параметрами, например docs://documents/{doc_id}», — «прямые ресурсы — для статичных данных, шаблонные — для запросов с параметрами», — и «Python SDK автоматически разбирает параметры из URI и передаёт их в функцию как именованные аргументы», поэтому один шаблонный ресурс обслуживает всех покупателей, включая добавленных сегодня (c). У прямых ресурсов URI фиксированы, поэтому отдельный ресурс на каждого покупателя не поспевает за покупателями, которых добавляют в течение дня (a). Параметры попадают в ресурс через его URI — SDK «разбирает параметры из URI и передаёт их как именованные аргументы», — и урок оставляет прямые ресурсы для «статичных данных», а шаблонные — для «запросов с параметрами», поэтому заказам отдельного покупателя нужен шаблон, а не прямой ресурс с ID, переданным рядом с URI (d). Промпт возвращает «список сообщений, которые можно сразу отправить Claude» (урок 62 „Промпты в MCP“), а данные, которые приложение показывает в собственном интерфейсе, — это как раз то, ради чего ресурсы «отдают данные клиентам», как список документов для автодополнения (урок 60) (b)."
    },
    {
      id: "mh11",
      domain: "Resources",
      select: 1,
      stem: "When a user mentions @plan.md, Claude answers as if it had never seen the document. Logs show the app's request to Claude going out first, and then a resource read for plan.md that the server answers with its full text. Which component should be fixed?",
      options: [
        { id: "a", text: "The server's resource, which has to answer reads faster so that the text can still join the request" },
        { id: "b", text: "The app's mention handling, which must fetch the file before it builds the prompt and sends it to Claude" },
        { id: "c", text: "Claude's handling of the mention, which has to wait for the document's text before writing a reply" },
        { id: "d", text: "The MCP client, which has to pass the document's text on to Claude once the server has returned it" }
      ],
      correct: ["b"],
      why: "Lesson 61, Accessing resources: when a user references a document, 'your application uses the MCP client to fetch that resource from the server and include its contents directly in the prompt sent to Claude', and the CLI test runs 'Fetch the resource content automatically' before 'Include that content in the prompt to Claude'. The log shows the read after the request, so the text was fetched too late to be included: the app's mention handling has to fetch the file before it builds the prompt and sends it to Claude (b). The server did answer with the full text, and speed is not the issue (a): nothing fetched after the request has gone out can become part of it. Claude works with the prompt it receives — 'Claude receives the document content directly in the prompt' (Lesson 61) — and has no way to wait for data the app fetches afterwards (c). The client is 'the communication bridge between your server and MCP servers' (Lesson 55, MCP clients): it hands the text back to the app, not to Claude (d).",
      why_ru: "Урок 61 „Чтение ресурсов“: когда пользователь ссылается на документ, «приложение через MCP-клиент получает этот ресурс с сервера и включает его содержимое прямо в промпт, который уходит Claude», а в проверке в CLI шаг «автоматически получить содержимое ресурса» идёт раньше шага «включить это содержимое в промпт для Claude». Лог показывает чтение после запроса, значит, текст получили слишком поздно, чтобы его включить: обработка упоминаний в приложении должна получать файл до того, как соберёт промпт и отправит его Claude (b). Сервер действительно ответил полным текстом, и дело не в скорости (a): ничто, полученное после того, как запрос ушёл, не может стать его частью. Claude работает с тем промптом, который получает, — «Claude получает содержимое документа прямо в промпте» (урок 61), — и не может дождаться данных, которые приложение получит позже (c). Клиент — «мост между вашим сервером и MCP-серверами» (урок 55 „MCP-клиенты“): он передаёт текст обратно приложению, а не Claude (d)."
    },
    {
      id: "mh12",
      domain: "Resources",
      select: 1,
      stem: "A developer moved the code that wraps an @-mentioned document's text for the prompt ('The user referenced report.pdf: …') into the MCP client's resource-reading function. The app's document preview panel now shows that wrapper text too. Where does the wrapping code belong?",
      options: [
        { id: "a", text: "In the server, as a second templated resource that returns each document already wrapped for a prompt" },
        { id: "b", text: "In the MCP client, as a second read function for prompt use, beside the plain one the panel calls" },
        { id: "c", text: "In the app's own prompt-building step, with the read function left returning the document as it is" },
        { id: "d", text: "In the server's templated resource, through a URI parameter that asks for the wrapped form" }
      ],
      correct: ["c"],
      why: "Lesson 61, Accessing resources: 'The read_resource function becomes a building block that other components can call to fetch document contents, list available resources, or integrate resource data into prompts. This separation of concerns keeps your code clean: the MCP client handles communication with the server, while your application logic focuses on how to use that data effectively.' How a mentioned document is phrased for Claude is a decision about using the data, so it belongs in the app's own prompt-building step, and the client's read function goes back to returning the document as it is (c). A second client function (b) is tidier than one shared function, but it still puts the app's prompt logic into the layer that should only handle communication. The two server options write prompt wording into the data the server exposes — as a second resource (a) or behind a URI parameter (d) — while resources 'expose data to clients' (Lesson 60, Defining resources), and how a client uses that data in its prompts is the client app's own concern.",
      why_ru: "Урок 61 „Чтение ресурсов“: «функция read_resource становится строительным блоком, который другие компоненты вызывают, чтобы получить содержимое документов, список доступных ресурсов или встроить данные ресурса в промпт. Такое разделение ответственности держит код чистым: MCP-клиент отвечает за общение с сервером, а логика приложения — за то, как эффективно использовать эти данные». То, как упомянутый документ подаётся Claude, — решение об использовании данных, поэтому ему место в собственном шаге сборки промпта в приложении, а функция чтения в клиенте снова возвращает документ как есть (c). Вторая функция в клиенте (b) аккуратнее одной общей, но всё равно переносит логику промптов приложения в слой, который должен отвечать только за общение. Оба серверных варианта вписывают формулировки промпта в данные, которые отдаёт сервер, — вторым ресурсом (a) или через параметр URI (d), — тогда как ресурсы «отдают данные клиентам» (урок 60 „Ресурсы“), а то, как клиент использует эти данные в своих промптах, — забота самого клиентского приложения."
    },
    {
      id: "mh13",
      domain: "Prompts",
      select: 1,
      stem: "A document server's 'summarize' prompt takes a document ID and writes it into its message, like the course's 'format' prompt. One client sends Claude the prompt's messages without any of the server's tools; there the summaries come back vague and generic. What should the server's author change?",
      options: [
        { id: "a", text: "Have the prompt function put the document's ID and title in the first message, so Claude knows which one to summarize" },
        { id: "b", text: "Have the prompt function add an assistant message that opens the summary, so Claude continues it from the document" },
        { id: "c", text: "Have the prompt function spell out the summary's structure, so that Claude's output is no longer generic" },
        { id: "d", text: "Have the prompt function read the document from the store and put its text into the messages it returns" }
      ],
      correct: ["d"],
      why: "Lesson 63, Prompts in the client: the prompt 'gets sent to Claude with the interpolated values', and then 'Claude can then use tools to fetch additional data and complete the task'; Lesson 62, Defining prompts, asks authors to 'Consider how the prompt will work with your server's tools and resources'. A prompt that carries only the ID relies on that tool step, and this client sends no tools, so Claude never sees the document. The prompt function runs on the server, next to the documents, so it can put the text itself into the messages it returns — 'a list of messages that can be sent straight to Claude' (Lesson 62) (d). An ID and a title (a) still give Claude nothing to summarize. An assistant message (b) — prompts are 'a set of user and assistant messages' — can open the reply but cannot supply text that Claude never received. Detailed instructions (c) are the lesson's advice for a good prompt ('Write detailed, specific instructions rather than vague requests'), but they do not replace the missing input.",
      why_ru: "Урок 63 „Промпты в клиенте“: промпт «с подставленными значениями уходит Claude», и затем «Claude может пользоваться инструментами, чтобы получить дополнительные данные и выполнить задачу»; урок 62 „Промпты в MCP“ просит авторов «продумать, как промпт будет работать с инструментами и ресурсами сервера». Промпт, в котором есть только ID, рассчитывает на этот шаг с инструментами, а этот клиент инструментов не отправляет, поэтому Claude так и не видит документ. Функция промпта выполняется на сервере, рядом с документами, поэтому она может вставить сам текст в сообщения, которые возвращает, — «список сообщений, которые можно сразу отправить Claude» (урок 62) (d). ID и название (a) всё равно не дают Claude ничего, что можно резюмировать. Сообщение ассистента (b) — промпты задают «набор сообщений пользователя и ассистента» — может начать ответ, но не может дать текст, которого Claude так и не получил. Подробные инструкции (c) — совет урока для хорошего промпта («пишите подробные, конкретные инструкции, а не расплывчатые просьбы»), но они не заменяют недостающие входные данные."
    },
    {
      id: "mh14",
      domain: "Prompts",
      select: 1,
      stem: "A server team has a tested 'release notes' prompt that three client apps from other teams should offer as a command. Any copy would use the same tested text, but the team revises it every few weeks and will add more such commands later. Where should the prompt live?",
      options: [
        { id: "a", text: "In each client app, as the text behind its command, which that app's team updates after each revision" },
        { id: "b", text: "In a shared library behind each app's command, which the three apps pick up when they next upgrade it" },
        { id: "c", text: "In a server resource per command, which each app's team adds to its command list by hand and reads on use" },
        { id: "d", text: "In the server, as an MCP prompt that each app lists as a command and requests when a user runs it" }
      ],
      correct: ["d"],
      why: "Lesson 62, Defining prompts: 'Prompts in MCP servers let you define pre-built, high-quality instructions that clients can use instead of writing their own prompts from scratch', and 'When a client requests a prompt, your server returns a list of messages that can be sent straight to Claude'; Lesson 63, Prompts in the client: 'When you type a forward slash, available prompts appear as commands', and the client's get-prompt call 'retrieves a specific prompt' when a user selects it. With the text the same in every copy, quality does not decide; revisions and new commands do. A server prompt is requested each time it runs, and new prompts show up in each app's command list, so every app stays current with no work from the other teams (d). Copies in each app (a) and a shared library (b) lag behind each revision until every team updates or upgrades, and each new command has to be added by hand. A resource per command (c) would deliver current text, but each app's team would still wire every new command to its resource by hand and turn the text into its own prompt, while Lesson 62 gives this job to prompts: pre-built instructions 'that clients can use instead of writing their own prompts from scratch', returned as 'a list of messages that can be sent straight to Claude'.",
      why_ru: "Урок 62 „Промпты в MCP“: «промпты в MCP-серверах позволяют задать готовые, качественные инструкции, которые клиенты используют вместо того, чтобы писать свои промпты с нуля», и «когда клиент запрашивает промпт, ваш сервер возвращает список сообщений, которые можно сразу отправить Claude»; урок 63 „Промпты в клиенте“: «когда вы вводите косую черту, доступные промпты появляются как команды», а вызов get-prompt в клиенте «получает конкретный промпт», когда пользователь его выбирает. Раз текст одинаков во всех копиях, решает не качество, а правки и новые команды. Серверный промпт запрашивается при каждом запуске, а новые промпты появляются в списке команд каждого приложения, так что все приложения остаются актуальными без какой-либо работы со стороны других разработчиков (d). Копии в каждом приложении (a) и общая библиотека (b) отстают после каждой правки, пока разработчики каждого приложения не обновят текст или библиотеку, и каждую новую команду приходится добавлять вручную. Ресурс на каждую команду (c) давал бы актуальный текст, но разработчикам каждого приложения всё равно пришлось бы вручную привязывать каждую новую команду к её ресурсу и превращать текст в собственный промпт, тогда как урок 62 отдаёт эту работу промптам: готовым инструкциям, «которые клиенты используют вместо того, чтобы писать свои промпты с нуля», возвращаемым в виде «списка сообщений, которые можно сразу отправить Claude»."
    },
    {
      id: "mh15",
      domain: "Primitives",
      select: 2,
      stem: "A user types '/', picks the server's 'format' prompt and then plan.md. The server's log then shows, in order, a get-prompt request for 'format', a tool-list request, a read-tool request and an edit-tool request. Which two of these requests did Claude ask for? (Choose two.)",
      options: [
        { id: "a", text: "The read-tool request that fetched the text of plan.md" },
        { id: "b", text: "The get-prompt request for 'format' with plan.md" },
        { id: "c", text: "The edit-tool request that saved plan.md" },
        { id: "d", text: "The tool-list request that came with plan.md's prompt" }
      ],
      correct: ["a", "c"],
      why: "Lesson 59, Implementing a client: the app's code must 'Get a list of available tools to send to Claude' and 'Execute tools when Claude requests them'; Lesson 55, MCP clients: Claude 'examines the tools and decides it needs to call one', and 'Your server asks the MCP client to execute the tool Claude requested'. So the two tool requests are the ones Claude asked for — the read of the document's text (a) and the edit that saved the result (c). The get-prompt request came from the user's choice (b): 'User selects a prompt (like \"format\")', the client gets it, and only then 'The prompt gets sent to Claude with the interpolated values' (Lesson 63, Prompts in the client), so Claude had seen nothing yet. The tool list is the app's own step before its request to Claude (d): 'Your server realizes it needs to provide Claude with a list of available tools before making the request' (Lesson 55).",
      why_ru: "Урок 59 „Реализация клиента“: код приложения должен «получить список доступных инструментов, чтобы отправить его Claude» и «выполнять инструменты, когда Claude их запрашивает»; урок 55 „MCP-клиенты“: Claude «изучает инструменты и решает, что нужно вызвать один из них», и «ваш сервер просит MCP-клиента выполнить запрошенный Claude инструмент». Значит, два запроса на выполнение инструментов — это те, которые запросил Claude: чтение текста документа (a) и правка, сохранившая результат (c). Запрос get-prompt появился из-за выбора пользователя (b): «пользователь выбирает промпт (например, „format“)», клиент его получает, и только потом «промпт с подставленными значениями уходит Claude» (урок 63 „Промпты в клиенте“), так что Claude к тому моменту ещё ничего не видел. Список инструментов — собственный шаг приложения перед запросом к Claude (d): «ваш сервер понимает, что прежде чем делать запрос, Claude нужно передать список доступных инструментов» (урок 55)."
    },
    {
      id: "mh16",
      domain: "Primitives",
      select: 2,
      stem: "Claude issues refunds when a support rep asks; the server exposes them as a resource whose read issues one. The app adds the returns policy to prompts while the returns tab is open; the server exposes it as a tool. Which two changes match the primitives to these uses? (Choose two.)",
      options: [
        { id: "a", text: "Expose refunds as a tool, since issuing one alters data instead of returning it" },
        { id: "b", text: "Expose the returns policy as a resource, since the app decides when the policy is added" },
        { id: "c", text: "Expose refunds as a prompt, since a rep asks for each refund that Claude issues" },
        { id: "d", text: "Keep the policy as a tool but let Claude call it, since the policy shapes Claude's answers" }
      ],
      correct: ["a", "b"],
      why: "Lesson 60, Defining resources: resources 'expose data to clients, similar to GET request handlers', for 'scenarios where you need to fetch information rather than perform actions' — 'Resources expose data, tools perform actions' — and tools are what the app runs 'when Claude requests them' (Lesson 59, Implementing a client). A refund that Claude issues is an action taken at Claude's request, so it belongs in a tool (a). Lesson 61, Accessing resources: resources 'expose data that can be directly included in prompts, rather than requiring tool calls', and it is the application that fetches them; a policy that the app adds while a tab is open is exactly that, so it should be a resource (b). A prompt (c) is 'a list of messages that can be sent straight to Claude' that a user selects (Lesson 62, Defining prompts; Lesson 63, Prompts in the client); it carries instructions and issues nothing. Letting Claude call the policy tool (d) would make the policy depend on Claude's choice, while here the app decides when it is needed.",
      why_ru: "Урок 60 „Ресурсы“: ресурсы «отдают данные клиентам — похоже на обработчики GET-запросов», для случаев, «где нужно получить информацию, а не выполнить действие», — «ресурсы отдают данные, инструменты выполняют действия», — а инструменты приложение выполняет, «когда Claude их запрашивает» (урок 59 „Реализация клиента“). Возврат денег, который оформляет Claude, — действие по запросу Claude, поэтому ему место в инструменте (a). Урок 61 „Чтение ресурсов“: ресурсы «отдают данные, которые можно сразу включить в промпт, — без вызовов инструментов», и получает их именно приложение; правила возврата, которые приложение добавляет, пока открыта вкладка, — ровно такой случай, поэтому это должен быть ресурс (b). Промпт (c) — «список сообщений, которые можно сразу отправить Claude», который выбирает пользователь (урок 62 „Промпты в MCP“; урок 63 „Промпты в клиенте“); он несёт инструкции и ничего не оформляет. Если дать Claude вызывать инструмент с правилами (d), правила стали бы зависеть от выбора Claude, а здесь именно приложение решает, когда они нужны."
    },
    {
      id: "mh17",
      domain: "Primitives",
      select: 1,
      stem: "A document server's tools are called well by Claude, but its tested 'brief' prompt is rarely used. Users who try it like the results; interviews show that in the '/' menu they cannot tell what 'brief' produces. What should the server's author change?",
      options: [
        { id: "a", text: "The prompt's name and description, which are the text people read while picking among the commands" },
        { id: "b", text: "The prompt's first message, opening it with a line that tells users what the brief will contain" },
        { id: "c", text: "The read tool's description, adding a line so that Claude offers the brief when a user wants a summary" },
        { id: "d", text: "The prompt's place in the '/' menu, moving it to the top so that more users notice it" }
      ],
      correct: ["a"],
      why: "Lesson 62, Defining prompts: each prompt gets 'a name and description', and the best practices say 'Include clear descriptions so users understand what each prompt does'; Lesson 63, Prompts in the client: 'When you type a forward slash, available prompts appear as commands', and it is the user who 'selects a prompt'. Users like the results but cannot tell from the menu what the command does, so the name and description, which people read while picking a command, are what to change (a). The prompt's messages (b) are what the server returns 'When a client requests a prompt' (Lesson 62), after the user has picked it, so a line in the first message does not help users choose. A tool's description is read by Claude (c): the parameter descriptions 'help Claude understand what each argument expects' (Lesson 57, Defining tools with MCP), while a prompt is picked by the user (Lesson 63). Moving the prompt up the menu (d) makes more users notice it, but those who see it still cannot tell what it produces, which is the problem the interviews found.",
      why_ru: "Урок 62 „Промпты в MCP“: у каждого промпта есть «имя и описание», а в рекомендациях сказано: «давайте понятные описания, чтобы пользователи понимали, что делает каждый промпт»; урок 63 „Промпты в клиенте“: «когда вы вводите косую черту, доступные промпты появляются как команды», и именно пользователь «выбирает промпт». Результаты пользователям нравятся, но по меню они не могут понять, что делает команда, поэтому менять нужно имя и описание — то, что люди читают, выбирая команду (a). Сообщения промпта (b) — то, что сервер возвращает, «когда клиент запрашивает промпт» (урок 62), уже после того, как пользователь его выбрал, поэтому строка в первом сообщении не помогает пользователям выбирать. Описание инструмента читает Claude (c): описания параметров «помогают Claude понять, что ожидает каждый аргумент» (урок 57 „Инструменты в MCP“), а промпт выбирает пользователь (урок 63). Если поднять промпт выше в меню (d), его заметит больше пользователей, но те, кто его видит, всё так же не поймут, что он даёт, — а именно эту проблему и выявили интервью."
    }
  ]
};
