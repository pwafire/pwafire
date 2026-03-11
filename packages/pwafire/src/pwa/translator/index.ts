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
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable" ) {
      return {
        ok: false,
        message: "Translator API not available for this language pair",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        message: "User activation required",
      };
    }

    const translatorSession = await Translator.create(options);
    const translation = await translatorSession.translate(text);
    translatorSession.destroy();

    return {
      ok: true,
      message: "Translated",
      translation,
    };
  } catch (error) {
    return {
      ok: false,
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
        message: "Translator API not supported",
      };
    }

    const availability = await Translator.availability(options);
    if (availability === "unavailable" ) {
      return {
        ok: false,
        message: "Translator API not available for this language pair",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        message: "User activation required",
      };
    }

    const translatorSession = await Translator.create(options);
    const stream = translatorSession.translateStreaming(text);

    let fullTranslation = "";
    for await (const chunk of stream as any) {
      fullTranslation = chunk;
      streamCallback(chunk);
    }

    translatorSession.destroy();

    return {
      ok: true,
      message: "Translated via stream",
      translation: fullTranslation,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to translate",
    };
  }
};
