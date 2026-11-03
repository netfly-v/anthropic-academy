"""Attach Russian translations to a quiz bank: of `why` (default) or of the question `stem`.

    python3 tools/site/why_ru.py [--field why_ru|stem_ru] js/<bank>.js translations.json

translations.json is {"<item id>": "<Russian text>", ...} with exactly the bank's item ids.
- Hard banks (js/*-hard-quiz.js): the text goes inline into each item as `why_ru` / `stem_ru`.
- Basic banks: they are the control group and stay byte-for-byte untouched, so the text goes to
  js/why-ru/<bank>.js (window.QUIZ_WHY_RU) or js/stem-ru/<bank>.js (window.QUIZ_STEM_RU), and every page that
  loads the bank gets a <script> tag for it.
js/quiz.js shows `why_ru` under `why` after Submit, and `stem_ru` behind the "Показать перевод условия" button.
"""
FIELDS = {"why_ru": ("why-ru", "QUIZ_WHY_RU"), "stem_ru": ("stem-ru", "QUIZ_STEM_RU")}
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
                f"      stem: {s(q['stem'])},\n"
                + (f"      stem_ru: {s(q['stem_ru'])},\n" if q.get("stem_ru") else "")
                + f"      options: [\n{opts}\n      ],\n      correct: {s(q['correct'])},\n"
                f"      why: {s(q['why'])}")
        if q.get("why_ru"):
            item += f",\n      why_ru: {s(q['why_ru'])}"
        items.append(item + "\n    }")
    out.append(",\n".join(items))
    out += ["  ]", "};", ""]
    pathlib.Path(path).write_text("\n".join(out), encoding="utf-8")


def main(bank_path, tr_path, field="why_ru"):
    folder, var = FIELDS[field]
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
            q[field] = tr[q["id"]]
        dump(bank, bank_path)
        print(f"{name}: {field} inline for {len(ids)} items")
        return
    out = ROOT / "js" / folder / name
    out.parent.mkdir(exist_ok=True)
    body = ",\n".join(f"  {s(i)}: {s(tr[i])}" for i in ids)
    what = "`why`" if field == "why_ru" else "question stems"
    out.write_text(f"// Russian translations of {what} for {name} (bank {bank['id']}). The bank file itself is not edited.\n"
                   f"window.{var} = {{\n{body}\n}};\n", encoding="utf-8")
    tag = f'<script src="../js/{name}"></script>'
    ru_tag = f'<script src="../js/{folder}/{name}"></script>'
    pages = []
    for page in sorted(ROOT.glob("*/*.html")):
        t = page.read_text()
        if tag in t and ru_tag not in t:
            page.write_text(re.sub(re.escape(tag) + r"\n", lambda m: m.group(0) + "  " + ru_tag + "\n", t, count=1))
            pages.append(str(page.relative_to(ROOT)))
    print(f"{name}: wrote {out.relative_to(ROOT)} ({len(ids)} items); script tag added to {pages or 'no new pages'}")


if __name__ == "__main__":
    argv = sys.argv[1:]
    field = "why_ru"
    if argv[:1] == ["--field"]:
        field, argv = argv[1], argv[2:]
    if len(argv) != 2 or field not in FIELDS:
        sys.exit(__doc__)
    main(*argv, field=field)
