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

type SummarizerFailure = SummarizerStreamResult & { ok: false };

type OpenedSession =
  | { session: Summarizer; summarizeOptions: SummarizerSummarizeOptions }
  | { failure: SummarizerFailure };

const coreOptions = (options: SummarizerOptions): SummarizerCreateCoreOptions => {
  const { type, format, length, expectedInputLanguages, expectedContextLanguages, outputLanguage } = options;
  return { type, format, length, expectedInputLanguages, expectedContextLanguages, outputLanguage };
};

const toFailure = (error: unknown, fallback: string): SummarizerFailure => {
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

const openSession = async (text: string, options: SummarizerOptions = {}): Promise<OpenedSession> => {
  if (!("Summarizer" in self)) {
    return {
      failure: { ok: false, status: "not-supported", code: "unsupported", message: "Summarizer API not supported" },
    };
  }

  const availability = await Summarizer.availability(coreOptions(options));
  if (availability === "unavailable") {
    return {
      failure: {
        ok: false,
        status: "unavailable",
        code: "unsupported",
        message: "Summarizer API not available for these options on this device",
      },
    };
  }

  if (!navigator.userActivation?.isActive) {
    return {
      failure: {
        ok: false,
        status: "user-activation-required",
        code: "gesture-required",
        message: "User activation required",
      },
    };
  }

  const { context, ...createOptions } = options;
  const summarizeOptions: SummarizerSummarizeOptions = { context, signal: options.signal };
  const session = await Summarizer.create(createOptions);

  const usage = await session.measureInputUsage(text, summarizeOptions);
  if (usage > session.inputQuota) {
    session.destroy();
    return {
      failure: {
        ok: false,
        status: "quota-exceeded",
        code: "invalid-argument",
        message: "Input exceeds the summarizer input quota",
      },
    };
  }

  return { session, summarizeOptions };
};

export const summarizer = async (text: string, options?: SummarizerOptions): Promise<SummarizerResult> => {
  try {
    const opened = await openSession(text, options);
    if ("failure" in opened) return opened.failure;

    const { session, summarizeOptions } = opened;
    let summary;
    try {
      summary = await session.summarize(text, summarizeOptions);
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
    return toFailure(error, "Failed to summarize");
  }
};

export const summarizerStream = async (
  text: string,
  callback: (chunk: string) => void,
  options?: SummarizerOptions,
): Promise<SummarizerStreamResult> => {
  try {
    const opened = await openSession(text, options);
    if ("failure" in opened) return opened.failure;

    const { session, summarizeOptions } = opened;
    try {
      const stream = session.summarizeStreaming(text, summarizeOptions);
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
    return toFailure(error, "Failed to summarize stream");
  }
};
