from pathlib import Path
import json,hashlib,collections
root=Path(__file__).resolve().parent.parent
read=lambda p:json.loads((root/p).read_text())
topics=[('ordinateur','Ordinateur & téléphone','monitor',['digital']),('bureautique','Documents & tableurs','grid',['documents-pratique','tableurs-pratique','bureautique']),('internet','Internet & sécurité','wifi',['digital','security']),('emploi','CV, entretien & emploi','briefcase',['cv-candidatures','entretien-professionnel']),('programmation','Programmation & Web','monitor',['python','web','javascript','sql','git']),('maths','Mathématiques & logique','chart',['maths-seconde','maths','algorithms']),('sciences','Sciences & santé','heart',['biology','physics','information-sante']),('gestion','Gestion & entrepreneuriat','chart',['business','plan-activite','finance-numerique']),('creation','Créativité & design','award',['design']),('langues','Langues & communication','globe',['francais-methodes','anglais-bases']),('environnement','Agriculture & environnement','leaf',['agriculture','environnement','aquaculture']),('education','Apprendre & transmettre','book',['enseigner','citoyennete'])]
items=[]
def add(id,title,original,provider,topic,url,guide,language='en',video=None):
 c={'id':id,'title_fr':title,'title_original':original,'provider':provider,'topic':topic,'url':url,'source_url':url,'type':'cours','language':[language],'guide_language':'fr','guide_course_id':guide,'level':'Débutant','cost':'Accès au contenu gratuit ; attestation et services annexes à vérifier.','data_weight':'texte seul pour le guide ; vidéo en ligne facultative','needs_account':False,'license':'Contenu fournisseur : conditions propres ; fiche Nunya originale CC BY-SA 4.0','attribution':provider+' — contenu conservé chez son auteur. Accompagnement original en français : Nunya.','offline_possible':'guide Nunya uniquement','description_fr':title+' : un accompagnement en français avec une progression et des exercices, puis le cours source si tu souhaites approfondir.','verified':True,'verification_scope':'Existence de la page consultée ; pas une autorisation de traduction intégrale ni une équivalence certifiée.','last_checked':'2026-11-01','integration':'companion','translation_complete':False,'resource_ids':[]}
 if provider=='LearnFree':c['terms_url']='https://www.learnfree.org/terms-conditions';c['reuse_note']='Pas d’extraction de catalogue ni de traduction intégrale : accompagnement original, lien choisi et éventuel lecteur officiel.'
 if video:c['video']={'id':video,'language':language,'provider':provider}
 items.append(c)
for id,title,original,topic,url,guide,video in [
 ('lf-computer','Comprendre un ordinateur','Computer Basics','ordinateur','computer-basics','digital','Cu3R5it4cQs'),
 ('lf-excel','Premiers pas avec les tableurs','Excel: Foundations','bureautique','excel-foundations','tableurs-pratique',None),
 ('lf-word','Créer un document lisible','Word: Foundations','bureautique','word-foundations','documents-pratique',None),
 ('lf-resume','Préparer un CV clair','Resume Writing','emploi','resume-writing','cv-candidatures',None),
 ('lf-interview','Se préparer à un entretien','Interviewing Skills','emploi','interviewing-skills','entretien-professionnel',None),
 ('lf-design','Découvrir le design graphique','Beginning Graphic Design','creation','beginning-graphic-design','design',None),
 ('lf-internet','Comprendre Internet','Internet Basics','internet','internet-basics','digital',None),
 ('lf-money','Comprendre un budget','Money Basics','gestion','money-basics','business',None)]:add(id,title,original,'LearnFree',topic,'https://www.learnfree.org/series/'+url,guide,video=video)
