import {launchTestBrowser} from '../lib/test/browser.mjs';import {chromium,expect} from '@playwright/test';import fs from 'node:fs/promises';import axe from 'axe-core';
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),errors=[],results=[];
const saved=p=>p.evaluate(()=>JSON.parse(localStorage.getItem('nunya-state')));
try{
 const profileCtx=await browser.newContext({viewport:{width:1440,height:900}}),profilePage=await profileCtx.newPage();profilePage.on('pageerror',e=>errors.push(e.message));await profilePage.goto(base+'#/accueil');await profilePage.evaluate(()=>{const s=JSON.parse(localStorage.getItem('nunya-state')||'{}');localStorage.setItem('nunya-state',JSON.stringify({...s,ambiance:'nunya',theme:'light'}))});await profilePage.reload();
 for(const theme of ['light','dark']){if(theme==='dark'){await profilePage.evaluate(()=>{const s=JSON.parse(localStorage.getItem('nunya-state'));localStorage.setItem('nunya-state',JSON.stringify({...s,theme:'dark'}))});await profilePage.reload()}await profilePage.locator('#profile-btn').click();await expect(profilePage.locator('#profile-form')).toBeVisible();const typography=await profilePage.locator('.modal').evaluate(modal=>({copy:parseFloat(getComputedStyle(modal.querySelector('p')).fontSize),label:parseFloat(getComputedStyle(modal.querySelector('.field')).fontSize),input:parseFloat(getComputedStyle(modal.querySelector('input')).fontSize),note:parseFloat(getComputedStyle(modal.querySelector('.form-note')).fontSize),close:modal.querySelector('.modal-close').getBoundingClientRect().width,art:modal.querySelector('.onboarding-art').getBoundingClientRect().width}));expect(typography).toEqual({copy:15,label:15,input:16,note:14,close:44,art:52});const aligned=await profilePage.locator('.modal').evaluate(modal=>{const name=modal.querySelector('[name="name"]').getBoundingClientRect(),age=modal.querySelector('[name="ageBand"]').getBoundingClientRect();return Math.abs(name.top-age.top)<1&&name.right<=age.left});expect(aligned).toBe(true);await profilePage.evaluate(axe.source);const contrast=await profilePage.locator('.modal').evaluate(async modal=>axe.run(modal,{runOnly:{type:'rule',values:['color-contrast']}}));expect(contrast.violations.map(v=>v.id)).toEqual([]);await profilePage.locator('#close-modal').click()}
 results.push({profileModal:'supporting text and controls meet the intended sizes; WCAG contrast passes in light and dark'});
 await profileCtx.close();
 const syncCtx=await browser.newContext(),syncPage=await syncCtx.newPage(),syncRequests=[];syncPage.on('request',request=>{const url=new URL(request.url());if(url.pathname.startsWith('/auth/v1/')||url.pathname.startsWith('/rest/v1/'))syncRequests.push(url.pathname)});await syncPage.goto(base+'#/profil');await expect(syncPage.locator('.settings-grid')).toBeVisible();expect(syncRequests).toEqual([]);results.push({progressSync:'disabled; profile settings make no Supabase auth or data requests'});await syncCtx.close();
 for(const [route,canonical]of [['#/apprendre/python-bases/m12/py-m12-03','#/apprendre/python-bases/m12/py-m12-03'],['#/apprendre/decouverte/m4/dec-m4-05','#/apprendre/decouverte/m4/dec-m4-05'],['#/bibliotheque/cours','#/apprendre']]){const ctx=await browser.newContext(),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base+route);await expect(p.locator('#main h1').first()).toBeVisible();await expect(p).toHaveURL(new RegExp(canonical.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$'));await expect(p.locator('[data-onboarding=begin]')).toHaveCount(0);results.push({deepLink:route,canonical,firstVisit:'opens without questionnaire'});await ctx.close()}
 const ctx=await browser.newContext(),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'#/accueil');await p.locator('[data-onboarding=skip]').click();await expect(p).toHaveURL(/#\/apprendre$/);await p.reload();expect((await saved(p)).onboarding.skipped).toBe(true);expect((await saved(p)).onboarding.result).toBeUndefined();await p.locator('[data-onboarding=preferences]').click();await p.locator('[data-onboarding=domain][data-value=web]').click();await p.locator('[data-onboarding=profile]').click();await p.locator('select[name=age]').selectOption('19+');await p.locator('select[name=level]').selectOption('advanced');await p.locator('select[name=goal]').selectOption('30');await p.locator('#a-personalization-form button[type=submit]').click();await expect(p.locator('#main h1')).toContainText('point de départ selon tes choix');expect((await saved(p)).onboarding.result).toBeUndefined();await p.locator('[data-onboarding=resume]').click();await expect(p.locator('#as-overlay')).toBeVisible();await p.locator('#as-overlay [data-onboarding=skip]').click();await expect(p.locator('#as-overlay')).toHaveCount(0);await expect(p).toHaveURL(/#\/apprendre$/);results.push({personalization:'skip persists; short optional preferences; diagnostic can be closed without score'});await ctx.close();
 const source={format:'nunya-backup-v2',profile:{name:'Essai sauvegarde',level:'advanced'},done:[],activity:{},curriculum:{work:{'py-m12-03-e1':{code:'print("retrouvé")',passed:false}},read:{'py-m12-03':true},positions:{'py-m12-03':2},quizPositions:{'py-m12-03':1},lastLesson:'py-m12-03'},discovery:{answers:{'dec-m2-03-a1':{value:2,checked:true,correct:true}},reflections:{'dec-m2-03':'Mon raisonnement restauré'},last:'dec-m2-03',saved:true},academy:{onboarded:true}};
 const restoreCtx=await browser.newContext(),r=await restoreCtx.newPage();r.on('pageerror',e=>errors.push(e.message));
 await r.goto(base+'#/progression');
 await expect(r.locator('.momentum')).toBeVisible();
 const picker=r.waitForEvent('filechooser');
 await r.locator('.momentum-backup-actions [data-action=import]').click();
 await(await picker).setFiles({name:'nunya-test.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(source))});
 await expect(r.locator('#toast')).toContainText('ont été restaurés');
 await expect(r).toHaveURL(/#\/progression$/);
 let state=await saved(r);
 expect(state.profile.level).toBe('advanced');
 expect(state.curriculum.work['py-m12-03-e1'].code).toContain('retrouvé');
 expect(state.curriculum.positions['py-m12-03']).toBe(2);
 expect(state.discovery.reflections['dec-m2-03']).toContain('restauré');
 expect(state.discovery.saved).toBe(false);
 await r.reload();
 state=await saved(r);
 expect(state.curriculum.lastLesson).toBe('py-m12-03');
 await restoreCtx.close();

 const invalidCtx=await browser.newContext(),invalid=await invalidCtx.newPage();
 invalid.on('pageerror',e=>errors.push(e.message));
 await invalid.goto(base+'#/progression');
 const beforeInvalid=await saved(invalid),invalidPicker=invalid.waitForEvent('filechooser');
 await invalid.locator('.momentum-backup-actions [data-action=import]').click();
 await(await invalidPicker).setFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('{bad')});
 await expect(invalid.locator('#toast')).toBeVisible();
 expect(await saved(invalid)).toEqual(beforeInvalid);
 await invalidCtx.close();
 results.push({backup:'native picker restores Python M12 and discovery; persists after reload; malformed file leaves state unchanged'});
 const mobile=await browser.newContext({viewport:{width:360,height:800}}),m=await mobile.newPage();m.on('pageerror',e=>errors.push(e.message));await m.goto(base+'#/accueil');await m.locator('[data-onboarding=skip]').click();await m.goto(base+'#/accueil');await expect(m.locator('.a-home-hero')).toBeVisible();await expect(m.locator('.a-start')).toHaveCount(1);await m.locator('[data-onboarding=begin]').click();await expect(m.locator('.a-onboarding-domains')).toBeVisible();expect(parseFloat(await m.locator('.a-onboarding-step').evaluate(e=>getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(14);expect(parseFloat(await m.locator('.a-onboarding-domain strong').first().evaluate(e=>getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(16);await expect(m.locator('.a-start')).toHaveCount(0);await m.locator('[data-onboarding=skip]').click();await m.locator('#a-more').click();await expect(m.locator('#sidebar')).toHaveClass(/open/);await m.locator('#main').click({position:{x:330,y:180},force:true});await expect(m.locator('#sidebar')).not.toHaveClass(/open/);await expect(m.locator('#a-more')).toHaveAttribute('aria-expanded','false');results.push({mobileHome:'one start card; optional preferences opened later; supporting onboarding text remains readable'});await mobile.close();
 if(errors.length)throw Error(errors.join(';'));await fs.writeFile('docs/BACKUP_ONBOARDING_RESULTS.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors}));
}finally{await browser.close()}
