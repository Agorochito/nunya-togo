/* Grading for PostgreSQL exercises, same contract as lib/sql/core.mjs: the learner's script and a reference
   script run on sister databases built from the same fixture; results and table states are compared, then
   probes check behaviour (constraints, row-level security) as a chosen role and user, inside a rolled-back
   transaction. Engines are PGlite instances; everything here is asynchronous. */
import {BOOTSTRAP,RESET,fixtureSql} from './fixtures.mjs';

const ROLES=['anon','authenticated','service_role'];
const DATE=1082,TIMESTAMP=[1114,1184];
function cell(v,type){
 if(v instanceof Date){const iso=v.toISOString();return type===DATE?iso.slice(0,10):iso.slice(0,19)+'Z'}
 if(typeof v==='bigint')return Number.isSafeInteger(Number(v))?Number(v):String(v);
 if(v!==null&&typeof v==='object')return JSON.stringify(v);
 if(typeof v==='string'&&v.length>16000)throw Error('Une cellule dépasse 16 000 caractères.');
 return v;
}
export async function prepare(db){await db.exec(BOOTSTRAP)}
export async function reset(db,fixture){await db.exec(RESET);const sql=fixtureSql(fixture||'pg-boutique');if(sql)await db.exec(sql)}

export async function execute(db,sql){
 if(typeof sql!=='string'||sql.length>12000)throw Error('Un script SQL est limité à 12 000 caractères.');
 if(!sql.trim())return [];
 const raw=await db.exec(sql,{rowMode:'array'});
 if(raw.length>30)throw Error('Maximum 30 instructions par essai.');
 const results=[];let rows=0,bytes=0;
 for(const r of raw){
  if(!r.fields.length)continue;
  if(r.fields.length>50)throw Error('Maximum 50 colonnes par résultat.');
  rows+=r.rows.length;if(rows>500)throw Error('Le résultat dépasse 500 lignes. Ajoute un filtre ou LIMIT.');
  const values=r.rows.map(row=>row.map((v,i)=>cell(v,r.fields[i].dataTypeID)));bytes+=JSON.stringify(values).length;
  if(bytes>80000)throw Error('Le résultat dépasse 80 Ko.');
  results.push({columns:r.fields.map(f=>f.name),values});
 }
 return results;
}

function same(a,b){
 if(typeof a==='number'&&typeof b==='number')return Math.abs(a-b)<1e-8;
 if(a===null||b===null||typeof a!=='object'||typeof b!=='object')return a===b;
 if(Array.isArray(a)!==Array.isArray(b))return false;const keys=Object.keys(b);
 return Object.keys(a).length===keys.length&&keys.every(k=>Object.hasOwn(a,k)&&same(a[k],b[k]));
}
const q=name=>'"'+String(name).replaceAll('"','""')+'"';
export async function snapshot(db){
 const tables=(await db.query("select c.relname as nom, c.relrowsecurity as rls from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind in ('r', 'p') order by 1")).rows;
 const cols=(await db.query("select table_name, column_name, data_type, is_nullable from information_schema.columns where table_schema = 'public' order by table_name, ordinal_position")).rows;
 const out=[];
 for(const t of tables){
  const r=(await db.exec('select * from public.'+q(t.nom),{rowMode:'array'}))[0];
  const rows=r.rows.map(row=>row.map((v,i)=>cell(v,r.fields[i].dataTypeID))).map(x=>JSON.stringify(x)).sort();
  out.push({nom:t.nom,rls:t.rls,colonnes:cols.filter(c=>c.table_name===t.nom).map(c=>[c.column_name,c.data_type,c.is_nullable]),lignes:rows});
 }
 return out;
}

function identity(as){
 if(!as)return '';
 if(!ROLES.includes(as.role))throw Error('Rôle de test inconnu : '+as.role);
 const uid=as.uid?String(as.uid):'';if(uid&&!/^[0-9a-f-]{36}$/.test(uid))throw Error('Identifiant de test invalide.');
 return `set role ${as.role}; select set_config('request.jwt.claim.sub', '${uid}', false);`;
}
async function restore(db){try{await db.exec('rollback')}catch{}await db.exec("reset role; select set_config('request.jwt.claim.sub', '', false);")}

/* Runs a script with an optional API identity. `open` reports a transaction left open by the script, which
   is then rolled back: like SQLite's grader, an unfinished BEGIN fails instead of being silently discarded. */
async function runAs(db,code,as){
 const who=identity(as);if(who)await db.exec(who);
 try{const rows=await execute(db,code);return {rows,open:db.isInTransaction()}}finally{await restore(db)}
}

async function runProbe(db,probe){
 let error=null,last=null;
 await db.exec('begin');
 try{
  if(probe.as){if(!ROLES.includes(probe.as.role))throw Error('Rôle de test inconnu');await db.exec(`set local role ${probe.as.role}; select set_config('request.jwt.claim.sub', '${probe.as.uid||''}', true);`)}
  const r=await execute(db,probe.sql);last=r.length?r[r.length-1].values:null;
 }catch(e){error=e.message||String(e)}finally{await restore(db)}
 let passed,expected;
 if(probe.error_includes){passed=!!error&&error.includes(probe.error_includes);expected='Refus : '+probe.error_includes}
 else if(probe.expected!==undefined){passed=!error&&same(last,probe.expected);expected=JSON.stringify(probe.expected)}
 else{passed=!error;expected='Instruction acceptée'}
 return {name:probe.description_fr||'Comportement de la base',passed,actual:error?'Refus : '+error:last?JSON.stringify(last).slice(0,1200):'Instruction acceptée',expected};
}

export async function runPgCase(engines,code,test,grade=true){
 const {actual,reference}=engines;
 try{
  await reset(actual,test.fixture);
  const initial=grade?await snapshot(actual):null;let output=[],open=false,error=null;
  try{({rows:output,open}=await runAs(actual,code,test.as))}catch(e){error=e.message||String(e)}
  if(!grade)return {output:'',tables:output,checks:[],assertions_passed:!error,...(error?{error:'SQL',detail:error}:{})};
  if(error)return {output:'',tables:output,error:'SQL',detail:error,checks:[],assertions_passed:false};
  await reset(reference,test.fixture);
  const expected=(await runAs(reference,test.reference_sql,test.as)).rows,mode=test.mode||'query',compare=test.compare_results||(mode==='mutation'?'none':'last'),checks=[];
  if(compare!=='none'){
   const a=compare==='all'?output:output.slice(-1),b=compare==='all'?expected:expected.slice(-1);
   checks.push({name:'Résultat · colonnes, valeurs et ordre',passed:same(a,b),actual:JSON.stringify(a).slice(0,1200),expected:JSON.stringify(b).slice(0,1200)});
  }
  const after=await snapshot(actual),target=mode==='query'?initial:await snapshot(reference);
  checks.push({name:mode==='query'?'Tables initiales conservées':'Tables, colonnes, lignes et sécurité par ligne après le script',passed:same(after,target),actual:'État réel de la base',expected:mode==='query'?'Aucune modification de la base initiale':'Même état que l’objectif'});
  checks.push({name:'Transaction terminée',passed:!open,actual:open?'Transaction encore ouverte : elle a été annulée':'Oui',expected:'COMMIT ou ROLLBACK si une transaction a été ouverte'});
  if(!open)for(const probe of test.probes||[])checks.push(await runProbe(actual,probe));
  return {output:'',tables:output,checks,assertions_passed:checks.every(c=>c.passed)};
 }catch(e){return {output:'',error:'SQL',detail:e.message||String(e),checks:[],assertions_passed:false}}
}
