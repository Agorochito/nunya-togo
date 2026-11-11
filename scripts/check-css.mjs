// Cliquet CSS (refonte, phase 0) : aucune hausse permise de la dette CSS, fichier par fichier, et budget gzip du bundle CSS.
// Sources contrôlées : exactement celles que scripts/build-academy.mjs concatène dans dist/runtime/academy.bundle.css (liste relue dans ce script à chaque exécution).
// Métriques par fichier, comptées hors commentaires :
//  - important : occurrences de « !important » (insensible à la casse, « ! important » compris), dans tout le fichier, y compris le fichier généré dist/ambiances.css ;
//  - couleurs : couleurs écrites en dur dans les valeurs de déclaration : #hex de 3, 4, 6 ou 8 chiffres, et rgb()/rgba()/hsl()/hsla() dont les arguments ne contiennent pas var().
//    Ne comptent pas : les définitions de propriétés personnalisées (--x: …) posées dans un bloc de thème, c.-à-d. une règle dont CHAQUE sélecteur est un sélecteur composé sans combinateur
//    qui commence par :root, html ou body, ou qui n’est qu’une classe d’état .dark/.light/.personalized ou un attribut [data-theme…]/[data-ambiance…] (avec éventuels qualificatifs) ;
//    les sélecteurs (#id), les chaînes et le contenu de url(…) (images en data-URI, url(#dégradé)) ; les mots-clés nommés (white, black, transparent…) et color-mix().
//    Une propriété personnalisée définie hors bloc de thème (ex. .carte{--x:#fff}) compte. dist/ambiances.css, généré par scripts/build-ambiances.py, est exclu de cette métrique (ses couleurs sont les jetons).
//  - petitesPolices : déclarations font-size (et taille du raccourci font) dont une longueur vaut moins de 12 px, en supposant une racine et un parent à 16 px :
//    px < 12, rem/em < 0,75, % < 75, mots-clés xx-small (9 px) et x-small (10 px). Dans clamp()/min()/max()/calc(), chaque longueur littérale est testée ; smaller, vw et var() ne sont pas évalués.
// Usage : node scripts/check-css.mjs (échoue si une valeur dépasse docs/CSS_RATCHET.json ou si le bundle dépasse CSS_GZIP_BUDGET) ; node scripts/check-css.mjs --update (réécrit le cliquet).
import fs from 'node:fs';import {CSS_GZIP_BUDGET,cssGzipBytes} from './js-budget.mjs';
const root=new URL('../',import.meta.url);const read=f=>fs.readFileSync(new URL(f,root),'utf8');const RATCHET='docs/CSS_RATCHET.json';
// Liste des sources du bundle, relue dans build-academy.mjs pour rester synchronisée avec le build.
const cssSources=()=>{const b=read('scripts/build-academy.mjs');const i=b.indexOf('const css=await transform(');const j=b.indexOf("{loader:'css'",i);if(i<0||j<0)throw Error('check-css : construction du bundle CSS introuvable dans scripts/build-academy.mjs');const seg=b.slice(i,j);const arr=seg.match(/\[([^\]]*)\]\.map\(f=>fs\.readFileSync\('([^']*)'\+f/);if(!arr)throw Error('check-css : liste des fichiers CSS illisible dans scripts/build-academy.mjs');const files=[...arr[1].matchAll(/'([^']+\.css)'/g)].map(m=>arr[2]+m[1]);for(const m of seg.slice(arr.index+arr[0].length).matchAll(/readFileSync\('([^']+\.css)'/g))files.push(m[1]);return files};
// Retire les commentaires ; remplace chaînes et url(…) par des blancs pour que rien ne soit compté dedans.
const stripComments=css=>css.replace(/\/\*[\s\S]*?\*\//g,' ');
const blankOpaque=v=>v.replace(/url\(\s*(?:"[^"]*"|'[^']*'|[^)]*)\s*\)/gi,'url()').replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g,'""');
// Découpe minimale : renvoie les déclarations {prop,value,selectors} des règles de style, @media/@supports/@layer traversés.
const declarations=css=>{const out=[];const stack=[];let buf='',q=null,paren=0;const flush=()=>{const d=buf.trim();buf='';const top=stack[stack.length-1];if(!d||!top||top.startsWith('@')&&!/^@(font-face|page)\b/i.test(top))return;const k=d.indexOf(':');if(k<1)return;out.push({prop:d.slice(0,k).trim().toLowerCase(),value:d.slice(k+1).trim(),selectors:top})};
for(let i=0;i<css.length;i++){const c=css[i];if(q){buf+=c;if(c==='\\'){buf+=css[++i]??'';}else if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;buf+=c;continue}if(c==='('){paren++;buf+=c;continue}if(c===')'){paren=Math.max(0,paren-1);buf+=c;continue}if(paren){buf+=c;continue}
if(c==='{'){stack.push(buf.trim().replace(/\s+/g,' '));buf='';continue}if(c===';'){flush();continue}if(c==='}'){flush();stack.pop();continue}buf+=c}return out};
const THEME_SEL=/^(?:(?::root|html|body)(?![\w-])|\.(?:dark|light|personalized)(?![\w-])|\[data-(?:theme|ambiance)\b)[^\s>+~]*$/i;
const isThemeBlock=sel=>sel.split(',').every(s=>THEME_SEL.test(s.trim()));
const HEX=/#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/gi;
const countColours=value=>{const v=blankOpaque(value);let n=(v.match(HEX)||[]).length;for(const m of v.matchAll(/\b(?:rgba?|hsla?)\(([^()]*(?:\([^()]*\)[^()]*)*)\)/gi))if(!/var\(/i.test(m[1]))n++;return n};
const KEYWORD_PX={'xx-small':9,'x-small':10};
const lengthsPx=v=>[...blankOpaque(v).matchAll(/(-?\d*\.?\d+)(px|rem|em|%)(?![\w-])/gi)].map(m=>{const x=parseFloat(m[1]),u=m[2].toLowerCase();return u==='px'?x:u==='%'?x*16/100:x*16});
const splitTop=v=>{const t=[];let cur='',d=0;for(const c of v){if(c==='(')d++;else if(c===')')d=Math.max(0,d-1);if(!d&&(/\s/.test(c)||c==='/')){if(cur)t.push(cur);cur='';continue}cur+=c}if(cur)t.push(cur);return t};
const SIZE_TOKEN=/^(?:-?\d*\.?\d+(?:px|rem|em|%)|xx-small|x-small|(?:clamp|min|max|calc)\(.*\))$/i;
const fontSizePx=(prop,value)=>{let v=blankOpaque(value.replace(/!\s*important/i,'')).trim();if(prop==='font'){v=splitTop(v).find(t=>SIZE_TOKEN.test(t));if(!v)return []}const kw=KEYWORD_PX[v.toLowerCase()];return kw?[kw]:lengthsPx(v)};
const measure=(file,css)=>{const body=stripComments(css);const generated=/^\s*\/\*\s*Generated by scripts\/build-ambiances\.py/.test(css);let colours=generated?null:0,small=0;const important=(blankOpaque(body).match(/!\s*important\b/gi)||[]).length;
for(const d of declarations(body)){if(colours!==null&&!(d.prop.startsWith('--')&&isThemeBlock(d.selectors)))colours+=countColours(d.value);if((d.prop==='font-size'||d.prop==='font')&&fontSizePx(d.prop,d.value).some(px=>px<12))small++}
return {important,colours,petitesPolices:small}};
const files=cssSources();const missing=files.filter(f=>!fs.existsSync(new URL(f,root)));if(missing.length)throw Error('check-css : sources CSS absentes : '+missing.join(', '));
const metrics=Object.fromEntries(files.map(f=>[f,measure(f,read(f))]));
let gzip=null;try{gzip=cssGzipBytes()}catch{gzip=null}
const summary={fichiers:metrics,cssGzipBytes:gzip,budget:CSS_GZIP_BUDGET};
if(process.argv.includes('--update')){const doc={_note:'Cliquet CSS produit par node scripts/check-css.mjs --update. Les valeurs ne doivent jamais augmenter ; règles de comptage en tête de scripts/check-css.mjs. colours=null : métrique non applicable (fichier généré, couleurs = jetons).',fichiers:metrics};fs.mkdirSync(new URL('docs/',root),{recursive:true});fs.writeFileSync(new URL(RATCHET,root),JSON.stringify(doc,null,2)+'\n');console.log(JSON.stringify({...summary,status:'updated'}));process.exit(0)}
const errors=[],gains=[];let base={};try{base=JSON.parse(read(RATCHET)).fichiers||{}}catch{errors.push(RATCHET+' introuvable ou illisible : lancer node scripts/check-css.mjs --update')}
const LABEL={important:'!important',colours:'couleurs en dur',petitesPolices:'tailles de police < 12 px'};
if(!errors.length)for(const [f,m] of Object.entries(metrics))for(const k of Object.keys(LABEL)){if(m[k]===null)continue;const was=base[f]?.[k]??0;if(m[k]>was)errors.push(f+' : '+LABEL[k]+' '+was+' → '+m[k]);else if(m[k]<was)gains.push(f+' : '+LABEL[k]+' '+was+' → '+m[k])}
if(gzip===null)errors.push('dist/runtime/academy.bundle.css introuvable : lancer le build avant ce contrôle');else if(gzip>CSS_GZIP_BUDGET)errors.push('Bundle CSS : '+gzip+' o gzip, au-delà du budget de '+CSS_GZIP_BUDGET+' o');
console.log(JSON.stringify({...summary,baisses:gains,status:errors.length?'failed':'passed'}));
if(gains.length)console.error('Baisse constatée : lancer node scripts/check-css.mjs --update pour verrouiller le gain.');
if(errors.length){console.error('Cliquet CSS en échec :\n- '+errors.join('\n- '));process.exit(1)}
