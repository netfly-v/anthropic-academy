(function () {
  var bank = window.QUIZ_BANK;
  if (!bank) return;

  var root = document.getElementById("quiz-root");
  var key = "academy-quiz-" + bank.id;
  var state = load();
  var open = {};

  render();

  function load() {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return blank();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed.answers !== "object") return blank();
      parsed.submitted = Boolean(parsed.submitted);
      if (!parsed.peeked || typeof parsed.peeked !== "object") parsed.peeked = {};
      return parsed;
    } catch (err) {
      return blank();
    }
  }

  function blank() {
    return { answers: {}, submitted: false, peeked: {} };
  }

  function save() {
    localStorage.setItem(key, JSON.stringify(state));
  }

  function selected(id) {
    return state.answers[id] ? state.answers[id].slice() : [];
  }

  function stemRu(q) {
    return q.stem_ru || (window.QUIZ_STEM_RU && window.QUIZ_STEM_RU[q.id]) || "";
  }

  function peekedCount() {
    return bank.questions.filter(function (q) { return state.peeked[q.id]; }).length;
  }

  function same(a, b) {
    if (a.length !== b.length) return false;
    var set = {};
    a.forEach(function (id) { set[id] = true; });
    return b.every(function (id) { return set[id]; });
  }

  function grade() {
    var correct = 0;
    var domains = {};
    bank.questions.forEach(function (q) {
      if (!domains[q.domain]) domains[q.domain] = { correct: 0, total: 0 };
      domains[q.domain].total += 1;
      if (same(selected(q.id), q.correct)) {
        correct += 1;
        domains[q.domain].correct += 1;
      }
    });
    return { correct: correct, total: bank.questions.length, domains: domains };
  }

  function render() {
    var submitted = state.submitted;
    var result = submitted ? grade() : null;
    var html = "";

    if (submitted) html += scoreHtml(result);

    html += '<ol class="q-list">';
    bank.questions.forEach(function (q, index) {
      html += questionHtml(q, index, submitted);
    });
    html += "</ol>";
    html += '<div class="exam-actions">';
    if (submitted) {
      html += '<button type="button" class="retry quiz-clear">Очистить</button>';
    } else {
      html += '<button type="button" class="submit" id="quiz-submit">Submit</button>';
    }
    html += "</div>";
    if (!submitted) {
      html += '<p class="source">Unanswered items are scored as incorrect. Nothing is marked right or wrong until you submit.</p>';
    }
    root.innerHTML = html;

    root.querySelectorAll(".stem-ru-toggle").forEach(function (button) {
      button.addEventListener("click", onStemToggle);
    });
    if (!submitted) {
      root.querySelectorAll("input[data-qid]").forEach(function (input) {
        input.addEventListener("change", onChange);
      });
      var submit = document.getElementById("quiz-submit");
      if (submit) submit.addEventListener("click", onSubmit);
    }
    root.querySelectorAll(".quiz-clear").forEach(function (button) {
      button.addEventListener("click", onRetry);
    });
  }

  function scoreHtml(result) {
    var pct = Math.round((result.correct / result.total) * 100);
    var passed = pct >= bank.passPercent;
    var rows = "";
    var hasStemRu = bank.questions.some(function (q) { return stemRu(q); });
    var peekLine = hasStemRu
      ? '<p class="peek-count">Перевод условия открыт в ' + peekedCount() + " из " + result.total + " вопросов.</p>"
      : "";
    Object.keys(result.domains).forEach(function (name) {
      var row = result.domains[name];
      rows += "<li><span>" + escapeHtml(name) + "</span><span>" + row.correct + " / " + row.total + "</span></li>";
    });
    return (
      '<section class="score-banner ' + (passed ? "pass" : "fail") + '">' +
      "<h2>" + (passed ? "Pass" : "Not yet") + " · " + pct + "%</h2>" +
      "<p>" + result.correct + " of " + result.total + " items. Practice threshold is " + bank.passPercent + "%. This is not the official certification scale.</p>" +
      peekLine +
      '<ul class="domain-list">' + rows + "</ul></section>"
    );
  }

  function questionHtml(q, index, submitted) {
    var picks = selected(q.id);
    var picked = {};
    picks.forEach(function (id) { picked[id] = true; });
    var right = {};
    q.correct.forEach(function (id) { right[id] = true; });
    var ok = submitted && same(picks, q.correct);
    var prompt = q.select === 1 ? "Select one." : "Select " + q.select + ".";
    var type = q.select === 1 ? "radio" : "checkbox";
    var options = q.options.map(function (opt) {
      var cls = "";
      if (submitted && right[opt.id]) cls = "is-correct";
      else if (submitted && picked[opt.id]) cls = "is-wrong";
      var checked = picked[opt.id] ? " checked" : "";
      var disabled = submitted ? " disabled" : "";
      return (
        '<label class="' + cls + '">' +
        '<input type="' + type + '" name="q-' + q.id + '" data-qid="' + q.id + '" data-oid="' + opt.id + '"' + checked + disabled + ">" +
        "<span>" + escapeHtml(opt.text) + "</span></label>"
      );
    }).join("");
    var whyRu = q.why_ru || (window.QUIZ_WHY_RU && window.QUIZ_WHY_RU[q.id]) || "";
    var why = submitted
      ? '<p class="q-why">' + (ok ? "Correct. " : "Incorrect. ") + escapeHtml(q.why) + "</p>" +
        (whyRu ? '<p class="q-why q-why-ru">' + (ok ? "Верно. " : "Неверно. ") + escapeHtml(whyRu) + "</p>" : "")
      : "";
    var status = submitted ? (ok ? "Correct" : "Incorrect") : "Item " + (index + 1);
    var meta = bank.hideDomains && !submitted ? status : status + " · " + q.domain;
    var ru = stemRu(q);
    var peekMark = submitted && state.peeked[q.id] ? '<span class="peek-mark">перевод условия открыт</span>' : "";
    var stemBlock = "";
    if (ru) {
      var isOpen = Boolean(open[q.id]);
      var enabled = submitted || picks.length > 0 || state.peeked[q.id];
      stemBlock =
        '<button type="button" class="stem-ru-toggle" data-qid="' + q.id + '" aria-expanded="' + isOpen + '"' +
        (enabled ? "" : ' disabled title="Сначала выберите ответ"') + ">" +
        (isOpen ? "Скрыть перевод условия" : "Показать перевод условия") + "</button>" +
        '<p class="q-stem-ru" lang="ru"' + (isOpen ? "" : " hidden") + ">" + escapeHtml(ru) + "</p>";
    }
    return (
      '<li class="q-item' + (state.peeked[q.id] ? " is-peeked" : "") + '" data-qid="' + q.id + '">' +
      '<p class="q-meta">' + escapeHtml(meta) + peekMark + "</p>" +
      '<p class="q-stem">' + escapeHtml(q.stem) + "</p>" +
      stemBlock +
      '<p class="q-pick">' + prompt + "</p>" +
      '<div class="q-options">' + options + "</div>" +
      why + "</li>"
    );
  }

  function onChange(event) {
    var input = event.target;
    var qid = input.getAttribute("data-qid");
    var oid = input.getAttribute("data-oid");
    var q = bank.questions.filter(function (item) { return item.id === qid; })[0];
    var next = selected(qid);
    if (q.select === 1) {
      next = [oid];
    } else if (input.checked) {
      next = next.filter(function (id) { return id !== oid; });
      next.push(oid);
      if (next.length > q.select) next.shift();
    } else {
      next = next.filter(function (id) { return id !== oid; });
    }
    state.answers[qid] = next;
    save();
    sync(q);
  }

  function onStemToggle(event) {
    var button = event.currentTarget;
    var qid = button.getAttribute("data-qid");
    var text = button.nextElementSibling;
    open[qid] = !open[qid];
    if (open[qid] && !state.submitted && !state.peeked[qid]) {
      state.peeked[qid] = true;
      save();
    }
    text.hidden = !open[qid];
    button.setAttribute("aria-expanded", String(open[qid]));
    button.textContent = open[qid] ? "Скрыть перевод условия" : "Показать перевод условия";
  }

  function sync(q) {
    var picks = {};
    selected(q.id).forEach(function (id) { picks[id] = true; });
    root.querySelectorAll('input[data-qid="' + q.id + '"]').forEach(function (input) {
      input.checked = Boolean(picks[input.getAttribute("data-oid")]);
    });
    var toggle = root.querySelector('.stem-ru-toggle[data-qid="' + q.id + '"]');
    if (toggle) {
      var enabled = Object.keys(picks).length > 0 || state.peeked[q.id];
      toggle.disabled = !enabled;
      if (enabled) toggle.removeAttribute("title");
      else toggle.setAttribute("title", "Сначала выберите ответ");
    }
  }

  function onSubmit() {
    state.submitted = true;
    save();
    render();
    root.scrollIntoView();
  }

  function onRetry() {
    state = blank();
    open = {};
    localStorage.removeItem(key);
    render();
    root.scrollIntoView();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
