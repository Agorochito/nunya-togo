/* Nunya — adaptive test engine — automated tests.
   Run with:  npx vitest run tests/assessment-engine.test.cjs            */

/* vitest injects describe / it / expect as globals */

/*  Load config + engine as CJS despite package.json "type":"module".
    We read the source files as text and evaluate them, mirroring
    how the browser loads them via <script> tags.                        */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const distDir = path.resolve(__dirname, '..', 'dist');
const configSrc = fs.readFileSync(path.join(distDir, 'assessment-config.js'), 'utf8');
const engineSrc = fs.readFileSync(path.join(distDir, 'assessment-engine.js'), 'utf8');
const assessmentBank = JSON.parse(
  fs.readFileSync(path.join(distDir, 'data', 'assessment-questions.json'), 'utf8')
);

/* Build a shared context with module/exports so the files can export. */
const sandbox = { module: { exports: {} }, exports: {}, require, console };
sandbox.module.exports = {};
sandbox.exports = sandbox.module.exports;

/* Run config first — defines ASSESSMENT_CONFIG as a global + exports. */
vm.runInNewContext(configSrc, sandbox, { filename: 'assessment-config.js' });
const { ASSESSMENT_CONFIG } = sandbox.module.exports;

/* Run engine — needs ASSESSMENT_CONFIG in scope. */
const engineSandbox = {
  ASSESSMENT_CONFIG,
  module: { exports: {} },
  exports: {},
  require,
  console,
  Math, Array, Object, Set, JSON, String, Number,
  window: {}
};
engineSandbox.exports = engineSandbox.module.exports;
vm.runInNewContext(engineSrc, engineSandbox, { filename: 'assessment-engine.js' });

const {
  createSession,
  pickNextQuestion,
  recordAnswer,
  computeResults,
  runFullTest
} = engineSandbox.module.exports;

/* ── mock question bank ──────────────────────────────────────────── */
/* 3 categories × 3 difficulties × 2 questions = 18 questions       */
function makeBank() {
  const categories = ['algo', 'web', 'database'];
  const bank = [];
  let id = 1;
  for (const cat of categories) {
    for (let diff = 1; diff <= 3; diff++) {
      bank.push({ id: `q${id++}`, category: cat, difficulty: diff });
      bank.push({ id: `q${id++}`, category: cat, difficulty: diff });
    }
  }
  return bank; /* 18 questions */
}

/* ── helpers ──────────────────────────────────────────────────────── */

/** Run 10 questions returning the same answer each time. */
function runAllSame(declaredLevel, correct) {
  const answers = Array(10).fill(correct);
  return runFullTest(declaredLevel, makeBank(), answers);
}

/* ================================================================= */
/*  TESTS                                                            */
/* ================================================================= */

describe('createSession', () => {
  it('1 – sets starting difficulty from declared level', () => {
    expect(createSession('beginner').difficulty).toBe(1);
    expect(createSession('intermediate').difficulty).toBe(2);
    expect(createSession('advanced').difficulty).toBe(3);
  });

  it('2 – defaults to difficulty 1 for unknown level', () => {
    expect(createSession('xyz').difficulty).toBe(1);
  });
});

describe('all correct answers', () => {
  it('3 – score is 100 % and placement level is 2', () => {
    const { results } = runAllSame('beginner', true);
    expect(results.totalPercent).toBe(100);
    expect(results.placementLevel).toBe(2);
  });
});

describe('all incorrect answers', () => {
  it('4 – score is 0 % and placement level is 0', () => {
    const { results } = runAllSame('intermediate', false);
    expect(results.totalPercent).toBe(0);
    expect(results.placementLevel).toBe(0);
  });
});

describe('mixed results', () => {
  it('5 – mixed correct/incorrect yields a score between 0 and 100', () => {
    /*  Beginner start (diff 1). Alternating correct/incorrect stays at
        low difficulty, so total percentage is low (~33 %).               */
    const pattern = [true, false, true, false, true, false, true, false, true, false];
    const { results, session } = runFullTest('beginner', makeBank(), pattern);

    expect(results.totalPercent).toBeGreaterThan(0);
    expect(results.totalPercent).toBeLessThan(100);
    expect(session.answers).toHaveLength(10);
  });
});

