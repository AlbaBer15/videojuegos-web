(function () {
  'use strict';

  var STAR_PATH = 'M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73z';
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var halfGradCounter = 0;

  function buildStar(kind) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'star' + (kind === 'empty' ? '' : ' filled') + (kind === 'half' ? ' half' : ''));

    if (kind === 'half') {
      var gradId = 'half-grad-' + (++halfGradCounter);
      var defs = document.createElementNS(SVG_NS, 'defs');
      var grad = document.createElementNS(SVG_NS, 'linearGradient');
      grad.setAttribute('id', gradId);
      var s1 = document.createElementNS(SVG_NS, 'stop');
      s1.setAttribute('offset', '50%');
      s1.setAttribute('stop-color', 'currentColor');
      var s2 = document.createElementNS(SVG_NS, 'stop');
      s2.setAttribute('offset', '50%');
      s2.setAttribute('stop-color', 'transparent');
      grad.appendChild(s1);
      grad.appendChild(s2);
      defs.appendChild(grad);
      svg.appendChild(defs);
      svg.style.color = 'var(--pink-bright)';
      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', STAR_PATH);
      path.setAttribute('fill', 'url(#' + gradId + ')');
      svg.appendChild(path);
      return svg;
    }

    var path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', STAR_PATH);
    svg.appendChild(path);
    return svg;
  }

  function renderRating(el) {
    var rating = parseFloat(el.getAttribute('data-rating')) || 0;
    el.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
      var kind = 'empty';
      if (rating >= i) kind = 'full';
      else if (rating >= i - 0.5) kind = 'half';
      el.appendChild(buildStar(kind === 'full' ? 'full' : kind));
    }
  }

  document.querySelectorAll('.rating[data-rating]').forEach(renderRating);

  var grid = document.getElementById('grid');
  var cards = Array.prototype.slice.call(grid.querySelectorAll('.card'));
  var searchInput = document.getElementById('search');
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
  var sortBtn = document.getElementById('sortBtn');
  var resultsCount = document.getElementById('resultsCount');
  var noResults = document.getElementById('noResults');

  var state = { genre: 'all', query: '', sortDir: 'desc' };

  function applyState() {
    var query = state.query.trim().toLowerCase();
    var visible = 0;

    cards.forEach(function (card) {
      var matchesGenre = state.genre === 'all' || card.getAttribute('data-genre') === state.genre;
      var title = (card.getAttribute('data-title') || '').toLowerCase();
      var matchesQuery = query === '' || title.indexOf(query) !== -1;
      var show = matchesGenre && matchesQuery;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    resultsCount.textContent = visible === cards.length
      ? visible + ' fichas cargadas'
      : visible + ' de ' + cards.length + ' fichas coinciden';

    noResults.hidden = visible !== 0;
  }

  function applySort() {
    var sorted = cards.slice().sort(function (a, b) {
      var ra = parseFloat(a.getAttribute('data-rating')) || 0;
      var rb = parseFloat(b.getAttribute('data-rating')) || 0;
      return state.sortDir === 'desc' ? rb - ra : ra - rb;
    });
    sorted.forEach(function (card) { grid.appendChild(card); });
  }

  searchInput.addEventListener('input', function (e) {
    state.query = e.target.value;
    applyState();
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.genre = btn.getAttribute('data-genre');
      applyState();
    });
  });

  sortBtn.addEventListener('click', function () {
    state.sortDir = state.sortDir === 'desc' ? 'asc' : 'desc';
    sortBtn.setAttribute('data-dir', state.sortDir);
    applySort();
  });

  applySort();
  applyState();
})();
