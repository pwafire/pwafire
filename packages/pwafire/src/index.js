// All PWA Fire Bundle Features as ES6 Module @copyright : mayeedwin
class PWA {
  // Copy text...
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      // Copied...
      return { type:`success`, message: `Copied` };
    } catch (error) {
      // Error...
      return { error, type: `fail` };
    }
  }
  // Web Share...
  async Share(data) {
    // Check support...
    try {
      await navigator.share(data)
       // Shared...
       return { type:`success`, message: `Shared` };
    } catch (error) {
      // Error...
      return { error, type: `fail` };
    }
  }

  // Contacts Picker...
  async Contacts(props, options) {
    try {
      const contacts = await navigator.contacts.select(props, options);
      // Return contacts...
      return { type:`success`, contacts, message: `Picked` };
    } catch (error) {
      // Error...
      return { error, type: `fail` };
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
          return { type: `success`, message: `Offline` };
        }
        // Online Event...
        window.addEventListener("online", () => {
          online();
          return { type:`success`, message: `Online` };
        });
      });
    } catch (error) {
       // Error...
       return { error, type: `fail` };
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
      return { type:`success`, message: `Copied` };
    } catch (error) {
      // Error...
      return { error, type: `fail` };
    }
  }
  // Badge...
  async Badge(unreadCount) {
    try {
      return {
        get Set() {
           await navigator.setAppBadge(unreadCount);
           return { type: "success", message: `Set badge` };
        },
        get Clear() {
          // Clear the badge
          await navigator.clearAppBadge();
          return { type: "success", message: `Clear badge` };
        },
      };
    } catch (error) {
       // Error...
       return { error, type: `fail` };
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
        return { type: "success", message: `Successful`, paymentResponse };
      })
      .catch(error => {
         // Error...
      return { error, type: `fail` };
      });
  }
  // Fullscreen...
  async Fullscreen() {
    try {
      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      return { type:`success`, message: `Fullscreen` };
      }
    } catch (error) {
      // Error...
      return { error, type: `fail` };
    }
  }
  // Notification...
  async Notification(data) {
    const { title, options } = data;
     try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, options);
          // Sent...
          return { type: "success", message: `Sent` };
        });
      }
     } catch (error) {
        // Error...
      return { error, type: `fail` };
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
      return { type: "fail", message: `Not supported` };
    }
  }
}
// Create an instance of a PWA
exports.pwa = new PWA();
