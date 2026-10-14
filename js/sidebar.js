// Прокручивает меню так, чтобы вверху был заголовок группы текущего урока.
// Если группа длиннее окна и урок не виден, докручивает до самого урока.
(function () {
  var inner = document.querySelector(".sidebar-inner");
  if (!inner || inner.scrollHeight <= inner.clientHeight) return;

  var current = inner.querySelector('a[aria-current="page"]');
  if (!current) return;

  var list = current.closest("ul");
  var heading = list && list.previousElementSibling;
  var target = heading && heading.classList.contains("nav-group") ? heading : current;

  var base = inner.getBoundingClientRect().top - inner.scrollTop;
  var top = target.getBoundingClientRect().top - base - 8;
  var itemBottom = current.getBoundingClientRect().bottom - base + 8;

  if (itemBottom - top > inner.clientHeight) top = itemBottom - inner.clientHeight;
  top = Math.max(0, top);

  // У последних групп под ними мало пунктов, и меню упирается в конец раньше,
  // чем заголовок дойдёт до верха. Добавляем снизу недостающее пустое место.
  var shortfall = top - (inner.scrollHeight - inner.clientHeight);
  if (shortfall > 0) {
    var pad = parseFloat(getComputedStyle(inner).paddingBottom) || 0;
    inner.style.paddingBottom = pad + shortfall + "px";
  }
  inner.scrollTop = top;
})();
