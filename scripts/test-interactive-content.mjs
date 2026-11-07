import fs from 'node:fs/promises';
import path from 'node:path';
import {chromium} from '@playwright/test';
import {launchTestBrowser} from '../lib/test/browser.mjs';
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/';
const ids=process.argv.slice(2).length?process.argv.slice(2):['javascript-dom','react-bases'];
const browser=await launchTestBrowser(chromium),results=[],failures=[];
try{
 for(const course of ids){
  const runtime=course==='react-bases'?'react':'dom',p=await browser.newPage();await p.goto(base);let lessons=0,examples=0,solutions=0,rejectedStarters=0,checks=0;
  const dir=path.join('content/fr',course);let modules;try{modules=await fs.readdir(dir)}catch{continue}
  for(const mod of modules.sort())for(const file of (await fs.readdir(path.join(dir,mod))).filter(f=>f.endsWith('.md')).sort()){
   const raw=await fs.readFile(path.join(dir,mod,file),'utf8'),lesson=JSON.parse(raw.split('---')[1]);const codes=[...raw.matchAll(/```(?:javascript|jsx|js)\n([\s\S]*?)\n```/g)].map(m=>m[1]);lessons++;
   const run=async(code,exercise)=>p.evaluate(async({code,exercise,runtime})=>{const {checkInteractive}=await import('./runtime/interactive-client.js');let host=document.getElementById('interactive-content');if(!host){host=document.createElement('section');host.id='interactive-content';document.body.append(host)}return checkInteractive({code,exercise,runtime,grade:true,host})},{code,exercise,runtime});
   for(const [i,ex] of lesson.examples.entries()){
    const r=await run(codes[i],{fixture_html:ex.fixture_html,visible_tests:[ex.browser_test],hidden_tests:[]});examples++;checks+=r.results.reduce((n,t)=>n+t.checks.length,0);if(!r.passed)failures.push({id:lesson.id+' example '+(i+1),results:r.results});
   }
   for(const ex of JSON.parse(await fs.readFile(path.join(dir,mod,file.replace('.md','.exercises.json')),'utf8'))){
    const r=await run(ex.solution,ex);solutions++;checks+=r.results.reduce((n,t)=>n+t.checks.length,0);if(!r.passed)failures.push({id:ex.id,results:r.results});
    const starter=await run(ex.starter_code,ex);if(starter.passed)failures.push({id:ex.id,reason:'Unfinished starter incorrectly passes'});else rejectedStarters++;
   }
   console.log(course+' '+lesson.id+' checked');
  }
  await p.close();results.push({course,lessons,examples,solutions,rejectedStarters,checks});
 }
 await fs.writeFile('docs/INTERACTIVE_CONTENT_RESULTS.json',JSON.stringify({results,failures},null,2)+'\n');console.log(JSON.stringify({results,failures}));if(failures.length)throw Error(failures.length+' interactive content failures');
}finally{await browser.close()}
