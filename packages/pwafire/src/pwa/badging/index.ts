export const BadgingApi = {
  setBadge: async (unreadCount: number) => {
    try {
      if (navigator.setAppBadge) {
        await navigator.setAppBadge(unreadCount);
        return { message: "Badge set" };
      } else {
        throw new Error("Badging API not supported");
      }
    } catch (error) {
      throw error;
    }
  },

  clearBadge: async () => {
    try {
      if (navigator.clearAppBadge) {
        await navigator.clearAppBadge();
        return { message: "Badge cleared" };
      } else {
        throw new Error("Badging API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
