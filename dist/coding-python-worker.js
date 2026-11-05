/* Actual Pyodide execution, fresh worker and namespace for every attempt/case. */
const send=self.postMessage.bind(self);let py;
self.onmessage=async({data})=>{try{
 if(!py){const [{loadPyodide},checks]=await Promise.all([import('./runtime/python/pyodide.mjs'),fetch('./runtime/python-checks.py').then(r=>{if(!r.ok)throw Error('Vérificateur indisponible.');return r.text()})]);py=await loadPyodide({indexURL:new URL('./runtime/python/',self.location.href).href});await py.runPythonAsync(checks)}
 for(const name of ['fetch','XMLHttpRequest','WebSocket','EventSource','WebTransport','indexedDB','caches','Worker','SharedWorker','BroadcastChannel','importScripts']){try{Object.defineProperty(self,name,{value:undefined,writable:false,configurable:false})}catch{}}
 send({ready:true});if(typeof data.code!=='string'||data.code.length>12000)throw Error('Programme trop long.');
 py.globals.set('_nunya_code',data.code);py.globals.set('_nunya_cases_json',JSON.stringify(data.tests));py.globals.set('_nunya_constructs_json',JSON.stringify(data.required_constructs||[]));
 const value=await py.runPythonAsync('json.dumps(nunya_run(_nunya_code, json.loads(_nunya_cases_json), json.loads(_nunya_constructs_json)))');send({done:true,...JSON.parse(value)});
}catch(e){send({error:String(e.message).slice(0,2000)})}};
