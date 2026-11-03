/**
 * placement-mapping.test.cjs
 * Tests for placement-mapping.js
 */
/* vitest globals (describe, it, expect, beforeAll) injected via --globals */
const vm = require('vm');
const fs = require('fs');
const path = require('path');

let mapping;

beforeAll(() => {
  const src = fs.readFileSync(
    path.join(__dirname, '..', 'dist', 'placement-mapping.js'),
    'utf8'
  );
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  mapping = ctx.window.NunyaPlacementMapping;
});

describe('placement-mapping', () => {

  describe('getCategoryStrength', () => {
    it('returns beginner below 35%', () => {
      expect(mapping.getCategoryStrength(0)).toBe('beginner');
      expect(mapping.getCategoryStrength(34)).toBe('beginner');
    });

    it('returns moderate between 35% and 70%', () => {
      expect(mapping.getCategoryStrength(35)).toBe('moderate');
      expect(mapping.getCategoryStrength(50)).toBe('moderate');
      expect(mapping.getCategoryStrength(70)).toBe('moderate');
    });

    it('returns strong above 70%', () => {
      expect(mapping.getCategoryStrength(71)).toBe('strong');
      expect(mapping.getCategoryStrength(100)).toBe('strong');
    });
  });

  describe('getRecommendedPath', () => {

    it('maps best-category web to developpement-web', () => {
      const r = mapping.getRecommendedPath(0, { algo: 20, web: 80, digital: 30 });
      expect(r.pathId).toBe('developpement-web');
      expect(r.bestCategory).toBe('web');
    });

    it('maps best-category algo to donnees-ia', () => {
      const r = mapping.getRecommendedPath(1, { algo: 60, web: 30, digital: 40 });
      expect(r.pathId).toBe('donnees-ia');
      expect(r.bestCategory).toBe('algo');
    });

    it('maps best-category digital to cybersecurite', () => {
      const r = mapping.getRecommendedPath(2, { algo: 10, web: 10, digital: 90 });
      expect(r.pathId).toBe('cybersecurite');
      expect(r.bestCategory).toBe('digital');
    });

    it('keeps the learner-selected domain when another category scores higher', () => {
      const r = mapping.getRecommendedPath(
        1,
        { algo: 20, web: 90, digital: 30, deduction: 80 },
        'digital'
      );
      expect(r.pathId).toBe('cybersecurite');
      expect(r.bestCategory).toBe('digital');
      expect(r.stageId).toBe('cyber-bases');
    });

    it('starts with the foundations when either assessed skill is below 35%', () => {
      const r = mapping.getRecommendedPath(
        2,
        { algo: 0, web: 90, digital: 0, deduction: 80 },
        'web',
        { understanding: 0, deduction: 80 }
      );
      expect(r.stageIndex).toBe(0);
      expect(r.stageId).toBe('web-decouvrir');
    });

    it('consolidates the basics when the weaker skill is between the cutoffs', () => {
      const r = mapping.getRecommendedPath(
        2,
        { algo: 0, web: 90, digital: 0, deduction: 60 },
        'web',
        { understanding: 90, deduction: 60 }
      );
      expect(r.stageIndex).toBe(1);
      expect(r.stageId).toBe('web-bases');
      expect(r.understandingScore).toBe(90);
      expect(r.deductionScore).toBe(60);
    });

    it('opens the advanced stage only when both skills exceed 70%', () => {
      const r = mapping.getRecommendedPath(
        0,
        { algo: 0, web: 95, digital: 0, deduction: 80 },
        'web',
        { understanding: 95, deduction: 80 }
      );
      expect(r.stageIndex).toBe(2);
      expect(r.stageId).toBe('web-cles');
    });

    it('uses the existing placement cutoffs for the weaker skill', () => {
      expect(mapping.getStartingStageIndex(35, 100)).toBe(1);
      expect(mapping.getStartingStageIndex(100, 70)).toBe(1);
      expect(mapping.getStartingStageIndex(71, 100)).toBe(2);
    });

    it('uses the foundations when a score is missing or invalid', () => {
      expect(mapping.getStartingStageIndex(90, Number.NaN)).toBe(0);
      expect(mapping.getStartingStageIndex(Number.POSITIVE_INFINITY, 90)).toBe(0);
    });

    it('level 0 starts at stage index 0 (decouvrir)', () => {
      const r = mapping.getRecommendedPath(0, { algo: 10, web: 50, digital: 10 });
      expect(r.stageIndex).toBe(0);
      expect(r.stageId).toBe('web-decouvrir');
    });

    it('level 1 starts at stage index 1 (bases)', () => {
      const r = mapping.getRecommendedPath(1, { algo: 10, web: 50, digital: 10 });
      expect(r.stageIndex).toBe(1);
      expect(r.stageId).toBe('web-bases');
    });

    it('level 2 starts at stage index 2 (cles/protection)', () => {
      const r = mapping.getRecommendedPath(2, { algo: 10, web: 50, digital: 10 });
      expect(r.stageIndex).toBe(2);
      expect(r.stageId).toBe('web-cles');
    });

    it('breaks ties in favor of web > algo > digital', () => {
      const r = mapping.getRecommendedPath(0, { algo: 50, web: 50, digital: 50 });
      expect(r.bestCategory).toBe('web');
      expect(r.pathId).toBe('developpement-web');
    });

    it('breaks tie between algo and digital in favor of algo', () => {
      const r = mapping.getRecommendedPath(1, { algo: 60, web: 30, digital: 60 });
      expect(r.bestCategory).toBe('algo');
      expect(r.pathId).toBe('donnees-ia');
    });

    it('returns correct stageId for cybersecurite level 2', () => {
      const r = mapping.getRecommendedPath(2, { algo: 0, web: 0, digital: 100 });
      expect(r.stageId).toBe('cyber-protection');
      expect(r.pathTitle).toBe('Cybersécurité : protéger et sensibiliser');
    });

    it('returns correct stageId for donnees-ia level 1', () => {
      const r = mapping.getRecommendedPath(1, { algo: 80, web: 10, digital: 10 });
      expect(r.stageId).toBe('data-bases');
      expect(r.pathTitle).toBe('Données & IA : observer, calculer, vérifier');
    });
  });
});
