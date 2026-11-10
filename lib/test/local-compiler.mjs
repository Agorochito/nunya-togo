/* Local stand-in for the Wandbox compile API, used by the build gate and browser tests
   so that the test suite never loads the public service. Same request and response shape. */
import {execFileSync,spawnSync} from 'node:child_process';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';

function findCxx(){for(const c of [process.env.NUNYA_CXX,'g++','clang++'].filter(Boolean)){try{execFileSync(c,['--version'],{stdio:'ignore'});return c}catch{}}return null}
export const cxx=findCxx();

export function compileLocally(req){
 if(!/^gcc-/.test(req.compiler))throw Error('Compilateur local non disponible pour '+req.compiler);
 if(!cxx)throw Error('Aucun compilateur C++ local (g++ ou clang++) n’est installé.');
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'nunya-cpp-'));
 try{
  fs.writeFileSync(path.join(dir,'prog.cc'),req.code);
  const flags=['-std=c++17','-O0','prog.cc','-o','prog'];if(/clang/.test(cxx))flags.unshift('-fno-strict-return');
  const build=spawnSync(cxx,flags,{cwd:dir,encoding:'utf8',timeout:60000});
  if(build.status!==0)return {status:String(build.status??1),signal:'',compiler_error:build.stderr,program_output:'',program_error:''};
  const run=spawnSync(path.join(dir,'prog'),[],{cwd:dir,input:req.stdin||'',encoding:'utf8',timeout:10000,maxBuffer:4*1024*1024});
  return {status:String(run.status??''),signal:run.signal||'',compiler_error:build.stderr,program_output:run.stdout||'',program_error:run.stderr||''};
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
}
