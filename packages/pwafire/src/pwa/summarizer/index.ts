type SummarizerOptions = SummarizerCreateOptions & { context?: string };

export const summarizer = async (text: string, options?: SummarizerOptions) => {
  try {
    if (!("Summarizer" in self)) {
      return {
        ok: false,
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        message: "Summarizer API not available on this device",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        message: "User activation required",
      };
    }

    const session = await Summarizer.create(options);
    const summary = await session.summarize(text, options?.context ? { context: options.context } : undefined);
    session.destroy();
    return {
      ok: true,
      message: "Summarized",
      summary,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to summarize",
    };
  }
};

export const summarizerStream = async (
  text: string,
  callback: (chunk: string) => void,
  options?: SummarizerOptions,
) => {
  try {
    if (!("Summarizer" in self)) {
      return {
        ok: false,
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        message: "Summarizer API not available on this device",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        message: "User activation required",
      };
    }

    const session = await Summarizer.create(options);
    const stream = session.summarizeStreaming(text, options?.context ? { context: options.context } : undefined);
    const reader = stream.getReader();

    try {
      let result = await reader.read();
      while (!result.done) {
        callback(result.value);
        result = await reader.read();
      }
    } finally {
      reader.releaseLock();
    }

    session.destroy();

    return {
      ok: true,
      message: "Streaming complete",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to summarize stream",
    };
  }
};
