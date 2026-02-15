export const translator = async (
  text: string,
  options: {
    sourceLanguage: string;
    targetLanguage: string;
  },
) => {
  try {
    if (!("Translator" in self)) {
      return {
        ok: false,
        status: "not-supported",
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable" || availability === "no") {
      return {
        ok: false,
        status: "unavailable",
        message: "Translator API not available for this language pair",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
        message: "User activation required",
      };
    }

    const translatorSession = await Translator.create(options);
    const translation = await translatorSession.translate(text);
    translatorSession.destroy();

    return {
      ok: true,
      status: "success",
      message: "Translated",
      translation,
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      message: error instanceof Error ? error.message : "Failed to translate",
    };
  }
};

export const translatorStream = async (
  text: string,
  streamCallback: (chunk: string) => void,
  options: {
    sourceLanguage: string;
    targetLanguage: string;
  },
) => {
  try {
    if (!("Translator" in self)) {
      return {
        ok: false,
        status: "not-supported",
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable" || availability === "no") {
      return {
        ok: false,
        status: "unavailable",
        message: "Translator API not available for this language pair",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
        message: "User activation required",
      };
    }

    const translatorSession = await Translator.create(options);
    const stream = translatorSession.translateStreaming(text);

    let fullTranslation = "";
    for await (const chunk of stream) {
      fullTranslation = chunk;
      streamCallback(chunk);
    }

    translatorSession.destroy();

    return {
      ok: true,
      status: "success",
      message: "Translated via stream",
      translation: fullTranslation,
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      message: error instanceof Error ? error.message : "Failed to translate",
    };
  }
};
