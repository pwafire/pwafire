                 /* 
  offline.js by https://pwafire.org/developer/ 
  */

  // Our navbar has a class name called "navbar"
  var navbarElement = document.querySelector('.navbar');

  // Once the DOM is loaded, check for connectivity
  document.addEventListener('DOMContentLoaded', function(event) {
    if (!navigator.onLine) {
    goOffline();
  }

      //Offline Event
      function goOffline() {
      // Change the color of navbar to #fafafa when offline [1]
      navbarElement.style.background = '#fafafa';

      // Add the snackbar to show when offline [2]
      document.getElementById("snackbar").innerHTML = "You are offline ⚡️";
      var snackbar = document.getElementById("snackbar");
      // Add the "show" class to div
      snackbar.className = "show";
      // After 5 seconds, remove the show class from div
      setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
      }

      // Online Event
      window.addEventListener("online", function () {
      // Change the color of navbar to #fff when online [1]
      navbarElement.style.background = '#fff';

      // Add the snackbar to show we're back online [2]
      document.getElementById("snackbar").innerHTML = "You're back online ⚡️⚡️⚡️";
      var snackbar = document.getElementById("snackbar");
      // Add the "show" class to div
      snackbar.className = "show";
      // After 5 seconds, remove the show class from div
      setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
    });
  
  });
