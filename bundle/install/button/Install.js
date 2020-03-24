
/* add custom install banner @mayeedwin @pwafire 2020 */
const buttonInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  buttonInstall.removeAttribute('disabled');
});

buttonInstall.addEventListener('click', () => {
  console.log('👍', 'buttonInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then((result) => {
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since 
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    buttonInstall.setAttribute('disabled', true);
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'App successfully installed', event);
});
