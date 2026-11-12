const CACHE_NAME = 'expense-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install Event: Cache the UI files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event: Serve UI from cache, let API calls go to the network
self.addEventListener('fetch', e => {
  // Do not intercept calls to your Google Apps Script
  if (e.request.url.includes('script.google.com')) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
