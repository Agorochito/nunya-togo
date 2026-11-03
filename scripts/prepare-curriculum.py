# -*- coding: utf-8 -*-
from pathlib import Path
import json,re
r=Path(__file__).resolve().parent.parent
modules=[('m1','Premiers pas'),('m2','Variables et types'),('m3','Conditions'),('m4','Boucles')]
lessons=[];index=[]
out=r/'dist/data/curriculum';out.mkdir(parents=True,exist_ok=True)
chapter_end=json.loads((r/'data/curriculum/chapter-end.json').read_text())
for mid,title in modules:
 ids=[]
 for p in sorted((r/f'content/fr/python-bases/{mid}').glob('*.md')):
  _,fm,md=p.read_text().split('---',2);row=json.loads(fm);row['body_fr']=[x.strip() for x in md.split('## Explication pas à pas\n',1)[1].split('## Exemple guidé',1)[0].strip().split('\n\n') if x.strip()]
  if row['id'] not in chapter_end:raise ValueError(str(p)+': missing end-of-chapter comprehension content')
  ending=chapter_end[row['id']]
  if len(ending.get('options',[]))!=4 or not isinstance(ending.get('answer'),int) or not 0<=ending['answer']<4 or not ending.get('question') or not ending.get('explanation'):raise ValueError(str(p)+': invalid end-of-chapter comprehension content')
  row['chapter_end']=ending
  codes=re.findall(r'```python\n(.*?)\n```',md,re.S)
  if len(codes)!=len(row['examples']):raise ValueError(str(p)+': each code block must be a tested example')
  for ex,code in zip(row['examples'],codes):ex['code']=code
  row['exercises']=json.loads(p.with_suffix('.exercises.json').read_text());lessons.append(row);ids.append(row['id'])
  index.append({k:row[k] for k in ['id','title_fr','module','minutes','prerequisites','tags']})
  (out/(row['id']+'.json')).write_text(json.dumps(row,ensure_ascii=False,separators=(',',':')))
if set(chapter_end)!={lesson['id'] for lesson in lessons}:raise ValueError('end-of-chapter content must match the Python course lesson IDs exactly')
course=dict(id='python-bases',title_fr='Python : les bases',summary_fr='Pars de zéro : écris, exécute et corrige tes premiers programmes, puis utilise variables, conditions et boucles.',depth_fr='Modules 1 à 4 · initiation pratique. Modules 5 à 10 en préparation.',status='brouillon',reviewer=None,level='Aucun code préalable',prerequisites=['Savoir saisir un texte et ouvrir une page web.'],outcomes=['Écrire un programme dans l’éditeur et expliquer sa console.','Lire une saisie, convertir une valeur et faire des calculs.','Choisir une action avec if, elif et else.','Répéter et compter avec for et while.','Construire et tester de petits projets à données fictives.'],modules=[dict(id=mid,title_fr=title,lesson_ids=[x['id'] for x in lessons if x['module']==mid]) for mid,title in modules],later_modules=['Chaînes et listes','Fonctions','Dictionnaires, tuples et ensembles','Erreurs et débogage','Modules Python','Projet final'],lessons=index,estimated_minutes=sum(x['minutes'] for x in lessons),license='Contenu original Nunya · brouillon',runtime='python')
(r/'data/curriculum').mkdir(exist_ok=True);(r/'data/curriculum/python-bases.json').write_text(json.dumps(course,ensure_ascii=False,indent=2)+'\n')
(out/'python-bases.json').write_text(json.dumps({'course':course,'lessons':lessons},ensure_ascii=False,separators=(',',':')))
plans=[dict(id=id,title_fr=title,summary_fr=summary,status='bientôt') for id,title,summary in [('ordinateur','Bien démarrer avec l’ordinateur et Internet','Fichiers, navigateur, recherche et sécurité.'),('logique','Penser comme un programmeur','Algorithmes, décisions et répétitions sans code.'),('python-projets','Python : pratique et projets','Stock, carnet de notes et jeu ; après les bases.'),('html','HTML : structurer une page','Titres, liens, formulaires et accessibilité.'),('css','CSS : mettre en forme une page','Boîtes, Flexbox, Grid et petits écrans.'),('javascript','JavaScript : les bases','Valeurs, fonctions, DOM et événements.'),('web-projet','Projet web : ma page personnelle','Réunir structure, style et interactions.'),('sql','Données avec SQL','Lire et interroger une petite base.'),('git','Git et GitHub : les bases','Versions, sauvegardes et collaboration.'),('nodejs','Node.js : les bases du serveur','JavaScript côté serveur ; après JavaScript.'),('ia-cyber','Introduction à l’IA et à la cybersécurité','Comprendre, vérifier et protéger.')]]
legacy=[]
for p in sorted((r/'content/fr').glob('*.json')):
 c=json.loads(p.read_text());legacy.append(dict(id=c['id'],title_fr=c['title'],status='aperçu',lesson_count=len(c['lessons']),source_file=str(p.relative_to(r))))
cat=dict(version=1,courses=[course],plans=plans,legacy_references=legacy)
(r/'data/curriculum/catalogue.json').write_text(json.dumps(cat,ensure_ascii=False,indent=2)+'\n');(out/'index.json').write_text(json.dumps(cat,ensure_ascii=False,separators=(',',':')))
search=[dict(kind='Cours',title=course['title_fr'],route='#/apprendre/python-bases',breadcrumb='Apprendre à coder › Python',terms='python programmation debutant zero '+course.get('summary_fr','')+' '+' '.join(m['title_fr'] for m in course['modules'])+' '+' '.join(sorted({t for x in index for t in x.get('tags',[])})))]+[dict(kind='Leçons',title=x['title_fr'],route=f"#/apprendre/python-bases/{x['module']}/{x['id']}",breadcrumb='Apprendre › Python › '+dict(modules)[x['module']],terms=' '.join(x['tags'])+' '+x['title_fr']) for x in index]
for p in json.loads((r/'data/academy_paths.json').read_text()):
 search.append(dict(kind='Parcours métiers',title=p['title_fr'],route='#/parcours/'+p['id'],breadcrumb='Mon avenir › '+p['title_fr'],terms=p['summary_fr']))
for c in legacy:
 if c['id'] in ['maths-seconde','physics','terminale-analyse','terminale-mecanique','francais-methodes','biology']:
  subject='maths' if c['id']=='maths-seconde' or c['id']=='terminale-analyse' else 'physique' if c['id'] in ['physics','terminale-mecanique'] else c['id']
  level='seconde' if c['id']=='maths-seconde' else 'terminale' if c['id'].startswith('terminale') else 'reperes'
  search.append(dict(kind='Cours',title=c['title_fr'],route=f"#/mes-cours/{level}/{subject}/{c['id']}",breadcrumb='Mes cours › '+level,terms=c['title_fr']))
(out/'search.json').write_text(json.dumps(search,ensure_ascii=False,separators=(',',':')))
print('Prepared Python lessons:',len(lessons))
