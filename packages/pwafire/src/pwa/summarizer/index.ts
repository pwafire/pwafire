import type { ErrorCode } from "../../types/result";

type SummarizerOptions = SummarizerCreateOptions & { context?: string };

type SummarizerResult = {
  ok: boolean;
  message: string;
  /** @deprecated Use `code` instead. Will be removed in v7. */
  status: string;
  summary?: string;
  code?: ErrorCode;
  cause?: unknown;
};

type SummarizerStreamResult = {
  ok: boolean;
  message: string;
  /** @deprecated Use `code` instead. Will be removed in v7. */
  status: string;
  code?: ErrorCode;
  cause?: unknown;
};

export const summarizer = async (text: string, options?: SummarizerOptions): Promise<SummarizerResult> => {
  try {
    if (!("Summarizer" in self)) {
      return {
        ok: false,
        status: "not-supported",
        code: "unsupported",
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Summarizer API not available on this device",
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

    const session = await Summarizer.create(options);
    let summary;
    try {
      summary = await session.summarize(text, options?.context ? { context: options.context } : undefined);
    } finally {
      session.destroy();
    }
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
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to summarize",
      cause: error,
    };
  }
};

export const summarizerStream = async (
  text: string,
  callback: (chunk: string) => void,
  options?: SummarizerOptions,
): Promise<SummarizerStreamResult> => {
  try {
    if (!("Summarizer" in self)) {
      return {
        ok: false,
        status: "not-supported",
        code: "unsupported",
        message: "Summarizer API not supported",
      };
    }

    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      return {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Summarizer API not available on this device",
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

    const session = await Summarizer.create(options);
    try {
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
    } finally {
      session.destroy();
    }

    return {
      ok: true,
      status: "success",
      message: "Streaming complete",
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      code: "runtime-error",
      message: error instanceof Error ? error.message : "Failed to summarize stream",
      cause: error,
    };
  }
};
