
module.exports = {
  "globDirectory": "build/", // The base directory you wish to match globPatterns against, 
  // relative to the current working directory.
  "globPatterns": [ // Note: Setting globPatterns is often unnecessary when using the workbox-webpack-plugin,
    // which will automatically precache files that are part of the webpack build pipeline by default.
    "**/*.css",
    "index.html",
    "js/animation.js",
    "images/home/*.jpg",
    "images/icon/*.svg",
    "pages/offline.html",
    "pages/404.html"
  ],
  "swSrc": "src/sw.js", // The path and filename of the service worker file that will be created by the build process.
  "swDest": "build/sw.js", // The path to the source service worker file that can contain your own customized code,
  // in addition to containing a match for injectionPointRegexp.
  "globIgnores": [
    "../sw-config.js"
  ]
};