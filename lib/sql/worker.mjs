import initSqlJs from 'sql.js';
import {runSqlCase} from './core.mjs';
const send=self.postMessage.bind(self);let engine;
self.onmessage=async({data})=>{try{engine||=initSqlJs({locateFile:()=>new URL('./runtime/sql/sql-wasm.wasm',self.location.href).href});const SQL=await engine;send({ready:true});if(typeof data.code!=='string'||data.code.length>12000||!Array.isArray(data.tests))throw Error('Script ou cas SQL invalide.');const results=data.tests.map(test=>runSqlCase(SQL,data.code,test,data.grade===true));send({done:true,results,constructs_passed:true})}catch(error){send({error:'Le moteur SQL ne peut pas démarrer : '+error.message})}};
