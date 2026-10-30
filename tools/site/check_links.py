"""Проверка внутренних ссылок и картинок на всех страницах сайта (правило 8 CLAUDE.md).

  python tools/site/check_links.py          # печатает битые href/src и завершается с кодом 1, если они есть
"""

import pathlib
import re
import sys
from urllib.parse import unquote, urlsplit

ROOT = pathlib.Path(__file__).resolve().parents[2]
ATTR_RE = re.compile(r'\b(?:href|src)="([^"]+)"')


def main():
    broken = []
    pages = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts and "node_modules" not in p.parts)
    for page in pages:
        for ref in ATTR_RE.findall(page.read_text()):
            parts = urlsplit(ref)
            if parts.scheme or ref.startswith("#") or ref.startswith("//"):
                continue
            target = (page.parent / unquote(parts.path)).resolve() if parts.path else page
            if not target.exists():
                broken.append(f"{page.relative_to(ROOT)}: {ref}")
    print(f"pages: {len(pages)}, broken: {len(broken)}")
    for b in broken:
        print(" ", b)
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()
