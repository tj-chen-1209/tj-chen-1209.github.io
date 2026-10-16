// Keep the existing responsive menu's accessible state and dismissal in sync.
(function () {
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  var button = nav.querySelector('button');
  var menu = nav.querySelector('.hidden-links');
  function sync() {
    button.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
  }
  function close() {
    menu.classList.add('hidden');
    button.classList.remove('close');
    sync();
  }
  new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) close();
  });
  nav.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
      close();
      button.focus();
    }
  });
  sync();
})();
