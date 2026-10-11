function el(tag, attrs, kids) {
  var n = document.createElement(tag);
  for (var k in attrs || {}) { if (k === 'text') n.textContent = attrs[k]; else n.setAttribute(k, attrs[k]); }
  (kids || []).forEach(function (c) { n.appendChild(c); });
  return n;
}

/* Archive: grouped by year, latest 3 years open */
var archive = document.getElementById('archive');
if (archive) {
var archToggle = document.getElementById('archive-toggle');
var years = [];
EVENTS.forEach(function (e) { if (years.indexOf(e[0]) < 0) years.push(e[0]); });
var archAll = false;
function renderArchive() {
  archive.innerHTML = '';
  (archAll ? years : years.slice(0, 3)).forEach(function (y) {
    var list = EVENTS.filter(function (e) { return e[0] === y; });
    var ul = el('ul');
    list.forEach(function (e) {
      var txt = el('span', { text: e[2] });
      if (e[3] === 'upcoming') txt.appendChild(el('em', { class: 'soon', text: 'upcoming' }));
      ul.appendChild(el('li', {}, [el('time', { text: e[1] }), txt]));
    });
    var h = el('h4', { text: y }, [el('small', { text: list.length + (list.length === 1 ? ' date' : ' dates') })]);
    archive.appendChild(el('div', { class: 'year' }, [h, ul]));
  });
  archToggle.textContent = archAll ? 'show less' : 'full archive (' + years[years.length - 1] + ' to ' + years[3] + ')';
}
archToggle.addEventListener('click', function () { archAll = !archAll; renderArchive(); });
renderArchive();
}

/* Videos: load the player only on click */
document.querySelectorAll('.vid').forEach(function (v) {
  v.querySelector('button').addEventListener('click', function () {
    v.innerHTML = '';
    v.appendChild(el('iframe', { src: v.getAttribute('data-src'), title: 'Video', allow: 'autoplay; fullscreen; picture-in-picture', allowfullscreen: '' }));
  });
});

/* Bandcamp players */
var players = document.getElementById('players');
if (players) RELEASES.forEach(function (r) {
  var src = 'https://bandcamp.com/EmbeddedPlayer/album=' + r[1] + '/size=large/bgcol=1c1917/linkcol=f49ac1/tracklist=false/';
  players.appendChild(el('iframe', { src: src, title: r[0], loading: 'lazy', seamless: '' }));
});

/* Discography */
var disco = document.getElementById('disco');
if (disco) {
var discoToggle = document.getElementById('disco-toggle');
var discoAll = false;
function renderDisco() {
  disco.innerHTML = '';
  (discoAll ? DISCO : DISCO.slice(0, 8)).forEach(function (d) {
    var t = d[2] ? el('a', { href: d[2], target: '_blank', rel: 'noopener', text: d[0] }) : document.createTextNode(d[0]);
    disco.appendChild(el('li', {}, [el('b', {}, [t]), el('span', { text: d[1] })]));
  });
  discoToggle.textContent = discoAll ? 'show less' : 'all releases (' + DISCO.length + ')';
}
discoToggle.addEventListener('click', function () { discoAll = !discoAll; renderDisco(); });
renderDisco();
}

/* Next upcoming date on the home page */
var nd = document.getElementById('next-date');
if (nd) {
  var up = EVENTS.filter(function (e) { return e[3] === 'upcoming'; }).pop();
  if (up) {
    nd.appendChild(el('small', { text: 'Next' }));
    nd.appendChild(el('b', { text: up[1] + ' ' + up[0] }));
    nd.appendChild(el('span', { text: up[2] }));
    nd.hidden = false;
  }
}
