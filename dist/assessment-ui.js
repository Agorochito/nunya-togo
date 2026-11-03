/* Nunya assessment UI — one question per screen, no timer.
   Uses NunyaAssessment engine (assessment-engine.js).
   Saves progress to localStorage; works offline.
   Does NOT display numerical grades or a final results screen.          */
'use strict';

(function () {
  /* ── constants ──────────────────────────────────────────────────── */
  const STORAGE_KEY = 'nunya-assessment-session';
  const STATE_KEY   = 'nunya-state';

  /* ── state ──────────────────────────────────────────────────────── */
  let labels = {};
  let bank   = [];
  let session = null;           /* engine session object              */
  let currentQuestion = null;   /* question currently displayed       */
  let questionsOrder  = [];     /* ordered list of picked question ids (for resume) */
  let isActive = false;         /* guard against double-start         */
  let completionHandler = null;
  let selectedCategory = null;
  const lang = () => (typeof state !== 'undefined' && state.lang === 'en') ? 'en' : 'fr';
  const t = (key) => {
    const v = labels[key];
    if (!v) return key;
    if (typeof v === 'string') return v; /* emoji fields */
    return v[lang()] || v.fr || key;
  };

  /* rotating encouragement index */
  let encourageIdx = 0;
  function nextEncouragement() {
    const arr = labels.encouragements?.[lang()] || labels.encouragements?.fr || [''];
    const msg = arr[encourageIdx % arr.length];
    encourageIdx++;
    return msg;
  }

  /* ── DOM helpers ────────────────────────────────────────────────── */
  function esc(text) {
    return String(text).replace(/[&<>"']/g, c =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function createOverlay() {
    let el = document.getElementById('as-overlay');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'as-overlay';
    el.className = 'as-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Test');
    document.body.appendChild(el);
    return el;
  }

  function setScreen(html) {
    const overlay = createOverlay();
    overlay.innerHTML = html;
    const screen = overlay.querySelector('.as-screen');
    const target = screen.querySelector('.as-primary, .as-choice, input');
    if (target) requestAnimationFrame(() => target.focus({ preventScroll: true }));
  }

  /* ── localStorage helpers ───────────────────────────────────────── */
  function saveProgress() {
    try {
      const data = { session, questionsOrder, encourageIdx, category: selectedCategory };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* storage full — silent */ }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch { return null; }
  }

  function clearProgress() {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  function savePlacement(level) {
    try {
      let s = {};
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) s = JSON.parse(raw);
      if (!s.profile) s.profile = {};
      s.profile.placement = level;
      localStorage.setItem(STATE_KEY, JSON.stringify(s));
    } catch { /* silent */ }
  }

  /* ── screens ────────────────────────────────────────────────────── */

  function screenIntro() {
    return `<section class="as-screen as-enter" data-screen="intro">
      <div class="as-center">
        <span class="as-emoji" aria-hidden="true">✳</span>
        <h1 class="as-title">${t('introTitle')}</h1>
        <p class="as-body">${t('introBody')}</p>
        <button class="as-primary" data-as="start">${t('introAction')}</button>
      </div>
    </section>`;
  }

  function screenResume() {
    return `<section class="as-screen as-enter" data-screen="resume">
      <div class="as-center">
        <span class="as-emoji" aria-hidden="true">✳</span>
        <h1 class="as-title">${t('resumeTitle')}</h1>
        <p class="as-body">${t('resumeBody')}</p>
        <div class="as-actions-row">
          <button class="as-primary" data-as="resume">${t('resumeYes')}</button>
          <button class="as-secondary" data-as="restart">${t('resumeNo')}</button>
        </div>
      </div>
    </section>`;
  }

  function screenQuestion(q) {
    const idx = session.currentIndex + 1;
    const total = ASSESSMENT_CONFIG.questionCount;
    const indicator = t('questionIndicator')
      .replace('{current}', idx).replace('{total}', total);
    const pct = Math.round((idx / total) * 100);

    return `<section class="as-screen as-enter" data-screen="question">
      <div class="as-progress" role="progressbar"
           aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="as-progress-fill" style="width:${pct}%"></div>
      </div>
      <p class="as-indicator">${indicator}</p>
      <h2 class="as-question">${esc(q.question)}</h2>
      <div class="as-choices">
        ${q.choices.map(c =>
          `<button class="as-choice" data-as="answer" data-value="${c.id}">${esc(c.text)}</button>`
        ).join('')}
      </div>
      <div class="as-dontknow-wrap">
        <button class="as-dontknow" data-as="dontknow">${t('iDontKnow')}</button>
      </div>
    </section>`;
  }

  function screenFeedback(q, chosenId, isDontKnow) {
    const isCorrect = !isDontKnow && chosenId === q.correctId;
    let headerClass, headerText;
    if (isDontKnow) {
      headerClass = 'as-fb-dontknow';
      headerText = t('feedbackDontKnow');
    } else if (isCorrect) {
      headerClass = 'as-fb-correct';
      headerText = t('feedbackCorrect');
    } else {
      headerClass = 'as-fb-wrong';
      headerText = t('feedbackWrong');
    }

    const encourage = nextEncouragement();
    const isLast = session.finished;
    const btnLabel = isLast ? t('finishTest') : t('nextQuestion');
    const btnAction = isLast ? 'finish' : 'next';

    return `<section class="as-screen as-enter" data-screen="feedback">
      <div class="as-fb ${headerClass}">
        <p class="as-fb-header">${headerText}</p>
        <p class="as-fb-explanation">${esc(q.explanation)}</p>
        <p class="as-fb-encourage">${esc(encourage)}</p>
      </div>
      <button class="as-primary" data-as="${btnAction}">${btnLabel}</button>
    </section>`;
  }

  /* ── flow logic ─────────────────────────────────────────────────── */

  function pickAndShowQuestion() {
    const q = window.NunyaAssessment.pickNextQuestion(session, bank);
    if (!q) { finishTest(); return; }
    currentQuestion = q;
    questionsOrder.push(q.id);
    saveProgress();
    setScreen(screenQuestion(q));
  }

  function handleAnswer(chosenId, isDontKnow) {
    const q = currentQuestion;
    if (!q) return;
    const isCorrect = !isDontKnow && chosenId === q.correctId;
    window.NunyaAssessment.recordAnswer(
      session, q.id, q.difficulty, isCorrect, q.category
    );
    saveProgress();
    setScreen(screenFeedback(q, chosenId, isDontKnow));
  }

  function finishTest() {
    const results = window.NunyaAssessment.computeResults(session);
    savePlacement(results.placementLevel);
    clearProgress();
    const completedSession = session;
    const onComplete = completionHandler;
    completionHandler = null;
    closeAssessment();
    if (onComplete) onComplete(results, completedSession);
  }

  /* ── event handling ─────────────────────────────────────────────── */

  function handleClick(e) {
    const btn = e.target.closest('[data-as]');
    if (!btn) return;
    const action = btn.dataset.as;

    if (action === 'start') {
      session = window.NunyaAssessment.createSession(getDeclaredLevel());
      questionsOrder = [];
      encourageIdx = 0;
      pickAndShowQuestion();
      return;
    }
    if (action === 'resume') {
      pickAndShowQuestion();
      return;
    }
    if (action === 'restart') {
      clearProgress();
      session = window.NunyaAssessment.createSession(getDeclaredLevel());
      questionsOrder = [];
      encourageIdx = 0;
      pickAndShowQuestion();
      return;
    }
    if (action === 'answer') {
      /* Prevent double-tap */
      const choices = document.querySelectorAll('.as-choice');
      choices.forEach(c => { c.disabled = true; });
      /* Highlight selected */
      btn.classList.add('as-selected');
      handleAnswer(btn.dataset.value, false);
      return;
    }
    if (action === 'dontknow') {
      const choices = document.querySelectorAll('.as-choice');
      choices.forEach(c => { c.disabled = true; });
      document.querySelector('.as-dontknow').disabled = true;
      handleAnswer(null, true);
      return;
    }
    if (action === 'next') {
      pickAndShowQuestion();
      return;
    }
    if (action === 'finish') {
      finishTest();
      return;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') {
      const overlay = document.getElementById('as-overlay');
      if (!overlay) return;
      const primary = overlay.querySelector('.as-primary');
      if (primary && document.activeElement?.tagName !== 'BUTTON') {
        primary.click();
      }
    }
  }

  /* ── helpers ────────────────────────────────────────────────────── */

  /** Get the declared level from onboarding answers or default. */
  function getDeclaredLevel() {
    /* Try reading from NunyaOnboarding if available */
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.profile?.level) return s.profile.level;
        if (s.onboardingLevel) return s.onboardingLevel;
      }
    } catch {}
    return 'beginner';
  }

  /* ── lifecycle ──────────────────────────────────────────────────── */

  function closeAssessment() {
    const overlay = document.getElementById('as-overlay');
    if (overlay) overlay.remove();
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('keydown', handleKeydown);
    isActive = false;
  }

  async function startAssessment(declaredLevel, onComplete, category) {
    if (isActive) return false;

    /* Load text and questions — accept pre-loaded globals for file:// */
    if (window._assessmentLabels && window._assessmentBank) {
      labels = window._assessmentLabels;
      bank   = window._assessmentBank;
    } else {
      try {
        const [labelsResp, bankResp] = await Promise.all([
          fetch('./data/ui-assessment.json'),
          fetch('./data/assessment-questions.json')
        ]);
        if (!labelsResp.ok || !bankResp.ok) throw new Error('Assessment data unavailable');
        labels = await labelsResp.json();
        bank   = await bankResp.json();
      } catch (error) {
        console.error('Impossible de charger les questions du test.', error);
        if (bank.length === 0) {
          if (typeof toast === 'function') {
            toast('Le test n’a pas pu être chargé. Vérifie ta connexion et réessaie.');
          }
          return false;
        }
      }
    }

    selectedCategory = category || null;
    if (selectedCategory) {
      const selectedBank = bank.filter(q =>
        q.category === selectedCategory || q.category === 'deduction'
      );
      if (selectedBank.length < ASSESSMENT_CONFIG.questionCount) {
        console.error('La banque ne contient pas assez de questions pour ce domaine.');
        if (typeof toast === 'function') toast('Le test de ce domaine est incomplet. Réessaie plus tard.');
        return false;
      }
      bank = selectedBank;
    }
    isActive = true;
    completionHandler = typeof onComplete === 'function' ? onComplete : null;

    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeydown);

    /* Check for saved progress */
    const saved = loadProgress();
    if (saved && saved.session && !saved.session.finished
      && (saved.category === selectedCategory || (!selectedCategory && !saved.category))) {
      session = saved.session;
      questionsOrder = saved.questionsOrder || [];
      encourageIdx = saved.encourageIdx || 0;
      setScreen(screenResume());
      return true;
    }
    if (saved) clearProgress();

    /* Override declared level if provided */
    if (declaredLevel) {
      /* Store temporarily so getDeclaredLevel() can find it */
      try {
        let s = {};
        const raw = localStorage.getItem(STATE_KEY);
        if (raw) s = JSON.parse(raw);
        s.onboardingLevel = declaredLevel;
        localStorage.setItem(STATE_KEY, JSON.stringify(s));
      } catch {}
    }

    setScreen(screenIntro());
    return true;
  }

  /* ── public API ─────────────────────────────────────────────────── */
  window.NunyaAssessmentUI = { start: startAssessment, close: closeAssessment };
})();
