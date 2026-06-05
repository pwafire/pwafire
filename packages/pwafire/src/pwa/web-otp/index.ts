import type { ErrorCode } from "../../types/result";

// `code` is the OTP value (back-compat); the v6.5 error discriminator
// is exposed as `errorCode` here to avoid colliding with it.
export const webOtp = async (): Promise<{
  ok: boolean;
  message: string;
  code: string | null;
  errorCode?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("OTPCredential" in window)) {
      return { ok: false, errorCode: "unsupported", message: "Web OTP API not supported", code: null };
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');
    if (!input) {
      return {
        ok: false,
        errorCode: "invalid-argument",
        message: "No input with autocomplete='one-time-code' found",
        code: null,
      };
    }

    const ac = new AbortController();
    const form = input.closest("form");
    if (form) {
      form.addEventListener("submit", () => {
        ac.abort();
      });
    }

    const otp = (await navigator.credentials.get({
      otp: { transport: ["sms"] },
      signal: ac.signal,
    } as OTPCredentialOptions)) as OTPCredential;

    return {
      ok: true,
      message: "OTP received",
      code: otp.code,
    };
  } catch (error) {
    let errorCode: ErrorCode = "runtime-error";
    if (error instanceof DOMException && error.name === "AbortError") errorCode = "cancelled";
    return {
      ok: false,
      errorCode,
      message: error instanceof Error ? error.message : "Failed to get OTP",
      code: null,
      cause: error,
    };
  }
};
