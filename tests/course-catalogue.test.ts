import {describe,it,expect} from 'vitest';
import {domainFilterFromHash,matchesDomain} from '../lib/runtime/course-catalogue.mjs';

const course=(id:string,technology:string)=>({id,technology});

describe('course catalogue domain links',()=>{
 it('reads only recognized landing-domain filters from the hash route',()=>{
  expect(domainFilterFromHash('#/apprendre?domaine=web')).toBe('web');
  expect(domainFilterFromHash('#/apprendre?domaine=data')).toBe('data');
  expect(domainFilterFromHash('#/apprendre?domaine=unknown')).toBe('all');
  expect(domainFilterFromHash('#/apprendre')).toBe('all');
 });

 it('matches the landing domains to the catalogue taxonomy',()=>{
  expect(matchesDomain(course('python-bases','python'),'web')).toBe(true);
  expect(matchesDomain(course('html-bases','html'),'web')).toBe(true);
  expect(matchesDomain(course('sql-bases','sql'),'data')).toBe(true);
  expect(matchesDomain(course('cyber-bases','cyber'),'sec')).toBe(true);
  expect(matchesDomain(course('git-bases','git'),'tools')).toBe(true);
  expect(matchesDomain(course('sql-bases','sql'),'web')).toBe(false);
  expect(matchesDomain(course('sql-bases','sql'),'all')).toBe(true);
 });
});
