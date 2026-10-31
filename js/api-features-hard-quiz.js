window.QUIZ_BANK = {
  id: "api-features-hard-v2",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "fh01",
      domain: "Thinking",
      select: 1,
      stem: "A classifier prefills Claude's reply with an opening brace, stops on a closing-brace stop sequence and uses temperature 0. After evals missed the target, the team enabled extended thinking, with max_tokens well above the budget. Every request is now rejected before any output. What is the most likely cause?",
      options: [
        { id: "a", text: "The closing-brace stop sequence now matches a brace inside the thinking, so each response ends before its label" },
        { id: "b", text: "A max_tokens value far above the thinking budget is a gap the API treats as inconsistent, so it refuses the request" },
        { id: "c", text: "The prefilled brace and temperature 0 are settings extended thinking does not accept, so the API refuses the request" },
        { id: "d", text: "Thinking is a server tool that has to be declared in the tools list, like code execution, so the API refuses the request" }
      ],
      correct: ["c"],
      why: "Lesson 46, Extended thinking opens with the note that extended thinking 'is not compatible with some other features, notable message pre-filling and temperature', so requests that keep the prefilled brace and temperature 0 while thinking is on are refused (c). Option a describes a response that stops early, but the stem says every request is rejected before any output, so there is no response for a stop sequence to end. Option b inverts the lesson's rule: 'your max_tokens parameter must be greater than your thinking budget', so a max_tokens well above the budget is the intended setup, not a conflict. Option d mixes up two mechanisms: thinking is turned on by adding a thinking configuration to the API parameters (Lesson 46), while the server tool of Lesson 53, Code execution and the Files API, is added by including 'a predefined tool schema in your request'.",
      why_ru: "Урок 46 „Extended thinking“ начинается с предупреждения, что extended thinking «несовместим с некоторыми другими возможностями, в частности с prefill сообщения и с temperature», поэтому запросы, в которых при включённых рассуждениях остаются prefill с фигурной скобкой и temperature 0, отклоняются (c). Вариант a описывает ответ, который обрывается раньше времени, но в условии сказано, что каждый запрос отклоняется ещё до какого-либо вывода, так что нет ответа, который могла бы оборвать стоп-последовательность. Вариант b переворачивает правило урока: «max_tokens должен быть больше бюджета рассуждений», поэтому max_tokens намного выше бюджета — это задуманная настройка, а не конфликт. Вариант d смешивает два механизма: рассуждения включаются добавлением настройки рассуждений в параметры API (урок 46), а серверный инструмент из урока 53 „Выполнение кода и Files API“ подключается тем, что в запрос добавляют «готовую схему инструмента»."
    },
    {
      id: "fh02",
      domain: "Thinking",
      select: 1,
      stem: "A research assistant uses extended thinking. The team raised the thinking budget to just below max_tokens. Many answers now break off mid-sentence or are missing entirely, although the thinking itself reads as complete. What explains the symptom?",
      options: [
        { id: "a", text: "max_tokens covers the reasoning as well as the answer, so each token the thinking uses is one the answer cannot use" },
        { id: "b", text: "The budget is a minimum Claude must spend on reasoning, so the answer only gets what max_tokens has left after it" },
        { id: "c", text: "The larger budget sets off redacted thinking, whose encrypted blocks take up the room meant for the answer" },
        { id: "d", text: "A thinking budget so near max_tokens breaks the rule that max_tokens must exceed it, so the API trims the answers" }
      ],
      correct: ["a"],
      why: "Lesson 46, Extended thinking: the thinking budget 'sets the maximum tokens Claude can use for reasoning', and 'your max_tokens parameter must be greater than your thinking budget'. The rule makes sense because max_tokens has to hold the reasoning and the answer together: whatever the thinking uses is no longer available for the text. With the budget raised to just below max_tokens, a response whose thinking uses most of its budget has almost nothing left, so its answer breaks off or never starts (a). The budget is a maximum, not a minimum Claude has to spend (b), and a minimum would cut every answer, not many of them. Redacted thinking (c) appears when Claude's thinking 'gets flagged by internal safety systems', not because the budget grew, and the stem says the thinking reads as complete. A budget just below max_tokens still leaves max_tokens greater than the budget, so the lesson's rule is met (d).",
      why_ru: "Урок 46 „Extended thinking“: бюджет рассуждений «задаёт максимум токенов, которые Claude может потратить на рассуждение», а «max_tokens должен быть больше бюджета рассуждений». Смысл правила в том, что в max_tokens должны уместиться и рассуждение, и ответ вместе: всё, что израсходовали рассуждения, для текста уже недоступно. Когда бюджет поднят почти до max_tokens, у ответа, рассуждение которого израсходовало большую часть бюджета, почти ничего не остаётся, поэтому ответ обрывается или вовсе не начинается (a). Бюджет — это максимум, а не минимум, который Claude обязан потратить (b), и минимум обрезал бы каждый ответ, а не многие. Redacted thinking (c) появляется, когда рассуждение Claude «помечают внутренние системы безопасности», а не потому, что вырос бюджет, и в условии сказано, что рассуждение выглядит полным. Бюджет чуть ниже max_tokens всё равно оставляет max_tokens больше бюджета, так что правило урока соблюдено (d)."
    },
    {
      id: "fh03",
      domain: "Thinking",
      select: 2,
      stem: "A lending team must show reviewers how its assistant reached each credit decision. The assistant already meets its accuracy target, and cost and latency are no concern for this overnight batch. Which two statements support turning on extended thinking? (Choose two.)",
      options: [
        { id: "a", text: "Thinking keeps the reply a single block of text, so the review system's response handling can stay as it is" },
        { id: "b", text: "The thinking block shows the reasoning that leads to each decision, which is exactly what the reviewers need to see" },
        { id: "c", text: "Reviewers can read the reasoning instead of running evals, so the accuracy checks can be dropped from now on" },
        { id: "d", text: "Its trade-offs that the lesson names first, higher costs and longer waits for replies, carry little weight here" }
      ],
      correct: ["b", "d"],
      why: "Lesson 46, Extended thinking: thinking is Claude's 'scratch paper' — 'you can see the reasoning process that leads to the answer, which helps with transparency' — and the key benefits include 'Transparency into Claude's thought process' next to better accuracy. Here transparency is the need, since accuracy is already on target (b). The trade-offs the lesson lists start with 'Higher costs (you pay for thinking tokens)' and 'Increased latency (thinking takes time)'; with cost and latency ruled out for this batch, they no longer weigh against it (d). Thinking does not keep the reply a single text block (a): 'Claude's response changes from a simple text block to a structured response containing two parts', and the lesson lists 'More complex response handling in your code' among the trade-offs. Reading the reasoning does not replace evals (c): the lesson makes 'your prompt evaluations' the basis for decisions about thinking.",
      why_ru: "Урок 46 „Extended thinking“: рассуждения — это «черновик» Claude, «виден ход рассуждений, который ведёт к ответу, — это даёт прозрачность», и среди главных преимуществ рядом с более высокой точностью названа «прозрачность хода мыслей Claude». Здесь нужна именно прозрачность, ведь точность уже на целевом уровне (b). Список компромиссов в уроке начинается с пунктов «выше стоимость (токены рассуждений оплачиваются)» и «выше задержка (рассуждение занимает время)»; раз стоимость и задержка для этой пакетной обработки исключены, они больше не говорят против рассуждений (d). Рассуждения не оставляют ответ одним текстовым блоком (a): «ответ Claude из одного текстового блока превращается в структурированный ответ из двух частей», и урок среди компромиссов называет «сложнее обработка ответа в коде». Чтение рассуждений не заменяет оценки (c): основой решений о рассуждениях урок делает «оценку промптов»."
    },
    {
      id: "fh04",
      domain: "Thinking",
      select: 1,
      stem: "A report generator takes the first content block of each response as the answer. After the team enabled extended thinking for its hardest report type, that helper returns no usable answer on every such request, though each response completes normally. What is the most likely cause?",
      options: [
        { id: "a", text: "The first block is now a redacted thinking block holding encrypted data, which the helper cannot read as answer text" },
        { id: "b", text: "The first block is now a thinking block with the reasoning, and the answer arrives in a text block that follows it" },
        { id: "c", text: "The answer now arrives in a second assistant message after the thinking message, which the helper does not fetch" },
        { id: "d", text: "The text block now opens with the thinking signature, which the helper has to strip before the answer can be read" }
      ],
      correct: ["b"],
      why: "Lesson 46, Extended thinking: with thinking enabled, 'Claude's response changes from a simple text block to a structured response containing two parts' — the reasoning process and the final answer — and the lesson lists 'more complex response handling in your code' among the trade-offs. Claude works through the problem 'before generating a final response', so a helper that takes the first block now gets the thinking block on every request and misses the text block with the answer (b). A redacted thinking block (a) appears only when the reasoning 'gets flagged by internal safety systems', so it cannot explain a failure on every request. The two parts come in one structured response, not as two assistant messages (c). The signature belongs to the thinking — a token that 'ensures you haven't modified the thinking text' — and is not a prefix of the answer text (d).",
      why_ru: "Урок 46 „Extended thinking“: с включёнными рассуждениями «ответ Claude из одного текстового блока превращается в структурированный ответ из двух частей» — процесс рассуждения и итоговый ответ, — и урок среди компромиссов называет «сложнее обработка ответа в коде». Claude продумывает задачу, «прежде чем дать итоговый ответ», поэтому вспомогательная функция, которая берёт первый блок, теперь на каждом запросе получает блок thinking и пропускает блок text с ответом (b). Скрытый (redacted) блок рассуждения (a) появляется, только когда рассуждение «помечают внутренние системы безопасности», поэтому он не объясняет сбой на каждом запросе. Обе части приходят в одном структурированном ответе, а не двумя сообщениями ассистента (c). Подпись (signature) относится к рассуждению — это токен, который «гарантирует, что вы не меняли текст рассуждения», — и не стоит в начале текста ответа (d)."
    },
    {
      id: "fh05",
      domain: "Vision",
      select: 1,
      stem: "A warehouse app sends Claude a 12-megapixel photo of each pallet to flag crushed corners, broken slats and torn wrap. The damage fills much of each frame, and almost all input tokens come from the images. Which change lowers the image cost the most?",
      options: [
        { id: "a", text: "Re-encode each photo as a low-quality JPEG that still shows the damage, so that far fewer bytes are sent" },
        { id: "b", text: "Convert each photo to grayscale, which still shows the damage, so that each pixel carries one channel" },
        { id: "c", text: "Send each photo by URL instead of base64, so that the image bytes no longer count as input tokens" },
        { id: "d", text: "Downscale each photo to the smallest size that still shows the damage, so that fewer pixels are sent" }
      ],
      correct: ["d"],
      why: "Lesson 47, Image support: 'Each image counts as tokens based on its dimensions: tokens = (width px × height px) / 750', so the cost of a photo is set by its width and height, not by its file size or by the way it travels. Large defects such as crushed corners and torn wrap stay visible at a much lower resolution, so sending the smallest image that still shows them cuts the tokens the most (d). Heavier JPEG compression (a) shrinks the bytes, which matters for the lesson's per-image size limit, but keeps the same width and height, so the token count does not move. Grayscale (b) changes the colour data, not the dimensions the token rule is built on. A URL (c) is one of the two ways the lesson lists for including an image, next to base64; it changes how the image reaches Claude, not the dimensions that are counted.",
      why_ru: "Урок 47 „Изображения“: «каждое изображение стоит токены в зависимости от размеров: токены = (ширина px × высота px) / 750», поэтому стоимость фото определяют его ширина и высота, а не размер файла и не способ передачи. Крупные повреждения вроде смятых углов и порванной плёнки остаются видны и при намного меньшем разрешении, поэтому отправка самого маленького изображения, на котором они ещё видны, сильнее всего сокращает токены (d). Более сильное сжатие JPEG (a) уменьшает число байтов, что важно для ограничения урока на размер одного изображения, но ширина и высота остаются прежними, так что число токенов не меняется. Оттенки серого (b) меняют данные о цвете, а не размеры, на которых построено правило подсчёта токенов. URL (c) — один из двух способов передать изображение, которые называет урок, наряду с base64; он меняет то, как изображение попадает к Claude, а не размеры, которые учитываются."
    },
    {
      id: "fh06",
      domain: "Vision",
      select: 1,
      stem: "A support bot lets users attach a screenshot to any message and resends the whole conversation each turn. Long sessions now fail with an error saying the request holds too many images, though each message carries one small screenshot. Sessions must stay long. What should the team change?",
      options: [
        { id: "a", text: "Keep recent screenshots as images and swap older ones for Claude's own descriptions, so that fewer images are resent" },
        { id: "b", text: "Downscale every screenshot before it is uploaded, so that a long history of screenshots stays within the request limits" },
        { id: "c", text: "Put a cache breakpoint after the older screenshots, so that the cached images stop counting toward the image limit" },
        { id: "d", text: "Gather the older screenshots into the session's first message, so that they count as a single message's images" }
      ],
      correct: ["a"],
      why: "Lesson 47, Image support: the limit is 'up to 100 images across all messages in a single request'. Because the bot resends the whole conversation, every screenshot from earlier turns is part of each new request, and a long session passes the limit however small each image is. Sending fewer images — the recent ones, plus text that already describes the older ones — lets sessions stay long (a). Downscaling (b) works on the per-image size and dimension limits and on the token cost, not on the number of images. A cache breakpoint (c) saves reprocessing, but Lesson 51, Rules of prompt caching, uses the cache only when the content up to the breakpoint is sent again identically, so the cached screenshots are still in every request. Moving them into the first message (d) changes nothing, because the limit counts images across all messages of the request.",
      why_ru: "Урок 47 „Изображения“: ограничение — «до 100 изображений во всех сообщениях одного запроса». Бот каждый раз заново отправляет весь разговор, поэтому каждый скриншот прошлых ходов входит в каждый новый запрос, и длинная сессия превышает лимит, как бы мало ни было каждое изображение. Если отправлять меньше изображений — свежие скриншоты плюс текст, который уже описывает старые, — сессии могут оставаться длинными (a). Уменьшение (b) влияет на ограничения одного изображения по объёму и по размерам в пикселях и на стоимость в токенах, а не на число изображений. Точка кеширования (c) избавляет от повторной обработки, но, по уроку 51 „Правила prompt caching“, кеш используется, только когда содержимое до точки отправляется снова без изменений, так что закешированные скриншоты всё равно есть в каждом запросе. Перенос их в первое сообщение (d) ничего не меняет, потому что лимит считает изображения во всех сообщениях запроса."
    },
    {
      id: "fh07",
      domain: "PDF",
      select: 1,
      stem: "A review screen must open each report at the page a quoted figure came from, using only the data returned with each citation. Design 1 sends the extracted text as a plain-text document, Design 2 sends the PDF itself, both with citations enabled. Which design fits, and why?",
      options: [
        { id: "a", text: "Design 1, because a plain-text document keeps the report's page breaks, so each citation carries the page it starts on" },
        { id: "b", text: "Design 1, because each plain-text citation returns character positions, which the screen can turn into the page itself" },
        { id: "c", text: "Design 2, because each citation on a PDF document returns the cited text with its start and end page numbers" },
        { id: "d", text: "Design 2, because a PDF document returns one citation per page, listing every figure Claude used from that page" }
      ],
      correct: ["c"],
      why: "Lesson 49, Citations: each citation carries cited_text, document_index, document_title, start_page_number and end_page_number, while 'with plain text sources, instead of page numbers, you'll get character positions'. Only Design 2 puts the page into the citation itself, so the screen can open it with no lookup of its own (c). A plain-text document has no pages to report, whatever page breaks its text keeps, so its citations carry character positions (a). Turning character positions into a page (b) would need the team's own map from the extracted text back to the PDF's pages — data that does not come with the citation. Citations are not issued per page (d): the lesson describes 'citation information for each claim', each with its own cited text and page range.",
      why_ru: "Урок 49 „Цитаты“: в каждой цитате есть cited_text, document_index, document_title, start_page_number и end_page_number, а «для текстовых источников вместо номеров страниц приходят позиции символов». Только Design 2 помещает страницу в саму цитату, поэтому экран может открыть её без собственного сопоставления (c). У документа из обычного текста нет страниц, о которых можно сообщить, какие бы разрывы страниц ни сохранил его текст, поэтому его цитаты содержат позиции символов (a). Чтобы превратить позиции символов в страницу (b), команде понадобилось бы собственное соответствие извлечённого текста страницам PDF — данные, которые с цитатой не приходят. Цитаты выдаются не по одной на страницу (d): урок описывает «информацию о цитатах для каждого утверждения», и у каждой цитаты свой процитированный текст и диапазон страниц."
    },
    {
      id: "fh08",
      domain: "PDF",
      select: 2,
      stem: "An analytics app extracts the text layer of quarterly-report PDFs with a parsing library and sends Claude only that text. Questions about figures the reports show only as bar heights in charts come back as 'not stated in the report'. Which two changes would let Claude answer them? (Choose two.)",
      options: [
        { id: "a", text: "Run each chart image through Claude once with a prompt to transcribe only its caption, and add the captions to the text" },
        { id: "b", text: "Send each report to Claude as a PDF in a document block, so that it reads the charts along with the text" },
        { id: "c", text: "Enable citations on the extracted text, so that Claude can point to the place where each chart figure appears" },
        { id: "d", text: "Add the pages that hold the charts as images in image blocks, next to the text that the parser already extracted" }
      ],
      correct: ["b", "d"],
      why: "Lesson 48, PDF support: 'Claude's PDF processing capabilities go beyond simple text extraction'; it can analyze 'Images and charts embedded in the PDF' and 'Tables and their data relationships', which makes it 'essentially a one-stop solution for extracting any type of information from PDF documents'. The parsing step keeps only the text layer, so the chart data never reaches Claude; sending the PDF itself fixes that (b). Lesson 47, Image support: Claude's vision lets you include images in your messages and 'perform complex visual analysis tasks', so the chart pages sent as images also give Claude the figures (d); Lesson 48 notes that PDF processing 'works similarly to image processing'. Sending the charts to Claude only to transcribe their captions (a) uses the images for the wrong task: the answer step still gets text without the bar heights, and Lesson 47 makes the point that what Claude extracts from an image depends on the prompt — 'Simple prompts often lead to poor results'. Citations (c) point back to what is already in the document Claude was given: Lesson 49, Citations, says each one carries 'The exact text from your document that supports Claude's statement', so bar heights that never reached Claude as text cannot be cited either.",
      why_ru: "Урок 48 „PDF“: «обработка PDF в Claude — больше, чем извлечение текста»; Claude анализирует «изображения и графики внутри PDF» и «таблицы и связи между их данными», и это делает его, «по сути, универсальным решением для извлечения любой информации из PDF». Шаг разбора оставляет только текстовый слой, поэтому данные графиков так и не доходят до Claude; отправка самого PDF это исправляет (b). Урок 47 „Изображения“: зрение Claude позволяет включать изображения в сообщения и «выполнить сложный визуальный анализ», поэтому страницы с графиками, отправленные как изображения, тоже дают Claude эти значения (d); урок 48 отмечает, что обработка PDF «работает похоже на обработку изображений». Отправка графиков Claude лишь затем, чтобы он переписал их подписи (a), ставит изображениям не ту задачу: шаг ответа всё равно получает текст без высот столбцов, а урок 47 подчёркивает, что извлечённое Claude из изображения зависит от промпта, — «простые промпты часто дают плохой результат». Цитаты (c) указывают на то, что уже есть в переданном Claude документе: урок 49 „Цитаты“ говорит, что в каждой есть «точный текст из документа, подтверждающий утверждение Claude», поэтому высоты столбцов, которые так и не дошли до Claude в виде текста, процитировать тоже нельзя."
    },
    {
      id: "fh09",
      domain: "Citations",
      select: 2,
      stem: "A firm's assistant answers from uploaded contracts with citations enabled. Reviewers now reread the whole contract for every answer, and the firm wants to cut that time without letting a misread clause reach a client. Which two review practices fit what citations provide? (Choose two.)",
      options: [
        { id: "a", text: "Have reviewers go straight to the passage a claim cites, rather than working through the contract to find it" },
        { id: "b", text: "Have reviewers skip the claims that carry a citation, since a cited claim is already backed by the contract" },
        { id: "c", text: "Have reviewers spot-check one cited passage per answer, since one sound citation shows how the answer reads its sources" },
        { id: "d", text: "Have reviewers check each claim against its cited passage, as a citation shows the source, not that Claude understood it" }
      ],
      correct: ["a", "d"],
      why: "Lesson 49, Citations: citations create 'a clear trail from Claude's response back to your source material', so that users can 'Verify the information by checking the original document', and the lesson recommends them when 'Users need to verify information for accuracy'. A citation takes the reviewer straight to the passage behind a claim, which removes the reread of the whole contract (a). The reviewer still compares the claim with that passage, because a citation shows where the information came from, not that Claude interpreted it correctly — and that comparison is what stops a misread clause (d). Skipping cited claims (b) treats a citation as proof, but the lesson offers citations so that users can 'Verify the information by checking the original document' and recommends them when 'Users need to verify information for accuracy' — checks that would be pointless if a citation proved the claim. A spot check of one passage per answer (c) says nothing about the other claims: the lesson gives 'citation information for each claim', and each claim has to be compared with its own passage to stop a misread clause.",
      why_ru: "Урок 49 „Цитаты“: цитаты создают «ясную связь между ответом Claude и исходным материалом», чтобы пользователи могли «проверить информацию по исходному документу», и урок советует их, когда «пользователям нужно проверять точность информации». Цитата ведёт проверяющего прямо к фрагменту, на котором основано утверждение, и перечитывать весь договор больше не нужно (a). Проверяющий всё равно сравнивает утверждение с этим фрагментом, потому что цитата показывает, откуда взята информация, а не то, что Claude правильно её понял, — и именно это сравнение не пропускает неверно прочитанный пункт (d). Пропуск утверждений с цитатами (b) считает цитату доказательством, но урок предлагает цитаты, чтобы пользователи могли «проверить информацию по исходному документу», и советует их, когда «пользователям нужно проверять точность информации», — а такие проверки были бы бессмысленны, если бы цитата доказывала утверждение. Выборочная проверка одного фрагмента на ответ (c) ничего не говорит об остальных утверждениях: урок даёт «информацию о цитатах для каждого утверждения», и каждое утверждение нужно сравнить с его собственным фрагментом, чтобы не пропустить неверно прочитанный пункт."
    },
    {
      id: "fh10",
      domain: "Citations",
      select: 1,
      stem: "A Q&A app sends PDFs as document blocks with citations enabled. Its logged API responses carry citation data, yet users see answers with no source markers. What is the most likely cause?",
      options: [
        { id: "a", text: "A citation does not say which document it comes from, so the app cannot match any citation to the PDFs it sent" },
        { id: "b", text: "The citation information comes with each claim as structured data, and the app renders only the answer's text" },
        { id: "c", text: "The logged citations come in a separate follow-up message, which the app does not request once the answer ends" },
        { id: "d", text: "Claude marks its citations as footnote numbers inside the answer text, and the app's text cleanup strips them out" }
      ],
      correct: ["b"],
      why: "Lesson 49, Citations: 'When citations are enabled, Claude's response becomes more complex. Instead of simple text, you get structured data that includes citation information for each claim', and 'the real power of citations comes from building user interfaces that make this information accessible', such as citation markers that users hover over. The logs show that structured data arriving; an app that keeps only the text of the response throws the citation information away, so users see answers without markers (b). Each citation does say which document it comes from (a): it carries document_index, 'Which document Claude is referencing', and document_title, 'The title you assigned to the document'. The citation information is part of Claude's response itself (c): the lesson describes the response as structured data that includes it, not as a second message. And it comes as structured data, 'instead of simple text', not as footnote numbers written into the answer (d).",
      why_ru: "Урок 49 „Цитаты“: «с включёнными цитатами ответ Claude становится сложнее. Вместо простого текста приходят структурированные данные с информацией о цитатах для каждого утверждения», а «настоящая сила цитат — в интерфейсе, который делает эту информацию доступной», например в маркерах цитат, на которые пользователь наводит курсор. Логи показывают, что эти структурированные данные приходят; приложение, которое оставляет только текст ответа, выбрасывает информацию о цитатах, поэтому пользователи видят ответы без маркеров (b). Каждая цитата как раз говорит, из какого она документа (a): в ней есть document_index — «на какой документ ссылается Claude» — и document_title — «заголовок, который вы дали документу». Информация о цитатах — часть самого ответа Claude (c): урок описывает ответ как структурированные данные, которые её включают, а не как второе сообщение. И приходит она структурированными данными, «вместо простого текста», а не номерами сносок, вписанными в ответ (d)."
    },
    {
      id: "fh11",
      domain: "Prompt caching",
      select: 1,
      stem: "A scheduling assistant caches its long system prompt with a breakpoint, yet usage shows a cache write on every request and never a read. The prompt opens with the current time, to the second, which the assistant needs exactly. What should the team change?",
      options: [
        { id: "a", text: "Move the time into the newest user message, which sits after the last breakpoint in the request" },
        { id: "b", text: "Move the time to the end of the cached system block, so that the stable instructions come first in it" },
        { id: "c", text: "Round the time to the nearest minute, so that the system prompt changes less often between requests" },
        { id: "d", text: "Move the current time into the tool descriptions, so that it no longer sits inside the system prompt" }
      ],
      correct: ["a"],
      why: "Lesson 51, Rules of prompt caching: the cache is used on follow-up requests only 'if the content up to and including the breakpoint is identical' — even adding the word 'please' invalidates it — and 'content after the breakpoint is processed normally without caching'; Lesson 52, Prompt caching in action, adds that 'changing even a single character in your tools or system prompt invalidates the entire cache for that component'. A time stamp to the second makes every system prompt new, so each request writes an entry that none reads. Placing the time after the last breakpoint, in the newest user message, makes the system prompt identical again while Claude still gets the exact time (a). At the end of the cached block (b) the time is still inside the content up to and including the breakpoint. Rounding to the minute (c) still changes the prompt every minute and takes away the exact time the assistant needs. The request is processed 'tools first, then system prompt, then messages' (Lesson 51), so a time in the tool descriptions (d) still changes the content before the system prompt's breakpoint.",
      why_ru: "Урок 51 „Правила prompt caching“: кеш используется в следующих запросах, «только если содержимое до точки включительно полностью совпадает», — даже добавленное слово «please» делает его недействительным, — а «содержимое после точки обрабатывается обычно, без кеша»; урок 52 „Prompt caching в коде“ добавляет, что «изменение даже одного символа в инструментах или system prompt сбрасывает весь кеш этой части». Отметка времени с точностью до секунды делает каждый system prompt новым, поэтому каждый запрос пишет в кеш то, что потом никто не читает. Если поставить время после последней точки кеширования, в самое новое сообщение пользователя, system prompt снова становится одинаковым, а Claude по-прежнему получает точное время (a). В конце кешируемого блока (b) время всё равно находится внутри содержимого до точки включительно. Округление до минуты (c) всё равно меняет промпт каждую минуту и лишает ассистента точного времени, которое ему нужно. Запрос обрабатывается «сначала инструменты, потом system prompt, потом сообщения» (урок 51), поэтому время в описаниях инструментов (d) всё равно меняет содержимое перед точкой кеширования system prompt."
    },
    {
      id: "fh12",
      domain: "Prompt caching",
      select: 1,
      stem: "A tutoring chatbot caches only its system prompt. Each request repeats the previous request plus the newest exchange, over forty or more turns. Cache reads stay small while input tokens climb. No history may be dropped. What should the team change?",
      options: [
        { id: "a", text: "Add a breakpoint on the first user message, so that each conversation's opening is cached with the system prompt" },
        { id: "b", text: "Copy the history into the system prompt, so that the whole conversation is cached together with the instructions" },
        { id: "c", text: "Add a breakpoint late in the conversation history, so that the earlier messages are cached with the prompt" },
        { id: "d", text: "Replace the older turns with a short summary, so that each request carries far fewer tokens of history" }
      ],
      correct: ["c"],
      why: "Lesson 51, Rules of prompt caching: a breakpoint caches 'all the processing work up to and including that breakpoint', and 'if you place a breakpoint in a later message, all previous messages (user, assistant, etc.) will be included in the cached content. This is particularly useful for conversations where you want to cache the entire context up to a certain point.' With only the system prompt cached, the growing history after its breakpoint is processed in full every turn; a breakpoint late in the history brings the earlier messages into the cache, and the next request, which repeats them unchanged, reads them (c). A breakpoint on the first user message (a) caches only the opening, so the growing rest is still processed in full. Copying the history into the system prompt (b) changes the system prompt every turn, and Lesson 52, Prompt caching in action, says that changing even a single character of it 'invalidates the entire cache for that component'. Replacing older turns with a summary (d) cuts tokens by dropping what those turns said, which the stem rules out.",
      why_ru: "Урок 51 „Правила prompt caching“: точка кеширования кеширует «всю работу до этой точки включительно», а «если поставить точку в более позднем сообщении, все предыдущие (пользователя, ассистента и т. д.) войдут в кешируемое содержимое. Это особенно полезно в разговорах, где нужно закешировать весь контекст до определённого момента». Когда закеширован только system prompt, растущая история после его точки каждый ход обрабатывается целиком; точка ближе к концу истории включает ранние сообщения в кеш, и следующий запрос, который повторяет их без изменений, читает их из кеша (c). Точка на первом сообщении пользователя (a) кеширует только начало, так что растущая остальная часть всё равно обрабатывается целиком. Копирование истории в system prompt (b) меняет system prompt каждый ход, а урок 52 „Prompt caching в коде“ говорит, что изменение даже одного символа в нём «сбрасывает весь кеш этой части». Замена старых ходов кратким пересказом (d) сокращает токены за счёт того, что отбрасывает сказанное в этих ходах, а условие это исключает."
    },
    {
      id: "fh13",
      domain: "Prompt caching",
      select: 1,
      stem: "A one-time job summarizes 50,000 distinct letters. Each request sends a short fixed instruction and then one letter, with a cache breakpoint on the letter block. The input bill came out no lower than an estimate made without caching. What is the most likely explanation?",
      options: [
        { id: "a", text: "The cache entries expired between requests, so each entry was gone before a later request could read it" },
        { id: "b", text: "Each request's content up to its breakpoint was new, so no earlier entry existed for that request to match" },
        { id: "c", text: "The job set more than four cache breakpoints in total, so the API stopped reading entries after the fourth" },
        { id: "d", text: "The breakpoint cached only the fixed instruction before it, so each letter after it was processed at full price" }
      ],
      correct: ["b"],
      why: "Lesson 50, Prompt caching, lists the limitation plainly: caching is 'only beneficial when you're repeatedly sending the same content', and Lesson 51, Rules of prompt caching, describes the two steps — the initial request writes the work to the cache, and a follow-up request reads it only 'if the content up to and including the breakpoint is identical'. Every request here carries a different letter up to its breakpoint, so each one writes an entry that no later request matches (b). Expiry (a) matters only for content that is sent again, and no letter is sent twice. The limit of four breakpoints (c) applies within a request — 'you can add up to four cache breakpoints total' — and each request here has one. A breakpoint caches 'all the processing work up to and including that breakpoint' (Lesson 51), so the instruction and the letter form one entry, not an instruction entry with the letter left outside (d).",
      why_ru: "Урок 50 „Prompt caching“ прямо называет это ограничение: кеш «полезен, только если вы повторно отправляете одно и то же», а урок 51 „Правила prompt caching“ описывает два шага — первый запрос записывает работу в кеш, а следующий читает её, только «если содержимое до точки включительно полностью совпадает». Здесь каждый запрос несёт до своей точки другое письмо, поэтому каждый создаёт в кеше запись, с которой не совпадёт ни один следующий запрос (b). Срок жизни кеша (a) важен только для содержимого, которое отправляется снова, а ни одно письмо не отправляется дважды. Лимит в четыре точки (c) действует внутри запроса — «всего можно поставить до четырёх точек кеширования», — а в каждом запросе здесь одна точка. Точка кеширует «всю работу до этой точки включительно» (урок 51), поэтому инструкция и письмо образуют одну запись в кеше, а не запись для инструкции, за пределами которой осталось письмо (d)."
    },
    {
      id: "fh14",
      domain: "Prompt caching",
      select: 1,
      stem: "An agent's large tool list changes monthly; its long system prompt, which ends with a cache breakpoint, is edited a few times a day. After each edit, usage shows the tools and the prompt both written to the cache again. What change keeps the tools read after an edit?",
      options: [
        { id: "a", text: "Edit only the end of the system prompt, so that the part before each edit is still read from the cache" },
        { id: "b", text: "Send the system prompt before the tools, so that edits to the prompt no longer touch the cached tools" },
        { id: "c", text: "Add a breakpoint on the last tool as well, so that each edit to the prompt leaves the tools' cache entry intact" },
        { id: "d", text: "Add a breakpoint on the newest user message as well, so that the tools and prompt are cached in a second entry" }
      ],
      correct: ["c"],
      why: "Lesson 51, Rules of prompt caching: Claude processes a request 'tools first, then system prompt, then messages', a breakpoint caches 'all the processing work up to and including that breakpoint', and 'you can add up to four cache breakpoints total. For example, you might cache your tools, then add another breakpoint'. Lesson 52, Prompt caching in action: 'If you change your system prompt but keep the same tools, you'll see a partial cache read (for tools) and a cache write (for the new system prompt). This granular caching means you only pay for processing the parts that actually changed.' With one breakpoint, the tools sit inside the single entry that every edit invalidates; a second breakpoint on the last tool keeps them in an entry of their own that edits do not touch (c). Editing only the end of the prompt (a) still changes the content up to and including the breakpoint, and Lesson 52 says 'changing even a single character in your tools or system prompt invalidates the entire cache for that component'. The order is not the developer's choice (b): Claude processes the components 'in a specific order', tools first. A breakpoint on the newest user message (d) caches a prefix that includes the edited prompt, so after an edit it misses too; only a breakpoint that ends before the prompt keeps the tools readable.",
      why_ru: "Урок 51 „Правила prompt caching“: Claude обрабатывает запрос «сначала инструменты, потом system prompt, потом сообщения», точка кеширования кеширует «всю работу до этой точки включительно», и «всего можно поставить до четырёх точек кеширования. Например, можно закешировать инструменты, а затем поставить ещё одну точку». Урок 52 „Prompt caching в коде“: «если поменять system prompt, но оставить те же инструменты, вы увидите частичное чтение кеша (для инструментов) и запись в кеш (для нового system prompt). Такое дробное кеширование означает, что платить приходится только за обработку изменившихся частей». С одной точкой инструменты лежат внутри единственной записи в кеше, которую сбрасывает каждая правка; вторая точка на последнем инструменте держит их в отдельной записи, которую правки не затрагивают (c). Правка только конца промпта (a) всё равно меняет содержимое до точки включительно, а урок 52 говорит: «изменение даже одного символа в инструментах или system prompt сбрасывает весь кеш этой части». Порядок не выбирает разработчик (b): Claude обрабатывает части «в определённом порядке», начиная с инструментов. Точка на самом новом сообщении пользователя (d) кеширует начало запроса вместе с изменённым промптом, поэтому после правки по ней тоже не будет чтения из кеша; инструменты остаются доступными для чтения из кеша только благодаря точке, которая стоит до промпта."
    },
    {
      id: "fh15",
      domain: "Prompt caching",
      select: 1,
      stem: "A product manager expects prompt caching to make an FAQ bot answer a word-for-word repeat of an earlier question instantly, with no output tokens billed. The bot's long system prompt, shared by every question, has a cache breakpoint. What will that cache do for a repeated question?",
      options: [
        { id: "a", text: "A repeat is served the reply that was cached on its first ask, so its output is billed on that first ask and not again" },
        { id: "b", text: "A repeat reads the shared prompt only when the same user asks it again, since cache entries are kept per end user" },
        { id: "c", text: "A repeat has its answer generated anew, but the output tokens of that answer are billed at the cache-read rate" },
        { id: "d", text: "A repeat reads the shared prompt from the cache at a lower price, while its answer is still generated and billed" }
      ],
      correct: ["d"],
      why: "Lesson 50, Prompt caching: before answering, Claude 'tokenizes the prompt into smaller pieces', 'creates embeddings for each token' and 'adds context based on surrounding text', and 'only then generates the actual output text'; caching saves that preprocessing work on the input instead of throwing it away. A repeated question therefore reads the shared system prompt from the cache — 'you pay less for the cached portions of your requests' — while its answer is generated and billed again (d). The cache holds processed input, not a reply, so no repeat is served an earlier answer (a). Nothing in the lessons ties an entry to the person who asked: Lesson 51, Rules of prompt caching, makes a read depend on the content being identical up to and including the breakpoint, so the shared prompt is read whoever sends the question (b). The lower price applies to the cached portions of the request, which are input; the answer is newly generated output (c).",
      why_ru: "Урок 50 „Prompt caching“: прежде чем ответить, Claude «разбивает промпт на токены», «создаёт эмбеддинги для каждого токена» и «добавляет контекст по соседнему тексту», «и только потом генерирует сам текст ответа»; кеширование сохраняет эту работу по предобработке входа, а не выбрасывает её. Поэтому повторный вопрос читает общий system prompt из кеша — «за кешированные части запроса вы платите меньше», — а ответ на него снова генерируется и оплачивается (d). В кеше лежит обработанный вход, а не ответ, поэтому ни на один повтор не выдаётся прежний ответ (a). Ничто в уроках не привязывает запись в кеше к тому, кто спросил: по уроку 51 „Правила prompt caching“ чтение зависит от того, совпадает ли содержимое до точки включительно, поэтому общий промпт читается из кеша, кто бы ни прислал вопрос (b). Сниженная цена относится к кешированным частям запроса, а это вход; ответ — заново сгенерированный выход (c)."
    },
    {
      id: "fh16",
      domain: "Code execution & Files",
      select: 1,
      stem: "An analyst asks dozens of questions about one large PDF. The app resends the conversation history with each request and also attaches the PDF as base64 in a document block, so the file crosses a metered uplink per question. What should change so it crosses once?",
      options: [
        { id: "a", text: "Upload the PDF through the Files API, and set its file_id as the source of each question's document block" },
        { id: "b", text: "Keep the base64 PDF and add a cache breakpoint on its document block, so that later questions read it from the cache" },
        { id: "c", text: "Attach the PDF to the session's first message alone, so that later questions read it from the conversation history" },
        { id: "d", text: "Upload only the PDF's extracted text through the Files API, since the Files API takes images and text but not PDFs" }
      ],
      correct: ["a"],
      why: "Lesson 53, Code execution and the Files API: 'you can upload files ahead of time and reference them later': you upload the file 'using a separate API call', receive a file ID and 'reference that file ID in future messages instead of including raw file data', which is 'particularly useful when you want to reference the same file multiple times or when working with larger files that would be cumbersome to include in every request'. One upload and the same file ID in each question's document block let the bytes travel once (a). A cache breakpoint (b) saves processing, but Lesson 51, Rules of prompt caching, reads the cache only when the content up to the breakpoint is sent again identically, so the base64 still crosses the uplink each time. Sending the PDF in the first message only (c) moves it into the history, and the stem says the app resends the history with each request, so the file still travels with every question. The premise of d is false: the lesson lists what you can upload as 'image, PDF, text, etc.', so there is no reason to give up the PDF, and Lesson 48, PDF support, shows that Claude reads more from a PDF than its text — 'Images and charts embedded in the PDF', 'Tables and their data relationships'.",
      why_ru: "Урок 53 „Выполнение кода и Files API“: «можно заранее загрузить файлы и потом ссылаться на них» — вы загружаете файл «отдельным вызовом API», получаете ID файла и «в следующих сообщениях ссылаетесь на этот ID вместо сырых данных файла», а это «особенно удобно, когда на один файл нужно ссылаться много раз или когда файлы большие и включать их в каждый запрос неудобно». Одна загрузка и один и тот же ID файла в блоке document каждого вопроса позволяют передать байты один раз (a). Точка кеширования (b) экономит обработку, но, по уроку 51 „Правила prompt caching“, кеш читается, только когда содержимое до точки отправляется снова без изменений, так что base64 всё равно каждый раз уходит по исходящему каналу. Отправка PDF только в первом сообщении (c) переносит его в историю, а в условии сказано, что приложение отправляет историю заново с каждым запросом, так что файл всё равно передаётся с каждым вопросом. Исходная посылка варианта d ложна: урок перечисляет, что можно загрузить, — «изображение, PDF, текст и т. д.», — так что отказываться от PDF незачем, а урок 48 „PDF“ показывает, что Claude читает из PDF больше, чем текст: «изображения и графики внутри PDF», «таблицы и связи между их данными»."
    },
    {
      id: "fh17",
      domain: "Code execution & Files",
      select: 1,
      stem: "A team has Claude run code in its isolated container to turn uploaded CSV exports into an Excel workbook. Claude says the workbook was created and the code ran cleanly, but the response holds no workbook data to save. Users need a download. What should the team do?",
      options: [
        { id: "a", text: "Have Claude's code send the workbook from the container to the app's storage URL, so that the app can serve it" },
        { id: "b", text: "Add a container upload block with the workbook's name to the next request, so that the Files API sends the file back" },
        { id: "c", text: "Take the file ID from the code execution output block, so that the app can fetch the workbook through the Files API" },
        { id: "d", text: "Read the workbook from the sandbox path that Claude printed, so that the app copies it from the container's working directory" }
      ],
      correct: ["c"],
      why: "Lesson 53, Code execution and the Files API: when Claude's code creates a file, 'it gets stored in the container and you can download it using the Files API'; blocks 'with type: \"code_execution_output\" in the response ... contain file IDs for generated content' (c). Code in the container cannot send the workbook out itself: the environment has 'No network access (can't make external API calls)', which is why 'the Files API becomes the primary way to get data in and out of the execution environment' (a). A container upload block (b) carries a file uploaded through the Files API into the container for Claude's code to use; it works in the opposite direction. The code runs on the server side — code execution is 'a server-based tool' that runs in 'an isolated Docker container' — so the app has no path into the container's working directory (d).",
      why_ru: "Урок 53 „Выполнение кода и Files API“: когда код Claude создаёт файл, он «сохраняется в контейнере, и его можно скачать через Files API»; блоки «с типом \"code_execution_output\"» в ответе «содержат ID созданных файлов» (c). Код в контейнере не может сам отправить файл Excel наружу: в среде «нет доступа к сети (нельзя обращаться к внешним API)», и поэтому «Files API становится главным способом передать данные в среду выполнения и получить их обратно» (a). Блок container_upload (b) передаёт в контейнер файл, загруженный через Files API, чтобы им пользовался код Claude; он работает в обратном направлении. Код выполняется на сервере (выполнение кода — это «серверный инструмент», который работает в «изолированном Docker-контейнере»), поэтому у приложения нет пути в рабочий каталог контейнера (d)."
    }
  ]
};
