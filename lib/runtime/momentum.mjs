const MILESTONES = [
  {id:'first-lesson',icon:'leaf',title:['Premier pas','First step'],target:['Valider 1 leçon','Complete 1 lesson']},
  {id:'five-lessons',icon:'book',title:['La curiosité grandit','Curiosity grows'],target:['Valider 5 leçons','Complete 5 lessons']},
  {id:'ten-lessons',icon:'book',title:['Dix étapes franchies','Ten steps forward'],target:['Valider 10 leçons','Complete 10 lessons']},
  {id:'twenty-five-lessons',icon:'book',title:['Un chemin se dessine','A path takes shape'],target:['Valider 25 leçons','Complete 25 lessons']},
  {id:'fifty-lessons',icon:'award',title:['Cinquante leçons','Fifty lessons'],target:['Valider 50 leçons','Complete 50 lessons']},
  {id:'hundred-lessons',icon:'award',title:['Cent leçons','One hundred lessons'],target:['Valider 100 leçons','Complete 100 lessons']},
  {id:'first-exercise',icon:'check',title:['Premier exercice réussi','First exercise passed'],target:['Réussir un exercice','Pass one exercise']},
  {id:'five-active-days',icon:'calendar',title:['Cinq jours actifs','Five active days'],target:['Apprendre 5 jours','Learn on 5 days']},
  {id:'twenty-active-days',icon:'calendar',title:['Vingt jours actifs','Twenty active days'],target:['Apprendre 20 jours','Learn on 20 days']},
  {id:'first-project',icon:'briefcase',title:['Première idée enregistrée','First idea saved'],target:['Enregistrer une idée de projet','Save a project idea']},
];

const number=value=>Number.isFinite(Number(value))?Math.max(0,Number(value)):0;

function activityWeek(state,dayKey,lang){
  const exerciseDays=new Set();
  for(const work of Object.values(state.curriculum?.work||{})){
    const time=Number(work?.started)+Number(work?.firstSuccess);
    const date=new Date(time);
    if(work?.passed===true&&Number(work.firstSuccess)>0&&Number.isFinite(time)&&Number.isFinite(date.getTime()))exerciseDays.add(dayKey(date));
  }
  const locale=lang==='en'?'en-GB':'fr-FR';
  const days=Array.from({length:7},(_,index)=>{
    const date=new Date();
    date.setDate(date.getDate()-(6-index));
    const key=dayKey(date),minutes=number(state.activity?.[key]);
    return {key,date,minutes,active:minutes>0||exerciseDays.has(key),
      name:date.toLocaleDateString(locale,{weekday:'short'}),
      label:date.toLocaleDateString(locale,{day:'numeric',month:'short'})};
  });
  return {days,activeDays:days.filter(day=>day.active).length,minutes:days.reduce((sum,day)=>sum+day.minutes,0)};
}

function courseRows({state,catalogue,legacyCourses,doneCount,courseName,resumeUrl,tr}){
  const curriculum=state.curriculum||{},work=curriculum.work||{};
  const listed=new Set(catalogue.courses.map(course=>course.id));
  const modern=catalogue.courses.map(course=>{
    const completed=course.lessons.filter(lesson=>curriculum.completed?.[lesson.id]===true).length;
    const passed=course.lessons.reduce((sum,lesson)=>sum+Object.entries(work).filter(([id,item])=>id.startsWith(lesson.id+'-e')&&item?.passed===true).length,0);
    const touched=course.lessons.some(lesson=>Object.entries(work).some(([id,item])=>id.startsWith(lesson.id+'-e')&&(Number(item?.attempts)>0||item?.passed===true)));
    const started=completed>0||passed>0||touched||Boolean(curriculum.lastByCourse?.[course.id])||course.lessons.some(lesson=>lesson.id===curriculum.lastLesson);
    const total=course.lessons.length;
    return {id:course.id,title:course.title_fr,done:completed,total,passed,
      started,complete:total>0&&completed>=total,href:resumeUrl(course),kind:'course'};
  });
  const legacy=legacyCourses.filter(course=>!listed.has(course.id)).map(course=>{
    const completed=doneCount(course),total=course.lessons.length;
    return {id:course.id,title:courseName(course),done:completed,total,passed:0,
      started:completed>0,complete:total>0&&completed>=total,href:'',kind:'legacy'};
  });
  const special=[];
  const gitDone=Object.values(state.git?.completed||{}).filter(Boolean).length;
  if(!listed.has('git-bases'))special.push({
    id:'git-bases',title:tr('Git et GitHub','Git and GitHub'),done:gitDone,total:12,
    started:gitDone>0||Boolean(state.git?.last),href:'#/apprendre/git-bases',kind:'special',
  });
  const discoveryDone=Object.values(state.discovery?.completed||{}).filter(value=>value===true).length;
  if(!listed.has('decouverte'))special.push({
    id:'decouverte',title:tr('Découverte du numérique','Digital discovery'),done:discoveryDone,total:0,
    started:discoveryDone>0||Boolean(state.discovery?.last),href:'#/apprendre/decouverte',kind:'special',
  });
  const active=[...modern.filter(course=>course.started&&!course.complete),...legacy.filter(course=>course.started&&!course.complete),...special.filter(course=>course.started&&!(course.total>0&&course.done>=course.total))];
  const completed=[...modern.filter(course=>course.complete),...legacy.filter(course=>course.complete),...special.filter(course=>course.started&&course.total>0&&course.done>=course.total)];
  const notStarted=[...modern.filter(course=>!course.started),...legacy.filter(course=>!course.started),...special.filter(course=>!course.started)];
  return {active,completed,notStarted};
}

