/* Niveau 0 · « Découverte du numérique » : leçons courtes, 4 activités corrigées, réponse libre gardée sur l’appareil. Aucun compte, aucune IA. */
let discIndex=null,discLessons={},discError=false;
// Vues et activités : runtime/discovery-views.js, chargé à la première ouverture du cours et mis en cache par le service worker.
let discViews=null,discViewsPromise=null;
function discViewsLoad(){return discViewsPromise||(discViewsPromise=import(new URL('./runtime/discovery-views.js',document.baseURI).href).then(m=>{discViews=m.init({state:()=>state,route:()=>aRoute,index:()=>discIndex,lessons:discLessons,ensure:()=>discEnsure(),render:()=>render(),esc,$,toast,aPersist,currProse,discOpenLessons,discNext,discUnlocked,discLessonRoute,discProgress})}).catch(e=>{discViewsPromise=null;throw e}))}
state.discovery=discSafeState(state.discovery);

function discSafeValue(v){
 if(typeof v==='boolean'||Number.isInteger(v))return v;
 if(Array.isArray(v))return v.slice(0,8).map(x=>Number.isInteger(x)?x:-1);
 return null;
}
function discSafeState(raw){
 const s={answers:{},completed:{},reflections:{},models:{},last:null,saved:false};
 if(!raw||typeof raw!=='object')return s;
 const lessonId=id=>/^dec-m[1-4]-\d{2}$/.test(id),activityId=id=>/^dec-m[1-4]-\d{2}-a\d$/.test(id);
 for(const [id,v] of Object.entries(raw.answers||{}).slice(0,400))if(activityId(id)&&v&&typeof v==='object'){const checked=v.checked===true;s.answers[id]={value:discSafeValue(v.value),checked,correct:checked&&v.correct===true}}
 for(const [id,v] of Object.entries(raw.completed||{}).slice(0,100))if(lessonId(id)&&v===true)s.completed[id]=true;
 for(const [id,v] of Object.entries(raw.reflections||{}).slice(0,100))if(lessonId(id)&&typeof v==='string')s.reflections[id]=v.slice(0,2000);
 for(const [id,v] of Object.entries(raw.models||{}).slice(0,100))if(lessonId(id)&&v===true)s.models[id]=true;
 s.last=typeof raw.last==='string'&&lessonId(raw.last)?raw.last:null;
 s.saved=raw.saved===true;
 return s;
}

/* ---------- Données ---------- */
const discLessonRoute=id=>'#/apprendre/decouverte/'+id.split('-')[1]+'/'+id;
const discOpenLessons=()=>discIndex?.lessons||[];
function discNext(){return discOpenLessons().find(l=>!state.discovery.completed[l.id])?.id||discOpenLessons()[0]?.id||'dec-m1-01'}
function discUnlocked(id){return discOpenLessons().some(lesson=>lesson.id===id)}
async function discEnsure(stepId){
 if(!discIndex)discIndex=await aFetch('./data/decouverte/index.json');
 if(stepId&&discIndex.lessons.some(l=>l.id===stepId)&&!discLessons[stepId])discLessons[stepId]=await aFetch('./data/decouverte/'+stepId+'.json');
}


/* ---------- Vues ---------- */
function discProgress(){const rows=discOpenLessons(),done=rows.filter(l=>state.discovery.completed[l.id]).length;return `<div class="a-progress" role="progressbar" aria-label="Progression Découverte du numérique" aria-valuemin="0" aria-valuemax="${rows.length}" aria-valuenow="${done}"><span style="width:${rows.length?done/rows.length*100:0}%"></span></div><small>${done}/${rows.length} leçons terminées</small>`}
function discView(){
 if(discError&&!(discIndex&&discViews))return `<section class="a-empty"><h1>Le cours ne s’ouvre pas</h1><p>Il faut une connexion pour l’ouvrir la première fois. Une fois ouvert, « Emporter le cours » l’enregistre sur cet appareil.</p><a class="primary" href="#/apprendre/decouverte">Réessayer</a></section>`;
 if(!discIndex||!discViews)return '<p role="status">Ouverture du cours…</p>';
 return discViews.view();
}
function discHubCard(){
 const rows=discOpenLessons(),done=rows.filter(l=>state.discovery.completed[l.id]).length,started=done>0||!!state.discovery.last;
 return `<section class="curr-entry"><div><span class="eyebrow">NIVEAU 0 · AUCUN PRÉREQUIS</span><h2>Découverte du numérique</h2><p>Comprends ton téléphone et ton ordinateur avant d’écrire du code. ${rows.length||20} leçons de 8 à 10 minutes en 4 modules : appareils, Internet, sécurité, logique. Sans code à écrire.${rows.length&&done?` ${done}/${rows.length} leçons terminées.`:''}</p></div><div><a class="primary" href="#/apprendre/decouverte">Voir le programme →</a><a class="text-button" href="${discLessonRoute(started?discNext():'dec-m1-01')}">${started?'Reprendre ma leçon':'Commencer la première leçon'} →</a></div></section>`;
}

/* ---------- Branchements sur le programme existant ---------- */
const discCanonicalPrevious=currCanonical;currCanonical=function(hash){const h=discCanonicalPrevious(hash);return /^#\/apprendre\/(ordinateur|logique)\/?$/.test(h)?'#/apprendre/decouverte':h};
const discResolvePrevious=aResolve;aResolve=async function(){
 const pending=discResolvePrevious(),r=academyRoute(location.hash);
 if(r.kind==='apprendre'&&(!r.id||r.id==='decouverte')){
  try{await Promise.all([discEnsure(r.id==='decouverte'?r.stepId:null),r.id==='decouverte'&&discViewsLoad()]);discError=false;if(r.stepId&&discLessons[r.stepId]&&discUnlocked(r.stepId)){state.discovery.last=r.stepId;aPersist()}}catch{discError=true}
  await pending;
  if(aRoute.kind==='apprendre'&&aRoute.id===r.id&&aRoute.stepId===r.stepId)render();
  return;
 }
 return pending;
};
const discViewPrevious=currView;currView=function(){return aRoute.kind==='apprendre'&&aRoute.id==='decouverte'?discView():discViewPrevious()};
const discHubPrevious=currHub;currHub=function(){return discHubPrevious().replace('</header>','</header>'+discHubCard())};
const discProgressPrevious=progressView;progressView=function(){if(!discIndex&&state.discovery.last&&!window.discProgressLoading){window.discProgressLoading=true;discEnsure().then(()=>{if(aRoute.kind==='progression')render()}).catch(()=>{})}const rows=discOpenLessons(),done=rows.filter(l=>state.discovery.completed[l.id]).length;return (done||state.discovery.last?`<section class="panel"><h2>Découverte du numérique</h2>${discProgress()}<a class="primary" href="${discLessonRoute(discNext())}">Reprendre ma leçon →</a></section>`:'')+discProgressPrevious()};
