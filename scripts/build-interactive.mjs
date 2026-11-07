import fs from 'node:fs';import path from 'node:path';import {build} from 'esbuild';import {gzipSync} from 'node:zlib';
const policy="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; frame-src 'none'; object-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'";
const client=await build({entryPoints:['lib/dom/client.mjs'],outfile:'dist/runtime/interactive-client.js',bundle:true,minify:true,format:'esm',platform:'browser',metafile:true,target:'es2022',define:{'process.env.NODE_ENV':'"production"'}});
const bootstrap=await build({entryPoints:['lib/dom/frame.mjs'],bundle:true,minify:true,format:'iife',target:'es2022',metafile:true,write:false});
const react=await build({entryPoints:['lib/dom/react-libs.mjs'],bundle:true,minify:true,format:'iife',target:'es2022',metafile:true,write:false,define:{'process.env.NODE_ENV':'"production"'}});
const script=text=>'<script>'+text.replace(/<\/script/gi,'<\\/script')+'</script>';
for(const kind of ['dom','react']){
 const html='<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="'+policy+'"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Atelier Nunya</title><style>body{font:16px/1.5 system-ui,sans-serif;color:#292524;background:#fff;padding:16px;margin:0}button,input,select,textarea{font:inherit}button{padding:8px 12px;margin:4px;cursor:pointer}input,textarea,select{padding:6px}label{display:block;margin:8px 0}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #84553e;outline-offset:2px}#nunya-runtime-error{white-space:pre-wrap;border:1px solid;padding:12px}li{margin-block:6px}</style>'+(kind==='react'?script(react.outputFiles[0].text):'')+script(bootstrap.outputFiles[0].text)+'</head><body></body></html>';
 fs.writeFileSync('dist/runtime/'+kind+'-frame.html',html);
}
const packages=new Map();for(const file of Object.keys({...client.metafile.inputs,...react.metafile.inputs})){
 if(!file.includes('node_modules/'))continue;let dir=path.dirname(path.resolve(file));while(dir.includes('/node_modules/')){const metadata=path.join(dir,'package.json');if(fs.existsSync(metadata)){packages.set(dir,JSON.parse(fs.readFileSync(metadata)));break}dir=path.dirname(dir)}
}
const notices=['Interactive ateliers Nunya — third-party notices'];for(const [dir,pkg]of packages){notices.push(pkg.name+'@'+pkg.version+' · '+pkg.license);for(const name of fs.readdirSync(dir).filter(x=>/^(license|copying|notice)([. _-]|$)/i.test(x))){const file=path.join(dir,name);if(fs.statSync(file).isFile())notices.push(fs.readFileSync(file,'utf8'))}}
fs.writeFileSync('dist/runtime/interactive-LICENSES.txt',notices.join('\n\n')+'\n');
console.log(JSON.stringify({interactiveClientGzip:gzipSync(fs.readFileSync('dist/runtime/interactive-client.js')).length,domFrameGzip:gzipSync(fs.readFileSync('dist/runtime/dom-frame.html')).length,reactFrameGzip:gzipSync(fs.readFileSync('dist/runtime/react-frame.html')).length}));
