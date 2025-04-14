export const webShare = async (data: ShareData) => {
  try {
    if ("canShare" in navigator && "share" in navigator) {
      if (navigator.canShare(data)) {
        await navigator.share(data);
        return { ok: true, message: "Shared" };
      } else {
        return { ok: false, message: "Cannot share this data" };
      }
    } else {
      return { ok: false, message: "Web Share API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
