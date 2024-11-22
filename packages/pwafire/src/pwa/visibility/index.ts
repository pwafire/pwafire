export const VisibilityApi = {
  Visibility: async (isVisible: () => void, notAvailable: () => void) => {
    try {
      if (document.visibilityState) {
        const state = document.visibilityState;
        if (state === "visible") {
          isVisible();
          return { message: "Visible", status: "visible" };
        }
      } else {
        notAvailable();
        return {
          message: "Visibility API not supported",
          status: "not-supported",
        };
      }
    } catch (error) {
      throw error;
    }
  },
  displayMode: async (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => {
    try {
      window.addEventListener("DOMContentLoaded", () => {
        const displayMode = window.matchMedia("(display-mode: standalone)").matches
          ? "standalone"
          : window.matchMedia("(display-mode: minimal-ui)").matches
          ? "minimal-ui"
          : window.matchMedia("(display-mode: fullscreen)").matches
          ? "fullscreen"
          : "broswer-tab";
        callback(displayMode);
      });
    } catch (error) {
      throw error;
    }
  },
};
