
### [Adding background sync support]()

[**Service workers**](https://pwafire.org/developer/docs/service-worker/) solve the page loading part by letting you serve content from a cache. But what about when the page needs to send something to the server  😲 ?

### [What could I use background sync for?]()

Use it to schedule any data sending that you care about beyond the life of the page. Chat messages, emails, document updates, settings changes, photo uploads. Anything that you want to reach the server even if user navigates away or closes the tab. 

The page could store these in an "outbox" store in **indexedDB**, and the **service worker** would retrieve them, and send them on connection to the internet. Although, you could also use it to fetch small bits of data as well 😉 😊 😋

### [We shall be adding the codelab below]()

[PWA Fire Bundle ](https://github.com/mayeedwin/pwafire/tree/master/pwafire-bundle) Background Sync is activated once your page is loaded by default. Though you could re-configure this to anything. Maybe listen to events like on **click** with javascript.

### [How to configure]()

To your javascript source folder, create an empty **sync.js** file and copy the [following code snippet](https://github.com/mayeedwin/pwafire/blob/master/pwafire-bundle/background-sync/js/sync.js) to it. 
Remember to add it to your pages at the botton of your project's pages as hown below 😊 

```html

<!-- Add background sync -->
<script src="js/sync.js"></script>

```
