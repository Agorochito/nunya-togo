import {chromium,expect} from '@playwright/test';
import fs from 'node:fs/promises';
import {launchTestBrowser} from '../lib/test/browser.mjs';

const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/';
const pack=JSON.parse(await fs.readFile('dist/data/curriculum/html-bases.json','utf8'));
const lesson=pack.lessons[0],browser=await launchTestBrowser(chromium);

try{
 const context=await browser.newContext({viewport:{width:360,height:900}});
 await context.addInitScript(()=>{if(!localStorage.getItem('nunya-state'))localStorage.setItem('nunya-state',JSON.stringify({academy:{onboarded:true}}))});
 const page=await context.newPage();
 const route='#/apprendre/'+pack.course.id+'/'+lesson.module+'/'+lesson.id;
 await page.goto(base+route);
 await expect(page.locator('.curr-lesson-head h1')).toHaveText(lesson.title_fr);
 await page.locator('[data-curr="code"]').click();
 await expect(page.locator('.curr-workspace')).toHaveAttribute('data-tab','code');
 await page.evaluate(()=>window.scrollTo(0,Math.min(600,document.documentElement.scrollHeight-innerHeight)));
 await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBeGreaterThan(0);
 await page.waitForTimeout(450);
 const saved=await page.evaluate(id=>JSON.parse(localStorage.getItem('nunya-state')).curriculum.readingPositions[id],lesson.id);
 expect(saved).toBeGreaterThan(0);
 await page.reload();
 await expect(page.locator('.curr-lesson-head h1')).toHaveText(lesson.title_fr);
 await expect(page.locator('.curr-workspace')).toHaveAttribute('data-tab','code');
 await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(saved);
 const state=await page.evaluate(()=>JSON.parse(localStorage.getItem('nunya-state')).curriculum);
 expect(state.tabs[lesson.id]).toBe('code');
 expect(state.readingPositions[lesson.id]).toBe(saved);
 await context.close();
 console.log(JSON.stringify({tab:state.tabs[lesson.id],scrollY:state.readingPositions[lesson.id]}));
}finally{
 await browser.close();
}
