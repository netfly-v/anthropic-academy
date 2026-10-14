window.QUIZ_BANK = {
  id: "api-prompting",
  passPercent: 70,
  questions: [
    {
      id: "p01",
      domain: "Process",
      select: 1,
      stem: "You have a baseline eval score for a new prompt. According to the course, what should the next iterations look like?",
      options: [
        { id: "a", text: "Apply every technique at once, then evaluate once at the end" },
        { id: "b", text: "Apply one technique, re-evaluate, keep what improves the score, and repeat" },
        { id: "c", text: "Skip evaluation once the prompt reads well to a human" },
        { id: "d", text: "Regenerate the dataset before each change so the model sees new inputs" }
      ],
      correct: ["b"],
      why: "The cycle is: set a goal, write an initial prompt, evaluate, apply techniques, re-evaluate, repeating the last two. One change at a time shows which technique actually helped."
    },
    {
      id: "p02",
      domain: "Process",
      select: 1,
      stem: "Your first prompt scores 2.3 out of 10 in the eval report. How does the course suggest you read this?",
      options: [
        { id: "a", text: "The grader is broken, so switch graders until the score rises" },
        { id: "b", text: "A low first score is normal; it is a baseline to measure improvements against" },
        { id: "c", text: "The model is unsuitable for the task" },
        { id: "d", text: "The dataset has too few cases to be useful" }
      ],
      correct: ["b"],
      why: "A deliberately naive first prompt is expected to score low. What matters is consistent improvement as techniques are applied, and the report's per-case reasoning shows where to start."
    },
    {
      id: "p03",
      domain: "Process",
      select: 1,
      stem: "The course's PromptEvaluator runs test cases concurrently. You start getting rate limit errors. What should you change?",
      options: [
        { id: "a", text: "Lower max_concurrent_tasks, then raise it only if your API quota allows" },
        { id: "b", text: "Increase num_cases so requests are spread out" },
        { id: "c", text: "Add more extra_criteria to slow the grader down" },
        { id: "d", text: "Remove the grader from the pipeline" }
      ],
      correct: ["a"],
      why: "Concurrency speeds up the eval but sends many requests at once. The lesson recommends starting low (around 3) and increasing only within your rate limits."
    },
    {
      id: "p04",
      domain: "Clear and direct",
      select: 1,
      stem: "Which opening line best follows the course's 'clear and direct' guidance for a meal-planning prompt?",
      options: [
        { id: "a", text: "What should this person eat?" },
        { id: "b", text: "I was wondering if you could maybe help with some food ideas for an athlete?" },
        { id: "c", text: "Generate a one-day meal plan for an athlete that meets their dietary restrictions." },
        { id: "d", text: "Food. Athlete. Restrictions." }
      ],
      correct: ["c"],
      why: "It is an instruction, not a question, starts with an action verb, names what to create and states the key constraints. In the course this change alone raised the score from 2.32 to 3.92."
    },
    {
      id: "p05",
      domain: "Clear and direct",
      select: 2,
      stem: "Which two changes make a prompt more 'direct' in the course's sense?",
      options: [
        { id: "a", text: "Turning a question into an instruction" },
        { id: "b", text: "Starting with an action verb such as Write, Create or Generate" },
        { id: "c", text: "Adding a polite preamble about why you are asking" },
        { id: "d", text: "Moving the task to the last line of the prompt" }
      ],
      correct: ["a", "b"],
      why: "Direct means instructions rather than questions, led by an action verb. The first line matters most, so the task belongs there, not at the end."
    },
    {
      id: "p06",
      domain: "Being specific",
      select: 1,
      stem: "A prompt asks for a short story. You add: under 1,000 words, one clear action that reveals the talent, at least one supporting character. Which kind of specificity is this?",
      options: [
        { id: "a", text: "Process steps" },
        { id: "b", text: "Output quality guidelines" },
        { id: "c", text: "Multi-shot examples" },
        { id: "d", text: "XML structuring" }
      ],
      correct: ["b"],
      why: "These list qualities the output should have (length, structure, required elements). Process steps would instead tell Claude what to do first, second and so on."
    },
    {
      id: "p07",
      domain: "Being specific",
      select: 1,
      stem: "You ask Claude why a sales team's results dropped 30% and it blames only the economy. What does the course recommend adding?",
      options: [
        { id: "a", text: "A higher max_tokens value" },
        { id: "b", text: "Process steps that walk Claude through market metrics, industry changes, individual performance, organizational changes and customer feedback" },
        { id: "c", text: "A single example of a correct answer from another company" },
        { id: "d", text: "Nothing; analysis tasks should stay open-ended" }
      ],
      correct: ["b"],
      why: "Process steps are for troubleshooting, decision-making and critical thinking, where you want Claude to consider multiple angles instead of fixing on one cause."
    },
    {
      id: "p08",
      domain: "Being specific",
      select: 1,
      stem: "When should output quality guidelines be included, according to the course?",
      options: [
        { id: "a", text: "Only for creative writing" },
        { id: "b", text: "Almost always; they are the safety net for consistent results" },
        { id: "c", text: "Only when the prompt has no examples" },
        { id: "d", text: "Never together with process steps" }
      ],
      correct: ["b"],
      why: "Guidelines belong in almost every prompt; steps are added for complex problems. Professional prompts often combine both."
    },
    {
      id: "p09",
      domain: "XML tags",
      select: 1,
      stem: "Your prompt pastes 20 pages of sales records followed by instructions, and Claude sometimes treats part of the instructions as data. What is the course's fix?",
      options: [
        { id: "a", text: "Shorten the records to one page" },
        { id: "b", text: "Wrap the records in descriptive tags such as <sales_records></sales_records>" },
        { id: "c", text: "Put the instructions in all caps" },
        { id: "d", text: "Send the records and the instructions in two separate API calls" }
      ],
      correct: ["b"],
      why: "XML tags give clear boundaries between interpolated data and instructions, which matters most when the prompt contains large or mixed content."
    },
    {
      id: "p10",
      domain: "XML tags",
      select: 1,
      stem: "Which tag naming choice matches the course's advice?",
      options: [
        { id: "a", text: "Use only official tag names defined by Anthropic" },
        { id: "b", text: "Use generic names like <data> everywhere so prompts are uniform" },
        { id: "c", text: "Use descriptive custom names like <my_code> and <docs> that say what each section holds" },
        { id: "d", text: "Avoid closing tags to save tokens" }
      ],
      correct: ["c"],
      why: "There are no official tags. Specific, descriptive names (<sales_records> rather than <data>) help Claude understand each section's purpose."
    },
    {
      id: "p11",
      domain: "XML tags",
      select: 2,
      stem: "In which two situations are XML tags most useful?",
      options: [
        { id: "a", text: "The prompt mixes code, documentation and data" },
        { id: "b", text: "The prompt interpolates several variables or large amounts of context" },
        { id: "c", text: "The prompt is a one-sentence question with no inserted content" },
        { id: "d", text: "You want Claude to answer faster" }
      ],
      correct: ["a", "b"],
      why: "Tags shine with large or varied content and multiple interpolated inputs. On very simple prompts the gain may be small, though tags still work as delimiters."
    },
    {
      id: "p12",
      domain: "Examples",
      select: 1,
      stem: "A sentiment classifier labels sarcastic tweets as positive. What does the course add to fix this?",
      options: [
        { id: "a", text: "A rule that every tweet with 'Excellent!' is negative" },
        { id: "b", text: "Examples including a sarcastic tweet labeled Negative, wrapped in tags, with context on why sarcasm needs care" },
        { id: "c", text: "A higher temperature so the model considers more meanings" },
        { id: "d", text: "A longer list of positive words" }
      ],
      correct: ["b"],
      why: "Examples are the tool for corner cases. The course pairs a clear positive example with a sarcastic one and explains why sarcasm should be treated carefully."
    },
    {
      id: "p13",
      domain: "Examples",
      select: 1,
      stem: "What is the difference between one-shot and multi-shot prompting?",
      options: [
        { id: "a", text: "One-shot sends one API request; multi-shot sends several" },
        { id: "b", text: "One-shot gives a single example to set the pattern; multi-shot gives several examples covering different scenarios" },
        { id: "c", text: "One-shot uses no XML tags; multi-shot requires them" },
        { id: "d", text: "One-shot is for classification only" }
      ],
      correct: ["b"],
      why: "Use multi-shot when you need to cover various edge cases or show different valid responses. Anthropic's docs suggest 3-5 relevant, diverse, structured examples."
    },
    {
      id: "p14",
      domain: "Examples",
      select: 1,
      stem: "Where does the course suggest finding good examples for a prompt you are already evaluating?",
      options: [
        { id: "a", text: "The lowest-scoring outputs, to show Claude what to avoid" },
        { id: "b", text: "The highest-scoring outputs from your eval runs, used as input/output pairs" },
        { id: "c", text: "Random outputs from a different model" },
        { id: "d", text: "The grader's reasoning text" }
      ],
      correct: ["b"],
      why: "Outputs that scored 10 (or your best) show what ideal looks like for your use case. The course also adds a note explaining why the example is good."
    },
    {
      id: "p15",
      domain: "Examples",
      select: 1,
      stem: "You add an ideal output example to a meal-plan prompt. What extra step does the course recommend?",
      options: [
        { id: "a", text: "Hide the example in the system prompt so the user cannot see it" },
        { id: "b", text: "Explain after the example why it is ideal (structure, detail, fit to goals and restrictions)" },
        { id: "c", text: "Remove all instructions, since the example replaces them" },
        { id: "d", text: "Repeat the example three times for emphasis" }
      ],
      correct: ["b"],
      why: "Context about why the output is good helps Claude learn the reasoning behind good responses, not only the format."
    },
    {
      id: "p16",
      domain: "Process",
      select: 1,
      stem: "In the topic-extraction exercise, the eval report shows most outputs failing for the same reason: they are not a JSON array of strings. Which change gave the biggest jump in the course?",
      options: [
        { id: "a", text: "Adding a multi-shot example set" },
        { id: "b", text: "Rewriting the first line to state clearly and directly that topics must be extracted into a JSON array of strings" },
        { id: "c", text: "Raising max_concurrent_tasks" },
        { id: "d", text: "Changing the grader's criteria" }
      ],
      correct: ["b"],
      why: "Read the report, find the common failure, fix it directly. One clear and direct first line took the score from 2.8 to 9.5; XML tags and steps were added afterwards for robustness."
    }
  ]
};
