/* Local stand-in for the Wandbox compile API, used by the build gate and browser tests
   so that the test suite never loads the public service. Same request and response shape. */
import {execFileSync,spawnSync} from 'node:child_process';
import fs from 'node:fs';import os from 'node:os';import path from 'node:path';

function findCxx(){for(const c of [process.env.NUNYA_CXX,'g++','clang++'].filter(Boolean)){try{execFileSync(c,['--version'],{stdio:'ignore'});return c}catch{}}return null}
export const cxx=findCxx();

const LINUX=process.platform==='linux';
/* Two attempts: a busy Docker Desktop sometimes answers `docker info` after the first timeout. */
function dockerReady(){for(let i=0;i<2;i++){try{execFileSync('docker',['info','--format','{{.ServerVersion}}'],{stdio:'ignore',timeout:20000});return true}catch{}}return false}
export const bashReady=LINUX||dockerReady();
/* Bash runs natively on Linux (CI). Elsewhere it runs in a Debian container without network, like the Wandbox sandbox. */
function runBash(req){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'nunya-bash-'));
 try{
  fs.writeFileSync(path.join(dir,'prog.sh'),req.code);
  const run=LINUX?spawnSync('bash',['prog.sh'],{cwd:dir,env:{PATH:process.env.PATH,HOME:dir},encoding:'utf8',timeout:120000,maxBuffer:4*1024*1024})
   :spawnSync('docker',['run','--rm','--network','none','-v',dir+':/home/wandbox','-w','/home/wandbox','-e','HOME=/home/wandbox','debian:bookworm-slim','bash','prog.sh'],{encoding:'utf8',timeout:120000,maxBuffer:4*1024*1024});
  return {status:String(run.status??''),signal:run.signal||'',compiler_error:'',program_output:run.stdout||'',program_error:run.stderr||''};
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
}
/* Java: javac prog.java, then the class that declares main (the verification class), like Wandbox.
   Uses a local JDK when javac is on the PATH (CI), else the eclipse-temurin:21-jdk image without network. */
function hasJavac(){try{execFileSync('javac',['-version'],{stdio:'ignore'});return true}catch{return false}}
const nativeJava=hasJavac();
export const javaReady=nativeJava||(!LINUX&&bashReady)||(LINUX&&dockerReady());
const JAVA_SCRIPT='javac -encoding UTF-8 prog.java 2> compile.err; s=$?; if [ $s -ne 0 ]; then echo $s > compile.status; exit 0; fi; '
 +'main=NunyaVerification; [ -f NunyaVerification.class ] || main=Main; java -Xss64m -cp . "$main"';
function runJava(req){
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'nunya-java-'));
 try{
  fs.writeFileSync(path.join(dir,'prog.java'),req.code);
  const run=nativeJava?spawnSync('sh',['-c',JAVA_SCRIPT],{cwd:dir,env:{PATH:process.env.PATH,HOME:dir,LANG:'C',LC_ALL:'C'},encoding:'utf8',timeout:120000,maxBuffer:4*1024*1024})
   :spawnSync('docker',['run','--rm','--network','none','-v',dir+':/home/wandbox','-w','/home/wandbox','-e','LANG=C','-e','LC_ALL=C','eclipse-temurin:21-jdk','sh','-c',JAVA_SCRIPT],{encoding:'utf8',timeout:120000,maxBuffer:4*1024*1024});
  const failed=fs.existsSync(path.join(dir,'compile.status'));
  if(failed)return {status:fs.readFileSync(path.join(dir,'compile.status'),'utf8').trim(),signal:'',compiler_error:fs.readFileSync(path.join(dir,'compile.err'),'utf8'),program_output:'',program_error:''};
  return {status:String(run.status??''),signal:run.signal||'',compiler_error:fs.existsSync(path.join(dir,'compile.err'))?fs.readFileSync(path.join(dir,'compile.err'),'utf8'):'',program_output:run.stdout||'',program_error:run.stderr||''};
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
}
export function compileLocally(req){
 if(/^openjdk-/.test(req.compiler)){if(!javaReady)throw Error('Ni JDK ni Docker : impossible de compiler Java localement.');return runJava(req)}
 if(req.compiler==='bash'){if(!bashReady)throw Error('Ni Linux ni Docker : impossible d’exécuter Bash localement.');return runBash(req)}
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
