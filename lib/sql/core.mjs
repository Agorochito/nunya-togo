import {createFixture} from './fixtures.mjs';
const quote=name=>'"'+String(name).replaceAll('"','""')+'"';
function value(v){
 if(v instanceof Uint8Array){if(v.length>2000)throw Error('Résultat binaire trop volumineux.');return Array.from(v)}
 if(typeof v==='string'&&v.length>16000)throw Error('Une cellule dépasse 16 000 caractères.');return v;
}
export function execute(db,sql,onStatement=()=>{}){
 if(typeof sql!=='string'||sql.length>12000)throw Error('Un script SQL est limité à 12 000 caractères.');
 const results=[];let count=0,rows=0,bytes=0;const statements=db.iterateStatements(sql);
 try{for(const stmt of statements){
  if(++count>30)throw Error('Maximum 30 instructions par essai.');
  const columns=stmt.getColumnNames();if(columns.length>50)throw Error('Maximum 50 colonnes par résultat.');
  const result={columns,values:[]};
  while(stmt.step()){
   if(++rows>500)throw Error('Le résultat dépasse 500 lignes. Ajoute un filtre ou LIMIT.');
   const row=stmt.get().map(value);bytes+=JSON.stringify(row).length;
   if(bytes>80000)throw Error('Le résultat dépasse 80 Ko.');if(columns.length)result.values.push(row);
  }
  onStatement(stmt.getSQL().replace(/^(?:\s+|--[^\n]*(?:\n|$)|\/\*[\s\S]*?\*\/)*/, '').match(/^[A-Za-z]+/)?.[0]?.toUpperCase());
  if(columns.length)results.push(result);
 }}finally{statements.return?.()}
 return results;
}
function same(a,b){
 if(typeof a==='number'&&typeof b==='number')return Number.isFinite(a)&&Number.isFinite(b)&&Math.abs(a-b)<1e-8;
 if(a===null||b===null||typeof a!=='object'||typeof b!=='object')return a===b;
 if(Array.isArray(a)!==Array.isArray(b))return false;const keys=Object.keys(b);
 return Object.keys(a).length===keys.length&&keys.every(k=>Object.hasOwn(a,k)&&same(a[k],b[k]));
}
function snapshot(db,exactSchema=false){
 const schema=execute(db,"SELECT type,name,tbl_name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%' ORDER BY type,name;")[0]?.values||[];
 const tables=schema.filter(r=>r[0]==='table').map(([,name])=>{
  const columns=execute(db,'PRAGMA table_info('+quote(name)+')')[0]?.values||[];
  const foreign=(execute(db,'PRAGMA foreign_key_list('+quote(name)+')')[0]?.values||[]).map(r=>r.slice(1)).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const order=columns.map((_,i)=>String(i+1)).join(',');
  return {name,columns:columns.map(r=>[r[0],r[1],String(r[2]).toUpperCase(),r[3],r[4],r[5]]),foreign,rows:execute(db,'SELECT * FROM '+quote(name)+(order?' ORDER BY '+order:'')+';')[0]?.values||[]};
 });return exactSchema?{schema,tables}:tables;
}
function runProbe(db,probe){
 db.run('SAVEPOINT nunya_probe;');let error=null;
 try{execute(db,probe.sql)}catch(e){error=e.message||String(e)}finally{db.run('ROLLBACK TO nunya_probe; RELEASE nunya_probe;')}
 return {name:probe.description_fr||'Contrainte réelle',passed:probe.error_includes?!!error&&error.includes(probe.error_includes):!error,actual:error||'Instruction acceptée',expected:probe.error_includes||'Instruction acceptée'};
}
export function runSqlCase(SQL,code,test,grade=true){
 let actual,reference;
 try{
  actual=createFixture(SQL,test.fixture||'club');
  // This caps SQLite's allocator, not all browser or JavaScript memory. A learner PRAGMA cannot raise it.
  actual.run('PRAGMA hard_heap_limit=16777216;');
  const initial=grade?snapshot(actual,true):null;let output=[],error=null;
  const statements=[];try{output=execute(actual,code,keyword=>statements.push(keyword))}catch(e){error=e.message||String(e)}
  if(!grade)return {output:'',tables:output,checks:[],assertions_passed:!error,...(error?{error:'SQL',detail:error}:{})};
  if(error)return {output:'',tables:output,error:'SQL',detail:error,checks:[],assertions_passed:false};
  reference=createFixture(SQL,test.fixture||'club');
  const expected=execute(reference,test.reference_sql),mode=test.mode||'query',compare=test.compare_results||(mode==='mutation'?'none':'last'),checks=[];
  if(compare!=='none'){
   const a=compare==='all'?output:output.slice(-1),b=compare==='all'?expected:expected.slice(-1);
   checks.push({name:'Résultat · colonnes, valeurs et ordre',passed:same(a,b),actual:JSON.stringify(a).slice(0,1200),expected:JSON.stringify(b).slice(0,1200)});
  }
  checks.push({name:mode==='query'?'Tables initiales conservées':'État de toutes les tables après le script',passed:same(snapshot(actual,mode==='query'),mode==='query'?initial:snapshot(reference)),actual:'État réel de la base',expected:mode==='query'?'Aucune modification de la base initiale':'Même structure et mêmes lignes que l’objectif'});
  if(test.transaction){const begin=statements.indexOf('BEGIN'),end=statements.indexOf(test.transaction.toUpperCase());checks.push({name:'Frontière transactionnelle exécutée',passed:begin>=0&&end>begin,actual:statements.filter(x=>['BEGIN','COMMIT','ROLLBACK'].includes(x)).join(' → ')||'Aucune transaction',expected:'BEGIN → '+test.transaction.toUpperCase()})}
  let closed=true;try{actual.run('BEGIN; ROLLBACK;')}catch{closed=false}
  checks.push({name:'Transaction terminée',passed:closed,actual:closed?'Oui':'Transaction encore ouverte',expected:'COMMIT ou ROLLBACK si une transaction a été ouverte'});
  if(closed){actual.run('PRAGMA foreign_keys=ON; PRAGMA ignore_check_constraints=OFF;');for(const probe of test.probes||[])checks.push(runProbe(actual,probe))}
  return {output:'',tables:output,checks,assertions_passed:checks.every(c=>c.passed)};
 }catch(error){return {output:'',error:'SQL',detail:error.message||String(error),checks:[],assertions_passed:false}}finally{actual?.close();reference?.close()}
}
