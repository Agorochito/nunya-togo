"""Same formative assertions in CPython CI and the on-device Pyodide worker."""
import ast, builtins, contextlib, copy, io, json, math, traceback

class _NunyaOutput(io.StringIO):
 def write(self, text):
  if self.tell()+len(text)>16000:raise ValueError('Affichage arrêté : la console dépasse 16 000 caractères. Vérifie ta boucle.')
  return super().write(text)

def _nunya_equal(actual, expected, tolerance=0):
 if isinstance(expected,bool):return isinstance(actual,bool) and actual==expected
 if isinstance(expected,(int,float)) and not isinstance(expected,bool):
  return isinstance(actual,(int,float)) and not isinstance(actual,bool) and math.isfinite(actual) and abs(actual-expected)<=tolerance
 if isinstance(expected,(list,tuple)):
  return isinstance(actual,(list,tuple)) and len(actual)==len(expected) and all(_nunya_equal(a,e,tolerance) for a,e in zip(actual,expected))
 if isinstance(expected,dict):
  return isinstance(actual,dict) and actual.keys()==expected.keys() and all(_nunya_equal(actual[k],v,tolerance) for k,v in expected.items())
 return type(actual) is type(expected) and actual==expected

def _nunya_mutable_ids(value):
 found=set()
 if isinstance(value,(list,dict,set)):
  found.add(id(value))
  for item in value.values() if isinstance(value,dict) else value:found.update(_nunya_mutable_ids(item))
 elif isinstance(value,tuple):
  for item in value:found.update(_nunya_mutable_ids(item))
 return found

def nunya_run(code,cases,constructs=None):
 results=[]
 try:
  tree=ast.parse(code)
  nodes=list(ast.walk(tree))
  def has_construct(rule):
   if rule.startswith('call:'):return any(isinstance(n,ast.Call) and isinstance(n.func,ast.Name) and n.func.id==rule[5:] for n in nodes)
   if rule.startswith('class:'):return any(isinstance(n,ast.ClassDef) and n.name==rule[6:] for n in nodes)
   if rule.startswith('import:'):
    module=rule[7:]
    return any(isinstance(n,ast.Import) and any(a.name==module for a in n.names) or isinstance(n,ast.ImportFrom) and n.module==module for n in nodes)
   kind={'fstring':ast.JoinedStr,'listcomp':ast.ListComp,'dictcomp':ast.DictComp,'setcomp':ast.SetComp,'try':ast.Try,'raise':ast.Raise,'assert':ast.Assert}.get(rule)
   return kind is not None and any(isinstance(n,kind) for n in nodes)
  constructs_passed=all(has_construct(rule) for rule in (constructs or []))
 except SyntaxError:constructs_passed=False
 for case in cases:
  values=iter(case.get('inputs',[]));buf=_NunyaOutput();old_input=builtins.input;namespace={'__name__':'__main__'}
  try:
   builtins.input=lambda prompt='':str(next(values))
   checks=[]
   with contextlib.redirect_stdout(buf),contextlib.redirect_stderr(buf):
    exec(compile(code,'<ton programme>','exec'),namespace)
    for assertion in case.get('calls',[]):
     name=assertion['name'];target=namespace.get(name);args=copy.deepcopy(assertion.get('args',[]));before=copy.deepcopy(args)
     if not callable(target):raise AssertionError('La fonction '+name+' est absente ou n’est pas appelable.')
     if assertion.get('raises'):
      try:
       actual=target(*args);passed=False;description='Aucune exception levée'
      except Exception as exc:
       actual=None;description=type(exc).__name__+': '+str(exc)
       passed=type(exc).__name__==assertion['raises'] and assertion.get('message_contains','') in str(exc)
      expected='Exception '+assertion['raises']+(' contenant '+repr(assertion['message_contains']) if assertion.get('message_contains') else '')
     else:
      actual=target(*args);passed=_nunya_equal(actual,assertion['expected'],assertion.get('tolerance',0))
      if assertion.get('result_disjoint_args'):passed=passed and not (_nunya_mutable_ids(actual)&_nunya_mutable_ids(args))
      description=repr(actual);expected=repr(assertion['expected'])
     if assertion.get('unchanged_args'):passed=passed and _nunya_equal(args,before)
     checks.append({'name':name,'passed':passed,'actual':description[:500],'expected':expected[:500]})
    for name,constraint in case.get('variables',{}).items():
     actual=namespace.get(name);expected_type={'int':int,'float':float,'str':str,'bool':bool,'list':list,'dict':dict}.get(constraint.get('type'))
     passed=(expected_type is None or type(actual) is expected_type) and _nunya_equal(actual,constraint['value'],constraint.get('tolerance',0))
     checks.append({'name':name,'passed':passed,'actual':repr(actual)[:500],'expected':repr(constraint['value'])[:500]})
   results.append({'output':buf.getvalue(),'assertions_passed':all(c['passed'] for c in checks),'checks':checks})
  except BaseException as err:
   results.append({'output':buf.getvalue(),'error':type(err).__name__,'detail':str(err)[:1000],'trace':traceback.format_exc(limit=2)[:1500]})
  finally:builtins.input=old_input
 return {'results':results,'constructs_passed':constructs_passed}
