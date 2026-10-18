window.QUIZ_BANK = {
  id: "api-rag",
  passPercent: 70,
  questions: [
    {
      id: "r01",
      domain: "RAG basics",
      select: 2,
      stem: "Which two are limitations of putting an entire 800-page document into the prompt, according to the course?",
      options: [
        { id: "a", text: "There is a hard limit on prompt length, so the document may not fit" },
        { id: "b", text: "Larger prompts cost more and take longer to process" },
        { id: "c", text: "Claude cannot read XML tags in long prompts" },
        { id: "d", text: "Long prompts disable streaming" }
      ],
      correct: ["a", "b"],
      why: "The lesson lists the length limit, weaker performance on very long prompts, higher cost and higher latency."
    },
    {
      id: "r02",
      domain: "RAG basics",
      select: 1,
      stem: "What does RAG add to a simple 'question + document' prompt?",
      options: [
        { id: "a", text: "Fine-tuning the model on the document" },
        { id: "b", text: "A preprocessing step that chunks documents, and a search step that puts only the most relevant chunks into the prompt" },
        { id: "c", text: "A larger context window" },
        { id: "d", text: "A second model that writes the final answer" }
      ],
      correct: ["b"],
      why: "Retrieval Augmented Generation retrieves relevant chunks at question time and generates the answer from them."
    },
    {
      id: "r03",
      domain: "RAG basics",
      select: 1,
      stem: "Which is a real challenge of RAG listed in the course?",
      options: [
        { id: "a", text: "It cannot work with more than one document" },
        { id: "b", text: "The retrieved chunks might not contain all the context Claude needs" },
        { id: "c", text: "It always increases prompt size" },
        { id: "d", text: "It requires extended thinking" }
      ],
      correct: ["b"],
      why: "RAG needs chunking, a search mechanism, a chunking strategy choice, and retrieved chunks can miss context."
    },
    {
      id: "r04",
      domain: "Chunking",
      select: 1,
      stem: "Your documents are plain text, PDFs and code with no reliable headers. Which chunking strategy does the course call the most reliable fallback?",
      options: [
        { id: "a", text: "Structure-based chunking on Markdown headers" },
        { id: "b", text: "Size-based chunking with overlap" },
        { id: "c", text: "One chunk per document" },
        { id: "d", text: "Semantic chunking with no fallback" }
      ],
      correct: ["b"],
      why: "Size-based chunking works on any content, including code; overlap reduces lost context at chunk boundaries."
    },
    {
      id: "r05",
      domain: "Chunking",
      select: 1,
      stem: "Why does the course add overlap between size-based chunks?",
      options: [
        { id: "a", text: "To make chunks smaller" },
        { id: "b", text: "So each chunk carries some neighbouring text, keeping words and sentences intact and preserving context" },
        { id: "c", text: "To remove duplicate content" },
        { id: "d", text: "Because embedding models require it" }
      ],
      correct: ["b"],
      why: "Plain size-based chunks cut words mid-way and separate headers from content; overlap mitigates both."
    },
    {
      id: "r06",
      domain: "Chunking",
      select: 1,
      stem: "When does structure-based chunking give the best results?",
      options: [
        { id: "a", text: "Always, for any document type" },
        { id: "b", text: "When you control or can rely on the document format, such as Markdown reports with section headers" },
        { id: "c", text: "Only for source code" },
        { id: "d", text: "When documents have no paragraphs" }
      ],
      correct: ["b"],
      why: "Splitting on headers gives clean, meaningful chunks, but only when the structure is guaranteed."
    },
    {
      id: "r07",
      domain: "Embeddings",
      select: 1,
      stem: "A user asks 'How many bugs did engineers fix this year?'. A keyword search returns the medical section because it mentions a 'bug' virus. Which approach targets meaning rather than exact words?",
      options: [
        { id: "a", text: "Semantic search with text embeddings" },
        { id: "b", text: "BM25 lexical search" },
        { id: "c", text: "Sorting chunks alphabetically" },
        { id: "d", text: "Raising temperature" }
      ],
      correct: ["a"],
      why: "Embeddings represent meaning, so the software engineering chunk is closer to the question than the medical one."
    },
    {
      id: "r08",
      domain: "Embeddings",
      select: 1,
      stem: "Which statement about the numbers in a text embedding is accurate?",
      options: [
        { id: "a", text: "Each dimension has a documented human meaning, such as 'formality'" },
        { id: "b", text: "The dimensions are learned by the model and are not directly interpretable by humans" },
        { id: "c", text: "Each number is a token ID" },
        { id: "d", text: "The numbers are the same for every model" }
      ],
      correct: ["b"],
      why: "Labels like 'how happy the text is' are only an analogy; what each dimension encodes is learned in training."
    },
    {
      id: "r09",
      domain: "Embeddings",
      select: 1,
      stem: "You need embeddings for a RAG pipeline built on Claude. What does the course (and Anthropic's docs) recommend?",
      options: [
        { id: "a", text: "Call client.embeddings.create from the Anthropic SDK" },
        { id: "b", text: "Use a separate embeddings provider such as Voyage AI, since Anthropic does not offer an embedding model" },
        { id: "c", text: "Ask Claude to output a list of numbers for each chunk" },
        { id: "d", text: "Use token IDs as embeddings" }
      ],
      correct: ["b"],
      why: "Anthropic has no embedding model; Voyage AI is the suggested provider and needs its own API key."
    },
    {
      id: "r10",
      domain: "Similarity",
      select: 1,
      stem: "A vector database reports a cosine distance of 0.05 for chunk A and 0.60 for chunk B. Which is more similar to the query?",
      options: [
        { id: "a", text: "Chunk A, because cosine distance = 1 - cosine similarity, so smaller means more similar" },
        { id: "b", text: "Chunk B, because larger scores are better" },
        { id: "c", text: "They are equally similar" },
        { id: "d", text: "It cannot be determined without the raw vectors" }
      ],
      correct: ["a"],
      why: "Cosine similarity near 1 means very similar; cosine distance near 0 means very similar."
    },
    {
      id: "r11",
      domain: "Similarity",
      select: 1,
      stem: "Why does the course's vector store save the chunk text next to each embedding?",
      options: [
        { id: "a", text: "To make the embeddings normalized" },
        { id: "b", text: "Because search returns matches, and you need the original text to put into the prompt, not just numbers" },
        { id: "c", text: "Because BM25 requires it" },
        { id: "d", text: "To reduce storage" }
      ],
      correct: ["b"],
      why: "Embeddings alone are useless to Claude; the retrieved text (or a reference to it) goes into the final prompt."
    },
    {
      id: "r12",
      domain: "Similarity",
      select: 1,
      stem: "What happens to the user's question in the query step of the RAG flow?",
      options: [
        { id: "a", text: "It is chunked and stored in the vector database" },
        { id: "b", text: "It is embedded with the same embedding model as the chunks, then compared with stored embeddings" },
        { id: "c", text: "It is sent straight to Claude without retrieval" },
        { id: "d", text: "It is converted into BM25 weights only" }
      ],
      correct: ["b"],
      why: "Query and chunks must share an embedding model so their vectors are comparable."
    },
    {
      id: "r13",
      domain: "Lexical search",
      select: 1,
      stem: "A user searches for the exact incident ID 'INC-2023-Q4-011'. Semantic search returns a related financial section that never mentions it. What does the course add?",
      options: [
        { id: "a", text: "A bigger embedding model" },
        { id: "b", text: "BM25 lexical search run alongside semantic search, then merge the results" },
        { id: "c", text: "Smaller chunks only" },
        { id: "d", text: "A system prompt telling Claude to ignore irrelevant sections" }
      ],
      correct: ["b"],
      why: "Lexical search catches exact term matches like IDs that semantic similarity can miss; hybrid search combines both."
    },
    {
      id: "r14",
      domain: "Lexical search",
      select: 1,
      stem: "How does BM25 weight the terms of the query 'a INC-2023-Q4-011'?",
      options: [
        { id: "a", text: "Both terms get equal weight" },
        { id: "b", text: "Rare terms like the incident ID get higher weight; common words like 'a' get low weight" },
        { id: "c", text: "Longer terms always get lower weight" },
        { id: "d", text: "Weights come from the embedding model" }
      ],
      correct: ["b"],
      why: "BM25 tokenizes the query, counts term frequency across documents, and gives rarer terms more importance."
    },
    {
      id: "r15",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "Using reciprocal rank fusion with k = 1, a chunk is ranked 1st by the vector index and 2nd by BM25. What is its RRF score?",
      options: [
        { id: "a", text: "1/(1+1) + 1/(1+2) = 0.833" },
        { id: "b", text: "1 + 2 = 3" },
        { id: "c", text: "1/1 + 1/2 = 1.5" },
        { id: "d", text: "(1 + 2) / 2 = 1.5" }
      ],
      correct: ["a"],
      why: "RRF_score = Σ 1/(k + rank). With k = 1, ranks 1 and 2 give 0.5 + 0.333 = 0.833."
    },
    {
      id: "r16",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "Why does the course merge vector and BM25 results with reciprocal rank fusion instead of adding their raw scores?",
      options: [
        { id: "a", text: "Raw scores from different methods are on different scales; RRF uses only rank positions" },
        { id: "b", text: "RRF is faster to compute than addition" },
        { id: "c", text: "BM25 does not produce scores" },
        { id: "d", text: "Adding scores would change the embeddings" }
      ],
      correct: ["a"],
      why: "Each method scores differently, so RRF combines rankings instead. Shared add_document/search APIs make adding more indexes easy."
    }
  ]
};
