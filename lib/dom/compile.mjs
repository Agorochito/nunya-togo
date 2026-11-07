import {parse} from 'acorn';
import {transform} from 'sucrase';
export function compileLearner(source,runtime='dom'){
 if(typeof source!=='string'||source.length>12000)throw Error('Le programme est limité à 12 000 caractères.');
 const code=runtime==='react'?transform(source,{transforms:['jsx'],production:true}).code:source;
 const ast=parse(code,{ecmaVersion:'latest',sourceType:'script',preserveParens:true}),name='__nunya_budget_'+Math.random().toString(36).slice(2),edits=[];
 const add=(pos,text)=>edits.push({pos,text});
 function visit(node){
  if(!node||typeof node!=='object')return;
  if(node.type==='ImportExpression'||node.type?.startsWith('Import')||node.type?.startsWith('Export'))throw Error('Les imports ne sont pas disponibles dans cet atelier. Les bibliothèques utiles sont déjà fournies.');
  if(['ForStatement','ForInStatement','ForOfStatement','WhileStatement','DoWhileStatement'].includes(node.type)){
   if(node.body.type==='BlockStatement')add(node.body.start+1,name+'();');else{add(node.body.start,'{'+name+'();');add(node.body.end,'}')}
  }
  if(['FunctionDeclaration','FunctionExpression','ArrowFunctionExpression'].includes(node.type)){
   if(node.body.type==='BlockStatement')add(node.body.start+1,name+'();');else{add(node.body.start,'{'+name+'();return (');add(node.body.end,');}')}
  }
  for(const [key,v]of Object.entries(node))if(key!=='type'){if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object')visit(v)}
 }
 visit(ast);edits.sort((a,b)=>b.pos-a.pos);let output=code;for(const e of edits)output=output.slice(0,e.pos)+e.text+output.slice(e.pos);
 return {code:output,guard:name};
}
