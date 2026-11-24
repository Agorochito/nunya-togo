import {renderJourneys} from './coding-journeys.mjs';
const ROOT_ID='nunya-course-catalogue';
const FORM_ID='nunya-course-filters';
const filters={q:'',technology:'all',level:'all'};
const levelTitle=level=>({debutant:'Débutant',intermediaire:'Intermédiaire',avance:'Avancé'})[level]||level;
let activeApi=null;
let listening=false;

export const TECHNOLOGIES={
  python:{label:'Python',mark:'Py',aliases:'python programmation console'},
  html:{label:'HTML',mark:'</>',aliases:'html web balisage structure'},
  css:{label:'CSS',mark:'{ }',aliases:'css web styles presentation'},
  javascript:{label:'JavaScript',mark:'JS',aliases:'javascript js programmation console'},
  dom:{label:'JavaScript · DOM',mark:'DOM',aliases:'javascript js dom interface evenements formulaires'},
  react:{label:'React',mark:'R',aliases:'react jsx composants etat interface javascript js'},
  http:{label:'HTTP et API',mark:'API',aliases:'http api fetch requete reponse client'},
  sql:{label:'SQL',mark:'SQL',aliases:'sql sqlite donnees base requete'},
  postgres:{label:'PostgreSQL et Supabase',mark:'PG',aliases:'postgresql postgres supabase backend base de donnees rls securite par ligne politique role auth api rpc plpgsql declencheur fonction migration vercel en ligne'},
  bash:{label:'Terminal et Linux',mark:'>_',aliases:'terminal linux bash shell ligne de commande console fichiers scripts'},
  cpp:{label:'C++',mark:'C++',aliases:'c++ cpp c plus plus programmation compilee systeme'},
  java:{label:'Java',mark:'Jv',aliases:'java jdk objet objets classes programmation compilee android logiciel entreprise backend'},
  php:{label:'PHP',mark:'php',aliases:'php programmation serveur web back-end backend script'},
  typescript:{label:'TypeScript',mark:'TS',aliases:'typescript types typage interface generique union strict tsc angular'},
  node:{label:'Node.js',mark:'⬢',aliases:'node nodejs serveur backend api http express npm asynchrone promesse async await fichiers'},
  ia:{label:'Intelligence artificielle',mark:'IA',aliases:'ia intelligence artificielle apprentissage automatique machine learning modele neurone perceptron voisins biais hallucination chatgpt assistant injection hameconnage deepfake'},
  projetfs:{label:'Projet full-stack',mark:'⧉',aliases:'projet complet full stack fullstack boutique en ligne application web formulaire panier cookie api serveur'},
  projetweb:{label:'Projet web',mark:'◧',aliases:'projet web page personnelle portfolio site cv en ligne publier github pages responsive mobile formulaire contact'},
  stats:{label:'Statistiques',mark:'σ',aliases:'statistiques statistique moyenne mediane ecart type quartile correlation regression probabilites sondage echantillon donnees analyse'},
  qualite:{label:'Qualité logicielle',mark:'✓',aliases:'qualite logicielle tests unitaires assert pytest debogage debug refactoring revue de code tdd docstring doctest propre'},
  algo:{label:'Algorithmes',mark:'O(n)',aliases:'algorithmes algorithmique structures de donnees tri recherche dichotomie recursivite pile file graphe dijkstra complexite entretien'},
  reseaux:{label:'Réseaux',mark:'IP',aliases:'reseaux reseau network ip adresse masque cidr sous-reseau dns ping traceroute pare-feu firewall wifi ports protocoles tcp udp'},
  cyber:{label:'Cybersécurité',mark:'Sec',aliases:'cybersecurite securite cyber defense hameconnage phishing mots de passe journaux logs audit incident sauvegarde python'},
  git:{label:'Git',mark:'Git',aliases:'git versions branches historique'}
};
const GIT_COURSE={id:'git-bases',title_fr:'Git et GitHub : versionner et collaborer',technology:'git',level:'debutant',summary_fr:'Un vrai dépôt local pour comprendre les fichiers, les commits, les branches et la collaboration.',modules:Array.from({length:4}),lessons:Array.from({length:12},(_,index)=>({id:`git-${index+1}`}))};
const FEATURED_IDS=['python-bases','html-bases','javascript-bases'];

