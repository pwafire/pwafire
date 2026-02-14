export const connectivity = async () => {
  try {
    const isOnline = navigator.onLine;
    return {
      ok: true,
      message: isOnline ? "Online" : "Offline",
      online: isOnline,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to check connectivity",
      online: false,
    };
  }
};
