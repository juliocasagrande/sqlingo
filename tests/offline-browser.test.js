import {test} from 'node:test';import assert from 'node:assert/strict';import {spawn} from 'node:child_process';import {chromium} from 'playwright';
test('download a module, reload offline, run SQL, reconnect and sync', {timeout:180000},async()=>{
const port=3220,base='http://127.0.0.1:'+port;
const child=spawn(process.execPath,['server.js'],{env:{...process.env,PORT:String(port),NODE_ENV:'test'},stdio:'inherit'});
let browser;try{
let ready=false;for(let i=0;i<40;i++){try{if((await fetch(base+'/health')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,500));}assert.ok(ready);
browser=await chromium.launch({headless:true});const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>{errors.push(d.message());d.dismiss()});
await page.goto(base);await page.locator('#toggle').click();await page.locator('#handle').fill('offline_test_user');await page.locator('#password').fill('TestPasswordOnly123!');await page.locator('#auth button.primary').click();
await page.locator('[data-download="0"]').waitFor();await page.locator('[data-download="0"]').click();await page.waitForFunction(()=>document.querySelector('[data-download="0"]')?.textContent.includes('Baixado'),{},{timeout:90000});
await context.setOffline(true);await page.reload();await page.locator('[data-lesson="0"]').waitFor();await page.locator('[data-lesson="0"]').click();await page.locator('#sql').fill('SELECT * FROM geracao_energia');await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Salvo neste dispositivo'),{},{timeout:45000});
await page.locator('#next').click();await page.locator('#sql').fill('SELECT unidade,potencia_mw FROM geracao_energia');await page.locator('#run').click();await page.waitForFunction(()=>document.querySelector('#feedback')?.textContent.includes('Salvo neste dispositivo'),{},{timeout:45000});
await context.setOffline(false);await page.waitForFunction(()=>document.querySelector('#stats')?.textContent.includes('100 XP'),{},{timeout:90000});const me=await page.evaluate(()=>fetch('/api/me').then(r=>r.json()));assert.deepEqual(me.done,[0,1]);assert.equal(me.xp,100);assert.ok(!('hearts'in me));assert.deepEqual(errors,[]);
}finally{await browser?.close();child.kill('SIGTERM')}
});