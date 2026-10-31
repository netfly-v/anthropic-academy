window.QUIZ_BANK = {
  id: "api-rag-hard",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "rh01",
      domain: "RAG basics",
      select: 1,
      stem: "A two-person legal-tech team wants Claude to answer questions about individual contracts. Each contract is 30–40 pages, is uploaded by one user, and is usually queried two or three times before being discarded. The team has a one-week deadline. Which approach fits best?",
      options: [
        { id: "a", text: "Chunk each contract by its clause headings and retrieve the matching clauses, since contracts are well structured" },
        { id: "b", text: "Send the contract once, then answer follow-ups in later turns with the contract dropped from the history to save tokens" },
        { id: "c", text: "Index each contract with BM25 rather than embeddings, since clause numbers and defined terms call for exact matching" },
        { id: "d", text: "Place the whole contract in the prompt together with the question and skip retrieval for these documents" }
      ],
      correct: ["d"],
      why: "Lesson 'Introducing RAG': RAG trades simplicity for scalability and pays off for very large documents, many documents, or when cost and speed must be optimized; its objections to the full-text prompt (a hard length limit, weaker attention in very long prompts, higher cost and latency) are framed around an 800-page document, and the lesson note puts the 'just include it' threshold at roughly 200k tokens. A 30–40-page contract sent two or three times is nowhere near that, so the preprocessing step, the search mechanism and the chunking decisions of RAG add complexity without a payoff. Options a and c are valid retrieval techniques for a problem this team does not have (a also assumes a guaranteed structure that user uploads lack; c treats BM25 as a replacement, while the BM25 lesson presents it as a complement). Option b forgets the multi-turn lesson: the model keeps no memory between requests, so a contract dropped from the history is gone."
    },
    {
      id: "rh02",
      domain: "RAG basics",
      select: 1,
      stem: "A support team replaced prompt-stuffing a 900-page maintenance manual with a RAG pipeline that retrieves the single best chunk. Answers got cheaper and faster, but for questions about a fault code Claude now describes the code and never mentions the recovery steps, which sit in a separate 'Recovery procedures' section that lists the steps for each fault code. Per-question cost must stay far below what the full-manual prompts used to cost. What should the team change first?",
      options: [
        { id: "a", text: "Retrieve several top-ranked chunks instead of one, so that related sections reach the prompt" },
        { id: "b", text: "Return to sending the full manual for fault-code questions, since those need the whole context" },
        { id: "c", text: "Lower the chunk size so that each fault code lands in a smaller and more precise chunk" },
        { id: "d", text: "Add a system prompt rule telling Claude to describe recovery steps whenever it sees a fault code" }
      ],
      correct: ["a"],
      why: "Lesson 'Introducing RAG' lists this exact challenge: the included chunks might not contain all the context Claude needs, and its transcript gives the same example (a risk question whose answer is partly in another section). 'Implementing the RAG flow' already asks the store for the two most relevant chunks rather than one, and the BM25 lesson asks for three. Option b might restore the missing section but breaks the cost constraint: the lesson says larger prompts cost more and take longer, and a 900-page manual is the extreme case. Option c makes chunks smaller, but a single smaller chunk still cannot contain a separate section. Option d instructs the generation step, which cannot reliably describe steps that never reached the prompt."
    },
    {
      id: "rh03",
      domain: "RAG basics",
      select: 1,
      stem: "After moving a help desk to RAG over 2,000 product manuals, a product manager writes four statements into the launch notes. Which statement should the engineer strike out as unsupported by the course's description of RAG?",
      options: [
        { id: "a", text: "Requests now carry a few retrieved chunks instead of a manual, so they cost less and return faster" },
        { id: "b", text: "Adding a manual is a preprocessing task: it is chunked and embedded into the index, with no change to the question flow" },
        { id: "c", text: "Because the search step matches on meaning, chunk size mainly affects cost rather than answer quality" },
        { id: "d", text: "Claude works from a handful of relevant passages rather than scanning an entire manual per question" }
      ],
      correct: ["c"],
      why: "Benefits listed in 'Introducing RAG': smaller prompts cost less and run faster (a); the approach scales to very large and multiple documents, which are chunked and embedded in the preprocessing step while the question flow stays the same (b); Claude can focus on only the most relevant content (d). Chunking, however, is called one of the most critical steps in 'Text chunking strategies': a poor split puts irrelevant context into the prompt and produces wrong answers, and 'Introducing RAG' lists the choice of chunking approach ('many ways to chunk text — which approach is best?') among the open challenges — and the chunking video shows the defaults (150/20) and 500/150 producing chunks of visibly different usefulness — so chunk size and strategy still drive answer quality, not only cost (c is unsupported)."
    },
    {
      id: "rh04",
      domain: "Chunking",
      select: 1,
      stem: "A document-ingestion service receives customer uploads of three kinds: Markdown reports, plain-text exports and source files. Two designs are on the table. Design 1 splits on '\\n## ' headers and falls back to size-based chunks with overlap whenever a file yields fewer than three sections. Design 2 uses size-based chunks with overlap for everything. The team has found that lines starting with '## ' also occur inside source files and plain-text exports (comment banners, quoted Markdown) and that a file's structure cannot be validated before indexing; the chunking step must be one function with no per-type branches. Which design should the team choose?",
      options: [
        { id: "a", text: "Design 1, because structure-based chunks are cleaner whenever headers exist and the fallback covers the rest" },
        { id: "b", text: "Design 2, because one strategy with no assumptions about format holds up across all three kinds of upload" },
        { id: "c", text: "Design 1, with the fallback threshold raised to five sections so that stray '## ' lines in code do not count" },
        { id: "d", text: "Design 2, but switching to sentence-based chunks for the plain-text exports, the middle ground for most text" }
      ],
      correct: ["b"],
      why: "'Text chunking strategies': structure-based chunking 'only works when you have guarantees about your document structure', and the video adds that for user-provided documents with no formatting guarantees chunk by section 'is probably not going to work out in the long run'. Here stray '## ' lines can turn a source file into three or more bogus 'sections', so Design 1's fallback does not fire when it should and the file is split at comment banners (a); a higher threshold (c) only moves the point at which the same thing happens, and nothing can tell the two cases apart before indexing. Size-based chunking with overlap is 'often the go-to choice in production because it's simple, reliable, and works with any document type', including code (b). Option d adds the per-type branch the constraint forbids; the lesson does call sentence-based chunking a good middle ground for most text, but that does not make a type-specific branch admissible here."
    },
    {
      id: "rh05",
      domain: "Chunking",
      select: 1,
      stem: "A RAG system over the course's report.md uses chunk_by_char with chunk_size=500 and chunk_overlap=150. The overlap was added after cut-off words appeared, and that symptom is gone. A new complaint: for questions about the legal section, the prompt usually also contains the opening sentences of the cybersecurity section, which confuses the answer. The reports are the team's own, all generated from one internal template. What is the best change?",
      options: [
        { id: "a", text: "Increase chunk_overlap further so that each chunk carries its whole neighbouring section" },
        { id: "b", text: "Reduce chunk_overlap to zero, since overlap is what pulls the next section into each chunk" },
        { id: "c", text: "Switch to chunk_by_sentence with five sentences per chunk, so that chunks end at sentence boundaries" },
        { id: "d", text: "Split on the section headers instead, so that each chunk is a single section of the report" }
      ],
      correct: ["d"],
      why: "'Text chunking strategies': structure-based chunking 'gives you the cleanest, most meaningful chunks because each one represents a complete section', and it is the best choice 'when you control document formatting (like internal company reports)' — a template-generated report is exactly that, and the video shows chunk_by_section on report.md producing one section per chunk (d). More overlap (a) pulls in more of the neighbour. Removing overlap (b) shrinks the bleed but brings back the cut-off words it was added for, and size-based boundaries still fall inside sections. Sentence boundaries (c) are not section boundaries: the video liked chunk_by_sentence on report.md, but a five-sentence chunk still straddles two sections, only less often."
    },
    {
      id: "rh06",
      domain: "Chunking",
      select: 2,
      stem: "A developer runs chunk_by_char with its defaults (chunk_size=150, chunk_overlap=20) on report.md and gets chunks that start and end mid-sentence and answer no question at all. Which two moves are consistent with the lesson? Choose two.",
      options: [
        { id: "a", text: "Keep the defaults, since the embedding model compensates for fragmentary chunks when it scores the meaning" },
        { id: "b", text: "Raise chunk_size and chunk_overlap well above the defaults and inspect whether whole sections start to form" },
        { id: "c", text: "Compare the chunks that several strategies produce on the real documents, since the right one depends on them" },
        { id: "d", text: "Inspect each strategy's output and keep the one with the fewest chunks, since fewer boundaries mean fewer cut sections" }
      ],
      correct: ["b", "c"],
      why: "'Text chunking strategies' (video): the default settings 'do not produce very good chunks', so the instructor changes them to a chunk length of 500 with an overlap of 150 and sees 'the formation of actual individual sections' (b); the lesson closes with 'there's no single best chunking strategy' — the right one depends on your documents — and the notebook tries all three strategies on report.md to compare them (c). Embeddings represent the meaning of the text they are given, so a fragment stays a fragment (a). Chunk count says nothing about chunk quality: the lesson judges chunks by reading them, and the video's 500/150 chunks still separate headers from their text while producing fewer chunks than the defaults (d)."
    },
    {
      id: "rh07",
      domain: "Embeddings",
      select: 1,
      stem: "A team embeds both its stored chunks and the incoming user questions by calling the lesson's generate_embedding function, whose input_type has a single default value for everything, with its default arguments. Retrieval quality is mediocre. Following the input_type guidance referenced in the lesson notes, what should change?",
      options: [
        { id: "a", text: "Mark the chunks as documents when indexing them and keep the default for the questions" },
        { id: "b", text: "Mark both the chunks and the questions as documents, since the stored side is the larger one" },
        { id: "c", text: "Mark the questions as documents and the chunks as queries, since the longer text is the reference" },
        { id: "d", text: "Keep both sides on the default, since using the same model on both sides is what matters" }
      ],
      correct: ["a"],
      why: "The lesson's generate_embedding defaults to input_type='query' for everything. The note in 'Text embeddings' relays the input_type rule from the embeddings documentation: for retrieval, say what is being embedded — 'query' for the question and 'document' for the stored chunks — so only the indexing side changes (a). Marking both sides as documents (b) removes the distinction the guidance relies on, and swapping the two (c) inverts it. Using the same model on both sides (d) is necessary but not the point: the guidance is about input_type, and the default marks the chunks as queries."
    },
    {
      id: "rh08",
      domain: "Embeddings",
      select: 1,
      stem: "After a configuration change, a search service embeds user questions with voyage-4-large instead of voyage-3-large. The nightly job that re-embeds the chunk store is reported green by the scheduler, but its last successful run predates the change. Since the change, the top results look unrelated to the questions. What is the most likely cause?",
      options: [
        { id: "a", text: "The questions are now embedded as documents by default, so each query lands far from its own chunks" },
        { id: "b", text: "The stored chunks were not re-chunked for the newer model, so they are now too long for it to represent" },
        { id: "c", text: "Question and chunk vectors now come from different models, so they are not comparable with each other" },
        { id: "d", text: "The newer model calls for a different similarity function, so cosine similarity ranks the wrong neighbours" }
      ],
      correct: ["c"],
      why: "'The full RAG flow' runs the user's query through the same embedding model as the chunks, and the lesson note states the rule directly: vectors from different models are not comparable, so similarity scores between them carry no meaning — the stored vectors still come from voyage-3-large because the re-embedding job has not completed since the change, so the fix is to get that job running again (the store keeps the chunk text, or a reference to it, so the chunks can be re-embedded). Option a describes an input_type slip that a model change does not cause. Option b confuses chunk length with the model change: the stored vectors were never recomputed, so the new model never saw the chunks. Option d is wrong because the vector database's cosine similarity does not depend on which model produced the vectors, as long as it is the same model on both sides."
    },
    {
      id: "rh09",
      domain: "Embeddings",
      select: 1,
      stem: "A report was split one line per chunk. For the question 'How many bugs did engineers fix this year?', semantic search with k=1 ranks this chunk first: 'This year saw significant strides in our understanding of XDR-47, a \"bug\" we have not seen before.' A colleague concludes that embeddings 'just match keywords'. What is the better reading?",
      options: [
        { id: "a", text: "Retrieval did its job: that chunk is the only one containing 'bug', so the prompt should tell Claude to ignore off-topic context" },
        { id: "b", text: "The embedding model was trained mostly on software text, so it reads 'bug' in the engineering sense unless the context is strongly medical" },
        { id: "c", text: "The question was embedded in the wrong vocabulary: phrased in the report's own terms, it would land on the engineering section" },
        { id: "d", text: "The chunk has no other signal to balance the word; chunks that keep the section header with its sentences carry the medical meaning" }
      ],
      correct: ["d"],
      why: "'Text chunking strategies' uses this exact example: chunking line by line yields a medical line that contains 'bug', so it looks like it is about software engineering, and 'The full RAG flow' shows that with the header and the sentence together the medical signal outweighs the word — in the lesson's imaginary model the section embeds as [0.97, 0.34], 'with some software elements due to the word bug'. Chunking, not the embedding model, caused the error, and the lesson's remedy is better chunks (d). Option a moves the fix to generation, where with k=1 Claude never sees the right chunk. Option b blames training data for what the chunk boundary did. Option c rewrites the query without restoring the missing section context."
    },
    {
      id: "rh10",
      domain: "Similarity",
      select: 1,
      stem: "The team moves from the course's in-memory VectorIndex to a hosted vector database whose documentation describes its score as 'cosine similarity'. They keep the client code that takes the result with the lowest score as the best match. Now the top answer is consistently the least relevant of the returned chunks. What went wrong?",
      options: [
        { id: "a", text: "The hosted database returns results already ordered best-first, so the client should stop sorting and take the first element" },
        { id: "b", text: "The hosted database's score is highest for the closest vectors, so the client must take the highest score instead" },
        { id: "c", text: "The hosted database reports cosine distance under the name 'similarity', so taking the lowest score is still the right rule" },
        { id: "d", text: "The hosted database normalizes the stored vectors on insert, so distances computed by the client no longer line up" }
      ],
      correct: ["b"],
      why: "'The full RAG flow': cosine similarity ranges from −1 to 1 with values near 1 meaning high similarity, while cosine distance is 1 − similarity with values near 0 meaning high similarity. 'Implementing the RAG flow' prints distances from the course's VectorIndex (0.71 beat 0.72), so 'lowest wins' was right there and is wrong for a similarity score (b). Option a would work as a procedure on a best-first list, but it does not explain the symptom: taking the lowest score gives the same result on sorted and unsorted input, and only the direction of the scale explains a consistent inversion. Option c contradicts the database's own documentation, and lowest-wins on a true distance would surface the most relevant chunk, not the least. Option d changes neither cosine scores nor their order — cosine ignores vector length — and the client here never computes distances itself."
    },
    {
      id: "rh11",
      domain: "Similarity",
      select: 1,
      stem: "For 'What did the software engineering dept do last year?', the course's vector store returns Section 2 at distance 0.71 and the Methodology section at 0.72. The team plans to ship with the top-1 result as is. What does the near-tie most likely indicate?",
      options: [
        { id: "a", text: "The ranking is fragile: a question worded slightly differently could put an unrelated section at the top of the list" },
        { id: "b", text: "Methodology shares vocabulary with most questions, so a gap this small is normal and needs no action" },
        { id: "c", text: "The embedding model has too few dimensions to separate the two sections, so it should be swapped for a larger one" },
        { id: "d", text: "The two sections are near-duplicates in meaning, so either one would answer the question about equally well" }
      ],
      correct: ["a"],
      why: "'Implementing the RAG flow' shows these numbers and immediately warns that there are scenarios where the approach does not perform as expected; the lesson note points out that the gap between the right section and an unrelated one is tiny. The next lessons show semantic ranking putting an irrelevant section above a relevant one on a different query — for the incident ID, Section 10 came first but Section 3 outranked Section 2 — and add BM25 and hybrid search to make the ranking more robust (a). Option b treats the near-tie as harmless, which is the opposite of the lesson's warning. Option c blames the model's size without evidence. Option d is wrong: Methodology and Software Engineering are different sections of report.md, and nothing in the lesson suggests they share content."
    },
    {
      id: "rh12",
      domain: "Similarity",
      select: 2,
      stem: "Two storage designs are proposed for the course's vector store. Design 1 keeps the full chunk text inside each entry next to the vector. Design 2 keeps only a chunk id next to the vector and stores the text in a separate document table. Which two statements are consistent with the lessons? Choose two.",
      options: [
        { id: "a", text: "Design 2 works for the pipeline, since an id that points back to the chunk text is enough to assemble the prompt" },
        { id: "b", text: "Design 2 returns what the lesson calls not useful, since a hit without the chunk text in the entry is just embedding numbers" },
        { id: "c", text: "Either design has to keep the vector next to the text that produced it, since a chunk's embedding cannot be recomputed later" },
        { id: "d", text: "Design 1 gains nothing in retrieval, since the store compares only the vectors and returns the text as metadata" }
      ],
      correct: ["a", "d"],
      why: "'Implementing the RAG flow': getting back just the embedding numbers 'isn't useful', so you include the original chunk text 'or at least a reference to it' alongside each embedding — the video says 'or at least the ID of the chunk' (a). 'The full RAG flow' describes the vector database as optimized for storing, comparing and searching long lists of numbers, and the course's VectorIndex scores them by cosine distance; the {\"content\": chunk} dictionary of 'Implementing the RAG flow' is metadata returned with the match, not something the search compares (d). Option b quotes the lesson against itself: the 'isn't useful' case is a hit with no text and no reference at all. Option c is wrong on both counts: Design 2 keeps the vector next to an id, not the text, and an embedding can be recomputed from the stored text at any time — the lesson's generate_embedding does exactly that."
    },
    {
      id: "rh13",
      domain: "Lexical search",
      select: 1,
      stem: "An e-commerce team replaced its semantic search with pure BM25 so that SKU lookups such as 'PX-4471-B' would work. They do, but descriptive questions like 'something to power my laptop on the road' now return nothing useful. The embedding index they used before is still maintained, and no new model (a reranker or a different embedding model) can be added this quarter. Descriptive queries still return hits, just irrelevant ones. What should the team do?",
      options: [
        { id: "a", text: "Add synonym lists to the BM25 tokenizer so that descriptive queries expand into product terms" },
        { id: "b", text: "Rescore the BM25 result list with a reranking model so that descriptive queries are ordered by meaning" },
        { id: "c", text: "Query the vector index alongside the BM25 index and fuse the two result lists for every query" },
        { id: "d", text: "Query the BM25 index first and consult the vector index only when it returns no hits" }
      ],
      correct: ["c"],
      why: "'BM25 lexical search': the two methods have complementary strengths — semantic search understands context and meaning, lexical search ensures exact terms such as IDs are not missed — and the recommended design runs both in parallel and merges the results, which 'A Multi-Index RAG pipeline' implements with the Retriever and reciprocal rank fusion (c); the existing embedding index is not a new model, so the constraint does not touch it. Synonym lists (a) stay lexical: they expand known words, and cannot keep up with open-ended paraphrases such as 'power my laptop on the road' — the meaning that embeddings capture. A reranker (b) would rescore by meaning, but it is the new model the constraint rules out, and it can only reorder what BM25 already returned. A fallback (d) runs the two searches in sequence instead of merging them, and it never fires here: BM25 still matches common words such as 'laptop' and 'power', so it returns a list, just not the chargers."
    },
    {
      id: "rh14",
      domain: "Lexical search",
      select: 1,
      stem: "A BM25 index over the course report is queried with 'What happened with INC-2023-Q4-011?'. A colleague is alarmed that the long Methodology section — which never mentions the incident ID but uses 'what', 'happened' and 'with' many times — appears in the top 3, and asks whether the index is broken. What does the lesson's description of BM25 predict?",
      options: [
        { id: "a", text: "The tokenizer splits the ID into 'INC', '2023', 'Q4' and '011', so Methodology matches on the common '2023' token" },
        { id: "b", text: "Common words carry little weight, so the Methodology section ranks below the sections that hold the rare ID" },
        { id: "c", text: "BM25 corrects for document length, so Methodology's many common-word hits weigh no more than a single mention of the ID" },
        { id: "d", text: "The query's common words were not removed, so Methodology outranks the sections that mention the ID only once" }
      ],
      correct: ["b"],
      why: "'BM25 lexical search' describes four steps: tokenize, count how often each term appears across the documents, give rare terms high importance and common ones low, then return the documents with more of the high-weight terms. The rare ID dominates, and the video shows exactly this ranking: Software Engineering and Cybersecurity first, Methodology third, with 'what happened with' described as low-weight terms (b). The lesson's own example tokenizes 'a INC-2023-Q4-011' into ['a', 'INC-2023-Q4-011'], so the ID stays one rare term (a). The length correction mentioned in the lesson note dampens repeated hits; it is step 3 — rarity — that makes one mention of the ID outweigh many common words, so c names the wrong mechanism. Option d contradicts step 3: unremoved common words carry little weight, so they cannot lift Methodology above the ID-bearing sections."
    },
    {
      id: "rh15",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "A Retriever fuses a vector index and a BM25 index with reciprocal rank fusion. With k=3 it asks each index for three results. For an incident-ID query, the chunk that contains the ID is BM25's first result and the vector index's fourth, and in the fused ranking it ends up below a chunk that both indexes placed third. What is the most direct fix?",
      options: [
        { id: "a", text: "Set k=1 so that only the top result of each index reaches the fusion step" },
        { id: "b", text: "Raise k_rrf well above its default so that rank differences matter less" },
        { id: "c", text: "Request more candidates than k from each index before fusing the two rankings" },
        { id: "d", text: "Register the BM25 index first so that its ranks are processed before the vector ranks" }
      ],
      correct: ["c"],
      why: "RRF adds 1/(k_rrf + rank) for every list in which a document appears, so a chunk present in one list gets a single term while a chunk present in both gets two. The lesson note on 'A Multi-Index RAG pipeline' makes the point: each index should return more candidates than k, otherwise a document that is strong in one index and middling in the other loses the fusion. Once the vector index returns four or more candidates, the ID chunk is scored from both lists: with the default k_rrf=60 and ranks counted from 1 as in the lesson's worked example, that is 1/61 + 1/64 ≈ 0.0320, which narrowly beats the (3, 3) chunk's 2/63 ≈ 0.0317 (c); a chunk ranked second by both indexes would still win, which is the fusion working as intended. With k=1 (a) the ID chunk and the vector index's top chunk each get one first place — a tie, and the rest of the ranking is lost. A larger k_rrf (b) shrinks every term alike; the chunk is still scored from one list. Index order (d) does not change a sum."
    },
    {
      id: "rh16",
      domain: "Hybrid retrieval",
      select: 2,
      stem: "A team adds a third index to the course's Retriever. Its search() returns (doc, score) pairs sorted by score ascending, where a higher score means a better match. Nothing else was changed. Which two statements are correct? Choose two.",
      options: [
        { id: "a", text: "RRF reads the new index's list in the wrong order, so its best documents receive the smallest contribution" },
        { id: "b", text: "The SearchIndex protocol fixes the method names and signatures, not the order of results, so the mismatch raises no error" },
        { id: "c", text: "The new index's top documents are over-weighted, because RRF sums the raw scores and its scale is the largest" },
        { id: "d", text: "The Retriever re-sorts each index's results by score before assigning ranks, so the ascending order is corrected first" }
      ],
      correct: ["a", "b"],
      why: "'A Multi-Index RAG pipeline': the Retriever's search() walks each index's results with enumerate, taking the position as the rank and discarding the score ('for rank, (doc, _) in enumerate(results)'); a list sorted worst-first therefore gives its best documents the largest rank and the smallest 1/(k + rank) term (a). The indexes are combined through the shared add_document()/search() interface, which says nothing about result order, so the mismatch is silent (b). The lesson's phrase 'normalize and combine their rankings' refers to ranks: RRF never sums or compares raw scores, so the new scale cannot over-weight anything (c is wrong), and the Retriever never re-sorts by score — enumerate assigns ranks in the order the index returned (d is wrong)."
    },
    {
      id: "rh17",
      domain: "Hybrid retrieval",
      select: 1,
      stem: "A hybrid pipeline indexes dozens of quarterly reports from different companies. Many chunks read like 'revenue grew 3% this quarter' without naming the company or the quarter; that information sits only in the report title, dozens of pages earlier. Retrieval keeps mixing up companies. Which improvement addresses this most directly?",
      options: [
        { id: "a", text: "Increase chunk_overlap so that each chunk carries more of the surrounding text" },
        { id: "b", text: "Rerank the fused candidates with a model that scores each question–chunk pair" },
        { id: "c", text: "Index each report's title as a chunk of its own so that BM25 can match the company name" },
        { id: "d", text: "Have Claude prepend a short document-level context to each chunk before indexing" }
      ],
      correct: ["d"],
      why: "The notes on 'A Multi-Index RAG pipeline' describe Anthropic's contextual retrieval (an extension beyond the official lesson): before indexing, Claude writes a short context for each chunk from the whole document ('this section is from company X's report for quarter Y'), and both the embeddings and the BM25 index are built from that enriched text — exactly the information missing here. Overlap (a) reaches only the neighbouring text, not a title dozens of pages away. A reranker (b) scores the same context-free chunk text. A title chunk (c) makes the company name findable, but it is not attached to the revenue chunks the question needs."
    }
  ]
};
