// Accueil « vitrine » (5.28.0) : bandeau des technologies, héros, exemples de code en onglets, tuiles des technologies et bandes thématiques.
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
const LEVEL={debutant:['Débutant','Beginner'],intermediaire:['Intermédiaire','Intermediate'],avance:['Avancé','Advanced']};
// Tuiles : une par technologie (le DOM rejoint JavaScript, les deux projets guidés partagent une tuile), rangées par domaine.
const TILE_GROUP={dom:'javascript',projetfs:'projetweb'};
const TILE_LABEL={projetweb:['Projets guidés','Guided projects'],bash:['Terminal et Linux','Terminal and Linux'],ia:['Intelligence artificielle','Artificial intelligence']};
const GROUPS=[
  {keys:['web'],fr:'Web : sites et applications',en:'Web: sites and apps'},
  {keys:['langages'],fr:'Langages de programmation',en:'Programming languages'},
  {keys:['donnees'],fr:'Données et IA',en:'Data and AI'},
  {keys:['securite','outils'],fr:'Sécurité, systèmes et outils',en:'Security, systems and tools'}
];
// Ces environnements exécutent le code sur un serveur (dist/coding-curriculum.js, coding-remote-worker.js) : leurs leçons restent lisibles hors connexion, pas leurs exercices.
const REMOTE_RUNTIMES=['cpp','bash','java','node','typescript'];

// Exemples originaux (onglets « Que veux-tu apprendre ? »), avec leur résultat exact.
const SAMPLES=[
  {tech:'html',file:'cooperative.html',lang:'html',code:'<article class="produit">\n  <h2>Coopérative de Kpalimé</h2>\n  <p>Café et cacao, récoltés à la main.</p>\n  <ul>\n    <li>Café arabica · 2500 FCFA</li>\n    <li>Cacao en poudre · 1500 FCFA</li>\n  </ul>\n  <a href="#commande">Commander</a>\n</article>',
    fr:'Les balises décrivent la page : un titre, un paragraphe, une liste, un lien. Le navigateur se charge de l’afficher.',en:'Tags describe the page: a heading, a paragraph, a list, a link. The browser displays it.',
    result:'<div class="nl-pv"><b class="nl-pv-h">Coopérative de Kpalimé</b><span>Café et cacao, récoltés à la main.</span><ul class="nl-pv-list"><li>Café arabica · 2500 FCFA</li><li>Cacao en poudre · 1500 FCFA</li></ul><span class="nl-pv-link">Commander</span></div>'},
  {tech:'css',file:'style.css',lang:'css',code:'.carte {\n  background: #e0f2f1;\n  border-radius: 16px;\n  padding: 20px;\n}\n.carte h2 {\n  color: teal;\n  margin: 0;\n}',
    fr:'Une règle choisit des éléments, puis décrit leur apparence : couleurs, espaces, coins arrondis.',en:'A rule selects elements, then describes how they look: colours, spacing, rounded corners.',
    result:'<div class="nl-pv nl-pv-card"><b class="nl-pv-h">Marché de Lomé</b><span>Ouvert du lundi au samedi.</span></div>'},
  {tech:'javascript',file:'panier.js',lang:'js',code:'const panier = [\n  { nom: "Mangue", prix: 500 },\n  { nom: "Pain", prix: 1200 },\n  { nom: "Sucre", prix: 300 }\n];\nconst total = panier.reduce((s, a) => s + a.prix, 0);\nconsole.log(`Total : ${total} FCFA`);',
    fr:'Un tableau d’articles, une fonction qui additionne leurs prix, et le total s’affiche dans la console.',en:'An array of items, a function that adds up their prices, and the total appears in the console.',
    result:'<samp class="nl-out">Total : 2000 FCFA</samp>'},
  {tech:'python',file:'fruits.py',lang:'py',code:'fruits = ["mangue", "papaye", "goyave"]\nfor fruit in fruits:\n    print("J’aime la", fruit)\nprint("Total :", len(fruits), "fruits")',
    fr:'Une liste et une boucle : Python répète l’instruction pour chaque élément, puis compte les éléments.',en:'A list and a loop: Python repeats the instruction for each item, then counts the items.',
    result:'<samp class="nl-out">J’aime la mangue\nJ’aime la papaye\nJ’aime la goyave\nTotal : 3 fruits</samp>'},
  {tech:'sql',file:'club.sql',lang:'sql',code:'SELECT nom, ville, age\nFROM membres\nWHERE ville = \'Lomé\'\n  AND age >= 15\nORDER BY nom;',
    fr:'Une requête interroge une table : on choisit les colonnes, on filtre les lignes, on trie.',en:'A query asks a table: pick the columns, filter the rows, sort them.',
    result:'<table class="nl-pv-table"><thead><tr><th scope="col">nom</th><th scope="col">ville</th><th scope="col">age</th></tr></thead><tbody><tr><td>Abla</td><td>Lomé</td><td>16</td></tr><tr><td>Kodjo</td><td>Lomé</td><td>15</td></tr><tr><td>Yao</td><td>Lomé</td><td>17</td></tr></tbody></table>'}
];
const HERO_CODE='prenom = "Afi"\nprint("Bonjour", prenom, "!")\nfor jour in range(1, 4):\n    print("Jour", jour, ": je code")';
const HERO_OUT='Bonjour Afi !\nJour 1 : je code\nJour 2 : je code\nJour 3 : je code';

