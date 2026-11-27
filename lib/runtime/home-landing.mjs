// Accueil guidé : reprise, trois portes vers les espaces principaux, parcours métiers et engagements Nunya.
// Chargé à la demande par dist/coding-curriculum.js (aHome), précaché dans dist/sw.js avec sa feuille runtime/home-landing.css.
// Toutes les données viennent du catalogue (dist/data/curriculum/index.json), de Git et des parcours métiers : aucun identifiant de cours écrit en dur.
import {TECHNOLOGIES,DOMAINS,technology} from './course-catalogue.mjs';
import {JOURNEYS,pathwayStatus} from './coding-journeys.mjs';
import git from '../../dist/data/git/index.json' with {type:'json'};

// Couleur de domaine (jetons --dom-*) : celle du domaine du catalogue ; algorithmique et qualité gardent l’ocre « algo et qualité » du plan.
const DOMAIN_TOKEN={web:'web',langages:'lang',donnees:'data',securite:'sec',outils:'tools'};
const TECH_TOKEN={algo:'algo',qualite:'algo',git:'tools'};
const SCHOOL_YEARS=['Seconde','Première','Terminale'];
// Ordre du bandeau : les langages les plus demandés d’abord, puis le reste du catalogue dans l’ordre des domaines.
const STRIP_FIRST=['html','css','javascript','python','sql','php','java','cpp','git','bash','react','typescript','node','ia'];
const STRIP_LABEL={bash:'Linux',ia:'IA',http:'HTTP',postgres:'PostgreSQL',dom:'DOM',reseaux:'Réseaux',cyber:'Cybersécurité',stats:'Statistiques',algo:'Algorithmes',qualite:'Tests',node:'Node.js'};
// Ces environnements exécutent le code sur un serveur (dist/coding-curriculum.js, coding-remote-worker.js) : leurs leçons restent lisibles hors connexion, pas leurs exercices.
const REMOTE_RUNTIMES=['cpp','bash','java','node','typescript'];

let api=null,listening=false;
const L=(fr,en)=>api.label(fr,en);
const esc=value=>api.esc(String(value??''));
const arrow='<span aria-hidden="true">→</span>';
const plural=(n,fr,frs,en,ens)=>L(n>1?frs:fr,n>1?ens:en);

const domainKey=key=>key==='git'?'outils':DOMAINS.find(x=>x.technologies.includes(key))?.key;
const domainOf=key=>TECH_TOKEN[key]||DOMAIN_TOKEN[domainKey(key)]||'lang';
const schoolYear=state=>state.profile?.status==='highschool'&&SCHOOL_YEARS.includes(state.profile.school)?state.profile.school:null;
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
const actionLabel=r=>r.finished?L('Revoir','Review'):r.go.continue?L('Continuer','Continue'):L('Reprendre','Resume');
const completedMap=(c,state)=>isGit(c)?state.git?.completed:state.curriculum?.completed;
const done=(c,state)=>{const map=completedMap(c,state);return c.lessons.filter(l=>map?.[l.id]===true).length};
const DOMAIN_ICONS={web:'code-xml',data:'database',sec:'shield-check',tools:'wrench',lang:'code-xml',algo:'code-xml'};
const iconImage=name=>`<img src="./icons/${esc(name)}.svg" alt="" aria-hidden="true" width="24" height="24">`;
const domainIcon=key=>DOMAIN_ICONS[key]||'code-xml';

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
  const candidates=[cur.lastLesson,...byCourse.map(([,id])=>id).reverse(),state.git?.last].filter((id,index,list)=>id&&list.indexOf(id)===index);
  let completedAction=null;
  for(const last of candidates){
    const course=courses.find(c=>c.lessons.some(l=>l.id===last));
    if(!course)continue;
    const map=completedMap(course,state)||{},index=course.lessons.findIndex(l=>l.id===last),lesson=course.lessons[index];
    const next=map[last]===true
      ?course.lessons.find((l,i)=>i>index&&!map[l.id])||course.lessons.find(l=>!map[l.id])
      :lesson;
    const module=(course.modules||[]).findIndex(m=>(m.lesson_ids||[]).includes(last));
    if(!next){
      completedAction??={course,lesson,index,module,finished:true,week:rhythm(state),go:{lesson,index,continue:false},count:done(course,state),total:course.lessons.length};
      continue;
    }
    const nextIndex=course.lessons.findIndex(l=>l.id===next.id);
    return {course,lesson,index,module,finished:false,week:rhythm(state),go:{lesson:next,index:nextIndex,continue:next.id!==last},count:done(course,state),total:course.lessons.length};
  }
  return completedAction;
}


