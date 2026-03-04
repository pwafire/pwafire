const noopListen = (_cb: (state: DocumentVisibilityState) => void) => ({
  unlisten: () => {},
});

export const visibility = () => {
  try {
    if (!document.visibilityState) {
      return {
        ok: false,
        message: "Visibility API not supported",
        state: null,
        onlisten: noopListen,
      };
    }

    const state = document.visibilityState;

    const onlisten = (callback: (state: DocumentVisibilityState) => void) => {
      const handler = () => callback(document.visibilityState);
      document.addEventListener("visibilitychange", handler);
      return { unlisten: () => document.removeEventListener("visibilitychange", handler) };
    };

    return {
      ok: true,
      message: `Page is ${state}`,
      state,
      onlisten,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to check visibility",
      state: null,
      onlisten: noopListen,
    };
  }
};

export const displayMode = () => {
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
