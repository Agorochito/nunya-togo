const ROOT_ID='nunya-course-catalogue';
const FORM_ID='nunya-course-filters';
const filters={q:'',technology:'all'};
let activeApi=null;
let listening=false;

const TECHNOLOGIES={
  python:{label:'Python',mark:'Py',aliases:'python programmation console'},
  html:{label:'HTML',mark:'</>',aliases:'html web balisage structure'},
  css:{label:'CSS',mark:'{ }',aliases:'css web styles presentation'},
  javascript:{label:'JavaScript',mark:'JS',aliases:'javascript js programmation console'},
  dom:{label:'JavaScript · DOM',mark:'DOM',aliases:'javascript js dom interface evenements formulaires'},
  react:{label:'React',mark:'R',aliases:'react jsx composants etat interface javascript js'},
  http:{label:'HTTP et API',mark:'API',aliases:'http api fetch requete reponse client'},
  sql:{label:'SQL',mark:'SQL',aliases:'sql sqlite donnees base requete'},
  git:{label:'Git',mark:'Git',aliases:'git versions branches historique'}
};

function normalize(value){return String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/\s+/g,' ').trim();}
function technology(course){
  const key=Object.hasOwn(TECHNOLOGIES,course.runtime)?course.runtime:course.language;
  return {key:String(key||'autres'),...(TECHNOLOGIES[key]||{label:course.technology_fr||course.language||'Autres outils',mark:'<>',aliases:''})};
}
function writtenCourses(catalogue){return (catalogue.courses||[]).filter(c=>c?.id&&Array.isArray(c.lessons)&&c.lessons.length>0);}
function searchText(course){
  const tech=technology(course);
  return normalize([course.title_fr,course.summary_fr,course.language,tech.label,tech.aliases,...(course.outcomes||[]),...(course.lessons||[]).flatMap(l=>[l.title_fr,...(l.tags||[])])].join(' '));
}
function matches(text,q){return normalize(q).split(' ').filter(Boolean).every(word=>text.includes(word==='js'?'javascript':word));}
function quantity(value,one,many=one+'s'){return `${value} ${value===1?one:many}`;}
function exerciseCount(course){return Number.isInteger(course.exercise_count)&&course.exercise_count>=0?course.exercise_count:null;}
function minutes(course){
  if(Number.isFinite(course.estimated_minutes)&&course.estimated_minutes>0)return Math.round(course.estimated_minutes);
  return course.lessons.every(l=>Number.isFinite(l.minutes)&&l.minutes>0)?course.lessons.reduce((total,l)=>total+l.minutes,0):null;
}
function duration(course){const total=minutes(course);if(total===null)return 'Durée indicative à préciser';const h=Math.floor(total/60),m=total%60;return `Durée indicative · ${h?`${h} h${m?' '+String(m).padStart(2,'0'):''}`:m+' min'}`;}
function completed(course,state){return course.lessons.filter(l=>state.curriculum?.completed?.[l.id]).length;}
function started(course,state){const saved=state.curriculum?.lastByCourse?.[course.id]||state.curriculum?.lastLesson;return course.lessons.some(l=>l.id===saved)||completed(course,state)>0;}
function resumeId(api,course){const id=api.resume(course);return course.lessons.some(l=>l.id===id)?id:course.lessons[0].id;}
function programmeRoute(course){return '#/apprendre/'+encodeURIComponent(course.id);}
function lessonRoute(api,course){const path=api.route(resumeId(api,course));return typeof path==='string'&&path.startsWith('#/')?path:programmeRoute(course);}
function reviewLabel(course){return course.reviewer&&['relu','validé','publie','publié'].includes(course.status)?'Contenu relu':'Relecture en cours';}

