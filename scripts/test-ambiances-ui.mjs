import {chromium,expect} from '@playwright/test';import fs from 'node:fs/promises';import axe from 'axe-core';import {launchTestBrowser} from '../lib/test/browser.mjs';
/* Seven ambiances: chosen from the welcome screen and from settings, saved on the device, readable (axe, including contrast) in light and dark, and never wider than a phone. */
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),results=[],errors=[];
const AMBIANCES=['nunya','lagune','kente','sauge','prune','nuit','verre'];
const saved=p=>p.evaluate(()=>JSON.parse(localStorage.getItem('nunya-state')||'{}'));
const seed=(p,patch)=>p.evaluate(patch=>{const s=JSON.parse(localStorage.getItem('nunya-state')||'{}');localStorage.setItem('nunya-state',JSON.stringify({...s,...patch}))},patch);
const audit=async p=>{await p.evaluate(axe.source);return p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}).then(r=>r.violations.map(v=>v.id+': '+v.nodes.slice(0,3).map(n=>n.target.join(' ')).join(' | '))))};
try{
 for(const width of [360,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900}}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'#/');await p.evaluate(()=>localStorage.clear());await p.reload();
  // A fresh learner gets the Nunya ambiance, and can switch from the welcome screen.
  await expect(p.locator('html')).toHaveAttribute('data-ambiance','nunya');
  await expect(p.locator('.ambiance-quick button')).toHaveCount(AMBIANCES.length);
  await p.locator('.ambiance-quick button[data-ambiance="lagune"]').click();
  await expect(p.locator('html')).toHaveAttribute('data-ambiance','lagune');
  expect((await saved(p)).ambiance).toBe('lagune');
  await expect(p.locator('.ambiance-quick button[data-ambiance="lagune"]')).toHaveAttribute('aria-pressed','true');
  // Settings: every card applies its ambiance; Nuit turns the dark theme on.
  await p.goto(base+'#/profil');await expect(p.locator('#apparence .ambiance-card')).toHaveCount(AMBIANCES.length);
  const checked=[];
  for(const id of AMBIANCES){await p.locator(`#apparence .ambiance-card[data-ambiance="${id}"]`).click();await expect(p.locator('html')).toHaveAttribute('data-ambiance',id);await expect(p.locator(`#apparence .ambiance-card[data-ambiance="${id}"]`)).toHaveAttribute('aria-pressed','true');checked.push(id)}
  expect((await saved(p)).theme).toBe('dark');
  // Liquid glass: animated colour field, translucent panels, and a light version on demand.
  await expect(p.locator('#apparence [data-glass-lite]')).toBeVisible();
  expect(await p.evaluate(()=>getComputedStyle(document.body,'::before').backgroundImage)).toContain('radial-gradient');
  await p.locator('#apparence [data-glass-lite]').click();await expect(p.locator('html')).toHaveAttribute('data-glass-lite','');
  expect((await saved(p)).glassLite).toBe(true);
  await p.locator('#apparence [data-glass-lite]').click();await expect(p.locator('html')).not.toHaveAttribute('data-glass-lite','');
  // Own colour stays available and switches the ambiance off.
  await p.locator('#apparence .accent-own summary').click();await p.locator('#accent-hex').fill('#7a3e9d');await p.locator('#accent-form button').click();
  await expect(p.locator('html')).not.toHaveAttribute('data-ambiance',/.+/);expect((await saved(p)).ambiance).toBe('perso');
  // Readability of each ambiance in each mode, on the settings and course pages.
  const audits=[];
  for(const id of AMBIANCES)for(const theme of id==='nuit'?['dark']:['light','dark']){
   await seed(p,{ambiance:id,theme,glassLite:false});
   for(const route of ['#/profil','#/apprendre']){await p.goto(base+route);await p.reload();await expect(p.locator('html')).toHaveAttribute('data-ambiance',id);await p.waitForTimeout(300);
    const v=await audit(p);if(v.length)throw Error(`${id}/${theme} ${route} à ${width}px : ${v.join(' ; ')}`);
    expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);audits.push(id+'/'+theme+route)}
  }
  await seed(p,{ambiance:'verre',theme:'dark'});await p.goto(base+'#/profil');await p.reload();await p.locator('#apparence').scrollIntoViewIfNeeded();await p.screenshot({path:'docs/screenshots/ambiances-verre-'+width+'.png'});
  await seed(p,{ambiance:'nunya',theme:'light'});await p.goto(base+'#/profil');await p.reload();await p.locator('#apparence').scrollIntoViewIfNeeded();await p.screenshot({path:'docs/screenshots/ambiances-nunya-'+width+'.png'});
  // Desktop: the sidebar folds into an icon rail, keeps accessible names and tooltips, and remembers the choice.
  let sidebarChecked=false;
  if(width>=1440){
   await seed(p,{ambiance:'nunya',theme:'light',sidebarMini:false});await p.goto(base+'#/apprendre');await p.reload();
   const toggle=p.locator('#sidebar .sidebar-toggle');await expect(toggle).toHaveAttribute('aria-expanded','true');
   const before=await p.locator('.workspace').evaluate(el=>parseFloat(getComputedStyle(el).marginLeft));
   await toggle.click();await expect(p.locator('html')).toHaveAttribute('data-sidebar','mini');await expect(toggle).toHaveAttribute('aria-expanded','false');
   await p.waitForTimeout(400);
   const after=await p.locator('.workspace').evaluate(el=>parseFloat(getComputedStyle(el).marginLeft));
   expect(after).toBeLessThan(before);expect(after).toBe(76);
   expect(await p.locator('#sidebar .nav-item').first().getAttribute('title')).toBeTruthy();
   expect((await saved(p)).sidebarMini).toBe(true);
   await p.reload();await expect(p.locator('html')).toHaveAttribute('data-sidebar','mini');
   const v=await audit(p);if(v.length)throw Error('barre réduite : '+v.join(' ; '));
   expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
   await p.screenshot({path:'docs/screenshots/sidebar-reduite-1440.png'});
   await p.locator('#sidebar .sidebar-toggle').click();await expect(p.locator('html')).toHaveAttribute('data-sidebar','full');
   sidebarChecked=true;
  }
  results.push({width,welcomePicker:true,sidebarToggle:sidebarChecked,settingsCards:checked.length,nuitForcesDark:true,glassLiteToggle:true,ownColour:true,axeAudits:audits.length,axeViolations:0});
  await ctx.close();
 }
 if(errors.length)throw Error(errors.join(';'));
 await fs.writeFile('docs/AMBIANCES_UI_RESULTS.json',JSON.stringify({results,errors},null,2)+'\n');console.log(JSON.stringify({results,errors}));
}catch(error){console.log('ambiances UI failed: '+error.message);throw error}finally{await browser.close()}
