import fs from 'node:fs';import assert from 'node:assert/strict';import {PGlite} from '@electric-sql/pglite';
import {execute,prepare,reset,runPgCase} from '../lib/postgres/core.mjs';
// Build gate for PostgreSQL courses (real PostgreSQL through PGlite): examples run, solutions pass every case,
// starters and empty scripts are rejected. Same contract as test-sql-code.mjs.
const index='dist/data/curriculum/index.json',report={};
const ids=fs.existsSync(index)?JSON.parse(fs.readFileSync(index)).courses.filter(c=>c.runtime==='sql'&&c.engine==='postgres').map(c=>c.id):[];
if(ids.length){
 const make=async()=>{const db=await PGlite.create();await prepare(db);return db};
 const engines={actual:await make(),reference:await make()};
 for(const id of ids){
  const pack=JSON.parse(fs.readFileSync('dist/data/curriculum/'+id+'.json'));let examples=0,cases=0,solutions=0;
  for(const l of pack.lessons){
   for(const e of l.examples){await reset(engines.actual,e.fixture||'pg-boutique');let tables;try{tables=await execute(engines.actual,e.code)}catch(err){assert.fail(l.id+' example: '+err.message)}if(e.expected_result)assert.deepEqual(Array.isArray(e.expected_result)?tables:tables.at(-1),e.expected_result,l.id+' example');examples++}
   for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests];assert(tests.length>=2,e.id+' requires another case');
    for(const t of tests){const r=await runPgCase(engines,e.solution,t);assert(r.assertions_passed,e.id+' '+JSON.stringify(r).slice(0,1500));cases++}
    let starterAll=true,emptyAll=true;for(const t of tests){if(!(await runPgCase(engines,e.starter_code,t)).assertions_passed)starterAll=false;if(!(await runPgCase(engines,'',t)).assertions_passed)emptyAll=false}
    assert(!starterAll,e.id+' starter already solved');assert(!emptyAll,e.id+' empty code passes');solutions++;
   }
  }
  report[id]={pgExamples:examples,pgReferenceCases:cases,solutionsAccepted:solutions,startersAndEmptyScriptsRejected:solutions};
 }
 await engines.actual.close();await engines.reference.close();
 console.log(JSON.stringify(report));
}
