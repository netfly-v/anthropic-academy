"""mkblind.py js/<банк>.js <папка> — full.json (с ключом и why) и blind.json (без ключа) для проверки банка."""
import json, pathlib, subprocess, sys

bank, outdir = sys.argv[1], pathlib.Path(sys.argv[2])
outdir.mkdir(parents=True, exist_ok=True)
js = ("const vm=require('vm');const s=require('fs').readFileSync(process.argv[1],'utf8');const w={};"
      "vm.runInNewContext(s,{window:w});console.log(JSON.stringify(w.QUIZ_BANK));")
full = json.loads(subprocess.check_output(["node", "-e", js, bank]))
blind = {"id": full["id"], "questions": [{k: q[k] for k in ("id", "domain", "select", "stem", "options")} for q in full["questions"]]}
(outdir / "full.json").write_text(json.dumps(full, ensure_ascii=False, indent=1))
(outdir / "blind.json").write_text(json.dumps(blind, ensure_ascii=False, indent=1))
print(full["id"], len(full["questions"]), "items ->", outdir)
