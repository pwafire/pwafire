// src/check/index.ts
var check = {
  badging: () => "setAppBadge" in navigator,
  barcode: () => "BarcodeDetector" in window,
  clipboard: () => "clipboard" in navigator,
  compression: () => "CompressionStream" in window,
  connectivity: () => "onLine" in navigator,
  contacts: () => "contacts" in navigator && "ContactsManager" in window,
  contentIndexing: async () => "index" in await navigator.serviceWorker.ready,
  files: () => "showOpenFilePicker" in self && "showSaveFilePicker" in self,
  fonts: () => "queryLocalFonts" in window,
  fullscreen: () => document.fullscreenEnabled,
  idleDetection: () => "IdleDetector" in window,
  install: () => "serviceWorker" in navigator,
  lazyLoad: () => "IntersectionObserver" in window,
  notification: () => "Notification" in window,
  payment: () => "PaymentRequest" in window,
  screen: () => "mediaDevices" in navigator && "getDisplayMedia" in navigator.mediaDevices,
  visibility: () => "visibilityState" in document,
  wakeLock: () => "wakeLock" in navigator,
  webOTP: () => "OTPCredential" in window,
  webShare: () => "canShare" in navigator && "share" in navigator
};
export {
  check
};
