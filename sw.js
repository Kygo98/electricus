// Cache per funzionare offline in cantiere. Cambia VERSIONE a ogni aggiornamento.
const VERSIONE='electricus-v9';
const FILE=['./','index.html','dxf-parser.js','manifest.webmanifest','icona-180.png','icona-192.png','icona-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSIONE).then(c=>c.addAll(FILE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSIONE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// prima la rete (così prendi gli aggiornamenti), se non c'è rete la copia salvata
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const c=r.clone();caches.open(VERSIONE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true})))});
