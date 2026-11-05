/* Opaque sandbox preview. Only this fixed checker script runs; learner HTML/CSS cannot run scripts. */
function previewDocument({code,language,fixture_html,checks,focus_selector,token}){
 const parser=new DOMParser(),doc=parser.parseFromString(language==='css'?fixture_html||'<main><p>Aperçu de la feuille de style.</p></main>':code,'text/html');
 for(const node of doc.querySelectorAll('script,iframe,frame,object,embed,base,link,meta[http-equiv]'))node.remove();
 for(const node of doc.querySelectorAll('*'))for(const attr of [...node.attributes])if(/^on/i.test(attr.name)||attr.name==='srcdoc')node.removeAttribute(attr.name);
 const nonce=crypto.randomUUID().replaceAll('-',''),csp=doc.createElement('meta');csp.httpEquiv='Content-Security-Policy';csp.content="default-src 'none'; script-src 'nonce-"+nonce+"'; style-src 'unsafe-inline'; img-src data:; font-src 'none'; connect-src 'none'; form-action 'none'; base-uri 'none'";doc.head.prepend(csp);
 if(language==='css'){const style=doc.createElement('style');style.textContent=code.replace(/<\/style/gi,'');doc.head.append(style)}
 const script=doc.createElement('script');script.setAttribute('nonce',nonce);const config=JSON.stringify({checks,focus_selector,token}).replaceAll('<','\\u003c');const data=doc.createElement('script');data.type='application/json';data.id='nunya-web-config';data.textContent=config;doc.body.append(data);script.src=new URL('./runtime/web-frame-checker.js',document.baseURI).href;script.referrerPolicy='no-referrer';doc.body.append(script);
 return '<!doctype html>\n'+doc.documentElement.outerHTML;
}
export async function checkWeb({code,language,exercise,grade=true,host,signal}){
 const tests=grade?[...exercise.visible_tests,...exercise.hidden_tests]:[{description_fr:'Aperçu',checks:[]}],results=[];
 for(const test of tests){if(signal?.aborted)throw new DOMException('Arrêté','AbortError');const token=crypto.randomUUID(),frame=document.createElement('iframe');frame.title='Aperçu '+language+' · '+(test.description_fr||'exercice');frame.sandbox='allow-scripts';frame.referrerPolicy='no-referrer';frame.width=String(test.viewport?.width||720);frame.height=String(test.viewport?.height||300);frame.style.cssText='display:block;box-sizing:content-box;border:1px solid var(--line);max-width:100%;background:white;';
  // Keep the real test viewport width even on a narrow phone. The host scrolls, the document does not.
  if(test.viewport)frame.style.maxWidth='none';host.replaceChildren(frame);host.style.overflow='auto';
  const result=await new Promise((resolve,reject)=>{let timer;const cleanup=()=>{clearTimeout(timer);window.removeEventListener('message',message);signal?.removeEventListener('abort',abort)};const abort=()=>{cleanup();frame.remove();reject(new DOMException('Arrêté','AbortError'))};const message=event=>{if(event.source!==frame.contentWindow||event.data?.token!==token||event.data?.nunyaWebCheck!==true)return;cleanup();resolve(event.data.checks)};window.addEventListener('message',message);signal?.addEventListener('abort',abort,{once:true});timer=setTimeout(()=>{cleanup();frame.remove();reject(Error('L’aperçu ne répond pas. Réessaie.'))},5000);frame.srcdoc=previewDocument({code,language,fixture_html:exercise.fixture_html,checks:test.checks,focus_selector:test.focus_selector,token})});
  results.push({description_fr:test.description_fr,checks:result,passed:result.every(c=>c.passed)});
 }
 return {passed:results.every(r=>r.passed),results};
}
