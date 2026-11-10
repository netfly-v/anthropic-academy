"""Шапка сайта и каталог курсов из tools/site/site.json (правило 7 CLAUDE.md).

  python tools/site/site_nav.py

Переписывает <nav class="header-nav"> на корневой странице и на всех страницах курсов, а на корневой
index.html ещё список курсов в меню и карточки каталога. В шапку и каталог попадают только курсы,
у которых уже есть <курс>/index.html, поэтому недостроенный курс не даёт битых ссылок.
Повторный запуск ничего не меняет.
"""

import json
import os
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
SITE = json.loads((pathlib.Path(__file__).parent / "site.json").read_text())
HEADER_RE = re.compile(r'    <nav class="header-nav">\n.*?    </nav>\n', re.S)
ROOT_NAV_RE = re.compile(r'(?<=<a class="course-kicker" href="index.html" aria-current="page">Каталог</a>\n)'
                         r'        <ul class="lesson-nav">\n.*?        </ul>\n', re.S)
ROOT_CARDS_RE = re.compile(r'(?<=<p class="overview-lead">)(.*?</p>\n)      <ul class="card-list">\n.*?      </ul>\n', re.S)


def courses():
    """Курсы, у которых уже есть страница обзора."""
    return [c for c in SITE["courses"] if (ROOT / c["dir"] / "index.html").exists()]


def rel(page, target):
    return os.path.relpath(ROOT / target, page.parent)


def header(page):
    parts = page.relative_to(ROOT).parts
    own = parts[0] if len(parts) > 1 else None
    def a(target, label, current):
        cur = ' aria-current="page"' if current else ""
        return f'      <a href="{rel(page, target)}"{cur}>{label}</a>\n'
    links = a("index.html", "Курсы", own is None)
    links += "".join(a(f'{c["dir"]}/index.html', c["label"], c["dir"] == own) for c in courses())
    return '    <nav class="header-nav">\n' + links + "    </nav>\n"


def set_header(text, page):
    new, n = HEADER_RE.subn(lambda m: header(page), text)
    assert n == 1, f"header not found: {page}"
    return new


def set_catalog(text):
    nav = "".join(f'          <li><a href="{c["dir"]}/index.html"><span class="mark"></span>{c["title"]}</a></li>\n'
                  for c in courses())
    text, n = ROOT_NAV_RE.subn(lambda m: '        <ul class="lesson-nav">\n' + nav + "        </ul>\n", text)
    assert n == 1, "root sidebar not found"
    cards = "".join(f'        <li><a href="{c["dir"]}/index.html"><strong>{c["title"]}</strong><span>{c["card"]}</span></a></li>\n'
                    for c in courses())
    text, n = ROOT_CARDS_RE.subn(lambda m: m.group(1) + '      <ul class="card-list">\n' + cards + "      </ul>\n", text)
    assert n == 1, "root cards not found"
    return text


def pages():
    out = [ROOT / "index.html"]
    for c in SITE["courses"]:
        out += sorted((ROOT / c["dir"]).rglob("*.html"))
    return out


def write(page, text):
    if page.read_text() != text:
        page.write_text(text)
        return True
    return False


def main():
    changed = 0
    for page in pages():
        text = set_header(page.read_text(), page)
        if page == ROOT / "index.html":
            text = set_catalog(text)
        changed += write(page, text)
    print(f"header nav: {changed} pages changed")


if __name__ == "__main__":
    main()