function weekText(w){
  if(!w.count)return L('Pas encore cette semaine : une leçon suffit pour reprendre le fil.','Not yet this week: one lesson is enough to pick up the thread.');
  const days=`${w.count} ${plural(w.count,'jour actif','jours actifs','active day','active days')}`;
  return w.exercises?`${days} · ${w.exercises} ${plural(w.exercises,'exercice réussi','exercices réussis','exercise passed','exercises passed')}`:days;
}

function progressCard(r,state){
  const w=r.week,lesson=r.go.lesson,minutes=Number(lesson.minutes);
  const saved=isGit(r.course)?state.git?.savedRevision:state.curriculum?.savedCourses?.[r.course.id];
  const hasSavedCopy=isGit(r.course)?Boolean(state.git?.saved||saved):Boolean(saved);
  const offlineReady=isGit(r.course)?saved===r.course.content_revision:saved===true||saved===r.course.content_revision;
  const offlineLabel=offlineReady
    ?L('Prêt hors ligne','Ready offline')
    :hasSavedCopy?L('À actualiser hors ligne','Update offline copy'):L('À enregistrer hors ligne','Save for offline');
  return `<aside class="nl-progress" data-next-course="${esc(r.course.id)}" data-next-lesson="${esc(lesson.id)}" aria-labelledby="nl-next-action-title">
    <p class="nl-progress-course">${esc(r.course.title_fr)}</p>
    <div class="nl-progress-main"><div class="nl-next-action">
      <p class="nl-next-action-label">${esc(r.finished?L('À revoir à ton rythme','Revisit at your pace'):L('Ma prochaine action','My next step'))}</p>
      <h2 class="nl-next-action-title" id="nl-next-action-title">${esc(lesson.title_fr)}</h2>
    </div></div>
    <ul class="nl-next-action-meta">
      ${Number.isFinite(minutes)&&minutes>0?`<li class="nl-next-action-time">${esc(String(Math.round(minutes)))} ${esc(L('min','min'))}</li>`:''}
      <li class="nl-next-action-offline" data-ready="${offlineReady}">${esc(offlineLabel)}</li>
    </ul>
    <dl class="nl-progress-facts">
      <div><dt>${esc(L('Dans ce cours','In this course'))}</dt><dd>${r.count} / ${r.total} ${esc(L('leçons terminées','lessons completed'))}</dd></div>
      <div><dt>${esc(L('Ces 7 derniers jours','Last 7 days'))}</dt><dd><span class="nl-week" aria-hidden="true">${w.days.map(on=>`<i${on?' class="on"':''}></i>`).join('')}</span><span class="nl-week-text">${esc(weekText(w))}</span></dd></div>
    </dl>
    <a class="nl-progress-link" href="#/progression">${esc(L('Voir toute ma progression','See all my progress'))} ${arrow}</a>
  </aside>`;
}

