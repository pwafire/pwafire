import type { ErrorCode } from "../../types/result";

export const idleDetection = async (
  action = "start",
  callback = () => {},
  threshold = 60000,
): Promise<{
  ok: boolean;
  message: string;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("IdleDetector" in window)) {
      return { ok: false, code: "unsupported", message: "Idle Detection API not supported" };
    }
    const state = await IdleDetector.requestPermission();
    if (state !== "granted") {
      return { ok: false, code: "permission-denied", message: "Need to request permission first" };
    }
    const controller = new AbortController();
    const signal = controller.signal;
    const idleDetector = new IdleDetector() as any;
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
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to detect idle state",
      cause: error,
    };
  }
};
