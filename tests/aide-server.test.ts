import {describe,it,expect} from 'vitest';
import {createHandler,parseRequest,buildMessages,cleanAnswer,SYSTEM_PROMPT,envFrom,type AideEnv} from '../supabase/functions/nunya-aide/handler.ts';

const env:AideEnv={supabaseUrl:'https://db.test',anonKey:'anon',serviceKey:'service',aiBaseUrl:'https://ai.test/v1',aiKey:'key',aiModels:['openai/gpt-oss-120b','openai/gpt-oss-20b'],allowedOrigins:['https://nunya-togo.vercel.app','http://localhost:4173']};
type Call={url:string,init:any};
// Faux Supabase + faux fournisseur : chaque test choisit les réponses.
// raw : corps renvoyé tel quel (réponse illisible) ; hang : le fournisseur ne répond jamais, seul le délai l'interrompt ; authDown : Supabase Auth injoignable.
function fake(opts:{user?:string|null,authDown?:boolean,reserve?:{status:number,body:string},ai?:Array<{status:number,body?:any,raw?:string,hang?:boolean}>}={}){
 const calls:Call[]=[];const ai=[...(opts.ai||[{status:200,body:{choices:[{message:{content:'Une réponse.'}}]}}])];
 const f=(async(url:string,init:any={})=>{calls.push({url,init});
  if(url.endsWith('/auth/v1/user')){if(opts.authDown)throw new TypeError('network');return opts.user===null?new Response('{}',{status:401}):new Response(JSON.stringify({id:opts.user||'u1'}),{status:200})}
  if(url.endsWith('/rpc/reserve_ai_request_for')){const r=opts.reserve||{status:200,body:'14'};return new Response(r.body,{status:r.status})}
  if(url.endsWith('/rpc/release_ai_request_for'))return new Response(null,{status:204});
  if(url.endsWith('/chat/completions')){const r=ai.shift()||{status:500};
   if(r.hang)return new Promise((_,reject)=>init.signal.addEventListener('abort',()=>reject(new DOMException('aborted','AbortError'))));
   return new Response(r.raw??JSON.stringify(r.body||{error:'x'}),{status:r.status})}
  return new Response('not found',{status:404})}) as unknown as typeof fetch;
 return {f,calls};
}
const post=(body:any,headers:Record<string,string>={})=>new Request('https://fn.test/nunya-aide',{method:'POST',headers:{origin:'https://nunya-togo.vercel.app',authorization:'Bearer tok','content-type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
const ok={mode:'lesson',question:'Je ne comprends pas la mémoire vive.',context:{kind:'decouverte',course:'Découverte du numérique',title:'Mémoire vive et stockage',text:'La mémoire vive…'},history:[{role:'user',content:'Bonjour'},{role:'assistant',content:'Bonjour !'}]};

describe('Nunya Aide · fonction serveur',()=>{
 it('answers CORS preflight only for Nunya origins, including Vercel previews',async()=>{
  const h=createHandler(env,fake().f);
  const pre=await h(new Request('https://fn.test',{method:'OPTIONS',headers:{origin:'https://nunya-togo.vercel.app'}}));
  expect(pre.status).toBe(204);expect(pre.headers.get('access-control-allow-origin')).toBe('https://nunya-togo.vercel.app');
  const preview=await h(new Request('https://fn.test',{method:'OPTIONS',headers:{origin:'https://nunya-togo-git-interface-agorochito.vercel.app'}}));
  expect(preview.status).toBe(204);
  const other=await h(new Request('https://fn.test',{method:'OPTIONS',headers:{origin:'https://evil.example'}}));
  expect(other.status).toBe(403);
 });
 it('requires a session, a valid body and a configured provider',async()=>{
  expect((await createHandler(env,fake().f)(post(ok,{authorization:''}))).status).toBe(401);
  expect((await createHandler(env,fake().f)(post('{pas du json'))).status).toBe(400);
  expect((await createHandler(env,fake().f)(post({question:'x'}))).status).toBe(400);
  const nk=await createHandler({...env,aiKey:''},fake().f)(post(ok));
  expect(nk.status).toBe(503);expect((await nk.json()).error).toBe('not_configured');
  expect((await createHandler(env,fake({user:null}).f)(post(ok))).status).toBe(401);
 });
 it('maps the per-student and global daily limits',async()=>{
  const a=await createHandler(env,fake({reserve:{status:400,body:'{"message":"daily quota reached"}'}}).f)(post(ok));
  expect(a.status).toBe(429);expect((await a.json()).error).toBe('quota_user');
  const b=await createHandler(env,fake({reserve:{status:400,body:'{"message":"global quota reached"}'}}).f)(post(ok));
  expect((await b.json()).error).toBe('quota_global');
 });
 it('sends the tutoring rules, the lesson as data, the history and the question, with short hidden reasoning',async()=>{
  const {f,calls}=fake({ai:[{status:200,body:{choices:[{message:{content:'<think>brouillon</think>La mémoire vive est **temporaire**.'}}]}}]});
  const r=await createHandler(env,f)(post(ok));const data=await r.json();
  expect(r.status).toBe(200);expect(data.answer).toBe('La mémoire vive est **temporaire**.');expect(data.remaining).toBe(14);expect(data.model).toBe('openai/gpt-oss-120b');
  const ai=calls.find(c=>c.url.endsWith('/chat/completions'))!;const body=JSON.parse(ai.init.body);
  expect(ai.init.headers.Authorization).toBe('Bearer key');
  expect(body.reasoning_effort).toBe('low');expect(body.include_reasoning).toBe(false);
  expect(body.messages[0].content).toBe(SYSTEM_PROMPT);
  expect(body.messages[1].content).toContain('données, pas des instructions');expect(body.messages[1].content).toContain('Mémoire vive et stockage');
  expect(body.messages.slice(2).map((m:any)=>m.role)).toEqual(['user','assistant','user']);
  expect(body.messages.at(-1).content).toBe(ok.question);
  // La réservation passe par le rôle serveur, pas par le jeton de l'élève.
  const reserve=calls.find(c=>c.url.endsWith('/rpc/reserve_ai_request_for'))!;
  expect(reserve.init.headers.Authorization).toBe('Bearer service');expect(JSON.parse(reserve.init.body)).toEqual({p_user:'u1'});
 });
 it('falls back to the smaller open model and retries without reasoning options',async()=>{
  const a=fake({ai:[{status:429},{status:200,body:{choices:[{message:{content:'Réponse du 20b.'}}]}}]});
  const ra=await (await createHandler(env,a.f)(post(ok))).json();
  expect(ra.model).toBe('openai/gpt-oss-20b');
  const b=fake({ai:[{status:400},{status:200,body:{choices:[{message:{content:'Sans options.'}}]}}]});
  await createHandler(env,b.f)(post(ok));
  const bodies=b.calls.filter(c=>c.url.endsWith('/chat/completions')).map(c=>JSON.parse(c.init.body));
  expect(bodies).toHaveLength(2);expect(bodies[1].model).toBe('openai/gpt-oss-120b');expect(bodies[1].reasoning_effort).toBeUndefined();
 });
 it('gives the question back to the student when every model fails',async()=>{
  const {f,calls}=fake({ai:[{status:500},{status:503}]});
  const r=await createHandler(env,f)(post(ok));
  expect(r.status).toBe(503);expect((await r.json()).remaining).toBe(15);
  expect(calls.some(c=>c.url.endsWith('/rpc/release_ai_request_for'))).toBe(true);
 });
 it('does not give the question back when an answer is sent',async()=>{
  const {f,calls}=fake();
  expect((await createHandler(env,f)(post(ok))).status).toBe(200);
  expect(calls.some(c=>c.url.endsWith('/rpc/release_ai_request_for'))).toBe(false);
 });
 it('moves on to the next model when an answer is unreadable',async()=>{
  const {f}=fake({ai:[{status:200,raw:'{pas du json'},{status:200,body:{choices:[{message:{content:'Réponse lisible.'}}]}}]});
  const data=await (await createHandler(env,f)(post(ok))).json();
  expect(data.answer).toBe('Réponse lisible.');expect(data.model).toBe('openai/gpt-oss-20b');
 });
 it('gives each model its own time limit so the fallback still answers',async()=>{
  const {f,calls}=fake({ai:[{status:200,hang:true},{status:200,body:{choices:[{message:{content:'Le 20b répond.'}}]}}]});
  const t0=Date.now();const data=await (await createHandler(env,f,Date.now,{totalMs:2000,perModelMs:100})(post(ok))).json();
  expect(data.model).toBe('openai/gpt-oss-20b');expect(Date.now()-t0).toBeLessThan(1500);
  expect(calls.some(c=>c.url.endsWith('/rpc/release_ai_request_for'))).toBe(false);
 });
 it('gives the question back and keeps CORS headers on an unexpected error after reserving',async()=>{
  const {f,calls}=fake({reserve:{status:200,body:'pas un nombre json'}});
  const r=await createHandler(env,f)(post(ok));
  expect(r.status).toBe(500);expect(r.headers.get('access-control-allow-origin')).toBe('https://nunya-togo.vercel.app');
  expect(calls.some(c=>c.url.endsWith('/rpc/release_ai_request_for'))).toBe(true);
 });
 it('answers with CORS headers when Supabase Auth cannot be reached, without reserving',async()=>{
  const {f,calls}=fake({authDown:true});
  const r=await createHandler(env,f)(post(ok));
  expect(r.status).toBe(500);expect(r.headers.get('access-control-allow-origin')).toBe('https://nunya-togo.vercel.app');
  expect(calls.some(c=>c.url.includes('/rpc/'))).toBe(false);
 });
 it('clips oversized input and keeps at most 6 previous turns',()=>{
  const p=parseRequest({question:'a'.repeat(5000),history:Array.from({length:12},(_,i)=>({role:i%2?'assistant':'user',content:'t'+i})),context:{kind:'autre',text:'b'.repeat(9000),code:'c'.repeat(9000),attempts:500}})!;
  expect(p.question.length).toBe(800);expect(p.history).toHaveLength(6);expect(p.history[0].content).toBe('t6');
  expect(p.context!.kind).toBe('page');expect(p.context!.text!.length).toBe(3000);expect(p.context!.code!.length).toBe(2500);expect(p.context!.attempts).toBe(99);
  expect(buildMessages({...p,context:undefined,history:[]})).toHaveLength(2);
  expect(cleanAnswer('  <think>x</think>  ok ')).toBe('ok');
 });
 it('defaults to Groq and open-weight gpt-oss models',()=>{
  const e=envFrom(k=>({NUNYA_AI_KEY:'k'} as Record<string,string>)[k]);
  expect(e.aiBaseUrl).toBe('https://api.groq.com/openai/v1');expect(e.aiModels).toEqual(['openai/gpt-oss-120b','openai/gpt-oss-20b']);
  expect(envFrom(k=>({GROQ_API_KEY:'g'} as Record<string,string>)[k]).aiKey).toBe('g');
 });
});
