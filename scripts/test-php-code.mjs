import fs from 'node:fs';import assert from 'node:assert/strict';
import {PhpNode} from 'php-wasm/PhpNode';import {createRunner} from '../lib/php/core.mjs';
// Same pass rule as the lesson view: no error, every check true, identical output once trailing spaces are removed.
const normalize=s=>String(s||'').replace(/\r\n/g,'\n').trimEnd(),passes=(r,t)=>!r.error&&r.assertions_passed!==false&&normalize(r.output)===normalize(t.expected_output);
const packs=JSON.parse(fs.readFileSync('dist/data/curriculum/index.json')).courses.filter(c=>c.runtime==='php').map(c=>JSON.parse(fs.readFileSync('dist/data/curriculum/'+c.id+'.json')));
if(packs.length){
 const php=new PhpNode({version:'8.3'});await php.binary;const run=createRunner(php);let examples=0,cases=0,solutions=0,starters=0;
 for(const pack of packs)for(const l of pack.lessons){
  for(const [i,e]of l.examples.entries()){const r=await run(e.code,{inputs:e.inputs||[]});assert(!r.error&&normalize(r.output)===normalize(e.expected_output),l.id+' exemple '+(i+1)+' : '+JSON.stringify({attendu:e.expected_output,obtenu:r}));examples++}
  for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests];assert(tests.length>=2,e.id+' : un second cas est nécessaire');
   for(const t of tests){const r=await run(e.solution,t);assert(passes(r,t),e.id+' solution : '+JSON.stringify({attendu:t.expected_output,obtenu:r}));cases++}
   solutions++;
   const starter=[];for(const t of tests)starter.push(passes(await run(e.starter_code,t),t));assert(!starter.every(Boolean),e.id+' : le code de départ réussit déjà');
   const empty=[];for(const t of tests)empty.push(passes(await run('<?php',t),t));assert(!empty.every(Boolean),e.id+' : un script vide réussit');starters++;
  }
 }
 console.log(JSON.stringify({phpExamples:examples,phpReferenceCases:cases,solutionsAccepted:solutions,startersAndEmptyScriptsRejected:starters}));
}
process.exit(0);
