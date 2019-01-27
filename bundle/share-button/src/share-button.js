
/* 
add share button
*/

const buttonInstall = document.getElementById('buttonInstall');

if ('share' in navigator) {
  console.log('👍', 'navigator.share is supported');
  buttonShare.removeAttribute('disabled');
  buttonShare.addEventListener('click', (e) => {
    console.log('👍', 'buttonShare-clicked', e);
    e.preventDefault();
    const shareOpts = {
      // add your app's meta info
      title: 'PWAFire.Org',
      text: 'Learn how to build Progressive Web Apps',
      url: 'https://pwafire.org/',
    };
    navigator.share(shareOpts)
        .then((e) => {
          const msg = 'navigator.share succeeded.';
          divResult.textContent = msg;
          console.log('👍', msg, e);
        })
        .catch((err) => {
          const msg = 'navigator.share failed';
          divResult.textContent = `${msg}\n${JSON.stringify(err)}`;
          console.error('👎', msg, err);
        });
  });
} 
 else  {
  console.warn('👎', 'navigator.share is not supported');
   
   
