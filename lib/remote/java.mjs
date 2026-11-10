/* Java through a Wandbox-compatible service (javac prog.java, then the class that declares main runs).
   The learner's main() becomes nunyaMain(), and a verification class appended after the learner's code
   (so line numbers stay the learner's own) runs each case on its own input, with a time limit, then the checks. */
/* Java on the public service takes 8 to 50 seconds (javac, then a JVM, on two shared processors): wait longer than for C++. */
export const MAX_CODE=12000,MAX_OUTPUT=16000,TIME_LIMIT=5,WAIT_MS=90000;
const RENAMED='nunyaMain',CHECK_CLASS='NunyaVerification';

/* Java string literal: printable ASCII as is, \n \r \t " \ escaped, other control bytes in octal,
   everything else as \uXXXX (never a quote, backslash or line break, which \u escapes would turn into code). */
export function javaString(text){
 let out='"';
 for(const ch of String(text)){
  const c=ch.codePointAt(0);
  if(ch==='\n')out+='\\n';else if(ch==='\r')out+='\\r';else if(ch==='\t')out+='\\t';else if(ch==='"')out+='\\"';else if(ch==='\\')out+='\\\\';
  else if(c<0x20)out+='\\'+c.toString(8).padStart(3,'0');
  else if(c<0x7f)out+=ch;
  else for(let k=0;k<ch.length;k++)out+='\\u'+ch.charCodeAt(k).toString(16).padStart(4,'0');
 }
 return out+'"';
}

/* Same length as the code, with comments, strings, text blocks and chars blanked (line breaks kept). */
export function blank(code){
 return code.replace(/"""[\s\S]*?"""|\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/g,m=>m.replace(/[^\n]/g,' '));
}
const MAIN=/\bstatic\s+void\s+main\s*\(\s*(?:final\s+)?String\s*(?:\[\s*\]\s*[A-Za-z_$][\w$]*|\.\.\.\s*[A-Za-z_$][\w$]*|[A-Za-z_$][\w$]*\s*\[\s*\])\s*\)/g;

/* Name of the type whose body contains position `at` (null inside an anonymous class or outside any type). */
function enclosingType(plain,at){
 const stack=[],token=/\b(?:class|interface|enum|record)\s+([A-Za-z_$][\w$]*)|[{}]/g;let pending=null,m;
 while((m=token.exec(plain))&&m.index<at){if(m[1])pending=m[1];else if(m[0]==='{'){stack.push(pending);pending=null}else stack.pop()}
 return stack.length?stack[stack.length-1]:null;
}

