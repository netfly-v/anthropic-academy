"""Выгрузка уроков Skilljar (Anthropic Academy) через Playwright и залогиненный профиль Chrome.

  python skilljar.py login [course-slug]
  python skilljar.py toc <course-slug>
  python skilljar.py dump <course-slug> [--from N] [--to M] [--out DIR]

Профиль браузера с сессией лежит в ~/.academy-browser/profile, дамп — в
~/Projects/skilljar-dump/<course-slug>/. Оба вне репозитория.
"""

import argparse
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

BASE = "https://anthropic.skilljar.com"
PROFILE = Path.home() / ".academy-browser" / "profile"
DUMP_ROOT = Path.home() / "Projects" / "skilljar-dump"
DEFAULT_COURSE = "claude-with-the-anthropic-api"
UA_HEADERS = {"Referer": BASE + "/"}


def open_context(p, headless):
    PROFILE.mkdir(parents=True, exist_ok=True)
    return p.chromium.launch_persistent_context(
        str(PROFILE), channel="chrome", headless=headless, viewport={"width": 1400, "height": 1000}
    )


def cmd_login(args):
    with sync_playwright() as p:
        ctx = open_context(p, headless=False)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto(f"{BASE}/{args.course}")
        print("Войдите в Skilljar в открывшемся окне, затем закройте окно браузера.", flush=True)
        while ctx.pages:
            try:
                ctx.pages[0].wait_for_event("close", timeout=0)
            except Exception:
                break
        try:
            ctx.close()
        except Exception:
            pass
    print("Окно закрыто, сессия сохранена в профиле.")


def read_toc(page, course):
    page.goto(f"{BASE}/{course}", wait_until="domcontentloaded")
    page.wait_for_timeout(1500)
    items = page.evaluate(
        """(course) => {
          const re = new RegExp('/' + course + '/(\\\\d+)/?$');
          const seen = new Set();
          const out = [];
          for (const a of document.querySelectorAll('a[href]')) {
            const m = a.href.split('?')[0].match(re);
            if (!m || seen.has(m[1])) continue;
            seen.add(m[1]);
            let section = '';
            const sec = a.closest('[class*="section"]');
            let el = a.closest('li') || a;
            while (el && !section) {
              let prev = el.previousElementSibling;
              while (prev) {
                if (/section/.test(prev.className || '') && !prev.querySelector('a[href*="/' + course + '/"]')) {
                  section = (prev.innerText || '').trim().split('\\n')[0];
                  break;
                }
                prev = prev.previousElementSibling;
              }
              el = el.parentElement;
              if (el && el.tagName === 'BODY') break;
            }
            const title = (a.innerText || '').trim().replace(/\\s+/g, ' ');
            out.push({id: m[1], url: a.href.split('?')[0], title, section});
          }
          return out;
        }""",
        course,
    )
    if not items:
        sys.exit("Оглавление пустое: похоже, сессия истекла или курс не открыт. Запустите: python skilljar.py login")
    for n, it in enumerate(items, 1):
        it["n"] = n
    return items


def cmd_toc(args):
    with sync_playwright() as p:
        ctx = open_context(p, headless=True)
        page = ctx.new_page()
        for it in read_toc(page, args.course):
            print(f'{it["n"]:02d}  {it["id"]}  [{it["section"]}]  {it["title"]}')
        ctx.close()


def fetch(ctx, url, headers=None, tries=3):
    for i in range(tries):
        r = ctx.request.get(url, headers=headers or {}, max_redirects=5)
        if r.ok:
            return r
        time.sleep(1 + i)
    return None


def english_track(ctx, media_id):
    r = fetch(ctx, f"https://cdn.jwplayer.com/v2/media/{media_id}")
    if not r:
        return None, None, None
    data = r.json()
    item = (data.get("playlist") or [{}])[0]
    tracks = [t for t in item.get("tracks", []) if t.get("kind") == "captions"]
    eng = next((t for t in tracks if (t.get("label") or "").lower().startswith("english")), tracks[0] if tracks else None)
    srt = None
    if eng:
        tr = fetch(ctx, eng["file"], headers=UA_HEADERS, tries=5)
        srt = tr.text() if tr else None
    return item.get("title"), item.get("duration"), srt


