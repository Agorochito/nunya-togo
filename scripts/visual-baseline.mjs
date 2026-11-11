import {chromium} from '@playwright/test';import fs from 'node:fs/promises';import path from 'node:path';import os from 'node:os';import {fileURLToPath} from 'node:url';import axe from 'axe-core';import {launchTestBrowser} from '../lib/test/browser.mjs';
/* Référence visuelle de la refonte (Phase 0) : 8 pages × 2 largeurs × 3 apparences, pour un apprenant type (Afi, 2 leçons Python terminées).
   Chaque cas compare une capture (hauteur d'écran) à docs/visual-baseline/<nom>.png et passe axe (wcag2a, wcag2aa).
   Échec si plus de 1 % des pixels diffèrent ou si axe trouve une violation absente de docs/visual-baseline/axe-known.json.
   Options : --update (réécrit les PNG et la liste des violations connues), --base=URL (ou NUNYA_BASE), --only=texte (filtre sur le nom), --no-pixels (axe seul, utile sur un autre système). */
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dir=path.join(root,'docs','visual-baseline'),diffDir=path.join(root,'artifacts','visual-baseline'),knownFile=path.join(dir,'axe-known.json');
const args=process.argv.slice(2),flag=n=>args.includes('--'+n),opt=n=>args.find(a=>a.startsWith('--'+n+'='))?.slice(n.length+3);
const update=flag('update'),pixels=!flag('no-pixels'),only=opt('only');
let base=opt('base')||process.env.NUNYA_BASE||'http://localhost:4173/';if(!base.endsWith('/'))base+='/';
const ROUTES=['#/accueil','#/apprendre','#/apprendre/python-bases','#/apprendre/python-bases/m1/py-m1-01','#/avenir','#/bibliotheque','#/mes-cours','#/progression'];
const SIZES=[{width:360,height:800},{width:1440,height:900}],LOOKS=[['nunya','light'],['nunya','dark'],['verre','light']];
const MAX_DIFF=.01,TOLERANCE=10,FIXED_TIME=new Date('2026-11-11T09:00:00Z'),AXE_TAGS=['wcag2a','wcag2aa'];
const SEED={academy:{onboarded:true},onboarding:{done:true,step:'complete',skipped:true},profile:{name:'Afi',age:'13+'},curriculum:{completed:{'py-m1-01':true,'py-m1-02':true},lastLesson:'py-m1-03'},lang:'fr',glassLite:false};
// Aucune animation ni transition, pas de curseur clignotant : la capture doit être identique d'une exécution à l'autre.
const NO_MOTION='*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important;scroll-behavior:auto!important}';
const slug=route=>route.replace(/^#\//,'').replaceAll('/','_');
const keyOf=v=>[v.route,v.width,v.ambiance,v.theme,v.rule].join('|');
const readJSON=async(file,fallback)=>{try{return JSON.parse(await fs.readFile(file,'utf8'))}catch{return fallback}};
const exists=file=>fs.access(file).then(()=>true,()=>false);

// Attend que la page ne bouge plus : polices, images, puis contenu de #main stable pendant 400 ms.
const settle=p=>p.evaluate(async()=>{await document.fonts.ready;const main=document.querySelector('#main');let last='',stable=0;for(let i=0;i<80&&stable<4;i++){await new Promise(r=>setTimeout(r,100));await Promise.all([...document.images].filter(img=>!img.complete).map(img=>new Promise(r=>{img.onload=img.onerror=r})));const now=main.innerHTML.length+':'+document.documentElement.scrollHeight;stable=now===last?stable+1:0;last=now}scrollTo(0,0);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))});

