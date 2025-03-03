class Check {
  Share() {
    return "share" in navigator;
  }

  shareFiles() {
    return "canShare" in navigator;
  }

  Clipboard() {
    return "clipboard" in navigator;
  }

  copyText() {
    return this.Clipboard();
  }

  copyImage() {
    return this.Clipboard();
  }

  idleDetection() {
    return "IdleDetector" in window;
  }

  wakeLock() {
    return "wakeLock" in navigator;
  }

  Contacts() {
    return "contacts" in navigator && "ContactsManager" in window;
  }

  onlineStatus() {
    return "onLine" in navigator;
  }

  Badging() {
    return "setAppBadge" in navigator && "clearAppBadge" in navigator;
  }

  Notifications() {
    return "Notification" in window;
  }

  async contentIndexing() {
    try {
      const registration = await navigator.serviceWorker.ready;
      return registration && "index" in registration;
    } catch {
      return false;
    }
  }

  notificationPermission() {
    return this.Notifications() && Notification.permission === "granted";
  }

  barcodeDetector() {
    return "BarcodeDetector" in window;
  }

  accessFonts() {
    return "queryLocalFonts" in window;
  }

  serviceWorker() {
    return "serviceWorker" in navigator;
  }

  Bluetooth() {
    return "bluetooth" in navigator;
  }

  Payment() {
    return "PaymentRequest" in window;
  }

  webOTP() {
    return "OTPCredential" in window;
  }

  webNFC() {
    return "NDEFReader" in window;
  }

  async All() {
    const checks = [
      this.createSupportObject("Share", this.Share()),
      this.createSupportObject("File Share", this.shareFiles()),
      this.createSupportObject("Clipboard", this.Clipboard()),
      this.createSupportObject("Copy Text", this.copyText()),
      this.createSupportObject("Copy Image", this.copyImage()),
      this.createSupportObject("Idle Detection", this.idleDetection()),
      this.createSupportObject("Wakelock", this.wakeLock()),
      this.createSupportObject("Contacts Picker", this.Contacts()),
      this.createSupportObject("Badging", this.Badging()),
      this.createSupportObject("Notifications", this.Notifications()),
      this.createSupportObject("Content Indexing", await this.contentIndexing()),
      this.createSupportObject("Online Status", this.onlineStatus()),
      this.createSupportObject("Notification Permission", this.notificationPermission()),
      this.createSupportObject("Barcode Detector", this.barcodeDetector()),
      this.createSupportObject("Font Access", this.accessFonts()),
      this.createSupportObject("Service Worker", this.serviceWorker()),
      this.createSupportObject("Bluetooth", this.Bluetooth()),
      this.createSupportObject("Payment", this.Payment()),
      this.createSupportObject("Web OTP", this.webOTP()),
      this.createSupportObject("Web NFC", this.webNFC()),
    ];

    return checks.sort((a, b) => a.name.localeCompare(b.name));
  }

  private createSupportObject(name: string, isSupported: boolean) {
    return {
      name,
      message: isSupported ? "Supported" : "Not supported",
      ok: isSupported,
    };
  }
}

export default Check;
