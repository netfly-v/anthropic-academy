"""Проверка банка экзамена: структура и подсказки формы.

  python tools/site/quiz_check.py js/api-rag-quiz.js js/api-rag-hard-quiz.js

Для каждого банка печатает: число вопросов и multi-select, распределение правильных букв,
долю вопросов, где правильный вариант самый длинный (цель < 30%), разброс длин вариантов
(цель: каждый в пределах ±20% от среднего по вопросу), маркеры always/never в вариантах и долю
вопросов, которые угадывает механическая эвристика «вариант с наибольшим числом слов из условия».
Структурные ошибки (дубли id, correct вне options, длина correct ≠ select) печатаются отдельно.
"""

import json
from math import comb
import re
import subprocess
import sys
from collections import Counter

NODE = """const fs=require("fs"),vm=require("vm");const w={};
vm.runInNewContext(fs.readFileSync(process.argv[1],"utf8"),{window:w});
process.stdout.write(JSON.stringify(w.QUIZ_BANK));"""


STOP = set("a an the and or of to in on for with is are be by as at it its this that these those so not no than "
           "from into which what when where who whom how why does do did can could should would will each both two one".split())


def words(text):
    return {w for w in re.findall(r"[a-z0-9_']+", text.lower()) if w not in STOP and len(w) > 2}


def echo_pick(q):
    """Вариант(ы), сильнее всего повторяющие слова условия; при равенстве — первый."""
    stem = words(q["stem"])
    scored = sorted(q["options"], key=lambda o: -len(words(o["text"]) & stem))
    return [o["id"] for o in scored[:q["select"]]]


def load(path):
    out = subprocess.run(["node", "-e", NODE, path], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def check(path):
    bank = load(path)
    qs = bank["questions"]
    problems = []
    ids = Counter(q["id"] for q in qs)
    problems += [f"duplicate id {i}" for i, n in ids.items() if n > 1]
    letters = Counter()
    longest_correct = 0
    shortest_correct = 0
    shortest_chance = 0.0
    echo_correct = 0
    spread_bad = []
    markers = []
    for q in qs:
        oids = [o["id"] for o in q["options"]]
        if not set(q["correct"]) <= set(oids):
            problems.append(f"{q['id']}: correct not in options")
        if len(q["correct"]) != q["select"]:
            problems.append(f"{q['id']}: len(correct) != select")
        if q["select"] > 1 and not re.search(r"choose two|choose \w+|TWO", q["stem"], re.I):
            problems.append(f"{q['id']}: multi-select stem lacks 'Choose two'")
        letters.update(q["correct"])
        lens = {o["id"]: len(o["text"]) for o in q["options"]}
        longest = max(lens, key=lens.get)
        if longest in q["correct"]:
            longest_correct += 1
        k = len(q["correct"])
        shortest = sorted(lens, key=lens.get)[:k]
        if sorted(shortest) == sorted(q["correct"]):
            shortest_correct += 1
        shortest_chance += 1 / comb(len(lens), k)
        if sorted(echo_pick(q)) == sorted(q["correct"]):
            echo_correct += 1
        mean = sum(lens.values()) / len(lens)
        dev = max(abs(v - mean) / mean for v in lens.values())
        if dev > 0.2:
            spread_bad.append(f"{q['id']} ±{dev:.0%}")
        for o in q["options"]:
            if re.search(r"\b(always|never)\b", o["text"], re.I):
                markers.append(f"{q['id']}{o['id']}")
    n = len(qs)
    multi = sum(q["select"] > 1 for q in qs)
    print(f"== {path}  ({bank['id']})")
    print(f"questions: {n}, multi-select: {multi} ({multi / n:.0%})")
    print("correct letters:", ", ".join(f"{k}={letters[k]}" for k in "abcd"))
    print(f"correct is the longest option: {longest_correct}/{n} ({longest_correct / n:.0%})")
    print(f"correct is the shortest option(s): {shortest_correct}/{n} ({shortest_correct / n:.0%}; chance ≈ {shortest_chance / n:.0%})")
    print(f"option length spread > ±20%: {len(spread_bad)}/{n}" + (f"  [{', '.join(spread_bad)}]" if spread_bad else ""))
    print(f"always/never in options: {len(markers)}" + (f"  [{', '.join(markers)}]" if markers else ""))
    print(f"stem-echo heuristic guesses right: {echo_correct}/{n} ({echo_correct / n:.0%})")
    print("PROBLEMS:", "; ".join(problems) if problems else "none")
    print()
    return not problems


if __name__ == "__main__":
    ok = all([check(p) for p in sys.argv[1:]])
    sys.exit(0 if ok else 1)
