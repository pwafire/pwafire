import type { Capability, CapabilityReason } from "../types/capability";

const apiExists = (probe: () => boolean): boolean => {
  try {
    return probe();
  } catch {
    return false;
  }
};

const inSecureContext = (): boolean =>
  typeof window !== "undefined" && window.isSecureContext === true;

const hasUserActivation = (): boolean =>
  typeof navigator !== "undefined" && navigator.userActivation?.isActive === true;

type Meta = {
  requiresUserActivation: boolean;
  requiresSecureContext?: boolean;
  spec?: string;
  mdn?: string;
  since?: Capability["since"];
};

const make = (probe: () => boolean, meta: Meta): Capability => {
  const secureContext = inSecureContext();
  const { requiresUserActivation, requiresSecureContext, ...rest } = meta;
  const base = { secureContext, requiresUserActivation, ...rest };
  if (!apiExists(probe)) return { supported: false, reason: "no-api", ...base };
  if (requiresSecureContext && !secureContext) return { supported: false, reason: "insecure-context", ...base };
  if (requiresUserActivation && !hasUserActivation()) return { supported: false, reason: "no-user-activation", ...base };
  return { supported: true, ...base };
};

const SPEC = {
  badging: "https://w3c.github.io/badging/",
  barcode: "https://wicg.github.io/shape-detection-api/",
  broadcast: "https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts",
  clipboard: "https://w3c.github.io/clipboard-apis/",
  compression: "https://wicg.github.io/compression/",
  connectivity: "https://html.spec.whatwg.org/multipage/system-state.html#dom-navigator-online",
  contacts: "https://w3c.github.io/contact-api/",
  contentIndexing: "https://wicg.github.io/content-index/spec/",
  files: "https://wicg.github.io/file-system-access/",
  fonts: "https://wicg.github.io/local-font-access/",
  fullscreen: "https://fullscreen.spec.whatwg.org/",
  idleDetection: "https://wicg.github.io/idle-detection/",
  install: "https://web.dev/customize-install/",
  languageDetector: "https://github.com/WICG/translation-api#language-detection",
  lazyLoad: "https://html.spec.whatwg.org/multipage/urls-and-fetching.html#lazy-loading-attributes",
  notification: "https://notifications.spec.whatwg.org/",
  passkey: "https://w3c.github.io/webauthn/",
  payment: "https://w3c.github.io/payment-request/",
  pip: "https://wicg.github.io/document-picture-in-picture/",
  screenShare: "https://w3c.github.io/mediacapture-screen-share/",
  summarizer: "https://github.com/WICG/writing-assistance-apis",
  translator: "https://github.com/WICG/translation-api",
  visibility: "https://www.w3.org/TR/page-visibility-2/",
  wakeLock: "https://www.w3.org/TR/screen-wake-lock/",
  webOtp: "https://wicg.github.io/web-otp/",
  webShare: "https://www.w3.org/TR/web-share/",
} as const;

const MDN = {
  badging: "https://developer.mozilla.org/docs/Web/API/Badging_API",
  barcode: "https://developer.mozilla.org/docs/Web/API/Barcode_Detection_API",
  broadcast: "https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API",
  clipboard: "https://developer.mozilla.org/docs/Web/API/Clipboard_API",
  compression: "https://developer.mozilla.org/docs/Web/API/Compression_Streams_API",
  connectivity: "https://developer.mozilla.org/docs/Web/API/Navigator/onLine",
  contacts: "https://developer.mozilla.org/docs/Web/API/Contact_Picker_API",
  contentIndexing: "https://developer.mozilla.org/docs/Web/API/Content_Index_API",
  files: "https://developer.mozilla.org/docs/Web/API/File_System_Access_API",
  fonts: "https://developer.mozilla.org/docs/Web/API/Local_Font_Access_API",
  fullscreen: "https://developer.mozilla.org/docs/Web/API/Fullscreen_API",
  idleDetection: "https://developer.mozilla.org/docs/Web/API/Idle_Detection_API",
  install: "https://developer.mozilla.org/docs/Web/Progressive_web_apps",
  lazyLoad: "https://developer.mozilla.org/docs/Web/HTML/Element/img#loading",
  notification: "https://developer.mozilla.org/docs/Web/API/Notifications_API",
  passkey: "https://developer.mozilla.org/docs/Web/API/Web_Authentication_API",
  payment: "https://developer.mozilla.org/docs/Web/API/Payment_Request_API",
  pip: "https://developer.mozilla.org/docs/Web/API/Document_Picture-in-Picture_API",
  screenShare: "https://developer.mozilla.org/docs/Web/API/Screen_Capture_API",
  visibility: "https://developer.mozilla.org/docs/Web/API/Page_Visibility_API",
  wakeLock: "https://developer.mozilla.org/docs/Web/API/Screen_Wake_Lock_API",
  webOtp: "https://developer.mozilla.org/docs/Web/API/WebOTP_API",
  webShare: "https://developer.mozilla.org/docs/Web/API/Web_Share_API",
} as const;