function normalize(value){return String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,' ').replace(/\s+/g,' ').trim();}
export function technology(course){
  const key=Object.hasOwn(TECHNOLOGIES,course.technology)?course.technology:Object.hasOwn(TECHNOLOGIES,course.runtime)?course.runtime:course.language;
  return {key:String(key||'autres'),...(TECHNOLOGIES[key]||{label:course.technology_fr||course.language||'Autres outils',mark:'<>',aliases:''})};
}
function writtenCourses(catalogue){return (catalogue.courses||[]).filter(c=>c?.id&&Array.isArray(c.lessons)&&c.lessons.length>0);}
function searchText(course){
  const tech=technology(course);
  return normalize([course.title_fr,course.summary_fr,course.language,course.level,levelTitle(course.level),({debutant:'beginner',intermediaire:'intermediate',avance:'advanced'})[course.level],tech.label,tech.aliases,...(course.outcomes||[]),...(course.lessons||[]).flatMap(l=>[l.title_fr,...(l.tags||[])])].join(' '));
}
function matches(text,q){return normalize(q).split(' ').filter(Boolean).every(word=>text.includes(word==='js'?'javascript':word));}
function quantity(value,one,many=one+'s'){return `${value} ${value===1?one:many}`;}
function minutes(course){
  if(Number.isFinite(course.estimated_minutes)&&course.estimated_minutes>0)return Math.round(course.estimated_minutes);
  return course.lessons.every(l=>Number.isFinite(l.minutes)&&l.minutes>0)?course.lessons.reduce((total,l)=>total+l.minutes,0):null;
}
function duration(course){const total=minutes(course);if(total===null)return 'Durée indicative à préciser';const h=Math.floor(total/60),m=total%60;return `Durée indicative · ${h?`${h} h${m?' '+String(m).padStart(2,'0'):''}`:m+' min'}`;}
function completed(course,state){return course.id==='git-bases'?Object.values(state.git?.completed||{}).filter(Boolean).length:course.lessons.filter(l=>state.curriculum?.completed?.[l.id]).length;}
function started(course,state){if(course.id==='git-bases')return completed(course,state)>0||Boolean(state.git?.last||state.git?.saved);const saved=state.curriculum?.lastByCourse?.[course.id]||state.curriculum?.lastLesson;return course.lessons.some(l=>l.id===saved)||completed(course,state)>0;}
function resumeId(api,course){if(course.id==='git-bases')return null;const id=api.resume(course);return course.lessons.some(l=>l.id===id)?id:course.lessons[0].id;}
function programmeRoute(course){return '#/apprendre/'+encodeURIComponent(course.id);}
function lessonRoute(api,course){if(course.id==='git-bases')return programmeRoute(course);const path=api.route(resumeId(api,course));return typeof path==='string'&&path.startsWith('#/')?path:programmeRoute(course);}
function reviewLabel(course){return course.reviewer&&['relu','validé','publie','publié'].includes(course.status)?'Contenu relu':'Relecture en cours';}

