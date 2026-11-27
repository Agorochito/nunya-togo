import {chromium,expect} from '@playwright/test';import fs from 'node:fs/promises';import axe from 'axe-core';import {launchTestBrowser} from '../lib/test/browser.mjs';
/* Accueil guidé : une action principale vers trois portes distinctes, sans les catégories/cours du catalogue répétés sur l’accueil,
   sans erreur axe ni débordement. Compteurs : une leçon de code validée alimente les minutes, le jour d’activité et les badges, une seule fois ;
   à la mise à jour, les leçons déjà validées entrent dans le total sans être datées d’aujourd’hui. */
const base=process.env.NUNYA_TEST_URL||'http://127.0.0.1:4176/',browser=await launchTestBrowser(chromium),results=[],errors=[];
const MAX_HEIGHT={360:3600,768:4500,1024:4900,1440:4000};
const LANDING_ASSETS=['./images/learning-group.jpg','./icons/code-xml.svg','./icons/database.svg','./icons/shield-check.svg','./icons/wrench.svg','./icons/book-open-check.svg','./icons/briefcase-business.svg','./icons/smartphone.svg','./icons/award.svg','./icons/message-circle-question-mark.svg'];
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
 for(const width of [360,768,1024,1440]){
  const ctx=await browser.newContext({viewport:{width,height:900},colorScheme:'light'}),p=await ctx.newPage();p.on('pageerror',e=>errors.push(e.message));
  // Première visite.
  await fresh(p,null);
  const hero=p.locator('.nl-hero');await expect(hero.locator('h1')).toContainText('Apprends le numérique');
  await expect(hero.locator('.nl-lead')).toContainText('sans créer de compte');
  await expect(p.locator('.ref-header')).toBeVisible();await expect(p.locator('[data-ref-nav="accueil"]')).toHaveAttribute('aria-current','page');
  await expect(p.locator('link[href*="reference-redesign.css"]')).toHaveCount(1);
  const redesignOffline=await p.evaluate(async assets=>{const [css,response]=await Promise.all([fetch('./runtime/reference-redesign.css?v='+document.documentElement.dataset.release),fetch('./sw.js')]),sw=await response.text(),files=await Promise.all(assets.map(path=>fetch(path)));return {css:css.ok,precache:sw.includes("'./runtime/reference-redesign.css'"),release:sw.includes("nunya-v"+document.documentElement.dataset.release),assets:files.every(file=>file.ok),assetPrecache:assets.every(path=>sw.includes("'"+path+"'"))}},LANDING_ASSETS);
  expect(redesignOffline).toEqual({css:true,precache:true,release:true,assets:true,assetPrecache:true});
  if(width===768){await expect(p.locator('.ref-primary-nav')).toBeHidden();await expect(p.locator('#menu-btn')).toBeVisible();await expect(p.locator('.bottom-nav')).toBeVisible();await p.locator('#menu-btn').click();await expect(p.locator('#sidebar')).toHaveClass(/open/);await p.locator('#menu-btn').click();await expect(p.locator('#sidebar')).not.toHaveClass(/open/)}
  if(width>=1024)await expect(p.locator('.ref-primary-nav')).toBeVisible();
  await expect(p.locator('.nl-photo-credit')).toHaveCount(0);await expect(p.locator('.nl-learner-art')).toHaveCount(0);
  const photoBackground=await hero.evaluate(el=>getComputedStyle(el,'::before').backgroundImage);
  expect(photoBackground).toContain('learning-group.jpg');
  if(width===360){
   const lightPhotoAlpha=await hero.evaluate(el=>Number(getComputedStyle(el,'::before').backgroundImage.match(/\/ ([\d.]+)\)/)?.[1]));
   expect(lightPhotoAlpha).toBeLessThan(0.94);
   const darkPhotoAlpha=await p.evaluate(()=>{const root=document.documentElement;root.dataset.mode='dark';const alpha=Number(getComputedStyle(document.querySelector('.nl-hero'),'::before').backgroundImage.match(/\/ ([\d.]+)\)/)?.[1]);root.dataset.mode='light';return alpha});
   expect(darkPhotoAlpha).toBeCloseTo(0.94);
  }
  await expect(p.locator('.nl-ref-domain,.nl-ref-course,.nl-ref-facts,.nl-tracks,.nl-close')).toHaveCount(0);
  const landingIcons=await p.locator('.nl-door .nl-mark img,.nl-chip .nl-mark img,.nl-why-icon img').evaluateAll(images=>images.map(img=>({src:img.getAttribute('src'),loaded:img.complete&&img.naturalWidth>0})));
  expect(landingIcons.length).toBeGreaterThan(8);expect(landingIcons.filter(icon=>!icon.loaded)).toEqual([]);
  if(width===360){
   await p.goto(base+'#/progression');
   await expect(p.locator('.momentum-start')).toBeVisible();await expect(p.locator('.momentum-week')).toBeHidden();await expect(p.locator('.momentum-milestones')).toHaveCount(0);await expect(p.locator('.momentum-start a.primary')).toHaveAttribute('href','#/apprendre');
   expect(await audit(p)).toEqual([]);
   await p.goto(base+'#/revision');
   await expect(p.locator('.review-empty')).toBeVisible();await expect(p.locator('.review-summary,.review-empty~.panel')).toHaveCount(0);await expect(p.locator('.review-empty [data-page="explore"]')).toBeVisible();
   expect(await audit(p)).toEqual([]);
   await fresh(p,learner({reviewSchedule:{'python:0':await today(p)},mastery:{'python:0':{level:'familiar',attempts:1,successes:1}}}));await p.goto(base+'#/revision');
   await expect(p.locator('.review-summary strong').first()).toHaveText('1');await expect(p.locator('.review-empty')).toHaveCount(0);
   await fresh(p,null);await p.goto(base+'#/accueil');
  }
  if(width===1440){
   for(const headerWidth of [801,850,900,960,1000,1001,1024,1100,1101,1200,1300,1301,1440]){
    await p.setViewportSize({width:headerWidth,height:900});
    if(headerWidth<=1000){await expect(p.locator('.ref-primary-nav')).toBeHidden();await expect(p.locator('#menu-btn')).toBeVisible();if(headerWidth===900){await p.locator('#menu-btn').click();await expect(p.locator('#sidebar')).toHaveClass(/open/);await p.locator('#menu-btn').click();await expect(p.locator('#sidebar')).not.toHaveClass(/open/)}}
    else{await expect(p.locator('.ref-primary-nav')).toBeVisible();const spacing=await p.evaluate(()=>{const nav=document.querySelector('.ref-primary-nav'),more=document.querySelector('.ref-more>summary').getBoundingClientRect(),search=document.querySelector('#search-btn').getBoundingClientRect();return {width:innerWidth,navOverflow:nav.scrollWidth-nav.clientWidth,gap:search.left-more.right,viewportOverflow:document.documentElement.scrollWidth>innerWidth}});if(spacing.navOverflow>1||spacing.gap<12||spacing.viewportOverflow)throw Error(`en-tête à ${headerWidth}px : ${JSON.stringify(spacing)}`)}
   }
   await p.setViewportSize({width,height:900});
   const more=p.locator('.ref-more'),summary=more.locator('summary');
   await summary.click();await expect(more).toHaveAttribute('open','');await hero.locator('h1').click();await expect(more).not.toHaveAttribute('open');
   await summary.click();await more.locator('.ref-more-menu a[data-ref-nav="progression"]').click();await expect(p).toHaveURL(/#\/progression$/);await expect(more).not.toHaveAttribute('open');await p.goto(base+'#/accueil');
  }
  await expect(hero.locator('.primary')).toHaveCount(1);await expect(hero.locator('form,input')).toHaveCount(0);
  await expect(hero.locator('.primary')).toHaveAttribute('data-home-start','');
  await expect(p.locator('.ref-start')).toHaveCount(0);await expect(p.locator('.ref-primary-nav [data-ref-nav="apprendre"]')).toHaveAttribute('href','#/apprendre');
  const doors=p.locator('.nl-door');await expect(doors).toHaveCount(3);
  await expect(doors.nth(0).locator('h3')).toContainText('Apprendre à coder');
  await expect(doors.nth(0).locator('.nl-btn-solid')).toHaveAttribute('href','#/apprendre');
  await expect(doors.nth(1).locator('h3')).toContainText('Mes cours & examens');
  await expect(doors.nth(1).locator('.nl-btn-solid')).toHaveAttribute('href','#/mes-cours');
  await expect(doors.nth(1).locator('.nl-door-secondary')).toHaveAttribute('href','#/revision');
  await expect(doors.nth(2).locator('h3')).toContainText('Mon avenir');
  await expect(doors.nth(2).locator('.nl-btn-solid')).toHaveAttribute('href','#/avenir');
  await expect(p.locator('.nl-zero a')).toHaveAttribute('href','#/apprendre/decouverte');
  await expect(p.locator('#nl-learn-title,#nl-courses-title,.nl-tiles,.nl-close-links,#nl-more-title')).toHaveCount(0);
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
  const extras=p.locator('.nl-extras');await expect(extras.locator('summary')).toContainText('Parcours métiers et infos utiles');
  await expect(extras).not.toHaveAttribute('open','');
  await extras.locator('summary').click();await expect(p.locator('.nl-why-card').first()).toBeVisible();
  expect(await p.locator('.nl-chip').count()).toBeGreaterThan(0);
  await expect(p.locator('.ambiance-quick')).toBeVisible();
  v=await audit(p);if(v.length)throw Error(`accueil étendu à ${width}px : ${v.join(' ; ')}`);
  await extras.locator('summary').click();await expect(extras).not.toHaveAttribute('open','');
  const beforeStart=p.url();await hero.locator('.primary').click();await expect(p).toHaveURL(beforeStart);await expect(p.locator('#nl-start-title')).toBeInViewport();
  // Les portes mènent vers leurs espaces respectifs.
  await doors.nth(0).locator('.nl-btn-solid').click();await expect(p).toHaveURL(/#\/apprendre$/);
  await p.goto(base+'#/accueil');await doors.nth(1).locator('.nl-btn-solid').click();await expect(p).toHaveURL(/#\/mes-cours$/);
  await p.goto(base+'#/accueil');await doors.nth(1).locator('.nl-door-secondary').click();await expect(p).toHaveURL(/#\/revision$/);
  await p.goto(base+'#/accueil');await doors.nth(2).locator('.nl-btn-solid').click();await expect(p).toHaveURL(/#\/avenir$/);

  const schoolState={academy:{onboarded:true},profile:{name:'Afi',status:'highschool',school:'Première'},lang:'fr',ambiance:'nunya',theme:'light',curriculum:{}};
  await fresh(p,schoolState);await p.goto(base+'#/accueil');
  await expect(hero.locator('h1')).toContainText('Première');await expect(hero.locator('.primary')).toHaveAttribute('href','#/mes-cours');
  await expect(p.locator('.nl-door')).toHaveCount(1);await expect(p.locator('.nl-door h3')).toContainText('Révision du jour');
  await expect(p.locator('.nl-door .nl-btn-solid')).toHaveAttribute('href','#/revision');
  await expect(p.locator('.nl-door-secondary')).toHaveCount(0);
  await expect(p.locator('[data-onboarding="begin"],.nl-zero')).toHaveCount(0);
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  const schoolAudit=await audit(p);if(schoolAudit.length)throw Error(`accueil lycéen à ${width}px : ${schoolAudit.join(' ; ')}`);

  await fresh(p,{...schoolState,curriculum:{lastLesson:'py-m1-03',lastByCourse:{'python-bases':'py-m1-03'}}});await p.goto(base+'#/accueil');
  await expect(hero.locator('.primary')).toHaveAttribute('href',/py-m1-03$/);
  await expect(p.locator('.nl-door')).toHaveCount(1);await expect(p.locator('.nl-door h3')).toContainText('Mes cours & examens');
  await expect(p.locator('.nl-door a')).toHaveCount(1);await expect(p.locator('.nl-door a')).toHaveAttribute('href','#/mes-cours');
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  const returningSchoolAudit=await audit(p);if(returningSchoolAudit.length)throw Error(`accueil lycéen en reprise à ${width}px : ${returningSchoolAudit.join(' ; ')}`);

  await fresh(p,learner({academy:{onboarded:true,activePath:'cybersecurite'}}));await p.goto(base+'#/accueil');
  await expect(p.locator('.nl-band[aria-labelledby="nl-start-title"] .a-resume')).toHaveCount(1);
  await expect(p.locator('.nl-door')).toHaveCount(0);

  // Mise à jour : deux leçons déjà validées, pas encore comptées. Elles entrent dans le total, sans dater aujourd’hui.
  // Dès l’ouverture, sans aucun enregistrement : Ma progression montre déjà les minutes des leçons validées.
  await fresh(p,learner({minutes:0,activity:{}}));await p.goto(base+'#/progression');
  await expect(p.locator('.momentum')).toBeVisible();await expect(p.locator('[data-ref-nav="progression"]')).toHaveAttribute('aria-current','page');await expect(p.locator('.momentum-week-stats strong').nth(2)).toHaveText('2');await expect(p.locator('.momentum-week-stats strong').nth(3)).toHaveText('20');
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
  await expect(hero.locator('h1')).toContainText('Bon retour, Afi.');await expect(hero.locator('.primary')).toContainText('Reprendre');
  await expect(p.locator('.nl-door')).toHaveCount(1);await expect(p.locator('.nl-door h3')).toContainText('Explorer les autres cours');
  await expect(p.locator('.nl-zero')).toHaveCount(0);
  expect(await hero.evaluate(el=>getComputedStyle(el,'::before').backgroundImage)).toBe('none');
  const nextAction=p.locator('.nl-progress');
  await expect(nextAction).toHaveAttribute('data-next-course','python-bases');await expect(nextAction).toHaveAttribute('data-next-lesson','py-m1-03');
  await expect(nextAction.locator('#nl-next-action-title')).toContainText('Commenter un programme');
  await expect(nextAction.locator('.nl-next-action-time')).toHaveText('20 min');
  await expect(nextAction.locator('.nl-next-action-offline')).toContainText('À enregistrer hors ligne');
  await expect(nextAction).not.toContainText('%');
  await expect(p.locator('.nl-week i')).toHaveCount(7);await expect(p.locator('.nl-week i.on')).toHaveCount(1);
  await expect(p.locator('.nl-week-text')).toContainText('1 jour actif');
  await expect(p.locator('#nl-start-title')).toContainText('explorer autre chose');
  await expect(hero.locator('.primary')).toHaveAttribute('href',/py-m1-03$/);
  v=await audit(p);if(v.length)throw Error(`accueil (retour) à ${width}px : ${v.join(' ; ')}`);
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  // Ma progression : les compteurs concordent avec la carte de l’accueil.
  await p.goto(base+'#/progression');
  await expect(p.locator('.momentum-week-stats strong').nth(0)).toHaveText('1');
  await expect(p.locator('.momentum-week-stats span').nth(0)).toHaveText('jour actif');
  await expect(p.locator('.momentum-week-stats strong').nth(2)).toHaveText('2');
  await expect(p.locator('.momentum-week-stats strong').nth(3)).toHaveText('20');
  await expect(p.locator('.momentum-milestones > .momentum-milestones-list > .momentum-milestone.is-earned')).toHaveCount(1);
  const active=p.locator('.momentum-active');
  await expect(active.locator('.momentum-course')).not.toHaveCount(0);
  await expect(active.locator('.momentum-course-link').first()).toContainText('Reprendre');
  await expect(active.locator('.momentum-course-link').first()).toHaveAttribute('href',/py-m1-03$/);
  const notStarted=p.locator('.momentum-not-started');
  await expect(notStarted.locator('summary')).toContainText('Pas encore commencés');
  const progressHeight=await p.evaluate(()=>document.documentElement.scrollHeight);
  if(width===1440&&progressHeight>2500)throw Error(`Ma progression de ${progressHeight} px sur ordinateur (maximum 2500)`);
  expect(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  await notStarted.locator('summary').click();
  await expect(notStarted.locator('li a').first()).toBeVisible();
  await expect(p.locator('.momentum-backup [data-action="export"]')).toBeVisible();
  await expect(p.locator('.momentum-backup [data-curr="export"]')).toBeVisible();
  v=await audit(p);if(v.length)throw Error(`progression à ${width}px : ${v.join(' ; ')}`);
  if(width===1440){
   const revision=await p.evaluate(async()=>{const catalog=await fetch('./data/curriculum/index.json').then(r=>r.json());return catalog.courses.find(course=>course.id==='python-bases').content_revision});
   const curriculum={...learner().curriculum,completed:{...learner().curriculum.completed,'py-m1-03':true},lastLesson:'py-m1-03',lastByCourse:{'python-bases':'py-m1-03'}};
   await fresh(p,learner({curriculum}));await p.goto(base+'#/accueil');
   await expect(p.locator('.nl-progress')).toHaveAttribute('data-next-lesson','py-m1-04');await expect(p.locator('.nl-hero .nl-cta-main')).toHaveAttribute('href',/py-m1-04$/);
   await p.goto(base+'#/progression');await expect(p.locator('.momentum-active .momentum-course-link').first()).toHaveAttribute('href',/py-m1-04$/);
   await fresh(p,learner({curriculum:{...learner().curriculum,savedCourses:{'python-bases':revision}}}));await p.goto(base+'#/accueil');
   await expect(p.locator('.nl-next-action-offline')).toHaveAttribute('data-ready','true');await expect(p.locator('.nl-next-action-offline')).toContainText('Prêt hors ligne');
   await fresh(p,learner({curriculum:{...learner().curriculum,savedCourses:{'python-bases':'000000000000'}}}));await p.goto(base+'#/accueil');
   await expect(p.locator('.nl-next-action-offline')).toHaveAttribute('data-ready','false');await expect(p.locator('.nl-next-action-offline')).toContainText('À actualiser hors ligne');
   const gitRevision=await p.evaluate(async()=>{const git=await fetch('./data/git/index.json').then(r=>r.json());return git.content_revision});
   await fresh(p,learner({curriculum:{...learner().curriculum,lastLesson:null,lastByCourse:{}},git:{last:'git-m1-01',saved:true,savedRevision:gitRevision}}));await p.goto(base+'#/accueil');
   await expect(p.locator('.nl-progress')).toHaveAttribute('data-next-course','git-bases');await expect(p.locator('.nl-next-action-offline')).toContainText('Prêt hors ligne');
   await fresh(p,learner({curriculum:{...learner().curriculum,lastLesson:null,lastByCourse:{}},git:{last:'git-m1-01',saved:true,savedRevision:'000000000000'}}));await p.goto(base+'#/accueil');
   await expect(p.locator('.nl-next-action-offline')).toContainText('À actualiser hors ligne');
   await fresh(p,learner());await p.goto(base+'#/progression');
   await p.evaluate(async()=>{const catalog=await fetch('./data/curriculum/index.json').then(r=>r.json()),s=JSON.parse(localStorage.getItem('nunya-state')||'{}');s.curriculum=s.curriculum||{};s.curriculum.completed=Object.fromEntries(catalog.courses.filter(c=>c.lessons.length>1).map(c=>[c.lessons[0].id,true]));localStorage.setItem('nunya-state',JSON.stringify(s))});
   await p.reload();await expect(p.locator('.momentum-active > .momentum-courses > .momentum-course')).toHaveCount(4);
   await expect(p.locator('.momentum-extra-courses summary').first()).toContainText('autres parcours en cours');
   const manyProgressHeight=await p.evaluate(()=>document.documentElement.scrollHeight);
   if(manyProgressHeight>2500)throw Error(`Ma progression avec plusieurs parcours de ${manyProgressHeight} px (maximum 2500)`);
  }
  if(width===360){
   await fresh(p,learner({localProjects:{'idee-test':{title:'Projet santé',tasks:[true],updatedAt:'2026-01-15'}},notes:{'python:0':'Une idée à retrouver'}}));
   await p.goto(base+'#/progression');
   await expect(p.locator('.momentum-projects')).toContainText('Projet santé');
   await expect(p.locator('.momentum-notes blockquote')).toContainText('Une idée à retrouver');
  }
  // Sauvegarde modifiée à la main : une date d’exercice hors limites ne fait échouer ni l’accueil ni Ma progression (erreurs de page relevées plus bas).
  await fresh(p,learner({ticked:[],curriculum:{...learner().curriculum,work:{'py-m1-01-e1':{code:'',attempts:1,hints:0,passed:true,started:1e300,firstSuccess:5}}}}));
  await p.goto(base+'#/accueil');await expect(hero.locator('h1')).toContainText('Bon retour');await p.goto(base+'#/progression');await expect(p.locator('.momentum')).toBeVisible();
  results.push({width,firstVisitHeight:height,progressHeight,doors:3,heroPrimary:1,secondarySectionsCollapsed:true,schoolShortcuts:true,resumeAlternativeCount:1,duplicateCatalogueSections:0,dailyReviewAccess:true,realPhoto:true,localIcons:landingIcons.length,responsiveHeaderWidths:width===1440?13:0,menuDismissal:width===1440,migrationMinutes:20,todayMinutes:20,progressLessons:2,axeViolations:0});
  await ctx.close();
 }
 if(errors.length)throw Error(errors.join(';'));
 await fs.writeFile('docs/HOME_GUIDED_RESULTS.json',JSON.stringify({results,errors},null,2)+'\n');console.log(JSON.stringify({results,errors}));
}catch(error){console.log('home guided failed: '+error.message);throw error}finally{await browser.close()}
