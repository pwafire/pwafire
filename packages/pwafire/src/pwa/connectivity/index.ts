import type { ErrorCode } from "../../types/result";

export const connectivity = (): {
  ok: boolean;
  message: string;
  online: boolean;
  code?: ErrorCode;
  cause?: unknown;
} => {
  try {
    const isOnline = navigator.onLine;
    return {
      ok: true,
      message: isOnline ? "Online" : "Offline",
      online: isOnline,
    };
  } catch (error) {
    return {
      ok: false,
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to check connectivity",
      online: false,
      cause: error,
    };
  }
};
