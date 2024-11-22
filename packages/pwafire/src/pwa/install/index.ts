export const InstallApi = {
  Install: async (type: "before" | "install" | "installed" = "installed", callback: (event: string | any) => any) => {
    try {
      if (navigator.serviceWorker) {
        const methods = {
          checkIfAppInstalled: async () => {
            try {
              window.addEventListener("appinstalled", () => {
                callback("installed");
              });
              return { message: "Check if installed" };
            } catch (error) {
              throw error;
            }
          },
          beforeInstallPromptEvent: async () => {
            try {
              window.addEventListener("beforeinstallprompt", (event: any) => {
                callback(event);
              });
              return { message: "Before install prompt" };
            } catch (error) {
              throw error;
            }
          },
          installApp: async () => {
            try {
              callback("install");
              return { message: "Install App" };
            } catch (error) {
              throw error;
            }
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
            return { message: "Type can be 'install', 'installed' or 'before'" };
        }
      } else {
        throw new Error("Service Worker not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
