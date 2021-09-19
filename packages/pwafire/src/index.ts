//  Authors : Maye Edwin & Marta Wiśniewska
// Copyright : https://pwafire.org
class PWA {
  // Copy text...
  async copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      // Copied...
      return { success: true, message: 'Copied' };
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Copy image
  async copyImage(imgURL: RequestInfo) {
    try {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      const result = (await navigator.clipboard.write([
        new ClipboardItem(
          Object.defineProperty({}, blob.type, {
            value: blob,
            enumerable: true,
          }),
        ),
      ])) as any;
      return result ? { success: true, message: 'Copied' } : { success: false, message: 'Fail' };
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Web Share...
  async Share(data: object) {
    // Check support...
    try {
      await navigator.share(data);
      // Shared...
      return { success: true, message: 'Shared' };
    } catch (error) {
      // Error..
      throw error;
    }
  }

  // Contacts Picker...
  async Contacts(props: object, options: object) {
    try {
      // const supported = 'contacts' in navigator && 'ContactsManager' in window;
      const contacts = await navigator.contacts.select(props, options);
      // Return contacts...
      return { success: true, message: 'Selected', contacts };
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Connectivity...
  Connectivity(online: () => 'online', offline: () => 'offline') {
    // Once the DOM is loaded, check for connectivity...
    try {
      if (navigator.onLine) {
        online();
        return { success: true, message: 'Online' };
      } else {
        offline();
        return { success: true, message: 'Offline' };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Set badge...
  async setBadge(unreadCount: number) {
    try {
      await navigator.setAppBadge(unreadCount);
      return { success: true, message: 'Set' };
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Clear badge...
  async clearBadge() {
    try {
      // Clear the badge
      await navigator.clearAppBadge();
      return { success: true, message: 'Cleared' };
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Fullscreen...
  async Fullscreen() {
    try {
      if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
        return { success: true, message: 'Fullscreen' };
      } else {
        // Error...
        return { success: false, error: {} };
      }
    } catch (error) {
      // Error...
      throw error;
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
          return { success: true, message: 'Sent' };
        });
      } else {
        // Denied...
        return { success: true, message: 'Denied' };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Install...
  Install(button: HTMLElement) {
    try {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        // Stash the event so it can be triggered later.
        window.deferredPrompt = event;
      });

      // Install...
      button.addEventListener('click', () => {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
          return null;
        }
        // Show the install prompt...
        promptEvent.prompt();
        // Log the result
        promptEvent.userChoice.then((result: any) => {
          // Reset the deferred prompt variable...
          window.deferredPrompt = null;
          // Hide the install button...
        });
      });

      // Installed....
      window.addEventListener('appinstalled', (event: any) => {
        // Installed...
      });
    } catch (error) {
      throw error;
    }
  }

  // Wakelock...
  async WakeLock() {
    // The wake lock sentinel.
    let wakeLock: null;
    try {
      wakeLock = await navigator.wakeLock.request('screen');
      if (wakeLock) {
        return { success: true, message: 'Active' };
      }
    } catch (error) {
      throw error;
    }
  }

  // Visibility...
  Visibility(isVisible: () => void, notAvailable: () => void) {
    try {
      if (document.visibilityState) {
        const state = document.visibilityState;
        if (state === 'visible') {
          // Call back function...
          isVisible();
          return { success: true, message: 'Visible' };
        }
      } else {
        // Alternative...
        notAvailable();
        return {
          success: false,
          message: 'Not supported',
        };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Pick text file..
  async pickTextFile() {
    let fileHandle;
    try {
      [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const typeList = file.type.split('/');
      if (typeList.includes('text')) {
        const contents = await file.text();
        return { success: true, message: 'File picked', contents };
      } else {
        // Please pick text type file
        return { success: false, message: 'Please pick text type file' };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Pick any file...
  async pickFile() {
    let fileHandle: any;
    try {
      [fileHandle] = await window.showOpenFilePicker();
      const file: any = await fileHandle.getFile();
      return {
        file: file ?? null,
        success: true,
        message: 'File picked',
      };
    } catch (error) {
      throw error;
    }
  }
  // Payment...
  async Payment(
    paydata: { paymentMethods: PaymentMethodData[]; paymentDetails: PaymentDetailsInit; options: any },
    validatePayment: (arg0: PaymentResponse) => void,
  ) {
    // Initiate user interface...
    try {
      const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
      const paymentResponse = await paymentRequest.show();
      // Validate with backend...
      validatePayment(paymentResponse);
    } catch (error) {
      throw error;
    }
  }
}

// Create pwafire object...
const pwafire = {
  pwa: new PWA(),
};

// Exports...
const pwa = pwafire.pwa;
export { pwafire, pwa };
export default pwafire;
