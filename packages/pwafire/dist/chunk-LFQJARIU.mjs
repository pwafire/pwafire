// src/pwa/badging/index.ts
var setBadge = async (unreadCount) => {
  try {
    if (navigator.setAppBadge) {
      await navigator.setAppBadge(unreadCount);
      return { ok: true, message: "Set" };
    } else {
      return {
        ok: false,
        message: "Badging API not supported"
      };
    }
  } catch (error) {
    throw error;
  }
};
var clearBadge = async () => {
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

export {
  setBadge,
  clearBadge
};
