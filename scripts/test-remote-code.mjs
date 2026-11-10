import fs from 'node:fs';import assert from 'node:assert/strict';
import * as cpp from '../lib/remote/cpp.mjs';import * as bash from '../lib/remote/bash.mjs';import * as java from '../lib/remote/java.mjs';import * as node from '../lib/remote/node.mjs';import * as typescript from '../lib/remote/typescript.mjs';import {compileLocally,cxx,bashReady,javaReady} from '../lib/test/local-compiler.mjs';
// Build gate for online courses (C++, Bash, Java): same wrapper and parser as the browser, run locally in the Wandbox format, never on the public service.
const ENGINES={cpp:{lang:cpp,ready:!!cxx,tool:cxx},bash:{lang:bash,ready:bashReady,tool:process.platform==='linux'?'bash':'docker debian:bookworm-slim'},java:{lang:java,ready:javaReady,tool:'javac 21 (local ou eclipse-temurin:21-jdk)'},node:{lang:node,ready:true,tool:'node '+process.version},typescript:{lang:typescript,ready:true,tool:'tsc 5.6.2 (typescript-wandbox) + node '+process.version}};
const normalize=s=>String(s||'').replace(/\r\n/g,'\n').trimEnd(),passes=(r,t)=>!r.error&&r.assertions_passed!==false&&normalize(r.output)===normalize(t.expected_output);
const report={};
for(const course of JSON.parse(fs.readFileSync('dist/data/curriculum/index.json')).courses.filter(c=>ENGINES[c.runtime])){
 const {lang,ready,tool}=ENGINES[course.runtime];
 if(!ready){if(process.env.GITHUB_ACTIONS)throw Error('Outil local absent pour '+course.runtime+' en CI.');report[course.id]='ignoré : outil local absent (contrôlé par GitHub Actions)';continue}
 const run=(code,tests,grade=true)=>{const cases=lang.casesFor(tests,grade),token='GATE'+Math.random().toString(16).slice(2);let req;try{req=lang.request(code,cases,token)}catch(e){return tests.map(()=>({output:'',error:'Script',detail:e.message}))}return lang.parseResponse(compileLocally(req),cases,token,code)};
 const pack=JSON.parse(fs.readFileSync('dist/data/curriculum/'+course.id+'.json'));let examples=0,cases=0,solutions=0;
 for(const l of pack.lessons){
  for(const [i,e]of l.examples.entries()){const [r]=run(e.code,[{inputs:e.inputs||[],files:e.files||{}}],false);assert(!r.error&&normalize(r.output)===normalize(e.expected_output),l.id+' exemple '+(i+1)+' : '+JSON.stringify({attendu:e.expected_output,obtenu:r}));examples++}
  for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests];assert(tests.length>=2,e.id+' : un second cas est nécessaire');
   const res=run(e.solution,tests);res.forEach((r,k)=>assert(passes(r,tests[k]),e.id+' solution cas '+k+' : '+JSON.stringify({attendu:tests[k].expected_output,obtenu:r})));cases+=tests.length;solutions++;
   assert(!run(e.starter_code,tests).every((r,k)=>passes(r,tests[k])),e.id+' : le code de départ réussit déjà');
  }
 }
 report[course.id]={tool,examples,referenceCases:cases,solutionsAccepted:solutions,startersRejected:solutions};
}
if(Object.keys(report).length)console.log(JSON.stringify(report));
