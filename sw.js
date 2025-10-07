//Estructura básica de un Service Worker

//1.Nombre del caché y archivos a cachear
const CACHE_NAME = "mi-cache-v1";
const urlsToCache = [
    "index.html",
    "offline.html",
    "icons/web-192x192.png",
    "icons/web-512x512.png"  
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