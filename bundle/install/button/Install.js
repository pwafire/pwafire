/* add custom install banner @mayeedwin @pwafire 2020 */
const installButton = document.getElementById('install');

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'Before Install Prompt');
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  // installButton.removeAttribute('disabled');
});

installButton.addEventListener('click', () => {
  console.log('👍', 'Install Button Clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available, so pwa exists
    console.log(`App Exists`);
    installButton.innerHTML = `<i class="fas fa-tablet-alt"></i>&nbsp;&nbsp;Already Installed`
    return installed;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then((result) => {
    console.log('👍', 'User Choice', result);
    // Reset the deferred prompt variable, since 
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
  });
});

window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'App successfully installed', event);
});
