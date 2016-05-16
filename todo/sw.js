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
    caches.match(event.request).then(function(response) {

      if(response) {
        return response;
      }

      var fetchRequest = event.request.clone();
      fetch(fetchRequest).then(function(response) {

        if(!response || response.status !== 200) {
          return response;
        }

        caches.open(cacheVersion).then(function(cache) {
          cache.put(event.request.clone(), response.clone());
        });
      });

      return response;
    })
  );
});