function courseCard(course,{esc,tr,formatNumber}){
  const complete=course.total>0&&course.done>=course.total;
  const detail=course.total
    ?`${formatNumber(course.done)} / ${formatNumber(course.total)} ${tr('leçons','lessons')}${course.passed?` · ${formatNumber(course.passed)} ${tr('exercices réussis','exercises passed')}`:''}`
    :`${formatNumber(course.done)} ${tr('leçons validées','lessons completed')}`;
  const action=complete?tr('Terminé','Completed'):tr('Reprendre','Continue');
  const href=course.kind==='legacy'?`<button type="button" class="momentum-course-link" data-course="${esc(course.id)}">${tr('Reprendre','Continue')} →</button>`:`<a class="momentum-course-link" href="${esc(course.href)}">${action} →</a>`;
  return `<li class="momentum-course${complete?' is-complete':''}">
    <div class="momentum-course-top"><div><h3>${esc(course.title)}</h3><p>${detail}</p></div><span class="momentum-course-status">${action}</span></div>
    ${course.total?`<div class="momentum-progress" role="progressbar" aria-label="${esc(course.title)}" aria-valuemin="0" aria-valuemax="${course.total}" aria-valuenow="${Math.min(course.done,course.total)}"><span style="width:${Math.min(100,Math.round(course.done/course.total*100))}%"></span></div>`:''}
    ${href}
  </li>`;
}

function milestoneCard(milestone,{earned,esc,icon,tr}){
  const status=earned?tr('Atteint','Reached'):tr('À venir','Up next');
  const iconMarkup=icon(milestone.icon);
  return `<li class="momentum-milestone${earned?' is-earned':''}" aria-label="${esc(tr(...milestone.title))} · ${status}">
    <span class="momentum-milestone-icon" aria-hidden="true">${iconMarkup}</span>
    <span class="momentum-milestone-copy"><strong>${esc(tr(...milestone.title))}</strong><small>${esc(tr(...milestone.target))}</small></span>
    <span class="momentum-milestone-status">${status}</span>
  </li>`;
}

