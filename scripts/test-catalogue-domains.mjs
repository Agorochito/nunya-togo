import {chromium,expect} from '@playwright/test';import fs from 'node:fs/promises';import axe from 'axe-core';import {launchTestBrowser} from '../lib/test/browser.mjs';
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),results=[],errors=[];
try{for(const width of [360,1440]){const ctx=await browser.newContext({viewport:{width,height:900}}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'#/apprendre');const toggles=p.locator('[data-domain-toggle]');await expect(toggles.first()).toBeVisible();const count=await toggles.count();expect(count).toBeGreaterThanOrEqual(4);
 const lang=p.locator('[data-domain-toggle=langages]'),body=p.locator('#nunya-domain-body-langages');await expect(lang).toHaveAttribute('aria-expanded','true');await expect(body).toBeVisible();
 await lang.click();await expect(lang).toHaveAttribute('aria-expanded','false');await expect(body).toBeHidden();await expect(lang).toBeFocused();
 await p.reload();await expect(p.locator('[data-domain-toggle=langages]')).toHaveAttribute('aria-expanded','false');await expect(p.locator('#nunya-domain-body-langages')).toBeHidden();await expect(p.locator('#nunya-domain-body-web')).toBeVisible();
 await p.locator('[data-domain-toggle=langages]').focus();await p.keyboard.press('Enter');await expect(p.locator('#nunya-domain-body-langages')).toBeVisible();
 const all=p.locator('[data-domain-all]');await all.click();await expect(all).toHaveText('Tout déplier');for(let i=0;i<count;i++)await expect(toggles.nth(i)).toHaveAttribute('aria-expanded','false');
 await p.evaluate(axe.source);const audit=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));expect(audit.violations.map(v=>v.id)).toEqual([]);
 expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);await p.locator('.nunya-catalogue-courses').screenshot({path:'docs/screenshots/catalogue-domaines-replies-'+width+'.png'});
 await all.click();await expect(all).toHaveText('Tout replier');for(let i=0;i<count;i++)await expect(toggles.nth(i)).toHaveAttribute('aria-expanded','true');
 await p.locator('#nunya-course-query').fill('python');await p.locator('#nunya-course-search-submit').click();await expect(p.locator('[data-domain-toggle]')).toHaveCount(0);
 results.push({width,domains:count,toggle:true,keyboard:true,persistedAfterReload:true,toggleAll:true,axeViolations:0});await ctx.close();}
 if(errors.length)throw Error(errors.join(';'));await fs.writeFile('docs/CATALOGUE_DOMAINS_UI_RESULTS.json',JSON.stringify({results,errors},null,2));console.log(JSON.stringify({results,errors}));
}catch(error){console.log('Catalogue domains UI failed: '+error.message);throw error}finally{await browser.close()}
