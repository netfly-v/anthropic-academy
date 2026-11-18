"""Выгрузка уроков нового сайта Anthropic Academy (academy.claude.com) через Playwright.

  python academy.py toc <course-slug>
  python academy.py dump <course-slug> [--from N] [--to M] [--out DIR]

Уроки открыты без входа, профиль браузера не нужен. Дамп лежит в ~/Projects/academy-dump/<course-slug>/,
вне репозитория, в том же формате, что дамп Skilljar (tools/skilljar): NN-<slug>.txt, .html, images/,
manifest.json. Вместо .srt здесь NN-<slug>.transcript.txt — транскрипт со вкладки Transcript урока.
"""

import argparse
import json
import re
import sys
import time
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "skilljar"))
from skilljar import youtube_track  # noqa: E402

BASE = "https://academy.claude.com"
DUMP_ROOT = Path.home() / "Projects" / "academy-dump"
SKIP = {"badge", "complete"}


def read_toc(page, course):
    page.goto(f"{BASE}/courses/{course}", wait_until="networkidle")
    items = page.evaluate(
        """(course) => {
          const main = document.querySelector('main');
          const out = [];
          const seen = new Set();
          let section = '';
          for (const el of main.querySelectorAll('*')) {
            if (el.tagName === 'A') {
              const href = (el.getAttribute('href') || '').split('#')[0];
              const m = href.match(new RegExp('^/courses/' + course + '/([a-z0-9-]+)$'));
              if (!m) continue;
              const title = el.innerText.trim().replace(/\\s+/g, ' ');
              if (/^Start course/.test(title)) continue;
              if (seen.has(m[1])) continue;
              seen.add(m[1]);
              out.push({id: m[1], url: location.origin + href, section,
                        title: title.replace(/\\s+Quiz$/, ''), quiz: /\\sQuiz$/.test(title)});
              continue;
            }
            if (el.closest('a') || el.children.length) continue;
            if (el.tagName === 'SPAN' && /text-caption/.test(el.className) && /text-muted/.test(el.className)) {
              const t = el.innerText.trim();
              if (t && !/lessons?\\b.*\\bquiz|^\\d+ lessons?$/.test(t)) section = t;
            }
          }
          return out;
        }""",
        course,
    )
    items = [it for it in items if it["id"] not in SKIP]
    if not items:
        sys.exit(f"Оглавление пустое: проверьте slug курса ({BASE}/courses/{course}).")
    for n, it in enumerate(items, 1):
        it["n"] = n
    return items


def cmd_toc(args):
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chromium")
        page = b.new_page()
        for it in read_toc(page, args.course):
            print(f'{it["n"]:02d}  {it["id"]:45}  [{it["section"]}]  {it["title"]}{"  (quiz)" if it["quiz"] else ""}')
        b.close()


