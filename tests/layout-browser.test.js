import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright';

test('real UI: consistent card insets, no horizontal overflow at phone and desktop widths', {timeout:90000}, async()=>{
  const browser=await chromium.launch({headless:true});
  try {
    const context=await browser.newContext({serviceWorkers:'block',reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    const me={handle:'usuario_de_teste_extenso',done:[0],xp:50,streak:1,goal:100,daily_xp:50,daily_lessons:1,claimed:false,errors:[],review:[],exams:[],calendar:[],achievements:[{id:'first',icon:'⭐',label:'Primeira lição',desc:'Conclua sua primeira atividade.',unlocked:true}],gems:5,freezes:0,diagnostic:null,public_ranking:true,kudos:0,weekly_xp:50};
    const {lessons,modules,sequence}=await import('../lessons.js');
    const api={me,lessons:{modules,sequence,lessons:lessons.map(({answer,verify,...l})=>l)},ranking:[{handle:me.handle,xp:50}],friends:[{handle:'amigo_de_nome_longo_123',accepted:true,streak:7,xp:450,weekly_xp:150,cheered:false}]};
    const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
    await page.route('http://sqlingo.test/**',async route=>{
      const path=new URL(route.request().url()).pathname;
      if(path.startsWith('/api/'))return route.fulfill({json:api[path.slice(5)]??{},status:200});
      const file=path==='/'?'index.html':path.slice(1);
      try{const body=await readFile(new URL('../public/'+file,import.meta.url));await route.fulfill({body,contentType:types[file.slice(file.lastIndexOf('.'))]??'application/octet-stream'});}catch{await route.fulfill({status:404,body:''});}
    });
    await page.goto('http://sqlingo.test/');
    await page.locator('[data-exam="0"]').waitFor();
    async function verify(label){
      const result=await page.evaluate(()=>{
        const cards=[...document.querySelectorAll('.card')].map(el=>({text:el.innerText.slice(0,50),left:parseFloat(getComputedStyle(el).paddingLeft),right:parseFloat(getComputedStyle(el).paddingRight),top:parseFloat(getComputedStyle(el).paddingTop),bottom:parseFloat(getComputedStyle(el).paddingBottom)}));
        const violations=cards.filter(x=>Math.min(x.left,x.right,x.top,x.bottom)<16);
        const rows=[...document.querySelectorAll('.card.card-row')].map(el=>{const r=el.getBoundingClientRect();return [...el.children].every(c=>{const b=c.getBoundingClientRect();return b.left>=r.left+15&&b.right<=r.right-15;});});
        return {count:cards.length,violations,rows,scroll:document.documentElement.scrollWidth,width:window.innerWidth};
      });
      assert.ok(result.count>0,label+' must have cards');
      assert.deepEqual(result.violations,[],label+' card insets');
      assert.ok(result.rows.every(Boolean),label+' row children respect insets');
      assert.ok(result.scroll<=result.width+1,label+' page horizontal overflow: '+result.scroll+' > '+result.width);
    }
    for(const width of [320,390,768,1280]){
      await page.setViewportSize({width,height:900});
      await page.locator('[data-page="trail"]').click();await page.locator('[data-exam="0"]').waitFor();await verify('trail '+width);
      await page.locator('[data-page="practice"]').click();await page.locator('.card.card-row [data-lesson="0"]').waitFor();await verify('practice '+width);
      await page.locator('[data-page="ranking"]').click();await page.getByRole('heading',{name:'Ranking semanal'}).waitFor();await verify('ranking '+width);
      await page.locator('[data-page="friends"]').click();await page.locator('#friend').waitFor();await verify('friends '+width);
      await page.locator('[data-page="profile"]').click();await page.locator('#goal').waitFor();await verify('profile '+width);
      await page.locator('[data-page="trail"]').click();await page.locator('[data-lesson="0"]').click();await page.locator('#sql').waitFor();await page.locator('details summary').first().click();await verify('lesson '+width);
    }
    assert.deepEqual(errors,[]);
  }finally{await browser.close();}
});