export function checkCode(code){
 if(typeof code!=='string'||!code.trim())throw Error('Écris d’abord un programme.');
 if(code.length>MAX_CODE)throw Error('Programme trop long pour cet atelier.');
 const plain=blank(code);
 if(/^\s*package\b/m.test(plain))throw Error('Retire la ligne package : dans cet atelier, tout le programme tient dans un seul fichier.');
 if(!/\bclass\s+Main\b/.test(plain))throw Error('La classe principale doit s’appeler Main : class Main { … }.');
 const mains=plain.match(MAIN)||[];
 if(mains.length!==1)throw Error(mains.length?'Une seule méthode main est permise dans cet atelier.':'Le programme doit contenir public static void main(String[] args) dans la classe Main.');
 if(enclosingType(plain,plain.search(MAIN))!=='Main')throw Error('La méthode main doit se trouver directement dans la classe Main.');
 if(/\bSystem\s*\.\s*exit\s*\(|\bRuntime\s*\.\s*getRuntime\s*\(|\bProcessBuilder\b/.test(plain))throw Error('Termine le programme avec return dans main() plutôt qu’avec System.exit().');
 if(/\bstatic\s+(?:final\s+)?(?:java\s*\.\s*util\s*\.\s*)?Scanner\b/.test(plain))throw Error('Crée le Scanner à l’intérieur de main() : Scanner sc = new Scanner(System.in);');
}

/* `public` is removed (spaces of the same length) from top-level types: javac requires a public class Main
   to live in Main.java, and Wandbox names the file prog.java. The learner's main is renamed in place. */
export function prepare(code){
 const plain=blank(code),chars=[...code];let depth=0;
 const at=[];
 for(let i=0;i<plain.length;i++){
  const ch=plain[i];
  if(ch==='{')depth++;else if(ch==='}')depth--;
  else if(depth===0&&plain.startsWith('public',i)&&!/[\w$]/.test(plain[i-1]||'')&&/\s/.test(plain[i+6]||''))at.push(i);
 }
 let out=code;
 for(const i of at.reverse())out=out.slice(0,i)+'      '+out.slice(i+6);
 const m=[...blank(out).matchAll(MAIN)][0],name=m.index+m[0].indexOf('main');
 return out.slice(0,name)+RENAMED+out.slice(name+4);
}

export function buildJava(code,cases,token){
 checkCode(code);
 const learner=prepare(code),mark=s=>`nunyaOut.print(${javaString('\n<<<NUNYA-'+token+'-'+s+'>>>\n')});`;
 const learnerLines=learner.split('\n').length;
 const lines=[learner,'',
  `final class ${CHECK_CLASS} {`,
  ' static String nunyaDescribe(Throwable t) {',
  '  int line = 0;',
  `  for (StackTraceElement e : t.getStackTrace()) if ("prog.java".equals(e.getFileName()) && e.getLineNumber() > 0 && e.getLineNumber() <= ${learnerLines}) { line = e.getLineNumber(); break; }`,
  '  String m = t.getMessage();',
  '  return t.getClass().getName() + "|" + line + "|" + (m == null ? "" : m.replace(\'\\n\', \' \'));',
  ' }',
  ' public static void main(String[] nunyaArgs) throws Exception {',
  '  java.util.Locale.setDefault(java.util.Locale.ROOT);',
  '  java.io.PrintStream nunyaOut = new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, "UTF-8");',
  '  System.setOut(nunyaOut);',
  '  System.setErr(new java.io.PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.err), true, "UTF-8"));'];
 cases.forEach((c,i)=>{
  lines.push('  {',
   `   System.setIn(new java.io.ByteArrayInputStream(${javaString(c.input||'')}.getBytes(java.nio.charset.StandardCharsets.UTF_8)));`,
   '   final Throwable[] nunyaFailure = new Throwable[1];',
   `   Thread nunyaRun = new Thread(null, () -> { try { Main.${RENAMED}(new String[0]); } catch (Throwable t) { nunyaFailure[0] = t; } }, "main", 64L * 1024 * 1024);`,
   '   nunyaRun.setDaemon(true);',
   '   '+mark('C-'+i),
   '   nunyaRun.start();',
   `   nunyaRun.join(${TIME_LIMIT*1000}L);`,
   '   nunyaOut.flush();',
   `   if (nunyaRun.isAlive()) { ${mark('T-'+i)} nunyaOut.flush(); Runtime.getRuntime().halt(0); }`,
   `   if (nunyaFailure[0] != null) { ${mark('X-'+i)} nunyaOut.print(nunyaDescribe(nunyaFailure[0])); }`,
   '   else {');
  (c.expressions||[]).forEach((e,j)=>lines.push(`    ${mark('E-'+i+'-'+j)}`,`    try { nunyaOut.print(String.valueOf(${e.expr})); } catch (Throwable t) { nunyaOut.print("exception " + nunyaDescribe(t)); }`));
  lines.push('   }','  }');
 });
 lines.push('  '+mark('FIN'),'  nunyaOut.flush();',' }','}','');
 return {code:lines.join('\n'),learnerLines};
}

export function request(code,cases,token){return {compiler:'openjdk-jdk-21+35',code:buildJava(code,cases,token).code,stdin:'',save:false}}

const KNOWN={
 'java.lang.ArithmeticException':m=>m==='/ by zero'?'Division entière par zéro':'Erreur de calcul : '+m,
 'java.lang.ArrayIndexOutOfBoundsException':m=>'Indice hors du tableau'+(m?' ('+m.replace(/^Index (-?\d+) out of bounds for length (\d+)$/,'indice $1, longueur $2')+')':''),
 'java.lang.StringIndexOutOfBoundsException':m=>'Position hors de la chaîne'+(m?' ('+m+')':''),
 'java.lang.IndexOutOfBoundsException':m=>'Indice hors de la liste'+(m?' ('+m.replace(/^Index (-?\d+) out of bounds for length (\d+)$/,'indice $1, longueur $2')+')':''),
 'java.lang.NullPointerException':()=>'Utilisation d’une valeur null (NullPointerException)',
 'java.lang.NumberFormatException':m=>'Conversion impossible en nombre'+(m?' : '+m.replace(/^For input string: /,'texte '):''),
 'java.util.InputMismatchException':()=>'La saisie ne correspond pas au type demandé (par exemple un mot à la place d’un nombre)',
 'java.util.NoSuchElementException':()=>'Le programme lit plus de saisies qu’il n’en reçoit',
 'java.lang.StackOverflowError':()=>'Trop d’appels imbriqués : vérifie le cas d’arrêt de ta fonction récursive',
 'java.lang.OutOfMemoryError':()=>'Le programme utilise trop de mémoire',
 'java.lang.ClassCastException':m=>'Conversion de type impossible'+(m?' : '+m:''),
 'java.lang.IllegalArgumentException':m=>'Argument refusé'+(m?' : '+m:''),
 'java.lang.IllegalStateException':m=>'État invalide'+(m?' : '+m:''),
};
export function describeFailure(text){
 const [cls,line,...rest]=String(text).split('|'),message=rest.join('|'),short=cls.split('.').pop();
 const known=KNOWN[cls];
 return {error:short,detail:(known?known(message):short+(message?' : '+message:''))+(+line?' (ligne '+line+')':'')+'.'};
}

const firstError=text=>{const m=String(text).match(/^([^\n:]+\.java):(\d+): error: (.+)$/m);return m?{line:+m[2],message:m[3].trim()}:null};
export function compileProblem(compilerError,learnerLines){
 const e=firstError(compilerError),fix=s=>s.replaceAll(RENAMED,'main');
 if(!e)return {error:'CompileError',detail:String(compilerError).trim().split('\n').slice(0,3).join(' ').slice(0,400)||'La compilation a échoué.'};
 if(e.line>learnerLines)return {error:'CheckError',detail:'Les vérifications ne trouvent pas ce qu’elles attendent dans ton code : '+fix(e.message)};
 return {error:'CompileError',detail:fix(e.message)+' (ligne '+e.line+')'};
}

/* Turns a Wandbox-shaped response into one result per case, in the format of the other workers. */
export function parseResponse(response,cases,token,code){
 const out=String(response.program_output||'');
 if(response.compiler_error&&!out.includes('<<<NUNYA-'+token+'-C-0>>>')&&/error:/.test(response.compiler_error)){
  const learnerLines=code?prepare(code).split('\n').length:Infinity,problem=compileProblem(response.compiler_error,learnerLines);
  return cases.map(()=>({output:'',...problem}));
 }
 const finished=out.includes('<<<NUNYA-'+token+'-FIN>>>');
 const marker=new RegExp('\\n<<<NUNYA-'+token+'-(C-(\\d+)|T-(\\d+)|X-(\\d+)|E-(\\d+)-(\\d+)|FIN)>>>\\n','g'),parts=[];let m,last=null;
 while((m=marker.exec(out))){if(last)parts.push({...last,text:out.slice(last.end,m.index)});last={kind:m[1].split('-')[0],i:+(m[2]??m[3]??m[4]??m[5]),j:+m[6],end:marker.lastIndex}}
 if(last&&last.kind!=='FIN')parts.push({...last,text:out.slice(last.end)});
 const get=(kind,i,j)=>parts.find(p=>p.kind===kind&&p.i===i&&(j===undefined||p.j===j));
 const started=parts.filter(p=>p.kind==='C').map(p=>p.i),lastStarted=Math.max(-1,...started);
 return cases.map((c,i)=>{
  const run=get('C',i);
  if(!run)return {output:'',error:'NotRun',detail:'Ce cas n’a pas pu s’exécuter : le programme s’est arrêté pendant un cas précédent.'};
  const output=run.text;
  if(output.length>MAX_OUTPUT)return {output:output.slice(0,MAX_OUTPUT),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  if(get('T',i))return {output,error:'TimeoutError',detail:'Le programme a dépassé '+TIME_LIMIT+' secondes : vérifie la condition de ta boucle.'};
  const failure=get('X',i);
  if(failure)return {output,...describeFailure(failure.text)};
  if(!finished&&i===lastStarted){const err=String(response.program_error||'').trim().split('\n')[0];return {output,error:'RuntimeError',detail:err?'Le programme s’est arrêté : '+err.slice(0,300):'Le programme s’est arrêté avant la fin de ce cas.'}}
  const checks=(c.expressions||[]).map((e,j)=>{const got=get('E',i,j);const actual=got?got.text:'(non évalué)';return {name:e.label||e.expr,passed:!!got&&actual===String(e.expected),actual,expected:String(e.expected)}});
  return {output,checks,assertions_passed:checks.every(x=>x.passed)};
 });
}

/* Test cases of an exercise → harness cases. A free run uses only the typed inputs. */
export function casesFor(tests,grade){return tests.map(t=>({input:(t.inputs||[]).map(String).join('\n')+((t.inputs||[]).length?'\n':''),expressions:grade?(t.expressions||[]):[]}))}
