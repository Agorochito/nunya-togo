import {beforeAll,describe,it,expect} from 'vitest';
import init from 'sql.js';
import {execute,runSqlCase} from '../lib/sql/core.mjs';
import {createFixture} from '../lib/sql/fixtures.mjs';
let SQL;beforeAll(async()=>{SQL=await init()});
const query=(reference_sql,fixture='club',extras={})=>({fixture,mode:'query',reference_sql,...extras});
const mutation=(reference_sql,extras={})=>({fixture:'club',mode:'mutation',reference_sql,...extras});
const pass=(code,test)=>runSqlCase(SQL,code,test).assertions_passed;

describe('real SQLite grading',()=>{
 it('keeps column names for an empty selection and distinguishes empty aggregate results',()=>{
  const db=createFixture(SQL,'vide');try{expect(execute(db,'SELECT nom FROM membres; SELECT COUNT(*) AS n,SUM(age) AS s FROM membres;')).toEqual([{columns:['nom'],values:[]},{columns:['n','s'],values:[[0,null]]}])}finally{db.close()}
 });
 it('accepts equivalent queries but checks aliases, order and data from a different fixture',()=>{
  const test=query('SELECT nom FROM membres ORDER BY id;');
  expect(pass('select nom from membres order by id asc;',test)).toBe(true);
  expect(pass('SELECT nom AS autre FROM membres ORDER BY id;',test)).toBe(false);
  expect(pass('SELECT nom FROM membres ORDER BY id DESC;',test)).toBe(false);
  const canned="SELECT 'Afi' AS nom UNION ALL SELECT 'Kossi' UNION ALL SELECT 'Mina' UNION ALL SELECT 'Lina' UNION ALL SELECT 'Yao';";
  expect(pass(canned,test)).toBe(true);expect(pass(canned,{...test,fixture:'variation'})).toBe(false);
 });
 it('rejects mutations and extra schema objects in a read-only task',()=>{
  const test=query('SELECT nom FROM membres ORDER BY id;');
  expect(pass('UPDATE ateliers SET places=0; SELECT nom FROM membres ORDER BY id;',test)).toBe(false);
  expect(pass('CREATE VIEW fuite AS SELECT * FROM membres; SELECT nom FROM membres ORDER BY id;',test)).toBe(false);
 });
 it('compares every table and accepts equivalent mutation syntax',()=>{
  const test=mutation('UPDATE ateliers SET places=places+1 WHERE id=1;');
  expect(pass('UPDATE ateliers SET places=1+places WHERE 1=id;',test)).toBe(true);
  expect(pass('UPDATE ateliers SET places=places+1;',test)).toBe(false);
  expect(pass('UPDATE ateliers SET places=places+1 WHERE id=1; DELETE FROM inscriptions;',test)).toBe(false);
 });
 it('actually tests CHECK, UNIQUE and valid insertions without retaining probe writes',()=>{
  const schema='CREATE TABLE livres(id INTEGER PRIMARY KEY,titre TEXT NOT NULL UNIQUE,prix INTEGER NOT NULL CHECK(prix>=0));';
  const test={fixture:'vierge',mode:'mutation',reference_sql:schema,probes:[{sql:"INSERT INTO livres VALUES(1,'Livre',-1);",error_includes:'CHECK constraint failed'},{sql:"INSERT INTO livres VALUES(1,'Livre',1); INSERT INTO livres VALUES(2,'Livre',1);",error_includes:'UNIQUE constraint failed'},{sql:"INSERT INTO livres VALUES(1,'Livre',2);",error_includes:null}]};
  expect(pass(schema,test)).toBe(true);
  expect(pass(schema.replace('CHECK(prix>=0)','CHECK(prix>-100)'),test)).toBe(false);
  expect(pass(schema.replace(' UNIQUE',''),test)).toBe(false);
 });
 it('enforces real foreign keys',()=>{
  const test=mutation('SELECT 1;', {probes:[{sql:"INSERT INTO inscriptions VALUES(99,99,1,'attente');",error_includes:'FOREIGN KEY constraint failed'}]});
  expect(pass('SELECT 1;',test)).toBe(true);
 });
 it('requires closed transactions and the temporary result before rollback',()=>{
  const reference='SELECT places FROM ateliers WHERE id=1; BEGIN; UPDATE ateliers SET places=0 WHERE id=1; SELECT places FROM ateliers WHERE id=1; ROLLBACK; SELECT places FROM ateliers WHERE id=1;';
  const test=mutation(reference,{compare_results:'all',transaction:'rollback'});
  expect(pass(reference,test)).toBe(true);expect(pass('',test)).toBe(false);
  const committed=mutation('BEGIN; UPDATE ateliers SET places=0 WHERE id=1; COMMIT;',{transaction:'commit'});
  expect(pass('UPDATE ateliers SET places=0 WHERE id=1; -- BEGIN; COMMIT;',committed)).toBe(false);
  expect(pass('/* début */ begin; UPDATE ateliers SET places=0 WHERE id=1; -- fin\n commit;',committed)).toBe(true);
  expect(pass(reference.replace('ROLLBACK;',''),test)).toBe(false);
 });
 it('returns useful syntax errors and starts every attempt from fresh data',()=>{
  const bad=runSqlCase(SQL,'SELECT introuvable FROM membres;',{},false);expect(bad.error).toBe('SQL');expect(bad.detail).toContain('no such column');
  runSqlCase(SQL,'DELETE FROM membres;',{},false);
  expect(runSqlCase(SQL,'SELECT COUNT(*) AS n FROM membres;',{},false).tables[0].values).toEqual([[5]]);
 });
 it('bounds output rows, columns, cells and the number of statements',()=>{
  for(const [code,fragment]of [['WITH RECURSIVE n(x) AS(VALUES(1) UNION ALL SELECT x+1 FROM n WHERE x<501) SELECT x FROM n;','500 lignes'],['SELECT '+Array.from({length:51},(_,i)=>i+' AS c'+i).join(',')+';','50 colonnes'],["SELECT printf('%17000s','x');",'16 000'],[Array(31).fill('SELECT 1;').join(''),'30 instructions']]){
   expect(runSqlCase(SQL,code,{},false).detail).toContain(fragment);
  }
 });
});
