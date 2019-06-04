## Hey people 👋, here is what's coming up next.

 - 🔶 How to handle media files putting TTI first with assets like videos 

 - 🔶 Snippet guide on using @workboxjs to best do the above as well 

As a result of [a conversation](https://twitter.com/thula__/status/1130952218667048961?s=09) I had with [@mikegeyser](https://twitter.com/mikegeyser), [@thula__](https://twitter.com/thula__) and 
[@fadzayic](https://twitter.com/fadzaic)

### Try it out

We have an awesome codelab at we.dev. [See it live here](https://web.dev/codelab-adapt-video-to-image-serving-based-on-network-quality/)

### handle-media.js

```javascript 

/* check if the Network Information API is supported / available */
if (navigator.connection.effectiveType === '4G') {
// load a video on 4G network
  const video = document.getElementById('appVideo');
  const videoSource = video.getAttribute('data-src');
  video.setAttribute('src', videoSource);
} else {
// load an image on 3G and less
  const image = document.getElementById('coverImage');
  const imageSource = image.getAttribute('data-src');
  image.setAttribute('src', imageSource);
}


```
