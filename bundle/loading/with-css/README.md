## Progressive loading with pure CSS

We all know that JavaScript is the most expensive budget item for your JavaScript Apps. Using APIs such as [Intersertion Observe API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) 
would mean more JavaScript and therefore needs a very on-demand use in your Apps. 


### Why CSS Transitions

   - CSS Transitions allows you to change property values smoothly, over a given duration and we can use this enabler to 
   smoothly render dynamic Frontend elements such as list items with for example data rendered from Firebase Cloud Firestore.

   -  This allows the user not to have a glance of any delay in rendering of the Frontend that might be experienced. The user feels part
   of whatever transitions in display that happens at every page load. 
   
   - If your main goal is to solve the delayed loading experiences in your App then using CSS Transitions such as Fadein 
   will be great for you to use.
   
 ### Setting up
 
   - In your say `./styles` folder, create an empty style asset name `Fade.css` and copy [this code snippet](https://github.com/pwafire/pwafire/blob/master/bundle/loading/with-css/Fade.css) it.
   
   - Now add the following code snipppet to your target element, section e.g `li`- the source styling [is available here](https://github.com/pwafire/pwafire/blob/master/bundle/loading/with-css/Component.css)
   
   ```css 
      li {
         /* other
         ....
         stylings */
         -webkit-animation: fadein 2s; /* safari, chrome and opera > 12.1 */
         -moz-animation: fadein 2s; /* firefox < 16 */
         -ms-animation: fadein 2s; /* internet explorer */
         -o-animation: fadein 2s; /* opera < 12.1 */
         animation: fadein 2s;
       }
   ```




