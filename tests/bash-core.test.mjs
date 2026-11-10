import {buildBash,casesFor,parseResponse} from '../lib/remote/bash.mjs';

describe('Terminal online workshop helpers',()=>{
 it('writes the script, files, permissions and input with quoted heredocs',()=>{
  const code=buildBash('echo "$HOME"',casesFor([{inputs:['Afi'],files:{'notes.txt':'a\n','vide/':''},modes:{'notes.txt':'600'},expressions:[{expr:'ls -1',expected:'notes.txt\nvide'}]}],true),'T');
  expect(code).toContain("<<'NUNYA_T_SCRIPT'\necho \"$HOME\"\nNUNYA_T_SCRIPT");
  expect(code).toContain("mkdir -p 'vide/'");
  expect(code).toContain("chmod 600 'notes.txt'");
  expect(code).toContain("<<'NUNYA_T_IN0'\nAfi\nNUNYA_T_IN0");
  expect(code).toContain('timeout 5 bash');
  expect(code).toContain('( ls -1 ) 2>&1');
 });
 it('refuses unsafe fixture paths and permissions',()=>{
  expect(()=>buildBash('ls',casesFor([{files:{'../hors.txt':'x'}}],true),'T')).toThrow(/Chemin/);
  expect(()=>buildBash('ls',casesFor([{files:{'/etc/x':'x'}}],true),'T')).toThrow(/Chemin/);
  expect(()=>buildBash('ls',casesFor([{files:{'a.txt':'x'},modes:{'a.txt':'9999'}}],true),'T')).toThrow(/Droits/);
  expect(()=>buildBash('',[],'T')).toThrow(/commandes/);
 });
 it('drops check commands on a free run',()=>{
  expect(casesFor([{inputs:[],expressions:[{expr:'ls',expected:''}]}],false)[0].expressions).toEqual([]);
 });
 it('separates output, errors, time limit and checks',()=>{
  const cases=casesFor([{expressions:[{expr:'cat a',expected:'x'}]},{},{}],true),m=s=>'\n<<<NUNYA-T-'+s+'>>>\n';
  const out=m('C-0')+'Bonjour\n'+m('S-0')+'0'+m('R-0')+m('E-0-0')+'x\n'+m('C-1')+'avant\n'+m('S-1')+'127'+m('R-1')+'/home/w/nunya-T/eleve.sh: line 2: lss: command not found\n'+m('C-2')+m('S-2')+'124'+m('R-2')+m('FIN');
  const [ok,shell,slow]=parseResponse({program_output:out},cases,'T');
  expect(ok).toEqual({output:'Bonjour\n',checks:[{name:'cat a',passed:true,actual:'x',expected:'x'}],assertions_passed:true});
  expect(shell).toMatchObject({output:'avant\n',error:'ShellError',detail:'ligne 2 : lss: command not found'});
  expect(slow.error).toBe('TimeoutError');
 });
});