add('fcc-computers','Les bases de l’informatique','Computer & Technology Basics','freeCodeCamp / LearnFree','ordinateur','https://www.freecodecamp.org/news/computer-basics-for-absolute-beginners/','digital',video='i084Z2ImqNI')
for id,title,url in [('ms-python','Écrire son premier programme Python','write-first-python-code'),('ms-data-python','Manipuler des données en Python','work-with-data-python'),('ms-decision-python','Utiliser des conditions en Python','add-decision-making-python')]:add(id,title,title,'Microsoft Learn','programmation','https://learn.microsoft.com/fr-fr/training/modules/'+url+'/','python','fr')
# Group the already-imported public French catalogue; no new harvesting.
groups=collections.defaultdict(list)
for r in read('dist/library/index.json'):
 if r['p']=='khan':groups[r['c']].append(r)
for title,rows in groups.items():
 id='khan-'+hashlib.sha256(title.encode()).hexdigest()[:12];subject=rows[0]['s'];topic={'maths':'maths','physics':'sciences','chemistry':'sciences','biology':'sciences','business':'gestion','technology':'programmation'}.get(subject,'sciences')
 c={'id':id,'title_fr':title.strip(),'title_original':title.strip(),'provider':'Khan Academy','topic':topic,'url':rows[0]['url'],'source_url':rows[0]['url'],'type':'collection vidéo','language':['fr'],'guide_language':'fr','guide_course_id':None,'level':'Tous niveaux — à confirmer par notion','cost':'Accès libre','data_weight':'vidéo en ligne facultative','needs_account':False,'license':'CC BY-NC-SA — Khan Academy','attribution':'Khan Academy et ses contributeurs ; lecteur officiel.','offline_possible':'fiches enregistrées uniquement','description_fr':'Une collection de vidéos françaises, organisée en unités. Chaque séance ouvre son espace de lecture et de pratique.','verified':False,'verification_scope':'Métadonnées de l’export français ; relecture pédagogique et disponibilité vidéo à confirmer.','last_checked':'2026-11-01','integration':'embedded','resource_ids':[r['id'] for r in rows],'resource_count':len(rows),'minutes':round(sum(r.get('d',0) for r in rows)/60),'units':list(dict.fromkeys(r['u'] for r in rows if r['u']))}
 d=root/'dist/data/collections';d.mkdir(exist_ok=True);(d/(id+'.json')).write_text(json.dumps({'course':c,'resources':rows},ensure_ascii=False,separators=(',',':')));items.append(c)
# Existing lawful, partial French OpenLearn adaptations remain distinguishable from full source courses.
for id,topic in [('ou-electronique-fr','sciences'),('ou-projet-fr','gestion')]:
 c=read('content/fr/'+id+'.json');source=c.get('sources',[]);url=c.get('source_url') or next((x.get('url') for x in source if isinstance(x,dict) and x.get('url')),'https://www.open.edu/openlearn/')
 add(id,c['title'],c['title'],'OpenLearn',topic,url,id,'en');items[-1]['description_fr']='Adaptation française partielle déjà disponible dans Nunya, avec attribution et exercices originaux ; le cours source complet est en anglais.'
for c in items:
 if c['provider'] in ['Microsoft Learn','OpenLearn']:c['discovered_via']='https://www.classcentral.com/report/big-tech-free-courses/'
 c['resource_count']=len(c.get('resource_ids',[]))
 if c['integration']=='companion':
  d=root/'dist/data/collections';d.mkdir(exist_ok=True);(d/(c['id']+'.json')).write_text(json.dumps({'course':c,'resources':[]},ensure_ascii=False,separators=(',',':')))
index=[{k:v for k,v in c.items() if k not in ['resource_ids','units','verification_scope','reuse_note']} for c in items]
(root/'dist/data/skill_catalog.json').write_text(json.dumps({'topics':[{'id':id,'title_fr':title,'icon':icon,'course_ids':ids} for id,title,icon,ids in topics],'courses':index,'curation':'Titres et liens choisis manuellement ; collections Khan issues de l’import public existant.'},ensure_ascii=False,separators=(',',':')))
(root/'data/curated_courses.json').write_text(json.dumps(items,ensure_ascii=False,indent=2));print('Collections/courses:',len(items),'Khan collections:',len(groups))
