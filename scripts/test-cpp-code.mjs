import fs from 'node:fs';import assert from 'node:assert/strict';
import {request,parseResponse,casesFor} from '../lib/remote/cpp.mjs';import {compileLocally,cxx} from '../lib/test/local-compiler.mjs';
// Build gate for online C++ courses: compiled locally with the same wrapper and parser as the browser, never on the public service.
const normalize=s=>String(s||'').replace(/\r\n/g,'\n').trimEnd(),passes=(r,t)=>!r.error&&r.assertions_passed!==false&&normalize(r.output)===normalize(t.expected_output);
const packs=JSON.parse(fs.readFileSync('dist/data/curriculum/index.json')).courses.filter(c=>c.runtime==='cpp').map(c=>JSON.parse(fs.readFileSync('dist/data/curriculum/'+c.id+'.json')));
if(packs.length&&!cxx){if(process.env.GITHUB_ACTIONS)throw Error('Compilateur C++ absent en CI.');console.log(JSON.stringify({cpp:'ignoré : aucun compilateur local (contrôlé par GitHub Actions)'}));process.exit(0)}
const run=(code,tests,grade=true)=>{const cases=casesFor(tests,grade),token='GATE'+Math.random().toString(16).slice(2);let req;try{req=request(code,cases,token)}catch(e){return tests.map(()=>({output:'',error:'Script',detail:e.message}))}return parseResponse(compileLocally(req),cases,token)};
let examples=0,cases=0,solutions=0;
for(const pack of packs)for(const l of pack.lessons){
 for(const [i,e]of l.examples.entries()){const [r]=run(e.code,[{inputs:e.inputs||[]}],false);assert(!r.error&&normalize(r.output)===normalize(e.expected_output),l.id+' exemple '+(i+1)+' : '+JSON.stringify({attendu:e.expected_output,obtenu:r}));examples++}
 for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests];assert(tests.length>=2,e.id+' : un second cas est nécessaire');
  const res=run(e.solution,tests);res.forEach((r,k)=>assert(passes(r,tests[k]),e.id+' solution cas '+k+' : '+JSON.stringify({attendu:tests[k].expected_output,obtenu:r})));cases+=tests.length;solutions++;
  assert(!run(e.starter_code,tests).every((r,k)=>passes(r,tests[k])),e.id+' : le code de départ réussit déjà');
 }
}
if(packs.length)console.log(JSON.stringify({cppCompiler:cxx,cppExamples:examples,cppReferenceCases:cases,solutionsAccepted:solutions,startersRejected:solutions}));
