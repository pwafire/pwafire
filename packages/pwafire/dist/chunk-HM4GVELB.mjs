// src/pwa/install/index.ts
var install = async (type = "installed", callback) => {
  try {
    if (navigator.serviceWorker) {
      const methods = {
        checkIfAppInstalled: async () => {
          try {
            window.addEventListener("appinstalled", () => {
              callback("installed");
            });
            return { ok: true, message: "Check if installed" };
          } catch (error) {
            throw error;
          }
        },
        beforeInstallPromptEvent: async () => {
          try {
            window.addEventListener("beforeinstallprompt", (event) => {
              callback(event);
            });
            return { ok: true, message: "Before install prompt" };
          } catch (error) {
            throw error;
          }
        },
        installApp: async () => {
          try {
            callback("install");
            return { ok: true, message: "Install App" };
          } catch (error) {
            throw error;
          }
        }
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
  } catch (error) {
    throw error;
  }
};

export {
  install
};
