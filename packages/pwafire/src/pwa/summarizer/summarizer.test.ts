import { summarizer, summarizerStream } from "./index";

type MockSession = {
  summarize: jest.Mock;
  summarizeStreaming: jest.Mock;
  destroy: jest.Mock;
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

const options = {
  type: "tldr" as const,
  length: "short" as const,
  format: "plain-text" as const,
  expectedInputLanguages: ["en-US"],
  outputLanguage: "en-US",
  sharedContext: "A technical article",
  context: "Reply with one sentence",
};

const coreOptions = {
  type: "tldr",
  length: "short",
  format: "plain-text",
  expectedInputLanguages: ["en-US"],
  expectedContextLanguages: undefined,
  outputLanguage: "en-US",
};

const errorCodes = [
  ["AbortError", "cancelled"],
  ["NotAllowedError", "permission-denied"],
  ["NotSupportedError", "unsupported"],
  ["QuotaExceededError", "invalid-argument"],
  ["OperationError", "runtime-error"],
];

let session: MockSession;
let availability: jest.Mock;
let create: jest.Mock;

beforeEach(() => {
  session = {
    summarize: jest.fn().mockResolvedValue("a summary"),
    summarizeStreaming: jest.fn().mockReturnValue(streamOf(["a ", "short ", "summary"])),
    destroy: jest.fn(),
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

describe("summarizer", () => {
  it("returns unsupported when Summarizer is missing", async () => {
    delete (self as unknown as { Summarizer?: unknown }).Summarizer;
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
  });

  it("checks availability with the core options passed to create", async () => {
    const result = await summarizer("text", options);
    expect(availability).toHaveBeenCalledWith(coreOptions);
    expect(create).toHaveBeenCalledWith(options);
    expect(result).toMatchObject({ ok: true, summary: "a summary" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it("returns unsupported without creating when these options are unavailable", async () => {
    availability.mockResolvedValue("unavailable");
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
    expect(create).not.toHaveBeenCalled();
  });

  it.each(errorCodes)("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code });
  });

  it("maps an error from summarize and still destroys the session", async () => {
    session.summarize.mockRejectedValue(domError("QuotaExceededError"));
    const result = await summarizer("text", options);
    expect(result).toMatchObject({ ok: false, code: "invalid-argument", status: "quota-exceeded" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });
});

describe("summarizerStream", () => {
  it("checks availability with core options and delivers chunks in order", async () => {
    const chunks: string[] = [];
    const result = await summarizerStream("text", (chunk) => chunks.push(chunk), options);

    expect(availability).toHaveBeenCalledWith(coreOptions);
    expect(result).toMatchObject({ ok: true });
    expect(chunks.join("")).toBe("a short summary");
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it.each(errorCodes)("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await summarizerStream("text", jest.fn(), options);
    expect(result).toMatchObject({ ok: false, code });
  });
});
