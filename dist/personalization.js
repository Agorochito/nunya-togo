/* Per-profile appearance: seven ready-made ambiances (palettes live in ambiances.css) or the learner's own colour. No remote account required. */
const AMBIANCES=[['nunya','Nunya','Vert forêt et orange'],['lagune','Lagune','Bleu et turquoise'],['kente','Kente','Noir, jaune soleil, rouge'],['sauge','Sauge','Calme, longues lectures'],['prune','Prune','Mauve et rose'],['nuit','Nuit','Sombre, pour le soir'],['verre','Verre liquide','Transparent et lumineux']];
const ACCENT_VARS=['accent','accent-text','accent-on','accent-soft','green','deep','bg','white','paper','ink','muted','line','mint','theme-bg','theme-surface','theme-raised','theme-ink','theme-muted','theme-line','theme-soft','theme-text','theme-deep'];
function validAccent(value){const s=String(value||'').trim();return /^#[a-f\d]{6}$/i.test(s)?s.toLowerCase():null}
function rgbHex(value){return [1,3,5].map(i=>parseInt(value.slice(i,i+2),16))}
function mixAccent(a,b,t){const x=rgbHex(a),y=rgbHex(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('')}
function luminanceAccent(hex){return rgbHex(hex).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0)}
function contrastAccent(a,b){const x=luminanceAccent(a),y=luminanceAccent(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
function accentText(a,bg){const target=luminanceAccent(bg)>.5?'#162033':'#ffffff';for(let i=0;i<=20;i++){const color=mixAccent(a,target,i/20);if(contrastAccent(color,bg)>=5.2)return color}return target}
function themePalette(a,dark){const neutral=dark?'#151515':'#faf9f7',bg=mixAccent(neutral,a,dark?.055:.018),surface=mixAccent(dark?'#202020':'#ffffff',a,dark?.07:.012),raised=mixAccent(dark?'#292929':'#f2f1ef',a,.055),ink=dark?'#f0eeeb':'#252422',muted=dark?'#b7b3ae':'#68645f';return {bg,surface,raised,ink,muted,line:mixAccent(surface,ink,dark?.15:.12),soft:mixAccent(surface,a,dark?.15:.08),text:accentText(a,raised),deep:dark?ink:mixAccent(a,'#252422',.72)}}
/* Light glass on phones that would struggle: little memory, data saver, or a system request for less transparency. */
function glassLite(){return state.glassLite===true||(navigator.deviceMemory||8)<=2||navigator.connection?.saveData===true||matchMedia('(prefers-reduced-transparency: reduce)').matches}
let appliedAmbiance=null;
function applyAccent(){
 const root=document.documentElement,body=document.body;
 if(state.ambiance==='nuit'&&state.theme!=='dark'){if(appliedAmbiance==='nuit')state.ambiance='nunya';else state.theme='dark'}
 const amb=state.ambiance,dark=state.theme==='dark';appliedAmbiance=amb;body.classList.add('personalized');root.style.colorScheme=dark||amb==='nuit'?'dark':'light';
 if(amb!=='perso'){for(const key of ACCENT_VARS)root.style.removeProperty('--'+key);root.dataset.ambiance=amb;root.dataset.mode=dark?'dark':'light';if(amb==='verre'&&glassLite())root.dataset.glassLite='';else delete root.dataset.glassLite;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',getComputedStyle(root).getPropertyValue('--theme-bg').trim()||'#f6f4ee');return}
 delete root.dataset.ambiance;delete root.dataset.glassLite;root.dataset.mode=dark?'dark':'light';
 const a=validAccent(state.accent)||'#1f5e46',p=themePalette(a,dark),contrast=contrastAccent(a,'#ffffff')>=contrastAccent(a,'#202020')?'#ffffff':'#202020';
 for(const [key,value]of Object.entries(p))root.style.setProperty('--theme-'+key,value);
 for(const [key,value]of Object.entries({accent:a,'accent-text':p.text,'accent-on':contrast,'accent-soft':p.soft,green:p.text,deep:p.deep,bg:p.bg,white:p.surface,paper:p.surface,ink:p.ink,muted:p.muted,line:p.line,mint:p.soft}))root.style.setProperty('--'+key,value);
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',p.bg);
}

state.accent=validAccent(state.accent)||'#1f5e46';
/* Before ambiances, a saved custom colour meant a deliberate choice: keep it as "Ma couleur". */
if(!AMBIANCES.some(([id])=>id===state.ambiance)&&state.ambiance!=='perso')state.ambiance=state.accent!=='#9a6544'&&state.accent!=='#1f5e46'?'perso':'nunya';
const settingsBeforeAccent=settingsView;settingsView=function(){return settingsBeforeAccent()+`<section class="panel appearance-panel" id="apparence"><span class="eyebrow">APPARENCE · JUSTE POUR TOI</span><h3>Choisis ton ambiance.</h3><p>Elle s’applique tout de suite à tout ton espace, reste sur cet appareil et fonctionne hors ligne. Le thème sombre plus haut s’y adapte.</p><div class="ambiance-grid">${AMBIANCES.map(([id,name,hint])=>`<button class="ambiance-card" data-ambiance="${id}" aria-pressed="${state.ambiance===id}"><span class="ambiance-preview" data-preview="${id}" aria-hidden="true"><i></i><b></b><em></em></span><strong>${name}</strong><small>${hint}</small></button>`).join('')}</div>${state.ambiance==='verre'?`<div class="setting-line"><span>Verre léger<small>Panneaux opaques et fond immobile : plus rapide sur les petits téléphones.</small></span><button class="toggle ${state.glassLite?'on':''}" role="switch" aria-checked="${state.glassLite===true}" aria-label="Verre léger" data-glass-lite></button></div>`:''}<details class="accent-own" ${state.ambiance==='perso'?'open':''}><summary>Ou compose ta propre couleur</summary><form id="accent-form"><label class="field" for="accent-hex">Code hexadécimal</label><div class="accent-custom"><input type="color" value="${state.accent}" aria-label="Choisir une couleur" data-accent-picker><input id="accent-hex" name="accent" maxlength="7" pattern="#[a-fA-F0-9]{6}" value="${state.accent}" placeholder="#1f5e46" aria-describedby="accent-help" required><button class="secondary">Appliquer</button></div><small id="accent-help">Un # suivi de six chiffres ou lettres de A à F. Le contraste du texte s’adapte automatiquement.</small></form></details></section>`};
/* Desktop sidebar can shrink to an icon rail; the choice stays on this device. */
function applySidebar(){const s=document.getElementById('sidebar');document.documentElement.dataset.sidebar=state.sidebarMini?'mini':'full';if(!s)return;let b=s.querySelector('.sidebar-toggle');if(!b){s.insertAdjacentHTML('afterbegin','<button class="sidebar-toggle" type="button" data-sidebar-toggle aria-controls="sidebar"></button>');b=s.firstElementChild}b.setAttribute('aria-expanded',String(!state.sidebarMini));b.setAttribute('aria-label',state.sidebarMini?'Déplier le menu':'Réduire le menu');for(const n of s.querySelectorAll('.nav-item,.help-button')){const t=n.textContent.slice(n.firstElementChild?.textContent.length||0).replace('↗','').trim();if(state.sidebarMini){n.title=t;n.setAttribute('aria-label',t)}else{n.title='';n.removeAttribute('aria-label')}}}
const renderBeforeAccent=render;render=function(){renderBeforeAccent();applyAccent();applySidebar()};
document.addEventListener('click',e=>{
 const b=e.target.closest('button[data-ambiance],button[data-glass-lite],button[data-sidebar-toggle]');if(!b)return;e.stopImmediatePropagation();
 if(b.hasAttribute('data-sidebar-toggle')){state.sidebarMini=!state.sidebarMini;persist();applySidebar();return}
 if(b.hasAttribute('data-glass-lite')){state.glassLite=!state.glassLite;persist();render();return}
 const found=AMBIANCES.find(([id])=>id===b.dataset.ambiance);if(!found)return;state.ambiance=found[0];if(found[0]==='nuit')state.theme='dark';persist();render();toast('Ambiance '+found[1]+' appliquée sur cet appareil.');document.querySelector('[data-ambiance="'+found[0]+'"]')?.focus();
},true);
document.addEventListener('input',e=>{if(e.target.matches?.('[data-accent-picker]'))document.getElementById('accent-hex').value=e.target.value});
document.addEventListener('submit',e=>{if(e.target.id!=='accent-form')return;e.preventDefault();e.stopImmediatePropagation();const a=validAccent(new FormData(e.target).get('accent'));if(!a){toast('Utilise un code comme #1f5e46.');return}state.accent=a;state.ambiance='perso';persist();render();toast('Ta couleur est appliquée.')},true);
applyAccent();applySidebar();if(academySection==='profile')render();
