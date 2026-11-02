"""Direct resource payloads and compact catalog: no video downloads."""
import json,csv,collections,re,html
from pathlib import Path
root=Path(__file__).resolve().parents[1];out=root/'dist/library'
index=json.loads((out/'index.json').read_text());rows=list(csv.DictReader(open('/private/tmp/nunya-khan-fr.tsv'),delimiter='\t'))
by_video={}
for row in rows:
 vid=row.get('translated_youtube_id')
 if vid and vid not in by_video and row.get('fully_translated')=='True' and row.get('dubbed')=='True':by_video[vid]=row
(out/'resources').mkdir(exist_ok=True)
groups=collections.defaultdict(list)
for r in index:groups[(r['p'],r['c'],r['u'])].append(r)
related={}
for items in groups.values():
 for i,r in enumerate(items):related[r['id']]=[{'id':x['id'],'title':x['title'],'f':x['f']} for x in items[max(0,i-1):i]+items[i+1:i+3]]
for r in index:
 if r['f']=='article':
  (out/'resources'/f"{r['id']}.json").write_text(json.dumps({'resource':r,'related':related[r['id']],'attribution':'MDN Web Docs et ses contributeurs','license':'CC BY-SA 2.5','sourceUrl':r['url']},ensure_ascii=False,separators=(',',':')))
  file=out/'articles'/f"{r['id']}.json";data=json.loads(file.read_text());data['resource']=r;data['related']=related[r['id']];file.write_text(json.dumps(data,ensure_ascii=False,separators=(',',':')))
 else:
  row=by_video.get(r['v'],{});desc=row.get('translated_description_html','')
  (out/'resources'/f"{r['id']}.json").write_text(json.dumps({'resource':r,'descriptionHtml':desc,'related':related[r['id']],'attribution':'Khan Academy et ses contributeurs','license':'CC BY-NC-SA','sourceUrl':r['url']},ensure_ascii=False,separators=(',',':')))
cols=[];units=[];topics=[]
for key,dest in [('c',cols),('u',units),('t',topics)]:
 for r in index:
  if r[key] not in dest:dest.append(r[key])
compact={'version':1,'collections':cols,'units':units,'topics':topics,'rows':[[r['id'],r['title'],r['s'],cols.index(r['c']),units.index(r['u']),topics.index(r['t']),r['l'],r.get('d',0)] for r in index]}
(out/'catalog-v2.json').write_text(json.dumps(compact,ensure_ascii=False,separators=(',',':')))
report={'resources':len(index),'directVideos':sum(r['f']=='video' for r in index),'directArticles':sum(r['f']=='article' for r in index),'oldCatalogBytes':(out/'index.json').stat().st_size,'compactCatalogBytes':(out/'catalog-v2.json').stat().st_size,'descriptionSource':'Public French Khan Academy export; no transcript claimed'}
(root/'data/study_resource_report.json').write_text(json.dumps(report,indent=2));print(report)
