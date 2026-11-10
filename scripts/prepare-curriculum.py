# -*- coding: utf-8 -*-
"""Build manifest-backed authored courses; stable identifiers own progress."""
from pathlib import Path
import json, re, hashlib
r=Path(__file__).resolve().parent.parent
out=r/'dist/data/curriculum'; out.mkdir(parents=True,exist_ok=True)
data=r/'data/curriculum'
plans=json.loads((data/'plans.json').read_text())
chapter_end=json.loads((data/'chapter-end.json').read_text())
all_ids,courses,search=set(),[],[]
def write(path,value,pretty=False):
 path.write_text(json.dumps(value,ensure_ascii=False,indent=2 if pretty else None,separators=None if pretty else (',',':'))+'\n')
for manifest in sorted(data.glob('*.manifest.json'),key=lambda p:(p.stem!='python-bases.manifest',p.name)):
 course=json.loads(manifest.read_text())
 if course['id']=='python-bases' and (data/'python-beginner-extension.json').exists():
  extension=json.loads((data/'python-beginner-extension.json').read_text())
  course['modules']=course['modules'][:4]+extension['modules'];course['later_modules']=[]
  course['summary_fr']='De ton premier programme aux collections, fonctions et projets : apprends, teste et construis en français.'
 language=course.get('language',course.get('runtime','python'))
 if language not in ['python','javascript','typescript','html','css','sql','php','cpp','bash','java']:raise ValueError('Unsupported offline runtime: '+language)
 runtime=course.get('runtime',language)
 if runtime not in ['python','javascript','html','css','http','sql','dom','react','php','cpp','bash','java','node','typescript'] or (runtime in ['http','node'] and language!='javascript') or (runtime=='typescript')!=(language=='typescript'):raise ValueError('Unsupported runtime/language pair')
 if runtime in ['dom','react']:
  engine_files=['lib/dom/client.mjs','lib/dom/compile.mjs','lib/dom/frame.mjs','lib/dom/react-libs.mjs','package-lock.json']
  course['engine_revision']=hashlib.sha256(b''.join((r/f).read_bytes() for f in engine_files)).hexdigest()[:12]
 course['language']=language;course['runtime']=runtime;course.setdefault('level','debutant');course.setdefault('later_modules',[])
 lessons,index=[],[]
 for module in course['modules']:
  declared=module.get('lesson_ids',[])
  paths=sorted((r/f"content/fr/{course['id']}/{module['id']}").glob('*.md'))
  if not paths:raise ValueError(f"{course['id']}/{module['id']}: empty module")
  rows=[]
  for path in paths:
   _,frontmatter,markdown=path.read_text().split('---',2);row=json.loads(frontmatter)
   if row['id'] in all_ids or row['course']!=course['id'] or row['module']!=module['id']:raise ValueError(f'{path}: duplicate ID or incorrect ownership')
   all_ids.add(row['id'])
   prose=markdown.split('## Explication pas à pas\n',1)[1].split('## Exemple guidé',1)[0]
   row['body_fr']=[part.strip() for part in prose.strip().split('\n\n') if part.strip()]
   fences={'python':'python','html':'html','css':'css','javascript':'javascript|jsx|js','typescript':'typescript|ts','sql':'sql','php':'php','cpp':'cpp','bash':'bash','java':'java'}[language]
   codes=re.findall(r'```(?:'+fences+r')\n(.*?)\n```',markdown,re.S)
   if len(codes)!=len(row['examples']):raise ValueError(f'{path}: each example requires its code block')
   for example,code in zip(row['examples'],codes):example['code']=code
   if row['id'] in chapter_end:row['chapter_end']=chapter_end[row['id']]
   row['exercises']=json.loads(path.with_suffix('.exercises.json').read_text())
   if runtime=='http':row.setdefault('environment_fr','API pédagogique locale : données fictives, pas de serveur distant ni d’écriture conservée. Les requêtes restent sur cet appareil. await est autorisé dans l’atelier.')
   if runtime=='bash':row.setdefault('environment_fr','Bash 5.2 dans un vrai système Linux en ligne, sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Chaque essai démarre dans un dossier neuf avec ses fichiers de départ. Seuls tes commandes, les saisies et ces fichiers fictifs sont envoyés, sans nom ni compte.')
   if runtime=='typescript':row.setdefault('environment_fr','TypeScript 5.6 compilé en mode strict puis exécuté par Node.js en ligne, sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Une erreur de type empêche l’exécution, comme dans un vrai projet. Seul le code est envoyé, sans nom ni compte.')
   if runtime=='node':row.setdefault('environment_fr','Node.js 20 exécuté en ligne sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seul le code du programme est envoyé, sans nom ni compte. Les serveurs sont testés par l’atelier sur un port local temporaire. Les leçons, exemples et questions restent lisibles hors ligne.')
   if runtime=='java':row.setdefault('environment_fr','Java 21 (OpenJDK) compilé en ligne sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seul le code du programme et les saisies de test sont envoyés, sans nom ni compte. Les leçons, exemples et questions restent lisibles hors ligne.')
   if runtime=='cpp':row.setdefault('environment_fr','C++17 compilé en ligne par GCC 13 sur le service Wandbox (wandbox.org, Japon) : une connexion est nécessaire pour exécuter. Seul le code du programme et les saisies de test sont envoyés, sans nom ni compte. Les leçons, exemples et questions restent lisibles hors ligne.')
   if runtime=='php':row.setdefault('environment_fr','PHP 8.3 réel, exécuté sur cet appareil dans un Worker isolé, comme en ligne de commande. Chaque saisie se lit avec trim(fgets(STDIN)). Pas de serveur web, de réseau, de fichiers conservés ni de base de données dans ce cours.')
   if runtime=='sql':row.setdefault('environment_fr','SQLite local · Données fictives. Chaque exécution repart de la base initiale. Tes scripts et ta progression sont sauvegardés, pas les modifications de cette base temporaire.')
   if runtime in ['dom','react']:row.setdefault('environment_fr','Interface temporaire dans le navigateur : chaque exécution repart du HTML fourni. Ton code est sauvegardé, pas les clics ni les saisies de cet aperçu. '+('React est fourni dans cet atelier ; le service chargerAteliers est une simulation locale, sans requête internet.' if runtime=='react' else 'Les boutons, formulaires et listes fonctionnent dans l’aperçu.'))
   rows.append(row)
  rows.sort(key=lambda row:row['order']);actual=[row['id'] for row in rows]
  if declared and declared!=actual:raise ValueError(f"{course['id']}/{module['id']}: manifest and authored lessons differ")
  module['lesson_ids']=actual
  for row in rows:
   lessons.append(row);index.append({k:row[k] for k in ['id','title_fr','module','minutes','prerequisites','tags']})
   write(out/(row['id']+'.json'),row)
   search.append(dict(kind='Leçons',title=row['title_fr'],route=f"#/apprendre/{course['id']}/{module['id']}/{row['id']}",breadcrumb=f"Apprendre › {course['title_fr']} › {module['title_fr']}",terms=' '.join(row['tags'])+' '+row['title_fr']))
 course['lessons']=index;course['estimated_minutes']=sum(row['minutes'] for row in lessons)
 revision={key:course.get(key) for key in ['id','language','runtime','title_fr','modules','status','reviewer','summary_fr','prerequisites','outcomes','availability','prerequisite_courses','next_courses','engine_revision']};revision['lessons']=lessons
 course['content_revision']=hashlib.sha256(json.dumps(revision,ensure_ascii=False,sort_keys=True).encode()).hexdigest()[:12]
 course['exercise_count']=sum(len(row['exercises']) for row in lessons);course['quiz_count']=sum(len(row['quiz']) for row in lessons)
 write(data/(course['id']+'.json'),course,True);write(out/(course['id']+'.json'),dict(course=course,lessons=lessons));courses.append(course)
 search.append(dict(kind='Cours',title=course['title_fr'],route='#/apprendre/'+course['id'],breadcrumb='Apprendre à coder › '+course['title_fr'],terms=language+' programmation '+{'debutant':'debutant débutant zéro','intermediaire':'intermediaire intermédiaire','avance':'avance avancé'}.get(course['level'],course['level'])+' '+course['summary_fr']+' '+' '.join(m['title_fr'] for m in course['modules'])))
