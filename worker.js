/*http://deanhume.com/Home/BlogPost/create-a-really--really-simple-offline-page-using-service-workers/10135
https://github.com/deanhume/Service-Worker-Offline*/
'use strict';
var cacheVersion=1,currentCache={offline:"offline-cache"+cacheVersion},offlineUrl="offline.html";this.addEventListener("install",function(a){a.waitUntil(caches.open(currentCache.offline).then(function(a){return a.addAll([offlineUrl])}))});this.addEventListener("fetch",function(a){"navigate"===a.request.mode||"GET"===a.request.method&&a.request.headers.get("accept").includes("text/html")?a.respondWith(fetch(a.request.url)["catch"](function(a){return caches.match(offlineUrl)})):a.respondWith(caches.match(a.request).then(function(b){return b||fetch(a.request)}))});
