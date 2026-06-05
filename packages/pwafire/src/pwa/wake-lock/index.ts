import type { ErrorCode } from "../../types/result";

export const wakeLock = async (): Promise<{
  ok: boolean;
  message: string;
  wakeLock?: WakeLockSentinel;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("wakeLock" in navigator)) {
      return { ok: false, code: "unsupported", message: "Wake Lock API not supported" };
    }
    const wakeLock = await navigator.wakeLock.request("screen");
    return { ok: true, message: "Wake lock", wakeLock };
  } catch (error) {
    return {
      ok: false,
      code: error instanceof DOMException && error.name === "NotAllowedError" ? "permission-denied" : "runtime-error",
      message: error instanceof Error ? error.message : "Failed to acquire wake lock",
      cause: error,
    };
  }
};
