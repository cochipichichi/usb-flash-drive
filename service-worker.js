
const CACHE_NAME = 'usb-xr-lab-v1';
const CORE_ASSETS = [
  'index.html',
  'estudiante.html',
  'login-docente.html',
  'docente.html',
  'css/styles.css',
  'js/accessibility.js',
  'js/main.js',
  'js/quiz.js',
  'js/docente.js',
  'manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((resp) => {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return resp;
      }).catch(() => cached);
    })
  );
});
