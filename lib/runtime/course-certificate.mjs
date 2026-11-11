// Attestation de fin de cours et impression d’une leçon, chargées avec les vues du code (hors du bundle principal).
import {createReadingPack,standaloneDocument,escapeHtml,saveHtml} from './reading-pack.mjs';
const esc=escapeHtml;
const LABELS={
  fr:{doneKicker:'COURS TERMINÉ',doneTitle:'Tu as validé toutes les leçons de ce cours',doneText:'Tu peux produire une attestation Nunya à imprimer ou à garder. Ce n’est pas un diplôme : montre aussi tes exercices et tes projets.',open:'Mon attestation Nunya',modalTitle:'Attestation Nunya — pas un diplôme',name:'Nom à afficher',nameHint:'Écris le nom que tu veux voir sur l’attestation. Il n’est ni vérifié ni envoyé : il reste dans ce document.',print:'Imprimer ou enregistrer en PDF',save:'Télécharger (HTML)',cancel:'Annuler',notDone:'Termine toutes les leçons de ce cours pour obtenir son attestation.',printLesson:'Imprimer ou PDF',printTitle:'Imprimer cette leçon',printText:'La leçon s’imprime sans l’éditeur : explications, exemples, exercices et quiz. Choisis « Enregistrer au format PDF » dans la fenêtre d’impression pour obtenir un PDF.',withAnswers:'Inclure les indices, cas à essayer et corrigés',printGo:'Imprimer',noLesson:'Ouvre une leçon pour l’imprimer.',saved:'Attestation enregistrée sur cet appareil.'},
  en:{doneKicker:'COURSE COMPLETED',doneTitle:'You have completed every lesson of this course',doneText:'You can create a Nunya attestation to print or keep. It is not a diploma: also show your exercises and projects.',open:'My Nunya attestation',modalTitle:'Nunya attestation — not a diploma',name:'Name to display',nameHint:'Type the name you want on the attestation. It is neither checked nor sent: it only stays in this document.',print:'Print or save as PDF',save:'Download (HTML)',cancel:'Cancel',notDone:'Complete every lesson of this course to get its attestation.',printLesson:'Print or PDF',printTitle:'Print this lesson',printText:'The lesson prints without the editor: explanations, examples, exercises and quiz. Choose “Save as PDF” in the print dialog to get a PDF. The lesson itself stays in French.',withAnswers:'Include hints, test cases and solutions',printGo:'Print',noLesson:'Open a lesson to print it.',saved:'Attestation saved on this device.'}
};
let api=null,listening=false;
const t=key=>{const lang=api?.state?.()?.lang==='en'?'en':'fr';return LABELS[lang][key]??LABELS.fr[key]};
const LEVELS={debutant:'Débutant',intermediaire:'Intermédiaire',avance:'Avancé'};

