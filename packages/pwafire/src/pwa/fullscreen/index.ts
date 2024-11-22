export const FullscreenApi = {
  Fullscreen: async () => {
    try {
      if (document.fullscreenEnabled) {
        await document.documentElement.requestFullscreen();
        return { message: "Fullscreen" };
      } else {
        throw new Error("Fullscreen API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
