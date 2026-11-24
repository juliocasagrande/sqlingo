import {parentPort,workerData} from 'node:worker_threads';
import {PGlite} from '@electric-sql/pglite';
import {seed} from './lessons.js';
const {sql,lesson}=workerData||{};
export async function evaluate(sql,lesson){
const db=new PGlite();
try{
await db.exec(seed);
const blocked=/\b(pg_sleep|generate_series|repeat|set_config|pg_read_file|pg_write_file|lo_import|lo_export)\s*\(/i;
if(blocked.test(sql))throw Error('Função indisponível no sandbox.');
let expected,actual;
if(lesson.playground){if(!/^\s*(SELECT|WITH|EXPLAIN)\b/i.test(sql)||/;\s*\S/.test(sql.trim()))throw Error('Playground: use SELECT, WITH ou EXPLAIN em uma única consulta.');await db.exec('BEGIN READ ONLY; SET LOCAL statement_timeout=3000;');actual=await db.query(sql,[],{rowMode:'array'});return {columns:actual.fields.map(f=>f.name),rows:actual.rows.slice(0,100),count:actual.rows.length};}
if(lesson.verify){
if(!/^\s*(CREATE|ALTER|INSERT|UPDATE|DELETE|TRUNCATE|DROP|BEGIN)\b/i.test(sql))throw Error('Use o comando de manipulação solicitado.');
const ref=new PGlite();
try{await ref.exec(seed);await ref.exec(lesson.answer);expected=await ref.query(lesson.verify,[],{rowMode:'array'});}finally{await ref.close();}
await db.exec('SET statement_timeout=3000;');await db.exec(sql);actual=await db.query(lesson.verify,[],{rowMode:'array'});
if(/^BEGIN/i.test(lesson.answer)&&(!/\bUPDATE\b/i.test(sql)||!/\bROLLBACK\b/i.test(sql)))throw Error('Pratique UPDATE e ROLLBACK na transação.');
}else if(/^EXPLAIN\b/i.test(lesson.answer)){
if(!/^\s*EXPLAIN\s+(?:ANALYZE\s+)?SELECT\b/i.test(sql)||/;\s*\S/.test(sql.trim()))throw Error('Use EXPLAIN com SELECT.');
await db.exec('BEGIN READ ONLY; SET LOCAL statement_timeout=3000;');
actual=await db.query(sql,[],{rowMode:'array'});
const normalize=s=>s.trim().replace(/;$/,'').replace(/\s+/g,' ').replace(/\s*=\s*/g,'=').toLowerCase();
return {correct:normalize(sql)===normalize(lesson.answer),columns:actual.fields.map(f=>f.name),rows:actual.rows.slice(0,100),count:actual.rows.length};
}else{
if(!/^\s*(SELECT|WITH)\b/i.test(sql)||/;\s*\S/.test(sql.trim()))throw Error('Use uma consulta SELECT ou WITH por vez.');
expected=await db.query(lesson.answer,[],{rowMode:'array'});await db.exec('BEGIN READ ONLY; SET LOCAL statement_timeout=3000;');actual=await db.query(sql,[],{rowMode:'array'});
}
const normalize=r=>r.map(x=>JSON.stringify(x));const a=normalize(actual.rows),b=normalize(expected.rows);if(!lesson.ordered){a.sort();b.sort();}
return {correct:actual.fields.length===expected.fields.length&&JSON.stringify(a)===JSON.stringify(b),columns:actual.fields.map(f=>f.name),rows:actual.rows.slice(0,100),count:actual.rows.length};
}finally{await db.close();}
}
if(parentPort){try{parentPort.postMessage(await evaluate(sql,lesson));}catch(e){parentPort.postMessage({error:String(e.message).slice(0,500)});}}
