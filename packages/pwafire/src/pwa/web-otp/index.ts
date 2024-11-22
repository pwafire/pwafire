export const WebOTPApi = {
  webOTP: async (callback: (res: { code: string | null; ok: boolean; message: string }) => void) => {
    try {
      if ("OTPCredential" in window) {
        window.addEventListener("DOMContentLoaded", async () => {
          const input = document.querySelector('input[autocomplete="one-time-code"]');
          if (input) {
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
          } else {
            callback({
              code: null,
              ok: false,
              message: "No input with autocomplete='one-time-code' found",
            });
          }
        });
      } else {
        callback({
          code: null,
          ok: false,
          message: "Web OTP API not supported",
        });
      }
    } catch (error) {
      throw error;
    }
  },
};
