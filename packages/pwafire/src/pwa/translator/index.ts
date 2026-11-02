import type { ErrorCode } from "../../types/result";

type TranslatorResult = {
  ok: boolean;
  message: string;
  /** @deprecated Use `code` instead. Will be removed in v7. */
  status: string;
  translation?: string;
  code?: ErrorCode;
  cause?: unknown;
};

type TranslatorFailure = TranslatorResult & { ok: false };

const toFailure = (error: unknown, fallback: string): TranslatorFailure => {
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

export const translator = async (
  text: string,
  options: {
    sourceLanguage: string;
    targetLanguage: string;
  },
): Promise<TranslatorResult> => {
  try {
    if (!("Translator" in self)) {
      return {
        ok: false,
        status: "not-supported",
        code: "unsupported",
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Translator API not available for this language pair",
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

    const translatorSession = await Translator.create(options);
    let translation;
    try {
      translation = await translatorSession.translate(text);
    } finally {
      translatorSession.destroy();
    }

    return {
      ok: true,
      status: "success",
      message: "Translated",
      translation,
    };
  } catch (error) {
    return toFailure(error, "Failed to translate");
  }
};

export const translatorStream = async (
  text: string,
  streamCallback: (chunk: string) => void,
  options: {
    sourceLanguage: string;
    targetLanguage: string;
  },
): Promise<TranslatorResult> => {
  try {
    if (!("Translator" in self)) {
      return {
        ok: false,
        status: "not-supported",
        code: "unsupported",
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Translator API not available for this language pair",
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

    const translatorSession = await Translator.create(options);

    let fullTranslation = "";
    try {
      const stream = translatorSession.translateStreaming(text);
      for await (const chunk of stream as any) {
        fullTranslation = chunk;
        streamCallback(chunk);
      }
    } finally {
      translatorSession.destroy();
    }

    return {
      ok: true,
      status: "success",
      message: "Translated via stream",
      translation: fullTranslation,
    };
  } catch (error) {
    return toFailure(error, "Failed to translate stream");
  }
};
