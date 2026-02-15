export const summarizer = async (text: string, options?: SummarizerOptions) => {
  try {
    if (!("Summarizer" in self)) {
      return {
        ok: false,
        status: "not-supported",
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        message: "Summarizer API not available on this device",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
        message: "User activation required",
      };
    }

    const session = await Summarizer.create(options);
    const summary = await session.summarize(text, options?.context ? { context: options.context } : undefined);
    session.destroy();
    return {
      ok: true,
      status: "success",
      message: "Summarized",
      summary,
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
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
        status: "not-supported",
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        message: "Summarizer API not available on this device",
      };
    }

    if (!navigator.userActivation?.isActive) {
      return {
        ok: false,
        status: "user-activation-required",
        message: "User activation required",
      };
    }

    const session = await Summarizer.create(options);
    const stream = session.summarizeStreaming(text, options?.context ? { context: options.context } : undefined);

    for await (const chunk of stream) {
      callback(chunk);
    }

    session.destroy();

    return {
      ok: true,
      status: "success",
      message: "Streaming complete",
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      message: error instanceof Error ? error.message : "Failed to summarize stream",
    };
  }
};
