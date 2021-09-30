//  Authors : Maye Edwin & Marta Wiśniewska
// Copyright : https://pwafire.org
class PWA {
  // Copy text...
  async copyText(text: string) {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        // Copied...
        return { success: true, message: 'Copied' };
      } else {
        return {
          success: false,
          message: 'Copy Text not supported',
        };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Copy image
  async copyImage(imgURL: RequestInfo) {
    try {
      if (navigator.clipboard) {
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
      } else {
        return { success: false, message: 'Copy Image not supported' };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Web Share...
  async Share(data: { title: string; text: string; url: string }) {
    try {
      // Check support...
      if (navigator.share) {
        await navigator.share(data);
        // Shared...
        return { success: true, message: 'Shared' };
      } else {
        return { success: false, message: 'Web Share not supported' };
      }
    } catch (error) {
      // Error..
      throw error;
    }
  }

  // Share files...
  async shareFiles({ files, title, text }: { files: File[]; title: string; text: string }) {
    try {
      if (navigator.canShare && navigator.canShare({ files: files })) {
        await navigator.share({
          files: files,
          title: title,
          text: text,
        });
        return { success: true, message: 'Shared' };
      } else {
        return { success: false, message: 'Share Files not supported' };
      }
    } catch (error) {
      throw error;
    }
  }

  // Contacts Picker...
  async Contacts(
    props: string[],
    options?: {
      multiple: boolean;
    },
  ) {
    try {
      if ('contacts' in navigator && 'ContactsManager' in window) {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return { success: true, message: 'Selected', contacts };
      } else {
        return { success: false, message: 'Contacts picker not supported' };
      }
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
      if (navigator.setAppBadge) {
        await navigator.setAppBadge(unreadCount);
        return { success: true, message: 'Set' };
      } else {
        return {
          success: false,
          message: 'Badging not supported',
        };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Clear badge...
  async clearBadge() {
    try {
      if (navigator.clearAppBadge) {
        await navigator.clearAppBadge();
        return { success: true, message: 'Cleared' };
      } else {
        return { success: false, message: 'Badging not supported' };
      }
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
        return { success: false, message: 'Fullscreen disabled' };
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
      if ('Notification' in window) {
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
      } else {
        // Error...
        return { success: false, message: 'Notification not supported' };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Install...
  Install(button: HTMLElement) {
    try {
      if (navigator.serviceWorker) {
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
      } else {
        // Error...
        return { success: false, message: 'Service Worker not supported' };
      }
    } catch (error) {
      throw error;
    }
  }

  // Wakelock...
  async WakeLock() {
    try {
      if ('wakeLock' in navigator) {
        const wakeLock = await navigator.wakeLock.request('screen');
        if (wakeLock) {
          return { success: true, message: 'WakeLock Active' };
        } else {
          return { success: false, message: 'WakeLock Failed' };
        }
      } else {
        return { success: false, message: 'WakeLock not supported' };
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
      if (file) {
        const typeList = file.type.split('/');
        if (typeList.includes('text')) {
          const contents = await file.text();
          return { success: true, message: 'File picked', contents };
        } else {
          return { success: false, message: 'File Picker not supported' };
        }
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
      if (file) {
        return {
          file: file,
          success: true,
          message: 'File picked',
        };
      } else {
        return {
          file: null,
          success: false,
          message: 'File Picker not supported',
        };
      }
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
      if (paymentRequest) {
        const paymentResponse = await paymentRequest.show();
        // Validate with backend...
        validatePayment(paymentResponse);
        return { success: true, message: 'Payment' };
      } else {
        return { success: false, message: 'Payment not supported' };
      }
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
