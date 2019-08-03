// https://pwafire.org : web share

( () => {
    'use strict';
    // check if share API is supported or not
    if (navigator.share !== undefined) {
      document.addEventListener('DOMContentLoaded', () => {
        // select the html element with the class "share"
        var shareBtn = document.querySelector('.share');
        // add share button event listener
        shareBtn.addEventListener('click', (event) => {
          // web share API
          navigator.share({
          // pick the default title of your page in the title tag
            title: document.title,
          // change the text of your share as you may like; to e.g desc of your pwa
            text: 'Text about the shared page...',
            url: window.location.href
          })
          .then(() => {
            console.info('PWA shared successfully!');
          })
          .catch((error) => {
            console.error('Whoa! failed to share : ', error);
          })
        });
      });
    }
  })();
