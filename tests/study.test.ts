import {describe,it,expect} from 'vitest';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('../dist/',import.meta.url);
const json=(p:string)=>JSON.parse(readFileSync(new URL(p,root),'utf8'));
const context:any={};vm.createContext(context);
vm.runInContext(readFileSync(new URL('learning-core.js',root),'utf8')+';globalThis.api={decodeStudyCatalog,matchLearningGuide,studyResourceUrls,studyQuestionResult};',context);
const api=context.api,guides=json('data/learning_guides.json');
describe('resource study workspace',()=>{
 it('keeps every real title and direct-load payload when compacting the catalogue',()=>{
  const original=json('library/index.json'),compact=api.decodeStudyCatalog(json('library/catalog-v2.json'));
  expect(compact).toHaveLength(original.length);
  for(let i=0;i<original.length;i++){const a=original[i],b=compact[i];expect([b.id,b.title,b.s,b.c,b.u,b.f]).toEqual([a.id,a.title,a.s,a.c,a.u,a.f]);const payload=json('library/resources/'+b.id+'.json');expect(payload.resource.id).toBe(b.id);expect(payload.resource.url).toMatch(/^https:\/\//);if(b.f==='article')expect(existsSync(new URL('library/articles/'+b.id+'.json',root))).toBe(true)}
 });
 it('matches concepts by subject and whole words rather than confusing mole and molecule',()=>{
  const match=(title:string,s:string)=>api.matchLearningGuide({title,s,u:''},guides);
  expect(match('Moles et nombre d’Avogadro','chemistry')?.id).toBe('moles');
  expect(match('Une molécule et ses liaisons','chemistry')?.id).not.toBe('moles');
  expect(match('ADN et information génétique','biology')?.id).toBe('dna');
  expect(match('ADN et information génétique','maths')).toBe(null);
  expect(match('Un sujet sans fiche de notion associée','maths')).toBe(null);
 });
 it('offers valid original corrected questions without treating an invalid selection as an answer',()=>{
  for(const g of guides){expect(g.body.length).toBeGreaterThan(80);expect(g.steps).toHaveLength(3);for(const q of g.questions){expect(q.explanation.length).toBeGreaterThan(15);expect(api.studyQuestionResult(q,q.answer)?.correct).toBe(true);expect(api.studyQuestionResult(q,(q.answer+1)%q.options.length)?.correct).toBe(false);expect(api.studyQuestionResult(q,-1)).toBe(null)}}
 });
 it('rejects traversal and external URL resource identifiers',()=>{for(const id of ['../../secret','https://example.com','ka-short'])expect(()=>api.studyResourceUrls(id)).toThrow()});
});
describe('whole-theme palette',()=>{
 it('changes neutral surfaces with the accent in both modes and keeps text legible',()=>{
  const s=readFileSync(new URL('personalization.js',root),'utf8'),c:any={};vm.createContext(c);vm.runInContext(s.slice(s.indexOf('function validAccent'),s.indexOf('function applyAccent'))+';globalThis.api={themePalette,contrastAccent};',c);
  for(const dark of [false,true]){const brown=c.api.themePalette('#9a6544',dark),blue=c.api.themePalette('#356d9e',dark);expect(brown.bg).not.toBe(blue.bg);expect(brown.surface).not.toBe(blue.surface);for(const color of ['#9a6544','#356d9e','#ffffff','#000000','#00ff00']){const p=c.api.themePalette(color,dark);for(const bg of [p.bg,p.surface,p.raised]){expect(c.api.contrastAccent(p.ink,bg)).toBeGreaterThan(7);expect(c.api.contrastAccent(p.muted,bg)).toBeGreaterThan(4.5)}}}
 });
});
