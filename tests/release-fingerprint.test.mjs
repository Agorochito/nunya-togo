import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, beforeEach, describe, expect, it} from 'vitest';
import {createReleaseId, stampRelease} from '../scripts/release-fingerprint.mjs';

describe('createReleaseId',()=>{
 let distDir;
 beforeEach(()=>{distDir=fs.mkdtempSync(path.join(os.tmpdir(),'nunya-release-'));fs.mkdirSync(path.join(distDir,'runtime'));fs.writeFileSync(path.join(distDir,'runtime','app.js'),'old app')});
 afterEach(()=>fs.rmSync(distDir,{recursive:true,force:true}));

 it('is stable for identical build inputs and changes when a cached asset changes',()=>{
  const input={distDir,baseVersion:'5.30.0',html:'<html data-release="__NUNYA_RELEASE__">',sw:"const CACHE='nunya-v__NUNYA_RELEASE__';"};
  const original=createReleaseId(input);
  expect(createReleaseId(input)).toBe(original);
  fs.writeFileSync(path.join(distDir,'runtime','app.js'),'new app');
  expect(createReleaseId(input)).not.toBe(original);
 });

 it('changes when service worker behavior changes',()=>{
  const input={distDir,baseVersion:'5.30.0',html:'<html data-release="__NUNYA_RELEASE__">',sw:"const CACHE='nunya-v__NUNYA_RELEASE__';"};
  const original=createReleaseId(input);
  expect(createReleaseId({...input,sw:input.sw+'self.skipWaiting();'})).not.toBe(original);
 });

 it('stamps matching shell and worker versions reproducibly and changes after shipped content changes',()=>{
  fs.writeFileSync(path.join(distDir,'index.html'),'<html data-release="5.30.0"><script src="./app.js?v=5.30.0"></script>');
  fs.writeFileSync(path.join(distDir,'sw.js'),"const CACHE='nunya-v5.30.0';");
  const first=stampRelease(distDir);
  expect(stampRelease(distDir)).toBe(first);
  expect(fs.readFileSync(path.join(distDir,'index.html'),'utf8')).toContain(`data-release="${first}"`);
  expect(fs.readFileSync(path.join(distDir,'index.html'),'utf8')).toContain(`app.js?v=${first}`);
  expect(fs.readFileSync(path.join(distDir,'sw.js'),'utf8')).toContain(`nunya-v${first}`);
  fs.writeFileSync(path.join(distDir,'runtime','app.js'),'new app');
  expect(stampRelease(distDir)).not.toBe(first);
 });
});