export function courseComplete(course,state){const done=state?.curriculum?.completed||{};return Array.isArray(course?.lessons)&&course.lessons.length>0&&course.lessons.every(l=>done[l.id]===true)}
export function cleanName(value){return String(value??'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,80)}
export function attestationBody(course,{name,date}){
  const learner=cleanName(name)||'Apprenant·e Nunya',modules=(course.modules||[]).filter(m=>m?.title_fr),hours=Number.isFinite(course.estimated_minutes)&&course.estimated_minutes>0?Math.round(course.estimated_minutes/6)/10:null;
  const facts=[LEVELS[course.level]||'Débutant',modules.length+' modules',course.lessons.length+' leçons',hours?('≈ '+String(hours).replace('.',',')+' h de pratique indicative'):null].filter(Boolean).join(' · ');
  return '<header class="nunya-cert"><p>nunya. · Attestation de fin de cours</p><h1>Attestation Nunya — pas un diplôme</h1></header>'
    +'<p>Cette attestation indique que</p><p class="nunya-cert-name"><strong>'+esc(learner)+'</strong></p><p>a validé, sur son appareil, toutes les leçons du cours</p><h2>'+esc(course.title_fr)+'</h2><p>'+esc(facts)+'</p><p>Date : '+esc(date)+'</p>'
    +'<section><h2>Compétences travaillées</h2><ul>'+(course.outcomes||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+(modules.length?'<h3>Modules suivis</h3><ol>'+modules.map(m=>'<li><strong>'+esc(m.title_fr)+'</strong>'+(m.outcome_fr?' — '+esc(m.outcome_fr):'')+'</li>').join('')+'</ol>':'')+'</section>'
    +'<section><h2>À lire avant de la montrer</h2><p>Le nom a été saisi par l’apprenant·e et n’est pas vérifié. Une leçon est validée après sa lecture et son mini-quiz, ou par le test de son module, sur l’appareil utilisé.</p><p>Ce document n’est ni un diplôme, ni une certification, ni une équivalence reconnue par un État, une école ou un employeur. Les contenus Nunya sont des brouillons en relecture pédagogique'+(course.content_revision?' (révision '+esc(course.content_revision)+')':'')+'. Pour prouver ce que tu sais faire, montre aussi tes exercices et tes projets.</p></section>';
}
export function attestationDocument(course,options){if(!courseComplete(course,options.state))throw Error(LABELS.fr.notDone);return standaloneDocument('Attestation Nunya — '+course.title_fr,attestationBody(course,options))}
function today(){return new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}

export function certificatePanel(course,state){if(!courseComplete(course,state))return '';return '<aside class="nunya-cert-panel panel" aria-labelledby="nunya-cert-title"><span class="nunya-catalogue-kicker">'+esc(t('doneKicker'))+'</span><h2 id="nunya-cert-title">'+esc(t('doneTitle'))+'</h2><p>'+esc(t('doneText'))+'</p><button type="button" class="primary" data-nunya-print="attestation">'+esc(t('open'))+'</button></aside>'}
export function lessonPrintButton(){return '<button type="button" class="text-button" data-nunya-print="lesson">'+esc(t('printLesson'))+'</button>'}

function bodyOf(html){const doc=new DOMParser().parseFromString(html,'text/html');doc.querySelectorAll('footer').forEach(x=>x.remove());return doc.body.innerHTML}
export function printSheet(html,{openDetails=false}={}){
  document.getElementById('nunya-print-sheet')?.remove();
  const sheet=document.createElement('section');sheet.id='nunya-print-sheet';sheet.lang='fr';sheet.innerHTML=bodyOf(html);
  sheet.querySelectorAll('details').forEach(d=>{if(openDetails)d.open=true;else d.remove()});
  document.body.append(sheet);document.body.classList.add('nunya-printing');
  let cleaned=false;const clean=()=>{if(cleaned)return;cleaned=true;sheet.remove();document.body.classList.remove('nunya-printing');window.removeEventListener('afterprint',clean);window.removeEventListener('hashchange',clean)};
  window.addEventListener('afterprint',clean);window.addEventListener('hashchange',clean);
  window.print();
  return clean;
}

function course(){return api.course?.()}
function openAttestation(){
  const c=course(),state=api.state();if(!c||!courseComplete(c,state)){api.toast(t('notDone'));return}
  api.modal('<h2 id="modal-title">'+esc(t('modalTitle'))+'</h2><p><strong>'+esc(c.title_fr)+'</strong></p><label for="nunya-cert-name">'+esc(t('name'))+'</label><input id="nunya-cert-name" type="text" maxlength="80" autocomplete="name" value="'+esc(cleanName(state.profile?.name))+'" aria-describedby="nunya-cert-hint"><p id="nunya-cert-hint" class="nunya-cert-hint">'+esc(t('nameHint'))+'</p><div class="modal-actions"><button type="button" class="secondary" data-nunya-print="cancel">'+esc(t('cancel'))+'</button><button type="button" class="secondary" data-nunya-print="attestation-save">'+esc(t('save'))+'</button><button type="button" class="primary" data-nunya-print="attestation-print">'+esc(t('print'))+'</button></div>',true);
}
function openLessonPrint(){
  if(!api.currentLesson?.()){api.toast(t('noLesson'));return}
  api.modal('<h2 id="modal-title">'+esc(t('printTitle'))+'</h2><p>'+esc(t('printText'))+'</p><label class="nunya-print-option"><input id="nunya-print-answers" type="checkbox"> '+esc(t('withAnswers'))+'</label><div class="modal-actions"><button type="button" class="secondary" data-nunya-print="cancel">'+esc(t('cancel'))+'</button><button type="button" class="primary" data-nunya-print="lesson-go">'+esc(t('printGo'))+'</button></div>',true);
}
function onClick(event){
  const button=event.target.closest?.('[data-nunya-print]');if(!button||!api)return;
  event.preventDefault();event.stopImmediatePropagation();
  const action=button.dataset.nunyaPrint;
  try{
    if(action==='cancel'){api.closeModal();return}
    if(action==='attestation'){openAttestation();return}
    if(action==='lesson'){openLessonPrint();return}
    if(action==='lesson-go'){const answers=!!document.getElementById('nunya-print-answers')?.checked,lesson=api.currentLesson?.();api.closeModal();if(!lesson)return;printSheet(createReadingPack(api.pack(),{lessonId:lesson.id}),{openDetails:answers});return}
    if(action==='attestation-print'||action==='attestation-save'){
      const c=course(),name=document.getElementById('nunya-cert-name')?.value,html=attestationDocument(c,{name,date:today(),state:api.state()});
      api.closeModal();
      if(action==='attestation-print')printSheet(html);
      else{saveHtml('nunya-attestation-'+c.id+'.html',html);api.toast(t('saved'))}
    }
  }catch(error){api.toast(error.message)}
}
export function initCertificate(value){api=value;if(listening||typeof document==='undefined')return;listening=true;document.addEventListener('click',onClick,true)}