legacy=[]
for path in sorted((r/'content/fr').glob('*.json')):
 course=json.loads(path.read_text());legacy.append(dict(id=course['id'],title_fr=course['title'],status='aperçu',lesson_count=len(course['lessons']),source_file=str(path.relative_to(r))))
available={course['id'].removesuffix('-bases') for course in courses};available.update(p for c in courses for p in c.get('replaces_plans',[]));available.add('git')  # Built separately by prepare-git.py before this catalogue.
# Retain planned courses until actual authored packs replace them.
catalogue=dict(version=2,courses=courses,plans=[p for p in plans if p['id'] not in available],legacy_references=legacy)
write(data/'catalogue.json',catalogue,True);write(out/'index.json',catalogue)
for path in json.loads((r/'data/academy_paths.json').read_text()):
 search.append(dict(kind='Parcours métiers',title=path['title_fr'],route='#/parcours/'+path['id'],breadcrumb='Mon avenir › '+path['title_fr'],terms=path['summary_fr']))
for course in legacy:
 search.append(dict(kind='Cours',title=course['title_fr'],route='#/avenir/formation/'+course['id'],breadcrumb='Cours de découverte › '+course['title_fr'],terms=course['title_fr']))
disc=json.loads((r/'dist/data/decouverte/index.json').read_text())
search.insert(0,dict(kind='Cours',title=disc['title_fr'],route='#/apprendre/decouverte',breadcrumb='Apprendre › Niveau 0',terms='niveau 0 debutant zero numerique ordinateur telephone internet securite logique algorithme '+disc['summary_fr']))
search[1:1]=[dict(kind='Leçons',title=x['title_fr'],route=f"#/apprendre/decouverte/{x['module']}/{x['id']}",breadcrumb='Apprendre › Découverte du numérique',terms=' '.join(x['tags'])+' '+x['title_fr']) for x in disc['lessons']]
git=json.loads((r/'dist/data/git/index.json').read_text())
search.append(dict(kind='Cours',title=git['title_fr'],route='#/apprendre/git-bases',breadcrumb='Apprendre › Outil Git',terms='git github version commits branches index conflit collaboration'))
search.extend(dict(kind='Leçons',title=x['title_fr'],route=f"#/apprendre/git-bases/{x['module']}/{x['id']}",breadcrumb='Apprendre › Git et GitHub',terms='git github '+x['title_fr'])for x in git['lessons'])
write(out/'search.json',search)
print(json.dumps(dict(preparedCourses=len(courses),preparedLessons=sum(len(c['lessons']) for c in courses))))
