/* Shared identifiers and ordered navigation. No learner state is mutated here. */
function curriculumValidId(id){return typeof id==='string'&&/^[a-z][a-z0-9]*-m[1-9]\d*-\d{2}(?:-[eq][1-9]\d*)?$/.test(id)}
function curriculumCourseForLesson(catalogue,id){return catalogue?.courses?.find(course=>course.lessons.some(lesson=>lesson.id===id))||null}
function curriculumNextLesson(course,id,mode='lesson'){
 if(!course)return null;
 const lessons=course.lessons;
 const current=mode==='validation'?course.modules.find(module=>module.id===id)?.lesson_ids.at(-1):id;
 const index=lessons.findIndex(lesson=>lesson.id===current);
 return index<0?null:lessons[index+1]||null;
}
function curriculumLessonRoute(catalogue,id){const course=curriculumCourseForLesson(catalogue,id),lesson=course?.lessons.find(row=>row.id===id);return lesson?'#/apprendre/'+course.id+'/'+lesson.module+'/'+id:null}
function curriculumModuleForLegacy(program,index){return program?.modules?.find(module=>module.lesson_indices.includes(Number(index)))||null}