function hero(state,ret){
  const school=schoolYear(state);
  const personalize=api.onboarding()&&!state.onboarding?.result&&!ret&&!school;
  const name=state.profile?.name;
  const primary=ret
    ?`<a class="primary nl-cta-main" href="${esc(lessonRoute(ret.course,ret.go.lesson.id))}">${esc(actionLabel(ret))}<span class="nl-sr"> : ${esc(ret.course.title_fr)} · ${esc(ret.go.lesson.title_fr)}</span> ${arrow}</a>`
    :school
      ?`<a class="primary nl-cta-main" href="#/mes-cours">${esc(L('Voir mes cours','Browse my classes'))} ${arrow}</a>`
      :`<button class="primary nl-cta-main" type="button" data-home-start>${esc(L('Choisir mon premier pas','Choose my first step'))} ${arrow}</button>`;
  const side=ret?progressCard(ret,state):'';
  const title=ret
    ?`${esc(name?L(`Bon retour, ${name}.`,`Welcome back, ${name}.`):L('Content de te revoir.','Good to see you again.'))} <span>${esc(L('On continue ?','Shall we go on?'))}</span>`
    :school
      ?`${esc(L('Révise à ton rythme.','Study at your pace.'))} <span>${esc(school)}</span>`
      :`${esc(L('Apprends le numérique.','Build digital skills.'))} <span>${esc(L('En français, à ton rythme.','In French, at your pace.'))}</span>`;
  const lead=ret
    ?L(`Tu en étais à « ${ret.lesson.title_fr} ». Ta progression reste sur cet appareil ; certains ateliers et services ont besoin d’Internet.`,`You were on “${ret.lesson.title_fr}”. Your progress stays on this device; some workshops and services need the internet.`)
    :school
      ?L(`Retrouve tes cours de ${school} et lance ta révision du jour.`,`Find your ${school} classes and start your daily review.`)
      :L('Code, révise tes cours et découvre des métiers. Choisis où commencer, sans créer de compte.','Code, revise your classes and explore careers. Choose where to start, without creating an account.');
  return `<section class="nl-hero a-home-hero${ret?'':' nl-hero--photo'}" aria-labelledby="nl-title">
    <div class="nl-wrap nl-hero-grid">
      <div class="nl-hero-text">
        <p class="nl-kicker">${esc(L('Apprendre aujourd’hui · construire demain','Learn today · build tomorrow'))}</p>
        <h1 id="nl-title">${title}</h1>
        <p class="nl-lead">${esc(lead)}</p>
        <div class="nl-cta curr-entry a-start">${primary}${personalize?`<button class="nl-ghost" type="button" data-onboarding="begin">${esc(L('Personnaliser mon parcours','Personalize my path'))}</button>`:''}</div>
        <ul class="nl-hero-facts" aria-label="${esc(L('À propos des cours','About the courses'))}">
          <li>${esc(L('En français','In French'))}</li>
          <li>${esc(L('Sans compte obligatoire','No account required'))}</li>
          <li>${esc(L('Progression sur cet appareil','Progress saved on this device'))}</li>
        </ul>
      </div>
      <div class="nl-hero-side">${side}</div>
    </div>
  </section>`;
}

