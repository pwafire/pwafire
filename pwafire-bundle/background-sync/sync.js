
/**
 * Copyright 2018 PWAFire.Org Authored. All Rights Reserved.
 */
(function (window) {
    'use strict';
    // Add background sync on page load
    document.addEventListener("DOMContentLoaded", function() {
      window.registerBGSync();
    });
    // Exposing `registerSync()` globally for only development purpose
    window.registerBGSync = function() {
      //If `serviceWorker` is registered and ready
      navigator.serviceWorker.ready
        .then(function (registration) {
          //Registering `background sync` event
          return registration.sync.register('Comments') 
           // `Comments` is sync tag name ; could be anything 😉
            .then(function (rs) {
              console.info('Background sync registered!');
            }, function () {
              console.error('Background sync registered failed.');
            });
  
        });
    }
  })(window);
