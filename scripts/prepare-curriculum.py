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
 if language not in ['python','javascript','html','css']:raise ValueError('Unsupported offline runtime: '+language)
 course['language']=course['runtime']=language;course.setdefault('level','debutant');course.setdefault('later_modules',[])
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
   codes=re.findall(r'```(?:python|html|css|javascript|js|sql|bash)\n(.*?)\n```',markdown,re.S)
   if len(codes)!=len(row['examples']):raise ValueError(f'{path}: each example requires its code block')
   for example,code in zip(row['examples'],codes):example['code']=code
   if row['id'] in chapter_end:row['chapter_end']=chapter_end[row['id']]
   row['exercises']=json.loads(path.with_suffix('.exercises.json').read_text());rows.append(row)
  rows.sort(key=lambda row:row['order']);actual=[row['id'] for row in rows]
  if declared and declared!=actual:raise ValueError(f"{course['id']}/{module['id']}: manifest and authored lessons differ")
  module['lesson_ids']=actual
  for row in rows:
   lessons.append(row);index.append({k:row[k] for k in ['id','title_fr','module','minutes','prerequisites','tags']})
   write(out/(row['id']+'.json'),row)
   search.append(dict(kind='Leçons',title=row['title_fr'],route=f"#/apprendre/{course['id']}/{module['id']}/{row['id']}",breadcrumb=f"Apprendre › {course['title_fr']} › {module['title_fr']}",terms=' '.join(row['tags'])+' '+row['title_fr']))
 course['lessons']=index;course['estimated_minutes']=sum(row['minutes'] for row in lessons)
 revision={key:course.get(key) for key in ['id','title_fr','modules','status','reviewer','summary_fr','prerequisites','outcomes','availability']};revision['lessons']=lessons
 course['content_revision']=hashlib.sha256(json.dumps(revision,ensure_ascii=False,sort_keys=True).encode()).hexdigest()[:12]
 course['exercise_count']=sum(len(row['exercises']) for row in lessons);course['quiz_count']=sum(len(row['quiz']) for row in lessons)
 write(data/(course['id']+'.json'),course,True);write(out/(course['id']+'.json'),dict(course=course,lessons=lessons));courses.append(course)
 search.append(dict(kind='Cours',title=course['title_fr'],route='#/apprendre/'+course['id'],breadcrumb='Apprendre à coder › '+course['title_fr'],terms=language+' programmation debutant zero '+course['summary_fr']+' '+' '.join(m['title_fr'] for m in course['modules'])))
legacy=[]
for path in sorted((r/'content/fr').glob('*.json')):
 course=json.loads(path.read_text());legacy.append(dict(id=course['id'],title_fr=course['title'],status='aperçu',lesson_count=len(course['lessons']),source_file=str(path.relative_to(r))))
available={course['id'].removesuffix('-bases') for course in courses}
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
write(out/'search.json',search)
print(json.dumps(dict(preparedCourses=len(courses),preparedLessons=sum(len(c['lessons']) for c in courses))))
