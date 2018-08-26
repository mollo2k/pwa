//Asignar un nombre y version al cache
const CACHE_NAME = 'v1';
urlsToCache = ['./', './estilo.css', './interfaz.js', './img/favicon.png'];

//Al instalar...
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
    .catch(err => console.log('Error en registro de cache', err))
  );
});
  
self.addEventListener('activate', e => {
   const cacheWhitelist = [CACHE_NAME];
   
   e.waitUntil(caches.keys()
   .then(cacheNames => {
     cacheNames.map(key => {
       if(cacheWhitelist.indexOf(key) === -1){
         return caches.delete(key)
       }
     })
    })
     
    .then(() => self.clients.claim())
  );
});

//CUANDO SE RECUPERA UNA URL
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request)
    .then(resp => {
      if(resp){
        return resp;
    }
    
    return fetch(e.request);
  })
  );
});