// Décode les deux PNG dans le navigateur (canvas, aucune dépendance) et compte les pixels qui diffèrent au-delà de la tolérance.
const compare=(page,actual,reference)=>page.evaluate(async({actual,reference,tolerance})=>{
 const load=async b64=>{const bmp=await createImageBitmap(new Blob([Uint8Array.from(atob(b64),c=>c.charCodeAt(0))],{type:'image/png'}),{colorSpaceConversion:'none',premultiplyAlpha:'none'});const c=new OffscreenCanvas(bmp.width,bmp.height),x=c.getContext('2d',{willReadFrequently:true});x.drawImage(bmp,0,0);return {w:bmp.width,h:bmp.height,data:x.getImageData(0,0,bmp.width,bmp.height).data}};
 const a=await load(actual),b=await load(reference);if(a.w!==b.w||a.h!==b.h)return {ratio:1,reason:`taille ${a.w}×${a.h} au lieu de ${b.w}×${b.h}`};
 const out=new ImageData(a.w,a.h);let differing=0;
 for(let i=0;i<a.data.length;i+=4){const diff=Math.abs(a.data[i]-b.data[i])>tolerance||Math.abs(a.data[i+1]-b.data[i+1])>tolerance||Math.abs(a.data[i+2]-b.data[i+2])>tolerance||Math.abs(a.data[i+3]-b.data[i+3])>tolerance;const grey=(a.data[i]+a.data[i+1]+a.data[i+2])/3*.25+190;
  if(diff){differing++;out.data.set([220,0,40,255],i)}else out.data.set([grey,grey,grey,255],i)}
 const ratio=differing/(a.w*a.h);let diffPng='';
 if(differing){const c=new OffscreenCanvas(a.w,a.h);c.getContext('2d').putImageData(out,0,0);const blob=await c.convertToBlob({type:'image/png'});diffPng=await new Promise(r=>{const f=new FileReader();f.onload=()=>r(String(f.result).split(',')[1]);f.readAsDataURL(blob)})}
 return {ratio,differing,diffPng};
},{actual,reference,tolerance:TOLERANCE});

const started=Date.now(),browser=await launchTestBrowser(chromium),platform=`${os.platform()}-${os.arch()}`,browserVersion=browser.version();
const knownDoc=await readJSON(knownFile,{violations:[]}),known=new Map(knownDoc.violations.map(v=>[keyOf(v),v.count]));
if(pixels&&!update&&knownDoc.generatedOn&&knownDoc.generatedOn.platform!==platform)console.warn(`Attention : références créées sous ${knownDoc.generatedOn.platform} (${knownDoc.generatedOn.browser}), exécution sous ${platform}. Les polices système diffèrent : utiliser --no-pixels ou --update sur ce système.`);
await fs.mkdir(dir,{recursive:true});
const cases=[],failures=[],found=[],ran=new Set();
try{
 const cmpCtx=await browser.newContext(),cmp=await cmpCtx.newPage();
 for(const size of SIZES)for(const [ambiance,theme] of LOOKS){
  const todo=ROUTES.filter(route=>!only||`${slug(route)}-${size.width}-${ambiance}-${theme}`.includes(only));if(!todo.length)continue;
  const ctx=await browser.newContext({viewport:size,deviceScaleFactor:1,colorScheme:theme,reducedMotion:'reduce',serviceWorkers:'block',locale:'fr-FR',timezoneId:'Africa/Lome'});
  await ctx.clock.setFixedTime(FIXED_TIME);
  // État de départ réécrit à chaque chargement : chaque page part du même apprenant. Math.random est rendu prévisible.
  await ctx.addInitScript(seed=>{localStorage.setItem('nunya-state',JSON.stringify(seed));let s=20261111;Math.random=()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},{...SEED,ambiance,theme});
  const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  for(const route of todo){
   const name=`${slug(route)}-${size.width}-${ambiance}-${theme}`,t0=Date.now(),before=errors.length;ran.add([route,size.width,ambiance,theme].join('|'));
   const row={name,route,width:size.width,ambiance,theme};
   try{
    // Un accès direct à une route en hash peut retomber sur l'accueil : on charge l'appli puis on change le hash dans la page.
    await p.goto(base,{waitUntil:'load'});await p.waitForSelector('#main h1',{timeout:20000});
    await p.evaluate(route=>{location.hash=route},route);
    await p.waitForFunction(route=>location.hash===route&&document.querySelector('#main h1'),route,{timeout:20000});
    await p.addStyleTag({content:NO_MOTION});await settle(p);
    row.h1=(await p.locator('#main h1').first().innerText()).trim();
    row.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    row.applied=await p.evaluate(()=>({ambiance:document.documentElement.dataset.ambiance||'',mode:document.documentElement.dataset.mode||''}));
    if(row.applied.ambiance!==ambiance||row.applied.mode!==theme)failures.push(`${name} : apparence appliquée ${row.applied.ambiance}/${row.applied.mode}`);
    // (a) Accessibilité.
    await p.evaluate(axe.source);
    const violations=await p.evaluate(tags=>axe.run(document,{runOnly:{type:'tag',values:tags},resultTypes:['violations']}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,detail:(v.nodes[0]?.failureSummary||'').replace(/\s+/g,' ').slice(0,240),targets:v.nodes.slice(0,5).map(n=>n.target.join(' '))}))),AXE_TAGS);
    row.axe=violations;
    for(const v of violations){const entry={route,width:size.width,ambiance,theme,rule:v.id,count:v.count};found.push(entry);const allowed=known.get(keyOf(entry));
     if(!update&&(allowed===undefined||v.count>allowed))failures.push(`${name} : axe ${v.id} (${v.count} élément${v.count>1?'s':''}${allowed!==undefined?`, ${allowed} connu${allowed>1?'s':''}`:', nouvelle'}) ${v.targets.slice(0,2).join(' | ')}`)}
    // (b) Capture de la hauteur d'écran et comparaison.
    const shot=await p.screenshot({fullPage:false,animations:'disabled',caret:'hide'}),file=path.join(dir,name+'.png');
    if(update){await fs.writeFile(file,shot);row.pixels='référence écrite'}
    else if(pixels){
     if(!await exists(file)){row.pixels='référence absente';failures.push(`${name} : référence absente (lancer avec --update)`)}
     else{const r=await compare(cmp,shot.toString('base64'),(await fs.readFile(file)).toString('base64'));row.diffRatio=Number(r.ratio.toFixed(6));
      if(r.reason)row.pixels=r.reason;
      if(r.ratio>0){await fs.mkdir(diffDir,{recursive:true});await fs.writeFile(path.join(diffDir,name+'.actual.png'),shot);if(r.diffPng)await fs.writeFile(path.join(diffDir,name+'.diff.png'),Buffer.from(r.diffPng,'base64'))}
      if(r.ratio>MAX_DIFF)failures.push(`${name} : ${(r.ratio*100).toFixed(2)} % de pixels différents${r.reason?' ('+r.reason+')':''}, voir artifacts/visual-baseline/${name}.diff.png`)}}
   }catch(e){row.error=e.message.split('\n')[0];failures.push(`${name} : ${row.error}`)}
   row.pageErrors=errors.slice(before);row.ms=Date.now()-t0;cases.push(row);
   console.log(`${failures.some(f=>f.startsWith(name+' '))?'ÉCHEC':'ok   '} ${name.padEnd(52)} ${row.diffRatio===undefined?'':('diff '+(row.diffRatio*100).toFixed(3)+' %').padEnd(14)} axe ${(row.axe||[]).map(v=>v.id+'×'+v.count).join(', ')||'0'}  ${(row.ms/1000).toFixed(1)} s`);
  }
  await ctx.close();
 }
 await cmpCtx.close();
}finally{await browser.close()}

