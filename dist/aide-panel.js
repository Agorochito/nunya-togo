/* Nunya Aide · panneau de discussion, chargé seulement au premier clic (hors du bundle principal, pour garder le site léger).
   Session anonyme Supabase : aucune donnée personnelle demandée. Les conversations restent en mémoire et disparaissent à la fermeture de la page. */
// Projet Supabase de Nunya : la clé publiable est faite pour être visible dans le site.
const AIDE={url:'https://lgriswbmwiqfmwfcitsk.supabase.co',key:'sb_publishable_-BxG-2Zh61QJHuBLleP94w_iyIkmilP',fn:'nunya-aide',sessionKey:'nunya-aide-session',perDay:15};
export function init(api){
 const {state,persist,esc,$,icon,live}=api;
 /* Contexte envoyé avec la question : la leçon ouverte (Découverte ou Python), sinon le texte d’une page de contenu. Jamais les pages personnelles. */
 const clip=(s,n)=>String(s||'').replace(/\s+/g,' ').trim().slice(0,n);
 function getContext(){
  const {route,disc,mode,lesson,exercise}=live();
  if(route.kind==='apprendre'&&route.id==='decouverte'&&route.stepId&&disc[route.stepId]){
   const l=disc[route.stepId];
   return {key:'dec:'+l.id,label:'Leçon · '+l.title_fr,kind:'decouverte',course:'Découverte du numérique',title:l.title_fr,text:clip([l.idea_fr,l.analogy_fr,...l.body_fr].join('\n\n'),2800)};
  }
  if(route.kind==='apprendre'&&route.id==='python-bases'&&route.stepId&&mode!=='validation'){
   const l=lesson();if(l){const ex=l.exercises?.[exercise];
    return {key:'py:'+l.id,label:'Leçon · '+l.title_fr,kind:'python',course:'Python : les bases',title:l.title_fr,text:clip([l.idea_fr,...(l.body_fr||[])].join('\n\n'),2800),exercise:ex?clip(ex.title_fr+' : '+ex.instruction_fr,780):'',codeAvailable:!!ex};}
  }
  if(['accueil','profil','portfolio','progression','revision','hors-ligne','confidentialite','aide','recherche','apprendre'].includes(route.kind))return null;
  const main=$('#main'),title=main?.querySelector('h1')?.textContent||document.title;
  return {key:'page:'+location.hash,label:'Page · '+clip(title,70),kind:'page',title:clip(title,150),text:clip(main?.innerText||'',2000)};
 }
 function getCode(ctx){
  if(ctx?.kind!=='python'||!ctx.codeAvailable)return null;
  const {lesson,exercise,work,editor}=live(),ex=lesson()?.exercises?.[exercise];if(!ex)return null;
  const w=work(ex),code=String((editor?editor.get():w.code)||'');return {code:code.trim()?code.slice(0,2400):'',attempts:w.attempts};
 }
 let messages=[],contextKey=null,context=null,useContext=true,busy=false,remaining=null,opener=null,draft='';

 /* ---------- Session anonyme Supabase (sans bibliothèque externe) ---------- */
 const readSession=()=>{try{const s=JSON.parse(localStorage.getItem(AIDE.sessionKey)||'null');return s&&s.access_token&&s.refresh_token?s:null}catch{return null}};
 const saveSession=s=>{try{s?localStorage.setItem(AIDE.sessionKey,JSON.stringify({access_token:s.access_token,refresh_token:s.refresh_token,expires_at:s.expires_at||Math.floor(Date.now()/1000)+(s.expires_in||3600)})):localStorage.removeItem(AIDE.sessionKey)}catch{}};
 class AideError extends Error{constructor(code,left){super(code);this.code=code;this.remaining=left}}
 async function auth(path,body){
  const r=await fetch(AIDE.url+'/auth/v1/'+path,{method:'POST',headers:{apikey:AIDE.key,'Content-Type':'application/json'},body:JSON.stringify(body)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok){if(/anonymous/i.test(data.error_code||data.code||data.msg||data.message||''))throw new AideError('not_configured');if(r.status===429)throw new AideError('auth_rate');throw new AideError('unknown')}
  return data;
 }
 async function session(){
  let s=readSession();
  if(s&&s.expires_at-60>Date.now()/1000)return s;
  if(s){try{s=await auth('token?grant_type=refresh_token',{refresh_token:s.refresh_token});saveSession(s);return readSession()}catch(e){if(e.code==='not_configured')throw e}}
  s=await auth('signup',{data:{}});saveSession(s);return readSession();
 }
 async function call(payload,retry=true){
  const s=await session();
  const r=await fetch(`${AIDE.url}/functions/v1/${AIDE.fn}`,{method:'POST',headers:{Authorization:'Bearer '+s.access_token,apikey:AIDE.key,'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const data=await r.json().catch(()=>({}));
  if(r.status===401&&retry){saveSession(null);return call(payload,false)}
  if(!r.ok)throw new AideError(data.error||(r.status===404?'not_configured':'unknown'),data.remaining);
  return data;
 }

 /* ---------- Mise en forme des réponses : markdown simple, jamais de HTML venant du modèle ---------- */
 const inline=s=>esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 function markdown(text){
  let html='';
  String(text).split(/```[\w-]*\n?([\s\S]*?)(?:```|$)/g).forEach((part,i)=>{
   if(i%2){html+=`<pre><code>${esc(part.replace(/\n$/,''))}</code></pre>`;return}
   for(const block of part.split(/\n{2,}/)){
    const lines=block.split('\n').filter(x=>x.trim());if(!lines.length)continue;
    if(lines.every(x=>/^\s*[-*•]\s+/.test(x)))html+='<ul>'+lines.map(x=>`<li>${inline(x.replace(/^\s*[-*•]\s+/,''))}</li>`).join('')+'</ul>';
    else if(lines.every(x=>/^\s*\d+[.)]\s+/.test(x)))html+='<ol>'+lines.map(x=>`<li>${inline(x.replace(/^\s*\d+[.)]\s+/,''))}</li>`).join('')+'</ol>';
    else html+=`<p>${lines.map(x=>inline(x.replace(/^#+\s*/,''))).join('<br>')}</p>`;
   }
  });
  return html;
 }

 /* ---------- Panneau ---------- */
 const ERRORS={
  offline:'Pas de connexion : Nunya Aide a besoin d’Internet. Les explications, indices et mots nouveaux de la leçon restent disponibles.',
  not_configured:'Nunya Aide n’est pas encore activé sur ce site. Les explications et indices de la leçon restent disponibles.',
  quota_user:`Tu as posé tes ${AIDE.perDay} questions d’aujourd’hui. Reviens demain ! En attendant, relis le récapitulatif et les mots nouveaux de la leçon.`,
  quota_global:'Beaucoup d’élèves ont utilisé Nunya Aide aujourd’hui : la limite du jour est atteinte. Réessaie demain.',
  provider_unavailable:'Nunya Aide ne répond pas pour le moment. Ta question n’a pas été décomptée : réessaie dans quelques minutes.',
  auth_rate:'Trop de connexions depuis ce réseau. Réessaie dans un moment.',
  unknown:'Nunya Aide n’a pas pu répondre. Réessaie dans un moment.'};
 function suggestions(ctx){
  if(ctx?.kind==='python'&&ctx.exercise)return [['Pourquoi mon code ne passe pas ?',true],['Donne-moi un indice, pas la solution.',true],['Explique-moi cette leçon autrement.',true]];
  if(ctx?.kind==='python'||ctx?.kind==='decouverte')return [['Explique-moi cette leçon autrement.',true],['Donne-moi un autre exemple.',true],['Que veut dire le mot « … » ?',false]];
  if(ctx)return [['Résume-moi cette page simplement.',true],['Je ne comprends pas ce passage : « … »',false]];
  return [['Comment bien réviser un cours ?',true],['Par où commencer pour apprendre à coder ?',true],['Explique-moi une notion : …',false]];
 }
 function dialog(){
  let d=$('#aide-dialog');if(d)return d;
  d=document.createElement('dialog');d.id='aide-dialog';d.className='aide-sheet';d.setAttribute('aria-labelledby','aide-title');
  d.innerHTML=`<header class="aide-head"><span class="aide-logo">${icon}</span><div><h2 id="aide-title">Nunya Aide</h2><p>IA open source · elle peut se tromper</p></div><button type="button" class="aide-close" data-aide="close" aria-label="Fermer Nunya Aide">✕</button></header><div class="aide-body"></div>`;
  document.body.append(d);
  d.addEventListener('close',()=>{opener?.focus?.({preventScroll:true});opener=null});
  d.addEventListener('click',e=>{if(e.target===d)d.close()});
  return d;
 }
 function renderBody(){
  const d=dialog(),body=d.querySelector('.aide-body');
  if(!state.aide.consent){body.innerHTML=`<section class="aide-consent"><h3>Avant de commencer</h3><ul><li>Nunya Aide t’explique les leçons avec tes mots à toi. Pour un exercice, il donne des indices, pas la solution.</li><li>Ta question et, si tu le veux, l’extrait de la leçon ou ton code sont envoyés à un modèle d’IA open source hébergé par Groq. Nunya n’enregistre pas tes questions.</li><li>Ne partage jamais ton nom complet, ton adresse, ton numéro ou un mot de passe.</li><li>L’IA peut se tromper : vérifie avec la leçon ou demande à ton professeur.</li><li>${AIDE.perDay} questions par jour et par appareil.</li></ul><button type="button" class="primary" data-aide="consent">J’ai compris, commencer</button></section>`;return}
  const ctx=context,code=useContext?getCode(ctx):null;
  body.innerHTML=`${ctx?`<div class="aide-context"><span>${useContext?'Nunya Aide voit':'Sans contexte :'} <strong>${esc(ctx.label)}</strong>${code&&code.code?' et ton code':''}</span><button type="button" class="text-button" data-aide="toggle-context">${useContext?'Ne pas l’envoyer':'L’envoyer'}</button></div>`:''}<div class="aide-log" role="log" aria-live="polite" aria-busy="${busy}">${messages.length?'':`<p class="aide-empty">${ctx?'Un passage n’est pas clair ? Pose ta question, même simple.':'Pose une question sur un cours, la programmation, le numérique ou ton orientation.'}</p>`}${messages.map(m=>`<div class="aide-msg aide-${m.role}">${m.role==='user'||m.error?`<p>${esc(m.content)}</p>`:markdown(m.content)}</div>`).join('')}${busy?'<div class="aide-msg aide-assistant aide-typing"><p>Nunya Aide réfléchit…</p></div>':''}</div>${!messages.length&&!busy?`<div class="aide-suggestions">${suggestions(useContext?ctx:null).map(([t,send])=>`<button type="button" data-aide="suggest" data-send="${send}">${esc(t)}</button>`).join('')}</div>`:''}<form class="aide-form" data-aide-form><label class="curr-sr" for="aide-input">Ta question</label><textarea id="aide-input" rows="2" maxlength="800" placeholder="Écris ta question…" ${busy?'disabled':''}>${esc(draft)}</textarea><button type="submit" class="primary" ${busy?'disabled':''}>Envoyer</button></form><p class="aide-foot">${remaining!==null?`Il te reste ${remaining} question${remaining>1?'s':''} aujourd’hui.`:`${AIDE.perDay} questions par jour.`} Ne partage pas d’informations personnelles.</p>`;
  const log=body.querySelector('.aide-log');log.scrollTop=log.scrollHeight;
 }
 // Questions préparées par les boutons des leçons.
 const presetText=p=>p==='hint'?'Donne-moi un indice pour cet exercice, pas la solution.':p.startsWith('q:')?`Je bloque sur cette question : « ${p.slice(2)} ». Aide-moi à réfléchir, sans me donner la réponse.`:p;
 function open(from,preset){
  preset=presetText(preset||'');
  const ctx=getContext(),key=ctx?.key||'general';
  if(key!==contextKey){messages=[];contextKey=key;useContext=true;draft=''}
  context=ctx;opener=from||document.activeElement;if(preset)draft=preset;
  const d=dialog();renderBody();if(!d.open)d.showModal();
  requestAnimationFrame(()=>{const t=$('#aide-input');if(t){t.focus();t.setSelectionRange(t.value.length,t.value.length)}else d.querySelector('[data-aide="consent"]')?.focus()});
 }
 async function send(question){
  question=String(question||'').trim();if(question.length<2||busy)return;
  if(!navigator.onLine){messages.push({role:'user',content:question},{role:'assistant',content:ERRORS.offline,error:true});draft='';renderBody();return}
  const history=messages.filter(m=>!m.error).slice(-6).map(({role,content})=>({role,content:content.slice(0,1500)}));
  messages.push({role:'user',content:question});draft='';busy=true;renderBody();
  const ctx=useContext?context:null,code=useContext?getCode(ctx):null;
  const payload={mode:ctx&&ctx.kind!=='page'?'lesson':'general',question,history,context:ctx?{kind:ctx.kind,course:ctx.course,title:ctx.title,text:ctx.text,exercise:ctx.exercise,code:code?.code||'',attempts:code?code.attempts:undefined}:undefined};
  try{const data=await call(payload);messages.push({role:'assistant',content:String(data.answer||'')});if(Number.isInteger(data.remaining))remaining=data.remaining}
  catch(e){const c=e instanceof AideError?e.code:(navigator.onLine?'unknown':'offline');messages.push({role:'assistant',content:ERRORS[c]||ERRORS.unknown,error:true});if(Number.isInteger(e?.remaining))remaining=e.remaining;if(c==='quota_user')remaining=0}
  busy=false;renderBody();
  if($('#aide-dialog')?.open)requestAnimationFrame(()=>$('#aide-input')?.focus({preventScroll:true}));
 }

 /* ---------- Événements ---------- */
 document.addEventListener('click',e=>{
  const b=e.target.closest?.('[data-aide]');if(!b)return;
  const action=b.dataset.aide;
  if(action==='close'){$('#aide-dialog')?.close();return}
  if(action==='consent'){state.aide.consent=true;persist();renderBody();requestAnimationFrame(()=>$('#aide-input')?.focus());return}
  if(action==='toggle-context'){useContext=!useContext;renderBody();return}
  if(action==='suggest'){const t=b.textContent;if(b.dataset.send==='true')send(t);else{draft=t;renderBody();const i=$('#aide-input');if(i){const at=t.indexOf('…');i.focus();i.setSelectionRange(at,at+1)}}}
 });
 document.addEventListener('submit',e=>{if(!e.target.matches?.('[data-aide-form]'))return;e.preventDefault();send($('#aide-input')?.value)});
 document.addEventListener('input',e=>{if(e.target.id==='aide-input')draft=e.target.value});
 document.addEventListener('keydown',e=>{if(e.target.id==='aide-input'&&e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();send(e.target.value)}});
 return {open};
}
