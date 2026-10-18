"""Сборка курса Building with the Claude API из tools/site/blocks.json.

  python tools/site/build_api_block.py                      # пересобрать меню и страницу курса
  python tools/site/build_api_block.py --frags DIR          # + создать недостающие страницы уроков и экзаменов

DIR — папка с фрагментами <main> уроков: файл NN.html на урок api/lessons/NN-*.html
(всё содержимое <main> до блока «Назад/Дальше»: h1, «Чему научитесь», текст, «Пояснение», «Дальше»).
Существующие страницы уроков и экзаменов не перезаписываются: меняются только меню и api/index.html.
"""

import argparse
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
API = ROOT / "api"
LES = API / "lessons"
DATA = json.loads((pathlib.Path(__file__).parent / "blocks.json").read_text())
SJ = f"https://anthropic.skilljar.com/{DATA['course']}/"
SIDEBAR_RE = re.compile(r'        <p class="nav-group">Доступ к API</p>\n.*?(?=      </div>\n    </aside>)', re.S)


def link(sid, title):
    return f'<a href="{SJ}{sid}" target="_blank" rel="noopener noreferrer">{title}</a>'


def h1_of(path):
    return re.search(r"<h1>(.*?)</h1>", path.read_text()).group(1)


def sidebar(lp, rp, current):
    def li(href, title):
        cur = ' aria-current="page"' if href == current else ""
        return f'          <li><a href="{href}"{cur}><span class="mark"></span>{title}</a></li>'
    out = []
    for b in DATA["blocks"]:
        out += [f'        <p class="nav-group">{b["title"]}</p>', '        <ul class="lesson-nav">']
        out += [li(lp + l["file"], l["nav"]) for l in b["lessons"]]
        out += [li(rp + b["quiz"]["file"], "Practice exam"), "        </ul>"]
    return "\n".join(out) + "\n"


def set_sidebar(text, lp, rp, current):
    new, n = SIDEBAR_RE.subn(lambda m: sidebar(lp, rp, current), text)
    assert n == 1, "sidebar not found"
    return new


def create_lessons(frags):
    tpl = (LES / DATA["template_lesson"]).read_text()
    flat = [(b, l) for b in DATA["blocks"] for l in b["lessons"]]
    created = []
    for i, (b, l) in enumerate(flat):
        page = LES / l["file"]
        frag_path = frags / (l["file"][:2] + ".html")
        if page.exists() or not frag_path.exists():
            continue
        frag = frag_path.read_text()
        title = re.search(r"<h1>(.*?)</h1>", frag).group(1)
        t = re.sub(r"<title>.*?</title>", lambda m: f"<title>{title}</title>", tpl, count=1)
        start = t.index('<main class="lesson">\n') + len('<main class="lesson">\n')
        prev_href = flat[i - 1][1]["file"] if i else DATA["intro"][-1]["file"]
        last_in_block = l is b["lessons"][-1]
        nxt = (f'<a class="next" href="../{b["quiz"]["file"]}">К тесту</a>' if last_in_block
               else f'<a class="next" href="{flat[i + 1][1]["file"]}">Дальше</a>')
        pager = (f'            <div class="pager">\n        <a class="ghost" href="{prev_href}">Назад</a>\n'
                 f'        {nxt}\n      </div>\n\n'
                 f'            <p class="source">Оригинал урока: {link(l["sid"], l["orig"])}.</p>\n\n    </main>')
        tail = t[t.index("    </main>") + len("    </main>"):]
        page.write_text(t[:start] + frag + pager + tail)
        created.append(page.name)
    return created


