// src/pwa/wake-lock/index.ts
var wakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      const wakeLock2 = await navigator.wakeLock.request("screen");
      return { ok: true, message: "Wake lock", wakeLock: wakeLock2 };
    } else {
      return { ok: false, message: "Wake Lock API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  wakeLock
};
