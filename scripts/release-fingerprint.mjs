import {createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export function createReleaseId({distDir,baseVersion,html,sw}){
 if(!/^\d+\.\d+\.\d+$/.test(baseVersion))throw Error(`Invalid release base version: ${baseVersion}`);
 const hash=createHash('sha256');
 const files=[];
 const collect=directory=>{
  for(const entry of fs.readdirSync(directory,{withFileTypes:true}).sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0)){
   const file=path.join(directory,entry.name);
   if(entry.isDirectory())collect(file);
   else if(entry.isFile()&&!['index.html','sw.js'].includes(path.relative(distDir,file).split(path.sep).join('/')))files.push(file);
  }
 };
 collect(distDir);
 for(const file of files)hash.update(path.relative(distDir,file).split(path.sep).join('/')).update('\0').update(fs.readFileSync(file)).update('\0');
 hash.update('index.html\0').update(html).update('\0').update('sw.js\0').update(sw).update('\0');
 return `${baseVersion}-${hash.digest('hex').slice(0,12)}`;
}

export function stampRelease(distDir){
 const htmlPath=path.join(distDir,'index.html'),swPath=path.join(distDir,'sw.js');
 const html=fs.readFileSync(htmlPath,'utf8'),sw=fs.readFileSync(swPath,'utf8');
 const htmlMatch=html.match(/data-release="(\d+\.\d+\.\d+(?:-[a-f0-9]{12})?)"/),swMatch=sw.match(/const CACHE='nunya-v([^']+)'/);
 if(!htmlMatch||!swMatch)throw Error('Could not read the current release from index.html and sw.js');
 const currentRelease=htmlMatch[1];
 if(swMatch[1]!==currentRelease)throw Error(`Release mismatch: index.html=${currentRelease}, sw.js=${swMatch[1]}`);
 const baseVersion=currentRelease.match(/^\d+\.\d+\.\d+/)[0],placeholder='__NUNYA_RELEASE__';
 const htmlTemplate=html.replaceAll(currentRelease,placeholder).replace(/([?&]v=)[^"&]+/g,`$1${placeholder}`);
 const swTemplate=sw.replaceAll(currentRelease,placeholder);
 const release=createReleaseId({distDir,baseVersion,html:htmlTemplate,sw:swTemplate});
 fs.writeFileSync(htmlPath,htmlTemplate.replaceAll(placeholder,release));
 fs.writeFileSync(swPath,swTemplate.replaceAll(placeholder,release));
 return release;
}
