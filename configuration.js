
<!-- pwa fire config file -->

<!-- register service worker -->

	<script>
	
	    if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
    .then(function() { console.log("Service Worker Registered"); });
  }
  
  );
}
  
 </script>
 
<!-- end-of service worker -->

<!-- start-of web manifest -->

<link rel="manifest" href="/manifest.json">

<!-- end-of web manifest -->



