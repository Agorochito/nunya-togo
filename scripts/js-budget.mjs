// Budget JavaScript du cœur (bundle principal + boot-guard), en octets gzip : une seule valeur, lue par tous les contrôles.
// Les modules chargés à la demande (runtime/aide-panel.js, runtime/discovery-views.js, runtime/library-views.js, runtime/assessment.js, runtime/python-editor.js) n’y comptent pas.
import fs from 'node:fs';import zlib from 'node:zlib';
export const CORE_JS_GZIP_BUDGET=150000;
export const CORE_JS_FILES=['runtime/academy.bundle.js','boot-guard.js'];
export const coreJsGzipBytes=(dist=new URL('../dist/',import.meta.url))=>CORE_JS_FILES.reduce((n,f)=>n+zlib.gzipSync(fs.readFileSync(new URL(f,dist))).length,0);
