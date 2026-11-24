import {parentPort,workerData} from 'node:worker_threads';
import {PGlite} from '@electric-sql/pglite';
import {seed} from './lessons.js';
const {sql,lesson}=workerData;
try{
const db=new PGlite();await db.exec(seed);
const expected=await db.query(lesson.answer,[],{rowMode:'array'});
// Independent ephemeral database; restrict to single read-only queries for this course.
if(!/^\s*(SELECT|WITH)\b/i.test(sql)||/;\s*\S/.test(sql.trim())||/\b(pg_sleep|generate_series|repeat|set_config|pg_read_file|pg_write_file)\s*\(/i.test(sql))throw new Error('Use uma consulta SELECT ou WITH por vez.');
await db.exec('BEGIN READ ONLY; SET LOCAL statement_timeout=3000;');
const actual=await db.query(sql,[],{rowMode:'array'});
const normalize=r=>r.map(x=>JSON.stringify(x));
const a=normalize(actual.rows),b=normalize(expected.rows);if(!lesson.ordered){a.sort();b.sort();}
const correct=actual.fields.length===expected.fields.length&&JSON.stringify(a)===JSON.stringify(b);
parentPort.postMessage({correct,columns:actual.fields.map(f=>f.name),rows:actual.rows.slice(0,100),count:actual.rows.length});
await db.close();
}catch(e){parentPort.postMessage({error:String(e.message).slice(0,500)});}