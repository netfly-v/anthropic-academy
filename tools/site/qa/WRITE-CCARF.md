# Writing one page of the «CCAR-F: темы вне курсов» section

The study site /Users/netfly/Projects/anthropic_academy (Russian notes of Anthropic Academy courses) has a section
`ccar-f/` for the owner's exam, Claude Certified Architect – Foundations (CCAR-F). Each page covers ONE exam topic
that the site's courses miss or cover only partly. There is no original course: every statement is checked on the
live official documentation and linked to it. The owner reads code poorly: explain meaning and the architect's
decisions, not syntax.

## Inputs (paths in your task)
- the brief of your page: the exam-guide bullets it must cover (guide wording — for you only), what the courses
  already have, the lessons to link to, the documentation areas;
- the existing lesson pages named in the brief (read them: link instead of repeating);
- the live docs: platform.claude.com/docs, code.claude.com/docs, modelcontextprotocol.io (WebFetch). Anthropic
  Engineering articles (anthropic.com/engineering) may be used as background, never as the only source of a claim
  about how the product behaves.

## Output
Write ONLY the fragment file named in your task (UTF-8): the content of `<main class="lesson">` without the pager.
Every line indented by 6 spaces. Skeleton:

```
      <h1>{Russian title from the brief}</h1>
      <div class="rule"></div>
      <p class="kicker">Домен N · подпункты X.Y, X.Z</p>
      <h2>Что уже есть в курсах</h2>
      <ul> one line per lesson: <li><a href="../../{course}/lessons/{file}">{Course label} · {lesson h1}</a> — what it already
      covers (a few words)</li></ul>   (or one sentence «В курсах сайта этой темы нет.»)
      Course labels: Skills, API, MCP, Claude Code (= Claude Code in Action), Subagents, Tool use, Platform 101, Claude Code 101.

      <h2>Простыми словами</h2>
      … the idea and the decision rule; for a partly covered topic, only what the lessons lack …

      <h2>Пример</h2>
      … one realistic production scenario in the spirit of the exam (customer-support agent, CI pipeline,
      multi-agent research system, structured-data extraction, developer-productivity agent, a team's Claude Code
      setup): what goes wrong or what has to be decided, and what the architect does …

      <h2>Как это спрашивают</h2>
      … plain text, NOT a quiz: the typical situation in a question, the tempting wrong moves (a rule in the prompt
      instead of code, a bigger model, a confidence score, more retries…) and why the right move is right …

      <aside class="callout"><p class="callout-label">Курс vs экзамен</p> … </aside>   (only when needed)

      <h2>Документация</h2>
      <ul><li><a href="{official doc URL}" target="_blank" rel="noopener noreferrer">{page title}</a> — {what it gives}</li>…</ul>
```

## Rules
- Short: 450–600 words of text, counting everything except the «Что уже есть в курсах» and «Документация» link
  lists. Short paragraphs; lists where they help. One example, not several.
- Cover the meaning of every bullet of the brief. Do not go beyond the exam's topic. Never detail topics outside
  the exam (fine-tuning, embeddings and vector databases, computer use, vision, streaming, prompt-caching details,
  prices, token counting).
- Never copy the guide's wording, its sample questions or their scenarios and tool names (get_customer,
  lookup_order, process_refund, escalate_to_human, analyze_content…): invent your own scenarios and names. Never use
  questions from third-party exam trainers. The site is public.
- Fully covered aspects: one line with a link, no retelling. Partly covered: add only what the lesson lacks.
- «Курс vs экзамен» callout: only when the difference could change the answer on the exam or would confuse a learner
  who studied the course (not for minor nuances); when a site course or the current docs/API differ from how the exam frames the topic
  (for example, forced tool_choice is rejected with a 400 on the newest models per the Tool use course; skills/03
  says allowed-tools only pre-approves tools). State both sides briefly: what to answer on the exam and how the
  product works today, with the date «на ноябрь 2026».
- Code: only when the idea cannot be understood without it — a short config fragment (frontmatter, .mcp.json, a
  CLI flag, a JSON field), each explained in a sentence. No Python programs.
- Every fact about the product, API, SDK or protocol must be on a doc page you opened today; the page goes into
  «Документация». If a guide term is renamed in the current product (for example the Task tool), give both names.
- Terms as on the site: subagent → «субагент», tool → «инструмент», prompt → «промпт», cache → «кеш», chunk →
  «фрагмент»; API terms, field names, flags and product names stay in English; «ёлочки», em dash —.
- Internal links: `../../<course>/lessons/<file>` to existing lessons only (check the file exists), and
  `NN-<slug>.html` to other pages of this section only if the brief names them.
- No `<main>`, no pager, no inline styles, no scripts.

## Final report (your structured output)
The fragment path, the documentation URLs you used, and any bullet you could not cover from the docs.
