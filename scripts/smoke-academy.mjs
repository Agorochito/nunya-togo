import {chromium} from '@playwright/test';
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});const p=await b.newPage({viewport:{width:360,height:640}});p.on('pageerror',e=>console.log('PAGEERROR',e.message));
for(const route of ['accueil','avenir','parcours/cybersecurite','parcours/cybersecurite/etape/cyber-decouvrir-metier','mes-cours','bibliotheque','etranger','opportunites','portfolio']){await p.goto('http://127.0.0.1:4176/?v=5.0.0#/'+route);await p.waitForTimeout(450);console.log(route,await p.locator('#main h1').allTextContents(),await p.locator('#a-script-failure').isVisible());}
await b.close();
