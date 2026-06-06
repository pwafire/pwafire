import type { ErrorCode } from "../../types/result";

export const webShare = async (
  data: ShareData,
): Promise<{ ok: boolean; message: string; code?: ErrorCode; cause?: unknown }> => {
  try {
    if (!("canShare" in navigator) || !("share" in navigator)) {
      return { ok: false, code: "unsupported", message: "Web Share API not supported" };
    }
    if (!navigator.canShare(data)) {
      return { ok: false, code: "invalid-argument", message: "Cannot share this data" };
    }
    await navigator.share(data);
    return { ok: true, message: "Shared" };
  } catch (error) {
    let code: ErrorCode = "runtime-error";
    if (error instanceof DOMException) {
      if (error.name === "AbortError") code = "cancelled";
      else if (error.name === "NotAllowedError") code = "permission-denied";
    }
    return {
      ok: false,
      code,
      message: error instanceof Error ? error.message : "Failed to share",
      cause: error,
    };
  }
};
