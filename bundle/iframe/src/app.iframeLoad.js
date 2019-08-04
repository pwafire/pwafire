// Learn more at : https://pwafire.org
  let loadIframe = document.querySelector('.load-iframe');
  let offlineAlert = document.querySelector('.offline-alert');

  // once the DOM is loaded, check for connectivity status
  document.addEventListener('DOMContentLoaded', (event) => {
      if (!navigator.onLine) {
          const goOffline = () => {
              loadIframe.style.display = "none";
              offlineAlert.innerHTML = `<p>Whooah...could not load iframe 😞, 
              you need to be connected!</p>`;
          }
           goOffline();
      } else {
          offlineAlert.style.display = "none";
      }
  });
