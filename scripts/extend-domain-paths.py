from pathlib import Path
import json
root=Path(__file__).resolve().parent.parent
read=lambda p:json.loads((root/p).read_text())
paths=[p for p in read('data/academy_paths.json') if p['id'] in ['cybersecurite','developpement-web','donnees-ia']]
careers=read('data/careers_togo.json');projects=read('data/togo_projects.json')
config=[('health','sante-sciences','Sciences et métiers de la santé','Health sciences','biology','information-sante'),('agri','agriculture-projets','Agriculture et agro-business','Agriculture and agribusiness','agriculture','agro-projet'),('energy','energie-mesures','Énergie et mesures','Energy and measurement','physics','gestion-projet'),('logistics','logistique-organisation','Logistique et organisation','Logistics and organization','logistics','bureautique'),('business','commerce-projet','Commerce et comptabilité de projet','Commerce and project accounting','business','plan-activite'),('creative','creation-design','Création et design','Creation and design','design','gestion-projet'),('services','accueil-services','Accueil et services','Hospitality and services','hospitality','bureautique'),('telecom','reseaux-telecoms','Réseaux et télécommunications','Networks and telecommunications','telecom-bases','digital'),('fintech','finance-paiements','Banque et paiements numériques','Banking and digital payments','finance-numerique','security'),('education','education-transmission','Éducation et transmission','Education and teaching','enseigner','francais-methodes'),('environment','environnement-observation','Environnement et observation','Environment and observation','environnement','data'),('construction','batiment-organisation','Bâtiment et organisation','Construction and organization','construction','gestion-projet')]
for domain,pid,title,en,c1,c2 in config:
 cs=[read('content/fr/'+c+'.json') for c in [c1,c2]]
 career=next(c for c in careers if c['domain_id']==domain)
 project=next((p for p in projects if p.get('sector')==domain or p.get('sector_id')==domain),None)
 introbody=[career['summary_fr'],career['daily_life_fr'],'Cette initiation aide à découvrir des notions et à préparer un petit projet. Elle ne donne pas une qualification professionnelle. Les formations et les conditions d’accès se vérifient auprès de chaque organisme.']
 if domain=='health':introbody.append('Ce parcours propose une orientation scientifique et la lecture d’informations. Il ne fournit pas de diagnostic, de traitement ni de geste clinique à réaliser.')
 def q(identifier,prompt,options,ans,ex):return {'id':identifier,'type':'mcq','prompt':prompt,'options':options,'answer':ans,'explanation':ex,'hints':['Relis les données de la question.','Distingue une découverte et une qualification.','Compare ton choix à la correction après ton essai.']}
 introq=q(pid+'-dec-q','Que permet cette initiation ?',['Découvrir des notions et préparer un petit projet.','Exercer immédiatement un métier réglementé.','Obtenir une admission garantie.'],0,'Une initiation ne remplace ni une formation reconnue ni les autorisations éventuellement nécessaires.')
 def step(id,title,body,practice,minutes=10,typ='leçon',example=None):return {'id':id,'type':typ,'title_fr':title,'minutes':minutes,'source':'nunya','license':'CC BY-SA 4.0','data_weight':'texte seul','offline':True,'required':True,'unlock_rule':'previous','body':body,'practice':practice,'walkthrough':[{'title':'Comprendre','text':body[0]},{'title':'Relier à une situation','text':body[-1]}],'hints':['Repère la question.','Reviens à l’exemple.','Lis la correction après avoir essayé.'],'status':'brouillon','reviewer':None,'author':'Nunya','last_checked':'2026-11-01',**({'example':example} if example else {})}
 intro=step(pid+'-decouvrir','Découvrir '+title.lower(),introbody,[introq],20)
 stages=[{'id':pid+'-dec','title_fr':'Découvrir le domaine','goal_fr':career['summary_fr'],'estimated_hours':round(20/60,3),'steps':[intro],'checkpoint_id':None}]
 for ci,c in enumerate(cs):
  lessons=[];qs=[]
  for i,l in enumerate(c['lessons']):
   question=q(f'{pid}-c{ci}-q{i}',l['question'],l['options'],l['answer'],l['explanation']);qs.append(question)
   lessons.append(step(f'{pid}-c{ci}-{i}',l['title'],[l['body']],[question],10,example={'input':l.get('code',''),'output':l.get('output',''),'explanation':l['explanation']}))
  extra=q(pid+f'-c{ci}-critique','Une démarche expliquée dans une initiation doit être appliquée à une situation réelle…',['Sans vérifier le contexte.','En vérifiant les hypothèses, les limites et l’encadrement nécessaire.','En promettant un résultat identique pour tout le monde.'],1,'Une méthode dépend de ses hypothèses et du contexte. Une situation réelle peut demander une personne qualifiée.')
  cpqs=[]
  for qi,source in enumerate([*qs,extra]):cpqs.append({**source,'id':pid+f'-c{ci}-checkpoint-q{qi}'})
  cp=step(pid+f'-c{ci}-checkpoint','Faire le point : '+c['title'],['Reprends les notions de cette unité. Les questions vérifient les règles expliquées ; elles ne certifient pas une compétence professionnelle.'],cpqs,10,'checkpoint')
  stages.append({'id':pid+f'-stage{ci+1}','title_fr':c['title'],'goal_fr':c.get('desc',c['title']),'estimated_hours':round(sum(x['minutes'] for x in lessons+[cp])/60,3),'steps':lessons+[cp],'checkpoint_id':cp['id']})
 total=sum(s['minutes'] for t in stages for s in t['steps'])/60
 p={'id':pid,'career_id':career['id'],'domain_id':domain,'title_fr':title,'title_en':en,'summary_fr':'Des bases pour découvrir le domaine, pratiquer et décider de la suite.','level_start':'debutant','prerequisites':['Lire une explication courte en français.','Aucune expérience professionnelle nécessaire.'],'total_hours':round(total,3),'weekly_hours_suggested':2,'outcomes_fr':[l['title'] for c in cs for l in c['lessons']][:4],'stages':stages,'status':'brouillon','reviewer':None,'final_project_id':None,'checkpoint_ids':[s['checkpoint_id'] for s in stages if s['checkpoint_id']],'offline_bundle_size_kb':0,'coverage':'discovery','source_course_ids':[c1,c2],'depth_fr':'Initiation au domaine fondée sur des leçons originales existantes ; pas une formation complète au métier.'}
 paths.append(p)
(root/'data/academy_paths.json').write_text(json.dumps(paths,ensure_ascii=False,indent=2)+'\n');(root/'dist/data/academy_paths.json').write_text(json.dumps(paths,ensure_ascii=False,separators=(',',':')))
print('Paths:',len(paths),'domains:',len(set(p.get('domain_id','tech') for p in paths)))
