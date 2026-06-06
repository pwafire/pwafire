import type { ErrorCode } from "../../types/result";

export const fullscreen = async (): Promise<{
  ok: boolean;
  message: string;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!document.fullscreenEnabled) {
      return { ok: false, code: "unsupported", message: "Fullscreen API not supported" };
    }
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return { ok: true, message: "Fullscreen" };
    }
    await document.exitFullscreen();
    return { ok: true, message: "Exit fullscreen" };
  } catch (error) {
    let code: ErrorCode = "runtime-error";
    if (error instanceof TypeError) code = "gesture-required";
    else if (error instanceof DOMException && error.name === "NotAllowedError") code = "permission-denied";
    return {
      ok: false,
      code,
      message: error instanceof Error ? error.message : "Failed to toggle fullscreen",
      cause: error,
    };
  }
};
