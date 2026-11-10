import fs from 'node:fs';import assert from 'node:assert/strict';import init from 'sql.js';
import {execute,runSqlCase} from '../lib/sql/core.mjs';import {createFixture} from '../lib/sql/fixtures.mjs';
// Build gate for every SQL course: examples run, solutions pass every case, starters and empty scripts are rejected.
const SQL=await init(),index='dist/data/curriculum/index.json',report={};
const ids=fs.existsSync(index)?JSON.parse(fs.readFileSync(index)).courses.filter(c=>c.runtime==='sql').map(c=>c.id):[];
for(const id of ids){
 const pack=JSON.parse(fs.readFileSync('dist/data/curriculum/'+id+'.json'));let examples=0,cases=0,starters=0;
 for(const l of pack.lessons){
  for(const e of l.examples){const db=createFixture(SQL,e.fixture||'club');try{const tables=execute(db,e.code);if(e.expected_result)assert.deepEqual(Array.isArray(e.expected_result)?tables:tables.at(-1),e.expected_result,l.id+' example');examples++}finally{db.close()}}
  for(const e of l.exercises){const tests=[...e.visible_tests,...e.hidden_tests];assert(tests.length>=2,e.id+' requires another case');
   for(const t of tests){const actual=runSqlCase(SQL,e.solution,t);assert(actual.assertions_passed,e.id+' '+JSON.stringify(actual));cases++}
   assert(!tests.every(t=>runSqlCase(SQL,e.starter_code,t).assertions_passed),e.id+' starter already solved');
   assert(!tests.every(t=>runSqlCase(SQL,'',t).assertions_passed),e.id+' empty code passes');starters++;
  }
 }
 report[id]={sqlExamples:examples,sqlReferenceCases:cases,solutionsAccepted:starters,startersAndEmptyScriptsRejected:starters};
}
if(ids.length)console.log(JSON.stringify(report));
