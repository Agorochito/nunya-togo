/* Online compile workshop: sends the learner's program, wrapped with its test cases, to the Wandbox service
   (wandbox.org, Japan) in one request, then reads each case back. Nothing else leaves the device. */
import * as cpp from './cpp.mjs';
const send=self.postMessage.bind(self),ENDPOINT='https://wandbox.org/api/compile.json',LANGUAGES={cpp};
const token=()=>[...crypto.getRandomValues(new Uint8Array(12))].map(b=>b.toString(16).padStart(2,'0')).join('');
self.onmessage=async({data})=>{
 send({ready:true});
 const lang=LANGUAGES[data.runtime];
 try{
  if(!lang||typeof data.code!=='string'||!Array.isArray(data.tests))throw Error('Programme ou cas invalide.');
  const cases=lang.casesFor(data.tests,data.grade===true),id=token();
  let body;
  try{body=lang.request(data.code,cases,id)}catch(error){send({done:true,results:cases.map(()=>({output:'',error:'Script',detail:error.message})),constructs_passed:true});return}
  if(self.navigator&&self.navigator.onLine===false)throw Error('Pas de connexion : cet atelier compile ton code en ligne. Les leçons, exemples et questions restent disponibles hors ligne.');
  let response;
  try{response=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),credentials:'omit',referrerPolicy:'no-referrer',signal:AbortSignal.timeout(45000)})}
  catch(error){throw Error(error?.name==='TimeoutError'?'Le service de compilation met trop de temps à répondre. Réessaie dans un instant.':'Le service de compilation est injoignable. Vérifie ta connexion puis réessaie.')}
  if(response.status===429)throw Error('Le service de compilation reçoit trop de demandes depuis ce réseau. Patiente une minute avant de relancer.');
  if(!response.ok)throw Error('Le service de compilation a répondu par une erreur ('+response.status+'). Réessaie plus tard.');
  send({done:true,results:lang.parseResponse(await response.json(),cases,id),constructs_passed:true});
 }catch(error){send({error:error?.message||String(error)})}
};
