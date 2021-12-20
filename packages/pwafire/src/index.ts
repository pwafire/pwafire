//  Authors : Maye Edwin & Marta Wiśniewska
// Copyright : https://pwafire.org
declare var ClipboardItem:any;
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
  async copyImage(imgURL: string) {
    try {
      if (navigator.clipboard) {
        const data = await fetch(imgURL);
        const blob = await data.blob();
        const clip: any = navigator.clipboard;
        if (clip && clip.write) {
          await clip.write([
            new ClipboardItem(
              Object.defineProperty({}, blob.type, {
                value: blob,
                enumerable: true,
              }),
            ),
          ]);
          return { success: true, message: 'Copied' };
        } else {
          return {
            success: false,
            message: 'Failed',
          };
        }
      } else {
        return { success: false, message: 'Copy Image not supported' };
      }
    } catch (error) {
      // Error...
      return { success: false, message: 'Fail', error };
    }
  }

  // Web Share...
  async Share(data: ShareData | any) {
    try {
      if (data.files) {
        if (navigator.canShare && navigator.canShare(data)) {
          await navigator.share(data);
          return { success: true, message: 'Shared' };
        } else {
          return { success: false, message: 'Share Files not supported' };
        }
      } else {
        // Check support...
        if (navigator.share) {
          await navigator.share(data);
          // Shared...
          return { success: true, message: 'Shared' };
        } else {
          return { success: false, message: 'Web Share not supported' };
        }
      }
    } catch (error) {
      // Error..
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

  // Idle detection...
  async idleDetection(
    action = 'start',
    callback = () => {
      // Idle...
      console.log('Idle');
    },
    threshold = 60000,
  ) {
    try {
      //  Idle Detection...
      if ('IdleDetector' in window) {
        // Make sure 'idle-detection' permission is granted...
        const state = await IdleDetector.requestPermission();
        if (state === 'granted') {
          // Permission granted...
          const controller = new AbortController();
          const signal = controller.signal;
          const idleDetector = new IdleDetector();
          idleDetector.addEventListener('change', () => {
            const userState = idleDetector.userState;
            const screenState = idleDetector.screenState;
            console.log(`Idle change : ${userState}, ${screenState}.`);
            // Handle states...
            if (userState === 'idle') {
              callback();
            } else {
            }
          });
          // Handle detector...
          if (action === 'start') {
            // Start...
            await idleDetector.start({
              threshold: threshold > 60000 ? threshold : 60000,
              signal,
            });
            return { success: true, message: 'Started' };
          } else {
            // Abort...
            controller.abort();
            return { success: true, message: 'Aborted' };
          }
        } else {
          // Need to request permission first...
          return { success: false, message: 'Need to request permission first' };
        }
      } else {
        // Not supported...
        return { success: false, message: 'Not supported' };
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
          file,
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
