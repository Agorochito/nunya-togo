// Budgets en octets gzip, une seule valeur chacun, lue par tous les contrôles : JavaScript du cœur (bundle principal + boot-guard) et CSS (bundle unique, contrôlé par scripts/check-css.mjs).
// Les modules chargés à la demande (runtime/aide-panel.js, runtime/discovery-views.js, runtime/library-views.js, runtime/assessment.js, runtime/python-editor.js) n’y comptent pas.
import fs from 'node:fs';import zlib from 'node:zlib';
export const CORE_JS_GZIP_BUDGET=150000;
export const CORE_JS_FILES=['runtime/academy.bundle.js','boot-guard.js'];
export const coreJsGzipBytes=(dist=new URL('../dist/',import.meta.url))=>CORE_JS_FILES.reduce((n,f)=>n+zlib.gzipSync(fs.readFileSync(new URL(f,dist))).length,0);
// Phase 0 de la refonte : 42 000 (jetons ajoutés, pas encore utilisés). Objectif de la phase 1 : revenir sous 40 000 en retirant les anciennes surcharges.
export const CSS_GZIP_BUDGET=42000;
export const CSS_FILES=['runtime/academy.bundle.css'];
export const cssGzipBytes=(dist=new URL('../dist/',import.meta.url))=>CSS_FILES.reduce((n,f)=>n+zlib.gzipSync(fs.readFileSync(new URL(f,dist))).length,0);
