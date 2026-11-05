/* First-visit personalization and assessment for the academy. */
'use strict';

(function () {
  const returnRoute=location.hash.startsWith('#/')&&location.hash!=='#/accueil'?location.hash:'#/apprendre';
  const domains = [
    { id: 'algo', icon: '⌘', fr: 'Programmation & données', en: 'Programming & data' },
    { id: 'web', icon: '⌁', fr: 'Création web', en: 'Web development' },
    { id: 'digital', icon: '◎', fr: 'Culture numérique', en: 'Digital skills' }
  ];

  function shell(content, step) {
    const progress = step
      ? `<p class="a-onboarding-step">${aLabel(step === 'domain' ? 'Étape 1 sur 2' : 'Étape 2 sur 2', step === 'domain' ? 'Step 1 of 2' : 'Step 2 of 2')}</p>`
      : '';
    return `<section class="a-onboarding" aria-labelledby="a-onboarding-title">${progress}${content}</section>`;
  }

  function splash() {
    return `<section class="a-onboarding-splash" role="status" aria-live="polite">
      <span class="a-onboarding-mark" aria-hidden="true">✳</span>
      <strong>nunya<span>.</span></strong>
      <p>${aLabel('On prépare ton espace personnalisé…', 'Getting your learning space ready…')}</p>
    </section>`;
  }

  function welcome() {
    return shell(`<div class="a-onboarding-welcome">
      <span class="a-onboarding-mark" aria-hidden="true">✳</span>
      <p class="eyebrow">NUNYA · ${aLabel('APPRENDRE À TON RYTHME', 'LEARN AT YOUR PACE')}</p>
      <h1 id="a-onboarding-title">${aLabel('Un parcours qui commence par toi.', 'A learning path that starts with you.')}</h1>
      <p>${aLabel('Quelques préférences suffisent pour te conseiller un point de départ. Tu peux aussi choisir librement, sans questionnaire.', 'Choose what interests you, tell us where you are, then answer a few questions. Nunya will suggest a starting point that fits.')}</p>
      <button class="primary" type="button" data-onboarding="begin">${aLabel('Personnaliser mon parcours', 'Personalize my path')} →</button><button class="secondary" type="button" data-onboarding="skip">Passer et choisir moi-même</button><button class="text-button" type="button" data-onboarding="restore">J’ai déjà une sauvegarde</button>
      <small>${aLabel('Tes réponses sont facultatives ; tu peux personnaliser plus tard. Ton pseudo et tes réponses restent sur cet appareil.', 'Your nickname and answers stay on this device.')}</small>
    </div>`);
  }

  function chooseDomain() {
    const selected = state.onboarding?.domain;
    return shell(`<h1 id="a-onboarding-title">${aLabel('Qu’est-ce qui t’intéresse ?', 'What interests you?')}</h1>
      <p class="a-onboarding-note">${aLabel('Choisis le domaine que tu veux explorer en premier. Tu pourras changer de parcours plus tard.', 'Choose the field you want to explore first. You can change paths later.')}</p>
      <div class="a-onboarding-domains">${domains.map(domain => `<button type="button" class="a-onboarding-domain ${selected === domain.id ? 'selected' : ''}" data-onboarding="domain" data-value="${domain.id}" aria-pressed="${selected === domain.id}">
        <span aria-hidden="true">${domain.icon}</span><strong>${aLabel(domain.fr, domain.en)}</strong><small>${aLabel('Parcours disponible', 'Pathway available')}</small>
      </button>`).join('')}</div>
      <div class="a-onboarding-soon"><span>${aLabel('Autres domaines en préparation', 'More fields are in preparation')}</span><span>${aLabel('Santé · Agriculture · Énergie · Commerce', 'Health · Agriculture · Energy · Business')}</span></div>
      <button class="primary" type="button" data-onboarding="profile" ${selected ? '' : 'disabled'}>${aLabel('Continuer', 'Continue')} →</button>
      <button class="a-onboarding-back" type="button" data-onboarding="welcome">← ${aLabel('Retour', 'Back')}</button>`, 'domain');
  }

  function profileForm() {
    const profile = state.profile;
    return shell(`<h1 id="a-onboarding-title">${aLabel('Quelques repères pour mieux t’accompagner.', 'A few details to make your path fit you.')}</h1>
      <p class="a-onboarding-note">${aLabel('Un pseudo suffit. Nous ne demandons ni date de naissance exacte ni compte.', 'A nickname is enough. We do not ask for your exact birth date or an account.')}</p>
      <form id="a-personalization-form" class="a-onboarding-form">
        <label>${aLabel('Ton prénom ou ton pseudo', 'Your first name or nickname')}
          <input name="name" maxlength="30" autocomplete="nickname" value="${esc(profile.name || '')}" placeholder="${aLabel('Facultatif', 'Optional')}">
        </label>
        <div class="a-onboarding-fields">
          <label>${aLabel('Ta tranche d’âge', 'Your age range')}
            <select name="age" required>
              <option value="">${aLabel('Choisir', 'Choose')}</option>
              <option value="13-14" ${profile.age==='13-14'?'selected':''}>13–14 ${aLabel('ans', 'years')}</option>
              <option value="15-16" ${profile.age==='15-16'?'selected':''}>15–16 ${aLabel('ans', 'years')}</option>
              <option value="17-18" ${profile.age==='17-18'?'selected':''}>17–18 ${aLabel('ans', 'years')}</option>
              <option value="19+" ${profile.age==='19+'?'selected':''}>${aLabel('19 ans ou plus', '19 or older')}</option>
              <option value="under-13" ${profile.age==='under-13'?'selected':''}>${aLabel('Moins de 13 ans', 'Under 13')}</option>
            </select>
          </label>
          <label>${aLabel('Tu es…', 'You are…')}
            <select name="status" id="a-onboarding-status">
              <option value="">${aLabel('Choisir', 'Choose')}</option>
              <option value="highschool">${aLabel('Élève au lycée', 'High-school student')}</option>
              <option value="university">${aLabel('Étudiant·e', 'University student')}</option>
              <option value="other">${aLabel('Autre situation', 'Something else')}</option>
            </select>
          </label>
        </div>
        <p id="a-onboarding-age-message" class="a-onboarding-privacy" role="status" hidden></p>
        <label>${aLabel('Ta classe', 'Your school year')}
          <select name="grade" id="a-onboarding-grade" disabled>
            <option value="Seconde">Seconde</option>
            <option value="Première">Première</option>
            <option value="Terminale">Terminale</option>
          </select>
        </label>
        <label>${aLabel('Ton niveau actuel dans ce domaine', 'Your current experience in this field')}
          <select name="level" required>
            <option value="beginner" ${profile.level==='beginner'?'selected':''}>${aLabel('Je découvre', 'I’m new to this')}</option>
            <option value="intermediate" ${profile.level==='intermediate'?'selected':''}>${aLabel('J’ai déjà essayé', 'I’ve tried it before')}</option>
            <option value="advanced" ${profile.level==='advanced'?'selected':''}>${aLabel('Je connais déjà les bases', 'I already know the basics')}</option>
          </select>
        </label>
        <label>Temps disponible par jour<select name="goal">${[10,15,30].map(n=>`<option value="${n}" ${profile.goal===n?'selected':''}>${n} minutes</option>`).join('')}</select></label>
        <p class="a-onboarding-privacy">${aLabel('Ces préférences conseillent un ordre de cours. Elles restent dans ce navigateur.', 'Your answers help tailor the questions and learning path. They stay in this browser.')}</p>
        <button class="primary" type="submit">${aLabel('Trouver mon point de départ', 'Find my starting point')} →</button>
      </form>
      <button class="a-onboarding-back" type="button" data-onboarding="domain">← ${aLabel('Retour', 'Back')}</button>`, 'profile');
  }

  function resumeAssessment() {
    return shell(`<div class="a-onboarding-welcome">
      <span class="a-onboarding-mark" aria-hidden="true">✳</span>
      <h1 id="a-onboarding-title">${aLabel('On reprend où tu en étais ?', 'Pick up where you left off?')}</h1>
      <p>${aLabel('Ton profil est enregistré. Le petit test, sans note ni chrono, va évaluer tes connaissances et ton raisonnement.', 'Your profile is saved. The short, untimed test will check your knowledge and reasoning, not give you a grade.')}</p>
      <button class="primary" type="button" data-onboarding="resume">${aLabel('Continuer le test', 'Continue the assessment')} →</button>
    </div>`);
  }

  /* Un repère en mots plutôt qu’un pourcentage : le résultat ne doit pas ressembler à une note. Mêmes seuils que le choix du point de départ (35 et 70). */
  function scoreWords(score) {
    const band = score >= 70
      ? [aLabel('Bases solides', 'Solid foundations'), aLabel('Tu peux avancer plus vite.', 'You can move faster.')]
      : score >= 35
        ? [aLabel('En progrès', 'Making progress'), aLabel('Quelques notions à consolider.', 'A few ideas to strengthen.')]
        : [aLabel('À découvrir', 'To discover'), aLabel('On commence ensemble, pas à pas.', 'We’ll start together, step by step.')];
    return `<strong>${band[0]}</strong><small>${band[1]}</small>`;
  }

  /* Le domaine « Programmation & données » mène au cours « Python : les bases » ; les parcours métiers restent dans Mon avenir. */
  function pythonRecommendation(guidedLevel) {
    return `<h2>${aLabel('Python : les bases', 'Python: the basics')}</h2>
        <p>${aLabel('La partie conseillée', 'Suggested section')} : <strong>${aLabel('Module 1 · Premiers pas', 'Module 1 · First steps')}</strong> · ${aLabel('Comprendre le programme, l’éditeur et la console', 'Understand the program, the editor and the console')}</p>
        <p>${aLabel('Le cours avance leçon par leçon. Si tu connais déjà un module, son mini-test de cinq questions permet de le valider et de passer au suivant.', 'The course moves lesson by lesson. If you already know a module, its five-question check lets you validate it and move on.')}</p>
        <a class="primary" href="#/apprendre/python-bases/m1/py-m1-01">${aLabel('Commencer le cours', 'Start the course')} →</a>
        ${guidedLevel >= 1 ? `<a class="secondary" href="#/apprendre/python-bases/m1/validation">${aLabel('Je connais déjà le module 1', 'I already know module 1')} →</a>` : ''}`;
  }


  function preferenceResults(){const suggestion=state.onboarding.suggestion||{course:'python-bases'},titles={'python-bases':'Python : les bases','html-bases':'HTML : premières pages accessibles',decouverte:'Découverte du numérique'};return shell(`<span class="eyebrow">PROGRAMME CONSEILLÉ · FACULTATIF</span><h1 id="a-onboarding-title">Un point de départ selon tes choix</h1><p>Ton objectif et ton expérience nous orientent vers ${esc(titles[suggestion.course])}. Prévois des séances de ${state.profile.goal||15} minutes, puis adapte ton rythme.</p><a class="primary" href="#/apprendre/${suggestion.course}">Voir ce programme →</a><a class="secondary" href="#/apprendre">Choisir un autre programme</a><p>Tous les chapitres restent consultables. Tes choix ne valident aucune leçon.</p><button class="text-button" data-onboarding="resume">Faire aussi le diagnostic facultatif de 10 questions</button>`)}
  function skipPersonalization(){if($('#a-personalization-form [name=age]')?.value==='under-13'){toast(underThirteenMessage());return}window.NunyaAssessmentUI?.close();state.academy.onboarded=true;state.onboarding={...state.onboarding,step:'complete',skipped:true};aPersist();aGo(returnRoute)}

  function results() {
    const result = state.onboarding?.result;
    const recommendation = result?.recommendation;
    const path = recommendation && aPath(recommendation.pathId);
    if (!result || !recommendation || !path) {
      console.error('Les résultats de personnalisation sont incomplets.');
      return shell(`<h1 id="a-onboarding-title">${aLabel('Ton parcours n’a pas pu être préparé.', 'Your path could not be prepared.')}</h1>
        <p class="a-onboarding-note">${aLabel('Tes réponses restent enregistrées. Réessaie de charger l’accueil.', 'Your answers are saved. Try reloading the home page.')}</p>
        <button class="primary" type="button" data-onboarding="retry-results">${aLabel('Réessayer', 'Try again')}</button>`);
    }

    const stage = path.stages.find(item => item.id === recommendation.stageId);
    const firstStep = stage?.steps[0];
    const startRoute = `#/parcours/${path.id}`;
    const levels = [
      aLabel('À ton rythme : consolider les premières notions', 'At your pace: build the foundations'),
      aLabel('Tu peux commencer par les bases et pratiquer', 'You can start with the foundations and practise'),
      aLabel('Tu peux approfondir et relever des défis', 'You can go further and take on challenges')
    ];
    const domain = domains.find(item => item.id === result.domain);
    const comprehension = result.categoryScores[result.domain] || 0;
    const deduction = result.categoryScores.deduction || 0;
    const guidedLevel = recommendation.stageIndex;
    const codingCourse = result.domain === 'algo';
    const levelMessage = levels[guidedLevel] || aLabel('Un point de départ à explorer', 'A starting point to explore');
    const startingNote = comprehension <= deduction
      ? aLabel(
        'On commence par consolider tes connaissances dans ce domaine.',
        'We’ll start by strengthening your knowledge in this field.'
      )
      : aLabel(
        'On commence par exercer ton raisonnement étape par étape.',
        'We’ll start by practising your step-by-step reasoning.'
      );
    const competencyNote = comprehension === deduction
      ? aLabel(
        'Les deux résultats étant proches, on reprend les notions ensemble.',
        'Since both results are similar, we’ll build both skills together.'
      )
      : startingNote;

    return shell(`<p class="eyebrow">${aLabel('TON POINT DE DÉPART', 'YOUR STARTING POINT')}</p>
      <h1 id="a-onboarding-title">${aLabel('Un parcours à ta mesure', 'A path that fits you')}${state.profile.name ? `, ${esc(state.profile.name)}` : ''}</h1>
      <p class="a-onboarding-note">${aLabel('Tes réponses nous aident à choisir quoi revoir et où commencer. Ce repère n’est pas une note.', 'Your answers help us choose what to revisit and where to begin. This is a guide, not a grade.')}</p>
      <div class="a-onboarding-results">
        <article><span>${aLabel('Compréhension', 'Understanding')} · ${domain ? aLabel(domain.fr, domain.en) : ''}</span>${scoreWords(comprehension)}</article>
        <article><span>${aLabel('Raisonnement & déduction', 'Reasoning & deduction')}</span>${scoreWords(deduction)}</article>
      </div>
      <section class="a-onboarding-recommendation">
        <span class="eyebrow">${aLabel('POINT DE DÉPART CONSEILLÉ', 'SUGGESTED STARTING POINT')}</span>
        <p>${levelMessage}</p>
        <p>${competencyNote}</p>
        ${codingCourse ? pythonRecommendation(guidedLevel) : `<h2>${esc(path.title_fr)}</h2>
        ${stage ? `<p>${aLabel('La partie conseillée', 'Suggested section')}: <strong>${esc(stage.title_fr)}</strong>${firstStep ? ` · ${esc(firstStep.title_fr)}` : ''}</p>` : ''}
        <p>${aLabel('Le parcours reste progressif. Les points d’étape permettent de vérifier tes acquis avant d’avancer.', 'The pathway stays progressive. Checkpoints let you verify what you know before moving ahead.')}</p>
        <a class="primary" href="${startRoute}">${aLabel('Ouvrir mon parcours', 'Open my pathway')} →</a>`}
      </section>
      <p class="a-onboarding-privacy">${aLabel('Tu peux explorer les autres parcours et modifier ton profil à tout moment.', 'You can explore other paths and update your profile at any time.')}</p>
      <button class="a-onboarding-back" type="button" data-onboarding="finish">${aLabel('Voir tous les parcours', 'Explore all pathways')} →</button>`);
  }

  function entryView() {
    const step = state.onboarding?.step || 'welcome';
    if (step === 'domain') return chooseDomain();
    if (step === 'profile') return profileForm();
    if (step === 'assessment') return resumeAssessment();
    if (step === 'results') return results();
    return welcome();
  }

  /* Le test (configuration, moteur, correspondance et écrans) est chargé au début du test : runtime/assessment.js, précaché. */
  let assessmentReady = null;
  function loadAssessment() {
    window.NunyaAssessmentHost = { state, toast, academyChoiceOrder };
    return assessmentReady || (assessmentReady = import(new URL('./runtime/assessment.js', document.baseURI).href).catch(error => { assessmentReady = null; throw error; }));
  }

  function saveAssessmentResults(assessment) {
    const domain = state.onboarding.domain;
    const recommendation = window.NunyaPlacementMapping.getRecommendedPath(
      assessment.placementLevel,
      assessment.categoryScores,
      domain,
      {
        understanding: assessment.categoryScores[domain] || 0,
        deduction: assessment.categoryScores.deduction || 0
      }
    );
    state.onboarding.result = {
      placementLevel: assessment.placementLevel,
      totalPercent: assessment.totalPercent,
      categoryScores: assessment.categoryScores,
      domain,
      recommendation
    };
    state.profile.comprehension = assessment.categoryScores[domain] || 0;
    state.profile.deduction = assessment.categoryScores.deduction || 0;
    state.profile.placement = assessment.placementLevel;
    if (domain !== 'algo') state.academy.activePath = recommendation.pathId;
    state.academy.onboarded = true;
    state.onboarding.step = 'results';
    aPersist();
    render();
    $('#main').focus({ preventScroll: true });
  }

  async function beginAssessment() {
    state.onboarding.step = 'assessment';
    aPersist();
    render();
    try {
      await loadAssessment();
      const started = await window.NunyaAssessmentUI.start(
        state.profile.level,
        saveAssessmentResults,
        state.onboarding.domain
      );
      if (started === false) render();
    } catch (error) {
      console.error('Le test de personnalisation n’a pas démarré.', error);
      toast(aLabel('Le test n’a pas démarré. Réessaie.', 'The assessment did not start. Please try again.'));
    }
  }

  function underThirteenMessage() {
    return aLabel(
      'Nunya est actuellement conçu pour les jeunes de 13 ans et plus. Un espace adapté aux plus jeunes est en préparation. Tu peux revenir avec un parent ou un enseignant.',
      'Nunya is currently designed for young people aged 13 and older. A space for younger learners is in preparation. You can come back with a parent or teacher.'
    );
  }

  const renderBeforeOnboarding = render;
  render = function () {
    const required = FEATURES.onboarding && !state.academy.onboarded && aRoute.kind==='accueil';
    // Les résultats remplacent seulement l’accueil : sur les autres pages, les cartes « curr-entry » restent visibles.
    const showingResults = FEATURES.onboarding && state.onboarding?.step === 'results' && aRoute.kind === 'accueil';
    document.body.classList.remove('a-onboarding-active');
    document.body.classList.toggle('a-onboarding-results-active', showingResults);
    document.body.classList.toggle('a-onboarding-later',FEATURES.onboarding&&['domain','profile','assessment','suggestion'].includes(state.onboarding?.step)&&aRoute.kind==='accueil');
    if (required && aLoading && aRoute.kind === 'accueil') {
      $('#main').innerHTML = splash();
      return;
    }
    renderBeforeOnboarding();
    if((required||document.body.classList.contains('a-onboarding-later'))&&!$('#main [data-onboarding=skip]'))$('#main').insertAdjacentHTML('beforeend','<button type="button" class="secondary" data-onboarding="skip">Passer et choisir moi-même</button>');
  };

  const homeBeforeOnboarding = aHome;
  aHome = function () {
    if(FEATURES.onboarding&&state.onboarding?.step==='suggestion')return preferenceResults();
    if (FEATURES.onboarding && state.onboarding?.step === 'results') return results();
    if (FEATURES.onboarding && !state.academy.onboarded) return entryView();
    if(FEATURES.onboarding&&['domain','profile','assessment'].includes(state.onboarding?.step))return entryView();
    return homeBeforeOnboarding();
  };

  // Shared links remain intact. Personalization is available from the home page.

  document.addEventListener('change', event => {
    if (event.target.name === 'age') {
      const ageMessage = $('#a-onboarding-age-message');
      /* Le message s’affiche dès le choix « Moins de 13 ans », pas seulement après le bouton. */
      if (ageMessage) {
        ageMessage.textContent = event.target.value === 'under-13' ? underThirteenMessage() : '';
        ageMessage.hidden = event.target.value !== 'under-13';
      }
    }
    if (event.target.id !== 'a-onboarding-status') return;
    const grade = $('#a-onboarding-grade');
    grade.disabled = event.target.value !== 'highschool';
    grade.required = !grade.disabled;
  }, true);

  document.addEventListener('submit', event => {
    if (event.target.id !== 'a-personalization-form') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const form = event.target;
    const values = new FormData(form);
    const domain = state.onboarding?.domain;
    if (!domains.some(item => item.id === domain)) {
      toast(aLabel('Choisis d’abord un domaine.', 'Choose a field first.'));
      state.onboarding.step = 'domain';
      render();
      return;
    }
    if (values.get('age') === 'under-13') {
      const ageMessage = $('#a-onboarding-age-message');
      ageMessage.textContent = underThirteenMessage();
      ageMessage.hidden = false;
      return;
    }
    const status = String(values.get('status'));
    state.profile.name = String(values.get('name') || '').trim().slice(0, 30);
    state.profile.age = String(values.get('age'));
    state.profile.status = status;
    state.profile.school = status === 'highschool'
      ? String(values.get('grade'))
      : status === 'university' ? 'Université' : 'Autre';
    state.profile.level = String(values.get('level'));
    state.profile.domain = domain;
    state.profileSet = true;
    state.preferredTrack = 'future';
    state.profile.goal=[10,15,30].includes(Number(values.get('goal')))?Number(values.get('goal')):15;
    state.onboarding.suggestion={course:domain==='digital'?'decouverte':domain==='web'?'html-bases':'python-bases'};
    state.onboarding.step='suggestion';state.onboarding.skipped=false;state.academy.onboarded=true;aPersist();render();
  }, true);

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-onboarding]');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    const action = button.dataset.onboarding;
    if(action==='skip'){skipPersonalization();return}
    if(action==='restore'){const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.id='onboarding-backup';input.onchange=()=>{if(!input.files[0])return;restoreProgressFile(input.files[0]).then(ok=>{if(ok){state.academy.onboarded=true;state.onboarding={...state.onboarding,step:'complete'};aPersist();aGo(returnRoute)}}).catch(error=>toast(error.message))};input.click();return}
    if(action==='preferences'){state.onboarding={...state.onboarding,step:'domain'};state.academy.onboarded=false;aPersist();aGo('#/accueil');return}
    if (action === 'begin') {
      state.onboarding = { ...state.onboarding, step: 'domain' };
    } else if (action === 'welcome') {
      state.onboarding.step = 'welcome';
    } else if (action === 'domain') {
      state.onboarding.domain = button.dataset.value;
    } else if (action === 'profile') {
      if (!state.onboarding.domain) {
        toast(aLabel('Choisis un domaine pour continuer.', 'Choose a field to continue.'));
        return;
      }
      state.onboarding.step = 'profile';
    } else if (action === 'resume') {
      void beginAssessment();
      return;
    } else if (action === 'finish') {
      state.onboarding.step = 'complete';
    } else if (action === 'retry-results') {
      state.onboarding.step = 'assessment';
    }
    aPersist();
    render();
  }, true);

  if (FEATURES.onboarding && !state.academy.onboarded) render();
})();
