// Experimental (unstable) : check for api support.
class Check {
  // Check for share.
  async Share() {
    try {
      // Check for share.
      return "share" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Check for share files support.
  async shareFiles() {
    try {
      // Check for files share support.
      return "canShare" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Check for clipboard.
  async Clipboard() {
    try {
      // Check for clipboard.
      return "clipboard" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Check for copy text.
  async copyText() {
    try {
      return await this.Clipboard();
    } catch (error) {
      throw error;
    }
  }

  // Check copy image.
  async copyImage() {
    try {
      return await this.Clipboard();
    } catch (error) {
      throw error;
    }
  }

  // Check for idle detection.
  async idleDetection() {
    try {
      // Check for idle detection.
      return "IdleDetector" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check for wakelock.
  async wakeLock() {
    try {
      // Check for wakelock.
      return "wakeLock" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Check for contacts.
  async Contacts() {
    try {
      // Check for contacts.
      return "contacts" in navigator && "ContactsManager" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check if online status is supported.
  async onlineStatus() {
    try {
      // Check if online status is supported.
      return "onLine" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Badging api support.
  async Badging() {
    try {
      // Check for Badging support.
      return "setAppBadge" in navigator && "clearAppBadge" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Check for notifications.
  async Notifications() {
    try {
      // Check for notifications.
      return "Notification" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check if content indexing api is supported.
  async contentIndexing() {
    try {
      const registration = (await navigator.serviceWorker.ready) as any;
      return "index" in registration;
    } catch (error) {
      throw error;
    }
  }
  async notificationPermission() {
    try {
      if (await this.Notifications()) {
        // Check if the user has granted permission to display notifications.
        return Notification.permission === "granted";
      } else {
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
      return "BarcodeDetector" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check for font access support.
  async accessFonts() {
    try {
      // Check for font access support.
      return "queryLocalFonts" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check service worker support.
  async serviceWorker() {
    try {
      // Check service worker support.
      return "serviceWorker" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Bluetooth support.
  async Bluetooth() {
    try {
      // Check for bluetooth support.
      return "bluetooth" in navigator;
    } catch (error) {
      throw error;
    }
  }

  // Payment api support.
  async Payment() {
    try {
      // Check for payments api support.
      return "PaymentRequest" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check for web otp support.
  async webOTP() {
    try {
      // Check for web otp support.
      return "OTPCredential" in window;
    } catch (error) {
      throw error;
    }
  }

  // Check for web nfc support.
  async webNFC() {
    try {
      // Check for web nfc support.
      return "NDEFReader" in window;
    } catch (error) {
      throw error;
    }
  }

  // Camera pan, tilt and zoom support.
  async cameraPanAndTiltZoom() {
    try {
      const supports = navigator.mediaDevices.getSupportedConstraints() as any;
      return !!(supports.pan && supports.tilt && supports.zoom);
    } catch (error) {
      throw error;
    }
  }

  // Check for all api support.
  async All() {
    try {
      return [
        {
          name: "Share",
          message: (await this.Share()) ? "Supported" : "Not supported",
          ok: await this.Share(),
        },
        {
          name: "File Share",
          message: (await this.shareFiles()) ? "Supported" : "Not supported",
          ok: await this.shareFiles(),
        },
        {
          name: "Clipboard",
          message: (await this.Clipboard()) ? "Supported" : "Not supported",
          ok: await this.Clipboard(),
        },
        {
          name: "Copy Text",
          message: (await this.copyText()) ? "Supported" : "Not supported",
          ok: await this.copyText(),
        },
        {
          name: "Copy Image",
          message: (await this.copyImage()) ? "Supported" : "Not supported",
          ok: await this.copyImage(),
        },
        {
          name: "Idle Detection",
          message: (await this.idleDetection()) ? "Supported" : "Not supported",
          ok: await this.idleDetection(),
        },
        {
          name: "Wakelock",
          message: (await this.wakeLock()) ? "Supported" : "Not supported",
          ok: await this.wakeLock(),
        },
        {
          name: "Contacts Picker",
          message: (await this.Contacts()) ? "Supported" : "Not supported",
          ok: await this.Contacts(),
        },
        {
          name: "Badging",
          message: (await this.Badging()) ? "Supported" : "Not supported",
          ok: await this.Badging(),
        },
        {
          name: "Notifications",
          message: (await this.Notifications()) ? "Supported" : "Not supported",
          ok: await this.Notifications(),
        },
        {
          name: "Content Indexing",
          message: (await this.contentIndexing()) ? "Supported" : "Not supported",
          ok: await this.contentIndexing(),
        },
        {
          name: "Online Status",
          message: (await this.onlineStatus()) ? "Supported" : "Not supported",
          ok: await this.onlineStatus(),
        },
        {
          name: "Notification Permission",
          message: (await this.notificationPermission()) ? "Granted" : "Not granted",
          ok: await this.notificationPermission(),
        },
        {
          name: "Barcode Detector",
          message: (await this.barcodeDetector()) ? "Supported" : "Not supported",
          ok: await this.barcodeDetector(),
        },

        {
          name: "Font Access",
          message: (await this.accessFonts()) ? "Supported" : "Not supported",
          ok: await this.accessFonts(),
        },
        {
          name: "Service Worker",
          message: (await this.serviceWorker()) ? "Supported" : "Not supported",
          ok: await this.serviceWorker(),
        },
        {
          name: "Bluetooth",
          message: (await this.Bluetooth()) ? "Supported" : "Not supported",
          ok: await this.Bluetooth(),
        },
        {
          name: "Payment",
          message: (await this.Payment()) ? "Supported" : "Not supported",
          ok: await this.Payment(),
        },
        {
          name: "Web OTP",
          message: (await this.webOTP()) ? "Supported" : "Not supported",
          ok: await this.webOTP(),
        },
        {
          name: "Web NFC",
          message: (await this.webNFC()) ? "Supported" : "Not supported",
          ok: await this.webNFC(),
        },
        {
          name: "Camera(Pan and Tilt Zoom)",
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
