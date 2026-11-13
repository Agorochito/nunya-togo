import {chromium,expect} from '@playwright/test';import fs from 'node:fs/promises';import axe from 'axe-core';import {launchTestBrowser} from '../lib/test/browser.mjs';
/* Accueil guidé (5.29.0) : une action principale, l’attestation annoncée dès le héros, trois portes « Par où commencer ? », une page plus courte,
   sans erreur axe ni débordement. Compteurs : une leçon de code validée alimente les minutes, le jour d’activité et les badges, une seule fois ;
   à la mise à jour, les leçons déjà validées entrent dans le total sans être datées d’aujourd’hui. */
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),results=[],errors=[];
// Hauteurs mesurées avant (5.28.2) : 8 868 px à 1440 px de large, 12 102 px à 375 px. Objectif du plan : environ 40 % de moins.
const MAX_HEIGHT={360:7500,1024:6500,1440:5200};
const saved=p=>p.evaluate(()=>JSON.parse(localStorage.getItem('nunya-state')||'{}'));
const today=p=>p.evaluate(()=>{const d=new Date();return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10)});
const audit=async p=>{await p.evaluate(axe.source);return p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}).then(r=>r.violations.map(v=>v.id+': '+v.nodes.slice(0,3).map(n=>n.target.join(' ')).join(' | '))))};
const fresh=async(p,state)=>{await p.goto(base+'#/');await p.evaluate(s=>{localStorage.clear();if(s)localStorage.setItem('nunya-state',JSON.stringify(s))},state);await p.reload()};
// Un enregistrement de l’état (persist) : choisir une ambiance dans le profil en déclenche un, comme n’importe quelle action de l’apprenant.
const persistOnce=async p=>{await p.goto(base+'#/profil');await p.locator('#apparence .ambiance-card[data-ambiance="nunya"]').click();await expect(p.locator('html')).toHaveAttribute('data-ambiance','nunya')};
const learner=extra=>({academy:{onboarded:true},onboarding:{done:true,step:'complete',skipped:true},profile:{name:'Afi',goal:15},lang:'fr',ambiance:'nunya',theme:'light',
  curriculum:{completed:{'py-m1-01':true,'py-m1-02':true},lastLesson:'py-m1-03',lastByCourse:{'python-bases':'py-m1-03'}},...extra});
