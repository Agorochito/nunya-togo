/* TypeScript 5.6 through a Wandbox-compatible service (tsc prog.ts, then node prog.js), compiled with --strict and
   --noEmitOnError: a type error stops the program, as in a real project. The learner's code comes first so error
   lines are the learner's own; the first line only gains declarations and the first marker. Checks run once, after
   the program, inside an async function; a check of kind "type_error" sits under // @ts-expect-error, so a type that
   is too loose makes the directive unused and the compilation fails on the verification lines. */
export const MAX_CODE=12000,MAX_OUTPUT=16000,TIME_LIMIT=5,WAIT_MS=60000;
export const OPTIONS=['--strict','--noEmitOnError','--target','ES2022','--lib','ES2022,DOM'];

export function checkCode(code){
 if(typeof code!=='string'||!code.trim())throw Error('Écris d’abord un programme.');
 if(code.length>MAX_CODE)throw Error('Programme trop long pour cet atelier.');
 if(/^\s*(import|export)\b/m.test(code))throw Error('Dans cet atelier, tout le programme tient dans un seul fichier : retire import et export.');
 if(/\bdeclare\s+const\s+nunya/.test(code))throw Error('Ce nom est réservé à l’atelier.');
}

export function buildTypeScript(code,cases,token){
 checkCode(code);
 const mark=s=>`nunyaEcrire(${JSON.stringify('\n<<<NUNYA-'+token+'-'+s+'>>>\n')});`;
 const lines=code.split('\n'),learnerLines=lines.length;
 lines[0]='declare const process: any; const nunyaEcrire = (s: string): void => { process.stdout.write(s); }; '+mark('C-0')+' '+lines[0];
 const out=[...lines,'','/* Vérifications Nunya */',
  'const nunyaMontrer = (v: unknown): string => v === undefined ? "undefined" : typeof v === "string" ? v : JSON.stringify(v);',
  'const nunyaDecrire = (e: any): string => (e && e.name ? e.name : "Error") + "|0|" + String(e && e.message !== undefined ? e.message : e).replace(/\\n/g, " ");',
  'void (async (): Promise<void> => {'];
 cases.forEach((c,i)=>{
  if(i>0)out.push('  '+mark('C-'+i));
  (c.expressions||[]).forEach((e,j)=>{
   out.push('  '+mark('E-'+i+'-'+j));
   if(e.kind==='type_error')out.push('  // @ts-expect-error',`  void (() => ${e.expr});`,'  nunyaEcrire("erreur de type attendue");');
   else out.push(`  try { const nunyaV: unknown = await (${e.expr}); nunyaEcrire(nunyaMontrer(nunyaV)); } catch (nunyaE) { nunyaEcrire("exception " + nunyaDecrire(nunyaE)); }`);
  });
 });
 out.push('  '+mark('FIN'),'})();','');
 return {code:out.join('\n'),learnerLines};
}

export function request(code,cases,token){return {compiler:'typescript-5.6.2',code:buildTypeScript(code,cases,token).code,'compiler-option-raw':OPTIONS.join('\n'),stdin:'',save:false}}

const FR=[
 [/^Type '(.+)' is not assignable to type '(.+)'\.$/,(m)=>`le type ${m[1]} ne peut pas être affecté au type ${m[2]}`],
 [/^Argument of type '(.+)' is not assignable to parameter of type '(.+)'\.$/,(m)=>`un argument de type ${m[1]} est donné là où le type ${m[2]} est attendu`],
 [/^Property '(.+)' does not exist on type '(.+)'\.$/,(m)=>`la propriété ${m[1]} n’existe pas sur le type ${m[2]}`],
 [/^Property '(.+)' is missing in type '(.+)' but required in type '(.+)'\.$/,(m)=>`la propriété ${m[1]} manque dans ${m[2]}, alors qu’elle est obligatoire dans ${m[3]}`],
 [/^Parameter '(.+)' implicitly has an '(.+)' type\.$/,(m)=>`le paramètre ${m[1]} n’a pas de type : précise-le (par exemple ${m[1]}: number)`],
 [/^Cannot find name '(.+)'\.$/,(m)=>`nom inconnu : ${m[1]} (variable, fonction ou type non défini, ou faute de frappe)`],
 [/^'(.+)' is possibly '(null|undefined)'\.$/,(m)=>`${m[1]} peut valoir ${m[2]} : vérifie-le avant de l’utiliser`],
 [/^Object is possibly '(null|undefined)'\.$/,(m)=>`cette valeur peut valoir ${m[1]} : vérifie-la avant de l’utiliser`],
 [/^Function lacks ending return statement and return type does not include 'undefined'\.$/,()=>'la fonction ne renvoie pas de valeur dans tous les cas'],
 [/^Expected (\d+) arguments?, but got (\d+)\.$/,(m)=>`${m[1]} argument(s) attendu(s), ${m[2]} reçu(s)`],
 [/^Cannot assign to '(.+)' because it is a (constant|read-only property)\.$/,(m)=>`${m[1]} ne peut pas être modifié (${m[2]==='constant'?'constante':'propriété en lecture seule'})`],
 [/^This comparison appears to be unintentional because the types '(.+)' and '(.+)' have no overlap\.$/,(m)=>`cette comparaison est toujours fausse : les types ${m[1]} et ${m[2]} n’ont rien en commun`],
 [/^Not all code paths return a value\.$/,()=>'tous les chemins de la fonction ne renvoient pas de valeur'],
];
export function translate(message){for(const [re,f]of FR){const m=re.exec(message);if(m)return f(m)}return message}

