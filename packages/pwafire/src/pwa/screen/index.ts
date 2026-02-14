export const screenShare = async (config: {
  video: { displaySurface: "browser" | "monitor" | "window" } | boolean;
  monitorTypeSurfaces?: "exclude" | "include";
  surfaceSwitching?: "include" | "exclude";
  selfBrowserSurface?: "include" | "exclude";
  audio?: boolean;
  systemAudio: "exclude" | "include";
}) => {
  try {
    if (!navigator.mediaDevices || !("getDisplayMedia" in navigator.mediaDevices)) {
      return {
        ok: false,
        message: "Screen sharing is not supported in this browser",
        stream: null,
      };
    }

    const stream = await navigator.mediaDevices.getDisplayMedia(config as DisplayMediaStreamOptions);
    return {
      ok: true,
      message: "Screen sharing started",
      stream,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to start screen sharing",
      stream: null,
    };
  }
};

export const webPIP = async (
  callback?: (data: { ok: boolean; message: string; window: Window | null }) => void,
  config: {
    height?: number;
    width?: number;
    disallowReturnToOpener?: boolean;
  } = {},
) => {
  try {
    const pipButton = document.getElementById("pip-button") as HTMLElement;
    const player = document.getElementById("pip-player") as HTMLElement;
    if (!pipButton || !player) {
      return {
        ok: false,
        message: "No player or button found.",
        window: null,
      };
    }

    pipButton.addEventListener("click", async () => {
      if ("documentPictureInPicture" in window && window.documentPictureInPicture) {
        const pipWindow = await (window.documentPictureInPicture as any).requestWindow({
          ...config,
          width: config?.width ?? player?.clientWidth,
          height: config?.height ?? player?.clientHeight,
        });
        pipWindow.document.body.append(player);
        if (callback) callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
      } else {
        if (callback) callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
      }
    });

    return {
      ok: true,
      message: "Picture in Picture listener setup complete",
      window: null,
    };
  } catch (error) {
    return {
      ok: false,
      window: null,
      message: error instanceof Error ? error.message : "Failed to setup Picture in Picture",
    };
  }
};
