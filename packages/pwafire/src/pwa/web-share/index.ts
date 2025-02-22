export const ShareApi = {
  Share: async (data: ShareData) => {
    try {
      if (data.files) {
        if (navigator.canShare && navigator.canShare(data)) {
          await navigator.share(data);
          return { ok: true, message: "Shared" };
        } else {
          return { ok: false, message: "Share Files API not supported" };
        }
      } else {
        if (navigator.share) {
          await navigator.share(data);
          return { ok: true, message: "Shared" };
        } else {
          return { ok: false, message: "Web Share API not supported" };
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
