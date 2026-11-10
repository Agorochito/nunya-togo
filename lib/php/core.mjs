/* Real PHP 8.3 (php-wasm) case runner shared by the browser Worker and the Node content tests.
   The learner script runs unchanged; a short PHP epilogue reads the requested functions and variables. */
export const MAX_CODE=12000,MAX_OUTPUT=16000,SCRIPT_NAME='php-wasm run script';
const VALID_NAME=/^\$?[A-Za-z_][A-Za-z0-9_]*$/;

export function same(a,b,tolerance=0){
 if(typeof b==='number')return typeof a==='number'&&Number.isFinite(a)&&Math.abs(a-b)<=tolerance;
 if(b===null||typeof b!=='object')return a===b;
 if(Array.isArray(a)!==Array.isArray(b)||!a||typeof a!=='object'||Object.keys(a).length!==Object.keys(b).length)return false;
 const keys=Object.keys(b);
 // PHP associative arrays are ordered: the key order is part of the value.
 if(!Array.isArray(b)&&Object.keys(a).some((k,i)=>k!==keys[i]))return false;
 return keys.every(k=>Object.hasOwn(a,k)&&same(a[k],b[k],tolerance));
}

const toBase64=text=>{const bytes=new TextEncoder().encode(text);let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);return btoa(binary)};

export function buildScript(code,calls,token){
 if(typeof code!=='string'||code.length>MAX_CODE)throw Error('Programme trop long pour cet atelier.');
 if(!/^\s*<\?php(\s|$)/.test(code))throw Error('Un script PHP commence par la balise <?php sur sa première ligne.');
 if(/(^|[^\w$>:\\])readline\s*\(/i.test(code.replace(/\/\/[^\n]*|#[^\n[]*|\/\*[\s\S]*?\*\/|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g,'')))throw Error('Dans cet atelier, lis chaque saisie avec trim(fgets(STDIN)) : readline() attend un clavier que le navigateur ne fournit pas.');
 // Command-line PHP defines STDIN; this embedded build does not. Same line as the opening tag, so line numbers stay exact.
 code=code.replace(/^(\s*<\?php(?:[ \t]*declare\s*\(\s*strict_types\s*=\s*[01]\s*\)\s*;)?)/,"$1 if(!defined('STDIN'))define('STDIN',fopen('php://stdin','r'));");
 if(!calls.length)return code;
 for(const call of calls)if(typeof call.name!=='string'||!VALID_NAME.test(call.name))throw Error('Nom de vérification invalide.');
 // The epilogue stays in PHP mode: a closing tag written by the learner is removed first.
 const body=code.replace(/\?>\s*$/,'');
 const payload=toBase64(JSON.stringify(calls.map(c=>({name:c.name,args:c.args||[]}))));
 return body+`
;$__nunya_results=[];foreach(json_decode(base64_decode('${payload}'),true) as $__nunya_call){$__nunya_name=$__nunya_call['name'];try{if($__nunya_name[0]==='$'){$__nunya_key=substr($__nunya_name,1);if(!array_key_exists($__nunya_key,$GLOBALS)){$__nunya_results[]=['error'=>'La variable '.$__nunya_name.' n’existe pas.'];continue;}$__nunya_value=$GLOBALS[$__nunya_key];}elseif(!function_exists($__nunya_name)){$__nunya_results[]=['error'=>'La fonction '.$__nunya_name.'() n’existe pas.'];continue;}else{$__nunya_value=call_user_func_array($__nunya_name,$__nunya_call['args']);}$__nunya_results[]=['value'=>$__nunya_value,'type'=>get_debug_type($__nunya_value)];}catch(\\Throwable $__nunya_error){$__nunya_results[]=['error'=>get_class($__nunya_error).' : '.$__nunya_error->getMessage()];}}echo "\\n<<<NUNYA-${token}>>>",json_encode($__nunya_results,JSON_UNESCAPED_UNICODE|JSON_PRESERVE_ZERO_FRACTION|JSON_PARTIAL_OUTPUT_ON_ERROR);`;
}

const readable=text=>text.replaceAll(SCRIPT_NAME,'ton script');

export function fatal(output){
 const match=output.match(/\n?(?:PHP )?(Parse error|Fatal error): ([\s\S]*?) in php-wasm run script(?: on line |:)(\d+)/);
 if(!match)return null;
 const [,kind,message,line]=match,uncaught=message.match(/^Uncaught ([A-Za-z_\\]+): ([\s\S]*)$/);
 const error=kind==='Parse error'?'ParseError':uncaught?uncaught[1].split('\\').pop():'FatalError';
 return {before:output.slice(0,match.index),error,detail:readable((uncaught?uncaught[2]:message).trim())+' (ligne '+line+')'};
}

export function createRunner(php,newToken=()=>crypto.randomUUID().replaceAll('-','')){
 let output='';
 const collect=event=>{if(output.length<=MAX_OUTPUT*4)output+=event.detail.join('')};
 php.addEventListener('output',collect);php.addEventListener('error',collect);
 return async function runPhpCase(code,test={}){
  const calls=Array.isArray(test.calls)?test.calls:[],token=newToken(),marker='\n<<<NUNYA-'+token+'>>>';
  let script;
  try{script=buildScript(code,calls,token)}catch(error){return {output:'',error:'Script',detail:error.message}}
  await php.refresh();output='';php.buffers.stdin.length=0;
  const inputs=Array.isArray(test.inputs)?test.inputs:[];
  if(inputs.length)php.inputString(inputs.map(String).join('\n')+'\n');
  let exit;
  try{exit=await php.run(script)}catch(error){return {output:readable(output).slice(0,MAX_OUTPUT),error:'FatalError',detail:String(error?.message||error)}}
  php.flush?.();
  const at=output.lastIndexOf(marker),learner=at<0?output:output.slice(0,at),stopped=fatal(learner)||(at<0&&calls.length?fatal(output):null);
  if(learner.length>MAX_OUTPUT)return {output:readable(learner.slice(0,MAX_OUTPUT)),error:'RangeError',detail:'L’affichage dépasse 16 000 caractères.'};
  if(stopped)return {output:readable(stopped.before),error:stopped.error,detail:stopped.detail};
  if(exit!==0&&at<0)return {output:readable(learner),error:'FatalError',detail:'Le script s’est arrêté avec le code '+exit+'.'};
  if(!calls.length)return {output:readable(learner),checks:[],assertions_passed:true};
  let values;
  try{values=JSON.parse(output.slice(at+marker.length))}catch{return {output:readable(learner),error:'FatalError',detail:'Les vérifications n’ont pas pu lire le résultat du script.'}}
  const checks=calls.map((call,index)=>{const got=values[index]||{error:'Résultat absent.'},label=call.name[0]==='$'?call.name:call.name+'('+(call.args||[]).map(a=>JSON.stringify(a)).join(', ')+')',expected=JSON.stringify(call.expected)+(call.expected_type?' ('+call.expected_type+')':'');
   if(got.error)return {name:label,passed:false,actual:got.error,expected};
   const passed=same(got.value,call.expected,call.tolerance||0)&&(!call.expected_type||got.type===call.expected_type);
   return {name:label,passed,actual:(JSON.stringify(got.value)??'null').slice(0,500)+(call.expected_type?' ('+got.type+')':''),expected}});
  return {output:readable(learner),checks,assertions_passed:checks.every(c=>c.passed)};
 };
}
