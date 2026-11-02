import {chromium,expect} from '@playwright/test';
import axe from 'axe-core';import fs from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const findings=[];for(const width of [360,1440])for(const dark of [false,true]){
const context=await browser.newContext({viewport:{width,height:width===360?640:900},colorScheme:dark?'dark':'light'});const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:4176/?v=5.0.2';
for(const route of ['bibliotheque/competences','bibliotheque/theme/bureautique','collection/lf-excel']){
await p.goto(base+'#/'+route);await p.locator('#main h1').waitFor();await expect(p.locator('#main')).not.toContainText('Cette page n’existe');await p.evaluate(axe.source);const result=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);findings.push({route,width,dark,overflow,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
await p.screenshot({path:`docs/screenshots/skills-${width}-${dark?'dark':'light'}-${route.replaceAll('/','-')}.png`});expect(overflow).toBe(false);expect(result.violations).toHaveLength(0);
}
await p.locator('.a-hero-actions .primary').click();await expect(p).toHaveURL(/cours-tableurs-pratique/);await p.locator('.a-hero-actions .primary').click();await expect(p.locator('.a-lesson h1')).toContainText('petite table');console.log('PASS French spreadsheet companion opens, '+width+' '+dark);
for(const id of ['cv-candidatures','entretien-professionnel','documents-pratique']){await p.goto(base+'#/parcours/cours-'+id);await p.locator('.a-hero-actions .primary').click();await p.locator('.a-lesson h1').waitFor();await expect(p.locator('[data-a="tab"][data-tab="practice"]').first()).toBeVisible()}
await p.goto(base+'#/mes-cours');await p.locator('[data-a="legacy-school"]').click();await p.locator('#school-class').selectOption('Terminale');await expect(p.locator('#school-class')).toHaveValue('Terminale');await expect(p.locator('.school-subject-grid button').first()).toBeVisible();console.log('PASS class and subject catalogue retained');
await p.goto(base+'#/collection/lf-computer');await p.locator('[data-collection-video]').click();await expect(p.locator('#a-collection-player iframe')).toHaveAttribute('src',/youtube-nocookie.com\/embed\/Cu3R5it4cQs/);console.log('PASS optional official video has embedded player');
await p.goto(base+'#/bibliotheque');await p.locator('#a-library-query').fill('fraction');await p.locator('.resource-card').first().waitFor();const before=await p.locator('.resource-card h3').first().innerText();await p.locator('[data-search-page="next"]').click();expect(await p.locator('.resource-card h3').first().innerText()).not.toBe(before);console.log('PASS resource search pagination');
if(errors.length)throw Error(errors.join(';'));await context.close();}
const c=await browser.newContext({javaScriptEnabled:false});const p=await c.newPage();await p.goto('http://127.0.0.1:4176/guide-public.html');await expect(p.locator('h1')).toBeVisible();await c.close();await browser.close();await fs.writeFile('docs/AXE_SKILLS.json',JSON.stringify(findings,null,2));console.log('PASS skill catalogue, 12 axe views, no JS public guide');
