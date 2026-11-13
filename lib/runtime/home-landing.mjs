// Accueil guidé (5.29.0, refonte phase 2) : bandeau des technologies, héros avec une seule action principale, « Par où commencer ? » (trois portes),
// parcours métiers, ce que Nunya promet (sans compte, attestation, Nunya Aide), révisions, première visite et invitation finale.
// Chargé à la demande par dist/coding-curriculum.js (aHome), précaché dans dist/sw.js avec sa feuille runtime/home-landing.css.
// Toutes les données viennent du catalogue (dist/data/curriculum/index.json), de Git et des parcours métiers : aucun identifiant de cours écrit en dur.
import {TECHNOLOGIES,DOMAINS,technology} from './course-catalogue.mjs';
import {JOURNEYS,pathwayStatus} from './coding-journeys.mjs';
import git from '../../dist/data/git/index.json' with {type:'json'};

// Couleur de domaine (jetons --dom-*) : celle du domaine du catalogue ; algorithmique et qualité gardent l’ocre « algo et qualité » du plan.
const DOMAIN_TOKEN={web:'web',langages:'lang',donnees:'data',securite:'sec',outils:'tools'};
const TECH_TOKEN={algo:'algo',qualite:'algo',git:'tools'};
// Ordre du bandeau : les langages les plus demandés d’abord, puis le reste du catalogue dans l’ordre des domaines.
const STRIP_FIRST=['html','css','javascript','python','sql','php','java','cpp','git','bash','react','typescript','node','ia'];
const STRIP_LABEL={bash:'Linux',ia:'IA',http:'HTTP',postgres:'PostgreSQL',dom:'DOM',reseaux:'Réseaux',cyber:'Cybersécurité',stats:'Statistiques',algo:'Algorithmes',qualite:'Tests',node:'Node.js'};
// Ces environnements exécutent le code sur un serveur (dist/coding-curriculum.js, coding-remote-worker.js) : leurs leçons restent lisibles hors connexion, pas leurs exercices.
const REMOTE_RUNTIMES=['cpp','bash','java','node','typescript'];

