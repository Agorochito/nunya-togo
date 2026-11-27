import {chromium,expect} from '@playwright/test';
import fs from 'node:fs/promises';
import axe from 'axe-core';
import {launchTestBrowser} from '../lib/test/browser.mjs';

const root=new URL(process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/');
const routeUrl=route=>{const url=new URL(root);url.searchParams.set('v','availability-test');url.hash='#/'+route;return url.href};
const paths=JSON.parse(await fs.readFile(new URL('../dist/data/paths/index.json',import.meta.url),'utf8'));
const availableCount=paths.filter(path=>(path.domain_id||'tech')==='tech').length;
const upcomingDomainCount=new Set(paths.map(path=>path.domain_id||'tech').filter(id=>id!=='tech')).size;
const browser=await launchTestBrowser(chromium);

try{
 for(const width of [360,1440]){
  const context=await browser.newContext({viewport:{width,height:900},colorScheme:'light',serviceWorkers:'block'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',error=>errors.push(error.message));

  await page.goto(routeUrl('avenir'));
  await expect(page.locator('.a-available-paths .a-path-card[href]')).toHaveCount(availableCount);
  await expect(page.locator('.a-available-paths')).toContainText(`${availableCount} parcours guidés sont accessibles aujourd’hui`);
  await expect(page.locator('.a-coming-domains')).toHaveCount(1);
  await expect(page.locator('.a-coming-domains')).not.toHaveAttribute('open','');
  await expect(page.locator('.a-coming-domains summary')).toContainText(String(upcomingDomainCount));
  await page.locator('.a-coming-domains summary').click();
  await expect(page.locator('.a-coming-domains article.a-domain-card')).toHaveCount(upcomingDomainCount);
  await expect(page.locator('.a-coming-domains a.a-domain-card')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);

  await page.evaluate(axe.source);
  let violations=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  expect(violations.violations.map(item=>item.id)).toEqual([]);

  await page.goto(routeUrl('mes-cours'));
  await expect(page.locator('.a-path-hero .eyebrow')).toContainText('DISPONIBLE · PILOTE DE SECONDE');
  await expect(page.locator('.a-path-hero a.primary')).toHaveAttribute('href','#/mes-cours/seconde/maths/maths-seconde');
  await expect(page.locator('#main')).toContainText('La Terminale propose une révision partielle');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.evaluate(axe.source);
  violations=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  expect(violations.violations.map(item=>item.id)).toEqual([]);

  await page.goto(routeUrl('portfolio'));
  await expect(page).toHaveURL(/#\/portfolio$/);
  await expect(page.locator('#main')).toContainText('Portfolio indisponible');
  await expect(page.locator('#main')).toContainText('ne sont pas supprimés');
  await expect(page.locator('#main a[href="#/progression"]')).toBeVisible();
  await expect(page.locator('#main a[href="#/avenir"]')).toBeVisible();
  await page.evaluate(axe.source);
  violations=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
  expect(violations.violations.map(item=>item.id)).toEqual([]);
  if(width===360){
   await page.locator('#menu-btn').click();
   await page.locator('#help-btn').click();
   await expect(page.locator('#aide-dialog')).toBeVisible();
   await expect(page.locator('#aide-dialog [data-aide="consent"]')).toBeVisible();
  }

  if(errors.length)throw Error(errors.join('; '));
  await context.close();
  console.log(`PASS disponibilité des parcours et pilote scolaire · ${width}px`);
 }
}finally{
 await browser.close();
}
