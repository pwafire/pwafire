import type { ErrorCode } from "../../types/result";

export const webOtp = async (): Promise<{
  ok: boolean;
  message: string;
  /** @deprecated Use `otpCode`. In v7 this field will be removed and `code` will become the `ErrorCode` discriminator like every other pwafire API. */
  code: string | null;
  otpCode: string | null;
  errorCode?: ErrorCode;
  cause?: unknown;
}> => {
  try {
    if (!("OTPCredential" in window)) {
      return { ok: false, errorCode: "unsupported", message: "Web OTP API not supported", code: null, otpCode: null };
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');
    if (!input) {
      return {
        ok: false,
        errorCode: "invalid-argument",
        message: "No input with autocomplete='one-time-code' found",
        code: null,
        otpCode: null,
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
      otpCode: otp.code,
    };
  } catch (error) {
    let errorCode: ErrorCode = "runtime-error";
    if (error instanceof DOMException && error.name === "AbortError") errorCode = "cancelled";
    return {
      ok: false,
      errorCode,
      message: error instanceof Error ? error.message : "Failed to get OTP",
      code: null,
      otpCode: null,
      cause: error,
    };
  }
};
