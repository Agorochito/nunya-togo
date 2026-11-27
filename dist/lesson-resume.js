let currResumeSaveTimer=0,currResumePending=null;
function currResumeFlush(){
 clearTimeout(currResumeSaveTimer);
 currResumeSaveTimer=0;
 const pending=currResumePending;
 currResumePending=null;
 if(!pending||!currLesson(pending.id))return;
 const positions=state.curriculum.readingPositions||(state.curriculum.readingPositions={});
 if(positions[pending.id]===pending.position)return;
 positions[pending.id]=pending.position;
 aPersist();
}
window.addEventListener('scroll',()=>{
 const id=aRoute?.stepId;
 if(!id||!currLesson(id))return;
 currResumePending={id,position:Math.max(0,Math.min(500000,Math.round(window.scrollY)))};
 clearTimeout(currResumeSaveTimer);
 currResumeSaveTimer=setTimeout(currResumeFlush,350);
},{passive:true});
window.addEventListener('pagehide',()=>{
 const id=aRoute?.stepId;
 if(id&&currLesson(id))currResumePending={id,position:Math.max(0,Math.min(500000,Math.round(window.scrollY)))};
 currResumeFlush();
});
const currResumeResolvePrevious=aResolve;
aResolve=async function(...args){
 currResumeFlush();
 await currResumeResolvePrevious(...args);
 const id=aRoute?.stepId;
 if(!id||!currLesson(id))return;
 const tab=state.curriculum.tabs?.[id];
 if(tab==='read'||tab==='code'){
  currTab=tab;
  const workspace=$('.curr-workspace');
  if(workspace)workspace.dataset.tab=tab;
  $$('.curr-mobile-tabs button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.curr===tab)));
 }
 const position=state.curriculum.readingPositions?.[id];
 if(Number.isFinite(position)&&position>0)requestAnimationFrame(()=>window.scrollTo({top:position,behavior:'instant'}));
};
window.addEventListener('click',event=>{
 const tab=event.target.closest?.('[data-curr="read"],[data-curr="code"]')?.dataset.curr;
 const id=aRoute?.stepId;
 if(!tab||!id||!currLesson(id))return;
 const tabs=state.curriculum.tabs||(state.curriculum.tabs={});
 if(tabs[id]===tab)return;
 tabs[id]=tab;
 aPersist();
},true);
