export const InstallApi = {
  Install: async (type: "before" | "install" | "installed" = "installed", callback: (event: string | any) => any) => {
    if (navigator.serviceWorker) {
      const methods = {
        checkIfAppInstalled: async () => {
          window.addEventListener("appinstalled", () => {
            callback("installed");
          });
          return { ok: true, message: "Check if installed" };
        },
        beforeInstallPromptEvent: async () => {
          window.addEventListener("beforeinstallprompt", (event: any) => {
            callback(event);
          });
          return { ok: true, message: "Before install prompt" };
        },
        installApp: async () => {
          callback("install");
          return { ok: true, message: "Install App" };
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
          return { ok: false, message: "Type can be 'install', 'installed' or 'before'" };
      }
    } else {
      return { ok: false, message: "Service Worker not supported" };
    }
  },
};
