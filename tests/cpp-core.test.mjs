import {buildCpp,casesFor,checkCode,compileProblem,cppString,parseResponse} from '../lib/remote/cpp.mjs';

const MAIN='#include <iostream>\nint main() {\n    return 0;\n}';
describe('C++ online workshop helpers',()=>{
 it('escapes every risky byte of a test input',()=>{
  expect(cppString('Afi\n')).toBe('"Afi\\012"');
  expect(cppString('"?\\')).toBe('"\\042\\077\\134"');
  expect(cppString('é')).toBe('"\\303\\251"');
 });
 it('refuses programs the wrapper cannot grade fairly',()=>{
  expect(()=>checkCode('')).toThrow(/Écris/);
  expect(()=>checkCode('#include <cstdio>\nint main() { printf("x"); return 0; }')).toThrow(/std::cout/);
  expect(()=>checkCode('int main(int argc, char** argv) { return 0; }')).toThrow(/int main\(\)/);
  expect(()=>checkCode('#include <cstdlib>\nint main() { exit(0); }')).toThrow(/return/);
  expect(()=>checkCode('#include <iostream>\nint main() { std::cout << "printf("; return 0; }')).not.toThrow();
 });
 it('keeps learner line numbers and separates the verification file',()=>{
  const code=buildCpp(MAIN,casesFor([{inputs:['3'],expressions:[{expr:'f(1)',expected:'2'}]}],true),'T');
  expect(code).toContain('#line 1 "prog.cc"\n#include <iostream>');
  expect(code).toContain('#line 1 "nunya-verification.cc"');
  expect(code).toContain('(f(1))');
  expect(buildCpp(MAIN,casesFor([{inputs:['3'],expressions:[{expr:'f(1)',expected:'2'}]}],false),'T')).not.toContain('f(1)');
 });
 it('reads compile errors as learner or verification problems',()=>{
  expect(compileProblem("prog.cc:3:5: error: expected ';' before 'return'")).toEqual({error:'CompileError',detail:"expected ';' before 'return' (ligne 3)"});
  expect(compileProblem("nunya-verification.cc:9:3: error: 'f' was not declared in this scope").error).toBe('CheckError');
 });
 it('splits one run into cases, checks and an interrupted case',()=>{
  const cases=casesFor([{inputs:[],expressions:[{expr:'f(1)',expected:'2'}]},{inputs:[]},{inputs:[]}],true);
  const out='\n<<<NUNYA-T-C-0>>>\nBonjour\n\n<<<NUNYA-T-E-0-0>>>\n2\n<<<NUNYA-T-C-1>>>\navant';
  const [first,second,third]=parseResponse({status:'136',signal:'Floating point exception',program_output:out},cases,'T');
  expect(first).toEqual({output:'Bonjour\n',checks:[{name:'f(1)',passed:true,actual:'2',expected:'2'}],assertions_passed:true});
  expect(second.error).toBe('RuntimeError');
  expect(second.output).toBe('avant');
  expect(third.error).toBe('NotRun');
 });
});
