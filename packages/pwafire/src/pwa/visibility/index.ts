import type { ErrorCode } from "../../types/result";

const noopListen = (_cb: (state: DocumentVisibilityState) => void) => ({
  unlisten: () => {},
});

export const visibility = (): {
  ok: boolean;
  message: string;
  state: DocumentVisibilityState | null;
  onlisten: typeof noopListen;
  code?: ErrorCode;
  cause?: unknown;
} => {
  try {
    if (!document.visibilityState) {
      return {
        ok: false,
        code: "unsupported",
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
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to check visibility",
      state: null,
      onlisten: noopListen,
      cause: error,
    };
  }
};

export const displayMode = (): {
  ok: boolean;
  message: string;
  mode: "standalone" | "minimal-ui" | "fullscreen" | "browser-tab";
  code?: ErrorCode;
  cause?: unknown;
} => {
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
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to detect display mode",
      mode: "browser-tab",
      cause: error,
    };
  }
};
