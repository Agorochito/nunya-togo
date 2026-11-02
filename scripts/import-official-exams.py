"""Index public institutional PDF URLs, without copying or redistributing annales."""
import json,re,hashlib
from urllib.request import urlopen,Request
from urllib.parse import urljoin,urlparse,unquote
from html import unescape
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sources=[('CEPD','https://ecole.gouv.tg/primaire/mod/folder/view.php?id=4'),('BEPC','https://ecole.gouv.tg/college/mod/folder/view.php?id=22&lang=fr'),('BAC I','https://ecole.gouv.tg/lycee/mod/folder/view.php?id=1&lang=fr'),('BAC II','https://ecole.gouv.tg/lycee/mod/folder/view.php?id=2')]
items=[];seen=set()
for exam,source in sources:
 text=urlopen(Request(source,headers={'User-Agent':'Nunya educational resource index'}),timeout=45).read().decode()
 for raw in re.findall(r'href=[\"\']([^\"\']+)',text):
  url=urljoin(source,unescape(raw)); parsed=urlparse(url)
  if parsed.hostname!='ecole.gouv.tg' or '/pluginfile.php/' not in parsed.path or not parsed.path.lower().endswith('.pdf'):continue
  url=parsed._replace(query='forcedownload=0').geturl()
  if url in seen:continue
  seen.add(url);name=unquote(parsed.path);parts=name.split('/');year=next((p for p in parts if re.fullmatch(r'20\d\d',p)),'');real_exam='BAC II' if '/BAC 2/' in name else exam
  if exam=='BAC II' and not re.search(r'tle|tles|terminal',parts[-1],re.I):continue
  items.append({'id':'exam-'+hashlib.sha256(url.encode()).hexdigest()[:16],'exam':real_exam,'year':year,'series':parts[-2] if exam in ['BAC I','BAC II'] else '', 'title':parts[-1][:-4], 'url':url,'source_url':source,'source_type':'official','last_checked':'2026-11-01','rights':'Consultation à la source. Aucune copie locale ni adaptation du sujet.','correction':bool(re.search(r'corrig',parts[-1],re.I)),'document_type':'composition-regionale-terminale' if exam=='BAC II' else 'annale-nationale'})
report={'checked':'2026-11-01','sources':[u for _,u in sources],'documents':len(items),'byExam':{e:sum(x['exam']==e for x in items) for e in ['CEPD','BEPC','BAC I','BAC II']},'notice':'Les dossiers d’annales nationales BAC II sont vides. Les compositions régionales de Terminale, dont certains corrigés, sont référencées distinctement pour préparer le BAC II.'}
for target in [root/'data',root/'dist/data']:
 (target/'official_exam_documents.json').write_text(json.dumps(items,ensure_ascii=False))
(root/'data/official_exam_import_report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False))