if(update){
 // Les cas non relancés (--only) gardent leurs entrées ; les autres sont remplacés par ce qui vient d'être trouvé.
 const kept=knownDoc.violations.filter(v=>!ran.has([v.route,v.width,v.ambiance,v.theme].join('|')));
 const violations=[...kept,...found].sort((a,b)=>keyOf(a).localeCompare(keyOf(b)));
 await fs.writeFile(knownFile,JSON.stringify({note:'Violations axe (wcag2a, wcag2aa) tolérées par scripts/visual-baseline.mjs. Ce sont de vrais défauts à corriger ; une fois corrigés, relancer avec --update.',generatedOn:{platform,browser:browserVersion},violations},null,1)+'\n');
}else{
 // Violations connues qui ont disparu : bonne nouvelle, à retirer de la liste avec --update.
 const seen=new Set(found.map(keyOf)),fixed=knownDoc.violations.filter(v=>ran.has([v.route,v.width,v.ambiance,v.theme].join('|'))&&!seen.has(keyOf(v)));
 if(fixed.length)console.log(`${fixed.length} violation(s) connue(s) disparue(s) : ${fixed.map(v=>`${slug(v.route)}-${v.width}-${v.ambiance}-${v.theme} ${v.rule}`).join(', ')}`);
}
const byRule={};for(const v of found)(byRule[v.rule]??=[]).push(`${slug(v.route)}-${v.width}-${v.ambiance}-${v.theme} (${v.count})`);
const summary={mode:update?'update':'check',base,platform,browser:browserVersion,durationMs:Date.now()-started,thresholds:{maxDiffRatio:MAX_DIFF,channelTolerance:TOLERANCE,axeTags:AXE_TAGS},cases:cases.length,failed:failures.length,axeByRule:byRule,failures,results:cases};
await fs.writeFile(path.join(dir,'RESULTS.json'),JSON.stringify(summary,null,1)+'\n');
console.log(`${cases.length} cas en ${((Date.now()-started)/1000).toFixed(1)} s · ${failures.length?failures.length+' échec(s)':'aucun échec'}${update?' · références mises à jour':''}`);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1}
