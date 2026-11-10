import fs from 'node:fs';
import {build} from 'esbuild';
import {gzipSync} from 'node:zlib';
const pkg='node_modules/php-wasm/',glue=fs.readFileSync(pkg+'php8.3-web.mjs','utf8'),names=[...new Set(glue.match(/[0-9a-f]{40}\.wasm/g))];
if(names.length!==1)throw Error('Le paquet php-wasm ne désigne plus un seul binaire PHP 8.3.');
// The glue keeps a second `new URL(wasm, import.meta.url)`; without a loader esbuild leaves it as plain text and locateFile decides.
await build({entryPoints:['lib/php/worker.mjs'],outfile:'dist/coding-php-worker.js',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'inline',external:['node:*','module','fs','path','url','crypto','worker_threads']});
fs.mkdirSync('dist/runtime/php',{recursive:true});
fs.copyFileSync(pkg+names[0],'dist/runtime/php/php8.3.wasm');
fs.writeFileSync('dist/runtime/php/LICENSE.txt',['php-wasm '+JSON.parse(fs.readFileSync(pkg+'package.json')).version+' — utilisé sous licence Apache-2.0 (double licence Apache-2.0 ou GPL-2.0).','Interpréteur PHP 8.3 : PHP License v3.01, https://www.php.net/license/3_01.txt','',fs.readFileSync(pkg+'NOTICE','utf8'),'',fs.readFileSync(pkg+'LICENSE','utf8')].join('\n'));
console.log(JSON.stringify({phpWorkerGzipBytes:gzipSync(fs.readFileSync('dist/coding-php-worker.js')).length,phpWasmBytes:fs.statSync('dist/runtime/php/php8.3.wasm').size,phpWasmGzipBytes:gzipSync(fs.readFileSync('dist/runtime/php/php8.3.wasm')).length}));
