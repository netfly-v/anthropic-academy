# Выгрузка уроков Skilljar

Снимает оригинальные уроки Anthropic Academy со Skilljar: текст, код, картинки и английские субтитры видео. По этому дампу пишутся русские страницы сайта.

Окружение и профиль браузера лежат вне репозитория:

- `~/.academy-browser/venv` — Python с Playwright (`python3 -m venv ~/.academy-browser/venv && ~/.academy-browser/venv/bin/pip install playwright`);
- `~/.academy-browser/profile` — профиль Google Chrome с сессией Skilljar. Его никогда не коммитить.

```sh
PY=~/.academy-browser/venv/bin/python

$PY tools/skilljar/skilljar.py login                       # окно Chrome: войти в Skilljar и закрыть окно
$PY tools/skilljar/skilljar.py toc claude-with-the-anthropic-api                # оглавление с номерами
$PY tools/skilljar/skilljar.py dump claude-with-the-anthropic-api --from 16 --to 23
```

Дамп складывается в `~/Projects/skilljar-dump/<course-slug>/`:

- `NN-<id>.txt` — текст урока по блокам (`##` заголовки, `-` списки, блоки кода, `[IMG k: alt]` на месте картинок);
- `NN-<id>.html` — исходный HTML урока;
- `NN-<id>.srt` — английские субтитры видео, если оно есть;
- `images/NN-<id>-KK.*` — картинки урока по порядку;
- `manifest.json` — номер, id, название, раздел, ссылка, картинки и видео каждого урока.

Номер `NN` — позиция в оглавлении курса (`toc`), а не номер страницы на сайте.

Если `toc` или `dump` пишет, что оглавление пустое, сессия истекла: снова запустите `login`.
