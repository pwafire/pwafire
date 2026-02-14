export const connectivity = async (online: () => void, offline: () => void) => {
  try {
    if (navigator.onLine) {
      online();
      return { ok: true, message: "Online" };
    } else {
      offline();
      return { ok: true, message: "Offline" };
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to check connectivity",
    };
  }
};
