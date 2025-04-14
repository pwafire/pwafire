// src/pwa/screen/index.ts
var screenSharingControls = async (config) => {
  if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getDisplayMedia(config);
  } else {
    throw new Error("Screen sharing is not supported in this browser.");
  }
};
var webPIP = async (callback, config = {}) => {
  try {
    const pipButton = document.getElementById("pipButton");
    const player = document.getElementById("pipPlayer");
    if (!pipButton || !player)
      throw new Error("No player or button found.");
    pipButton.addEventListener("click", async () => {
      if ("documentPictureInPicture" in window) {
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          ...config,
          width: config?.width ?? player?.clientWidth,
          height: config?.height ?? player?.clientHeight
        });
        pipWindow.document.body.append(player);
        callback({ ok: true, window: pipWindow, message: "Picture in Picture mode enabled." });
      } else {
        callback({ ok: false, window: null, message: "Picture in Picture is not supported in this browser." });
      }
    });
  } catch (error) {
    throw error;
  }
};

export {
  screenSharingControls,
  webPIP
};
