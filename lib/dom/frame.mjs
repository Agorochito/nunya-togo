// This fixed runner lives in an opaque-origin sandbox document. The parent never grants same-origin access.
(()=>{
 let started=false,token='',errors=[],logs=[];
 const send=data=>parent.postMessage({nunyaInteractive:true,token,...data},'*');
 const normalize=v=>String(v??'').replace(/\s+/g,' ').trim();
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 function record(error){const text=String(error?.message||error||'Erreur JavaScript').slice(0,1000);errors.push(text);let box=document.getElementById('nunya-runtime-error');if(!box){box=document.createElement('pre');box.id='nunya-runtime-error';box.setAttribute('role','alert');document.body.append(box)}box.textContent='Le programme s’est arrêté : '+text}
 addEventListener('error',event=>{record(event.error||event.message);event.preventDefault()});
 addEventListener('unhandledrejection',event=>{record(event.reason);event.preventDefault()});
 function checkAll(checks){return (checks||[]).map(c=>{let passed=true,actual=[];try{const nodes=[...document.querySelectorAll(c.selector)],node=nodes[0];passed=c.exists===false?nodes.length===0:c.exists===true?nodes.length>0:(c.count===0||Array.isArray(c.texts)&&c.texts.length===0)?true:nodes.length>0;
  if(c.count!==undefined){passed=passed&&nodes.length===c.count;actual.push('nombre='+nodes.length)}
  if(c.text!==undefined){const v=normalize(node?.textContent);passed=passed&&v===normalize(c.text);actual.push(v)}
  if(c.textIncludes!==undefined){const v=normalize(node?.textContent);passed=passed&&v.includes(normalize(c.textIncludes));actual.push(v)}
  if(c.texts!==undefined){const v=nodes.map(n=>normalize(n.textContent));passed=passed&&JSON.stringify(v)===JSON.stringify(c.texts.map(normalize));actual.push(JSON.stringify(v))}
  if(c.value!==undefined){passed=passed&&node?.value===String(c.value);actual.push('valeur='+node?.value)}
  if(c.checked!==undefined){passed=passed&&node?.checked===c.checked;actual.push('coché='+node?.checked)}
  if(c.focused===true){passed=passed&&document.activeElement===node;actual.push(document.activeElement===node?'focus présent':'focus absent')}
  for(const [key,v]of Object.entries(c.attributes||{})){const got=node?.getAttribute(key);passed=passed&&(v===null?got===null:got===String(v));actual.push(key+'='+got)}
  for(const name of c.classes||[]){passed=passed&&!!node?.classList.contains(name);actual.push('classe '+name)}
 }catch(e){passed=false;actual.push(e.message)}return {selector:c.selector,passed,actual:actual.join(' · ')||((c.exists===false?'absence':'présence')+' vérifiée')};})}
 function action(step){const node=document.querySelector(step.selector);if(!node)throw Error('Élément absent pour '+step.action+' : '+step.selector);let event;
  if(step.action==='click')node.click();
  else if(step.action==='input'){const proto=node instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:node instanceof HTMLSelectElement?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(node,String(step.value??''));node.dispatchEvent(new Event('input',{bubbles:true}));node.dispatchEvent(new Event('change',{bubbles:true}))}
  else if(step.action==='submit'){event=new Event('submit',{bubbles:true,cancelable:true});node.dispatchEvent(event)}
  else if(step.action==='keydown')node.dispatchEvent(new KeyboardEvent('keydown',{key:step.key||'',bubbles:true,cancelable:true}));
  else if(step.action==='focus')node.focus();else throw Error('Action inconnue : '+step.action);
  return event?.defaultPrevented;
 }
 // 5.28.2 : n'exécuter le code de l'élève que dans un cadre réellement isolé (origine opaque via la CSP « sandbox »).
 // Une URL encodée (/runtime/dom%2Dframe.html) échappe aux règles d'en-têtes de vercel.json : sans cette garde,
 // la page tournerait alors sur l'origine de Nunya, avec accès à son stockage local.
 const isolated=self.origin==='null'&&parent!==self;
 addEventListener('message',async event=>{
  if(!isolated||started||event.source!==parent||event.data?.nunyaInteractiveInit!==true)return;started=true;const config=event.data;token=config.token;
  try{
   const doc=new DOMParser().parseFromString(config.fixture_html||'<main></main>','text/html');
   for(const node of doc.querySelectorAll('script,iframe,frame,object,embed,base,link,meta'))node.remove();
   for(const node of doc.querySelectorAll('*'))for(const a of [...node.attributes])if(/^on/i.test(a.name)||['srcdoc','src','srcset','action','formaction','href'].includes(a.name))node.removeAttribute(a.name);
   document.body.replaceChildren(...doc.body.childNodes);for(const style of doc.head.querySelectorAll('style'))document.head.append(style);
   for(const key of ['log','warn','error'])console[key]=(...args)=>{if(logs.join('').length<8000)logs.push(args.map(x=>typeof x==='object'?JSON.stringify(x):String(x)).join(' ').slice(0,1000))};
   const lib=globalThis.NunyaReact,reactPrelude=config.runtime==='react'?'const React=globalThis.NunyaReact.React;const {useState,useEffect,useRef}=React;const root=globalThis.NunyaReact.createRoot(document.getElementById("app"));const chargerAteliers=globalThis.nunyaLoadWorkshops;':'';
   const dataRoot=document.getElementById('app');globalThis.nunyaLoadWorkshops=({mode,delai=150}={})=>new Promise((resolve,reject)=>setTimeout(()=>{const selected=mode||dataRoot?.dataset.mode||'succes';if(selected==='erreur')reject(Error('Le catalogue est indisponible.'));else resolve(selected==='vide'?[]:JSON.parse(dataRoot?.dataset.ateliers||'[{"id":"py","titre":"Python"},{"id":"web","titre":"Web"}]'))},Math.max(0,Math.min(200,Number(delai)||0))));
   const script=document.createElement('script');script.textContent='(()=>{"use strict";let __count=0;function '+config.guard+'(){if(++__count>20000)throw Error("Trop de répétitions. Vérifie la boucle ou la récursion.");}'+reactPrelude+'\n'+config.code+'\n})();';
   if(config.runtime==='react'&&!lib)throw Error('La bibliothèque React n’est pas disponible.');
   if(lib)lib.flushSync(()=>document.head.append(script));else document.head.append(script);
   await wait(config.runtime==='react'?60:20);const checks=checkAll(config.checks);
   for(const step of config.steps||[]){if(errors.length)break;let prevented;if(lib)lib.flushSync(()=>{prevented=action(step)});else prevented=action(step);await wait(Math.max(config.runtime==='react'?35:0,Math.min(200,step.wait_ms||0)));if(step.prevented!==undefined)checks.push({selector:step.selector,passed:prevented===step.prevented,actual:'envoi intercepté='+prevented});checks.push(...checkAll(step.checks))}
   if(errors.length)checks.push({selector:'programme',passed:false,actual:errors.join(' · ')});
   send({done:true,checks,console:logs,error:errors.join(' · ')||null});
  }catch(error){record(error);send({done:true,checks:[{selector:'programme',passed:false,actual:errors.join(' · ')}],console:logs,error:errors.join(' · ')})}
 });
 document.addEventListener('click',e=>{if(e.target.closest('a'))e.preventDefault()},true);
})();
