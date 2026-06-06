/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const badging = () => "setAppBadge" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const barcode = () => "BarcodeDetector" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const broadcast = () => "BroadcastChannel" in globalThis;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const clipboard = () => "clipboard" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const compression = () => "CompressionStream" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
// Probes navigator.onLine — what `pwa/connectivity` actually reads.
// Earlier versions probed `connection` (Network Information API),
// which is a different feature.
export const connectivity = () => "onLine" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const contacts = () => "contacts" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const contentIndexing = () => "index" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const files = () => "showOpenFilePicker" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const fonts = () => "queryLocalFonts" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
// `document.fullscreenEnabled` honors Permissions-Policy and iframe
// `allowfullscreen` — the actual gating `pwa/fullscreen` faces.
// Mere method presence isn't sufficient.
export const fullscreen = () => typeof document !== "undefined" && document.fullscreenEnabled === true;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const idleDetection = () => "IdleDetector" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
// Probes navigator.serviceWorker — the actual prerequisite for `pwafire.install()`.
// Earlier versions probed `getInstalledRelatedApps`, which answers a different question.
export const install = () => "serviceWorker" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const languageDetector = () => "LanguageDetector" in self;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const lazyLoad = () => "loading" in HTMLImageElement.prototype;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const notification = () => "Notification" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
// `pwa/passkey` needs both the credential type and `navigator.credentials`.
export const passkey = () => "PublicKeyCredential" in window && "credentials" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const payment = () => typeof window.PaymentRequest !== "undefined";
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const screenShare = () => "getDisplayMedia" in navigator.mediaDevices;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const summarizer = () => "Summarizer" in self;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const translator = () => "Translator" in self;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const visibility = () => "visibilityState" in document;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const wakeLock = () => "wakeLock" in navigator;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const webOtp = () => "OTPCredential" in window;
/** @deprecated Use `pwafire/capability` — `.supported` is the boolean. Removed in v7. */
export const webShare = () => "share" in navigator;
