"""dump_md.py <дамп курса> <папка> [--only 3-12] — материалы для проверяющих из дампа Skilljar.

В папке появляются:
- NN-<id>.md — текст страницы урока (с кодом), затем «(video transcript)» и субтитры без таймкодов;
- lessons-text-only.md — тексты страниц всех выбранных уроков без блоков кода и без видео (то, что есть у ученика).
"""
import json, pathlib, re, sys

dump, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
lo, hi = 1, 10 ** 6
if "--only" in sys.argv:
    lo, hi = map(int, sys.argv[sys.argv.index("--only") + 1].split("-"))
out.mkdir(parents=True, exist_ok=True)
text_only = []
for m in json.loads((dump / "manifest.json").read_text()):
    if not lo <= m["n"] <= hi:
        continue
    stem = f'{m["n"]:02d}-{m["id"]}'
    txt = (dump / f"{stem}.txt").read_text() if (dump / f"{stem}.txt").exists() else ""
    srt = ""
    if m.get("video") and m["video"].get("srt"):
        raw = (dump / m["video"]["srt"]).read_text()
        lines = [l for l in raw.splitlines() if l.strip() and not l.strip().isdigit() and "-->" not in l]
        srt = " ".join(lines)
    (out / f"{stem}.md").write_text(f'# {m["title"]}\n\n{txt}\n\n(video transcript)\n\n{srt}\n')
    page = re.sub(r"```.*?```", "[code example omitted]", txt, flags=re.S)
    text_only.append(f'=== Skilljar {m["n"]:02d}: {m["title"]} ===\n\n{page}\n')
(out / "lessons-text-only.md").write_text("\n".join(text_only))
print(len(text_only), "lessons ->", out)
