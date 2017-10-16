/*http://deanhume.com/Home/BlogPost/create-a-really--really-simple-offline-page-using-service-workers/10135
https://github.com/deanhume/Service-Worker-Offline*/
'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          'offline.html',
          offlineUrl
      ]);
    })
  );
});