export const badging = (): Capability =>
  make(() => "setAppBadge" in navigator, {
    requiresUserActivation: false,
    requiresSecureContext: true,
    spec: SPEC.badging,
    mdn: MDN.badging,
  });

export const barcode = (): Capability =>
  make(() => "BarcodeDetector" in window, {
    requiresUserActivation: false,
    spec: SPEC.barcode,
    mdn: MDN.barcode,
  });

export const broadcast = (): Capability =>
  make(() => "BroadcastChannel" in globalThis, {
    requiresUserActivation: false,
    spec: SPEC.broadcast,
    mdn: MDN.broadcast,
  });

export const clipboard = (): Capability =>
  make(() => "clipboard" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.clipboard,
    mdn: MDN.clipboard,
  });

export const compression = (): Capability =>
  make(() => "CompressionStream" in window, {
    requiresUserActivation: false,
    spec: SPEC.compression,
    mdn: MDN.compression,
  });

export const connectivity = (): Capability =>
  make(() => typeof navigator !== "undefined" && "onLine" in navigator, {
    requiresUserActivation: false,
    spec: SPEC.connectivity,
    mdn: MDN.connectivity,
  });

export const contacts = (): Capability =>
  make(() => "contacts" in navigator && "ContactsManager" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.contacts,
    mdn: MDN.contacts,
  });

export const contentIndexing = (): Capability =>
  make(() => "serviceWorker" in navigator, {
    requiresUserActivation: false,
    requiresSecureContext: true,
    spec: SPEC.contentIndexing,
    mdn: MDN.contentIndexing,
  });

export const files = (): Capability =>
  make(() => "showOpenFilePicker" in self, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.files,
    mdn: MDN.files,
  });

export const fonts = (): Capability =>
  make(() => "queryLocalFonts" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.fonts,
    mdn: MDN.fonts,
  });

export const fullscreen = (): Capability =>
  make(() => typeof document !== "undefined" && document.fullscreenEnabled === true, {
    requiresUserActivation: true,
    spec: SPEC.fullscreen,
    mdn: MDN.fullscreen,
  });

export const idleDetection = (): Capability =>
  make(() => "IdleDetector" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.idleDetection,
    mdn: MDN.idleDetection,
  });

export const install = (): Capability =>
  make(() => "serviceWorker" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.install,
    mdn: MDN.install,
  });

export const languageDetector = (): Capability =>
  make(() => "LanguageDetector" in self, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.languageDetector,
  });

export const lazyLoad = (): Capability =>
  make(
    () => typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype,
    {
      requiresUserActivation: false,
      spec: SPEC.lazyLoad,
      mdn: MDN.lazyLoad,
    },
  );

export const notification = (): Capability =>
  make(() => "Notification" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.notification,
    mdn: MDN.notification,
  });

export const passkey = (): Capability =>
  make(() => "PublicKeyCredential" in window && "credentials" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.passkey,
    mdn: MDN.passkey,
  });

export const payment = (): Capability =>
  make(() => typeof window !== "undefined" && typeof window.PaymentRequest !== "undefined", {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.payment,
    mdn: MDN.payment,
  });

export const pip = (): Capability =>
  make(() => "documentPictureInPicture" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.pip,
    mdn: MDN.pip,
  });

export const screenShare = (): Capability =>
  make(
    () =>
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices &&
      "getDisplayMedia" in navigator.mediaDevices,
    {
      requiresUserActivation: true,
      requiresSecureContext: true,
      spec: SPEC.screenShare,
      mdn: MDN.screenShare,
    },
  );

export const summarizer = (): Capability =>
  make(() => "Summarizer" in self, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.summarizer,
  });

export const translator = (): Capability =>
  make(() => "Translator" in self, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.translator,
  });

export const visibility = (): Capability =>
  make(() => typeof document !== "undefined" && "visibilityState" in document, {
    requiresUserActivation: false,
    spec: SPEC.visibility,
    mdn: MDN.visibility,
  });

export const wakeLock = (): Capability =>
  make(() => "wakeLock" in navigator, {
    requiresUserActivation: false,
    requiresSecureContext: true,
    spec: SPEC.wakeLock,
    mdn: MDN.wakeLock,
  });

export const webOtp = (): Capability =>
  make(() => "OTPCredential" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.webOtp,
    mdn: MDN.webOtp,
  });

export const webShare = (): Capability =>
  make(() => "canShare" in navigator && "share" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
    spec: SPEC.webShare,
    mdn: MDN.webShare,
  });

export type { Capability, CapabilityReason };