EXTRACT = """() => {
  const h1 = document.querySelector('main h1');
  if (!h1) return null;
  // Колонка урока: ближайший предок h1, в котором есть и текст урока (article), и все заголовки h2 с id.
  const h2s = [...document.querySelectorAll('main h2[id]')];
  const article = document.querySelector('main article');
  let root = h1.parentElement;
  while (root && root.tagName !== 'MAIN' && !(h2s.every(h => root.contains(h)) && (!article || root.contains(article))))
    root = root.parentElement;
  // Рамки с кнопкой «Copy prompt» — образцы промптов: в тексте они помечаются [PROMPT]…[/PROMPT].
  for (const btn of root.querySelectorAll('button[aria-label]')) {
    if (/prompt/i.test(btn.getAttribute('aria-label'))) btn.parentElement.parentElement.dataset.box = 'prompt';
  }
  // Интерактивные демо: блок текста урока с кнопкой-действием («Send 100 requests»). Их текст есть только в
  // браузере и зависит от состояния, поэтому он выгружается целиком как [WIDGET]…[/WIDGET].
  const body = article || root;
  for (const btn of body.querySelectorAll('button')) {
    if (btn.hasAttribute('aria-expanded') || btn.hasAttribute('aria-haspopup') || btn.hasAttribute('aria-label')) continue;
    if (!btn.innerText.trim()) continue;
    let top = btn;
    while (top.parentElement && top.parentElement !== body) top = top.parentElement;
    if (top.parentElement === body) top.dataset.box = 'widget';
  }
  const blocks = new Set(['H1','H2','H3','H4','P','LI','PRE','IMG','TABLE','BLOCKQUOTE','IFRAME']);
  const lines = [];
  const images = [];
  let youtube = null;
  const skip = (el) => el.closest('nav, button, script, style, [role=tablist], [role=radiogroup]')
                     || (el.closest('aside') && el.closest('aside').querySelector('a[href^="#"]'))
                     || (el.closest('ol') && el.closest('ol').querySelector('a[href="/"]'))
                     || (el.closest('a') && /\\/courses\\//.test(el.closest('a').getAttribute('href') || ''));
  const cell = (c) => c.textContent.replace(/\\s+/g, ' ').trim();
  const walk = (el) => {
    if (skip(el)) return;
    if (el.dataset && el.dataset.box === 'prompt' && !el.dataset.seen) {
      el.dataset.seen = '1';
      lines.push('[PROMPT]');
      walk(el);
      lines.push('[/PROMPT]');
      return;
    }
    if (el.dataset && el.dataset.box === 'widget') {
      lines.push('[WIDGET: interactive demo on the page, its current text]\\n' + el.innerText.trim() + '\\n[/WIDGET]');
      return;
    }
    if (el.tagName === 'ASIDE' && !el.dataset.seen) {
      el.dataset.seen = '1';
      lines.push('[NOTE]');
      walk(el);
      lines.push('[/NOTE]');
      return;
    }
    if (el.tagName === 'CODE' && !el.closest('p, li, td, th, h1, h2, h3, h4, pre, a, strong, em, blockquote')) {
      lines.push('```\\n' + el.textContent.replace(/\\n$/, '') + '\\n```');
      return;
    }
    if (el.tagName === 'IFRAME') {
      const m = (el.src || '').match(/youtube(?:-nocookie)?\\.com\\/embed\\/([A-Za-z0-9_-]{11})/);
      if (m) { youtube = youtube || m[1]; lines.push('[VIDEO youtube ' + m[1] + ']'); }
      return;
    }
    if (el.tagName === 'IMG') {
      const src = el.currentSrc || el.getAttribute('src');
      if (src && !/\\.svg(\\?|$)/.test(src)) { images.push(src); lines.push('[IMG ' + images.length + ': ' + (el.alt || '') + ']'); }
      return;
    }
    if (el.tagName === 'TABLE') {
      const rows = [...el.querySelectorAll('tr')].map(r => '| ' + [...r.children].map(cell).join(' | ') + ' |');
      lines.push(rows.join('\\n'));
      return;
    }
    if (blocks.has(el.tagName)) {
      if (el.tagName === 'LI' && el.querySelector('ul, ol')) {
        const own = [...el.childNodes].filter(n => !(n.nodeType === 1 && /^(UL|OL)$/.test(n.tagName)))
                     .map(n => n.textContent).join(' ').replace(/\\s+/g, ' ').trim();
        if (own) lines.push('- ' + own);
        for (const c of el.children) if (/^(UL|OL)$/.test(c.tagName)) for (const li of c.children) {
          lines.push('  - ' + li.textContent.replace(/\\s+/g, ' ').trim());
        }
        return;
      }
      const t = el.tagName === 'PRE' ? el.textContent : el.textContent.replace(/\\s+/g, ' ').trim();
      if (t) {
        let mark = {H1:'# ',H2:'## ',H3:'### ',H4:'#### ',LI:'- ',BLOCKQUOTE:'> '}[el.tagName] || '';
        if (el.tagName === 'LI' && el.parentElement.tagName === 'OL') mark = ([...el.parentElement.children].indexOf(el) + 1) + '. ';
        lines.push(el.tagName === 'PRE' ? '```\\n' + t.replace(/\\n$/, '') + '\\n```' : mark + t);
      }
      el.querySelectorAll('img').forEach(walk);
      return;
    }
    // Текст вне блоков (подписи макетов терминала и т. п.) внутри article берётся как есть.
    if (article && article.contains(el)) {
      for (const n of el.childNodes) {
        if (n.nodeType === 3 && n.textContent.trim()) lines.push(n.textContent.replace(/\\s+/g, ' ').trim());
      }
    }
    for (const c of el.children) walk(c);
  };
  // Заголовок раскрывающегося блока («Read more» + вопрос) живёт в кнопке: его панель идёт следом.
  for (const btn of root.querySelectorAll('button[aria-expanded]')) {
    const title = btn.innerText.replace(/^\\s*Read more\\s*/i, '').trim();
    if (title) btn.insertAdjacentHTML('afterend', '<p data-readmore="1">[READ MORE: ' + title.replace(/</g, '&lt;') + ']</p>');
  }
  walk(root);
  const head = (root.innerText || '').slice(0, 400);
  const dur = head.match(/(\\d+)\\s*min\\b/);
  return {html: root.outerHTML, text: lines.join('\\n\\n'), images, youtube,
          minutes: dur ? +dur[1] : null, title: h1.innerText.trim(), page_title: document.title.trim(),
          has_transcript: !!document.querySelector('input[type=radio][value=transcript]')};
}"""

