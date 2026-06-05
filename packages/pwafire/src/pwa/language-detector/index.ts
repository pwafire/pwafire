import type { ErrorCode } from "../../types/result";

export const languageDetector = async (
  text: string,
  options?: {
    monitor?: (monitor: CreateMonitor) => void;
  },
): Promise<{
  ok: boolean;
  message: string;
  /** @deprecated Use `code` instead. Will be removed in v7. */
  status: string;
  results?: unknown;
  code?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("LanguageDetector" in self)) {
      return {
        ok: false,
        status: "not-supported",
        code: "unsupported",
        message: "Language Detector API not supported",
      };
    }

    const availability = await LanguageDetector.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Language Detector API not available",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
        code: "gesture-required",
        message: "User activation required",
      };
    }

    const detector = await LanguageDetector.create(options);
    let results;
    try {
      results = await detector.detect(text);
    } finally {
      detector.destroy();
    }

    return {
      ok: true,
      status: "success",
      message: "Language detected",
      results,
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to detect language",
      cause: error,
    };
  }
};
