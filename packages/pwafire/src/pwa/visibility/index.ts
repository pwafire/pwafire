export const visibility = async () => {
  try {
    if (!document.visibilityState) {
      return {
        ok: false,
        message: "Visibility API not supported",
        state: null,
      };
    }

    const state = document.visibilityState;
    return {
      ok: true,
      message: `Page is ${state}`,
      state,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to check visibility",
      state: null,
    };
  }
};

export const displayMode = async () => {
  try {
    const mode = window.matchMedia("(display-mode: standalone)").matches
      ? "standalone"
      : window.matchMedia("(display-mode: minimal-ui)").matches
      ? "minimal-ui"
      : window.matchMedia("(display-mode: fullscreen)").matches
      ? "fullscreen"
      : "browser-tab";

    return {
      ok: true,
      message: `Display mode: ${mode}`,
      mode,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to detect display mode",
      mode: "browser-tab",
    };
  }
};
