"""Run every authored example, solution and unfinished starter through the shared CPython harness."""
import json, re, sys
from pathlib import Path
r=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(r/'lib/runtime'))
import importlib.util
spec=importlib.util.spec_from_file_location('nunya_checks',r/'lib/runtime/python-checks.py');engine=importlib.util.module_from_spec(spec);spec.loader.exec_module(engine)
lessons=examples=solutions=rejected=cases=0
for path in sorted((r/'content/fr/python-intermediaire').glob('m*/*.md')):
 raw=path.read_text();front=json.loads(raw.split('---')[1]);codes=re.findall(r'```python\n(.*?)\n```',raw,re.S);lessons+=1
 for item,code in zip(front['examples'],codes):
  test={'inputs':item.get('inputs',[]),'expected_output':item['expected_output']}
  result=engine.nunya_run(code,[test]);actual=result['results'][0]
  if actual.get('error') or actual['output'].rstrip()!=test['expected_output'].rstrip():raise RuntimeError(front['id']+' example '+str(actual))
  examples+=1
 for ex in json.loads(path.with_suffix('.exercises.json').read_text()):
  tests=ex['visible_tests']+ex['hidden_tests'];cases+=len(tests)
  def passes(code):
   result=engine.nunya_run(code,tests,ex.get('required_constructs',[]))
   return result['constructs_passed'] and all(not a.get('error') and a.get('assertions_passed') and a['output'].rstrip()==t['expected_output'].rstrip() for a,t in zip(result['results'],tests))
  if not passes(ex['solution']):raise RuntimeError(ex['id']+' solution '+str(engine.nunya_run(ex['solution'],tests,ex.get('required_constructs',[]))))
  if passes(ex['starter_code']):raise RuntimeError(ex['id']+' unfinished starter passes')
  solutions+=1;rejected+=1
result=dict(lessons=lessons,examples=examples,solutions=solutions,rejectedStarters=rejected,referenceCases=cases)
(r/'docs/PYTHON_INTERMEDIATE_NATIVE_RESULTS.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result))
