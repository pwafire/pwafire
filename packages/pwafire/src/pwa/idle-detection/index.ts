export const idleDetection = async (
  action = "start",
  callback = () => {
    // do something
  },
  threshold = 60000,
) => {
  try {
    if ("IdleDetector" in window) {
      const state = await IdleDetector.requestPermission();
      if (state === "granted") {
        const controller = new AbortController();
        const signal = controller.signal;
        const idleDetector = new IdleDetector();
        idleDetector.addEventListener("change", () => {
          const userState = idleDetector.userState;
          if (userState === "idle") callback();
        });
        if (action === "start") {
          await idleDetector.start({
            threshold: threshold > 60000 ? threshold : 60000,
            signal,
          });
          return { ok: true, message: "Started" };
        } else {
          controller.abort();
          return { ok: true, message: "Aborted" };
        }
      } else {
        return { ok: false, message: "Need to request permission first" };
      }
    } else {
      return { ok: false, message: "Idle Detection API not supported" };
    }
  } catch (error) {
    throw error;
  }
};