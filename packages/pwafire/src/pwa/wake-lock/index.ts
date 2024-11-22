export const WakeLockApi = {
  wakeLock: async () => {
    try {
      if ("wakeLock" in navigator) {
        const wakeLock = await navigator?.wakeLock?.request("screen");
        if (wakeLock) {
          return { message: "WakeLock Active", status: "active" };
        } else {
          return { message: "WakeLock Failed", status: "failed" };
        }
      } else {
        throw new Error("WakeLock API not supported");
      }
    } catch (error) {
      throw error;
    }
  },
};
