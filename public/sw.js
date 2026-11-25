const SHELL='sqlingo-shell-v9',ENGINE='sqlingo-engine-v1';
const ASSETS=['/','/style.css','/app.js','/offline.js','/icon.svg','/mascot.webp','/manifest.webmanifest','/art/explorer.webp','/art/tutor.webp','/art/celebrate.webp','/art/world-emerald.webp','/art/world-amber.webp','/art/world-teal.webp','/art/world-violet.webp','/art/world-blue.webp','/art/world-rose.webp','/art/world-indigo.webp','/art/trail-emerald.webp','/art/trail-amber.webp','/art/trail-teal.webp','/art/trail-violet.webp','/art/trail-blue.webp','/art/trail-rose.webp','/art/trail-indigo.webp'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS.map(x=>new Request(x,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sqlingo-')&&![SHELL,ENGINE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/api/')||u.pathname==='/health')return;
if(u.pathname.startsWith('/vendor/pglite/')||u.pathname==='/offline-worker.js'){e.respondWith(caches.open(ENGINE).then(async c=>(await c.match(e.request))||fetch(e.request)));return;}
if(e.request.mode==='navigate'){e.respondWith(caches.open(SHELL).then(async c=>(await c.match('/'))||fetch(e.request)));return;}
if(ASSETS.includes(u.pathname))e.respondWith(caches.open(SHELL).then(async c=>(await c.match(u.pathname))||fetch(e.request)));});
