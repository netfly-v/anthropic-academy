"""Сборка короткого курса (один экзамен на весь курс) из tools/site/courses/<курс>.json.

  python tools/site/build_course.py                       # пересобрать все курсы из tools/site/courses/
  python tools/site/build_course.py mcp --frags DIR       # + создать недостающие страницы уроков курса mcp
  python tools/site/build_course.py mcp --seed-from-api DIR
                                                           # черновики фрагментов из уроков курса API (from_api)

DIR — папка с фрагментами <main> уроков: файл NN.html на урок <курс>/lessons/NN-*.html (всё содержимое
<main> до блока «Назад/Дальше»: h1, «Чему научитесь», текст, «Пояснение», «Дальше»).
Существующие страницы уроков не перезаписываются: при каждом запуске меняются только их меню и пейджер.
Страница курса и страницы экзаменов (обычного и сложного, с переключателем Old/New) пересобираются целиком;
страница экзамена создаётся, только когда есть файл банка. В конце шапка всех страниц сайта и каталог
пересобираются через site_nav.py.

--seed-from-api берёт урок курса API, указанный в поле from_api, и пишет черновик фрагмента: ссылка на видео
ведёт на урок нового курса, картинки копируются в assets/<курс>/. Пользоваться только после сверки дампов:
текст, субтитры и картинки урока в обоих курсах должны совпадать. Черновик потом правится вручную
(соседние уроки, «Дальше», упоминания блока).
"""

import argparse
import json
import pathlib
import re
import shutil

import site_nav

ROOT = pathlib.Path(__file__).resolve().parents[2]
CONF = pathlib.Path(__file__).parent / "courses"
TPL_LESSON = ROOT / "api" / "lessons" / "13-structured-data-exercise.html"
TPL_QUIZ = ROOT / "api" / "quiz.html"
TPL_INDEX = ROOT / "api" / "index.html"
SIDEBAR_RE = re.compile(r'(?<=      <div class="sidebar-inner">\n).*?(?=      </div>\n    </aside>)', re.S)
MAIN_RE = re.compile(r'(?<=    <main class="lesson">\n).*?(?=    </main>)', re.S)
PAGER_RE = re.compile(r'      <div class="pager">\n.*?      </div>\n', re.S)
SCRIPTS_RE = re.compile(r'  <script src="\.\./js/[^/"]+-quiz\.js"></script>\n.*?(?=</body>)', re.S)
HARD_INTRO = ("Harder scenario items for this course: each one describes a situation and asks for the best decision, "
              "the likely cause or the first step. Choices are saved in this browser, separately from the basic exam. "
              "The score, the per-topic breakdown and the reasons stay hidden until you press Submit. "
              "Clear the attempt with Очистить after the result.")
BASIC_INTRO = ("Scenario items for the whole course. Choices are saved in this browser. The score, the per-topic breakdown "
               "and the reasons stay hidden until you press Submit. Clear the attempt with Очистить after the result.")


def sub1(pattern, repl, text, what):
    """Замена ровно одного места: если шаблон изменился, сборка падает, а не молчит."""
    new, n = re.subn(pattern, lambda m: repl, text, count=1)
    assert n == 1, f"{what} not found"
    return new


def link(c, sid, title):
    return f'<a href="https://anthropic.skilljar.com/{c["course"]}/{sid}" target="_blank" rel="noopener noreferrer">{title}</a>'


def lessons(c):
    return [(s, l) for s in c["sections"] for l in s["lessons"]]


def existing(c):
    """Уроки, у которых уже есть страница: только они попадают в меню, пейджер и на страницу курса."""
    les = ROOT / c["dir"] / "lessons"
    return [(s, l) for s, l in lessons(c) if (les / l["file"]).exists()]


def quiz_pages(c):
    pages = [(c["quiz"]["file"], c["quiz"])]
    if c.get("hard_quiz"):
        pages.append((c["hard_quiz"]["file"], c["hard_quiz"]))
    return [(f, q) for f, q in pages if (ROOT / "js" / q["bank"]).exists()]


def sidebar(c, lp, rp, current):
    """Меню курса: название, «Обзор курса», группы по разделам и группа «Экзамен»."""
    def li(href, title):
        cur = ' aria-current="page"' if href == current else ""
        return f'          <li><a href="{href}"{cur}><span class="mark"></span>{title}</a></li>\n'
    kicker = rp + "index.html"
    cur = ' aria-current="page"' if kicker == current else ""
    out = f'        <h2 class="course-title">{c["title"]}</h2>\n        <a class="course-kicker" href="{kicker}"{cur}>Обзор курса</a>\n'
    have = existing(c)
    for s in c["sections"]:
        items = [l for s2, l in have if s2 is s]
        if items:
            out += f'        <p class="nav-group">{s["title"]}</p>\n        <ul class="lesson-nav">\n'
            out += "".join(li(lp + l["file"], l["nav"]) for l in items) + "        </ul>\n"
    if quiz_pages(c):
        out += ('        <p class="nav-group">Экзамен</p>\n        <ul class="lesson-nav">\n'
                + li(rp + c["quiz"]["file"], "Practice exam") + "        </ul>\n")
    return out


