// src/pwa/idle-detection/index.ts
var idleDetection = async (action = "start") => {
  try {
    if ("IdleDetector" in window) {
      const idleDetector = new IdleDetector();
      if (action === "start") {
        await idleDetector.start();
        return { ok: true, message: "Idle detection started" };
      } else {
        await idleDetector.stop();
        return { ok: true, message: "Idle detection stopped" };
      }
    } else {
      return { ok: false, message: "Idle Detection API not supported" };
    }
  } catch (error) {
    throw error;
  }
};

export {
  idleDetection
};
