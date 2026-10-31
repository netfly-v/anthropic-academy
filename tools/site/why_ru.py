"""Attach Russian translations of `why` to a quiz bank.

    python3 tools/site/why_ru.py js/<bank>.js translations.json

translations.json is {"<item id>": "<Russian text>", ...} with exactly the bank's item ids.
- Hard banks (js/*-hard-quiz.js): the text goes inline into each item as `why_ru`.
- Basic banks: they are the control group and stay byte-for-byte untouched, so the text goes to
  js/why-ru/<bank>.js as window.QUIZ_WHY_RU, and every page that loads the bank gets a <script> tag for it.
js/quiz.js shows the translation under `why` after Submit.
"""
import json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]


def load(path):
    js = ("const vm=require('vm');const s=require('fs').readFileSync(process.argv[1],'utf8');const w={};"
          "vm.runInNewContext(s,{window:w});console.log(JSON.stringify(w.QUIZ_BANK));")
    return json.loads(subprocess.check_output(["node", "-e", js, str(path)]))


def s(x):
    return json.dumps(x, ensure_ascii=False)


def dump(bank, path):
    out = ["window.QUIZ_BANK = {", f"  id: {s(bank['id'])},", f"  passPercent: {bank['passPercent']},"]
    if bank.get("hideDomains"):
        out.append("  hideDomains: true,")
    out.append("  questions: [")
    items = []
    for q in bank["questions"]:
        opts = ",\n".join(f"        {{ id: {s(o['id'])}, text: {s(o['text'])} }}" for o in q["options"])
        item = ("    {\n" f"      id: {s(q['id'])},\n      domain: {s(q['domain'])},\n      select: {q['select']},\n"
                f"      stem: {s(q['stem'])},\n      options: [\n{opts}\n      ],\n      correct: {s(q['correct'])},\n"
                f"      why: {s(q['why'])}")
        if q.get("why_ru"):
            item += f",\n      why_ru: {s(q['why_ru'])}"
        items.append(item + "\n    }")
    out.append(",\n".join(items))
    out += ["  ]", "};", ""]
    pathlib.Path(path).write_text("\n".join(out), encoding="utf-8")


def main(bank_path, tr_path):
    bank_path = pathlib.Path(bank_path).resolve()
    bank = load(bank_path)
    tr = json.loads(pathlib.Path(tr_path).read_text())
    ids = [q["id"] for q in bank["questions"]]
    if sorted(ids) != sorted(tr):
        sys.exit(f"ids differ: missing {sorted(set(ids) - set(tr))}, extra {sorted(set(tr) - set(ids))}")
    if any(not str(v).strip() for v in tr.values()):
        sys.exit("empty translation")
    name = bank_path.name
    if name.endswith("-hard-quiz.js"):
        for q in bank["questions"]:
            q["why_ru"] = tr[q["id"]]
        dump(bank, bank_path)
        print(f"{name}: why_ru inline for {len(ids)} items")
        return
    out = ROOT / "js" / "why-ru" / name
    out.parent.mkdir(exist_ok=True)
    body = ",\n".join(f"  {s(i)}: {s(tr[i])}" for i in ids)
    out.write_text(f"// Russian translations of `why` for {name} (bank {bank['id']}). The bank file itself is not edited.\n"
                   f"window.QUIZ_WHY_RU = {{\n{body}\n}};\n", encoding="utf-8")
    tag = f'<script src="../js/{name}"></script>'
    ru_tag = f'<script src="../js/why-ru/{name}"></script>'
    pages = []
    for page in sorted(ROOT.glob("*/*.html")):
        t = page.read_text()
        if tag in t and ru_tag not in t:
            page.write_text(re.sub(re.escape(tag) + r"\n", lambda m: m.group(0) + "  " + ru_tag + "\n", t, count=1))
            pages.append(str(page.relative_to(ROOT)))
    print(f"{name}: wrote {out.relative_to(ROOT)} ({len(ids)} items); script tag added to {pages or 'no new pages'}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(*sys.argv[1:])
