// Pins every `ErrorCode` literal to a concrete API call site so the v6.5
// typed-error contract can't drift quietly. One representative test per
// code; each cites the spec section that defines the DOMException name
// being mapped (or the secure-context / activation requirement being
// honored).

import { wakeLock } from "./wake-lock";
import { payment } from "./payment";
import { copyText } from "./clipboard";
import { notification } from "./notification";
import { webShare } from "./web-share";
import { passkey } from "./passkey";
import { compressStream } from "./compression";

type AnyNav = Record<string, unknown>;
type AnyWin = Record<string, unknown>;

const setNav = (key: string, value: unknown): void => {
  Object.defineProperty(navigator, key, { configurable: true, value });
};
const deleteNav = (key: string): void => {
  delete (navigator as unknown as AnyNav)[key];
};
const setWin = (key: string, value: unknown): void => {
  Object.defineProperty(window, key, { configurable: true, value });
};

describe("ErrorCode contract", () => {
  beforeEach(() => {
    // Reset everything tests below touch so each starts from a known state.
    deleteNav("wakeLock");
    deleteNav("clipboard");
    deleteNav("share");
    deleteNav("canShare");
    deleteNav("userActivation");
    delete (window as unknown as AnyWin).PaymentRequest;
    delete (window as unknown as AnyWin).Notification;
    delete (window as unknown as AnyWin).CompressionStream;
    delete (window as unknown as AnyWin).PublicKeyCredential;
  });

  it("'unsupported' — wakeLock returns it when navigator.wakeLock is missing", async () => {
    // Pre-condition: API not present on the platform. The check is the
    // first line of every pwafire API and predates DOMException entirely.
    const r = await wakeLock();
    expect(r.ok).toBe(false);
    expect(r.code).toBe("unsupported");
  });

  it("'insecure-context' — payment surfaces it when window.isSecureContext is false", async () => {
    // PaymentRequest is gated behind a secure context per
    // https://w3c.github.io/payment-request/#constructor — pwafire surfaces
    // this proactively instead of letting the constructor throw.
    setWin("PaymentRequest", function PaymentRequestMock() {});
    setWin("isSecureContext", false);
    const r = await payment(
      { methodData: [], details: { total: { label: "", amount: { currency: "USD", value: "0" } } } },
      () => true,
    );
    expect(r.ok).toBe(false);
    expect(r.code).toBe("insecure-context");
  });

  it("'permission-denied' — clipboard.copyText maps NotAllowedError", async () => {
    // https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext —
    // rejects with "NotAllowedError" DOMException when the page lacks
    // write permission (no focus, no transient activation, denied prompt).
    setNav("clipboard", {
      writeText: () => Promise.reject(new DOMException("blocked", "NotAllowedError")),
    });
    const r = await copyText("x");
    expect(r.ok).toBe(false);
    expect(r.code).toBe("permission-denied");
    expect(r.cause).toBeInstanceOf(DOMException);
  });

  it("'permission-dismissed' — notification surfaces it when permission stays 'default'", async () => {
    // https://notifications.spec.whatwg.org/#permission-model —
    // requestPermission() resolves to "default" when the user dismisses
    // the prompt without choosing allow or deny.
    setWin("Notification", { requestPermission: () => Promise.resolve("default") });
    const r = await notification({ title: "t", options: { body: "b", timestamp: 0 } });
    expect(r.ok).toBe(false);
    expect(r.code).toBe("permission-dismissed");
    // Legacy field preserved (v6.5 strictly additive).
    expect(r.status).toBe("permission-default");
  });

  it("'gesture-required' — payment surfaces it when navigator.userActivation.isActive is false", async () => {
    // PaymentRequest.show() requires transient user activation per
    // https://html.spec.whatwg.org/multipage/interaction.html#transient-activation
    // pwafire reads navigator.userActivation.isActive before calling show().
    setWin("PaymentRequest", function PaymentRequestMock() {});
    setWin("isSecureContext", true);
    setNav("userActivation", { isActive: false });
    const r = await payment(
      { methodData: [], details: { total: { label: "", amount: { currency: "USD", value: "0" } } } },
      () => true,
    );
    expect(r.ok).toBe(false);
    expect(r.code).toBe("gesture-required");
  });

  it("'cancelled' — webShare maps AbortError", async () => {
    // https://www.w3.org/TR/web-share/#share-method —
    // share() rejects with "AbortError" DOMException when the user
    // dismisses the OS share sheet.
    setNav("canShare", () => true);
    setNav("share", () => Promise.reject(new DOMException("user dismissed", "AbortError")));
    const r = await webShare({ text: "x" });
    expect(r.ok).toBe(false);
    expect(r.code).toBe("cancelled");
  });

  it("'invalid-argument' — passkey.parseCreationOptions surfaces it when parse throws", () => {
    // https://w3c.github.io/webauthn/#sctn-parseCreationOptionsFromJSON —
    // parseCreationOptionsFromJSON throws (typically TypeError) on
    // malformed JSON input.
    (window as unknown as AnyWin).PublicKeyCredential = {
      parseCreationOptionsFromJSON: () => {
        throw new TypeError("malformed");
      },
    };
    const r = passkey.parseCreationOptions({});
    expect(r.ok).toBe(false);
    expect(r.code).toBe("invalid-argument");
  });

  it("'runtime-error' — compressStream falls back to it on unexpected throw", async () => {
    // Catch-all for errors that don't match a known DOMException name.
    // Here the constructor itself throws after the feature-detect passes.
    setWin("CompressionStream", function CompressionStreamMock() {
      throw new Error("boom");
    });
    // jsdom doesn't define ReadableStream; the mocked CompressionStream
    // constructor throws before pipeThrough is dereferenced, so a stub
    // value is enough here.
    const r = await compressStream({} as unknown as ReadableStream);
    expect(r.ok).toBe(false);
    expect(r.code).toBe("runtime-error");
    expect(r.cause).toBeInstanceOf(Error);
  });
});
