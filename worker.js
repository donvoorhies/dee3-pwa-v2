//http://deanhume.com/Home/BlogPost/create-a-really--really-simple-offline-page-using-service-workers/10135
//https://github.com/deanhume/Service-Worker-Offline
//var cacheVersion=1,currentCache={offline:"offline-cache"+cacheVersion},offlineUrl="offline.html";this.addEventListener("install",function(a){a.waitUntil(caches.open(currentCache.offline).then(function(a){return a.addAll([offlineUrl])}))});this.addEventListener("fetch",function(a){"navigate"===a.request.mode||"GET"===a.request.method&&a.request.headers.get("accept").includes("text/html")?a.respondWith(fetch(a.request.url)["catch"](function(a){return caches.match(offlineUrl)})):a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))});
self.addEventListener('install', function(event) {
  var offlinePage = new Request('offline.html');
  event.waitUntil(
  fetch(offlinePage).then(function(response) {
    return caches.open('pwabuilder-offline').then(function(cache) {
      console.log('[PWA Builder] Cached offline page during Install'+ response.url);
      return cache.put(offlinePage, response);
    });
  }));
});

//If any fetch fails, it will show the offline page.
//Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
        console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
        return caches.open('pwabuilder-offline').then(function(cache) {
          return cache.match('offline.html');
      });
    }));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline').then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