def lint(c, l, frag):
    assert "<h1>" in frag, f'{l["file"]}: no <h1>'
    assert 'class="pager"' not in frag, f'{l["file"]}: pager inside the fragment'
    assert "assets/api/" not in frag, f'{l["file"]}: picture from assets/api/'
    for slug in re.findall(r"skilljar\.com/([a-z0-9-]+)/", frag):
        assert slug == c["course"] or l.get("allow_cross"), f'{l["file"]}: link to another course ({slug})'
    for sid in re.findall(r'class="video-link" href="https://anthropic\.skilljar\.com/[a-z0-9-]+/(\d+)"', frag):
        assert sid == l["sid"], f'{l["file"]}: video link to lesson {sid}, expected {l["sid"]}'


def create_lessons(c, frags):
    tpl = TPL_LESSON.read_text()
    created = []
    for s, l in lessons(c):
        page = ROOT / c["dir"] / "lessons" / l["file"]
        frag_path = frags / (l["file"][:2] + ".html")
        if page.exists() or not frag_path.exists():
            continue
        frag = frag_path.read_text()
        lint(c, l, frag)
        title = re.search(r"<h1>(.*?)</h1>", frag).group(1)
        t = sub1(r"<title>.*?</title>", f"<title>{title}</title>", tpl, "<title>")
        body = (frag + '      <div class="pager">\n      </div>\n\n'
                f'      <p class="source">Оригинал урока: {link(c, l["sid"], l["orig"])}.</p>\n')
        t = MAIN_RE.sub(lambda m: body, t, count=1)
        page.parent.mkdir(parents=True, exist_ok=True)
        page.write_text(site_nav.set_header(t, page))
        created.append(page.name)
    return created


def pager(c, i, have):
    prev = f'        <a class="ghost" href="{have[i - 1][1]["file"]}">Назад</a>\n' if i else ""
    if i + 1 < len(have):
        nxt = f'        <a class="next" href="{have[i + 1][1]["file"]}">Дальше</a>\n'
    elif quiz_pages(c):
        nxt = f'        <a class="next" href="../{c["quiz"]["file"]}">К тесту</a>\n'
    else:
        nxt = '        <a class="next" href="../index.html">К обзору</a>\n'
    return '      <div class="pager">\n' + prev + nxt + "      </div>\n"


def update_lessons(c):
    have = existing(c)
    for i, (s, l) in enumerate(have):
        page = ROOT / c["dir"] / "lessons" / l["file"]
        t = page.read_text()
        t = sub1(SIDEBAR_RE, sidebar(c, "", "../", l["file"]), t, f'{l["file"]}: sidebar')
        t = re.sub(PAGER_RE, lambda m: pager(c, i, have), t)
        assert t.count('<div class="pager">') == 1, f'{l["file"]}: pager'
        site_nav.write(page, t)


def build_quizzes(c):
    tpl = TPL_QUIZ.read_text()
    base = c["quiz"]
    for file, q in quiz_pages(c):
        hard = q is not base
        page = ROOT / c["dir"] / file
        t = sub1(r"<title>[^<]*</title>", f"<title>Practice exam · {'New · ' if hard else ''}{base['page_title']}</title>",
                 tpl, "<title>")
        t = sub1(SIDEBAR_RE, sidebar(c, "lessons/", "", base["file"]), t, "sidebar")
        switch = ""
        if len(quiz_pages(c)) == 2:
            def a(href, label):
                cur = ' aria-current="page"' if href == file else ""
                return f'        <a href="{href}"{cur}>{label}</a>\n'
            switch = ('      <nav class="quiz-switch" aria-label="Вариант экзамена">\n' + a(base["file"], "Old · базовый")
                      + a(c["hard_quiz"]["file"], "New · сложный") + "      </nav>\n")
        intro = q.get("intro", HARD_INTRO if hard else BASIC_INTRO)
        main = ('      <h1>Practice exam</h1>\n      <div class="rule"></div>\n' + switch
                + f'      <p class="kicker">{base["kicker"]}</p>\n'
                f'      <p class="estimate">{q["items"]} items · about {q["minutes"]} minutes · English</p>\n'
                f'      <p>{intro}</p>\n      <div id="quiz-root"></div>\n')
        t = sub1(MAIN_RE, main, t, "main")
        # Базовые банки держат русские переводы в js/stem-ru/<банк> и js/why-ru/<банк> (сам банк не трогаем);
        # сложные — в самих вопросах (stem_ru, why_ru).
        tags = f'  <script src="../js/{q["bank"]}"></script>\n'
        for folder in ("stem-ru", "why-ru"):
            if (ROOT / "js" / folder / q["bank"]).exists():
                tags += f'  <script src="../js/{folder}/{q["bank"]}"></script>\n'
        tags += '  <script src="../js/quiz.js"></script>\n  <script src="../js/sidebar.js"></script>\n'
        t = sub1(SCRIPTS_RE, tags, t, "scripts")
        page.parent.mkdir(parents=True, exist_ok=True)
        t = site_nav.set_header(t, page)
        if not page.exists():
            page.write_text(t)
        else:
            site_nav.write(page, t)


