import {existsSync} from 'node:fs';
import path from 'node:path';

// 5.28.2 : un script de test bloqué (attente sans fin dans la page) consommait toute la limite du job CI
// sans dire lequel. Chaque script lance son navigateur ici : le garde-fou l'arrête au bout de quelques minutes
// en le nommant. NUNYA_TEST_TIMEOUT_MIN remplace la limite pour un essai ponctuel.
const LIMIT_MIN={'visual-baseline.mjs':30},DEFAULT_LIMIT_MIN=15;

export async function launchTestBrowser(chromium){
 const script=path.basename(process.argv[1]||'script'),label=[script,...process.argv.slice(2)].join(' ');
 // Une valeur négative, infinie ou au-delà de la limite de setTimeout (environ 24 jours) ferait partir le minuteur
 // aussitôt : seules les durées entre 0 et 24 h sont retenues.
 const asked=Number(process.env.NUNYA_TEST_TIMEOUT_MIN),minutes=asked>0&&asked<=1440?asked:LIMIT_MIN[script]||DEFAULT_LIMIT_MIN;
 const watchdog=setTimeout(()=>{
  console.error(`::error::${label} tourne encore après ${minutes} min : arrêt par le garde-fou de lib/test/browser.mjs (NUNYA_TEST_TIMEOUT_MIN pour changer la limite).`);
  // Playwright ferme lui-même, à la sortie du processus, les navigateurs qu'il a lancés.
  process.exit(124);
 },minutes*60000);
 watchdog.unref();
 const configured=process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,mac='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
 const browser=await chromium.launch({headless:true,...(configured?{executablePath:configured}:existsSync(mac)?{executablePath:mac}:{})});
 browser.on('disconnected',()=>clearTimeout(watchdog));
 return browser;
}

// Attend que le service worker contrôle la page (control:true) ou seulement qu'il soit actif (control:false).
// page.evaluate n'a pas de délai : l'ancienne attente sur navigator.serviceWorker.ready pouvait durer sans fin
// si l'installation échouait. Ici l'échec arrive en `timeout` ms et décrit l'état de l'enregistrement.
export async function waitForServiceWorkerControl(page,{timeout=60000,control=true}={}){
 try{
  // waitForFunction n'attend pas une promesse renvoyée par le prédicat (elle compterait comme vraie) :
  // `ready` est donc noté dans la page sans bloquer, puis lu par un prédicat synchrone.
  await page.evaluate(()=>{navigator.serviceWorker.ready.then(()=>{globalThis.__nunyaServiceWorkerReady=true})});
  await page.waitForFunction(needControl=>globalThis.__nunyaServiceWorkerReady===true&&(!needControl||Boolean(navigator.serviceWorker.controller)),control,{timeout,polling:100});
 }catch(error){
  const state=await Promise.race([
   page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();return {url:location.href,controller:Boolean(navigator.serviceWorker.controller),installing:r?.installing?.state??null,waiting:r?.waiting?.state??null,active:r?.active?.state??null}}),
   new Promise(resolve=>setTimeout(()=>resolve('état illisible en 5 s'),5000).unref())
  ]).catch(e=>`état illisible : ${e.message}`);
  throw Error(`Service worker ${control?'sans contrôle de la page':'jamais actif'} après ${timeout/1000} s : ${JSON.stringify(state)}`,{cause:error});
 }
}