function renderCard(api,course,state){
  const {esc}=api,tech=technology(course),done=completed(course,state),hasStarted=started(course,state);
  const finished=done===course.lessons.length;
  const action=finished?'Revoir le cours':hasStarted?'Reprendre':'Commencer';
  const count=exerciseCount(course),heading='nunya-course-'+encodeURIComponent(course.id);
  const prerequisite=(course.prerequisite_courses||[]).length?'Des bases sont conseillées':(course.prerequisites||[])[0]||'Consulte les prérequis dans le programme';
  return `<article class="nunya-course-card" aria-labelledby="${esc(heading)}">
    <div class="nunya-course-top"><span class="nunya-course-mark" aria-hidden="true">${esc(tech.mark)}</span><div><span class="nunya-course-technology">${esc(tech.label)}</span><span class="nunya-course-level">${course.level==='intermediaire'?'Intermédiaire':course.level==='avance'?'Avancé':'Débutant'}</span></div>${hasStarted?`<span class="nunya-course-state">${finished?'À revoir librement':'En cours'}</span>`:''}</div>
    <h3 id="${esc(heading)}">${esc(course.title_fr)}</h3>
    <p class="nunya-course-description">${esc(course.summary_fr||'Découvre le programme et les compétences travaillées.')}</p>
    <dl class="nunya-course-metrics"><div><dt>Modules</dt><dd>${(course.modules||[]).length}</dd></div><div><dt>Leçons</dt><dd>${course.lessons.length}</dd></div>${count===null?'':`<div><dt>Exercices</dt><dd>${count}</dd></div>`}</dl>
    <div class="nunya-course-notes"><p>${esc(duration(course))}</p><p>${esc(prerequisite)}</p>${course.availability==='premiere-serie'?'<p>Première série · suite en préparation</p>':''}<p class="nunya-course-review"><span aria-hidden="true">◷</span> ${esc(reviewLabel(course))}</p></div>
    ${hasStarted?`<div class="nunya-course-progress">${api.progress(course)}</div>`:'<p class="nunya-course-unstarted">À commencer, à ton rythme.</p>'}
    <div class="nunya-course-actions"><a class="nunya-course-programme" href="${esc(programmeRoute(course))}" aria-label="${esc('Voir le programme de '+course.title_fr)}">Voir le programme <span aria-hidden="true">→</span></a><a class="nunya-course-start" href="${esc(lessonRoute(api,course))}" aria-label="${esc(action+' : '+course.title_fr)}">${action} <span aria-hidden="true">→</span></a></div>
  </article>`;
}

function renderResume(api,courses,state){
  const last=state.curriculum?.lastLesson;
  const course=courses.find(c=>c.lessons.some(l=>l.id===last))||courses.find(c=>started(c,state));
  if(!course)return '';
  const {esc}=api,id=resumeId(api,course),lesson=course.lessons.find(l=>l.id===id);
  const finished=completed(course,state)===course.lessons.length;
  return `<aside class="nunya-catalogue-resume" aria-labelledby="nunya-resume-title"><span class="nunya-catalogue-kicker">TON PARCOURS</span><h2 id="nunya-resume-title">${finished?'Un cours à revisiter':'Reprends le fil'}</h2><p class="nunya-resume-course">${esc(course.title_fr)}</p><p>${esc(lesson?.title_fr||'Retrouve ton programme.')}</p><div class="nunya-course-progress">${api.progress(course)}</div><a class="nunya-course-start" href="${esc(lessonRoute(api,course))}">${finished?'Revoir ce cours':'Reprendre ma leçon'} <span aria-hidden="true">→</span></a></aside>`;
}

function renderOrientation(api,courses){
  const python=courses.find(c=>c.id==='python-bases'&&(!c.level||c.level==='debutant'));
  const html=courses.find(c=>c.id==='html-bases'&&(!c.level||c.level==='debutant'));
  if(!python&&!html)return '';
  const {esc}=api;
  return `<section class="nunya-catalogue-orientation" aria-labelledby="nunya-orientation-title"><div><span class="nunya-catalogue-kicker">UN POINT DE DÉPART, SI TU EN AS BESOIN</span><h2 id="nunya-orientation-title">Tu débutes ?</h2><p>Deux portes d’entrée. Tu peux aussi explorer librement tous les cours.</p></div><div class="nunya-orientation-links">${python?`<a href="${esc(programmeRoute(python))}"><strong>Écrire mes premiers programmes</strong><span>Commencer par Python <span aria-hidden="true">→</span></span></a>`:''}${html?`<a href="${esc(programmeRoute(html))}"><strong>Créer ma première page web</strong><span>Commencer par HTML <span aria-hidden="true">→</span></span></a>`:''}</div></section>`;
}

