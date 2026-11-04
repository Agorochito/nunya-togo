/* Nunya Aide : assistant d’apprentissage par IA open source (Groq, modèles gpt-oss), via la fonction Supabase « nunya-aide ».
   Ce fichier ne contient que les points d’entrée ; le panneau et le contexte de la page (runtime/aide-panel.js) sont chargés au premier clic, hors du bundle principal. */
const AIDE_PANEL='./runtime/aide-panel.js?v=__AIDE_PANEL__';
state.aide=state.aide&&typeof state.aide==='object'?{consent:state.aide.consent===true}:{consent:false};
const aideIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/></svg>';
const aideEnabled=()=>typeof FEATURES==='undefined'||FEATURES.aide!==false;

let aidePanel=null;
function aideLoad(){return aidePanel||(aidePanel=import(new URL(AIDE_PANEL,document.baseURI).href).then(m=>m.init({state,persist:aPersist,esc,$,icon:aideIcon,live:()=>({route:aRoute,disc:discLessons,mode:currMode,lesson:currCurrentLesson,exercise:currActiveExercise,work:currWork,editor:currEditor})})).catch(e=>{aidePanel=null;throw e}))}
document.addEventListener('click',e=>{
 const b=e.target.closest?.('[data-aide-open]');if(!b||!aideEnabled())return;
 e.preventDefault();
 aideLoad().then(p=>p.open(b,b.dataset.aidePreset||'')).catch(()=>toast('Nunya Aide a besoin d’une connexion.'));
});

/* Points d’entrée : bouton en haut de chaque page, carte sur la page Aide, appels discrets dans les leçons. */
const aideNavPrevious=aNav;aNav=function(){aideNavPrevious();if(aideEnabled()&&!$('#aide-btn'))$('#language-btn')?.insertAdjacentHTML('beforebegin',`<button type="button" class="aide-top" id="aide-btn" data-aide-open aria-label="Poser une question à Nunya Aide">${aideIcon}<span>Nunya Aide</span></button>`)};
const aideHelpPrevious=aHelp;aHelp=function(){const html=aideHelpPrevious();return aideEnabled()?html.replace('</header>','</header><section class="curr-entry aide-entry"><div><h2>Nunya Aide</h2><p>Une notion te semble floue ? Nunya Aide t’explique autrement et te donne des indices.</p></div><button type="button" class="primary" data-aide-open>Poser une question</button></section>'):html};
function aideDecorate(){
 if(!aideEnabled()||aRoute.kind!=='apprendre'||!aRoute.stepId)return;
 const reading=$('.curr-reading');if(!reading)return;
 const anchor=reading.querySelector('.curr-example')||reading.querySelector('#disc-activities')||reading.querySelector('#curr-quiz');
 if(anchor&&!reading.querySelector('.aide-inline')&&(aRoute.id==='decouverte'||currMode!=='validation'))anchor.insertAdjacentHTML('beforebegin',`<div class="aide-inline"><span>${aideIcon}Un passage n’est pas clair ?</span><button type="button" class="secondary" data-aide-open>Demander à Nunya Aide</button></div>`);
 // Activité ratée (Découverte) : demander de l’aide pour réfléchir, sans la réponse.
 for(const retry of $$('.disc-retry'))if(!retry.querySelector('[data-aide-open]')){const q=retry.closest('fieldset')?.querySelector('legend')?.textContent.replace(/^✓?\s*Activité \d+\.\s*/,'')||'',b=document.createElement('button');b.type='button';b.className='text-button aide-retry';b.dataset.aideOpen='';b.dataset.aidePreset='q:'+q;b.textContent='Demander de l’aide à Nunya Aide →';retry.append(b)}
 const result=$('.curr-practice #curr-result');if(result&&!$('.curr-practice .aide-inline'))result.insertAdjacentHTML('beforebegin',`<div class="aide-inline aide-inline-code"><span>${aideIcon}Bloqué ?</span><button type="button" class="text-button" data-aide-open data-aide-preset="hint">Un indice de Nunya Aide →</button></div>`);
}
const aideRenderPrevious=render;render=function(){aideRenderPrevious();aideDecorate()};
