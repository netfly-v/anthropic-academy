window.QUIZ_BANK = {
  id: "api-features-hard",
  passPercent: 70,
  hideDomains: true,
  questions: [
    {
      id: "fh01",
      domain: "Thinking",
      select: 1,
      stem: "A classification service built on the course's chat helper runs on a model that still accepts the course's budget-based thinking. Its requests prefill the assistant turn with an opening brace, stop on a closing-brace stop sequence and set temperature to 0 for repeatable labels. Evals showed that the prompt alone misses the accuracy target, so the team enabled extended thinking with a 2,000-token budget on the same requests and raised max_tokens to 8,000. Every request now fails with a 400 error before a single token is generated. What is the most likely cause?",
      options: [
        { id: "a", text: "The closing-brace stop sequence is a setting that extended thinking does not accept, so the API refuses the request" },
        { id: "b", text: "The 8,000-token max_tokens is far above the 2,000-token budget, a gap the API treats as inconsistent and refuses" },
        { id: "c", text: "The prefilled brace and temperature 0 are settings extended thinking does not accept, so the API refuses the request" },
        { id: "d", text: "Thinking is a server tool that has to be declared in the tools list, like code execution, so the API refuses the request" }
      ],
      correct: ["c"],
      why: "Lesson 46, Extended thinking opens with the warning that extended thinking is not compatible with some other features, notably message prefilling and temperature, so a request that keeps the prefilled brace and temperature 0 while turning thinking on is rejected (c); the current docs keep both rules for the models that still accept budget-based thinking (a prefill is refused while thinking is on, and temperature is incompatible with thinking), and on Claude 4.7 and later they reject budget-based thinking itself, which is why the stem fixes the model. Stop sequences are not among the restrictions — the docs' compatibility list names sampling parameters, prefill and forced tool use — so the stop sequence that the course pairs with a prefill for structured output does not cause the 400 (a). Option b inverts the lesson's rule: max_tokens must be greater than the budget, and the video recommends making it significantly larger, so a 2,000-token budget under 8,000 max_tokens is the normal, valid setup. Option d confuses thinking, a request parameter added to the params, with the server tools of Lesson 53, Code execution and the Files API, which are declared in the tools list."
    },
    {
      id: "fh02",
      domain: "Thinking",
      select: 1,
      stem: "A research assistant runs on a model that still uses the course's budget-based thinking mode, with budget_tokens raised from 2,000 to 6,000 while max_tokens stayed at 6,400. Since the change, many responses arrive with a long thinking block, a text block that breaks off mid-sentence or is missing altogether, and stop_reason \"max_tokens\". The thinking itself reads as complete. What explains the symptom?",
      options: [
        { id: "a", text: "Thinking tokens count toward max_tokens, so once the budget is spent a few hundred tokens at most remain for the answer" },
        { id: "b", text: "The budget exceeds what the model needs, so the unused part is subtracted from the text allowance up front" },
        { id: "c", text: "stop_reason max_tokens signals that the thinking budget ran out, after which the API cuts the text block short" },
        { id: "d", text: "The response reached the context window, so the API trimmed the text block to make the whole exchange fit" }
      ],
      correct: ["a"],
      why: "Lesson 46, Extended thinking: max_tokens must be greater than the thinking budget, and the video spells out why — with a budget of 1,024 and max_tokens of 1,025 only one token is left for the text, so max_tokens should be significantly larger than the budget; the lesson note adds that thinking tokens are billed as output and count toward max_tokens, and the current docs list exactly this symptom (stop_reason max_tokens with a truncated or missing text block). With up to 6,000 of 6,400 tokens taken by thinking, the answer has a few hundred at most, and the responses whose thinking used most of the budget are the ones that break off (a). Option b invents a reservation rule: the budget is a target, not an amount set aside, and unused budget is not charged against the text; what cuts the text is the thinking that was actually generated. Option c misreads the stop reason: max_tokens reports that the max_tokens ceiling on thinking plus text was reached, not that the thinking budget ran out. Option d names the wrong limit — a context-window overflow has its own stop reason (model_context_window_exceeded) on current models or returns an error, and nothing in the stem suggests a large input."
    },
    {
      id: "fh03",
      domain: "Thinking",
      select: 2,
      stem: "A support agent runs with thinking and tools over several rounds. In a small share of sessions the assistant message contains a redacted_thinking block that holds only an encrypted data field, and the team's history builder, which keeps the blocks it can display, drops that block before the tool result is sent back. Those sessions then fail with a 400 error. Production traffic cannot be replayed for testing. Which two steps are right? (Choose two.)",
      options: [
        { id: "a", text: "Re-label the redacted block as a thinking block that carries its data, so that the history builder will keep it" },
        { id: "b", text: "Send the special trigger string in a test prompt, so that a redacted block comes back on demand in tests" },
        { id: "c", text: "Set the thinking display to omitted in tests, so that every thinking block comes back redacted on demand" },
        { id: "d", text: "Return the assistant message exactly as received, redacted block included, so that Claude keeps its reasoning" }
      ],
      correct: ["b", "d"],
      why: "Lesson 46, Extended thinking: a redacted thinking block appears when Claude's reasoning is flagged by an internal safety system, and the redacted content is the actual thinking in encrypted form, provided so that you can pass the complete message back to Claude without losing context (d); the lesson also shows a special trigger string whose purpose is to force a redacted block, so that your code can be tested against one on demand (b). The current docs' troubleshooting page names this exact failure: the 400 error saying that thinking blocks cannot be modified most often comes from code that filters content blocks by type and drops redacted_thinking. Re-labelling the redacted block as a thinking block (a) is a modification as well: the docs say the thinking blocks of the latest assistant message cannot be rearranged, edited or partially dropped, redacted_thinking blocks included, and the data field is opaque. The display setting (c) does not produce redacted blocks: the lesson note on Lesson 46 explains that display 'omitted' returns a thinking block whose thinking field is empty while the full reasoning stays encrypted in its signature, and the docs state that redacted_thinking is a distinct block type, separate from the omitted display, so such tests never exercise the redacted path."
    },
    {
      id: "fh04",
      domain: "Thinking",
      select: 1,
      stem: "A report generator has run for months on a helper that takes the first content block of each response as the answer. For its hardest report type the team turned on extended thinking, on a model that still uses budget-based thinking, and left the helper as it was. Since then the helper returns no usable answer for that report type on every request, although the API returns status 200 and stop_reason \"end_turn\". What is the most likely cause?",
      options: [
        { id: "a", text: "The first block is now a redacted_thinking block holding encrypted data, which the helper cannot read as answer text" },
        { id: "b", text: "The first block is now a thinking block with the reasoning, and the answer arrives in a text block that follows it" },
        { id: "c", text: "The answer now arrives in a second assistant message after the thinking message, which the helper does not fetch" },
        { id: "d", text: "The text block now opens with the thinking signature, which the helper has to strip before the answer can be read" }
      ],
      correct: ["b"],
      why: "Lesson 46, Extended thinking: with thinking enabled the response changes from a single text block to a structured response with two parts — a thinking block first, then the text block with the answer — and the lesson lists 'more complex response handling in your code' among the trade-offs; a helper that takes the first block as the answer now gets the thinking block on every request (b), and the note on Lesson 5, Making a request advises picking the text block by its type for exactly this reason. A redacted_thinking block (a) appears only when the reasoning is flagged by an internal safety system, so it cannot explain a failure on every request. Thinking and answer are blocks of one assistant message, not two messages (c), and stop_reason end_turn confirms that the turn is complete. The signature is a field of the thinking block that protects its text, not a prefix of the text block (d)."
    },
    {
      id: "fh05",
      domain: "Vision",
      select: 1,
      stem: "A warehouse app photographs every incoming pallet with a 12-megapixel camera and sends each photo to Claude with a short inspection prompt. Monthly spend is dominated by input tokens, and almost all of them come from the images; the text prompt is under 100 tokens. Each pallet fills the frame, and the defects to flag are crushed corners, broken slats and torn stretch wrap. Which change lowers the image cost the most?",
      options: [
        { id: "a", text: "Re-encode each photo as a low-quality JPEG that still shows the damage, so that far fewer bytes are sent" },
        { id: "b", text: "Convert each photo to grayscale, which still shows the damage, so that each pixel carries one channel" },
        { id: "c", text: "Send each photo by URL instead of base64, so that the image bytes no longer count as input tokens" },
        { id: "d", text: "Downscale each photo to the smallest size that still shows the damage, so that fewer pixels are sent" }
      ],
      correct: ["d"],
      why: "Lesson 47, Image support: each image counts as tokens based on its dimensions — the lesson's rule of thumb is width times height divided by 750 — so the token cost of a photo is set by its pixel size, not by its file size or by how it travels; the lesson note gives the current rule (28×28-pixel patches, with oversized images downscaled by the API, which caps the cost), which points the same way, and the docs advise downsampling images before sending to control token costs. Large, frame-filling defects such as crushed corners and torn wrap stay recognisable at a much lower resolution, so sending the smallest image that still shows them is the biggest saving (d). Heavier JPEG compression shrinks bytes but keeps the same pixel grid, so the token count does not move, and compression artefacts can hurt the analysis (a). Grayscale changes the colour data, not the dimensions the token formula is built on, so it saves nothing (b). A URL source (c) is one of the two ways Lesson 47 lists for including an image, next to base64; it changes only how the image reaches the API, and the same pixels are processed and billed."
    },
    {
      id: "fh06",
      domain: "Vision",
      select: 1,
      stem: "A screen-sharing support bot lets users attach a screenshot to any message, and the full conversation is resent with every turn. Long sessions have started to fail with an invalid_request_error saying that the maximum number of images per request has been exceeded, although each new message carries a single small screenshot that is already uploaded through the Files API. Sessions must be allowed to stay long. What should the team change?",
      options: [
        { id: "a", text: "Keep recent screenshots as images and swap older ones for Claude's own descriptions, so that fewer images are resent" },
        { id: "b", text: "Downscale every screenshot before it is uploaded, so that a long history of screenshots stays within the request limits" },
        { id: "c", text: "Put a cache breakpoint after the older screenshots, so that the cached images stop counting toward the image limit" },
        { id: "d", text: "Gather the older screenshots into the session's first message, so that they count as a single message's images" }
      ],
      correct: ["a"],
      why: "Lesson 47, Image support: the limit is 'up to 100 images across all messages in a single request', and because the bot resends the full conversation, every screenshot from earlier turns is part of each new request; the lesson note gives the current figures (600 per request, or 100 on models with a 200k-token context window), which the current vision docs confirm. The fix that keeps sessions long is to stop resending old images and keep the text already derived from them (a). Downscaling (b) works on the per-image size and dimension limits and on the token cost, not on the number of images in the request. A cache breakpoint (c) saves the processing of a repeated prefix (Lesson 50, Prompt caching), but Lesson 51, Rules of prompt caching makes a read depend on the same content being sent again up to the breakpoint, so the cached screenshots are still in every request and still count. Gathering the screenshots into the first message (d) changes nothing, because the lesson's limit counts images across all messages of the request, not per message."
    },
    {
      id: "fh07",
      domain: "PDF",
      select: 1,
      stem: "A finance team wants Claude to answer questions about long quarterly reports, and the review screen must open each report at the page that a quoted figure came from, using only the data that comes back with each citation. Two designs are proposed. Design 1 extracts the text of each report and sends it as a plain-text document with citations enabled. Design 2 sends the PDF itself in a document block with citations enabled. Which design should the team pick, and why?",
      options: [
        { id: "a", text: "Design 1, because a plain-text document keeps the report's page breaks, so each citation carries the page it starts on" },
        { id: "b", text: "Design 1, because each plain-text citation returns character positions, which the screen can turn into the page itself" },
        { id: "c", text: "Design 2, because each citation on a PDF document returns the cited text with its start and end page numbers" },
        { id: "d", text: "Design 2, because a PDF document returns one citation per page, listing every figure Claude used from that page" }
      ],
      correct: ["c"],
      why: "Lesson 49, Citations: a citation on a PDF document carries cited_text together with start_page_number and end_page_number, whereas 'with plain text sources, instead of page numbers, you'll get character positions' — so only Design 2 lets the review screen open the page straight from the citation (c); the lesson note on Lesson 49 names the two citation types, page_location for PDFs and char_location for text. A plain-text document has no pages to report, whatever page breaks its text keeps, so its citations carry character positions, not a page (a). Character positions point into the extracted text, and turning them into a page would need the team's own map of page offsets, which is exactly the lookup the requirement rules out (b). Citations are not issued per page: the lesson describes citation information for each claim, and the video shows that the response is split into text blocks, some of which carry a citations list, each citation with its own cited text and page range (d)."
    },
    {
      id: "fh08",
      domain: "PDF",
      select: 1,
      stem: "A billing platform processes 80,000 one-page PDF invoices a month, each an export from its own accounting system: typed line items and totals, no logos, no charts, no scans. Each invoice is sent once in a document block with a 300-token extraction prompt, and the per-invoice cost is the metric the team is judged on. Which change cuts the cost the most without losing data?",
      options: [
        { id: "a", text: "Keep the document block and add a cache breakpoint to it, so that the invoices are read from the cache instead of processed" },
        { id: "b", text: "Extract the text from each invoice and send it as a plain-text document, so that no page image is processed" },
        { id: "c", text: "Cap max_tokens just above the usual output length, so that each invoice is billed for fewer tokens" },
        { id: "d", text: "Keep the PDF in the document block and instruct Claude to ignore page images, so that the image tokens are skipped" }
      ],
      correct: ["b"],
      why: "The lesson note on Lesson 48, PDF support (confirmed by the current docs) explains the cost of a PDF page: it reaches the model both as extracted text and as a page image, so a page is billed for its text tokens and for image tokens on top. For invoices that hold typed line items and nothing visual, the image adds cost and no information, so sending the extracted text in a plain-text document block (the form Lesson 49, Citations uses for text sources) removes the image share (b). A cache breakpoint (a) pays off only when the same content is sent again (Lesson 50, Prompt caching), and every invoice is sent once, so nothing is ever read back; where the request reaches the minimum cacheable length, each write is even billed above the base input price, as the lesson note on Lesson 50 says. max_tokens (c) is a safety cap, not a price: Lesson 5, Making a request explains that Claude does not try to reach the limit and stops only if it hits it, so a tighter cap leaves the input untouched and saves nothing on an extraction of the usual length. The prompt (d) cannot switch off the page image; the page is converted before the model reads any instruction."
    },
    {
      id: "fh09",
      domain: "Citations",
      select: 2,
      stem: "A compliance team is reviewing a contract Q&A assistant that answers from uploaded PDFs with citations enabled. The product owner proposes dropping the lawyers' review step, arguing that a cited answer is a verified answer. Which two statements about citations are accurate? (Choose two.)",
      options: [
        { id: "a", text: "A citation shows which passage Claude used, and whether Claude read it correctly is left for a person to judge" },
        { id: "b", text: "Citations are attached to the claims Claude is least sure of, so the lawyers could limit their checks to those claims" },
        { id: "c", text: "Enabling citations limits Claude to statements backed by a quote, so a cited answer stays within what the PDFs say" },
        { id: "d", text: "Each citation carries the exact text it quotes from the PDF, so that a lawyer can go straight to the source passage" }
      ],
      correct: ["a", "d"],
      why: "Lesson 49, Citations frames the feature as transparency: citations create 'a clear trail from Claude's response back to your source material', so that users can verify the information by checking the original document and, as the video puts it, 'make sure that Claude is correctly interpreting the information' — a citation shows the passage Claude used, and judging whether Claude read it correctly stays with a person (a); the current docs add that citations are guaranteed to contain valid pointers to the provided documents, a guarantee about the pointer, not the claim. Each citation carries cited_text, the exact text from the document, which lets a lawyer go straight to the passage and check it, so review gets faster without becoming unnecessary (d). Citations are not a confidence signal: the lesson describes citation information for each claim drawn from the document, and nothing ties citations to the claims Claude is least sure of (b). Enabling citations does not restrict what Claude writes — the video shows that only some text blocks of the response carry a citations list — so a cited answer can still contain statements that go beyond the PDFs (c)."
    },
    {
      id: "fh10",
      domain: "Citations",
      select: 1,
      stem: "A help-center assistant retrieves the five best chunks from a hybrid index for each question and pastes them into the user's text block above the question. The team now wants each cited passage in the answer to come back with the name of the help-center article it belongs to, carried in the citation itself so that the UI can render it without any lookup on the team's side. Which request design delivers that?",
      options: [
        { id: "a", text: "Join the five chunks into one plain-text document, open each chunk with its article name, and enable citations on it" },
        { id: "b", text: "Send each chunk as its own plain-text document with its article name in the context field, with citations enabled" },
        { id: "c", text: "Keep the chunks in the user's text block, put each under its article name, and enable citations on that text block" },
        { id: "d", text: "Send each chunk as its own plain-text document block titled with its article, with citations enabled on every block" }
      ],
      correct: ["d"],
      why: "Lesson 49, Citations: citations are enabled per document block, each block can carry a title, and every citation returns document_index ('useful when you provide multiple documents') and document_title together with cited_text — so one document block per chunk, titled with its article, puts the article name inside each citation (d); the current docs recommend putting each RAG chunk into its own plain-text document when its sentences should be citable, and the lesson note adds that citations must be on for all documents in a request or for none. One joined document (a) gives every citation the same document title plus character positions; an article name written into the text is cited only when it falls inside the quoted span, so the team would have to map positions back to articles. The context field (b) is passed to the model but, in the docs' words, not used toward cited content, and Lesson 49's list of citation fields has no place for it: the citation returns the document's index and title, so the UI would have to look the context up by index. The citations setting belongs to document blocks, not to the text block of a user message, so (c) cannot turn citations on."
    },
    {
      id: "fh11",
      domain: "Prompt caching",
      select: 1,
      stem: "A scheduling assistant has a 5k-token system prompt with a cache breakpoint on it, and requests arrive every few seconds. The usage reports a cache write on every request and never a read. The system prompt is built per request from a template that inserts the current date and time, to the second, at the top, and the assistant needs that time to schedule correctly. What should the team change?",
      options: [
        { id: "a", text: "Move the date and time out of the system prompt into the newest user message, after the final breakpoint" },
        { id: "b", text: "Move the date and time to the end of the cached system block, so that the stable instructions come first in the prefix" },
        { id: "c", text: "Give the system breakpoint a one-hour TTL, so that the system entry outlives the gaps between requests" },
        { id: "d", text: "Switch to request-level automatic caching, so that the API places the breakpoint where the prefix still matches" }
      ],
      correct: ["a"],
      why: "Lesson 51, Rules of prompt caching: a breakpoint caches all the work up to and including its block, and the cache is used only if that content is identical — even adding the word 'please' invalidates it; Lesson 52, Prompt caching in action adds that changing a single character of the system prompt invalidates the cache for that component. A time stamp to the second at the top of the system prompt makes every prefix new, which is why each request writes an entry that no later request reads; the lesson note on Lesson 52 names the current date or time in the system prompt as a silent cache killer and gives the fix — put volatile content after the last breakpoint, here in the newest user message, so that the system prompt is identical again and the time still reaches Claude (a). Moving the time to the end of the cached block (b) keeps it inside the content up to and including the breakpoint, so the prefix still changes on every request. A one-hour TTL (c) lengthens the life of an entry that is never matched; with requests every few seconds the default lifetime was never the problem. Automatic caching (d), which the lesson note on Lesson 51 describes, sets the breakpoint on the last suitable block for you, but every prefix it can check still starts with the changing time, so no request finds a match."
    },
    {
      id: "fh12",
      domain: "Prompt caching",
      select: 1,
      stem: "A tutoring chatbot caches its 4k-token system prompt and nothing else. Conversations run for forty or more turns, and by the end each request carries about 30k tokens of history that is identical to the previous request apart from the newest exchange. Usage shows cache reads of roughly 4k tokens per request and input_tokens climbing turn by turn. Cost per turn must come down, and no history may be dropped. Where should the team add a breakpoint?",
      options: [
        { id: "a", text: "On the first user message of the conversation, so that the opening of the history is cached along with the system prompt" },
        { id: "b", text: "On the system prompt a second time with a one-hour TTL, so that long conversations stay cached between turns" },
        { id: "c", text: "On the last block of each request, so that the history up to that point is cached and read by the next turn" },
        { id: "d", text: "On every assistant message, so that each reply is cached as soon as it is produced and read back afterwards" }
      ],
      correct: ["c"],
      why: "Lesson 51, Rules of prompt caching: a breakpoint caches everything up to and including the block it sits on, breakpoints can span messages — a breakpoint in a later message pulls all previous messages into the cached content — and the lesson suggests one breakpoint on the tools and another partway through the conversation history. Because each request's history is the previous request plus one exchange, a breakpoint on the newest block makes the whole history cacheable and the next request reads it (c); the lesson note on Lesson 51 adds the current detail that the API looks back at most 20 blocks for a match, which is why the breakpoint should move forward with the conversation. A breakpoint on the first message (a) caches the system prompt plus that one message and leaves the growing rest uncached. A second breakpoint on the same system block with a longer TTL (b) changes nothing about the history. A breakpoint on every reply (d) exceeds the limit of four and is unnecessary, since one breakpoint already covers everything before it."
    },
    {
      id: "fh13",
      domain: "Prompt caching",
      select: 1,
      stem: "An archive team runs a one-time pass over 50,000 distinct scanned letters: each request sends a fixed 200-token instruction followed by one letter's transcribed text (about 3k tokens) and gets a summary back. To save money the developer put a cache breakpoint on each letter block. The job finished, and the input-token bill came out higher than the estimate made without caching. What is the most likely explanation?",
      options: [
        { id: "a", text: "The five-minute entries expired during the job, so each letter's request paid for a fresh cache write instead of a read" },
        { id: "b", text: "Each letter was written to the cache at a premium, so the job paid for entries that no request read" },
        { id: "c", text: "The job went past the limit of four cache breakpoints, so each later request paid to rebuild the whole cache" },
        { id: "d", text: "The instruction before the breakpoint was cached once, so each letter after it was billed at full price on top" }
      ],
      correct: ["b"],
      why: "Lesson 50, Prompt caching lists the limitation plainly: caching is only beneficial when you repeatedly send the same content, and Lesson 51, Rules of prompt caching describes the two-phase process — the first request writes to the cache and only follow-up requests with identical content read from it. Fifty thousand distinct letters mean fifty thousand writes and no reads, and the lesson note on Lesson 50 supplies the price fact: a cache write costs more than ordinary input (1.25 times the base price for the five-minute cache), so caching content that is never repeated costs more than not caching it (b). Expiry (a) matters only for content that a later request sends again; no request here repeated an earlier letter, so with or without expiry each entry could only be written. The limit of four breakpoints applies per request, and each request here has one (c). A breakpoint caches everything up to itself as one entry, so the instruction is not stored apart from the letter, and plain full-price processing could at most match the estimate, not exceed it (d)."
    },
    {
      id: "fh14",
      domain: "Prompt caching",
      select: 2,
      stem: "A customer-support agent caches its tool list with a breakpoint on the last tool and its system prompt with a breakpoint on the system block, and requests within a session arrive seconds apart. On most sessions the usage shows cache reads for both entries from the second request on. On sessions served by a new build of the request builder, every request shows cache_read_input_tokens of 0 and a full cache write for the tools and the system prompt alike. Which two changes in the new build explain this? (Choose two.)",
      options: [
        { id: "a", text: "It sets tool_choice on each request, forcing the order-lookup tool whenever the message holds an order number" },
        { id: "b", text: "It builds the tool list from an unordered set, so the tools come out in a different order on each request" },
        { id: "c", text: "It stamps each tool description with the request's trace ID, so that tool calls can be matched in logs" },
        { id: "d", text: "It replays each tool's latest result, with fresh order data, into the history before the new question" }
      ],
      correct: ["b", "c"],
      why: "Lesson 51, Rules of prompt caching and Lesson 52, Prompt caching in action: the request is assembled as tools, then system prompt, then messages, and a breakpoint caches everything up to itself — so the system-prompt entry includes the tools before it, and 'if we change any of our tools in any way whatsoever, we're going to invalidate the cache', which Lesson 52 demonstrates by deleting one letter in a tool description; the lesson note on Lesson 52 lists a changing tool set and unsorted tool JSON among the silent cache killers. A tool order that differs per request (b) and a trace ID stamped into the tool descriptions (c) change the tools text on every request, so both entries miss each time. tool_choice (a) is a request parameter, not part of the tool definitions, and the current prompt-caching docs state that changes to tool_choice only affect message blocks, so both entries keep their reads. Replayed tool results (d) are message blocks that come after both breakpoints, so they cannot affect either entry."
    },
    {
      id: "fh15",
      domain: "Prompt caching",
      select: 1,
      stem: "A product manager expects prompt caching to make an FAQ bot answer a word-for-word repeat of an earlier question instantly, with no output tokens billed for the repeat. The engineer has put a cache breakpoint on the bot's 8k-token system prompt, which every question shares, and the PM asks what that cache will do for a repeated question. What should the engineer tell the PM?",
      options: [
        { id: "a", text: "A repeat is served the reply that was cached on its first ask, so its output is billed on that first ask and not again" },
        { id: "b", text: "A repeat reads the shared prompt only when the same user asks it again, since cache entries are kept per end user" },
        { id: "c", text: "A repeat has its answer generated anew, but the output tokens of that answer are billed at the cache-read rate" },
        { id: "d", text: "A repeat reads the shared prompt from the cache at a lower price, while its answer is still generated and billed" }
      ],
      correct: ["d"],
      why: "Lesson 50, Prompt caching describes what is saved: the preprocessing work Claude does on the input — tokenizing, embedding, adding context — is stored so that it need not be repeated, and only then is the output text generated from that work; the lesson note on Lesson 50 says it directly, the cache does not change the answer, only speed and price, and the current docs state that caching has no effect on output token generation. A repeated question therefore reads the shared system prompt at the cache-read price and starts sooner, but its answer is generated and billed as output again (d). The cache holds processed input, never a reply, so no repeat is served an earlier answer (a). Nothing ties an entry to the person who asked: Lesson 51, Rules of prompt caching makes a read depend only on the content being identical up to and including the breakpoint, so the shared system prompt is read whoever sends the question and whatever question follows it, and the current docs isolate caches by organization and, on the Claude API, by workspace, not by end user (b). The lower price applies to 'the cached portions of your requests', which are input; output tokens are billed at the output rate on every request (c)."
    },
    {
      id: "fh16",
      domain: "Code execution & Files",
      select: 1,
      stem: "A due-diligence tool lets an analyst ask dozens of questions in one session about a single data-room PDF of about 15 MB. Each question is sent as a fresh request with the PDF base64-encoded in a document block, so the backend pushes the whole file over its metered uplink with every question. The team wants the file's bytes to cross that uplink a single time per session. What should the team change?",
      options: [
        { id: "a", text: "Upload the PDF through the Files API, and set its file_id as the source of each question's document block" },
        { id: "b", text: "Keep the base64 PDF and add a cache breakpoint on its document block, so that later questions read it from the cache" },
        { id: "c", text: "Attach the PDF to the session's first message alone, so that later questions read it from the conversation history" },
        { id: "d", text: "Upload the PDF through the Files API, and give its file_id in the system prompt so that Claude opens it per question" }
      ],
      correct: ["a"],
      why: "Lesson 53, Code execution and the Files API: the Files API lets you upload a file once in a separate call, receive a file ID and reference that ID in later messages instead of the raw data — in the video the file ID goes inside the very block that would otherwise hold the raw data — which is 'particularly useful when you want to reference the same file multiple times or when working with larger files that would be cumbersome to include in every request' (a); the lesson note on Lesson 48, PDF support lists the file_id source for PDF document blocks as the preferred route for large files. A cache breakpoint (b) saves the processing of an identical prefix (Lesson 50, Prompt caching), but the base64 of the PDF still has to be in every request for that prefix to match. Sending the PDF in the first message (c) only moves the bytes into the history: each request carries the whole conversation again, as Lesson 50's walk-through of a follow-up request shows, so the file still travels with every question. A file_id written into the system prompt (d) is plain text: an uploaded file is attached only through a content block whose source references its ID, so Claude gets no document to read."
    },
    {
      id: "fh17",
      domain: "Code execution & Files",
      select: 1,
      stem: "A finance team uses the code execution tool, set up as in the course, to turn uploaded CSV exports into a formatted Excel workbook. In the response, Claude's text says the workbook was created and names the file, and the code execution result block shows that the code ran without errors, but the response holds no workbook data that the app could save, and the user needs the workbook as a download. What should the team do?",
      options: [
        { id: "a", text: "Ask Claude to print the workbook into its reply as base64, so that the app can decode the file from the text" },
        { id: "b", text: "Add a container_upload block naming the workbook to the next request, so that the container sends the file back" },
        { id: "c", text: "Take the file_id from the code execution output block, so that the workbook can be downloaded through the Files API" },
        { id: "d", text: "Read the workbook from the sandbox path that Claude printed, so that the app copies it from the container's working directory" }
      ],
      correct: ["c"],
      why: "Lesson 53, Code execution and the Files API: files that Claude's code writes are stored in the Docker container, and the lesson shows how to get one out — the response carries a block of type code_execution_output with a file_id, and 'we can use the Files API to download that generated plot', which is what the lesson's download helper does (c); the lesson note on Lesson 53 adds that in current tool versions the file ID arrives in the bash code execution result block and that only files created by code can be downloaded. Printing binary data as base64 into the reply (a) is not how the lesson moves files and runs into output limits on anything but tiny files. A container_upload block (b) carries a file uploaded through the Files API into the container for Claude's code to read; it works in the opposite direction. The container is an isolated sandbox on Anthropic's side — the lesson calls code execution a server tool — so the application has no path into its working directory (d)."
    }
  ]
};
