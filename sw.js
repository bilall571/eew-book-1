const CACHE_NAME = 'eew-offline-v1';
const OFFLINE_URL = 'offline.html';

// Saytga kirganda offline.html ni keshga (xotiraga) saqlab oladi
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.add(OFFLINE_URL);
        })
    );
});

// Qachonki internet yo'q bo'lsa va user qayergadir kirmoqchi bo'lsa, o'sha keshdagi faylni beradi
self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
    }
});
