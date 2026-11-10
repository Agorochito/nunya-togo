/* Node.js 20 through a Wandbox-compatible service (node prog.js). The learner's program runs in a fresh vm context
   per case, named eleve.js so error lines are the learner's own; check expressions then run in the same context
   (awaited when they return a promise). nunyaRequete(serveur, chemin, options) starts a learner's http server
   on a free local port, sends one request and stops it: servers are tested without the learner calling listen(). */
export const MAX_CODE=12000,MAX_OUTPUT=16000,TIME_LIMIT=5,WAIT_MS=60000;

/* Same length as the code, with comments, strings and template literals blanked (line breaks kept). */
export function blank(code){
 return String(code).replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g,m=>m.replace(/[^\n]/g,' '));
}

export function checkCode(code){
 if(typeof code!=='string'||!code.trim())throw Error('Écris d’abord un programme.');
 if(code.length>MAX_CODE)throw Error('Programme trop long pour cet atelier.');
 if(/\bprocess\s*\.\s*(exit|kill|abort)\s*\(/.test(blank(code)))throw Error('Termine ton programme sans process.exit() : les vérifications doivent pouvoir continuer.');
}

export function buildNode(code,cases,token){
 checkCode(code);
 const mark=s=>JSON.stringify('\n<<<NUNYA-'+token+'-'+s+'>>>\n');
 return `const nunyaVm=require('vm'),nunyaUtil=require('util'),nunyaConsole=require('console');
const NUNYA_SRC=${JSON.stringify(code)},NUNYA_CASES=${JSON.stringify(cases.map(c=>({input:c.input||'',expressions:(c.expressions||[]).map(e=>e.expr)})))};
const nunyaWrite=s=>process.stdout.write(s);
function nunyaDescribe(e){const stack=String(e&&e.stack||''),m=/eleve\\.js:(\\d+)/.exec(stack),name=e&&e.code==='ERR_SCRIPT_EXECUTION_TIMEOUT'?'TimeoutError':(e&&e.name)||'Error';return name+'|'+(m?m[1]:0)+'|'+String(e&&e.message!==undefined?e.message:e).replace(/\\n/g,' ')}
function nunyaShow(v){return v===undefined?'undefined':typeof v==='string'?v:typeof v==='bigint'?String(v):JSON.stringify(v)}
function nunyaLimit(p){let t;return Promise.race([p,new Promise((_,ko)=>{t=setTimeout(()=>{const e=new Error('délai dépassé');e.code='ERR_SCRIPT_EXECUTION_TIMEOUT';ko(e)},${TIME_LIMIT*1000})})]).finally(()=>clearTimeout(t))}
function nunyaRequete(serveur,chemin,options){return new Promise((ok,ko)=>{const go=async()=>{try{const r=await fetch('http://127.0.0.1:'+serveur.address().port+(chemin||'/'),options);ok({statut:r.status,type:(r.headers.get('content-type')||'').split(';')[0],corps:await r.text()})}catch(e){ko(e)}finally{serveur.close();if(serveur.closeAllConnections)serveur.closeAllConnections()}};serveur.once('error',ko);if(serveur.listening)go();else serveur.listen(0,'127.0.0.1',go)})}
process.on('unhandledRejection',e=>process.stderr.write('Erreur non attrapée : '+nunyaDescribe(e)+'\\n'));process.on('uncaughtException',e=>process.stderr.write('Erreur non attrapée : '+nunyaDescribe(e)+'\\n'));
const nunyaTick=()=>new Promise(r=>setTimeout(r,30));
/* Waits until the learner's timers, requests and servers are done (back to the resources open before the run), at most the time limit. */
const nunyaOpen=()=>process.getActiveResourcesInfo().length;
async function nunyaSettle(base){const end=Date.now()+${TIME_LIMIT*1000};do{await new Promise(r=>setTimeout(r,10))}while(nunyaOpen()>base&&Date.now()<end)}
(async()=>{
 for(let i=0;i<NUNYA_CASES.length;i++){
  const c=NUNYA_CASES[i],module={exports:{}};
  const sandbox={console:new nunyaConsole.Console({stdout:process.stdout,stderr:process.stderr}),require,module,exports:module.exports,process,Buffer,URL,URLSearchParams,TextEncoder,TextDecoder,setTimeout,clearTimeout,setInterval,clearInterval,setImmediate,clearImmediate,queueMicrotask,structuredClone,fetch,AbortController,nunyaRequete,nunyaEntree:c.input};
  const ctx=nunyaVm.createContext(sandbox);
  nunyaWrite(${mark('C-')}.replace('C-','C-'+i));
  const nunyaBase=nunyaOpen();
  try{nunyaVm.runInContext(NUNYA_SRC,ctx,{filename:'eleve.js',timeout:${TIME_LIMIT*1000}});await nunyaSettle(nunyaBase)}
  catch(e){await nunyaTick();nunyaWrite(${mark('X-')}.replace('X-','X-'+i)+nunyaDescribe(e));continue}
  for(let j=0;j<c.expressions.length;j++){
   nunyaWrite(${mark('E-')}.replace('E-','E-'+i+'-'+j));
   try{let v=nunyaVm.runInContext(c.expressions[j],ctx,{timeout:${TIME_LIMIT*1000}});if(v&&typeof v.then==='function')v=await nunyaLimit(v);nunyaWrite(nunyaShow(v))}
   catch(e){nunyaWrite('exception '+nunyaDescribe(e))}
  }
 }
 nunyaWrite(${mark('FIN')});
 process.exit(0);
})();
`;
}

export function request(code,cases,token){return {compiler:'nodejs-20.17.0',code:buildNode(code,cases,token),stdin:'',save:false}}

const KNOWN={
 ReferenceError:m=>{const n=/^(.+) is not defined$/.exec(m);return n?'Nom inconnu : '+n[1]+' (variable ou fonction non définie, ou faute de frappe)':'Référence invalide : '+m},
 TypeError:m=>{const f=/^(.+) is not a function$/.exec(m),r=/^Cannot read properties of (undefined|null) \(reading '(.+)'\)$/.exec(m),c=/^Assignment to constant variable\.$/.test(m);
  return f?f[1]+' n’est pas une fonction':r?'Lecture de la propriété « '+r[2]+' » sur '+r[1]+' : la valeur attendue n’existe pas':c?'Modification d’une constante : utilise let si la valeur doit changer':'Opération impossible sur ce type : '+m},
 SyntaxError:m=>'Erreur de syntaxe : '+m,
 RangeError:m=>/call stack/.test(m)?'Trop d’appels imbriqués : vérifie le cas d’arrêt de ta fonction récursive':'Valeur hors limites : '+m,
 TimeoutError:()=>'Le programme a dépassé '+TIME_LIMIT+' secondes : vérifie la condition de ta boucle ou la promesse attendue',
};
export function describeFailure(text){
 const [name,line,...rest]=String(text).split('|'),message=rest.join('|'),known=KNOWN[name];
 return {error:name,detail:(known?known(message):name+(message?' : '+message:''))+(+line?' (ligne '+line+')':'')+'.'};
}

/* Turns a Wandbox-shaped response into one result per case, in the format of the other workers. */
export function parseResponse(response,cases,token){
 const out=String(response.program_output||''),finished=out.includes('<<<NUNYA-'+token+'-FIN>>>');
 const marker=new RegExp('\\n<<<NUNYA-'+token+'-(C-(\\d+)|X-(\\d+)|E-(\\d+)-(\\d+)|FIN)>>>\\n','g'),parts=[];let m,last=null;
 while((m=marker.exec(out))){if(last)parts.push({...last,text:out.slice(last.end,m.index)});last={kind:m[1].split('-')[0],i:+(m[2]??m[3]??m[4]),j:+m[5],end:marker.lastIndex}}
 if(last&&last.kind!=='FIN')parts.push({...last,text:out.slice(last.end)});
 const get=(kind,i,j)=>parts.find(p=>p.kind===kind&&p.i===i&&(j===undefined||p.j===j));
 const lastStarted=Math.max(-1,...parts.filter(p=>p.kind==='C').map(p=>p.i));
 return cases.map((c,i)=>{
  const run=get('C',i);
  if(!run)return {output:'',error:'NotRun',detail:'Ce cas n’a pas pu s’exécuter : le programme s’est arrêté pendant un cas précédent.'};
  const output=run.text;
  if(output.length>MAX_OUTPUT)return {output:output.slice(0,MAX_OUTPUT),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  const failure=get('X',i);
  if(failure)return {output,...describeFailure(failure.text)};
  if(!finished&&i===lastStarted){const err=String(response.program_error||'').trim().split('\n').find(l=>/Error|error/.test(l))||'';return {output,error:'RuntimeError',detail:err?'Le programme s’est arrêté : '+err.slice(0,300):'Le programme s’est arrêté avant la fin de ce cas.'}}
  const checks=(c.expressions||[]).map((e,j)=>{const got=get('E',i,j),raw=got?got.text:'(non évalué)',actual=raw.startsWith('exception ')?'Erreur : '+describeFailure(raw.slice(10)).detail:raw;return {name:e.label||e.expr,passed:!!got&&raw===String(e.expected),actual,expected:String(e.expected)}});
  return {output,checks,assertions_passed:checks.every(x=>x.passed)};
 });
}

/* Test cases of an exercise → harness cases. A free run keeps no checks. */
export function casesFor(tests,grade){return tests.map(t=>({input:(t.inputs||[]).map(String).join('\n'),expressions:grade?(t.expressions||[]):[]}))}
