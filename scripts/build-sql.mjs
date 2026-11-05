import fs from 'node:fs';
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
await build({entryPoints:['lib/sql/worker.mjs'],outfile:'dist/coding-sql-worker.js',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'inline'});
fs.mkdirSync('dist/runtime/sql',{recursive:true});
fs.copyFileSync('node_modules/sql.js/dist/sql-wasm.wasm','dist/runtime/sql/sql-wasm.wasm');
fs.copyFileSync('node_modules/sql.js/LICENSE','dist/runtime/sql/LICENSE.txt');
fs.copyFileSync('lib/sql/fixtures.mjs','dist/runtime/sql-fixtures.js');
console.log(JSON.stringify({sqlEngineGzipBytes:['dist/coding-sql-worker.js','dist/runtime/sql/sql-wasm.wasm'].reduce((n,p)=>n+gzipSync(fs.readFileSync(p)).length,0)}));
