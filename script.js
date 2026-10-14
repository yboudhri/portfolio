'use strict';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Petit outil pour créer des éléments sans innerHTML */
function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v);
  }
  kids.flat().forEach(c => { if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(c)); });
  return n;
}

/* ---------- Thème clair / sombre ---------- */
const themeBtn = $('#theme');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
}

/* ---------- Menu mobile ---------- */
const burger = $('#burger'), menu = $('#menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });
}

/* ---------- Lien actif dans le menu selon la section visible ---------- */
if ('IntersectionObserver' in window && menu) {
  const links = $$('a[href^="#"]', menu);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => io.observe(s));
}

/* ---------- Schéma réseau interactif ---------- */
const info = $('#topo-info');
if (info) {
  const defaut = info.innerHTML;
  const show = n => {
    $$('.node').forEach(x => x.classList.toggle('on', x === n));
    info.replaceChildren(el('b', { text: n.dataset.title }), n.dataset.text);
  };
  $$('.node').forEach(n => {
    n.addEventListener('mouseenter', () => show(n));
    n.addEventListener('focus', () => show(n));
    n.addEventListener('click', () => show(n));
    n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(n); } });
  });
  $('.topo').addEventListener('mouseleave', () => { $$('.node').forEach(x => x.classList.remove('on')); info.innerHTML = defaut; });
}

/* ---------- Réalisations : cartes + filtres ---------- */
const grid = $('#pgrid');
if (grid && typeof PROJETS !== 'undefined') {
  PROJETS.forEach(p => {
    const thumb = el('div', { class: 'thumb' },
      el('span', { text: p.categorie }),
      el('img', { src: p.miniature, alt: 'Aperçu : ' + p.titre, loading: 'lazy' }));
    thumb.querySelector('img').addEventListener('error', e => e.target.remove());
    const card = el('a', { class: 'pcard', href: 'projet.html?id=' + encodeURIComponent(p.id), 'data-cat': p.categorie },
      thumb,
      el('div', { class: 'pbody' },
        el('span', { class: 'meta', 'data-c': p.categorie, text: p.categorie + ' · ' + p.date }),
        el('h3', { text: p.titre }),
        el('p', { text: p.resume }),
        el('div', { class: 'tags' }, p.techs.map(t => el('span', { class: 'tag', text: t }))),
        el('span', { class: 'more', text: 'Voir la fiche détaillée' })));
    grid.append(card);
  });
  const count = () => { grid.dataset.n = $$('.pcard:not([hidden])', grid).length; };
  count();

  const cats = ['Tous', ...new Set(PROJETS.map(p => p.categorie))];
  const chips = $('#chips');
  cats.forEach((c, i) => {
    const b = el('button', { class: 'chip', type: 'button', 'aria-pressed': i === 0, text: c });
    b.addEventListener('click', () => {
      $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('.pcard', grid).forEach(card => { card.hidden = c !== 'Tous' && card.dataset.cat !== c; });
      count();
    });
    chips.append(b);
  });
}

/* ---------- Page détaillée d'un projet ---------- */
const root = $('#projet');
if (root && typeof PROJETS !== 'undefined') {
  const id = new URLSearchParams(location.search).get('id');
  const p = PROJETS.find(x => x.id === id);
  if (!p) {
    root.replaceChildren(el('h1', { text: 'Projet introuvable' }),
      el('p', {}, 'Ce projet n\'existe pas. ', el('a', { href: 'index.html#realisations', text: 'Retour aux réalisations' })));
  } else {
    document.title = p.titre + ' – Portfolio';
    const liens = [];
    if (p.liens.github) liens.push(el('a', { class: 'btn', href: p.liens.github, target: '_blank', rel: 'noopener', text: 'Voir sur GitHub' }));
    if (p.liens.site) liens.push(el('a', { class: 'btn', href: p.liens.site, target: '_blank', rel: 'noopener', text: 'Voir le site' }));
    if (p.liens.pdf) liens.push(el('a', { class: 'btn ghost', href: p.liens.pdf, download: '', text: 'Télécharger la documentation (PDF)' }));

    root.replaceChildren(
      el('a', { class: 'back', href: 'index.html#realisations', text: '← Retour aux réalisations' }),
      el('h1', { text: p.titre }),
      el('span', { class: 'meta', 'data-c': p.categorie, text: p.categorie + ' · ' + p.date }),
      el('div', { class: 'tags' }, p.techs.map(t => el('span', { class: 'tag', text: t }))),
      el('h2', { text: 'Cadre de réalisation' }), el('p', { text: p.cadre }),
      el('h2', { text: 'Description détaillée' }),
      ...p.description.flatMap(d => [el('h3', { text: d.titre }), el('p', { text: d.texte })]),
      ...p.images.map(i => {
        const img = el('img', { src: i.src, alt: i.legende, loading: 'lazy' });
        img.addEventListener('error', () => img.closest('figure').remove());
        return el('figure', {}, img, el('figcaption', { text: i.legende }));
      }),
      ...(liens.length ? [el('h2', { text: 'Production' }), el('div', { class: 'links' }, liens)] : []),
      el('h2', { text: 'Compétences couvertes du bloc 1' }),
      el('ul', { class: 'comp' }, p.competences.map(c => el('li', {}, el('b', { text: c }), COMPETENCES_B1[c] || '')))
    );
  }
}

/* ---------- Formulaire de contact (Formspree) ---------- */
const form = $('#contact-form');
if (form) {
  const status = $('#form-status'), btn = $('button', form);
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (form.action.includes('VOTRE_ID')) {
      status.textContent = 'Formulaire non configuré : remplacez VOTRE_ID par votre identifiant Formspree (voir LISEZ-MOI.md).';
      return;
    }
    btn.disabled = true; status.textContent = 'Envoi en cours…';
    try {
      const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.reset(); status.textContent = 'Message envoyé. Je vous répondrai rapidement.';
    } catch (err) {
      status.textContent = 'L\'envoi a échoué. Vous pouvez m\'écrire directement par e-mail.';
    }
    btn.disabled = false;
  });
}

/* ---------- Logos : si une image ne charge pas, l'initiale s'affiche à la place ---------- */
$$('.logo img').forEach(img => {
  if (img.complete && img.naturalWidth === 0) img.remove();
  else img.addEventListener('error', () => img.remove());
});

const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