// Trois portes vers les espaces principaux : apprendre, réviser et découvrir les métiers.
function start(ret,state){
  const school=schoolYear(state);
  const learnDoor={question:L('Apprendre','Learn'),icon:'code-xml',title:L('Apprendre à coder','Learn to code'),text:L('Des cours en français, des explications et des exercices pratiques.','Courses in French, with explanations and hands-on exercises.'),href:'#/apprendre',action:L('Explorer les cours','Explore courses'),dom:'web'};
  const schoolDoor={question:L('Réviser','Revise'),icon:'book-open-check',title:L('Mes cours & examens','My classes & exams'),text:L('Des fiches et des sujets pour réviser du collège au lycée.','Study notes and exam papers for secondary school.'),href:'#/mes-cours',action:L('Voir mes cours','Browse classes'),extraHref:'#/revision',extraAction:L('Révision du jour','Daily review'),dom:'data'};
  const careerDoor={question:L('Découvrir','Explore'),icon:'briefcase-business',title:L('Mon avenir','My future'),text:L('Des métiers, des parcours et des opportunités à explorer.','Careers, learning paths and opportunities to explore.'),href:'#/avenir',action:L('Explorer les métiers','Explore careers'),dom:'sec'};
  const exploreDoor={question:L('Autre option','Another option'),icon:'code-xml',title:L('Explorer les autres cours','Explore other courses'),text:L('Parcours le catalogue et choisis un autre sujet à apprendre.','Browse the catalogue and choose another subject to learn.'),href:'#/apprendre',action:L('Ouvrir le catalogue','Browse courses'),dom:'web'};
  const schoolAlternative={...schoolDoor,question:L('Autre option','Another option'),extraHref:null,extraAction:null};
  const revisionDoor={question:L('Réviser','Revise'),icon:'rotate-cw',title:L('Révision du jour','Today’s review'),text:L('Quelques questions pour consolider ce que tu as déjà vu.','A few questions to reinforce what you have already learned.'),href:'#/revision',action:L('Lancer ma révision','Start my review'),dom:'algo'};
  const resumePath=state.academy?.activePath?api.resume():'';
  const doors=ret
    ?school?[schoolAlternative]:resumePath?[]:[exploreDoor]
    :school?[revisionDoor]:[learnDoor,schoolDoor,careerDoor];
  const showResumePath=Boolean(resumePath)&&(!ret||!school);
  const showBeginnerLink=!ret&&!school;
  const heading=ret
    ?L('Une autre option','One more option')
    :school
      ?L('Tes cours et révisions, au même endroit','Your classes and reviews, in one place')
      :L('Trois espaces pour avancer','Three ways to get started');
  const title=ret
    ?L('Tu peux aussi explorer autre chose.','You can also explore something else.')
    :school
      ?L(`Pour ta classe de ${school}`,'For your class of '+school)
      :L('Choisis ton premier pas.','Choose your first step.');
  const lead=ret
    ?L('Ta prochaine leçon est prête ; voici une autre piste si tu en as envie.','Your next lesson is ready; here is one other option if you want it.')
    :school
      ?L('Accède à tes matières ou fais une courte révision.','Open your subjects or do a quick review.')
      :L('Tu peux explorer librement et revenir quand tu veux. Ta progression reste sur cet appareil.','Explore freely and come back any time. Your progress stays on this device.');
  return `<section class="nl-band" aria-labelledby="nl-start-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(heading)}</p><h2 id="nl-start-title">${esc(title)}</h2><p>${esc(lead)}</p></div>
    ${showResumePath?resumePath:''}
    ${doors.length?`<ul class="nl-doors${doors.length===1?' nl-doors-single':''}">${doors.map(d=>`<li class="nl-door" data-dom="${d.dom}">
      <p class="nl-door-q">${esc(d.question)}</p>
      <div class="nl-door-head"><span class="nl-mark" aria-hidden="true">${iconImage(d.icon)}</span><h3>${esc(d.title)}</h3></div>
      <p class="nl-door-text">${esc(d.text)}</p>
      <div class="nl-door-actions"><a class="nl-btn nl-btn-solid" href="${d.href}">${esc(d.action)} ${arrow}</a>${d.extraHref?`<a class="nl-door-secondary" href="${d.extraHref}">${esc(d.extraAction)} ${arrow}</a>`:''}</div>
    </li>`).join('')}</ul>`:''}
    ${showBeginnerLink?`<p class="nl-zero">${esc(L('Jamais utilisé un ordinateur ou un téléphone pour apprendre ?','Never used a computer or phone to learn?'))} <a href="#/apprendre/decouverte">${esc(L('Commence par le niveau 0 : Découverte du numérique','Start with level 0: Digital discovery'))}</a></p>`:''}
  </div></section>`;
}