try{
 // 1024 px : les trois portes passent sur une colonne sous 1100 px, sans couper les titres au milieu des mots.
 for(const width of [360,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900}}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  // Première visite.
  await fresh(p,null);
  const hero=p.locator('.nl-hero');await expect(hero.locator('h1')).toContainText('Apprends à coder');
  await expect(hero.locator('.nl-lead')).toContainText('attestation');await expect(hero.locator('.nl-lead')).toContainText('pas un diplôme');
  await expect(hero.locator('.primary')).toHaveCount(1);await expect(hero.locator('form,input')).toHaveCount(0);
  await expect(hero.locator('.primary')).toHaveAttribute('href',/py-m1-01$/);
  const doors=p.locator('.nl-door');await expect(doors).toHaveCount(3);
  await expect(doors.nth(0).locator('.nl-btn-solid')).toHaveAttribute('href',/py-m1-01$/);
  await expect(doors.nth(1).locator('.nl-btn-solid')).toHaveAttribute('href',/html-m1-01$/);
  await expect(doors.nth(2).locator('.nl-btn-solid')).toHaveAttribute('href','#/apprendre');
  await expect(p.locator('.nl-zero a')).toHaveAttribute('href','#/apprendre/decouverte');
  await expect(p.locator('#nl-learn-title,#nl-courses-title,.nl-tiles,.nl-close-links')).toHaveCount(0);
  await expect(p.locator('[data-onboarding="skip"]')).toHaveCount(1);await expect(p.locator('[data-onboarding="restore"]')).toHaveCount(1);
  await expect(p.locator('[data-onboarding="begin"]')).toHaveCount(1);await expect(p.locator('.ambiance-quick button')).toHaveCount(7);
  await expect(p.locator('.nl-cert-tag')).toContainText('pas un diplôme');
  expect(await p.locator('.nl-door h3').evaluateAll(hs=>hs.filter(h=>h.scrollWidth>h.clientWidth+1).length)).toBe(0);
  await p.waitForTimeout(300);
  const height=await p.evaluate(()=>document.documentElement.scrollHeight);
  if(height>MAX_HEIGHT[width])throw Error(`accueil de ${height} px à ${width} px (maximum ${MAX_HEIGHT[width]})`);
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  let v=await audit(p);if(v.length)throw Error(`accueil (première visite) à ${width}px : ${v.join(' ; ')}`);
  await p.screenshot({path:`docs/screenshots/accueil-guide-${width}.png`});
  // Les portes mènent bien à la première leçon.
  await doors.nth(1).locator('.nl-btn-solid').click();await expect(p).toHaveURL(/html-m1-01$/);

  // Mise à jour : deux leçons déjà validées, pas encore comptées. Elles entrent dans le total, sans dater aujourd’hui.
  // Dès l’ouverture, sans aucun enregistrement : Ma progression montre déjà les minutes des leçons validées.
  await fresh(p,learner({minutes:0,activity:{}}));await p.goto(base+'#/progression');
  await expect(p.locator('.stats-grid .stat').nth(2).locator('strong')).toContainText('20');await expect(p.locator('.stats-grid .stat').nth(1).locator('strong')).toHaveText('0jour');
  await persistOnce(p);
  let s=await saved(p),day=await today(p);
  expect(s.minutes).toBe(20);expect(s.activity[day]||0).toBe(0);expect([...s.ticked].sort()).toEqual(['c:py-m1-01','c:py-m1-02']);
  await persistOnce(p);expect((await saved(p)).minutes).toBe(20);

  // Deux leçons validées aujourd’hui (état déjà suivi) : 20 minutes, un jour actif, une seule fois même après plusieurs enregistrements.
  await fresh(p,learner({minutes:0,activity:{},ticked:[]}));await persistOnce(p);await persistOnce(p);
  s=await saved(p);day=await today(p);
  expect(s.minutes).toBe(20);expect(s.activity[day]).toBe(20);
  // Accueil de l’apprenant qui revient : reprise, rythme de la semaine, porte « Explorer ».
  await p.goto(base+'#/accueil');
  await expect(hero.locator('h1')).toContainText('Bon retour, Afi.');await expect(hero.locator('.primary')).toContainText('Reprendre la leçon 3');
  await expect(p.locator('.nl-week i')).toHaveCount(7);await expect(p.locator('.nl-week i.on')).toHaveCount(1);
  await expect(p.locator('.nl-week-text')).toContainText('1 jour actif');
  await expect(p.locator('#nl-start-title')).toContainText('autre chose');
  await expect(doors.nth(0).locator('.nl-btn-solid')).toContainText('Continuer');await expect(doors.nth(0).locator('.nl-btn-solid')).toHaveAttribute('href',/py-m1-03$/);
  v=await audit(p);if(v.length)throw Error(`accueil (retour) à ${width}px : ${v.join(' ; ')}`);
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  // Ma progression : les compteurs concordent avec la carte de l’accueil.
  await p.goto(base+'#/progression');
  await expect(p.locator('.stats-grid .stat').first().locator('strong')).toHaveText('2');
  await expect(p.locator('.stats-grid .stat').nth(1).locator('strong')).toHaveText('1jour');
  await expect(p.locator('.stats-grid .stat').nth(1)).toContainText('actif ces 7 derniers jours');
  await expect(p.locator('.stats-grid .stat').nth(2).locator('strong')).toContainText('20');
  await expect(p.locator('.achievement.earned')).toHaveCount(1);
  const panel=p.locator('section.panel',{has:p.locator('h2',{hasText:'Mes programmes de code'})});
  await expect(panel.locator(':scope > a.text-button')).toHaveCount(1);await expect(panel.locator(':scope > a.text-button')).toContainText('Reprendre');
  await expect(panel.locator('details summary')).toContainText('Pas encore commencés');
  await expect(panel.locator('details a.text-button').first()).toContainText('Commencer');
  v=await audit(p);if(v.length)throw Error(`progression à ${width}px : ${v.join(' ; ')}`);
  // Sauvegarde modifiée à la main : une date d’exercice hors limites ne fait échouer ni l’accueil ni Ma progression (erreurs de page relevées plus bas).
  await fresh(p,learner({ticked:[],curriculum:{...learner().curriculum,work:{'py-m1-01-e1':{code:'',attempts:1,hints:0,passed:true,started:1e300,firstSuccess:5}}}}));
  await p.goto(base+'#/accueil');await expect(hero.locator('h1')).toContainText('Bon retour');await p.goto(base+'#/progression');await expect(p.locator('.stats-grid')).toBeVisible();
  results.push({width,firstVisitHeight:height,doors:3,heroPrimary:1,migrationMinutes:20,todayMinutes:20,progressLessons:2,axeViolations:0});
  await ctx.close();
 }
 if(errors.length)throw Error(errors.join(';'));
 await fs.writeFile('docs/HOME_GUIDED_RESULTS.json',JSON.stringify({results,errors},null,2)+'\n');console.log(JSON.stringify({results,errors}));
}catch(error){console.log('home guided failed: '+error.message);throw error}finally{await browser.close()}
