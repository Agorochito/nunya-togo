// Budgets en octets gzip, une seule valeur chacun, lue par tous les contrôles : JavaScript du cœur (bundle principal + boot-guard) et CSS (bundle unique, contrôlé par scripts/check-css.mjs).
// Les modules chargés à la demande (runtime/aide-panel.js, runtime/discovery-views.js, runtime/library-views.js, runtime/assessment.js, runtime/python-editor.js, runtime/home-landing.js, runtime/momentum.js) n’y comptent pas.
import fs from 'node:fs';import zlib from 'node:zlib';
export const CORE_JS_GZIP_BUDGET=300000;
export const CORE_JS_FILES=['runtime/academy.bundle.js','boot-guard.js'];
export const coreJsGzipBytes=(dist=new URL('../dist/',import.meta.url))=>CORE_JS_FILES.reduce((n,f)=>n+zlib.gzipSync(fs.readFileSync(new URL(f,dist))).length,0);
// Refonte visuelle : 42 000 pendant la phase 0, 40 000 en phase 1 (anciennes surcharges retirées) pour le seul bundle. Depuis la 5.30.0, la feuille globale de la refonte
// (runtime/reference-redesign.css, chargée avec le bundle dès le premier affichage) est comptée aussi : le budget passe à 44 000 octets gzip pour les deux.
export const CSS_GZIP_BUDGET=44000;
export const CSS_FILES=['runtime/academy.bundle.css','runtime/reference-redesign.css'];
export const cssGzipBytes=(dist=new URL('../dist/',import.meta.url))=>CSS_FILES.reduce((n,f)=>n+zlib.gzipSync(fs.readFileSync(new URL(f,dist))).length,0);