TRANSCRIPT = """() => {
  const r = document.querySelector('input[type=radio][value=transcript]');
  let el = r;
  while (el && !el.querySelector('.scroll-fade-y')) el = el.parentElement;
  return el ? el.querySelector('.scroll-fade-y').innerText.trim() : '';
}"""


def youtube_duration(video_id):
    """Длительность ролика со страницы YouTube, когда субтитры заблокированы (IpBlocked)."""
    req = urllib.request.Request(f"https://www.youtube.com/watch?v={video_id}", headers={"User-Agent": "Mozilla/5.0"})
    try:
        html = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")
    except OSError:
        return None
    m = re.search(r'"lengthSeconds":"(\d+)"', html)
    return int(m.group(1)) if m else None


def fetch(page, url, tries=3):
    for i in range(tries):
        r = page.request.get(url)
        if r.ok:
            return r
        time.sleep(1 + i)
    return None


def dump_lesson(page, it, out):
    page.goto(it["url"], wait_until="networkidle")
    page.wait_for_timeout(800)
    # Картинки грузятся лениво: прокрутка до конца, чтобы у всех появился src.
    for _ in range(12):
        page.mouse.wheel(0, 2500)
        page.wait_for_timeout(150)
    info = page.evaluate(EXTRACT)
    if info is None:
        sys.exit(f'{it["url"]}: на странице нет h1')
    stem = f'{it["n"]:02d}-{it["id"]}'
    (out / f"{stem}.html").write_text(info["html"])
    (out / f"{stem}.txt").write_text(info["text"].replace("(opens in new tab)", ""))
    transcript = None
    if info["has_transcript"]:
        page.get_by_text("Transcript", exact=True).first.click()
        page.wait_for_timeout(1200)
        text = page.evaluate(TRANSCRIPT)
        if text:
            transcript = f"{stem}.transcript.txt"
            (out / transcript).write_text(text + "\n")
    img_dir = out / "images"
    img_dir.mkdir(exist_ok=True)
    saved = []
    for k, src in enumerate(info["images"], 1):
        src = urljoin(it["url"], src)
        ext = Path(urlparse(src).path).suffix.lower() or ".png"
        r = fetch(page, src)
        if r:
            name = f"{stem}-{k:02d}{ext}"
            (img_dir / name).write_bytes(r.body())
            saved.append({"file": name, "src": src})
    video = None
    if info["youtube"]:
        srt, duration = youtube_track(info["youtube"])
        duration = duration or youtube_duration(info["youtube"])
        srt_name = None
        if srt:
            srt_name = f"{stem}.srt"
            (out / srt_name).write_text(srt)
        video = {"youtube": info["youtube"], "title": info["title"], "duration_sec": duration,
                 "srt": srt_name, "transcript": transcript}
    return {
        **it,
        "page_title": info["page_title"],
        "minutes": info["minutes"],
        "has_text": len(re.sub(r"\s+", " ", info["text"]).strip()) > 200,
        "images": saved,
        "video": video,
        "transcript": transcript,
    }


def cmd_dump(args):
    out = Path(args.out) if args.out else DUMP_ROOT / args.course
    out.mkdir(parents=True, exist_ok=True)
    manifest_path = out / "manifest.json"
    manifest = {m["id"]: m for m in json.loads(manifest_path.read_text())} if manifest_path.exists() else {}
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chromium")
        page = b.new_page(viewport={"width": 1400, "height": 1000})
        toc = read_toc(page, args.course)
        chosen = [it for it in toc if args.start <= it["n"] <= (args.end or len(toc))]
        for it in chosen:
            rec = dump_lesson(page, it, out)
            # YouTube иногда блокирует субтитры (IpBlocked): тогда остаются снятые в прошлый раз.
            old = (manifest.get(it["id"]) or {}).get("video") or {}
            if rec["video"] and not rec["video"]["srt"] and old.get("srt"):
                rec["video"].update(srt=old["srt"], duration_sec=old.get("duration_sec"))
            manifest[it["id"]] = rec
            v = rec["video"] or {}
            print(f'{it["n"]:02d} {it["id"][:40]:40} text={rec["has_text"]} img={len(rec["images"])} '
                  f'video={v.get("youtube")} srt={bool(v.get("srt"))} transcript={bool(rec["transcript"])}', flush=True)
        b.close()
    ordered = sorted(manifest.values(), key=lambda m: m["n"])
    manifest_path.write_text(json.dumps(ordered, ensure_ascii=False, indent=1))
    print(f"Готово: {len(chosen)} уроков → {out}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
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
