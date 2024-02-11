export const VisibilityApi = {
  Visibility: async (isVisible: () => void, notAvailable: () => void) => {
    if (document.visibilityState) {
      const state = document.visibilityState;
      if (state === "visible") {
        isVisible();
        return { ok: true, message: "Visible" };
      }
    } else {
      notAvailable();
      return {
        ok: false,
        message: "Visibility API not supported",
      };
    }
  },
  displayMode: async (callback: (mode: "standalone" | "minimal-ui" | "fullscreen" | "broswer-tab") => void) => {
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
  },
};
