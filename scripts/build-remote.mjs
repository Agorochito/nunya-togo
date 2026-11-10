import {build} from 'esbuild';import fs from 'node:fs';import {gzipSync} from 'node:zlib';
await build({entryPoints:['lib/remote/worker.mjs'],outfile:'dist/coding-remote-worker.js',bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',legalComments:'inline'});
console.log(JSON.stringify({remoteWorkerGzipBytes:gzipSync(fs.readFileSync('dist/coding-remote-worker.js')).length}));
