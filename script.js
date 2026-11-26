const t = document.getElementById('toggle'), m = document.getElementById('menu');
t.addEventListener('click', () => {
  const open = m.classList.toggle('open');
  t.setAttribute('aria-expanded', open);
  t.textContent = open ? '✕' : '☰';
});
m.addEventListener('click', e => {
  if (e.target.tagName === 'A') { m.classList.remove('open'); t.textContent = '☰'; t.setAttribute('aria-expanded', false); }
});