// Coloration minimale, sans dépendance : règles collantes essayées dans l’ordre, le reste en texte simple.
const RULES={
  py:[['c',/#[^\n]*/y],['s',/"[^"\n]*"|'[^'\n]*'/y],['k',/\b(?:for|in|if|elif|else|while|def|return|import|from|True|False|None)\b/y],['f',/\b[a-z_]\w*(?=\()/y],['n',/\b\d+\b/y]],
  js:[['c',/\/\/[^\n]*/y],['s',/`[^`]*`|"[^"\n]*"|'[^'\n]*'/y],['k',/\b(?:const|let|function|return|if|else|for|of|new)\b/y],['f',/\b[A-Za-z_]\w*(?=\()/y],['n',/\b\d+\b/y]],
  html:[['c',/<!--[\s\S]*?-->/y],['t',/<\/?[a-z][\w-]*|\/?>/y],['a',/\b[a-z-]+(?==)/y],['s',/"[^"]*"/y]],
  css:[['c',/\/\*[\s\S]*?\*\//y],['t',/[.#]?[a-z][\w-]*(?: [a-z][\w-]*)*(?=\s*\{)/y],['a',/[a-z-]+(?=\s*:)/y],['n',/#[0-9a-f]{3,8}\b|\b\d+(?:px|rem|%)?/y]],
  sql:[['c',/--[^\n]*/y],['s',/'[^'\n]*'/y],['k',/\b(?:SELECT|FROM|WHERE|ORDER BY|GROUP BY|AND|OR|AS|LIMIT)\b/y],['n',/\b\d+\b/y]]
};

let api=null,activeTab=0,listening=false;
const L=(fr,en)=>api.label(fr,en);
const esc=value=>api.esc(String(value??''));
const arrow='<span aria-hidden="true">→</span>';

function highlight(code,lang){
  const rules=RULES[lang]||[];let out='',plain='',i=0;
  const flush=()=>{out+=esc(plain);plain=''};
  while(i<code.length){
    let hit=null;
    for(const [cls,re] of rules){re.lastIndex=i;const m=re.exec(code);if(m&&m[0]){hit=[cls,m[0]];break}}
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

// Apprenant qui revient : la dernière leçon ouverte (catalogue, sinon dernier cours ouvert, sinon Git), la suite et l’activité réelle des 7 derniers jours.
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
  // work[id].firstSuccess est la durée jusqu’à la première réussite, comptée depuis work[id].started : leur somme date la réussite.
  const since=Date.now()-7*864e5,week=Object.values(cur.work||{}).filter(w=>w?.passed&&Number(w.firstSuccess)>0&&Number(w.started)+Number(w.firstSuccess)>=since).length;
  const completed=map[last]===true,go=completed&&next?{lesson:next,index:nextIndex,continue:true}:{lesson,index,continue:false};
  return {course,lesson,index,next,module,week,go,count:done(course,state),total:course.lessons.length};
}

function strip(techs){
  return `<nav class="nl-strip" aria-label="${esc(L('Technologies du catalogue','Catalogue technologies'))}"><ul>${techs.map(t=>`<li><a href="${esc(programme(t.course))}">${esc(t.label)}</a></li>`).join('')}</ul></nav>`;
}

const dots='<span class="nl-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
function codeCard(code,out,file,lang,cta){
  return `<figure class="nl-editor" aria-label="${esc(L('Exemple de programme et son résultat','Sample program and its output'))}">
    <div class="nl-editor-bar">${dots}<span class="nl-editor-file">${esc(file)}</span></div>
    <pre class="nl-code"><code>${highlight(code,lang)}</code></pre>
    <div class="nl-editor-out"><span class="nl-editor-label">${esc(L('Résultat','Output'))}</span><samp class="nl-out">${esc(out)}</samp></div>
    ${cta||''}
  </figure>`;
}

// Anneau d’avancement : au moins un petit arc visible dès la première leçon terminée, pourcentage au centre.
function ring(count,total){
  const pct=total?count/total*100:0,draw=count?Math.max(4,pct):0;
  return `<span class="nl-ring"><svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="nl-ring-track" cx="24" cy="24" r="20" pathLength="100"/>${draw?`<circle class="nl-ring-fill" cx="24" cy="24" r="20" pathLength="100" stroke-dasharray="${Math.round(draw*10)/10} 100"/>`:''}</svg><b>${Math.round(pct)} %</b></span>`;
}

function progressCard(r){
  const n=r.week;
  return `<aside class="nl-progress" aria-label="${esc(L('Ma progression','My progress'))}">
    <p class="nl-progress-course">${esc(r.course.title_fr)}</p>
    <div class="nl-progress-main">${ring(r.count,r.total)}<p><strong>${r.count}<span>/${r.total}</span></strong>${esc(L('leçons terminées','lessons completed'))}</p></div>
    <dl class="nl-progress-facts">
      <div><dt>${esc(L('Tu en es à','You are at'))}</dt><dd>${esc(L('Leçon','Lesson'))} ${r.index+1}${r.module>=0?` · ${esc(L('Module','Module'))} ${r.module+1}`:''}<br><span>${esc(r.lesson.title_fr)}</span></dd></div>
      ${n?`<div><dt>${esc(L('Ces 7 derniers jours','Last 7 days'))}</dt><dd>${n} ${esc(n===1?L('exercice réussi','exercise passed'):L('exercices réussis','exercises passed'))}</dd></div>`:''}
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
  const side=ret?progressCard(ret):codeCard(HERO_CODE,HERO_OUT,'bonjour.py','py',`<a class="nl-editor-try" href="${esc(firstLesson(python))}">${esc(L('Essayer ce programme','Try this program'))} ${arrow}</a>`);
  const title=ret
    ?`${esc(name?L(`Bon retour, ${name}.`,`Welcome back, ${name}.`):L('Content de te revoir.','Good to see you again.'))} <span>${esc(L('On continue ?','Shall we go on?'))}</span>`
    :`${esc(L('Apprends à coder.','Learn to code.'))} <span>${esc(L('En français.','In French.'))}</span>`;
  const lead=ret
    ?L(`Tu en étais à « ${ret.lesson.title_fr} ». Ta progression reste sur cet appareil, avec ou sans connexion.`,`You were on “${ret.lesson.title_fr}”. Your progress stays on this device, online or offline.`)
    :L(`${catalogue.length} cours gratuits et ${lessons} leçons, sans compte ni publicité. La plupart des exercices tournent dans ton navigateur, et un cours enregistré se lit même hors connexion.`,`${catalogue.length} free courses and ${lessons} lessons, no account and no ads. Most exercises run in your browser, and a saved course can be read offline.`);
  return `<section class="nl-hero a-home-hero" aria-labelledby="nl-title">
    <div class="nl-wrap nl-hero-grid">
      <div class="nl-hero-text">
        <p class="nl-kicker">${esc(L('Gratuit · en français · à ton rythme','Free · in French · at your pace'))}</p>
        <h1 id="nl-title">${title}</h1>
        <p class="nl-lead">${esc(lead)}</p>
        <form class="nl-search" role="search" data-landing-search>
          <label class="nl-sr" for="nl-q">${esc(L('Rechercher une notion ou un cours','Search for a topic or a course'))}</label>
          <svg class="nl-search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>
          <input id="nl-q" name="q" type="search" autocomplete="off" enterkeyhint="search" placeholder="${esc(L('Boucle, formulaire, requête…','Loop, form, query…'))}">
          <button type="submit">${esc(L('Rechercher','Search'))}</button>
        </form>
        <div class="nl-cta curr-entry a-start">${primary}${personalize?`<button class="nl-ghost" type="button" data-onboarding="begin">${esc(L('Personnaliser mon parcours','Personalise my path'))}</button>`:''}<a class="nl-all text-button" href="#/apprendre">${esc(L(`Voir les ${catalogue.length} cours`,`See all ${catalogue.length} courses`))} ${arrow}</a></div>
      </div>
      <div class="nl-hero-side">${side}</div>
    </div>
    <div class="nl-weave" aria-hidden="true"></div>
  </section>`;
}

function learn(techs){
  const rows=SAMPLES.map(s=>({...s,course:techs.find(t=>t.key===s.tech)?.course})).filter(s=>s.course);
  if(!rows.length)return '';
  if(activeTab>=rows.length)activeTab=0;
  return `<section class="nl-band" aria-labelledby="nl-learn-title"><div class="nl-wrap">
    <div class="nl-head nl-head-center"><p class="nl-eyebrow">${esc(L('Des exemples à lire tout de suite','Examples to read right now'))}</p><h2 id="nl-learn-title">${esc(L('Que veux-tu apprendre ?','What do you want to learn?'))}</h2><p>${esc(L('Choisis un langage : un petit programme, son résultat, puis la vraie leçon dans Nunya.','Pick a language: a short program, its result, then the real lesson in Nunya.'))}</p></div>
    <div class="nl-tabs" role="tablist" aria-label="${esc(L('Langages','Languages'))}">${rows.map((s,i)=>`<button type="button" role="tab" id="nl-tab-${s.tech}" aria-controls="nl-panel-${s.tech}" aria-selected="${i===activeTab}" tabindex="${i===activeTab?0:-1}" data-nl-tab="${i}" data-dom="${domainOf(s.tech)}"><span class="nl-tab-mark" aria-hidden="true">${esc(TECHNOLOGIES[s.tech]?.mark||'')}</span>${esc(TECHNOLOGIES[s.tech]?.label||s.tech)}</button>`).join('')}</div>
    ${rows.map((s,i)=>`<div class="nl-panel" role="tabpanel" id="nl-panel-${s.tech}" aria-labelledby="nl-tab-${s.tech}" tabindex="0"${i===activeTab?'':' hidden'}>
      <div class="nl-sample">
        <div class="nl-sample-code"><div class="nl-editor-bar">${dots}<span class="nl-editor-file">${esc(s.file)}</span></div><pre class="nl-code"><code>${highlight(s.code,s.lang)}</code></pre></div>
        <div class="nl-sample-out"><span class="nl-editor-label">${esc(L('Résultat','Result'))}</span>${s.result}</div>
      </div>
      <p class="nl-sample-text">${esc(L(s.fr,s.en))}</p>
      <div class="nl-sample-actions"><a class="nl-btn nl-btn-solid" href="${esc(firstLesson(s.course))}">${esc(L('Essayer dans Nunya','Try it in Nunya'))} ${arrow}</a><a class="nl-btn" href="${esc(programme(s.course))}">${esc(L('Voir le programme','See the programme'))}</a></div>
    </div>`).join('')}
  </div></section>`;
}

// Première phrase du résumé d’un cours (coupée visuellement à deux lignes).
const tagline=c=>String(c.summary_fr||'').split(/(?<=[.!?])\s/)[0];
function tiles(courses,state){
  const order=DOMAINS.flatMap(d=>d.technologies);
  const rank=key=>{const i=key==='git'?order.length:order.indexOf(key);return i<0?99:i};
  const byTech=new Map();
  for(const c of courses){const key=technology(c).key,k=TILE_GROUP[key]||key;if(!byTech.has(k))byTech.set(k,[]);byTech.get(k).push(c)}
  const tile=(key,list)=>{
    list.sort((a,b)=>levelRank(a)-levelRank(b));
    const t=TECHNOLOGIES[key]||technology(list[0]),label=TILE_LABEL[key]?L(...TILE_LABEL[key]):t.label;
    return `<li class="nl-tile" data-dom="${domainOf(key)}">
      <div class="nl-tile-head"><span class="nl-mark${[...t.mark].length>2?' nl-mark-long':''}" aria-hidden="true">${esc(t.mark)}</span><strong class="nl-tile-title">${esc(label)}</strong></div>
      <p class="nl-tile-sub">${esc(tagline(list[0]))}</p>
      <ul class="nl-tile-levels">${list.map(c=>{const n=done(c,state),lvl=LEVEL[c.level]||[c.level,c.level];
        return `<li><a href="${esc(programme(c))}"><span class="nl-sr">${esc(c.title_fr)}, </span><span class="nl-lvl">${esc(L(lvl[0],lvl[1]))}</span><span class="nl-lvl-meta">${n?`${n}/${c.lessons.length}`:c.lessons.length} ${esc(L('leçons','lessons'))}</span>${arrow}</a></li>`}).join('')}</ul>
    </li>`};
  const groups=GROUPS.map(g=>({...g,keys:[...byTech.keys()].filter(k=>g.keys.includes(domainKey(TILE_GROUP[k]||k)??'')).sort((a,b)=>rank(a)-rank(b))}));
  const placed=new Set(groups.flatMap(g=>g.keys)),rest=[...byTech.keys()].filter(k=>!placed.has(k));
  if(rest.length)groups.push({fr:'Autres cours',en:'Other courses',keys:rest});
  return `<section class="nl-band nl-band-surface" aria-labelledby="nl-courses-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Le catalogue','The catalogue'))}</p><h2 id="nl-courses-title">${esc(L('Tous les cours','All courses'))}</h2><p>${esc(L('Du premier programme au projet complet. Chaque cours mêle explications, exercices vérifiés et petits tests.','From your first program to a full project. Every course mixes explanations, checked exercises and short quizzes.'))}</p></div>
    ${groups.filter(g=>g.keys.length).map((g,i)=>`<div class="nl-group" data-dom="${domainOf(TILE_GROUP[g.keys[0]]||g.keys[0])}"><h3 class="nl-group-title" id="nl-group-${i}"><span class="nl-swatch" aria-hidden="true"></span>${esc(L(g.fr,g.en))}</h3>
      <ul class="nl-tiles" aria-labelledby="nl-group-${i}">${g.keys.map(k=>tile(k,byTech.get(k))).join('')}</ul></div>`).join('')}
    <p class="nl-center"><a class="nl-btn nl-btn-solid" href="#/apprendre">${esc(L('Ouvrir le catalogue','Open the catalogue'))} ${arrow}</a></p>
  </div></section>`;
}

function bands(state,catalogue,courses,techs,ret){
  const first=api.onboarding()&&!state.academy?.onboarded;
  const sample=ret&&!isGit(ret.course)?ret.course:catalogue.find(c=>technology(c).key==='python')||catalogue[0];
  const journeys=JOURNEYS.map(j=>({j,s:pathwayStatus(j,api.catalogue(),state)})).filter(x=>x.s.available);
  const remote=[...new Set(catalogue.filter(c=>REMOTE_RUNTIMES.includes(c.runtime)).map(c=>{const k=technology(c).key;return k==='projetfs'?L('le projet full-stack','the full-stack project'):STRIP_LABEL[k]||TECHNOLOGIES[k]?.label||k}))];
  const python=techs.find(t=>t.key==='python')?.course||courses[0],minutes=python?.lessons?.[0]?.minutes;
  const paths=api.paths?.()||'';
  const journeyMark=j=>{const c=catalogue.find(x=>x.id===j.course_ids?.[0]),k=c?technology(c).key:'python';return {mark:TECHNOLOGIES[k]?.mark||'Py',dom:domainOf(k)}};
  return `
  <section class="nl-band" aria-labelledby="nl-own-title"><div class="nl-wrap nl-split">
    <div class="nl-split-text">
      <p class="nl-eyebrow">${esc(L('Sur ton appareil','On your device'))}</p>
      <h2 id="nl-own-title">${esc(L('Ton travail reste avec toi.','Your work stays with you.'))}</h2>
      <ul class="nl-checks">
        <li>${esc(L('Pas de compte : ta progression, ton code et tes notes restent sur cet appareil.','No account: your progress, code and notes stay on this device.'))}</li>
        <li>${esc(remote.length?L(`Enregistre un cours pour le lire sans connexion, même avec peu de données mobiles. Pour ${remote.join(', ')}, le code s’exécute en ligne : il faut du réseau pour les exercices.`,`Save a course to read it offline, even on a small data plan. For ${remote.join(', ')}, code runs online: exercises need a connection.`):L('Enregistre un cours et continue sans connexion, même avec peu de données mobiles.','Save a course and keep going offline, even on a small data plan.'))}</li>
        <li>${esc(L('Exporte une sauvegarde dans un fichier, puis restaure-la sur un autre téléphone.','Export a backup file, then restore it on another phone.'))}</li>
      </ul>
      <div class="nl-actions">${first?`<button type="button" class="nl-btn nl-btn-solid" data-onboarding="restore">${esc(L('J’ai déjà une sauvegarde','I already have a backup'))}</button>`:`<a class="nl-btn nl-btn-solid" href="#/progression">${esc(L('Exporter ma progression','Export my progress'))}</a>`}<a class="nl-btn" href="#/apprendre">${esc(L('Enregistrer un cours','Save a course'))}</a></div>
    </div>
    <div class="nl-split-art" aria-hidden="true"><div class="nl-file"><span class="nl-file-name">nunya-sauvegarde.json</span><span class="nl-file-row" data-dom="lang"><i></i>${esc(sample.title_fr)}<b>${ret&&!isGit(ret.course)?ret.count+'/'+ret.total:done(sample,state)+'/'+sample.lessons.length}</b></span><span class="nl-file-row" data-dom="web"><i></i>${esc(L('Code des exercices','Exercise code'))}<b>✓</b></span><span class="nl-file-row" data-dom="data"><i></i>${esc(L('Notes et préférences','Notes and settings'))}<b>✓</b></span><span class="nl-file-foot">${esc(L('Reste sur ton téléphone','Stays on your phone'))}</span></div></div>
  </div></section>

  <section class="nl-band nl-band-surface" aria-labelledby="nl-cert-title"><div class="nl-wrap nl-split nl-split-rev">
    <div class="nl-split-text">
      <p class="nl-eyebrow">${esc(L('À la fin d’un cours','When you finish a course'))}</p>
      <h2 id="nl-cert-title">${esc(L('Une attestation Nunya à chaque cours terminé.','A Nunya certificate for every course you finish.'))}</h2>
      <p>${esc(L(`Valide toutes les leçons de l’un des ${catalogue.length} cours du catalogue : Nunya prépare une attestation à imprimer ou à enregistrer en PDF, avec les compétences et les modules travaillés. Ce n’est pas un diplôme, c’est la trace de ton travail.${courses.some(isGit)?' Le module Git, suivi à part, n’en délivre pas.':''}`,`Complete every lesson of one of the ${catalogue.length} catalogue courses: Nunya prepares a certificate to print or save as PDF, listing the skills and modules you worked on. It is not a diploma, it is a record of your work.${courses.some(isGit)?' The separate Git module does not issue one.':''}`))}</p>
      <div class="nl-actions"><a class="nl-btn nl-btn-solid" href="${esc(programme(sample))}">${esc(L('Voir un programme','See a programme'))}</a></div>
    </div>
    <div class="nl-split-art" aria-hidden="true"><div class="nl-cert"><span class="nl-cert-seal">✳</span><span class="nl-cert-kicker">${esc(L('Attestation Nunya · pas un diplôme','Nunya certificate · not a diploma'))}</span><span class="nl-cert-name">${esc(state.profile?.name||L('Ton nom','Your name'))}</span><span class="nl-cert-line">${esc(L('a validé toutes les leçons du cours','completed every lesson of'))}</span><span class="nl-cert-course">${esc(sample.title_fr)}</span><span class="nl-cert-meta">${sample.lessons.length} ${esc(L('leçons','lessons'))} · ${(sample.modules||[]).length} ${esc(L('modules','modules'))}</span></div></div>
  </div></section>

  ${api.aide()?`<section class="nl-band nl-band-tint" data-dom="web" aria-labelledby="nl-aide-title"><div class="nl-wrap nl-split">
    <div class="nl-split-text">
      <p class="nl-eyebrow">${esc(L('Quand tu bloques','When you are stuck'))}</p>
      <h2 id="nl-aide-title">${esc(L('Nunya Aide t’explique, sans faire à ta place.','Nunya Aide explains without doing it for you.'))}</h2>
      <p>${esc(L('Une erreur, une consigne pas claire ? Nunya Aide reformule la leçon avec d’autres mots et te donne des indices, pas la solution. 15 questions par jour ; il faut une connexion, et ton accord est demandé avant le premier envoi.','An error, an unclear instruction? Nunya Aide rephrases the lesson and gives you hints, not the answer. 15 questions a day; it needs a connection, and you are asked before anything is sent.'))}</p>
      <div class="nl-actions"><button type="button" class="nl-btn nl-btn-solid" data-aide-open>${esc(L('Poser une question','Ask a question'))}</button></div>
    </div>
    <div class="nl-split-art" aria-hidden="true"><div class="nl-chat"><p class="nl-bubble nl-bubble-me">${esc(L('Pourquoi j’ai « NameError » à la ligne 3 ?','Why do I get “NameError” on line 3?'))}</p><p class="nl-bubble">${esc(L('Regarde le nom de ta variable ligne 1, puis ligne 3. Sont-ils écrits exactement pareil ?','Look at your variable name on line 1, then line 3. Are they spelled exactly the same?'))}</p><p class="nl-bubble nl-bubble-me">${esc(L('Ah ! « prenom » et « prénom ». Merci !','Oh! “prenom” and “prénom”. Thanks!'))}</p></div></div>
  </div></section>`:''}

  ${journeys.length?`<section class="nl-band nl-band-dark" aria-labelledby="nl-jobs-title"><div class="nl-weave" aria-hidden="true"></div><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Des parcours métiers','Career paths'))}</p><h2 id="nl-jobs-title">${esc(L('Un métier en tête ? Suis son parcours.','A job in mind? Follow its path.'))}</h2><p>${esc(L('Chaque parcours met les cours dans le bon ordre et suit ton avancée, étape par étape.','Each path puts the courses in the right order and tracks your progress, step by step.'))}</p></div>
    <ul class="nl-chips">${journeys.map(({j,s})=>{const m=journeyMark(j);return `<li><a class="nl-chip" href="#/apprendre" data-landing-journey="${esc(j.id)}" data-dom="${m.dom}"><span class="nl-mark${[...m.mark].length>2?' nl-mark-long':''}" aria-hidden="true">${esc(m.mark)}</span><span class="nl-chip-text"><strong>${esc(j.title_fr)}</strong><span>${s.steps.length} ${esc(L('cours','courses'))}${s.steps.some(x=>x.done)?` · ${s.steps.filter(x=>x.complete).length}/${s.steps.length} ${esc(L('terminés','done'))}`:''}</span></span>${arrow}</a></li>`}).join('')}</ul>
  </div></section>`:''}

  <section class="nl-band" aria-labelledby="nl-more-title"><div class="nl-wrap">
    <div class="nl-head"><p class="nl-eyebrow">${esc(L('Et aussi','And also'))}</p><h2 id="nl-more-title">${esc(L('Réviser l’école, préparer l’avenir','Revise for school, prepare your future'))}</h2></div>
    ${state.academy?.activePath?api.resume():''}
    <div class="a-track-grid nl-tracks">
      <a href="#/mes-cours" class="a-track nl-track" data-dom="data"><span class="nl-mark" aria-hidden="true">✎</span><h3>${esc(api.at('school'))}</h3><p>${esc(L('Fiches, exercices et sujets d’examen du collège au lycée, à réviser à ton rythme.','Notes, exercises and exam papers from lower to upper secondary, at your pace.'))}</p><b>${esc(api.at('startSchool'))} ${arrow}</b></a>
      <a href="#/avenir" class="a-track nl-track" data-dom="sec"><span class="nl-mark" aria-hidden="true">◎</span><h3>${esc(api.at('future'))}</h3><p>${esc(L('Découvre des métiers au Togo, les compétences qu’ils demandent et les formations pour y arriver.','Discover jobs in Togo, the skills they need and the training that leads there.'))}</p><b>${esc(api.at('findSkills'))} ${arrow}</b></a>
      <a href="#/revision" class="a-track nl-track" data-dom="algo"><span class="nl-mark" aria-hidden="true">↻</span><h3>${esc(api.at('daily'))}</h3><p>${esc(L('La révision du jour : quelques questions sur ce que tu as déjà vu, pour ne pas l’oublier.','Today’s review: a few questions on what you have already seen, so you do not forget it.'))}</p><b>${esc(api.at('toPractice'))} ${arrow}</b></a>
    </div>
    ${paths?`<div class="nl-paths"><div class="nl-paths-head"><h3>${esc(api.at('browse'))}</h3><a class="nl-more" href="#/avenir">${esc(L('Tous les métiers','All careers'))} ${arrow}</a></div><div class="a-path-grid">${paths}</div></div>`:''}
  </div></section>

  ${first?`<section class="nl-band nl-band-surface" aria-labelledby="nl-first-title"><div class="nl-wrap nl-first">
    <h2 id="nl-first-title">${esc(L('Première visite ? Choisis ton ambiance.','First visit? Pick your look.'))}</h2>
    <p>${esc(L('Choisis des couleurs, puis explore librement. Nunya est conçu pour les jeunes de 13 ans et plus ; tes réglages restent sur cet appareil.','Pick your colours, then explore freely. Nunya is designed for young people aged 13 and over; your settings stay on this device.'))}</p>
    <div class="ambiance-quick" role="group" aria-label="${esc(L('Choisir une ambiance','Choose a look'))}">${api.ambiances.map(([id,name])=>`<button type="button" data-ambiance="${esc(id)}" aria-pressed="${state.ambiance===id}"><i class="ambiance-preview" data-preview="${esc(id)}" aria-hidden="true"></i>${esc(name)}</button>`).join('')}</div>
    <div class="nl-actions nl-center"><button type="button" class="nl-btn" data-onboarding="skip">${esc(L('Passer et choisir moi-même','Skip and choose myself'))}</button></div>
  </div></section>`:''}

  <section class="nl-band nl-band-dark nl-close" aria-labelledby="nl-close-title"><div class="nl-weave" aria-hidden="true"></div><div class="nl-wrap">
    <h2 id="nl-close-title">${esc(ret?L('Ta prochaine leçon t’attend.','Your next lesson is waiting.'):L('Prêt ? Ta première leçon commence ici.','Ready? Your first lesson starts here.'))}</h2>
    <p>${esc(ret?L(`${ret.course.title_fr} · ${ret.go.lesson.title_fr}`,`${ret.course.title_fr} · ${ret.go.lesson.title_fr}`):minutes?L(`Environ ${minutes} minutes, dans ton navigateur, sans rien installer.`,`About ${minutes} minutes, in your browser, nothing to install.`):L('Dans ton navigateur, sans rien installer.','In your browser, nothing to install.'))}</p>
    <div class="nl-actions"><a class="primary nl-cta-main" href="${esc(ret?lessonRoute(ret.course,ret.go.lesson.id):firstLesson(python))}">${esc(ret?L('Ouvrir la leçon','Open the lesson'):L('Commencer avec Python','Start with Python'))} ${arrow}</a></div>
    <nav class="nl-close-links" aria-label="${esc(L('Toutes les technologies','All technologies'))}"><ul>${techs.map(t=>`<li><a href="${esc(programme(t.course))}">${esc(t.label)}</a></li>`).join('')}</ul></nav>
  </div></section>`;
}

export function render(){
  const state=api.state(),courses=allCourses();
  if(!courses.length)return '';
  const catalogue=courses.filter(c=>!isGit(c)),techs=technologies(courses),ret=returning(state,courses);
  return `<div class="nl">${strip(techs)}${hero(state,catalogue,courses,techs,ret)}${learn(techs)}${tiles(courses,state)}${bands(state,catalogue,courses,techs,ret)}</div>`;
}

function selectTab(button,focus){
  const list=button.closest('[role=tablist]'),tabs=[...list.querySelectorAll('[role=tab]')];
  activeTab=Number(button.dataset.nlTab)||0;
  for(const tab of tabs){const on=tab===button;tab.setAttribute('aria-selected',String(on));tab.tabIndex=on?0:-1;const panel=document.getElementById(tab.getAttribute('aria-controls'));if(panel)panel.hidden=!on}
  if(focus){button.focus();button.scrollIntoView?.({block:'nearest',inline:'nearest'})}
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
  document.addEventListener('submit',event=>{
    const form=event.target.closest?.('[data-landing-search]');if(!form)return;
    event.preventDefault();const q=String(new FormData(form).get('q')||'').trim();
    if(q)api.search(q);else api.go('#/recherche');
  });
  document.addEventListener('click',event=>{
    const tab=event.target.closest?.('[data-nl-tab]');if(tab)selectTab(tab,false);
  });
  // Le routeur intercepte les liens internes au niveau du document : la fiche du parcours est donc demandée dès la phase de capture de window.
  window.addEventListener('click',event=>{const chip=event.target.closest?.('[data-landing-journey]');if(chip)openJourney(chip.dataset.landingJourney)},true);
  document.addEventListener('keydown',event=>{
    const tab=event.target.closest?.('[data-nl-tab]');if(!tab)return;
    const tabs=[...tab.closest('[role=tablist]').querySelectorAll('[role=tab]')],i=tabs.indexOf(tab);
    const to={ArrowRight:i+1,ArrowLeft:i-1,Home:0,End:tabs.length-1}[event.key];
    if(to===undefined)return;event.preventDefault();selectTab(tabs[(to+tabs.length)%tabs.length],true);
  });
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
