/* check if the Network Information API is supported 
/ available */
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
