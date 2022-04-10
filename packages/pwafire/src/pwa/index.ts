// PWA class => project fugu and other apis...
import { check } from "../";
class PWA {
  // Copy text...
  async copyText(text: string) {
    try {
      const supported = await check.copyText();
      if (supported) {
        await navigator.clipboard.writeText(text);
        // Copied...
        return { ok: true, message: "Copied" };
      } else {
        return {
          ok: false,
          message: "Copy Text API not supported",
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
      const supported = await check.copyImage();
      if (supported) {
        const data = await fetch(imgURL);
        const blob = await data.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        return {
          ok: true,
          message: "Image copied",
        };
      } else {
        return { ok: false, message: "Copy Image API not supported" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Web Share...
  async Share(data: ShareData) {
    try {
      const canShareFiles = await check.shareFiles();
      const share = await check.Share();
      if (data.files) {
        if (canShareFiles && navigator.canShare(data)) {
          await navigator.share(data);
          return { ok: true, message: "Shared" };
        } else {
          return { ok: false, message: "Files Share API not supported" };
        }
      } else {
        // Check support...
        if (share) {
          await navigator.share(data);
          // Shared...
          return { ok: true, message: "Shared" };
        } else {
          return { ok: false, message: "Web Share API not supported" };
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
      const supported = await check.Contacts();
      if (supported) {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return { ok: true, message: "Selected", contacts };
      } else {
        return { ok: false, message: "Contacts Picker API not supported" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Connectivity...
  async Connectivity(online: () => "online", offline: () => "offline") {
    // Once the DOM is loaded, check for connectivity...
    try {
      const isOnline = await check.onlineStatus();
      if (isOnline) {
        online();
        return { ok: true, message: "Device is online" };
      } else {
        offline();
        return { ok: true, message: "Device is offline" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Set badge...
  async setBadge(unreadCount: number) {
    try {
      const supported = await check.Badging();
      if (supported) {
        await navigator.setAppBadge(unreadCount);
        return { ok: true, message: "Set" };
      } else {
        return {
          ok: false,
          message: "Badging API not supported",
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
      const supported = await check.Badging();
      if (supported) {
        await navigator.clearAppBadge();
        return { ok: true, message: "Cleared" };
      } else {
        return { ok: false, message: "Badging API not supported" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Content Indexing...
  async contentIndexing() {
    try {
      const registration = (await navigator.serviceWorker.ready) as any;
      const supported = await check.contentIndexing();
      if (supported) {
        return {
          ok: true,
          getAll: async () => {
            try {
              return (await registration.index.getAll()) as {
                [key: string]: string | number | boolean | object | any;
              }[];
            } catch (error) {
              throw error;
            }
          },
          addItem: async (item: {
            id: string;
            title: string;
            // Optional; valid categories are currently:
            // 'homepage', 'article', 'video', 'audio', or '' (default).
            category?: "homepage" | "article" | "video" | "audio" | "";
            description: string;
            icons: {
              src: string;
              sizes: string;
              type: string;
            }[];
            url: string;
          }) => {
            try {
              // Add to content index...
              await registration.index.add({
                ...item,
                category: item.category || "",
              });
              return { ok: true, message: "Added" };
            } catch (error) {
              throw error;
            }
          },
          removeItem: async (id: string) => {
            try {
              await registration.index.delete(id);
              return { ok: true, message: "Removed" };
            } catch (error) {
              throw error;
            }
          },
          message: "Context Indexing ready",
        };
      } else {
        return {
          ok: false,
          message: "Content Indexing API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Fullscreen...
  async Fullscreen() {
    try {
      if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
        return { ok: true, message: "Fullscreen" };
      } else {
        // Error...
        return { ok: false, message: "Fullscreen disabled" };
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
      const supported = await check.Notifications();
      if (supported) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, options);
            // Sent...
            return { ok: true, message: "Sent" };
          });
        } else {
          // Denied...
          return { ok: true, message: "Denied" };
        }
      } else {
        // Error...
        return { ok: false, message: "Notification API not supported" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Install...
  async Install(button: HTMLElement) {
    try {
      const supported = await check.serviceWorker();
      if (supported) {
        window.addEventListener("beforeinstallprompt", (event: any) => {
          // Stash the event so it can be triggered later...
          window.deferredPrompt = event;
        });

        // Install...
        button.addEventListener("click", () => {
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
        window.addEventListener("appinstalled", (event: any) => {
          // Installed...
        });
      } else {
        // Error...
        return { ok: false, message: "Service Worker not supported" };
      }
    } catch (error) {
      throw error;
    }
  }

  // Idle detection...
  async idleDetection(
    action = "start",
    callback = () => {
      // Idle...
    },
    threshold = 60000,
  ) {
    try {
      //  Idle Detection...
      const supported = await check.idleDetection();
      if (supported) {
        // Make sure "idle-detection" permission is granted...
        const state = await IdleDetector.requestPermission();
        if (state === "granted") {
          // Permission granted...
          const controller = new AbortController();
          const signal = controller.signal;
          const idleDetector = new IdleDetector();
          idleDetector.addEventListener("change", () => {
            const userState = idleDetector.userState;
            // const screenState = idleDetector.screenState;
            // Handle states...
            if (userState === "idle") {
              callback();
            } else {
              // Do nothing...
            }
          });
          // Handle detector...
          if (action === "start") {
            // Start...
            await idleDetector.start({
              threshold: threshold > 60000 ? threshold : 60000,
              signal,
            });
            return { ok: true, message: "Started" };
          } else {
            // Abort...
            controller.abort();
            return { ok: true, message: "Aborted" };
          }
        } else {
          // Need to request permission first...
          return { ok: false, message: "Need to request permission first" };
        }
      } else {
        // Not supported...
        return { ok: false, message: "Idle Detection API not supported" };
      }
    } catch (error) {
      throw error;
    }
  }

  // Wakelock...
  async wakeLock() {
    try {
      const supported = await check.wakeLock();
      if (supported) {
        const wakeLock = await navigator.wakeLock.request("screen");
        if (wakeLock) {
          return { ok: true, message: "WakeLock Active" };
        } else {
          return { ok: false, message: "WakeLock Failed" };
        }
      } else {
        return { ok: false, message: "WakeLock API not supported" };
      }
    } catch (error) {
      throw error;
    }
  }

  // Visibility...
  async Visibility(isVisible: () => void, notAvailable: () => void) {
    try {
      if (document.visibilityState) {
        const state = document.visibilityState;
        if (state === "visible") {
          // Call back function...
          isVisible();
          return { ok: true, message: "Visible" };
        }
      } else {
        // Alternative...
        notAvailable();
        return {
          ok: false,
          message: "Visibility API not supported",
        };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Pick text file..
  async pickTextFile() {
    try {
      let fileHandle;
      [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      if (file) {
        const typeList = file.type.split("/");
        if (typeList.includes("text")) {
          const contents = await file.text();
          return { ok: true, message: "File picked", contents };
        } else {
          return { ok: false, message: "File Picker API not supported" };
        }
      } else {
        // Please pick text type file
        return { ok: false, message: "Please pick text type file" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  // Pick any file...
  async pickFile() {
    try {
      let fileHandle: any;
      [fileHandle] = await window.showOpenFilePicker();
      const file: any = await fileHandle.getFile();
      if (file) {
        return {
          file,
          ok: true,
          message: "File picked",
        };
      } else {
        return {
          file: null,
          ok: false,
          message: "File Picker API not supported",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Payment...
  async Payment(
    paydata: {
      paymentMethods: PaymentMethodData[];
      paymentDetails: PaymentDetailsInit;
      options: any;
    },
    validatePayment: (arg0: PaymentResponse) => void,
  ) {
    // Initiate user interface...
    try {
      const paymentRequest = new PaymentRequest(paydata.paymentMethods, paydata.paymentDetails);
      if (paymentRequest) {
        const canPay = await paymentRequest.canMakePayment();
        if (canPay) {
          const paymentResponse = await paymentRequest.show();
          // Validate with backend...
          validatePayment(paymentResponse);
          return { ok: true, message: "Payment" };
        } else {
          return { ok: false, message: "Payment method(s) not supported" };
        }
      } else {
        return { ok: false, message: "Payment Request API not supported" };
      }
    } catch (error) {
      throw error;
    }
  }
}
// Export pwa class...
export default PWA;
