//Estructura básica de un Service Worker

//1.Nombre del caché y archivos a cachear
const CACHE_NAME = "mi-cache-v1";
const BASE_PATH = "Ejemplo_PWA";
const urlsToCache = [
    `${BASE_PATH}index.htm`,
    `${BASE_PATH}offline.html`,
    `${BASE_PATH}icons/web-72x72.png`,
    `${BASE_PATH}icons/web-96x96.png`,
    `${BASE_PATH}icons/web-192x192.png`,
    `${BASE_PATH}icons/web-256x256.png`,
    `${BASE_PATH}icons/web-512x512.png`  
];

//2. Install -> Se ejecuta al instalar el SW
self.addEventListener("install", event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=> cache.addAll(urlsToCache))
    );
});

//3. Activate -> se ejecuta al activarse (limpia caches viejas)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys=>
            Promise.all(
                keys.filter(key=>key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

// 4.FETCH -> se ejecuta cada vez que se haga una petición al servidor
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
})
);
});