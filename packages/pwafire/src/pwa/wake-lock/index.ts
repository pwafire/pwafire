export const wakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock = await navigator.wakeLock.request("screen");
      return { ok: true, message: "Wake lock", wakeLock };
    } else {
      return { ok: false, message: "Wake Lock API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
