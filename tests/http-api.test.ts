import {describe,it,expect} from 'vitest';
// @ts-expect-error Runtime JS module is shared with the browser build.
import {respond} from '../lib/http/api.mjs';
const root='https://nunya.example/api-pedagogique/v1/';
const req=(path:string,options?:RequestInit)=>respond(new Request(root+path,options));
const post=(body:any)=>({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
describe('stateless local learning HTTP API',()=>{
 it('filters decoded query parameters before applying the limit',async()=>{const response=await req('ateliers?ville=Lom%C3%A9&limite=1');expect(await response.json()).toEqual([{id:1,titre:'Python',ville:'Lomé',places:4}]);expect(response.headers.get('x-nunya-api')).toBe('locale-v1');expect(response.headers.get('cache-control')).toBe('no-store')});
 it('does not silently accept a malformed limit or unknown record',async()=>{expect((await req('ateliers?limite=0')).status).toBe(422);expect((await req('ateliers/99')).status).toBe(404)});
 it('distinguishes JSON syntax, media type, validation and business conflict',async()=>{expect((await req('inscriptions',{method:'POST',body:'{}'})).status).toBe(415);expect((await req('inscriptions',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'})).status).toBe(400);expect((await req('inscriptions',post({atelierId:1,nom:' '}))).status).toBe(422);expect((await req('inscriptions',post({atelierId:2,nom:'Afi'}))).status).toBe(409);expect((await req('inscriptions',post({atelierId:99,nom:'Afi'}))).status).toBe(404)});
 it('never turns demonstration responses into stored registrations',async()=>{const one=await req('inscriptions',post({atelierId:1,nom:' Afi '})),two=await req('inscriptions',post({atelierId:1,nom:' Afi '}));expect(one.status).toBe(201);expect(await one.json()).toEqual({id:'demo-1',atelierId:1,nom:'Afi'});expect(await two.json()).toEqual({id:'demo-1',atelierId:1,nom:'Afi'});expect((await(await req('ateliers/1')).json()).places).toBe(4)});
 it('returns a bodyless 204 and an explicit allowed-method response',async()=>{const response=await req('brouillon',{method:'DELETE'});expect(response.status).toBe(204);expect(await response.text()).toBe('');const wrong=await req('brouillon');expect(wrong.status).toBe(405);expect(wrong.headers.get('Allow')).toBe('PUT, DELETE')});
 it('makes malformed JSON and network failure distinct from HTTP 503',async()=>{await expect((await req('json-invalide')).json()).rejects.toThrow();expect((await req('interruption')).type).toBe('error');const response=await req('erreur');expect(response.status).toBe(503);expect(response.ok).toBe(false)});
});
