const CACHE_NAME = 'v1';
const ASSETS_TO_CACHE = [
  '/',              // Root of the site
  '/index.html',    // Your main HTML file
  '/script.js',     // Your script file
  '/style.css',    // Your styles (if applicable)
];

// Install event - caching assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serving cached assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Serve the cached version if available, or fetch from the network
      return cachedResponse || fetch(event.request);
    })
  );
});