describe('no question repetition', () => {
  it('6 – all 10 question ids are unique', () => {
    const { session } = runAllSame('beginner', true);
    const ids = session.answers.map(a => a.questionId);
    expect(new Set(ids).size).toBe(10);
  });
});

describe('difficulty boundaries', () => {
  it('7 – difficulty never exceeds 3 even after many correct answers', () => {
    const { session } = runAllSame('advanced', true);
    /* Advanced starts at 3; correct → +1 but clamped to 3 */
    const diffs = session.answers.map(a => a.difficulty);
    for (const d of diffs) {
      expect(d).toBeGreaterThanOrEqual(1);
      expect(d).toBeLessThanOrEqual(3);
    }
    /* After the first correct answer at diff 3, difficulty stays 3 */
    expect(session.difficulty).toBe(3);
  });

  it('8 – difficulty never drops below 1 even after many incorrect answers', () => {
    const { session } = runAllSame('beginner', false);
    /* Beginner starts at 1; incorrect → −1 but clamped to 1 */
    const diffs = session.answers.map(a => a.difficulty);
    for (const d of diffs) {
      expect(d).toBeGreaterThanOrEqual(1);
      expect(d).toBeLessThanOrEqual(3);
    }
    expect(session.difficulty).toBe(1);
  });
});

describe('threshold levels', () => {
  it('9 – score < 35 % yields placement level 0', () => {
    /* 9 wrong + 1 right at diff 1 ⇒ low score */
    const answers = [false, false, false, false, false, false, false, false, false, true];
    const { results } = runFullTest('beginner', makeBank(), answers);
    expect(results.totalPercent).toBeLessThan(35);
    expect(results.placementLevel).toBe(0);
  });

  it('10 – score in 35–70 % range yields placement level 1', () => {
    /* Pattern crafted so adaptive engine yields ~35 % (level 1). */
    const pattern = [true, true, false, true, false, true, false, false, false, false];
    const { results } = runFullTest('beginner', makeBank(), pattern);
    expect(results.totalPercent).toBeGreaterThanOrEqual(35);
    expect(results.totalPercent).toBeLessThanOrEqual(70);
    expect(results.placementLevel).toBe(1);
  });

  it('11 – score > 70 % yields placement level 2', () => {
    /* Mostly correct from intermediate start → high score */
    const answers = [true, true, true, true, true, true, true, true, true, false];
    const { results } = runFullTest('intermediate', makeBank(), answers);
    expect(results.totalPercent).toBeGreaterThan(70);
    expect(results.placementLevel).toBe(2);
  });
});

describe('category alternation', () => {
  it('12 – consecutive questions do not share the same category', () => {
    const bank = makeBank();
    const session = createSession('beginner');
    const categories = [];
    for (let i = 0; i < 10; i++) {
      const q = pickNextQuestion(session, bank);
      if (!q) break;
      categories.push(q.category);
      recordAnswer(session, q.id, q.difficulty, true, q.category);
    }
    /* No two consecutive categories should be the same */
    for (let i = 1; i < categories.length; i++) {
      expect(categories[i]).not.toBe(categories[i - 1]);
    }
  });
});

describe('per-category scores', () => {
  it('13 – categoryScores returns a percentage for each category', () => {
    const { results } = runAllSame('beginner', true);
    /* All correct → every category should be 100 % */
    for (const pct of Object.values(results.categoryScores)) {
      expect(pct).toBe(100);
    }
  });
});

describe('domain-specific onboarding assessments', () => {
  for (const category of ['algo', 'web', 'digital']) {
    it(`includes ${category} comprehension and deduction in its 10 questions`, () => {
      const bank = assessmentBank.filter(q =>
        q.category === category || q.category === 'deduction'
      );
      const { session, results } = runFullTest('intermediate', bank, Array(10).fill(true));
      const categories = new Set(session.answers.map(answer => answer.category));

      expect(bank).toHaveLength(12);
      expect(session.answers).toHaveLength(10);
      expect(new Set(session.askedIds).size).toBe(10);
      expect(categories.has(category)).toBe(true);
      expect(categories.has('deduction')).toBe(true);
      expect(results.categoryScores[category]).toBe(100);
      expect(results.categoryScores.deduction).toBe(100);
    });
  }
});
