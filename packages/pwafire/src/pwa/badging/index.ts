export const setBadge = async (unreadCount: number) => {
  try {
    if (navigator.setAppBadge) {
      await navigator.setAppBadge(unreadCount);
      return { ok: true, message: "Set" };
    } else {
      return {
        ok: false,
        message: "Badging API not supported",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const clearBadge = async () => {
  try {
    if (navigator.clearAppBadge) {
      await navigator.clearAppBadge();
      return { ok: true, message: "Cleared" };
    } else {
      return { ok: false, message: "Badging API not supported" };
    }
  } catch (error) {
    throw error;
  }
};
