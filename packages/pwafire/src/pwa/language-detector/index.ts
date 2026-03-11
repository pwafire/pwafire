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
        message: "Language Detector API not supported",
      };
    }

    const availability = await LanguageDetector.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        message: "Language Detector API not available",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        message: "User activation required",
      };
    }

    const detector = await LanguageDetector.create(options);
    const results = await detector.detect(text);
    detector.destroy();

    return {
      ok: true,
      message: "Language detected",
      results,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to detect language",
    };
  }
};