function renderCard(api,course,state){
  const {esc}=api,tech=technology(course),done=completed(course,state),hasStarted=started(course,state);
  const finished=done===course.lessons.length;
  const heading='nunya-course-'+encodeURIComponent(course.id),domain=domainForCourse(course);
  const metadata=course.id==='git-bases'?'4 modules · 12 leçons · Dépôt local':`${(course.modules||[]).length} modules · ${course.lessons.length} leçons · ${duration(course).replace('Durée indicative · ','')}`;
  const progress=course.id==='git-bases'?`<progress max="${course.lessons.length}" value="${Math.min(done,course.lessons.length)}" aria-label="Progression Git et GitHub"></progress><small>${done} / ${course.lessons.length} leçons validées</small>`:api.progress(course);
  return `<a class="nunya-course-card" data-domain="${esc(domain)}" data-tech="${esc(tech.key)}" href="${esc(programmeRoute(course))}" aria-labelledby="${esc(heading)}">
    <span class="nunya-course-top"><span class="nunya-course-mark" aria-hidden="true">${esc(tech.mark)}</span><span class="nunya-course-technology">${esc(tech.label)} · ${course.level==='intermediaire'?'Intermédiaire':course.level==='avance'?'Avancé':'Débutant'}</span>${hasStarted?`<span class="nunya-course-state">${finished?'Terminé':'En cours'}</span>`:''}</span>
    <h3 id="${esc(heading)}">${esc(course.title_fr)}</h3>
    <span class="nunya-course-description">${esc(course.summary_fr||'Découvre le programme et les compétences travaillées.')}</span>
    <span class="nunya-course-metadata">${esc(metadata)}</span>
    ${hasStarted?`<div class="nunya-course-progress">${progress}</div>`:''}
    <span class="nunya-course-action">Voir le programme <span aria-hidden="true">→</span></span>
  </a>`;
}

function renderResume(api,courses,state){
  const last=state.curriculum?.lastLesson;
  const course=courses.find(c=>c.id!=='git-bases'&&c.lessons.some(l=>l.id===last))||(state.git?.last?GIT_COURSE:null)||courses.find(c=>started(c,state));
  if(!course)return '';
  const {esc}=api,id=resumeId(api,course),lesson=course.id==='git-bases'?null:course.lessons.find(l=>l.id===id);
  const finished=completed(course,state)===course.lessons.length;
  const progress=course.id==='git-bases'?`<progress max="${course.lessons.length}" value="${Math.min(completed(course,state),course.lessons.length)}" aria-label="Progression Git et GitHub"></progress><small>${completed(course,state)} / ${course.lessons.length} leçons validées</small>`:api.progress(course);
  return `<section class="nunya-catalogue-continue" aria-labelledby="nunya-continue-title"><div class="nunya-catalogue-section-head"><div><span class="nunya-catalogue-kicker">TON PARCOURS</span><h2 id="nunya-continue-title">Continuer</h2></div></div><aside class="nunya-catalogue-resume"><div><h3>${esc(course.title_fr)}</h3><p>${esc(lesson?.title_fr||(course.id==='git-bases'?'Atelier local · '+completed(course,state)+' leçons validées':'Retrouve ton programme.'))}</p>${progress}</div><a class="nunya-course-start" href="${esc(lessonRoute(api,course))}">${finished?'Revoir ce cours':'Reprendre'} <span aria-hidden="true">→</span></a></aside></section>`;
}

