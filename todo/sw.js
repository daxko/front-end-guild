'use strict';

var cacheUrls = [
  '/',
  '/css/global.css',
  '/js/global.js'
];

var cacheVersion = 'v1';

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(cacheVersion).then(function(cache) {
    return cache.addAll(cacheUrls);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        caches.open(cacheVersion).then(function(cache) {
          cache.put(event.request.clone(), response.clone());
        });

        return response;
      })
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
