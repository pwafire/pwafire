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
};

const make = (probe: () => boolean, meta: Meta): Capability => {
  const secureContext = inSecureContext();
  const { requiresUserActivation, requiresSecureContext } = meta;
  const base = { secureContext, requiresUserActivation };
  if (!apiExists(probe)) return { supported: false, reason: "no-api", ...base };
  if (requiresSecureContext && !secureContext) return { supported: false, reason: "insecure-context", ...base };
  if (requiresUserActivation && !hasUserActivation()) return { supported: false, reason: "no-user-activation", ...base };
  return { supported: true, ...base };
};

export const badging = (): Capability =>
  make(() => "setAppBadge" in navigator, { requiresUserActivation: false, requiresSecureContext: true });

export const barcode = (): Capability =>
  make(() => "BarcodeDetector" in window, { requiresUserActivation: false });

export const broadcast = (): Capability =>
  make(() => "BroadcastChannel" in globalThis, { requiresUserActivation: false });

export const clipboard = (): Capability =>
  make(() => "clipboard" in navigator, { requiresUserActivation: true, requiresSecureContext: true });

export const compression = (): Capability =>
  make(() => "CompressionStream" in window, { requiresUserActivation: false });

export const connectivity = (): Capability =>
  make(() => typeof navigator !== "undefined" && "onLine" in navigator, { requiresUserActivation: false });

export const contacts = (): Capability =>
  make(() => "contacts" in navigator && "ContactsManager" in window, {
    requiresUserActivation: true,
    requiresSecureContext: true,
  });

export const contentIndexing = (): Capability =>
  make(() => "serviceWorker" in navigator, { requiresUserActivation: false, requiresSecureContext: true });

export const files = (): Capability =>
  make(() => "showOpenFilePicker" in self, { requiresUserActivation: true, requiresSecureContext: true });

export const fonts = (): Capability =>
  make(() => "queryLocalFonts" in window, { requiresUserActivation: true, requiresSecureContext: true });

export const fullscreen = (): Capability =>
  make(() => typeof document !== "undefined" && document.fullscreenEnabled === true, {
    requiresUserActivation: true,
  });

export const idleDetection = (): Capability =>
  make(() => "IdleDetector" in window, { requiresUserActivation: true, requiresSecureContext: true });

// `install()` just registers `appinstalled` / `beforeinstallprompt`
// listeners (or fires a callback). Activation is only needed at the
// downstream `BeforeInstallPromptEvent.prompt()` call, which is the
// consumer's responsibility — not pwafire's call surface.
export const install = (): Capability =>
  make(() => "serviceWorker" in navigator, { requiresUserActivation: false, requiresSecureContext: true });

export const languageDetector = (): Capability =>
  make(() => "LanguageDetector" in self, { requiresUserActivation: true, requiresSecureContext: true });

export const lazyLoad = (): Capability =>
  make(() => typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype, {
    requiresUserActivation: false,
  });

export const notification = (): Capability =>
  make(() => "Notification" in window, { requiresUserActivation: true, requiresSecureContext: true });

export const passkey = (): Capability =>
  make(() => "PublicKeyCredential" in window && "credentials" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
  });

export const payment = (): Capability =>
  make(() => typeof window !== "undefined" && typeof window.PaymentRequest !== "undefined", {
    requiresUserActivation: true,
    requiresSecureContext: true,
  });

export const pip = (): Capability =>
  make(() => "documentPictureInPicture" in window, { requiresUserActivation: true, requiresSecureContext: true });

export const screenShare = (): Capability =>
  make(
    () =>
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices &&
      "getDisplayMedia" in navigator.mediaDevices,
    { requiresUserActivation: true, requiresSecureContext: true },
  );

export const summarizer = (): Capability =>
  make(() => "Summarizer" in self, { requiresUserActivation: true, requiresSecureContext: true });

export const translator = (): Capability =>
  make(() => "Translator" in self, { requiresUserActivation: true, requiresSecureContext: true });

export const visibility = (): Capability =>
  make(() => typeof document !== "undefined" && "visibilityState" in document, { requiresUserActivation: false });

export const wakeLock = (): Capability =>
  make(() => "wakeLock" in navigator, { requiresUserActivation: false, requiresSecureContext: true });

export const webOtp = (): Capability =>
  make(() => "OTPCredential" in window, { requiresUserActivation: true, requiresSecureContext: true });

export const webShare = (): Capability =>
  make(() => "canShare" in navigator && "share" in navigator, {
    requiresUserActivation: true,
    requiresSecureContext: true,
  });

export type { Capability, CapabilityReason };
