"""Страница «Карта CCAR-F» (ccar-f/lessons/01-map.html) из tools/site/ccarf-map.json.

  python tools/site/ccarf_map.py              # обновить карту на странице (если страница уже есть)
  python tools/site/ccarf_map.py --frag DIR   # записать фрагмент DIR/01.html для build_course.py --frags DIR

Для каждого подпункта гайда — покрытие курсами и куда идти: уроки курсов и страница раздела. Страница раздела,
которой ещё нет (домен не опубликован), показывается без ссылки, поэтому битых ссылок карта не даёт.

Заодно на всех страницах раздела ссылка на ещё не опубликованную страницу раздела становится текстом
(<span data-pending="NN-….html">), а когда страница появляется — снова ссылкой. Запускать после build_course.py.
"""

import argparse
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
DATA = json.loads((pathlib.Path(__file__).parent / "ccarf-map.json").read_text())
SITE = json.loads((pathlib.Path(__file__).parent / "site.json").read_text())
CONF = json.loads((pathlib.Path(__file__).parent / "courses" / "ccar-f.json").read_text())
PAGE = ROOT / "ccar-f" / "lessons" / "01-map.html"
LABEL = {c["dir"]: c["label"] for c in SITE["courses"]}
STATUS = {"covered": "покрыт курсами", "partial": "частично: уроки + страница раздела", "none": "новая страница"}


def h1(path):
    m = re.search(r"<h1>(.*?)</h1>", (ROOT / path).read_text())
    return m.group(1) if m else path


def topic_title(file):
    for s in CONF["sections"]:
        for l in s["lessons"]:
            if l["file"] == file:
                return l["nav"]
    return file


def status(bullets):
    kinds = {b["coverage"] for b in bullets.values()}
    if kinds == {"covered"}:
        return "covered"
    if kinds == {"none"}:
        return "none"
    return "partial"


def where(bullets):
    topics, lessons = [], []
    for b in bullets.values():
        if b["topic"] and b["coverage"] != "covered" and b["topic"] not in topics:
            topics.append(b["topic"])
    # уроки: сначала из полностью покрытых пунктов, не больше трёх
    for want in ("covered", "partial"):
        for b in bullets.values():
            if b["coverage"] == want:
                for p in b["pages"]:
                    if p not in lessons and (ROOT / p).exists():
                        lessons.append(p)
    out = []
    for t in topics:
        if (PAGE.parent / t).exists():
            out.append(f'<a href="{t}"><strong>{html.escape(topic_title(t))}</strong></a>')
        else:
            out.append(f'<strong>{html.escape(topic_title(t))}</strong> (страница появится позже)')
    for p in lessons[:3]:
        course = p.split("/")[0]
        out.append(f'<a href="../../{p}">{LABEL.get(course, course)} · {h1(p)}</a>')
    return "<br>".join(out)


def fragment():
    allb = [b for s in DATA["statements"] for b in s["bullets"].values()]
    n = {k: sum(1 for b in allb if b["coverage"] == k) for k in ("covered", "partial", "none")}
    out = ['      <h1>Карта CCAR-F</h1>', '      <div class="rule"></div>',
           '      <p class="kicker">Все подпункты гайда экзамена и куда идти по каждому</p>',
           f'      <p>Гайд экзамена Claude Certified Architect – Foundations делит материал на пять доменов и 30 подпунктов; '
           f'в подпунктах {len(allb)} пунктов «что надо знать» и «что надо уметь». Курсы сайта (на ноябрь 2026) полностью '
           f'покрывают {n["covered"]} пунктов, частично — {n["partial"]}, совсем не покрывают — {n["none"]}. '
           'Таблицы ниже показывают это по подпунктам.</p>',
           '      <ul>',
           '        <li><strong>Покрыт курсами</strong> — все пункты подпункта разобраны в уроках: достаточно этих уроков.</li>',
           '        <li><strong>Частично</strong> — часть пунктов в уроках, остальное дополняет страница этого раздела.</li>',
           '        <li><strong>Новая страница</strong> — в курсах этого нет, тему разбирает страница раздела.</li>',
           '      </ul>',
           '      <p>Вес домена — примерная доля вопросов экзамена.</p>']
    for d in DATA["domains"]:
        out.append(f'      <h2>Домен {d["n"]}. {d["title"]} — {d["weight"]}%</h2>')
        out.append('      <table class="compare">')
        out.append('        <thead><tr><th>Подпункт</th><th>Покрытие</th><th>Куда идти</th></tr></thead>')
        out.append('        <tbody>')
        for s in DATA["statements"]:
            if not s["id"].startswith(f'{d["n"]}.'):
                continue
            b = s["bullets"]
            cov = sum(1 for x in b.values() if x["coverage"] == "covered")
            out.append(f'          <tr><td>{s["id"]} {html.escape(s["title"])}</td>'
                       f'<td>{STATUS[status(b)]} ({cov} из {len(b)})</td><td>{where(b)}</td></tr>')
        out.append('        </tbody>')
        out.append('      </table>')
    out.append('      <p>Покрытие проверено по текстам уроков всех восьми курсов сайта, пункт за пунктом. '
               '«Покрыт» значит, что после урока можно ответить на сценарный вопрос по этому пункту.</p>')
    return "\n".join(out) + "\n\n"


PENDING_A = re.compile(r'<a href="(\d\d-[a-z0-9-]+\.html)">(.*?)</a>', re.S)
PENDING_SPAN = re.compile(r'<span data-pending="(\d\d-[a-z0-9-]+\.html)">(.*?)</span>', re.S)


def pending_links():
    """Ссылки между страницами раздела: на отсутствующую — текстом, на появившуюся — снова ссылкой."""
    changed = 0
    for page in sorted(PAGE.parent.glob("*.html")):
        t = page.read_text()
        new = PENDING_A.sub(lambda m: m.group(0) if (PAGE.parent / m.group(1)).exists()
                            else f'<span data-pending="{m.group(1)}">{m.group(2)}</span>', t)
        new = PENDING_SPAN.sub(lambda m: f'<a href="{m.group(1)}">{m.group(2)}</a>' if (PAGE.parent / m.group(1)).exists()
                               else m.group(0), new)
        if new != t:
            page.write_text(new)
            changed += 1
    return changed


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--frag", type=pathlib.Path)
    args = ap.parse_args()
    frag = fragment()
    if args.frag:
        args.frag.mkdir(parents=True, exist_ok=True)
        (args.frag / "01.html").write_text(frag)
        print("fragment:", args.frag / "01.html")
    if PAGE.exists():
        t = PAGE.read_text()
        new, n = re.subn(r'(?<=    <main class="lesson">\n).*?(?=      <div class="pager">)', lambda m: frag, t, count=1, flags=re.S)
        assert n == 1, "map page: main not found"
        if new != t:
            PAGE.write_text(new)
            print("map page updated")
    print("pages with link changes:", pending_links())


if __name__ == "__main__":
    main()
