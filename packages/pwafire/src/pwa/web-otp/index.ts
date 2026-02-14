export const webOtp = async (callback: (res: { code: string | null; ok: boolean; message: string }) => void) => {
  try {
    if (!("OTPCredential" in window)) {
      const result = { ok: false, message: "Web OTP API not supported", code: null };
      callback(result);
      return { ok: false, message: "Web OTP API not supported" };
    }

    setTimeout(async () => {
      try {
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) {
          callback({
            code: null,
            ok: false,
            message: "No input with autocomplete='one-time-code' found",
          });
          return;
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

        callback({
          code: otp.code,
          ok: true,
          message: "OTP received",
        });
      } catch (error) {
        callback({
          code: null,
          ok: false,
          message: error instanceof Error ? error.message : "Failed to get OTP",
        });
      }
    }, 0);

    return { ok: true, message: "Web OTP listener registered - awaiting SMS" };
  } catch (error) {
    const result = {
      ok: false,
      message: error instanceof Error ? error.message : "Failed to setup OTP",
    };
    callback({ ...result, code: null });
    return result;
  }
};
