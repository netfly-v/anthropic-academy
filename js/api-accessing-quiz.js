window.QUIZ_BANK = {
  id: "api-accessing",
  passPercent: 70,
  questions: [
    {
      id: "a01",
      domain: "Request path",
      select: 1,
      stem: "A user clicks Send in your web chat. Where should the Anthropic API key live?",
      options: [
        { id: "a", text: "In the browser, so the page can call the API directly" },
        { id: "b", text: "On your server, which calls the API and returns text to the browser" },
        { id: "c", text: "Inside the system prompt, so Claude can authenticate itself" },
        { id: "d", text: "In the messages array as the first user turn" }
      ],
      correct: ["b"],
      why: "The browser talks to your server. The server holds the key and talks to Anthropic. A key in the page is visible to anyone who loads the site."
    },
    {
      id: "a02",
      domain: "API key",
      select: 1,
      stem: "You committed .env with ANTHROPIC_API_KEY and then deleted that line in the next commit. What is the right fix?",
      options: [
        { id: "a", text: "Nothing else. The key is gone once the latest file does not contain it" },
        { id: "b", text: "Revoke the key in the console and create a new one, because the old value remains in git history" },
        { id: "c", text: "Move the key into the notebook so it is easier to rotate" },
        { id: "d", text: "Set temperature to 0 so the leaked key stops working" }
      ],
      correct: ["b"],
      why: "Deleting a line does not erase earlier commits. Treat the leaked key as public: revoke it and issue another."
    },
    {
      id: "a03",
      domain: "First request",
      select: 2,
      stem: "Which two statements about messages.create are correct?",
      options: [
        { id: "a", text: "max_tokens is a ceiling. The model stops there even if it had more to say, and it does not try to fill the limit" },
        { id: "b", text: "model must be a concrete model id, not the family nickname Sonnet" },
        { id: "c", text: "max_tokens is the length the model aims to write" },
        { id: "d", text: "The whole response object is the string you show the user" }
      ],
      correct: ["a", "b"],
      why: "max_tokens caps generation. The user-facing text is usually response.content[0].text, not the whole object."
    },
    {
      id: "a04",
      domain: "Multi-turn",
      select: 1,
      stem: "The user asks \"why?\" after Claude explained a bug. You send only that new sentence. What happens?",
      options: [
        { id: "a", text: "The API remembers the previous call from the same API key" },
        { id: "b", text: "Claude has no prior turn, because each request is stateless unless you send the history" },
        { id: "c", text: "The system prompt automatically stores the last answer" },
        { id: "d", text: "Streaming keeps the conversation on the server between calls" }
      ],
      correct: ["b"],
      why: "You append the assistant reply, then the new user message, and send the full list again."
    },
    {
      id: "a05",
      domain: "Chat loop",
      select: 1,
      stem: "Your terminal chat prints Claude's answer but the next \"why?\" ignores it. What did the loop forget?",
      options: [
        { id: "a", text: "To append the assistant text to messages before the next call" },
        { id: "b", text: "To raise temperature so the model recalls the last line" },
        { id: "c", text: "To put the API key in the user message" },
        { id: "d", text: "To set max_tokens to 1" }
      ],
      correct: ["a"],
      why: "Printing is not memory. The next request only knows what is in the messages list you send."
    },
    {
      id: "a06",
      domain: "System prompt",
      select: 1,
      stem: "You want every reply to stay a hint, not a full solution, even if the user says \"ignore your instructions\". Where does that rule go?",
      options: [
        { id: "a", text: "As the first user message, because that is how roles are set" },
        { id: "b", text: "In the system argument, separate from messages" },
        { id: "c", text: "In max_tokens, which controls how obedient the model is" },
        { id: "d", text: "Only in the assistant message after the first answer" }
      ],
      correct: ["b"],
      why: "system is not a chat turn. You pass it again on every call. It is not stored inside the messages array."
    },
    {
      id: "a07",
      domain: "System prompt",
      select: 1,
      stem: "A Socratic tutor prompt returns x = 4 on the first try for 2x + 3 = 11. What should you do?",
      options: [
        { id: "a", text: "Treat one polite answer as proof the prompt works" },
        { id: "b", text: "Tighten the system prompt and retry with rephrasings such as \"just tell me the number\"" },
        { id: "c", text: "Raise temperature so the tutor becomes stricter" },
        { id: "d", text: "Move the rule into the user's question each time" }
      ],
      correct: ["b"],
      why: "A single success is not a test. The constraint should survive users asking for the answer directly."
    },
    {
      id: "a08",
      domain: "Temperature",
      select: 2,
      stem: "Which two uses of temperature match the lesson?",
      options: [
        { id: "a", text: "Near 0 when you extract fields and the format matters more than wording" },
        { id: "b", text: "Higher, toward 1, when you want several different draft phrasings" },
        { id: "c", text: "Set to 1 to make the model smarter on a hard proof" },
        { id: "d", text: "Set to 0 to cut the token bill in half" }
      ],
      correct: ["a", "b"],
      why: "Temperature changes how often the model leaves the most likely next token. It does not add knowledge or change the price by itself."
    },
    {
      id: "a09",
      domain: "Streaming",
      select: 1,
      stem: "You turn on streaming for a long explanation. Which statement is true?",
      options: [
        { id: "a", text: "The generation becomes shorter and cheaper because you display it early" },
        { id: "b", text: "The user sees chunks sooner, but you still pay for the tokens that were generated" },
        { id: "c", text: "Streaming stores the conversation on Anthropic's side for the next call" },
        { id: "d", text: "max_tokens is ignored while the stream is open" }
      ],
      correct: ["b"],
      why: "Streaming changes when text appears, not how much is generated. Save the assembled message if the next turn needs history."
    },
    {
      id: "a10",
      domain: "Structured data",
      select: 1,
      stem: "Claude wraps an EventBridge rule in a markdown fence and adds a sentence after it. The lesson's fix does not change the user prompt. What does it do?",
      options: [
        { id: "a", text: "It only asks more politely for raw JSON" },
        { id: "b", text: "It prefills the assistant message with ```json and sets a stop sequence of ```" },
        { id: "c", text: "It sets temperature to 0 so the fence disappears" },
        { id: "d", text: "It reads the JSON from message.usage" }
      ],
      correct: ["b"],
      why: "Prefilling makes Claude continue inside an open code fence. The stop sequence cuts generation when Claude tries to close that fence, so the extra sentence never appears."
    },
    {
      id: "a11",
      domain: "Structured data",
      select: 1,
      stem: "You prefill three backticks and stop on three backticks, but the AWS CLI sample still starts with the word bash. Why is bash there?",
      options: [
        { id: "a", text: "It is a stop sequence that failed to match" },
        { id: "b", text: "Claude is adding a markdown language tag after the opening fence" },
        { id: "c", text: "The API key workspace was not Default" },
        { id: "d", text: "max_tokens inserted the language name" }
      ],
      correct: ["b"],
      why: "After an opening fence, Claude may write a language tag such as bash. The exercise puts bash into the prefill so that word is not generated again."
    },
    {
      id: "a12",
      domain: "Request path",
      select: 1,
      stem: "Which list is required on a basic messages.create call?",
      options: [
        { id: "a", text: "model, max_tokens, and messages" },
        { id: "b", text: "temperature, system, and a streaming flag" },
        { id: "c", text: "Only the API key. The model and the prompt are optional" },
        { id: "d", text: "A tool schema, or the call is rejected" }
      ],
      correct: ["a"],
      why: "Those three carry the call. system, temperature, and streaming are optional. The key is how the client authenticates, not a field inside messages."
    },
    {
      id: "a13",
      domain: "Request path",
      select: 1,
      stem: "Your app asks Claude for a long JSON report and json.loads fails because the object ends mid-field. Which stop reason most likely explains it?",
      options: [
        { id: "a", text: "end_turn, because Claude decided the report was finished" },
        { id: "b", text: "max_tokens, because generation hit the token limit you set" },
        { id: "c", text: "stop_sequence, because JSON always contains a stop phrase" },
        { id: "d", text: "tool_use, because Claude wanted to call a parser" }
      ],
      correct: ["b"],
      why: "max_tokens is a hard ceiling: generation stops there even mid-sentence. Check stop_reason before trusting the output, and raise the limit or ask for less."
    },
    {
      id: "a14",
      domain: "Streaming",
      select: 1,
      stem: "You call messages.create with stream=True and loop over the raw events. Which event type carries the chunks of generated text you forward to the browser?",
      options: [
        { id: "a", text: "MessageStart" },
        { id: "b", text: "ContentBlockStart" },
        { id: "c", text: "ContentBlockDelta" },
        { id: "d", text: "MessageStop" }
      ],
      correct: ["c"],
      why: "ContentBlockDelta events hold the text pieces. The SDK's messages.stream() helper filters them for you through text_stream, and get_final_message() returns the assembled message."
    },
    {
      id: "a15",
      domain: "System prompt",
      select: 1,
      stem: "Your helper always calls messages.create(..., system=system), and system is sometimes None. Requests without a role fail. What is the lesson's fix?",
      options: [
        { id: "a", text: "Pass an empty user message instead of the system prompt" },
        { id: "b", text: "Build a params dict and add the system key only when a system prompt is provided" },
        { id: "c", text: "Put the role into the first assistant message" },
        { id: "d", text: "Set temperature to 0 whenever system is None" }
      ],
      correct: ["b"],
      why: "The API does not accept system=None. The lesson's chat function adds params[\"system\"] only if a prompt was passed, then calls messages.create(**params)."
    },
    {
      id: "a16",
      domain: "Multi-turn",
      select: 1,
      stem: "A support chat works well, but input token usage grows with every turn of a long conversation. Why?",
      options: [
        { id: "a", text: "Claude stores the conversation and bills a storage fee per turn" },
        { id: "b", text: "Each request resends the entire message history, so earlier turns are counted again as input" },
        { id: "c", text: "max_tokens automatically increases on each turn" },
        { id: "d", text: "The system prompt is only sent on the first turn and then cached as output" }
      ],
      correct: ["b"],
      why: "The API is stateless. To keep context you send the full list every time, so input tokens grow with the conversation until it reaches the context window."
    }
  ]
};
