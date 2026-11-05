/* Real native fetch/Request/Response through the explicitly local teaching API. */
const send=self.postMessage.bind(self),nativeFetch=self.fetch.bind(self),NativeRequest=self.Request,NativeURL=self.URL,requestURL=Object.getOwnPropertyDescriptor(self.Request.prototype,'url').get,urlOrigin=Object.getOwnPropertyDescriptor(self.URL.prototype,'origin').get,hasPrefix=String.prototype.startsWith,urlPath=Object.getOwnPropertyDescriptor(self.URL.prototype,'pathname').get,origin=self.location.origin;
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const same=(a,b)=>{if(typeof a!==typeof b)return false;if(b===null||typeof b!=='object')return a===b;if(Array.isArray(a)!==Array.isArray(b)||!a||Object.keys(a).length!==Object.keys(b).length)return false;return Object.keys(b).every(k=>Object.hasOwn(a,k)&&same(a[k],b[k]))};
function lock(fetch){for(const key of ['indexedDB','caches','XMLHttpRequest','WebSocket','EventSource','WebTransport','Worker','SharedWorker','BroadcastChannel','importScripts','postMessage','fetch']){let o=self;while(o){try{const d=Object.getOwnPropertyDescriptor(o,key);if(d?.configurable)delete o[key]}catch{}o=Object.getPrototypeOf(o)}try{Object.defineProperty(self,key,{value:key==='fetch'?fetch:undefined,writable:false,configurable:false})}catch{}}}
self.onmessage=async({data})=>{
 let trace=[];
 async function localFetch(resource,options){
  const req=new NativeRequest(resource instanceof NativeRequest?resource:new NativeURL(String(resource),origin+'/').href,{...options,credentials:'omit',redirect:'error',cache:'no-store'}),url=new NativeURL(requestURL.call(req)),path=urlPath.call(url);
  if(urlOrigin.call(url)!==origin||!hasPrefix.call(path,'/api-pedagogique/v1/'))throw TypeError('Cet atelier accepte uniquement l’API pédagogique locale /api-pedagogique/v1/.');
  const entry={method:req.method,path,query:Object.fromEntries(url.searchParams),status:0};
  trace.push(entry);if(trace.length>40)throw RangeError('Limite de 40 requêtes par cas atteinte.');
  try{if(!['GET','HEAD'].includes(req.method))entry.body=(await req.clone().text()).slice(0,2000);const response=await nativeFetch(req);if(response.headers.get('x-nunya-api')!=='locale-v1')throw Error('L’API locale n’est pas prête. Recharge Nunya une fois en ligne.');entry.status=response.status;return response}catch(error){entry.error=error.name;throw error}
 }
 try{
  if(data.apiReady!==true)throw Error('L’API locale doit être confirmée par Nunya avant cet atelier.');
  send({ready:true});lock(localFetch);
  if(typeof data.code!=='string'||data.code.length>12000||!Array.isArray(data.tests))throw Error('Programme ou cas de vérification invalide.');
  const results=[];
  for(const test of data.tests){
   trace=[];let output='',cursor=0;const console={log:(...args)=>{const line=args.map(a=>a===null||typeof a!=='object'?String(a):JSON.stringify(a)).join(' ');if(output.length+line.length>16000)throw RangeError('Console limitée à 16 000 caractères.');output+=line+'\n'}};
   try{
    const input=()=>{if(cursor>=(test.inputs||[]).length)throw RangeError('Le programme demande plus de saisies que prévu.');return String(test.inputs[cursor++])};
    const read=await new AsyncFunction('console','input','fetch',data.code+'\n;return name=>eval(name);')(console,input,localFetch),checks=[];
    for(const assertion of test.calls||[]){if(!/^[A-Za-z_$][\w$]*$/.test(assertion.name))throw Error('Nom de vérification invalide.');const target=read(assertion.name),args=structuredClone(assertion.args||[]),before=structuredClone(args),actual=await(typeof target==='function'?target(...args):target);checks.push({name:assertion.name,passed:same(actual,assertion.expected)&&(!assertion.unchanged_args||same(args,before)),actual:JSON.stringify(actual)?.slice(0,500)||String(actual),expected:JSON.stringify(assertion.expected)})}
    for(const expected of test.http_requests||[]){const passed=trace.some(r=>r.method===expected.method&&r.path===expected.path&&r.status===expected.status&&Object.entries(expected.query||{}).every(([k,v])=>r.query[k]===v));checks.push({name:'Requête '+expected.method+' '+expected.path,passed,actual:trace.map(r=>r.method+' '+r.path+' → '+r.status).join('; '),expected:'statut '+expected.status})}
    results.push({output,checks,requests:trace,assertions_passed:checks.every(c=>c.passed)});
   }catch(error){results.push({output,error:error.name,detail:error.message,requests:trace})}
  }
  send({done:true,results,constructs_passed:true});
 }catch(error){send({error:error.message})}
};
