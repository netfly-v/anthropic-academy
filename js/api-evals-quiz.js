window.QUIZ_BANK = {
  id: "api-evals",
  passPercent: 70,
  questions: [
    {
      id: "e01",
      domain: "Why evaluate",
      select: 1,
      stem: "A teammate tested a new support prompt on two questions, liked the answers, and wants to ship it today. What is the main risk the course warns about?",
      options: [
        { id: "a", text: "Real users send inputs nobody anticipated, so a prompt that passed a few manual checks can break in production" },
        { id: "b", text: "The prompt will cost more tokens than an evaluated prompt" },
        { id: "c", text: "Claude refuses prompts that have not been through an evaluation pipeline" },
        { id: "d", text: "Manual testing changes the model's temperature" }
      ],
      correct: ["a"],
      why: "Options 1 and 2 (test once, or tweak for a corner case or two) are the common traps. Users bring edge cases you did not think of; an eval pipeline scores the prompt across many cases before users find the problems."
    },
    {
      id: "e02",
      domain: "Why evaluate",
      select: 1,
      stem: "Which statement best separates prompt engineering from prompt evaluation?",
      options: [
        { id: "a", text: "Engineering is for code prompts, evaluation is for chat prompts" },
        { id: "b", text: "Engineering is techniques for writing better prompts; evaluation measures how well a prompt actually works through automated testing" },
        { id: "c", text: "Evaluation replaces engineering once you have a dataset" },
        { id: "d", text: "Engineering happens in production, evaluation only in notebooks" }
      ],
      correct: ["b"],
      why: "Multishot examples and XML tags are engineering techniques. Evaluation tests against expected answers, compares prompt versions and reviews outputs for errors. The two work together: change the prompt, then measure."
    },
    {
      id: "e03",
      domain: "Eval workflow",
      select: 1,
      stem: "Put the course's eval workflow in order.",
      options: [
        { id: "a", text: "Create dataset → feed through a grader → draft prompt → feed through Claude → change prompt" },
        { id: "b", text: "Draft prompt → create eval dataset → feed through Claude → feed through a grader → change prompt and repeat" },
        { id: "c", text: "Draft prompt → feed through a grader → create eval dataset → ship" },
        { id: "d", text: "Feed through Claude → draft prompt → create dataset → average the scores" }
      ],
      correct: ["b"],
      why: "Draft, build the dataset, run each case through Claude, grade each output, then change the prompt and rerun to compare scores."
    },
    {
      id: "e04",
      domain: "Eval workflow",
      select: 1,
      stem: "Prompt v1 averaged 7.7 on 30 test cases. You edit the prompt and also regenerate a fresh dataset; v2 averages 8.6. What is the problem with concluding v2 is better?",
      options: [
        { id: "a", text: "Nothing, a higher average always means a better prompt" },
        { id: "b", text: "The dataset changed, so the scores are not comparable; both versions must run on the same dataset and the same grader" },
        { id: "c", text: "Averages are not allowed for model-graded scores" },
        { id: "d", text: "30 cases is too many for a fair comparison" }
      ],
      correct: ["b"],
      why: "That is why the course saves the dataset to dataset.json and reloads it. Change one thing at a time: the prompt, not the test set or the grader."
    },
    {
      id: "e05",
      domain: "Datasets",
      select: 2,
      stem: "Which two statements about the eval dataset match the course?",
      options: [
        { id: "a", text: "Each record holds an input that is interpolated into the prompt template" },
        { id: "b", text: "Generating test cases is a good job for a fast, cheap model such as Haiku" },
        { id: "c", text: "The dataset must be written by hand; model-generated test data is not allowed" },
        { id: "d", text: "Three records are enough for a production-grade evaluation" }
      ],
      correct: ["a", "b"],
      why: "Each object has a task field that run_prompt merges into the template. You can hand-write or generate the data; real evals use tens to thousands of records."
    },
    {
      id: "e06",
      domain: "Datasets",
      select: 1,
      stem: "Your dataset generator returns JSON wrapped in a markdown fence. In the course, how does generate_dataset get parseable JSON?",
      options: [
        { id: "a", text: "It asks again with temperature 0 until no fence appears" },
        { id: "b", text: "It prefills the assistant turn with ```json and stops on ```, then calls json.loads" },
        { id: "c", text: "It strips every line that starts with a backtick using a regex" },
        { id: "d", text: "It reads the JSON from response.usage" }
      ],
      correct: ["b"],
      why: "Same technique as the structured data lesson. On current models prefill returns a 400, and structured outputs (output_config.format with a JSON schema) give schema-valid JSON instead."
    },
    {
      id: "e07",
      domain: "Pipeline",
      select: 1,
      stem: "You want to try a new wording of the prompt under test. Which function of the course's pipeline do you change?",
      options: [
        { id: "a", text: "run_eval" },
        { id: "b", text: "run_prompt" },
        { id: "c", text: "grade_syntax" },
        { id: "d", text: "add_user_message" }
      ],
      correct: ["b"],
      why: "run_prompt merges the test case into the prompt template and calls Claude. run_test_case runs and grades one case; run_eval loops over the dataset and collects results."
    },
    {
      id: "e08",
      domain: "Pipeline",
      select: 1,
      stem: "In the first version of the pipeline every test case scores 10. Why?",
      options: [
        { id: "a", text: "Claude's answers were perfect" },
        { id: "b", text: "run_test_case uses a hardcoded placeholder score until a grader is written" },
        { id: "c", text: "run_eval averages away all errors" },
        { id: "d", text: "The dataset generator assigns the score" }
      ],
      correct: ["b"],
      why: "The TODO placeholder lets you test the whole pipeline first. The next lessons replace it with model and code graders."
    },
    {
      id: "e09",
      domain: "Model grading",
      select: 1,
      stem: "Your model grader returns only a number, and almost every output gets a 6. What does the course recommend?",
      options: [
        { id: "a", text: "Raise the temperature of the grader call" },
        { id: "b", text: "Ask the grader for strengths, weaknesses and reasoning alongside the score" },
        { id: "c", text: "Replace the model grader with human graders for every case" },
        { id: "d", text: "Multiply each score by a constant so the average reaches 8" }
      ],
      correct: ["b"],
      why: "Asked for a bare score, models default to middling values. Making the grader reason about strengths and weaknesses first pushes it toward a more concrete score."
    },
    {
      id: "e10",
      domain: "Model grading",
      select: 2,
      stem: "Which two criteria are better handled by a model grader than by a code grader?",
      options: [
        { id: "a", text: "Whether the response directly and accurately addresses the user's task" },
        { id: "b", text: "Whether a JSON answer parses with json.loads" },
        { id: "c", text: "Whether the answer is helpful and complete" },
        { id: "d", text: "Whether the response is under 200 characters" }
      ],
      correct: ["a", "c"],
      why: "Task following, helpfulness and completeness need judgment. Parsing and length are deterministic checks that code does faster, cheaper and without variance."
    },
    {
      id: "e11",
      domain: "Model grading",
      select: 1,
      stem: "Which grader type is the most flexible but also the slowest and most tedious?",
      options: [
        { id: "a", text: "Code graders" },
        { id: "b", text: "Model graders" },
        { id: "c", text: "Human graders" },
        { id: "d", text: "Syntax validators" }
      ],
      correct: ["c"],
      why: "People can judge depth, conciseness and relevance in any context, but it takes time. Use them for calibration and nuanced cases rather than every run."
    },
    {
      id: "e12",
      domain: "Code grading",
      select: 1,
      stem: "A test case expects a regular expression. Which check does the course's code grader use for valid syntax?",
      options: [
        { id: "a", text: "ast.parse on the output" },
        { id: "b", text: "re.compile on the output, returning 10 on success and 0 on re.error" },
        { id: "c", text: "Ask the model grader whether it looks like a regex" },
        { id: "d", text: "json.loads on the output" }
      ],
      correct: ["b"],
      why: "validate_json uses json.loads, validate_python uses ast.parse, validate_regex uses re.compile. Each returns 10 if parsing succeeds, 0 if it raises."
    },
    {
      id: "e13",
      domain: "Code grading",
      select: 1,
      stem: "How does the code grader know which validator to run for a test case?",
      options: [
        { id: "a", text: "It runs all three validators and keeps the highest score" },
        { id: "b", text: "Each test case carries a format field (python, json or regex) that grade_syntax dispatches on" },
        { id: "c", text: "It asks Claude which language the output is in" },
        { id: "d", text: "It guesses from the first character of the output" }
      ],
      correct: ["b"],
      why: "The dataset prompt is updated so every generated case includes the expected format, and grade_syntax picks the matching validator."
    },
    {
      id: "e14",
      domain: "Code grading",
      select: 1,
      stem: "The course combines the two graders with score = (model_score + syntax_score) / 2. A response has invalid syntax (0) but the model grader gives it 9. What is the combined score, and what does that reveal?",
      options: [
        { id: "a", text: "9, because the model grader overrides the code grader" },
        { id: "b", text: "4.5; equal weighting means broken code can still get a middling score, so you may weight or gate on syntax instead" },
        { id: "c", text: "0, because averaging always takes the minimum" },
        { id: "d", text: "10, because the scores are added" }
      ],
      correct: ["b"],
      why: "The lesson notes the weights can be adjusted to what matters for your use case. For code generation, treating invalid syntax as an automatic fail is a common choice."
    },
    {
      id: "e15",
      domain: "Grader design",
      select: 1,
      stem: "In the exercise, what two changes give the model grader a better idea of what a good solution looks like?",
      options: [
        { id: "a", text: "Raise max_tokens for the grader and run it twice" },
        { id: "b", text: "Generate solution_criteria for every test case, then insert those criteria into the grade_by_model prompt" },
        { id: "c", text: "Add the expected score to each test case" },
        { id: "d", text: "Switch the grader to a code grader" }
      ],
      correct: ["b"],
      why: "Per-case criteria act like a rubric: the grader compares the output against an explicit description of a good answer, which makes the reasoning and the score more grounded."
    },
    {
      id: "e16",
      domain: "Grader design",
      select: 1,
      stem: "Your eval average jumped after you changed only the grader prompt, not the prompt under test. How should you read that result?",
      options: [
        { id: "a", text: "The prompt under test improved" },
        { id: "b", text: "The measuring stick changed; rerun the old prompt with the new grader before comparing versions" },
        { id: "c", text: "The dataset must have been corrupted" },
        { id: "d", text: "Higher grader scores are always more accurate" }
      ],
      correct: ["b"],
      why: "Scores are only comparable under the same dataset and grader. When the grader changes, re-baseline every prompt version with it."
    }
  ]
};
