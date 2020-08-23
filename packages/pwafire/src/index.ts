//  Authors : Maye Edwin & Marta Wiśniewska @copyright : https://pwafire.org
class PWA {
  // Copy text...
  async copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // Copied...
      return { type: 'success', message: `Copied` };
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Copy image
  async copyImage(imgURL: RequestInfo) {
    try {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      const result = await navigator.clipboard.write([
        new ClipboardItem(
          Object.defineProperty({}, blob.type, {
            value: blob,
            enumerable: true,
          }),
        ),
      ]);
      return result ? { type: 'success', message: `Copied` } : { type: 'fail', message: `Fail` };
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Web Share...
  async Share(data: object) {
    // Check support...
    try {
      if (navigator.share) {
        navigator
          .share(data)
          .then(() => {
            // Shared...
            return { type: 'success', message: `Shared` };
          })
          .catch((error) => {
            // Error..
            return { error, type: 'fail', message: `Failed` };
          });
      } else {
        // No support...
        return {
          type: 'fail',
          error: {
            message: `Not supported`,
          },
        };
      }
    } catch (error) {
      // Error..
      return { error, type: 'fail', message: `Failed` };
    }
  }

  // Contacts Picker...
  async Contacts(props: object, options: object) {
    try {
      const supported = 'contacts' in navigator && 'ContactsManager' in window;
      if (supported) {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return { type: 'success', message: 'Selected', contacts };
      }
      return { type: 'fail', message: 'Not supported' };
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Connectivity...
  Connectivity(online: () => void, offline: () => void) {
    // Once the DOM is loaded, check for connectivity...
    try {
      if (navigator.onLine) {
        online();
        return { type: 'success', message: `Online` };
      } else {
        offline();
        return { type: 'success', message: `Offline` };
      }
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Set badge...
  async setBadge(unreadCount: number) {
    try {
      await navigator.setAppBadge(unreadCount);
      return { type: 'success', message: 'Set' };
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Clear badge...
  async clearBadge() {
    try {
      // Clear the badge
      await navigator.clearAppBadge();
      return { type: 'success', message: 'Cleared' };
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Fullscreen...
  async Fullscreen() {
    try {
      if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
        return { type: 'success', message: 'Fullscreen' };
      }
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Notification...
  async Notification(data: { title: string; options: object }) {
    const { title, options } = data;
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
          // Sent...
          return { type: 'success', message: `Sent` };
        });
      } else {
        // Denied...
        return { type: 'success', message: `Denied` };
      }
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Install...
  Install() {
    try {
      // Listen...
      window.addEventListener('beforeinstallprompt', (event: any) => {
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;
      });
      // Get prompt event...
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        return { type: 'fail', message: 'Fail' };
      } else {
        // Show the install prompt...
        promptEvent.prompt();
        // Log the result
        promptEvent.userChoice.then((result: any) => {
          // prompt() can only be called once.
          window.deferredPrompt = null;
          // Hide the install button.
        });
        // Notify...
        window.addEventListener('appinstalled', (event: any) => {
          return { type: 'success', message: 'Installed' };
        });
      }
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Wakelock...
  async WakeLock() {
    // The wake lock sentinel.
    let wakeLock:null;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      if(wakeLock) {
        return { type: 'success', message: 'Active' };
      }
    } catch (err) {
      return { type: 'fail', message: 'Fail', err };
    }
  }

  // Visibility...
  Visibility(isVisible: () => void, notAvailable: () => void) {
    try {
      if (document.visibilityState) {
        const state = document.visibilityState;
        if (state === `visible`) {
          // Call back function...
          isVisible();
          return { type: 'success', message: `Visible` };
        }
      } else {
        // Alternative...
        notAvailable();
        return {
          type: 'fail',
          message: `Not supported`,
        };
      }
    } catch (error) {
      // Error...
      return { type: 'fail', error };
    }
  }

  // Payment...
  async Payment(
    paydata: {
      paymentMethods: PaymentMethodData[];
      paymentDetails: PaymentDetailsInit;
      options: PaymentOptions | undefined;
    },
    validatePayment: (arg0: PaymentResponse) => void,
  ) {
    // Initiate user interface...
    try {
      const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails, paydata.options);
      const paymentResponse = await paymentRequest.show();
      // Validate with backend...
      validatePayment(paymentResponse);
    } catch (error) {
      return { type: 'fail', error };
    }
  }
}

// Create pwafire object
const pwafire = {
  pwa: new PWA(),
};

// Export...
export default pwafire;
