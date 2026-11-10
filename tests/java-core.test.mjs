import {buildJava,casesFor,checkCode,compileProblem,describeFailure,javaString,parseResponse,prepare} from '../lib/remote/java.mjs';

const program='import java.util.Scanner;\n\npublic class Main {\n    static int carre(int n) { return n * n; }\n    public static void main(String[] args) {\n        System.out.println("main(" + args.length + ")");\n    }\n}';
describe('Java online workshop helpers',()=>{
 it('keeps the learner line numbers, drops top-level public and renames only the main declaration',()=>{
  const prepared=prepare(program);
  expect(prepared.split('\n')).toHaveLength(program.split('\n').length);
  expect(prepared).toContain('       class Main {');
  expect(prepared).toContain('public static void nunyaMain(String[] args)');
  expect(prepared).toContain('"main(" + args.length');
  const {code,learnerLines}=buildJava(program,casesFor([{inputs:['Afi'],expressions:[{expr:'Main.carre(4)',expected:'16'}]}],true),'T');
  expect(learnerLines).toBe(8);
  expect(code.indexOf('final class NunyaVerification')).toBeGreaterThan(code.indexOf('class Main'));
  expect(code).toContain('String.valueOf(Main.carre(4))');
  expect(code).toContain('nunyaRun.join(5000L)');
 });
 it('writes Java string literals that cannot break out of the quotes',()=>{
  expect(javaString('a"b\\c\nd')).toBe('"a\\"b\\\\c\\nd"');
  expect(javaString('é✓')).toBe('"\\u00e9\\u2713"');
  expect(javaString('\u0001')).toBe('"\\001"');
  expect(javaString('😀')).toBe('"\\ud83d\\ude00"');
 });
 it('refuses programs that the workshop cannot run, with French reasons',()=>{
  expect(()=>checkCode('')).toThrow(/Écris/);
  expect(()=>checkCode('class Programme { public static void main(String[] a) {} }')).toThrow(/Main/);
  expect(()=>checkCode('package ecole;\nclass Main { public static void main(String[] a) {} }')).toThrow(/package/);
  expect(()=>checkCode('class Main { public static void main(String[] a) { System.exit(0); } }')).toThrow(/exit/);
  expect(()=>checkCode('class Main { static Scanner sc = new Scanner(System.in); public static void main(String[] a) {} }')).toThrow(/Scanner/);
  expect(()=>checkCode('class Main { }\nclass Autre { public static void main(String[] a) {} }')).toThrow(/directement dans la classe Main/);
  expect(()=>checkCode('class Main { public static void main(String... a) { String s = "static void main(String[] b)"; } }')).not.toThrow();
 });
 it('separates learner compile errors from check errors',()=>{
  expect(compileProblem('prog.java:4: error: incompatible types: String cannot be converted to int\n',8)).toEqual({error:'CompileError',detail:'incompatible types: String cannot be converted to int (ligne 4)'});
  expect(compileProblem('prog.java:20: error: cannot find symbol\n',8).error).toBe('CheckError');
  expect(describeFailure('java.lang.ArithmeticException|11|/ by zero')).toEqual({error:'ArithmeticException',detail:'Division entière par zéro (ligne 11).'});
  expect(describeFailure('java.lang.ArrayIndexOutOfBoundsException|3|Index 3 out of bounds for length 3').detail).toBe('Indice hors du tableau (indice 3, longueur 3) (ligne 3).');
 });
 it('reads output, checks, exceptions, time limit and cases not run',()=>{
  const cases=casesFor([{expressions:[{expr:'Main.carre(4)',expected:'16'}]},{},{},{}],true),m=s=>'\n<<<NUNYA-T-'+s+'>>>\n';
  const out=m('C-0')+'Bonjour\n'+m('E-0-0')+'16'+m('C-1')+'avant\n'+m('X-1')+'java.lang.NullPointerException|7|'+m('C-2')+'boucle\n'+m('T-2');
  const [ok,npe,slow,never]=parseResponse({status:'0',program_output:out},cases,'T',program);
  expect(ok).toEqual({output:'Bonjour\n',checks:[{name:'Main.carre(4)',passed:true,actual:'16',expected:'16'}],assertions_passed:true});
  expect(npe).toMatchObject({output:'avant\n',error:'NullPointerException'});
  expect(slow.error).toBe('TimeoutError');
  expect(never.error).toBe('NotRun');
  const compile=parseResponse({status:'1',compiler_error:'prog.java:6: error: \';\' expected\n',program_output:''},cases,'T',program);
  expect(compile[0]).toEqual({output:'',error:'CompileError',detail:'\';\' expected (ligne 6)'});
 });
});
