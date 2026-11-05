from pathlib import Path
import json,re,hashlib
r=Path(__file__).resolve().parent.parent
modules=[('m1','Fichiers, index et commits'),('m2','Historique, restauration et fichiers ignorés'),('m3','Branches et fusions'),('m4','Conflits, collaboration et projet')]
lessons=[];seen=set();activity_ids=set()
for mid,title in modules:
 for path in sorted((r/'content/fr/git-bases'/mid).glob('*.md')):
  _,front,body=path.read_text().split('---',2);row=json.loads(front);prose=body.split('## Explication pas à pas',1)[1].split('## Exemple guidé',1)[0].strip();row['body_fr']=[p.strip()for p in prose.split('\n\n')if p.strip()]
  words=len(prose.split());assert 300<=words<=700,(row['id'],words)
  assert row['course']=='git-bases' and row['module']==mid and row['order']==len(lessons)+1
  assert all(p in seen for p in row['prerequisites']);seen.add(row['id'])
  assert len(row['examples'])==2 and len(row['quiz'])==3 and row['status']=='brouillon' and row['reviewer']is None
  codes=re.findall(r'```(?:bash|sh|text|git)\n(.*?)\n```',body,re.S)
  for example,code in zip(row['examples'],codes):example['code']=code
  row['activities']=json.loads(path.with_suffix('.activities.json').read_text());assert len(row['activities'])==4 and sum(a['type']=='lab'for a in row['activities'])>=2
  for activity in row['activities']:
   assert activity['id'].startswith(row['id']+'-a')and activity['id']not in activity_ids;activity_ids.add(activity['id']);assert len(activity['hints'])==3 and activity['explanation_fr']
   if activity['type']=='lab':assert activity['fixture'] and 2<=len(activity['goal'])<=4
   else:assert activity['type']=='qcm'and 0<=activity['answer']<len(activity['options'])
  for q in row['quiz']:assert 0<=q['answer']<len(q['options'])and q['explanation']
  lessons.append(row)
assert len(lessons)==12
course=dict(id='git-bases',title_fr='Git et GitHub : versionner et collaborer',level='debutant',status='brouillon',reviewer=None,summary_fr='Comprends les fichiers, l’index et les commits, utilise des branches et résous un conflit dans un vrai dépôt local. Prépare ensuite une collaboration GitHub sans publication simulée.',outcomes=['Distinguer dossier de travail, index et instantané commité.','Créer des commits utiles et relire un historique.','Restaurer un fichier sans confondre les trois états.','Créer des branches et vérifier une fusion réelle.','Résoudre un conflit et expliquer une proposition de changement.'],modules=[dict(id=mid,title_fr=title,lesson_ids=[l['id']for l in lessons if l['module']==mid])for mid,title in modules],lesson_count=len(lessons),activity_count=sum(len(l['activities'])for l in lessons),lab_count=sum(a['type']=='lab'for l in lessons for a in l['activities']),quiz_count=sum(len(l['quiz'])for l in lessons),estimated_minutes=sum(l['minutes']for l in lessons))
course['content_revision']=hashlib.sha256(json.dumps(lessons,sort_keys=True,ensure_ascii=False).encode()).hexdigest()[:12]
out=r/'dist/data/git';out.mkdir(parents=True,exist_ok=True)
(out/'git-bases.json').write_text(json.dumps(dict(course=course,lessons=lessons),ensure_ascii=False,separators=(',',':'))+'\n')
(out/'index.json').write_text(json.dumps(dict(**course,lessons=[{k:l[k]for k in ['id','title_fr','module','minutes','prerequisites']}for l in lessons]),ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps(dict(gitLessons=len(lessons),gitLabs=course['lab_count'],activities=course['activity_count'],words=sum(len(l['body_fr'][i].split())for l in lessons for i in range(len(l['body_fr']))))))
