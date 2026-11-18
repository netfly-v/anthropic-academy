# Translating one Skilljar or Academy lesson into a Russian lesson fragment

You write the Russian text of ONE lesson page of the study site /Users/netfly/Projects/anthropic_academy (read its
CLAUDE.md, rules 1–5 of «Правила правки сайта», they are binding). The site is the owner's Russian notes of an
Anthropic Academy course: a full, faithful translation of the original lesson plus short «Пояснение» notes.
Older courses come from Skilljar (`tools/skilljar`), newer ones from academy.claude.com (`tools/academy`); the lesson
map says which.

## Inputs (paths in your task)
- the dump of the lesson: `NN-<id>.md` = page text (with code blocks), then «(video transcript)» (Skilljar: the
  subtitles; Academy: the text of the lesson's Transcript tab);
- the raw HTML of the page `NN-<id>.html` — use it when you need the exact code text or the exact structure;
- the lesson map of the course: site numbers, files, Russian titles, original ids (Skilljar) or slugs (Academy), images of each lesson;
- a format reference: a finished lesson of the site (see below).

## Output
Write ONLY the fragment file named in your task (UTF-8). Do not touch any other file. The fragment is the content of
`<main class="lesson">` WITHOUT the pager and WITHOUT the «Оригинал урока» line (the builder adds them). Every line is
indented by 6 spaces like the reference. Skeleton:

```
      <h1>{Russian title from the lesson map}</h1>
      <div class="rule"></div>
      <p class="kicker">Чему научитесь</p>
      <p class="estimate">Видео 4:40 и текст урока</p>
      <p>К концу урока вы сможете:</p>
      <ul class="objectives">
        <li>…;</li>
        <li>….</li>
      </ul>
      <p class="duration">Видео и текст урока.</p>
      {video block}

      {translation: <p>, <h2>, <h3>, <ul>/<ol><li>, <pre>, <figure class="shot">, <aside class="callout">}

      <h2>Дальше</h2>
      <p>…</p>
```

Video block:
- Skilljar video (JW Player): the reference block
  `<a class="video-link" href="https://anthropic.skilljar.com/{course}/{sid}" target="_blank" rel="noopener noreferrer">`
  `<strong>Смотреть урок на Skilljar</strong>` `<span>{English lesson title} · 4:40</span>` `</a>`.
- YouTube video embedded in the page (every Academy lesson with a video): `<div class="video">` + `<iframe src="https://www.youtube.com/embed/{id}"
  title="{English lesson title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
  picture-in-picture" allowfullscreen></iframe>` + `</div>` (as in skills/lessons/01-what-are-skills.html).
- Page with no text, only a video: estimate «Видео 3:09», duration line «На странице урока только видео. Ниже — его
  содержание по субтитрам.», then a structured Russian rendering of the transcript (headings, paragraphs, lists),
  in the video's order, nothing invented. Code that is only read out or shown in the video is reconstructed from the
  transcript and marked so in a short «Пояснение» («код восстановлен по видео»).

Academy pages:
- The page text starts with a card that repeats the lesson title and gives a short summary paragraph: translate the
  summary paragraph as the first paragraph after the video block, drop the repeated title.
- `[VIDEO youtube <id>]` marks where the video is; it becomes the video block above.
- `[PROMPT]…[/PROMPT]` is a sample prompt shown in a box: keep it in English, exactly, in a `<pre>` (as the site does
  with prompts in api/lessons/23-being-specific.html); translate the text around it.
- Buttons such as «Watch on YouTube», «Copy prompt», «Open in Claude Code» are not part of the text.

## Translation rules
- Translate EVERY paragraph, heading, list item and table of the page text, in the same order. Nothing dropped,
  nothing merged away, nothing added except «Чему научитесь», «Пояснение» notes and «Дальше». Headings are
  translated. Natural Russian, no calques, the register of the site's lessons; «ёлочки» for quotes, em dash «—».
- Do NOT translate: code, commands, slash commands, flags, file and folder names, settings keys, JSON fields, hook
  event names, API terms (max_tokens, tool_use, prefill…), model, product and package names (Claude Code, MCP
  Inspector, FastMCP, GitHub Actions), URLs. Inline code goes in `<code>`. Keep the course's code and names exactly
  as on Skilljar even when outdated — explain the difference in a «Пояснение» instead of changing the code.
- Code blocks: `<pre>` with the exact code of the page (HTML-escape `<`, `>`, `&`). No syntax highlighting markup.
- Site terms: chunk → «фрагмент» (never «чанк»); cache → «кеш»; prompt → «промпт»; tool → «инструмент»;
  resource → «ресурс»; hook → hook (plural «hooks»), skill → skill («skills»), plugin → «плагин», subagent →
  «субагент», worktree → worktree, routine → routine, permission mode → «режим разрешений». If the course was
  already translated elsewhere on the site (api/lessons/54–64 for MCP), keep its terms.
- Pictures: put each `[IMG k]` of the dump at the same place as
  `<figure class="shot"><img src="../../assets/{dir}/{file}" alt="{what the picture shows, in Russian, one sentence}">`
  `<figcaption>{short Russian caption}</figcaption></figure>`. Open every picture with the Read tool and look at it
  before writing alt and caption. The lesson map lists the asset file of each picture.
- Objectives («К концу урока вы сможете:»): 2–4 items that the lesson really teaches, lowercase, «;» between,
  «.» after the last.
- «Пояснение» (`<aside class="callout"><p class="callout-label">Пояснение</p>…</aside>`, a `<ul>` of
  `<li><strong>Тема.</strong> …</li>` when there are several points): for what is unclear, too short, or outdated.
  Every fact about the current product, SDK or protocol must be checked on the live documentation with WebFetch
  (code.claude.com/docs, platform.claude.com/docs, modelcontextprotocol.io, the official SDK repository) and stated
  with the date («на ноябрь 2026») when it can change; name the page you used in your final report, not in the
  fragment. If the lesson contradicts the current documentation, say so plainly and give the current behaviour.
  Never pad: no notes that only repeat the lesson.
- Size norm for notes: at most about a quarter of the lesson text, usually one or two callouts of 60–200 words in
  total. Keep, in this priority: (1) where the lesson contradicts the current documentation — the current behaviour,
  briefly; (2) outdated code, commands or names and what to use now; (3) a short clarification of what the lesson
  leaves genuinely unclear for a learner preparing for the Claude certification. Leave out details beyond the
  lesson's content (plans, prices, numeric limits, neighbouring features, version numbers that do not matter).
- «Дальше»: one or two sentences about the next lesson (its Russian title from the lesson map). After the last lesson
  of the course: the official test of the course on Skilljar or Academy, if the lesson map lists one (link with
  target="_blank" rel="noopener noreferrer", question count from the lesson map when known), and our practice exam
  `../quiz.html`.
- No `<main>`, no pager, no «Оригинал урока», no inline styles, no scripts.

## Final report (your structured output)
The fragment path, a one-line Russian `note` for the course page card (≤ 60 characters, what the lesson gives),
the documentation pages you used, and anything in the lesson you could not translate faithfully.