const firstError=text=>{const m=String(text).match(/prog\.ts\((\d+),(\d+)\): error (TS\d+): ([^\n]+)/);return m?{line:+m[1],code:m[3],message:m[4].trim()}:null};
export function compileProblem(output,learnerLines){
 const e=firstError(output);
 if(!e)return {error:'CompileError',detail:String(output).trim().split('\n').slice(0,2).join(' ').slice(0,400)||'La compilation a échoué.'};
 if(e.line>learnerLines)return {error:'CheckError',detail:e.code==='TS2578'?'Une vérification attendait une erreur de type, mais ton code accepte cette valeur : ses types sont trop larges.':'Les vérifications ne trouvent pas ce qu’elles attendent dans ton code : '+translate(e.message)};
 return {error:'TypeError',detail:'Erreur de type (ligne '+e.line+') : '+translate(e.message)+'.'};
}

const KNOWN={
 TypeError:m=>{const r=/^Cannot read properties of (undefined|null) \(reading '(.+)'\)$/.exec(m);return r?'Lecture de « '+r[2]+' » sur '+r[1]+' : la valeur attendue n’existe pas':'Opération impossible : '+m},
 RangeError:m=>/call stack/.test(m)?'Trop d’appels imbriqués : vérifie le cas d’arrêt de ta fonction récursive':'Valeur hors limites : '+m,
};
export function describeFailure(text){const [name,,...rest]=String(text).split('|'),m=rest.join('|'),k=KNOWN[name];return {error:name,detail:(k?k(m):name+(m?' : '+m:''))+'.'}}

export function parseResponse(response,cases,token,code){
 const out=String(response.program_output||''),compiled=String(response.compiler_output||'')+String(response.compiler_error||'');
 if(!out.includes('<<<NUNYA-'+token+'-C-0>>>')&&/error TS\d+/.test(compiled)){
  const learnerLines=code?String(code).split('\n').length:Infinity,problem=compileProblem(compiled,learnerLines);
  return cases.map(()=>({output:'',...problem}));
 }
 const finished=out.includes('<<<NUNYA-'+token+'-FIN>>>');
 const marker=new RegExp('\\n<<<NUNYA-'+token+'-(C-(\\d+)|E-(\\d+)-(\\d+)|FIN)>>>\\n','g'),parts=[];let m,last=null;
 while((m=marker.exec(out))){if(last)parts.push({...last,text:out.slice(last.end,m.index)});last={kind:m[1].split('-')[0],i:+(m[2]??m[3]),j:+m[4],end:marker.lastIndex}}
 if(last&&last.kind!=='FIN')parts.push({...last,text:out.slice(last.end)});
 const get=(kind,i,j)=>parts.find(p=>p.kind===kind&&p.i===i&&(j===undefined||p.j===j));
 return cases.map((c,i)=>{
  const run=get('C',i);
  if(!run||(!finished&&!get('E',i,0)&&(c.expressions||[]).length)){
   const err=String(response.program_error||'').split('\n').find(l=>/^\w*Error\b/.test(l))||'';
   return {output:run?run.text:'',error:'RuntimeError',detail:err?'Le programme s’est arrêté : '+describeFailure(err.replace(/^(\w+): /,'$1||')).detail:'Le programme s’est arrêté avant les vérifications.'};
  }
  const output=run.text;
  if(output.length>MAX_OUTPUT)return {output:output.slice(0,MAX_OUTPUT),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  const checks=(c.expressions||[]).map((e,j)=>{const got=get('E',i,j),raw=got?got.text:'(non évalué)',expected=e.kind==='type_error'?'erreur de type attendue':String(e.expected);
   return {name:e.label||e.expr,passed:!!got&&raw===expected,actual:raw.startsWith('exception ')?'Erreur : '+describeFailure(raw.slice(10)).detail:raw,expected}});
  return {output,checks,assertions_passed:checks.every(x=>x.passed)};
 });
}

export function casesFor(tests,grade){return tests.map(t=>({input:'',expressions:grade?(t.expressions||[]):[]}))}
