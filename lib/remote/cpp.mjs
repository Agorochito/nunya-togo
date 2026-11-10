/* C++ through a Wandbox-compatible compile service.
   All the cases of one check run in a single compilation: the learner's main() is renamed,
   and a fixed verification main() feeds each case its input and separates outputs with random markers. */
export const MAX_CODE=12000,MAX_OUTPUT=16000;
const WRAPPED='nunya_programme_principal',LEARNER_FILE='prog.cc',CHECK_FILE='nunya-verification.cc';

// Every byte outside plain printable ASCII becomes a 3-digit octal escape: no trigraph, quote or newline issue.
export function cppString(text){
 let out='"';
 for(const byte of new TextEncoder().encode(String(text)))out+=byte>=0x20&&byte<0x7f&&byte!==0x22&&byte!==0x5c&&byte!==0x3f?String.fromCharCode(byte):'\\'+byte.toString(8).padStart(3,'0');
 return out+'"';
}
const strip=code=>code.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g,' ');

export function checkCode(code){
 if(typeof code!=='string'||!code.trim())throw Error('Écris d’abord un programme.');
 if(code.length>MAX_CODE)throw Error('Programme trop long pour cet atelier.');
 const plain=strip(code);
 if(!/\bint\s+main\s*\(\s*(?:void\s*)?\)/.test(plain))throw Error('Le programme doit contenir la fonction int main() sans paramètres.');
 if(/\b(?:printf|scanf|puts|getchar|putchar|fprintf|system|fork|exec[lv]p?e?)\s*\(/.test(plain))throw Error('Dans cet atelier, affiche avec std::cout et lis avec std::cin ou std::getline.');
 if(/\b(?:exit|abort|quick_exit|_Exit)\s*\(/.test(plain))throw Error('Termine le programme avec return dans main() plutôt qu’avec exit().');
}

export function buildCpp(code,cases,token){
 checkCode(code);
 const lines=['#include <iostream>','#include <sstream>','#include <string>','#include <ios>',`#define main ${WRAPPED}`,`#line 1 "${LEARNER_FILE}"`,code,`#line 1 "${CHECK_FILE}"`,'#undef main','int main() {',' std::ios nunya_format(nullptr);',' nunya_format.copyfmt(std::cout);',' std::cout << std::unitbuf;'];
 cases.forEach((c,i)=>{
  lines.push(' {',`  std::istringstream nunya_entree(${cppString(c.input||'')});`,'  std::streambuf* nunya_cin = std::cin.rdbuf(nunya_entree.rdbuf());','  std::cin.clear();','  std::cout.copyfmt(nunya_format);','  std::cout << std::unitbuf;',`  std::cout << ${cppString('\n<<<NUNYA-'+token+'-C-'+i+'>>>\n')};`,`  ${WRAPPED}();`);
  (c.expressions||[]).forEach((e,j)=>lines.push('  std::cout.copyfmt(nunya_format);','  std::cout << std::unitbuf;',`  std::cout << ${cppString('\n<<<NUNYA-'+token+'-E-'+i+'-'+j+'>>>\n')} << std::boolalpha << (${e.expr});`));
  lines.push('  std::cin.rdbuf(nunya_cin);',' }');
 });
 lines.push(` std::cout << ${cppString('\n<<<NUNYA-'+token+'-FIN>>>\n')};`,' return 0;','}');
 return lines.join('\n');
}

export function request(code,cases,token){return {compiler:'gcc-13.2.0',options:'c++17',code:buildCpp(code,cases,token),stdin:'',save:false}}

const firstError=text=>{const m=String(text).match(/^([^\n:]+):(\d+):(?:\d+:)?\s*(?:fatal )?error:\s*(.+)$/m);return m?{file:m[1],line:+m[2],message:m[3].trim()}:null};

export function compileProblem(compilerError){
 const e=firstError(compilerError);
 if(!e)return {error:'CompileError',detail:String(compilerError).trim().split('\n').slice(0,3).join(' ').slice(0,400)||'La compilation a échoué.'};
 if(e.file.endsWith(CHECK_FILE))return {error:'CheckError',detail:'Les vérifications ne trouvent pas ce qu’elles attendent dans ton code : '+e.message.replaceAll(WRAPPED,'main')};
 return {error:'CompileError',detail:e.message.replaceAll(WRAPPED,'main')+' (ligne '+e.line+')'};
}

/* Turns a Wandbox-shaped response into one result per case, in the format of the other workers. */
export function parseResponse(response,cases,token){
 if(String(response.status)!=='0'&&response.compiler_error&&!String(response.program_output||'').includes('<<<NUNYA-'+token+'-C-0>>>')){const problem=compileProblem(response.compiler_error);return cases.map(()=>({output:'',...problem}))}
 const out=String(response.program_output||''),finished=out.includes('<<<NUNYA-'+token+'-FIN>>>');
 const marker=new RegExp('\\n<<<NUNYA-'+token+'-(C-(\\d+)|E-(\\d+)-(\\d+)|FIN)>>>\\n','g'),parts=[];let m,last=null;
 while((m=marker.exec(out))){if(last)parts.push({...last,text:out.slice(last.end,m.index)});last={kind:m[2]!==undefined?'C':m[3]!==undefined?'E':'FIN',i:+(m[2]??m[3]),j:+m[4],end:marker.lastIndex}}
 if(last&&last.kind!=='FIN')parts.push({...last,text:out.slice(last.end)});
 const started=new Set(parts.filter(p=>p.kind==='C').map(p=>p.i)),lastStarted=Math.max(-1,...started);
 return cases.map((c,i)=>{
  if(!started.has(i))return {output:'',error:'NotRun',detail:'Ce cas n’a pas pu s’exécuter : le programme s’est arrêté pendant un cas précédent.'};
  const output=parts.find(p=>p.kind==='C'&&p.i===i).text;
  if(output.length>MAX_OUTPUT)return {output:output.slice(0,MAX_OUTPUT),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  if(!finished&&i===lastStarted){const signal=String(response.signal||'');return {output,error:'RuntimeError',detail:signal?'Le programme a été arrêté par le système : '+signal+'. Vérifie une division par zéro, un indice hors du tableau ou une boucle sans fin.':'Le programme s’est arrêté avant la fin de ce cas.'}}
  const checks=(c.expressions||[]).map((e,j)=>{const got=parts.find(p=>p.kind==='E'&&p.i===i&&p.j===j);const actual=got?got.text:'(non évalué)';return {name:e.expr,passed:!!got&&actual===String(e.expected),actual,expected:String(e.expected)}});
  return {output,checks,assertions_passed:checks.every(x=>x.passed)};
 });
}

/* Test cases of an exercise → harness cases. A free run uses only the typed inputs. */
export function casesFor(tests,grade){return tests.map(t=>({input:(t.inputs||[]).map(String).join('\n')+((t.inputs||[]).length?'\n':''),expressions:grade?(t.expressions||[]):[]}))}
