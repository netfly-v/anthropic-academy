# Выгрузка уроков academy.claude.com

Новый сайт Anthropic Academy (academy.claude.com) заменяет Skilljar: старый сайт закрывается в начале декабря 2026.
Уроки на новом сайте открыты без входа, поэтому профиль браузера не нужен. Квизы курсов требуют входа и не
выгружаются.

Окружение то же, что у `tools/skilljar`: `~/.academy-browser/venv` с Playwright и youtube-transcript-api.
`academy.py` берёт из `tools/skilljar/skilljar.py` функцию снятия субтитров YouTube.

```sh
PY=~/.academy-browser/venv/bin/python

$PY tools/academy/academy.py toc claude-platform-101          # оглавление с номерами и разделами
$PY tools/academy/academy.py dump claude-platform-101 --from 3 --to 5
```

Slug курса — из адреса `https://academy.claude.com/courses/<slug>`. Дамп складывается в
`~/Projects/academy-dump/<slug>/` в том же формате, что дамп Skilljar:

- `NN-<slug урока>.txt` — текст урока по блокам: `##` заголовки, `-` и `1.` списки, блоки кода, `[IMG k: alt]` и
  `[VIDEO youtube <id>]` на своих местах. Особые блоки страницы помечены: `[NOTE]…[/NOTE]` — заметка на полях,
  `[READ MORE: …]` — раскрывающийся блок, `[PROMPT]…[/PROMPT]` — образец промпта в рамке, `[WIDGET…]…[/WIDGET]` —
  интерактивное демо (его текст в начальном состоянии);
- `NN-<slug урока>.html` — исходный HTML колонки урока;
- `NN-<slug урока>.transcript.txt` — транскрипт со вкладки Transcript, если она есть у урока;
- `NN-<slug урока>.srt` — английские субтитры YouTube; если YouTube отвечает IpBlocked, их нет, а длительность
  ролика берётся со страницы ролика;
- `images/NN-<slug урока>-KK.*` — картинки урока по порядку;
- `manifest.json` — номер, slug, название, раздел, ссылка, минуты чтения, картинки и видео каждого урока.

Номер `NN` — позиция в оглавлении курса (`toc`), квизы тоже занимают номер.
