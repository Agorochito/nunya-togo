/* Fictitious starting databases. Each fixture names a schema; every test starts from a fresh copy. */
export const definitions={
 membres:'CREATE TABLE membres(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,ville TEXT,age INTEGER NOT NULL CHECK(age>=13));',
 ateliers:'CREATE TABLE ateliers(id INTEGER PRIMARY KEY,titre TEXT NOT NULL,places INTEGER NOT NULL CHECK(places>=0),prix INTEGER NOT NULL CHECK(prix>=0));',
 inscriptions:"CREATE TABLE inscriptions(id INTEGER PRIMARY KEY,membre_id INTEGER NOT NULL REFERENCES membres(id),atelier_id INTEGER NOT NULL REFERENCES ateliers(id),statut TEXT NOT NULL CHECK(statut IN ('confirmee','attente')));"
};
export const columns={membres:['id','nom','ville','age'],ateliers:['id','titre','places','prix'],inscriptions:['id','membre_id','atelier_id','statut']};
/* Neighbourhood shop for the intermediate course: self-referencing customers (referrals) and dated sales. */
const shopDefinitions={
 produits:'CREATE TABLE produits(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,categorie TEXT NOT NULL,prix INTEGER NOT NULL CHECK(prix>0),stock INTEGER NOT NULL CHECK(stock>=0));',
 clients:'CREATE TABLE clients(id INTEGER PRIMARY KEY,nom TEXT NOT NULL,quartier TEXT,parrain_id INTEGER REFERENCES clients(id));',
 ventes:'CREATE TABLE ventes(id INTEGER PRIMARY KEY,client_id INTEGER REFERENCES clients(id),produit_id INTEGER NOT NULL REFERENCES produits(id),quantite INTEGER NOT NULL CHECK(quantite>0),jour TEXT NOT NULL);'
};
const shopColumns={produits:['id','nom','categorie','prix','stock'],clients:['id','nom','quartier','parrain_id'],ventes:['id','client_id','produit_id','quantite','jour']};
const schemas={club:{definitions,columns},boutique:{definitions:shopDefinitions,columns:shopColumns}};
const datasets={
 club:{schema:'club',membres:[[1,'Afi','Lomé',16],[2,'Kossi','Kara',19],[3,'Mina',null,17],[4,'Lina','Lomé',22],[5,'Yao','Sokodé',15]],ateliers:[[1,'Python',4,1000],[2,'Jardin',0,500],[3,'Web',2,1500],[4,'Dessin',5,0]],inscriptions:[[1,1,1,'confirmee'],[2,2,3,'attente'],[3,1,3,'confirmee'],[4,3,1,'attente'],[5,4,2,'confirmee']]},
 variation:{schema:'club',membres:[[1,'Afi','Kara',20],[2,'Kossi','Lomé',15],[3,'Mina',null,24],[4,'Lina','Sokodé',17],[5,'Yao','Lomé',18],[6,'Ama',null,13]],ateliers:[[1,'Python',0,1200],[2,'Jardin',3,700],[3,'Web',6,1200],[4,'Dessin',0,0],[5,'Lecture',2,300]],inscriptions:[[1,2,2,'confirmee'],[2,1,1,'attente'],[3,3,2,'confirmee'],[4,2,3,'attente'],[5,5,3,'confirmee'],[6,6,2,'attente']]},
 vide:{schema:'club'},
 boutique:{schema:'boutique',
  produits:[[1,'Riz 1 kg','épicerie',600,40],[2,'Huile 1 L','épicerie',1200,12],[3,'Savon','hygiène',250,60],[4,'Sucre 1 kg','épicerie',700,0],[5,'Cahier','papeterie',300,25],[6,'Stylo','papeterie',100,80]],
  clients:[[1,'Afi','Bè',null],[2,'Kossi','Tokoin',1],[3,'Mina','Bè',1],[4,'Yao',null,2],[5,'Esi','Adidogomé',null]],
  ventes:[[1,1,1,2,'2026-10-01'],[2,2,3,5,'2026-10-01'],[3,null,6,10,'2026-10-02'],[4,1,2,1,'2026-10-03'],[5,3,5,4,'2026-10-03'],[6,2,1,3,'2026-10-05'],[7,4,2,2,'2026-10-06'],[8,1,6,5,'2026-10-07'],[9,null,3,2,'2026-10-07'],[10,3,1,1,'2026-10-08']]},
 'boutique-variation':{schema:'boutique',
  produits:[[1,'Riz 1 kg','épicerie',650,8],[2,'Huile 1 L','épicerie',1300,0],[3,'Savon','hygiène',250,15],[4,'Lait','épicerie',500,30],[5,'Cahier','papeterie',350,4],[6,'Craie','papeterie',150,100],[7,'Dentifrice','hygiène',800,9]],
  clients:[[1,'Ama','Kodjoviakopé',null],[2,'Edem','Bè',1],[3,'Kofi',null,2],[4,'Akossiwa','Bè',3],[5,'Sena','Tokoin',null],[6,'Dela','Agoè',5]],
  ventes:[[1,2,4,2,'2026-10-02'],[2,1,1,3,'2026-10-02'],[3,3,7,1,'2026-10-04'],[4,null,6,20,'2026-10-04'],[5,4,3,2,'2026-10-05'],[6,2,1,1,'2026-10-09'],[7,5,5,6,'2026-10-09'],[8,1,4,1,'2026-10-10'],[9,6,7,2,'2026-10-11'],[10,2,3,3,'2026-10-11'],[11,null,1,2,'2026-10-12']]}
};
export const fixtureIds=[...Object.keys(datasets),'vierge'];
export function preview(id='club'){
 if(!fixtureIds.includes(id))throw Error('Base initiale inconnue.');
 if(id==='vierge')return [];
 const data=datasets[id],schema=schemas[data.schema];
 return Object.keys(schema.definitions).map(name=>({name,definition:schema.definitions[name],columns:schema.columns[name],values:data[name]||[]}));
}
export function createFixture(SQL,id){const db=new SQL.Database();db.run('PRAGMA foreign_keys=ON;');for(const table of preview(id)){db.run(table.definition);const insert='INSERT INTO '+table.name+' VALUES ('+table.columns.map(()=>'?').join(',')+')';for(const row of table.values)db.run(insert,row)}return db}
