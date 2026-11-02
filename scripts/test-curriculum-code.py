# -*- coding: utf-8 -*-
import json,subprocess,sys
from pathlib import Path
r=Path(__file__).resolve().parent.parent
pack=json.loads((r/'dist/data/curriculum/python-bases.json').read_text())
harness='''import sys,json,io,contextlib,builtins,re
p=json.loads(sys.stdin.read()); out=[]
for t in p['tests']:
 values=iter(t.get('inputs',[])); buf=io.StringIO(); builtins.input=lambda prompt='':str(next(values))
 try:
  with contextlib.redirect_stdout(buf),contextlib.redirect_stderr(buf):exec(compile(p['code'],'<lesson>','exec'),{'__name__':'__main__'})
  out.append({'output':buf.getvalue().rstrip()})
 except BaseException as e:out.append({'error':type(e).__name__,'detail':str(e)})
print(json.dumps(out))
'''
runs=0
for l in pack['lessons']:
 for item in [*l['examples'],*l['exercises']]:
  if 'solution' in item:code=item['solution'];tests=item['visible_tests']+item['hidden_tests']
  else:code=item['code'];tests=[dict(inputs=item.get('inputs',[]),expected_output=item['expected_output'])]
  result=subprocess.run([sys.executable,'-I','-c',harness],input=json.dumps(dict(code=code,tests=tests)),text=True,capture_output=True,timeout=4)
  if result.returncode:raise Exception(l['id']+' harness error '+result.stderr)
  actual=json.loads(result.stdout)
  for a,t in zip(actual,tests):
   if a.get('error') or a.get('output')!=t['expected_output'].rstrip():raise Exception(l['id']+' '+str(item.get('id','example'))+' '+str(a)+' != '+str(t))
   runs+=1
  import re
  for pattern in item.get('required_syntax',[]):
   if not re.search(pattern,code,re.M):raise Exception('Solution misses required syntax '+item['id'])
print(json.dumps(dict(lessons=len(pack['lessons']),executedCases=runs,allExamplesAndSolutions='passed')))