function markup(api,{roadmapOpen=false}={}){
  const {esc}=api,catalogue=api.catalogue()||{},state=api.state()||{},courses=writtenCourses(catalogue),plans=Array.isArray(catalogue.plans)?catalogue.plans:[];
  const technologies=[...new Map(courses.map(c=>{const tech=technology(c);return [tech.key,tech];})).values()].sort((a,b)=>a.label.localeCompare(b.label,'fr'));
  if(filters.technology!=='all'&&!technologies.some(t=>t.key===filters.technology))filters.technology='all';
  const visible=courses.filter(c=>(filters.technology==='all'||technology(c).key===filters.technology)&&matches(searchText(c),filters.q));
  const matchingPlans=filters.q.trim()?plans.filter(p=>matches(normalize([p.title_fr,p.summary_fr].join(' ')),filters.q)):[];
  const moduleCount=courses.reduce((sum,c)=>sum+(c.modules||[]).length,0);
  const allExerciseCounts=courses.map(exerciseCount),totalExercises=allExerciseCounts.every(n=>n!==null)?allExerciseCounts.reduce((sum,n)=>sum+n,0):null;
  const resultMessage=visible.length?`${quantity(visible.length,'cours','cours')} ${visible.length===1?'correspond':'correspondent'} à ta recherche.`:'Aucun cours disponible ne correspond à ces filtres.';
  const resume=renderResume(api,courses,state);
  return `<div id="${ROOT_ID}" class="nunya-catalogue">
    <header class="nunya-catalogue-hero${resume?' has-resume':''}"><div class="nunya-catalogue-intro"><span class="nunya-catalogue-kicker">COMPRENDRE · PRATIQUER · CONSTRUIRE</span><h1>Apprendre à coder</h1><p>Des explications en français, du code à écrire et des projets pour avancer. Choisis un cours et prends le temps de comprendre.</p><ul class="nunya-catalogue-facts" aria-label="Contenus rédigés disponibles"><li><strong>${courses.length}</strong> ${courses.length===1?'cours':'cours'}</li><li><strong>${moduleCount}</strong> ${moduleCount===1?'module':'modules'}</li>${totalExercises===null?'':`<li><strong>${totalExercises}</strong> ${totalExercises===1?'exercice':'exercices'}</li>`}</ul><p class="nunya-catalogue-editorial">Contenus originaux Nunya · ${courses.some(c=>reviewLabel(c)==='Relecture en cours')?'relecture pédagogique en cours':'état de relecture indiqué par cours'}</p></div>${resume||'<div class="nunya-catalogue-method" aria-label="Comment avancer"><span class="nunya-method-number" aria-hidden="true">01 / 02 / 03</span><strong>Une idée. Un essai. Un acquis.</strong><p>Lis une notion, teste ton code et explique le résultat avant de continuer.</p></div>'}</header>
    <section class="nunya-course-quick" aria-labelledby="nunya-quick-title"><h2 id="nunya-quick-title">Les cours disponibles</h2><p>Choisis directement ton programme. Les leçons et les exercices s’ouvrent ici, dans Nunya.</p><div>${courses.map(c=>`<a href="${esc(programmeRoute(c))}">${esc(technology(c).label)} <span aria-hidden="true">→</span></a>`).join('')}<a href="#/apprendre/git-bases">Git et GitHub <span aria-hidden="true">→</span></a></div><button type="button" class="nunya-catalogue-secondary" data-curr="refresh-catalogue">Actualiser les cours disponibles</button></section>
    ${renderOrientation(api,courses)}
    ${api.discovery?.()||''}
    <section class="nunya-catalogue-courses" aria-labelledby="nunya-courses-title"><div class="nunya-catalogue-section-head"><div><span class="nunya-catalogue-kicker">LE CATALOGUE</span><h2 id="nunya-courses-title">Trouve ta prochaine étape</h2></div><span class="nunya-catalogue-count">${quantity(courses.length,'cours disponible','cours disponibles')}</span></div>
      <form id="${FORM_ID}" class="nunya-catalogue-filters" role="search" method="get"><div class="nunya-catalogue-search"><label for="nunya-course-query">Rechercher un cours ou une notion</label><input id="nunya-course-query" type="search" name="q" maxlength="200" value="${esc(filters.q)}" placeholder="Ex. : Python, formulaires, fonctions…" aria-describedby="nunya-course-search-hint"></div><div class="nunya-catalogue-select"><label for="nunya-course-technology">Technologie</label><select id="nunya-course-technology" name="technologie"><option value="all"${filters.technology==='all'?' selected':''}>Toutes les technologies</option>${technologies.map(t=>`<option value="${esc(t.key)}"${filters.technology===t.key?' selected':''}>${esc(t.label)}</option>`).join('')}</select></div><div class="nunya-catalogue-filter-actions"><button id="nunya-course-search-submit" type="submit" class="nunya-course-start">Rechercher</button><button id="nunya-course-filter-clear" type="submit" name="action" value="clear" class="nunya-catalogue-clear">Effacer</button></div><p id="nunya-course-search-hint" class="nunya-catalogue-filter-hint">La recherche porte sur les cours disponibles, leurs compétences et leurs leçons.</p></form>
      <p id="nunya-course-results-status" class="nunya-catalogue-results" role="status" aria-live="polite" aria-atomic="true">${esc(resultMessage)}</p>
      ${visible.length?`<div class="nunya-catalogue-grid">${visible.map(c=>renderCard(api,c,state)).join('')}</div>`:`<div class="nunya-catalogue-empty"><h3>Une autre piste ?</h3><p>Essaie un mot plus court ou choisis une autre technologie.${matchingPlans.length?' Cette notion figure aussi parmi les séries en préparation ci-dessous.':''}</p><button id="nunya-course-empty-clear" type="submit" form="${FORM_ID}" name="action" value="clear" class="nunya-course-start">Revoir tous les cours</button></div>`}
    </section>
    ${plans.length?`<details id="nunya-course-roadmap" class="nunya-catalogue-roadmap"${roadmapOpen?' open':''}><summary><span><span class="nunya-catalogue-kicker">POUR LA SUITE</span><strong>Les séries en préparation</strong></span><span class="nunya-roadmap-count">${quantity(plans.length,'programme','programmes')}</span></summary><p>Ces programmes sont en préparation. Ils ne sont pas comptés parmi les cours disponibles.</p><ul class="nunya-roadmap-list">${plans.map(p=>`<li><div><h3>${esc(p.title_fr)}</h3><p>${esc(p.summary_fr||'Le programme sera précisé avant son ouverture.')}</p></div><span>En préparation</span></li>`).join('')}</ul></details>`:''}
    <section class="nunya-catalogue-tools" aria-label="Personnalisation et sauvegardes"><article><span class="nunya-catalogue-kicker">TON POINT DE DÉPART</span><h2>Un programme qui te ressemble</h2><p>Quelques préférences peuvent t’aider à choisir. Cette orientation reste facultative.</p><button type="button" class="nunya-catalogue-secondary" data-onboarding="preferences">Personnaliser mon programme</button></article><article><span class="nunya-catalogue-kicker">TON TRAVAIL RESTE AVEC TOI</span><h2>Conserver ta progression</h2><p>Les sauvegardes restent sur cet appareil. Exporte-les avant de changer de navigateur.</p><button type="button" class="nunya-catalogue-secondary" data-curr="export">Exporter ma progression de code</button><label class="curr-import" for="curr-import">Restaurer une sauvegarde<input type="file" id="curr-import" accept="application/json"></label></article></section>
  </div>`;
}

