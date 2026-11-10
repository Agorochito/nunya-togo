import {buildScript,fatal,same} from '../lib/php/core.mjs';

describe('PHP runner helpers',()=>{
 it('compares values, numbers with tolerance and key order of associative arrays',()=>{
  expect(same(42,42)).toBe(true);
  expect(same(1.004,1,0.01)).toBe(true);
  expect(same('42',42)).toBe(false);
  expect(same([1,2],[1,2])).toBe(true);
  expect(same({riz:500,mil:350},{riz:500,mil:350})).toBe(true);
  expect(same({mil:350,riz:500},{riz:500,mil:350})).toBe(false);
  expect(same([1,2],{0:1,1:2})).toBe(false);
 });
 it('requires the opening tag and explains readline()',()=>{
  expect(()=>buildScript('echo 1;',[],'t')).toThrow(/<\?php/);
  expect(()=>buildScript('<?php\n$n = readline();',[],'t')).toThrow(/fgets\(STDIN\)/);
  expect(()=>buildScript('<?php\necho "readline(";',[],'t')).not.toThrow();
  expect(()=>buildScript('<?php\n// readline() est déconseillé ici',[],'t')).not.toThrow();
 });
 it('defines STDIN on the first line so error line numbers stay exact',()=>{
  const script=buildScript('<?php\necho 1;',[],'t');
  expect(script.split('\n')).toHaveLength(2);
  expect(script.split('\n')[0]).toContain("define('STDIN'");
  const strict=buildScript('<?php declare(strict_types=1);\necho 1;',[],'t');
  expect(strict.startsWith('<?php declare(strict_types=1);')).toBe(true);
  const nextLine=buildScript('<?php\ndeclare(strict_types=1);\n\necho 1;',[],'t');
  expect(nextLine.startsWith("<?php\ndeclare(strict_types=1); if(!defined('STDIN'))")).toBe(true);
  expect(nextLine.split('\n').length).toBe(4);
 });
 it('rejects unsafe check names',()=>{
  expect(()=>buildScript('<?php',[{name:'system("x")'}],'t')).toThrow(/invalide/);
  expect(()=>buildScript('<?php',[{name:'$prix'},{name:'total'}],'t')).not.toThrow();
 });
 it('reads PHP fatal and parse errors with their line',()=>{
  expect(fatal('avant\n\nFatal error: Uncaught DivisionByZeroError: Division by zero in php-wasm run script:3\nStack trace:'))
   .toEqual({before:'avant\n',error:'DivisionByZeroError',detail:'Division by zero (ligne 3)'});
  expect(fatal('\nParse error: syntax error, unexpected end of file in php-wasm run script on line 2\n').error).toBe('ParseError');
  expect(fatal('Bonjour\n')).toBeNull();
 });
});
