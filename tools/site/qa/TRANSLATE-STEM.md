# Translating exam question stems into Russian

The site (/Users/netfly/Projects/anthropic_academy) shows each English exam question; after the learner picks an
answer they may open a Russian translation of the STEM ONLY (options stay English). It is a self-check of
understanding, not a hint. Read the rules in tools/site/hard-quiz-requirements.md, item 7 ("Перевод условия") —
they are binding. In short:
- Exact, not simplified: keep every condition, constraint, quantity and qualifier ("only data from the quote",
  "just below max_tokens", "no answer at all", "the history may not be shortened", "already", "every", "only").
  These words rule out wrong options; never drop, soften or strengthen them. Keep the question's exact form
  ("Which change…", "What is the most likely cause…", "Which two…").
- Do not hint: add nothing that is not in the English, do not explain terms the English does not explain, do not
  emphasise or reorder so that a key word stands out, do not use wording that echoes one option more than others.
- Do not translate API terms, parameters, fields, code, file names, commands, flags, settings keys, hook event names,
  product and model names (max_tokens, prefill, stop_reason, tool_use, cache breakpoint, file_id, system prompt,
  CLAUDE.md, /init, MCP, Claude Code, BM25, RRF…). Quoted strings, user prompts and error messages from the stem
  stay in English inside «…». Other terms as the site's lessons say them: chunk → «фрагмент», cache → «кеш»,
  embedding → «эмбеддинг», prompt → «промпт», tool → «инструмент», resource → «ресурс», grader → «грейдер».
- Natural Russian, no calques; "(Choose two.)" → «(Выберите два.)». Plain text, no HTML/Markdown.

Output: JSON {"<item id>": "<Russian stem>"} with exactly the ids you were given, written with ensure_ascii=False to
the output path in your task; check it loads. To read stems:
node -e "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});for(const q of w.QUIZ_BANK.questions)console.log(q.id+': '+q.stem)" <bank.js>
Install: python3 tools/site/why_ru.py --field stem_ru js/<bank>.js <file>.json
