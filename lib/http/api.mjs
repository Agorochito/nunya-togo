/* Original, stateless teaching API. Runs in the service worker, never a remote server. */
export const PREFIX='/api-pedagogique/v1/';
const ateliers=[{id:1,titre:'Python',ville:'Lomé',places:4},{id:2,titre:'Jardin',ville:'Kara',places:0},{id:3,titre:'Web',ville:'Lomé',places:2}];
const routes={ping:['GET'],texte:['GET'],ateliers:['GET'],inscriptions:['POST'],brouillon:['PUT','DELETE'],erreur:['GET'],'json-invalide':['GET'],interruption:['GET'],lent:['GET']};
const headers={'X-Nunya-Api':'locale-v1','Cache-Control':'no-store'};
function json(value,status=200,extra={}){return new Response(JSON.stringify(value),{status,headers:{...headers,'Content-Type':'application/json; charset=utf-8',...extra}})}
const fail=(message,status)=>json({erreur:message},status);
export async function respond(request){
 const url=new URL(request.url),path=url.pathname.slice(PREFIX.length),item=/^ateliers\/\d+$/.test(path),allowed=item?['GET']:routes[path];
 if(!url.pathname.startsWith(PREFIX)||!allowed)return fail('Route introuvable',404);
 if(!allowed.includes(request.method))return json({erreur:'Méthode non autorisée'},405,{Allow:allowed.join(', ')});
 if(path==='ping')return json({version:'locale-v1'});
 if(path==='lent'){await new Promise(resolve=>setTimeout(resolve,250));return json({version:'locale-v1'})}
 if(path==='texte')return new Response('Bonjour depuis l’API locale.\n',{headers:{...headers,'Content-Type':'text/plain; charset=utf-8'}});
 if(path==='interruption')return Response.error();
 if(path==='erreur')return fail('Indisponible',503);
 if(path==='json-invalide')return new Response('{incomplet',{headers:{...headers,'Content-Type':'application/json'}});
 if(item){const found=ateliers.find(a=>a.id===Number(path.split('/')[1]));return found?json(found):fail('Atelier introuvable',404)}
 if(path==='ateliers'){
  const ville=url.searchParams.get('ville'),limite=url.searchParams.get('limite');
  if(limite!==null&&(!/^[1-3]$/.test(limite)))return fail('Limite invalide',422);
  const rows=ateliers.filter(a=>!ville||a.ville===ville);return json(limite===null?rows:rows.slice(0,Number(limite)));
 }
 if(request.method==='DELETE')return new Response(null,{status:204,headers});
 if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return fail('Format JSON requis',415);
 let data;try{const text=await request.text();if(text.length>12000)return fail('Données invalides',422);data=JSON.parse(text)}catch{return fail('JSON invalide',400)}
 if(!data||typeof data!=='object'||Array.isArray(data))return fail('Données invalides',422);
 if(path==='brouillon'){
  if(typeof data.titre!=='string'||!data.titre.trim()||data.titre.trim().length>60||!Number.isInteger(data.places)||data.places<0||data.places>20)return fail('Données invalides',422);
  return json({titre:data.titre.trim(),places:data.places});
 }
 if(typeof data.nom!=='string'||!data.nom.trim()||data.nom.trim().length>40||!Number.isInteger(data.atelierId))return fail('Données invalides',422);
 const atelier=ateliers.find(a=>a.id===data.atelierId);if(!atelier)return fail('Atelier introuvable',404);if(!atelier.places)return fail('Complet',409);
 return json({id:'demo-1',atelierId:data.atelierId,nom:data.nom.trim()},201);
}
