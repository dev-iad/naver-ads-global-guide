// Loads shared header/footer partials, then wires up the mobile menu.
(function () {
  const script = document.currentScript;
  const root = new URL('./', script.src).href; // site root, works from / and /blog/

  function initMenu() {
    const t = document.getElementById('toggle'), m = document.getElementById('menu');
    if (!t || !m) return;
    t.addEventListener('click', () => {
      const open = m.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
      t.textContent = open ? '\u2715' : '\u2630';
    });
    m.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        m.classList.remove('open');
        t.textContent = '\u2630';
        t.setAttribute('aria-expanded', false);
      }
    });
  }

  const slots = [...document.querySelectorAll('[data-include]')];
  Promise.all(slots.map(el =>
    fetch(root + 'partials/' + el.dataset.include + '.html')
      .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(html => { el.outerHTML = html.replaceAll('{root}', root); })
      .catch(err => console.error('Include failed:', el.dataset.include, err))
  )).then(initMenu);
})();
