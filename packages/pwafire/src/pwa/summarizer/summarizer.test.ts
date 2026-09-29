import { summarizer, summarizerStream } from "./index";

type MockSession = {
  summarize: jest.Mock;
  summarizeStreaming: jest.Mock;
  measureInputUsage: jest.Mock;
  destroy: jest.Mock;
  inputQuota: number;
};

const streamOf = (chunks: string[]) => {
  const queue = [...chunks];
  return {
    getReader: () => ({
      read: async () => (queue.length ? { done: false, value: queue.shift() } : { done: true, value: undefined }),
      releaseLock: jest.fn(),
    }),
  };
};

const domError = (name: string): DOMException => new DOMException(name, name);

describe("summarizer", () => {
  let session: MockSession;
  let availability: jest.Mock;
  let create: jest.Mock;

  const options = {
    type: "tldr" as const,
    length: "short" as const,
    format: "plain-text" as const,
    expectedInputLanguages: ["en-US"],
    outputLanguage: "en-US",
    sharedContext: "A technical article",
    context: "Reply with one sentence",
    monitor: jest.fn(),
  };

  beforeEach(() => {
    session = {
      summarize: jest.fn().mockResolvedValue("a summary"),
      summarizeStreaming: jest.fn().mockReturnValue(streamOf(["a ", "summary"])),
      measureInputUsage: jest.fn().mockResolvedValue(10),
      destroy: jest.fn(),
      inputQuota: 100,
    };
    availability = jest.fn().mockResolvedValue("available");
    create = jest.fn().mockResolvedValue(session);
    Object.defineProperty(self, "Summarizer", { configurable: true, value: { availability, create } });
    Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: true } });
  });

  afterEach(() => {
    delete (self as unknown as { Summarizer?: unknown }).Summarizer;
    delete (navigator as unknown as { userActivation?: unknown }).userActivation;
  });

  it("returns unsupported when Summarizer is missing", async () => {
    delete (self as unknown as { Summarizer?: unknown }).Summarizer;
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
  });

  it("checks availability with the same core options it creates with", async () => {
    await summarizer("text", options);
    expect(availability).toHaveBeenCalledWith({
      type: "tldr",
      length: "short",
      format: "plain-text",
      expectedInputLanguages: ["en-US"],
      expectedContextLanguages: undefined,
      outputLanguage: "en-US",
    });
  });

  it("returns unsupported when these options are unavailable", async () => {
    availability.mockResolvedValue("unavailable");
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
    expect(create).not.toHaveBeenCalled();
  });

  it("requires user activation before create", async () => {
    Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: false } });
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "gesture-required" });
    expect(create).not.toHaveBeenCalled();
  });

  it("creates without context and summarizes with context and signal", async () => {
    const controller = new AbortController();
    const result = await summarizer("text", { ...options, signal: controller.signal });

    const { context, ...createOptions } = options;
    expect(create).toHaveBeenCalledWith({ ...createOptions, signal: controller.signal });
    expect(session.summarize).toHaveBeenCalledWith("text", { context, signal: controller.signal });
    expect(result).toMatchObject({ ok: true, summary: "a summary" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it("returns invalid-argument without summarizing when input exceeds the quota", async () => {
    session.measureInputUsage.mockResolvedValue(101);
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "invalid-argument", status: "quota-exceeded" });
    expect(session.summarize).not.toHaveBeenCalled();
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["AbortError", "cancelled"],
    ["NotAllowedError", "permission-denied"],
    ["NotSupportedError", "unsupported"],
    ["QuotaExceededError", "invalid-argument"],
    ["OperationError", "runtime-error"],
  ])("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code });
  });

  it("destroys the session when summarize is aborted", async () => {
    session.summarize.mockRejectedValue(domError("AbortError"));
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "cancelled" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });
});

describe("summarizerStream", () => {
  let session: MockSession;

  beforeEach(() => {
    session = {
      summarize: jest.fn(),
      summarizeStreaming: jest.fn().mockReturnValue(streamOf(["a ", "short ", "summary"])),
      measureInputUsage: jest.fn().mockResolvedValue(10),
      destroy: jest.fn(),
      inputQuota: 100,
    };
    Object.defineProperty(self, "Summarizer", {
      configurable: true,
      value: { availability: jest.fn().mockResolvedValue("available"), create: jest.fn().mockResolvedValue(session) },
    });
    Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: true } });
  });

  afterEach(() => {
    delete (self as unknown as { Summarizer?: unknown }).Summarizer;
    delete (navigator as unknown as { userActivation?: unknown }).userActivation;
  });

  it("delivers chunks in order and forwards context and signal", async () => {
    const controller = new AbortController();
    const chunks: string[] = [];
    const result = await summarizerStream("text", (chunk) => chunks.push(chunk), {
      type: "tldr",
      context: "one sentence",
      signal: controller.signal,
    });

    expect(result).toMatchObject({ ok: true });
    expect(chunks.join("")).toBe("a short summary");
    expect(session.summarizeStreaming).toHaveBeenCalledWith("text", {
      context: "one sentence",
      signal: controller.signal,
    });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it("returns invalid-argument without streaming when input exceeds the quota", async () => {
    session.measureInputUsage.mockResolvedValue(500);
    const result = await summarizerStream("text", jest.fn());
    expect(result).toMatchObject({ ok: false, code: "invalid-argument" });
    expect(session.summarizeStreaming).not.toHaveBeenCalled();
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });
});
