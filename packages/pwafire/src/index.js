// All PWA Fire Bundle Features as ES6 Module @copyright : mayeedwin
class PWA {
  // Copy text...
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      // Copied...
      return { type: "success", message: `Copied` };
    } catch (error) {
      // Error...
      return { error, type: "fail" };
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
          return { type: "success", message: `Shared` };
        })
        .catch(error => {
          // Error..
          return { error, type: "fail", message: `Failed` };
        });
    } else {
      // No support...
      return {
        type: "fail",
        error: {
          message: `Not supported`,
        },
      };
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
      return { error, type: "fail" };
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
          return { type: "success", message: `Offline` };
        }
        // Online Event...
        window.addEventListener("online", () => {
          online();
          return { type: "success", message: `Online` };
        });
      });
    } catch (error) {
      // Error...
      return { error, type: "fail" };
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
      return { type: "success", message: `Copied` };
    } catch (error) {
      // Error...
      return { error, type: "fail" };
    }
  }
  // Badge...
  async Badge(unreadCount) {
    try {
      return {
        get Set() {
          navigator.setAppBadge(unreadCount).catch(error => {
            // Do something with the error.
            return { error, type: "fail" };
          });
          return { type: "success", message: `Set badge` };
        },
        get Clear() {
          // Clear the badge
          navigator.clearAppBadge().catch(error => {
            // Do something with the error.
            return { error, type: "fail" };
          });
          return { type: "success", message: `Clear badge` };
        },
      };
    } catch (error) {
      return { error, type: "fail" };
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
        return paymentRequest;
      })
      .catch(error => {
        // API error or user cancelled the payment
        return { error, type: "fail" };
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
      return { error, type: "fail" };
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
              return { type: "success", message: `Sent` };
            });
          }
        })
        .catch(error => {
          return { error, type: "fail" };
        });
    } else {
      return {
        type: "fail",
        error: {
          message: `Not supported`,
        },
      };
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
      return { type: "success", message: `Exists` };
    }
    // Show the install prompt...
    promptEvent.prompt();
    // Log the result...
    promptEvent.userChoice.then(result => {
      // Reset the deferred prompt variable, since rompt() can only be called once...
      window.deferredPrompt = null;
    });
    window.addEventListener("appinstalled", event => {
      return { type: "success", message: `Installed` };
    });
  }
  // Visibility...
  Visibility(isVisible, notAvailable) {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === `visible`) {
        // Call back function...
        isVisible();
        return { type: "success", message: `Visible` };
      }
    } else {
      // Alternative...
      notAvailable();
      return {
        type: "fail",
        error: {
          message: `Not supported`,
        },
      };
    }
  }
}
// Create an instance of a PWA
exports.pwa = new PWA();
