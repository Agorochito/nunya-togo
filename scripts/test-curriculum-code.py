# -*- coding: utf-8 -*-
import json, subprocess, sys
from pathlib import Path
r=Path(__file__).resolve().parent.parent
harness=(r/'lib/runtime/python-checks.py').read_text()+"\nimport sys\np=json.loads(sys.stdin.read()); print(json.dumps(nunya_run(p['code'],p['tests'],p.get('required_constructs'))))\n"
cat=json.loads((r/'dist/data/curriculum/index.json').read_text());runs=0;lesson_count=0
for course in cat['courses']:
 if course['runtime']!='python':continue
 pack=json.loads((r/('dist/data/curriculum/'+course['id']+'.json')).read_text())
 for lesson in pack['lessons']:
  lesson_count+=1
  for item in [*lesson['examples'],*lesson['exercises']]:
   code=item.get('solution',item.get('code'));tests=item.get('visible_tests',[dict(inputs=item.get('inputs',[]),expected_output=item['expected_output'])]) if 'solution' not in item else item['visible_tests']+item['hidden_tests']
   payload=dict(code=code,tests=tests,required_constructs=item.get('required_constructs',[]))
   result=subprocess.run([sys.executable,'-I','-c',harness],input=json.dumps(payload),text=True,capture_output=True,timeout=4)
   if result.returncode:raise Exception(lesson['id']+' harness error '+result.stderr)
   actual=json.loads(result.stdout)
   if not actual['constructs_passed']:raise Exception('Required construct absent '+item['id'])
   for a,t in zip(actual['results'],tests):
    if a.get('error') or not a.get('assertions_passed',True) or a.get('output','').rstrip()!=t['expected_output'].rstrip():raise Exception(lesson['id']+' '+str(item.get('id','example'))+' '+str(a)+' != '+str(t))
    runs+=1
# Regression: printing a constant and mentioning conversion in a comment cannot pass.
regression=[dict(inputs=[],expected_output='24',variables={'quantite':{'type':'int','value':24}})]
for bad in ['print("24")\n# int(texte)','quantite="24"\nprint(quantite)\nint("1")']:
 result=subprocess.run([sys.executable,'-I','-c',harness],input=json.dumps(dict(code=bad,tests=regression,required_constructs=['call:int'])),text=True,capture_output=True,timeout=4)
 actual=json.loads(result.stdout)
 if actual['constructs_passed'] and all(x.get('assertions_passed') for x in actual['results']):raise Exception('False positive in conversion regression')
# Fixed-output printing is the point of module 1, but it must not replace the variable/type tasks of module 2.
basic_pack=json.loads((r/'dist/data/curriculum/python-bases.json').read_text())
for lesson in basic_pack['lessons']:
 if lesson['id'] not in ['py-m2-01','py-m2-02','py-m2-03','py-m2-04']:continue
 for item in lesson['exercises']:
  tests=item['visible_tests']+item['hidden_tests'];constant='print('+repr(tests[0]['expected_output'])+')'
  actual=json.loads(subprocess.run([sys.executable,'-I','-c',harness],input=json.dumps(dict(code=constant,tests=tests,required_constructs=item.get('required_constructs',[]))),text=True,capture_output=True,timeout=4).stdout)
  if actual['constructs_passed'] and all(x.get('assertions_passed') and not x.get('error') for x in actual['results']):raise Exception('Output-only false positive '+item['id'])
print(json.dumps(dict(lessons=lesson_count,executedCases=runs,allExamplesAndSolutions='passed',conversionRegression='passed')))
