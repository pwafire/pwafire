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
  callback: (data: { ok: boolean; message: string; window: Window | null }) => void,
  config: {
    height?: number;
    width?: number;
    disallowReturnToOpener?: boolean;
  } = {},
) => {
  try {
    const pipButton = document.getElementById("pip-button") as HTMLElement;
    const player = document.getElementById("pip-player") as HTMLElement;
    if (!pipButton || !player) throw new Error("No player or button found.");
    pipButton.addEventListener("click", async () => {
      if ("documentPictureInPicture" in window && window.documentPictureInPicture) {
        const pipWindow = await (window.documentPictureInPicture as any).requestWindow({
          ...config,
          width: config?.width ?? player?.clientWidth,
          height: config?.height ?? player?.clientHeight,
        });
        pipWindow.document.body.append(player);
        callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
      } else {
        callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
      }
    });
  } catch (error) {
    callback({
      ok: false,
      window: null,
      message: error instanceof Error ? error.message : "Failed to enable Picture in Picture",
    });
  }
};
