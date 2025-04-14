// src/pwa/fullscreen/index.ts
var fullscreen = async () => {
  try {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        return { ok: true, message: "Fullscreen" };
      } else {
        await document.exitFullscreen();
        return { ok: true, message: "Exit fullscreen" };
      }
    } else {
      return { ok: false, message: "Fullscreen API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  fullscreen
};
