export const WebOTPApi = {
  webOTP: async (callback: (res: { code: string | null; message: string }) => void) => {
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
              message: "OTP received",
            });
          } else {
            throw new Error(`No input with autocomplete='one-time-code' found`);
          }
        });
      } else {
        throw new Error(`WebOTP API not supported`);
      }
    } catch (error) {
      throw error;
    }
  },
};
