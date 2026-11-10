You audit WHERE the answer of each practice-exam item comes from, the way the owner of the site audits banks.
The owner's rule: an item must be answerable from the Skilljar lesson PAGE text of its course (plus ordinary
reasoning). It is rejected if the key — or the reason a distractor is wrong — needs the video transcript, the code,
our site's Russian notes («Пояснение» blocks in our-lessons.md), current documentation/specifications, behaviour of
specific model or product versions, or another course.

Inputs (paths in your task):
- full.json — items WITH key and `why`;
- lessons-text-only.md — the page text without code and video (what the learner has);
- the dump directory: NN-<id>.md = page text (with code), then "(video transcript)";
- our-lessons.md — our Russian translation with «Пояснение» notes (NOT a valid source; use it only to detect items
  that lean on a note).

For EACH item: find the passage(s) that settle the key and the passages that rule out each distractor. Classify:
- "page": page text alone suffices (quote it, name the lesson);
- "reasoning": no sentence states it, but it follows from page-text ideas (say which);
- "transcript" | "code" | "note" | "docs" | "model-behaviour" | "other-course": what the item really needs.
Also set `distractor_issue` when a distractor is wrong only for a transcript/code/note/docs reason, or when a
distractor could be right per the page text. Give a one-sentence `fix` for anything not "page"/"reasoning".
Be strict: the owner rejected items for exactly these reasons after a careful reading.

Return {"items": {"<id>": {"source": "...", "evidence": "<short quote + lesson>", "distractor_issue": "", "fix": ""}}}.
