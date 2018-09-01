**Adding background sync support**
[**Service workers**](https://pwafire.org/developer/docs/service-worker/) solve the page loading part by letting you serve content from a cache. But what about when the page needs to send something to the server  😲 ?

**What could I use background sync for?**
Use it to schedule any data sending that you care about beyond the life of the page. Chat messages, emails, document updates, settings changes, photo uploads. Anything that you want to reach the server even if user navigates away or closes the tab. 

The page could store these in an "outbox" store in **indexedDB**, and the **service worker** would retrieve them, and send them on connection to the internet. Although, you could also use it to fetch small bits of data as well 😉 😊 😋

**We shall be adding the codelab below**
[PWA Fire Bundle ](https://github.com/mayeedwin/pwafire/tree/master/pwafire-bundle) Background sync is activated once your page is loaded by default. Though you could re-configure this to anything. Maybe listen to events like on **click** with javascript.

