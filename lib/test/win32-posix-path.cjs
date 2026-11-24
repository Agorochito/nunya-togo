/* Test-only, Windows: loaded with `node -r` by lib/test/local-compiler.mjs. The exercises are written for Linux (Wandbox), so require('path') must return the POSIX flavour. Never shipped to learners. */
const Module=require('module'),path=require('path'),load=Module._load;
Module._load=function(request,...rest){const loaded=load.call(this,request,...rest);return request==='path'||request==='node:path'?path.posix:loaded};
