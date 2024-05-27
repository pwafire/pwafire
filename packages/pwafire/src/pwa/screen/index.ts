export const screenSharingControls = async (config: {
  video?: { displaySurface: "browser" | "monitor" | "window" } | boolean;
  monitorTypeSurfaces?: "exclude" | "include";
  surfaceSwitching?: "include" | "exclude";
  selfBrowserSurface?: "include" | "exclude";
  audio?: boolean;
  systemAudio: "exclude" | "include";
}) => {
  if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getDisplayMedia(config);
  } else {
    throw new Error("Screen sharing is not supported in this browser.");
  }
};

export const windowPIP = async (
  callback: (data: { ok: boolean; message: string; window: any }) => void,
  config: {
    height?: number;
    width?: number;
    disallowReturnToOpener?: boolean;
  } = {},
) => {
  const pipButton = document.getElementById("pipButton") as HTMLElement;
  const player = document.getElementById("pipPlayer") as HTMLElement;
  pipButton.addEventListener("click", async () => {
    if ("documentPictureInPicture" in window) {
      const pipWindow = await window.documentPictureInPicture.requestWindow({
        ...config,
        width: config?.width ?? player.clientWidth ?? 300,
        height: config?.height ?? player.clientHeight ?? 150,
      });
      pipWindow.document.body.append(player);
      callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
    } else {
      callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
    }
  });
};
