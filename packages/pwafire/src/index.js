// All PWA Fire Bundle Features as ES6 Module @copyright : mayeedwin
class PWA {
  // Copy text...
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      // Copied...
      return { code: "copied", message: `Copied` };
    } catch (error) {
      // Error...
      return {
        error,
        code: "failed",
        message: `Failed`,
      };
    }
  }
  // Web Share...
  Share(data) {
    // Check support...
    if (navigator.share) {
      navigator
        .share(data)
        .then(() => {
          // Shared...
          return { code: "shared", message: `Shared` };
        })
        .catch(error => {
          // Error..
          return { error, code: "failed", message: `Failed` };
        });
    } else {
      // No support...
      return { code: "no-support", message: `Not supported` };
    }
  }

  // Contacts Picker...
  async Contacts(props, options) {
    try {
      const contacts = await navigator.contacts.select(props, options);
      // Return contacts...
      return contacts;
    } catch (error) {
      // Error...
      return { error, code: "no-support", message: `Not supported` };
    }
  }

  // Connectivity...
  async Connectivity(online, offline) {
    // Check support...
    try {
      document.addEventListener("DOMContentLoaded", () => {
        // Offline Event...
        if (!navigator.onLine) {
          offline();
          return { code: "offline", message: `Offline` };
        }
        // Online Event...
        window.addEventListener("online", () => {
          online();
          return { code: "online", message: `Online` };
        });
      });
    } catch (error) {
      // Error...
      return { error, code: "no-support", message: `Not supported` };
    }
  }
  // Copy image
  async copyImage(imgURL) {
    try {
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem(
          Object.defineProperty({}, blob.type, {
            value: blob,
            enumerable: true,
          })
        ),
      ]);
      // Error...
      return { code: "copied", message: `Copied` };
    } catch (error) {
      // Error...
      return { error, code: "failed", message: `Failed` };
    }
  }
  // Badge...
  async Badge(unreadCount) {
    try {
      return {
        get Set() {
          navigator.setAppBadge(unreadCount).catch(error => {
            // Do something with the error.
            return { error, code: "failed", message: `Failed` };
          });
          return { code: "set", message: `Set badge` };
        },
        get Clear() {
          // Clear the badge
          navigator.clearAppBadge().catch(error => {
            // Do something with the error.
            return { error, code: "failed", message: `Failed` };
          });
          return { code: "clear", message: `Clear badge` };
        },
      };
    } catch (error) {
      return { error, code: "failed", message: `Not supported` };
    }
  }
  // Payment...
  Payment(paydata, validatePayment) {
    const paymentRequest = new PaymentRequest(
      paydata.paymentMethods,
      paydata.paymentDetails,
      paydata.options
    );
    // Initiate user interface...
    paymentRequest
      .show()
      .then(paymentResponse => {
        // Validate with backend...
        validatePayment(paymentResponse);
        return { code: "succesful", message: `Successful`, paymentResponse };
      })
      .catch(error => {
        // API error or user cancelled the payment
        return { error, code: "failed", message: `Failed` };
      });
  }
  // Fullscreen...
  async Fullscreen() {
    try {
      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      }
    } catch (error) {
      // Error...
      return { error, code: "failed", message: `Failed` };
    }
  }
  // Notification...
  Notification(data) {
    const { title, options } = data;
    if ("Notification" in window) {
      Notification.requestPermission()
        .then(permission => {
          if (permission === "granted") {
            navigator.serviceWorker.ready.then(registration => {
              registration.showNotification(title, options);
              // Sent...
              return { code: "sent", message: `Sent` };
            });
          }
        })
        .catch(error => {
          return { error, code: "failed", message: `Failed` };
        });
    } else {
      return { code: "no-support", message: `Not supported` };
    }
  }
  // Install...
  Install() {
    window.addEventListener("beforeinstallprompt", event => {
      // Stash the event so it can be triggered later...
      window.deferredPrompt = event;
    });
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return { code: "exists", message: `Exists` };
    }
    // Show the install prompt...
    promptEvent.prompt();
    // Log the result...
    promptEvent.userChoice.then(result => {
      // Reset the deferred prompt variable, since rompt() can only be called once...
      window.deferredPrompt = null;
    });
    window.addEventListener("appinstalled", event => {
      return { code: "installed", message: `Installed` };
    });
  }
  // Visibility...
  Visibility(isVisible, notAvailable) {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === `visible`) {
        // Call back function...
        isVisible();
        return { code: "visible", message: `Visible` };
      }
    } else {
      // Alternative...
      notAvailable();
      return { code: "no-support", message: `Not supported` };
    }
  }
}
// Create an instance of a PWA
exports.pwa = new PWA();
