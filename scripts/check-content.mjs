import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);
const app=fs.readFileSync(new URL('app.js',root),'utf8');
const context={SUBJECTS:[],state:{}};vm.createContext(context);
vm.runInContext(app.slice(app.indexOf('const lesson='),app.indexOf('const getCourse='))+fs.readFileSync(new URL('curriculum.js',root),'utf8')+fs.readFileSync(new URL('openlearn-courses.js',root),'utf8')+fs.readFileSync(new URL('expansion-data.js',root),'utf8')+';courses.push(...buildCurriculum(lesson));'+fs.readFileSync(new URL('academy.js',root),'utf8').split('const extensionSubjects=')[0]+fs.readFileSync(new URL('local-projects.js',root),'utf8').split('let projectData=')[0]+';globalThis.catalog={courses,sectors:SECTORS,videos:LEARNING_VIDEOS};',context);
const {courses,sectors,videos}=context.catalog;
const ids=new Set(courses.map(c=>c.id));assert.equal(ids.size,courses.length,'Duplicate course ID');
let lessons=0;for(const c of courses){assert(c.lessons.length>=4);for(const l of c.lessons){lessons++;assert(l.body.length>80,'Missing explanation: '+l.title);assert(l.options.length===3);assert(Number.isInteger(l.answer)&&l.answer>=0&&l.answer<l.options.length,'Invalid answer: '+l.title);assert(l.explanation.length>10)}}
for(const s of sectors)for(const j of s.jobs)for(const id of j.path)assert(ids.has(id),'Missing pathway course: '+id);
for(const [id,vs]of Object.entries(videos)){assert(ids.has(id));for(const v of vs){assert(/^[\w-]{11}$/.test(v.id));assert(v.lessons.every(n=>n>=0&&n<courses.find(c=>c.id===id).lessons.length))}}
const html=fs.readFileSync(new URL('index.html',root),'utf8');for(const src of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g))assert(fs.existsSync(new URL(src[1],root)),'Missing asset: '+src[1]);
console.log(JSON.stringify({courses:courses.length,lessons,sectors:sectors.length,careerPaths:sectors.reduce((n,s)=>n+s.jobs.length,0),videos:Object.values(videos).flat().length,status:'passed'}));
