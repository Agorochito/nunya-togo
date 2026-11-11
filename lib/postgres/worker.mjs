/* Real PostgreSQL (PGlite, WebAssembly) in a Worker: no server, works offline once the course is saved.
   Two sister databases per run: the learner's and the reference. Same messages as the SQLite worker. */
import {PGlite} from '@electric-sql/pglite';
import {prepare,runPgCase} from './core.mjs';
const send=self.postMessage.bind(self);let engines;
async function start(){
 const file=name=>fetch(new URL('./runtime/pg/'+name,self.location.href)).then(r=>{if(!r.ok)throw Error(name+' introuvable');return r});
 const [wasm,initdb,bundle]=await Promise.all([file('pglite.wasm').then(r=>r.arrayBuffer()).then(b=>WebAssembly.compile(b)),file('initdb.wasm').then(r=>r.arrayBuffer()).then(b=>WebAssembly.compile(b)),file('pglite.data').then(r=>r.blob())]);
 const make=async()=>{const db=await PGlite.create({pgliteWasmModule:wasm,initdbWasmModule:initdb,fsBundle:bundle});await prepare(db);return db};
 const actual=await make(),reference=await make();return {actual,reference};
}
self.onmessage=async({data})=>{try{engines||=start();const e=await engines;send({ready:true});if(typeof data.code!=='string'||data.code.length>12000||!Array.isArray(data.tests))throw Error('Script ou cas SQL invalide.');const results=[];for(const test of data.tests)results.push(await runPgCase(e,data.code,test,data.grade===true));send({done:true,results,constructs_passed:true})}catch(error){send({error:'Le moteur PostgreSQL ne peut pas démarrer : '+(error.message||error)})}};