export function init(deps){
  let cataloguePromise=null,catalogueError=null;
  const esc=deps.esc,tr=deps.tr;
  const formatNumber=value=>number(value).toLocaleString(deps.lang());

  function ensureCatalogue(){
    if(deps.catalogue()||cataloguePromise||catalogueError)return;
    cataloguePromise=Promise.resolve().then(deps.loadCatalogue).then(()=>{
      catalogueError=null;
      deps.render();
    }).catch(error=>{
      catalogueError=error;
      console.error('Impossible de charger le catalogue pour Ma progression.',error);
      deps.render();
    }).finally(()=>{cataloguePromise=null});
  }

  function view(){
    const state=deps.state(),lang=deps.lang(),catalogue=deps.catalogue();
    if(!catalogue)ensureCatalogue();
    const week=activityWeek(state,deps.dayKey,lang),today=week.days.at(-1);
    const totalLessons=deps.lessonsDone(),goal=Math.max(1,number(state.profile?.goal)||15);
    const milestones=deps.milestoneIds(),earned=new Set(milestones);
    const allMilestones=MILESTONES.map(milestone=>({...milestone,earned:earned.has(milestone.id)}));
    const visibleMilestones=[...allMilestones.filter(milestone=>milestone.earned).slice(-3),...allMilestones.filter(milestone=>!milestone.earned).slice(0,2)];
    const rows=catalogue?courseRows({state,catalogue,legacyCourses:deps.legacyCourses(),doneCount:deps.doneCount,courseName:deps.courseName,resumeUrl:deps.resumeUrl,tr}):{active:[],completed:[],notStarted:[]};
    const context={state,catalogue,legacyCourses:deps.legacyCourses(),doneCount:deps.doneCount,courseName:deps.courseName,resumeUrl:deps.resumeUrl,esc,tr};
    const activeRows=rows.active.slice(0,4).map(course=>courseCard(course,{...context,formatNumber}));
    const otherActive=rows.active.slice(4).map(course=>courseCard(course,{...context,formatNumber}));
    const completedRows=rows.completed.map(course=>courseCard(course,{...context,formatNumber}));
    const notStartedRows=rows.notStarted.map(course=>`<li><a href="${esc(course.kind==='legacy'?`#/cours/${course.id}`:course.href||'#/apprendre')}">${esc(course.title)}</a></li>`).join('');
    const courseNotice=catalogueError
      ?`<div class="momentum-notice" role="alert"><p>${esc(tr('Les programmes ne sont pas disponibles ici pour le moment. Tu peux toujours consulter tes autres données.','Courses are temporarily unavailable here. Your other progress is still available.'))}</p><button class="secondary" data-action="momentum-catalogue-retry">${esc(tr('Réessayer','Retry'))}</button></div>`
      :!catalogue?`<p class="momentum-notice" role="status" aria-busy="true">${esc(tr('Chargement des programmes…','Loading courses…'))}</p>`:'';
    const days=week.days.map(day=>`<li class="momentum-day${day.active?' is-active':''}" aria-label="${esc(`${day.name} ${day.label} : ${day.active?tr('actif','active'):tr('sans activité','no activity')}, ${formatNumber(day.minutes)} ${tr('minutes','minutes')}`)}"><span aria-hidden="true">${esc(day.name)}</span><i aria-hidden="true"></i><small>${day.minutes?formatNumber(day.minutes):'—'}</small></li>`).join('');
    const projects=Object.entries(state.localProjects||{}).filter(([,project])=>project&&typeof project==='object');
    const projectMarkup=([id,project])=>`<li><button type="button" data-local-project="${esc(id)}">${esc(project.title||tr('Mon projet','My project'))} →</button><small>${formatNumber((Array.isArray(project.tasks)?project.tasks:[]).filter(Boolean).length)} ${esc(tr('étapes cochées','steps checked'))} · ${esc(String(project.updatedAt||'').slice(0,10))}</small></li>`;
    const notes=Object.entries(state.notes||{}).filter(([,text])=>typeof text==='string'&&text.trim());
    const hasActivity=week.activeDays>0||week.minutes>0||totalLessons>0||rows.active.length>0||rows.completed.length>0||projects.length>0||notes.length>0||Object.keys(state.errors||{}).length>0||Object.keys(state.mastery||{}).length>0||Object.keys(state.reviewSchedule||{}).length>0;
    const noteMarkup=([key,text])=>{const [id,index]=key.split(':');const course=deps.getCourse(id);return `<li><div><strong>${esc(course?deps.courseName(course):tr('Ma note','My note'))}</strong><p>${esc(course?.lessons?.[Number(index)]?.title||tr('Une idée à retrouver','An idea to revisit'))}</p><blockquote>${esc(text)}</blockquote></div><button type="button" class="secondary" data-course="${esc(id)}" data-index="${esc(index)}">${esc(tr('Revoir la leçon','Review lesson'))} →</button></li>`};
    const visibleProjects=projects.slice(-3),olderProjects=projects.slice(0,-3);
    const visibleNotes=notes.slice(-3),olderNotes=notes.slice(0,-3);
    const personal=projects.length||notes.length?`<section class="momentum-personal" aria-labelledby="momentum-personal-title"><div class="momentum-section-head"><div><p class="momentum-eyebrow">${esc(tr('Tes idées et tes notes','Your ideas and notes'))}</p><h2 id="momentum-personal-title">${esc(tr('Ce que tu construis','What you are building'))}</h2></div></div>
      ${projects.length?`<div class="momentum-projects"><h3>${esc(tr('Mon portfolio de projets','My project portfolio'))} <span>${formatNumber(projects.length)}</span></h3><p>${esc(tr('Des brouillons locaux à améliorer. Les cases cochées sont ton auto-évaluation, pas une validation professionnelle.','Local drafts to improve. Checked boxes are your self-assessment, not professional certification.'))}</p><ul>${visibleProjects.map(projectMarkup).join('')}</ul>${olderProjects.length?`<details><summary>${esc(tr(`Voir les ${olderProjects.length} autres projets`,`See ${olderProjects.length} more projects`))}</summary><ul>${olderProjects.map(projectMarkup).join('')}</ul></details>`:''}<button class="secondary" data-page="careers">${esc(tr('Trouver mon prochain projet','Find my next project'))} →</button></div>`:''}
      ${notes.length?`<div class="momentum-notes"><h3>${esc(tr('Mon carnet de découvertes','My discovery notebook'))} <span>${formatNumber(notes.length)} ${esc(tr('notes','notes'))}</span></h3><ul>${visibleNotes.map(noteMarkup).join('')}</ul>${olderNotes.length?`<details><summary>${esc(tr(`Voir les ${olderNotes.length} autres notes`,`See ${olderNotes.length} more notes`))}</summary><ul>${olderNotes.map(noteMarkup).join('')}</ul></details>`:''}</div>`:''}
    </section>`:'';
    const backup=`<section class="momentum-backup" aria-labelledby="momentum-backup-title">
      <div><h2 id="momentum-backup-title">${esc(tr('Garde une copie de tes progrès','Keep a copy of your progress'))}</h2><p>${esc(tr('Ta progression reste sur cet appareil. Exporte une sauvegarde pour la conserver ou la restaurer ailleurs.','Your progress stays on this device. Export a backup to keep or restore it elsewhere.'))}</p></div>
      <div class="momentum-backup-actions"><button class="secondary" data-action="export">${esc(tr('Exporter','Export'))}</button><button class="secondary" data-curr="export">${esc(tr('Exporter le code','Export code'))}</button><button class="secondary" data-action="import">${esc(tr('Restaurer','Restore'))}</button></div>
    </section>`;
    const activeSection=hasActivity?`<section class="momentum-active" aria-labelledby="momentum-active-title"><div class="momentum-section-head"><div><p class="momentum-eyebrow">${esc(tr('Reprendre ou terminer','Continue or finish'))}</p><h2 id="momentum-active-title">${esc(tr('En cours','In progress'))}</h2></div></div>${courseNotice}${activeRows.length?`<ul class="momentum-courses">${activeRows.join('')}</ul>`:`<p class="momentum-empty">${esc(tr('Ton prochain pas peut commencer par un cours ou un exercice.','Your next step can start with a course or an exercise.'))} <a href="#/apprendre">${esc(tr('Explorer les cours','Explore courses'))} →</a></p>`}${otherActive.length?`<details class="momentum-extra-courses"><summary>${esc(tr(`Voir les ${otherActive.length} autres parcours en cours`,`See ${otherActive.length} more courses in progress`))}</summary><ul class="momentum-courses">${otherActive.join('')}</ul></details>`:''}${completedRows.length?`<details class="momentum-extra-courses"><summary>${esc(tr(`Parcours terminés (${completedRows.length})`,`Completed courses (${completedRows.length})`))}</summary><ul class="momentum-courses">${completedRows.join('')}</ul></details>`:''}</section>`:`<section class="momentum-active momentum-start" aria-labelledby="momentum-start-title">${courseNotice}<div class="momentum-section-head"><div><p class="momentum-eyebrow">${esc(tr('Un premier pas','A first step'))}</p><h2 id="momentum-start-title">${esc(tr('Ta progression commence ici','Your progress starts here'))}</h2></div></div><p class="momentum-empty">${esc(tr('Tes leçons, ton rythme et tes jalons apparaîtront ici au fil de tes activités.','Your lessons, learning rhythm and milestones will appear here as you learn.'))}</p><a class="primary" href="#/apprendre">${esc(tr('Explorer les cours','Explore courses'))} →</a></section>`;
    const milestonesSection=hasActivity?`<section class="momentum-milestones" aria-labelledby="momentum-milestones-title"><div class="momentum-section-head"><div><p class="momentum-eyebrow">${esc(tr('Des progrès concrets','Real progress'))}</p><h2 id="momentum-milestones-title">${esc(tr('Tes jalons','Your milestones'))}</h2></div><p>${esc(tr('Pas de points ni de classement : des étapes visibles, simplement.','No points or rankings: just visible steps, simply.'))}</p></div>
        <p class="momentum-milestone-count">${formatNumber(earned.size)} / ${MILESTONES.length} ${esc(tr('jalons atteints','milestones reached'))}</p>
        <ul class="momentum-milestones-list">${visibleMilestones.map(m=>milestoneCard(m,{earned:m.earned,esc,icon:deps.icon,tr})).join('')}</ul>
        <details class="momentum-all-milestones"><summary>${esc(tr(`Voir les ${MILESTONES.length} jalons`,`See all ${MILESTONES.length} milestones`))}</summary><ul class="momentum-milestones-list">${allMilestones.map(m=>milestoneCard(m,{earned:m.earned,esc,icon:deps.icon,tr})).join('')}</ul></details>
      </section>`:'';

    return `<div class="momentum">
      <header class="momentum-head"><p class="momentum-eyebrow">${esc(tr('Ta progression, à ton rythme','Your progress, at your pace'))}</p><h1>${esc(tr('Ma progression','My progress'))}</h1><p>${esc(tr('Chaque étape compte. Tu avances sans classement, sans comparaison et sans pression.','Every step counts. Learn without rankings, comparison or pressure.'))}</p></header>
      <section class="momentum-week" aria-labelledby="momentum-week-title" ${hasActivity?'':'hidden'}>
        <div class="momentum-section-head"><div><p class="momentum-eyebrow">${esc(tr('Un rythme qui te ressemble','A rhythm that works for you'))}</p><h2 id="momentum-week-title">${esc(tr('Cette semaine','This week'))}</h2></div><p>${esc(tr('Aucune série à perdre : reprends quand tu veux.','No streaks to lose: come back whenever you like.'))}</p></div>
        <ol class="momentum-week-days" aria-label="${esc(tr('Activité des sept derniers jours','Activity over the last seven days'))}">${days}</ol>
        <div class="momentum-week-stats"><p><strong>${formatNumber(week.activeDays)}</strong><span>${esc(tr('jour'+(week.activeDays!==1?'s':'')+' actif'+(week.activeDays!==1?'s':''),'active day'+(week.activeDays===1?'':'s')))}</span></p><p><strong>${formatNumber(week.minutes)}</strong><span>${esc(tr('minutes cette semaine','minutes this week'))}</span></p><p><strong>${formatNumber(totalLessons)}</strong><span>${esc(tr('leçons validées','lessons completed'))}</span></p><p><strong>${formatNumber(number(state.minutes))}</strong><span>${esc(tr('minutes au total','minutes in total'))}</span></p></div>
        <div class="momentum-goal"><div><p>${esc(tr('Objectif du jour','Today’s goal'))}</p><strong>${formatNumber(today.minutes)} / ${formatNumber(goal)} ${esc(tr('min','min'))}</strong></div><progress max="${goal}" value="${Math.min(today.minutes,goal)}" aria-label="${esc(tr('Progression vers ton objectif du jour','Progress toward today’s goal'))}"></progress><button class="secondary" data-action="profile">${esc(tr('Modifier','Adjust'))}</button></div>
      </section>
      ${activeSection}
      ${milestonesSection}
      <details class="momentum-not-started"><summary>${esc(tr(`Pas encore commencés (${rows.notStarted.length})`,`Not started yet (${rows.notStarted.length})`))}</summary>${notStartedRows?`<ul>${notStartedRows}</ul>`:courseNotice||`<p>${esc(tr('Tous les programmes sont déjà commencés.','You have started every course.'))}</p>`}</details>
      ${personal}
      ${backup}
    </div>`;
  }

  return {view,retryCatalogue(){catalogueError=null;ensureCatalogue()}};
}
