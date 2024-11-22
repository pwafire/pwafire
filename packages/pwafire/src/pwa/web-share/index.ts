export const ShareApi = {
  Share: async (data: ShareData) => {
    try {
      if (data.files) {
        if (navigator.canShare && navigator.canShare(data)) {
          await navigator.share(data);
          return { message: "Shared" };
        } else {
          throw new Error("Web Share API not supported");
        }
      } else {
        if (navigator.share) {
          await navigator.share(data);
          return { message: "Shared" };
        } else {
          throw new Error("Web Share API not supported");
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
