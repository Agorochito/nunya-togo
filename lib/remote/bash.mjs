/* Bash through a Wandbox-compatible service. One request per check: each case gets a fresh working folder,
   its starting files and its input; check commands then inspect the folder. Learner output, errors,
   exit status and checks come back separated by random markers. */
export const MAX_CODE=12000,MAX_OUTPUT=16000,TIME_LIMIT=5;
const SCRIPT='eleve.sh';

const heredoc=(target,text,tag)=>{const body=String(text??'');return 'cat > '+target+" <<'"+tag+"'\n"+(body.endsWith('\n')?body.slice(0,-1):body)+'\n'+tag};
const quote=s=>"'"+String(s).replaceAll("'","'\\''")+"'";
const validPath=p=>typeof p==='string'&&/^[A-Za-z0-9_.\-/]+$/.test(p)&&!p.startsWith('/')&&!p.split('/').includes('..');

export function checkCode(code){
 if(typeof code!=='string'||!code.trim())throw Error('Écris d’abord tes commandes.');
 if(code.length>MAX_CODE)throw Error('Script trop long pour cet atelier.');
}

export function buildBash(code,cases,token){
 checkCode(code);
 const tag=n=>'NUNYA_'+token+'_'+n,mark=s=>"printf '\\n<<<NUNYA-"+token+'-'+s+">>>\\n'";
 const lines=['export LC_ALL=C','umask 022','nunya_base="$HOME/nunya-'+token+'"','mkdir -p "$nunya_base"',heredoc('"$nunya_base/'+SCRIPT+'"',code,tag('SCRIPT'))];
 cases.forEach((c,i)=>{
  lines.push('mkdir -p "$nunya_base/c'+i+'/travail"','cd "$nunya_base/c'+i+'/travail" || exit 3');
  Object.entries(c.files||{}).forEach(([path,content],k)=>{
   if(!validPath(path))throw Error('Chemin de fichier invalide dans un cas de test : '+path);
   if(path.endsWith('/'))lines.push('mkdir -p '+quote(path));
   else lines.push('mkdir -p "$(dirname '+quote(path)+')"',heredoc(quote(path),content,tag('F'+i+'_'+k)));
  });
  Object.entries(c.modes||{}).forEach(([path,mode])=>{if(!validPath(path)||!/^[0-7]{3}$/.test(String(mode)))throw Error('Droits invalides dans un cas de test : '+path);lines.push('chmod '+mode+' '+quote(path))});
  lines.push(heredoc('"$nunya_base/c'+i+'/entree"',c.input||'',tag('IN'+i)),mark('C-'+i),
   'timeout '+TIME_LIMIT+' bash "$nunya_base/'+SCRIPT+'" < "$nunya_base/c'+i+'/entree" 2> "$nunya_base/c'+i+'/erreurs"',
   'nunya_statut=$?',mark('S-'+i),'printf %s "$nunya_statut"',mark('R-'+i),'cat "$nunya_base/c'+i+'/erreurs"');
  (c.expressions||[]).forEach((e,j)=>lines.push('cd "$nunya_base/c'+i+'/travail"',mark('E-'+i+'-'+j),'( '+e.expr+' ) 2>&1'));
 });
 lines.push(mark('FIN'));
 return lines.join('\n')+'\n';
}

export function request(code,cases,token){return {compiler:'bash',code:buildBash(code,cases,token),stdin:'',save:false}}

const readable=(text,token)=>String(text).replace(new RegExp('[^\\n]*/nunya-'+token+'/'+SCRIPT.replace('.','\\.')+': line (\\d+): ','g'),'ligne $1 : ').replace(new RegExp('[^\\n]*/nunya-'+token+'/'+SCRIPT.replace('.','\\.')+': ','g'),'');
const trimEnd=s=>String(s).replace(/\s+$/,'');

export function parseResponse(response,cases,token){
 const out=String(response.program_output||''),marker=new RegExp('\\n<<<NUNYA-'+token+'-(C-(\\d+)|S-(\\d+)|R-(\\d+)|E-(\\d+)-(\\d+)|FIN)>>>\\n','g'),parts=[];let m,last=null;
 while((m=marker.exec(out))){if(last)parts.push({...last,text:out.slice(last.end,m.index)});last={kind:m[1].split('-')[0],i:+(m[2]??m[3]??m[4]??m[5]),j:+m[6],end:marker.lastIndex}}
 if(last&&last.kind!=='FIN')parts.push({...last,text:out.slice(last.end)});
 const get=(kind,i,j)=>parts.find(p=>p.kind===kind&&p.i===i&&(j===undefined||p.j===j));
 return cases.map((c,i)=>{
  const run=get('C',i);
  if(!run)return {output:'',error:'NotRun',detail:'Ce cas n’a pas pu s’exécuter : le service s’est arrêté avant lui.'};
  const output=run.text;
  if(output.length>MAX_OUTPUT)return {output:output.slice(0,MAX_OUTPUT),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  const status=+(get('S',i)?.text??'0'),errors=trimEnd(readable(get('R',i)?.text||'',token));
  if(status===124)return {output,error:'TimeoutError',detail:'Le script a dépassé '+TIME_LIMIT+' secondes : vérifie la condition de ta boucle.'};
  if(errors)return {output,error:'ShellError',detail:errors.split('\n').slice(0,3).join(' · ').slice(0,400)};
  const checks=(c.expressions||[]).map((e,j)=>{const got=get('E',i,j),actual=got?trimEnd(got.text):'(non évalué)';return {name:e.label||e.expr,passed:!!got&&actual===trimEnd(e.expected),actual,expected:trimEnd(e.expected)}});
  return {output,checks,assertions_passed:checks.every(x=>x.passed)};
 });
}

export function casesFor(tests,grade){return tests.map(t=>({input:(t.inputs||[]).map(String).join('\n')+((t.inputs||[]).length?'\n':''),files:t.files||{},modes:t.modes||{},expressions:grade?(t.expressions||[]):[]}))}
