import urllib.request,json,tarfile,pathlib
root=pathlib.Path(__file__).resolve().parents[1];meta=json.load(urllib.request.urlopen('https://registry.npmjs.org/pyodide/314.0.7',timeout=30));archive=pathlib.Path('/private/tmp/nunya-pyodide.tgz');urllib.request.urlretrieve(meta['dist']['tarball'],archive)
out=root/'dist/runtime/python';out.mkdir(parents=True,exist_ok=True);wanted={'pyodide.js','pyodide.asm.wasm','python_stdlib.zip','pyodide-lock.json','pyodide.asm.js','LICENSE','LICENSE.md','pyodide.mjs','pyodide.asm.mjs'};files=[]
with tarfile.open(archive) as tar:
 for member in tar.getmembers():
  if member.isfile() and pathlib.PurePosixPath(member.name).name in wanted:
   name=pathlib.PurePosixPath(member.name).name;data=tar.extractfile(member).read();(out/name).write_bytes(data);files.append({'name':name,'bytes':len(data)})
(root/'data/python_runtime.json').write_text(json.dumps({'version':meta['version'],'source':meta['dist']['tarball'],'license':meta.get('license'),'files':files},indent=2));print(json.dumps({'version':meta['version'],'files':files}))
