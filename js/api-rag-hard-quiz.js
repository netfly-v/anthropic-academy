window.QUIZ_BANK = {
  id: "api-rag-hard-v2",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "rh01",
      domain: "RAG basics",
      select: 1,
      stem: "A team wants Claude to answer questions about individual contracts. Each contract is 30–40 pages, uploaded by one user and queried two or three times before it is discarded. Which approach fits best?",
      options: [
        { id: "a", text: "Chunk each contract by its clause headings and retrieve the matching clauses for every question" },
        { id: "b", text: "Send the contract with the first question only, and answer the follow-ups without it to save tokens" },
        { id: "c", text: "Index each contract with BM25 rather than embeddings, since clause numbers call for exact matches" },
        { id: "d", text: "Place the whole contract in the prompt with each question and skip retrieval for these documents" }
      ],
      correct: ["d"],
      why: "Lesson 39, Introducing Retrieval Augmented Generation: RAG 'involves many technical decisions and requires more work than simply including everything in a prompt', and it is 'especially valuable when working with very large documents, multiple documents, or when you need to optimize for cost and performance'; the limits of the full-text prompt are shown on an 800-page document. A 30–40-page contract asked about two or three times is none of those cases, so the simple approach works and a retrieval pipeline would add work that pays nothing back (d). Option a is a sound chunking method, but it adds the preprocessing and search steps the team does not need. Option b drops the document the answers depend on: the lesson's point is that the relevant text has to reach Claude in the prompt with the question. Option c is still retrieval; Lesson 44, BM25 lexical search, presents BM25 as a complement to semantic search, not as a reason to index small documents.",
      why_ru: "Урок 39 „Введение в RAG“: RAG «требует многих технических решений и больше работы, чем просто положить всё в промпт», и он «особенно ценен для очень больших документов, нескольких документов или когда нужно оптимизировать стоимость и скорость»; ограничения промпта с полным текстом показаны на документе в 800 страниц. Договор на 30–40 страниц, о котором спрашивают два-три раза, не подходит ни под один из этих случаев, поэтому простой подход работает, а конвейер поиска добавил бы работу, которая ничем не окупится (d). Вариант a — разумный способ разбиения на фрагменты, но он добавляет шаги предобработки и поиска, которые команде не нужны. Вариант b убирает документ, от которого зависят ответы: смысл урока в том, что нужный текст должен попасть к Claude в промпте вместе с вопросом. Вариант c — это всё равно поиск; урок 44 „Лексический поиск BM25“ представляет BM25 как дополнение к семантическому поиску, а не как повод индексировать небольшие документы."
    },
    {
      id: "rh02",
      domain: "RAG basics",
      select: 1,
      stem: "A support team replaced prompt-stuffing a 900-page manual with a RAG pipeline that retrieves the single best chunk. Fault-code answers now describe the code but omit its recovery steps, which sit in a separate section. Cost per question must stay low. What should they change first?",
      options: [
        { id: "a", text: "Retrieve several top-ranked chunks instead of one, so that related sections reach the prompt" },
        { id: "b", text: "Return to sending the full manual for fault-code questions, since those need the whole context" },
        { id: "c", text: "Lower the chunk size so that each fault code lands in a smaller and more precise chunk" },
        { id: "d", text: "Add a system prompt rule telling Claude to describe recovery steps whenever it sees a fault code" }
      ],
      correct: ["a"],
      why: "Lesson 39, Introducing Retrieval Augmented Generation, lists this challenge of RAG: 'Included chunks might not contain all the context Claude needs'. Retrieving several chunks lets the related section reach the prompt while the prompt stays far smaller than the manual, and Lesson 43, Implementing the RAG flow, itself searches for the two most relevant chunks (a). Option b may restore the missing steps but breaks the cost constraint: Lesson 39 says larger prompts cost more and take longer, and a 900-page manual is the extreme case. Option c makes chunks smaller, but one smaller chunk still cannot contain a separate section. Option d works on the generation step, and Claude cannot describe steps that never reached the prompt.",
      why_ru: "Урок 39 „Введение в RAG“ называет такую трудность RAG: «во включённых фрагментах может не оказаться всего контекста, нужного Claude». Если извлекать несколько фрагментов, связанный раздел попадает в промпт, а промпт остаётся намного меньше руководства; урок 43 „Реализация RAG“ и сам ищет два самых релевантных фрагмента (a). Вариант b, возможно, вернёт пропавшие шаги, но нарушает ограничение по стоимости: урок 39 говорит, что большие промпты дороже и обрабатываются дольше, а руководство на 900 страниц — крайний случай. Вариант c уменьшает фрагменты, но один фрагмент поменьше всё равно не может вместить отдельный раздел. Вариант d воздействует на шаг генерации, а Claude не может описать шаги, которые так и не попали в промпт."
    },
    {
      id: "rh03",
      domain: "RAG basics",
      select: 1,
      stem: "An assistant answers questions over 150 pages of policies, all pasted into every prompt. The text fits within the prompt limit and cost is not a concern, yet answers to detailed questions got worse as more policies were added. What should the team do?",
      options: [
        { id: "a", text: "Keep the full-text prompt, since the policies fit within the limit and the cost has been accepted" },
        { id: "b", text: "Add a rule asking Claude to read every policy carefully before it answers a detailed question" },
        { id: "c", text: "Move to RAG, so that each prompt carries only the policy sections relevant to the question" },
        { id: "d", text: "Move the policies into the system prompt, so that Claude treats them as standing background" }
      ],
      correct: ["c"],
      why: "Lesson 39, Introducing Retrieval Augmented Generation, lists among the limits of putting everything in the prompt that 'Claude becomes less effective with very long prompts', and among the benefits of RAG that 'Claude can focus on only the most relevant content'. With the length limit and cost ruled out as problems, effectiveness is the reason left, and RAG addresses it by sending only the relevant sections (c). Keeping the full-text prompt (a) treats the hard length limit as the only limit, which the lesson does not. A rule to read carefully (b) and moving the text into the system prompt (d) leave the prompt just as long, so they do not touch the cause.",
      why_ru: "Урок 39 „Введение в RAG“ среди ограничений подхода «всё в промпт» называет то, что «на очень длинных промптах Claude работает менее эффективно», а среди преимуществ RAG — что «Claude может сосредоточиться только на самом релевантном содержимом». Раз предел длины и стоимость как проблемы исключены, остаётся эффективность, и RAG решает именно её, отправляя только релевантные разделы (c). Сохранить промпт с полным текстом (a) — значит считать жёсткий предел длины единственным ограничением, а урок так не считает. Правило читать внимательно (b) и перенос текста в system prompt (d) оставляют промпт таким же длинным, поэтому причину они не затрагивают."
    },
    {
      id: "rh04",
      domain: "Chunking",
      select: 1,
      stem: "An ingestion service chunks uploads: Markdown reports, plain-text exports and source code. Design 1 splits on headers, falling back to size-based chunks when few appear. Design 2 uses size-based chunks with overlap everywhere. Header-like lines also occur in code and in some of the exports. Which design fits best?",
      options: [
        { id: "a", text: "Design 1, because structure-based chunks are cleaner whenever headers exist and the fallback covers the rest" },
        { id: "b", text: "Design 2, because one strategy with no assumptions about format holds up across all three kinds of upload" },
        { id: "c", text: "Design 1, with the fallback threshold raised so that header-like lines in code no longer count as sections" },
        { id: "d", text: "Design 2 without the overlap, since overlap repeats text across chunks and only makes the index larger" }
      ],
      correct: ["b"],
      why: "Lesson 40, Text chunking strategies: structure-based chunking 'only works when you have guarantees about your document structure', while size-based chunking with overlap is 'often the go-to choice in production because it's simple, reliable, and works with any document type', the 'most reliable fallback that works with any content type, including code' (b). Header-like lines in code and exports mean the uploads give no structural guarantee, so Design 1 splits some files in the wrong places and its fallback does not fire when it should (a); raising the threshold (c) only moves the point where that happens, because nothing tells real headers from the others. Dropping the overlap (d) brings back the problems the lesson lists for plain size-based chunks: words cut off mid-sentence and chunks that lose context from the surrounding text.",
      why_ru: "Урок 40 „Стратегии разбиения текста“: разбиение по структуре «работает, только если структура документа гарантирована», а разбиение по размеру с перекрытием «часто выбирают в продакшене, потому что оно простое, надёжное и работает с документами любого типа», это «самый надёжный запасной вариант, который работает с любым содержимым, включая код» (b). Строки, похожие на заголовки, в коде и выгрузках означают, что загрузки не дают никаких гарантий структуры, поэтому Design 1 режет часть файлов не в тех местах, а его запасной вариант не срабатывает, когда должен (a); повышение порога (c) лишь сдвигает точку, где это происходит, потому что ничто не отличает настоящие заголовки от остальных. Отказ от перекрытия (d) возвращает проблемы, которые урок называет для простого разбиения по размеру: слова, обрезанные посреди предложения, и фрагменты, теряющие контекст окружающего текста."
    },
    {
      id: "rh05",
      domain: "Chunking",
      select: 2,
      stem: "A team splits plain-text call transcripts into fixed-length chunks with no overlap. Retrieved chunks often begin or end partway through a speaker's remark, so answers miss its point. Which two changes address this? (Choose two.)",
      options: [
        { id: "a", text: "Switch to structure-based chunks with overlap, so that the chunks follow the sections and headings of each call" },
        { id: "b", text: "Add overlap between neighbouring chunks, so that each one also carries some text from those around it" },
        { id: "c", text: "Make the chunks much shorter, so that each one holds less of a remark that a boundary could cut" },
        { id: "d", text: "Split the text into whole sentences and group consecutive sentences into each chunk" }
      ],
      correct: ["b", "d"],
      why: "Lesson 40, Text chunking strategies: plain size-based chunks cut words off mid-sentence and lose context from the surrounding text; adding overlap 'means each chunk includes some characters from the neighboring chunks, providing better context and ensuring complete words and sentences' (b). Sentence-based chunking splits the text into individual sentences and groups them into chunks, and the lesson calls it a 'good middle ground for most text documents'; a chunk then never ends inside a sentence (d). Structure-based chunking needs headers and sections and 'only works when you have guarantees about your document structure'; the lesson notes that many real-world documents are plain text 'without clear structural markers', as call transcripts are, so adding overlap does not rescue it (a). Much shorter chunks (c) make the problem worse: every extra boundary is another place where a remark is cut, and each chunk keeps even less of the context around it.",
      why_ru: "Урок 40 „Стратегии разбиения текста“: простые фрагменты по размеру обрезают слова посреди предложения и теряют контекст окружающего текста; добавить перекрытие «значит, что каждый фрагмент включает несколько символов из соседних фрагментов, а это даёт больше контекста и сохраняет целые слова и предложения» (b). Разбиение по предложениям делит текст на отдельные предложения и группирует их во фрагменты, и урок называет его «хорошим компромиссом для большинства текстовых документов»; тогда фрагмент никогда не заканчивается внутри предложения (d). Разбиению по структуре нужны заголовки и разделы, и оно «работает, только если структура документа гарантирована»; урок отмечает, что многие реальные документы — обычный текст «без явных структурных маркеров», как и расшифровки звонков, поэтому добавление перекрытия его не спасает (a). Намного более короткие фрагменты (c) усугубляют проблему: каждая лишняя граница — ещё одно место, где реплика обрывается, и каждый фрагмент сохраняет ещё меньше окружающего контекста."
    },
    {
      id: "rh06",
      domain: "Chunking",
      select: 1,
      stem: "An engineering firm indexes ten years of free-form field notes, exported as plain text. Retrieval quality is the only priority: ingestion time, compute cost and implementation effort do not matter. Which chunking strategy should the firm choose?",
      options: [
        { id: "a", text: "Size-based chunks with overlap, since overlap keeps sentences whole and preserves the surrounding context" },
        { id: "b", text: "Sentence-based chunks with overlap, since whole sentences and shared context keep each idea intact" },
        { id: "c", text: "Structure-based chunks, since splitting at each note's natural sections keeps every entry complete" },
        { id: "d", text: "Semantic-based chunks, since grouping sentences by how closely they relate keeps each topic together" }
      ],
      correct: ["d"],
      why: "Lesson 40, Text chunking strategies: semantic-based chunking 'is computationally expensive but produces the most relevant chunks', and it is more complex to implement than the other strategies; with quality the only priority, its costs do not count against it (d). Size-based chunking with overlap (a) is the reliable production choice, but the lesson says it 'may not give perfect results'. Sentence-based chunking (b), even with overlap, is the 'good middle ground' — a compromise this firm has no reason to make. Structure-based chunking (c) gives the cleanest chunks only when 'you have guarantees about your document structure', and free-form notes exported as plain text have no such markers.",
      why_ru: "Урок 40 „Стратегии разбиения текста“: разбиение по смыслу «требует больших вычислений, но даёт самые релевантные фрагменты», и реализовать его сложнее, чем другие стратегии; когда качество — единственный приоритет, его издержки не говорят против него (d). Разбиение по размеру с перекрытием (a) — надёжный выбор для продакшена, но урок говорит, что оно «может не давать идеальных результатов». Разбиение по предложениям (b), даже с перекрытием, — «хороший компромисс», а идти на компромисс у этой фирмы нет причин. Разбиение по структуре (c) даёт самые чистые фрагменты, только когда «структура документа гарантирована», а у заметок свободной формы, выгруженных как обычный текст, таких маркеров нет."
    },
    {
      id: "rh07",
      domain: "Embeddings",
      select: 1,
      stem: "A product manager wants to filter retrieved chunks by tone. The plan is to treat one of the numbers in each chunk's embedding as a tone score, since every number in an embedding lies between -1 and +1. Will the plan work?",
      options: [
        { id: "a", text: "Yes, if the team uses the number the provider documents as tone, since each one scores a known quality" },
        { id: "b", text: "No, because embeddings capture only the topic of a text, so tone leaves no trace in any of the numbers" },
        { id: "c", text: "Yes, if the team takes the first number, since a model orders its features by how much they matter" },
        { id: "d", text: "No, because no single number has a known meaning, so none of them can be read off as a tone score on its own" }
      ],
      correct: ["d"],
      why: "Lesson 41, Text embeddings: each number is 'essentially a score for some quality of the input text', but 'we don't know precisely what each number represents'; the meaning of each dimension 'is learned by the model during training and isn't directly interpretable by humans', and ideas such as 'how happy the text is' are only conceptual examples (d). Options a and c assume a known meaning for particular numbers, which the lesson says nobody has. Option b rejects the plan for a reason the lesson does not give: the numbers 'represent different qualities or features of the input text', and nothing says tone is left out — what is unknown is which number holds what.",
      why_ru: "Урок 41 „Эмбеддинги текста“: каждое число — «по сути оценка какого-то свойства входного текста», но «мы не знаем точно, что означает каждое число»; смысл каждого измерения «модель выучивает при обучении, и человек не может его напрямую интерпретировать», а идеи вроде «насколько текст радостный» — лишь условные примеры (d). Варианты a и c предполагают, что у отдельных чисел есть известный смысл, а урок говорит, что такого смысла никто не знает. Вариант b отвергает план по причине, которой урок не приводит: числа «отражают разные свойства или признаки входного текста», и нигде не сказано, что тон в них не входит, — неизвестно лишь, какое число что содержит."
    },
    {
      id: "rh08",
      domain: "Embeddings",
      select: 1,
      stem: "After a configuration change, a search service embeds user questions with a newer embedding model. The job that re-embeds the stored chunks has not run since the change. Top results now look unrelated to the questions. What is the most likely cause?",
      options: [
        { id: "a", text: "The newer model's vectors skip normalization, so cosine similarity now ranks the longest chunks first" },
        { id: "b", text: "The stored chunks were not re-chunked for the newer model, so they are now too long for it to represent" },
        { id: "c", text: "Question and chunk vectors now come from different models, so they are not comparable with each other" },
        { id: "d", text: "The newer model calls for a different similarity function, so cosine similarity ranks the wrong neighbours" }
      ],
      correct: ["c"],
      why: "Lesson 42, The full RAG flow: the user's query is run 'through the same embedding model' as the chunks and only then compared with the stored embeddings. Since the re-embedding job has not run, the stored vectors still come from the old model, so questions and chunks are now compared across two different models (c); the fix is to embed the stored chunks again with the new model. Option a misreads cosine similarity, which 'measures the cosine of the angle between two vectors', so vector length does not decide the ranking. Option b blames chunk length, but the new model has never seen the chunks; their vectors were never recomputed. Option d has no support in the lessons: they present cosine similarity as the vector database's measure and never tie it to a particular model; what changed is that only the questions moved to the new model.",
      why_ru: "Урок 42 „Полный поток RAG“: запрос пользователя пропускают «через ту же модель эмбеддингов», что и фрагменты, и только потом сравнивают с сохранёнными эмбеддингами. Поскольку задача, которая заново строит эмбеддинги, не запускалась, сохранённые векторы всё ещё получены старой моделью, и теперь вопросы и фрагменты сравниваются в эмбеддингах двух разных моделей (c); исправление — заново построить эмбеддинги сохранённых фрагментов новой моделью. Вариант a неверно понимает косинусное сходство, которое «измеряет косинус угла между двумя векторами», так что длина вектора не определяет ранжирование. Вариант b винит длину фрагментов, но новая модель эти фрагменты никогда не видела: их векторы так и не пересчитывались. У варианта d нет опоры в уроках: в них косинусное сходство представлено как мера векторной базы данных и нигде не привязано к конкретной модели; изменилось лишь то, что на новую модель перешли только вопросы."
    },
    {
      id: "rh09",
      domain: "Embeddings",
      select: 1,
      stem: "A report was chunked one line per chunk. For 'How many bugs did engineers fix this year?', semantic search ranks first the medical line 'This year saw significant strides in our understanding of XDR-47, a \"bug\" we have not seen before.' What is the most likely cause?",
      options: [
        { id: "a", text: "Retrieval worked: the line is the only one containing 'bug', so Claude should be told to ignore off-topic text" },
        { id: "b", text: "The embedding model leans toward software text, so it reads 'bug' in the engineering sense unless context is clearly medical" },
        { id: "c", text: "One-line chunks are too short for a reliable embedding, so the search fell back to matching the literal word 'bug'" },
        { id: "d", text: "The one-line chunk lost its section context, so the word 'bug' outweighs the meaning a whole section would carry" }
      ],
      correct: ["d"],
      why: "Lesson 40, Text chunking strategies, uses this example: 'If you chunk poorly, a user asking \"How many bugs did engineers fix this year?\" might get information about medical research instead of software engineering, simply because the medical section happened to contain the word \"bug\" in a different context.' The lesson opens with the rule this example illustrates — 'A poor chunking strategy can lead to irrelevant context being inserted into your prompts' — and says structure-based chunks are 'the cleanest, most meaningful chunks because each one represents a complete section'. A single line carries none of its section's context, so one word can dominate; the fix is better chunks (d). Option a moves the fix to generation, where Claude never sees the right section. Option b blames the model for what the chunking did. Option c blames the right thing for the wrong reason: semantic search has no keyword fallback — Lesson 41, Text embeddings, contrasts it with 'keyword-based search that looks for exact word matches' — it compared meanings, and the one-line chunk simply carried too little of the medical meaning.",
      why_ru: "Урок 40 „Стратегии разбиения текста“ приводит этот пример: «Если разбить неудачно, пользователь, спросивший „How many bugs did engineers fix this year?“, может получить информацию о медицинских исследованиях вместо разработки ПО — просто потому, что в медицинском разделе слово „bug“ встретилось в другом контексте». Урок открывается правилом, которое иллюстрирует этот пример, — «неудачная стратегия разбиения может привести к тому, что в ваши промпты попадёт нерелевантный контекст», — и говорит, что разбиение по структуре даёт «самые чистые и осмысленные фрагменты, потому что каждый из них — законченный раздел». Одна строка не несёт никакого контекста своего раздела, поэтому одно слово может перевесить всё остальное; исправление — лучшие фрагменты (d). Вариант a переносит исправление на этап генерации, где Claude так и не видит нужный раздел. Вариант b винит модель в том, что сделало разбиение. Вариант c указывает на правильного виновника, но по неверной причине: у семантического поиска нет запасного поиска по ключевым словам — урок 41 „Эмбеддинги текста“ противопоставляет его «поиску по ключевым словам, который ищет точные совпадения слов», — он сравнил смыслы, и однострочный фрагмент просто нёс слишком мало медицинского смысла."
    },
    {
      id: "rh10",
      domain: "Similarity",
      select: 1,
      stem: "A team moves from the course's in-memory vector index to a hosted vector database whose score is documented as 'cosine similarity'. The client still takes the lowest score as the best match, and the top answer is now consistently the least relevant chunk. What went wrong?",
      options: [
        { id: "a", text: "The hosted database returns results already ordered best-first, so the client should stop sorting and take the first one" },
        { id: "b", text: "The hosted database's score is highest for the closest vectors, so the client must take the highest score instead" },
        { id: "c", text: "The hosted database reports cosine distance under the name 'similarity', so taking the lowest score is still the right rule" },
        { id: "d", text: "The hosted database normalizes the stored vectors on insert, so distances computed by the client no longer line up" }
      ],
      correct: ["b"],
      why: "Lesson 42, The full RAG flow: cosine similarity ranges from -1 to 1, and 'values close to 1 mean high similarity'; cosine distance is 1 minus cosine similarity, and with it 'values close to 0 mean high similarity'. The course's index in Lesson 43, Implementing the RAG flow, returns cosine distances, where 'lower distance values indicate higher similarity', so lowest-wins was right there and is backwards for a similarity score (b). Option a would not explain a consistent inversion: taking the lowest score gives the same pick on a sorted or an unsorted list. Option c contradicts the database's own documentation, and lowest-wins on a real distance would return the most relevant chunk, not the least. Option d changes nothing: Lesson 42 says the embedding API typically normalizes vectors anyway, and cosine similarity depends on the angle, which normalization does not change.",
      why_ru: "Урок 42 „Полный поток RAG“: косинусное сходство лежит в диапазоне от -1 до 1, и «значения около 1 означают высокое сходство»; косинусное расстояние равно 1 минус косинусное сходство, и для него «значения около 0 означают высокое сходство». Индекс курса в уроке 43 „Реализация RAG“ возвращает косинусные расстояния, где «чем меньше расстояние, тем выше сходство», так что правило «побеждает наименьшая оценка» там было верным, а для оценки сходства оно работает наоборот (b). Вариант a не объяснил бы стабильно перевёрнутый результат: если брать наименьшую оценку, выбор будет одним и тем же и в отсортированном, и в неотсортированном списке. Вариант c противоречит собственной документации базы данных, а правило «побеждает наименьшая оценка», применённое к настоящему расстоянию, вернуло бы самый релевантный фрагмент, а не наименее релевантный. Вариант d ничего не меняет: урок 42 говорит, что API эмбеддингов и так обычно нормализует векторы, а косинусное сходство зависит от угла, который нормализация не меняет."
    },
    {
      id: "rh11",
      domain: "Similarity",
      select: 1,
      stem: "A developer notices that long chunks often rank high in semantic search and suspects their embeddings carry more weight than those of short chunks. Before the team caps chunk length, what should it know?",
      options: [
        { id: "a", text: "Longer text yields an embedding with larger numbers, so capping chunk length evens out the scores" },
        { id: "b", text: "Embeddings are scaled to length 1 and cosine similarity compares angles, so size gives no extra weight" },
        { id: "c", text: "Cosine distance removes a length effect that cosine similarity has, so the store should switch to it" },
        { id: "d", text: "Long chunks contain more of the question's words, so semantic search counts more matches for them" }
      ],
      correct: ["b"],
      why: "Lesson 42, The full RAG flow: the embedding API 'typically performs a normalization step that scales each vector to have a magnitude of 1.0', and cosine similarity 'measures the cosine of the angle between two vectors'. A long chunk does not get a bigger vector to win with, so capping chunk length would not remove any weight (b). Option a assumes vector size grows with the text, which normalization rules out. Option c cannot change a ranking: cosine distance is 1 minus cosine similarity, so it orders chunks the same way. Option d describes keyword matching; Lesson 41, Text embeddings, contrasts semantic search with 'keyword-based search that looks for exact word matches'.",
      why_ru: "Урок 42 „Полный поток RAG“: API эмбеддингов «обычно выполняет нормализацию, которая масштабирует каждый вектор так, чтобы его длина была 1.0», а косинусное сходство «измеряет косинус угла между двумя векторами». Длинный фрагмент не получает более крупный вектор, за счёт которого мог бы выигрывать, поэтому ограничение длины фрагментов не убрало бы никакого веса (b). Вариант a предполагает, что размер вектора растёт вместе с текстом, а нормализация это исключает. Вариант c не может изменить ранжирование: косинусное расстояние равно 1 минус косинусное сходство, поэтому упорядочивает фрагменты так же. Вариант d описывает сопоставление по ключевым словам; урок 41 „Эмбеддинги текста“ противопоставляет семантический поиск «поиску по ключевым словам, который ищет точные совпадения слов»."
    },
    {
      id: "rh12",
      domain: "Similarity",
      select: 2,
      stem: "To save storage, a team keeps only the embeddings in its vector database and discards the chunk text entirely, with no reference to it anywhere. Which two steps of the RAG flow still work as before? (Choose two.)",
      options: [
        { id: "a", text: "Embedding the user's question so that it can be compared with the stored embeddings" },
        { id: "b", text: "Building the final prompt from the question and the chunks behind the closest embeddings" },
        { id: "c", text: "Finding the stored embeddings that are most similar to the question's embedding" },
        { id: "d", text: "Matching the question's exact terms with a BM25 index, as the team's hybrid retriever does" }
      ],
      correct: ["a", "c"],
      why: "Lesson 42, The full RAG flow: the user's query is run through the embedding model, and the vector database finds the most similar stored embeddings using cosine similarity — both steps work on numbers only, so they still run (a, c). Lesson 43, Implementing the RAG flow: 'we store both the embedding and the original text content. This is crucial because when we search later, we need to return the actual text, not just the numerical embedding values'; 'getting back just the embedding numbers isn't useful. We need the actual text that was used to generate those embeddings'. Without the text or a reference to it, there is nothing to put into the final prompt (b). BM25 matching (d) needs the words of each chunk: Lesson 44, BM25 lexical search, counts how often each term appears across the documents, and with the text discarded there is nothing left to count — embeddings carry no words.",
      why_ru: "Урок 42 „Полный поток RAG“: запрос пользователя пропускают через модель эмбеддингов, а векторная база данных находит самые похожие сохранённые эмбеддинги по косинусному сходству — оба шага работают только с числами, поэтому по-прежнему выполняются (a, c). Урок 43 „Реализация RAG“: «мы храним и эмбеддинг, и исходный текст. Это очень важно: при последующем поиске нам нужно вернуть сам текст, а не только числовые значения эмбеддинга»; «получить в ответ только числа эмбеддинга бесполезно. Нам нужен сам текст, из которого эти эмбеддинги получены». Без текста или ссылки на него в итоговый промпт нечего положить (b). Для сопоставления через BM25 (d) нужны слова каждого фрагмента: урок 44 „Лексический поиск BM25“ считает, как часто каждый термин встречается во всех документах, а когда текст выброшен, считать нечего — в эмбеддингах нет слов."
    },
    {
      id: "rh13",
      domain: "Lexical search",
      select: 1,
      stem: "An e-commerce team replaced semantic search with pure BM25 so that SKU lookups like 'PX-4471-B' work. They do, but descriptive queries like 'something to power my laptop on the road' now return irrelevant hits. The old embedding index is still maintained. What should the team do?",
      options: [
        { id: "a", text: "Add synonym lists to the BM25 index so that descriptive queries expand into the product terms it knows" },
        { id: "b", text: "Switch every query back to the vector index, since descriptive questions outnumber the SKU lookups" },
        { id: "c", text: "Query the vector index alongside the BM25 index and fuse the two result lists into one for every query" },
        { id: "d", text: "Query the BM25 index first and consult the vector index only when BM25 returns no hits at all" }
      ],
      correct: ["c"],
      why: "Lesson 44, BM25 lexical search: 'both search methods have complementary strengths. Semantic search understands context and meaning, while lexical search ensures you don't miss exact term matches', and the recommended strategy is to 'run both semantic and lexical searches in parallel, then merge the results', which Lesson 45, A Multi-Index RAG pipeline, implements with reciprocal rank fusion (c). Synonym lists (a) keep the search lexical: BM25 'focuses on term frequency rather than semantic meaning', so any paraphrase without a list entry still misses. Switching back (b) loses the exact matches that semantic search misses, the problem that led to BM25. A fallback (d) never fires here: the stem says BM25 already returns hits for these queries, just irrelevant ones, and the lesson runs both searches in parallel rather than one as a backup for the other.",
      why_ru: "Урок 44 „Лексический поиск BM25“: «у обоих методов поиска взаимодополняющие сильные стороны. Семантический поиск понимает контекст и смысл, а лексический гарантирует, что вы не пропустите точные совпадения терминов», и рекомендуемая стратегия — «запускать семантический и лексический поиск параллельно, а затем объединять результаты», что урок 45 „Многоиндексный конвейер RAG“ реализует с помощью reciprocal rank fusion (c). Списки синонимов (a) оставляют поиск лексическим: BM25 «опирается на частоту терминов, а не на смысл», поэтому любая перефразировка, которой нет в списке, всё равно промахивается. Возврат к векторному индексу (b) теряет точные совпадения, которые пропускает семантический поиск, — ту самую проблему, из-за которой и появился BM25. Запасной вариант (d) здесь никогда не сработает: в условии сказано, что BM25 уже возвращает результаты по таким запросам, просто нерелевантные, а урок запускает оба поиска параллельно, а не один как резерв для другого."
    },
    {
      id: "rh14",
      domain: "Lexical search",
      select: 1,
      stem: "A printer maker indexes support tickets with BM25. 'printer' appears in almost every ticket and 'jam' in many. For 'printer duplex jam', the top hits are the few tickets about setting up duplex printing, none mentioning a jam. An engineer reports this as a bug. What is the right response?",
      options: [
        { id: "a", text: "This is expected: terms found in most tickets weigh little, while a rare term such as 'duplex' weighs far more" },
        { id: "b", text: "This is a bug: BM25 should rank first the tickets that repeat the first word of the query most often" },
        { id: "c", text: "This is expected: BM25 compares meanings, and 'duplex' is the word closest in meaning to a paper jam" },
        { id: "d", text: "This is a bug: a word used across more of the tickets should count for more, so 'printer' should decide the top hits" }
      ],
      correct: ["a"],
      why: "Lesson 44, BM25 lexical search: BM25 counts how often each term appears across the documents and weights terms by importance, so 'terms that appear less frequently get higher importance scores', and it returns the documents that contain more instances of the higher-weighted terms. 'printer' is in almost every ticket and 'jam' in many, so they carry little weight, and the rare 'duplex' decides the ranking even for tickets that never mention a jam (a). Option d inverts that rule. Option b invents a position rule; BM25 weights a term by how rare it is, not by where it sits in the query. Option c describes semantic search: BM25 'focuses on term frequency rather than semantic meaning'.",
      why_ru: "Урок 44 „Лексический поиск BM25“: BM25 считает, как часто каждый термин встречается во всех документах, и взвешивает термины по важности, так что «чем реже встречается термин, тем выше его важность», и возвращает документы, в которых больше вхождений терминов с большим весом. «printer» есть почти в каждом тикете, а «jam» — во многих, поэтому вес у них маленький, и ранжирование определяет редкое «duplex» — даже для тикетов, где о замятии нет ни слова (a). Вариант d переворачивает это правило. Вариант b выдумывает правило позиции; BM25 взвешивает термин по тому, насколько он редок, а не по тому, где он стоит в запросе. Вариант c описывает семантический поиск: BM25 «опирается на частоту терминов, а не на смысл»."
    },
    {
      id: "rh15",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "After adding BM25 next to vector search and fusing the two lists, the right chunk now tops the merged list for incident-ID questions. Answers to those questions are still often wrong. Where should the team look next?",
      options: [
        { id: "a", text: "At the fusion step, since the constant k decides which chunk ends up first in the merged list" },
        { id: "b", text: "At the BM25 index, since the ID's high weight there crowds out the chunks that explain the incident" },
        { id: "c", text: "At the prompt built from the question and the retrieved chunks, since Claude answers from that prompt" },
        { id: "d", text: "At the embedding model, since vector search alone missed these chunks before BM25 was added" }
      ],
      correct: ["c"],
      why: "Lesson 42, The full RAG flow, ends with a separate step: 'we take the user's question and the most relevant text chunk we found, combine them into a prompt, and send it to Claude'. The merged list already puts the right chunk first — Lesson 45, A Multi-Index RAG pipeline, shows that 'combining semantic and lexical search can overcome the limitations of either approach used alone' — so the search stages have done their job, and the wrong answers come from the step after them (c). Tuning fusion (a), reweighting BM25 (b) or changing the embedding model (d) all change retrieval, which is the part that now works.",
      why_ru: "Урок 42 „Полный поток RAG“ заканчивается отдельным шагом: «мы берём вопрос пользователя и самый релевантный найденный фрагмент, объединяем их в промпт и отправляем Claude». Объединённый список уже ставит нужный фрагмент первым — урок 45 „Многоиндексный конвейер RAG“ показывает, что «сочетание семантического и лексического поиска может преодолеть ограничения каждого подхода в отдельности», — так что этапы поиска свою работу сделали, а неверные ответы возникают на шаге после них (c). Настройка слияния (a), перевзвешивание BM25 (b) или смена модели эмбеддингов (d) — всё это меняет поиск, то есть ту часть, которая теперь работает."
    },
    {
      id: "rh16",
      domain: "Hybrid retrieval",
      select: 2,
      stem: "A hybrid retriever gets two lists: chunk A is second in both the vector list and the BM25 list, while chunk B is first in BM25 but absent from the vector list. Reciprocal rank fusion ranks A above B. Which two statements explain this? (Choose two.)",
      options: [
        { id: "a", text: "Fusion adds a share for every list a chunk appears in, so a chunk that both indexes rank well collects more" },
        { id: "b", text: "Fusion looks only at rank positions, so B's strong BM25 score counts for no more than its first place" },
        { id: "c", text: "Fusion trusts the vector index more than BM25, so a chunk that only the BM25 list found ranks lower" },
        { id: "d", text: "Fusion halves the score of a chunk absent from one list, as a penalty that ranks it below the others" }
      ],
      correct: ["a", "b"],
      why: "Lesson 45, A Multi-Index RAG pipeline: reciprocal rank fusion scores a chunk by its rank in each list and adds the parts up, as in the lesson's example where Section 2 gets 1/(1+1) from one index plus 1/(1+2) from the other; 'Section 2 performed well in both indexes, so it rises to the top' (a). It works on ranks because 'each method uses different scoring systems', so how high B's raw BM25 score was does not enter the fusion, only its first place does (b). The formula has no weight per index (c) and no penalty for a missing list (d): a chunk that one index did not return simply gets one share instead of two.",
      why_ru: "Урок 45 „Многоиндексный конвейер RAG“: reciprocal rank fusion оценивает фрагмент по его рангу в каждом списке и складывает части, как в примере урока, где Section 2 получает 1/(1+1) от одного индекса плюс 1/(1+2) от другого; «Section 2 хорошо показал себя в обоих индексах, поэтому поднимается наверх» (a). Метод работает с рангами, потому что «у каждого метода своя система оценок», поэтому то, насколько высокой была исходная оценка BM25 у B, в слиянии не участвует — участвует только его первое место (b). В формуле нет веса для отдельного индекса (c) и нет штрафа за отсутствие в одном из списков (d): фрагмент, который один индекс не вернул, просто получает одну долю вместо двух."
    },
    {
      id: "rh17",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "A team's retriever fuses a vector index and a BM25 index. They now want to add a third, graph-based index without changing the retriever or its fusion step. What does the new index need?",
      options: [
        { id: "a", text: "The same operations for adding documents and for searching that the vector and BM25 indexes already offer" },
        { id: "b", text: "A search that returns only chunks the other two indexes did not find, so the fused list gains new ones" },
        { id: "c", text: "An embedding for every chunk it holds, so that the retriever can compare its results by cosine similarity" },
        { id: "d", text: "Results that are already merged with the vector and BM25 lists, so the retriever can pass them straight on" }
      ],
      correct: ["a"],
      why: "Lesson 45, A Multi-Index RAG pipeline: the Retriever can wrap the vector and BM25 indexes because they 'share nearly identical APIs' for adding documents and searching, and 'since all indexes implement the same SearchIndex protocol ... you can easily add new search methodologies'; a graph-based search is one of the lesson's own examples, and 'the Retriever will automatically incorporate it into the fusion process' (a). The retriever 'forwards user queries to both indexes, collects their results, and merges them', so a new index neither has to avoid chunks the others found (b) nor pre-merge its results (d). The retriever merges ranked lists; it does not compare results by embeddings (c).",
      why_ru: "Урок 45 „Многоиндексный конвейер RAG“: Retriever может обернуть векторный и BM25-индексы, потому что у них «почти одинаковый API» для добавления документов и поиска, а «поскольку все индексы реализуют один протокол SearchIndex ... можно легко добавлять новые методы поиска»; поиск по графу — один из собственных примеров урока, и «Retriever автоматически включит его в процесс слияния» (a). Retriever «передаёт запросы пользователя в оба индекса, собирает их результаты и объединяет их», поэтому новому индексу не нужно ни избегать фрагментов, которые нашли другие индексы (b), ни заранее объединять свои результаты (d). Retriever объединяет ранжированные списки; он не сравнивает результаты по эмбеддингам (c)."
    }
  ]
};
