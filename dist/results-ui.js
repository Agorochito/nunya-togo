/**
 * results-ui.js
 * Renders the assessment results screen.
 *
 * API:
 *   window.NunyaResultsUI.show(placement)
 *     placement = { level: 0|1|2, categoryScores: { algo, web, digital }, overall: number }
 *   window.NunyaResultsUI.close()
 *
 * Depends on:
 *   - window.NunyaPlacementMapping  (placement-mapping.js)
 *   - window._resultsLabels  OR  fetches dist/data/ui-results.json
 */

(function () {
  'use strict';

  var overlay = null;
  var labels = null;
  var isActive = false;

  /* ---------- helpers ---------- */

  function t(key) {
    if (!labels) return key;
    var parts = key.split('.');
    var obj = labels;
    for (var i = 0; i < parts.length; i++) {
      obj = obj[parts[i]];
      if (!obj) return key;
    }
    return obj.fr || obj;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  /* ---------- strength emoji ---------- */

  function strengthEmoji(key) {
    if (key === 'strong') return '🌟';
    if (key === 'moderate') return '🌱';
    return '🔍';
  }

  /* ---------- load labels ---------- */

  function loadLabels(cb) {
    if (labels) return cb();

    /* file:// fallback */
    if (window._resultsLabels) {
      labels = window._resultsLabels;
      return cb();
    }

    fetch('data/ui-results.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { labels = data; cb(); })
      .catch(function () {
        if (window._resultsLabels) labels = window._resultsLabels;
        cb();
      });
  }

  /* ---------- build the screen ---------- */

  function buildScreen(placement) {
    var mapping = window.NunyaPlacementMapping;
    var rec = mapping.getRecommendedPath(placement.level, placement.categoryScores);

    /* overlay */
    overlay = el('div', 'rs-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', t('title'));

    var container = el('div', 'rs-container');

    /* title */
    var title = el('h1', 'rs-title', t('title'));
    container.appendChild(title);

    /* level badge */
    var levelSection = el('div', 'rs-level-section');

    var badge = el('div', 'rs-badge rs-badge-' + placement.level);
    var levelName = t('level_names.' + placement.level);
    badge.textContent = levelName;
    levelSection.appendChild(badge);

    var levelMsg = el('p', 'rs-level-message', t('level_messages.' + placement.level));
    levelSection.appendChild(levelMsg);

    container.appendChild(levelSection);

    /* strengths */
    var strengthsTitle = el('h2', 'rs-strengths-title', t('strengths_title'));
    container.appendChild(strengthsTitle);

    var strengthsList = el('div', 'rs-strengths-list');
    var cats = ['algo', 'web', 'digital'];
    for (var i = 0; i < cats.length; i++) {
      var cat = cats[i];
      var pct = placement.categoryScores[cat] || 0;
      var strengthKey = mapping.getCategoryStrength(pct);

      var row = el('div', 'rs-strength-row');

      var catName = el('span', 'rs-cat-name', t('category_names.' + cat));
      row.appendChild(catName);

      var strengthLabel = el('span', 'rs-strength-label rs-strength-' + strengthKey);
      strengthLabel.textContent = strengthEmoji(strengthKey) + ' ' + t('strength_levels.' + strengthKey);
      row.appendChild(strengthLabel);

      strengthsList.appendChild(row);
    }
    container.appendChild(strengthsList);

    /* recommended path */
    var pathIntro = el('p', 'rs-path-intro', t('path_intro'));
    container.appendChild(pathIntro);

    var pathCard = el('div', 'rs-path-card');
    var pathTitle = el('div', 'rs-path-title', rec.pathTitle);
    pathCard.appendChild(pathTitle);
    container.appendChild(pathCard);

    /* start button */
    var startBtn = el('button', 'rs-start-btn', t('start_button'));
    startBtn.type = 'button';
    startBtn.addEventListener('click', function () {
      /* navigate to the recommended path + stage */
      var hash = '#/academy/' + rec.pathId + '/' + rec.stageId;
      close();
      window.location.hash = hash;
    });
    container.appendChild(startBtn);

    /* encouragement */
    var encourage = el('p', 'rs-encouragement', t('encouragement'));
    container.appendChild(encourage);

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    /* trap focus */
    requestAnimationFrame(function () {
      startBtn.focus();
    });
  }

  /* ---------- public API ---------- */

  function show(placement) {
    if (isActive) return;
    isActive = true;

    loadLabels(function () {
      buildScreen(placement);
    });
  }

  function close() {
    if (!isActive) return;
    isActive = false;
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    overlay = null;
  }

  window.NunyaResultsUI = {
    show: show,
    close: close
  };
})();