def build_index(c):
    page = ROOT / c["dir"] / "index.html"
    les = ROOT / c["dir"] / "lessons"
    t = sub1(r"<title>[^<]*</title>", f"<title>{c['title']}</title>", TPL_INDEX.read_text(), "<title>")
    t = sub1(SIDEBAR_RE, sidebar(c, "lessons/", "", "index.html"), t, "sidebar")
    main = ('      <p class="kicker">Anthropic Academy</p>\n'
            f'      <h1>{c["title"]}</h1>\n      <div class="rule"></div>\n'
            f'      <p class="overview-lead">{c["lead"]}</p>\n')
    main += "".join(f"      {p}\n" for p in c["about"])
    have = existing(c)
    for s in c["sections"]:
        items = [l for s2, l in have if s2 is s]
        if not items:
            continue
        main += f'      <h2>{s["title"]}</h2>\n      <ul class="card-list">\n'
        for l in items:
            h1 = re.search(r"<h1>(.*?)</h1>", (les / l["file"]).read_text()).group(1)
            span = l["note"] + (f" · {l['dur']}" if l.get("dur") else "")
            main += f'        <li><a href="lessons/{l["file"]}"><strong>{int(l["file"][:2])}. {h1}</strong><span>{span}</span></a></li>\n'
        main += "      </ul>\n"
    pages = quiz_pages(c)
    if pages:
        q = c["quiz"]
        note = (f"Old · базовый ({q['items']} вопросов) и New · сложный ({c['hard_quiz']['items']} вопросов), на английском"
                if len(pages) == 2 else f"{q['items']} вопросов по всему курсу, на английском")
        main += ('      <h2>Экзамен</h2>\n      <ul class="card-list">\n'
                 f'        <li><a href="{q["file"]}"><strong>Practice exam · весь курс</strong><span>{note}</span></a></li>\n'
                 "      </ul>\n")
    off = c.get("official", [])
    if off:
        links = ", ".join(f"{link(c, o['id'], o['title'])} ({o['questions_text']})" for o in off)
        main += (f"      <p>В оригинале в конце курса — официальный тест Skilljar {links}. Он проходится на Skilljar и "
                 f"засчитывается в курс; наш Practice exam — отдельный тренировочный тест.{c.get('official_note', '')}</p>\n")
    main += (f'      <p class="source">Оригинал курса: <a href="https://anthropic.skilljar.com/{c["course"]}">'
             f'{c["orig_title"]}</a>.</p>\n')
    t = sub1(MAIN_RE, main, t, "main")
    page.parent.mkdir(parents=True, exist_ok=True)
    t = site_nav.set_header(t, page)
    if not page.exists():
        page.write_text(t)
    else:
        site_nav.write(page, t)


def seed_from_api(c, out):
    """Черновики фрагментов из уроков курса API для уроков с полем from_api."""
    out.mkdir(parents=True, exist_ok=True)
    adir = ROOT / "assets" / c["dir"]
    done = []
    for s, l in lessons(c):
        src = l.get("from_api")
        dst = out / (l["file"][:2] + ".html")
        if not src or dst.exists():
            continue
        t = (ROOT / "api" / "lessons" / src).read_text()
        body = MAIN_RE.search(t).group(0)
        body = body[:body.index('            <div class="pager">')]
        old_sid = re.search(r'class="video-link" href="https://anthropic\.skilljar\.com/claude-with-the-anthropic-api/(\d+)"', body)
        if old_sid:
            body = body.replace(f"claude-with-the-anthropic-api/{old_sid.group(1)}", f'{c["course"]}/{l["sid"]}')
        n = l["file"][:2]
        def img(m):
            adir.mkdir(parents=True, exist_ok=True)
            name = f'{c["img_prefix"]}{n}-{m.group(2)}'
            shutil.copyfile(ROOT / "assets" / "api" / f"api{m.group(1)}-{m.group(2)}", adir / name)
            return f'../../assets/{c["dir"]}/{name}'
        body = re.sub(r"\.\./\.\./assets/api/api(\d+)-([0-9]+\.[a-z]+)", img, body)
        dst.write_text(body.rstrip() + "\n\n")
        done.append(dst.name)
    return done


def build(name, frags=None, seed=None):
    c = json.loads((CONF / f"{name}.json").read_text())
    if seed:
        print(f"{name}: drafts from the API course:", seed_from_api(c, seed))
    if frags:
        print(f"{name}: lessons created:", create_lessons(c, frags))
    if not existing(c):
        print(f"{name}: no lesson pages yet, skipped")
        return
    build_quizzes(c)
    update_lessons(c)
    build_index(c)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("course", nargs="?")
    ap.add_argument("--frags", type=pathlib.Path)
    ap.add_argument("--seed-from-api", type=pathlib.Path)
    args = ap.parse_args()
    names = [args.course] if args.course else sorted(p.stem for p in CONF.glob("*.json"))
    for name in names:
        build(name, args.frags if args.course else None, args.seed_from_api if args.course else None)
    site_nav.main()


if __name__ == "__main__":
    main()
