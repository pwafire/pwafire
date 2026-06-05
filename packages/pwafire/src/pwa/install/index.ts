import type { ErrorCode } from "../../types/result";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const install = async (
  type: "before" | "install" | "installed" = "installed",
  callback?: (event: string | BeforeInstallPromptEvent) => void,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    if (!navigator.serviceWorker) {
      return { ok: false, code: "unsupported", message: "Service Worker not supported" };
    }

    const methods = {
      checkIfAppInstalled: async () => {
        if (callback) window.addEventListener("appinstalled", () => callback("installed"));
        return { ok: true, message: "Listening for app installed event" };
      },
      beforeInstallPromptEvent: async () => {
        if (callback)
          window.addEventListener("beforeinstallprompt", (event: Event) => callback(event as BeforeInstallPromptEvent));
        return { ok: true, message: "Listening for before install prompt" };
      },
      installApp: async () => {
        if (callback) callback("install");
        return { ok: true, message: "Install triggered" };
      },
    };

    switch (type) {
      case "before":
        return await methods.beforeInstallPromptEvent();
      case "install":
        return await methods.installApp();
      case "installed":
        return await methods.checkIfAppInstalled();
      default:
        return { ok: false, code: "invalid-argument", message: "Type can be 'install', 'installed' or 'before'" };
    }
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to handle install event",
      cause: error,
    };
  }
};
