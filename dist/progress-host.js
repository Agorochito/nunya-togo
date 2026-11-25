let momentumView=null,momentumLoad=null,momentumError=null,momentumCssPromise=null;
function momentumStyles(){
 if(momentumCssPromise)return momentumCssPromise;
 momentumCssPromise=new Promise((resolve,reject)=>{
  const link=document.createElement('link');
  link.rel='stylesheet';link.href=new URL('./runtime/momentum.css',document.baseURI).href;link.id='nunya-momentum-css';
  link.addEventListener('load',resolve,{once:true});
  link.addEventListener('error',()=>{link.remove();momentumCssPromise=null;reject(Error('Feuille Ma progression indisponible'))},{once:true});
  document.head.append(link);
 });
 return momentumCssPromise;
}
function momentumMilestones(){
 const ids=[],total=lessonsDone(),days=new Set();
 for(const [key,value] of Object.entries(state.activity||{})){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key)||!(Number(value)>0))continue;
  const date=new Date(key+'T00:00:00');
  if(Number.isFinite(date.getTime())&&dayKey(date)===key)days.add(key);
 }
 let exercise=false;
 for(const work of Object.values(state.curriculum?.work||{})){
  if(work?.passed!==true)continue;
  exercise=true;
  const time=Number(work.started)+Number(work.firstSuccess),date=new Date(time);
  if(Number(work.firstSuccess)>0&&Number.isFinite(time)&&Number.isFinite(date.getTime()))days.add(dayKey(date));
 }
 if(total>=1)ids.push('first-lesson');
 if(total>=5)ids.push('five-lessons');
 if(total>=10)ids.push('ten-lessons');
 if(total>=25)ids.push('twenty-five-lessons');
 if(total>=50)ids.push('fifty-lessons');
 if(total>=100)ids.push('hundred-lessons');
 if(exercise)ids.push('first-exercise');
 if(days.size>=5)ids.push('five-active-days');
 if(days.size>=20)ids.push('twenty-active-days');
 if(Object.keys(state.localProjects||{}).length)ids.push('first-project');
 return ids;
}
const momentumHost={
 state:()=>state,
 catalogue:()=>currCatalogue,
 loadCatalogue:currLoadCatalogue,
 lang:()=>state.lang,
 dayKey,
 lessonsDone,
 milestoneIds:momentumMilestones,
 legacyCourses:()=>courses.filter(course=>course.id!=='python'),
 doneCount,
 pct,
 courseName:cname,
 getCourse,
 resumeUrl:course=>currRoute(currResume(course)),
 esc,
 tr,
 icon,
 render,
};
function momentumFallback(){
 const work=state.curriculum?.work||{},coursesStarted=(currCatalogue?.courses||[]).filter(course=>course.lessons.some(lesson=>state.curriculum?.completed?.[lesson.id]===true||Object.entries(work).some(([id,item])=>id.startsWith(lesson.id+'-e')&&item?.passed===true)||state.curriculum?.lastByCourse?.[course.id]||state.curriculum?.lastLesson===lesson.id));
 const codeRows=coursesStarted.map(course=>`<li><a href="${currRoute(currResume(course))}">${esc(course.title_fr)} · ${course.lessons.filter(lesson=>state.curriculum?.completed?.[lesson.id]===true).length}/${course.lessons.length}</a></li>`);
 const legacyRows=courses.filter(course=>course.id!=='python'&&doneCount(course)>0).map(course=>`<li><button data-course="${course.id}">${esc(cname(course))} · ${doneCount(course)}/${course.lessons.length}</button></li>`);
 const gitDone=Object.values(state.git?.completed||{}).filter(Boolean).length,discDone=Object.values(state.discovery?.completed||{}).filter(Boolean).length;
 if(gitDone||state.git?.last)codeRows.push(`<li><a href="#/apprendre/git-bases">${esc(tr('Git et GitHub','Git and GitHub'))} · ${gitDone}/12</a></li>`);
 if(discDone||state.discovery?.last)codeRows.push(`<li><a href="#/apprendre/decouverte">${esc(tr('Découverte du numérique','Digital discovery'))} · ${discDone} ${tr('leçons validées','lessons completed')}</a></li>`);
 return `<section class="panel"><h1>${esc(tr('Ma progression','My progress'))}</h1><p>${lessonsDone()} ${esc(tr('leçons validées','lessons completed'))} · ${Number(state.minutes)||0} ${esc(tr('minutes','minutes'))}</p><h2>${esc(tr('Parcours commencés','Started courses'))}</h2>${codeRows.length||legacyRows.length?`<ul>${codeRows.join('')}${legacyRows.join('')}</ul>`:`<p>${esc(tr('Tu peux choisir un premier cours quand tu le souhaites.','Choose your first course whenever you like.'))}</p>`}<p><a href="#/apprendre">${esc(tr('Explorer les cours','Explore courses'))} →</a></p><button class="secondary" data-action="export">${esc(tr('Exporter','Export'))}</button><button class="secondary" data-curr="export">${esc(tr('Exporter le code','Export code'))}</button><button class="secondary" data-action="import">${esc(tr('Restaurer','Restore'))}</button></section>`;
}
function momentumLoadView(){
 if(momentumLoad)return;
 momentumLoad=Promise.all([import('./momentum.js'),momentumStyles()]).then(([module])=>{
  momentumView=module.init(momentumHost);momentumError=null;
 }).catch(error=>{
  momentumError=error;console.error('Impossible de charger Ma progression.',error);
 }).finally(()=>{
  momentumLoad=null;
  if(page==='progress')render();
 });
}
progressView=function(){
 if(momentumView)return momentumView.view();
 if(momentumError)return `<section class="momentum-load-error" role="alert"><p>${esc(tr('La nouvelle page n’a pas pu être chargée. Tes données restent sur cet appareil ; voici la version de secours.','The updated page could not load. Your data is still on this device; here is the fallback view.'))}</p><button class="primary" data-action="momentum-retry">${esc(tr('Réessayer','Retry'))}</button></section>`+momentumFallback();
 momentumLoadView();
 return `<section class="momentum-load-error" role="status" aria-busy="true"><h1>${esc(tr('Ma progression','My progress'))}</h1><p>${esc(tr('Chargement de ta progression…','Loading your progress…'))}</p></section>`;
};
document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-action="momentum-retry"],[data-action="momentum-catalogue-retry"]');
 if(!button)return;
 event.preventDefault();event.stopImmediatePropagation();
 if(button.dataset.action==='momentum-catalogue-retry'&&momentumView)momentumView.retryCatalogue();
 else{momentumError=null;momentumLoad=null;momentumCssPromise=null;momentumLoadView()}
 if(page==='progress')render();
},true);
if(page==='progress')render();
