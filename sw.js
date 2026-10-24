/* Radio Méndez • v1.2.0 • Top 10 visible incluso sin JavaScript. */
const CACHE='radio-mendez-v1.2.0-20261024';
const CORE=['./','./index.html','./config.js','./top10.js','./manifest.webmanifest','./assets/logo-radio-mendez-v1.2.0.png','./assets/icon-192-v1.2.0.png','./assets/icon-512-v1.2.0.png','./assets/social-preview-v1.2.0.png'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>Promise.allSettled(CORE.map(path=>cache.add(path)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('mendez-tv-radio-') || key.startsWith('radio-mendez-')) && key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(fetch(req).then(response=>{
   if(response.ok && response.type==='basic'){
     const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(req,copy)).catch(()=>{}));
   }
   return response;
 }).catch(()=>caches.match(req)));
});
