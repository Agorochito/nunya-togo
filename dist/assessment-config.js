/* Nunya adaptive-test configuration.
   Thresholds will be adjusted after the beta phase.
   Imported by assessment-engine.js; also readable from tests.           */

const ASSESSMENT_CONFIG = {
  /** Number of questions in a full test session. */
  questionCount: 10,

  /** Minimum difficulty (easiest). */
  minDifficulty: 1,

  /** Maximum difficulty (hardest). */
  maxDifficulty: 3,

  /** Mapping from declared skill level to starting difficulty. */
  startingDifficulty: {
    beginner: 1,
    intermediate: 2,
    advanced: 3
  },

  /**
   * Placement thresholds — percentage of total possible points.
   * < lowCutoff        → level 0
   * lowCutoff .. highCutoff → level 1
   * > highCutoff       → level 2
   */
  thresholds: {
    lowCutoff: 35,
    highCutoff: 70
  }
};

/* Export for both Node/CJS (tests) and browser (IIFE). */
try {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASSESSMENT_CONFIG };
  }
} catch { /* ESM context — config is already a global */ }
