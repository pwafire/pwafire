// src/pwa/visibility/index.ts
var visibility = async (isVisible, notAvailable) => {
  try {
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
        message: "Visibility API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var displayMode = async (callback) => {
  try {
    window.addEventListener("DOMContentLoaded", () => {
      const displayMode2 = window.matchMedia("(display-mode: standalone)").matches ? "standalone" : window.matchMedia("(display-mode: minimal-ui)").matches ? "minimal-ui" : window.matchMedia("(display-mode: fullscreen)").matches ? "fullscreen" : "broswer-tab";
      callback(displayMode2);
    });
  } catch (error) {
    throw error;
  }
};

export {
  visibility,
  displayMode
};
