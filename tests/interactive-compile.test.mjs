import {describe,it,expect} from 'vitest';import vm from 'node:vm';import {compileLearner} from '../lib/dom/compile.mjs';
function run(source){const out=compileLearner(source),ctx={value:null};vm.runInNewContext('let count=0;function '+out.guard+'(){if(++count>20000)throw Error("limite")};'+out.code,ctx,{timeout:1000});return ctx.value}
describe('instrumentation des ateliers interactifs',()=>{
 it('conserve les fonctions, retours implicites et objets JSX transformés',()=>{expect(run('const f=x=>({n:x*2}); value=f(3).n;')).toBe(6);const out=compileLearner('root.render(<button>Bonjour</button>);','react');expect(out.code).toContain('React.createElement')});
 it('arrête les boucles et la récursion sans bloc',()=>{for(const source of ['while(true);','for(;;) {}','do {} while(true);','function f(){return f()} f();'])expect(()=>run(source)).toThrow(/limite|stack/i)});
 it('préserve conditions, imbrication, classes et fonctions async',()=>{expect(run('let total=0;for(let i=0;i<3;i++)if(i>0)total+=i;value=total;')).toBe(3);expect(run('class Compteur{lire(){return 4}} value=new Compteur().lire();')).toBe(4);expect(run('const f=()=>()=>5;value=f()();')).toBe(5)});
 it('ne transforme pas les chaînes/commentaires en instructions',()=>{expect(run('value="while(true){}"; // function f() {}')).toBe('while(true){}')});
 it('refuse les imports, les programmes trop grands et les erreurs de syntaxe',()=>{expect(()=>compileLearner('import("https://example.com/x.js")')).toThrow('imports');expect(()=>compileLearner('x'.repeat(12001))).toThrow('12 000');expect(()=>compileLearner('const =')).toThrow()});
});
