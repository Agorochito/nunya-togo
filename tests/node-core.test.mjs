import {blank,buildNode,casesFor,checkCode,describeFailure,parseResponse,request} from '../lib/remote/node.mjs';
import {compileLocally} from '../lib/test/local-compiler.mjs';

const run=(code,tests,grade=true)=>{const cases=casesFor(tests,grade);return parseResponse(compileLocally(request(code,cases,'T')),cases,'T')};
describe('Node.js online workshop',()=>{
 it('runs the learner program, then each check in the same context',()=>{
  const [r]=run('const double = x => x * 2;\nfunction triple(x) { return 3 * x; }\nconsole.log("prêt", double(2));',[{expressions:[{expr:'double(4) + triple(1)',expected:'11'},{expr:'[double(1), "a"]',expected:'[2,"a"]'}]}]);
  expect(r.output).toBe('prêt 4\n');
  expect(r.assertions_passed).toBe(true);
 });
 it('awaits promises and tests an http server through nunyaRequete without listen()',()=>{
  const code='const http = require("http");\nconst attendre = ms => new Promise(r => setTimeout(() => r(ms), ms));\nconst serveur = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json" });\n  res.end(JSON.stringify({ chemin: req.url }));\n});';
  const [r]=run(code,[{expressions:[{expr:'attendre(20)',expected:'20'},{expr:'nunyaRequete(serveur, "/salut")',expected:'{"statut":200,"type":"application/json","corps":"{\\"chemin\\":\\"/salut\\"}"}'}]}]);
  expect(r.checks.map(c=>c.actual)).toEqual(['20','{"statut":200,"type":"application/json","corps":"{\\"chemin\\":\\"/salut\\"}"}']);
  expect(r.assertions_passed).toBe(true);
 });
 it('waits for asynchronous output before moving to the checks',()=>{
  const [r]=run('setTimeout(() => console.log("plus tard"), 200);\nconst http = require("http");\nconst s = http.createServer((q, res) => res.end("pong"));\nnunyaRequete(s, "/").then(x => console.log(x.statut, x.corps));',[{expressions:[{expr:'1',expected:'1'}]}]);
  expect(r.output).toBe('200 pong\nplus tard\n');
  expect(r.assertions_passed).toBe(true);
 });
 it('survives an error thrown inside an async request handler',()=>{
  const code='const http = require("http");\nconst serveur = http.createServer(async (req, res) => { JSON.parse("x"); res.end("ok"); });\nconst un = () => 1;';
  const res=run(code,[{expressions:[{expr:'nunyaRequete(serveur, "/").then(r => r.statut)',expected:'200'},{expr:'un()',expected:'1'}]},{expressions:[{expr:'un()',expected:'1'}]}]);
  expect(res[0].checks[0].actual).toMatch(/^Erreur : Le programme a dépassé/);
  expect(res[0].checks[1].passed).toBe(true);
  expect(res[1].assertions_passed).toBe(true);
 },20000);
 it('reports learner errors with their own line number, in French',()=>{
  const [r]=run('const a = 1;\nconsole.log(b);',[{expressions:[]}]);
  expect(r.error).toBe('ReferenceError');
  expect(r.detail).toBe('Nom inconnu : b (variable ou fonction non définie, ou faute de frappe) (ligne 2).');
  const [s]=run('const x = ;',[{expressions:[]}]);
  expect(s.error).toBe('SyntaxError');
 });
 it('stops an endless loop and keeps later cases independent',()=>{
  const res=run('let n = 0;\nfunction boucle() { while (true) { n++; } }\nfunction un() { return 1; }',[{expressions:[{expr:'boucle()',expected:'x'}]},{expressions:[{expr:'un()',expected:'1'}]}]);
  expect(res[0].checks[0].actual).toMatch(/^Erreur : Le programme a dépassé 5 secondes/);
  expect(res[1].assertions_passed).toBe(true);
 },20000);
 it('refuses process.exit and empty programs, but not the words inside strings',()=>{
  expect(()=>checkCode('process.exit(0)')).toThrow(/process.exit/);
  expect(()=>checkCode('  ')).toThrow();
  expect(()=>checkCode('console.log("process.exit(1)")')).not.toThrow();
  expect(blank('a // b\n"c"')).toBe('a     \n   ');
  expect(buildNode('console.log(1)',casesFor([{inputs:['x']}],false),'Z')).toContain("filename:'eleve.js'");
  expect(describeFailure('TypeError|3|x is not a function').detail).toBe('x n’est pas une fonction (ligne 3).');
 });
});
