export const BadgingApi = {
  setBadge: async (unreadCount: number) => {
    if (navigator.setAppBadge) {
      await navigator.setAppBadge(unreadCount);
      return { ok: true, message: "Set" };
    } else {
      return {
        ok: false,
        message: "Badging API not supported",
      };
    }
  },

  clearBadge: async () => {
    if (navigator.clearAppBadge) {
      await navigator.clearAppBadge();
      return { ok: true, message: "Cleared" };
    } else {
      return { ok: false, message: "Badging API not supported" };
    }
  },
};
