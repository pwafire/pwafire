// Experimental (unstable) : check for api support.
class Check {
  // Check for share.
  async Share() {
    try {
      // Check for share.
      return "share" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for share files support.
  async shareFiles() {
    try {
      // Check for files share support.
      return "canShare" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for clipboard.
  async Clipboard() {
    try {
      // Check for clipboard.
      return "clipboard" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for copy text.
  async copyText() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check copy image.
  async copyImage() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for idle detection.
  async idleDetection() {
    try {
      // Check for idle detection.
      return "IdleDetector" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for wakelock.
  async wakeLock() {
    try {
      // Check for wakelock.
      return "wakeLock" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for contacts.
  async Contacts() {
    try {
      // Check for contacts.
      return "contacts" in navigator && "ContactsManager" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check if online status is supported.
  async onlineStatus() {
    try {
      // Check if online status is supported.
      return "onLine" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Badging api support.
  async Badging() {
    try {
      // Check for Badging support.
      return "setAppBadge" in navigator && "clearAppBadge" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for notifications.
  async Notifications() {
    try {
      // Check for notifications.
      return "Notification" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check if content indexing api is supported.
  async contentIndexing() {
    try {
      // Check if content indexing api is supported.
      const registration = (await navigator.serviceWorker.ready) as any;
      return "index" in registration ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // If the browser supports the Notification API, check if the user has granted permission to display notifications.
  async notificationPermission() {
    try {
      // If the browser supports the Notification API, check if the user has granted permission to display notifications.
      if (await this.Notifications()) {
        // Check if the user has granted permission to display notifications.
        return Notification.permission === "granted" ? true : false;
      } else {
        // Return false if the browser doesn't support the Notification API.
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  // Check for barcode detection support.
  async barcodeDetector() {
    try {
      // Check for barcode detection support.
      return "BarcodeDetector" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check service worker support.
  async serviceWorker() {
    try {
      // Check service worker support.
      return "serviceWorker" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Bluetooth support.
  async Bluetooth() {
    try {
      // Check for bluetooth support.
      return "bluetooth" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Payment api support.
  async Payment() {
    try {
      // Check for payments api support.
      return "PaymentRequest" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for web otp support.
  async webOTP() {
    try {
      // Check for web otp support.
      return "OTPCredential" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for web nfc support.
  async webNFC() {
    try {
      // Check for web nfc support.
      return "NDEFReader" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Camera pan, tilt and zoom support.
  async cameraPanAndTiltZoom() {
    try {
      const supports = navigator.mediaDevices.getSupportedConstraints() as any;
      return supports.pan && supports.tilt && supports.zoom ? true : false;
    } catch (error) {
      throw error;
    }
  }

  // Check for all api support.
  async All() {
    try {
      // Check for all api support.
      return [
        {
          name: "share",
          message: (await this.Share()) ? "Supported" : "Not supported",
          ok: await this.Share(),
        },
        {
          name: "shareFiles",
          message: (await this.shareFiles()) ? "Supported" : "Not supported",
          ok: await this.shareFiles(),
        },
        {
          name: "clipboard",
          message: (await this.Clipboard()) ? "Supported" : "Not supported",
          ok: await this.Clipboard(),
        },
        {
          name: "copy text",
          message: (await this.copyText()) ? "Supported" : "Not supported",
          ok: await this.copyText(),
        },
        {
          name: "copy image",
          message: (await this.copyImage()) ? "Supported" : "Not supported",
          ok: await this.copyImage(),
        },
        {
          name: "idle detection",
          message: (await this.idleDetection()) ? "Supported" : "Not supported",
          ok: await this.idleDetection(),
        },
        {
          name: "wakelock",
          message: (await this.wakeLock()) ? "Supported" : "Not supported",
          ok: await this.wakeLock(),
        },
        {
          name: "contacts",
          message: (await this.Contacts()) ? "Supported" : "Not supported",
          ok: await this.Contacts(),
        },
        {
          name: "badging",
          message: (await this.Badging()) ? "Supported" : "Not supported",
          ok: await this.Badging(),
        },
        {
          name: "notifications",
          message: (await this.Notifications()) ? "Supported" : "Not supported",
          ok: await this.Notifications(),
        },
        {
          name: "content indexing",
          message: (await this.contentIndexing()) ? "Supported" : "Not supported",
          ok: await this.contentIndexing(),
        },
        {
          name: "online status",
          message: (await this.onlineStatus()) ? "Supported" : "Not supported",
          ok: await this.onlineStatus(),
        },
        {
          name: "notification permission",
          message: (await this.notificationPermission()) ? "Granted" : "Not granted",
          ok: await this.notificationPermission(),
        },
        {
          name: "barcode detection",
          message: (await this.barcodeDetector()) ? "Supported" : "Not supported",
          ok: await this.barcodeDetector(),
        },
        {
          name: "service worker",
          message: (await this.serviceWorker()) ? "Supported" : "Not supported",
          ok: await this.serviceWorker(),
        },
        {
          name: "bluetooth",
          message: (await this.Bluetooth()) ? "Supported" : "Not supported",
          ok: await this.Bluetooth(),
        },
        {
          name: "payment",
          message: (await this.Payment()) ? "Supported" : "Not supported",
          ok: await this.Payment(),
        },
        {
          name: "web otp",
          message: (await this.webOTP()) ? "Supported" : "Not supported",
          ok: await this.webOTP(),
        },
        {
          name: "web nfc",
          message: (await this.webNFC()) ? "Supported" : "Not supported",
          ok: await this.webNFC(),
        },
        {
          name: "camera pan and tilt zoom",
          message: (await this.cameraPanAndTiltZoom()) ? "Supported" : "Not supported",
          ok: await this.cameraPanAndTiltZoom(),
        },
      ].sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      throw error;
    }
  }
}

export default Check;
