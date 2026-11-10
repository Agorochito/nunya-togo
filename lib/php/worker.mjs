/* Real PHP 8.3 interpreter (php-wasm, Apache-2.0) in a dedicated Worker. No server, no network after start. */
import {PhpBase} from 'php-wasm/PhpBase';
import {createRunner} from './core.mjs';
const send=self.postMessage.bind(self);
// The published web build targets a page: it names window and document while it loads, without using them to run a script.
// A Worker has neither, so inert stand-ins are provided; no page, canvas or event is reachable from here.
self.window??=self;
self.document??={body:null,documentElement:null,addEventListener(){},removeEventListener(){},getElementById:()=>null,querySelector:()=>null};
self.screen??={};
function lockLearnerApis(){for(const key of ['indexedDB','caches','fetch','XMLHttpRequest','WebSocket','EventSource','WebTransport','Worker','SharedWorker','BroadcastChannel','importScripts','postMessage']){let o=self;while(o){try{const d=Object.getOwnPropertyDescriptor(o,key);if(d?.configurable)delete o[key]}catch{}o=Object.getPrototypeOf(o)}try{Object.defineProperty(self,key,{value:undefined,writable:false,configurable:false})}catch{}}}
let engine;
async function start(){
 const php=new PhpBase(import('php-wasm/php8.3-web.mjs'),{version:'8.3',autoTransaction:false,locateFile:path=>path.endsWith('.wasm')?new URL('./runtime/php/php8.3.wasm',self.location.href).href:undefined});
 await php.binary;
 const run=createRunner(php);
 // Compile and reset once before removing network and storage access from the learner's script.
 await run('<?php');
 lockLearnerApis();
 return run;
}
self.onmessage=async({data})=>{
 let run;
 try{engine||=start();run=await engine}catch(error){send({error:'Le moteur PHP ne peut pas démarrer : '+(error?.message||error)});return}
 send({ready:true});
 try{
  if(typeof data.code!=='string'||!Array.isArray(data.tests))throw Error('Programme ou cas PHP invalide.');
  const results=[];
  for(const test of data.tests)results.push(await run(data.code,test));
  send({done:true,results,constructs_passed:true});
 }catch(error){send({error:error?.message||String(error)})}
};