function bands(state,catalogue,courses,techs,ret){
  const first=api.onboarding()&&!state.academy?.onboarded;
  const sample=ret&&!isGit(ret.course)?ret.course:catalogue.find(c=>technology(c).key==='python')||catalogue[0];
  const journeys=JOURNEYS.map(j=>({j,s:pathwayStatus(j,api.catalogue(),state)})).filter(x=>x.s.available);
  const remote=[...new Set(catalogue.filter(c=>REMOTE_RUNTIMES.includes(c.runtime)).map(c=>{const k=technology(c).key;return k==='projetfs'?L('le projet full-stack','the full-stack project'):STRIP_LABEL[k]||TECHNOLOGIES[k]?.label||k}))];
  const python=techs.find(t=>t.key==='python')?.course||courses[0],minutes=python?.lessons?.[0]?.minutes;
  const journeyMark=j=>{const c=catalogue.find(x=>x.id===j.course_ids?.[0]),dom=domainOf(c?technology(c).key:'python');return {icon:domainIcon(dom),dom}};
  const aide=api.aide();
  return `
  <details class="nl-extras"><summary>${esc(L('Parcours métiers et infos utiles','Career paths and useful info'))}</summary>
  ${journeys.length?`<section class="nl-band nl-band-dark" aria-labelledby="nl-jobs-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Des parcours métiers','Career paths'))}</p><h2 id="nl-jobs-title">${esc(L('Un métier en tête ? Suis son parcours.','A job in mind? Follow its path.'))}</h2><p>${esc(L('Chaque parcours met les cours dans le bon ordre et suit ton avancée, étape par étape.','Each path puts the courses in the right order and tracks your progress, step by step.'))}</p></div>
    <ul class="nl-chips">${journeys.map(({j,s})=>{const m=journeyMark(j);return `<li><a class="nl-chip" href="#/apprendre" data-landing-journey="${esc(j.id)}" data-dom="${m.dom}"><span class="nl-mark" aria-hidden="true">${iconImage(m.icon)}</span><span class="nl-chip-text"><strong>${esc(j.title_fr)}</strong><span>${s.steps.length} ${esc(L('cours','courses'))}${s.steps.some(x=>x.done)?` · ${s.steps.filter(x=>x.complete).length}/${s.steps.length} ${esc(L('terminés','done'))}`:''}</span></span>${arrow}</a></li>`}).join('')}</ul>
  </div></section>`:''}

  <section class="nl-band nl-band-surface" aria-labelledby="nl-why-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Nos engagements','What we promise'))}</p><h2 id="nl-why-title">${esc(L('Gratuit, sans compte, et ton travail reste à toi.','Free, no account, and your work stays yours.'))}</h2></div>
    <ul class="nl-why${aide?'':' nl-why-2'}">
      <li class="nl-why-card" data-dom="lang"><span class="nl-why-icon" aria-hidden="true">${iconImage('smartphone')}</span>
        <h3 id="nl-own-title">${esc(L('Ton travail reste avec toi','Your work stays with you'))}</h3>
        <p>${esc(L('Pas de compte : ta progression, ton code et tes notes restent sur cet appareil. Exporte une sauvegarde pour les retrouver sur un autre téléphone.','No account: your progress, code and notes stay on this device. Export a backup to find them on another phone.'))}</p>
        <p>${esc(remote.length?L(`Enregistre un cours pour le lire sans connexion. Pour ${remote.join(', ')}, le code s’exécute en ligne : il faut du réseau pour les exercices.`,`Save a course to read it offline. For ${remote.join(', ')}, code runs online: exercises need a connection.`):L('Enregistre un cours et continue sans connexion, même avec peu de données mobiles.','Save a course and keep going offline, even on a small data plan.'))}</p>
        <div class="nl-actions">${first?`<button type="button" class="nl-btn nl-btn-solid" data-onboarding="restore">${esc(L('J’ai déjà une sauvegarde','I already have a backup'))}</button>`:`<a class="nl-btn nl-btn-solid" href="#/progression">${esc(L('Exporter ma progression','Export my progress'))}</a>`}</div>
      </li>
      <li class="nl-why-card" data-dom="algo"><span class="nl-why-icon" aria-hidden="true">${iconImage('award')}</span>
        <h3 id="nl-cert-title">${esc(L('Une attestation à chaque cours terminé','A certificate for every finished course'))}</h3>
        <p class="nl-cert-tag">${esc(L('Attestation Nunya · pas un diplôme','Nunya certificate · not a diploma'))}</p>
        <p>${esc(L(`Valide toutes les leçons de l’un des ${catalogue.length} cours : Nunya prépare une attestation à imprimer ou à enregistrer en PDF, avec les modules et les compétences travaillés. C’est la trace de ton travail.${courses.some(isGit)?' Le module Git, suivi à part, n’en délivre pas.':''}`,`Complete every lesson of one of the ${catalogue.length} courses: Nunya prepares a certificate to print or save as PDF, listing the modules and skills you worked on. It is a record of your work.${courses.some(isGit)?' The separate Git module does not issue one.':''}`))}</p>
        <div class="nl-actions"><a class="nl-btn" href="${esc(programme(sample))}">${esc(L('Voir un programme','See a programme'))}</a></div>
      </li>
      ${aide?`<li class="nl-why-card" data-dom="web"><span class="nl-why-icon" aria-hidden="true">${iconImage('message-circle-question-mark')}</span>
        <h3 id="nl-aide-title">${esc(L('Nunya Aide quand tu bloques','Nunya Aide when you are stuck'))}</h3>
        <p>${esc(L('Nunya Aide reformule la leçon et te donne des indices, pas la solution. 15 questions par jour ; il faut une connexion, et ton accord est demandé avant le premier envoi.','Nunya Aide rephrases the lesson and gives you hints, not the answer. 15 questions a day; it needs a connection, and you are asked before anything is sent.'))}</p>
        <div class="nl-actions"><button type="button" class="nl-btn" data-aide-open>${esc(L('Poser une question','Ask a question'))}</button></div>
      </li>`:''}
    </ul>
  </div></section>
  </details>

  ${first?`<section class="nl-band nl-band-surface" aria-labelledby="nl-first-title"><div class="nl-wrap nl-first">
    <h2 id="nl-first-title">${esc(L('Première visite ? Choisis ton ambiance.','First visit? Pick your look.'))}</h2>
    <p>${esc(L('Choisis des couleurs, puis explore librement. Nunya est conçu pour les jeunes de 13 ans et plus ; tes réglages restent sur cet appareil.','Pick your colours, then explore freely. Nunya is designed for young people aged 13 and over; your settings stay on this device.'))}</p>
    <div class="ambiance-quick" role="group" aria-label="${esc(L('Choisir une ambiance','Choose a look'))}">${api.ambiances.map(([id,name])=>`<button type="button" data-ambiance="${esc(id)}" aria-pressed="${state.ambiance===id}"><i class="ambiance-preview" data-preview="${esc(id)}" aria-hidden="true"></i>${esc(name)}</button>`).join('')}</div>
    <div class="nl-actions nl-center"><button type="button" class="nl-btn" data-onboarding="skip">${esc(L('Passer et choisir moi-même','Skip and choose myself'))}</button></div>
  </div></section>`:''}

  `;
}

export function render(){
  const state=api.state(),courses=allCourses();
  if(!courses.length)return '';
  const catalogue=courses.filter(c=>!isGit(c)),techs=technologies(courses),ret=returning(state,courses);
  return `<div class="nl nl-reference">${hero(state,ret)}${start(ret,state)}${bands(state,catalogue,courses,techs,ret)}</div>`;
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
  document.addEventListener('click',event=>{
    if(!event.target.closest?.('[data-home-start]'))return;
    document.getElementById('nl-start-title')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
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
