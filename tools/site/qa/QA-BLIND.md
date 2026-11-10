You are taking a multiple-choice practice exam WITHOUT access to any study material. Do not open any other file,
do not search the web, do not use any knowledge source except the exam file itself. Read only the JSON file named
in your task: it holds the questions with their options but no answer key.

Answer every item. For items marked select 2 / "(Choose two.)" give two letters. For EACH item also record, in one
short sentence, the strongest CUE you used, and classify it as one of:
- "form": the answer could be picked without understanding the topic — longest/most detailed option, the only option
  that repeats a distinctive phrase of the stem, the only hedged option, the only option mentioning the constraint,
  an option that is the "odd one out" grammatically, absolute words (always/never/only) in the others, etc.;
- "common-sense": general engineering judgement, no course knowledge needed;
- "knowledge": you needed to know the specific technology or the course material.
Be honest and specific: name the cue ("the key is the only option mentioning 'reranker'"), not just the category.

Return the object {"answers": {"<id>": ["a"], ...}, "cues": {"<id>": {"type": "form|common-sense|knowledge", "cue": "..."}}}.
