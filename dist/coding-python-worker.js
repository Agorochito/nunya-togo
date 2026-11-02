/* Fresh worker per exercise. Input is scripted; code, examples and tests stay on-device. */
const send=self.postMessage.bind(self);
let py;
self.onmessage=async({data})=>{try{if(!py){const {loadPyodide}=await import('./runtime/python/pyodide.mjs');py=await loadPyodide({indexURL:new URL('./runtime/python/',self.location.href).href});}
// Loading is finished before network and persistence APIs are removed.
for(const name of ['fetch','XMLHttpRequest','WebSocket','EventSource','WebTransport','indexedDB','caches','Worker','SharedWorker','BroadcastChannel','importScripts']){try{Object.defineProperty(self,name,{value:undefined,writable:false,configurable:false})}catch{}}
send({ready:true});if(typeof data.code!=='string'||data.code.length>12000)throw Error('Programme trop long.');
py.globals.set('_nunya_code',data.code);py.globals.set('_nunya_cases_json',JSON.stringify(data.tests));
const value=await py.runPythonAsync(`import json, io, contextlib, builtins, traceback
class _LimitedOutput(io.StringIO):
    def write(self, text):
        if self.tell() + len(text) > 16000:
            raise ValueError('Affichage arrêté : la console dépasse 16 000 caractères. Vérifie ta boucle.')
        return super().write(text)
_nunya_results=[]
for _case in json.loads(_nunya_cases_json):
    _input_values=iter(_case.get('inputs', []))
    _old_input=builtins.input
    _out=_LimitedOutput()
    try:
        builtins.input=lambda prompt='': str(next(_input_values))
        with contextlib.redirect_stdout(_out), contextlib.redirect_stderr(_out):
            exec(compile(_nunya_code, '<ton programme>', 'exec'), {'__name__':'__main__'})
        _nunya_results.append({'output':_out.getvalue()[:16000]})
    except BaseException as _err:
        _nunya_results.append({'output':_out.getvalue()[:16000], 'error':type(_err).__name__, 'detail':str(_err)[:1000], 'trace':traceback.format_exc(limit=2)[:1500]})
    finally:
        builtins.input=_old_input
json.dumps(_nunya_results)
`);send({done:true,results:JSON.parse(value)});}catch(e){send({error:String(e.message).slice(0,2000)})}};
