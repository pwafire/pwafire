export const WakeLockApi = {
  wakeLock: async () => {
    if ("wakeLock" in navigator) {
      const wakeLock = await (navigator.wakeLock as any).request("screen");
      if (wakeLock) {
        return { ok: true, message: "WakeLock Active" };
      } else {
        return { ok: false, message: "WakeLock Failed" };
      }
    } else {
      return { ok: false, message: "WakeLock API not supported" };
    }
  },
};
