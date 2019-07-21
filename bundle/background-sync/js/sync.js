
// learn more at : https://pwafire.org
((window) => {
    'use strict';
    // Add background sync on page load
    document.addEventListener("DOMContentLoaded", () => {
      window.registerBGSync();
    });
    // Exposing `registerSync()` globally for only development purpose
    window.registerBGSync = () => {
      //If `serviceWorker` is registered and ready
      navigator.serviceWorker.ready
        .then((registration) => {
          //Registering `background sync` event
          return registration.sync.register('Comments') 
           // `Comments` is sync tag name ; could be anything 😉
            .then((rs) => {
              console.info('Background sync registered!');
            }, () => {
              console.error('Background sync registered failed.');
            });
  
        });
    }
  })(window);