const HERO_CODE='prenom = "Afi"\nprint("Bonjour", prenom, "!")\nfor jour in range(1, 4):\n    print("Jour", jour, ": je code")';
const HERO_OUT='Bonjour Afi !\nJour 1 : je code\nJour 2 : je code\nJour 3 : je code';
// Coloration minimale du programme du héros, sans dépendance : règles collantes essayées dans l’ordre, le reste en texte simple.
const RULES=[['c',/#[^\n]*/y],['s',/"[^"\n]*"|'[^'\n]*'/y],['k',/\b(?:for|in|if|elif|else|while|def|return|import|from|True|False|None)\b/y],['f',/\b[a-z_]\w*(?=\()/y],['n',/\b\d+\b/y]];

let api=null,listening=false;
const L=(fr,en)=>api.label(fr,en);
const esc=value=>api.esc(String(value??''));
const arrow='<span aria-hidden="true">→</span>';
const plural=(n,fr,frs,en,ens)=>L(n>1?frs:fr,n>1?ens:en);

function highlight(code){
  let out='',plain='',i=0;
  const flush=()=>{out+=esc(plain);plain=''};
  while(i<code.length){
    let hit=null;
    for(const [cls,re] of RULES){re.lastIndex=i;const m=re.exec(code);if(m&&m[0]){hit=[cls,m[0]];break}}
    if(hit){flush();out+=`<span class="nl-${hit[0]}">${esc(hit[1])}</span>`;i+=hit[1].length}else plain+=code[i++];
  }
  flush();return out;
}

const domainKey=key=>key==='git'?'outils':DOMAINS.find(x=>x.technologies.includes(key))?.key;
const domainOf=key=>TECH_TOKEN[key]||DOMAIN_TOKEN[domainKey(key)]||'lang';
const gitCourse=()=>({...git,id:git.id||'git-bases',technology:'git',lessons:git.lessons||[]});
const isGit=c=>c.technology==='git';
function allCourses(){
  const rows=(api.catalogue()?.courses||[]).filter(c=>c?.id&&Array.isArray(c.lessons)&&c.lessons.length);
  return git?.lessons?.length?[...rows,gitCourse()]:rows;
}
const levelRank=c=>({debutant:0,intermediaire:1,avance:2})[c.level]??3;
// Premier cours (débutant d’abord) de chaque technologie, dans l’ordre du bandeau.
function technologies(courses){
  const by=new Map();
  for(const c of courses){const t=technology(c);if(t.key.startsWith('projet'))continue;const best=by.get(t.key);if(!best||levelRank(c)<levelRank(best.course))by.set(t.key,{key:t.key,mark:t.mark,label:STRIP_LABEL[t.key]||t.label,course:c})}
  const order=[...STRIP_FIRST,...DOMAINS.flatMap(d=>d.technologies)];
  return [...by.values()].sort((a,b)=>{const ia=order.indexOf(a.key),ib=order.indexOf(b.key);return (ia<0?99:ia)-(ib<0?99:ib)});
}
const programme=c=>'#/apprendre/'+encodeURIComponent(c.id);
// Leçon de Git : même forme d’adresse que dist/runtime/git-course.js (#/apprendre/git-bases/m1/git-m1-01).
const gitRoute=(c,id)=>`${programme(c)}/${id.split('-')[1]}/${id}`;
function lessonRoute(c,id){if(isGit(c))return gitRoute(c,id);const r=api.route(id);return typeof r==='string'&&r.startsWith('#/')?r:programme(c)}
const firstLesson=c=>lessonRoute(c,c.lessons[0].id);
const completedMap=(c,state)=>isGit(c)?state.git?.completed:state.curriculum?.completed;
const done=(c,state)=>{const map=completedMap(c,state);return c.lessons.filter(l=>map?.[l.id]===true).length};
const markClass=mark=>`nl-mark${[...String(mark)].length>2?' nl-mark-long':''}`;

// Jour local au format AAAA-MM-JJ, comme dayKey() dans dist/app.js (clé de state.activity).
const dayKey=d=>new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);
// Rythme des 7 derniers jours (aujourd’hui compris) : un jour compte s’il a reçu du temps d’apprentissage (state.activity, alimenté à chaque
// leçon validée) ou une première réussite d’exercice. Aucune série à perdre : on montre seulement les jours où l’apprenant est venu.
function rhythm(state){
  const now=new Date(),days=[...Array(7)].map((_,i)=>{const d=new Date(now);d.setDate(d.getDate()-6+i);return dayKey(d)});
  const active=new Set(days.filter(k=>Number(state.activity?.[k])>0));
  let exercises=0;
  for(const w of Object.values(state.curriculum?.work||{})){
    // Une sauvegarde modifiée à la main peut porter une date hors limites : on l’ignore plutôt que de faire échouer l’accueil.
    const at=new Date(Number(w?.started)+Number(w?.firstSuccess));
    if(!w?.passed||!(Number(w.firstSuccess)>0)||Number.isNaN(at.getTime()))continue;
    const k=dayKey(at);if(days.includes(k)){active.add(k);exercises++}
  }
  return {days:days.map(k=>active.has(k)),count:active.size,exercises};
}

// Apprenant qui revient : la dernière leçon ouverte (catalogue, sinon dernier cours ouvert, sinon Git), la suite et le rythme de la semaine.
function returning(state,courses){
  const cur=state.curriculum||{},byCourse=Object.entries(cur.lastByCourse||{});
  const candidates=[cur.lastLesson,byCourse.length?byCourse[byCourse.length-1][1]:null].filter(Boolean);
  let course=null,last=null;
  for(const id of candidates){course=courses.find(c=>!isGit(c)&&c.lessons.some(l=>l.id===id));if(course){last=id;break}}
  if(!course&&state.git?.last){course=courses.find(isGit)||null;last=course?.lessons.some(l=>l.id===state.git.last)?state.git.last:null;if(!last)course=null}
  if(!course)return null;
  const map=completedMap(course,state)||{},index=course.lessons.findIndex(l=>l.id===last),lesson=course.lessons[index];
  const nextIndex=course.lessons.findIndex((l,i)=>i>index&&!map[l.id]),next=nextIndex<0?null:course.lessons[nextIndex];
  const module=(course.modules||[]).findIndex(m=>(m.lesson_ids||[]).includes(last));
  const completed=map[last]===true,go=completed&&next?{lesson:next,index:nextIndex,continue:true}:{lesson,index,continue:false};
  return {course,lesson,index,next,module,week:rhythm(state),go,count:done(course,state),total:course.lessons.length};
}

function strip(techs){
  return `<nav class="nl-strip" aria-label="${esc(L('Technologies du catalogue','Catalogue technologies'))}"><ul>${techs.map(t=>`<li><a href="${esc(programme(t.course))}">${esc(t.label)}</a></li>`).join('')}</ul></nav>`;
}

const dots='<span class="nl-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
function codeCard(cta){
  return `<figure class="nl-editor" aria-label="${esc(L('Exemple de programme et son résultat','Sample program and its output'))}">
    <div class="nl-editor-bar">${dots}<span class="nl-editor-file">bonjour.py</span></div>
    <pre class="nl-code"><code>${highlight(HERO_CODE)}</code></pre>
    <div class="nl-editor-out"><span class="nl-editor-label">${esc(L('Résultat','Output'))}</span><samp class="nl-out">${esc(HERO_OUT)}</samp></div>
    ${cta}
  </figure>`;
}

// Anneau d’avancement : au moins un petit arc visible dès la première leçon terminée, pourcentage au centre.
function ring(count,total){
  const pct=total?count/total*100:0,draw=count?Math.max(4,pct):0;
  return `<span class="nl-ring"><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="nl-ring-track" cx="24" cy="24" r="20" pathLength="100"/>${draw?`<circle class="nl-ring-fill" cx="24" cy="24" r="20" pathLength="100" stroke-dasharray="${Math.round(draw*10)/10} 100"/>`:''}</svg><b>${Math.round(pct)} %</b></span>`;
}

function weekText(w){
  if(!w.count)return L('Pas encore cette semaine : une leçon suffit pour reprendre le fil.','Not yet this week: one lesson is enough to pick up the thread.');
  const days=`${w.count} ${plural(w.count,'jour actif','jours actifs','active day','active days')}`;
  return w.exercises?`${days} · ${w.exercises} ${plural(w.exercises,'exercice réussi','exercices réussis','exercise passed','exercises passed')}`:days;
}

function progressCard(r){
  const w=r.week;
  return `<aside class="nl-progress" aria-label="${esc(L('Ma progression','My progress'))}">
    <p class="nl-progress-course">${esc(r.course.title_fr)}</p>
    <div class="nl-progress-main">${ring(r.count,r.total)}<p><strong>${r.count}<span>/${r.total}</span></strong>${esc(L('leçons terminées','lessons completed'))}</p></div>
    <dl class="nl-progress-facts">
      <div><dt>${esc(L('Tu en es à','You are at'))}</dt><dd>${esc(L('Leçon','Lesson'))} ${r.index+1}${r.module>=0?` · ${esc(L('Module','Module'))} ${r.module+1}`:''}<br><span>${esc(r.lesson.title_fr)}</span></dd></div>
      <div><dt>${esc(L('Ces 7 derniers jours','Last 7 days'))}</dt><dd><span class="nl-week" aria-hidden="true">${w.days.map(on=>`<i${on?' class="on"':''}></i>`).join('')}</span><span class="nl-week-text">${esc(weekText(w))}</span></dd></div>
      ${r.next?`<div><dt>${esc(L('Ensuite','Next'))}</dt><dd>${esc(r.next.title_fr)}</dd></div>`:''}
    </dl>
    <a class="nl-progress-link" href="#/progression">${esc(L('Voir toute ma progression','See all my progress'))} ${arrow}</a>
  </aside>`;
}

function hero(state,catalogue,courses,techs,ret){
  const python=techs.find(t=>t.key==='python')?.course||courses[0];
  const lessons=catalogue.reduce((n,c)=>n+c.lessons.length,0);
  const personalize=api.onboarding()&&!state.onboarding?.result;
  const name=state.profile?.name;
  const primary=ret
    ?`<a class="primary nl-cta-main" href="${esc(lessonRoute(ret.course,ret.go.lesson.id))}">${esc(ret.go.continue?L(`Continuer avec la leçon ${ret.go.index+1}`,`Go on to lesson ${ret.go.index+1}`):L(`Reprendre la leçon ${ret.go.index+1}`,`Resume lesson ${ret.go.index+1}`))}<span class="nl-sr"> : ${esc(ret.go.lesson.title_fr)}</span> ${arrow}</a>`
    :`<a class="primary nl-cta-main" href="${esc(firstLesson(python))}">${esc(L('Commencer avec Python','Start with Python'))} ${arrow}</a>`;
  const side=ret?progressCard(ret):codeCard(`<a class="nl-editor-try" href="${esc(firstLesson(python))}">${esc(L('Essayer ce programme','Try this program'))} ${arrow}</a>`);
  const title=ret
    ?`${esc(name?L(`Bon retour, ${name}.`,`Welcome back, ${name}.`):L('Content de te revoir.','Good to see you again.'))} <span>${esc(L('On continue ?','Shall we go on?'))}</span>`
    :`${esc(L('Apprends à coder.','Learn to code.'))} <span>${esc(L('En français.','In French.'))}</span>`;
  // L’attestation est annoncée dès le premier écran : c’est une motivation forte, mais ce n’est pas un diplôme.
  const lead=ret
    ?L(`Tu en étais à « ${ret.lesson.title_fr} ». Ta progression reste sur cet appareil, avec ou sans connexion.`,`You were on “${ret.lesson.title_fr}”. Your progress stays on this device, online or offline.`)
    :L(`${catalogue.length} cours gratuits et ${lessons} leçons, sans compte ni publicité. Termine un cours et reçois une attestation Nunya de ton travail (ce n’est pas un diplôme).`,`${catalogue.length} free courses and ${lessons} lessons, no account and no ads. Finish a course and get a Nunya certificate of your work (it is not a diploma).`);
  return `<section class="nl-hero a-home-hero" aria-labelledby="nl-title">
    <div class="nl-wrap nl-hero-grid">
      <div class="nl-hero-text">
        <p class="nl-kicker">${esc(L('Gratuit · en français · à ton rythme','Free · in French · at your pace'))}</p>
        <h1 id="nl-title">${title}</h1>
        <p class="nl-lead">${esc(lead)}</p>
        <div class="nl-cta curr-entry a-start">${primary}${personalize?`<button class="nl-ghost" type="button" data-onboarding="begin">${esc(L('Personnaliser mon parcours','Personalize my path'))}</button>`:''}<a class="nl-all text-button" href="#/apprendre">${esc(L(`Voir les ${catalogue.length} cours`,`See all ${catalogue.length} courses`))} ${arrow}</a></div>
      </div>
      <div class="nl-hero-side">${side}</div>
    </div>
  </section>`;
}

// « Par où commencer ? » : trois portes selon où en est l’apprenant, chacune avec une seule action.
// Débutant complet : Python (le départ par défaut partout dans Nunya) ; créer des sites : HTML ; déjà des bases : le catalogue.
function start(state,catalogue,techs,ret){
  const pick=key=>techs.find(t=>t.key===key)?.course;
  const hours=c=>Math.round(c.lessons.reduce((n,l)=>n+(Number(l.minutes)||0),0)/60);
  const door=(question,course,promise)=>{
    if(!course)return '';
    const n=done(course,state),map=completedMap(course,state)||{},resume=course.lessons.find(l=>map[l.id]!==true)||course.lessons[0];
    const t=technology(course),h=hours(course);
    const meta=[`${course.lessons.length} ${L('leçons','lessons')}`,h?L(`environ ${h} h`,`about ${h} h`):'',n?L(`${n} terminée${n>1?'s':''}`,`${n} done`):''].filter(Boolean).join(' · ');
    return `<li class="nl-door" data-dom="${domainOf(t.key)}">
      <p class="nl-door-q">${esc(question)}</p>
      <div class="nl-door-head"><span class="${markClass(t.mark)}" aria-hidden="true">${esc(t.mark)}</span><h3>${esc(course.title_fr)}</h3></div>
      <p class="nl-door-text">${esc(promise)}</p>
      <p class="nl-door-meta">${esc(meta)}</p>
      <div class="nl-door-actions"><a class="nl-btn nl-btn-solid" href="${esc(lessonRoute(course,resume.id))}">${esc(n?L('Continuer','Continue'):L('Commencer','Start'))}<span class="nl-sr"> : ${esc(course.title_fr)}</span> ${arrow}</a><a class="nl-more" href="${esc(programme(course))}">${esc(L('Voir le programme','See the programme'))}<span class="nl-sr"> : ${esc(course.title_fr)}</span></a></div>
    </li>`;
  };
  const doors=[
    door(L('Je n’ai jamais codé','I have never coded'),pick('python'),L('Tes premiers programmes : afficher, calculer, répéter, décider. Le code tourne dans ton navigateur.','Your first programs: display, calculate, repeat, decide. The code runs in your browser.')),
    door(L('Je veux créer des sites','I want to build websites'),pick('html'),L('Ta première page web, propre et accessible, puis le style avec CSS.','Your first web page, clean and accessible, then styling with CSS.'))
  ].filter(Boolean);
  const other=`<li class="nl-door" data-dom="data">
      <p class="nl-door-q">${esc(L('J’ai déjà des bases','I already know the basics'))}</p>
      <div class="nl-door-head"><span class="nl-mark" aria-hidden="true">+</span><h3>${esc(L('Choisis ton niveau','Pick your level'))}</h3></div>
      <p class="nl-door-text">${esc(L(`De JavaScript à React, de SQL à l’IA : ${catalogue.length} cours, du niveau débutant au niveau intermédiaire, rangés par domaine.`,`From JavaScript to React, from SQL to AI: ${catalogue.length} courses, beginner to intermediate, grouped by field.`))}</p>
      <p class="nl-door-meta">${esc(L('Chaque cours terminé donne une attestation','Every finished course gives a certificate'))}</p>
      <div class="nl-door-actions"><a class="nl-btn nl-btn-solid" href="#/apprendre">${esc(L('Ouvrir le catalogue','Open the catalogue'))} ${arrow}</a></div>
    </li>`;
  return `<section class="nl-band" aria-labelledby="nl-start-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(ret?L('Explorer','Explore'):L('Où en es-tu ?','Where are you now?'))}</p><h2 id="nl-start-title">${esc(ret?L('Envie d’apprendre autre chose ?','Want to learn something else?'):L('Par où commencer ?','Where to start?'))}</h2><p>${esc(L('Choisis la porte qui te ressemble. Tu pourras changer de cours quand tu veux, ta progression est gardée.','Pick the door that fits you. You can switch courses any time, your progress is kept.'))}</p></div>
    <ul class="nl-doors">${doors.join('')}${other}</ul>
    <p class="nl-zero">${esc(L('Jamais utilisé un ordinateur ou un téléphone pour apprendre ?','Never used a computer or phone to learn?'))} <a href="#/apprendre/decouverte">${esc(L('Commence par le niveau 0 : Découverte du numérique','Start with level 0: Digital discovery'))}</a></p>
  </div></section>`;
}

function bands(state,catalogue,courses,techs,ret){
  const first=api.onboarding()&&!state.academy?.onboarded;
  const sample=ret&&!isGit(ret.course)?ret.course:catalogue.find(c=>technology(c).key==='python')||catalogue[0];
  const journeys=JOURNEYS.map(j=>({j,s:pathwayStatus(j,api.catalogue(),state)})).filter(x=>x.s.available);
  const remote=[...new Set(catalogue.filter(c=>REMOTE_RUNTIMES.includes(c.runtime)).map(c=>{const k=technology(c).key;return k==='projetfs'?L('le projet full-stack','the full-stack project'):STRIP_LABEL[k]||TECHNOLOGIES[k]?.label||k}))];
  const python=techs.find(t=>t.key==='python')?.course||courses[0],minutes=python?.lessons?.[0]?.minutes;
  const journeyMark=j=>{const c=catalogue.find(x=>x.id===j.course_ids?.[0]),k=c?technology(c).key:'python';return {mark:TECHNOLOGIES[k]?.mark||'Py',dom:domainOf(k)}};
  const aide=api.aide();
  return `
  ${journeys.length?`<section class="nl-band nl-band-dark" aria-labelledby="nl-jobs-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Des parcours métiers','Career paths'))}</p><h2 id="nl-jobs-title">${esc(L('Un métier en tête ? Suis son parcours.','A job in mind? Follow its path.'))}</h2><p>${esc(L('Chaque parcours met les cours dans le bon ordre et suit ton avancée, étape par étape.','Each path puts the courses in the right order and tracks your progress, step by step.'))}</p></div>
    <ul class="nl-chips">${journeys.map(({j,s})=>{const m=journeyMark(j);return `<li><a class="nl-chip" href="#/apprendre" data-landing-journey="${esc(j.id)}" data-dom="${m.dom}"><span class="${markClass(m.mark)}" aria-hidden="true">${esc(m.mark)}</span><span class="nl-chip-text"><strong>${esc(j.title_fr)}</strong><span>${s.steps.length} ${esc(L('cours','courses'))}${s.steps.some(x=>x.done)?` · ${s.steps.filter(x=>x.complete).length}/${s.steps.length} ${esc(L('terminés','done'))}`:''}</span></span>${arrow}</a></li>`}).join('')}</ul>
  </div></section>`:''}

  <section class="nl-band nl-band-surface" aria-labelledby="nl-why-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Nos engagements','What we promise'))}</p><h2 id="nl-why-title">${esc(L('Gratuit, sans compte, et ton travail reste à toi.','Free, no account, and your work stays yours.'))}</h2></div>
    <ul class="nl-why${aide?'':' nl-why-2'}">
      <li class="nl-why-card" data-dom="lang"><span class="nl-why-icon" aria-hidden="true">✓</span>
        <h3 id="nl-own-title">${esc(L('Ton travail reste avec toi','Your work stays with you'))}</h3>
        <p>${esc(L('Pas de compte : ta progression, ton code et tes notes restent sur cet appareil. Exporte une sauvegarde pour les retrouver sur un autre téléphone.','No account: your progress, code and notes stay on this device. Export a backup to find them on another phone.'))}</p>
        <p>${esc(remote.length?L(`Enregistre un cours pour le lire sans connexion. Pour ${remote.join(', ')}, le code s’exécute en ligne : il faut du réseau pour les exercices.`,`Save a course to read it offline. For ${remote.join(', ')}, code runs online: exercises need a connection.`):L('Enregistre un cours et continue sans connexion, même avec peu de données mobiles.','Save a course and keep going offline, even on a small data plan.'))}</p>
        <div class="nl-actions">${first?`<button type="button" class="nl-btn nl-btn-solid" data-onboarding="restore">${esc(L('J’ai déjà une sauvegarde','I already have a backup'))}</button>`:`<a class="nl-btn nl-btn-solid" href="#/progression">${esc(L('Exporter ma progression','Export my progress'))}</a>`}</div>
      </li>
      <li class="nl-why-card" data-dom="algo"><span class="nl-why-icon" aria-hidden="true">✳</span>
        <h3 id="nl-cert-title">${esc(L('Une attestation à chaque cours terminé','A certificate for every finished course'))}</h3>
        <p class="nl-cert-tag">${esc(L('Attestation Nunya · pas un diplôme','Nunya certificate · not a diploma'))}</p>
        <p>${esc(L(`Valide toutes les leçons de l’un des ${catalogue.length} cours : Nunya prépare une attestation à imprimer ou à enregistrer en PDF, avec les modules et les compétences travaillés. C’est la trace de ton travail.${courses.some(isGit)?' Le module Git, suivi à part, n’en délivre pas.':''}`,`Complete every lesson of one of the ${catalogue.length} courses: Nunya prepares a certificate to print or save as PDF, listing the modules and skills you worked on. It is a record of your work.${courses.some(isGit)?' The separate Git module does not issue one.':''}`))}</p>
        <div class="nl-actions"><a class="nl-btn" href="${esc(programme(sample))}">${esc(L('Voir un programme','See a programme'))}</a></div>
      </li>
      ${aide?`<li class="nl-why-card" data-dom="web"><span class="nl-why-icon" aria-hidden="true">?</span>
        <h3 id="nl-aide-title">${esc(L('Nunya Aide quand tu bloques','Nunya Aide when you are stuck'))}</h3>
        <p>${esc(L('Nunya Aide reformule la leçon et te donne des indices, pas la solution. 15 questions par jour ; il faut une connexion, et ton accord est demandé avant le premier envoi.','Nunya Aide rephrases the lesson and gives you hints, not the answer. 15 questions a day; it needs a connection, and you are asked before anything is sent.'))}</p>
        <div class="nl-actions"><button type="button" class="nl-btn" data-aide-open>${esc(L('Poser une question','Ask a question'))}</button></div>
      </li>`:''}
    </ul>
  </div></section>

  <section class="nl-band" aria-labelledby="nl-more-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Et aussi','And also'))}</p><h2 id="nl-more-title">${esc(L('Réviser l’école, préparer l’avenir','Revise for school, prepare your future'))}</h2></div>
    ${state.academy?.activePath?api.resume():''}
    <div class="a-track-grid nl-tracks">
      <a href="#/mes-cours" class="a-track nl-track" data-dom="data"><span class="nl-mark" aria-hidden="true">✎</span><h3>${esc(api.at('school'))}</h3><p>${esc(L('Fiches, exercices et sujets d’examen du collège au lycée.','Notes, exercises and exam papers from lower to upper secondary.'))}</p><b>${esc(api.at('startSchool'))} ${arrow}</b></a>
      <a href="#/avenir" class="a-track nl-track" data-dom="sec"><span class="nl-mark" aria-hidden="true">◎</span><h3>${esc(api.at('future'))}</h3><p>${esc(L('Des métiers au Togo, les compétences qu’ils demandent et les formations pour y arriver.','Jobs in Togo, the skills they need and the training that leads there.'))}</p><b>${esc(api.at('findSkills'))} ${arrow}</b></a>
      <a href="#/revision" class="a-track nl-track" data-dom="algo"><span class="nl-mark" aria-hidden="true">↻</span><h3>${esc(api.at('daily'))}</h3><p>${esc(L('Quelques questions sur ce que tu as déjà vu, pour ne pas l’oublier.','A few questions on what you have already seen, so you do not forget it.'))}</p><b>${esc(api.at('toPractice'))} ${arrow}</b></a>
    </div>
  </div></section>

  ${first?`<section class="nl-band nl-band-surface" aria-labelledby="nl-first-title"><div class="nl-wrap nl-first">
    <h2 id="nl-first-title">${esc(L('Première visite ? Choisis ton ambiance.','First visit? Pick your look.'))}</h2>
    <p>${esc(L('Choisis des couleurs, puis explore librement. Nunya est conçu pour les jeunes de 13 ans et plus ; tes réglages restent sur cet appareil.','Pick your colours, then explore freely. Nunya is designed for young people aged 13 and over; your settings stay on this device.'))}</p>
    <div class="ambiance-quick" role="group" aria-label="${esc(L('Choisir une ambiance','Choose a look'))}">${api.ambiances.map(([id,name])=>`<button type="button" data-ambiance="${esc(id)}" aria-pressed="${state.ambiance===id}"><i class="ambiance-preview" data-preview="${esc(id)}" aria-hidden="true"></i>${esc(name)}</button>`).join('')}</div>
    <div class="nl-actions nl-center"><button type="button" class="nl-btn" data-onboarding="skip">${esc(L('Passer et choisir moi-même','Skip and choose myself'))}</button></div>
  </div></section>`:''}

  <section class="nl-band nl-band-dark nl-close" aria-labelledby="nl-close-title"><div class="nl-wrap">
    <h2 id="nl-close-title">${esc(ret?L('Ta prochaine leçon t’attend.','Your next lesson is waiting.'):L('Prêt ? Ta première leçon commence ici.','Ready? Your first lesson starts here.'))}</h2>
    <p>${esc(ret?`${ret.course.title_fr} · ${ret.go.lesson.title_fr}`:minutes?L(`Environ ${minutes} minutes, dans ton navigateur, sans rien installer.`,`About ${minutes} minutes, in your browser, nothing to install.`):L('Dans ton navigateur, sans rien installer.','In your browser, nothing to install.'))}</p>
    <div class="nl-actions"><a class="primary nl-cta-main" href="${esc(ret?lessonRoute(ret.course,ret.go.lesson.id):firstLesson(python))}">${esc(ret?L('Ouvrir la leçon','Open the lesson'):L('Commencer avec Python','Start with Python'))} ${arrow}</a></div>
  </div></section>`;
}

export function render(){
  const state=api.state(),courses=allCourses();
  if(!courses.length)return '';
  const catalogue=courses.filter(c=>!isGit(c)),techs=technologies(courses),ret=returning(state,courses);
  return `<div class="nl">${strip(techs)}${hero(state,catalogue,courses,techs,ret)}${start(state,catalogue,techs,ret)}${bands(state,catalogue,courses,techs,ret)}</div>`;
}

// Ouvre la fiche d’un parcours métier une fois le catalogue affiché (le bouton « open » y est rendu par coding-journeys.mjs).
// Le catalogue peut se rendre deux fois pendant son chargement : on vérifie que la fiche est bien ouverte, sinon on réessaie.
function openJourney(id,tries=0){
  if(tries>60||tries&&!location.hash.startsWith('#/apprendre'))return;
  const b=document.querySelector(`[data-journey="open"][data-id="${CSS.escape(id)}"]`),modal=document.getElementById('modal');
  if(b)b.click();
  setTimeout(()=>{if(!b||modal?.hidden)openJourney(id,tries+1)},150);
}

function listen(){
  if(listening)return;listening=true;
  // Le routeur intercepte les liens internes au niveau du document : la fiche du parcours est donc demandée dès la phase de capture de window.
  window.addEventListener('click',event=>{const chip=event.target.closest?.('[data-landing-journey]');if(chip)openJourney(chip.dataset.landingJourney)},true);
  // Bandeau des technologies à la souris : la molette verticale le fait défiler à l’horizontale tant qu’il reste des technologies à montrer.
  document.addEventListener('wheel',event=>{
    const list=event.target.closest?.('.nl-strip ul');if(!list||event.ctrlKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
    const max=list.scrollWidth-list.clientWidth;if(max<=0)return;
    const to=Math.max(0,Math.min(max,list.scrollLeft+event.deltaY));if(to===list.scrollLeft)return;
    event.preventDefault();list.scrollLeft=to;
  },{passive:false});
}

// La feuille de style est chargée avant le premier rendu : pas d’accueil sans mise en forme (le cœur la demande déjà en parallèle).
function loadStyles(){
  if(document.getElementById('nl-css'))return Promise.resolve();
  return new Promise((resolve,reject)=>{const link=document.createElement('link');link.rel='stylesheet';link.id='nl-css';link.href=new URL('./home-landing.css',import.meta.url).href;link.onload=resolve;link.onerror=()=>{link.remove();reject(Error('home-landing.css indisponible'))};document.head.append(link)});
}

export async function init(host){api=host;await loadStyles();listen();return {render}}
