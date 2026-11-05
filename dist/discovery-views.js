/* Niveau 0 · « Découverte du numérique » : vues, activités et enregistrement hors ligne, chargés à la première ouverture du cours (hors du bundle principal).
   L’état, les données et les branchements restent dans discovery-course.js, qui passe à init() ce dont ce module a besoin. */
const DISC_CACHE='nunya-decouverte-v1';
let api,esc,$,toast,aPersist,currProse,discOpenLessons,discNext,discUnlocked,discLessonRoute,discProgress;
const D=()=>api.state().discovery;

/* ---------- Activités ---------- */
function discSeed(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
// Ordre de départ mélangé, toujours le même pour une activité, jamais déjà correct.
function discPermutation(seed,n){const order=[...Array(n).keys()];let h=discSeed(seed);for(let i=n-1;i>0;i--){h=Math.imul(h^(h>>>15),2246822507)>>>0;const j=h%(i+1);[order[i],order[j]]=[order[j],order[i]]}return order}
function discShuffled(a){const order=discPermutation(a.id,a.items_fr.length);if(order.every((x,i)=>x===i))order.push(order.shift());return order}
// Les choix d’un QCM s’affichent dans un ordre mélangé (toujours le même pour une question) : la bonne réponse n’est pas toujours au même rang.
const discRights=a=>[...new Set(a.pairs_fr.map(p=>p[1]))].sort((x,y)=>x.localeCompare(y,'fr'));
function discValue(a){
 const v=D().answers[a.id]?.value;
 if(a.type==='ordre')return Array.isArray(v)&&v.length===a.items_fr.length&&[...v].sort((x,y)=>x-y).every((x,i)=>x===i)?v:discShuffled(a);
 if(a.type==='associer')return Array.isArray(v)&&v.length===a.pairs_fr.length?v:a.pairs_fr.map(()=>-1);
 return v;
}
function discScore(a,v){
 if(a.type==='qcm'||a.type==='vraifaux')return {ok:v===a.answer,right:v===a.answer?1:0,total:1};
 if(a.type==='ordre'){const right=v.filter((x,i)=>x===i).length;return {ok:right===v.length,right,total:v.length}}
 const rights=discRights(a),right=a.pairs_fr.filter((p,i)=>rights[v[i]]===p[1]).length;
 return {ok:right===a.pairs_fr.length,right,total:a.pairs_fr.length};
}
function discAnswered(a,v){return a.type==='qcm'?Number.isInteger(v):a.type==='vraifaux'?typeof v==='boolean':a.type==='associer'?v.every(x=>x>=0):true}
function discSet(a,value){D().answers[a.id]={value,checked:false,correct:false};aPersist()}
function discFeedback(a){
 const s=D().answers[a.id];if(!s?.checked)return '';
 if(s.correct)return `<p class="curr-feedback" role="status"><strong>✓ Bien vu.</strong> ${esc(a.explanation_fr)}</p>`;
 const sc=discScore(a,discValue(a));
 const detail=a.type==='ordre'?`${sc.right} étape${sc.right>1?'s':''} sur ${sc.total} ${sc.right>1?'sont':'est'} à la bonne place.`:a.type==='associer'?`${sc.right} association${sc.right>1?'s':''} sur ${sc.total} ${sc.right>1?'sont justes':'est juste'}.`:'Ce n’est pas encore la bonne réponse.';
 return `<p class="curr-feedback disc-retry" role="status"><strong>Pas encore.</strong> ${detail} Relis l’explication et réessaie.</p>`;
}
function discActivity(a,i){
 const v=discValue(a),s=D().answers[a.id],done=s?.correct===true;
 let body='',hint='';
 if(a.type==='qcm'){hint='Choisis une réponse.';body=discPermutation(a.id+'-options',a.options_fr.length).map(j=>`<label><input type="radio" name="${a.id}" data-disc-answer="${a.id}" value="${j}" ${v===j?'checked':''}>${esc(a.options_fr[j])}</label>`).join('')}
 else if(a.type==='vraifaux'){hint='Lis l’affirmation, puis choisis.';body=`<p class="disc-statement">${esc(a.statement_fr)}</p>`+[[true,'Vrai'],[false,'Faux']].map(([x,t])=>`<label><input type="radio" name="${a.id}" data-disc-answer="${a.id}" value="${x}" ${v===x?'checked':''}>${t}</label>`).join('')}
 else if(a.type==='ordre'){hint='Remets les étapes dans l’ordre avec les flèches.';body=`<ol class="disc-order">${v.map((k,pos)=>`<li><span>${esc(a.items_fr[k])}</span><span class="disc-move"><button type="button" data-disc="up" data-id="${a.id}" data-pos="${pos}" aria-label="Monter : ${esc(a.items_fr[k])}" ${pos===0?'disabled':''}>↑</button><button type="button" data-disc="down" data-id="${a.id}" data-pos="${pos}" aria-label="Descendre : ${esc(a.items_fr[k])}" ${pos===v.length-1?'disabled':''}>↓</button></span></li>`).join('')}</ol>`}
 else{const rights=discRights(a);hint='Choisis la bonne correspondance pour chaque ligne.';body=`<div class="disc-match">${a.pairs_fr.map((p,r)=>`<label for="${a.id}-${r}"><span>${esc(p[0])}</span><select id="${a.id}-${r}" data-disc-match="${a.id}" data-row="${r}"><option value="-1" ${v[r]<0?'selected':''}>Choisir…</option>${rights.map((x,k)=>`<option value="${k}" ${v[r]===k?'selected':''}>${esc(x)}</option>`).join('')}</select></label>`).join('')}</div>`}
 return `<fieldset class="disc-activity" id="${a.id}"><legend>${done?'✓ ':''}Activité ${i+1}. ${esc(a.question_fr||'Vrai ou faux ?')}</legend><p class="disc-hint">${hint}</p>${body}<button type="button" class="secondary" data-disc="check" data-id="${a.id}">Vérifier</button>${discFeedback(a)}</fieldset>`;
}


function discLockSvg(){return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'}
function discMap(){
 const c=api.index(),rows=discOpenLessons(),started=rows.some(l=>D().completed[l.id])||!!D().last;
 const open=c.modules.filter(m=>m.status==='ouvert');
 return `<div class="a-crumb"><a href="#/apprendre">Apprendre à coder</a> / Découverte du numérique</div><header class="a-path-hero"><span class="eyebrow">${esc(c.level_fr.toUpperCase())} · ${rows.length} LEÇONS OUVERTES · ≈ ${discDuration(c.estimated_minutes)}</span><h1>${esc(c.title_fr)}</h1><p>${esc(c.summary_fr)}</p><span class="a-badge">Contenu original · relecture en cours</span><div class="a-hero-actions"><a class="primary" href="${discLessonRoute(started?discNext():rows[0].id)}">${started?'Continuer':'Commencer'}</a><button class="secondary" data-disc="download">${D().saved?'✓ Cours enregistré sur cet appareil':'Emporter le cours · lire hors ligne'}</button></div>${discProgress()}</header><div class="a-detail-columns"><section class="panel"><h2>Comment ça marche</h2><ul><li>Des leçons de 5 à 10 minutes, avec des mots expliqués simplement.</li><li>4 activités corrigées par leçon : tu peux réessayer autant de fois que tu veux.</li><li>« Explique avec tes mots » : ta réponse reste sur cet appareil.</li></ul></section><section class="panel"><h2>Tu dois savoir…</h2><p>Rien de particulier : lire et utiliser un téléphone suffit. Tu n’écris pas de code dans ce cours.</p><p>Tu sais déjà tout cela ? <a href="#/apprendre/python-bases">Commence Python : les bases →</a></p></section></div><p class="curr-unlock-note">Toutes les leçons sont consultables. Réussis les 4 activités d’une leçon pour valider tes acquis.</p>${c.modules.map((m,i)=>m.status==='ouvert'?`<section class="panel curr-module"><header><span class="a-stage-number">${i+1}</span><div><h2>${esc(m.title_fr)}</h2><p>${m.lesson_ids.length} leçons · ${esc(m.summary_fr)}</p></div></header><ol class="curr-outline">${m.lesson_ids.map((id,j)=>{const l=rows.find(x=>x.id===id),label=`<span>${esc(l.title_fr)}<small>${l.minutes} min · lire, observer, s’exercer</small></span>`;return discUnlocked(id)?`<li><a href="${discLessonRoute(id)}"><span>${D().completed[id]?'✓':j+1}</span>${label}<span>→</span></a></li>`:`<li><span class="curr-locked" aria-disabled="true"><span class="curr-lock">${discLockSvg()}<span class="curr-sr">Verrouillée : </span></span>${label}</span></li>`}).join('')}</ol></section>`:`<section class="panel curr-module disc-soon"><header><span class="a-stage-number">${i+1}</span><div><h2>${esc(m.title_fr)}</h2><p>En préparation · ${esc(m.summary_fr)}</p></div></header><ul class="disc-planned">${m.planned_fr.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></section>`).join('')}<section class="panel"><h2>Et après ?</h2><p>${open.length===c.modules.length?'':'Les modules suivants arrivent après relecture du module 1. '}Quand tu es prêt, passe à Python : les bases pour écrire tes premiers programmes.</p><a class="secondary" href="#/apprendre/python-bases">Python : les bases →</a></section>`;
}
function discLessonView(){
 const id=api.route().stepId,meta=discOpenLessons().find(l=>l.id===id);
 if(!meta)return `<section class="a-empty"><h1>Cette leçon est en préparation.</h1><p>Elle sera ouverte après la relecture du module 1.</p><a class="primary" href="#/apprendre/decouverte">Voir le programme →</a></section>`;
 if(!discUnlocked(id))return `<section class="a-empty"><h1>Leçon verrouillée</h1><p>Termine la leçon précédente pour ouvrir celle-ci : réussis ses 4 activités.</p><a class="primary" href="${discLessonRoute(discNext())}">Continuer le cours →</a></section>`;
 const l=api.lessons[id];if(!l)return '<p role="status">Ouverture de la leçon…</p>';
 const m=api.index().modules.find(x=>x.id===l.module),i=m.lesson_ids.indexOf(l.id),acts=l.activities,ok=acts.filter(a=>D().answers[a.id]?.correct).length;
 const nextId=m.lesson_ids[i+1],reflection=D().reflections[l.id]||'',canModel=reflection.trim().length>=20;
 const nextLink=D().completed[l.id]?(nextId?`<a class="primary" href="${discLessonRoute(nextId)}">Leçon suivante →</a>`:`<a class="primary" href="#/apprendre/decouverte">Module terminé · retour au cours →</a>`):`<button class="primary" disabled>${nextId?'Leçon suivante':'Terminer le module'} →</button>`;
 return `<nav class="a-crumb" aria-label="Où suis-je ?"><a href="#/apprendre">Apprendre</a> › <a href="#/apprendre/decouverte">Découverte du numérique</a> › Module ${l.module.slice(1)} · ${esc(m.title_fr)} › Leçon ${i+1} sur ${m.lesson_ids.length}</nav><header class="curr-lesson-head"><span class="eyebrow">NIVEAU 0 · ${l.minutes} MIN</span><h1>${esc(l.title_fr)}</h1><span class="a-badge">Contenu original · relecture en cours</span><details><summary>Plan du module · Où suis-je ?</summary><ol>${m.lesson_ids.map(x=>{const t=discOpenLessons().find(r=>r.id===x).title_fr;return `<li>${discUnlocked(x)?`<a href="${discLessonRoute(x)}" ${x===l.id?'aria-current="page"':''}>${D().completed[x]?'✓ ':''}${esc(t)}</a>`:`<span class="disc-muted">${esc(t)} · verrouillée</span>`}</li>`}).join('')}</ol></details></header><div class="disc-lesson"><article class="curr-reading panel"><h2>Objectif</h2><ul>${l.outcomes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><section class="curr-idea"><h2>L’idée en 30 secondes</h2><p>${esc(l.idea_fr)}</p><p>${esc(l.analogy_fr)}</p></section><h2>Explication</h2>${l.body_fr.map(x=>`<p>${currProse(x,l.glossary)}</p>`).join('')}<section class="curr-example"><h2>Exemple guidé : ${esc(l.example.title_fr)}</h2><ol>${l.example.steps_fr.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section><section id="disc-activities"><h2>À toi de jouer · ${acts.length} activités</h2><p>Réussis les ${acts.length} activités pour valider cette leçon. Les autres leçons restent consultables. Tu peux réessayer autant de fois que tu veux.</p>${acts.map(discActivity).join('')}</section><section class="disc-reflect"><h2>Explique avec tes mots</h2><p>${esc(l.reflect.question_fr)}</p><label for="disc-reflect">Ta réponse · gardée seulement sur cet appareil, personne ne la note</label><textarea id="disc-reflect" rows="5" maxlength="2000">${esc(reflection)}</textarea>${D().models[l.id]?`<div class="curr-idea disc-model"><strong>Une réponse possible</strong><p>${esc(l.reflect.model_fr)}</p><small>Ta réponse peut être différente et juste : compare les idées, pas les mots.</small></div>`:`<div class="curr-actions"><button type="button" class="text-button" data-disc="model" ${canModel?'':'disabled'}>Voir une réponse possible</button><small id="disc-model-note" ${canModel?'hidden':''}>Écris au moins une phrase, puis compare.</small></div>`}</section><section><h2>Récapitulatif</h2><ul>${l.recap_fr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><section id="curr-lexicon"><h2>Mots nouveaux</h2><dl>${l.glossary.map(g=>`<dt>${esc(g.term)}</dt><dd>${esc(g.definition)}</dd>`).join('')}</dl></section></article></div><footer class="curr-footer panel"><div><p>${D().completed[l.id]?'✓ Leçon terminée. Tu peux revenir sur les activités quand tu veux.':`${ok}/${acts.length} activités réussies. Réussis-les toutes pour continuer.`}</p></div>${nextLink}</footer>`;
}
function discDuration(min){return min<60?min+' MIN':Math.floor(min/60)+' H '+String(min%60).padStart(2,'0')}

async function discDownload(){void navigator.storage?.persist?.().catch(()=>false);
 try{
  await api.ensure();
  const cache=await caches.open(DISC_CACHE);
  await cache.addAll(['./data/decouverte/index.json',...api.index().lessons.map(l=>'./data/decouverte/'+l.id+'.json')]);
  D().saved=true;aPersist();api.render();toast('Cours enregistré : tu peux le lire et faire les activités sans connexion.');
 }catch{toast('Le cours ne peut pas être enregistré. Vérifie la connexion.')}
}
function discFocus(selector){requestAnimationFrame(()=>$(selector)?.focus({preventScroll:true}))}
function discMove(a,pos,step){
 const v=[...discValue(a)],to=pos+step;if(to<0||to>=v.length)return;
 [v[pos],v[to]]=[v[to],v[pos]];discSet(a,v);api.render();
 const same=`#${a.id} [data-disc="${step<0?'up':'down'}"][data-pos="${to}"]`;
 discFocus($(same)&&!$(same).disabled?same:`#${a.id} [data-disc="${step<0?'down':'up'}"][data-pos="${to}"]`);
}
const discActivityById=id=>api.lessons[api.route().stepId]?.activities.find(a=>a.id===id);

document.addEventListener('click',e=>{
 const b=e.target.closest('[data-disc]');if(!b)return;
 e.preventDefault();
 const action=b.dataset.disc,l=api.lessons[api.route().stepId];
 if(action==='download'){discDownload();return}
 if(!l||!discUnlocked(l.id))return;
 if(action==='model'){if((D().reflections[l.id]||'').trim().length<20)return;D().models[l.id]=true;aPersist();api.render();discFocus('.disc-model');return}
 const a=discActivityById(b.dataset.id);if(!a)return;
 if(action==='up'||action==='down'){discMove(a,Number(b.dataset.pos),action==='up'?-1:1);return}
 if(action==='check'){
  const v=discValue(a);
  if(!discAnswered(a,v)){toast(a.type==='associer'?'Choisis une réponse pour chaque ligne.':'Choisis d’abord une réponse.');return}
  const correct=discScore(a,v).ok;D().answers[a.id]={value:v,checked:true,correct};
  const wasDone=D().completed[l.id]===true;
  if(l.activities.every(x=>D().answers[x.id]?.correct))D().completed[l.id]=true;
  aPersist();api.render();
  if(!wasDone&&D().completed[l.id])toast('Leçon terminée : la suivante est ouverte.');
  discFocus(`#${a.id} [data-disc="check"]`);
 }
});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.dataset?.discAnswer){const a=discActivityById(t.dataset.discAnswer);if(a){discSet(a,a.type==='vraifaux'?t.value==='true':Number(t.value));discClearFeedback(a)}}
 if(t.dataset?.discMatch){const a=discActivityById(t.dataset.discMatch);if(a){const v=[...discValue(a)];v[Number(t.dataset.row)]=Number(t.value);discSet(a,v);discClearFeedback(a)}}
});
// Changer de réponse efface l’ancien verdict sans redessiner la page (le focus reste sur le choix).
function discClearFeedback(a){$(`#${a.id} .curr-feedback`)?.remove()}
document.addEventListener('input',e=>{
 if(e.target.id!=='disc-reflect'||!api.route().stepId)return;
 D().reflections[api.route().stepId]=e.target.value.slice(0,2000);
 clearTimeout(window.discSaveTimer);window.discSaveTimer=setTimeout(aPersist,400);
 const ready=e.target.value.trim().length>=20,button=$('[data-disc="model"]'),note=$('#disc-model-note');
 if(button)button.disabled=!ready;if(note)note.hidden=ready;
});

export function init(a){
 api=a;({esc,$,toast,aPersist,currProse,discOpenLessons,discNext,discUnlocked,discLessonRoute,discProgress}=a);
 return {view:()=>api.route().stepId?discLessonView():discMap()};
}
