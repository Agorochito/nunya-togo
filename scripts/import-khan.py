"""Import only public French catalogue metadata; never copies video files or articles."""
import csv,json,re,hashlib,collections,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1];OUT=ROOT/'dist/library';OUT.mkdir(parents=True,exist_ok=True)
rows=list(csv.DictReader(open('/private/tmp/nunya-khan-fr.tsv',encoding='utf-8-sig'),delimiter='\t'))
by_slug={r['slug']:r for r in rows if r['kind'] in ['Course','Unit','Lesson']};by_id={r['id']:r for r in rows}
seen=set();resources=[]
for r in rows:
 if not(r['kind']=='Video' and r['fully_translated']=='True' and r['translated_title'] and r['translated_youtube_id'] and r['dubbed']=='True' and r['listed_anywhere']=='True' and r['domain'] in ['math','science','economics-finance-domain','computing']):continue
 vid=r['translated_youtube_id']
 if vid in seen or not re.fullmatch(r'[\w-]{11}',vid):continue
 if r['license']!='cc-by-nc-sa':continue
 seen.add(vid)
 course=by_slug.get(r['course'],{});unit=by_slug.get(r['unit'],{});ct=course.get('translated_title') or r['course'];ut=unit.get('translated_title') or ''
 text=(r['course']+' '+r['unit']+' '+ct).lower()
 subject='maths' if r['domain']=='math' else 'business' if r['domain']=='economics-finance-domain' else 'tech' if r['domain']=='computing' else 'biology' if any(s in text for s in ['biolog','health','mcat','vie','anatom','life','medicine']) else 'chemistry' if any(s in text for s in ['chemi','chim']) else 'physics'
 resources.append({'id':'ka-'+vid,'title':r['translated_title'].strip(),'subject':subject,'provider':'Khan Academy Francophone','format':'video','language':'fr','youtubeId':vid,'duration':int(float(r['duration'] or 0)),'collection':ct,'unit':ut,'sourceUrl':r['canonical_url'],'license':'CC BY-NC-SA','licenseUrl':'https://creativecommons.org/licenses/by-nc-sa/3.0/','reviewStatus':'source-indexed','alignmentVerified':False,'level':'progressive'})
(OUT/'khan-index.json').write_text(json.dumps(resources,ensure_ascii=False,separators=(',',':')))
report={'provider':'Khan Academy','source':'https://storage.googleapis.com/public-content-export-data/fr-export-recent.tsv','sourceDocumentation':'https://github.com/learningequality/sushi-chef-khan-academy/blob/master/tsvkhan.py','imported':len(resources),'deduplication':'translated_youtube_id','filters':['fully_translated','dubbed','listed_anywhere','cc-by-nc-sa'],'checked':'2026-11-01','bySubject':dict(collections.Counter(r['subject'] for r in resources))}
(ROOT/'data/khan_import_report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False))
