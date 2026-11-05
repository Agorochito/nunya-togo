import {describe,it,expect} from 'vitest';import fs from 'node:fs';
const read=(p:string)=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const index=JSON.parse(read('dist/data/decouverte/index.json'));
const lessons=index.lessons.map((l:any)=>JSON.parse(read('dist/data/decouverte/'+l.id+'.json')));
describe('niveau 0 · Découverte du numérique',()=>{
 it('opens 4 modules of 5 ordered lessons',()=>{
  expect(index.modules.map((m:any)=>m.status)).toEqual(['ouvert','ouvert','ouvert','ouvert']);
  expect(index.lessons).toHaveLength(20);
  for(const [i,m] of index.modules.entries())expect(m.lesson_ids).toEqual([1,2,3,4,5].map(n=>`dec-m${i+1}-0${n}`));
  expect(index.estimated_minutes).toBe(lessons.reduce((n:number,l:any)=>n+l.minutes,0));
 });
 it('keeps every lesson short, complete and in draft until reviewed',()=>{
  for(const l of lessons){
   expect(l.words).toBeGreaterThanOrEqual(120);expect(l.words).toBeLessThanOrEqual(300);
   expect(l.minutes).toBeGreaterThanOrEqual(5);expect(l.minutes).toBeLessThanOrEqual(10);
   expect(l.outcomes).toHaveLength(2);expect(l.example.steps_fr.length).toBeGreaterThanOrEqual(3);
   expect(l.reflect.question_fr).toBeTruthy();expect(l.reflect.model_fr).toBeTruthy();
   expect(l.glossary.length).toBeGreaterThan(0);expect(l.status).toBe('brouillon');expect(l.reviewer).toBe(null);
  }
 });
 it('has 4 gradable activities per lesson with valid answers',()=>{
  const ids=new Set<string>();
  for(const l of lessons){
   expect(l.activities).toHaveLength(4);
   for(const a of l.activities){
    expect(a.id.startsWith(l.id+'-a')).toBe(true);expect(ids.has(a.id)).toBe(false);ids.add(a.id);expect(a.explanation_fr).toBeTruthy();
    if(a.type==='qcm'){expect(a.answer).toBeGreaterThanOrEqual(0);expect(a.answer).toBeLessThan(a.options_fr.length);expect(new Set(a.options_fr).size).toBe(a.options_fr.length)}
    else if(a.type==='vraifaux')expect(typeof a.answer).toBe('boolean');
    else if(a.type==='ordre')expect(new Set(a.items_fr).size).toBe(a.items_fr.length);
    else{expect(a.type).toBe('associer');expect(new Set(a.pairs_fr.map((p:string[])=>p[0])).size).toBe(a.pairs_fr.length)}
   }
  }
  // Les quatre formats sont tous utilisés dans le module.
  expect(new Set(lessons.flatMap((l:any)=>l.activities.map((a:any)=>a.type)))).toEqual(new Set(['qcm','vraifaux','ordre','associer']));
 });
 it('replaces the old « ordinateur » and « logique » plans and is searchable',()=>{
  const cat=JSON.parse(read('dist/data/curriculum/index.json')),search=JSON.parse(read('dist/data/curriculum/search.json'));
  expect(cat.plans.map((p:any)=>p.id)).not.toContain('ordinateur');expect(cat.plans.map((p:any)=>p.id)).not.toContain('logique');
  expect(search.some((r:any)=>r.route==='#/apprendre/decouverte')).toBe(true);
  for(const l of lessons)expect(search.some((r:any)=>r.route===`#/apprendre/decouverte/${l.module}/${l.id}`)).toBe(true);
 });
 it('precaches the course, keeps its routes in the bundle and loads its views on demand',()=>{
  const sw=read('dist/sw.js'),bundle=read('dist/runtime/academy.bundle.js'),views=read('dist/runtime/discovery-views.js');
  expect(sw).toContain("'./data/decouverte/index.json'");
  // Les vues sont précachées : le cours reste utilisable hors connexion après une mise à jour.
  expect(sw).toContain("'./runtime/discovery-views.js'");
  expect(read('scripts/build-academy.mjs')).toContain("'discovery-course.js'");
  expect(bundle).toContain('./runtime/discovery-views.js');
  expect(bundle).not.toContain('nunya-decouverte-v1');
  expect(views).toContain('nunya-decouverte-v1');
  expect(views).toMatch(/export\s*\{/);
 });
});
