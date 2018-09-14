//Asignar un nombre y version al cache
const CACHE_NAME = 'v:1.0';
urlsToCache = ['./', './estilo.css', './interfaz.js', './img/favicon.png'];

//Al instalar. Especificar cache...
self.addEventListener('install', e => {
  console.log("Evento: install");
  e.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
    .catch(err => console.log('Error: registro de cache', err))
  );
});
// Activado...
self.addEventListener('activate', e => {
   const cacheWhitelist = [CACHE_NAME];
   console.log("Evento: activate");
   e.waitUntil(caches.keys()
   .then(cacheNames => {
     cacheNames.map(key => {
       if(cacheWhitelist.indexOf(key) === -1){
         return caches.delete(key);
       }
     });
    })
      .then(() => self.clients.claim())
  );
});

//[F5] networkFirst
self.addEventListener('fetch', e => {
  console.log("Evento: fetch");
  e.respondWith(fetch(e.request).catch(function(){
    return caches.match(e.request);
    })
  );
});
