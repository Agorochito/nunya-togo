/* Nunya onboarding flow — one question per screen, progress bar, back button.
   Reads text from dist/data/ui-onboarding.json.
   Does NOT save responses or launch any test.                                  */
'use strict';

(function () {
  /* ── helpers ─────────────────────────────────────────────────────── */
  let labels = {};
  const lang = () => (typeof state !== 'undefined' && state.lang === 'en') ? 'en' : 'fr';
  const t = (key) => labels[key]?.[lang()] || labels[key]?.fr || key;

  /* ── onboarding state (in-memory only, never persisted) ────────── */
  let currentStep = 0;
  const answers = { name: '', age: '', status: '', domain: '', level: '' };
  const TOTAL_STEPS = 6; /* name, age, status, domain, level, ready */

  /* ── DOM bootstrap ─────────────────────────────────────────────── */
  function createOverlay() {
    if (document.getElementById('ob-overlay')) return document.getElementById('ob-overlay');
    const el = document.createElement('div');
    el.id = 'ob-overlay';
    el.className = 'ob-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Bienvenue');
    document.body.appendChild(el);
    return el;
  }

  /* ── progress bar ──────────────────────────────────────────────── */
  function progressBar(step, total) {
    const pct = Math.round(((step + 1) / total) * 100);
    return `<div class="ob-progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">` +
      `<div class="ob-progress-fill" style="width:${pct}%"></div></div>` +
      `<p class="ob-step-indicator">${t('stepIndicator').replace('{current}', step + 1).replace('{total}', total)}</p>`;
  }

  /* ── back button ───────────────────────────────────────────────── */
  function backBtn() {
    if (currentStep === 0) return '';
    return `<button class="ob-back" data-ob="back" aria-label="${t('backLabel')}">← ${t('backLabel')}</button>`;
  }

  /* ── screen renderers ──────────────────────────────────────────── */

  function screenName() {
    return `<section class="ob-screen ob-enter" data-screen="name">
      ${progressBar(0, TOTAL_STEPS)}
      <h1 class="ob-title">${t('nameTitle')}</h1>
      <p class="ob-note">${t('nameNote')}</p>
      <input class="ob-input" id="ob-name" type="text" maxlength="20"
             placeholder="${t('namePlaceholder')}" value="${esc(answers.name)}"
             autocomplete="nickname" enterkeyhint="next">
      <div class="ob-actions">
        <button class="ob-primary" data-ob="next">${t('nextLabel')}</button>
      </div>
      <p class="ob-privacy">${t('privacyNote')}</p>
    </section>`;
  }

  function screenAge() {
    const options = [
      { key: '13-14', label: t('age13_14') },
      { key: '15-16', label: t('age15_16') },
      { key: '17-18', label: t('age17_18') },
      { key: '19+',   label: t('age19plus') },
      { key: '<13',   label: t('ageUnder13') }
    ];
    return `<section class="ob-screen ob-enter" data-screen="age">
      ${progressBar(1, TOTAL_STEPS)}
      ${backBtn()}
      <h1 class="ob-title">${t('ageTitle')}</h1>
      <div class="ob-options">${options.map(o =>
        `<button class="ob-option ${answers.age === o.key ? 'ob-selected' : ''}"
                 data-ob="select-age" data-value="${o.key}"
                 aria-pressed="${answers.age === o.key}">${o.label}</button>`
      ).join('')}</div>
    </section>`;
  }

  function screenUnder13() {
    return `<section class="ob-screen ob-enter" data-screen="under13">
      <div class="ob-friendly">
        <span class="ob-emoji" aria-hidden="true">🌱</span>
        <h1 class="ob-title">${t('under13Title')}</h1>
        <p class="ob-body">${t('under13Body')}</p>
        <button class="ob-primary" data-ob="close">${t('under13Action')}</button>
      </div>
    </section>`;
  }

  function screenStatus() {
    const options = [
      { key: 'seconde',    label: t('statusSeconde') },
      { key: 'premiere',   label: t('statusPremiere') },
      { key: 'terminale',  label: t('statusTerminale') },
      { key: 'university', label: t('statusUniversity') },
      { key: 'other',      label: t('statusOther') }
    ];
    return `<section class="ob-screen ob-enter" data-screen="status">
      ${progressBar(2, TOTAL_STEPS)}
      ${backBtn()}
      <h1 class="ob-title">${t('statusTitle')}</h1>
      <div class="ob-options">${options.map(o =>
        `<button class="ob-option ${answers.status === o.key ? 'ob-selected' : ''}"
                 data-ob="select-status" data-value="${o.key}"
                 aria-pressed="${answers.status === o.key}">${o.label}</button>`
      ).join('')}</div>
    </section>`;
  }

  function screenDomain() {
    const domains = [
      { key: 'cs',          label: t('domainCS'),          available: true },
      { key: 'health',      label: t('domainHealth'),      available: false },
      { key: 'agriculture', label: t('domainAgriculture'), available: false },
      { key: 'energy',      label: t('domainEnergy'),      available: false },
      { key: 'business',    label: t('domainBusiness'),    available: false },
      { key: 'other',       label: t('domainOther'),       available: false }
    ];
    return `<section class="ob-screen ob-enter" data-screen="domain">
      ${progressBar(3, TOTAL_STEPS)}
      ${backBtn()}
      <h1 class="ob-title">${t('domainTitle')}</h1>
      <div class="ob-options">${domains.map(d => {
        if (d.available) {
          return `<button class="ob-option ${answers.domain === d.key ? 'ob-selected' : ''}"
                   data-ob="select-domain" data-value="${d.key}"
                   aria-pressed="${answers.domain === d.key}">${d.label}</button>`;
        }
        return `<div class="ob-option ob-disabled" aria-disabled="true">
                  ${d.label}<span class="ob-soon">${t('comingSoon')}</span>
                </div>`;
      }).join('')}</div>
    </section>`;
  }

  function screenLevel() {
    const levels = [
      { key: 'beginner',     label: t('levelBeginner'),     desc: t('levelBeginnerDesc') },
      { key: 'intermediate', label: t('levelIntermediate'), desc: t('levelIntermediateDesc') },
      { key: 'advanced',     label: t('levelAdvanced'),     desc: t('levelAdvancedDesc') }
    ];
    return `<section class="ob-screen ob-enter" data-screen="level">
      ${progressBar(4, TOTAL_STEPS)}
      ${backBtn()}
      <h1 class="ob-title">${t('levelTitle')}</h1>
      <div class="ob-options">${levels.map(l =>
        `<button class="ob-option ob-option-desc ${answers.level === l.key ? 'ob-selected' : ''}"
                 data-ob="select-level" data-value="${l.key}"
                 aria-pressed="${answers.level === l.key}">
          <strong>${l.label}</strong><span>${l.desc}</span>
        </button>`
      ).join('')}</div>
    </section>`;
  }

  function screenReady() {
    return `<section class="ob-screen ob-enter" data-screen="ready">
      ${progressBar(5, TOTAL_STEPS)}
      ${backBtn()}
      <div class="ob-ready">
        <span class="ob-emoji" aria-hidden="true">✳</span>
        <h1 class="ob-title">${t('readyTitle')}</h1>
        <p class="ob-body">${t('readyBody')}</p>
        <button class="ob-primary" data-ob="finish">${t('readyAction')}</button>
      </div>
      <p class="ob-privacy">${t('privacyNote')}</p>
    </section>`;
  }

  /* ── rendering ─────────────────────────────────────────────────── */
  const screens = [screenName, screenAge, screenStatus, screenDomain, screenLevel, screenReady];

  function renderScreen() {
    const overlay = createOverlay();
    const prev = overlay.querySelector('.ob-screen');
    const html = screens[currentStep]();
    if (prev) {
      prev.classList.remove('ob-enter');
      prev.classList.add('ob-exit');
      prev.addEventListener('animationend', () => prev.remove(), { once: true });
    }
    overlay.insertAdjacentHTML('beforeend', html);
    /* Focus management */
    const screen = overlay.querySelector('.ob-screen:last-child');
    const focusTarget = screen.querySelector('input') || screen.querySelector('.ob-primary, .ob-option');
    if (focusTarget) requestAnimationFrame(() => focusTarget.focus({ preventScroll: true }));
  }

  function renderUnder13() {
    const overlay = createOverlay();
    overlay.innerHTML = screenUnder13();
  }

  /* ── escape helper (mirrors existing project convention) ──────── */
  function esc(text) {
    return String(text).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ── event handling ────────────────────────────────────────────── */
  function handleClick(e) {
    const btn = e.target.closest('[data-ob]');
    if (!btn) return;
    const action = btn.dataset.ob;

    if (action === 'next') {
      const nameInput = document.getElementById('ob-name');
      if (nameInput) answers.name = nameInput.value.trim().slice(0, 20);
      currentStep++;
      renderScreen();
      return;
    }

    if (action === 'back') {
      currentStep = Math.max(0, currentStep - 1);
      renderScreen();
      return;
    }

    if (action === 'select-age') {
      answers.age = btn.dataset.value;
      if (answers.age === '<13') {
        renderUnder13();
        return;
      }
      currentStep++;
      renderScreen();
      return;
    }

    if (action === 'select-status') {
      answers.status = btn.dataset.value;
      currentStep++;
      renderScreen();
      return;
    }

    if (action === 'select-domain') {
      answers.domain = btn.dataset.value;
      currentStep++;
      renderScreen();
      return;
    }

    if (action === 'select-level') {
      answers.level = btn.dataset.value;
      currentStep++;
      renderScreen();
      return;
    }

    if (action === 'finish' || action === 'close') {
      closeOnboarding();
      return;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') {
      const overlay = document.getElementById('ob-overlay');
      if (!overlay) return;
      const primary = overlay.querySelector('.ob-primary');
      if (primary && document.activeElement?.tagName !== 'BUTTON') {
        primary.click();
      }
    }
  }

  /* ── lifecycle ─────────────────────────────────────────────────── */
  function closeOnboarding() {
    const overlay = document.getElementById('ob-overlay');
    if (overlay) {
      overlay.classList.add('ob-fade-out');
      overlay.addEventListener('animationend', () => overlay.remove(), { once: true });
    }
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeydown);
  }

  async function startOnboarding() {
    /* Load labels — accept pre-loaded global for file:// protocol */
    if (window._onboardingLabels) {
      labels = window._onboardingLabels;
    } else {
      try {
        const resp = await fetch('./data/ui-onboarding.json');
        labels = await resp.json();
      } catch {
        /* If the text file cannot be loaded, fall back to keys as labels */
      }
    }
    currentStep = 0;
    answers.name = ''; answers.age = ''; answers.status = ''; answers.domain = ''; answers.level = '';
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeydown);
    renderScreen();
  }

  /* ── public API ────────────────────────────────────────────────── */
  window.NunyaOnboarding = { start: startOnboarding, close: closeOnboarding };
})();
