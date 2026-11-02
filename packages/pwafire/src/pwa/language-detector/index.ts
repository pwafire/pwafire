import type { ErrorCode } from "../../types/result";

type LanguageDetectorResult = {
  ok: boolean;
  message: string;
  /** @deprecated Use `code` instead. Will be removed in v7. */
  status: string;
  results?: unknown;
  code?: ErrorCode;
  cause?: unknown;
};

type LanguageDetectorFailure = LanguageDetectorResult & { ok: false };

const toFailure = (error: unknown, fallback: string): LanguageDetectorFailure => {
  const message = error instanceof Error ? error.message : fallback;
  const name = error instanceof DOMException || error instanceof Error ? error.name : "";

  if (name === "AbortError") return { ok: false, status: "aborted", code: "cancelled", message, cause: error };
  if (name === "NotAllowedError")
    return { ok: false, status: "not-allowed", code: "permission-denied", message, cause: error };
  if (name === "NotSupportedError")
    return { ok: false, status: "not-supported", code: "unsupported", message, cause: error };
  if (name === "QuotaExceededError")
    return { ok: false, status: "quota-exceeded", code: "invalid-argument", message, cause: error };
  return { ok: false, status: "error", code: "runtime-error", message, cause: error };
};

export const languageDetector = async (
  text: string,
  options?: {
    monitor?: (monitor: CreateMonitor) => void;
  },
): Promise<LanguageDetectorResult> => {
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
    return toFailure(error, "Failed to detect language");
  }
};
