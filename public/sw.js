const SHELL='sqlingo-shell-v2',ENGINE='sqlingo-engine-v1';
const ASSETS=['/','/style.css','/app.js','/offline.js','/icon.svg','/mascot.webp','/manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS.map(x=>new Request(x,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sqlingo-')&&![SHELL,ENGINE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/api/')||u.pathname==='/health')return;
if(u.pathname.startsWith('/vendor/pglite/')||u.pathname==='/offline-worker.js'){e.respondWith(caches.open(ENGINE).then(async c=>(await c.match(e.request))||fetch(e.request)));return;}
if(e.request.mode==='navigate'){e.respondWith(caches.open(SHELL).then(async c=>(await c.match('/'))||fetch(e.request)));return;}
if(ASSETS.includes(u.pathname))e.respondWith(caches.open(SHELL).then(async c=>(await c.match(u.pathname))||fetch(e.request)));});
