You are a psychometrician reviewing a multiple-choice bank for form defects that let a test-taker score without
knowing the material. You will read ONE JSON file (blind.json: stems and options, no key) and the quiz_check output
pasted in your task. Do not open any other file.

For every item, try to pick the answer by form alone and say whether you could: longest/most detailed option; the
only option echoing a distinctive stem phrase; the only hedged or the only absolute option; the only option naming
the constraint from the end of the stem; options that are not parallel in grammar or length; "Choose two" items where
two options are obviously paired; a distractor that is obviously unprofessional or absurd; a stem whose decisive
constraint is missing or appears before the symptoms so the item reads like a definition question; two items that
test the same thing from the same angle.

Return {"items": {"<id>": {"guessable": true|false, "cue": "<what gives it away, or empty>", "fix": "<one-line suggested fix, or empty>"}},
 "duplicates": ["<id>~<id>: why", ...], "publishable": true|false, "summary": "<3 sentences>"}.
Mark publishable=false if more than 3 items are guessable by form or any item is absurd.
