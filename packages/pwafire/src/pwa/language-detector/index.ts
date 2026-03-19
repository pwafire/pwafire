export const languageDetector = async (
  text: string,
  options?: {
    monitor?: (monitor: CreateMonitor) => void;
  },
) => {
  try {
    if (!("LanguageDetector" in self)) {
      return {
        ok: false,
        status: "not-supported",
        message: "Language Detector API not supported",
      };
    }

    const availability = await LanguageDetector.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        message: "Language Detector API not available",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
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
      message: error instanceof Error ? error.message : "Failed to detect language",
    };
  }
};
