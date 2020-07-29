// All PWA Fire Bundle Features as ES6 Module @copyright : mayeedwin
class PWA {
  // Copy text...
  copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Failed to copy to clipboard", err);
      }
  }
  // Web Share...
  Share(data) {
      // Check if web share is supported
      if (navigator.share) {
        navigator
          .share(data)
          .then(() => console.log(`Shared`))
          .catch((error) => console.log(`Error sharing`, error));
      } else {
        console.log(`Web share not supported!`);
      };
  }
  // Contacts Picker...
  async Contacts(props, options) {
      try {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return contacts;
      } catch (error) {
        // Handle any errors here...
        alert(error);
      }
  }
  // Connectivity...
  Connectivity(online, offline) {
    // Once the DOM is loaded, check for connectivity...
    document.addEventListener("DOMContentLoaded", () => {
      // Offline Event...
      if (!navigator.onLine) {
        offline();
      }
      // Online Event...
      window.addEventListener("online", () => {
        online();
      });
    });
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
      console.log("Image copied.");
      return `Image copied.`;
    } catch (e) {
      console.error(e, e.message);
    }
  }
  // Badge...
  Badge(unreadCount) {
    return {
      get Set() {
        navigator.setAppBadge(unreadCount).catch((error) => {
          // Do something with the error.
          console.log(error);
        });
        return `Set bage`;
      },
      get Clear() {
        // Clear the badge
        navigator.clearAppBadge().catch((error) => {
          // Do something with the error.
          console.log(error);
        });
        return `Clear badge`;
      },
    };
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
        .then((paymentResponse) => {
          // Validate with backend...
          validatePayment(paymentResponse);
        })
        .catch((err) => {
          // API error or user cancelled the payment
          console.log("Error:", err);
        });
  }
  // Fullscreen...
  Fullscreen() {
      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      }
  }
  // Notification...
  Notification(data) {
    const { title, options } = data;
    if ("Notification" in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            navigator.serviceWorker.ready.then((registration) => {
              registration.showNotification(title, options);
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return `Notifications not supported.`;
    }
  }
  // Install...
  Install() {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Stash the event so it can be triggered later...
      window.deferredPrompt = event;
    });
      console.log(`"👍", Install Button Clicked`);
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        // The deferred prompt isn't available, so pwa exists...
        console.log(`App Exists`);
        return null;
      }
      // Show the install prompt...
      promptEvent.prompt();
      // Log the result...
      promptEvent.userChoice.then((result) => {
        // Reset the deferred prompt variable, since rompt() can only be called once...
        window.deferredPrompt = null;
      });
    window.addEventListener("appinstalled", (event) => {
      console.log(`"👍", App Installed`);
    });
  }
  // Visibility...
  Visibility(isVisible, notAvailable) {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === `visible`) {
        // Call back function...
        isVisible();
      }
    } else {
      // Alternative...
      notAvailable();
    }
  }
}

// Create an instance of PWA
const pwa = new PWA();
// Export the instance
// export default pwa;
