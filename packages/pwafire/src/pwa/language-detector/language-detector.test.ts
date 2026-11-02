import { languageDetector } from "./index";

type MockDetector = {
  detect: jest.Mock;
  destroy: jest.Mock;
};

const domError = (name: string): DOMException => new DOMException(name, name);

const errorCodes = [
  ["AbortError", "cancelled"],
  ["NotAllowedError", "permission-denied"],
  ["NotSupportedError", "unsupported"],
  ["QuotaExceededError", "invalid-argument"],
  ["OperationError", "runtime-error"],
];

let detector: MockDetector;
let availability: jest.Mock;
let create: jest.Mock;

beforeEach(() => {
  detector = {
    detect: jest.fn().mockResolvedValue([{ detectedLanguage: "en", confidence: 0.99 }]),
    destroy: jest.fn(),
  };
  availability = jest.fn().mockResolvedValue("available");
  create = jest.fn().mockResolvedValue(detector);
  Object.defineProperty(self, "LanguageDetector", { configurable: true, value: { availability, create } });
  Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: true } });
});

afterEach(() => {
  delete (self as unknown as { LanguageDetector?: unknown }).LanguageDetector;
  delete (navigator as unknown as { userActivation?: unknown }).userActivation;
});

describe("languageDetector", () => {
  it("returns unsupported when LanguageDetector is missing", async () => {
    delete (self as unknown as { LanguageDetector?: unknown }).LanguageDetector;
    const result = await languageDetector("hello");
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
  });

  it("checks availability and detects language", async () => {
    const result = await languageDetector("hello");
    expect(availability).toHaveBeenCalled();
    expect(create).toHaveBeenCalled();
    expect(result).toMatchObject({
      ok: true,
      results: [{ detectedLanguage: "en", confidence: 0.99 }],
    });
    expect(detector.destroy).toHaveBeenCalledTimes(1);
  });

  it("returns unsupported without creating when unavailable", async () => {
    availability.mockResolvedValue("unavailable");
    const result = await languageDetector("hello");
    expect(result).toMatchObject({ ok: false, code: "unsupported" });
    expect(create).not.toHaveBeenCalled();
  });

  it("returns gesture-required when user activation is missing", async () => {
    Object.defineProperty(navigator, "userActivation", { configurable: true, value: { isActive: false } });
    const result = await languageDetector("hello");
    expect(result).toMatchObject({ ok: false, code: "gesture-required" });
    expect(create).not.toHaveBeenCalled();
  });

  it.each(errorCodes)("maps a %s from create to %s", async (name, code) => {
    create.mockRejectedValue(domError(name));
    const result = await languageDetector("hello");
    expect(result).toMatchObject({ ok: false, code });
  });

  it("maps an error from detect and still destroys the session", async () => {
    detector.detect.mockRejectedValue(domError("QuotaExceededError"));
    const result = await languageDetector("hello");
    expect(result).toMatchObject({ ok: false, code: "invalid-argument", status: "quota-exceeded" });
    expect(detector.destroy).toHaveBeenCalledTimes(1);
  });
});