def dump_lesson(ctx, page, it, out):
    page.goto(it["url"], wait_until="domcontentloaded")
    try:
        page.wait_for_selector("#lesson-main-content", timeout=15000)
    except Exception:
        pass
    page.wait_for_timeout(1000)
    # Текст урока бывает в двух местах: в #lesson-main-content (текстовые уроки) и в свёрнутой
    # панели .lesson-description-content под видео. Панель скрыта, поэтому текст собираем
    # обходом блоков по textContent, а не через innerText.
    info = page.evaluate(
        """() => {
          const roots = [document.querySelector('#lesson-main-content'),
                         ...document.querySelectorAll('.lesson-description-content')].filter(Boolean);
          const blocks = new Set(['H1','H2','H3','H4','P','LI','PRE','IMG','TABLE','BLOCKQUOTE']);
          const lines = [];
          const images = [];
          const walk = (el) => {
            if (el.closest && el.closest('script,style,.course-fixed-content-video')) return;
            if (el.tagName === 'IMG') {
              const src = el.currentSrc || el.src;
              if (src) { images.push(src); lines.push('[IMG ' + images.length + ': ' + (el.alt || '') + ']'); }
              return;
            }
            if (blocks.has(el.tagName)) {
              const t = el.tagName === 'PRE' ? el.textContent : el.textContent.replace(/\\s+/g, ' ').trim();
              if (t) {
                const mark = {H1:'# ',H2:'## ',H3:'### ',H4:'#### ',LI:'- '}[el.tagName] || '';
                lines.push(el.tagName === 'PRE' ? '```\\n' + t.replace(/\\n$/, '') + '\\n```' : mark + t);
              }
              el.querySelectorAll('img').forEach(walk);
              return;
            }
            for (const c of el.children) walk(c);
          };
          roots.forEach(walk);
          const html = document.documentElement.innerHTML;
          const ids = new Set();
          for (const re of [/cdn\\.jwplayer\\.com\\/(?:v2\\/media|manifests|players)\\/([A-Za-z0-9]{8})/g, /botr_([A-Za-z0-9]{8})_/g, /jwplayer[^"']*?media[\\/=]([A-Za-z0-9]{8})/g]) {
            for (const m of html.matchAll(re)) ids.add(m[1]);
          }
          return {
            found: roots.length > 0,
            html: roots.map(r => r.outerHTML).join('\\n<!-- ===== -->\\n'),
            text: lines.join('\\n\\n'),
            images,
            media: [...ids],
            title: document.title.trim(),
          };
        }"""
    )
    stem = f'{it["n"]:02d}-{it["id"]}'
    (out / f"{stem}.html").write_text(info["html"])
    (out / f"{stem}.txt").write_text(info["text"])
    img_dir = out / "images"
    img_dir.mkdir(exist_ok=True)
    saved = []
    for k, src in enumerate(info["images"], 1):
        src = urljoin(it["url"], src)
        ext = Path(urlparse(src).path).suffix.lower() or ".png"
        r = fetch(ctx, src, headers=UA_HEADERS)
        if r:
            name = f"{stem}-{k:02d}{ext}"
            (img_dir / name).write_bytes(r.body())
            saved.append({"file": name, "src": src})
    video = None
    if info["media"]:
        mid = info["media"][0]
        vtitle, duration, srt = english_track(ctx, mid)
        srt_name = None
        if srt:
            srt_name = f"{stem}.srt"
            (out / srt_name).write_text(srt)
        video = {"media_id": mid, "title": vtitle, "duration_sec": duration, "srt": srt_name}
    return {
        **it,
        "page_title": info["title"],
        "has_content_root": info["found"],
        "has_text": len(re.sub(r"\s+", " ", info["text"]).strip()) > 200,
        "images": saved,
        "video": video,
    }


def cmd_dump(args):
    out = Path(args.out) if args.out else DUMP_ROOT / args.course
    out.mkdir(parents=True, exist_ok=True)
    manifest_path = out / "manifest.json"
    manifest = {m["id"]: m for m in json.loads(manifest_path.read_text())} if manifest_path.exists() else {}
    with sync_playwright() as p:
        ctx = open_context(p, headless=True)
        page = ctx.new_page()
        toc = read_toc(page, args.course)
        chosen = [it for it in toc if args.start <= it["n"] <= (args.end or len(toc))]
        for it in chosen:
            rec = dump_lesson(ctx, page, it, out)
            manifest[it["id"]] = rec
            v = rec["video"] or {}
            print(f'{it["n"]:02d} {it["id"]} {it["title"][:50]:50} text={rec["has_text"]} img={len(rec["images"])} '
                  f'video={v.get("media_id")} srt={bool(v.get("srt"))}', flush=True)
        ctx.close()
    ordered = sorted(manifest.values(), key=lambda m: m["n"])
    manifest_path.write_text(json.dumps(ordered, ensure_ascii=False, indent=1))
    print(f"Готово: {len(chosen)} уроков → {out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("login")
    a.add_argument("course", nargs="?", default=DEFAULT_COURSE)
    a.set_defaults(fn=cmd_login)
    a = sub.add_parser("toc")
    a.add_argument("course")
    a.set_defaults(fn=cmd_toc)
    a = sub.add_parser("dump")
    a.add_argument("course")
    a.add_argument("--from", dest="start", type=int, default=1)
    a.add_argument("--to", dest="end", type=int)
    a.add_argument("--out")
    a.set_defaults(fn=cmd_dump)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
