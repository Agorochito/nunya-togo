import {buildTypeScript,casesFor,checkCode,parseResponse,request,translate} from '../lib/remote/typescript.mjs';
import {compileLocally} from '../lib/test/local-compiler.mjs';

const run=(code,tests,grade=true)=>{const cases=casesFor(tests,grade);return parseResponse(compileLocally(request(code,cases,'T')),cases,'T',code)};
describe('TypeScript online workshop',()=>{
 it('compiles in strict mode, runs the program, then the checks',()=>{
  const res=run('function double(x: number): number {\n  return x * 2;\n}\nconsole.log("prêt");',[{expressions:[{expr:'double(4)',expected:'8'}]},{expressions:[{expr:'[double(1)]',expected:'[2]'}]}]);
  expect(res[0]).toMatchObject({output:'prêt\n',assertions_passed:true});
  expect(res[1]).toMatchObject({output:'',assertions_passed:true});
 },60000);
 it('reports the learner’s type error with its own line, in French',()=>{
  const [r]=run('const nom = "Afi";\nlet age: number = "seize";',[{expressions:[]}]);
  expect(r.error).toBe('TypeError');
  expect(r.detail).toBe('Erreur de type (ligne 2) : le type string ne peut pas être affecté au type number.');
 },60000);
 it('checks that a call is refused by the types, and explains a type that is too loose',()=>{
  const strict=run('function aire(c: number): number {\n  return c * c;\n}',[{expressions:[{expr:'aire("3")',kind:'type_error'},{expr:'aire(3)',expected:'9'}]}]);
  expect(strict[0].assertions_passed).toBe(true);
  const loose=run('function aire(c: any): number {\n  return c * c;\n}',[{expressions:[{expr:'aire("3")',kind:'type_error'}]}]);
  expect(loose[0].error).toBe('CheckError');
  expect(loose[0].detail).toMatch(/trop larges/);
 },60000);
 it('awaits promises and turns runtime errors into French messages',()=>{
  const [r]=run('const attendre = (ms: number): Promise<number> => new Promise(r => setTimeout(() => r(ms), ms));\nfunction lire(o: { a?: { b: number } }): number {\n  return o.a!.b;\n}',[{expressions:[{expr:'attendre(5)',expected:'5'},{expr:'lire({})',expected:'x'}]}]);
  expect(r.checks[0].passed).toBe(true);
  expect(r.checks[1].actual).toBe('Erreur : Lecture de « b » sur undefined : la valeur attendue n’existe pas.');
 },60000);
 it('keeps line numbers and refuses modules',()=>{
  const {code,learnerLines}=buildTypeScript('let a = 1;\nlet b = 2;',casesFor([{expressions:[{expr:'a + b',expected:'3'}]}],true),'Z');
  expect(learnerLines).toBe(2);
  expect(code.split('\n')[1]).toBe('let b = 2;');
  expect(()=>checkCode('import fs from "fs";')).toThrow(/import/);
  expect(translate("Parameter 'x' implicitly has an 'any' type.")).toBe('le paramètre x n’a pas de type : précise-le (par exemple x: number)');
 });
});