def create_quizzes():
    tpl = (API / "quiz.html").read_text()
    created = []
    for b in DATA["blocks"]:
        q = b["quiz"]
        page = API / q["file"]
        if page.exists():
            continue
        t = re.sub(r"<title>Practice exam · [^<]+</title>", lambda m: f"<title>Practice exam · {q['page_title']}</title>", tpl, count=1)
        t = re.sub(r'<p class="kicker">[^<]+</p>', lambda m: f'<p class="kicker">{q["kicker"]}</p>', t, count=1)
        t = re.sub(r"\d+ items · about \d+ minutes", f"{q['items']} items · about {q['minutes']} minutes", t, count=1)
        t = re.sub(r'<script src="\.\./js/api-[^"]+-quiz\.js"></script>', f'<script src="../js/{q["bank"]}"></script>', t, count=1)
        if q.get("intro"):
            t = re.sub(r"<p>Scenario items for this block only\.[^<]*</p>", lambda m: f"<p>{q['intro']}</p>", t, count=1)
        page.write_text(t)
        created.append(page.name)
    return created


def card(l):
    h1 = h1_of(LES / l["file"])
    span = l["note"] + (f" · {l['dur']}" if l.get("dur") else "")
    return f'        <li><a href="lessons/{l["file"]}"><strong>{int(l["file"][:2])}. {h1}</strong><span>{span}</span></a></li>'


def quiz_card(b):
    q = b["quiz"]
    label = q.get("card_label", f"Practice exam · {b['title']}")
    note = q.get("card_note", f"{q['items']} вопросов по этому блоку, на английском")
    return f'        <li><a href="{q["file"]}"><strong>{label}</strong><span>{note}</span></a></li>'


def build_index():
    p = API / "index.html"
    t = p.read_text()
    titles = [f"«{b['title']}»" for b in DATA["blocks"] if not b.get("no_intro_mention")]
    blocks_text = ", ".join(titles[:-1]) + " и " + titles[-1] if len(titles) > 1 else titles[0]
    lines = [f"      <p>На Skilljar это длинный видеокурс. Здесь вводные уроки и блоки {blocks_text}. "
             "Текст по-русски, плюс пояснения там, где ролик уже расходится с текущим API. "
             "Видео остаются на Skilljar и открываются в новой вкладке.</p>",
             '      <ul class="card-list">']
    lines += [card(l) for l in DATA["intro"]]
    for i, b in enumerate(DATA["blocks"]):
        if i:
            lines += [f"      <h2>{b['title']}</h2>", '      <ul class="card-list">']
        lines += [card(l) for l in b["lessons"]]
        lines += [quiz_card(b), "      </ul>"]
    quizzes = [f"{link(b['official_quiz']['id'], b['official_quiz']['title'])} ({b['official_quiz']['questions']} вопросов)"
               for b in DATA["blocks"] if b.get("official_quiz")]
    quiz_list = ", ".join(quizzes[:-1]) + " и " + quizzes[-1] if len(quizzes) > 1 else quizzes[0]
    tail = f" Следующий раздел курса — {DATA['next_section']}." if DATA.get("next_section") else ""
    lines.append(f"      <p>У блоков в оригинале есть официальные квизы Skilljar: {quiz_list}. "
                 "Они проходятся на Skilljar и засчитываются в курс; наши Practice exam — отдельные тренировочные тесты. "
                 f"Опрос удовлетворённости из блока «Доступ к API» пропущен: в нём нет учебного материала.{tail}</p>")
    start = t.index("      <p>На Skilljar это длинный видеокурс.")
    end = t.index('      <p class="source">Оригинал курса:')
    t = t[:start] + "\n".join(lines) + "\n" + t[end:]
    p.write_text(set_sidebar(t, "lessons/", "", "index.html"))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--frags", type=pathlib.Path)
    args = ap.parse_args()
    if args.frags:
        print("lessons created:", create_lessons(args.frags))
        print("quizzes created:", create_quizzes())
    for page in sorted(LES.glob("*.html")):
        page.write_text(set_sidebar(page.read_text(), "", "../", page.name))
    for b in DATA["blocks"]:
        page = API / b["quiz"]["file"]
        if page.exists():
            page.write_text(set_sidebar(page.read_text(), "lessons/", "", b["quiz"]["file"]))
    build_index()
    print("sidebars and api/index.html rebuilt")


if __name__ == "__main__":
    main()
