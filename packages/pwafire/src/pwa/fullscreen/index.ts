export const FullscreenApi = {
  Fullscreen: async () => {
    try {
      if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
        return { ok: true, message: "Fullscreen" };
      } else {
        return { ok: false, message: "Fullscreen disabled" };
      }
    } catch (error) {
      throw error;
    }
  },
};
