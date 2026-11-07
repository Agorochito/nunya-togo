import {compileLearner} from './compile.mjs';
export async function checkInteractive({code,runtime='dom',exercise,grade=true,host,signal}){
 const frameUrl=new URL('./runtime/'+(runtime==='react'?'react-frame.html':'dom-frame.html'),document.baseURI);frameUrl.searchParams.set('engine',new URL(import.meta.url).searchParams.get('engine')||document.documentElement.dataset.release||'5.7.0');
 // CSP sandbox is applied by the HTTP response, after the controlled navigation.
 // An opaque sandbox attribute would bypass service workers and break cold offline use.
 const response=await fetch(frameUrl,{signal});if(!response.ok||!/(?:^|;)\s*sandbox\s+allow-scripts\s*(?:;|$)/.test(response.headers.get('Content-Security-Policy')||''))throw Error('L’atelier isolé doit être mis à jour. Reconnecte-toi puis enregistre ce cours.');
 const compiled=compileLearner(code,runtime),tests=grade?[...exercise.visible_tests,...exercise.hidden_tests]:[{description_fr:'Ton interface · essaie ses commandes',checks:[]}],results=[];
 for(const test of tests){
  if(signal?.aborted)throw new DOMException('Arrêté','AbortError');
  if((test.steps?.length||0)>30)throw Error('Maximum 30 interactions par cas.');
  const token=crypto.randomUUID(),frame=document.createElement('iframe');frame.title=(runtime==='react'?'Application React':'Interface JavaScript')+' · '+test.description_fr;frame.referrerPolicy='no-referrer';frame.style.cssText='width:100%;height:360px;box-sizing:border-box;border:1px solid var(--border);background:white;';host.replaceChildren(frame);
  const result=await new Promise((resolve,reject)=>{
   let timer;const clean=()=>{clearTimeout(timer);window.removeEventListener('message',message);signal?.removeEventListener('abort',abort)};
   const abort=()=>{clean();frame.remove();reject(new DOMException('Arrêté','AbortError'))};
   const message=e=>{if(e.source!==frame.contentWindow||e.data?.nunyaInteractive!==true||e.data.token!==token)return;clean();resolve(e.data)};
   window.addEventListener('message',message);signal?.addEventListener('abort',abort,{once:true});timer=setTimeout(()=>{clean();frame.remove();reject(Error('L’interface ne répond pas. Arrête et vérifie les répétitions.'))},6000);
   frame.onload=()=>frame.contentWindow.postMessage({nunyaInteractiveInit:true,token,runtime,...compiled,fixture_html:test.fixture_html??exercise.fixture_html,checks:test.checks||[],steps:test.steps||[]},'*');
   frame.src=frameUrl;
  });
  results.push({description_fr:test.description_fr,checks:result.checks,console:result.console,error:result.error,passed:!result.error&&result.checks.every(c=>c.passed)});
 }
 return {passed:results.every(r=>r.passed),results};
}