export const DOMAINS=[
  {key:'web',title:'Web : sites et applications',text:'Créer des pages, les mettre en forme et les rendre interactives, du premier HTML à React.',technologies:['html','css','javascript','dom','typescript','react','http','projetweb','projetfs']},
  {key:'langages',title:'Langages de programmation',text:'Programmer des scripts, des logiciels et des serveurs avec un langage généraliste.',technologies:['python','php','cpp','java','node','algo','qualite']},
  {key:'donnees',title:'Données',text:'Interroger, organiser et analyser des informations, avec une base de données, les statistiques ou l’intelligence artificielle.',technologies:['sql','postgres','stats','ia']},
  {key:'securite',title:'Cybersécurité',text:'Protéger les comptes, détecter les attaques et réagir aux incidents, sur des données fictives et dans un cadre légal.',technologies:['cyber']},
  {key:'outils',title:'Outils et systèmes',text:'Git, le terminal, Linux et les réseaux : des outils quotidiens pour créer, versionner et partager.',technologies:['git','bash','reseaux']}
];
export function domainForCourse(course){return DOMAINS.find(item=>item.technologies.includes(technology(course).key))?.key||'autres'}
function renderFeatured(api,courses,state){
  const featured=FEATURED_IDS.map(id=>courses.find(course=>course.id===id)).filter(Boolean);
  if(!featured.length)return '';
  return `<section class="nunya-catalogue-featured" aria-labelledby="nunya-featured-title"><div class="nunya-catalogue-section-head"><div><span class="nunya-catalogue-kicker">POUR BIEN COMMENCER</span><h2 id="nunya-featured-title">Trois portes d’entrée</h2></div><p>Choisis un sujet et avance à ton rythme.</p></div><div class="nunya-catalogue-grid">${featured.map(course=>renderCard(api,course,state)).join('')}</div></section>`;
}
function filtering(){return filters.q.trim()!==''||filters.technology!=='all'||filters.level!=='all';}
function renderDomains(api,courses,state,exclude=new Set()){
  const {esc}=api,used=new Set();
  const remaining=courses.filter(course=>!exclude.has(course.id));
  const groups=DOMAINS.map(d=>{const list=remaining.filter(c=>d.technologies.includes(technology(c).key));list.forEach(c=>used.add(c.id));return {...d,list};});
  const rest=remaining.filter(c=>!used.has(c.id));
  if(rest.length)groups.push({key:'autres',title:'Autres cours',text:'Programmes qui complètent les domaines ci-dessus.',list:rest});
  const shown=groups.filter(g=>g.list.length),allClosed=shown.every(g=>collapsed.has(g.key));
  return `<div class="nunya-domain-tools"><button type="button" class="nunya-catalogue-secondary" data-domain-all>${allClosed?'Tout déplier':'Tout replier'}</button></div>`+shown.map(g=>{const open=!collapsed.has(g.key),key=esc(g.key);return `<section class="nunya-catalogue-domain" data-domain="${key}" aria-labelledby="nunya-domain-${key}"><h3 id="nunya-domain-${key}"><button type="button" data-domain-toggle="${key}" aria-expanded="${open}" aria-controls="nunya-domain-body-${key}"><span>${esc(g.title)}</span><span class="nunya-domain-count">${quantity(g.list.length,'cours','cours')}</span><span class="nunya-domain-chevron" aria-hidden="true"></span></button></h3><div id="nunya-domain-body-${key}" class="nunya-domain-body"${open?'':' hidden'}><p>${esc(g.text)}</p><div class="nunya-catalogue-grid">${g.list.map(c=>renderCard(api,c,state)).join('')}</div></div></section>`}).join('');
}
/* Domain sections fold; the choice stays on this device (best effort: storage may be unavailable). */
const COLLAPSE_KEY='nunya-catalogue-domaines-replies-v2';
const DEFAULT_COLLAPSED=['donnees','securite','outils'];
const collapsed=new Set((()=>{try{const storage=globalThis.localStorage,saved=storage?.getItem(COLLAPSE_KEY),previous=saved??storage?.getItem('nunya-catalogue-domaines-replies');if(previous!==null){const value=JSON.parse(previous);if(Array.isArray(value))return saved===null&&value.length?[...new Set([...DEFAULT_COLLAPSED,...value.map(String)])]:value.map(String)}}catch{}return DEFAULT_COLLAPSED})());
function saveCollapsed(){try{globalThis.localStorage?.setItem(COLLAPSE_KEY,JSON.stringify([...collapsed]))}catch{}}
function setDomain(button,open){const key=button.dataset.domainToggle,body=button.ownerDocument.getElementById('nunya-domain-body-'+key);button.setAttribute('aria-expanded',String(open));if(body)body.hidden=!open;if(open)collapsed.delete(key);else collapsed.add(key)}
function onDomainClick(event){
  const button=event.target.closest?.('[data-domain-toggle],[data-domain-all]');
  if(!button||!button.closest('#'+ROOT_ID))return;
  const root=button.closest('#'+ROOT_ID),toggles=[...root.querySelectorAll('[data-domain-toggle]')];
  if(button.hasAttribute('data-domain-all')){const close=toggles.some(t=>t.getAttribute('aria-expanded')==='true');toggles.forEach(t=>setDomain(t,!close))}
  else setDomain(button,button.getAttribute('aria-expanded')!=='true');
  const all=root.querySelector('[data-domain-all]'),allClosed=toggles.every(t=>t.getAttribute('aria-expanded')==='false');
  if(all){all.textContent=allClosed?'Tout déplier':'Tout replier'}
  saveCollapsed();
}
function markup(api,{roadmapOpen=false}={}){
  const {esc}=api,catalogue=api.catalogue()||{},state=api.state()||{},courses=writtenCourses(catalogue),allCourses=[...courses,GIT_COURSE],plans=Array.isArray(catalogue.plans)?catalogue.plans:[];
  const technologies=[...new Map(allCourses.map(c=>{const tech=technology(c);return [tech.key,tech];})).values()].sort((a,b)=>a.label.localeCompare(b.label,'fr'));
  if(filters.technology!=='all'&&!technologies.some(t=>t.key===filters.technology))filters.technology='all';
  const levels=[...new Set(allCourses.map(c=>c.level||'debutant'))];
  if(filters.level!=='all'&&!levels.includes(filters.level))filters.level='all';
  const visible=allCourses.filter(c=>(filters.level==='all'||(c.level||'debutant')===filters.level)&&(filters.technology==='all'||technology(c).key===filters.technology)&&matches(searchText(c),filters.q));
  const matchingPlans=filters.q.trim()?plans.filter(p=>matches(normalize([p.title_fr,p.summary_fr].join(' ')),filters.q)):[];
  const moduleCount=allCourses.reduce((sum,c)=>sum+(c.modules||[]).length,0),resultMessage=visible.length?`${quantity(visible.length,'programme','programmes')} ${visible.length===1?'correspond':'correspondent'} à ta recherche.`:'Aucun programme disponible ne correspond à ces filtres.';
  const resume=renderResume(api,allCourses,state),reviewInProgress=allCourses.some(c=>reviewLabel(c)==='Relecture en cours');
  const featuredIds=new Set(FEATURED_IDS),domainCourses=allCourses.filter(course=>!featuredIds.has(course.id));
  return `<div id="${ROOT_ID}" class="nunya-catalogue">
    <header class="nunya-catalogue-hero"><div class="nunya-catalogue-intro"><span class="nunya-catalogue-kicker">COMPRENDRE · PRATIQUER · CONSTRUIRE</span><h1>Apprendre à coder</h1><p>Des explications en français, du code à écrire et des projets pour avancer. Choisis un cours et prends le temps de comprendre.</p><ul class="nunya-catalogue-facts" aria-label="Programmes disponibles"><li><strong>${allCourses.length}</strong> programmes</li><li><strong>${moduleCount}</strong> modules</li></ul>${reviewInProgress?'<p class="nunya-catalogue-editorial">Contenus originaux Nunya · relecture pédagogique en cours</p>':''}</div><div class="nunya-catalogue-method" aria-label="Comment avancer"><span class="nunya-method-number" aria-hidden="true">01 / 02 / 03</span><strong>Une idée. Un essai. Un acquis.</strong><p>Lis une notion, teste ton code et explique le résultat avant de continuer.</p></div>
      <form id="${FORM_ID}" class="nunya-catalogue-filters" role="search" method="get"><div class="nunya-catalogue-search"><label for="nunya-course-query">Rechercher un cours ou une notion</label><input id="nunya-course-query" type="search" name="q" maxlength="200" value="${esc(filters.q)}" placeholder="Ex. : Python, formulaires, fonctions…" aria-describedby="nunya-course-search-hint"></div><div class="nunya-catalogue-select"><label for="nunya-course-technology">Technologie</label><select id="nunya-course-technology" name="technologie"><option value="all"${filters.technology==='all'?' selected':''}>Toutes les technologies</option>${technologies.map(t=>`<option value="${esc(t.key)}"${filters.technology===t.key?' selected':''}>${esc(t.label)}</option>`).join('')}</select></div><div class="nunya-catalogue-select"><label for="nunya-course-level">Niveau</label><select id="nunya-course-level" name="niveau"><option value="all"${filters.level==='all'?' selected':''}>Tous les niveaux</option>${levels.map(level=>`<option value="${esc(level)}"${filters.level===level?' selected':''}>${esc(levelTitle(level))}</option>`).join('')}</select></div><div class="nunya-catalogue-filter-actions"><button id="nunya-course-search-submit" type="submit" class="nunya-course-start">Rechercher</button><button id="nunya-course-filter-clear" type="submit" name="action" value="clear" class="nunya-catalogue-clear">Effacer</button><button type="button" class="nunya-catalogue-secondary" data-curr="refresh-catalogue">Actualiser</button></div><p id="nunya-course-search-hint" class="nunya-catalogue-filter-hint">La recherche porte sur les cours disponibles, leurs compétences et leurs leçons.</p></form>
    </header>
    <p id="nunya-course-results-status" class="nunya-catalogue-results" role="status" aria-live="polite" aria-atomic="true">${esc(resultMessage)}</p>
    ${resume}
    ${filtering()?'':renderFeatured(api,allCourses,state)}
    <section class="nunya-catalogue-courses" aria-labelledby="nunya-courses-title"><div class="nunya-catalogue-section-head"><div><span class="nunya-catalogue-kicker">${filtering()?'RÉSULTATS':'EXPLORER LES DOMAINES'}</span><h2 id="nunya-courses-title">${filtering()?'Programmes correspondants':'Explorer par domaine'}</h2></div><span class="nunya-catalogue-count">${quantity(visible.length,'programme','programmes')}</span></div>
      ${visible.length?(filtering()?`<div class="nunya-catalogue-grid">${visible.map(c=>renderCard(api,c,state)).join('')}</div>`:renderDomains(api,domainCourses,state,featuredIds)):`<div class="nunya-catalogue-empty"><h3>Une autre piste ?</h3><p>Essaie un mot plus court ou choisis une autre technologie.${matchingPlans.length?' Cette notion figure aussi parmi les séries en préparation ci-dessous.':''}</p><button id="nunya-course-empty-clear" type="submit" form="${FORM_ID}" name="action" value="clear" class="nunya-course-start">Revoir tous les programmes</button></div>`}
    </section>
    ${renderJourneys(api)}
    ${api.discovery?.()||''}
    ${plans.length?`<details id="nunya-course-roadmap" class="nunya-catalogue-roadmap"${roadmapOpen?' open':''}><summary><span><span class="nunya-catalogue-kicker">POUR LA SUITE</span><strong>Les séries en préparation</strong></span><span class="nunya-roadmap-count">${quantity(plans.length,'programme','programmes')}</span></summary><p>Ces programmes sont en préparation. Ils ne sont pas comptés parmi les cours disponibles.</p><ul class="nunya-roadmap-list">${plans.map(p=>`<li><div><h3>${esc(p.title_fr)}</h3><p>${esc(p.summary_fr||'Le programme sera précisé avant son ouverture.')}</p></div><span>En préparation</span></li>`).join('')}</ul></details>`:''}
    <section class="nunya-catalogue-tools" aria-label="Personnalisation"><article><span class="nunya-catalogue-kicker">TON POINT DE DÉPART</span><h2>Un programme qui te ressemble</h2><p>Quelques préférences peuvent t’aider à choisir. Cette orientation reste facultative.</p><button type="button" class="nunya-catalogue-secondary" data-onboarding="preferences">Personnaliser mon programme</button></article></section>
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
  if(event.submitter?.value==='clear'){filters.q='';filters.technology='all';filters.level='all';}
  else{filters.q=String(form.elements.namedItem('q')?.value||'').slice(0,200);filters.technology=String(form.elements.namedItem('technologie')?.value||'all');filters.level=String(form.elements.namedItem('niveau')?.value||'all');}
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
  if(!listening&&typeof document!=='undefined'){document.addEventListener('submit',onFilterSubmit);document.addEventListener('click',onDomainClick);listening=true;}
  return markup(api);
}
