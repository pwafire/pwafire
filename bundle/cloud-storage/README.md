## Approach : Matching a Route with a Regular Expression
When you have a set of URLs that you want to route as a group, regular expressions are the best way to go. The regular expression provided is tested against the full URL. If there's a match, the route will be triggered. 
This provides a lot of flexibility as to how you use it. 

Note : `Excerpt from Workbox Docs`

### Config
In this case we want to cache all resources stored in **Google Cloud** storage. Copy the code snippet in [the src folder](https://github.com/mayeedwin/pwafire/tree/master/bundle/cloud-storage/src) inside your 
[Workbox Service Worker](https://github.com/mayeedwin/pwafire/blob/master/bundle/workbox/src/service-worker.js) 

Read more about [Matching a Route with a Regular Expression](https://developers.google.com/web/tools/workbox/guides/route-requests) in Workbox.
