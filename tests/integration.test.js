import {test} from 'node:test';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';
test('accounts, progress, review, social and playground integration', {timeout:120000},async()=>{
const port=3219,base='http://127.0.0.1:'+port;
const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:String(port),NODE_ENV:'test'},stdio:'inherit'});
async function call(path,body,cookie){const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(cookie?{Cookie:cookie}:{})},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,body:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]};}
try{
let healthy=false;for(let i=0;i<40;i++){try{if((await fetch(base+'/health')).ok){healthy=true;break}}catch{}await new Promise(r=>setTimeout(r,500));}assert.ok(healthy,'server starts');
const course=await call('/api/lessons');assert.equal(course.body.lessons.length,94);assert.ok(!('answer' in course.body.lessons[0]));assert.equal((await call('/api/me')).status,401);
const password='TestPasswordOnly123!';
const a=await call('/api/auth/register',{handle:'test_learner_a',password}),b=await call('/api/auth/register',{handle:'test_learner_b',password});assert.equal(a.status,200);assert.equal(b.status,200);
const A=a.cookie,B=b.cookie;let m=(await call('/api/me',undefined,A)).body;assert.equal(m.xp,0);assert.equal(m.hearts,5);
assert.equal((await call('/api/run',{id:1,sql:'SELECT unidade,potencia_mw FROM geracao_energia'},A)).status,403);
const bad=await call('/api/run',{id:0,sql:'SELECT id FROM geracao_energia'},A);assert.equal(bad.body.correct,false);m=(await call('/api/me',undefined,A)).body;assert.equal(m.hearts,4);assert.equal(m.errors[0].lesson,0);
const ok=await call('/api/run',{id:0,sql:'SELECT * FROM geracao_energia'},A);assert.equal(ok.body.correct,true);assert.equal(ok.body.xp,50);m=(await call('/api/me',undefined,A)).body;assert.equal(m.xp,50);assert.equal(m.streak,1);assert.deepEqual(m.done,[0]);assert.equal(m.errors.length,0);
assert.equal((await call('/api/run',{id:0,sql:'SELECT * FROM geracao_energia'},A)).body.xp,0);
assert.equal((await call('/api/run',{id:1,sql:'SELECT unidade,potencia_mw FROM geracao_energia'},A)).body.xp,50);
assert.equal((await call('/api/quest',{},A)).body.xp,120);
assert.equal((await call('/api/quest',{},A)).body.xp,120);
assert.equal((await call('/api/settings',{goal:100},A)).body.goal,100);
assert.equal((await call('/api/diagnostic',{answers:[1,2,3,0,2]},A)).body.score,5);
assert.equal((await call('/api/friends',{handle:'test_learner_b'},A)).status,200);
assert.equal((await call('/api/friends',{handle:'test_learner_a',accept:true},B)).status,200);
const friends=(await call('/api/friends',undefined,B)).body;assert.equal(friends[0].accepted,true);assert.equal(friends[0].xp,120);
assert.equal((await call('/api/cheer',{handle:'test_learner_a'},B)).status,200);assert.equal((await call('/api/me',undefined,A)).body.kudos,1);
const play=await call('/api/playground',{sql:'SELECT COUNT(*) FROM usinas'},A);assert.equal(play.status,200);assert.equal(Number(play.body.rows[0][0]),3);
assert.equal((await call('/api/exam/0',undefined,A)).status,403);
assert.equal((await call('/api/logout',{},A)).status,200);assert.equal((await call('/api/me',undefined,A)).status,401);
const login=await call('/api/auth/login',{handle:'test_learner_a',password});assert.equal(login.status,200);assert.equal((await call('/api/me',undefined,login.cookie)).body.xp,120);
}finally{child.kill('SIGTERM');}
});