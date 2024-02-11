// Experimental (unstable) : check for api support.
class Check {
  Share() {
    return "share" in navigator ? true : false;
  }

  shareFiles() {
    return "canShare" in navigator ? true : false;
  }

  Clipboard() {
    return "clipboard" in navigator ? true : false;
  }

  copyText() {
    return this.Clipboard() ? true : false;
  }

  copyImage() {
    return this.Clipboard() ? true : false;
  }

  idleDetection() {
    return "IdleDetector" in window ? true : false;
  }

  wakeLock() {
    return "wakeLock" in navigator ? true : false;
  }

  Contacts() {
    return "contacts" in navigator && "ContactsManager" in window ? true : false;
  }

  onlineStatus() {
    return "onLine" in navigator ? true : false;
  }

  Badging() {
    return "setAppBadge" in navigator && "clearAppBadge" in navigator ? true : false;
  }

  Notifications() {
    return "Notification" in window ? true : false;
  }

  async contentIndexing() {
    const registration = (await navigator.serviceWorker.ready) as any;
    return "index" in registration ? true : false;
  }

  notificationPermission() {
    if (this.Notifications()) {
      return Notification.permission === "granted" ? true : false;
    } else {
      return false;
    }
  }

  barcodeDetector() {
    return "BarcodeDetector" in window ? true : false;
  }

  accessFonts() {
    return "queryLocalFonts" in window ? true : false;
  }

  serviceWorker() {
    return "serviceWorker" in navigator ? true : false;
  }

  Bluetooth() {
    return "bluetooth" in navigator ? true : false;
  }

  Payment() {
    return "PaymentRequest" in window ? true : false;
  }

  webOTP() {
    return "OTPCredential" in window ? true : false;
  }

  webNFC() {
    return "NDEFReader" in window ? true : false;
  }

  cameraPanAndTiltZoom() {
    const supports = navigator.mediaDevices.getSupportedConstraints() as any;
    return supports.pan && supports.tilt && supports.zoom ? true : false;
  }

  async All() {
    const share = this.Share();
    const shareFiles = this.shareFiles();
    const clipboard = this.Clipboard();
    const copyText = this.copyText();
    const copyImage = this.copyImage();
    const idleDetection = this.idleDetection();
    const wakeLock = this.wakeLock();
    const contacts = this.Contacts();
    const badging = this.Badging();
    const notifications = this.Notifications();
    const contentIndexing = await this.contentIndexing();
    const onlineStatus = this.onlineStatus();
    const notificationPermission = this.notificationPermission();
    const barcodeDetector = this.barcodeDetector();
    const accessFonts = this.accessFonts();
    const serviceWorker = this.serviceWorker();
    const bluetooth = this.Bluetooth();
    const payment = this.Payment();
    const webOTP = this.webOTP();
    const webNFC = this.webNFC();
    const cameraPanAndTiltZoom = this.cameraPanAndTiltZoom();
    return [
      { name: "Share", message: share ? "Supported" : "Not supported", ok: share },
      { name: "File Share", message: shareFiles ? "Supported" : "Not supported", ok: shareFiles },
      { name: "Clipboard", message: clipboard ? "Supported" : "Not supported", ok: clipboard },
      { name: "Copy Text", message: copyText ? "Supported" : "Not supported", ok: copyText },
      { name: "Copy Image", message: copyImage ? "Supported" : "Not supported", ok: copyImage },
      { name: "Idle Detection", message: idleDetection ? "Supported" : "Not supported", ok: idleDetection },
      { name: "Wakelock", message: wakeLock ? "Supported" : "Not supported", ok: wakeLock },
      { name: "Contacts Picker", message: contacts ? "Supported" : "Not supported", ok: contacts },
      { name: "Badging", message: badging ? "Supported" : "Not supported", ok: badging },
      { name: "Notifications", message: notifications ? "Supported" : "Not supported", ok: notifications },
      { name: "Content Indexing", message: contentIndexing ? "Supported" : "Not supported", ok: contentIndexing },
      { name: "Online Status", message: onlineStatus ? "Supported" : "Not supported", ok: onlineStatus },
      {
        name: "Notification Permission",
        message: notificationPermission ? "Granted" : "Not granted",
        ok: notificationPermission,
      },
      { name: "Barcode Detector", message: barcodeDetector ? "Supported" : "Not supported", ok: barcodeDetector },
      { name: "Font Access", message: accessFonts ? "Supported" : "Not supported", ok: accessFonts },
      { name: "Service Worker", message: serviceWorker ? "Supported" : "Not supported", ok: serviceWorker },
      { name: "Bluetooth", message: bluetooth ? "Supported" : "Not supported", ok: bluetooth },
      { name: "Payment", message: payment ? "Supported" : "Not supported", ok: payment },
      { name: "Web OTP", message: webOTP ? "Supported" : "Not supported", ok: webOTP },
      { name: "Web NFC", message: webNFC ? "Supported" : "Not supported", ok: webNFC },
      {
        name: "Camera(Pan and Tilt Zoom)",
        message: cameraPanAndTiltZoom ? "Supported" : "Not supported",
        ok: cameraPanAndTiltZoom,
      },
    ].sort((a, b) => a.name.localeCompare(b.name));
  }
}

export default Check;
