import fs from 'node:fs';
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
// PostgreSQL course engine: PGlite in a Worker, its WebAssembly files served next to the app (no CDN).
// PGlite's Node-only code paths import Node built-ins; in the browser they are never called, so they resolve to empty modules.
const nodeOnly={name:'node-only',setup(b){b.onResolve({filter:/^(node:)?(fs|path|url|crypto|module|zlib|stream|os|child_process|worker_threads|util)$/},a=>({path:a.path,namespace:'node-only'}));b.onLoad({filter:/.*/,namespace:'node-only'},()=>({contents:'export default {};',loader:'js'}))}};
await build({entryPoints:['lib/postgres/worker.mjs'],outfile:'dist/coding-pg-worker.js',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'inline',plugins:[nodeOnly]});
fs.mkdirSync('dist/runtime/pg',{recursive:true});
const dist='node_modules/@electric-sql/pglite/dist/';
for(const f of ['pglite.wasm','initdb.wasm','pglite.data'])fs.copyFileSync(dist+f,'dist/runtime/pg/'+f);
fs.copyFileSync('node_modules/@electric-sql/pglite/LICENSE','dist/runtime/pg/LICENSE.txt');fs.copyFileSync('lib/postgres/POSTGRESQL-LICENSE.txt','dist/runtime/pg/POSTGRESQL-LICENSE.txt');
fs.copyFileSync('lib/postgres/fixtures.mjs','dist/runtime/pg-fixtures.js');
console.log(JSON.stringify({pgEngineGzipBytes:['dist/coding-pg-worker.js','dist/runtime/pg/pglite.wasm','dist/runtime/pg/initdb.wasm','dist/runtime/pg/pglite.data'].reduce((n,p)=>n+gzipSync(fs.readFileSync(p)).length,0)}));
