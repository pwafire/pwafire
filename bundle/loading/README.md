## [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

This is a progressive enhancement to the previously working example — Intersection Observer will load target 
images only when the user scrolls down, causing them to display in the viewport.

### Intersection information is needed for many reasons, such as:

 - Lazy-loading of images or other content as a page is scrolled.
 - Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll. 
 - Reporting of visibility of advertisements in order to calculate ad revenues.
 - Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.
 
 Read more in detail [on mdn docs here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
 
We are handling one in our code-snippet, **Lazy-loading of images**

### Setting up

1. Make sure your `<img/>` tags have an empty `src` arttribute and a `data-src` arttribute set to image source url 
as shown in the example below:

```html

<img src="" data-src="./images/logo/jengalogohorizontal.png" alt="loading image.." />

```

2. Create an empty `app.loading.js`in your progressive web app and copy the code snippet in `app.loading.js` to it
[as provided here](https://github.com/mayeedwin/pwafire/blob/master/bundle/loading/src/app.loading.js)

3. To your page's main styles copy the following code snippet to it to style up the loading...

```css

img[data-src] {
  filter: blur(0.2em);
}

img {
  filter: blur(0em);
  transition: filter 0.5s;
}

```

Cheers!