function onFilterSubmit(event){
  const form=event.target;
  if(!activeApi||form?.id!==FORM_ID)return;
  const document=form.ownerDocument,root=document.getElementById(ROOT_ID);
  if(!root?.contains(form))return;
  event.preventDefault();
  const focused=document.activeElement,focusId=root.contains(focused)?focused.id:event.submitter?.id;
  const selection=focused?.id==='nunya-course-query'?[focused.selectionStart,focused.selectionEnd]:null;
  if(event.submitter?.value==='clear'){filters.q='';filters.technology='all';}
  else{filters.q=String(form.elements.namedItem('q')?.value||'').slice(0,200);filters.technology=String(form.elements.namedItem('technologie')?.value||'all');}
  const roadmapOpen=!!root.querySelector('#nunya-course-roadmap')?.open;
  root.outerHTML=markup(activeApi,{roadmapOpen});
  const replacement=document.getElementById(ROOT_ID),focusTarget=document.getElementById(focusId||'nunya-course-query');
  if(focusTarget&&replacement?.contains(focusTarget)){focusTarget.focus({preventScroll:true});if(selection&&typeof focusTarget.setSelectionRange==='function'){try{focusTarget.setSelectionRange(...selection);}catch{}}}
  else document.getElementById('nunya-course-query')?.focus({preventScroll:true});
  const status=document.getElementById('nunya-course-results-status'),message=status?.textContent;
  if(status&&document.defaultView?.requestAnimationFrame){status.textContent='';document.defaultView.requestAnimationFrame(()=>{if(status.isConnected)status.textContent=message;});}
}

export function renderCatalogue(api){
  activeApi=api;
  if(!listening&&typeof document!=='undefined'){document.addEventListener('submit',onFilterSubmit);listening=true;}
  return markup(api);
}
