import {PGlite} from '@electric-sql/pglite';
import {execute,prepare,reset,runPgCase} from '../lib/postgres/core.mjs';
import {USERS,fixtureSql,pgPreview} from '../lib/postgres/fixtures.mjs';

let engines;
beforeAll(async()=>{const [actual,reference]=await Promise.all([PGlite.create(),PGlite.create()]);await prepare(actual);await prepare(reference);engines={actual,reference}},60000);
afterAll(async()=>{await engines?.actual.close();await engines?.reference.close()});

const rls='alter table commandes enable row level security; create policy mes_commandes on commandes for select to authenticated using (client_id = auth.uid());';
const asAfi={role:'authenticated',uid:USERS.afi};
const mutation={fixture:'pg-boutique',mode:'mutation',reference_sql:rls,probes:[
 {sql:'select id from commandes order by id',as:asAfi,expected:[[1],[3]],description_fr:'Afi voit ses commandes.'},
 {sql:'select count(*)::int from commandes',as:{role:'anon'},expected:[[0]],description_fr:'Un visiteur ne voit rien.'}]};

describe('PostgreSQL workshop (PGlite)',()=>{
 it('builds the shop fixture with Supabase-like roles and identities past the inserted rows',async()=>{
  await reset(engines.actual,'pg-boutique');
  const [r]=await execute(engines.actual,"insert into produits (nom, prix) values ('Mangue', 300) returning id");
  expect(r.values).toEqual([[5]]);
  expect(pgPreview('pg-boutique').map(t=>t.name)).toEqual(['profils','produits','commandes']);
  expect(fixtureSql('pg-vierge')).toBe('');
 },30000);
 it('accepts a correct row-level security policy and checks it under several identities',async()=>{
  const res=await runPgCase(engines,rls,mutation);
  expect(res.checks.map(c=>c.passed)).toEqual([true,true,true,true]);
  expect(res.assertions_passed).toBe(true);
 },30000);
 it('rejects a policy that lets every signed-in user read every order',async()=>{
  const res=await runPgCase(engines,rls.replace('client_id = auth.uid()','auth.uid() is not null'),mutation);
  expect(res.assertions_passed).toBe(false);
  expect(res.checks.find(c=>c.name==='Afi voit ses commandes.').actual).toBe('[[1],[2],[3]]');
 },30000);
 it('fails a script that leaves a transaction open instead of discarding it silently',async()=>{
  const res=await runPgCase(engines,'begin; '+rls,mutation);
  const check=res.checks.find(c=>c.name==='Transaction terminée');
  expect(check.passed).toBe(false);
  expect(res.assertions_passed).toBe(false);
  expect(res.checks.some(c=>c.name==='Afi voit ses commandes.')).toBe(false);
 },30000);
 it('runs a query as an API role and reports SQL errors in the learner result',async()=>{
  const query={fixture:'pg-boutique',as:{role:'anon'},reference_sql:'select nom from produits where stock > 0 order by nom;'};
  expect((await runPgCase(engines,'select nom from produits where stock > 0 order by nom;',query)).assertions_passed).toBe(true);
  const broken=await runPgCase(engines,'select nom from produit;',query);
  expect(broken.error).toBe('SQL');
  expect(broken.detail).toContain('does not exist');
 },30000);
 it('bounds learner scripts',async()=>{
  await reset(engines.actual,'pg-boutique');
  await expect(execute(engines.actual,'select 1;'.repeat(31))).rejects.toThrow('30 instructions');
  await expect(execute(engines.actual,'select generate_series(1, 501)')).rejects.toThrow('500 lignes');
 },30000);
});
