### [description]()

When your page links to another page using **target="_blank"**, the new page runs on the same process as your page. 
If the new page is executing expensive JavaScript, your page's performance may also suffer.

**target="_blank"** is also a security vulnerability. The new page has access to your window object via window.opener, 
and it can navigate your page to a different URL using **window.opener.location = newURL**

### [to solve, play safe]()

Add **rel="noopener"** or **rel="noreferrer"** to each of the links that Lighthouse has identified in your report. In general, 
always add one of these attributes when you open an external link in a new window or tab.

[Get started here >>>](https://github.com/mayeedwin/pwafire/blob/master/resources/url-parameters/index.html) and learn more of
these url parameters [on this site here](https://html.spec.whatwg.org/multipage/links.html)
