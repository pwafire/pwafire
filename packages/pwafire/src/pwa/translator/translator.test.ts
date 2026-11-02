import { translator, translatorStream } from "./index";

type MockSession = {
  translate: jest.Mock;
  translateStreaming: jest.Mock;
  destroy: jest.Mock;
};

const asyncStreamOf = (chunks: string[]) => {
  return {
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) {
        yield chunk;
      }
    },
  };
};

const domError = (name: string): DOMException => new DOMException(name, name);

const options = {
  sourceLanguage: "en",
  targetLanguage: "es",
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
    translate: jest.fn().mockResolvedValue("hola"),
    translateStreaming: jest.fn().mockReturnValue(asyncStreamOf(["ho", "la"])),
    destroy: jest.fn(),
  };
  availability = jest.fn().mockResolvedValue("available");
  create = jest.fn().mockResolvedValue(session);
  Object.defineProperty(self, "Translator", { configurable: true, value: { availability, create } });
  Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: true } });
});

afterEach(() => {
  delete (self as unknown as { Translator?: unknown }).Translator;
  delete (navigator as unknown as { userActivation?: unknown }).userActivation;
});

describe("translator", () => {
  it("returns unsupported when Translator is missing", async () => {
    delete (self as unknown as { Translator?: unknown }).Translator;
    const result = await translator("hello", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
  });

  it("checks availability and translates text", async () => {
    const result = await translator("hello", options);
    expect(availability).toHaveBeenCalledWith(options);
    expect(create).toHaveBeenCalledWith(options);
    expect(result).toMatchObject({ ok: true, translation: "hola" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it("returns unsupported without creating when unavailable", async () => {
    availability.mockResolvedValue("unavailable");
    const result = await translator("hello", options);
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
    expect(create).not.toHaveBeenCalled();
  });

  it("returns gesture-required when user activation is missing", async () => {
    Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: false } });
    const result = await translator("hello", options);
    expect(result).toMatchObject({ ok: false, code: "gesture-required" });
    expect(create).not.toHaveBeenCalled();
  });

  it.each(errorCodes)("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await translator("hello", options);
    expect(result).toMatchObject({ ok: false, code });
  });

  it("maps an error from translate and still destroys the session", async () => {
    session.translate.mockRejectedValue(domError("QuotaExceededError"));
    const result = await translator("hello", options);
    expect(result).toMatchObject({ ok: false, code: "invalid-argument", status: "quota-exceeded" });
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });
});

describe("translatorStream", () => {
  it("delivers chunks in order and destroys session", async () => {
    const chunks: string[] = [];
    const result = await translatorStream("hello", (chunk) => chunks.push(chunk), options);

    expect(availability).toHaveBeenCalledWith(options);
    expect(result).toMatchObject({ ok: true });
    expect(chunks).toEqual(["ho", "la"]);
    expect(session.destroy).toHaveBeenCalledTimes(1);
  });

  it.each(errorCodes)("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await translatorStream("hello", jest.fn(), options);
    expect(result).toMatchObject({ ok: false, code });
  });
});
