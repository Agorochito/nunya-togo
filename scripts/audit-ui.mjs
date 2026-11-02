import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
import axe from 'axe-core';
const phase=process.argv[2]||'baseline',base=process.argv[3]||'http://127.0.0.1:4176/';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const output=[];
for(const size of [{width:360,height:640},{width:1440,height:900}])for(const dark of [false,true]){
 const context=await browser.newContext({viewport:size,colorScheme:dark?'dark':'light'});
 const p=await context.newPage();await p.goto(base);await p.waitForSelector('#main h1');
 // Existing v4 saves an explicit theme locally; configure only this isolated test profile.
 await p.evaluate(dark=>{const s=JSON.parse(localStorage.getItem('nunya-state')||'{}');s.theme=dark?'dark':'light';s.accent='#9a6544';s.profile={...s.profile,name:'Ama'};localStorage.setItem('nunya-state',JSON.stringify(s))},dark);await p.reload();
 for(const route of (phase==='baseline'?['accueil','mes-cours']:['accueil','avenir','parcours/cybersecurite','mes-cours','bibliotheque','opportunites','etranger','portfolio','parcours/cybersecurite/etape/cyber-decouvrir-metier','avenir/health','parcours/sante-sciences'])){
  await p.goto(base+'#/'+route);await p.waitForTimeout(300);await p.evaluate(axe.source);const r=await p.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  const name=`${phase}-${size.width}-${dark?'dark':'light'}-${route.replaceAll('/','-')}`;
  await p.screenshot({path:'docs/screenshots/'+name+'.png',fullPage:false});
  output.push({route,width:size.width,dark,overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 }
 await context.close();
}
await browser.close();await fs.writeFile('docs/AXE_'+phase.toUpperCase()+'.json',JSON.stringify(output,null,2));console.log(JSON.stringify(output.map(r=>({...r,violations:r.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length}))})),null,2));
