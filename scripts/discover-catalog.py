import json,urllib.request
x=json.load(urllib.request.urlopen('https://registry.npmjs.org/pyodide/latest',timeout=25));print(json.dumps({'version':x['version'],'tarball':x['dist']['tarball'],'license':x.get('license')}))
