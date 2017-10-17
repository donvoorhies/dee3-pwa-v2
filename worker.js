/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function() {
  'use strict';

  var filesToCache = [
  '.',
 		"index.html",
        "worker.js",
        "DJ_DON.jpg",
        "about.html",
        "tos.html",
        "offline.html",
        "offline.svg",
        "android-launchericon-48-48.webp",
        "android-launchericon-72-72.webp",
        "android-launchericon-96-96.webp",
        "android-launchericon-144-144.webp",
        "android-launchericon-192-192.webp",
        "android-launchericon-192-192.png",
        "android-launchericon-512-512.webp",
        "ios-appicon-76-76.png",
        "ios-appicon-120-120.png",
        "ios-appicon-152-152.png",
        "ios-appicon-180-180.png",
        "ios-appicon-1024-1024.png"

];

var staticCacheName = 'pages-cache-v0';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

  self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

     .then(function(response) {

  // TODO 5 - Respond with custom 404 page

  return caches.open(staticCacheName).then(function(cache) {
    if (event.request.url.indexOf('test') < 0) {
      cache.put(event.request.url, response.clone());
    }
    return response;
  });
});

    }).catch(function(error) {

		console.log('Error, ', error);
        return caches.match('offline.html');
    })
  );
});

  self.addEventListener('activate', function(event) {
  console.log('Activating new service worker...');
var staticCacheName = 'pages-cache-v1';
  var cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


})();
