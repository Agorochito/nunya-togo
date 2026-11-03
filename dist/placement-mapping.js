/**
 * placement-mapping.js
 * Maps assessment results (placement level + category scores) to a recommended
 * academy path and starting stage.
 *
 * Pure data + one lookup function — no DOM, no side effects.
 */

/* ---------- mapping tables ---------- */

/**
 * Assessment category → academy path ID.
 * Priority order for tie-breaking: web > algo > digital
 */
var CATEGORY_TO_PATH = {
  web:     'developpement-web',
  algo:    'donnees-ia',
  digital: 'cybersecurite'
};

/** Tie-breaking priority (lower = preferred). */
var CATEGORY_PRIORITY = { web: 0, algo: 1, digital: 2 };

/**
 * Placement level → starting-stage index inside the path's stages array.
 * 0 = stage 1 (découvrir), 1 = stage 2 (bases), 2 = stage 3 (clés/protection).
 */
var LEVEL_TO_STAGE_INDEX = { 0: 0, 1: 1, 2: 2 };

/**
 * Path ID → human-readable title (French).
 * Kept here so the results screen doesn't need to load academy_paths.json.
 */
var PATH_TITLES = {
  'developpement-web': 'Développement web : ma première page utile',
  'donnees-ia':        'Données & IA : observer, calculer, vérifier',
  'cybersecurite':     'Cybersécurité : protéger et sensibiliser'
};

/**
 * Path ID → first stage IDs (index 0, 1, 2) for direct navigation.
 */
var PATH_STAGE_IDS = {
  'developpement-web': ['web-decouvrir', 'web-bases', 'web-cles'],
  'donnees-ia':        ['data-decouvrir', 'data-bases', 'data-cles'],
  'cybersecurite':     ['cyber-decouvrir', 'cyber-bases', 'cyber-protection']
};

/* ---------- lookup function ---------- */

/**
 * Given placement results, return the recommended path and entry point.
 *
 * @param {number} level - Overall placement level (0, 1 or 2).
 * @param {Object} categoryScores - { algo: number, web: number, digital: number }
 *        Each value is a percentage (0-100).
 * @returns {{ pathId: string, pathTitle: string, stageId: string, stageIndex: number, bestCategory: string }}
 */
function getStartingStageIndex(understandingScore, deductionScore) {
  var weakestSkill = Math.min(100, Math.max(0, Math.min(
    Number.isFinite(understandingScore) ? understandingScore : 0,
    Number.isFinite(deductionScore) ? deductionScore : 0
  )));
  if (weakestSkill < 35) return 0;
  if (weakestSkill <= 70) return 1;
  return 2;
}

function getRecommendedPath(level, categoryScores, preferredCategory, mastery) {
  /* find the best category (highest score, tie-broken by priority) */
  var bestCat = Object.prototype.hasOwnProperty.call(CATEGORY_TO_PATH, preferredCategory)
    ? preferredCategory
    : null;
  var bestScore = -1;
  var cats = ['web', 'algo', 'digital']; // already in priority order
  if (bestCat === null) {
    for (var i = 0; i < cats.length; i++) {
      var cat = cats[i];
      var score = categoryScores[cat] || 0;
      if (score > bestScore || (score === bestScore && (bestCat === null || CATEGORY_PRIORITY[cat] < CATEGORY_PRIORITY[bestCat]))) {
        bestScore = score;
        bestCat = cat;
      }
    }
  }

  var pathId = CATEGORY_TO_PATH[bestCat];
  var stageIndex = mastery
    ? getStartingStageIndex(mastery.understanding, mastery.deduction)
    : LEVEL_TO_STAGE_INDEX[level] ?? 0;
  var stageId = PATH_STAGE_IDS[pathId][stageIndex];

  return {
    pathId: pathId,
    pathTitle: PATH_TITLES[pathId],
    stageId: stageId,
    stageIndex: stageIndex,
    bestCategory: bestCat,
    understandingScore: mastery && Number.isFinite(mastery.understanding) ? mastery.understanding : null,
    deductionScore: mastery && Number.isFinite(mastery.deduction) ? mastery.deduction : null
  };
}

/* ---------- category strength label ---------- */

/**
 * Return a descriptive strength key for a category score.
 * @param {number} pct - Score percentage (0-100).
 * @returns {'strong'|'moderate'|'beginner'}
 */
function getCategoryStrength(pct) {
  if (pct > 70) return 'strong';
  if (pct >= 35) return 'moderate';
  return 'beginner';
}

/* ---------- exports for test & bundle ---------- */
if (typeof window !== 'undefined') {
  window.NunyaPlacementMapping = {
    CATEGORY_TO_PATH: CATEGORY_TO_PATH,
    PATH_TITLES: PATH_TITLES,
    PATH_STAGE_IDS: PATH_STAGE_IDS,
    getStartingStageIndex: getStartingStageIndex,
    getRecommendedPath: getRecommendedPath,
    getCategoryStrength: getCategoryStrength
  };
}
