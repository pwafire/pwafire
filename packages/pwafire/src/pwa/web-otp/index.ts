export const webOtp = async () => {
  try {
    if (!("OTPCredential" in window)) {
      return { ok: false, message: "Web OTP API not supported", code: null };
    }

    const input = document.querySelector('input[autocomplete="one-time-code"]');
    if (!input) {
      return {
        ok: false,
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
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to get OTP",
      code: null,
    };
  }
};
