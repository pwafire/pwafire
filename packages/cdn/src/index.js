// All PWA Fire Bundle Features as ES6 Module
// Declare the PWA Features class...
class PWA {
  // Copy text...
  copyText(element, styles) {
    let style = ``;
    if (styles) {
      style = styles;
    }
    element.addEventListener("click", async (event) => {
      let html = element.innerHTML;
      let text = element.innerText;
      try {
        await navigator.clipboard.writeText(text);
        // Show success message...
        element.innerHTML = `<span style="${style}">
                Copied to clipboard!</span>`;
        // Show previous text...
        setTimeout(() => {
          element.innerHTML = html;
        }, 3000);
      } catch (err) {
        console.error("Failed to copy to clipboard", err);
      }
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
  // Contacts Picker...
  Contacts(element, props, options) {
    element.addEventListener("click", async () => {
      try {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return contacts;
      } catch (error) {
        // Handle any errors here...
        alert(error);
      }
    });
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
  Payment(element, paydata, validatePayment) {
    // Initiate Payment UI on click...
    element.addEventListener("click", (event) => {
      event.preventDefault();
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
    });
  }
  // Fullscreen...
  Fullscreen(element) {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      }
    });
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
  Install(element) {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Stash the event so it can be triggered later...
      window.deferredPrompt = event;
    });

    element.addEventListener("click", () => {
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
