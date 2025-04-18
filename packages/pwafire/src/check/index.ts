// Feature detection methods
export const badging = () => "badging" in navigator;
export const barcode = () => "BarcodeDetector" in window;
export const clipboard = () => "clipboard" in navigator;
export const compression = () => "CompressionStream" in window;
export const connectivity = () => "connection" in navigator;
export const contacts = () => "contacts" in navigator;
export const contentIndexing = () => "index" in window;
export const files = () => "showOpenFilePicker" in window;
export const fonts = () => "fonts" in navigator;
export const fullscreen = () => "requestFullscreen" in document.documentElement;
export const idleDetection = () => "requestIdleCallback" in window;
export const install = () => "getInstalledRelatedApps" in navigator;
export const lazyLoad = () => "loading" in HTMLImageElement.prototype;
export const notification = () => "Notification" in window;
export const payment = () => "PaymentRequest" in window;
export const screen = () => "getScreenDetails" in window;
export const visibility = () => "visibilityState" in document;
export const wakeLock = () => "wakeLock" in navigator;
export const webOtp = () => "OTPCredential" in window;
export const webShare = () => "share" in navigator;
