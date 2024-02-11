// Experimental (unstable) : check for api support.
class Check {
  async Share() {
    try {
      return "share" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async shareFiles() {
    try {
      return "canShare" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Clipboard() {
    try {
      return "clipboard" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async copyText() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async copyImage() {
    try {
      return (await this.Clipboard()) ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async idleDetection() {
    try {
      return "IdleDetector" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async wakeLock() {
    try {
      return "wakeLock" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Contacts() {
    try {
      return "contacts" in navigator && "ContactsManager" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async onlineStatus() {
    try {
      return "onLine" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Badging() {
    try {
      return "setAppBadge" in navigator && "clearAppBadge" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Notifications() {
    try {
      return "Notification" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async contentIndexing() {
    try {
      const registration = (await navigator.serviceWorker.ready) as any;
      return "index" in registration ? true : false;
    } catch (error) {
      throw error;
    }
  }
  async notificationPermission() {
    try {
      if (await this.Notifications()) {
        return Notification.permission === "granted" ? true : false;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async barcodeDetector() {
    try {
      return "BarcodeDetector" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async accessFonts() {
    try {
      return "queryLocalFonts" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async serviceWorker() {
    try {
      return "serviceWorker" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Bluetooth() {
    try {
      return "bluetooth" in navigator ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async Payment() {
    try {
      return "PaymentRequest" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async webOTP() {
    try {
      return "OTPCredential" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async webNFC() {
    try {
      return "NDEFReader" in window ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async cameraPanAndTiltZoom() {
    try {
      const supports = navigator.mediaDevices.getSupportedConstraints() as any;
      return supports.pan && supports.tilt && supports.zoom ? true : false;
    } catch (error) {
      throw error;
    }
  }

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
