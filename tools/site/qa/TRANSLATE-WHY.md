# Translating `why` explanations of practice exams into Russian

The site (/Users/netfly/Projects/anthropic_academy, a Russian study site for Anthropic Academy courses) shows
each exam item's English `why` after Submit. Under it, it shows your Russian translation. Questions and options
stay in English (like the real exam), so the translation must let a Russian reader map it back to the options.

Rules:
- Translate the meaning fully and faithfully: every sentence, same order, nothing added, nothing dropped, no new
  explanations. Natural Russian, the register of the site's lessons (see <course>/lessons/*.html for usage).
- Do NOT translate: API parameters and fields (max_tokens, stop_reason, tool_use, tool_result, temperature, prefill,
  system prompt as a parameter name, budget_tokens, cache_control …), code, file names (CLAUDE.md, SKILL.md),
  commands, flags, settings keys, hook event names, model names, product names (Claude Code, Claude.ai,
  MCP Inspector, GitHub Actions), URLs, the names BM25, RRF, RAG, MCP, JSON-RPC.
- Usual site terms (check the site's lessons when unsure): chunk → фрагмент (never «чанк»); cache → кеш,
  кеширование (not «кэш»); embedding → эмбеддинг; prompt → промпт; tool → инструмент; resource → ресурс;
  workflow → workflow (or «рабочий процесс» where it reads better); agent → агент; eval → оценка/eval;
  grader → грейдер.
- Option letters stay as they are: "(b)", "Option c" → «вариант c».
- Quoted lesson phrases: translate them, in «ёлочках».
- Lesson citations "Lesson 5, Defining tools with MCP" → «урок 5 „<Russian title>“», using the site's Russian
  lesson title (the <h1> of the lesson page in <course>/lessons/).
- Do not start with «Верно.»/«Неверно.» — the page adds that itself.
- Plain text only (no HTML, no Markdown).

Output: a JSON object {"<item id>": "<Russian text>", ...} with exactly the bank's item ids, written with
ensure_ascii=False to the output path named in your task. Then validate it: python3 -c "import json;d=json.load(open(PATH));print(len(d))".
To read a bank: node -e "const vm=require('vm');const w={};vm.runInNewContext(require('fs').readFileSync(process.argv[1],'utf8'),{window:w});console.log(JSON.stringify(w.QUIZ_BANK.questions.map(q=>({id:q.id,why:q.why})),null,1))" <bank.js>
Install: python3 tools/site/why_ru.py js/<bank>.js <file>.json
