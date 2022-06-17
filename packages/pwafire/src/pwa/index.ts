// PWA class => project fugu and other apis.
class PWA {
  /**
   * Copy text to the clipboard.
   * @method copyText
   */
  async copyText(text: string): Promise<{ ok: boolean; message: string }> {
    try {
      if (navigator.clipboard) {
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

  /**
   * Copy an image to the clipboard.
   * @method copyImage
   */
  async copyImage(imgURL: string) {
    try {
      if (navigator.clipboard) {
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

  /**
   * Share stuff to other apps.
   * @method Share
   */
  async Share(data: ShareData) {
    try {
      if (data.files) {
        if (navigator.canShare && navigator.canShare(data)) {
          await navigator.share(data);
          return { ok: true, message: "Shared" };
        } else {
          return { ok: false, message: "Share Files API not supported" };
        }
      } else {
        // Check support...
        if (navigator.share) {
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

  /**
   * Read contacts from the device.
   * @method Contacts
   */
  async Contacts(
    props: string[],
    options?: {
      multiple: boolean;
    },
  ) {
    try {
      if ("contacts" in navigator && "ContactsManager" in window) {
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

  /**
   * Get the connectivity status, offline, online, etc.
   * @method Connectivity
   */
  async Connectivity(online: () => "online", offline: () => "offline") {
    // Once the DOM is loaded, check for connectivity...
    try {
      if (navigator.onLine) {
        online();
        return { ok: true, message: "Online" };
      } else {
        offline();
        return { ok: true, message: "Offline" };
      }
    } catch (error) {
      // Error...
      throw error;
    }
  }

  /**
   * Set notification icon badge, count.
   * @method setBadge
   */
  async setBadge(unreadCount: number) {
    try {
      if (navigator.setAppBadge) {
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

  /**
   * Clear all notification icon badge counts.
   * @method clearBadge
   */
  async clearBadge() {
    try {
      if (navigator.clearAppBadge) {
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

  /**
   * Index content for offline access in the browser.
   * @method contentIndexing
   */
  async contentIndexing() {
    try {
      const registration = (await navigator.serviceWorker.ready) as any;
      // Remember to feature-detect before using the API:
      if ("index" in registration) {
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

  /**
   * Set fullscreen mode.
   * @method Fullscreen
   */
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

  /**
   * Send notification to the user.
   * @method Notification
   */
  async Notification(data: { title: string; options: object }) {
    const { title, options } = data;
    try {
      if ("Notification" in window) {
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

  /**
   * Install a PWA to the user's device.
   * @method Install
   */
  async Install(type: "before" | "install" | "installed" = "installed", callback: (event: string | any) => any) {
    try {
      if (navigator.serviceWorker) {
        // Check if app was installed...
        const checkIfAppInstalled = async () => {
          try {
            // Notify the user the install was successful..
            window.addEventListener("appinstalled", () => {
              callback("installed");
            });
            return { ok: true, message: "Check if installed" };
          } catch (error) {
            throw error;
          }
        };
        // Before install prompt is shown...
        const beforeInstallPromptEvent = async () => {
          try {
            window.addEventListener("beforeinstallprompt", (event: any) => {
              // Stash the event so it can be triggered later...
              callback(event);
            });
            return { ok: true, message: "Before install prompt" };
          } catch (error) {
            throw error;
          }
        };
        // Install the app...
        const installApp = async () => {
          try {
            callback("install");
            return { ok: true, message: "Install App" };
          } catch (error) {
            throw error;
          }
        };

        // Switch on the type...
        switch (type) {
          case "before":
            return await beforeInstallPromptEvent();
          case "install":
            return await installApp();
          case "installed":
            return await checkIfAppInstalled();
          default:
            return { ok: false, message: "Type can be 'install', 'installed' or 'before'" };
        }
      } else {
        // Error...
        return { ok: false, message: "Service Worker not supported" };
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Idle detection for the device, when the user is not doing anything.
   * @method idleDetection
   */
  async idleDetection(
    action = "start",
    callback = () => {
      // Idle...
    },
    threshold = 60000,
  ) {
    try {
      //  Idle Detection...
      if ("IdleDetector" in window) {
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

  /**
   * Prevent the device's screen from turning off so that the user can see the information
   * that's displayed on screen.
   * @method wakeLock
   */
  async wakeLock() {
    try {
      if ("wakeLock" in navigator) {
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

  /**
   * Check if user is viewing a page. Pause/play video or games.
   * @method Visibility
   */
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

  /**
   * Pick text files from the device.
   * @method pickTextFile
   */
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

  /**
   * Pick any file types from the device.
   * @method pickFile
   */
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

  /**
   * Get the display mode of you progressive web app.
   * @method displayMode
   */
  async displayMode(callback: (mode: "standalone" | "tab") => void) {
    try {
      window.addEventListener("DOMContentLoaded", () => {
        const displayMode = window.matchMedia("(display-mode: standalone)").matches ? "standalone" : "tab";
        callback(displayMode);
      });
    } catch (error) {
      throw error;
    }
  }
  /**
   * Allows users select their preferred way of paying for things,
   * and make that information available to a merchant.
   * @method Payment
   */
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
