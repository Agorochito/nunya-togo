/* Nunya adaptive-test engine — pure functions, no UI.
   Reads configuration from assessment-config.js.
   Every function is deterministic given its inputs.                      */
'use strict';

/* ── bring in config (Node/CJS / browser) ─────────────────────────── */
let _cfg;
try {
  _cfg = (typeof ASSESSMENT_CONFIG !== 'undefined')
    ? ASSESSMENT_CONFIG
    : require('./assessment-config.js').ASSESSMENT_CONFIG;
} catch {
  _cfg = ASSESSMENT_CONFIG; /* ESM/browser fallback */
}

/* ── public API ───────────────────────────────────────────────────── */

/**
 * Create a fresh test session.
 * @param {'beginner'|'intermediate'|'advanced'} declaredLevel
 * @returns {object} session state (pass to every other function)
 */
function createSession(declaredLevel) {
  const startDiff = _cfg.startingDifficulty[declaredLevel] ?? _cfg.minDifficulty;
  return {
    difficulty: startDiff,
    currentIndex: 0,
    askedIds: [],            /* question ids already used           */
    lastCategory: null,      /* last category picked (for alternation) */
    answers: [],             /* { questionId, difficulty, correct } */
    finished: false
  };
}

/**
 * Pick the next question from the bank.
 * Rules: alternate categories, never repeat, match current difficulty.
 * Falls back to any available question at a nearby difficulty.
 *
 * @param {object}  session
 * @param {Array}   bank  — [{ id, category, difficulty, … }, …]
 * @returns {object|null} the chosen question, or null if none left
 */
function pickNextQuestion(session, bank) {
  if (session.finished) return null;

  const available = bank.filter(q => !session.askedIds.includes(q.id));
  if (available.length === 0) return null;

  /* Prefer a different category from the last one asked. */
  const diffCat = available.filter(q => q.category !== session.lastCategory);
  const pool = diffCat.length > 0 ? diffCat : available;

  /* Best match: exact difficulty. */
  let pick = pool.find(q => q.difficulty === session.difficulty);

  /* Fallback: closest difficulty (prefer easier, then harder). */
  if (!pick) {
    const sorted = [...pool].sort((a, b) =>
      Math.abs(a.difficulty - session.difficulty) - Math.abs(b.difficulty - session.difficulty)
    );
    pick = sorted[0];
  }

  return pick || null;
}

/**
 * Record an answer and update difficulty.
 * @param {object}  session
 * @param {string}  questionId
 * @param {number}  questionDifficulty – difficulty of the asked question
 * @param {boolean} isCorrect – true if answered correctly
 * @param {string}  category – category of the question (for per-category scoring)
 */
function recordAnswer(session, questionId, questionDifficulty, isCorrect, category) {
  session.answers.push({
    questionId,
    difficulty: questionDifficulty,
    correct: isCorrect,
    category: category || 'unknown'
  });
  session.askedIds.push(questionId);
  session.lastCategory = category || null;

  /* Adjust difficulty */
  if (isCorrect) {
    session.difficulty = Math.min(session.difficulty + 1, _cfg.maxDifficulty);
  } else {
    session.difficulty = Math.max(session.difficulty - 1, _cfg.minDifficulty);
  }

  session.currentIndex++;
  if (session.currentIndex >= _cfg.questionCount) {
    session.finished = true;
  }
}

/**
 * After picking a question, record its category so the next pick alternates.
 * @param {object} session
 * @param {string} category
 */
function setLastCategory(session, category) {
  session.lastCategory = category;
}

/**
 * Run a complete test from an ordered list of answers.
 * Convenience wrapper around the other functions.
 *
 * @param {'beginner'|'intermediate'|'advanced'} declaredLevel
 * @param {Array}     bank       – full question bank
 * @param {boolean[]} answerList – true/false for each of the 10 answers
 * @returns {object} { session, results }
 */
function runFullTest(declaredLevel, bank, answerList) {
  const session = createSession(declaredLevel);
  for (let i = 0; i < _cfg.questionCount && !session.finished; i++) {
    const q = pickNextQuestion(session, bank);
    if (!q) break;
    recordAnswer(session, q.id, q.difficulty, answerList[i], q.category);
  }
  return { session, results: computeResults(session) };
}

/**
 * Compute final results from a finished (or partial) session.
 * @param {object} session
 * @returns {object} { totalPercent, categoryScores, placementLevel }
 */
function computeResults(session) {
  const answers = session.answers;
  if (answers.length === 0) {
    return { totalPercent: 0, categoryScores: {}, placementLevel: 0 };
  }

  /* Overall score */
  let earned = 0;
  let possible = 0;
  for (const a of answers) {
    possible += a.difficulty;
    if (a.correct) earned += a.difficulty;
  }
  const totalPercent = possible > 0 ? Math.round((earned / possible) * 100) : 0;

  /* Per-category scores */
  const cats = {};
  for (const a of answers) {
    const cat = a.category || 'unknown';
    if (!cats[cat]) cats[cat] = { earned: 0, possible: 0 };
    cats[cat].possible += a.difficulty;
    if (a.correct) cats[cat].earned += a.difficulty;
  }
  const categoryScores = {};
  for (const [cat, v] of Object.entries(cats)) {
    categoryScores[cat] = v.possible > 0 ? Math.round((v.earned / v.possible) * 100) : 0;
  }

  /* Placement level */
  const { lowCutoff, highCutoff } = _cfg.thresholds;
  let placementLevel;
  if (totalPercent < lowCutoff) {
    placementLevel = 0;
  } else if (totalPercent > highCutoff) {
    placementLevel = 2;
  } else {
    placementLevel = 1;
  }

  return { totalPercent, categoryScores, placementLevel };
}

/* ── exports ──────────────────────────────────────────────────────── */
try {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      createSession,
      pickNextQuestion,
      recordAnswer,
      setLastCategory,
      computeResults,
      runFullTest
    };
  }
} catch { /* ESM context — use window.NunyaAssessment instead */ }
if (typeof window !== 'undefined') {
  window.NunyaAssessment = {
    createSession,
    pickNextQuestion,
    recordAnswer,
    setLastCategory,
    computeResults,
    runFullTest
  };
}
