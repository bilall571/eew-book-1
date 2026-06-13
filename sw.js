const CACHE_NAME = 'eew-offline-v1';
const OFFLINE_URL = 'offline.html';
const ASSETS_TO_CACHE = [
    OFFLINE_URL,
    'index.html',
    'style.css',
    'script.js',
    './sounds/correct.mp3',
    './sounds/wrong.mp3'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
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
