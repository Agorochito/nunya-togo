import fs from 'node:fs/promises';import {chromium,expect} from '@playwright/test';import {launchTestBrowser} from '../lib/test/browser.mjs';
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),ctx=await browser.newContext(),pack=JSON.parse(await fs.readFile('dist/data/curriculum/sql-bases.json','utf8')),results={lessons:pack.lessons.length,examples:0,referenceCases:0,solutions:0,startersRejected:0};let p=await ctx.newPage();
async function ready(){await p.goto(base+'#/apprendre/sql-bases');await p.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise(r=>navigator.serviceWorker.addEventListener('controllerchange',r,{once:true}))})}
async function run(code,tests,grade=true){return p.evaluate(({code,tests,grade})=>new Promise((resolve,reject)=>{const w=new Worker('./coding-sql-worker.js',{type:'module'}),timer=setTimeout(()=>{w.terminate();reject(Error('SQL timeout'))},15000);w.onerror=e=>{clearTimeout(timer);w.terminate();reject(Error(e.message))};w.onmessage=({data})=>{if(data.done||data.error){clearTimeout(timer);w.terminate();resolve(data)}};w.postMessage({code,tests,grade})}),{code,tests,grade})}
const passes=r=>!r.error&&r.results?.every(x=>!x.error&&x.assertions_passed);
try{
 await ready();await expect(p.locator('.curr-module')).toHaveCount(6);await p.locator('[data-curr=download]').click();await expect(p.locator('[data-curr=download]')).toContainText('enregistré');
 expect((await p.request.get(base+'coding-sql-worker.js')).headers()['content-security-policy']).toContain("'wasm-unsafe-eval'");results.workerCsp=true;
 for(const l of pack.lessons){
  for(const e of l.examples){const r=await run(e.code,[{fixture:e.fixture||'club'}],false);expect(passes(r),l.id+' example '+JSON.stringify(r)).toBe(true);if(e.expected_result)expect(Array.isArray(e.expected_result)?r.results[0].tables:r.results[0].tables.at(-1)).toEqual(e.expected_result);results.examples++}
  for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests],r=await run(e.solution,tests);expect(passes(r),e.id+' '+JSON.stringify(r)).toBe(true);results.solutions++;results.referenceCases+=tests.length;expect(passes(await run(e.starter_code,tests)),e.id+' initial').toBe(false);results.startersRejected++}
 }
 let r=await run('SELECT nom FROM membres WHERE id<0;',[{fixture:'club'}],false);expect(r.results[0].tables).toEqual([{columns:['nom'],values:[]}]);results.emptyResultColumns=true;
 r=await run('SELECT inexistant FROM membres;',[{fixture:'club'}],false);expect(r.results[0].detail).toContain('no such column');results.realSyntaxError=true;
 r=await run('SELECT randomblob(20000000);',[{fixture:'club'}],false);expect(r.results[0].error).toBe('SQL');results.sqliteAllocatorLimit=true;
 // A long native query can be terminated by the host; a new Worker remains usable.
 await p.evaluate(()=>new Promise((resolve,reject)=>{const w=new Worker('./coding-sql-worker.js',{type:'module'}),timer=setTimeout(()=>{w.terminate();reject(Error('no startup'))},15000);w.onmessage=({data})=>{if(data.ready){clearTimeout(timer);setTimeout(()=>{w.terminate();resolve(true)},60)}if(data.done)reject(Error('query ended unexpectedly'))};w.postMessage({code:'WITH RECURSIVE n(x) AS(VALUES(1) UNION ALL SELECT x+1 FROM n) SELECT SUM(x) FROM n;',tests:[{fixture:'club'}],grade:false})}));results.workerCanBeStopped=true;
 r=await run('SELECT COUNT(*) AS n FROM membres;',[{fixture:'club'}],false);expect(r.results[0].tables[0].values).toEqual([[5]]);results.freshAfterStop=true;
 await ctx.setOffline(true);await p.close();p=await ctx.newPage();await ready();r=await run(pack.lessons[0].exercises[0].solution,[...pack.lessons[0].exercises[0].visible_tests,...pack.lessons[0].exercises[0].hidden_tests]);expect(passes(r),JSON.stringify(r)).toBe(true);results.coldOffline=true;
 await fs.writeFile('docs/SQL_ENGINE_RESULTS.json',JSON.stringify({results},null,2));console.log(JSON.stringify({results}));
}finally{await browser.close()}
